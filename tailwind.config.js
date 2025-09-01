/** @type {import('tailwindcss').Config} */
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
        // Custom Design System Colors
        "primary-text": "#171717",
        "secondary-text": "#5C5C5C",
        "tertiary-text": "#363636",
        "muted-text": "#7B7B7B",
        "category-text": "#ADADAD",
        "light-text": "#A3A3A3",
        "expand-icon": "#676767",

        "border-light": "#EBEBEB",
        "border-lighter": "#F3F3F3",
        "bg-light": "#F7F7F7",
        "bg-muted": "#F5F5F5",

        "brand-purple": "#7D52F4",
        "active-purple": "#6828EE",
        "success-green": "#1FC16B",
        "verification-blue": "#47C2FF",

        "avatar-bg": "#FFC0C5",
        "avatar-text": "#681219",

        "team-bg": "#EBF1FF",
        "team-text": "#335CFF",
        "summit-bg": "#FFF3EB",
        "summit-text": "#FA7319",
        "gitex-bg": "#E0FAEC",
        "gitex-text": "#1FC16B",

        // shadcn/ui colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
    },
  },
  plugins: [],
};