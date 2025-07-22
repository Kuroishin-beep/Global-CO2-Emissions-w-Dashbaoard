/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ← Add this so Tailwind scans your React components
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
