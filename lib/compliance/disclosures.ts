export type EciDisclosureInput = {
  submissionId: string
  donorName: string
  donorAddress: string
  donorNationality: string
  declarationAccepted: boolean
}

export type EciDisclosureRecord = EciDisclosureInput & {
  capturedAt: string
  status: "accepted" | "rejected"
}

const disclosureStore = new Map<string, EciDisclosureRecord>()

export function captureEciDisclosure(input: EciDisclosureInput) {
  const record: EciDisclosureRecord = {
    ...input,
    capturedAt: new Date().toISOString(),
    status: input.declarationAccepted ? "accepted" : "rejected",
  }

  disclosureStore.set(input.submissionId, record)
  return record
}

export function getEciDisclosure(submissionId: string) {
  return disclosureStore.get(submissionId)
}
