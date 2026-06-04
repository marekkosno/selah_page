import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";

const FAQ = () => {
  const { lang } = useLang();
  const t = useT(lang);
  return (
    <section id="faq" data-testid="faq-section" className="selah-section bg-selah-bg2/40">
      <div className="selah-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="selah-label">{t.faq.label}</span>
              <h2 className="selah-h2 mt-4">{t.faq.title}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
                {t.faq.items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="border-b border-selah-beige/10"
                    data-testid={`faq-item-${idx + 1}`}
                  >
                    <AccordionTrigger className="text-left font-serif text-xl md:text-2xl text-selah-text hover:text-selah-gold hover:no-underline py-6">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-base text-selah-muted leading-relaxed pb-6 max-w-2xl">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
