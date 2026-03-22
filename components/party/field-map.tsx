import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const geographyCoverage = [
  { geographyId: "geo_north_01", name: "North Ward", completion: 64, walkableHouseholds: 420, callableContacts: 660 },
  { geographyId: "geo_south_02", name: "South Market", completion: 38, walkableHouseholds: 310, callableContacts: 520 },
]

export function FieldMap() {
  return (
    <section className="space-y-4" aria-labelledby="field-map-title">
      <h2 id="field-map-title" className="text-2xl font-semibold">Field Coverage Map</h2>
      <div className="grid gap-3 lg:grid-cols-2">
        {geographyCoverage.map((geo) => (
          <Card key={geo.geographyId}>
            <CardHeader>
              <CardTitle className="text-base">{geo.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Walk households: {geo.walkableHouseholds}</p>
              <p>Callable contacts: {geo.callableContacts}</p>
              <div className="space-y-1">
                <p>Coverage completion: {geo.completion}%</p>
                <Progress value={geo.completion} aria-label={`${geo.name} completion`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
