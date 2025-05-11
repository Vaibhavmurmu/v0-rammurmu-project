"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionTitle, FadeIn } from "./motion-wrapper"
import { motion, AnimatePresence } from "framer-motion"
import TestimonialForm from "./testimonial-form"
import { useLanguage } from "@/context/language-context"

const testimonials = [
  {
    id: 1,
    content:
      "Ram is an exceptional developer who delivered our project ahead of schedule. His attention to detail and problem-solving skills are impressive. I highly recommend him for any web development project.",
    name: "Sarah Johnson",
    position: "CTO, TechInnovate",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    content:
      "Working with Ram was a fantastic experience. He understood our requirements perfectly and created a solution that exceeded our expectations. His technical expertise and communication skills made the project run smoothly.",
    name: "Michael Chen",
    position: "Founder, DataViz Solutions",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    content:
      "Ram transformed our outdated website into a modern, responsive platform that has significantly increased our user engagement. His creative approach and technical skills are truly outstanding.",
    name: "Priya Patel",
    position: "Marketing Director, GrowthHub",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    content:
      "I've worked with many developers, but Ram stands out for his ability to translate complex requirements into elegant solutions. He's not just a coder, but a true problem solver who thinks about the business impact of his work.",
    name: "David Wilson",
    position: "Product Manager, InnovateTech",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle>{t("testimonials.title")}</SectionTitle>

        <FadeIn delay={2}>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-6">
            {t("testimonials.description")}
          </p>
          <div className="flex justify-center mb-12">
            <TestimonialForm />
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-10 left-0 text-primary/20 dark:text-primary/10">
            <Quote size={80} />
          </div>

          <div className="relative overflow-hidden min-h-[300px] md:min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-muted"
              >
                <p className="text-lg mb-6 italic relative z-10">"{testimonials[current].content}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[current].image || "/placeholder.svg"}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonials[current].name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonials[current].position}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false)
                    setCurrent(index)
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === current ? "bg-primary" : "bg-primary/20"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full">
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
