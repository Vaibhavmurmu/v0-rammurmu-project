"use client"

import { useMemo, useState } from "react"
import { AlertCircle, ExternalLink, MapPin, UserCheck } from "lucide-react"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type RegistrationResponse = {
  result: {
    guidance: string[]
    source: {
      providerName: string
      attribution: string
    }
  }
}

type PollingResponse = {
  result: {
    station: {
      name: string
      address: string
      hours: string
      idRequirement: string
    }
    source: {
      providerName: string
      attribution: string
    }
  }
}

const regionInstructionByCode: Record<string, { en: string; hi: string }> = {
  CA: {
    en: "California: double-check vote-by-mail deadlines and signature requirements.",
    hi: "कैलिफ़ोर्निया: डाक मतपत्र की अंतिम तिथि और हस्ताक्षर नियम ज़रूर जांचें।",
  },
  TX: {
    en: "Texas: review accepted photo ID rules before polling day.",
    hi: "टेक्सास: मतदान से पहले स्वीकृत फोटो आईडी नियम देख लें।",
  },
  NY: {
    en: "New York: verify early voting sites and district changes before election week.",
    hi: "न्यूयॉर्क: चुनाव सप्ताह से पहले अर्ली वोटिंग केंद्र और जिला बदलाव सत्यापित करें।",
  },
}

export function PartyVoterInfo() {
  const { language, t } = useLanguage()
  const [regionCode, setRegionCode] = useState("CA")
  const [postalCode, setPostalCode] = useState("")
  const [registration, setRegistration] = useState<RegistrationResponse["result"] | null>(null)
  const [polling, setPolling] = useState<PollingResponse["result"] | null>(null)
  const [error, setError] = useState("")
  const [loadingAction, setLoadingAction] = useState<"register" | "polling" | null>(null)

  const regionAwareInstruction = useMemo(() => {
    const region = regionInstructionByCode[regionCode.toUpperCase()]
    if (!region) {
      return language === "hi"
        ? "अपने राज्य के निर्वाचन कार्यालय पर स्थानीय पंजीकरण और मतदान नियम सत्यापित करें।"
        : "Verify local registration and voting rules at your state election office."
    }

    return language === "hi" ? region.hi : region.en
  }, [language, regionCode])

  async function lookupRegistration() {
    setError("")
    setLoadingAction("register")

    try {
      const response = await fetch("/api/voter/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ regionCode: regionCode.toUpperCase(), countryCode: "US", language }),
      })

      if (!response.ok) {
        throw new Error("registration lookup failed")
      }

      const data = (await response.json()) as RegistrationResponse
      setRegistration(data.result)
    } catch {
      setError(t("voterInfo.lookupError"))
    } finally {
      setLoadingAction(null)
    }
  }

  async function lookupPollingStation() {
    setError("")
    setLoadingAction("polling")

    try {
      const response = await fetch("/api/voter/polling-station", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ regionCode: regionCode.toUpperCase(), postalCode, language }),
      })

      if (!response.ok) {
        throw new Error("polling station lookup failed")
      }

      const data = (await response.json()) as PollingResponse
      setPolling(data.result)
    } catch {
      setError(t("voterInfo.lookupError"))
    } finally {
      setLoadingAction(null)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("voterInfo.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{t("voterInfo.description")}</p>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="region-code">{t("voterInfo.regionLabel")}</Label>
              <Input
                id="region-code"
                value={regionCode}
                onChange={(event) => setRegionCode(event.target.value.toUpperCase())}
                placeholder="CA"
                maxLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal-code">{t("voterInfo.postalLabel")}</Label>
              <Input
                id="postal-code"
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                placeholder="90001"
              />
            </div>
          </div>

          <p className="rounded-md border border-dashed p-3 text-sm">{regionAwareInstruction}</p>

          <div className="flex flex-wrap gap-3">
            <Button onClick={lookupRegistration} disabled={loadingAction !== null}>
              <UserCheck className="mr-2 h-4 w-4" />
              {loadingAction === "register" ? t("voterInfo.loading") : t("voterInfo.registerCta")}
            </Button>
            <Button onClick={lookupPollingStation} variant="secondary" disabled={loadingAction !== null || !postalCode.trim()}>
              <MapPin className="mr-2 h-4 w-4" />
              {loadingAction === "polling" ? t("voterInfo.loading") : t("voterInfo.pollingCta")}
            </Button>
          </div>

          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}
        </CardContent>
      </Card>

      {registration ? (
        <Card>
          <CardHeader>
            <CardTitle>{t("voterInfo.registrationGuidance")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="list-disc space-y-2 pl-5">
              {registration.guidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      {polling ? (
        <Card>
          <CardHeader>
            <CardTitle>{t("voterInfo.pollingDetails")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>{t("voterInfo.stationName")}:</strong> {polling.station.name}
            </p>
            <p>
              <strong>{t("voterInfo.stationAddress")}:</strong> {polling.station.address}
            </p>
            <p>
              <strong>{t("voterInfo.stationHours")}:</strong> {polling.station.hours}
            </p>
            <p>
              <strong>{t("voterInfo.stationId")}:</strong> {polling.station.idRequirement}
            </p>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{t("voterInfo.disclaimerTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>{t("voterInfo.disclaimerBody")}</p>
          <div className="rounded-md bg-muted p-3">
            <p className="mb-2 flex items-center gap-2 font-medium text-foreground">
              <AlertCircle className="h-4 w-4" />
              {t("voterInfo.sourceAttribution")}
            </p>
            <ul className="space-y-1">
              {registration ? (
                <li>
                  {registration.source.providerName}: {registration.source.attribution}
                </li>
              ) : null}
              {polling ? (
                <li>
                  {polling.source.providerName}: {polling.source.attribution}
                </li>
              ) : null}
              {!registration && !polling ? <li>{t("voterInfo.sourceHint")}</li> : null}
            </ul>
            <a href="/api/voter/providers" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 underline">
              {t("voterInfo.viewProviders")}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
