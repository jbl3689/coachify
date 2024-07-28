/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Kanit, ui-sans-serif",
    },
    extend: {
      colors: {
        bgPrimary: "var(--color-bg-primary)",
        bSecondary: "var(--color-bg-secondary)",
        bgTertiary: "var(--color-bg-tertiary)",
        textBase: "var(--color-text-base)",
        textAlt: "var(--color-text-alt)",
        primaryBase: "var(--color-primary-base)",
        primaryLight: "var(--color-primary-light)",
        secondaryBase: "var(--color-secondary-base)",
        secondaryLight: "var(--color-secondary-light)",
        accentBase: "var(--color-accent-base)",
        accentLight: "var(--color-accent-light)",
        successBase: "var(--color-success-base)",
        successLight: "var(--color-success-light)",
        dangerBase: "var(--color-danger-base)",
        dangerLight: "var(--color-danger-light)",
      },
    },
  },
  plugins: [],
};
