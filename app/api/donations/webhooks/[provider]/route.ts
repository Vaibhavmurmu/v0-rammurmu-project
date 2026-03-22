import { NextResponse } from "next/server"
import { z } from "zod"
import { idempotency } from "@/lib/donations/idempotency"
import { donationStore } from "@/lib/donations/store"
import type { AuthActor } from "@/lib/security/rbac"
import type { DonationStatus } from "@/lib/donations/types"

const SYSTEM_ACTOR: AuthActor = { actorId: "system", role: "super_admin", mfaVerified: true }

const webhookPayloadSchema = z.object({
  donationId: z.string().min(1),
  providerIntentId: z.string().min(1),
  status: z.enum(["authorized", "captured", "failed", "refunded"] satisfies [DonationStatus, ...DonationStatus[]]),
  reason: z.string().optional(),
})

export async function POST(
  request: Request,
  context: { params: Promise<{ provider: "stripe" | "paypal" }> }
) {
  const { provider } = await context.params
  const webhookEventId = request.headers.get("x-webhook-event-id")
  if (!webhookEventId) {
    return NextResponse.json({ error: "x-webhook-event-id header is required" }, { status: 400 })
  }

  const idempotencyKey = `${provider}:${webhookEventId}`
  if (idempotency.isDuplicate("donation_webhook", idempotencyKey)) {
    return NextResponse.json({ ok: true, duplicate: true })
  }

  const parsed = webhookPayloadSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid webhook payload" }, { status: 400 })
  }

  const intent = donationStore.getIntent(parsed.data.donationId)
  if (!intent) {
    return NextResponse.json({ error: "unknown donation" }, { status: 404 })
  }

  if (donationStore.listDonationLedger(parsed.data.donationId).length === 0) {
    return NextResponse.json({ error: "missing donation ledger" }, { status: 409 })
  }

  donationStore.appendLedgerRecord(SYSTEM_ACTOR, {
    donationId: parsed.data.donationId,
    status: parsed.data.status,
    provider,
    providerIntentId: parsed.data.providerIntentId,
    amountCents: intent.amountCents,
    currency: "USD",
    reason: parsed.data.reason,
    receiptEmail: intent.receiptEmail,
    donorProfile: donationStore.getDonationLedgerWithPii(SYSTEM_ACTOR, parsed.data.donationId).at(-1)?.donorProfile ?? (() => { throw new Error("missing_donor_profile") })(),
  })

  idempotency.register("donation_webhook", idempotencyKey)

  return NextResponse.json({ ok: true })
}
