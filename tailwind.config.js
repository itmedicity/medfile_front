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
        icongreen: "rgba(var(--icon-green))",

        borderprimary: "rgba(var(--border-primary))",
        bordersecondary: "rgba(var(--border-secondary))",

        logolightblue: "rgba(var(--logo-light-blue))",
        logodarkblue: "rgba(var(--logo-dark-blue))",
        logoviolet: "rgba(var(--logo-violet))",
        logopink: "rgba(var(--logo-pink))",

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

        tablehead: "rgba(var(--table-head))",
        tablebody: "rgba(var(--table-body))",

        fontvarient: "var(--font-varient)",
      },
    },
  },
  plugins: [],
  // darkMode: "class",
};
