import React, { useState } from "react";

const TRACKS = [
  { id: "dist", track: "TIER-1 TRACK", title: "Distributed Systems", score: 74 },
  { id: "full", track: "ENTERPRISE TRACK", title: "Full-Stack Architect", score: 81 },
  { id: "sre", track: "RELIABILITY TRACK", title: "Platform & SRE", score: 68 },
];

const METRICS_BY_TRACK = {
  dist: [
    { label: "Systems Architecture & APIs", pct: 88, color: "var(--primary)", textColor: "var(--primary)", suffix: "" },
    { label: "Concurrency & Multi-Threading", pct: 62, color: "var(--error)", textColor: "var(--error)", suffix: " (Gap Alert)" },
    { label: "Data Integrity & Transaction Isolation", pct: 79, color: "var(--tertiary)", textColor: "var(--tertiary)", suffix: "" },
    { label: "Automated Testing & CI Execution", pct: 84, color: "var(--primary)", textColor: "var(--primary)", suffix: "" },
  ],
  full: [
    { label: "React 18 & Virtual DOM Hydration", pct: 92, color: "var(--tertiary)", textColor: "var(--tertiary)", suffix: "" },
    { label: "REST / GraphQL & DataLoader Optimization", pct: 86, color: "var(--primary)", textColor: "var(--primary)", suffix: "" },
    { label: "Postgres Indexing & EXPLAIN Plans", pct: 64, color: "var(--error)", textColor: "var(--error)", suffix: " (Gap Alert)" },
    { label: "Auth, CSRF & Distributed Sessions", pct: 82, color: "var(--primary)", textColor: "var(--primary)", suffix: "" },
  ],
  sre: [
    { label: "Linux Namespaces & Container Isolation", pct: 85, color: "var(--primary)", textColor: "var(--primary)", suffix: "" },
    { label: "Kubernetes Ingress & Mesh Networking", pct: 58, color: "var(--error)", textColor: "var(--error)", suffix: " (Gap Alert)" },
    { label: "Prometheus Alerts & SLI/SLO Budgets", pct: 76, color: "var(--tertiary)", textColor: "var(--tertiary)", suffix: "" },
    { label: "CI/CD Rollback Automation & Canaries", pct: 72, color: "var(--primary)", textColor: "var(--primary)", suffix: "" },
  ],
};

