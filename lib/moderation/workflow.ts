import { requirePermission, type AuthActor } from "@/lib/security/rbac"
import { logSecurityEvent } from "@/lib/security/logging"

export type ModerationStatus = "pending_review" | "approved" | "rejected"

export type ModerationSubmission = {
  submissionId: string
  contentType: "news_update" | "comment"
  body: string
  submittedBy: string
  submittedAt: string
  status: ModerationStatus
  moderationReason?: string
}

const BLOCKLIST_TERMS = ["hate", "defamation", "obscene"]
const moderationQueue = new Map<string, ModerationSubmission>()

export function submitForModeration(input: Omit<ModerationSubmission, "status" | "submittedAt">) {
  const normalized = input.body.toLowerCase()
  const blockedTerm = BLOCKLIST_TERMS.find((term) => normalized.includes(term))

  const submission: ModerationSubmission = {
    ...input,
    submittedAt: new Date().toISOString(),
    status: blockedTerm ? "rejected" : "pending_review",
    moderationReason: blockedTerm ? `blocked_term:${blockedTerm}` : undefined,
  }

  moderationQueue.set(input.submissionId, submission)

  if (blockedTerm) {
    logSecurityEvent({
      eventType: "content_flagged",
      actorId: input.submittedBy,
      message: "User-generated content blocked before publication.",
      context: { blockedTerm, submissionId: input.submissionId },
    })
  }

  return submission
}

export function moderateSubmission(actor: AuthActor, input: { submissionId: string; approve: boolean; reason?: string }) {
  requirePermission(actor, "content:moderate")

  const existing = moderationQueue.get(input.submissionId)
  if (!existing) {
    throw new Error("moderation_submission_not_found")
  }

  const updated: ModerationSubmission = {
    ...existing,
    status: input.approve ? "approved" : "rejected",
    moderationReason: input.reason,
  }

  moderationQueue.set(updated.submissionId, updated)
  return updated
}

export function listModerationQueue() {
  return Array.from(moderationQueue.values())
}
