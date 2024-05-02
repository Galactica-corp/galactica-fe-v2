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
      white: "#ffffff",
      jaffa: "#F37A57",
      mischka: "#D0D5DD",
      mineShaft: "#2B2B2B",
      fiord: "#475467",
      oxfordBlue: "#344054",
      iron: "#E0E2E5",
      athensGray: "#F2F4F7",
      desertStorm: "#F0EFEE",
      paleSky: "#667085",
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
