"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    liveUrl: string
    githubUrl: string
    slug: string
  }
  priority?: boolean
}

export default function ProjectCard3D({ project, priority = false }: ProjectCardProps) {
  const [mounted, setMounted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values for the tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for the tilt effect
  const rotateXInput = useTransform(y, [-100, 100], [10, -10])
  const rotateYInput = useTransform(x, [-100, 100], [-10, 10])
  const rotateX = useSpring(rotateXInput, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(rotateYInput, { stiffness: 300, damping: 30 })

  // Parallax effect for the image - extract useTransform outside of useSpring
  const imageXInput = useTransform(x, [-100, 100], [15, -15])
  const imageYInput = useTransform(y, [-100, 100], [15, -15])
  const imageX = useSpring(imageXInput, { stiffness: 300, damping: 30 })
  const imageY = useSpring(imageYInput, { stiffness: 300, damping: 30 })

  // Shine effect
  const shine = useTransform(
    [rotateX, rotateY],
    ([rx, ry]) =>
      `linear-gradient(${45 + rx * 0.5}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)`,
  )

  // Opacity for shine effect
  const shineOpacity = useTransform([rotateX, rotateY], ([rx, ry]) => Math.abs(rx) * 0.01 + Math.abs(ry) * 0.01)

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  // Render a placeholder while not mounted
  if (!mounted) {
    return (
      <div className="h-full rounded-xl overflow-hidden bg-background/80 backdrop-blur-sm border border-muted">
        <div className="h-48 bg-muted animate-pulse"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-muted animate-pulse rounded"></div>
          <div className="h-20 bg-muted animate-pulse rounded"></div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>
            ))}
          </div>
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-9 w-24 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full rounded-xl overflow-hidden bg-background/80 backdrop-blur-sm border border-muted hover:border-primary/20 transition-colors"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 z-10 opacity-0 pointer-events-none"
        style={{
          background: shine,
          opacity: shineOpacity,
        }}
      />

      {/* Card content */}
      <motion.div
        className="relative h-full flex flex-col"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Image with parallax effect */}
        <motion.div
          className="relative h-48 overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
          }}
        >
          <motion.div
            style={{
              x: imageX,
              y: imageY,
              width: "calc(100% + 30px)",
              height: "calc(100% + 30px)",
              position: "absolute",
              top: -15,
              left: -15,
            }}
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              priority={priority}
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow" style={{ transform: "translateZ(10px)" }}>
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3 mt-auto">
            <Button asChild variant="default" size="sm">
              <Link href={`/projects/${project.slug}`}>View Details</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="group">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                Demo
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="group">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform" />
                Code
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
