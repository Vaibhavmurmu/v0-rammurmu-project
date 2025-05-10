"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative rounded-full w-10 h-10 overflow-hidden"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 45 : 0,
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Sun className="h-5 w-5" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 0 : -45,
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
      </div>
      <motion.div
        className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full"
        initial={false}
        animate={{
          scale: 0.8,
          opacity: 0.5,
        }}
        whileTap={{
          scale: 1,
          opacity: 0.8,
        }}
        transition={{ duration: 0.2 }}
      />
    </Button>
  )
}
