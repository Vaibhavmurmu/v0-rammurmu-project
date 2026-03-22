import { NextResponse } from "next/server"
import { lookupPollingStation, pollingLookupSchema } from "@/lib/voter/providers"

export async function POST(request: Request) {
  const parsed = pollingLookupSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid polling station lookup payload" }, { status: 400 })
  }

  const result = await lookupPollingStation(parsed.data)
  return NextResponse.json({ result })
}
