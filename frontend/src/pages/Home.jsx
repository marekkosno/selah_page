import React, { useEffect } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import WhatIs from "@/components/sections/WhatIs";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Benefits from "@/components/sections/Benefits";
import PrivacyPanel from "@/components/sections/PrivacyPanel";
import FAQ from "@/components/sections/FAQ";
import NewsletterAndContact from "@/components/sections/NewsletterAndContact";

const Home = () => {
  const { lang } = useLang();
  const t = useT(lang);

  useEffect(() => {
    document.title = t.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t.meta.description);
  }, [lang, t]);

  return (
    <div data-testid="home-page" className="relative min-h-screen bg-selah-bg text-selah-text">
      <Header />
      <main>
        <Hero />
        <WhatIs />
        <HowItWorks />
        <Features />
        <Benefits />
        <PrivacyPanel />
        <FAQ />
        <NewsletterAndContact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
