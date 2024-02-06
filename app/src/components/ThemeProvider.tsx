"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";
import { getMemory, setMemory } from "@/lib/utils";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme?: () => void;
};

export function activeTheme(theme: Theme) {
  const root = window.document.documentElement;

  root.classList.remove("light", "dark");
  if (theme === "system")
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  root.classList.add(theme);
  setMemory("theme", theme);
}

export function initTheme() {
  const theme = getMemory("theme");
  ["light", "dark", "system"].includes(theme)
    ? activeTheme(theme as Theme)
    : activeTheme("system");
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: (theme: Theme) => {
    activeTheme(theme);
  },
  toggleTheme: () => {
    const theme = getMemory("theme") as Theme;
    activeTheme(theme === "dark" ? "light" : "dark");
  },
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export function ThemeProvider() {
  const toggleTheme = useTheme().toggleTheme;

  useEffect(initTheme, []);

  return (
    <Button
      className={`ml-auto`}
      variant={`ghost`}
      size={`icon`}
      onClick={() => toggleTheme?.()}
    >
      <Sun
        className={`relative dark:absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
      />
      <Moon
        className={`absolute dark:relative h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
      />
    </Button>
  );
}

export default ThemeProvider;
