import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import { legalPl } from "@/i18n/legal_pl";
import { legalEn } from "@/i18n/legal_en";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Renders Terms or Privacy in PL or EN.
 * `forceLang` pins the document language to match the URL slug (so /regulamin
 * always shows Polish text, even if the UI language switcher is on EN).
 */
const LegalPage = ({ type = "terms", forceLang = null }) => {
  const { lang: uiLang } = useLang();
  const docLang = forceLang || uiLang;
  const t = useT(docLang);
  const docs = docLang === "pl" ? legalPl : legalEn;
  const doc = docs[type];

  useEffect(() => {
    document.title = `${doc.title} · SELAH`;
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [doc.title]);

  return (
    <div data-testid={`legal-${type}-page`} className="relative min-h-screen bg-selah-bg text-selah-text">
      <Header />
      <main className="pt-32 pb-20">
        <div className="selah-container max-w-4xl">
          <Link
            to="/"
            data-testid="legal-back-link"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-sans text-selah-muted hover:text-selah-gold transition-colors"
          >
            <ArrowLeft size={14} /> {t.footer.back}
          </Link>

          <header className="mt-10">
            <span className="selah-label">
              {type === "terms" ? t.footer.terms : t.footer.privacy}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-selah-text mt-4 leading-tight">
              {doc.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.22em] text-selah-muted">
              <span>{doc.effective}</span>
              <span aria-hidden>·</span>
              <span>{doc.version}</span>
            </div>
            <div className="ornament-divider mt-8 w-full" />
          </header>

          <article className="mt-12 space-y-12">
            {doc.sections.map((section, idx) => (
              <section key={idx} data-testid={`legal-section-${idx + 1}`}>
                <h2 className="font-serif text-2xl md:text-3xl text-selah-beige">
                  {section.heading}
                </h2>
                <ol className="mt-5 space-y-4 list-decimal list-outside pl-5 marker:text-selah-gold/60">
                  {section.items.map((it, k) => (
                    <li
                      key={k}
                      className="font-sans text-base md:text-[17px] leading-relaxed text-selah-muted"
                    >
                      <span className="text-selah-text/95">{it}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </article>

          <div className="mt-16 ornament-divider w-full" />
          <p className="mt-10 font-sans text-sm text-selah-muted">
            <Link
              to={
                type === "terms"
                  ? docLang === "pl" ? "/polityka-prywatnosci" : "/privacy-policy"
                  : docLang === "pl" ? "/regulamin" : "/terms"
              }
              className="text-selah-gold hover:text-selah-beige transition-colors"
              data-testid="legal-cross-link"
            >
              {type === "terms" ? t.footer.privacy : t.footer.terms} →
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
