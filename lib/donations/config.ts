export const DONATION_TIER_AMOUNTS_CENTS = {
  grassroots_25: 2500,
  organizer_50: 5000,
  advocate_100: 10000,
  champion_250: 25000,
} as const

export type DonationTier = keyof typeof DONATION_TIER_AMOUNTS_CENTS

export const ELECTION_CYCLE = "2026"
export const DEFAULT_CONTRIBUTION_LIMIT_CENTS = 330000
