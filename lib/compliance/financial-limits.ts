export type FinancialFlag = {
  donationId: string
  triggeredAt: string
  reason: "exceeds_cycle_limit" | "high_velocity"
  amountCents: number
}

const financialFlags: FinancialFlag[] = []

export function evaluateFinancialLimits(input: {
  donationId: string
  amountCents: number
  aggregateContributionCents: number
  cycleContributionLimitCents: number
}) {
  const flags: FinancialFlag[] = []

  if (input.aggregateContributionCents > input.cycleContributionLimitCents) {
    flags.push({
      donationId: input.donationId,
      triggeredAt: new Date().toISOString(),
      reason: "exceeds_cycle_limit",
      amountCents: input.amountCents,
    })
  }

  if (input.amountCents >= 250000) {
    flags.push({
      donationId: input.donationId,
      triggeredAt: new Date().toISOString(),
      reason: "high_velocity",
      amountCents: input.amountCents,
    })
  }

  financialFlags.push(...flags)
  return flags
}

export function listFinancialFlags() {
  return [...financialFlags]
}
