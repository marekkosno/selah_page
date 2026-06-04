import React from "react";

/**
 * Wordmark for SELAH — set in Cormorant Garamond italic with a small dot accent.
 */
const Logo = ({ className = "", size = "md", testid = "selah-logo" }) => {
  const sizeMap = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };
  return (
    <a
      href="/"
      data-testid={testid}
      className={`group inline-flex items-baseline gap-2 select-none ${className}`}
      aria-label="SELAH – Skupienie i Modlitwa"
    >
      <span
        className={`font-serif ${sizeMap[size]} text-selah-text tracking-[0.18em] uppercase`}
        style={{ fontWeight: 500 }}
      >
        SELAH
      </span>
      <span
        className="block h-1.5 w-1.5 rounded-full bg-selah-gold transition-all duration-300 group-hover:scale-125"
        aria-hidden
      />
    </a>
  );
};

export default Logo;
