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
        // Core palette matching the simulation files
        bg:       '#0a0e14',
        surface:  '#111820',
        surface2: '#1a2332',
        border:   '#1e3a52',
        accent:   '#00c896',
        gold:     '#f5a623',
        danger:   '#ff4d6d',
        blue:     '#378ADD',
        purple:   '#8b5cf6',
        teal:     '#14b8a6',
        ink:      '#c8d8e8',
        ink2:     '#6a8aaa',
        white:    '#e8f4ff',
      },
      fontFamily: {
        sans:    ['var(--font-sans)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
        display: ['var(--font-bebas)', 'Bebas Neue', 'cursive'],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(0,200,150,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,200,150,0.03) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '40px 40px',
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
        'glow-accent':  '0 0 20px rgba(0,200,150,0.25)',
        'glow-gold':    '0 0 20px rgba(245,166,35,0.25)',
        'glow-danger':  '0 0 20px rgba(255,77,109,0.25)',
        'glow-blue':    '0 0 20px rgba(55,138,221,0.25)',
      },
    },
  },
  plugins: [],
}

export default config
