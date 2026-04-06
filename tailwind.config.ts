import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm ivory/cream editorial palette
        bg:       '#FAF9F7',
        surface:  '#FFFFFF',
        surface2: '#F2EDE6',
        border:   '#E5DDD5',
        // Muted accents for light backgrounds
        accent:   '#2A6E49',
        gold:     '#A8711A',
        danger:   '#B83232',
        blue:     '#2B549A',
        purple:   '#5E4FA0',
        teal:     '#2A6E6E',
        // Text
        ink:      '#2D2926',
        ink2:     '#7A6F68',
        white:    '#1A1510',   // heading color (dark in light theme)
      },
      fontFamily: {
        sans:    ['var(--font-sans)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
        display: ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
        serif:   ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.25s ease',
        'slide-up':   'slideUp 0.3s ease',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer':    'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow-accent':  '0 2px 12px rgba(42,110,73,0.15)',
        'glow-gold':    '0 2px 12px rgba(168,113,26,0.15)',
        'glow-danger':  '0 2px 12px rgba(184,50,50,0.15)',
        'glow-blue':    '0 2px 12px rgba(43,84,154,0.15)',
        'card':         '0 1px 4px rgba(0,0,0,0.06)',
        'card-hover':   '0 4px 16px rgba(0,0,0,0.09)',
      },
    },
  },
  plugins: [],
}

export default config
