import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getRoleFromHeaders, isMfaVerified, isTlsRequest, requiresMfa } from "@/lib/security/auth"
import { logSecurityEvent } from "@/lib/security/logging"

const PROTECTED_PATHS = ["/admin", "/campaign-staff"]

export function middleware(req: NextRequest) {
  const isProtectedPath = PROTECTED_PATHS.some((path) => req.nextUrl.pathname.startsWith(path))

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  if (!isTlsRequest(req)) {
    logSecurityEvent({
      eventType: "tls_rejected",
      route: req.nextUrl.pathname,
      message: "Blocked non-TLS request to protected route.",
    })

    return new NextResponse("TLS is required.", { status: 426 })
  }

  const role = getRoleFromHeaders(req)
  if (!role) {
    logSecurityEvent({
      eventType: "auth_denied",
      route: req.nextUrl.pathname,
      message: "Missing role header for protected route.",
    })

    return new NextResponse("Authentication required.", { status: 401 })
  }

  if (requiresMfa(role) && !isMfaVerified(req)) {
    logSecurityEvent({
      eventType: "mfa_required",
      route: req.nextUrl.pathname,
      message: "MFA verification is required for this route.",
      context: { role },
    })

    return new NextResponse("MFA verification required.", { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/campaign-staff/:path*"],
}
