"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { newBharatParty } from "@/lib/org/new-bharat-party"

export default function Hero() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-50 dark:opacity-30" />
        <div className="absolute inset-0 backdrop-blur-sm bg-background/50" />
      </div>

      <div className="container mx-auto px-4 py-20 pt-32 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            {t("hero.greeting")}{" "}
            <motion.span
              initial={{ color: "inherit" }}
              animate={{ color: "hsl(var(--primary))" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-primary"
            >
              {newBharatParty.organizationName}
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl text-muted-foreground"
          >
            {newBharatParty.nonProfitDescriptor}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="rounded-full">
              <Link href="#contact">
                {t("hero.contact")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/updates">
                <Globe className="mr-2 h-4 w-4" /> Latest updates
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex gap-4 pt-4"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={newBharatParty.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={newBharatParty.socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">X</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative mx-auto w-full max-w-md aspect-square"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/40 blur-3xl -z-10"
          />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-xl">
            <Image src="/rammurmu.jpg" alt={newBharatParty.organizationName} fill className="object-cover" priority />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
