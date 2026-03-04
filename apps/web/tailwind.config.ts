import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/design-system/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/auth/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/email/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/services/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/admin/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/cms/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/affiliate/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
