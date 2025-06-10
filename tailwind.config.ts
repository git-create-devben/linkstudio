import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class", "dark"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", // #FFFFFF
        foreground: "hsl(var(--foreground))", // #111827 (gray-900)
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        // Custom colors for Apple-inspired theme
        "apple-blue": "#007AFF",
        "apple-gray": {
          50: "#F9FAFB", // Lighter than 100 for subtle backgrounds
          100: "#F5F5F7", // Light background
          200: "#E5E5EA", // UI elements
          300: "#D1D1D6", // Borders
          400: "#C7C7CC",
          500: "#AEAEB2",
          600: "#8E8E93", // Secondary text
          700: "#636366",
          800: "#3A3A3C",
          900: "#1C1C1E", // Primary text (dark mode)
        },
      },
      borderRadius: {
        // Updated border radius based on --radius
        lg: "var(--radius)", // 0.75rem
        md: "calc(var(--radius) - 0.25rem)", // 0.5rem
        sm: "calc(var(--radius) - 0.375rem)", // 0.375rem
        xl: "calc(var(--radius) + 0.25rem)", // 1rem
        "2xl": "calc(var(--radius) + 0.75rem)", // 1.5rem
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.15)", // Softer shadow
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.03)", // Softer large
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
