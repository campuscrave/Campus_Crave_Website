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
        'brand-purple': '#6B2FA0',
        'brand-dark': '#0C0118',
        'brand-purple-faint': '#F5F3FF',
        'brand-purple-muted': '#EDE9FE',
        'surface-warm': '#FAFAF8',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
