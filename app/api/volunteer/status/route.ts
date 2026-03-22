import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { getActorFromRequest, requireApiPermission } from "@/lib/security/api-guards"
import { volunteerStore } from "@/lib/volunteer/store"

const volunteerStatusSchema = z.object({
  volunteerId: z.string().min(3),
  status: z.enum(["active", "paused", "inactive"]),
})

export async function PATCH(request: NextRequest) {
  const actor = getActorFromRequest(request)
  if (actor instanceof NextResponse) {
    return actor
  }

  const permissionError = requireApiPermission(actor, "volunteers:manage")
  if (permissionError) {
    return permissionError
  }

  const parsed = volunteerStatusSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid volunteer status payload" }, { status: 400 })
  }

  try {
    const volunteer = volunteerStore.updateVolunteerStatus(actor, parsed.data)
    return NextResponse.json({ volunteer })
  } catch {
    return NextResponse.json({ error: "volunteer not found" }, { status: 404 })
  }
}
