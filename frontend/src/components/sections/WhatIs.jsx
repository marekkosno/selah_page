import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import Reveal from "@/components/Reveal";

const WhatIs = () => {
  const { lang } = useLang();
  const t = useT(lang);
  return (
    <section
      id="what-is"
      data-testid="what-is-section"
      className="selah-section"
    >
      <div className="selah-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="selah-label">{t.whatIs.label}</span>
              <h2 className="selah-h2 mt-4">
                {t.whatIs.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="italic text-selah-gold">{t.whatIs.title.split(" ").slice(-1)}</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-7">
            {t.whatIs.body.map((para, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <p
                  className={[
                    "font-sans leading-relaxed",
                    idx === 0 ? "text-xl text-selah-text" : "text-base md:text-lg text-selah-muted",
                  ].join(" ")}
                >
                  {para}
                </p>
              </Reveal>
            ))}
            <Reveal delay={400}>
              <div className="ornament-divider mt-6 w-32" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIs;
