'use client'

import { cn } from '@/lib/utils'
import type { FilterState, Difficulty } from '@/lib/types'

interface CategoryFilterProps {
  filter: FilterState
  onFilterChange: (update: Partial<FilterState>) => void
  postCounts: {
    all: number
    'oil-trading': number
    genai: number
  }
}

const CATEGORY_OPTIONS = [
  { value: 'all',         label: 'All Topics',          icon: '📚' },
  { value: 'oil-trading', label: 'Oil Trading',          icon: '🛢️' },
  { value: 'genai',       label: 'GenAI Engineering',    icon: '🤖' },
] as const

const DIFFICULTY_OPTIONS: { value: Difficulty | 'all'; label: string }[] = [
  { value: 'all',          label: 'All Levels'   },
  { value: 'beginner',     label: 'Beginner'     },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced',     label: 'Advanced'     },
]

export function CategoryFilter({ filter, onFilterChange, postCounts }: CategoryFilterProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {CATEGORY_OPTIONS.map((opt) => {
          const count = opt.value === 'all'
            ? postCounts.all
            : postCounts[opt.value as keyof typeof postCounts] ?? 0
          const isActive = filter.category === opt.value

          return (
            <button
              key={opt.value}
              onClick={() => onFilterChange({ category: opt.value })}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2 rounded-lg border font-mono text-xs tracking-wide',
                'transition-all duration-150 cursor-pointer select-none',
                isActive
                  ? 'bg-accent/10 text-accent border-accent/30'
                  : 'bg-surface border-border text-ink2 hover:border-ink2/40 hover:text-ink'
              )}
              aria-pressed={isActive}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded text-[10px] font-semibold',
                  isActive ? 'bg-accent/15 text-accent' : 'bg-surface2 text-ink2'
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Difficulty selector */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-ink2 uppercase tracking-widest whitespace-nowrap">
          Level:
        </span>
        <div className="flex gap-1" role="group" aria-label="Filter by difficulty">
          {DIFFICULTY_OPTIONS.map((opt) => {
            const isActive = filter.difficulty === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => onFilterChange({ difficulty: opt.value })}
                className={cn(
                  'px-2.5 py-1 rounded font-mono text-[10px] tracking-wide border transition-all duration-150',
                  isActive
                    ? opt.value === 'beginner'
                      ? 'bg-accent/10 text-accent border-accent/25'
                      : opt.value === 'intermediate'
                      ? 'bg-gold/10 text-gold border-gold/25'
                      : opt.value === 'advanced'
                      ? 'bg-danger/10 text-danger border-danger/25'
                      : 'bg-accent/10 text-accent border-accent/25'
                    : 'bg-transparent border-border text-ink2 hover:border-ink2/40'
                )}
                aria-pressed={isActive}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
