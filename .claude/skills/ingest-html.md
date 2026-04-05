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
If you add a category other than `oil-trading` or `genai`:
1. Add it to `CATEGORIES` in `src/lib/posts.ts`
2. Create `src/app/[new-category]/page.tsx` (copy from existing category page)
3. Add the category to the nav in `src/components/layout/SiteHeader.tsx`
