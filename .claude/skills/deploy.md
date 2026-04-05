# Skill: Deploy to Production

## Overview
The site auto-deploys to Vercel via GitHub Actions on every push to `main`.
Pull requests get automatic preview URLs.

---

## One-time GitHub + Vercel setup

### Step 1 — Push repo to GitHub
```bash
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### Step 2 — Import project on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`
5. Click Deploy

### Step 3 — Link Vercel project locally
```bash
pnpm dlx vercel link
# This creates .vercel/project.json with orgId and projectId
```

### Step 4 — Add GitHub Actions secrets
Go to **GitHub → repo → Settings → Secrets and variables → Actions** and add:

| Secret | Where to find it |
|---|---|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `.vercel/project.json` → `"orgId"` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` → `"projectId"` |

> **Note:** Add `.vercel/` to `.gitignore` so these IDs aren't committed.

### Step 5 — Push and verify
```bash
git push origin main
# Watch the Actions tab on GitHub — should go green in ~2 minutes
```

---

## Day-to-day deployments

### Automatic (recommended)
```bash
git push origin main
# GitHub Actions: install → ingest → type-check → build → vercel deploy --prod
```

### Manual Vercel CLI
```bash
pnpm dlx vercel --prod
```

### Preview (any branch or PR)
Any pull request automatically gets a preview URL from Vercel.
```bash
git checkout -b feature/new-post
git push origin feature/new-post
# Open a PR → Vercel posts a preview URL as a PR comment
```

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Full URL of the site (no trailing slash) |

Set in: Vercel dashboard → Project → Settings → Environment Variables.
For local dev, copy `.env.example` to `.env.local` and fill in.

---

## Rollback
```bash
# Via Vercel dashboard: Deployments → pick a previous one → Promote to Production
# Via CLI:
pnpm dlx vercel rollback
```

---

## Build locally before pushing
```bash
pnpm build && pnpm start
# Visit http://localhost:3000 — must match production behavior
```
