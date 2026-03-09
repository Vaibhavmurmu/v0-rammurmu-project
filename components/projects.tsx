"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FadeIn, SectionTitle } from "./motion-wrapper"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import ProjectCard3D from "./project-card-3d"

import { projectsData } from "@/lib/projects-data"

const projects = projectsData

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
