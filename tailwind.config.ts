import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Enable class-based dark mode (toggled via html.dark)
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colors use CSS variables with alpha-value support.
        // --rgb-X is a space-separated RGB triplet defined in globals.css.
        // This lets Tailwind opacity modifiers (bg-accent/10, border-border/40) work
        // in both light and dark themes without any component changes.
        bg:       'rgb(var(--rgb-bg)       / <alpha-value>)',
        surface:  'rgb(var(--rgb-surface)  / <alpha-value>)',
        surface2: 'rgb(var(--rgb-surface2) / <alpha-value>)',
        border:   'rgb(var(--rgb-border)   / <alpha-value>)',
        accent:   'rgb(var(--rgb-accent)   / <alpha-value>)',
        gold:     'rgb(var(--rgb-gold)     / <alpha-value>)',
        danger:   'rgb(var(--rgb-danger)   / <alpha-value>)',
        blue:     'rgb(var(--rgb-blue)     / <alpha-value>)',
        purple:   'rgb(var(--rgb-purple)   / <alpha-value>)',
        teal:     'rgb(var(--rgb-teal)     / <alpha-value>)',
        ink:      'rgb(var(--rgb-ink)      / <alpha-value>)',
        ink2:     'rgb(var(--rgb-ink2)     / <alpha-value>)',
        white:    'rgb(var(--rgb-white)    / <alpha-value>)',
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
