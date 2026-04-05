import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { AccentColor, Difficulty } from './types'

// ─── Class name utility ───────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Date formatting ──────────────────────────────────────────────────────────
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// ─── Reading time label ───────────────────────────────────────────────────────
export function readTimeLabel(minutes: number): string {
  return `${minutes} min read`
}

// ─── Accent color → Tailwind class maps ──────────────────────────────────────
export const accentTextClass: Record<AccentColor, string> = {
  accent:  'text-accent',
  gold:    'text-gold',
  blue:    'text-blue',
  danger:  'text-danger',
  purple:  'text-purple',
  teal:    'text-teal',
}

export const accentBorderClass: Record<AccentColor, string> = {
  accent:  'border-accent',
  gold:    'border-gold',
  blue:    'border-blue',
  danger:  'border-danger',
  purple:  'border-purple',
  teal:    'border-teal',
}

export const accentBgClass: Record<AccentColor, string> = {
  accent:  'bg-accent/10',
  gold:    'bg-gold/10',
  blue:    'bg-blue/10',
  danger:  'bg-danger/10',
  purple:  'bg-purple/10',
  teal:    'bg-teal/10',
}

export const accentGlowClass: Record<AccentColor, string> = {
  accent:  'shadow-glow-accent',
  gold:    'shadow-glow-gold',
  blue:    'shadow-glow-blue',
  danger:  'shadow-glow-danger',
  purple:  'shadow-[0_0_20px_rgba(139,92,246,0.25)]',
  teal:    'shadow-[0_0_20px_rgba(20,184,166,0.25)]',
}

// ─── Difficulty badge classes ─────────────────────────────────────────────────
export const difficultyConfig: Record<
  Difficulty,
  { label: string; textClass: string; bgClass: string }
> = {
  beginner:     { label: 'Beginner',     textClass: 'text-accent',  bgClass: 'bg-accent/10' },
  intermediate: { label: 'Intermediate', textClass: 'text-gold',    bgClass: 'bg-gold/10'   },
  advanced:     { label: 'Advanced',     textClass: 'text-danger',  bgClass: 'bg-danger/10' },
}

// ─── Category display labels ──────────────────────────────────────────────────
export const categoryLabels: Record<string, string> = {
  'oil-trading': 'Oil Trading',
  'genai':       'GenAI Engineering',
  'all':         'All Topics',
}
