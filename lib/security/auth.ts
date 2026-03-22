import type { NextRequest } from "next/server"
import type { AppRole } from "@/lib/security/rbac"

const MFA_REQUIRED_ROLES: AppRole[] = ["super_admin", "campaign_staff"]

export function getRoleFromHeaders(req: NextRequest): AppRole | null {
  const value = req.headers.get("x-user-role")
  if (!value) {
    return null
  }

  const supportedRoles: AppRole[] = [
    "super_admin",
    "campaign_staff",
    "volunteer_coordinator",
    "finance_admin",
    "content_moderator",
  ]

  return supportedRoles.includes(value as AppRole) ? (value as AppRole) : null
}

export function requiresMfa(role: AppRole) {
  return MFA_REQUIRED_ROLES.includes(role)
}

export function isMfaVerified(req: NextRequest) {
  return req.headers.get("x-mfa-verified") === "true"
}

export function isTlsRequest(req: NextRequest) {
  const forwardedProto = req.headers.get("x-forwarded-proto")
  if (forwardedProto) {
    return forwardedProto === "https"
  }

  return req.nextUrl.protocol === "https:"
}
