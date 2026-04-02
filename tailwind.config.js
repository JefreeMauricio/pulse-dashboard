/** @type {import('tailwindcss').Config} */
module.exports = {
  // Aquí le decimos a Tailwind que vigile tu HTML y tus archivos JS en /src
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#6366f1', // Nuestro Indigo moderno
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}