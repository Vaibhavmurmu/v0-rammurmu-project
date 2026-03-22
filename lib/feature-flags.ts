const envEnabled = (value?: string) => value === "1" || value?.toLowerCase() === "true"

export const featureFlags = {
  alertsEnabled: envEnabled(process.env.NEXT_PUBLIC_ENABLE_ALERTS),
  notificationFanoutEnabled: envEnabled(process.env.ENABLE_NOTIFICATION_FANOUT),
} as const
