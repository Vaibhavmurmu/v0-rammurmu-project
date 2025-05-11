"use client"

import { useState } from "react"
import { Code, Database, Globe, Layout, Palette, Server, Smartphone, Terminal, Zap } from "lucide-react"
import { SectionTitle, FadeIn } from "./motion-wrapper"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"

// Dynamically import the Skills3D component with no SSR
const Skills3D = dynamic(() => import("./skills-3d"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading 3D visualization...</p>
      </div>
    </div>
  ),
})

const skills = [
  {
    name: "Frontend Development",
    icon: Layout,
    description: "React, Next.js, Vue",
    proficiency: 95,
    color: "bg-blue-500",
  },
  {
    name: "Backend Development",
    icon: Server,
    description: "Node.js, Express, Django",
    proficiency: 90,
    color: "bg-green-500",
  },
  {
    name: "Database Management",
    icon: Database,
    description: "MongoDB, PostgreSQL, MySQL",
    proficiency: 85,
    color: "bg-purple-500",
  },
  {
    name: "UI/UX Design",
    icon: Palette,
    description: "Figma, Adobe XD, Sketch",
    proficiency: 80,
    color: "bg-pink-500",
  },
  {
    name: "Mobile Development",
    icon: Smartphone,
    description: "React Native, Flutter",
    proficiency: 75,
    color: "bg-orange-500",
  },
  {
    name: "DevOps",
    icon: Terminal,
    description: "Docker, AWS, CI/CD",
    proficiency: 70,
    color: "bg-red-500",
  },
  {
    name: "Web Performance",
    icon: Zap,
    description: "Optimization, Caching, SEO",
    proficiency: 85,
    color: "bg-yellow-500",
  },
  {
    name: "API Development",
    icon: Globe,
    description: "REST, GraphQL, WebSockets",
    proficiency: 90,
    color: "bg-teal-500",
  },
  {
    name: "Programming Languages",
    icon: Code,
    description: "JavaScript, TypeScript, Python",
    proficiency: 95,
    color: "bg-indigo-500",
  },
]

export default function Skills() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("list")

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle>{t("skills.title")}</SectionTitle>

        <FadeIn delay={2}>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">{t("skills.description")}</p>
        </FadeIn>

        <Tabs defaultValue="list" className="mb-8" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="3d">3D View</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-muted hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <skill.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{skill.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{skill.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("skills.proficiency")}</span>
                      <span className="font-medium">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${skill.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="3d" className="relative">
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-muted">
              {activeTab === "3d" && <Skills3D />}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
