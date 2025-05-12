"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cookie, X } from "lucide-react"
import Link from "next/link"

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    setShowBanner(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary")
    setShowBanner(false)
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-4xl mx-auto bg-background/95 backdrop-blur-md border border-muted rounded-lg shadow-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Cookie className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
                  <Button variant="ghost" size="icon" onClick={acceptNecessary} className="h-8 w-8">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">
                  This website uses cookies to enhance your browsing experience, serve personalized content, and analyze
                  our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll}>Accept All</Button>
                  <Button variant="outline" onClick={acceptNecessary}>
                    Necessary Only
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
