"use client"

import { motion } from "framer-motion"
import { SectionTitle, FadeIn } from "./motion-wrapper"
import { Briefcase, GraduationCap } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const timelineItems = [
  {
    id: 1,
    title: "Senior Developer",
    company: "Runash Son's of Industries.",
    location: "Bharat, IN",
    period: "2017 - Present",
    description:
      "Led the full stack development team in building scalable web applications. Implemented modern frontend architecture using React and Next.js. Improved performance and accessibility across all projects.",
    type: "work",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Runash DIT Pvt Ltd.",
    location: "India, IN",
    period: "2021 - Present",
    description:
      "Developed full-stack applications using React, Node.js, and MongoDB. Collaborated with design and product teams to deliver high-quality user experiences. Implemented CI/CD pipelines for automated testing and deployment.",
    type: "work",
  },
  {
    id: 3,
    title: "Intermediate of Commerce ",
    institution: "Institute of Ranchi University",
    location: "Ranchi, JH",
    period: "2011 - Present",
    description:
      "Developing a foundational understanding of key business disciplines and principal including Accounting, Economics, Business Studies,and Finance.Providing a comprehensive introduction to the world of business and trade.",
    type: "education",
  },
  {
    id: 4,
    title: "Senior Developer",
    company: "RunAsh AI ",
    location: "San Francisco, CA",
    period: "2025 - Present",
    description:
      "Research and Development in LLMs, NLP, Video Classification and using Open Stack TersorFlow, PyTorch, Transformer, Keras, OpenCV and Python etc. Building a responsible AI for humanity .",
    type: "work",
  },
  {
    id: 5,
    title: "Bachelor's in Computer Science",
    institution: "Massachusetts Institute of Technology",
    location: "Cambridge,MA, USA",
    period: "2014 - Present",
    description:
      "Focused on AI and database systems. Specialized in Software Engineering and Artificial Intelligence. Working capstone project on live streaming platform development.",
    type: "education",
  },
]

export default function Timeline() {
  const { t } = useLanguage()

  return (
    <section id="timeline" className="py-20 bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <SectionTitle>Experience & Education</SectionTitle>

        <FadeIn delay={2}>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            My professional journey and educational background that have shaped my skills and expertise.
          </p>
        </FadeIn>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-muted transform md:translate-x-[-0.5px]" />

          {timelineItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-12 md:mb-8 ${
                index % 2 === 0 ? "md:ml-auto md:pl-8 md:pr-0 md:text-left" : "md:mr-auto md:pr-8 md:pl-0 md:text-right"
              } pl-12 md:w-1/2`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-0 md:left-auto ${
                  index % 2 === 0 ? "md:left-0" : "md:right-0"
                } top-0 w-9 h-9 rounded-full bg-background border-4 border-muted flex items-center justify-center transform translate-x-[-18px] ${
                  item.type === "work" ? "text-blue-500" : "text-green-500"
                }`}
              >
                {item.type === "work" ? <Briefcase className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
              </div>

              {/* Content */}
              <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-muted">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                    item.type === "work"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  }`}
                >
                  {item.period}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-primary font-medium">
                  {item.type === "work" ? item.company : item.institution} • {item.location}
                </p>
                <p className="text-muted-foreground mt-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
