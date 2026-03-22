const idempotencyStore = new Set<string>()

function composeScope(scope: string, key: string) {
  return `${scope}:${key}`
}

export const idempotency = {
  isDuplicate(scope: string, key: string) {
    return idempotencyStore.has(composeScope(scope, key))
  },
  register(scope: string, key: string) {
    idempotencyStore.add(composeScope(scope, key))
  },
}
