/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ]
  },
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#BB86FC",
        secondary: "#03DAC6",
        back: "#121212",
        error: "#CF6679",
        onbackground: "#FFFFFF",
        onprimary: "#000000",
      },
    },
  },      
  plugins: [],
}