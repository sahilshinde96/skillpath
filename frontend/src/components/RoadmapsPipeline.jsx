import React from "react";

const PHASES = [
  {
    num: "01",
    phase: "TRIAL",
    title: "Try a Career (Day 0)",
    desc: "Realistic 1-day workplace simulation. Review actual PRs, triage simulated pager incidents, and audit production schemas before committing.",
    footer: "4-Hour Rapid Sandbox",
    footerColor: "var(--tertiary)",
    icon: "explore",
  },
  {
    num: "02",
    phase: "DIAGNOSIS",
    title: "Diagnostic Assessment",
    desc: "Continuous calibration benchmarked against live hiring bars at scale-ups and FAANG clusters. No memorization trivia.",
    footer: "15-Min Micro Test Suites",
    footerColor: "var(--on-surface)",
    footerIconColor: "var(--primary)",
    icon: "analytics",
  },
  {
    num: "03",
    phase: "PINPOINT",
    title: "Skill Gap Analysis",
    desc: "Pinpoints exact capability deficits: query execution plans, thread locks, race conditions, or asynchronous exception boundaries.",
    footer: "Automated Delta Profiling",
    footerColor: "var(--error)",
    icon: "troubleshoot",
  },
  {
    num: "04",
    phase: "SYNTHESIS",
    title: "Personalized Roadmap",
    desc: "Dynamic dependency graph recomputes after each execution pass. Skips content you already master, compressing study time by 60%.",
    footer: "Adaptive DAG Dispatcher",
    footerColor: "var(--primary)",
    icon: "route",
  },
  {
    num: "05",
    phase: "REPETITION",
    title: "Interactive Sprints",
    desc: "20 to 30-minute high-focus coding missions. Integrated Monaco IDE, hot reload testing, and instantaneous stack trace telemetry.",
    footer: "Daily Focused Sprints",
    footerColor: "var(--tertiary)",
    icon: "code_blocks",
  },
  {
    num: "06",
    phase: "FABRICATION",
    title: "Project Lab",
    desc: "Build production architectures. Real PR reviews, GitHub action workflows, load-testing harness passes, and memory leak analysis.",
    footer: "100% Code Coverage Bars",
    footerColor: "var(--on-surface)",
    footerIconColor: "var(--primary)",
    icon: "terminal",
  },
  {
    num: "07",
    phase: "PRESSURE",
    title: "Live Simulation Arena",
    desc: "Survive simulated P1 production outages, database connection locks under load, and emergency architecture mitigation runbooks.",
    footer: "Live P1 Chaos Engineering",
    footerColor: "var(--error)",
    icon: "crisis_alert",
  },
  {
    num: "08",
    phase: "CERTIFICATION",
    title: "Public Skill Passport",
    desc: "Cryptographic verification profile showcasing real commit hashes, test suite passing assertions, and architecture trade-off essays.",
    footer: "SHA-256 Public Proof Link",
    footerColor: "var(--tertiary)",
    icon: "badge",
  },
];

export default function RoadmapsPipeline() {
  return (
    <section id="roadmaps" style={{
      width: "100%",
      background: "var(--surface)",
      padding: "64px 0",
      borderBottom: "1px solid var(--outline-variant)",
    }}>
      <div id="career-dna" />
      <div className="ss-container" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {/* Header */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "16px",
          borderBottom: "1px solid var(--outline-variant)",
          paddingBottom: "24px",
        }}>
          <div>
            <span className="eyebrow">Deterministic Career Readiness Engine</span>
            <h2 style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "var(--on-surface)",
              marginTop: "4px",
            }}>
              The 8-Phase Digital Simulation Pipeline
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "var(--on-surface-variant)",
            maxWidth: "460px",
            lineHeight: 1.6,
          }}>
            Every phase replaces passive study with active execution in production-grade sandboxes.
            Progress is quantified through verifiable telemetry.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}>
          {PHASES.map((p) => (
            <div key={p.num} className="pipeline-card">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "var(--outline)",
                  }}>
                    {p.num}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    background: "var(--primary-container)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}>
                    {p.phase}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span className="material-symbols-outlined pipeline-icon" style={{ fontSize: 22, marginTop: 2 }}>
                    {p.icon}
                  </span>
                  <h3 style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--on-surface)",
                    lineHeight: 1.3,
                  }}>
                    {p.title}
                  </h3>
                </div>

                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--on-surface-variant)",
                  lineHeight: 1.65,
                }}>
                  {p.desc}
                </p>
              </div>

              <div style={{
                borderTop: "1px solid var(--outline-variant)",
                paddingTop: "12px",
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: p.footerColor,
                }}>
                  {p.footer}
                </span>
                <span className="material-symbols-outlined" style={{
                  fontSize: 14,
                  color: p.footerIconColor || p.footerColor,
                }}>
                  check_circle
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
