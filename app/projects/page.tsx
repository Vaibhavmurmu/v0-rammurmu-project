"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import AdvancedFilter from "@/components/advanced-filter"
import ProjectCard3D from "@/components/project-card-3d"

const projects = [
  {
    id: 1,
    title: "HealthTrack Pro",
    description: "A comprehensive health tracking application with personalized insights and analytics dashboard.",
    longDescription:
      "HealthTrack Pro is a full-stack application designed to help users monitor their health metrics, set goals, and track progress over time. The application features a personalized dashboard with data visualization, goal setting and tracking, custom workout plans, and nutrition tracking.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "MongoDB", "Chart.js"],
    categories: ["Web App", "Full Stack", "Healthcare"],
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
    longDescription:
      "EcoShop is a modern e-commerce platform specializing in eco-friendly and sustainable products. The application includes features like product catalog with filtering and search, shopping cart and checkout process, payment processing with Stripe, order management, and an admin dashboard for inventory management.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    categories: ["E-commerce", "Full Stack", "Web App"],
    liveUrl: "https://ecoshop.example.com",
    githubUrl: "https://github.com/rammurmu/ecoshop",
    slug: "ecoshop",
    featured: true,
  },
  {
    id: 3,
    title: "DevConnect",
    description: "A social platform for developers to share projects, collaborate, and find job opportunities.",
    longDescription:
      "DevConnect is a social networking platform designed specifically for developers to showcase their work, collaborate on projects, and find job opportunities. The platform includes user profiles with portfolio showcases, project sharing and collaboration tools, job board with filtering options, and real-time messaging.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    categories: ["Web App", "Full Stack", "Social Network"],
    liveUrl: "https://devconnect.example.com",
    githubUrl: "https://github.com/rammurmu/devconnect",
    slug: "devconnect",
    featured: true,
  },
  {
    id: 4,
    title: "SmartHome Hub",
    description: "IoT dashboard for controlling and monitoring smart home devices with real-time updates.",
    longDescription:
      "SmartHome Hub is a centralized dashboard for managing and monitoring IoT devices in a smart home environment. The application features device control panels, automation rules and scheduling, energy usage monitoring, and real-time notifications and alerts.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Vue.js", "Express", "Socket.io", "MongoDB"],
    categories: ["Web App", "IoT", "Dashboard"],
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
    longDescription:
      "TravelBuddy is a comprehensive travel planning application designed to help users plan trips, manage itineraries, track expenses, and discover new destinations. The app includes trip planning and itinerary management, interactive maps with points of interest, expense tracking and budgeting, and AI-powered destination recommendations.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "GraphQL", "AWS", "MapBox"],
    categories: ["Mobile App", "Travel", "Full Stack"],
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
    longDescription:
      "CodeReview AI is an intelligent code analysis tool that leverages machine learning to provide automated code reviews, identify potential bugs, and suggest improvements. The tool features automated code quality analysis, security vulnerability detection, performance optimization suggestions, and integration with popular version control systems.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "TensorFlow", "FastAPI", "Docker"],
    categories: ["AI", "Developer Tool", "Web App"],
    liveUrl: "https://codereview-ai.example.com",
    githubUrl: "https://github.com/rammurmu/codereview-ai",
    slug: "codereview-ai",
    featured: false,
  },
  {
    id: 7,
    title: "FinTrack",
    description:
      "Personal finance management application with budgeting tools, expense tracking, and financial insights.",
    longDescription:
      "FinTrack is a comprehensive personal finance management application that helps users track expenses, create budgets, and gain insights into their spending habits. The application includes expense tracking and categorization, budget creation and monitoring, financial goal setting, and data visualization for spending analysis.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "PostgreSQL", "D3.js"],
    categories: ["Web App", "Finance", "Full Stack"],
    liveUrl: "https://fintrack.example.com",
    githubUrl: "https://github.com/rammurmu/fintrack",
    slug: "fintrack",
    featured: false,
  },
  {
    id: 8,
    title: "LegalDoc AI",
    description: "AI-powered legal document analysis and generation tool for legal professionals.",
    longDescription:
      "LegalDoc AI is an intelligent document analysis and generation tool designed specifically for legal professionals. The application uses natural language processing to analyze legal documents, extract key information, and generate standardized legal documents based on user inputs.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "NLP", "Django", "React"],
    categories: ["AI", "Legal Tech", "Web App"],
    liveUrl: "https://legaldoc-ai.example.com",
    githubUrl: "https://github.com/rammurmu/legaldoc-ai",
    slug: "legaldoc-ai",
    featured: false,
  },
]

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
