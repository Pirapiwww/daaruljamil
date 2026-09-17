import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#103713",    // Phthalo Green
        secondary: "#628B35",  // Maximum Green
        bone: "#E2DBD0",       // Bone
        milk: "#FFFDF5",       // Milk
        lightGray: "#F7F7F7",
      },

      fontFamily: {
        sans: ["var(--font-figtree)"],
        heading: ["var(--font-playfair)"],
        cinzel: ["var(--font-cinzel)"],
      },
    },
  },
  plugins: [],
};

export default config;