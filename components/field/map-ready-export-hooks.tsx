import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type MapReadyExportHooksProps = {
  assignmentCount: number
  contactCount: number
  exportedAt: string
}

export function MapReadyExportHooks({ assignmentCount, contactCount, exportedAt }: MapReadyExportHooksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Map-ready data export hooks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Latest export snapshot: {new Date(exportedAt).toLocaleString()}</p>
        <p>Assignment rows prepared: {assignmentCount}</p>
        <p>Contact rows prepared: {contactCount}</p>
        <p>Consume <code>/api/field/export</code> to integrate with GIS or route optimization tooling.</p>
      </CardContent>
    </Card>
  )
}
