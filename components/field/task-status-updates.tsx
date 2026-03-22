import type { Assignment } from "@/lib/volunteer/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TaskStatusUpdatesProps = {
  assignments: Assignment[]
}

export function TaskStatusUpdates({ assignments }: TaskStatusUpdatesProps) {
  const orderedUpdates = [...assignments].sort((a, b) => b.statusUpdatedAt.localeCompare(a.statusUpdatedAt))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task status updates</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {orderedUpdates.map((assignment) => (
            <li key={assignment.assignmentId}>
              <span className="font-medium text-foreground">{assignment.title}</span>
              {" "}
              moved to
              {" "}
              <span className="capitalize">{assignment.status.replace("_", " ")}</span>
              {" "}
              at
              {" "}
              {new Date(assignment.statusUpdatedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
