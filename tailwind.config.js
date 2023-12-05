/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#ffffff',
        'shadow': '#f8fafc',
        'backcolor': '#f1f5f9',
        'secondary': '#f1f5f9',
        'btnColor': '#6366f1',
        'btnColor2':'#1e40af'


      }
    },
  },
  plugins: [],
}
