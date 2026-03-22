"use client"

import { useMemo, useState } from "react"

import { DistrictSelector, type DistrictOption } from "@/components/advocacy/district-selector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type PollingStationHelperProps = {
  districts: (DistrictOption & { pollingPlace: string; openHours: string; requiredId: string })[]
}

export function PollingStationHelper({ districts }: PollingStationHelperProps) {
  const [districtId, setDistrictId] = useState("")
  const selected = useMemo(() => districts.find((district) => district.id === districtId), [districtId, districts])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find your polling station</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DistrictSelector options={districts} value={districtId} onValueChange={setDistrictId} />

        {selected ? (
          <div className="rounded-md border p-4 text-sm space-y-2">
            <p>
              <span className="font-medium">Polling place:</span> {selected.pollingPlace}
            </p>
            <p>
              <span className="font-medium">Hours:</span> {selected.openHours}
            </p>
            <p>
              <span className="font-medium">ID requirement:</span> {selected.requiredId}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Select a district to view polling station details.</p>
        )}
      </CardContent>
    </Card>
  )
}
