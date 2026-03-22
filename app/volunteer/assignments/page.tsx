import { AssignmentBoard } from "@/components/field/assignment-board"
import { TaskStatusUpdates } from "@/components/field/task-status-updates"
import { volunteerStore } from "@/lib/volunteer/store"

export default function VolunteerAssignmentsPage() {
  const assignments = volunteerStore.listAssignments()

  return (
    <main className="min-h-screen px-4 pb-16 pt-24 md:px-8 lg:px-16">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Volunteer Assignments</h1>
          <p className="text-muted-foreground">
            View your active assignment board and monitor task status updates in real time.
          </p>
        </div>

        <AssignmentBoard assignments={assignments} />
        <TaskStatusUpdates assignments={assignments} />
      </section>
    </main>
  )
}
