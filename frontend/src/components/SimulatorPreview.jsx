import React, { useState } from "react";

const INCIDENTS = [
  {
    id: "pool",
    badge: "P1 Outage Simulation",
    badgeColor: "var(--error)",
    badgeBg: "var(--error-container)",
    time: "45 MINS",
    title: "Connection Pool Exhaustion at 10,000 RPS",
    desc: "The primary checkout API is returning 503s under burst flash sale traffic. Trace connection leaks in pg-pool, adjust max active pools, and implement exponential backoff retry buffers.",
    tags: ["Node.js", "PostgreSQL", "k6 Load Gen"],
    levelIcon: "warning",
    levelLabel: "L5 Systems Architect",
    levelColor: "var(--error)",
    command: "$ pytest tests/test_concurrency_race.py -v --benchmark-enable",
    tests: [
      { name: "tests/test_concurrency_race.py::test_idempotency_parallel_threads", status: "PASSED [ 28%]", color: "#34d399" },
      { name: "tests/test_concurrency_race.py::test_connection_pool_under_limit", status: "PASSED [ 57%]", color: "#34d399" },
      { name: "tests/test_concurrency_race.py::test_failover_recovery_latency", status: "PASSED [ 85%]", color: "#38bdf8" },
      { name: "tests/test_concurrency_race.py::test_deadlock_prevention_timeout", status: "PASSED [100%]", color: "#34d399" },
    ],
    summary: "====== 4 passed, 0 failed in 1.48s | Memory Peak: 42.1 MB | SHA-256 Validated ======",
  },
  {
    id: "webhook",
    badge: "Financial Systems",
    badgeColor: "var(--on-primary-container)",
    badgeBg: "var(--primary-container)",
    time: "30 MINS",
    title: "Idempotent Stripe Webhook Ingestion Engine",
    desc: "Incoming events are duplicated during network retries, causing double-billing transactions. Build an atomic Redis mutex with deterministic idempotency keys and SQL transactions.",
    tags: ["TypeScript", "Redis Mutex", "ACID Checks"],
    levelIcon: "check_circle",
    levelLabel: "Intermediate Full-Stack",
    levelColor: "var(--primary)",
    command: "$ pytest tests/test_webhook_atomic.py -v --isolation-level=serializable",
    tests: [
      { name: "tests/test_webhook_atomic.py::test_redis_mutex_lock_lease_ttl", status: "PASSED [ 33%]", color: "#34d399" },
      { name: "tests/test_webhook_atomic.py::test_duplicate_signature_idempotency", status: "PASSED [ 66%]", color: "#34d399" },
      { name: "tests/test_webhook_atomic.py::test_dead_letter_replay_boundary", status: "PASSED [100%]", color: "#34d399" },
    ],
    summary: "====== 3 passed, 0 failed in 0.94s | Zero Double Ingestions | SHA-256 Validated ======",
  },
  {
    id: "rollback",
    badge: "Platform Engineering",
    badgeColor: "var(--tertiary)",
    badgeBg: "var(--tertiary-container)",
    time: "35 MINS",
    title: "Zero-Downtime Blue/Green Deployment Rollback",
    desc: "A bad schema migration in canary release cluster v2.4.1 triggers a spike in 500 error rates. Inspect NGINX upstream route configs, isolate the faulty pods, and execute instant hot-switch rollback.",
    tags: ["Docker OCI", "NGINX Upstream", "Prometheus"],
    levelIcon: "verified",
    levelLabel: "DevOps & Platform",
    levelColor: "var(--tertiary)",
    command: "$ ctl-runner verify-rollback --cluster=prod-us-east-1 --slo-budget=99.99",
    tests: [
      { name: "cluster_check::drain_unhealthy_canary_pods", status: "DRAINED [ 40%]", color: "#38bdf8" },
      { name: "traffic_switch::route_100_percent_to_stable_blue", status: "CONFIRMED [ 80%]", color: "#34d399" },
      { name: "slo_guard::http_5xx_error_rate_sub_zero_point_zero_one", status: "HEALTHY [100%]", color: "#34d399" },
    ],
    summary: "====== Rollback Executed in 184ms | Zero Dropped HTTP Connections ======",
  },
];

