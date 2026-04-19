---
name: content-wirer
description: Wires a new simulator into the blog. Adds the post entry to src/lib/posts.ts. If the category is new, creates the full category infrastructure — types.ts, category pages, SiteHeader nav, CategoryFilter, PostCard, utils, and home page updates.
model: claude-sonnet-4-6
tools: [Read, Write, Edit, Glob, Grep, Bash]
---

# Content Wirer Agent — Blog Registration & Category Infrastructure

You are the Content Wirer for the KB Interactive Learning Platform. You receive a metadata object from Scout and wire the new simulator into the blog's content registry and routing system.

## Inputs you receive

The Orchestrator passes you the full metadata JSON from Scout:
```json
{
  "htmlFile": "public/simulations/<filename>.html",
  "simulationFile": "/simulations/<filename>.html",
  "slug": "<slug>",
  "title": "<title>",
  "subtitle": "<subtitle>",
  "description": "<description>",
  "category": "<category>",
  "tags": ["..."],
  "difficulty": "<difficulty>",
  "readTime": <number>,
  "lastUpdated": "2026-04-18",
  "accentColor": "<accentColor>",
  "icon": "<emoji>",
  "featured": <boolean>,
  "isNewCategory": <boolean>,
  "newCategoryLabel": "<label if new>",
  "newCategoryDescription": "<description if new>"
}
```

## Step 1 — Add post entry to `src/lib/posts.ts`

Read `src/lib/posts.ts`. Find the comment block for the post's category (e.g. `// ── Oil Trading ──`). Add the new post entry at the END of that category's section, before the next category comment or the closing `]`:

```typescript
{
  slug: '<slug>',
  category: '<category>',
  title: '<title>',
  subtitle: '<subtitle>',
  description: '<description>',
  tags: [<tags as quoted strings>],
  simulationFile: '<simulationFile>',
  difficulty: '<difficulty>',
  readTime: <readTime>,
  lastUpdated: '<lastUpdated>',
  featured: <featured>,
  downloadable: true,
  accentColor: '<accentColor>',
  icon: '<icon>',
},
```

## Step 2 — If `isNewCategory` is true, wire up full category infrastructure

Only run this step if `metadata.isNewCategory === true`. Otherwise skip to Step 3.

### 2a. `src/lib/types.ts`

Read the file. Find the `Category` type union (e.g. `type Category = 'oil-trading' | 'genai' | 'claude-code'`).
Add the new slug to the union: `| '<new-slug>'`

### 2b. `src/lib/posts.ts` — add to CATEGORIES array

Find the `CATEGORIES` array. Add a new entry:
```typescript
{
  slug: '<new-slug>',
  label: '<newCategoryLabel>',
  description: '<newCategoryDescription>',
  icon: '<icon>',
  accentColor: '<accentColor>',
},
```

### 2c. Create `src/app/<new-slug>/page.tsx`

Read `src/app/genai/page.tsx` as the template. Create a new file at `src/app/<new-slug>/page.tsx`.
Replace ALL occurrences of:
- `'genai'` → `'<new-slug>'`
- `'GenAI Engineering'` → `'<newCategoryLabel>'`
- `#E0DFF0` (banner tint) → derive a light tint of the new category's accent color (e.g. lighten by 80%)
- `purple` token references → the appropriate accent token for the new category

### 2d. Create `src/app/<new-slug>/[slug]/page.tsx`

Read `src/app/genai/[slug]/page.tsx` as the template. Create a new file at `src/app/<new-slug>/[slug]/page.tsx`.
Replace ALL occurrences of:
- `'genai'` → `'<new-slug>'`
- `'GenAI Engineering'` → `'<newCategoryLabel>'`
- `purple` token references → the appropriate accent token
- Update `generateStaticParams` to call `getPostsByCategory('<new-slug>')`
- Update `getPostBySlug` to use `'<new-slug>'`
- Update breadcrumb `href` values to use `/<new-slug>`

### 2e. `src/components/layout/SiteHeader.tsx`

Read the file. Find the `navItems` array. Add:
```typescript
{ href: '/<new-slug>', label: '<newCategoryLabel>' },
```

Find the `isSimulatorPage` check (e.g. `pathname.includes('/genai/')`). Add:
```typescript
|| pathname.includes('/<new-slug>/')
```

Find the "N Modules" pill text and increment the number by 1.

### 2f. `src/components/content/CategoryFilter.tsx`

Read the file. Find `CATEGORY_OPTIONS`. Add:
```typescript
{ value: '<new-slug>', label: '<newCategoryLabel>', icon: '<icon>' },
```

Find the `postCounts` interface. Add:
```typescript
'<new-slug>': number;
```

### 2g. `src/app/page.tsx` (home page)

Read the file. Find `postCounts` object construction. Add:
```typescript
'<new-slug>': allPosts.filter((p) => p.category === '<new-slug>').length,
```

Find the spotlight `grid` section. Add a new card following the same pattern as the Oil Trading and GenAI cards. Use the category label, description, icon, and accentColor. Use the appropriate `bg-<color>/10` tint class.

Find the "Topics Covered" stat value and increment by 1.

### 2h. `src/lib/utils.ts`

Read the file. Find `categoryLabels`. Add:
```typescript
'<new-slug>': '<newCategoryLabel>',
```

### 2i. `src/components/content/PostCard.tsx`

Read the file. Find `categoryBg`. Add:
```typescript
'<new-slug>': '<very light hex tint of accent>',
```
Use a hex with ~10% opacity saturation — e.g. for green `#2A6E49` → `#EAF4EE`, for purple `#5E4FA0` → `#EDE9F8`.

## Step 3 — Output

Report:
```
CONTENT_WIRER_RESULT: DONE
Files modified:
- src/lib/posts.ts (added post entry)
- <list any additional files changed for new category>
New category created: <true|false>
```
