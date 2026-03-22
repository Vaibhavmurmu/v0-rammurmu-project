import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TaskBoardProps = {
  role: "supporter" | "organizer"
}

const supporterTasks = [
  { id: "s1", title: "Morning walk list", channel: "walk", status: "assigned", geo: "North Ward" },
  { id: "s2", title: "Evening phone bank", channel: "call", status: "in_progress", geo: "South Market" },
]

const organizerTasks = [
  { id: "o1", title: "Create weekend walk sheet", channel: "walk", status: "queued", geo: "North Ward" },
  { id: "o2", title: "Assign Hindi call list", channel: "call", status: "ready", geo: "South Market" },
]

export function TaskBoard({ role }: TaskBoardProps) {
  const tasks = role === "organizer" ? organizerTasks : supporterTasks

  return (
    <section className="space-y-4" aria-labelledby="volunteer-task-board-title">
      <h2 id="volunteer-task-board-title" className="text-2xl font-semibold">
        {role === "organizer" ? "Organizer Task Board" : "My Assignments"}
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">{task.title}</CardTitle>
                <Badge variant="secondary" className="capitalize">
                  {task.channel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              <p>Geography: {task.geo}</p>
              <p>Status: <span className="capitalize">{task.status.replace("_", " ")}</span></p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
