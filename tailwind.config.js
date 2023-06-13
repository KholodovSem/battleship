/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': '#fdfffc',
      'dark': '#201e1f',
      'grey': '#ebeaeb',
      'blue': '#3fa7d6',
      'red': '#f24236',
      'yellow': '#ffd60a'
    },
    extend: {},
  },
  plugins: [],
}

