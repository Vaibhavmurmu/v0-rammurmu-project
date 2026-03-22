import { NextResponse } from "next/server"
import { z } from "zod"
import { volunteerStore } from "@/lib/volunteer/store"

const signupSchema = z.object({
  fullName: z.string().min(3),
  email: z.email(),
  phone: z.string().min(7),
  role: z.enum(["supporter", "organizer"]),
  languagePreference: z.enum(["en", "hi"]),
  geographyId: z.string().optional(),
  consent: z.object({
    sms: z.boolean(),
    email: z.boolean(),
    phone: z.boolean(),
    dataRetentionPolicyVersion: z.string().min(1),
  }),
})

export async function POST(request: Request) {
  const parsed = signupSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid volunteer signup payload" }, { status: 400 })
  }

  const { consent, ...volunteerPayload } = parsed.data
  if (!consent.sms && !consent.email && !consent.phone) {
    return NextResponse.json({ error: "at least one outreach consent channel is required" }, { status: 400 })
  }

  const volunteer = volunteerStore.createVolunteer({
    ...volunteerPayload,
    consent: {
      ...consent,
      consentCapturedAt: new Date().toISOString(),
    },
  })

  return NextResponse.json({ volunteer }, { status: 201 })
}

export async function GET() {
  return NextResponse.json({
    volunteers: volunteerStore.listVolunteers(),
    contactOutcomes: volunteerStore.listOutcomes(),
  })
}
