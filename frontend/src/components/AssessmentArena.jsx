import React from "react";
import { useAuth } from "../context/AuthContext";

export default function AssessmentArena({ onLaunchAssessment }) {
  const { openAuthModal, isLoggedIn } = useAuth();

  const handleLaunch = () => {
    if (onLaunchAssessment) {
      onLaunchAssessment();
    } else {
      openAuthModal(isLoggedIn ? "dashboard" : "register");
    }
  };

  return (
    <section id="assessment-arena" style={{
      width: "100%",
      padding: "64px 0",
      background: "var(--surface-subtle)",
    }}>
      <div className="ss-container">
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--outline-variant)",
          borderRadius: "12px",
          padding: "48px 40px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
          boxShadow: "var(--shadow-sm)",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "600px" }}>
            <span className="eyebrow">Ready for Truth in Engineering?</span>
            <h2 style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--on-surface)",
              lineHeight: 1.25,
            }}>
              Run Your Baseline Simulation Now
            </h2>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--on-surface-variant)",
              lineHeight: 1.7,
            }}>
              Take 15 minutes to run our live diagnostics. Receive your calibrated readiness score,
              identify precise capability gaps, and generate your custom remediation sprint roadmap.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleLaunch}
              className="btn-primary"
              style={{ padding: "12px 24px", fontSize: "0.75rem" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>play_arrow</span>
              <span>LAUNCH FREE DIAGNOSTIC SIMULATOR</span>
            </button>
            <a
              href="#project-lab"
              className="btn-outline"
              style={{ padding: "12px 20px", fontSize: "0.75rem" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>description</span>
              <span>INSPECT ARCHITECTURE</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
