import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const LanguageContext = createContext({
  lang: "pl",
  setLang: () => {},
});

const STORAGE_KEY = "selah_lang";

/**
 * Detect user language.
 * Rules:
 *  - If user already chose, respect localStorage.
 *  - If browser language starts with "pl" → "pl".
 *  - If browser timezone is Europe/Warsaw → "pl".
 *  - Otherwise → "en".
 *
 * This is a privacy-respecting client-side approach without IP geolocation.
 */
const detectLanguage = () => {
  try {
    const stored = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    if (stored === "pl" || stored === "en") return stored;

    if (typeof navigator !== "undefined") {
      const langs = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
      if (langs.some((l) => String(l).toLowerCase().startsWith("pl"))) return "pl";
    }

    if (typeof Intl !== "undefined") {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz === "Europe/Warsaw") return "pl";
    }
  } catch (e) {
    // ignore
  }
  return "en";
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState("pl");

  useEffect(() => {
    const detected = detectLanguage();
    setLangState(detected);
    if (typeof document !== "undefined") {
      document.documentElement.lang = detected;
    }
  }, []);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
