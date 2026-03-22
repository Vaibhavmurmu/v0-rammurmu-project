export type SecurityEventType =
  | "auth_denied"
  | "mfa_required"
  | "tls_rejected"
  | "rbac_denied"
  | "compliance_flag"
  | "content_flagged"

export type SecurityEvent = {
  eventType: SecurityEventType
  actorId?: string
  route?: string
  message: string
  timestamp: string
  context?: Record<string, string | number | boolean>
}

const securityEvents: SecurityEvent[] = []

export function logSecurityEvent(event: Omit<SecurityEvent, "timestamp">) {
  const record: SecurityEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  }

  securityEvents.push(record)

  // Intentionally structured log output for SIEM ingestion.
  console.warn("security_event", JSON.stringify(record))
}

export function listSecurityEvents() {
  return [...securityEvents]
}
