"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

type AnimationVariant = "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "rotate"

interface ScrollAnimationProps {
  children: ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

export default function ScrollAnimation({
  children,
  variant = "fadeIn",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
  once = true,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const variants = {
    hidden: {
      fadeIn: { opacity: 0, y: 20 },
      slideUp: { opacity: 0, y: 50 },
      slideLeft: { opacity: 0, x: 50 },
      slideRight: { opacity: 0, x: -50 },
      scale: { opacity: 0, scale: 0.8 },
      rotate: { opacity: 0, rotate: -5, scale: 0.8 },
    },
    visible: {
      fadeIn: { opacity: 1, y: 0 },
      slideUp: { opacity: 1, y: 0 },
      slideLeft: { opacity: 1, x: 0 },
      slideRight: { opacity: 1, x: 0 },
      scale: { opacity: 1, scale: 1 },
      rotate: { opacity: 1, rotate: 0, scale: 1 },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: variants.hidden[variant],
        visible: variants.visible[variant],
      }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
