module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        orange_50: "#fdf6db",
        black_900: "#000000",
        gray_900: "#0d1b1e",
        deep_orange_800: "#bb6618",
        light_green_100: "#e1d4c0",
        white_A700: "#ffffff",
        green_500: "#54b435",
      },
      fontFamily: { inriaserif: "Inria Serif", inter: "Inter" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
