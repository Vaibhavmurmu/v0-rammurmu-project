import crypto from "node:crypto"
import { encryptField, decryptField } from "@/lib/security/encryption"
import { captureEciDisclosure } from "@/lib/compliance/disclosures"

export type PetitionSignatureInput = {
  petitionId: string
  fullName: string
  email: string
  districtId: string
  message?: string
  consentToPoliticalCommunication: boolean
  acknowledgedDataUsage: boolean
}

type PetitionSignatureRecord = Omit<PetitionSignatureInput, "fullName" | "email" | "message"> & {
  fullName: string
  email: string
  message?: string
  signedAt: string
  signatureId: string
}

const signaturesByPetition = new Map<string, Map<string, PetitionSignatureRecord>>()
const requestHistory = new Map<string, number[]>()

const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function fingerprintRequest(input: Pick<PetitionSignatureInput, "email" | "districtId" | "petitionId">) {
  return `${normalizeEmail(input.email)}:${input.districtId}:${input.petitionId}`
}

function hashSignature(input: PetitionSignatureInput) {
  const payload = JSON.stringify({
    petitionId: input.petitionId,
    fullName: input.fullName.trim().toLowerCase(),
    email: normalizeEmail(input.email),
    districtId: input.districtId,
    message: input.message?.trim() ?? "",
    consentToPoliticalCommunication: input.consentToPoliticalCommunication,
    acknowledgedDataUsage: input.acknowledgedDataUsage,
  })

  return crypto.createHash("sha256").update(payload).digest("hex")
}

function isRateLimited(key: string) {
  const now = Date.now()
  const attempts = requestHistory.get(key) ?? []
  const recentAttempts = attempts.filter((attempt) => now - attempt < RATE_LIMIT_WINDOW_MS)

  if (recentAttempts.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestHistory.set(key, recentAttempts)
    return true
  }

  recentAttempts.push(now)
  requestHistory.set(key, recentAttempts)
  return false
}

export const advocacyStore = {
  registerSignature(input: PetitionSignatureInput) {
    const requestKey = fingerprintRequest(input)

    if (isRateLimited(requestKey)) {
      return {
        success: false as const,
        reason: "rate_limited" as const,
      }
    }

    const petitionSignatures = signaturesByPetition.get(input.petitionId) ?? new Map<string, PetitionSignatureRecord>()
    signaturesByPetition.set(input.petitionId, petitionSignatures)

    const emailKey = normalizeEmail(input.email)

    if (petitionSignatures.has(emailKey)) {
      return {
        success: false as const,
        reason: "duplicate" as const,
      }
    }

    const signatureId = hashSignature(input)
    const record: PetitionSignatureRecord = {
      ...input,
      fullName: encryptField(input.fullName),
      email: encryptField(emailKey),
      message: input.message ? encryptField(input.message) : undefined,
      signedAt: new Date().toISOString(),
      signatureId,
    }

    petitionSignatures.set(emailKey, record)

    captureEciDisclosure({
      submissionId: signatureId,
      donorName: input.fullName,
      donorAddress: input.districtId,
      donorNationality: "Indian",
      declarationAccepted: input.acknowledgedDataUsage,
    })

    return {
      success: true as const,
      signature: {
        ...record,
        fullName: decryptField(record.fullName),
        email: decryptField(record.email),
        message: record.message ? decryptField(record.message) : undefined,
      },
      totalSignatures: petitionSignatures.size,
    }
  },
}
