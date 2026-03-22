export type NewBharatPartyConfig = {
  organizationName: string
  nonProfitDescriptor: string
  founder: string
  foundedDate: string
  address: string
  missionStatement: string
  contactEmail: string
  socialLinks: {
    x: string
    linkedin: string
    github: string
  }
}

export const newBharatParty: NewBharatPartyConfig = {
  organizationName: "New Bharat Party",
  nonProfitDescriptor: "People-first non-profit movement",
  founder: "Vaibhav Murmu",
  foundedDate: "April 1, 2026",
  address: "Bokaro Industrial Area, Jharkhand, Bharat 827014",
  missionStatement:
    "Build a people-first movement rooted in transparent governance, local opportunity, and inclusive growth for every household in Bharat.",
  contactEmail: "connect@newbharatparty.org",
  socialLinks: {
    x: "https://x.com/newbharatparty",
    linkedin: "https://www.linkedin.com/company/newbharatparty",
    github: "https://github.com/newbharatparty",
  },
}
