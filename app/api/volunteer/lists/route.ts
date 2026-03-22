import { NextResponse } from "next/server"
import { z } from "zod"
import { volunteerStore } from "@/lib/volunteer/store"

const createListSchema = z.object({
  title: z.string().min(3),
  channel: z.enum(["walk", "call"]),
  geographyId: z.string().min(3),
  createdByOrganizerId: z.string().min(3),
  totalTargets: z.number().int().positive(),
})

function assertOrganizer(request: Request) {
  return request.headers.get("x-user-role") === "organizer"
}

export async function POST(request: Request) {
  if (!assertOrganizer(request)) {
    return NextResponse.json({ error: "organizer role required" }, { status: 403 })
  }

  const parsed = createListSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid list payload" }, { status: 400 })
  }

  const list = volunteerStore.createOutreachList(parsed.data)
  return NextResponse.json({ list }, { status: 201 })
}

export async function GET() {
  return NextResponse.json({
    geographies: volunteerStore.listGeographies(),
    lists: volunteerStore.listOutreachLists(),
  })
}
