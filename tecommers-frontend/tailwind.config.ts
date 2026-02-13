/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#ec1313',
        'brand-black': '#1a1a1a',
        'brand-dark-grey': '#2d2d2d',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      height: {
        'navbar': '80px',
      },
      spacing: {
        'navbar': '80px',
      },
    },
  },
  plugins: [],
}