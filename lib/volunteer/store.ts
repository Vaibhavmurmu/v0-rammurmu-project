import crypto from "node:crypto"
import type {
  ContactAttempt,
  ContactOutcome,
  Geography,
  OutreachAssignment,
  OutreachConsent,
  OutreachList,
  OutreachChannel,
  Volunteer,
  VolunteerRole,
} from "@/lib/volunteer/types"

const geographies = new Map<string, Geography>([
  [
    "geo_north_01",
    {
      geographyId: "geo_north_01",
      name: "North Ward",
      regionCode: "NW-01",
      districtName: "River District",
      walkableHouseholds: 420,
      callableContacts: 660,
    },
  ],
  [
    "geo_south_02",
    {
      geographyId: "geo_south_02",
      name: "South Market",
      regionCode: "SM-02",
      districtName: "Central District",
      walkableHouseholds: 310,
      callableContacts: 520,
    },
  ],
])

const volunteers = new Map<string, Volunteer>()
const outreachLists = new Map<string, OutreachList>()
const outreachAssignments = new Map<string, OutreachAssignment>()
const contactAttempts = new Map<string, ContactAttempt>()

const contactOutcomes = new Map<string, ContactOutcome>([
  ["outcome_1", { outcomeId: "outcome_1", outcome: "supporter_identified", requiresFollowUp: false, dispositionCode: "SUP" }],
  ["outcome_2", { outcomeId: "outcome_2", outcome: "follow_up_required", requiresFollowUp: true, dispositionCode: "FUP" }],
  ["outcome_3", { outcomeId: "outcome_3", outcome: "not_home", requiresFollowUp: true, dispositionCode: "NH" }],
  ["outcome_4", { outcomeId: "outcome_4", outcome: "wrong_number", requiresFollowUp: false, dispositionCode: "WN" }],
  ["outcome_5", { outcomeId: "outcome_5", outcome: "do_not_contact", requiresFollowUp: false, dispositionCode: "DNC" }],
])

export const volunteerStore = {
  createVolunteer(input: {
    fullName: string
    email: string
    phone: string
    role: VolunteerRole
    languagePreference: "en" | "hi"
    geographyId?: string
    consent: OutreachConsent
  }) {
    const volunteer: Volunteer = {
      volunteerId: `vol_${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
      ...input,
    }

    volunteers.set(volunteer.volunteerId, volunteer)
    return volunteer
  },

  listVolunteers() {
    return Array.from(volunteers.values())
  },

  listGeographies() {
    return Array.from(geographies.values())
  },

  createOutreachList(input: {
    title: string
    channel: OutreachChannel
    geographyId: string
    createdByOrganizerId: string
    totalTargets: number
  }) {
    const outreachList: OutreachList = {
      listId: `list_${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
      ...input,
    }

    outreachLists.set(outreachList.listId, outreachList)
    return outreachList
  },

  assignOutreachList(input: { listId: string; volunteerId: string; assignedByOrganizerId: string }) {
    const assignment: OutreachAssignment = {
      assignmentId: `asg_${crypto.randomUUID()}`,
      assignedAt: new Date().toISOString(),
      status: "assigned",
      ...input,
    }

    outreachAssignments.set(assignment.assignmentId, assignment)
    return assignment
  },

  listOutreachLists() {
    return Array.from(outreachLists.values())
  },

  listAssignments() {
    return Array.from(outreachAssignments.values())
  },

  recordAttempt(input: Omit<ContactAttempt, "attemptId" | "attemptedAt">) {
    const attempt: ContactAttempt = {
      attemptId: `att_${crypto.randomUUID()}`,
      attemptedAt: new Date().toISOString(),
      ...input,
    }

    contactAttempts.set(attempt.attemptId, attempt)
    return attempt
  },

  listAttempts() {
    return Array.from(contactAttempts.values())
  },

  listOutcomes() {
    return Array.from(contactOutcomes.values())
  },
}
