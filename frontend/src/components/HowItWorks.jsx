import React from "react";
import { BookOpen, Code2, Award } from "lucide-react";

const STEPS = [
  {
    icon: BookOpen,
    title: "Pick a career track",
    description: "Choose from Web Development, DSA, Data Science, or AI/ML. Each track is a structured sequence of 14-day sprints with clear learning outcomes.",
  },
  {
    icon: Code2,
    title: "Code every day",
    description: "Complete 20-minute daily missions in an in-browser IDE. Write real code, run it against automated tests, and get feedback from an AI mentor when you're stuck.",
  },
  {
    icon: Award,
    title: "Prove your skills",
    description: "At the end of each sprint, ship a real project. It gets published to your public portfolio with a verified certificate and a link to your GitHub repo.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">How it works</span>
          <h2>Three steps, no filler</h2>
          <p>
            SkillSprint replaces passive video courses with a daily practice loop
            that ends with real, verifiable output.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }} className="steps-grid">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
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
                  <Icon size={20} color="var(--green)" strokeWidth={1.5} />
                </div>

                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: "0.9375rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.65,
                }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
