export type NotificationSubscription = {
  endpoint: string
  userAgent?: string
  subscribedAt: string
}

const subscriptionStore = new Map<string, NotificationSubscription>()

export const notificationStore = {
  upsert(subscription: NotificationSubscription) {
    subscriptionStore.set(subscription.endpoint, subscription)
  },
  list() {
    return Array.from(subscriptionStore.values())
  },
}
