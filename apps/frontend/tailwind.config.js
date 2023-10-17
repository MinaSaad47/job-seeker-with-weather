/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#609966",
      },
      boxShadow: {
        "elevation-1": "0px 0px 6px 3px rgba(0,0,0,0.2)",
        "elevation-2": "0px 0px 10px 5px rgba(0,0,0,0.2)",
        "elevation-3": "0px 0px 20px 10px rgba(0,0,0,0.2)",
        "elevation-4": "0px 0px 30px 15px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
