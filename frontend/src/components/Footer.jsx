import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Mail } from "lucide-react";

const Footer = () => {
  const { lang } = useLang();
  const t = useT(lang);
  return (
    <footer
      data-testid="site-footer"
      className="relative mt-16 border-t border-selah-beige/10 bg-selah-bg2/40"
    >
      <div className="selah-container py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        <div className="md:col-span-5">
          <Logo size="lg" testid="footer-logo" />
          <p className="mt-5 font-serif italic text-selah-beige/90 text-lg">
            {t.footer.tagline}
          </p>
          <p className="mt-5 selah-body max-w-md">
            {t.meta.description}
          </p>
          <div className="mt-6">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="selah-label mb-4">{t.footer.legal}</p>
          <ul className="space-y-3">
            <li>
              <Link
                to={t.legalLinks.termsPath}
                data-testid="footer-terms-link"
                className="text-selah-text hover:text-selah-gold transition-colors font-sans text-sm"
              >
                {t.footer.terms}
              </Link>
            </li>
            <li>
              <Link
                to={t.legalLinks.privacyPath}
                data-testid="footer-privacy-link"
                className="text-selah-text hover:text-selah-gold transition-colors font-sans text-sm"
              >
                {t.footer.privacy}
              </Link>
            </li>
            <li>
              <a
                href="#contact"
                data-testid="footer-contact-link"
                className="text-selah-text hover:text-selah-gold transition-colors font-sans text-sm"
              >
                {t.footer.contact}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="selah-label mb-4">{t.contact.label}</p>
          <a
            href="mailto:MCS_KONTAKT@HOTMAIL.COM"
            data-testid="footer-email"
            className="inline-flex items-center gap-2 text-selah-gold hover:text-selah-beige transition-colors font-sans text-sm"
          >
            <Mail size={14} /> MCS_KONTAKT@HOTMAIL.COM
          </a>
          <div className="mt-6 font-sans text-xs text-selah-muted leading-relaxed">
            <p>{t.footer.operator}</p>
            <p>{t.footer.address}</p>
            <p className="mt-1">{t.footer.ids}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-selah-beige/10">
        <div className="selah-container py-6 text-center md:text-left">
          <p className="font-sans text-xs text-selah-muted">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
