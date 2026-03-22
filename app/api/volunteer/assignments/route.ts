import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { getActorFromRequest, requireApiPermission } from "@/lib/security/api-guards"
import { volunteerStore } from "@/lib/volunteer/store"

const createAssignmentSchema = z.object({
  volunteerId: z.string().min(3),
  geographyId: z.string().min(3),
  title: z.string().min(3),
  channel: z.enum(["walk", "call"]),
})

const updateStatusSchema = z.object({
  assignmentId: z.string().min(3),
  status: z.enum(["assigned", "in_progress", "completed", "blocked"]),
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

  return NextResponse.json({ assignments: volunteerStore.listAssignments() })
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

  const parsed = createAssignmentSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid assignment payload" }, { status: 400 })
  }

  const assignment = volunteerStore.createAssignment(actor, parsed.data)
  return NextResponse.json({ assignment }, { status: 201 })
}

export async function PATCH(request: NextRequest) {
  const actor = getActorFromRequest(request)
  if (actor instanceof NextResponse) {
    return actor
  }

  const permissionError = requireApiPermission(actor, "volunteers:manage")
  if (permissionError) {
    return permissionError
  }

  const parsed = updateStatusSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid status payload" }, { status: 400 })
  }

  try {
    const assignment = volunteerStore.updateAssignmentStatus(actor, parsed.data)
    return NextResponse.json({ assignment })
  } catch {
    return NextResponse.json({ error: "assignment not found" }, { status: 404 })
  }
}
