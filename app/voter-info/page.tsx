import { PartyVoterInfo } from "@/components/party/voter-info"

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

        <PartyVoterInfo />
      </section>
    </main>
  )
}
