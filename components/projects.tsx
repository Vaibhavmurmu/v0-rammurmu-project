"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"
import { FadeIn, SectionTitle } from "./motion-wrapper"

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
]

export default function Projects() {
  // Filter featured projects for initial display
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <section id="projects" className="py-20 bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <SectionTitle>My Projects</SectionTitle>

        <FadeIn delay={2}>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Here are some of my recent projects. Each one was built to solve a specific problem and showcase different
            skills and technologies.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <FadeIn key={index} delay={index + 3}>
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
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

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
                      <Link href={project.githubUrl} target="_blank">
                        <Github className="h-4 w-4 mr-1" /> Code
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
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
