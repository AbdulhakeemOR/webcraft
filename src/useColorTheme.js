import { useEffect, useState } from "react";

const STORAGE_KEY = "webcraft-theme";
const validThemes = ["system", "light", "dark"];

function readPreference() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return validThemes.includes(saved) ? saved : "system";
  } catch {
    return "system";
  }
}

function deviceUsesDarkTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function useColorTheme() {
  const [theme, setTheme] = useState(readPreference);
  const [systemDark, setSystemDark] = useState(deviceUsesDarkTheme);

  const resolvedTheme =
    theme === "system"
      ? systemDark
        ? "dark"
        : "light"
      : theme;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    function updateSystemTheme(event) {
      setSystemDark(event.matches);
    }

    setSystemDark(media.matches);
    media.addEventListener("change", updateSystemTheme);

    return () => {
      media.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;

    const themeColor = document.querySelector(
      'meta[name="theme-color"]'
    );

    themeColor?.setAttribute(
      "content",
      resolvedTheme === "dark" ? "#0e1116" : "#f5f3ee"
    );
  }, [resolvedTheme]);

  useEffect(() => {
    function syncPreference(event) {
      if (event.key === STORAGE_KEY || event.key === null) {
        setTheme(readPreference());
      }
    }

    window.addEventListener("storage", syncPreference);

    return () => {
      window.removeEventListener("storage", syncPreference);
    };
  }, []);

  function chooseTheme(nextTheme) {
    if (!validThemes.includes(nextTheme)) return;

    setTheme(nextTheme);

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // The selected theme still works for the current session.
    }
  }

  return { theme, resolvedTheme, chooseTheme };
}
