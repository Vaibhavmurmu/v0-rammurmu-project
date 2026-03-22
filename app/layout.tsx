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
// Temporarily remove problematic components
// import KeyboardShortcuts from "@/components/keyboard-shortcuts"
// import UIInteractions from "@/components/ui-interactions"
import type { Metadata } from "next"
import { partyProfile } from "@/lib/party-profile"

export const metadata: Metadata = {
  title: `${partyProfile.organization_name} | People-First Non-Profit Movement`,
  description: partyProfile.mission_statement,
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
            {/* Temporarily remove problematic components */}
            {/* <KeyboardShortcuts /> */}
            {/* <UIInteractions /> */}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
