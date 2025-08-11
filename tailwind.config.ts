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
        "apple-blue": "#007AFF",
        "apple-gray": {
          50: "#F9FAFB",
          100: "#F5F5F7",
          200: "#E5E5EA",
          300: "#D1D1D6",
          400: "#C7C7CC",
          500: "#AEAEB2",
          600: "#8E8E93",
          700: "#636366",
          800: "#3A3A3C",
          900: "#1C1C1E",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.25rem)",
        sm: "calc(var(--radius) - 0.375rem)",
        xl: "calc(var(--radius) + 0.25rem)",
        "2xl": "calc(var(--radius) + 0.75rem)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        wave: { "0%, 100%": { transform: 'translateY(0)' }, "50%": { transform: 'translateY(-10px)' } },
        "wave-reverse": { "0%, 100%": { transform: 'translateY(0)' }, "50%": { transform: 'translateY(10px)' } },
        "mountain-drift": { "0%, 100%": { transform: 'scale(1)' }, "50%": { transform: 'scale(1.05)' } },
        "arch-expand": { "0%, 100%": { borderRadius: '0 0 50% 50% / 0 0 30px 30px' }, "50%": { borderRadius: '0 0 50% 50% / 0 0 40px 40px' } },
        "cloud-drift": { "0%, 100%": { transform: 'translateX(0)' }, "50%": { transform: 'translateX(10px)' } },
        breathe: { "0%, 100%": { transform: 'scaleY(1)' }, "50%": { transform: 'scaleY(1.05)' } },
        "petal-sway": { "0%, 100%": { transform: 'rotate(0deg)' }, "50%": { transform: 'rotate(2deg)' } },
        "dune-shift": { "0%, 100%": { backgroundPosition: '0% 50%' }, "50%": { backgroundPosition: '100% 50%' } },
        aurora: { "0%, 100%": { opacity: "0.8" }, "50%": { opacity: "1" } },
        bloom: { "0%, 100%": { transform: 'scale(1)' }, "50%": { transform: 'scale(1.02)' } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wave: 'wave 3s ease-in-out infinite',
        "wave-reverse": 'wave-reverse 3s ease-in-out infinite',
        "mountain-drift": 'mountain-drift 5s ease-in-out infinite',
        "arch-expand": 'arch-expand 4s ease-in-out infinite',
        "cloud-drift": 'cloud-drift 7s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        "petal-sway": 'petal-sway 6s ease-in-out infinite',
        "dune-shift": 'dune-shift 8s ease-in-out infinite',
        aurora: 'aurora 5s ease-in-out infinite',
        bloom: 'bloom 6s ease-in-out infinite',
      },
      boxShadow: {
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('tailwind-scrollbar-hide')],
} satisfies Config

export default config