import React from "react";
import { useLang } from "@/i18n/LanguageContext";

/**
 * iPhone-shaped frame that displays the SELAH "interval method" infographic
 * supplied by the client. Switches automatically between the PL and EN poster.
 */
const PhoneMockup = ({ className = "", testid = "phone-mockup" }) => {
  const { lang } = useLang();
  const src = lang === "pl" ? "/brand/selah-method-pl.png" : "/brand/selah-method-en.png";

  return (
    <div
      data-testid={testid}
      className={`relative mx-auto ${className}`}
      style={{ maxWidth: 360 }}
    >
      {/* Outer ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-10 rounded-[3rem] opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.28), transparent 70%)" }}
      />

      {/* Phone shell */}
      <div
        className="relative rounded-[2.6rem] p-[10px]"
        style={{
          background: "linear-gradient(160deg, #2a2a2a 0%, #0c0c0c 55%, #1a1a1a 100%)",
          boxShadow:
            "0 30px 80px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(212,175,55,0.18), inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Inner bezel */}
        <div
          className="relative rounded-[2.1rem] overflow-hidden"
          style={{
            background: "#000",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {/* Top notch (Dynamic Island style) */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-2.5 z-20 h-6 w-24 rounded-full"
            style={{ background: "#000" }}
          />

          {/* Screen content */}
          <div className="relative aspect-[9/19.5] w-full bg-black flex items-center justify-center">
            <img
              src={src}
              alt={
                lang === "pl"
                  ? "SELAH – metoda pracy w interwałach: skupienie, krótka przerwa, powtórz cykl, dłuższa przerwa"
                  : "SELAH – the time interval method: focus, short break, repeat the cycle, longer break"
              }
              className="max-h-full max-w-full w-full object-contain"
              loading="eager"
              decoding="async"
              key={src}
            />
          </div>
        </div>

        {/* Side buttons (pure decoration) */}
        <span
          aria-hidden
          className="absolute -left-[3px] top-[22%] h-12 w-[3px] rounded-l bg-gradient-to-b from-neutral-700 to-neutral-900"
        />
        <span
          aria-hidden
          className="absolute -left-[3px] top-[34%] h-20 w-[3px] rounded-l bg-gradient-to-b from-neutral-700 to-neutral-900"
        />
        <span
          aria-hidden
          className="absolute -right-[3px] top-[28%] h-16 w-[3px] rounded-r bg-gradient-to-b from-neutral-700 to-neutral-900"
        />
      </div>

      {/* Reflective floor */}
      <div
        aria-hidden
        className="mx-auto mt-4 h-6 w-3/4 rounded-[50%] opacity-50 blur-md"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.7), transparent 70%)" }}
      />
    </div>
  );
};

export default PhoneMockup;
