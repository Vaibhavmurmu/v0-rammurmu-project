"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionTitle, FadeIn } from "./motion-wrapper"
import BlogCard from "./blog-card"

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
            <div key={post.id}>
              <BlogCard post={post} index={index} />
            </div>
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
