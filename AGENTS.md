# Vitadose agent instructions

## Project overview

Vitadose is a data-driven Next.js 16 app for browsing Dutch recommended daily intakes of vitamins and minerals. The nutrient catalog is static and the main search/filter behavior runs client-side.

## Commands

Use pnpm, as specified by the `packageManager` field in `package.json`.

- Install dependencies: `pnpm install`
- Start the development server: `pnpm dev`
- Build for production: `pnpm build`
- Run the production server: `pnpm start`
- Run the Playwright end-to-end suite: `pnpm test:e2e`
- Run one test by name: `pnpm test:e2e -- --grep "Zoekt B12, klapt het resultaat uit en controleert de waarden"`
- Run one test file: `pnpm exec playwright test e2e/nutrinum.spec.ts`
- Run Playwright headed: `pnpm test:e2e:headed`

There is no lint script configured in `package.json`.

## Architecture

- `app/` contains the Next.js App Router entry point. `app/page.tsx` composes the page shell and nutrient explorer; `app/layout.tsx` defines document metadata and global layout.
- `components/nutrient-explorer.tsx` owns search and category-filter state, filters the catalog, and passes the result to `components/nutrient-table.tsx`, which renders rows and expandable details.
- `components/ui/` contains reusable UI primitives built around Base UI and Tailwind CSS.
- `lib/nutrients-data.ts` is the typed source of truth for nutrient information and category labels.
- `e2e/nutrinum.spec.ts` contains Playwright acceptance tests for searching, category filtering, and expanded nutrient details.

## Conventions

- Extend the static nutrient catalog in `lib/nutrients-data.ts` for nutrient additions or edits; the app does not use an API or database for this data.
- Nutrient records use Dutch field names and include `naam`, `categorie`, `adh`, `eenheid`, `functie`, `bronnen`, and `tekortSymptomen`; `afkorting` and `oplosbaarheid` are optional.
- Keep user-facing UI text in Dutch and update tests when changing labels or displayed values.
- Use the `@/*` import alias configured in `tsconfig.json`.
- Keep search/filter state and logic in `NutrientExplorer`; keep `NutrientTable` focused on rendering rows and their expanded details.
- Search currently matches the nutrient name and optional abbreviation, not the detail fields.
- Reuse the wrappers in `components/ui/` for shared controls. They follow the project's Base UI and Tailwind styling patterns.
- Preserve accessible roles and state attributes used by the E2E tests, including `searchbox`, `status`, `tab`, and `aria-expanded`.
