"use client"

import { SectionTitle, FadeIn, SlideIn } from "./motion-wrapper"
import { useLanguage } from "@/context/language-context"
import { partyProfile } from "@/lib/party-profile"

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <SectionTitle>{t("about.title")}</SectionTitle>

        <FadeIn delay={2} className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-muted-foreground mb-6">{t("about.description1")}</p>
          <p className="text-lg text-muted-foreground">{t("about.description2")}</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <SlideIn delay={3}>
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{t("about.foundation")}</h3>
              <p className="text-muted-foreground">
                {partyProfile.founder_name}
                <br />
                {partyProfile.founded_on}
                <br />
                {partyProfile.founded_at}
              </p>
            </div>
          </SlideIn>

          <SlideIn delay={4}>
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{t("about.legal")}</h3>
              <p className="text-muted-foreground">
                {partyProfile.organization_name}
                <br />
                {t("about.legalStatus")}: {partyProfile.legal_status}
              </p>
            </div>
          </SlideIn>

          <SlideIn delay={5}>
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{t("about.mission")}</h3>
              <p className="text-muted-foreground">{partyProfile.mission_statement}</p>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
