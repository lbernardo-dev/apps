import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: ["selector", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        graphite: "var(--color-graphite)",
        mist: "var(--color-mist)",
        line: "var(--color-line)",
        card: "var(--color-card)",
        brand: {
          blue: "var(--color-brand-blue)",
          cyan: "var(--color-brand-cyan)",
          green: "var(--color-brand-green)"
        }
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)"
      },
      backgroundColor: {
        surface: "var(--background)",
      }
    }
  },
  plugins: []
};

export default config;
