import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "rgb(var(--brand) / <alpha-value>)", dark: "rgb(var(--brand-dark) / <alpha-value>)", navy: "#16335C", sky: "#38B6FF", soft: "rgb(var(--brand-soft) / <alpha-value>)" },
        action: "#1E6FBA",
        "action-hover": "#0B4A8F",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        skeleton: "rgb(var(--skeleton) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        warn: "rgb(var(--warn) / <alpha-value>)",
      },
      fontFamily: { display: ["var(--font-display)", "serif"], sans: ["var(--font-body)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
