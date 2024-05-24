/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Kanit, ui-sans-serif",
    },
    extend: {
      colors: {
        bgDark: "var(--color-backgroundDark)",
        bgLight: "var(--color-backgroundLight)",
        primaryColor: "var(--color-primary)",
        secondaryColor: "var(--color-secondary)",
        secondaryLightColor: "var(--color-secondaryLight)",
        accentColor: "var(--color-accent)",
        accentLightColor: "var(--color-accentLight)",
        dangerColor: "var(--color-danger)",
        dangerLightColor: "var(--color-dangerLight)",
      },
    },
  },
  plugins: [],
};
