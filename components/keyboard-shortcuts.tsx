"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined") return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Show shortcuts dialog when ? is pressed
      if (e.key === "?" && !e.ctrlKey && !e.altKey && !e.metaKey) {
        setIsOpen(true)
      }
    }

    // Safely add event listener
    try {
      window.addEventListener("keydown", handleKeyDown)
    } catch (error) {
      console.error("Error setting up keyboard shortcuts:", error)
    }

    return () => {
      // Safely remove event listener
      try {
        window.removeEventListener("keydown", handleKeyDown)
      } catch (error) {
        console.error("Error cleaning up keyboard shortcuts:", error)
      }
    }
  }, [])

  const shortcuts = [
    { key: "?", description: "Show keyboard shortcuts" },
    { key: "Esc", description: "Close dialogs or modals" },
    { key: "Alt + H", description: "Go to Home page" },
    { key: "Alt + A", description: "Go to About section" },
    { key: "Alt + P", description: "Go to Projects page" },
    { key: "Alt + B", description: "Go to Blog page" },
    { key: "Alt + C", description: "Go to Contact section" },
    { key: "Alt + R", description: "Go to Resume page" },
    { key: "Ctrl + P", description: "Print current page (useful for Resume)" },
    { key: "Tab", description: "Navigate through focusable elements" },
    { key: "Shift + Tab", description: "Navigate backward through focusable elements" },
    { key: "/", description: "Focus search box" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 p-2">
            <p className="text-sm text-muted-foreground">Press the following keys to quickly navigate the site:</p>
            <div className="space-y-2">
              {shortcuts.map((shortcut) => (
                <div key={shortcut.key} className="flex items-center justify-between py-1">
                  <span className="text-sm">{shortcut.description}</span>
                  <kbd className="rounded bg-muted px-2 py-1 text-xs font-semibold">{shortcut.key}</kbd>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
