# /publish — Publish a new simulator to the blog

## What this does
Guides you through adding a new HTML simulator and publishing it live in one flow.

## Steps to follow when this command is invoked

### 1. Find unpublished HTML files
- Read `src/lib/posts.ts` and collect all `simulationFile` values already registered
- List all `.html` files in `public/simulations/`
- Identify any HTML files NOT yet registered in `posts.ts`
- If none found, tell the user "No new HTML files found in public/simulations/ — drop your .html file there first, then run /publish again." and stop.
- If multiple unregistered files found, ask the user which one they want to publish now.

### 2. Collect metadata
Ask the user these questions one at a time (wait for answers):
1. **Title** — e.g. "Crude Oil Trading Simulator"
2. **Subtitle** — one short line, e.g. "Full physical trade walkthrough"
3. **Description** — 1–2 sentences shown on the card and in Google search
4. **Category** — `oil-trading` or `genai`
5. **Tags** — comma-separated, e.g. "Hedging, Crude, Risk"
6. **Difficulty** — `beginner`, `intermediate`, or `advanced`
7. **Read time** — estimated minutes (just a number)
8. **Accent color** — pick one: `accent` (green), `gold`, `blue`, `danger` (red), `purple`, `teal`
9. **Icon** — one emoji, e.g. 🛢️ or 🤖
10. **Featured?** — yes or no (featured posts appear at the top of the home page)

### 3. Generate the slug
- Derive it from the title: lowercase, spaces → hyphens, remove special chars
- e.g. "Crude Oil Trading Simulator" → `crude-oil-trading-simulator`
- Show the user the slug and confirm before proceeding

### 4. Add entry to posts.ts
- Open `src/lib/posts.ts`
- Add the new entry to the `posts` array using all collected metadata
- Set `lastUpdated` to today's date
- Set `downloadable: true`
- Set `simulationFile` to `/simulations/<filename>.html`

### 5. Validate
- Run `pnpm ingest`
- If it fails, show the error and fix it before continuing

### 6. Commit and push
```bash
git add public/simulations/<filename>.html src/lib/posts.ts
git commit -m "feat: add post — <Title>"
git push origin main
```

### 7. Done
Tell the user:
- The post is now live (after ~2 min GitHub Actions build)
- The URL will be: `https://advirao.github.io/blog/<category>/<slug>`
- They can watch the build at: `https://github.com/Advirao/blog/actions`
