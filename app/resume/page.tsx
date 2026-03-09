"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Printer, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function ResumePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Add print-specific keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault()
        window.print()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint} className="group">
              <Printer className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Print Resume
              <span className="ml-2 text-xs text-muted-foreground">(Ctrl+P)</span>
            </Button>
            <Button asChild className="group">
              <a href="/Vaibhav_Murmu_Resume.pdf" download="Vaibhav_Murmu_Resume.pdf">
                <Download className="mr-2 h-4 w-4 group-hover:translate-y-[-2px] transition-transform" /> Download PDF
              </a>
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-muted print:shadow-none print:border-none print:p-0 print:bg-white"
        >
          {/* Resume Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 print:mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl mx-auto md:mx-0 print:border-none print:shadow-none">
              <Image src="/placeholder.svg?height=128&width=128" alt="Vaibhav Murmu" fill className="object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2 print:text-2xl">Vaibhav Murmu</h1>
              <p className="text-xl text-primary mb-4 print:text-lg print:mb-2 print:text-black">
                Co-founder & CFO and Developer
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start print:text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground print:text-black" />
                  <span>vaibhav.murmu@example.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-muted-foreground print:text-black" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground print:text-black" />
                  <span>Bengaluru, India</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4 text-muted-foreground print:text-black" />
                  <span>vaibhavmurmu.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8 print:mb-6">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg print:border-black">
              Professional Summary
            </h2>
            <p className="text-muted-foreground print:text-black">
              Co-founder & CFO and Developer with 5+ years of experience building modern digital products and technology-led businesses. Proficient in
              React, Next.js, Node.js, and cloud services. Passionate about creating scalable, user-friendly applications while aligning technology delivery with strategic financial outcomes. Strong problem-solving skills and experience
              working in collaborative, agile environments.
            </p>
          </div>

          {/* Skills */}
          <div className="mb-8 print:mb-6">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg print:border-black">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
              <div>
                <h3 className="font-medium mb-2 print:text-sm">Frontend Development</h3>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  React, Next.js, TypeScript, HTML5, CSS3, Tailwind CSS, Redux, GraphQL
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2 print:text-sm">Backend Development</h3>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  Node.js, Express, Django, RESTful APIs, GraphQL, WebSockets
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2 print:text-sm">Database Management</h3>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  MongoDB, PostgreSQL, MySQL, Redis, Firebase
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2 print:text-sm">DevOps & Tools</h3>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  Git, Docker, AWS, CI/CD, Jest, Cypress, Webpack
                </p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-8 print:mb-6 print:break-before-avoid">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg print:border-black">
              Work Experience
            </h2>
            <div className="space-y-6 print:space-y-4">
              <div className="print:break-inside-avoid">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary print:text-black" />
                    <h3 className="font-semibold">Co-founder & CFO</h3>
                  </div>
                  <span className="text-sm text-muted-foreground print:text-black">2022 - Present</span>
                </div>
                <p className="font-medium text-primary mb-1 print:text-sm print:text-black">
                  Rammurmu Labs, Bengaluru, India
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 print:text-black print:text-sm">
                  <li>Own annual planning, budgeting, cash-flow governance, and investor reporting</li>
                  <li>Partner with product and engineering to prioritize roadmap investments against business goals</li>
                  <li>Built KPI dashboards for revenue, burn, and unit economics to support decision-making</li>
                  <li>Implemented operating cadences and cross-functional reviews to improve execution predictability</li>
                </ul>
              </div>

              <div className="print:break-inside-avoid">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary print:text-black" />
                    <h3 className="font-semibold">Co-founder & CFO and Developer</h3>
                  </div>
                  <span className="text-sm text-muted-foreground print:text-black">2019 - 2022</span>
                </div>
                <p className="font-medium text-primary mb-1 print:text-sm print:text-black">
                  FinEdge Technologies, Bengaluru, India
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 print:text-black print:text-sm">
                  <li>Led architecture and delivery of fintech web products and internal operations platforms</li>
                  <li>Scaled engineering processes through CI/CD, code review standards, and sprint governance</li>
                  <li>Mentored frontend and backend engineers across hiring, onboarding, and technical growth</li>
                  <li>Improved platform reliability and release quality through test automation initiatives</li>
                </ul>
              </div>

              <div className="print:break-inside-avoid">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary print:text-black" />
                    <h3 className="font-semibold">Software Engineer</h3>
                  </div>
                  <span className="text-sm text-muted-foreground print:text-black">2017 - 2019</span>
                </div>
                <p className="font-medium text-primary mb-1 print:text-sm print:text-black">
                  StackForge Systems, Pune, India
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 print:text-black print:text-sm">
                  <li>Built full-stack modules using React, Node.js, and PostgreSQL for enterprise clients</li>
                  <li>Collaborated with product managers to convert business requirements into technical solutions</li>
                  <li>Enhanced performance and maintainability of legacy services through refactoring initiatives</li>
                  <li>Supported release and incident workflows to improve production stability</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8 print:mb-6 print:break-before-avoid">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg print:border-black">Education</h2>
            <div className="space-y-4 print:space-y-3">
              <div className="print:break-inside-avoid">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary print:text-black" />
                    <h3 className="font-semibold">MBA in Finance &amp; Strategy</h3>
                  </div>
                  <span className="text-sm text-muted-foreground print:text-black">2017 - 2019</span>
                </div>
                <p className="font-medium text-primary mb-1 print:text-sm print:text-black">
                  Indian Institute of Management Bangalore, Bengaluru, India
                </p>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  Focused on corporate finance, financial modeling, and growth strategy for technology ventures.
                </p>
              </div>

              <div className="print:break-inside-avoid">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary print:text-black" />
                    <h3 className="font-semibold">B.Tech in Computer Science</h3>
                  </div>
                  <span className="text-sm text-muted-foreground print:text-black">2013 - 2017</span>
                </div>
                <p className="font-medium text-primary mb-1 print:text-sm print:text-black">
                  National Institute of Technology, Rourkela, India
                </p>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  Built a strong foundation in software engineering, data structures, and distributed systems.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-8 print:mb-6 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg print:border-black">
              Certifications
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary print:text-black" />
                <span className="font-medium">AWS Certified Developer - Associate</span>
                <span className="text-sm text-muted-foreground print:text-black">2022</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary print:text-black" />
                <span className="font-medium">MongoDB Certified Developer</span>
                <span className="text-sm text-muted-foreground print:text-black">2021</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary print:text-black" />
                <span className="font-medium">Google Cloud Professional Developer</span>
                <span className="text-sm text-muted-foreground print:text-black">2020</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="print:mb-6 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg print:border-black">
              Featured Projects
            </h2>
            <div className="space-y-4 print:space-y-3">
              <div className="print:break-inside-avoid">
                <h3 className="font-semibold">HealthTrack Pro</h3>
                <p className="text-sm text-primary mb-1 print:text-xs print:text-black">
                  React, Node.js, MongoDB, Chart.js
                </p>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  A comprehensive health tracking application with personalized insights and analytics dashboard.
                </p>
              </div>
              <div className="print:break-inside-avoid">
                <h3 className="font-semibold">EcoShop</h3>
                <p className="text-sm text-primary mb-1 print:text-xs print:text-black">
                  Next.js, Stripe, PostgreSQL, Tailwind CSS
                </p>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  An e-commerce platform focused on eco-friendly products with integrated payment processing and
                  inventory management.
                </p>
              </div>
              <div className="print:break-inside-avoid">
                <h3 className="font-semibold">DevConnect</h3>
                <p className="text-sm text-primary mb-1 print:text-xs print:text-black">
                  React, Firebase, Redux, Material UI
                </p>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  A social platform for developers to share projects, collaborate, and find job opportunities.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
            size: portrait;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            color: black !important;
            background: white !important;
          }
          nav,
          footer,
          .print-hidden {
            display: none !important;
          }
          h1, h2, h3, h4, h5, h6, p, li, span {
            color: black !important;
          }
          a {
            text-decoration: none !important;
            color: black !important;
          }
          .border-b {
            border-color: black !important;
          }
          .print-break-before {
            break-before: page;
          }
          .print-break-after {
            break-after: page;
          }
          .print-break-inside-avoid {
            break-inside: avoid;
          }
        }
      `}</style>
    </main>
  )
}
