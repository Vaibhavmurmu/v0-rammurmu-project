import { NextResponse, type NextRequest } from "next/server"
import { getRoleFromHeaders, isMfaVerified, requiresMfa } from "@/lib/security/auth"
import type { AuthActor, Permission } from "@/lib/security/rbac"
import { requirePermission } from "@/lib/security/rbac"

export function getActorFromRequest(request: NextRequest): AuthActor | NextResponse {
  const role = getRoleFromHeaders(request)
  if (!role) {
    return NextResponse.json({ error: "missing or invalid x-user-role header" }, { status: 401 })
  }

  const actorId = request.headers.get("x-actor-id")
  if (!actorId) {
    return NextResponse.json({ error: "missing x-actor-id header" }, { status: 401 })
  }

  const mfaVerified = isMfaVerified(request)
  if (requiresMfa(role) && !mfaVerified) {
    return NextResponse.json({ error: "mfa verification required for this role" }, { status: 403 })
  }

  return {
    actorId,
    role,
    mfaVerified,
  }
}

export function requireApiPermission(actor: AuthActor, permission: Permission): NextResponse | null {
  try {
    requirePermission(actor, permission)
    return null
  } catch {
    return NextResponse.json({ error: "access denied" }, { status: 403 })
  }
}
