"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-zinc-200 hover:text-yellow-400 transition-all duration-300"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
