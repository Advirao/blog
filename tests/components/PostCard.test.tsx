import { render, screen } from '@testing-library/react'
import { PostCard } from '@/components/content/PostCard'
import type { Post } from '@/lib/types'

// ─── Mock next/link ───────────────────────────────────────────────────────────
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

// ─── Fixture ──────────────────────────────────────────────────────────────────
const post: Post = {
  slug: 'oil-trading-simulator',
  category: 'oil-trading',
  title: 'Crude Oil Trading Simulator',
  subtitle: 'Physical Trade · Pricing · Hedging',
  description: 'Walk through a complete physical crude trade.',
  tags: ['Physical Trading', 'Hedging', 'Forward Curve', 'DV01', 'ExtraTag'],
  simulationFile: '/simulations/oil-trading-simulator.html',
  difficulty: 'beginner',
  readTime: 45,
  lastUpdated: '2026-03-28',
  featured: false,
  downloadable: true,
  accentColor: 'accent',
  icon: '🛢️',
}

const featuredPost: Post = { ...post, featured: true }

// ─── Rendering ────────────────────────────────────────────────────────────────
describe('PostCard', () => {
  it('renders the post title', () => {
    render(<PostCard post={post} />)
    expect(screen.getByText('Crude Oil Trading Simulator')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<PostCard post={post} />)
    expect(screen.getByText('Physical Trade · Pricing · Hedging')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<PostCard post={post} />)
    expect(screen.getByText('Walk through a complete physical crude trade.')).toBeInTheDocument()
  })

  it('renders the icon', () => {
    render(<PostCard post={post} />)
    expect(screen.getByText('🛢️')).toBeInTheDocument()
  })

  it('links to the correct href', () => {
    render(<PostCard post={post} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/oil-trading/oil-trading-simulator')
  })

  it('renders the read time', () => {
    render(<PostCard post={post} />)
    expect(screen.getByText('45 min read')).toBeInTheDocument()
  })

  it('renders the category label', () => {
    render(<PostCard post={post} />)
    expect(screen.getByText('Oil Trading')).toBeInTheDocument()
  })

  it('renders the difficulty badge', () => {
    render(<PostCard post={post} />)
    expect(screen.getByText('Beginner')).toBeInTheDocument()
  })

  it('renders the Open CTA', () => {
    render(<PostCard post={post} />)
    expect(screen.getByText('Open')).toBeInTheDocument()
  })
})

// ─── Tags ─────────────────────────────────────────────────────────────────────
describe('PostCard — tags', () => {
  it('shows up to 4 tags for non-featured cards', () => {
    render(<PostCard post={post} />)
    // post has 5 tags, non-featured shows 4
    expect(screen.getByText('Physical Trading')).toBeInTheDocument()
    expect(screen.getByText('Hedging')).toBeInTheDocument()
    expect(screen.getByText('Forward Curve')).toBeInTheDocument()
    expect(screen.getByText('DV01')).toBeInTheDocument()
  })

  it('shows "+N more" when tags exceed limit', () => {
    render(<PostCard post={post} />)
    expect(screen.getByText('+1 more')).toBeInTheDocument()
  })

  it('shows up to 6 tags for featured cards', () => {
    render(<PostCard post={featuredPost} featured />)
    // 5 tags total, all should be visible (no "+more")
    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument()
  })
})

// ─── Featured ─────────────────────────────────────────────────────────────────
describe('PostCard — featured', () => {
  it('shows Featured badge when post.featured is true', () => {
    render(<PostCard post={featuredPost} />)
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('does not show Featured badge when post.featured is false', () => {
    render(<PostCard post={post} />)
    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })
})

// ─── Difficulty variants ──────────────────────────────────────────────────────
describe('PostCard — difficulty', () => {
  it('shows Intermediate label for intermediate difficulty', () => {
    render(<PostCard post={{ ...post, difficulty: 'intermediate' }} />)
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
  })

  it('shows Advanced label for advanced difficulty', () => {
    render(<PostCard post={{ ...post, difficulty: 'advanced' }} />)
    expect(screen.getByText('Advanced')).toBeInTheDocument()
  })
})
