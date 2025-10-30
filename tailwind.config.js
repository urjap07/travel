/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#00AFAA",
          secondary: "#FF7A59",
          accent: "#F4C542",
          background: "#F8FDFD",
          text: "#1A1A1A",
        },
        fontFamily: {
          heading: ["Poppins", "Arial", "sans-serif"],
          body: ["Inter", "Arial", "sans-serif"],
        },
      },
    },
    plugins: [],
  };