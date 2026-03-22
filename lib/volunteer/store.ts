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
import { encryptField, decryptField } from "@/lib/security/encryption"
import { requirePermission, type AuthActor } from "@/lib/security/rbac"

type StoredVolunteer = Omit<Volunteer, "fullName" | "email" | "phone"> & {
  fullName: string
  email: string
  phone: string
}

type StoredContactAttempt = Omit<ContactAttempt, "contactRef" | "notes"> & {
  contactRef: string
  notes?: string
}

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

const volunteers = new Map<string, StoredVolunteer>()
const outreachLists = new Map<string, OutreachList>()
const outreachAssignments = new Map<string, OutreachAssignment>()
const contactAttempts = new Map<string, StoredContactAttempt>()

const contactOutcomes = new Map<string, ContactOutcome>([
  ["outcome_1", { outcomeId: "outcome_1", outcome: "supporter_identified", requiresFollowUp: false, dispositionCode: "SUP" }],
  ["outcome_2", { outcomeId: "outcome_2", outcome: "follow_up_required", requiresFollowUp: true, dispositionCode: "FUP" }],
  ["outcome_3", { outcomeId: "outcome_3", outcome: "not_home", requiresFollowUp: true, dispositionCode: "NH" }],
  ["outcome_4", { outcomeId: "outcome_4", outcome: "wrong_number", requiresFollowUp: false, dispositionCode: "WN" }],
  ["outcome_5", { outcomeId: "outcome_5", outcome: "do_not_contact", requiresFollowUp: false, dispositionCode: "DNC" }],
])

function decryptVolunteer(volunteer: StoredVolunteer): Volunteer {
  return {
    ...volunteer,
    fullName: decryptField(volunteer.fullName),
    email: decryptField(volunteer.email),
    phone: decryptField(volunteer.phone),
  }
}

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
    const volunteer: StoredVolunteer = {
      volunteerId: `vol_${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
      ...input,
      fullName: encryptField(input.fullName),
      email: encryptField(input.email),
      phone: encryptField(input.phone),
    }

    volunteers.set(volunteer.volunteerId, volunteer)
    return decryptVolunteer(volunteer)
  },

  listVolunteers() {
    return Array.from(volunteers.values()).map(decryptVolunteer)
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

  createOutreachListAs(actor: AuthActor, input: {
    title: string
    channel: OutreachChannel
    geographyId: string
    createdByOrganizerId: string
    totalTargets: number
  }) {
    requirePermission(actor, "volunteers:manage")
    return this.createOutreachList(input)
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
    const attempt: StoredContactAttempt = {
      attemptId: `att_${crypto.randomUUID()}`,
      attemptedAt: new Date().toISOString(),
      ...input,
      contactRef: encryptField(input.contactRef),
      notes: input.notes ? encryptField(input.notes) : undefined,
    }

    contactAttempts.set(attempt.attemptId, attempt)

    return {
      ...attempt,
      contactRef: decryptField(attempt.contactRef),
      notes: attempt.notes ? decryptField(attempt.notes) : undefined,
    }
  },

  listAttempts() {
    return Array.from(contactAttempts.values()).map((attempt) => ({
      ...attempt,
      contactRef: decryptField(attempt.contactRef),
      notes: attempt.notes ? decryptField(attempt.notes) : undefined,
    }))
  },

  listOutcomes() {
    return Array.from(contactOutcomes.values())
  },
}
