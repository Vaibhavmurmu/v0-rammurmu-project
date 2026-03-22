import { NextResponse, type NextRequest } from "next/server"
import { getActorFromRequest, requireApiPermission } from "@/lib/security/api-guards"
import { volunteerStore } from "@/lib/volunteer/store"

export async function GET(request: NextRequest) {
  const actor = getActorFromRequest(request)
  if (actor instanceof NextResponse) {
    return actor
  }

  const permissionError = requireApiPermission(actor, "compliance:read")
  if (permissionError) {
    return permissionError
  }

  return NextResponse.json({ exportBundle: volunteerStore.getMapReadyExportData() })
}
