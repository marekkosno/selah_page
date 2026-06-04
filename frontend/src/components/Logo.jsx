import React from "react";

/**
 * SELAH brand mark: gold "praying hands + clock" icon followed by the SELAH wordmark.
 * `iconOnly=true` returns just the rounded icon (useful for small spaces).
 */
const Logo = ({ className = "", size = "md", iconOnly = false, testid = "selah-logo" }) => {
  const wordSize = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }[size];
  const iconSize = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  }[size];

  if (iconOnly) {
    return (
      <a
        href="/"
        data-testid={testid}
        className={`inline-block ${className}`}
        aria-label="SELAH"
      >
        <img
          src="/brand/selah-icon.png"
          alt="SELAH"
          className={`${iconSize} rounded-[22%] shadow-lg shadow-black/40 ring-1 ring-selah-gold/15`}
          loading="eager"
        />
      </a>
    );
  }

  return (
    <a
      href="/"
      data-testid={testid}
      className={`group inline-flex items-center gap-3 select-none ${className}`}
      aria-label="SELAH – Skupienie i Modlitwa"
    >
      <img
        src="/brand/selah-icon.png"
        alt=""
        aria-hidden
        className={`${iconSize} rounded-[22%] shadow-lg shadow-black/40 ring-1 ring-selah-gold/15 transition-transform duration-500 group-hover:scale-105`}
        loading="eager"
      />
      <span
        className={`font-serif ${wordSize} text-selah-text tracking-[0.18em] uppercase`}
        style={{ fontWeight: 500 }}
      >
        SELAH
      </span>
    </a>
  );
};

export default Logo;
