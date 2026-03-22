import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { getActorFromRequest, requireApiPermission } from "@/lib/security/api-guards"
import { volunteerStore } from "@/lib/volunteer/store"

const startSessionSchema = z.object({
  volunteerId: z.string().min(3),
  assignmentId: z.string().min(3),
})

const completeSessionSchema = z.object({
  sessionId: z.string().min(3),
  attemptsLogged: z.number().int().nonnegative(),
})

export async function GET(request: NextRequest) {
  const actor = getActorFromRequest(request)
  if (actor instanceof NextResponse) {
    return actor
  }

  const permissionError = requireApiPermission(actor, "campaign:access")
  if (permissionError) {
    return permissionError
  }

  const volunteerId = request.nextUrl.searchParams.get("volunteerId") ?? undefined
  return NextResponse.json({ sessions: volunteerStore.listCanvassSessions(volunteerId) })
}

export async function POST(request: NextRequest) {
  const actor = getActorFromRequest(request)
  if (actor instanceof NextResponse) {
    return actor
  }

  const permissionError = requireApiPermission(actor, "campaign:access")
  if (permissionError) {
    return permissionError
  }

  const parsed = startSessionSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid canvass session payload" }, { status: 400 })
  }

  const session = volunteerStore.startCanvassSession(actor, parsed.data)
  return NextResponse.json({ session }, { status: 201 })
}

export async function PATCH(request: NextRequest) {
  const actor = getActorFromRequest(request)
  if (actor instanceof NextResponse) {
    return actor
  }

  const permissionError = requireApiPermission(actor, "campaign:access")
  if (permissionError) {
    return permissionError
  }

  const parsed = completeSessionSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid canvass completion payload" }, { status: 400 })
  }

  try {
    const session = volunteerStore.completeCanvassSession(actor, parsed.data)
    return NextResponse.json({ session })
  } catch {
    return NextResponse.json({ error: "session not found" }, { status: 404 })
  }
}
