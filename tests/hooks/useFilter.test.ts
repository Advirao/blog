import { renderHook, act } from '@testing-library/react'
import { useFilter } from '@/hooks/useFilter'
import type { Post } from '@/lib/types'

// ─── Fixtures ─────────────────────────────────────────────────────────────────
const makePost = (overrides: Partial<Post>): Post => ({
  slug: 'test-slug',
  category: 'oil-trading',
  title: 'Test Title',
  subtitle: 'Test Subtitle',
  description: 'Test description text',
  tags: ['TagA', 'TagB'],
  simulationFile: '/simulations/test.html',
  difficulty: 'beginner',
  readTime: 10,
  lastUpdated: '2026-01-01',
  featured: false,
  downloadable: false,
  accentColor: 'accent',
  icon: '🧪',
  ...overrides,
})

const posts: Post[] = [
  makePost({ slug: 'post-1', category: 'oil-trading', title: 'Crude Oil', difficulty: 'beginner', tags: ['Physical Trading', 'Hedging'] }),
  makePost({ slug: 'post-2', category: 'oil-trading', title: 'Exposure Report', difficulty: 'intermediate', tags: ['VaR', 'DV01'] }),
  makePost({ slug: 'post-3', category: 'oil-trading', title: 'Freight Logistics', difficulty: 'advanced', tags: ['Freight', 'Worldscale'] }),
  makePost({ slug: 'post-4', category: 'genai', title: 'GenAI Phases 1-3', difficulty: 'beginner', tags: ['Python', 'RAG'] }),
  makePost({ slug: 'post-5', category: 'genai', title: 'GenAI Phases 4-6', difficulty: 'intermediate', tags: ['MCP', 'Agents'] }),
]

// ─── Initial state ────────────────────────────────────────────────────────────
describe('useFilter — initial state', () => {
  it('returns all posts with default filter', () => {
    const { result } = renderHook(() => useFilter(posts))
    expect(result.current.filtered).toHaveLength(5)
  })

  it('default filter is all/all/empty', () => {
    const { result } = renderHook(() => useFilter(posts))
    expect(result.current.filter.category).toBe('all')
    expect(result.current.filter.difficulty).toBe('all')
    expect(result.current.filter.search).toBe('')
  })
})

// ─── Category filter ──────────────────────────────────────────────────────────
describe('useFilter — category filter', () => {
  it('filters to oil-trading posts', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() => result.current.setFilter((f) => ({ ...f, category: 'oil-trading' })))
    expect(result.current.filtered).toHaveLength(3)
    result.current.filtered.forEach((p) => expect(p.category).toBe('oil-trading'))
  })

  it('filters to genai posts', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() => result.current.setFilter((f) => ({ ...f, category: 'genai' })))
    expect(result.current.filtered).toHaveLength(2)
    result.current.filtered.forEach((p) => expect(p.category).toBe('genai'))
  })

  it('all category returns all posts', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() => result.current.setFilter((f) => ({ ...f, category: 'oil-trading' })))
    act(() => result.current.setFilter((f) => ({ ...f, category: 'all' })))
    expect(result.current.filtered).toHaveLength(5)
  })
})

// ─── Difficulty filter ────────────────────────────────────────────────────────
describe('useFilter — difficulty filter', () => {
  it('filters to beginner posts', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() => result.current.setFilter((f) => ({ ...f, difficulty: 'beginner' })))
    expect(result.current.filtered).toHaveLength(2)
    result.current.filtered.forEach((p) => expect(p.difficulty).toBe('beginner'))
  })

  it('filters to intermediate posts', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() => result.current.setFilter((f) => ({ ...f, difficulty: 'intermediate' })))
    expect(result.current.filtered).toHaveLength(2)
  })

  it('filters to advanced posts', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() => result.current.setFilter((f) => ({ ...f, difficulty: 'advanced' })))
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].slug).toBe('post-3')
  })
})

// ─── Search filter ────────────────────────────────────────────────────────────
describe('useFilter — search filter', () => {
  it('filters by title (case-insensitive)', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() => result.current.setFilter((f) => ({ ...f, search: 'crude' })))
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].slug).toBe('post-1')
  })

  it('filters by tag (case-insensitive)', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() => result.current.setFilter((f) => ({ ...f, search: 'var' })))
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].slug).toBe('post-2')
  })

  it('filters by subtitle', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() => result.current.setFilter((f) => ({ ...f, search: 'Test Subtitle' })))
    // All posts share the same subtitle fixture
    expect(result.current.filtered).toHaveLength(5)
  })

  it('returns empty array when no match', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() => result.current.setFilter((f) => ({ ...f, search: 'zzznomatch' })))
    expect(result.current.filtered).toHaveLength(0)
  })

  it('clearing search restores all posts', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() => result.current.setFilter((f) => ({ ...f, search: 'crude' })))
    act(() => result.current.setFilter((f) => ({ ...f, search: '' })))
    expect(result.current.filtered).toHaveLength(5)
  })
})

// ─── Combined filters ─────────────────────────────────────────────────────────
describe('useFilter — combined filters', () => {
  it('category + difficulty narrows results', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() =>
      result.current.setFilter({
        category: 'oil-trading',
        difficulty: 'beginner',
        search: '',
      })
    )
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].slug).toBe('post-1')
  })

  it('category + search narrows results', () => {
    const { result } = renderHook(() => useFilter(posts))
    act(() =>
      result.current.setFilter({
        category: 'genai',
        difficulty: 'all',
        search: 'phases 4',
      })
    )
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].slug).toBe('post-5')
  })
})
