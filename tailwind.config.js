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
    extend: {
      boxShadow: {
        xs: "box-shadow: 0px 1px 2px 0px #1018280D",
      },
      gridTemplateAreas: {
        layout: ["sidebar main"],
      },
      opacity: {
        3: "0.03",
        7: "0.07",
      },
      backgroundImage: {
        main: "url('/assets/bg-galactica-dataguardian.png')",
      },
    },
    colors: {
      white: "#ffffff",
      black: "#000",
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
      dawnPink: "#EAECF0",
      sunriseOrange: "#F26F56",
      fadedOrange: "#F49756",
      whiteSmoke: "#F6F5F4",
      riverBed: "#475467",
      softPeach: "#EEEDEC",
    },
  },
};
