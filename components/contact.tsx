"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Upload, X, FileText } from "lucide-react"
import { submitContactForm } from "@/actions/contact"
import { SectionTitle, FadeIn, SlideIn } from "./motion-wrapper"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"

type FormState = {
  errors: {
    path: string | number
    message: string
  }[]
  success: boolean
  message: string
}

export default function Contact() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<FormState | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    const formData = new FormData(e.currentTarget)
    const response = await submitContactForm(formData)

    setFormState(response as FormState)
    setIsSubmitting(false)

    if (response.success && formRef.current) {
      formRef.current.reset()
      setFile(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getFieldError = (fieldName: string) => {
    if (!formState?.errors) return null
    return formState.errors.find((error) => error.path === fieldName)?.message
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle>{t("contact.title")}</SectionTitle>

        <FadeIn delay={2}>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            {t("contact.description")}
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <SlideIn delay={3} className="md:col-span-2 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{t("contact.location")}</h3>
                <p className="text-muted-foreground">Bangalore, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{t("contact.email")}</h3>
                <p className="text-muted-foreground">hello@vaibhavmurmu.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{t("contact.phone")}</h3>
                <p className="text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>
          </SlideIn>

          <FadeIn
            delay={4}
            className="md:col-span-3 bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-muted"
          >
            {formState?.success ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("contact.success")}</h3>
                <p className="text-muted-foreground">{formState.message}</p>
                <Button className="mt-6" variant="outline" onClick={() => setFormState(null)}>
                  Send Another Message
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder={t("contact.name")}
                      className={getFieldError("name") ? "border-destructive" : ""}
                    />
                    {getFieldError("name") && <p className="text-destructive text-sm mt-1">{getFieldError("name")}</p>}
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder={t("contact.email")}
                      className={getFieldError("email") ? "border-destructive" : ""}
                    />
                    {getFieldError("email") && (
                      <p className="text-destructive text-sm mt-1">{getFieldError("email")}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder={t("contact.subject")}
                    className={getFieldError("subject") ? "border-destructive" : ""}
                  />
                  {getFieldError("subject") && (
                    <p className="text-destructive text-sm mt-1">{getFieldError("subject")}</p>
                  )}
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder={t("contact.message")}
                    rows={5}
                    className={getFieldError("message") ? "border-destructive" : ""}
                  />
                  {getFieldError("message") && (
                    <p className="text-destructive text-sm mt-1">{getFieldError("message")}</p>
                  )}
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Attachment (optional)</div>
                  <div className="flex items-center gap-2">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      name="file"
                      id="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full justify-start"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {file ? "Change file" : "Upload file"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Accepted file types: PDF, Word, Images (max 5MB)</p>

                  <AnimatePresence>
                    {file && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-between p-2 bg-muted rounded-md"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={handleRemoveFile}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove file</span>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : t("contact.send")}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
