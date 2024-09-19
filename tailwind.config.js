/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "m-purple": "#141925",
        "m-purple-light": "#2b303a",
        "m-purple-dark": "#1e2129",
        "m-purple-darker": "#16181e",
      }
    },
  },
  plugins: [],
}