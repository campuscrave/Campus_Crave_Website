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
        purple: {
          DEFAULT: '#6B2FA0',
          light: '#8B4FC8',
          glow: '#A855F7',
          dim: '#3D1A5E',
        },
        dark: {
          DEFAULT: '#0A0A0F',
          card: '#12121A',
          border: '#1E1E2A',
          surface: '#16161F',
        },
        accent: {
          orange: '#F97316',
          green: '#22C55E',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
