import { NextResponse } from "next/server"
import { featureFlags } from "@/lib/feature-flags"
import { notificationStore } from "@/lib/notification-store"

export async function POST(request: Request) {
  if (!featureFlags.alertsEnabled) {
    return NextResponse.json(
      { error: "Alert subscriptions are disabled by feature flag." },
      { status: 403 }
    )
  }

  const body = (await request.json()) as { endpoint?: string }
  if (!body.endpoint) {
    return NextResponse.json({ error: "endpoint is required" }, { status: 400 })
  }

  notificationStore.upsert({
    endpoint: body.endpoint,
    userAgent: request.headers.get("user-agent") ?? undefined,
    subscribedAt: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true })
}
