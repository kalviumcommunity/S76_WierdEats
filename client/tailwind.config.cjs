/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans all files
  theme: {
    extend: {
      animation: {
        floating: "floating 4s ease-in-out infinite",
        float: "floating 4s ease-in-out infinite",
      },
      keyframes: {
        floating: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(5px, -5px)" },
          "50%": { transform: "translate(-5px, 5px)" },
          "75%": { transform: "translate(5px, 5px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        float: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(2px, -2px)" },
          "50%": { transform: "translate(-2px, 2px)" },
          "75%": { transform: "translate(2px, 2px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      fontFamily: {
        abril: ["Abril Fatface", "cursive"],
        grechen: ["Grechen Fuemen", "cursive"],
        julee: ["Julee", "cursive"],
        kaushan: ["Kaushan Script", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        publicSans: ["Public Sans", "sans-serif"],
        stylish: ["Stylish", "sans-serif"],
        marker: ["Permanent Marker", "cursive"],
      },
    },
  },
  plugins: [],
};
