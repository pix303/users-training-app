/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['Jockerman', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
