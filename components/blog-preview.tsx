"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionTitle, FadeIn, SlideIn } from "./motion-wrapper"

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with Next.js",
    excerpt:
      "Learn how to leverage Next.js features to build performant and scalable React applications that can handle growth.",
    date: "May 15, 2023",
    readTime: "8 min read",
    slug: "building-scalable-react-applications",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 2,
    title: "The Future of Web Development: AI Integration",
    excerpt:
      "Explore how artificial intelligence is transforming web development and how developers can stay ahead of the curve.",
    date: "June 22, 2023",
    readTime: "6 min read",
    slug: "future-of-web-development-ai",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 3,
    title: "Optimizing Database Performance in Modern Applications",
    excerpt:
      "Practical strategies for improving database performance and query optimization in high-traffic web applications.",
    date: "July 10, 2023",
    readTime: "10 min read",
    slug: "optimizing-database-performance",
    image: "/placeholder.svg?height=300&width=600",
  },
]

export default function BlogPreview() {
  return (
    <section id="blog" className="py-20 bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <SectionTitle>From My Blog</SectionTitle>

        <FadeIn delay={2}>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            I write about web development, technology trends, and best practices. Check out some of my recent articles.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <SlideIn key={post.id} delay={index + 3}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="bg-background/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-muted hover:border-primary/20 transition-all h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                    <div className="flex items-center text-primary font-medium mt-auto">
                      Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </SlideIn>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
