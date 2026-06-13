import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

// Map of equivalent legal slugs across languages.
const LEGAL_SLUG_MAP = {
  "/regulamin": { pl: "/regulamin", en: "/terms" },
  "/terms": { pl: "/regulamin", en: "/terms" },
  "/polityka-prywatnosci": { pl: "/polityka-prywatnosci", en: "/privacy-policy" },
  "/privacy-policy": { pl: "/polityka-prywatnosci", en: "/privacy-policy" },
};

const LanguageSwitcher = ({ className = "" }) => {
  const { lang, setLang } = useLang();
  const location = useLocation();
  const navigate = useNavigate();
  const opts = [
    { code: "pl", label: "PL" },
    { code: "en", label: "EN" },
  ];

  const handleSelect = (code) => {
    setLang(code);
    const map = LEGAL_SLUG_MAP[location.pathname];
    if (map && map[code] && map[code] !== location.pathname) {
      navigate(map[code]);
    }
  };

  return (
    <div
      data-testid="language-switcher"
      className={`inline-flex items-center rounded-full border border-selah-beige/15 bg-selah-bg2/60 backdrop-blur-sm p-1 ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      {opts.map((o) => {
        const active = lang === o.code;
        return (
          <button
            key={o.code}
            type="button"
            data-testid={`lang-${o.code}`}
            onClick={() => handleSelect(o.code)}
            aria-pressed={active}
            className={[
              "px-3 py-1 text-xs uppercase tracking-[0.18em] font-sans rounded-full transition-all duration-300",
              active
                ? "bg-selah-gold text-selah-bg"
                : "text-selah-muted hover:text-selah-text",
            ].join(" ")}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
