import React, { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { lang } = useLang();
  const t = useT(lang);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#what-is", label: t.nav.features === "Funkcje" ? "Czym jest" : "What is" },
    { href: "#how", label: t.nav.how },
    { href: "#features", label: t.nav.features },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      data-testid="site-header"
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-selah-bg/80 backdrop-blur-xl border-b border-selah-beige/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="selah-container flex items-center justify-between py-4 md:py-5">
        <Logo size="md" testid="header-logo" />

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.href.replace("#", "")}`}
              className="text-xs uppercase tracking-[0.22em] font-sans text-selah-muted hover:text-selah-text transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <a
            href="#contact"
            data-testid="header-cta"
            className="hidden md:inline-flex selah-btn-primary py-2.5 px-5 text-xs"
          >
            {t.nav.contact}
          </a>
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 text-selah-text"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden bg-selah-bg/95 backdrop-blur-xl border-t border-selah-beige/10"
        >
          <div className="selah-container py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.22em] font-sans text-selah-muted hover:text-selah-text"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3">
              <LanguageSwitcher />
            </div>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="selah-btn-primary"
            >
              {t.nav.contact}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
