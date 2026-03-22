import type { Assignment } from "@/lib/volunteer/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type AssignmentBoardProps = {
  assignments: Assignment[]
}

export function AssignmentBoard({ assignments }: AssignmentBoardProps) {
  return (
    <section className="space-y-4" aria-labelledby="assignment-board-title">
      <h2 id="assignment-board-title" className="text-2xl font-semibold">Assignment board</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {assignments.map((assignment) => (
          <Card key={assignment.assignmentId}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">{assignment.title}</CardTitle>
                <Badge variant="secondary" className="capitalize">{assignment.channel}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              <p>Volunteer: {assignment.volunteerId}</p>
              <p>Geography: {assignment.geographyId}</p>
              <p>Status: <span className="capitalize">{assignment.status.replace("_", " ")}</span></p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
