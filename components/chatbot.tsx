"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send, ChevronDown, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Sample predefined responses
const botResponses: Record<string, string[]> = {
  greeting: [
    "Hello! I'm Ram's virtual assistant. How can I help you today?",
    "Hi there! I'm here to help you navigate Ram's portfolio. What would you like to know?",
    "Welcome! I can help answer questions about Ram's work and experience. What are you interested in?",
  ],
  skills: [
    "Ram specializes in full-stack development with expertise in React, Next.js, Node.js, and various database technologies. He also has experience with cloud services and DevOps.",
    "Ram's technical skills include frontend development (React, Next.js), backend development (Node.js, Express), database management (MongoDB, PostgreSQL), and DevOps (Docker, AWS).",
  ],
  experience: [
    "Ram has over 5 years of experience in web development. He has worked as a Senior Frontend Developer at TechCorp, Full Stack Developer at WebSolutions, and Junior Web Developer at Digital Creations.",
    "Ram's professional journey includes 5+ years in web development across various roles, from junior developer to senior frontend developer, working with diverse technologies and industries.",
  ],
  projects: [
    "Ram has worked on several notable projects including HealthTrack Pro (health tracking app), EcoShop (e-commerce platform), and DevConnect (developer social platform). You can view all projects in the Projects section.",
    "Some of Ram's featured projects include a health tracking application, an eco-friendly e-commerce platform, and a social network for developers. Each project showcases different skills and technologies.",
  ],
  contact: [
    "You can contact Ram through the contact form in the Contact section. Alternatively, you can email him directly at ram.murmu@example.com.",
    "The best way to reach Ram is through the contact form on this website or via email at ram.murmu@example.com. He's always open to discussing new opportunities and collaborations.",
  ],
  education: [
    "Ram holds a Master's in Computer Science from Tech University and a Bachelor's in Computer Science from the University of Technology.",
    "Ram's educational background includes a Master's degree specializing in Software Engineering and AI, and a Bachelor's degree focused on web development and database systems.",
  ],
  default: [
    "I'm not sure I understand. Could you rephrase your question?",
    "I don't have information about that yet. Would you like to know about Ram's skills, experience, projects, or how to contact him?",
    "I'm still learning! Could you ask about something related to Ram's portfolio, like his skills, projects, or experience?",
  ],
}

// Function to determine the type of user query
function categorizeQuery(query: string): string {
  query = query.toLowerCase()

  if (/hi|hello|hey|greetings/i.test(query)) {
    return "greeting"
  } else if (/skills|technologies|tech stack|languages|frameworks|proficient|good at/i.test(query)) {
    return "skills"
  } else if (/experience|work|job|career|professional|company|companies/i.test(query)) {
    return "experience"
  } else if (/projects|portfolio|work|built|created|developed|applications|apps/i.test(query)) {
    return "projects"
  } else if (/contact|email|phone|reach|message|connect/i.test(query)) {
    return "contact"
  } else if (/education|degree|university|college|school|study|studied/i.test(query)) {
    return "education"
  } else {
    return "default"
  }
}

// Function to get a random response from the appropriate category
function getBotResponse(query: string): string {
  const category = categorizeQuery(query)
  const responses = botResponses[category] || botResponses.default
  return responses[Math.floor(Math.random() * responses.length)]
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm Ram's virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot thinking and typing
    setTimeout(
      () => {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: getBotResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  return (
    <>
      {/* Chat button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 rounded-full shadow-lg" size="icon">
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          <span className="sr-only">{isOpen ? "Close chat" : "Open chat"}</span>
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] max-h-[calc(100vh-120px)] bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50 flex flex-col"
          >
            {/* Chat header */}
            <div className="p-4 border-b flex items-center justify-between bg-muted/50">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Bot Avatar" />
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Ram's Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask me anything about Ram's portfolio</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Minimize</span>
              </Button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-current animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-current animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
