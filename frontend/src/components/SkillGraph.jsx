import React, { useState } from "react";

const NODES_DATA = {
  consensus: {
    id: "consensus",
    name: "Raft Consensus",
    tag: "CRITICAL PREREQUISITE • GAP 38%",
    tagColor: "var(--error)",
    tagBg: "var(--error-container)",
    title: "Distributed Consensus & Raft",
    desc: "Your profile indicates strong relational querying, but lacks practical execution in distributed leader elections and log replication under partition splits.",
    deps: ["TCP Sockets", "RPC Layer", "Raft Engine"],
    depColors: ["var(--tertiary)", "var(--primary)", "var(--error)"],
    delta: "-44% vs Target",
    deltaColor: "var(--error)",
    time: "3 Sprints (2.5h)",
    status: "gap",
  },
  postgres: {
    id: "postgres",
    name: "PostgreSQL Plans",
    tag: "MASTERED NODE • 82%",
    tagColor: "var(--primary)",
    tagBg: "var(--primary-container)",
    title: "PostgreSQL Query Planning & Index Architecture",
    desc: "Mastery verified in indexing strategies, composite B-Trees, and analyzing EXPLAIN ANALYZE query buffers under heavy write loads.",
    deps: ["Schema Design", "B-Tree Index", "EXPLAIN Plans"],
    depColors: ["var(--tertiary)", "var(--tertiary)", "var(--primary)"],
    delta: "+12% vs Target",
    deltaColor: "var(--tertiary)",
    time: "Mastered",
    status: "mastered",
  },
  kafka: {
    id: "kafka",
    name: "Kafka Streams",
    tag: "IN PROGRESS • 54%",
    tagColor: "var(--outline)",
    tagBg: "var(--surface-container)",
    title: "Kafka Event Streaming & Consumer Groups",
    desc: "Partition balancing, dead-letter queues, and exactly-once processing semantics are currently under evaluation in Sprint 06.",
    deps: ["TCP Sockets", "Kafka Topics", "Consumer Groups"],
    depColors: ["var(--outline)", "var(--outline)", "var(--primary)"],
    delta: "-18% vs Target",
    deltaColor: "var(--on-surface-variant)",
    time: "2 Sprints (1.8h)",
    status: "progress",
  },
  rest: {
    id: "rest",
    name: "REST / GraphQL",
    tag: "MASTERED NODE • 98%",
    tagColor: "var(--tertiary)",
    tagBg: "var(--tertiary-container)",
    title: "REST & GraphQL API Architecture",
    desc: "Full mastery in schema design, n+1 resolver batching with DataLoader, and RFC-compliant HTTP caching headers.",
    deps: ["HTTP/2", "Schema Design", "DataLoader"],
    depColors: ["var(--tertiary)", "var(--tertiary)", "var(--tertiary)"],
    delta: "+28% vs Target",
    deltaColor: "var(--tertiary)",
    time: "Mastered",
    status: "mastered",
  },
  docker: {
    id: "docker",
    name: "Docker OCI",
    tag: "MASTERED NODE • 91%",
    tagColor: "var(--tertiary)",
    tagBg: "var(--tertiary-container)",
    title: "Docker OCI & Multi-Stage Containers",
    desc: "Proven minimal image compilation, layer caching optimization, and non-root execution hardening.",
    deps: ["Linux Namespaces", "OCI Runtime", "Compose"],
    depColors: ["var(--tertiary)", "var(--tertiary)", "var(--tertiary)"],
    delta: "+21% vs Target",
    deltaColor: "var(--tertiary)",
    time: "Mastered",
    status: "mastered",
  },
};

