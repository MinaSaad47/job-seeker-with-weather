/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E8F6E5",
          200: "#B8E9BF",
          300: "#89DC98",
          400: "#59D074",
          DEFAULT: "#268D48",
          600: "#1D6F38",
          700: "#16562B",
          800: "#0E3E1F",
          900: "#082B15",
        },
        primaryLight: "#579A51",
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
