import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import Reveal from "@/components/Reveal";
import { ShieldCheck } from "lucide-react";

const PrivacyPanel = () => {
  const { lang } = useLang();
  const t = useT(lang);
  return (
    <section data-testid="privacy-panel" className="selah-section">
      <div className="selah-container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-selah-gold/20 bg-gradient-to-br from-selah-bg2 to-selah-surface px-8 md:px-16 py-16 md:py-24">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
            />
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-2 flex md:justify-center">
                <div className="h-20 w-20 rounded-full border border-selah-gold/30 bg-selah-bg/60 flex items-center justify-center">
                  <ShieldCheck size={28} strokeWidth={1.4} className="text-selah-gold" />
                </div>
              </div>
              <div className="md:col-span-10">
                <span className="selah-label">{t.privacy.label}</span>
                <h2 className="selah-h2 mt-3">{t.privacy.title}</h2>
                <p className="selah-body mt-5 max-w-2xl">{t.privacy.body}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PrivacyPanel;