export default function Hero({ onLaunchSimulator, onOpenDashboard }) {
  const [selectedTrack, setSelectedTrack] = useState("dist");

  const currentTrack = TRACKS.find((t) => t.id === selectedTrack) || TRACKS[0];
  const metrics = METRICS_BY_TRACK[selectedTrack] || METRICS_BY_TRACK.dist;
  const score = currentTrack.score;

  return (
    <section style={{
      width: "100%",
      padding: "36px 0 44px",
      borderBottom: "1px solid var(--outline-variant)",
      background: "linear-gradient(180deg, #ffffff 0%, var(--surface-subtle) 100%)",
    }}>
      <div className="ss-container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "36px",
          alignItems: "start",
        }} className="desktop-two-col">
          {/* Left Column: Headline & Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Pill eyebrow */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--surface)",
              border: "1px solid var(--outline-variant)",
              borderRadius: "9999px",
              padding: "4px 14px",
              width: "fit-content",
              boxShadow: "var(--shadow-sm)",
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--primary)",
                display: "inline-block",
              }} />
              <span style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--on-surface-variant)",
              }}>
                PRODUCTION VERIFICATION ENGINE • ZERO MULTIPLE CHOICE
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(2rem, 4.2vw, 3.25rem)",
              fontWeight: 700,
              color: "var(--on-surface)",
              letterSpacing: "-0.02em",
              lineHeight: 1.18,
            }}>
              Build the skills for the career you{" "}
              <span style={{
                color: "var(--primary)",
                fontStyle: "italic",
                textDecoration: "underline",
                textDecorationColor: "var(--primary-container)",
                textDecorationThickness: "3px",
                textUnderlineOffset: "8px",
              }}>
                actually want
              </span>
              .
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--on-surface-variant)",
              maxWidth: "560px",
              lineHeight: 1.7,
            }}>
              The Digital Career Simulator: Real in-browser Monaco IDE missions,
              automated test suites, and cryptographically verified portfolios.
              Choose any feature below to dive straight in.
            </p>

            {/* Benchmark Track Selector */}
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--outline-variant)",
              borderRadius: "8px",
              padding: "16px 18px",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <span style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--outline)",
                }}>
                  SELECT TARGET CAREER BENCHMARK
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--primary)",
                  fontWeight: 600,
                }}>
                  3,420 Senior Roles Indexed
                </span>
              </div>

              {/* 3 Tracks */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
              }}>
                {TRACKS.map((t) => {
                  const isSelected = t.id === selectedTrack;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTrack(t.id)}
                      style={{
                        background: isSelected ? "rgba(231, 235, 255, 0.45)" : "var(--surface)",
                        border: isSelected ? "2px solid var(--primary)" : "1px solid var(--outline-variant)",
                        borderRadius: "6px",
                        padding: "10px 12px",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span style={{
                        display: "block",
                        fontFamily: "var(--font-label)",
                        fontSize: "0.5625rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: isSelected ? "var(--primary)" : "var(--outline)",
                        marginBottom: "3px",
                      }}>
                        {t.track}
                      </span>
                      <strong style={{
                        display: "block",
                        fontFamily: "var(--font-headline)",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: "var(--on-surface)",
                        lineHeight: 1.25,
                      }}>
                        {t.title}
                      </strong>
                    </button>
                  );
                })}
              </div>

              {/* Direct Launch Buttons */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                paddingTop: "4px",
              }}>
                <button
                  type="button"
                  onClick={onLaunchSimulator}
                  className="btn-primary"
                  style={{ gap: "8px" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>terminal</span>
                  <span>LAUNCH SIMULATOR IDE</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenDashboard}
                  className="btn-outline"
                  style={{ gap: "8px" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: "var(--primary)" }}>dashboard</span>
                  <span>OPEN DASHBOARD</span>
                </button>
              </div>
            </div>

            {/* 3 Proof Points */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "14px",
              paddingTop: "6px",
              borderTop: "1px solid rgba(226, 232, 240, 0.6)",
            }}>
              <div>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                }}>
                  100% Deterministic
                </span>
                <span style={{ fontSize: "0.6875rem", color: "var(--outline)" }}>
                  Judge0 test harness
                </span>
              </div>
              <div>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--tertiary)",
                }}>
                  Zero Trivia
                </span>
                <span style={{ fontSize: "0.6875rem", color: "var(--outline)" }}>
                  Production diffs only
                </span>
              </div>
              <div>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--on-surface)",
                }}>
                  SHA-256 Proof
                </span>
                <span style={{ fontSize: "0.6875rem", color: "var(--outline)" }}>
                  On-chain skill passports
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Career Twin Telemetry Card */}
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--outline-variant)",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--outline-variant)",
              paddingBottom: "10px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--primary)" }}>
                  monitoring
                </span>
                <span style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--on-surface)",
                }}>
                  Career Twin Telemetry
                </span>
              </div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                color: "var(--outline)",
              }}>
                NODE #7890-US-E
              </span>
            </div>

            {/* Gauge Row */}
            <div style={{
              background: "var(--surface-subtle)",
              border: "1px solid var(--outline-variant)",
              borderRadius: "6px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-label)",
                  fontSize: "0.5625rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--outline)",
                }}>
                  Benchmark Readiness
                </span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "2px" }}>
                  <span style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--on-surface)",
                  }}>
                    {score}%
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--primary)",
                    fontWeight: 600,
                  }}>
                    / 100 Calibrated
                  </span>
                </div>
              </div>

              {/* Circular Gauge */}
              <div style={{ position: "relative", width: "50px", height: "50px" }}>
                <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--surface-container-high)"
                    strokeWidth="3.2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3.2"
                    strokeDasharray={`${score}, 100`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 0.6s ease" }}
                  />
                </svg>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "var(--on-surface)",
                }}>
                  {score}%
                </div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {metrics.map((m) => (
                <div key={m.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: "var(--on-surface)",
                    }}>
                      {m.label}
                      {m.suffix && (
                        <span style={{ color: "var(--error)", fontWeight: 700 }}>
                          {m.suffix}
                        </span>
                      )}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: m.textColor,
                    }}>
                      {m.pct}%
                    </span>
                  </div>
                  <div className="progress-track" style={{ height: "5px" }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${m.pct}%`,
                        backgroundColor: m.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Click to launch mission */}
            <div style={{
              borderTop: "1px solid var(--outline-variant)",
              paddingTop: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                color: "var(--tertiary)",
                fontWeight: 600,
                background: "var(--tertiary-container)",
                padding: "3px 6px",
                borderRadius: "3px",
              }}>
                Impact: +6 Concurrency Pts
              </span>
              <button
                type="button"
                onClick={onLaunchSimulator}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "var(--primary)",
                  fontFamily: "var(--font-label)",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Launch In IDE →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
