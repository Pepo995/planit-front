/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#0f58b7",
      },
      fontSize: {
        small: "10px",
      },
    },
  },
  plugins: [],
};
