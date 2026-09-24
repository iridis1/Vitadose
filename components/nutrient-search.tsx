"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface NutrientSearchProps {
  value: string
  onChange: (value: string) => void
}

export function NutrientSearch({ value, onChange }: NutrientSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder="Zoek een vitamine of mineraal..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
        aria-label="Zoek een vitamine of mineraal"
      />
    </div>
  )
}
