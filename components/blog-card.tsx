"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  post: {
    id: number
    title: string
    excerpt: string
    date: string
    readTime: string
    slug: string
    image: string
    category?: string
  }
  index: number
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="bg-background/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-muted hover:border-primary/20 transition-all h-full flex flex-col">
          <div className="relative h-48 overflow-hidden">
            {post.category && (
              <div className="absolute top-0 right-0 z-10 m-2">
                <Badge className="bg-primary text-primary-foreground">{post.category}</Badge>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center gap-2 text-white">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm">Read Article</span>
                <ArrowRight className="h-4 w-4 ml-auto transition-transform group-hover:translate-x-1" />
              </div>
            </div>
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
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center text-primary font-medium mt-auto">
              Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
