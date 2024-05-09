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
      backgroundImage: {
        certCardBg: "url('/cert-card-bg2.png')",
      },
      backgroundPosition: {
        certCardBg: "left -203px top -128px",
      },
      backgroundSize: {
        certCardBg: "150%",
      },
      boxShadow: {
        xs: "0px 1px 2px 0px #1018280D",
        xl: "0px 8px 8px -4px #10182808,0px 20px 24px -4px #10182814",
      },
      gridTemplateAreas: {
        layout: ["sidebar main"],
      },
      opacity: {
        3: "0.03",
        4: "0.04",
        6: "0.06",
        7: "0.07",
      },
    },
    colors: {
      // https://colors.artyclick.com/color-name-finder/
      white: "#ffffff",
      black: "#000",
      basketBallOrange: "#F37A57",
      iron: "#D0D5DD",
      balticSea: "#2B2B2B",
      riverBed: "#475467",
      pickledBluewood: "#344054",
      platinum: "#E0E2E5",
      catskillWhite: "#F2F4F7",
      mistBlue: "#667085",
      transparent: "transparent",

      // sort later
      blackSqueeze: "#ECFDF3",
      brightBlue: "#005BEA",
      dawnPink: "#EAECF0",
      fadedOrange: "#F49756",
      magicMint: "#ABEFC6",
      shamrockGreen: "#079455",
      skyBlue: "#00C6FB",
      softPeach: "#EEEDEC",
      sunriseOrange: "#F26F56",
      whiteSmoke: "#F6F5F4",
      porcelain: "#F2F2F2",
      santaGrey: "#98A2B3",
      caribbeanGreen: "#01C38C",
      pastelGrey: "#CDCDCD",
      mistyRose: "#FEE5D7",
      alabaster: "#F9FAFB",
      blackCow: "#4E4845",
      aquaHaze: "#F3F3F2",
    },
  },
};
