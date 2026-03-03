import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/design-system/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "var(--primary-50, #eff6ff)",
          100: "var(--primary-100, #dbeafe)",
          200: "var(--primary-200, #bfdbfe)",
          300: "var(--primary-300, #93c5fd)",
          400: "var(--primary-400, #60a5fa)",
          500: "var(--primary-500, #3b82f6)",
          600: "var(--primary-600, #2563eb)",
          700: "var(--primary-700, #1d4ed8)",
          800: "var(--primary-800, #1e40af)",
          900: "var(--primary-900, #1e3a8a)",
          950: "var(--primary-950, #172554)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
