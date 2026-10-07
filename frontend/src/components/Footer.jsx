import React from "react";
import Logo from "./Logo";

export default function Footer({ onOpenLegal }) {
  return (
    <footer style={{
      width: "100%",
      background: "var(--surface)",
      borderTop: "1px solid var(--outline-variant)",
      padding: "36px 0 28px",
    }}>
      <div className="ss-container" style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          borderBottom: "1px solid var(--outline-variant)",
          paddingBottom: "24px",
        }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Logo iconSize={30} theme="light" />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              color: "var(--outline)",
              background: "var(--surface-container)",
              padding: "2px 6px",
              borderRadius: "3px",
              marginLeft: "6px",
            }}>
              DIGITAL SIMULATOR
            </span>
          </div>

          {/* Links */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontFamily: "var(--font-label)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--on-surface-variant)",
            flexWrap: "wrap",
          }}>
            <a href="#simulator-preview" style={{ transition: "color 0.15s" }}>Simulations</a>
            <a href="#skill-graph" style={{ transition: "color 0.15s" }}>Skill Graph</a>
            <a href="#roadmaps" style={{ transition: "color 0.15s" }}>Roadmaps</a>
            <a href="#project-lab" style={{ transition: "color 0.15s" }}>Project Lab</a>
            <a href="#passport" style={{ transition: "color 0.15s" }}>Skill Passport</a>
            <button
              type="button"
              onClick={() => onOpenLegal?.("privacy")}
              style={{
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
                letterSpacing: "inherit",
                textTransform: "inherit",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal?.("terms")}
              style={{
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
                letterSpacing: "inherit",
                textTransform: "inherit",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              Terms
            </button>
          </div>
        </div>

        {/* Bottom Bar with Engine Status & Build Hash */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          color: "var(--on-surface-variant)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--tertiary)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--tertiary)" }} />
              ALL SIMULATION NODES HEALTHY
            </span>
            <span style={{ color: "var(--outline-variant)" }}>·</span>
            <span style={{ color: "var(--outline)" }}>
              BUILD: #9f8a32d · DETERMINISTIC ENGINE V4.2
            </span>
          </div>

          <div style={{ color: "var(--outline)" }}>
            © {new Date().getFullYear()} SkillSprint. Verified engineering competence.
          </div>
        </div>
      </div>
    </footer>
  );
}
