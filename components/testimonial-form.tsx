"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Send, CheckCircle, AlertCircle, Star } from "lucide-react"
import { submitTestimonial } from "@/actions/testimonial"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from "@/context/language-context"

type FormState = {
  errors: {
    path: string | number
    message: string
  }[]
  success: boolean
  message: string
}

export default function TestimonialForm() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<FormState | null>(null)
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    const formData = new FormData(e.currentTarget)
    const response = await submitTestimonial(formData)

    setFormState(response as FormState)
    setIsSubmitting(false)

    if (response.success && formRef.current) {
      formRef.current.reset()
    }
  }

  const getFieldError = (fieldName: string) => {
    if (!formState?.errors) return null
    return formState.errors.find((error) => error.path === fieldName)?.message
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{t("testimonials.submit")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("testimonialForm.title")}</DialogTitle>
          <DialogDescription>{t("testimonialForm.description")}</DialogDescription>
        </DialogHeader>

        {formState?.success ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("testimonialForm.success")}</h3>
            <p className="text-muted-foreground">{formState.message}</p>
            <Button className="mt-6" variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </motion.div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {formState?.success === false && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive flex items-start gap-2 mb-4">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{formState.message}</p>
                  {formState.errors && formState.errors.length > 0 && (
                    <ul className="list-disc list-inside text-sm mt-1">
                      {formState.errors.map((error, i) => (
                        <li key={i}>{error.message}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">{t("testimonialForm.name")}</Label>
              <Input id="name" name="name" className={getFieldError("name") ? "border-destructive" : ""} />
              {getFieldError("name") && <p className="text-destructive text-sm mt-1">{getFieldError("name")}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">{t("testimonialForm.position")}</Label>
              <Input id="position" name="position" className={getFieldError("position") ? "border-destructive" : ""} />
              {getFieldError("position") && (
                <p className="text-destructive text-sm mt-1">{getFieldError("position")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">{t("testimonialForm.company")}</Label>
              <Input id="company" name="company" className={getFieldError("company") ? "border-destructive" : ""} />
              {getFieldError("company") && <p className="text-destructive text-sm mt-1">{getFieldError("company")}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial">{t("testimonialForm.testimonial")}</Label>
              <Textarea
                id="testimonial"
                name="testimonial"
                rows={4}
                className={getFieldError("testimonial") ? "border-destructive" : ""}
              />
              {getFieldError("testimonial") && (
                <p className="text-destructive text-sm mt-1">{getFieldError("testimonial")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("testimonialForm.rating")}</Label>
              <RadioGroup defaultValue="3" name="rating" className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center">
                    <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`rating-${value}`}
                      className={`cursor-pointer p-2 hover:text-primary ${
                        getFieldError("rating") ? "text-destructive" : ""
                      }`}
                    >
                      <Star className="h-6 w-6 peer-checked:fill-primary" />
                      <span className="sr-only">
                        {value} Star{value !== 1 ? "s" : ""}
                      </span>
                    </Label>
                    <span className="text-xs">{value}</span>
                  </div>
                ))}
              </RadioGroup>
              {getFieldError("rating") && <p className="text-destructive text-sm mt-1">{getFieldError("rating")}</p>}
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : t("testimonialForm.submit")}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
