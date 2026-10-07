import React from "react";

const FEATURES = [
  {
    id: "simulator",
    target: "lesson",
    icon: "terminal",
    tag: "LIVE WORKSTATION",
    tagColor: "var(--primary)",
    tagBg: "var(--primary-container)",
    title: "In-Browser Code Simulator",
    desc: "Solve real engineering missions in Monaco IDE with hot reloading, automated test suites, and Socratic AI mentor guidance.",
    cta: "Launch Simulator",
    badge: "Monaco + Tests",
  },
  {
    id: "dashboard",
    target: "dashboard",
    icon: "dashboard",
    tag: "DAILY SPRINT LOOP",
    tagColor: "var(--tertiary)",
    tagBg: "var(--tertiary-container)",
    title: "Mission Dashboard & Streaks",
    desc: "Track today's 20-minute daily mission, calibrated Career Score gauge, freeze protection, and streak reset countdowns.",
    cta: "Open Dashboard",
    badge: "20-Min Missions",
  },
  {
    id: "leaderboard",
    target: "leaderboard",
    icon: "leaderboard",
    tag: "PEER RANKINGS",
    tagColor: "var(--amber)",
    tagBg: "var(--amber-light)",
    title: "Global & Squad Leaderboard",
    desc: "Compete with study squads and the global community on Career Score, streak podiums, and completed sprint achievements.",
    cta: "View Leaderboard",
    badge: "Live Ranks",
  },
  {
    id: "portfolio",
    target: "portfolio",
    icon: "verified",
    tag: "CRYPTOGRAPHIC PROOF",
    tagColor: "var(--on-surface)",
    tagBg: "var(--surface-container)",
    title: "Verified Skill Portfolio",
    desc: "Showcase passing unit test assertions, SHA-256 commit verification hashes, and production GitHub repositories.",
    cta: "Inspect Portfolio",
    badge: "SHA-256 Verified",
  },
];

export default function FeatureHub({ onNavigate }) {
  return (
    <section style={{
      width: "100%",
      padding: "40px 0 48px",
      background: "var(--surface)",
      borderBottom: "1px solid var(--outline-variant)",
    }}>
      <div className="ss-container" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Section Header */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "16px",
          borderBottom: "1px solid var(--outline-variant)",
          paddingBottom: "16px",
        }}>
          <div>
            <span className="eyebrow">Explore Platform Modules</span>
            <h2 style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
              fontWeight: 700,
              color: "var(--on-surface)",
              marginTop: "2px",
            }}>
              Choose a Feature to Launch Directly
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--on-surface-variant)",
            maxWidth: "440px",
            lineHeight: 1.5,
          }}>
            Click any module card to immediately enter the working environment — no lengthy onboarding or setup required.
          </p>
        </div>

        {/* 4 Feature Launch Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "18px",
        }}>
          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              onClick={() => onNavigate?.(feat.target)}
              style={{
                background: "var(--surface-subtle)",
                border: "1px solid var(--outline-variant)",
                borderRadius: "8px",
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "16px",
                cursor: "pointer",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--outline-variant)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.5625rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: feat.tagColor,
                    background: feat.tagBg,
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}>
                    {feat.tag}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--outline)",
                  }}>
                    {feat.badge}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "2px" }}>
                  <div style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "6px",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--outline-variant)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--primary)" }}>
                      {feat.icon}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    color: "var(--on-surface)",
                  }}>
                    {feat.title}
                  </h3>
                </div>

                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--on-surface-variant)",
                  lineHeight: 1.6,
                }}>
                  {feat.desc}
                </p>
              </div>

              <div style={{
                borderTop: "1px solid var(--outline-variant)",
                paddingTop: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <span style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--primary)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}>
                  {feat.cta}
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                </span>
                <span style={{
                  fontSize: "0.625rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--outline)",
                }}>
                  Click to open
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
