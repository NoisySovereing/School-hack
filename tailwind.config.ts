import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0b1020",
      },
      boxShadow: {
        soft: "0 12px 30px -12px rgba(14, 23, 58, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
