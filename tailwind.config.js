/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("tailwindcss-inner-border"),
    require("tailwind-hamburgers"),
    require("tailwind-scrollbar"),
    require("@savvywombat/tailwindcss-grid-areas"),
  ],
  theme: {
    fontFamily: {
      inter: "Inter",
      ptm: "Publico Text Mono",
    },
    backgroundImage: {
      main: "url('/assets/bg-galactica-dataguardian.png')",
    },
    colors: {
      // https://colors.artyclick.com/color-name-finder/
      white: "#ffffff",
      basketBallOrange: "#F37A57",
      iron: "#D0D5DD",
      balticSea: "#2B2B2B",
      riverBed: "#475467",
      pickledBluewood: "#344054",
      platinum: "#E0E2E5",
      catskillWhite: "#F2F4F7",
      softPeach: "#F0EFEE",
      mistBlue: "#667085",
      transparent: "transparent",
    },
    extend: {
      boxShadow: {
        xs: "box-shadow: 0px 1px 2px 0px #1018280D",
      },
      gridTemplateAreas: {
        layout: ["sidebar main"],
      },
    },
  },
};
