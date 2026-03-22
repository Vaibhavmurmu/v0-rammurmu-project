import { newBharatParty } from "@/lib/org/new-bharat-party"

export function PartyMission() {
  return (
    <section id="mission" className="mx-auto max-w-5xl py-10">
      <div className="rounded-xl border border-border/60 bg-card/70 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Mission</p>
        <h2 className="mt-2 text-2xl font-semibold">{newBharatParty.nonProfitDescriptor}</h2>
        <p className="mt-3 text-muted-foreground">{newBharatParty.missionStatement}</p>
      </div>
    </section>
  )
}
