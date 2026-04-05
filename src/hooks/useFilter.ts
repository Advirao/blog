'use client'

import { useState, useMemo } from 'react'
import type { Post, FilterState } from '@/lib/types'

export function useFilter(allPosts: Post[]) {
  const [filter, setFilter] = useState<FilterState>({
    category: 'all',
    difficulty: 'all',
    search: '',
  })

  const filtered = useMemo(() => {
    return allPosts.filter((post) => {
      const matchCategory =
        filter.category === 'all' || post.category === filter.category
      const matchDifficulty =
        filter.difficulty === 'all' || post.difficulty === filter.difficulty
      const q = filter.search.toLowerCase()
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.subtitle.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.description.toLowerCase().includes(q)
      return matchCategory && matchDifficulty && matchSearch
    })
  }, [allPosts, filter])

  return { filter, setFilter, filtered }
}
