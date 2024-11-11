/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        purple: "#3b234a",
        "light-purple": "#523961",
        "very-light-purple": "#baafc4",
        "gray": "#c3bbc9",
        "cream": "#d4c7bf",
        "very-light-cream": "#f0edeb",
      },
      boxShadow: {
        'custom-light': '0 2px 5px rgba(0, 0, 0, 0.3)', 
      },
    },
  },
  
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-spinner": {
          "-moz-appearance": "textfield",
        },
        ".no-spinner::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: "0",
        },
        ".no-spinner::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
          margin: "0",
        },
      });
    },
  ],
};
