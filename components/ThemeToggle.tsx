"use client";

import { useLayoutEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "hidrosmart.theme";

function getPreferredTheme(): "light" | "dark" {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);

  useLayoutEffect(() => {
    const theme = getPreferredTheme();
    document.documentElement.dataset.theme = theme;
    setIsDark(theme === "dark");
  }, []);

  function toggleTheme() {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
    setIsDark(theme === "dark");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Ativar modo ${isDark ? "claro" : "escuro"}`}
      aria-pressed={isDark}
      title={`Ativar modo ${isDark ? "claro" : "escuro"}`}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-card text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${className}`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
