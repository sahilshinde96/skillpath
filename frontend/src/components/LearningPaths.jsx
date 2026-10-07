import React from "react";
import { ArrowRight, Clock, Users } from "lucide-react";

const TRACKS = [
  {
    name: "Web Development",
    description: "Build full-stack applications with React, Node.js, and PostgreSQL. You'll ship a production-ready project with authentication, REST APIs, and deployment.",
    duration: "3 sprints · 42 days",
    outcome: "Full-Stack Developer",
    topics: ["React 18", "Node.js", "REST APIs", "PostgreSQL", "Auth & Security", "Deployment"],
  },
  {
    name: "DSA & Algorithms",
    description: "Systematic preparation for software engineering interviews. Covers data structures, algorithmic patterns, and system design fundamentals.",
    duration: "4 sprints · 56 days",
    outcome: "Interview-ready Engineer",
    topics: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "System Design"],
  },
  {
    name: "Data Science",
    description: "Learn to analyze data, build models, and communicate findings. Work with real datasets using Python, pandas, and scikit-learn.",
    duration: "3 sprints · 42 days",
    outcome: "Data Analyst",
    topics: ["Python", "Pandas & NumPy", "Statistics", "Machine Learning", "SQL", "Visualization"],
  },
  {
    name: "AI/ML Engineering",
    description: "Go from neural network fundamentals to building and deploying ML systems. Covers deep learning, NLP, and production MLOps.",
    duration: "4 sprints · 56 days",
    outcome: "ML Engineer",
    topics: ["Neural Networks", "CNNs", "NLP", "LLM Fine-tuning", "RAG Systems", "MLOps"],
  },
];

export default function LearningPaths() {
  return (
    <section id="learning-paths" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Career tracks</span>
          <h2>Structured paths to real outcomes</h2>
          <p>
            Each track is a sequence of 14-day sprints designed by working engineers.
            Every sprint ends with a project you can show to employers.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }} className="tracks-grid">
          {TRACKS.map((track) => (
            <div key={track.name} className="card" style={{ padding: "28px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                  {track.name}
                </h3>
                <span className="badge badge-green" style={{ fontSize: "0.75rem" }}>
                  {track.outcome}
                </span>
              </div>

              <p style={{
                fontSize: "0.9375rem",
                color: "var(--text-muted)",
                lineHeight: 1.65,
                marginBottom: "16px",
              }}>
                {track.description}
              </p>

              {/* Topics */}
              <div style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}>
                {track.topics.map((t) => (
                  <span key={t} style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "var(--text-muted)",
                    padding: "3px 8px",
                    background: "var(--bg-subtle)",
                    borderRadius: "var(--radius-sm)",
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "16px",
                borderTop: "1px solid var(--border)",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={14} strokeWidth={1.5} />
                    {track.duration}
                  </span>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ gap: "4px", color: "var(--green)", fontWeight: 600 }}>
                  View track <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tracks-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
