import React from "react";

const LAYERS = [
  {
    icon: "terminal",
    color: "var(--primary)",
    layer: "LAYER 01",
    title: "Monaco Client Engine",
    desc: "Next.js and WebAssembly-backed browser IDE with syntax tree introspection, linting, and local mock testing.",
  },
  {
    icon: "memory",
    color: "var(--tertiary)",
    layer: "LAYER 02",
    title: "Judge0 Sandbox Cluster",
    desc: "Isolated Docker containers execute code against multi-threaded race condition tests, memory limits, and timeouts.",
  },
  {
    icon: "database",
    color: "var(--on-surface)",
    layer: "LAYER 03",
    title: "Real Postgres Schemas",
    desc: "Every learner interacts with live, isolated database instances populated with millions of synthetic production records.",
  },
  {
    icon: "lock",
    color: "var(--primary-dark)",
    layer: "LAYER 04",
    title: "Proof Verification Vault",
    desc: "Outputs are checked for regression vulnerabilities and sealed with SHA-256 hashes for verifiable recruiter review.",
  },
];

export default function ProjectLab() {
  return (
    <section id="project-lab" style={{
      width: "100%",
      background: "var(--surface)",
      padding: "64px 0",
      borderBottom: "1px solid var(--outline-variant)",
    }}>
      <div className="ss-container" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          maxWidth: "640px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}>
          <span className="eyebrow" style={{ textAlign: "center" }}>
            Technical Authenticity
          </span>
          <h2 style={{
            fontFamily: "var(--font-headline)",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700,
            color: "var(--on-surface)",
          }}>
            Architected for Extreme Engineering Rigor
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "var(--on-surface-variant)",
            lineHeight: 1.65,
          }}>
            SkillSprint is not a video platform with quiz cards. It is an end-to-end cloud
            workstation configured for deterministic capability verification.
          </p>
        </div>

        {/* 4 Infrastructure Layers */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}>
          {LAYERS.map((layer) => (
            <div
              key={layer.layer}
              style={{
                background: "var(--surface-subtle)",
                border: "1px solid var(--outline-variant)",
                borderRadius: "8px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--outline-variant)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 24, color: layer.color }}>
                  {layer.icon}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "var(--outline)",
                }}>
                  {layer.layer}
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-headline)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--on-surface)",
              }}>
                {layer.title}
              </h3>

              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "var(--on-surface-variant)",
                lineHeight: 1.65,
              }}>
                {layer.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