export default function SimulatorPreview({ onLaunchSandbox }) {
  const [activeIncidentId, setActiveIncidentId] = useState("pool");
  const incident = INCIDENTS.find((i) => i.id === activeIncidentId) || INCIDENTS[0];

  return (
    <section id="simulator-preview" style={{
      width: "100%",
      background: "var(--surface)",
      padding: "64px 0",
      borderBottom: "1px solid var(--outline-variant)",
    }}>
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
            <span className="eyebrow">Realistic Incident Response Workstation</span>
            <h2 style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "var(--on-surface)",
              marginTop: "4px",
            }}>
              Real Incidents. Production Codebases. No Toy Problems.
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "var(--on-surface-variant)",
            maxWidth: "460px",
            lineHeight: 1.6,
          }}>
            Triage live outage simulations, debug thread race conditions, and pass
            deterministic CI assertions inside an in-browser cloud workspace.
          </p>
        </div>

        {/* 2-Column: Incident Selector List + Interactive Terminal Window */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "24px",
        }} className="desktop-two-col">
          {/* Incident Selector List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {INCIDENTS.map((inc) => {
              const isSelected = inc.id === activeIncidentId;
              return (
                <div
                  key={inc.id}
                  onClick={() => setActiveIncidentId(inc.id)}
                  style={{
                    background: isSelected ? "var(--surface-subtle)" : "var(--surface)",
                    border: isSelected ? "2px solid var(--primary)" : "1px solid var(--outline-variant)",
                    borderRadius: "8px",
                    padding: "20px",
                    cursor: "pointer",
                    boxShadow: isSelected ? "var(--shadow-md)" : "var(--shadow-sm)",
                    transition: "all 0.15s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{
                      fontFamily: "var(--font-label)",
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: inc.badgeColor,
                      background: inc.badgeBg,
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}>
                      {inc.badge}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--outline)",
                    }}>
                      ⏱ {inc.time}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    color: "var(--on-surface)",
                  }}>
                    {inc.title}
                  </h3>

                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "var(--on-surface-variant)",
                    lineHeight: 1.6,
                  }}>
                    {inc.desc}
                  </p>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "6px",
                  }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {inc.tags.map((t) => (
                        <span key={t} style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          background: "var(--surface-container)",
                          color: "var(--on-surface-variant)",
                          padding: "2px 6px",
                          borderRadius: "3px",
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: inc.levelColor,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{inc.levelIcon}</span>
                      {inc.levelLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal Window Mockup */}
          <div className="terminal-window" style={{ display: "flex", flexDirection: "column" }}>
            {/* Topbar */}
            <div className="terminal-topbar">
              <div className="terminal-dots">
                <span className="terminal-dot" style={{ backgroundColor: "#ef4444" }} />
                <span className="terminal-dot" style={{ backgroundColor: "#f59e0b" }} />
                <span className="terminal-dot" style={{ backgroundColor: "#10b981" }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "#94a3b8",
                  marginLeft: "10px",
                }}>
                  judge0-worker-vm ~ {incident.title.slice(0, 32)}...
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#34d399",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                }}>
                  PASSED
                </span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body" style={{ flex: 1 }}>
              <div style={{ color: "#94a3b8", paddingBottom: "6px" }}>
                {incident.command}
              </div>
              <div style={{ color: "#475569", paddingBottom: "4px" }}>
                {"============================= test session starts =============================="}
              </div>

              {incident.tests.map((t, idx) => (
                <div key={idx} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  fontFamily: "var(--font-mono)",
                }}>
                  <span style={{ color: "#cbd5e1" }}>{t.name}</span>
                  <span style={{ color: t.color, fontWeight: 700 }}>{t.status}</span>
                </div>
              ))}

              <div style={{
                color: "#34d399",
                fontWeight: 700,
                marginTop: "12px",
                paddingTop: "8px",
                borderTop: "1px dashed rgba(148, 163, 184, 0.2)",
              }}>
                {incident.summary}
              </div>
            </div>

            {/* Terminal Bottom Controls */}
            <div style={{
              padding: "12px 20px",
              borderTop: "1px solid rgba(100, 116, 139, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#080d1a",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "#64748b" }}>
                Execution Time: 1.48s · Container: isolated-alpine-v3
              </span>
              <button
                type="button"
                onClick={onLaunchSandbox}
                style={{
                  background: "var(--primary)",
                  color: "#ffffff",
                  fontFamily: "var(--font-label)",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "none",
                }}
              >
                <span>RUN LIVE IN IDE</span>
                <span className="material-symbols-outlined" style={{ fontSize: 13 }}>play_arrow</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
