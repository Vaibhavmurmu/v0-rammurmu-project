"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type RegistrationState = "idle" | "registering" | "done" | "error"

export function PushAlertsRegistration({ alertsEnabled }: { alertsEnabled: boolean }) {
  const [status, setStatus] = useState<RegistrationState>("idle")
  const [message, setMessage] = useState("Enable browser alerts to get policy and event updates.")

  const isSupported = useMemo(
    () => typeof window !== "undefined" && "Notification" in window,
    []
  )

  const registerForPush = async () => {
    if (!alertsEnabled) {
      setMessage("Alerts are currently disabled until moderation and compliance checks are complete.")
      return
    }

    if (!isSupported) {
      setStatus("error")
      setMessage("This browser does not support web notifications.")
      return
    }

    setStatus("registering")
    try {
      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        setStatus("error")
        setMessage("Notification permission was not granted.")
        return
      }

      const response = await fetch("/api/notifications/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endpoint: `browser:${window.location.origin}` }),
      })

      if (!response.ok) {
        throw new Error("Unable to save subscription")
      }

      setStatus("done")
      setMessage("You are subscribed to campaign alerts.")
    } catch (error) {
      setStatus("error")
      setMessage("Could not register alerts right now. Please try again later.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Realtime Alerts</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={registerForPush}
          disabled={status === "registering" || !alertsEnabled}
          className="w-full sm:w-auto"
        >
          {status === "registering" ? "Registering..." : "Enable Web Push Alerts"}
        </Button>
      </CardContent>
    </Card>
  )
}
