import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warna Utama & Dasar (Elegan & Islami)
        primary: "#14342B",    // Deep Forest Green (Sangat cocok untuk warna utama)
        secondary: "#D4AF37",  // Rich Gold (Aksen Kemewahan)
        bone: "#EAF6EC",       // Soft Mint / Light Sage (Latar belakang lembut)
        milk: "#FFFFFF",       // Pure White
        lightGray: "#F5F5DC",  // Off-White Cream

        // Palet Tambahan (Ornamen & Hijau Dinding)
        accentGreen: "#52B72A", // Hijau Dinding (Di-tone down agar tidak neon untuk aksen/badge)
        gold: "#D4AF37",       // Rich Gold
        wood: "#4D3A1F",       // Dark Wood Brown
        dark: "#0C1F19",       // Very Dark Green
        sky: "#B8E2EC",        // Soft Sky Tint
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