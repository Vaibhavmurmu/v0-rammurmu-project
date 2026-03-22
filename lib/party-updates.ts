export type UpdateCategory = "announcement" | "press_release" | "campaign" | "community"

export type NewsUpdate = {
  id: string
  title: string
  summary: string
  published_at: string
  location?: string
  category: UpdateCategory
}

export type PolicyPriority = "high" | "medium" | "low"

export type PolicyPosition = {
  id: string
  title: string
  stance: string
  details: string
  priority: PolicyPriority
  last_updated_at: string
}

export type EventStatus = "upcoming" | "completed" | "cancelled"

export type PartyEvent = {
  id: string
  title: string
  starts_at: string
  ends_at?: string
  location: string
  status: EventStatus
  description: string
}

export const newsUpdates: NewsUpdate[] = [
  {
    id: "update-001",
    title: "District Listening Tour: Bokaro Week 1 Highlights",
    summary:
      "The campaign opened 12 community listening circles focused on jobs, irrigation, and school transport access.",
    published_at: "2026-03-20T12:30:00Z",
    location: "Bokaro, Jharkhand",
    category: "campaign",
  },
  {
    id: "update-002",
    title: "Public Safety Policy Draft Open for Review",
    summary:
      "Residents can now comment on the draft ward-level safety and street-lighting accountability framework.",
    published_at: "2026-03-18T08:00:00Z",
    category: "announcement",
  },
  {
    id: "update-003",
    title: "Press Briefing: Transparency Dashboard Roadmap",
    summary:
      "The team shared milestones for publishing donation disclosures and constituency grievance closure rates.",
    published_at: "2026-03-15T10:15:00Z",
    category: "press_release",
  },
]

export const policyPositions: PolicyPosition[] = [
  {
    id: "policy-001",
    title: "Youth Employment",
    stance: "Launch district-level apprenticeship partnerships with local industries.",
    details:
      "Create a public-private apprenticeship mission with transparent hiring metrics and quarterly progress reporting.",
    priority: "high",
    last_updated_at: "2026-03-19T09:00:00Z",
  },
  {
    id: "policy-002",
    title: "Primary Healthcare",
    stance: "Upgrade primary health centers with doctor availability SLAs.",
    details:
      "Introduce staffing rotation and telemedicine backup to reduce patient wait times in rural blocks.",
    priority: "high",
    last_updated_at: "2026-03-17T11:30:00Z",
  },
  {
    id: "policy-003",
    title: "Water Resilience",
    stance: "Prioritize ward-level rainwater harvesting and maintenance budgets.",
    details:
      "Publish water-table dashboards and ring-fence maintenance funds for pre-monsoon desilting.",
    priority: "medium",
    last_updated_at: "2026-03-14T07:45:00Z",
  },
]

export const partyEvents: PartyEvent[] = [
  {
    id: "event-001",
    title: "Ward 14 Community Sabha",
    starts_at: "2026-03-25T11:00:00Z",
    ends_at: "2026-03-25T13:00:00Z",
    location: "Sector 9 Community Hall, Bokaro",
    status: "upcoming",
    description: "Open forum for road safety, drainage, and sanitation planning inputs.",
  },
  {
    id: "event-002",
    title: "Women Entrepreneurs Roundtable",
    starts_at: "2026-03-21T09:30:00Z",
    location: "Chas Civic Center",
    status: "completed",
    description: "Session on market access, credit onboarding, and procurement transparency.",
  },
  {
    id: "event-003",
    title: "Education Infrastructure Walkthrough",
    starts_at: "2026-03-28T06:30:00Z",
    location: "Bermana School Cluster",
    status: "upcoming",
    description: "On-site review of classroom repairs and safe transport stop-points.",
  },
]
