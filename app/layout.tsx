import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/context/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import ThemeTransition from "@/components/theme-transition"
import PageTransition from "@/components/page-transition"
import ScrollProgress from "@/components/scroll-progress"
import FloatingActionButton from "@/components/floating-action-button"
import CookieConsent from "@/components/cookie-consent"
import type { Metadata } from "next"
import { newBharatParty } from "@/lib/org/new-bharat-party"

export const metadata: Metadata = {
  title: `${newBharatParty.organizationName} | ${newBharatParty.nonProfitDescriptor}`,
  description: `${newBharatParty.organizationName} was founded by ${newBharatParty.founder} on ${newBharatParty.foundedDate}.`,
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ThemeTransition />
            <ScrollProgress />
            <Header />
            <PageTransition>{children}</PageTransition>
            <Footer />
            <Chatbot />
            <FloatingActionButton />
            <CookieConsent />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
