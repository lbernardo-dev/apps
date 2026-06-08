"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { resolved, setTheme } = useTheme();

  return (
    <button
      aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex size-9 items-center justify-center rounded-lg border border-line text-graphite transition-all duration-300 hover:text-ink hover:border-brand-blue hover:bg-brand-blue/5"
      onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
      type="button"
    >
      <Sun
        aria-hidden="true"
        className="absolute size-4 rotate-0 scale-100 transition-all duration-300 dark-hidden"
        size={16}
        style={{ display: resolved === "dark" ? "none" : "block" }}
      />
      <Moon
        aria-hidden="true"
        className="absolute size-4 transition-all duration-300"
        size={16}
        style={{ display: resolved === "dark" ? "block" : "none" }}
      />
    </button>
  );
}
