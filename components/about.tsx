"use client"

import { SectionTitle, FadeIn, SlideIn } from "./motion-wrapper"

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <SectionTitle>About Me</SectionTitle>

        <FadeIn delay={2} className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-muted-foreground mb-6">
            I'm a passionate developer with expertise in building modern web applications. With a strong foundation in
            both frontend and backend technologies, I create seamless, user-friendly experiences that solve real-world
            problems.and Activ politician in Bhartiya Janta party.
          </p>
          <p className="text-lg text-muted-foreground">
            My journey in tech began 5 years ago, and since then, I've worked on various projects ranging from
            e-commerce platforms to complex enterprise solutions. I'm constantly learning and adapting to new
            technologies to stay at the forefront of web development.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <SlideIn delay={3}>
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Education</h3>
              <p className="text-muted-foreground">
                Bachelor's in Computer Science
                <br />
                Massachusetts Institute of Technology
                <br />
                2026 - 3031
              </p>
            </div>
          </SlideIn>

          <SlideIn delay={4}>
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Experience</h3>
              <p className="text-muted-foreground">
                Senior Developer at RunAsh AI
                <br />
                Frontend Lead at WebSolutions
                <br />
                Full-Stack Developer
              </p>
            </div>
          </SlideIn>

          <SlideIn delay={5}>
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Interests</h3>
              <p className="text-muted-foreground">
                Open Source Contribution
                <br />
                UI/UX Design
                <br />
                Artificial Intelligence
              </p>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
