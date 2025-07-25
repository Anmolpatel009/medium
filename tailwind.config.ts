
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        headline: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-pt-sans)", "sans-serif"],
        'serif-display': ['var(--font-lora)', 'serif'],
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
        "fade-in-down": {
          "0%": {
              opacity: "0",
              transform: "translateY(-10px)"
          },
          "100%": {
              opacity: "1",
              transform: "translateY(0)"
          }
        },
        "fade-in-up": {
            "0%": {
                opacity: "0",
                transform: "translateY(10px)"
            },
            "100%": {
                opacity: "1",
                transform: "translateY(0)"
            }
        },
        "float": {
          "0%": { transform: 'translate(0px, 0px)' },
          "20%": { transform: 'translate(10px, -5px)' },
          "40%": { transform: 'translate(-5px, 10px)' },
          "60%": { transform: 'translate(5px, 5px)' },
          "80%": { transform: 'translate(-10px, -10px)' },
          "100%": { transform: 'translate(0px, 0px)' },
        },
        "ping-slow": {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        "rgb-border": {
          '0%, 100%': { 'box-shadow': '0 0 0.5rem 0.1rem rgba(0, 255, 255, 0.5)' },
          '25%': { 'box-shadow': '0 0 0.5rem 0.1rem rgba(255, 0, 255, 0.5)' },
          '50%': { 'box-shadow': '0 0 0.5rem 0.1rem rgba(255, 255, 0, 0.5)' },
          '75%': { 'box-shadow': '0 0 0.5rem 0.1rem rgba(0, 255, 0, 0.5)' },
        },
         "tilt-shaking": {
          '0%, 100%': { transform: 'rotate(0deg) rotate3d(5, 5, 10, -10deg)' },
          '50%': { transform: 'rotate(5deg) rotate3d(5, 5, 10, 10deg)' },
        },
        "spin-slow": {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        "spin-reverse-slow": {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "float": "float 5s ease-in-out infinite",
        "ping-slow": 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        "rgb-border": 'rgb-border 4s linear infinite',
        "tilt-shaking": 'tilt-shaking 4s infinite',
        "spin-slow": 'spin-slow 25s linear infinite',
        "spin-reverse-slow": 'spin-reverse-slow 25s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
