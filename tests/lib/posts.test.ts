import {
  posts,
  getAllPosts,
  getFeaturedPosts,
  getPostsByCategory,
  getPostBySlug,
  getCategoryMeta,
  getRelatedPosts,
  CATEGORIES,
} from '@/lib/posts'

// ─── Registry shape ───────────────────────────────────────────────────────────
describe('posts registry', () => {
  it('contains 7 posts', () => {
    expect(posts).toHaveLength(7)
  })

  it('every post has all required fields', () => {
    posts.forEach((post) => {
      expect(post.slug).toBeTruthy()
      expect(post.category).toMatch(/^(oil-trading|genai|claude-code)$/)
      expect(post.title).toBeTruthy()
      expect(post.subtitle).toBeTruthy()
      expect(post.description).toBeTruthy()
      expect(Array.isArray(post.tags)).toBe(true)
      expect(post.tags.length).toBeGreaterThan(0)
      expect(post.simulationFile).toMatch(/^\/simulations\//)
      expect(['beginner', 'intermediate', 'advanced']).toContain(post.difficulty)
      expect(post.readTime).toBeGreaterThan(0)
      expect(post.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(typeof post.featured).toBe('boolean')
      expect(typeof post.downloadable).toBe('boolean')
      expect(post.icon).toBeTruthy()
    })
  })

  it('all slugs are unique', () => {
    const slugs = posts.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all simulationFile paths are unique', () => {
    const files = posts.map((p) => p.simulationFile)
    expect(new Set(files).size).toBe(files.length)
  })
})

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
describe('CATEGORIES', () => {
  it('has exactly 3 categories', () => {
    expect(CATEGORIES).toHaveLength(3)
  })

  it('contains oil-trading, genai, and claude-code', () => {
    const slugs = CATEGORIES.map((c) => c.slug)
    expect(slugs).toContain('oil-trading')
    expect(slugs).toContain('genai')
    expect(slugs).toContain('claude-code')
  })
})

// ─── getAllPosts() ─────────────────────────────────────────────────────────────
describe('getAllPosts()', () => {
  it('returns all 7 posts', () => {
    expect(getAllPosts()).toHaveLength(7)
  })

  it('returns a new reference each call (not mutating)', () => {
    expect(getAllPosts()).toEqual(getAllPosts())
  })
})

// ─── getFeaturedPosts() ───────────────────────────────────────────────────────
describe('getFeaturedPosts()', () => {
  it('returns only posts with featured=true', () => {
    const featured = getFeaturedPosts()
    expect(featured.length).toBeGreaterThan(0)
    featured.forEach((p) => expect(p.featured).toBe(true))
  })

  it('does not include non-featured posts', () => {
    const featured = getFeaturedPosts()
    const notFeatured = posts.filter((p) => !p.featured)
    notFeatured.forEach((p) => {
      expect(featured.find((f) => f.slug === p.slug)).toBeUndefined()
    })
  })
})

// ─── getPostsByCategory() ─────────────────────────────────────────────────────
describe('getPostsByCategory()', () => {
  it('returns 4 oil-trading posts', () => {
    expect(getPostsByCategory('oil-trading')).toHaveLength(4)
  })

  it('returns 2 genai posts', () => {
    expect(getPostsByCategory('genai')).toHaveLength(2)
  })

  it('returns 1 claude-code post', () => {
    expect(getPostsByCategory('claude-code')).toHaveLength(1)
  })

  it('all returned posts match the requested category', () => {
    const oilPosts = getPostsByCategory('oil-trading')
    oilPosts.forEach((p) => expect(p.category).toBe('oil-trading'))

    const genaiPosts = getPostsByCategory('genai')
    genaiPosts.forEach((p) => expect(p.category).toBe('genai'))
  })
})

// ─── getPostBySlug() ──────────────────────────────────────────────────────────
describe('getPostBySlug()', () => {
  it('finds the oil-trading-simulator post', () => {
    const post = getPostBySlug('oil-trading', 'oil-trading-simulator')
    expect(post).toBeDefined()
    expect(post?.title).toBe('Crude Oil Trading Simulator')
  })

  it('finds the genai-phases-1-3 post', () => {
    const post = getPostBySlug('genai', 'genai-phases-1-3')
    expect(post).toBeDefined()
    expect(post?.category).toBe('genai')
  })

  it('returns undefined for a nonexistent slug', () => {
    expect(getPostBySlug('oil-trading', 'nonexistent')).toBeUndefined()
  })

  it('returns undefined when category does not match slug', () => {
    // oil-trading-simulator exists under oil-trading, not genai
    expect(getPostBySlug('genai', 'oil-trading-simulator')).toBeUndefined()
  })

  it('finds the claude-code-interactive-simulator post', () => {
    const post = getPostBySlug('claude-code', 'claude-code-interactive-simulator')
    expect(post).toBeDefined()
    expect(post?.category).toBe('claude-code')
  })

  it('returns undefined for claude-code-interactive-simulator under genai', () => {
    // post moved from genai to claude-code
    expect(getPostBySlug('genai', 'claude-code-interactive-simulator')).toBeUndefined()
  })
})

// ─── getCategoryMeta() ────────────────────────────────────────────────────────
describe('getCategoryMeta()', () => {
  it('returns oil-trading meta with correct fields', () => {
    const meta = getCategoryMeta('oil-trading')
    expect(meta).toBeDefined()
    expect(meta?.label).toBe('Oil Trading')
    expect(meta?.icon).toBeTruthy()
    expect(meta?.description).toBeTruthy()
    expect(meta?.accentColor).toBeTruthy()
  })

  it('returns genai meta', () => {
    const meta = getCategoryMeta('genai')
    expect(meta).toBeDefined()
    expect(meta?.label).toBe('GenAI Engineering')
  })

  it('returns claude-code meta', () => {
    const meta = getCategoryMeta('claude-code')
    expect(meta).toBeDefined()
    expect(meta?.label).toBe('Claude Code')
  })
})

// ─── getRelatedPosts() ────────────────────────────────────────────────────────
describe('getRelatedPosts()', () => {
  const oilTradingSimulator = posts.find((p) => p.slug === 'oil-trading-simulator')!

  it('excludes the current post', () => {
    const related = getRelatedPosts(oilTradingSimulator)
    expect(related.find((p) => p.slug === oilTradingSimulator.slug)).toBeUndefined()
  })

  it('returns only posts from the same category', () => {
    const related = getRelatedPosts(oilTradingSimulator)
    related.forEach((p) => expect(p.category).toBe(oilTradingSimulator.category))
  })

  it('respects the limit parameter', () => {
    expect(getRelatedPosts(oilTradingSimulator, 2)).toHaveLength(2)
    expect(getRelatedPosts(oilTradingSimulator, 1)).toHaveLength(1)
  })

  it('defaults to 3 related posts', () => {
    const related = getRelatedPosts(oilTradingSimulator)
    expect(related.length).toBeLessThanOrEqual(3)
  })

  it('returns fewer posts if category has less than limit', () => {
    const genaiPost = posts.find((p) => p.slug === 'genai-phases-1-3')!
    // Only 2 genai posts, so related for one = at most 1
    const related = getRelatedPosts(genaiPost, 3)
    expect(related.length).toBe(1)
  })
})
