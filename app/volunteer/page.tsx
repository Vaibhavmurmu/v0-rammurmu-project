import { FieldMap } from "@/components/party/field-map"
import { TaskBoard } from "@/components/party/task-board"
import { VolunteerSignup } from "@/components/party/volunteer-signup"
import { Badge } from "@/components/ui/badge"

type VolunteerPageProps = {
  searchParams?: {
    role?: string
  }
}

export default function VolunteerPage({ searchParams }: VolunteerPageProps) {
  const activeRole = searchParams?.role === "organizer" ? "organizer" : "supporter"

  return (
    <main className="min-h-screen px-4 pb-16 pt-24 md:px-8 lg:px-16">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">Volunteer Hub</h1>
            <Badge variant="outline" className="capitalize">{activeRole} flow</Badge>
          </div>
          <p className="text-muted-foreground">
            Join local field teams, complete walk or call assignments, and track outreach progress with consent-first
            communication workflows.
          </p>
        </div>

        <VolunteerSignup defaultRole={activeRole} />

        <TaskBoard role={activeRole} />

        {activeRole === "organizer" ? (
          <FieldMap />
        ) : (
          <p className="text-sm text-muted-foreground">
            Need organizer capabilities? Open
            {" "}
            <a className="underline" href="/volunteer?role=organizer">
              /volunteer?role=organizer
            </a>
            {" "}
            to create and assign walk/call lists.
          </p>
        )}
      </section>
    </main>
  )
}
