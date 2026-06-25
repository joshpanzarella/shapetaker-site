"use client";

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

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`theme: ${mode}. switch to ${nextMode}.`}
      title={`theme: ${mode}`}
      onClick={() => setMode(nextMode)}
    >
      {mode === "dark" ? (
        <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M10.1 3.2A9 9 0 1 1 10.1 20.8A8.8 8.8 0 1 0 10.1 3.2Z" />
        </svg>
      ) : mode === "light" ? (
        <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 4 L13.91 7.38 L17.66 6.34 L16.62 10.09 L20 12 L16.62 13.91 L17.66 17.66 L13.91 16.62 L12 20 L10.09 16.62 L6.34 17.66 L7.38 13.91 L4 12 L7.38 10.09 L6.34 6.34 L10.09 7.38 Z" />
        </svg>
      ) : (
        <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 2.5a6 6 0 1 1 0 12A6 6 0 0 1 12 6Z"/>
          <rect x="11" y="3.5" width="2" height="17"/>
          <rect x="3.5" y="11" width="17" height="2"/>
        </svg>
      )}
    </button>
  );
}
