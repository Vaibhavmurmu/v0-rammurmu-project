import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { getActorFromRequest, requireApiPermission } from "@/lib/security/api-guards"
import { volunteerStore } from "@/lib/volunteer/store"

const contactListEntrySchema = z.object({
  assignmentId: z.string().min(3),
  fullName: z.string().min(2),
  addressLine1: z.string().min(5),
  phone: z.string().min(7).optional(),
  priority: z.enum(["high", "normal"]),
  preferredChannel: z.enum(["walk", "call"]),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  notes: z.string().optional(),
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

  const assignmentId = request.nextUrl.searchParams.get("assignmentId") ?? undefined
  return NextResponse.json({ entries: volunteerStore.listContactListEntries(assignmentId) })
}

export async function POST(request: NextRequest) {
  const actor = getActorFromRequest(request)
  if (actor instanceof NextResponse) {
    return actor
  }

  const permissionError = requireApiPermission(actor, "volunteers:manage")
  if (permissionError) {
    return permissionError
  }

  const parsed = contactListEntrySchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid contact list entry payload" }, { status: 400 })
  }

  const entry = volunteerStore.createContactListEntry(actor, parsed.data)
  return NextResponse.json({ entry }, { status: 201 })
}
