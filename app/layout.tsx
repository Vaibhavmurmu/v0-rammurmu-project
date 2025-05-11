import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/context/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import ThemeTransition from "@/components/theme-transition"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ram Murmu | Personal Portfolio",
  description:
    "Personal portfolio website of Ram Murmu, a full-stack developer specializing in modern web technologies.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ThemeTransition />
            <Header />
            {children}
            <Footer />
            <Chatbot />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
