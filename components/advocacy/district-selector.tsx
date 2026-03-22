import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type DistrictOption = {
  id: string
  name: string
  representative: string
}

type DistrictSelectorProps = {
  options: DistrictOption[]
  label?: string
  name?: string
  value?: string
  onValueChange?: (value: string) => void
}

export function DistrictSelector({
  options,
  label = "District / Constituency",
  name = "districtId",
  value,
  onValueChange,
}: DistrictSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} value={value} onValueChange={onValueChange}>
        <SelectTrigger id={name}>
          <SelectValue placeholder="Select your district" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name} — {option.representative}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
