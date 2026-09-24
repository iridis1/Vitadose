"use client"

import { useMemo, useState } from "react"
import { nutrients, categorieLabels, type Nutrient } from "@/lib/nutrients-data"
import { NutrientSearch } from "@/components/nutrient-search"
import { NutrientTable } from "@/components/nutrient-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type FilterValue = "alles" | Nutrient["categorie"]

export function NutrientExplorer() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterValue>("alles")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return nutrients.filter((n) => {
      const matchesFilter = filter === "alles" ? true : n.categorie === filter
      const matchesQuery =
        q.length === 0 ||
        n.naam.toLowerCase().includes(q) ||
        (n.afkorting?.toLowerCase().includes(q) ?? false)
      return matchesFilter && matchesQuery
    })
  }, [query, filter])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterValue)}>
          <TabsList>
            <TabsTrigger value="alles">Alles</TabsTrigger>
            <TabsTrigger value="vitamine">{categorieLabels.vitamine}</TabsTrigger>
            <TabsTrigger value="mineraal">{categorieLabels.mineraal}</TabsTrigger>
          </TabsList>
        </Tabs>
        <NutrientSearch value={query} onChange={setQuery} />
      </div>

      <p className="text-sm text-muted-foreground" role="status">
        {filtered.length} van {nutrients.length} voedingsstoffen
      </p>

      <NutrientTable nutrients={filtered} />
    </div>
  )
}
