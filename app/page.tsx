import Link from "next/link"

const moduleCardClass =
  "rounded-xl border border-border/60 bg-card/70 p-6 shadow-sm transition-colors hover:border-primary/50"

export default function Home() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-24 md:px-8 lg:px-16">
      <section id="home" className="mx-auto max-w-5xl space-y-4 py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Party Hero</p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">People-First Movement for a Stronger Future</h1>
        <p className="max-w-3xl text-muted-foreground">
          Welcome to our organizing hub. Track voter registration momentum, volunteer in your area, support policy-driven
          action, and stay connected with campaign updates in one place.
        </p>
        <div className="grid gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Registered Supporters</p>
            <p className="text-2xl font-semibold">148,230</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">New This Week</p>
            <p className="text-2xl font-semibold">4,512</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Volunteer Districts Active</p>
            <p className="text-2xl font-semibold">62 / 75</p>
          </div>
        </div>
      </section>

      <section id="mission" className="mx-auto max-w-5xl py-10">
        <div className={moduleCardClass}>
          <h2 className="text-2xl font-semibold">Voter Engagement</h2>
          <p className="mt-2 text-muted-foreground">
            Get concise news updates, clear policy stances, and upcoming town halls to help voters make informed choices.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/updates" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
              Read latest updates
            </Link>
            <Link href="/voter-info" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
              View voter resources
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 py-10 md:grid-cols-2">
        <article className={moduleCardClass}>
          <h2 className="text-xl font-semibold">Volunteer &amp; Field Tools</h2>
          <p className="mt-2 text-muted-foreground">Coordinate canvassing, phone banking, and local outreach operations.</p>
          <Link href="/volunteer" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Open volunteer center
          </Link>
        </article>

        <article className={moduleCardClass}>
          <h2 className="text-xl font-semibold">Donation Portal</h2>
          <p className="mt-2 text-muted-foreground">
            Support transparent grassroots fundraising with secure recurring and one-time contributions.
          </p>
          <Link href="/donate" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Contribute now
          </Link>
        </article>

        <article className={moduleCardClass}>
          <h2 className="text-xl font-semibold">Advocacy Actions</h2>
          <p className="mt-2 text-muted-foreground">
            Join petitions, contact representatives, and mobilize around issue-based campaigns.
          </p>
          <Link href="/advocacy" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Take action
          </Link>
        </article>

        <article id="dashboard" className={moduleCardClass}>
          <h2 className="text-xl font-semibold">Analytics/Admin Access</h2>
          <p className="mt-2 text-muted-foreground">
            Review district performance, engagement funnels, donation trends, and campaign operations snapshots.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Admin dashboards are role-protected and monitored.</p>
        </article>
      </section>

      <section id="contact" className="mx-auto max-w-5xl py-10">
        <div className={moduleCardClass}>
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-2 text-muted-foreground">
            Reach our campaign team for partnerships, media requests, and community collaboration.
          </p>
          <a href="mailto:campaign@example.org" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            campaign@example.org
          </a>
        </div>
      </section>
    </main>
  )
}
