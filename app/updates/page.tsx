import { EventsTimeline } from "@/components/party/events-timeline"
import { NewsFeed } from "@/components/party/news-feed"
import { PolicyStanceList } from "@/components/party/policy-stance-list"
import { PushAlertsRegistration } from "@/components/party/push-alerts-registration"
import { featureFlags } from "@/lib/feature-flags"

export default function UpdatesPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-24 md:px-8 lg:px-16">
      <section className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-bold">Campaign Updates</h1>
        <p className="text-muted-foreground">
          Stay current on policy announcements, district tours, press releases, and important movement milestones.
        </p>
      </section>

      <section className="mx-auto mt-8 max-w-4xl space-y-10">
        <PushAlertsRegistration alertsEnabled={featureFlags.alertsEnabled} />
        <NewsFeed />
        <PolicyStanceList />
        <EventsTimeline />
      </section>
    </main>
  )
}
