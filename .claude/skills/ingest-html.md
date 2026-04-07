# Skill: Ingest New HTML Simulation Files

## Purpose
Validates that every HTML file in `public/simulations/` has a corresponding entry in
`src/lib/posts.ts`, and reports any orphaned files or missing registrations.

## Run
```bash
pnpm ingest
```

## What it does
1. Reads all `.html` files in `public/simulations/`
2. Reads all `simulationFile` values from `src/lib/posts.ts`
3. Reports:
   - ✓ Registered files (matched)
   - ⚠ Orphaned HTML (file exists, not registered in posts.ts)
   - ✗ Missing HTML (registered in posts.ts, file not found)

## Source
`scripts/ingest-html.ts`

## Adding a new category
Current categories: `oil-trading`, `genai`, `claude-code`. To add another:
1. Add it to the `Category` union in `src/lib/types.ts`
2. Add it to `CATEGORIES` in `src/lib/posts.ts`
3. Create `src/app/[new-category]/page.tsx` (copy from existing category page)
4. Create `src/app/[new-category]/[slug]/page.tsx` (copy from existing slug page)
5. Add the category to the nav in `src/components/layout/SiteHeader.tsx`
6. Add it to `CategoryFilter.tsx`, `page.tsx` (home), `utils.ts`, and `PostCard.tsx`
7. Run `/publish` — it handles all of this automatically.
