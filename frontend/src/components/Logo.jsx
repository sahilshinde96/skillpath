import React from "react";

/**
 * SkillSprint Official Brand Logo Component
 * Follows the official brand guidelines:
 * - Icon: Squircle with upward chevron and amber progress/achievement dot
 * - Light Mode: Indigo squircle (#4338ca) with white chevron (#ffffff) and amber dot (#f59e0b)
 * - Dark Mode: White squircle (#ffffff) with indigo chevron (#4338ca) and amber dot (#f59e0b)
 * - Wordmark: "SkillSprint" in bold geometric sans-serif
 */
export default function Logo({
  iconSize = 34,
  showText = true,
  theme = "light",
  textStyle = {},
  style = {},
  className = "",
}) {
  const isDark = theme === "dark";
  const squircleBg = isDark ? "#ffffff" : "#4338ca";
  const chevronColor = isDark ? "#4338ca" : "#ffffff";
  const dotColor = "#f59e0b"; // Vibrant amber
  const textColor = isDark ? "#ffffff" : "#0f172a";

  return (
    <div
      className={`skillsprint-logo ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        userSelect: "none",
        ...style,
      }}
    >
      {/* Brand Icon (Squircle + Chevron + Amber Dot) */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          flexShrink: 0,
          display: "block",
          filter: isDark
            ? "drop-shadow(0 2px 6px rgba(0,0,0,0.3))"
            : "drop-shadow(0 2px 6px rgba(67, 56, 202, 0.28))",
        }}
        aria-hidden="true"
      >
        {/* Squircle base */}
        <rect width="100" height="100" rx="26" fill={squircleBg} />

        {/* Dynamic Amber Dot (Achievement / Next Summit) */}
        <circle cx="71" cy="29" r="8.5" fill={dotColor} />

        {/* Upward Chevron (Ascent / Forward Sprint) */}
        <path
          d="M 24 63 L 50 37 L 76 63"
          stroke={chevronColor}
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Wordmark */}
      {showText && (
        <span
          style={{
            fontFamily: "var(--font-headline, 'Inter', -apple-system, sans-serif)",
            fontWeight: 800,
            fontSize: `${Math.max(1.15, iconSize * 0.038)}rem`,
            letterSpacing: "-0.03em",
            color: textColor,
            lineHeight: 1,
            ...textStyle,
          }}
        >
          SkillSprint
        </span>
      )}
    </div>
  );
}
