import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import Reveal from "@/components/Reveal";
import {
  Timer,
  SlidersHorizontal,
  Coffee,
  Sunrise,
  BarChart3,
  LineChart,
  Trophy,
  BookOpen,
} from "lucide-react";

const FEATURE_IMAGES = {
  3: // index 3 (4th item — long rest): use the warm-light desk
    "https://images.unsplash.com/photo-1753729213561-0fd9e4669d15?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxmb2N1cyUyMGRlc2slMjB3YXJtJTIwbGlnaHR8ZW58MHx8fHwxNzgwNTczMzc5fDA&ixlib=rb-4.1.0&q=85",
  7: // scripture quote card image
    "https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwzfHxjYWxtJTIwbW9ybmluZyUyMHJlYWRpbmclMjBib29rfGVufDB8fHx8MTc4MDU3MzM3OXww&ixlib=rb-4.1.0&q=85",
};

const ICONS = [Timer, SlidersHorizontal, Coffee, Sunrise, BarChart3, LineChart, Trophy, BookOpen];

// Bento layout: 8 items.
// row1: large(8) + small(4)
// row2: small(4) + small(4) + small(4)
// row3: medium(4) + large(8)  (large is scripture image card)
const SPAN_CLASSES = [
  "lg:col-span-8",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-8",
];

const Features = () => {
  const { lang } = useLang();
  const t = useT(lang);

  return (
    <section id="features" data-testid="features-section" className="selah-section">
      <div className="selah-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <Reveal>
              <span className="selah-label">{t.features.label}</span>
              <h2 className="selah-h2 mt-4">
                {t.features.title}
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
          {t.features.items.map((f, idx) => {
            const Icon = ICONS[idx] || Timer;
            const img = FEATURE_IMAGES[idx];
            const span = SPAN_CLASSES[idx] || "lg:col-span-4";
            return (
              <Reveal key={idx} delay={idx * 60} className={span}>
                <article
                  data-testid={`feature-card-${idx + 1}`}
                  className="selah-card p-7 md:p-9 h-full relative flex flex-col justify-between min-h-[220px] overflow-hidden"
                >
                  {img && (
                    <>
                      <img
                        src={img}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 h-full w-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-700"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(160deg, rgba(19,27,42,0.85) 30%, rgba(19,27,42,0.55) 100%)",
                        }}
                      />
                    </>
                  )}

                  <div className="relative flex items-center justify-center h-12 w-12 rounded-full border border-selah-gold/30 bg-selah-bg/60">
                    <Icon size={20} strokeWidth={1.4} className="text-selah-gold" />
                  </div>

                  <div className="relative mt-12">
                    <h3 className="font-serif text-2xl md:text-3xl text-selah-text leading-tight">
                      {f.name}
                    </h3>
                    <p className="mt-3 font-sans text-sm md:text-base text-selah-muted leading-relaxed max-w-md">
                      {f.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
