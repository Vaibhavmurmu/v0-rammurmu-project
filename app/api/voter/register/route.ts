import { NextResponse } from "next/server"
import { lookupRegistrationGuidance, registerLookupSchema } from "@/lib/voter/providers"

export async function POST(request: Request) {
  const parsed = registerLookupSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid voter registration lookup payload" }, { status: 400 })
  }

  const result = await lookupRegistrationGuidance(parsed.data)
  return NextResponse.json({ result })
}
