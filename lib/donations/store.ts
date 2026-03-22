import crypto from "node:crypto"
import { DEFAULT_CONTRIBUTION_LIMIT_CENTS, ELECTION_CYCLE } from "@/lib/donations/config"
import type {
  ContributionLimitTracking,
  DonationIntent,
  DonationLedgerRecord,
  DonationProvider,
  DonationStatus,
  DonorRegulatoryProfile,
  EncryptedDonorRegulatoryProfile,
} from "@/lib/donations/types"
import { encryptField, decryptField } from "@/lib/security/encryption"
import { evaluateFinancialLimits } from "@/lib/compliance/financial-limits"
import { logSecurityEvent } from "@/lib/security/logging"
import { recordAuditEvent } from "@/lib/compliance/audit-trail"
import { requirePermission, type AuthActor } from "@/lib/security/rbac"

const intents = new Map<string, DonationIntent>()
const ledgerByDonationId = new Map<string, DonationLedgerRecord[]>()

const ALLOWED_NEXT_STATUS: Record<DonationStatus, DonationStatus[]> = {
  initiated: ["authorized", "captured", "failed"],
  authorized: ["captured", "failed", "refunded"],
  captured: ["refunded"],
  failed: [],
  refunded: [],
}

function computeContributionTracking(receiptEmail: string, amountCents: number): ContributionLimitTracking {
  const allRecords = Array.from(ledgerByDonationId.values()).flat()
  const contributedSoFar = allRecords
    .filter((record) => {
      return (
        record.receiptEmail === receiptEmail &&
        record.contributionLimitTracking.electionCycle === ELECTION_CYCLE &&
        record.status === "captured"
      )
    })
    .reduce((sum, record) => sum + record.amountCents, 0)

  const aggregateContributionCents = contributedSoFar + amountCents
  const remainingContributionCents = Math.max(DEFAULT_CONTRIBUTION_LIMIT_CENTS - aggregateContributionCents, 0)

  return {
    electionCycle: ELECTION_CYCLE,
    cycleContributionLimitCents: DEFAULT_CONTRIBUTION_LIMIT_CENTS,
    aggregateContributionCents,
    remainingContributionCents,
    exceedsLimit: aggregateContributionCents > DEFAULT_CONTRIBUTION_LIMIT_CENTS,
  }
}

function encryptDonorProfile(profile: DonorRegulatoryProfile): EncryptedDonorRegulatoryProfile {
  return {
    legalName: encryptField(profile.legalName),
    email: encryptField(profile.email),
    line1: encryptField(profile.line1),
    city: encryptField(profile.city),
    state: encryptField(profile.state),
    postalCode: encryptField(profile.postalCode),
    country: encryptField(profile.country),
    occupation: encryptField(profile.occupation),
    employer: encryptField(profile.employer),
    isUsCitizenOrPermanentResident: profile.isUsCitizenOrPermanentResident,
  }
}

function decryptDonorProfile(profile: EncryptedDonorRegulatoryProfile): DonorRegulatoryProfile {
  return {
    legalName: decryptField(profile.legalName),
    email: decryptField(profile.email),
    line1: decryptField(profile.line1),
    city: decryptField(profile.city),
    state: decryptField(profile.state),
    postalCode: decryptField(profile.postalCode),
    country: decryptField(profile.country),
    occupation: decryptField(profile.occupation),
    employer: decryptField(profile.employer),
    isUsCitizenOrPermanentResident: profile.isUsCitizenOrPermanentResident,
  }
}

export const donationStore = {
  saveIntent(intent: DonationIntent) {
    intents.set(intent.donationId, intent)
  },
  getIntent(donationId: string) {
    return intents.get(donationId)
  },
  appendLedgerRecord(
    actor: AuthActor,
    input: {
      donationId: string
      status: DonationStatus
      provider: DonationProvider
      providerIntentId?: string
      amountCents: number
      currency: "USD"
      reason?: string
      receiptEmail: string
      donorProfile: DonorRegulatoryProfile
    },
  ) {
    requirePermission(actor, "donations:manage")

    const existing = ledgerByDonationId.get(input.donationId) ?? []
    const previous = existing.at(-1)

    if (previous) {
      const allowedTransitions = ALLOWED_NEXT_STATUS[previous.status]
      if (!allowedTransitions.includes(input.status)) {
        throw new Error(`invalid_status_transition:${previous.status}->${input.status}`)
      }
    } else if (input.status !== "initiated") {
      throw new Error("invalid_initial_status")
    }

    const contributionLimitTracking = computeContributionTracking(input.receiptEmail, input.amountCents)

    const record: DonationLedgerRecord = {
      ledgerId: `led_${crypto.randomUUID()}`,
      donationId: input.donationId,
      sequence: existing.length + 1,
      status: input.status,
      provider: input.provider,
      providerIntentId: input.providerIntentId,
      amountCents: input.amountCents,
      currency: input.currency,
      reason: input.reason,
      eventAt: new Date().toISOString(),
      receiptEmail: input.receiptEmail,
      receiptId: `rcpt_${crypto.randomUUID()}`,
      donorProfile: encryptDonorProfile(input.donorProfile),
      contributionLimitTracking,
    }

    const complianceFlags = evaluateFinancialLimits({
      donationId: input.donationId,
      amountCents: input.amountCents,
      aggregateContributionCents: contributionLimitTracking.aggregateContributionCents,
      cycleContributionLimitCents: contributionLimitTracking.cycleContributionLimitCents,
    })

    if (complianceFlags.length > 0) {
      logSecurityEvent({
        eventType: "compliance_flag",
        actorId: actor.actorId,
        message: "Financial compliance limits triggered for donation.",
        context: { donationId: input.donationId, flags: complianceFlags.length },
      })
    }

    recordAuditEvent({
      eventType: "donation_ledger_appended",
      actorId: actor.actorId,
      details: {
        donationId: input.donationId,
        status: input.status,
        amountCents: input.amountCents,
      },
    })

    ledgerByDonationId.set(input.donationId, [...existing, record])
    return record
  },
  listDonationLedger(donationId: string) {
    return ledgerByDonationId.get(donationId) ?? []
  },
  getDonationLedgerWithPii(actor: AuthActor, donationId: string) {
    requirePermission(actor, "compliance:read")

    return (ledgerByDonationId.get(donationId) ?? []).map((record) => ({
      ...record,
      donorProfile: decryptDonorProfile(record.donorProfile),
    }))
  },
}
