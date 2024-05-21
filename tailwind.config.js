/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#F2F0F1",
          200: "#E9E8E6",
          300: "#C6C4C3",
          400: "#B2B0B0",
          500: "#A1A0A0",
          600: "#8F8E8E",
          700: "#767676",
          800: "#636262",
          900: "#52515E",
        },
      },
    },
  },
  plugins: [],
};
