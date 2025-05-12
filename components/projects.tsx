"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FadeIn, SectionTitle } from "./motion-wrapper"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import ProjectCard3D from "./project-card-3d"

const projects = [
  {
    id: 1,
    title: "HealthTrack Pro",
    description: "A comprehensive health tracking application with personalized insights and analytics dashboard.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "MongoDB", "Chart.js"],
    liveUrl: "https://healthtrack-pro.example.com",
    githubUrl: "https://github.com/rammurmu/healthtrack-pro",
    slug: "healthtrack-pro",
    featured: true,
  },
  {
    id: 2,
    title: "EcoShop",
    description:
      "An e-commerce platform focused on eco-friendly products with integrated payment processing and inventory management.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://ecoshop.example.com",
    githubUrl: "https://github.com/rammurmu/ecoshop",
    slug: "ecoshop",
    featured: true,
  },
  {
    id: 3,
    title: "DevConnect",
    description: "A social platform for developers to share projects, collaborate, and find job opportunities.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    liveUrl: "https://devconnect.example.com",
    githubUrl: "https://github.com/rammurmu/devconnect",
    slug: "devconnect",
    featured: true,
  },
  {
    id: 4,
    title: "SmartHome Hub",
    description: "IoT dashboard for controlling and monitoring smart home devices with real-time updates.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Vue.js", "Express", "Socket.io", "MongoDB"],
    liveUrl: "https://smarthome-hub.example.com",
    githubUrl: "https://github.com/rammurmu/smarthome-hub",
    slug: "smarthome-hub",
    featured: false,
  },
  {
    id: 5,
    title: "TravelBuddy",
    description:
      "Travel planning application with itinerary management, expense tracking, and location recommendations.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "GraphQL", "AWS", "MapBox"],
    liveUrl: "https://travelbuddy.example.com",
    githubUrl: "https://github.com/rammurmu/travelbuddy",
    slug: "travelbuddy",
    featured: false,
  },
  {
    id: 6,
    title: "CodeReview AI",
    description:
      "AI-powered code review tool that provides suggestions and identifies potential bugs and security issues.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "TensorFlow", "FastAPI", "Docker"],
    liveUrl: "https://codereview-ai.example.com",
    githubUrl: "https://github.com/rammurmu/codereview-ai",
    slug: "codereview-ai",
    featured: false,
  },
]

// Extract all unique tags
const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)))

export default function Projects() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (selectedTags.length === 0) {
      // If no tags selected, show featured projects on homepage
      setFilteredProjects(projects.filter((project) => project.featured))
    } else {
      // Filter projects that have at least one of the selected tags
      setFilteredProjects(projects.filter((project) => project.tags.some((tag) => selectedTags.includes(tag))))
    }
  }, [selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  if (!mounted) return null

  return (
    <section id="projects" className="py-20 bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <SectionTitle>My Projects</SectionTitle>

        <FadeIn delay={2}>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            Here are some of my recent projects. Each one was built to solve a specific problem and showcase different
            skills and technologies.
          </p>
        </FadeIn>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedTags.includes(tag) ? "bg-primary" : "hover:bg-primary/10"
              } transition-colors`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
          {selectedTags.length > 0 && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedTags([])}>
              Clear filters
            </Badge>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  layout
                  className="h-full"
                >
                  <ProjectCard3D project={project} priority={index < 3} />
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No projects match the selected filters.</p>
                <Button onClick={() => setSelectedTags([])}>Clear Filters</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
