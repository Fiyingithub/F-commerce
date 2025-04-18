// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // adjust this to match your file structure
    ],
    theme: {
      extend: {
        colors: {
          primary: "#f2592b",
          secondary: "#feefec",
          hover: "#ce5733",
        },
      },
    },
    plugins: [],
  }
  