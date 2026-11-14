import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#1E6FBA", dark: "#0B4A8F", navy: "#16335C", sky: "#38B6FF", soft: "#EDF2FA" },
        ink: "#0F172A", muted: "#5B6B82", line: "#E3E8F0", surface: "#F6F8FB", danger: "#E5604D", warn: "#F59E0B",
      },
      fontFamily: { display: ["var(--font-display)", "serif"], sans: ["var(--font-body)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
