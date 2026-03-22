import { z } from "zod"

const approvedProviderSchema = z.object({
  id: z.enum(["eac", "state_election_office"]),
  name: z.string().min(2),
  baseUrl: z.url(),
  attribution: z.string().min(8),
})

export type ApprovedProvider = z.infer<typeof approvedProviderSchema>

const APPROVED_PROVIDERS: ApprovedProvider[] = [
  {
    id: "eac",
    name: "U.S. Election Assistance Commission",
    baseUrl: process.env.CIVIC_PROVIDER_EAC_URL ?? "https://www.eac.gov",
    attribution: "U.S. Election Assistance Commission official voter resources",
  },
  {
    id: "state_election_office",
    name: "State Election Office Directory",
    baseUrl: process.env.CIVIC_PROVIDER_STATE_URL ?? "https://www.usa.gov",
    attribution: "USA.gov state and local election office directory",
  },
]

const sanitizedProviders = APPROVED_PROVIDERS.map((provider) => approvedProviderSchema.parse(provider))

export const registerLookupSchema = z.object({
  regionCode: z.string().min(2).max(32),
  countryCode: z.string().length(2).default("US"),
  language: z.enum(["en", "hi"]).default("en"),
})

export const pollingLookupSchema = z.object({
  regionCode: z.string().min(2).max(32),
  postalCode: z.string().min(3).max(12),
  language: z.enum(["en", "hi"]).default("en"),
})

export function listApprovedProviders() {
  return sanitizedProviders.map(({ id, name, attribution }) => ({ id, name, attribution }))
}

function assertApprovedProviderUrl(url: string) {
  const parsed = new URL(url)
  const isApproved = sanitizedProviders.some((provider) => {
    const providerUrl = new URL(provider.baseUrl)
    return providerUrl.host === parsed.host && providerUrl.protocol === parsed.protocol
  })

  if (!isApproved) {
    throw new Error("provider URL is not approved")
  }

  return parsed
}

async function safeProxyGet(url: string, searchParams: Record<string, string>) {
  const approvedUrl = assertApprovedProviderUrl(url)
  Object.entries(searchParams).forEach(([key, value]) => {
    approvedUrl.searchParams.set(key, value)
  })

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 3500)

  try {
    const response = await fetch(approvedUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      signal: controller.signal,
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    const contentType = response.headers.get("content-type") ?? ""
    if (!contentType.includes("application/json")) {
      return null
    }

    return response.json()
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

export async function lookupRegistrationGuidance(payload: z.infer<typeof registerLookupSchema>) {
  const provider = sanitizedProviders[0]
  const proxied = await safeProxyGet(provider.baseUrl, {
    region: payload.regionCode,
    country: payload.countryCode,
    lang: payload.language,
  })

  return {
    regionCode: payload.regionCode,
    countryCode: payload.countryCode,
    source: {
      providerId: provider.id,
      providerName: provider.name,
      attribution: provider.attribution,
    },
    guidance:
      proxied?.guidance ??
      [
        payload.language === "hi"
          ? "राज्य निर्वाचन कार्यालय की वेबसाइट पर जाकर मतदाता पंजीकरण की अंतिम तिथि देखें।"
          : "Check your state election office website for the voter registration deadline.",
        payload.language === "hi"
          ? "नाम, पता और पहचान दस्तावेज़ की जानकारी एक जैसी रखें।"
          : "Ensure your legal name, address, and ID records are consistent.",
        payload.language === "hi"
          ? "आवेदन जमा करने के बाद पुष्टि संख्या सुरक्षित रखें।"
          : "Save your registration confirmation number after submission.",
      ],
  }
}

export async function lookupPollingStation(payload: z.infer<typeof pollingLookupSchema>) {
  const provider = sanitizedProviders[1]
  const proxied = await safeProxyGet(provider.baseUrl, {
    region: payload.regionCode,
    postalCode: payload.postalCode,
    lang: payload.language,
  })

  return {
    regionCode: payload.regionCode,
    postalCode: payload.postalCode,
    station:
      proxied?.station ??
      (payload.language === "hi"
        ? {
            name: "आपका स्थानीय निर्वाचन केंद्र",
            address: `${payload.regionCode} क्षेत्र सेवा केंद्र`,
            hours: "सुबह 7:00 बजे - शाम 7:00 बजे",
            idRequirement: "सरकारी फोटो आईडी",
          }
        : {
            name: "Local Election Service Center",
            address: `${payload.regionCode} regional service office`,
            hours: "7:00 AM - 7:00 PM",
            idRequirement: "Government-issued photo ID",
          }),
    source: {
      providerId: provider.id,
      providerName: provider.name,
      attribution: provider.attribution,
    },
  }
}
