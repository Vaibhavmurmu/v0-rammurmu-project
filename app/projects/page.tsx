"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import AdvancedFilter from "@/components/advanced-filter"
import ProjectCard3D from "@/components/project-card-3d"

import { projectsData } from "@/lib/projects-data"

const projects = projectsData

// Extract unique categories and technologies
const allCategories = Array.from(new Set(projects.flatMap((project) => project.categories)))
const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.tags)))

export default function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = projects

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((project) =>
        project.categories.some((category) => selectedCategories.includes(category)),
      )
    }

    // Filter by technologies
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter((project) => project.tags.some((tag) => selectedTechnologies.includes(tag)))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          project.categories.some((category) => category.toLowerCase().includes(query)),
      )
    }

    setFilteredProjects(filtered)
  }, [selectedCategories, selectedTechnologies, searchQuery])

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedTechnologies([])
    setSearchQuery("")
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-6 group">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            A collection of my work across various technologies and domains.
          </p>

          {/* Search input */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-muted bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Advanced filter component */}
          <AdvancedFilter
            categories={allCategories}
            technologies={allTechnologies}
            selectedCategories={selectedCategories}
            selectedTechnologies={selectedTechnologies}
            onCategoryChange={setSelectedCategories}
            onTechnologyChange={setSelectedTechnologies}
            onClearFilters={clearFilters}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              // Loading skeleton
              <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-background/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-muted"
                  >
                    <div className="h-48 bg-muted animate-pulse"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-muted animate-pulse rounded"></div>
                      <div className="h-20 bg-muted animate-pulse rounded"></div>
                      <div className="flex gap-2">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className="h-9 w-24 bg-muted animate-pulse rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="h-full"
                >
                  <ProjectCard3D project={project} priority={index < 3} />
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No projects match the selected filters.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
