import Link from "next/link"
import type { Metadata } from "next"
import { PartyMission } from "@/components/party/mission"
import { PartyPolicies } from "@/components/party/policies"
import { PartyNewsUpdates } from "@/components/party/news-updates"
import { PartyEvents } from "@/components/party/events"
import { newBharatParty } from "@/lib/org/new-bharat-party"

const moduleCardClass =
  "rounded-xl border border-border/60 bg-card/70 p-6 shadow-sm transition-colors hover:border-primary/50"

export const metadata: Metadata = {
  title: `${newBharatParty.organizationName} | Official Platform`,
  description: `${newBharatParty.organizationName} is a ${newBharatParty.nonProfitDescriptor} founded by ${newBharatParty.founder} on ${newBharatParty.foundedDate}.`,
}

export default function Home() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-24 md:px-8 lg:px-16">
      <section id="home" className="mx-auto max-w-5xl space-y-4 py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{newBharatParty.organizationName}</p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Organization-First Participation Platform</h1>
        <p className="max-w-3xl text-muted-foreground">
          A single place for policy engagement, grassroots organizing, volunteer coordination, and public accountability.
          Built to support informed citizens and community-led change.
        </p>
        <div className="grid gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Founder</p>
            <p className="text-2xl font-semibold">{newBharatParty.founder}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Founded</p>
            <p className="text-2xl font-semibold">{newBharatParty.foundedDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Head Office</p>
            <p className="text-lg font-semibold">{newBharatParty.address}</p>
          </div>
        </div>
      </section>

      <PartyMission />
      <PartyPolicies />
      <PartyNewsUpdates />
      <PartyEvents />

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

        <article className={moduleCardClass}>
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
          <p className="mt-2 text-muted-foreground">Reach our team for partnerships, media requests, and collaboration.</p>
          <a
            href={`mailto:${newBharatParty.contactEmail}`}
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            {newBharatParty.contactEmail}
          </a>
        </div>
      </section>
    </main>
  )
}
