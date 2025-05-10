"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { subscribeToNewsletter } from "@/actions/newsletter"
import { motion, AnimatePresence } from "framer-motion"

export default function Newsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<{
    success?: boolean
    message?: string
  } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    const formData = new FormData(e.currentTarget)
    const response = await subscribeToNewsletter(formData)

    setFormState(response)
    setIsSubmitting(false)

    if (response.success && formRef.current) {
      formRef.current.reset()
    }
  }

  return (
    <section className="py-16 bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-muted">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Subscribe to My Newsletter</h2>
            <p className="text-muted-foreground">
              Get the latest articles, tutorials, and updates delivered straight to your inbox.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {formState?.success ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Subscription Successful!</h3>
                <p className="text-muted-foreground">{formState.message}</p>
                <Button className="mt-4" variant="outline" onClick={() => setFormState(null)}>
                  Subscribe Another Email
                </Button>
              </motion.div>
            ) : (
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-grow">
                  <Input type="email" name="email" placeholder="Enter your email address" required className="w-full" />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          {formState?.success === false && (
            <div className="mt-3 p-3 rounded-md bg-destructive/10 text-destructive flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p>{formState.message}</p>
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-4 text-center">
            By subscribing, you agree to receive emails from me. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
