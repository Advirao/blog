# Skill: Add a New Interactive Post

## When to use
When the user wants to publish a new topic/simulation to the blog.

## Steps

### 1. Place the HTML file
```bash
cp your-new-file.html public/simulations/your-new-file.html
```

### 2. Register it in src/lib/posts.ts
Add a new entry to the `posts` array:
```typescript
{
  slug: 'your-slug',                    // URL: /oil-trading/your-slug
  category: 'oil-trading',             // or 'genai'
  title: 'Your Title',
  subtitle: 'Short subtitle',
  description: 'One-paragraph description for the card and SEO meta.',
  tags: ['Tag1', 'Tag2'],
  simulationFile: '/simulations/your-new-file.html',
  difficulty: 'intermediate',          // 'beginner' | 'intermediate' | 'advanced'
  readTime: 20,                         // minutes
  lastUpdated: '2026-04-05',
  featured: false,
  downloadable: true,
  accentColor: 'accent',               // 'accent' | 'gold' | 'blue' | 'danger'
  icon: '📊',
}
```

### 3. Run the ingest script
```bash
pnpm ingest
```
This validates the file exists in `/public/simulations/` and the slug is unique.

### 4. Test locally
```bash
pnpm dev
# Visit http://localhost:3000/oil-trading/your-slug
```

### 5. Commit and push
```bash
git add .
git commit -m "feat: add post — Your Title"
git push origin main
```
GitHub Actions will auto-deploy to Vercel.
