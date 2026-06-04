import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import { Apple, Play, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const HERO_IMG =
  "https://images.pexels.com/photos/176103/pexels-photo-176103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600";

const Hero = () => {
  const { lang } = useLang();
  const t = useT(lang);

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[100svh] flex items-center pt-28 pb-24 overflow-hidden"
    >
      {/* background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMG}
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-50"
          loading="eager"
          decoding="async"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,14,23,0.75) 0%, rgba(10,14,23,0.85) 55%, rgba(10,14,23,1) 100%)",
          }}
        />
        {/* gold orb glow */}
        <div
          aria-hidden
          className="absolute -top-32 -right-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl animate-soft-pulse"
          style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #E2D1B3 0%, transparent 70%)" }}
        />
      </div>

      <div className="selah-container relative w-full">
        <div className="max-w-3xl">
          <Reveal>
            <span data-testid="hero-eyebrow" className="selah-label inline-block">
              {t.hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 data-testid="hero-title" className="selah-h1 mt-6">
              <span className="block">{t.hero.title[0]}</span>
              <span className="block italic text-selah-beige">{t.hero.title[1]}</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p data-testid="hero-subtitle" className="selah-body mt-7 max-w-2xl">
              {t.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href="#newsletter" data-testid="hero-cta-primary" className="selah-btn-primary">
                {t.hero.ctaPrimary} <ArrowRight size={16} />
              </a>
              <a href="#how" data-testid="hero-cta-secondary" className="selah-btn-secondary">
                {t.hero.ctaSecondary}
              </a>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <StoreBadge
                testid="hero-appstore-badge"
                icon={<Apple size={18} />}
                label={t.hero.onAppStore}
                soon={t.hero.comingSoon}
              />
              <StoreBadge
                testid="hero-googleplay-badge"
                icon={<Play size={16} />}
                label={t.hero.onGooglePlay}
                soon={t.hero.comingSoon}
              />
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-selah-muted">
              {t.hero.caption}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const StoreBadge = ({ icon, label, soon, testid }) => (
  <div
    data-testid={testid}
    className="inline-flex items-center gap-3 rounded-2xl border border-selah-beige/15 bg-selah-bg2/60 backdrop-blur-sm px-4 py-3 cursor-not-allowed select-none"
    aria-disabled="true"
  >
    <span className="text-selah-beige">{icon}</span>
    <div className="leading-tight">
      <p className="text-[10px] uppercase tracking-[0.24em] text-selah-muted">{soon}</p>
      <p className="text-sm font-sans text-selah-text">{label}</p>
    </div>
  </div>
);

export default Hero;
