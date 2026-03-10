export type BlogPost = {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
  image: string
  category: string
  content: string
}

export const blogPostsData: BlogPost[] = [
  {
    id: 1,
    title: "From Idea to Launch: Building Runash in 12 Weeks",
    excerpt:
      "How we moved from concept validation to production with a lean product roadmap, weekly milestones, and clear success metrics.",
    date: "January 12, 2026",
    readTime: "7 min read",
    slug: "from-idea-to-launch-runash",
    image: "/runash-logo.jpeg",
    category: "Product & Execution",
    content: `
      <p>Building quickly is easy. Building quickly <em>with discipline</em> is hard. Over a focused 12-week cycle, we shipped the first production version of Runash with a small cross-functional team.</p>
      <h2>What made it work</h2>
      <ul>
        <li>One measurable objective per sprint</li>
        <li>Strict scope control tied to user outcomes</li>
        <li>Continuous feedback from early adopters</li>
      </ul>
      <h2>Execution model</h2>
      <p>Each week followed a repeatable loop: plan on Monday, ship by Thursday, review on Friday. This created predictable momentum and helped us de-risk product decisions fast.</p>
      <h2>Key lesson</h2>
      <p>Velocity without clarity increases rework. Clarity first, speed second.</p>
    `,
  },
  {
    id: 2,
    title: "Finance for Builders: The KPI Stack I Use as a CFO",
    excerpt:
      "A practical framework for founders and technical teams to track cash runway, contribution margin, and product efficiency in one dashboard.",
    date: "February 03, 2026",
    readTime: "9 min read",
    slug: "finance-for-builders-kpi-stack",
    image: "/rammurmu.jpg",
    category: "Finance & Strategy",
    content: `
      <p>As a Co-founder and CFO, I treat finance as a product system. A small KPI stack can align engineering, growth, and operations.</p>
      <h2>Three numbers we never miss</h2>
      <ol>
        <li>Runway (months)</li>
        <li>Gross contribution margin</li>
        <li>Acquisition payback period</li>
      </ol>
      <p>We review these weekly with context from product and engineering velocity. Better decisions happen when numbers and execution are discussed together.</p>
    `,
  },
  {
    id: 3,
    title: "Architecture Decisions for a Fast-Moving Next.js Product",
    excerpt:
      "Design trade-offs that helped us keep developer velocity high while maintaining code quality, observability, and deployment confidence.",
    date: "February 24, 2026",
    readTime: "8 min read",
    slug: "architecture-decisions-nextjs-product",
    image: "/placeholder.jpg",
    category: "Engineering",
    content: `
      <p>In early-stage products, architecture should reduce coordination overhead—not add it. We used a modular feature-first structure with shared primitives.</p>
      <h2>Decisions that paid off</h2>
      <ul>
        <li>Shared typed data contracts between UI and APIs</li>
        <li>Reusable UI patterns to reduce design drift</li>
        <li>Simple CI checks to keep main branch releasable</li>
      </ul>
      <p>The goal was not perfect architecture. It was reliable iteration with fewer regressions.</p>
    `,
  },
  {
    id: 4,
    title: "Hiring Early Engineers: What We Optimized For",
    excerpt:
      "How we evaluated problem-solving, ownership, and communication to build a small but high-leverage engineering team.",
    date: "March 01, 2026",
    readTime: "6 min read",
    slug: "hiring-early-engineers",
    image: "/placeholder-user.jpg",
    category: "Leadership",
    content: `
      <p>Early hiring decisions shape product culture. We optimized for ownership and systems thinking over narrow specialization.</p>
      <h2>Our interview focus</h2>
      <ul>
        <li>How candidates structure ambiguous problems</li>
        <li>Ability to communicate trade-offs clearly</li>
        <li>Evidence of shipping and learning loops</li>
      </ul>
      <p>Small teams win when every member can execute independently and collaborate deeply.</p>
    `,
  },
]
