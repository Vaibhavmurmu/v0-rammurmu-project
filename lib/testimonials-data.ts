export type Testimonial = {
  id: number
  content: string
  name: string
  position: string
  image: string
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    content:
      "Vaibhav combines strategic clarity with technical depth. He helped us ship faster while improving decision quality around metrics and roadmap trade-offs.",
    name: "Ananya Rao",
    position: "Founder, Runash",
    image: "/placeholder-user.jpg",
  },
  {
    id: 2,
    content:
      "Working with Vaibhav was high-impact. He can move from finance planning to product architecture discussions without losing execution momentum.",
    name: "Rohit Mehta",
    position: "VP Product, FinEdge Technologies",
    image: "/placeholder-user.jpg",
  },
  {
    id: 3,
    content:
      "He brings rare founder-level ownership. The systems he implemented improved visibility across engineering, cash planning, and delivery timelines.",
    name: "Neha Kapoor",
    position: "Operations Lead, GrowthHub",
    image: "/placeholder-user.jpg",
  },
]
