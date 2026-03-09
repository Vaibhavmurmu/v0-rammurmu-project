"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { projectsData } from "@/lib/projects-data"

const projects = projectsData

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [mounted, setMounted] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const project = projects.find((p) => p.slug === params.slug)

  if (!mounted) return null
  if (!project) return notFound()

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mb-8">
                {project.liveUrl && (
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <Image
                  src={project.screenshots?.[activeImage] || project.image}
                  alt={`${project.title} screenshot ${activeImage + 1}`}
                  fill
                  className="object-cover"
                />
              </div>

              {project.screenshots && project.screenshots.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {project.screenshots.map((screenshot, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative w-24 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        activeImage === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={screenshot || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-muted h-fit"
          >
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">PROJECT TYPE</h3>
                <p>{project.categories.join(", ")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">TECHNOLOGIES</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">TIMELINE</h3>
                <p>3 months</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">ROLE</h3>
                <p>Full Stack Developer</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
            <p className="text-muted-foreground mb-6">{project.longDescription}</p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
              <p className="text-muted-foreground">{project.challenge ?? "Challenge details coming soon."}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">The Solution</h3>
              <p className="text-muted-foreground">{project.solution ?? "Solution details coming soon."}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {project.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
              <div className="space-y-4">
                {project.technologies?.frontend && (
                  <div>
                    <h4 className="font-medium mb-2">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.frontend.map((tech, i) => (
                        <span key={i} className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.technologies?.backend && (
                  <div>
                    <h4 className="font-medium mb-2">Backend</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.backend.map((tech, i) => (
                        <span key={i} className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.technologies?.devops && (
                  <div>
                    <h4 className="font-medium mb-2">DevOps & Deployment</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.devops.map((tech, i) => (
                        <span key={i} className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.technologies?.payment && (
                  <div>
                    <h4 className="font-medium mb-2">Payment Processing</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.payment.map((tech, i) => (
                        <span key={i} className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Outcome</h3>
              <p className="text-muted-foreground">{project.outcome ?? "Outcome details coming soon."}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-muted">
              <h3 className="text-xl font-semibold mb-4">More Projects</h3>
              <div className="space-y-4">
                {projects
                  .filter((p) => p.id !== project.id)
                  .slice(0, 3)
                  .map((p) => (
                    <Link key={p.id} href={`/projects/${p.slug}`} className="flex gap-3 items-center group">
                      <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image src={p.image || "/placeholder.svg"} alt={p.title} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">{p.title}</h4>
                        <p className="text-xs text-muted-foreground">{p.categories[0]}</p>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="mt-4 pt-4 border-t border-muted">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/projects">View All Projects</Link>
                </Button>
              </div>
            </div>

            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-muted">
              <h3 className="text-xl font-semibold mb-4">Let's Work Together</h3>
              <p className="text-muted-foreground mb-4">
                Interested in working together? I'm always open to discussing new projects and opportunities.
              </p>
              <Button asChild className="w-full">
                <Link href="/#contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
