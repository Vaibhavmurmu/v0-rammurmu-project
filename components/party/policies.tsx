const policyPillars = [
  {
    title: "Transparent Governance",
    description: "Public-first disclosure standards, participatory budgeting, and measurable delivery dashboards.",
  },
  {
    title: "Local Livelihoods",
    description: "District-level jobs, MSME growth, and skill development with rural-urban economic bridges.",
  },
  {
    title: "Inclusive Public Services",
    description: "Reliable healthcare, modern schools, safe infrastructure, and digital public access for all.",
  },
]

export function PartyPolicies() {
  return (
    <section id="policies" className="mx-auto max-w-5xl py-10">
      <div className="rounded-xl border border-border/60 bg-card/70 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Policy Pillars</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {policyPillars.map((pillar) => (
            <article key={pillar.title} className="rounded-lg border border-border/70 p-4">
              <h3 className="font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
