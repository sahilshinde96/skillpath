import React, { useState } from "react";
import {
  GitBranch, ExternalLink, Award, Download,
  CheckCircle2, Calendar, Code2, Star, Shield, Globe
} from "lucide-react";

const PORTFOLIO_DATA = {
  username: "sahilkhan",
  displayName: "Sahil Khan",
  headline: "Full-Stack Developer · Web Dev Sprint Alumni",
  bio: "Built 3 production-grade projects through SkillSprint's intensive sprint program. Focused on React, Node.js, and PostgreSQL.",
  careerScore: 91,
  streak: 14,
  sprintsCompleted: 2,
  githubUrl: "https://github.com/sahilkhan",
  projects: [
    {
      id: "p1",
      title: "JWT Authentication API",
      description: "A production-ready REST API with JWT-based authentication, refresh tokens, role-based access control, and automated test coverage.",
      tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
      githubUrl: "https://github.com/sahilkhan/jwt-auth-api",
      deployUrl: "https://jwt-api.vercel.app",
      completedDate: "Oct 5, 2026",
      certHash: "ss-2026-a4f3b1e9c2d7",
      track: "Web Dev Sprint",
      testsPassed: 12,
    },
    {
      id: "p2",
      title: "React Task Manager",
      description: "A Kanban-style task management app with drag-and-drop, real-time updates via WebSockets, and a PostgreSQL backend.",
      tags: ["React", "Node.js", "WebSockets", "PostgreSQL"],
      githubUrl: "https://github.com/sahilkhan/react-taskboard",
      deployUrl: "https://taskboard-demo.vercel.app",
      completedDate: "Sep 20, 2026",
      certHash: "ss-2026-b9e2c5f1a3d8",
      track: "Web Dev Sprint",
      testsPassed: 9,
    },
  ],
  certificates: [
    {
      id: "c1",
      title: "Web Dev Sprint — Module 1",
      issuedDate: "Sep 25, 2026",
      hash: "ss-2026-b9e2c5f1a3d8",
      track: "Web Development",
    },
  ],
};

// ── QR Placeholder ─────────────────────────────────────────────────────────────
function QRPlaceholder({ hash }) {
  // CSS-drawn QR-code-like pattern
  return (
    <div style={{
      width: "72px", height: "72px", display: "grid",
      gridTemplateColumns: "repeat(7,1fr)", gap: "1.5px",
      padding: "6px", background: "#fff", borderRadius: "6px",
      border: "1px solid var(--border)", flexShrink: 0
    }}>
      {Array.from({ length: 49 }).map((_, i) => {
        const corners = [0,1,2,6,7,13,14,21,35,42,43,48,47,46,41,40];
        const dark = corners.includes(i) || (Math.sin(i * 17.3 + hash.charCodeAt(i % hash.length)) > 0.2);
        return <div key={i} style={{ background: dark ? "#0f172a" : "transparent", borderRadius: "1px" }} />;
      })}
    </div>
  );
}

// ── Certificate Card ───────────────────────────────────────────────────────────
function CertificateCard({ cert }) {
  return (
    <div style={{
      border: "2px solid var(--primary)", borderRadius: "14px",
      padding: "24px", background: "linear-gradient(135deg, #f0fdf4, #fff)",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px",
        borderRadius: "50%", background: "rgba(5,150,105,0.06)"
      }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <Award size={18} color="var(--primary)" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.06em" }}>VERIFIED CERTIFICATE</span>
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "6px" }}>{cert.title}</h3>
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "14px", display: "flex", gap: "12px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={12} /> {cert.issuedDate}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Shield size={12} /> {cert.hash}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-sm" style={{ gap: "6px" }}>
              <Download size={13} /> Download PDF
            </button>
            <button className="btn btn-secondary btn-sm" style={{ gap: "6px" }}>
              <Globe size={13} /> Verify Online
            </button>
          </div>
        </div>
        <QRPlaceholder hash={cert.hash} />
      </div>
    </div>
  );
}

// ── Project Card ───────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  return (
    <div className="card" style={{ padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span className="badge badge-green" style={{ fontSize: "0.7rem" }}>{project.track}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckCircle2 size={11} color="var(--primary)" /> {project.testsPassed} tests passed
            </span>
          </div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "6px" }}>
            {project.title}
          </h3>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 12px", background: "#0f172a", borderRadius: "7px", color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>
            <GitBranch size={13} /> GitHub
          </a>
          <a href={project.deployUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 12px", background: "var(--primary)", borderRadius: "7px", color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>
            <ExternalLink size={13} /> Live Demo
          </a>
        </div>
      </div>
      <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "14px" }}>
        {project.description}
      </p>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
        {project.tags.map((t) => (
          <span key={t} className="badge" style={{ background: "#f8fafc", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "0.72rem" }}>
            <Code2 size={10} /> {t}
          </span>
        ))}
      </div>
      <div style={{ padding: "10px 14px", background: "var(--bg-subtle)", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
        <Shield size={12} color="var(--primary)" />
        <span>Cert hash: <code style={{ fontFamily: "monospace", color: "var(--text-primary)" }}>{project.certHash}</code></span>
        <span>· Completed {project.completedDate}</span>
      </div>
    </div>
  );
}

// ── Portfolio Page ─────────────────────────────────────────────────────────────
export default function Portfolio() {
  const p = PORTFOLIO_DATA;

  return (
    <div style={{ background: "var(--bg-canvas)", minHeight: "80vh", paddingBottom: "80px" }}>
      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "64px 0 0", borderBottom: "1px solid #334155"
      }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", paddingBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              {/* Avatar */}
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), #2563eb)",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "1.6rem", border: "3px solid #334155", flexShrink: 0
              }}>SK</div>
              <div>
                <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "4px" }}>
                  skillsprint.online/@{p.username}
                </div>
                <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>{p.displayName}</h1>
                <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: "12px" }}>{p.headline}</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0", fontSize: "0.82rem", fontWeight: 600 }}>
                    <GitBranch size={14} /> GitHub Profile
                  </a>
                </div>
              </div>
            </div>
            {/* Stats */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {[
                { label: "Career Score", value: p.careerScore, icon: Star, color: "#d97706" },
                { label: "Day Streak", value: p.streak, icon: null, emoji: "🔥", color: "#ea580c" },
                { label: "Sprints Done", value: p.sprintsCompleted, icon: Award, color: "var(--primary)" },
              ].map((s) => (
                <div key={s.label} style={{
                  textAlign: "center", padding: "16px 20px", background: "#1e293b",
                  border: "1px solid #334155", borderRadius: "12px", minWidth: "90px"
                }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                    {s.emoji || ""}{s.value}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "4px", fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ paddingTop: "40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "32px" }} className="portfolio-grid">

          {/* Projects */}
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Code2 size={18} color="var(--primary)" /> Projects
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 500 }}>({p.projects.length} verified)</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {p.projects.map((proj) => <ProjectCard key={proj.id} project={proj} />)}
            </div>
          </div>

          {/* Sidebar: Certs + Bio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "12px" }}>About</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{p.bio}</p>
            </div>

            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Award size={16} color="var(--primary)" /> Certificates
              </h2>
              {p.certificates.map((c) => <CertificateCard key={c.id} cert={c} />)}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
