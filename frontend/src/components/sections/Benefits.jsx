import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import Reveal from "@/components/Reveal";
import { Sparkles } from "lucide-react";

const Benefits = () => {
  const { lang } = useLang();
  const t = useT(lang);
  return (
    <section data-testid="benefits-section" className="selah-section bg-selah-bg2/40">
      <div className="selah-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="selah-label">{t.benefits.label}</span>
            <h2 className="selah-h2 mt-4">{t.benefits.title}</h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            {t.benefits.points.map((p, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <li
                  data-testid={`benefit-${idx + 1}`}
                  className="flex items-start gap-4 border-b border-selah-beige/10 pb-5"
                >
                  <Sparkles
                    size={18}
                    strokeWidth={1.5}
                    className="text-selah-gold mt-1 shrink-0"
                  />
                  <p className="font-sans text-base md:text-lg text-selah-text">{p}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
