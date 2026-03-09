export type Project = {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  screenshots?: string[]
  tags: string[]
  categories: string[]
  liveUrl?: string
  githubUrl: string
  slug: string
  featured: boolean
  challenge?: string
  solution?: string
  features?: string[]
  technologies?: {
    frontend?: string[]
    backend?: string[]
    devops?: string[]
    payment?: string[]
  }
  outcome?: string
}

const projectScreenshots = ["/runash-logo.jpeg", "/rammurmu.jpg", "/placeholder.jpg"]

export const projectsData: Project[] = [
  {
    id: 1,
    title: "HealthTrack Pro",
    description: "A comprehensive health tracking application with personalized insights and analytics dashboard.",
    longDescription:
      "HealthTrack Pro is a full-stack application designed to help users monitor their health metrics, set goals, and track progress over time. The application features a personalized dashboard with data visualization, goal setting and tracking, custom workout plans, and nutrition tracking.",
    image: "/runash-logo.jpeg",
    screenshots: projectScreenshots,
    tags: ["React", "Node.js", "MongoDB", "Chart.js"],
    categories: ["Web App", "Full Stack", "Healthcare"],
    githubUrl: "https://github.com/vaibhavmurmu/healthtrack-pro",
    slug: "healthtrack-pro",
    featured: true,
    challenge:
      "The main challenge was to create an intuitive interface for tracking various health metrics while providing meaningful insights and visualizations that help users understand their progress and make informed decisions about their health.",
    solution:
      "I developed a modular architecture with a React frontend and Node.js backend, using MongoDB for flexible data storage. The application uses Chart.js for data visualization and implements a responsive design for seamless use across devices.",
    features: [
      "Personalized dashboard with health metrics overview",
      "Goal setting and progress tracking",
      "Custom workout plan generation",
      "Nutrition tracking and meal planning",
      "Data visualization with interactive charts",
      "Reminder system for medications and activities",
    ],
    technologies: {
      frontend: ["React", "Redux", "Chart.js", "Tailwind CSS"],
      backend: ["Node.js", "Express", "MongoDB", "JWT Authentication"],
      devops: ["Docker", "GitHub Actions", "AWS"],
    },
    outcome:
      "The application has helped users improve their health metrics by providing clear insights and actionable recommendations. The intuitive interface and comprehensive tracking features have received positive feedback from users and healthcare professionals.",
  },
  {
    id: 2,
    title: "EcoShop",
    description:
      "An e-commerce platform focused on eco-friendly products with integrated payment processing and inventory management.",
    longDescription:
      "EcoShop is a modern e-commerce platform specializing in eco-friendly and sustainable products. The application includes features like product catalog with filtering and search, shopping cart and checkout process, payment processing with Stripe, order management, and an admin dashboard for inventory management.",
    image: "/rammurmu.jpg",
    screenshots: projectScreenshots,
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    categories: ["E-commerce", "Full Stack", "Web App"],
    githubUrl: "https://github.com/vaibhavmurmu/ecoshop",
    slug: "ecoshop",
    featured: true,
    challenge:
      "The challenge was to create a seamless shopping experience that highlights the eco-friendly aspects of products while providing robust e-commerce functionality including inventory management, secure payments, and order processing.",
    solution:
      "I built the platform using Next.js for server-side rendering and SEO optimization, integrated Stripe for secure payment processing, and implemented a PostgreSQL database for reliable data storage. The admin dashboard provides comprehensive inventory and order management tools.",
    features: [
      "Product catalog with advanced filtering and search",
      "Shopping cart and secure checkout process",
      "Payment processing with Stripe",
      "Order tracking and management",
      "Admin dashboard for inventory management",
      "Customer account management",
      "Product reviews and ratings",
    ],
    technologies: {
      frontend: ["Next.js", "React", "Tailwind CSS", "SWR"],
      backend: ["Node.js", "Express", "PostgreSQL", "Prisma ORM"],
      payment: ["Stripe API", "PayPal Integration"],
      devops: ["Vercel", "GitHub Actions"],
    },
    outcome:
      "The platform has successfully showcased eco-friendly products to a wider audience, with a conversion rate 15% higher than industry average. The intuitive interface and smooth checkout process have contributed to positive customer feedback and repeat purchases.",
  },
  {
    id: 3,
    title: "DevConnect",
    description: "A social platform for developers to share projects, collaborate, and find job opportunities.",
    longDescription:
      "DevConnect is a social networking platform designed specifically for developers to showcase their work, collaborate on projects, and find job opportunities. The platform includes user profiles with portfolio showcases, project sharing and collaboration tools, job board with filtering options, and real-time messaging.",
    image: "/placeholder.jpg",
    screenshots: projectScreenshots,
    tags: ["React", "Firebase", "Redux", "Material UI"],
    categories: ["Web App", "Full Stack", "Social Network"],
    githubUrl: "https://github.com/vaibhavmurmu/devconnect",
    slug: "devconnect",
    featured: true,
  },
  {
    id: 4,
    title: "SmartHome Hub",
    description: "IoT dashboard for controlling and monitoring smart home devices with real-time updates.",
    longDescription:
      "SmartHome Hub is a centralized dashboard for managing and monitoring IoT devices in a smart home environment. The application features device control panels, automation rules and scheduling, energy usage monitoring, and real-time notifications and alerts.",
    image: "/placeholder-user.jpg",
    screenshots: projectScreenshots,
    tags: ["Vue.js", "Express", "Socket.io", "MongoDB"],
    categories: ["Web App", "IoT", "Dashboard"],
    githubUrl: "https://github.com/vaibhavmurmu/smarthome-hub",
    slug: "smarthome-hub",
    featured: false,
  },
  {
    id: 5,
    title: "TravelBuddy",
    description: "Travel planning application with itinerary management, expense tracking, and location recommendations.",
    longDescription:
      "TravelBuddy is a comprehensive travel planning application designed to help users plan trips, manage itineraries, track expenses, and discover new destinations. The app includes trip planning and itinerary management, interactive maps with points of interest, expense tracking and budgeting, and AI-powered destination recommendations.",
    image: "/placeholder.jpg",
    screenshots: projectScreenshots,
    tags: ["React Native", "GraphQL", "AWS", "MapBox"],
    categories: ["Mobile App", "Travel", "Full Stack"],
    githubUrl: "https://github.com/vaibhavmurmu/travelbuddy",
    slug: "travelbuddy",
    featured: false,
  },
  {
    id: 6,
    title: "CodeReview AI",
    description: "AI-powered code review tool that provides suggestions and identifies potential bugs and security issues.",
    longDescription:
      "CodeReview AI is an intelligent code analysis tool that leverages machine learning to provide automated code reviews, identify potential bugs, and suggest improvements. The tool features automated code quality analysis, security vulnerability detection, performance optimization suggestions, and integration with popular version control systems.",
    image: "/placeholder.jpg",
    screenshots: projectScreenshots,
    tags: ["Python", "TensorFlow", "FastAPI", "Docker"],
    categories: ["AI", "Developer Tool", "Web App"],
    githubUrl: "https://github.com/vaibhavmurmu/codereview-ai",
    slug: "codereview-ai",
    featured: false,
  },
  {
    id: 7,
    title: "FinTrack",
    description:
      "Personal finance management application with budgeting tools, expense tracking, and financial insights.",
    longDescription:
      "FinTrack is a comprehensive personal finance management application that helps users track expenses, create budgets, and gain insights into their spending habits. The application includes expense tracking and categorization, budget creation and monitoring, financial goal setting, and data visualization for spending analysis.",
    image: "/placeholder.jpg",
    screenshots: projectScreenshots,
    tags: ["React", "Node.js", "PostgreSQL", "D3.js"],
    categories: ["Web App", "Finance", "Full Stack"],
    githubUrl: "https://github.com/vaibhavmurmu/fintrack",
    slug: "fintrack",
    featured: false,
  },
  {
    id: 8,
    title: "LegalDoc AI",
    description: "AI-powered legal document analysis and generation tool for legal professionals.",
    longDescription:
      "LegalDoc AI is an intelligent document analysis and generation tool designed specifically for legal professionals. The application uses natural language processing to analyze legal documents, extract key information, and generate standardized legal documents based on user inputs.",
    image: "/placeholder.jpg",
    screenshots: projectScreenshots,
    tags: ["Python", "NLP", "Django", "React"],
    categories: ["AI", "Legal Tech", "Web App"],
    githubUrl: "https://github.com/vaibhavmurmu/legaldoc-ai",
    slug: "legaldoc-ai",
    featured: false,
  },
]
