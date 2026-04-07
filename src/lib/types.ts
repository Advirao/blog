export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type AccentColor = 'accent' | 'gold' | 'blue' | 'danger' | 'purple' | 'teal'
export type Category = 'oil-trading' | 'genai' | 'claude-code'

export interface Post {
  slug: string
  category: Category
  title: string
  subtitle: string
  description: string
  tags: string[]
  simulationFile: string  // e.g. '/simulations/exposure-report-clean.html'
  difficulty: Difficulty
  readTime: number        // minutes
  lastUpdated: string     // ISO date string
  featured?: boolean
  downloadable?: boolean
  accentColor: AccentColor
  icon: string            // emoji
}

export interface CategoryMeta {
  slug: Category
  label: string
  description: string
  icon: string
  accentColor: AccentColor
  postCount?: number
}

export interface FilterState {
  category: Category | 'all'
  difficulty: Difficulty | 'all'
  search: string
}
