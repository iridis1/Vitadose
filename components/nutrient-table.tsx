"use client"

import { Fragment, useState } from "react"
import type { Nutrient } from "@/lib/nutrients-data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"

interface NutrientTableProps {
  nutrients: Nutrient[]
}

function formatAdh(nutrient: Nutrient) {
  const isWhole = Number.isInteger(nutrient.adh)
  const value = isWhole ? nutrient.adh : nutrient.adh.toFixed(1).replace(".0", "")
  return `${value} ${nutrient.eenheid}`
}

export function NutrientTable({ nutrients }: NutrientTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (nutrients.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        Geen resultaten gevonden. Probeer een andere zoekterm.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[45%]">Naam</TableHead>
            <TableHead>ADH (RI)</TableHead>
            <TableHead className="hidden md:table-cell">Oplosbaarheid</TableHead>
            <TableHead className="w-10" aria-hidden="true" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {nutrients.map((nutrient) => {
            const isOpen = expanded === nutrient.naam
            return (
              <Fragment key={nutrient.naam}>
                <TableRow
                  className="cursor-pointer"
                  onClick={() => setExpanded(isOpen ? null : nutrient.naam)}
                  aria-expanded={isOpen}
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{nutrient.naam}</span>
                      {nutrient.afkorting && (
                        <span className="text-xs text-muted-foreground">{nutrient.afkorting}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono font-semibold tabular-nums">
                      {formatAdh(nutrient)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {nutrient.oplosbaarheid ?? "—"}
                  </TableCell>
                  <TableCell>
                    {isOpen ? (
                      <ChevronUp className="size-4 text-muted-foreground" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
                    )}
                  </TableCell>
                </TableRow>
                {isOpen && (
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableCell colSpan={4} className="py-4">
                      <dl className="grid gap-4">
                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Functie
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-foreground">{nutrient.functie}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Goede bronnen
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-foreground">{nutrient.bronnen}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Bij tekort
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-foreground">
                            {nutrient.tekortSymptomen}
                          </dd>
                        </div>
                      </dl>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
