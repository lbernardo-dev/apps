import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        graphite: "#334155",
        mist: "#f8fafc",
        line: "#dbe4ef",
        brand: {
          blue: "#1d4ed8",
          cyan: "#22d3ee",
          green: "#14b8a6"
        }
      },
      boxShadow: {
        soft: "0 24px 70px rgba(15, 23, 42, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
