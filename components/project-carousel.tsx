"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    title: "HealthTrack Pro",
    description: "A comprehensive health tracking application with personalized insights and analytics dashboard.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["React", "Node.js", "MongoDB", "Chart.js"],
    liveUrl: "https://healthtrack-pro.example.com",
    githubUrl: "https://github.com/rammurmu/healthtrack-pro",
    slug: "healthtrack-pro",
  },
  {
    id: 2,
    title: "EcoShop",
    description:
      "An e-commerce platform focused on eco-friendly products with integrated payment processing and inventory management.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://ecoshop.example.com",
    githubUrl: "https://github.com/rammurmu/ecoshop",
    slug: "ecoshop",
  },
  {
    id: 3,
    title: "DevConnect",
    description: "A social platform for developers to share projects, collaborate, and find job opportunities.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    liveUrl: "https://devconnect.example.com",
    githubUrl: "https://github.com/rammurmu/devconnect",
    slug: "devconnect",
  },
]

export default function ProjectCarousel() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragEnd, setDragEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % projects.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true)
    if ("touches" in e) {
      setDragStart(e.touches[0].clientX)
    } else {
      setDragStart(e.clientX)
    }
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return
    if ("touches" in e) {
      setDragEnd(e.touches[0].clientX)
    } else {
      setDragEnd(e.clientX)
    }
  }

  const handleDragEnd = () => {
    if (!dragging) return
    setDragging(false)
    const threshold = 100
    const dragDistance = dragEnd - dragStart

    if (dragDistance > threshold) {
      prev()
    } else if (dragDistance < -threshold) {
      next()
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  if (!mounted) return null

  return (
    <div className="relative overflow-hidden py-12">
      <div
        ref={carouselRef}
        className="relative h-[600px] w-full overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto px-4">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={projects[current].image || "/placeholder.svg"}
                  alt={projects[current].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">{projects[current].title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{projects[current].description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[current].tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href={`/projects/${projects[current].slug}`}>View Details</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={projects[current].liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                  <Button asChild variant="ghost">
                    <a href={projects[current].githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <Button variant="outline" size="icon" onClick={prev} className="rounded-full bg-background/80 backdrop-blur-sm">
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <Button variant="outline" size="icon" onClick={next} className="rounded-full bg-background/80 backdrop-blur-sm">
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1)
              setCurrent(index)
            }}
            className={`w-3 h-3 rounded-full transition-colors ${index === current ? "bg-primary" : "bg-primary/20"}`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
