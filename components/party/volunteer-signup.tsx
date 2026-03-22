"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type VolunteerSignupProps = {
  defaultRole?: "supporter" | "organizer"
}

export function VolunteerSignup({ defaultRole = "supporter" }: VolunteerSignupProps) {
  const [role, setRole] = useState<"supporter" | "organizer">(defaultRole)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>Volunteer Signup</CardTitle>
          <Badge variant="outline" className="capitalize">
            {role}
          </Badge>
        </div>
        <CardDescription>
          Capture outreach consent and assign supporters to verified walk/call programs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" placeholder="Asha Verma" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="asha@campaign.org" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="+1 202 555 0199" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value: "supporter" | "organizer") => setRole(value)}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supporter">Supporter</SelectItem>
                <SelectItem value="organizer">Organizer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3 rounded-lg border p-3">
          <p className="text-sm font-medium">Outreach communication consent</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Checkbox id="consent_sms" defaultChecked />
              <Label htmlFor="consent_sms">SMS</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="consent_email" defaultChecked />
              <Label htmlFor="consent_email">Email</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="consent_phone" defaultChecked />
              <Label htmlFor="consent_phone">Phone calls</Label>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            By signing up you agree to campaign outreach handling and record retention. Review the
            {" "}
            <a className="underline" href="/privacy#outreach-consent">
              outreach consent notice
            </a>
            {" "}
            and
            {" "}
            <a className="underline" href="/privacy#data-retention">
              data retention policy
            </a>
            .
          </p>
        </div>

        <Button type="button">Submit volunteer profile</Button>
      </CardContent>
    </Card>
  )
}
