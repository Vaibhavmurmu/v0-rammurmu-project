"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeTransition() {
  const { theme, resolvedTheme } = useTheme()
  const [prevTheme, setPrevTheme] = useState<string | undefined>(undefined)
  const [showTransition, setShowTransition] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && prevTheme && prevTheme !== resolvedTheme) {
      setShowTransition(true)
      const timer = setTimeout(() => setShowTransition(false), 500)
      return () => clearTimeout(timer)
    }
    if (mounted && resolvedTheme) {
      setPrevTheme(resolvedTheme)
    }
  }, [resolvedTheme, prevTheme, mounted])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {showTransition && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 100 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: position.y,
              left: position.x,
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: resolvedTheme === "dark" ? "hsl(240 10% 3.9%)" : "hsl(0 0% 100%)",
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
