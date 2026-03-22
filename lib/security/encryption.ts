import crypto from "node:crypto"

const IV_BYTES = 12
const ALGORITHM = "aes-256-gcm"

function getKey() {
  const keyMaterial = process.env.PII_ENCRYPTION_KEY
  if (!keyMaterial) {
    return crypto.createHash("sha256").update("dev-only-fallback-key-change-me").digest()
  }

  return crypto.createHash("sha256").update(keyMaterial).digest()
}

export function encryptField(value: string): string {
  const iv = crypto.randomBytes(IV_BYTES)
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv)

  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()])
  const tag = cipher.getAuthTag()

  return `${iv.toString("base64")}.${tag.toString("base64")}.${encrypted.toString("base64")}`
}

export function decryptField(payload: string): string {
  const [ivB64, tagB64, encryptedB64] = payload.split(".")
  if (!ivB64 || !tagB64 || !encryptedB64) {
    throw new Error("invalid_encrypted_payload")
  }

  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), Buffer.from(ivB64, "base64"))
  decipher.setAuthTag(Buffer.from(tagB64, "base64"))

  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedB64, "base64")), decipher.final()])
  return decrypted.toString("utf8")
}
