export const DONATION_STATUSES = ["initiated", "authorized", "captured", "failed", "refunded"] as const

export type DonationStatus = (typeof DONATION_STATUSES)[number]

export type DonationProvider = "stripe" | "paypal"

export type DonorRegulatoryProfile = {
  legalName: string
  email: string
  line1: string
  city: string
  state: string
  postalCode: string
  country: string
  occupation: string
  employer: string
  isUsCitizenOrPermanentResident: boolean
}

export type ContributionLimitTracking = {
  electionCycle: string
  cycleContributionLimitCents: number
  aggregateContributionCents: number
  remainingContributionCents: number
  exceedsLimit: boolean
}

export type DonationIntent = {
  donationId: string
  provider: DonationProvider
  providerIntentId: string
  amountCents: number
  currency: "USD"
  receiptEmail: string
  createdAt: string
}

export type DonationLedgerRecord = {
  ledgerId: string
  donationId: string
  sequence: number
  status: DonationStatus
  provider: DonationProvider
  providerIntentId?: string
  amountCents: number
  currency: "USD"
  reason?: string
  eventAt: string
  receiptEmail: string
  receiptId: string
  donorProfile: DonorRegulatoryProfile
  contributionLimitTracking: ContributionLimitTracking
}
