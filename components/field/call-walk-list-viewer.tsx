import type { ContactListEntry } from "@/lib/volunteer/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CallWalkListViewerProps = {
  entries: ContactListEntry[]
}

export function CallWalkListViewer({ entries }: CallWalkListViewerProps) {
  return (
    <section className="space-y-4" aria-labelledby="call-walk-list-viewer-title">
      <h2 id="call-walk-list-viewer-title" className="text-2xl font-semibold">Call/walk list viewer</h2>
      <div className="space-y-3">
        {entries.map((entry) => (
          <Card key={entry.entryId}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">{entry.fullName}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="capitalize">{entry.preferredChannel}</Badge>
                  <Badge>{entry.priority}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              <p>Address: {entry.addressLine1}</p>
              {entry.phone ? <p>Phone: {entry.phone}</p> : null}
              {entry.notes ? <p>Notes: {entry.notes}</p> : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
