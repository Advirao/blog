import {
  cn,
  formatDate,
  readTimeLabel,
  accentTextClass,
  accentBorderClass,
  accentBgClass,
  accentGlowClass,
  difficultyConfig,
  categoryLabels,
} from '@/lib/utils'
import type { AccentColor, Difficulty } from '@/lib/types'

// ─── cn() ─────────────────────────────────────────────────────────────────────
describe('cn()', () => {
  it('returns a single class unchanged', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('joins multiple classes', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('deduplicates via tailwind-merge (later class wins)', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles conditional falsy values', () => {
    expect(cn('base', false && 'hidden', null, undefined, 'extra')).toBe('base extra')
  })

  it('handles object syntax from clsx', () => {
    expect(cn({ active: true, inactive: false })).toBe('active')
  })
})

// ─── formatDate() ─────────────────────────────────────────────────────────────
describe('formatDate()', () => {
  it('formats an ISO date string', () => {
    // Output is locale-dependent but should contain the year
    const result = formatDate('2026-03-28')
    expect(result).toContain('2026')
  })

  it('includes the month abbreviation', () => {
    const result = formatDate('2026-01-15')
    expect(result).toMatch(/Jan/)
  })

  it('handles end-of-year dates', () => {
    const result = formatDate('2025-12-31')
    expect(result).toContain('2025')
    expect(result).toMatch(/Dec/)
  })
})

// ─── readTimeLabel() ──────────────────────────────────────────────────────────
describe('readTimeLabel()', () => {
  it('formats singular minute', () => {
    expect(readTimeLabel(1)).toBe('1 min read')
  })

  it('formats plural minutes', () => {
    expect(readTimeLabel(30)).toBe('30 min read')
  })

  it('handles zero', () => {
    expect(readTimeLabel(0)).toBe('0 min read')
  })
})

// ─── accentTextClass ──────────────────────────────────────────────────────────
describe('accentTextClass', () => {
  const colors: AccentColor[] = ['accent', 'gold', 'blue', 'danger', 'purple', 'teal']

  it.each(colors)('has an entry for %s', (color) => {
    expect(accentTextClass[color]).toBeDefined()
    expect(accentTextClass[color]).toMatch(/^text-/)
  })

  it('maps accent to text-accent', () => {
    expect(accentTextClass['accent']).toBe('text-accent')
  })
})

// ─── accentBorderClass ────────────────────────────────────────────────────────
describe('accentBorderClass', () => {
  const colors: AccentColor[] = ['accent', 'gold', 'blue', 'danger', 'purple', 'teal']

  it.each(colors)('has an entry for %s', (color) => {
    expect(accentBorderClass[color]).toMatch(/^border-/)
  })
})

// ─── accentBgClass ────────────────────────────────────────────────────────────
describe('accentBgClass', () => {
  const colors: AccentColor[] = ['accent', 'gold', 'blue', 'danger', 'purple', 'teal']

  it.each(colors)('has a bg-*/10 class for %s', (color) => {
    expect(accentBgClass[color]).toMatch(/^bg-.+\/10$/)
  })
})

// ─── accentGlowClass ──────────────────────────────────────────────────────────
describe('accentGlowClass', () => {
  it('returns a shadow class for all accent colors', () => {
    const colors: AccentColor[] = ['accent', 'gold', 'blue', 'danger', 'purple', 'teal']
    colors.forEach((c) => {
      expect(accentGlowClass[c]).toBeDefined()
      expect(accentGlowClass[c].length).toBeGreaterThan(0)
    })
  })
})

// ─── difficultyConfig ─────────────────────────────────────────────────────────
describe('difficultyConfig', () => {
  const levels: Difficulty[] = ['beginner', 'intermediate', 'advanced']

  it.each(levels)('has a config entry for %s', (level) => {
    const cfg = difficultyConfig[level]
    expect(cfg.label).toBeTruthy()
    expect(cfg.textClass).toMatch(/^text-/)
    expect(cfg.bgClass).toMatch(/^bg-/)
  })

  it('beginner maps to accent color', () => {
    expect(difficultyConfig['beginner'].textClass).toBe('text-accent')
  })

  it('intermediate maps to gold color', () => {
    expect(difficultyConfig['intermediate'].textClass).toBe('text-gold')
  })

  it('advanced maps to danger color', () => {
    expect(difficultyConfig['advanced'].textClass).toBe('text-danger')
  })
})

// ─── categoryLabels ───────────────────────────────────────────────────────────
describe('categoryLabels', () => {
  it('has a label for oil-trading', () => {
    expect(categoryLabels['oil-trading']).toBe('Oil Trading')
  })

  it('has a label for genai', () => {
    expect(categoryLabels['genai']).toBe('GenAI Engineering')
  })

  it('has a label for all', () => {
    expect(categoryLabels['all']).toBe('All Topics')
  })
})
