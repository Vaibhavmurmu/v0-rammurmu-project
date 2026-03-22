import { policyPositions } from "@/lib/party-updates"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const formatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

export function PolicyStanceList() {
  return (
    <section className="space-y-4" aria-labelledby="policy-stance-title">
      <h2 id="policy-stance-title" className="text-2xl font-semibold">
        Policy Positions
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {policyPositions.map((policy) => (
          <Card key={policy.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg">{policy.title}</CardTitle>
                <Badge className="uppercase">{policy.priority}</Badge>
              </div>
              <CardDescription>
                Last updated {formatter.format(new Date(policy.last_updated_at))}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">{policy.stance}</p>
              <p className="text-sm text-muted-foreground">{policy.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
