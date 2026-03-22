import { NextResponse } from "next/server"
import { featureFlags } from "@/lib/feature-flags"
import { notificationStore } from "@/lib/notification-store"

export async function POST(request: Request) {
  if (!featureFlags.notificationFanoutEnabled) {
    return NextResponse.json(
      { error: "Notification fanout is disabled by feature flag." },
      { status: 403 }
    )
  }

  const body = (await request.json()) as { title?: string; body?: string }
  if (!body.title || !body.body) {
    return NextResponse.json({ error: "title and body are required" }, { status: 400 })
  }

  const subscribers = notificationStore.list()

  return NextResponse.json({
    ok: true,
    queued: subscribers.length,
    message: "Fanout accepted. External push provider integration is pending.",
  })
}
