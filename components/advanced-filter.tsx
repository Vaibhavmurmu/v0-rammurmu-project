"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X, Check, Save, Folder } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FilterProps {
  categories: string[]
  technologies: string[]
  selectedCategories: string[]
  selectedTechnologies: string[]
  onCategoryChange: (categories: string[]) => void
  onTechnologyChange: (technologies: string[]) => void
  onClearFilters: () => void
}

interface SavedFilter {
  id: string
  name: string
  categories: string[]
  technologies: string[]
}

export default function AdvancedFilter({
  categories,
  technologies,
  selectedCategories,
  selectedTechnologies,
  onCategoryChange,
  onTechnologyChange,
  onClearFilters,
}: FilterProps) {
  const [mounted, setMounted] = useState(false)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [filterName, setFilterName] = useState("")
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([])

  // Load saved filters from localStorage
  useEffect(() => {
    setMounted(true)
    const storedFilters = localStorage.getItem("portfolio-filters")
    if (storedFilters) {
      setSavedFilters(JSON.parse(storedFilters))
    }
  }, [])

  // Save filters to localStorage
  const saveFilter = () => {
    if (!filterName.trim()) return

    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: filterName,
      categories: selectedCategories,
      technologies: selectedTechnologies,
    }

    const updatedFilters = [...savedFilters, newFilter]
    setSavedFilters(updatedFilters)
    localStorage.setItem("portfolio-filters", JSON.stringify(updatedFilters))

    setFilterName("")
    setSaveDialogOpen(false)
  }

  // Apply a saved filter
  const applyFilter = (filter: SavedFilter) => {
    onCategoryChange(filter.categories)
    onTechnologyChange(filter.technologies)
  }

  // Delete a saved filter
  const deleteFilter = (id: string) => {
    const updatedFilters = savedFilters.filter((filter) => filter.id !== id)
    setSavedFilters(updatedFilters)
    localStorage.setItem("portfolio-filters", JSON.stringify(updatedFilters))
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoryChange([...selectedCategories, category])
    }
  }

  const toggleTechnology = (technology: string) => {
    if (selectedTechnologies.includes(technology)) {
      onTechnologyChange(selectedTechnologies.filter((t) => t !== technology))
    } else {
      onTechnologyChange([...selectedTechnologies, technology])
    }
  }

  if (!mounted) return null

  const hasActiveFilters = selectedCategories.length > 0 || selectedTechnologies.length > 0

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter Projects
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1">
                  {selectedCategories.length + selectedTechnologies.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                  {selectedCategories.includes(category) && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Technologies</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="max-h-[200px] overflow-y-auto">
              {technologies.map((technology) => (
                <DropdownMenuItem
                  key={technology}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleTechnology(technology)}
                >
                  {technology}
                  {selectedTechnologies.includes(technology) && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive cursor-pointer"
              onClick={onClearFilters}
              disabled={!hasActiveFilters}
            >
              Clear Filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="gap-1">
            <X className="h-4 w-4" /> Clear
          </Button>
        )}

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={() => setSaveDialogOpen(true)} className="gap-1">
            <Save className="h-4 w-4" /> Save Filter
          </Button>
        )}

        {savedFilters.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <Folder className="h-4 w-4" /> Saved Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Saved Filters</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {savedFilters.map((filter) => (
                <DropdownMenuItem key={filter.id} className="flex items-center justify-between cursor-pointer">
                  <span onClick={() => applyFilter(filter)}>{filter.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteFilter(filter.id)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Active filters display */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Badge key={`cat-${category}`} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  {category}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => toggleCategory(category)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {selectedTechnologies.map((technology) => (
                <Badge key={`tech-${technology}`} variant="default" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  {technology}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent text-primary-foreground"
                    onClick={() => toggleTechnology(technology)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save filter dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Filter</DialogTitle>
            <DialogDescription>Save your current filter settings for future use.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filter-name" className="text-right">
                Name
              </Label>
              <Input
                id="filter-name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="col-span-3"
                placeholder="My favorite projects"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveFilter} disabled={!filterName.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
