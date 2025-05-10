import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    category: "Web Development",
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
    category: "AI & Technology",
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
    category: "Database",
  },
  {
    id: 4,
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    excerpt:
      "Dive deep into TypeScript's advanced features and learn patterns that will make your code more robust and maintainable.",
    date: "August 5, 2023",
    readTime: "12 min read",
    slug: "mastering-typescript-advanced-patterns",
    image: "/placeholder.svg?height=300&width=600",
    category: "TypeScript",
  },
  {
    id: 5,
    title: "Building Accessible Web Applications: A Comprehensive Guide",
    excerpt:
      "Learn how to create web applications that are accessible to all users, including those with disabilities.",
    date: "September 18, 2023",
    readTime: "9 min read",
    slug: "building-accessible-web-applications",
    image: "/placeholder.svg?height=300&width=600",
    category: "Accessibility",
  },
  {
    id: 6,
    title: "Serverless Architecture: When and How to Use It",
    excerpt:
      "Explore the benefits and challenges of serverless architecture and learn when it's the right choice for your projects.",
    date: "October 30, 2023",
    readTime: "7 min read",
    slug: "serverless-architecture-guide",
    image: "/placeholder.svg?height=300&width=600",
    category: "Cloud Computing",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Thoughts, insights, and perspectives on web development, technology, and more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
              <div className="bg-background/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-muted hover:border-primary/20 transition-all h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute top-0 right-0 z-10 bg-primary text-primary-foreground text-xs font-medium py-1 px-2 rounded-bl-lg">
                    {post.category}
                  </div>
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
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center text-primary font-medium mt-auto">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
