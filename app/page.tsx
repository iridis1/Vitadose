import { NutrientExplorer } from "@/components/nutrient-explorer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <h1 className="font-semibold text-foreground sm:text-3xl">
            ADH Vitaminen & Mineralen
          </h1>

        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <NutrientExplorer />
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
          <p>
            De vermelde ADH-waarden zijn gebaseerd op de Europese referentie-innames (RI) voor
            volwassenen en dienen als algemene richtlijn. De persoonlijke behoefte kan verschillen
            per leeftijd, geslacht, leefstijl en gezondheidssituatie. Raadpleeg bij twijfel een
            (huis)arts of diëtist.
          </p>
        </div>
      </footer>
    </main>
  )
}
