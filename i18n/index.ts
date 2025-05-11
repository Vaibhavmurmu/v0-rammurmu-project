import { en } from "./locales/en"
import { es } from "./locales/es"
import { fr } from "./locales/fr"
import { de } from "./locales/de"
import { hi } from "./locales/hi"
import { ja } from "./locales/ja"

export type Language = "en" | "es" | "fr" | "de" | "hi" | "ja"

export const languages = {
  en: {
    name: "English",
    flag: "🇺🇸",
    code: "en",
  },
  es: {
    name: "Español",
    flag: "🇪🇸",
    code: "es",
  },
  fr: {
    name: "Français",
    flag: "🇫🇷",
    code: "fr",
  },
  de: {
    name: "Deutsch",
    flag: "🇩🇪",
    code: "de",
  },
  hi: {
    name: "हिन्दी",
    flag: "🇮🇳",
    code: "hi",
  },
  ja: {
    name: "日本語",
    flag: "🇯🇵",
    code: "ja",
  },
}

export const translations = {
  en,
  es,
  fr,
  de,
  hi,
  ja,
}

export function getTranslation(language: Language, key: string): string {
  const languageTranslations = translations[language] || translations.en
  return languageTranslations[key] || key
}

export function getBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language.split("-")[0]
  return (browserLang in languages ? browserLang : "en") as Language
}
