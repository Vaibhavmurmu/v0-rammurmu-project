"use client"

import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full w-10 h-10 overflow-hidden"
          aria-label="Change theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "light" && (
              <motion.div
                key="light"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="h-5 w-5" />
              </motion.div>
            )}
            {theme === "dark" && (
              <motion.div
                key="dark"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="h-5 w-5" />
              </motion.div>
            )}
            {theme === "system" && (
              <motion.div
                key="system"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Laptop className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
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
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === "light" && (
            <motion.span layoutId="check" className="ml-auto">
              ✓
            </motion.span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && (
            <motion.span layoutId="check" className="ml-auto">
              ✓
            </motion.span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
          {theme === "system" && (
            <motion.span layoutId="check" className="ml-auto">
              ✓
            </motion.span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
