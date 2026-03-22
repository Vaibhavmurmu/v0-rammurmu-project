"use client"

import { FormEvent, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type DonationProvider = "stripe" | "paypal"
type DonationTier = "grassroots_25" | "organizer_50" | "advocate_100" | "champion_250"

const tierOptions: Array<{ tier: DonationTier; label: string }> = [
  { tier: "grassroots_25", label: "$25 - Grassroots" },
  { tier: "organizer_50", label: "$50 - Organizer" },
  { tier: "advocate_100", label: "$100 - Advocate" },
  { tier: "champion_250", label: "$250 - Champion" },
]

export function DonationForm() {
  const [provider, setProvider] = useState<DonationProvider>("stripe")
  const [tier, setTier] = useState<DonationTier>("grassroots_25")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string>()

  const formDefaults = useMemo(
    () => ({
      legalName: "",
      email: "",
      line1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      occupation: "",
      employer: "",
      isUsCitizenOrPermanentResident: true,
    }),
    []
  )

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatusMessage(undefined)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    const donationPayload = {
      provider,
      tier,
      donorProfile: {
        legalName: formData.get("legalName"),
        email: formData.get("email"),
        line1: formData.get("line1"),
        city: formData.get("city"),
        state: formData.get("state"),
        postalCode: formData.get("postalCode"),
        country: formData.get("country"),
        occupation: formData.get("occupation"),
        employer: formData.get("employer"),
        isUsCitizenOrPermanentResident: formData.get("isUsCitizenOrPermanentResident") === "on",
      },
    }

    const response = await fetch("/api/donations/intents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-idempotency-key": crypto.randomUUID(),
      },
      body: JSON.stringify(donationPayload),
    })

    if (!response.ok) {
      setStatusMessage("Unable to create donation intent. Please verify your details and try again.")
      setIsSubmitting(false)
      return
    }

    const payload = (await response.json()) as { donationId: string; status: string }
    setStatusMessage(`Donation request created (${payload.donationId}) with status: ${payload.status}.`)
    setIsSubmitting(false)
    event.currentTarget.reset()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-xl border p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="provider">Payment provider</Label>
          <select
            id="provider"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            value={provider}
            onChange={(event) => setProvider(event.target.value as DonationProvider)}
          >
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tier">Contribution amount</Label>
          <select
            id="tier"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            value={tier}
            onChange={(event) => setTier(event.target.value as DonationTier)}
          >
            {tierOptions.map((option) => (
              <option key={option.tier} value={option.tier}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="legalName">Legal name</Label>
          <Input required id="legalName" name="legalName" defaultValue={formDefaults.legalName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Receipt email</Label>
          <Input required id="email" name="email" type="email" defaultValue={formDefaults.email} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="line1">Street address</Label>
          <Input required id="line1" name="line1" defaultValue={formDefaults.line1} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input required id="city" name="city" defaultValue={formDefaults.city} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input required id="state" name="state" defaultValue={formDefaults.state} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal code</Label>
          <Input required id="postalCode" name="postalCode" defaultValue={formDefaults.postalCode} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input required id="country" name="country" maxLength={2} defaultValue={formDefaults.country} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input required id="occupation" name="occupation" defaultValue={formDefaults.occupation} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employer">Employer</Label>
          <Input required id="employer" name="employer" defaultValue={formDefaults.employer} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          name="isUsCitizenOrPermanentResident"
          type="checkbox"
          defaultChecked={formDefaults.isUsCitizenOrPermanentResident}
          required
        />
        I confirm I am a U.S. citizen or lawful permanent resident.
      </label>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating donation intent..." : "Donate securely"}
      </Button>
      {statusMessage ? <p className="text-sm text-muted-foreground">{statusMessage}</p> : null}
    </form>
  )
}
