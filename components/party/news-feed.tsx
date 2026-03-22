import { newsUpdates } from "@/lib/party-updates"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const formatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

export function NewsFeed() {
  return (
    <section className="space-y-4" aria-labelledby="news-feed-title">
      <h2 id="news-feed-title" className="text-2xl font-semibold">
        News Updates
      </h2>
      <div className="space-y-3">
        {newsUpdates.map((update) => (
          <Card key={update.id}>
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg">{update.title}</CardTitle>
                <Badge variant="outline" className="capitalize">
                  {update.category.replace("_", " ")}
                </Badge>
              </div>
              <CardDescription>
                {formatter.format(new Date(update.published_at))}
                {update.location ? ` • ${update.location}` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{update.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
