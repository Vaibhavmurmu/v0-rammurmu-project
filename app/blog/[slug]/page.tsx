"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with Next.js",
    excerpt:
      "Learn how to leverage Next.js features to build performant and scalable React applications that can handle growth.",
    date: "May 15, 2023",
    readTime: "8 min read",
    slug: "building-scalable-react-applications",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Web Development",
    content: `
      <p>Next.js has revolutionized the way we build React applications by providing a powerful framework that combines server-side rendering, static site generation, and client-side rendering in a single package.</p>
      
      <h2>Why Next.js?</h2>
      <p>When building scalable applications, performance and developer experience are crucial factors. Next.js addresses both of these concerns with features like:</p>
      <ul>
        <li>Automatic code splitting for faster page loads</li>
        <li>Server-side rendering for improved SEO and initial load performance</li>
        <li>Static site generation for blazing-fast page loads</li>
        <li>Built-in API routes for backend functionality</li>
        <li>File-based routing for simplified navigation</li>
      </ul>
      
      <h2>Getting Started with Next.js</h2>
      <p>Setting up a Next.js project is straightforward. You can use the create-next-app command to bootstrap a new project:</p>
      <pre><code>npx create-next-app my-next-app</code></pre>
      
      <p>This command sets up a new Next.js project with all the necessary configurations and dependencies.</p>
      
      <h2>Building Scalable Components</h2>
      <p>One of the key aspects of building scalable React applications is creating reusable components. With Next.js, you can organize your components in a way that promotes reusability and maintainability.</p>
      
      <p>Here's an example of a reusable button component:</p>
      <pre><code>// components/Button.js
import React from 'react';

const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded font-medium';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;</code></pre>
      
      <h2>Optimizing Performance</h2>
      <p>Next.js provides several features for optimizing performance, such as:</p>
      
      <h3>Image Optimization</h3>
      <p>The Next.js Image component automatically optimizes images for different screen sizes and formats:</p>
      <pre><code>import Image from 'next/image';

function MyComponent() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile Picture"
      width={500}
      height={500}
      priority
    />
  );
}</code></pre>
      
      <h3>Code Splitting</h3>
      <p>Next.js automatically splits your code into smaller chunks, loading only what's necessary for each page. This significantly improves the initial load time of your application.</p>
      
      <h2>Conclusion</h2>
      <p>Next.js provides a robust framework for building scalable React applications. By leveraging its features like server-side rendering, static site generation, and built-in optimizations, you can create high-performance applications that can handle growth and provide an excellent user experience.</p>
      
      <p>In future articles, we'll dive deeper into specific Next.js features and explore advanced patterns for building complex applications.</p>
    `,
  },
  // Add more blog posts with content...
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-primary font-medium mb-4">
            <span className="bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </div>
          </div>
        </div>

        <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <div className="border-t border-muted pt-8">
          <h3 className="text-lg font-semibold mb-4">Share this article</h3>
          <div className="flex gap-3">
            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Github className="h-5 w-5" />
              <span className="sr-only">Share on GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
