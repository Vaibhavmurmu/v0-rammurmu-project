import crypto from "node:crypto"
import { requirePermission, type AuthActor } from "@/lib/security/rbac"

export type AuditEvent = {
  auditId: string
  eventType: string
  actorId: string
  timestamp: string
  details: Record<string, string | number | boolean>
}

const auditTrail: AuditEvent[] = []

export function recordAuditEvent(event: Omit<AuditEvent, "auditId" | "timestamp">) {
  const record: AuditEvent = {
    ...event,
    auditId: `audit_${crypto.randomUUID()}`,
    timestamp: new Date().toISOString(),
  }

  auditTrail.push(record)
  return record
}

export function exportAuditTrail(actor: AuthActor) {
  requirePermission(actor, "audit:export")
  return JSON.stringify(auditTrail, null, 2)
}
