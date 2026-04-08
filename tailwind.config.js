/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple':       '#6B21A8',
        'brand-purple-light': '#8B5CF6',
        'brand-purple-dark':  '#4C1D95',
        'brand-dark':         '#0C0118',
        'brand-darker':       '#060612',
        'surface':            '#FAFAF8',
        'surface-dark':       '#111827',
        'muted':              '#6B7280',
        'muted-light':        '#9CA3AF',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '9999px',
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'fade-up':    'fade-up 0.4s ease-out forwards',
        'count-up':   'count-scale 0.2s ease-out',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':       { opacity: '0.7', transform: 'scale(1.05)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'count-scale': {
          '0%':   { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
