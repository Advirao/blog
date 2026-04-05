# Skill: Deploy to Production

## Primary: Vercel (automatic)
Every push to `main` triggers GitHub Actions → Vercel deploy.

```bash
git push origin main
# GitHub Actions runs: pnpm install → pnpm build → vercel deploy
```

## Manual Vercel deploy
```bash
npx vercel --prod
```

## Required environment variables (set in Vercel dashboard)
```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Preview deployments
Every PR automatically gets a preview URL from Vercel.

## Rollback
```bash
npx vercel rollback
```

## Build locally before pushing
```bash
pnpm build && pnpm start
# Visit http://localhost:3000 to verify
```
