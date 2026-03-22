export type AppRole =
  | "super_admin"
  | "campaign_staff"
  | "volunteer_coordinator"
  | "finance_admin"
  | "content_moderator"

export type Permission =
  | "campaign:access"
  | "admin:access"
  | "volunteers:manage"
  | "donations:manage"
  | "content:moderate"
  | "compliance:read"
  | "audit:export"

const ROLE_PERMISSIONS: Record<AppRole, Permission[]> = {
  super_admin: [
    "campaign:access",
    "admin:access",
    "volunteers:manage",
    "donations:manage",
    "content:moderate",
    "compliance:read",
    "audit:export",
  ],
  campaign_staff: ["campaign:access", "compliance:read"],
  volunteer_coordinator: ["campaign:access", "volunteers:manage", "compliance:read"],
  finance_admin: ["campaign:access", "donations:manage", "compliance:read", "audit:export"],
  content_moderator: ["campaign:access", "content:moderate", "compliance:read"],
}

export type AuthActor = {
  actorId: string
  role: AppRole
  mfaVerified: boolean
}

export function hasPermission(role: AppRole, permission: Permission) {
  return ROLE_PERMISSIONS[role].includes(permission)
}

export function requirePermission(actor: AuthActor, permission: Permission) {
  if (!hasPermission(actor.role, permission)) {
    throw new Error(`access_denied:${actor.role}:${permission}`)
  }
}
