import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1a1a2e",
        gold: "#c9a84c",
        cream: "#f9f7f2",
        ink: "#1a1a1e"
      },
      fontFamily: {
        heading: ["var(--font-cormorant)"],
        body: ["var(--font-dm-sans)"]
      },
      boxShadow: {
        premium: "0 18px 60px rgba(26, 26, 46, 0.14)",
        lift: "0 22px 50px rgba(26, 26, 46, 0.18)"
      },
      opacity: {
        8: "0.08",
        12: "0.12",
        14: "0.14",
        15: "0.15",
        18: "0.18",
        35: "0.35",
        42: "0.42",
        45: "0.45",
        55: "0.55",
        62: "0.62",
        65: "0.65",
        68: "0.68",
        72: "0.72",
        76: "0.76",
        78: "0.78",
        82: "0.82",
        86: "0.86",
        92: "0.92"
      }
    }
  },
  plugins: []
};

export default config;
