import { NextResponse } from "next/server"
import { z } from "zod"
import { idempotency } from "@/lib/donations/idempotency"
import { donationStore } from "@/lib/donations/store"
import type { AuthActor } from "@/lib/security/rbac"

const SYSTEM_ACTOR: AuthActor = { actorId: "system", role: "super_admin", mfaVerified: true }

const reconcileSchema = z.object({
  donationId: z.string().min(1),
  status: z.enum(["captured", "failed", "refunded"]),
  reason: z.string().optional(),
})

export async function POST(request: Request) {
  const idempotencyKey = request.headers.get("x-idempotency-key")
  if (!idempotencyKey) {
    return NextResponse.json({ error: "x-idempotency-key header is required" }, { status: 400 })
  }

  if (idempotency.isDuplicate("donation_reconcile", idempotencyKey)) {
    return NextResponse.json({ ok: true, duplicate: true })
  }

  const parsed = reconcileSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid reconciliation payload" }, { status: 400 })
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
    provider: intent.provider,
    providerIntentId: intent.providerIntentId,
    amountCents: intent.amountCents,
    currency: "USD",
    reason: parsed.data.reason,
    receiptEmail: intent.receiptEmail,
    donorProfile: donationStore.getDonationLedgerWithPii(SYSTEM_ACTOR, parsed.data.donationId).at(-1)?.donorProfile ?? (() => { throw new Error("missing_donor_profile") })(),
  })

  idempotency.register("donation_reconcile", idempotencyKey)

  return NextResponse.json({ ok: true })
}
