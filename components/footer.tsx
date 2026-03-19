"use client"

import Link from "next/link"
import { Github, Instagram, Linkedin, Twitter } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 backdrop-blur-sm py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="#home" className="text-2xl font-bold">
              Vaibhav<span className="text-primary">Murmu</span>
            </Link>
            
          </div>

          <div className="flex gap-4">
            <Link href="https://github.com/vaibhavmurmu" className="p-2 rounded-full bg-background/80 hover:bg-primary/20 transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com/in/vaibhavmurmu" className="p-2 rounded-full bg-background/80 hover:bg-primary/20 transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://x.com/vaibhavmurmu" className="p-2 rounded-full bg-background/80 hover:bg-primary/20 transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://instagram.com/vaibhav.murmu" className="p-2 rounded-full bg-background/80 hover:bg-primary/20 transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Vaibhav Murmu. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
