const upcomingEvents = [
  {
    title: "Public town hall - Bokaro",
    date: "April 12, 2026",
    location: "Sector 4 Community Hall",
  },
  {
    title: "Volunteer field strategy workshop",
    date: "April 18, 2026",
    location: "District Training Center",
  },
  {
    title: "Youth civic participation forum",
    date: "April 24, 2026",
    location: "Bokaro Industrial Area",
  },
]

export function PartyEvents() {
  return (
    <section id="events" className="mx-auto max-w-5xl py-10">
      <div className="rounded-xl border border-border/60 bg-card/70 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Events</h2>
        <div className="mt-4 space-y-3">
          {upcomingEvents.map((event) => (
            <article key={event.title} className="rounded-lg border border-border/70 p-4">
              <h3 className="font-semibold">{event.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {event.date} • {event.location}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
