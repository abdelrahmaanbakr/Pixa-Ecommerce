/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      colors: {
        primary: "#4A90E2",
        white: "#FFFFFF",
        background: "#F5F5F5",
        text: {
          primary: "#1A1A1A",
          secondary: "#888888",
        },
        star: "#FFD700"
      }
    },
  },
  plugins: [],
}
