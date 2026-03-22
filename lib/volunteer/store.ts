import crypto from "node:crypto"
import type {
  Assignment,
  AssignmentStatus,
  CanvassSession,
  ContactAttempt,
  ContactListEntry,
  ContactOutcome,
  Geography,
  OutreachAssignment,
  OutreachConsent,
  OutreachList,
  OutreachChannel,
  Volunteer,
  VolunteerRole,
  VolunteerStatus,
} from "@/lib/volunteer/types"
import { encryptField, decryptField } from "@/lib/security/encryption"
import { requirePermission, type AuthActor } from "@/lib/security/rbac"
import { recordAuditEvent } from "@/lib/compliance/audit-trail"

type StoredVolunteer = Omit<Volunteer, "fullName" | "email" | "phone"> & {
  fullName: string
  email: string
  phone: string
}

type StoredContactAttempt = Omit<ContactAttempt, "contactRef" | "notes"> & {
  contactRef: string
  notes?: string
}

type StoredContactListEntry = Omit<ContactListEntry, "fullName" | "addressLine1" | "phone" | "notes"> & {
  fullName: string
  addressLine1: string
  phone?: string
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
const assignments = new Map<string, Assignment>()
const contactAttempts = new Map<string, StoredContactAttempt>()
const contactListEntries = new Map<string, StoredContactListEntry>()
const canvassSessions = new Map<string, CanvassSession>()

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

function decryptContactListEntry(entry: StoredContactListEntry): ContactListEntry {
  return {
    ...entry,
    fullName: decryptField(entry.fullName),
    addressLine1: decryptField(entry.addressLine1),
    phone: entry.phone ? decryptField(entry.phone) : undefined,
    notes: entry.notes ? decryptField(entry.notes) : undefined,
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
      status: "active",
      ...input,
      fullName: encryptField(input.fullName),
      email: encryptField(input.email),
      phone: encryptField(input.phone),
    }

    volunteers.set(volunteer.volunteerId, volunteer)
    return decryptVolunteer(volunteer)
  },

  updateVolunteerStatus(actor: AuthActor, input: { volunteerId: string; status: VolunteerStatus }) {
    requirePermission(actor, "volunteers:manage")
    const volunteer = volunteers.get(input.volunteerId)
    if (!volunteer) {
      throw new Error("volunteer_not_found")
    }

    volunteer.status = input.status
    volunteers.set(volunteer.volunteerId, volunteer)

    recordAuditEvent({
      eventType: "volunteer.status_changed",
      actorId: actor.actorId,
      details: { volunteerId: input.volunteerId, status: input.status },
    })

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

  createOutreachListAs(
    actor: AuthActor,
    input: {
      title: string
      channel: OutreachChannel
      geographyId: string
      createdByOrganizerId: string
      totalTargets: number
    },
  ) {
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

  createAssignment(actor: AuthActor, input: {
    volunteerId: string
    geographyId: string
    title: string
    channel: OutreachChannel
  }) {
    requirePermission(actor, "volunteers:manage")

    const assignment: Assignment = {
      assignmentId: `asg_${crypto.randomUUID()}`,
      assignedAt: new Date().toISOString(),
      statusUpdatedAt: new Date().toISOString(),
      assignedByOrganizerId: actor.actorId,
      status: "assigned",
      ...input,
    }

    assignments.set(assignment.assignmentId, assignment)

    recordAuditEvent({
      eventType: "assignment.created",
      actorId: actor.actorId,
      details: {
        assignmentId: assignment.assignmentId,
        volunteerId: assignment.volunteerId,
        channel: assignment.channel,
        geographyId: assignment.geographyId,
      },
    })

    return assignment
  },

  updateAssignmentStatus(actor: AuthActor, input: { assignmentId: string; status: AssignmentStatus }) {
    requirePermission(actor, "volunteers:manage")
    const assignment = assignments.get(input.assignmentId)
    if (!assignment) {
      throw new Error("assignment_not_found")
    }

    assignment.status = input.status
    assignment.statusUpdatedAt = new Date().toISOString()
    assignments.set(assignment.assignmentId, assignment)

    recordAuditEvent({
      eventType: "assignment.status_changed",
      actorId: actor.actorId,
      details: {
        assignmentId: assignment.assignmentId,
        volunteerId: assignment.volunteerId,
        status: assignment.status,
      },
    })

    return assignment
  },

  listOutreachLists() {
    return Array.from(outreachLists.values())
  },

  listAssignments() {
    return Array.from(assignments.values())
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

  createContactListEntry(actor: AuthActor, input: Omit<ContactListEntry, "entryId">) {
    requirePermission(actor, "volunteers:manage")

    const entry: StoredContactListEntry = {
      entryId: `cle_${crypto.randomUUID()}`,
      ...input,
      fullName: encryptField(input.fullName),
      addressLine1: encryptField(input.addressLine1),
      phone: input.phone ? encryptField(input.phone) : undefined,
      notes: input.notes ? encryptField(input.notes) : undefined,
    }

    contactListEntries.set(entry.entryId, entry)
    return decryptContactListEntry(entry)
  },

  listContactListEntries(assignmentId?: string) {
    const entries = Array.from(contactListEntries.values())
    const filteredEntries = assignmentId ? entries.filter((entry) => entry.assignmentId === assignmentId) : entries
    return filteredEntries.map(decryptContactListEntry)
  },

  startCanvassSession(actor: AuthActor, input: { assignmentId: string; volunteerId: string }) {
    requirePermission(actor, "campaign:access")

    const session: CanvassSession = {
      sessionId: `session_${crypto.randomUUID()}`,
      assignmentId: input.assignmentId,
      volunteerId: input.volunteerId,
      startedAt: new Date().toISOString(),
      attemptsLogged: 0,
    }

    canvassSessions.set(session.sessionId, session)
    return session
  },

  completeCanvassSession(actor: AuthActor, input: { sessionId: string; attemptsLogged: number }) {
    requirePermission(actor, "campaign:access")
    const session = canvassSessions.get(input.sessionId)
    if (!session) {
      throw new Error("session_not_found")
    }

    session.completedAt = new Date().toISOString()
    session.attemptsLogged = input.attemptsLogged
    canvassSessions.set(session.sessionId, session)
    return session
  },

  listCanvassSessions(volunteerId?: string) {
    const sessions = Array.from(canvassSessions.values())
    return volunteerId ? sessions.filter((session) => session.volunteerId === volunteerId) : sessions
  },

  getMapReadyExportData() {
    const assignmentRows = this.listAssignments().map((assignment) => ({
      assignmentId: assignment.assignmentId,
      status: assignment.status,
      geographyId: assignment.geographyId,
      channel: assignment.channel,
    }))

    const contactRows = this.listContactListEntries().map((entry) => ({
      entryId: entry.entryId,
      assignmentId: entry.assignmentId,
      latitude: entry.latitude,
      longitude: entry.longitude,
      preferredChannel: entry.preferredChannel,
      priority: entry.priority,
    }))

    return {
      exportedAt: new Date().toISOString(),
      assignmentRows,
      contactRows,
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
