import crypto from "node:crypto"
import { DEFAULT_CONTRIBUTION_LIMIT_CENTS, ELECTION_CYCLE } from "@/lib/donations/config"
import type {
  ContributionLimitTracking,
  DonationIntent,
  DonationLedgerRecord,
  DonationProvider,
  DonationStatus,
  DonorRegulatoryProfile,
} from "@/lib/donations/types"

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

export const donationStore = {
  saveIntent(intent: DonationIntent) {
    intents.set(intent.donationId, intent)
  },
  getIntent(donationId: string) {
    return intents.get(donationId)
  },
  appendLedgerRecord(input: {
    donationId: string
    status: DonationStatus
    provider: DonationProvider
    providerIntentId?: string
    amountCents: number
    currency: "USD"
    reason?: string
    receiptEmail: string
    donorProfile: DonorRegulatoryProfile
  }) {
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
      donorProfile: input.donorProfile,
      contributionLimitTracking,
    }

    ledgerByDonationId.set(input.donationId, [...existing, record])
    return record
  },
  listDonationLedger(donationId: string) {
    return ledgerByDonationId.get(donationId) ?? []
  },
}
