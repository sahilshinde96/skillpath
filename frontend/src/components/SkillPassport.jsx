import React from "react";

const HIGHLIGHTS = [
  {
    icon: "verified_user",
    title: "Judge0 Execution Hashes",
    desc: "Every solution run produces a SHA-256 execution certificate certifying you wrote the code.",
  },
  {
    icon: "sync_alt",
    title: "Automatic Public GitHub Synchronization",
    desc: "Completed sprint projects automatically open production-grade PRs on your personal GitHub.",
  },
  {
    icon: "travel_explore",
    title: "Instant Hiring Recruiter Inspection",
    desc: "Recruiters can run your code live inside an ephemeral sandbox straight from your resume link.",
  },
];

const PASSPORT_TESTS = [
  { name: "dist-raft-consensus-impl", result: "18/18 Tests (0.84s)" },
  { name: "redis-stream-event-broker", result: "22/22 Tests (1.12s)" },
  { name: "postgres-btree-optimizer", result: "14/14 Tests (0.42s)" },
];

const COMPARISON = [
  {
    dimension: "Learning Medium",
    traditional: "80+ hours of passive video watching",
    skillsprint: "100% active code execution & system debugging",
  },
  {
    dimension: "Assessment Method",
    traditional: "Multiple-choice questions & toy quizzes",
    skillsprint: "Deterministic test suites, memory benchmarks & chaos drills",
  },
  {
    dimension: "Proof of Capability",
    traditional: "Unverifiable PDF certificates anyone can screenshot",
    skillsprint: "Public Skill Passport backed by git commits & SHA hashes",
  },
  {
    dimension: "Career Calibration",
    traditional: "Generic unstructured curriculum",
    skillsprint: "Personalized DAG roadmap targeting verified hiring bars",
  },
];

export default function SkillPassport() {
  return (
    <section id="passport" style={{
      width: "100%",
      padding: "64px 0",
      borderBottom: "1px solid var(--outline-variant)",
      background: "var(--surface-subtle)",
    }}>
      <div className="ss-container" style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        {/* Top 2-Col: Description + Live Passport Card */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "40px",
          alignItems: "center",
        }} className="desktop-two-col">
          {/* Left: Value Prop */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span className="eyebrow">Verifiable Proof vs Fake Diplomas</span>
            <h2 style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "var(--on-surface)",
              lineHeight: 1.3,
            }}>
              The Skill Passport: Cryptographic Proof of Engineering Competence
            </h2>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--on-surface-variant)",
              lineHeight: 1.7,
            }}>
              Stop showing PDFs that prove nothing. SkillSprint records every code diff,
              every passing unit test suite, and every system benchmark into an immutable public ledger.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", paddingTop: "8px" }}>
              {HIGHLIGHTS.map((item) => (
                <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span className="material-symbols-outlined" style={{
                    color: "var(--primary)",
                    fontSize: 20,
                    marginTop: 2,
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </span>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-headline)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--on-surface)",
                      marginBottom: "2px",
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "var(--on-surface-variant)",
                      lineHeight: 1.6,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: "8px" }}>
              <a
                href="#passport-card"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--primary)",
                  fontFamily: "var(--font-label)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <span>View Sample Verifiable Passport (Alex Chen)</span>
                <span className="material-symbols-outlined" style={{ fontSize: 15 }}>open_in_new</span>
              </a>
            </div>
          </div>

          {/* Right: Verifiable Passport Certificate Card */}
          <div id="passport-card" style={{
            background: "var(--surface)",
            border: "1px solid var(--outline-variant)",
            borderRadius: "8px",
            padding: "24px",
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
              paddingBottom: "12px",
            }}>
              <div>
                <span style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--outline)",
                }}>
                  PUBLIC VERIFIED SKILL PASSPORT
                </span>
                <h3 style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "var(--on-surface)",
                  marginTop: "2px",
                }}>
                  Alex Chen · Staff Systems Candidate
                </h3>
              </div>
              <span style={{
                background: "var(--tertiary-container)",
                color: "var(--tertiary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "4px",
              }}>
                100% VERIFIED
              </span>
            </div>

            {/* Hashes & Metadata */}
            <div style={{
              background: "var(--surface-subtle)",
              border: "1px solid var(--outline-variant)",
              borderRadius: "6px",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6875rem", fontFamily: "var(--font-mono)" }}>
                <span style={{ color: "var(--outline)" }}>AUDIT HASH:</span>
                <span style={{ color: "var(--primary)", fontWeight: 600 }}>sha256:8f9a2c1...d40b</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6875rem", fontFamily: "var(--font-mono)" }}>
                <span style={{ color: "var(--outline)" }}>ISSUER:</span>
                <span style={{ color: "var(--on-surface)" }}>SkillSprint Judge0 Cluster</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6875rem", fontFamily: "var(--font-mono)" }}>
                <span style={{ color: "var(--outline)" }}>BENCHMARK SCORE:</span>
                <span style={{ color: "var(--tertiary)", fontWeight: 700 }}>88.4 / 100 CALIBRATED</span>
              </div>
            </div>

            {/* Test suites row */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--outline)",
                marginBottom: "4px",
              }}>
                Verified Automated Test Assertions
              </span>
              {PASSPORT_TESTS.map((t) => (
                <div key={t.name} className="passport-row">
                  <span style={{ color: "var(--on-surface)" }}>{t.name}</span>
                  <span style={{ color: "var(--tertiary)", fontWeight: 600 }}>{t.result}</span>
                </div>
              ))}
            </div>

            <div style={{
              borderTop: "1px solid var(--outline-variant)",
              paddingTop: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--outline)" }}>
                Ledger ID: #SKP-2026-US-8902
              </span>
              <span style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.625rem",
                fontWeight: 700,
                color: "var(--primary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                CRYPTOGRAPHICALLY SEALED
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Operational Comparison Table */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--outline-variant)",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>
          <h3 style={{
            fontFamily: "var(--font-headline)",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--on-surface)",
          }}>
            Operational Comparison: Video Tutorials vs Digital Simulation
          </h3>

          <div style={{ overflowX: "auto" }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Evaluation Dimension</th>
                  <th>Traditional Tutorial Platforms</th>
                  <th style={{ color: "var(--primary)", fontWeight: 700 }}>SkillSprint Simulator</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(({ dimension, traditional, skillsprint }) => (
                  <tr key={dimension}>
                    <td style={{ fontWeight: 600, color: "var(--on-surface)", fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>
                      {dimension}
                    </td>
                    <td style={{ color: "var(--on-surface-variant)", fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>
                      {traditional}
                    </td>
                    <td style={{ color: "var(--tertiary)", fontWeight: 600, fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>
                      {skillsprint}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
