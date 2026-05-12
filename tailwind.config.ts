import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#1D1A2F",
        ink: "#1D1A2F",
        lavender: "#EFE8FF",
        lilac: "#7D5BA6",
        gold: "#C9A14A",
        pearl: "#FFFDF8",
        cream: "#FFF8EE",
        purple: "#4B2E83",
        rose: "#C75C7A",
        teal: "#2F5D62",
        premium: "#8A5A00",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(17, 25, 54, 0.14)",
        glow: "0 0 36px rgba(216, 180, 90, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
