import { AssignmentBoard } from "@/components/field/assignment-board"
import { CallWalkListViewer } from "@/components/field/call-walk-list-viewer"
import { MapReadyExportHooks } from "@/components/field/map-ready-export-hooks"
import { TaskStatusUpdates } from "@/components/field/task-status-updates"
import { volunteerStore } from "@/lib/volunteer/store"

export default function FieldAdminPage() {
  const assignments = volunteerStore.listAssignments()
  const entries = volunteerStore.listContactListEntries()
  const exportBundle = volunteerStore.getMapReadyExportData()

  return (
    <main className="min-h-screen px-4 pb-16 pt-24 md:px-8 lg:px-16">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Field Admin Console</h1>
          <p className="text-muted-foreground">
            Manage assignment orchestration, inspect live status updates, and export map-ready field data.
          </p>
        </div>

        <AssignmentBoard assignments={assignments} />
        <TaskStatusUpdates assignments={assignments} />
        <CallWalkListViewer entries={entries} />
        <MapReadyExportHooks
          assignmentCount={exportBundle.assignmentRows.length}
          contactCount={exportBundle.contactRows.length}
          exportedAt={exportBundle.exportedAt}
        />
      </section>
    </main>
  )
}
