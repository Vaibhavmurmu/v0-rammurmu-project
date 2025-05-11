"use server"

import { z } from "zod"

// Form validation schema
const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  company: z.string().min(2, "Company must be at least 2 characters"),
  testimonial: z.string().min(20, "Testimonial must be at least 20 characters"),
  rating: z.number().min(1).max(5),
})

type TestimonialFormData = z.infer<typeof testimonialSchema>

export async function submitTestimonial(formData: FormData) {
  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1500))

  try {
    // Extract form data
    const data = {
      name: formData.get("name") as string,
      position: formData.get("position") as string,
      company: formData.get("company") as string,
      testimonial: formData.get("testimonial") as string,
      rating: Number.parseInt(formData.get("rating") as string, 10),
    }

    // Validate form data
    const validatedData = testimonialSchema.parse(data)

    // In a real application, you would:
    // 1. Store the testimonial in a database
    // 2. Send a notification to the admin for approval
    // 3. Send a confirmation email to the user

    console.log("Testimonial submission:", validatedData)

    // For demonstration, we'll just return success
    return {
      success: true,
      message: "Your testimonial has been submitted successfully! It will be reviewed and added to the website soon.",
    }
  } catch (error) {
    console.error("Testimonial submission error:", error)

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
