import { NextResponse } from "next/server"
import { z } from "zod"
import { volunteerStore } from "@/lib/volunteer/store"

const assignListSchema = z.object({
  listId: z.string().min(3),
  volunteerId: z.string().min(3),
  assignedByOrganizerId: z.string().min(3),
})

function assertOrganizer(request: Request) {
  return request.headers.get("x-user-role") === "organizer"
}

export async function POST(request: Request) {
  if (!assertOrganizer(request)) {
    return NextResponse.json({ error: "organizer role required" }, { status: 403 })
  }

  const parsed = assignListSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid assignment payload" }, { status: 400 })
  }

  const assignment = volunteerStore.assignOutreachList(parsed.data)
  return NextResponse.json({ assignment }, { status: 201 })
}

export async function GET() {
  return NextResponse.json({ assignments: volunteerStore.listAssignments() })
}
