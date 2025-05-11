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
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Print Resume
            </Button>
            <Button asChild>
              <a href="/Ram_Murmu_Resume.pdf" download="Ram_Murmu_Resume.pdf">
                <Download className="mr-2 h-4 w-4" /> Download PDF
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
              <Image src="/placeholder.svg?height=128&width=128" alt="Ram Murmu" fill className="object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2 print:text-2xl">Ram Murmu</h1>
              <p className="text-xl text-primary mb-4 print:text-lg print:mb-2">Full Stack Developer</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start print:text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>ram.murmu@example.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Bangalore, India</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>rammurmu.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8 print:mb-6">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg">Professional Summary</h2>
            <p className="text-muted-foreground print:text-black">
              Full-stack developer with 5+ years of experience specializing in modern web technologies. Proficient in
              React, Next.js, Node.js, and cloud services. Passionate about creating scalable, user-friendly
              applications with a focus on performance and accessibility. Strong problem-solving skills and experience
              working in collaborative, agile environments.
            </p>
          </div>

          {/* Skills */}
          <div className="mb-8 print:mb-6">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg">Technical Skills</h2>
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
          <div className="mb-8 print:mb-6">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg">Work Experience</h2>
            <div className="space-y-6 print:space-y-4">
              <div>
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Senior Frontend Developer</h3>
                  </div>
                  <span className="text-sm text-muted-foreground print:text-black">2022 - Present</span>
                </div>
                <p className="font-medium text-primary mb-1 print:text-sm">TechCorp Inc., San Francisco, CA</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 print:text-black print:text-sm">
                  <li>Led a team of 5 developers in building scalable web applications using React and Next.js</li>
                  <li>Improved application performance by 40% through code optimization and lazy loading</li>
                  <li>Implemented CI/CD pipelines that reduced deployment time by 60%</li>
                  <li>Mentored junior developers and conducted code reviews to maintain code quality</li>
                </ul>
              </div>

              <div>
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Full Stack Developer</h3>
                  </div>
                  <span className="text-sm text-muted-foreground print:text-black">2020 - 2022</span>
                </div>
                <p className="font-medium text-primary mb-1 print:text-sm">WebSolutions Ltd., New York, NY</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 print:text-black print:text-sm">
                  <li>Developed full-stack applications using React, Node.js, and MongoDB</li>
                  <li>Collaborated with design and product teams to deliver high-quality user experiences</li>
                  <li>Implemented authentication and authorization systems using JWT and OAuth</li>
                  <li>Optimized database queries resulting in 30% faster response times</li>
                </ul>
              </div>

              <div>
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Junior Web Developer</h3>
                  </div>
                  <span className="text-sm text-muted-foreground print:text-black">2017 - 2020</span>
                </div>
                <p className="font-medium text-primary mb-1 print:text-sm">Digital Creations, Chicago, IL</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 print:text-black print:text-sm">
                  <li>Developed and maintained client websites using HTML, CSS, JavaScript, and PHP</li>
                  <li>Collaborated with designers to implement responsive designs</li>
                  <li>Assisted in migrating legacy systems to modern frameworks</li>
                  <li>Provided technical support and troubleshooting for client websites</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8 print:mb-6">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg">Education</h2>
            <div className="space-y-4 print:space-y-3">
              <div>
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Master's in Computer Science</h3>
                  </div>
                  <span className="text-sm text-muted-foreground print:text-black">2018 - 2020</span>
                </div>
                <p className="font-medium text-primary mb-1 print:text-sm">Tech University, Boston, MA</p>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  Specialized in Software Engineering and Artificial Intelligence. Completed thesis on "Optimizing Web
                  Performance in Modern Applications".
                </p>
              </div>

              <div>
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Bachelor's in Computer Science</h3>
                  </div>
                  <span className="text-sm text-muted-foreground print:text-black">2013 - 2017</span>
                </div>
                <p className="font-medium text-primary mb-1 print:text-sm">University of Technology, Chicago, IL</p>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  Graduated with honors. Focused on web development and database systems. Completed capstone project on
                  e-commerce platform development.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-8 print:mb-6">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg">Certifications</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-medium">AWS Certified Developer - Associate</span>
                <span className="text-sm text-muted-foreground print:text-black">2022</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-medium">MongoDB Certified Developer</span>
                <span className="text-sm text-muted-foreground print:text-black">2021</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-medium">Google Cloud Professional Developer</span>
                <span className="text-sm text-muted-foreground print:text-black">2020</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="print:mb-6">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 print:text-lg">Featured Projects</h2>
            <div className="space-y-4 print:space-y-3">
              <div>
                <h3 className="font-semibold">HealthTrack Pro</h3>
                <p className="text-sm text-primary mb-1 print:text-xs">React, Node.js, MongoDB, Chart.js</p>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  A comprehensive health tracking application with personalized insights and analytics dashboard.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">EcoShop</h3>
                <p className="text-sm text-primary mb-1 print:text-xs">Next.js, Stripe, PostgreSQL, Tailwind CSS</p>
                <p className="text-muted-foreground print:text-black print:text-sm">
                  An e-commerce platform focused on eco-friendly products with integrated payment processing and
                  inventory management.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">DevConnect</h3>
                <p className="text-sm text-primary mb-1 print:text-xs">React, Firebase, Redux, Material UI</p>
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
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            color: black;
            background: white;
          }
          nav,
          footer,
          .print-hidden {
            display: none !important;
          }
        }
      `}</style>
    </main>
  )
}
