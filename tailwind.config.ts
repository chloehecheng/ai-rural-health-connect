import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9b87f5",
          light: "#b3a4f7",
          dark: "#7a66d4",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#1EAEDB",
          light: "#40bde3",
          dark: "#1789ad",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          light: "#a485f8",
          dark: "#6d39f4",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "#F97316",
          light: "#fa8e42",
          dark: "#d85a05",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F1F1F1",
          foreground: "#666666",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "#F2FCE2",
          foreground: "#2E7D32",
        },
        warning: {
          DEFAULT: "#FEF7CD",
          foreground: "#B45309",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #9b87f5 0%, #1EAEDB 100%)',
        'gradient-secondary': 'linear-gradient(90deg, #F2FCE2 0%, #FEF7CD 100%)',
        'gradient-accent': 'linear-gradient(90deg, #8B5CF6 0%, #F97316 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;