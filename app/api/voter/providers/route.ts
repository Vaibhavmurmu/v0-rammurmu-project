import { NextResponse } from "next/server"
import { listApprovedProviders } from "@/lib/voter/providers"

export async function GET() {
  return NextResponse.json({ providers: listApprovedProviders() })
}
