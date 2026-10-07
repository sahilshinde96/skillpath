import React from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function FinalCTA() {
  const { openAuthModal, isLoggedIn } = useAuth();

  return (
    <section style={{ padding: "80px 0" }}>
      <div className="container">
        <div style={{
          backgroundColor: "var(--bg-contrast)",
          borderRadius: "var(--radius-lg)",
          padding: "64px 48px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }} className="cta-card">
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: 700,
            color: "var(--text-inverse)",
            marginBottom: "12px",
            letterSpacing: "-0.02em",
            maxWidth: "480px",
          }}>
            Start building your portfolio today
          </h2>

          <p style={{
            fontSize: "1.0625rem",
            color: "#a1a1aa",
            marginBottom: "32px",
            maxWidth: "440px",
            lineHeight: 1.65,
          }}>
            Pick a career track, complete your first mission, and ship real code — all in about 20 minutes.
          </p>

          <button
            type="button"
            onClick={() => openAuthModal(isLoggedIn ? "dashboard" : "register")}
            className="btn"
            style={{
              padding: "12px 28px",
              fontSize: "0.9375rem",
              backgroundColor: "#ffffff",
              color: "var(--bg-contrast)",
              fontWeight: 700,
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e4e4e7"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ffffff"}
          >
            {isLoggedIn ? "Go to dashboard" : "Get started — it's free"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cta-card { padding: 40px 24px !important; }
          .cta-card h2 { font-size: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
