import { DonationForm } from "@/components/party/donation-form"

export default function DonatePage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-24 md:px-8 lg:px-16">
      <section className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-bold">Donation Portal</h1>
        <p className="text-muted-foreground">
          Support organizing, voter outreach, and policy advocacy through secure and transparent contributions.
        </p>
        <p className="text-sm text-muted-foreground">
          All donation amounts are resolved on the server from approved contribution tiers. Receipts and election-cycle
          contribution limits are tracked automatically for compliance.
        </p>
        <DonationForm />
      </section>
    </main>
  )
}
