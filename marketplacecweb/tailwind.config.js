/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "purple": "#3b234a",
        "light-purple": "#523961",
        "very-light-purple": "#523961",
        "gray": "#c3bbc9",
        "cream": "#d4c7bf",
      },
      boxShadow: {
        'custom-light': '0 2px 5px rgba(0, 0, 0, 0.3)', 
      },
    },
  },
  plugins: [],
}
