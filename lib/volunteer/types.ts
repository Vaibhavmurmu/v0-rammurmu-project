export const VOLUNTEER_ROLES = ["supporter", "organizer"] as const
export type VolunteerRole = (typeof VOLUNTEER_ROLES)[number]

export const OUTREACH_CHANNELS = ["walk", "call"] as const
export type OutreachChannel = (typeof OUTREACH_CHANNELS)[number]

export const CONTACT_OUTCOMES = [
  "supporter_identified",
  "follow_up_required",
  "not_home",
  "wrong_number",
  "do_not_contact",
] as const
export type ContactOutcomeType = (typeof CONTACT_OUTCOMES)[number]

export type OutreachConsent = {
  sms: boolean
  email: boolean
  phone: boolean
  consentCapturedAt: string
  dataRetentionPolicyVersion: string
}

export type VolunteerStatus = "active" | "paused" | "inactive"

export type Volunteer = {
  volunteerId: string
  fullName: string
  email: string
  phone: string
  role: VolunteerRole
  status: VolunteerStatus
  languagePreference: "en" | "hi"
  geographyId?: string
  createdAt: string
  consent: OutreachConsent
}

export type AssignmentStatus = "assigned" | "in_progress" | "completed" | "blocked"

export type Assignment = {
  assignmentId: string
  volunteerId: string
  geographyId: string
  title: string
  channel: OutreachChannel
  assignedByOrganizerId: string
  assignedAt: string
  status: AssignmentStatus
  statusUpdatedAt: string
}

export type ContactListEntry = {
  entryId: string
  assignmentId: string
  fullName: string
  addressLine1: string
  phone?: string
  priority: "high" | "normal"
  preferredChannel: OutreachChannel
  latitude?: number
  longitude?: number
  notes?: string
}

export type CanvassSession = {
  sessionId: string
  volunteerId: string
  assignmentId: string
  startedAt: string
  completedAt?: string
  attemptsLogged: number
}

export type Geography = {
  geographyId: string
  name: string
  regionCode: string
  districtName: string
  walkableHouseholds: number
  callableContacts: number
}

export type OutreachList = {
  listId: string
  title: string
  channel: OutreachChannel
  geographyId: string
  createdByOrganizerId: string
  createdAt: string
  totalTargets: number
}

export type OutreachAssignment = {
  assignmentId: string
  listId: string
  volunteerId: string
  assignedByOrganizerId: string
  assignedAt: string
  status: "assigned" | "in_progress" | "completed"
}

export type ContactAttempt = {
  attemptId: string
  assignmentId: string
  volunteerId: string
  contactRef: string
  attemptedAt: string
  outcomeId: string
  notes?: string
}

export type ContactOutcome = {
  outcomeId: string
  outcome: ContactOutcomeType
  requiresFollowUp: boolean
  dispositionCode: string
}
