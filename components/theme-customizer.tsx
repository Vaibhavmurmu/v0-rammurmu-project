"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Paintbrush, Check, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const colorThemes = [
  { name: "Default", primary: "240 5.9% 10%", accent: "240 4.8% 95.9%" },
  { name: "Blue", primary: "221 83% 53%", accent: "217 91% 60%" },
  { name: "Green", primary: "142 76% 36%", accent: "143 55% 62%" },
  { name: "Purple", primary: "262 83% 58%", accent: "263 70% 71%" },
  { name: "Rose", primary: "346 77% 49%", accent: "339 81% 66%" },
  { name: "Orange", primary: "24 95% 53%", accent: "32 95% 44%" },
  { name: "Teal", primary: "173 80% 40%", accent: "172 66% 50%" },
]

export default function ThemeCustomizer() {
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("Default")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("color-theme") || "Default"
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (themeName: string) => {
    const theme = colorThemes.find((t) => t.name === themeName)
    if (!theme) return

    document.documentElement.style.setProperty("--primary", theme.primary)
    document.documentElement.style.setProperty("--accent", theme.accent)
    localStorage.setItem("color-theme", themeName)
    setCurrentTheme(themeName)
  }

  if (!mounted) return null

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full w-10 h-10 overflow-hidden"
          aria-label="Customize theme colors"
        >
          <Paintbrush className="h-5 w-5" />
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
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        <div className="flex justify-between items-center mb-2 px-2">
          <h3 className="font-medium">Theme Colors</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {colorThemes.map((theme) => (
            <button
              key={theme.name}
              className={`relative flex flex-col items-center justify-center p-2 rounded-md hover:bg-muted transition-colors ${
                currentTheme === theme.name ? "bg-muted" : ""
              }`}
              onClick={() => {
                applyTheme(theme.name)
                setIsOpen(false)
              }}
            >
              <div className="w-8 h-8 rounded-full mb-1" style={{ background: `hsl(${theme.primary})` }}>
                {currentTheme === theme.name && (
                  <div className="flex items-center justify-center h-full">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <span className="text-xs">{theme.name}</span>
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
