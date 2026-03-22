import crypto from "node:crypto"
import type { DonationProvider } from "@/lib/donations/types"

type ProviderCreateIntentInput = {
  provider: DonationProvider
  amountCents: number
  currency: "USD"
  metadata: Record<string, string>
}

type ProviderIntentResponse = {
  providerIntentId: string
  authorizationState: "requires_capture" | "captured"
}

async function createStripeIntent(input: ProviderCreateIntentInput): Promise<ProviderIntentResponse> {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return {
      providerIntentId: `stripe_local_${crypto.randomUUID()}`,
      authorizationState: "requires_capture",
    }
  }

  const body = new URLSearchParams({
    amount: input.amountCents.toString(),
    currency: input.currency.toLowerCase(),
    capture_method: "manual",
    ...Object.fromEntries(
      Object.entries(input.metadata).map(([key, value]) => [`metadata[${key}]`, value])
    ),
  })

  const response = await fetch("https://api.stripe.com/v1/payment_intents", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("stripe_intent_creation_failed")
  }

  const payload = (await response.json()) as { id: string; capture_method: string }

  return {
    providerIntentId: payload.id,
    authorizationState: payload.capture_method === "manual" ? "requires_capture" : "captured",
  }
}

async function createPaypalOrder(input: ProviderCreateIntentInput): Promise<ProviderIntentResponse> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return {
      providerIntentId: `paypal_local_${crypto.randomUUID()}`,
      authorizationState: "requires_capture",
    }
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
  const tokenResponse = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  })

  if (!tokenResponse.ok) {
    throw new Error("paypal_auth_failed")
  }

  const tokenPayload = (await tokenResponse.json()) as { access_token: string }
  const orderResponse = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenPayload.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "AUTHORIZE",
      purchase_units: [
        {
          amount: {
            currency_code: input.currency,
            value: (input.amountCents / 100).toFixed(2),
          },
          custom_id: input.metadata.donationId,
        },
      ],
    }),
    cache: "no-store",
  })

  if (!orderResponse.ok) {
    throw new Error("paypal_order_creation_failed")
  }

  const payload = (await orderResponse.json()) as { id: string }
  return {
    providerIntentId: payload.id,
    authorizationState: "requires_capture",
  }
}

export async function createProviderIntent(input: ProviderCreateIntentInput) {
  if (input.provider === "stripe") {
    return createStripeIntent(input)
  }

  return createPaypalOrder(input)
}
