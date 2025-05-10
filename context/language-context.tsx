"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type LanguageContextType = {
  language: string
  setLanguage: (language: string) => void
  t: (key: string) => string
}

const defaultLanguage = "en"

const translations = {
  en: {
    "hero.greeting": "Hi, I'm",
    "hero.role":
      "Full-stack developer specializing in modern web technologies and creating exceptional digital experiences.",
    "hero.contact": "Contact Me",
    "hero.download": "Download CV",
    "about.title": "About Me",
    "about.description1":
      "I'm a passionate developer with expertise in building modern web applications. With a strong foundation in both frontend and backend technologies, I create seamless, user-friendly experiences that solve real-world problems.",
    "about.description2":
      "My journey in tech began 5 years ago, and since then, I've worked on various projects ranging from e-commerce platforms to complex enterprise solutions. I'm constantly learning and adapting to new technologies to stay at the forefront of web development.",
    "about.education": "Education",
    "about.experience": "Experience",
    "about.interests": "Interests",
    "skills.title": "My Skills",
    "skills.description":
      "I've worked with a variety of technologies and frameworks to create robust and scalable applications. Here are some of my key skills:",
    "projects.title": "My Projects",
    "projects.description":
      "Here are some of my recent projects. Each one was built to solve a specific problem and showcase different skills and technologies.",
    "projects.viewDetails": "View Details",
    "projects.viewAll": "View All Projects",
    "blog.title": "From My Blog",
    "blog.description":
      "I write about web development, technology trends, and best practices. Check out some of my recent articles.",
    "blog.readMore": "Read More",
    "blog.viewAll": "View All Articles",
    "testimonials.title": "Testimonials",
    "testimonials.description": "Here's what clients and colleagues have to say about working with me.",
    "newsletter.title": "Subscribe to My Newsletter",
    "newsletter.description": "Get the latest articles, tutorials, and updates delivered straight to your inbox.",
    "newsletter.button": "Subscribe",
    "newsletter.success": "Thanks for subscribing! You'll receive our latest updates.",
    "newsletter.disclaimer": "By subscribing, you agree to receive emails from me. You can unsubscribe at any time.",
    "contact.title": "Get In Touch",
    "contact.description": "Have a project in mind or want to collaborate? Feel free to reach out!",
    "contact.location": "Location",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.name": "Your Name",
    "contact.subject": "Subject",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.success": "Message Sent!",
    "contact.successMessage": "Thank you for reaching out. I'll get back to you as soon as possible.",
    "footer.rights": "All rights reserved.",
  },
  es: {
    "hero.greeting": "Hola, soy",
    "hero.role":
      "Desarrollador full-stack especializado en tecnologías web modernas y en la creación de experiencias digitales excepcionales.",
    "hero.contact": "Contáctame",
    "hero.download": "Descargar CV",
    "about.title": "Sobre Mí",
    "about.description1":
      "Soy un desarrollador apasionado con experiencia en la creación de aplicaciones web modernas. Con una sólida base en tecnologías frontend y backend, creo experiencias fluidas y fáciles de usar que resuelven problemas del mundo real.",
    "about.description2":
      "Mi viaje en la tecnología comenzó hace 5 años y, desde entonces, he trabajado en varios proyectos, desde plataformas de comercio electrónico hasta soluciones empresariales complejas. Constantemente estoy aprendiendo y adaptándome a nuevas tecnologías para mantenerme a la vanguardia del desarrollo web.",
    "about.education": "Educación",
    "about.experience": "Experiencia",
    "about.interests": "Intereses",
    "skills.title": "Mis Habilidades",
    "skills.description":
      "He trabajado con una variedad de tecnologías y frameworks para crear aplicaciones robustas y escalables. Estas son algunas de mis habilidades clave:",
    "projects.title": "Mis Proyectos",
    "projects.description":
      "Aquí hay algunos de mis proyectos recientes. Cada uno fue construido para resolver un problema específico y mostrar diferentes habilidades y tecnologías.",
    "projects.viewDetails": "Ver Detalles",
    "projects.viewAll": "Ver Todos los Proyectos",
    "blog.title": "De Mi Blog",
    "blog.description":
      "Escribo sobre desarrollo web, tendencias tecnológicas y mejores prácticas. Echa un vistazo a algunos de mis artículos recientes.",
    "blog.readMore": "Leer Más",
    "blog.viewAll": "Ver Todos los Artículos",
    "testimonials.title": "Testimonios",
    "testimonials.description": "Esto es lo que clientes y colegas dicen sobre trabajar conmigo.",
    "newsletter.title": "Suscríbete a Mi Boletín",
    "newsletter.description":
      "Recibe los últimos artículos, tutoriales y actualizaciones directamente en tu bandeja de entrada.",
    "newsletter.button": "Suscribirse",
    "newsletter.success": "¡Gracias por suscribirte! Recibirás nuestras últimas actualizaciones.",
    "newsletter.disclaimer":
      "Al suscribirte, aceptas recibir correos electrónicos de mi parte. Puedes darte de baja en cualquier momento.",
    "contact.title": "Ponte en Contacto",
    "contact.description": "¿Tienes un proyecto en mente o quieres colaborar? ¡No dudes en contactarme!",
    "contact.location": "Ubicación",
    "contact.email": "Correo Electrónico",
    "contact.phone": "Teléfono",
    "contact.name": "Tu Nombre",
    "contact.subject": "Asunto",
    "contact.message": "Tu Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.success": "¡Mensaje Enviado!",
    "contact.successMessage": "Gracias por contactarme. Te responderé lo antes posible.",
    "footer.rights": "Todos los derechos reservados.",
  },
  // Add more languages as needed
}

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(defaultLanguage)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language") || defaultLanguage
    setLanguageState(savedLanguage)
  }, [])

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage)
    if (mounted) {
      localStorage.setItem("language", newLanguage)
    }
  }

  const t = (key: string) => {
    const currentTranslations = translations[language as keyof typeof translations] || translations.en
    return currentTranslations[key as keyof typeof currentTranslations] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
