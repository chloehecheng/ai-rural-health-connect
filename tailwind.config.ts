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
        primary: {
          DEFAULT: "#0A6EBD",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#2E8B57",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#E8F1F5",
          foreground: "#1A1A1A",
        },
        background: "#FFFFFF",
        foreground: "#1A1A1A",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;