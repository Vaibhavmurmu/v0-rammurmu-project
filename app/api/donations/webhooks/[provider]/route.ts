import { NextResponse } from "next/server"
import { z } from "zod"
import { idempotency } from "@/lib/donations/idempotency"
import { donationStore } from "@/lib/donations/store"
import type { DonationStatus } from "@/lib/donations/types"

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

  const latest = donationStore.listDonationLedger(parsed.data.donationId).at(-1)
  if (!latest) {
    return NextResponse.json({ error: "missing donation ledger" }, { status: 409 })
  }

  donationStore.appendLedgerRecord({
    donationId: parsed.data.donationId,
    status: parsed.data.status,
    provider,
    providerIntentId: parsed.data.providerIntentId,
    amountCents: intent.amountCents,
    currency: "USD",
    reason: parsed.data.reason,
    receiptEmail: intent.receiptEmail,
    donorProfile: latest.donorProfile,
  })

  idempotency.register("donation_webhook", idempotencyKey)

  return NextResponse.json({ ok: true })
}
