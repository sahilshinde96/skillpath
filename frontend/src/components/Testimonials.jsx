import React from "react";
import { Briefcase, FileCheck, Code2 } from "lucide-react";

const OUTCOMES = [
  {
    icon: Code2,
    title: "A real portfolio, not tutorial code",
    description: "Every sprint ends with a project built from a professional brief — not a follow-along clone. Your code runs, passes tests, and deploys. Employers see working software, not screenshots.",
  },
  {
    icon: FileCheck,
    title: "Verified certificates with proof",
    description: "Each certificate includes a unique verification hash and links to your actual codebase. Anyone can confirm what you built and that you built it yourself.",
  },
  {
    icon: Briefcase,
    title: "Career-ready skills, not just knowledge",
    description: "The daily mission format trains the working habits that matter: reading specs, writing tested code under time pressure, and iterating on feedback. These are the skills that survive the first week on the job.",
  },
];

export default function Outcomes() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What you walk away with</span>
          <h2>Outcomes, not promises</h2>
          <p>
            No inflated completion rates or vague success stories.
            Here's what you actually get after finishing a sprint.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }} className="outcomes-grid">
          {OUTCOMES.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ padding: "32px 28px" }} className="card">
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}>
                  <Icon size={20} color="var(--text-muted)" strokeWidth={1.5} />
                </div>

                <h3 style={{
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  marginBottom: "10px",
                  lineHeight: 1.35,
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: "0.9375rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.65,
                }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .outcomes-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