export default function SkillGraph() {
  const [activeNode, setActiveNode] = useState("consensus");
  const node = NODES_DATA[activeNode] || NODES_DATA.consensus;

  return (
    <section id="skill-graph" style={{
      width: "100%",
      padding: "64px 0",
      borderBottom: "1px solid var(--outline-variant)",
      background: "var(--surface-subtle)",
    }}>
      <div className="ss-container" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {/* Header */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "16px",
        }}>
          <div>
            <span className="eyebrow">Interactive Skill Dependency DAG</span>
            <h2 style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "var(--on-surface)",
              marginTop: "4px",
            }}>
              Live Competency Matrix & Directed Acyclic Graph
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "var(--on-surface-variant)",
            maxWidth: "460px",
            lineHeight: 1.6,
          }}>
            Click any dependency node to inspect required micro-benchmarks, delta to
            hiring bar, and prerequisite test suites.
          </p>
        </div>

        {/* Graph Visualizer + Details Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "24px",
        }} className="desktop-two-col">
          {/* Interactive Visual Graph Canvas */}
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--outline-variant)",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--outline-variant)",
              paddingBottom: "12px",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--outline)",
                textTransform: "uppercase",
              }}>
                Graph Topology: Active Target Cluster
              </span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--primary)",
                fontWeight: 600,
              }}>
                5 Nodes · 8 Assertions
              </span>
            </div>

            {/* Visual Node Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
              padding: "10px 0",
            }}>
              {Object.values(NODES_DATA).map((n) => {
                const isSelected = n.id === activeNode;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setActiveNode(n.id)}
                    style={{
                      background: isSelected
                        ? (n.status === "gap" ? "var(--error-container)" : "rgba(231, 235, 255, 0.5)")
                        : "var(--surface)",
                      border: isSelected
                        ? (n.status === "gap" ? "2px solid var(--error)" : "2px solid var(--primary)")
                        : "1px solid var(--outline-variant)",
                      borderRadius: "6px",
                      padding: "14px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      boxShadow: isSelected ? "var(--shadow-md)" : "var(--shadow-sm)",
                      transition: "all 0.15s ease",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        color: n.tagColor,
                      }}>
                        {n.status === "gap" ? "GAP ALERT" : n.status === "mastered" ? "VERIFIED" : "EVALUATING"}
                      </span>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: n.tagColor }}>
                        {n.status === "gap" ? "warning" : n.status === "mastered" ? "verified" : "sync"}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: "var(--font-headline)",
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "var(--on-surface)",
                    }}>
                      {n.name}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6875rem",
                      color: "var(--outline)",
                    }}>
                      Delta: {n.delta}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{
              borderTop: "1px solid var(--outline-variant)",
              paddingTop: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.6875rem",
              color: "var(--outline)",
              fontFamily: "var(--font-mono)",
            }}>
              <span>Green: Mastered | Red: Critical Delta | Blue: Active Sprints</span>
            </div>
          </div>

          {/* Node Inspector Card */}
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--outline-variant)",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: node.tagColor,
                background: node.tagBg,
                padding: "3px 10px",
                borderRadius: "4px",
              }}>
                {node.tag}
              </span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: node.deltaColor,
              }}>
                {node.delta}
              </span>
            </div>

            <div>
              <h3 style={{
                fontFamily: "var(--font-headline)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--on-surface)",
                marginBottom: "8px",
              }}>
                {node.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                color: "var(--on-surface-variant)",
                lineHeight: 1.65,
              }}>
                {node.desc}
              </p>
            </div>

            {/* Prerequisite Stack */}
            <div style={{
              background: "var(--surface-subtle)",
              border: "1px solid var(--outline-variant)",
              borderRadius: "6px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
              <span style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--outline)",
              }}>
                Dependency Chain & Verification Modules
              </span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {node.deps.map((dep, idx) => (
                  <span
                    key={dep}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: node.depColors[idx] || "var(--primary)",
                      background: "var(--surface)",
                      border: "1px solid var(--outline-variant)",
                      padding: "4px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </div>

            {/* Time / Execution Action */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "8px",
              borderTop: "1px solid var(--outline-variant)",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--on-surface-variant)",
              }}>
                Remediation: <strong>{node.time}</strong>
              </span>
              <a
                href="#simulator-preview"
                className="btn-primary"
                style={{ fontSize: "0.625rem", padding: "8px 14px" }}
              >
                <span>OPEN SANDBOX</span>
                <span className="material-symbols-outlined" style={{ fontSize: 13 }}>arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
