import { newBharatParty } from "@/lib/org/new-bharat-party"

export type PartyProfile = {
  organization_name: string
  legal_status: string
  founder_name: string
  founded_on: string
  founded_at: string
  mission_statement: string
}

export const partyProfile: PartyProfile = {
  organization_name: newBharatParty.organizationName,
  legal_status: newBharatParty.nonProfitDescriptor,
  founder_name: newBharatParty.founder,
  founded_on: newBharatParty.foundedDate,
  founded_at: newBharatParty.address,
  mission_statement: newBharatParty.missionStatement,
}
