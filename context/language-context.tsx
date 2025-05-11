"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getTranslation, getBrowserLanguage, type Language } from "@/i18n"
import { languages } from "@/i18n"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  languages: typeof languages
}

const defaultLanguage: Language = "en"

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
  languages,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = (localStorage.getItem("language") as Language) || getBrowserLanguage()
    setLanguageState(savedLanguage)
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    if (mounted) {
      localStorage.setItem("language", newLanguage)
      // Update HTML lang attribute
      document.documentElement.lang = newLanguage
    }
  }

  const t = (key: string) => {
    return getTranslation(language, key)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
