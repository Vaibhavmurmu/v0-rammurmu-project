// import Hero3D from "@/components/hero-3d"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Testimonials from "@/components/testimonials"
import BlogPreview from "@/components/blog-preview"
import Newsletter from "@/components/newsletter"
import Timeline from "@/components/timeline"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import ProjectCarousel from "@/components/project-carousel"
// import SkillsBackground from "@/components/skills-background"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Hero3D /> */}
      <Hero />
      <About />
      <div className="relative">
        {/* <SkillsBackground /> */}
        <Skills />
      </div>
      <Timeline />
      <ProjectCarousel />
      <Projects />
      <Testimonials />
      <BlogPreview />
      <AnalyticsDashboard />
      <Newsletter />
      <Contact />
    </main>
  )
}
