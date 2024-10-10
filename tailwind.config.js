/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0043ea',
          dark: '#0035bb',
          light: '#3366ff',
        },
        secondary: '#e5e5e5',
        text: '#55565b',
        accent: '#007aff',
      },
      boxShadow: {
        'natural': '6px 6px 9px rgba(0, 0, 0, 0.2)',
        'deep': '12px 12px 50px rgba(0, 0, 0, 0.4)',
        'sharp': '6px 6px 0px rgba(0, 0, 0, 0.2)',
        'outlined': '6px 6px 0px -3px rgba(255, 255, 255, 1), 6px 6px rgba(0, 0, 0, 1)',
        'crisp': '6px 6px 0px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}