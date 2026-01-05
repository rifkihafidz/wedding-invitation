/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'charcoal': {
          DEFAULT: '#1a1a1d',
          50: '#2d2d30',
          100: '#252527',
          200: '#1f1f21',
          300: '#1a1a1d',
          400: '#15151',
          500: '#0f0f10',
        },
        'champagne': {
          DEFAULT: '#d4af37',
          50: '#faf6e9',
          100: '#f2eace',
          200: '#e5d59d',
          300: '#d4af37',
          400: '#b8962f',
          500: '#9a7d27',
        },
        'rose-gold': {
          DEFAULT: '#b76e79',
          50: '#f8eced',
          100: '#edd5d8',
          200: '#d4949d',
          300: '#b76e79',
          400: '#9a5561',
          500: '#7d4249',
        },
        'ivory': {
          DEFAULT: '#f5f0e8',
          50: '#fdfcfa',
          100: '#f5f0e8',
          200: '#e8e0d4',
          300: '#d4ccc0',
        },
        'warm-gray': {
          DEFAULT: '#a8a5a0',
          50: '#d4d2cf',
          100: '#bfbdb9',
          200: '#a8a5a0',
          300: '#8a8783',
          400: '#6b6966',
        },
      },
    },
  },
  plugins: [],
}
