import { PollingStationHelper } from "@/components/advocacy/polling-station-helper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const pollingDistricts = [
  {
    id: "district-01",
    name: "North Ward",
    representative: "Rep. Asha Verma",
    pollingPlace: "North Ward Public Library, 102 River St.",
    openHours: "7:00 AM - 7:00 PM",
    requiredId: "Government photo ID or approved voter card",
  },
  {
    id: "district-02",
    name: "Central Constituency",
    representative: "Rep. Arjun Mehta",
    pollingPlace: "Central Civic Hall, 28 Main Ave.",
    openHours: "7:00 AM - 8:00 PM",
    requiredId: "Government photo ID",
  },
  {
    id: "district-03",
    name: "South River District",
    representative: "Rep. Priya Rao",
    pollingPlace: "South River School Gym, 51 Lake Rd.",
    openHours: "6:00 AM - 7:00 PM",
    requiredId: "Voter confirmation card + one supporting ID",
  },
]

export default function VoterInfoPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-24 md:px-8 lg:px-16">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold">Voter Information Hub</h1>
          <p className="text-muted-foreground">
            Check registration readiness, confirm district details, and locate your polling station before election day.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Registration helper</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>1. Confirm eligibility (citizenship, age, and local residency requirements).</p>
            <p>2. Verify your registration deadline (recommended: complete registration at least 30 days before election day).</p>
            <p>3. Ensure your legal name and address match your valid ID documents.</p>
            <p>4. Save your registration confirmation number for election-day reference.</p>
          </CardContent>
        </Card>

        <PollingStationHelper districts={pollingDistricts} />

        <Card>
          <CardHeader>
            <CardTitle>Data usage disclosure</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This helper is informational. If you submit advocacy forms, we collect only the data required to verify constituency and petition authenticity, prevent abuse, and send campaign-related political communication when consent is provided.
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
