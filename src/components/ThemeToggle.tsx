"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "system" | "light" | "dark";

const modes: ThemeMode[] = ["system", "light", "dark"];

function resolveTheme(mode: ThemeMode) {
  if (mode === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return mode;
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    const storedMode = window.localStorage.getItem("shapetaker-theme") as ThemeMode | null;
    if (storedMode && modes.includes(storedMode)) {
      queueMicrotask(() => setMode(storedMode));
    }
  }, []);

  useEffect(() => {
    const applyTheme = () => {
      document.documentElement.dataset.theme = resolveTheme(mode);
    };

    applyTheme();

    if (mode !== "system") {
      window.localStorage.setItem("shapetaker-theme", mode);
      return;
    }

    window.localStorage.removeItem("shapetaker-theme");
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", applyTheme);

    return () => media.removeEventListener("change", applyTheme);
  }, [mode]);

  const nextMode = modes[(modes.indexOf(mode) + 1) % modes.length];
  const Icon = mode === "dark" ? Moon : mode === "light" ? Sun : Monitor;

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`theme: ${mode}. switch to ${nextMode}.`}
      title={`theme: ${mode}`}
      onClick={() => setMode(nextMode)}
    >
      <Icon size={17} aria-hidden="true" />
    </button>
  );
}
