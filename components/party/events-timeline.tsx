import { partyEvents } from "@/lib/party-updates"
import { Badge } from "@/components/ui/badge"

const formatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
})

export function EventsTimeline() {
  return (
    <section className="space-y-4" aria-labelledby="events-timeline-title">
      <h2 id="events-timeline-title" className="text-2xl font-semibold">
        Events Timeline
      </h2>
      <ol className="relative border-s ps-4 space-y-5">
        {partyEvents.map((event) => (
          <li key={event.id} className="ms-2 space-y-1">
            <span className="absolute -start-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{event.title}</h3>
              <Badge variant="secondary" className="capitalize">
                {event.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatter.format(new Date(event.starts_at))} • {event.location}
            </p>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
