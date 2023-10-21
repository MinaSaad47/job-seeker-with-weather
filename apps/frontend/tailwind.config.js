/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#353641", // Your original color
          50: "#7D7E81",
          100: "#6D6E70",
          200: "#565758",
          300: "#464748",
          400: "#3D3E41",
          500: "#353641", // Your original color
          600: "#2D2E30",
          700: "#242426",
          800: "#1C1D1E",
          900: "#131415",
        },
        secondary: {
          DEFAULT: "#203c62",
          50: "#475b7d",
          100: "#3f536e",
          200: "#374b5f",
          300: "#2f4350",
          400: "#273b41",
          500: "#203c62", // Your original color
          600: "#1b324f",
          700: "#162947",
          800: "#121f38",
          900: "#0d162a",
        },
      },
      boxShadow: {
        "elevation-1": "0px 0px 6px 3px rgba(0,0,0,0.2)",
        "elevation-2": "0px 0px 10px 5px rgba(0,0,0,0.2)",
        "elevation-3": "0px 0px 20px 10px rgba(0,0,0,0.2)",
        "elevation-4": "0px 0px 30px 15px rgba(0,0,0,0.2)",
        "elevation-5": "0px 0px 40px 20px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
