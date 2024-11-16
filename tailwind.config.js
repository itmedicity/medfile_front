/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgnav: "rgba(var(--bg-nav))",
        bgdrawer: "rgba(var(--bg-drawer))",
        bgcommon: "rgba(var(--bg-common))",
        bgcard: "rgba(var(--bg-card))",

        activebg: "rgba(var(--active-bg))",

        bgoffwhite: "rgba(var(--bg-offwhite))",

        iconprimary: "rgba(var(--icon-primary))",
        iconsecondary: "rgba(var(--icon-secondary))",

        borderprimary: "rgba(var(--border-primary))",
        bordersecondary: "rgba(var(--border-secondary))",

        baseBlue: "rgba(var(--color-blue))",
        basePink: "rgba(var(--color-pink))",
        baseViolet: "rgba(var(--color-violet))",
        baseWhite: "rgba(var(--color-white))",

        fontBlack: "rgba(var(--font-black))",
        fontBlue: "rgba(var(--font-blue))",
        fontGrey: "rgba(var(--font-darkGrey))",
        fontLight: "rgba(var(--font-light))",

        fontprimarywhite: "rgba(var(--font-primary-white))",
        fontsecondarywhite: "rgba(var(--font-secondary-white))",

        fontvarient: "var(--font-varient)",
      },
    },
  },
  plugins: [],
  // darkMode: "class",
};
