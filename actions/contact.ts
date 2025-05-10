"use server"

import { z } from "zod"

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024

// Allowed file types
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/gif",
]

export async function submitContactForm(formData: FormData) {
  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1500))

  try {
    // Extract form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Validate form data
    const validatedData = contactSchema.parse(data)

    // Handle file upload if present
    const file = formData.get("file") as File | null
    let fileInfo = null

    if (file && file.size > 0) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return {
          success: false,
          message: "File size exceeds the maximum limit of 5MB.",
        }
      }

      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return {
          success: false,
          message: "File type not allowed. Please upload PDF, Word, or image files.",
        }
      }

      // In a real application, you would:
      // 1. Upload the file to a storage service (e.g., AWS S3, Cloudinary)
      // 2. Get the file URL
      // 3. Store the file reference in your database

      fileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
      }

      console.log("File uploaded:", fileInfo)
    }

    // In a real application, you would:
    // 1. Store the submission in a database
    // 2. Send an email notification
    // 3. Set up an auto-responder

    console.log("Form submission:", { ...validatedData, fileInfo })

    // For demonstration, we'll just return success
    return {
      success: true,
      message: "Your message has been sent successfully! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Form submission error:", error)

    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        message: "Please check your form inputs.",
        errors: error.errors.map((err) => ({
          path: err.path[0],
          message: err.message,
        })),
      }
    }

    // Return generic error
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
