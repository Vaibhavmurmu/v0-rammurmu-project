"use client"

import { useMemo, useState } from "react"

import { submitPetitionSignature } from "@/actions/advocacy"
import { DistrictSelector, type DistrictOption } from "@/components/advocacy/district-selector"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type PetitionFormProps = {
  petitionId: string
  districts: DistrictOption[]
}

type ResponseState = {
  success: boolean
  message: string
  signatureId?: string
  totalSignatures?: number
  errors?: { path: string | number; message: string }[]
}

export function PetitionForm({ petitionId, districts }: PetitionFormProps) {
  const [status, setStatus] = useState<ResponseState | null>(null)
  const [districtId, setDistrictId] = useState("")
  const [isPending, setIsPending] = useState(false)

  const isDuplicateMessage = useMemo(() => status?.message.includes("already signed") ?? false, [status?.message])

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    const result = await submitPetitionSignature(formData)
    setStatus(result)
    setIsPending(false)
  }

  const getError = (field: string) => status?.errors?.find((error) => error.path === field)?.message

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign the petition</CardTitle>
        <CardDescription>
          Sign once with your verified details. Duplicate signatures are automatically blocked.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="petitionId" value={petitionId} />
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" name="fullName" required />
            {getError("fullName") ? <p className="text-xs text-destructive">{getError("fullName")}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
            {getError("email") ? <p className="text-xs text-destructive">{getError("email")}</p> : null}
          </div>

          <DistrictSelector options={districts} value={districtId} onValueChange={setDistrictId} />
          {getError("districtId") ? <p className="text-xs text-destructive">{getError("districtId")}</p> : null}

          <div className="space-y-2">
            <Label htmlFor="message">Why this matters to you (optional)</Label>
            <Textarea id="message" name="message" rows={3} maxLength={500} />
          </div>

          <div className="space-y-3 rounded-md border p-4 text-sm">
            <p className="font-medium">Disclosures and consent</p>
            <p className="text-muted-foreground">
              We use your signature data to verify constituent support, prevent duplicate signatures, and send campaign updates relevant to this petition.
            </p>

            <div className="flex items-start gap-2">
              <Checkbox id="acknowledgedDataUsage" name="acknowledgedDataUsage" required />
              <Label htmlFor="acknowledgedDataUsage" className="font-normal">
                I acknowledge the data usage disclosure.
              </Label>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="consentToPoliticalCommunication" name="consentToPoliticalCommunication" required />
              <Label htmlFor="consentToPoliticalCommunication" className="font-normal">
                I consent to receive political communication via email regarding this campaign.
              </Label>
            </div>
          </div>

          <Button type="submit" disabled={isPending || isDuplicateMessage} className="w-full">
            {isPending ? "Submitting..." : "Submit signature"}
          </Button>
        </form>

        {status ? (
          <Alert className="mt-4" variant={status.success ? "default" : "destructive"}>
            <AlertTitle>{status.success ? "Signature recorded" : "Submission issue"}</AlertTitle>
            <AlertDescription>
              {status.message}
              {status.signatureId ? ` Signature ID: ${status.signatureId.slice(0, 12)}…` : ""}
              {typeof status.totalSignatures === "number" ? ` Total signatures: ${status.totalSignatures}.` : ""}
            </AlertDescription>
          </Alert>
        ) : null}
      </CardContent>
    </Card>
  )
}
