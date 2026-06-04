import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useLang } from "@/i18n/LanguageContext";
import { useT } from "@/i18n/translations";
import Reveal from "@/components/Reveal";
import { ArrowRight, Mail, Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const NewsletterAndContact = () => {
  const { lang } = useLang();
  const t = useT(lang);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  // Contact form state
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [contactLoading, setContactLoading] = useState(false);

  const submitNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email: newsletterEmail, lang });
      toast.success(t.newsletter.success);
      setNewsletterEmail("");
    } catch (err) {
      const msg = err?.response?.data?.detail?.[0]?.msg || t.newsletter.error;
      toast.error(msg);
    } finally {
      setNewsletterLoading(false);
    }
  };

  const submitContact = async (e) => {
    e.preventDefault();
    if (!contact.email || !contact.message) return;
    setContactLoading(true);
    try {
      await axios.post(`${API}/contact`, { ...contact, lang });
      toast.success(t.contact.success);
      setContact({ name: "", email: "", message: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail?.[0]?.msg || t.contact.error;
      toast.error(msg);
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="newsletter-contact-section"
      className="selah-section"
    >
      <a id="newsletter" aria-hidden className="block -translate-y-24" />
      <div className="selah-container grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Newsletter */}
        <Reveal className="lg:col-span-5">
          <div className="relative bg-selah-bg2 border border-selah-beige/10 rounded-3xl p-8 md:p-12 h-full overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
            />
            <div className="relative">
              <span className="selah-label">{t.newsletter.label}</span>
              <h2 className="selah-h2 mt-3">{t.newsletter.title}</h2>
              <p className="selah-body mt-4">{t.newsletter.body}</p>

              <form
                onSubmit={submitNewsletter}
                data-testid="newsletter-form"
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  {t.newsletter.placeholderEmail}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t.newsletter.placeholderEmail}
                  data-testid="newsletter-email-input"
                  className="selah-input flex-1"
                />
                <button
                  type="submit"
                  disabled={newsletterLoading}
                  data-testid="newsletter-submit"
                  className="selah-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {newsletterLoading ? "…" : t.newsletter.submit} <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal delay={120} className="lg:col-span-7">
          <div className="relative h-full">
            <span className="selah-label">{t.contact.label}</span>
            <h2 className="selah-h2 mt-3">{t.contact.title}</h2>
            <p className="selah-body mt-4 max-w-2xl">
              {t.contact.body.split("MCS_KONTAKT@HOTMAIL.COM")[0]}
              <a
                href="mailto:MCS_KONTAKT@HOTMAIL.COM"
                data-testid="contact-email-link"
                className="text-selah-gold hover:text-selah-beige inline-flex items-center gap-1"
              >
                <Mail size={14} /> MCS_KONTAKT@HOTMAIL.COM
              </a>
              {t.contact.body.split("MCS_KONTAKT@HOTMAIL.COM")[1] || "."}
            </p>

            <form
              onSubmit={submitContact}
              data-testid="contact-form"
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="sm:col-span-1">
                <label htmlFor="contact-name" className="sr-only">
                  {t.contact.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={contact.name}
                  onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  placeholder={t.contact.name}
                  data-testid="contact-name-input"
                  className="selah-input"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="contact-email" className="sr-only">
                  {t.contact.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={contact.email}
                  onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  placeholder={t.contact.email}
                  data-testid="contact-email-input"
                  className="selah-input"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="sr-only">
                  {t.contact.message}
                </label>
                <textarea
                  id="contact-message"
                  required
                  minLength={5}
                  rows={5}
                  value={contact.message}
                  onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
                  placeholder={t.contact.message}
                  data-testid="contact-message-input"
                  className="selah-input rounded-2xl resize-none"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={contactLoading}
                  data-testid="contact-submit"
                  className="selah-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {contactLoading ? "…" : t.contact.submit} <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default NewsletterAndContact;
