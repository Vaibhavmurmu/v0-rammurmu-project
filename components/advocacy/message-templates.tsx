"use client"

import { useMemo, useState } from "react"
import { Copy, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DistrictSelector, type DistrictOption } from "@/components/advocacy/district-selector"

const templates = [
  {
    id: "voter-access",
    title: "Protect voter access",
    subject: "Support policies that expand voter access",
    body: "Hello Representative {rep},\n\nI am a constituent from {district}. I am asking you to support legislation that protects early voting, accessible polling locations, and reliable voter registration systems. Please prioritize policies that make voting easier for working families and first-time voters.\n\nThank you,\n{senderName}",
  },
  {
    id: "local-funding",
    title: "Fund election infrastructure",
    subject: "Invest in secure, local election infrastructure",
    body: "Dear {rep},\n\nAs a resident of {district}, I urge you to fund secure election infrastructure, including poll worker training and accessible polling equipment. Our community needs a voting process that is secure, transparent, and dependable.\n\nSincerely,\n{senderName}",
  },
]

type MessageTemplatesProps = {
  districts: DistrictOption[]
}

export function MessageTemplates({ districts }: MessageTemplatesProps) {
  const [districtId, setDistrictId] = useState("")
  const [senderName, setSenderName] = useState("Concerned constituent")

  const selectedDistrict = useMemo(() => districts.find((district) => district.id === districtId), [districtId, districts])

  const replaceTokens = (text: string) => {
    return text
      .replaceAll("{rep}", selectedDistrict?.representative ?? "Representative")
      .replaceAll("{district}", selectedDistrict?.name ?? "my district")
      .replaceAll("{senderName}", senderName)
  }

  const onCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Contact your representatives</h2>
        <p className="text-sm text-muted-foreground">Choose a district, personalize your name, and copy a prefilled email.</p>
      </div>

      <Card>
        <CardContent className="pt-6 grid gap-4 md:grid-cols-2">
          <DistrictSelector options={districts} value={districtId} onValueChange={setDistrictId} />
          <div className="space-y-2">
            <Label htmlFor="sender-name">Your name</Label>
            <Textarea id="sender-name" value={senderName} onChange={(event) => setSenderName(event.target.value)} rows={1} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => {
          const fullMessage = `Subject: ${replaceTokens(template.subject)}\n\n${replaceTokens(template.body)}`

          return (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Mail className="h-4 w-4" />
                  {template.title}
                </CardTitle>
                <CardDescription>{replaceTokens(template.subject)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea value={replaceTokens(template.body)} readOnly rows={9} />
                <Button type="button" variant="outline" className="w-full" onClick={() => onCopy(fullMessage)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy template
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
