"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionTitle, FadeIn } from "./motion-wrapper"
import BlogCard from "./blog-card"

import { blogPostsData } from "@/lib/blog-data"

const blogPosts = blogPostsData.slice(0, 3)

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
