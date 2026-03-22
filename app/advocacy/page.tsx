import { MessageTemplates } from "@/components/advocacy/message-templates"
import { PetitionForm } from "@/components/advocacy/petition-form"

const districtOptions = [
  { id: "district-01", name: "North Ward", representative: "Rep. Asha Verma" },
  { id: "district-02", name: "Central Constituency", representative: "Rep. Arjun Mehta" },
  { id: "district-03", name: "South River District", representative: "Rep. Priya Rao" },
]

export default function AdvocacyPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-24 md:px-8 lg:px-16">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold">Advocacy Actions</h1>
          <p className="text-muted-foreground">
            Contact your elected representatives and sign coordinated petitions with built-in authenticity checks and abuse prevention.
          </p>
        </header>

        <MessageTemplates districts={districtOptions} />

        <PetitionForm petitionId="secure-ballot-access-2026" districts={districtOptions} />
      </section>
    </main>
  )
}
