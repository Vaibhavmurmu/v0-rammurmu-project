import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { getActorFromRequest, requireApiPermission } from "@/lib/security/api-guards"
import { volunteerStore } from "@/lib/volunteer/store"

const createListSchema = z.object({
  title: z.string().min(3),
  channel: z.enum(["walk", "call"]),
  geographyId: z.string().min(3),
  createdByOrganizerId: z.string().min(3),
  totalTargets: z.number().int().positive(),
})

export async function POST(request: NextRequest) {
  const actor = getActorFromRequest(request)
  if (actor instanceof NextResponse) {
    return actor
  }

  const permissionError = requireApiPermission(actor, "volunteers:manage")
  if (permissionError) {
    return permissionError
  }

  const parsed = createListSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid list payload" }, { status: 400 })
  }

  const list = volunteerStore.createOutreachListAs(actor, parsed.data)
  return NextResponse.json({ list }, { status: 201 })
}

export async function GET(request: NextRequest) {
  const actor = getActorFromRequest(request)
  if (actor instanceof NextResponse) {
    return actor
  }

  const permissionError = requireApiPermission(actor, "campaign:access")
  if (permissionError) {
    return permissionError
  }

  return NextResponse.json({
    geographies: volunteerStore.listGeographies(),
    lists: volunteerStore.listOutreachLists(),
  })
}
