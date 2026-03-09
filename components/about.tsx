"use client"

import { SectionTitle, FadeIn, SlideIn } from "./motion-wrapper"

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <SectionTitle>About Me</SectionTitle>

        <FadeIn delay={2} className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-muted-foreground mb-6">
            I'm Vaibhav Murmu, a Co-founder & CFO with an engineering-first mindset. I lead financial strategy,
            investor planning, and operational execution while staying hands-on with product architecture and technical
            delivery.
          </p>
          <p className="text-lg text-muted-foreground">
            Over the last several years, I've worked at the intersection of finance and technology—building systems,
            guiding cross-functional teams, and translating business goals into scalable digital products. I care about
            disciplined execution, clear metrics, and long-term value creation.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <SlideIn delay={3}>
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Education</h3>
              <p className="text-muted-foreground">
                B.Tech in Computer Science
                <br />
                National Institute of Technology
                <br />
                2013 - 2017
              </p>
            </div>
          </SlideIn>

          <SlideIn delay={4}>
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Experience</h3>
              <p className="text-muted-foreground">
                Co-founder & CFO at Rammurmu Labs
                <br />
                Head of Engineering at FinEdge Technologies
                <br />
                Software Engineer at StackForge Systems
              </p>
            </div>
          </SlideIn>

          <SlideIn delay={5}>
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Interests</h3>
              <p className="text-muted-foreground">
                Startup Finance & Unit Economics
                <br />
                Product Engineering & Automation
                <br />
                Fintech Innovation
              </p>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
