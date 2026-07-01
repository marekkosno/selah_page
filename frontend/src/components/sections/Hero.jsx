import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import { Apple, Play, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import PhoneMockup from "@/components/PhoneMockup";

const Hero = () => {
  const { lang } = useLang();
  const t = useT(lang);

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[100svh] flex items-center pt-28 pb-20 overflow-hidden"
    >
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-selah-bg">
        <div
          aria-hidden
          className="absolute -top-32 -right-40 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl animate-soft-pulse"
          style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #E2D1B3 0%, transparent 70%)" }}
        />
      </div>

      <div className="selah-container relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="md:col-span-7 order-2 md:order-1">
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
              <p data-testid="hero-subtitle" className="selah-body mt-7 max-w-xl">
                {t.hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-10 flex flex-row flex-wrap gap-3 sm:gap-4">
                <a href="#how" data-testid="hero-cta-primary" className="selah-btn-primary">
                  {t.hero.ctaPrimary} <ArrowRight size={16} />
                </a>
                <a href="#contact" data-testid="hero-cta-secondary" className="selah-btn-secondary">
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </Reveal>

            <Reveal delay={480}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <StoreBadge
                  testid="hero-appstore-badge"
                  icon={<Apple size={18} />}
                  label={t.hero.onAppStore}
                  caption={t.hero.downloadOn}
                  href="https://apps.apple.com/br/app/selah-skupienie-i-modlitwa/id6775883461"
                />
                <StoreBadge
                  testid="hero-googleplay-badge"
                  icon={<Play size={16} />}
                  label={t.hero.onGooglePlay}
                  caption={t.hero.comingSoon}
                />
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-selah-muted">
                {t.hero.caption}
              </p>
            </Reveal>
          </div>

          {/* Right: phone mockup */}
          <div className="md:col-span-5 order-1 md:order-2">
            <Reveal delay={180}>
              <PhoneMockup className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[360px]" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const StoreBadge = ({ icon, label, caption, testid, href }) => {
  const base =
    "inline-flex items-center gap-3 rounded-2xl border px-4 py-3 select-none transition-all duration-300";
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={testid}
        className={`${base} border-selah-gold/40 bg-selah-bg2/70 backdrop-blur-sm hover:border-selah-gold hover:bg-selah-bg2 hover:-translate-y-0.5`}
      >
        <span className="text-selah-gold">{icon}</span>
        <div className="leading-tight text-left">
          <p className="text-[10px] uppercase tracking-[0.24em] text-selah-muted">{caption}</p>
          <p className="text-sm font-sans text-selah-text">{label}</p>
        </div>
      </a>
    );
  }
  return (
    <div
      data-testid={testid}
      className={`${base} border-selah-beige/15 bg-selah-bg2/60 backdrop-blur-sm cursor-not-allowed`}
      aria-disabled="true"
    >
      <span className="text-selah-beige">{icon}</span>
      <div className="leading-tight">
        <p className="text-[10px] uppercase tracking-[0.24em] text-selah-muted">{caption}</p>
        <p className="text-sm font-sans text-selah-text">{label}</p>
      </div>
    </div>
  );
};

export default Hero;
