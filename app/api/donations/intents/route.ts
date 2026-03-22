import crypto from "node:crypto"
import { NextResponse } from "next/server"
import { z } from "zod"
import { DONATION_TIER_AMOUNTS_CENTS, type DonationTier } from "@/lib/donations/config"
import { idempotency } from "@/lib/donations/idempotency"
import { createProviderIntent } from "@/lib/donations/providers"
import { donationStore } from "@/lib/donations/store"
import type { DonationProvider, DonorRegulatoryProfile } from "@/lib/donations/types"

const donationIntentSchema = z.object({
  provider: z.enum(["stripe", "paypal"]),
  tier: z.enum(Object.keys(DONATION_TIER_AMOUNTS_CENTS) as [DonationTier, ...DonationTier[]]),
  donorProfile: z.object({
    legalName: z.string().min(3),
    email: z.email(),
    line1: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    postalCode: z.string().min(3),
    country: z.string().length(2),
    occupation: z.string().min(2),
    employer: z.string().min(2),
    isUsCitizenOrPermanentResident: z.boolean(),
  }),
})

export async function POST(request: Request) {
  const idempotencyKey = request.headers.get("x-idempotency-key")
  if (!idempotencyKey) {
    return NextResponse.json({ error: "x-idempotency-key header is required" }, { status: 400 })
  }

  if (idempotency.isDuplicate("donation_intent", idempotencyKey)) {
    return NextResponse.json({ error: "duplicate donation intent request" }, { status: 409 })
  }

  const parsed = donationIntentSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid donation request" }, { status: 400 })
  }

  const provider = parsed.data.provider as DonationProvider
  const donorProfile = parsed.data.donorProfile as DonorRegulatoryProfile
  const amountCents = DONATION_TIER_AMOUNTS_CENTS[parsed.data.tier]
  const donationId = `don_${crypto.randomUUID()}`

  const providerIntent = await createProviderIntent({
    provider,
    amountCents,
    currency: "USD",
    metadata: { donationId },
  })

  donationStore.saveIntent({
    donationId,
    provider,
    providerIntentId: providerIntent.providerIntentId,
    amountCents,
    currency: "USD",
    receiptEmail: donorProfile.email,
    createdAt: new Date().toISOString(),
  })

  donationStore.appendLedgerRecord({
    donationId,
    status: "initiated",
    provider,
    providerIntentId: providerIntent.providerIntentId,
    amountCents,
    currency: "USD",
    receiptEmail: donorProfile.email,
    donorProfile,
  })

  if (providerIntent.authorizationState === "requires_capture") {
    donationStore.appendLedgerRecord({
      donationId,
      status: "authorized",
      provider,
      providerIntentId: providerIntent.providerIntentId,
      amountCents,
      currency: "USD",
      receiptEmail: donorProfile.email,
      donorProfile,
    })
  }

  idempotency.register("donation_intent", idempotencyKey)

  return NextResponse.json({
    donationId,
    provider,
    providerIntentId: providerIntent.providerIntentId,
    amountCents,
    currency: "USD",
    receiptEmail: donorProfile.email,
    status: providerIntent.authorizationState,
  })
}
