import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
          DEFAULT: "hsl(215, 70%, 40%)", // Medium blue
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(200, 60%, 50%)", // Lighter blue
          foreground: "hsl(222, 47%, 11%)",
        },
        destructive: {
          DEFAULT: "hsl(350, 89%, 60%)",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(210, 50%, 60%)", // Soft blue accent
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
        blue: {
          50: "hsl(210, 100%, 95%)",
          100: "hsl(210, 100%, 90%)",
          200: "hsl(210, 100%, 80%)",
          300: "hsl(210, 100%, 70%)",
          400: "hsl(210, 100%, 60%)",
          500: "hsl(215, 70%, 40%)",
          600: "hsl(220, 70%, 35%)",
          700: "hsl(225, 70%, 30%)",
          800: "hsl(230, 70%, 25%)",
          900: "hsl(235, 70%, 20%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulse-subtle": {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.7,
          },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "float-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "glow-subtle": {
          "0%, 100%": {
            boxShadow: "0 0 5px 1px rgba(30, 64, 175, 0.15)",
          },
          "50%": {
            boxShadow: "0 0 8px 2px rgba(30, 64, 175, 0.25)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 15s ease infinite",
        "float-subtle": "float-subtle 6s ease-in-out infinite",
        "glow-subtle": "glow-subtle 4s infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      backgroundImage: {
        "gradient-blue":
          "linear-gradient(45deg, hsl(225, 70%, 30%), hsl(210, 100%, 50%), hsl(195, 80%, 50%), hsl(225, 70%, 30%))",
        "gradient-blue-soft": "linear-gradient(45deg, hsl(215, 70%, 40%), hsl(200, 60%, 50%))",
        "gradient-radial-blue": "radial-gradient(circle, hsl(210, 100%, 95%), hsl(215, 70%, 40%))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

