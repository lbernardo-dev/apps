import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        graphite: "var(--color-graphite)",
        mist: "var(--color-mist)",
        line: "var(--color-line)",
        card: "var(--color-card)",
        brand: {
          blue: "#3b82f6",
          cyan: "#22d3ee",
          green: "#10b981"
        }
      },
      boxShadow: {
        soft: "0 24px 70px rgba(0, 0, 0, 0.4)"
      }
    }
  },
  plugins: []
};

export default config;

