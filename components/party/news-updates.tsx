import Link from "next/link"

const updates = [
  {
    title: "Ward volunteer onboarding expanded",
    date: "March 14, 2026",
    href: "/updates",
  },
  {
    title: "Policy listening sessions announced",
    date: "March 08, 2026",
    href: "/updates",
  },
  {
    title: "Community grievance desk launched",
    date: "March 02, 2026",
    href: "/updates",
  },
]

export function PartyNewsUpdates() {
  return (
    <section id="news-updates" className="mx-auto max-w-5xl py-10">
      <div className="rounded-xl border border-border/60 bg-card/70 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">News &amp; Updates</h2>
          <Link href="/updates" className="text-sm font-medium text-primary hover:underline">
            View all updates
          </Link>
        </div>
        <ul className="mt-4 space-y-3">
          {updates.map((update) => (
            <li key={update.title} className="rounded-lg border border-border/70 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{update.date}</p>
              <Link href={update.href} className="mt-1 inline-block font-medium hover:text-primary">
                {update.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
