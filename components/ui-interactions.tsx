"use client"

import { useEffect } from "react"

export default function UIInteractions() {
  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined") return

    // Wait for DOM to be fully loaded
    const initializeEffects = () => {
      console.log("Initializing UI interactions")

      // Add ripple effect to buttons
      try {
        // Use event delegation on body instead of directly on elements
        document.body.addEventListener("click", (e) => {
          const target = e.target as HTMLElement

          // Check if the clicked element is a button or has a button parent
          const button = target.closest("button, a.btn, .btn") as HTMLElement
          if (!button) return

          // Create ripple element
          const ripple = document.createElement("span")
          const rect = button.getBoundingClientRect()

          // Calculate ripple position
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          // Set ripple styles
          ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height) * 2}px`
          ripple.style.left = `${x - ripple.clientWidth / 2}px`
          ripple.style.top = `${y - ripple.clientHeight / 2}px`
          ripple.className = "absolute rounded-full pointer-events-none bg-white/20 dark:bg-black/20 animate-ripple"

          // Add position relative to button if not already set
          if (getComputedStyle(button).position === "static") {
            button.style.position = "relative"
          }

          // Add overflow hidden to button if not already set
          if (getComputedStyle(button).overflow === "visible") {
            button.style.overflow = "hidden"
          }

          // Add ripple to button
          button.appendChild(ripple)

          // Remove ripple after animation
          setTimeout(() => {
            if (ripple.parentNode === button) {
              button.removeChild(ripple)
            }
          }, 600)
        })
        console.log("Ripple effect initialized")
      } catch (error) {
        console.error("Error setting up ripple effect:", error)
      }

      // Add keyframe animation for ripple effect to stylesheet
      try {
        const style = document.createElement("style")
        style.textContent = `
          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 0.5;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
          .animate-ripple {
            animation: ripple 0.6s linear;
          }
          .focus-visible {
            outline: 2px solid var(--primary, #5f4dee);
            outline-offset: 2px;
            transition: outline-offset 0.2s ease;
          }
        `
        document.head.appendChild(style)
        console.log("Added animation styles")
      } catch (error) {
        console.error("Error adding style element:", error)
      }
    }

    // Ensure DOM is loaded before initializing
    if (document.readyState === "complete" || document.readyState === "interactive") {
      console.log("DOM already loaded, initializing immediately")
      initializeEffects()
    } else {
      console.log("DOM not ready, waiting for load event")
      window.addEventListener("DOMContentLoaded", initializeEffects)
    }

    // Cleanup function
    return () => {
      console.log("Cleaning up UI interactions")
      if (typeof window !== "undefined") {
        window.removeEventListener("DOMContentLoaded", initializeEffects)
      }
    }
  }, [])

  return null
}
