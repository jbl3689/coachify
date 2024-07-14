/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Kanit, ui-sans-serif",
    },
    extend: {
      colors: {
        bg1: "#222831",
        bg2: "#2d2d2d",
        bg3: "#57605F",
        textBase: "#f0f0f0",
        textAlt: "#BDC1C2",
        primaryBase: "#3f5855",
        primaryLight: "#4e6d69",
        secondaryBase: "#393e46",
        secondaryLight: "#525864",
        accentBase: "#00adb5",
        accentLight: "#65c1b1",
        successBase: "#4fc83b",
        successLight: "#74ca65",
        dangerBase: "#f11658",
        dangerLight: "#d5577d",
      },
    },
  },
  plugins: [],
};
