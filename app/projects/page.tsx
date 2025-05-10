"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

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

// Extract unique categories
const allCategories = Array.from(new Set(projects.flatMap((project) => project.categories)))

export default function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(
        projects.filter((project) => project.categories.some((category) => selectedCategories.includes(category))),
      )
    }
  }, [selectedCategories])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            A collection of my work across various technologies and domains.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
            {selectedCategories.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedCategories([])} className="rounded-full">
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                transition={{ duration: 0.3 }}
              >
                <div className="bg-background/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-muted hover:border-primary/20 transition-all group h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                    <p className="text-muted-foreground mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/projects/${project.slug}`}>View Details</Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={project.liveUrl} target="_blank">
                          <ExternalLink className="h-4 w-4 mr-1" /> Demo
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">Try selecting different categories or clear the filters.</p>
            <Button onClick={() => setSelectedCategories([])}>Clear Filters</Button>
          </div>
        )}
      </div>
    </main>
  )
}
