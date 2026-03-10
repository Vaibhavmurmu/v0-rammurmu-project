"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { SearchIcon, X, FileText, Briefcase } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useClickAway } from "@/hooks/use-click-away"
import { blogPostsData } from "@/lib/blog-data"
import { projectsData } from "@/lib/projects-data"

const blogPosts = blogPostsData.map((post) => ({
  id: post.id,
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  slug: post.slug,
  type: "blog" as const,
}))

const projects = projectsData.map((project) => ({
  id: project.id,
  title: project.title,
  description: project.description,
  slug: project.slug,
  type: "project" as const,
}))

// Combine all searchable content
const searchableContent = [...blogPosts, ...projects]

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<typeof searchableContent>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Close search when clicking outside
  useClickAway(searchRef, () => {
    setIsOpen(false)
  })

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }

      // Close search with Escape
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Search function
  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      const lowerCaseQuery = searchQuery.toLowerCase()
      const filtered = searchableContent.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerCaseQuery) ||
          (item.type === "blog" && "excerpt" in item && item.excerpt.toLowerCase().includes(lowerCaseQuery)) ||
          (item.type === "project" && "description" in item && item.description.toLowerCase().includes(lowerCaseQuery)),
      )

      setResults(filtered)
    },
    [setResults],
  )

  // Update search results when query changes
  useEffect(() => {
    performSearch(query)
  }, [query, performSearch])

  // Handle navigation to search result
  const handleSelectResult = (item: (typeof searchableContent)[0]) => {
    setIsOpen(false)
    setQuery("")
    if (item.type === "blog") {
      router.push(`/blog/${item.slug}`)
    } else {
      router.push(`/projects/${item.slug}`)
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      <Button
        variant="outline"
        size="sm"
        className="w-full sm:w-64 justify-between text-muted-foreground"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center">
          <SearchIcon className="mr-2 h-4 w-4" />
          <span>Search...</span>
        </div>
        <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full sm:w-96 bg-background border border-border rounded-lg shadow-lg z-50"
          >
            <div className="p-2">
              <div className="flex items-center border-b pb-2">
                <SearchIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search projects and blog posts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    setQuery("")
                    inputRef.current?.focus()
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear</span>
                </Button>
              </div>

              <div className="mt-2 max-h-80 overflow-y-auto">
                {results.length > 0 ? (
                  <div className="space-y-1 p-1">
                    {results.map((item) => (
                      <button
                        key={`${item.type}-${item.id}`}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-muted flex items-start gap-2"
                        onClick={() => handleSelectResult(item)}
                      >
                        {item.type === "blog" ? (
                          <FileText className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                        ) : (
                          <Briefcase className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                        )}
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-xs">
                            {item.type === "blog" && "excerpt" in item
                              ? item.excerpt
                              : item.type === "project" && "description" in item
                                ? item.description
                                : ""}
                          </div>
                          <div className="text-xs text-primary mt-1">
                            {item.type === "blog" ? "Blog Post" : "Project"}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query ? (
                  <div className="p-4 text-center text-muted-foreground">No results found for "{query}"</div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">Type to search projects and blog posts...</div>
                )}
              </div>

              <div className="border-t mt-2 pt-2 px-2 text-xs text-muted-foreground flex justify-between">
                <span>Press ESC to close</span>
                <span>
                  <kbd className="px-1.5 bg-muted rounded text-xs">↑</kbd>{" "}
                  <kbd className="px-1.5 bg-muted rounded text-xs">↓</kbd> to navigate
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
