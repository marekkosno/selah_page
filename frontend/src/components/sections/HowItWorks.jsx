import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import Reveal from "@/components/Reveal";

const HowItWorks = () => {
  const { lang } = useLang();
  const t = useT(lang);
  return (
    <section id="how" data-testid="how-section" className="selah-section bg-selah-bg2/40 relative">
      <div className="selah-container">
        <div className="max-w-2xl mb-16">
          <Reveal>
            <span className="selah-label">{t.how.label}</span>
            <h2 className="selah-h2 mt-4">{t.how.title}</h2>
          </Reveal>
        </div>

        <ol className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-selah-beige/5">
          {t.how.steps.map((step, idx) => (
            <Reveal key={step.n} delay={idx * 140}>
              <li
                data-testid={`how-step-${idx + 1}`}
                className="relative bg-selah-bg p-8 md:p-10 min-h-[260px] flex flex-col justify-between group hover:bg-selah-bg2 transition-colors duration-500"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-5xl text-selah-gold/40 group-hover:text-selah-gold transition-colors">
                    {step.n}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-selah-muted">
                    {lang === "pl" ? "krok" : "step"}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-selah-text">{step.name}</h3>
                  <p className="mt-3 font-sans text-sm text-selah-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
