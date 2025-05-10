"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface MotionWrapperProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className = "" }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideIn({ children, delay = 0, className = "" }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, delay = 0, className = "" }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto text-center mb-12"
    >
      <h2 className="text-3xl font-bold mb-4">{children}</h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "5rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-1 bg-primary mx-auto mb-8"
      ></motion.div>
    </motion.div>
  )
}
