# Skill: Deploy to GitHub Pages

## Live URL
https://advirao.github.io/blog

## How it works
Every push to `main` triggers GitHub Actions which:
1. Installs dependencies
2. Validates simulation files (`pnpm ingest`)
3. Type-checks (`tsc --noEmit`)
4. Runs tests (`pnpm test`)
5. Builds static export (`pnpm build` with `NEXT_PUBLIC_BASE_PATH=/blog`)
6. Deploys the `out/` folder to GitHub Pages

## One-time GitHub setup (already done)
1. GitHub → Advirao/blog → Settings → Pages
2. Source → **GitHub Actions**
3. Done — no tokens or secrets needed

## Day-to-day deployment
```bash
git push origin main
# Actions tab on GitHub shows live progress
# Site updates at https://advirao.github.io/blog in ~2 minutes
```

## Build locally (simulate production)
```bash
NEXT_PUBLIC_BASE_PATH=/blog pnpm build
# Static files output to ./out/
# Open out/index.html in a browser to verify
```

## Important: basePath
The repo lives at `/blog` on GitHub Pages, so all builds must set:
```
NEXT_PUBLIC_BASE_PATH=/blog
```
This is set automatically in the GitHub Actions workflow. Do NOT set it in `.env.local` — it would break local dev at `http://localhost:3000`.
