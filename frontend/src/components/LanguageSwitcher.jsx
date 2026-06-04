import React from "react";
import { useLang } from "@/i18n/LanguageContext";

const LanguageSwitcher = ({ className = "" }) => {
  const { lang, setLang } = useLang();
  const opts = [
    { code: "pl", label: "PL" },
    { code: "en", label: "EN" },
  ];

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
            onClick={() => setLang(o.code)}
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
