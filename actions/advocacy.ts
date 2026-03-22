"use server"

import { z } from "zod"

import { advocacyStore } from "@/lib/advocacy/store"

const petitionSchema = z.object({
  petitionId: z.string().min(3),
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  districtId: z.string().min(2, "Please select your district or constituency."),
  message: z.string().max(500, "Message cannot exceed 500 characters.").optional(),
  consentToPoliticalCommunication: z.boolean().refine(Boolean, {
    message: "Political communication consent is required.",
  }),
  acknowledgedDataUsage: z.boolean().refine(Boolean, {
    message: "You must acknowledge how your data is used.",
  }),
})

export async function submitPetitionSignature(formData: FormData) {
  try {
    const payload = {
      petitionId: (formData.get("petitionId") as string) ?? "",
      fullName: (formData.get("fullName") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      districtId: (formData.get("districtId") as string) ?? "",
      message: ((formData.get("message") as string) ?? "").trim() || undefined,
      consentToPoliticalCommunication: formData.get("consentToPoliticalCommunication") === "on",
      acknowledgedDataUsage: formData.get("acknowledgedDataUsage") === "on",
      website: (formData.get("website") as string) ?? "",
    }

    if (payload.website) {
      return {
        success: false,
        message: "Unable to verify this submission.",
      }
    }

    const validated = petitionSchema.parse(payload)
    const result = advocacyStore.registerSignature(validated)

    if (!result.success) {
      if (result.reason === "duplicate") {
        return {
          success: false,
          message: "This email has already signed this petition.",
        }
      }

      return {
        success: false,
        message: "Too many attempts. Please wait and try again.",
      }
    }

    return {
      success: true,
      message: "Signature verified and recorded. Thank you for taking action.",
      signatureId: result.signature.signatureId,
      totalSignatures: result.totalSignatures,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Please check your details and try again.",
        errors: error.issues.map((issue) => ({
          path: issue.path[0],
          message: issue.message,
        })),
      }
    }

    return {
      success: false,
      message: "Something went wrong while processing your signature.",
    }
  }
}
