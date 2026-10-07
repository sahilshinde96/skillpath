import React, { useState, useEffect, useRef } from "react";
import { useSprint } from "../context/SprintContext";
import { useAuth } from "../context/AuthContext";
import {
  Flame, Trophy, Star, Clock, Target, ChevronRight, Users, Zap,
  TrendingUp, ArrowRight, CheckCircle2, Lock, Play, Award,
  BarChart2, Calendar, Shield, Gift
} from "lucide-react";

// ── Career Score Ring ──────────────────────────────────────────────────────────
function CareerScoreRing({ score }) {
  const circumference = 2 * Math.PI * 54;
  const filled = (score / 100) * circumference;
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(filled), 300);
    return () => clearTimeout(t);
  }, [filled]);

  const getColor = (s) => {
    if (s >= 80) return "#059669";
    if (s >= 60) return "#2563eb";
    if (s >= 40) return "#d97706";
    return "#e11d48";
  };

  return (
    <div style={{ position: "relative", width: "140px", height: "140px", flexShrink: 0 }}>
      <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r="54" fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="70" cy="70" r="54" fill="none"
          stroke={getColor(score)} strokeWidth="10"
          strokeDasharray={`${animated} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.06em", marginTop: "2px" }}>
          CAREER SCORE
        </span>
      </div>
    </div>
  );
}

// ── Countdown Timer ────────────────────────────────────────────────────────────
function CountdownTimer({ timeUntilReset, formatCountdown }) {
  const { hours, minutes, seconds } = formatCountdown(timeUntilReset);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {[hours, minutes, seconds].map((val, i) => (
        <React.Fragment key={i}>
          <div style={{
            background: "var(--bg-contrast)", color: "#fff", borderRadius: "8px",
            padding: "8px 12px", textAlign: "center", minWidth: "52px",
          }}>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, fontFamily: "var(--font-heading)", lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: "0.6rem", color: "#94a3b8", letterSpacing: "0.08em", marginTop: "2px" }}>
              {["HRS", "MIN", "SEC"][i]}
            </div>
          </div>
          {i < 2 && <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-muted)" }}>:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Squad Member Card ──────────────────────────────────────────────────────────
function SquadMember({ member }) {
  const colors = ["#059669", "#2563eb", "#7c3aed", "#d97706", "#e11d48"];
  const color = colors[member.id % colors.length];
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 14px", background: "var(--bg-subtle)", borderRadius: "10px",
      border: "1px solid var(--border)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ position: "relative" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%", background: color,
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.78rem", fontWeight: 700
          }}>{member.avatar}</div>
          <div style={{
            position: "absolute", bottom: "1px", right: "1px", width: "9px", height: "9px",
            borderRadius: "50%", background: member.online ? "#059669" : "#94a3b8",
            border: "2px solid #fff"
          }} />
        </div>
        <div>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{member.name}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Score: {member.score}</div>
        </div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: "4px",
        background: "#fff7ed", border: "1px solid #fed7aa",
        borderRadius: "20px", padding: "3px 10px"
      }}>
        <Flame size={12} fill="#ea580c" color="#ea580c" />
        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ea580c" }}>{member.streak}</span>
      </div>
    </div>
  );
}

// ── Skill Map Nodes ────────────────────────────────────────────────────────────
const SKILL_NODES = [
  { id: "node-1", label: "HTML & CSS Fundamentals", day: 1, x: 0, y: 0 },
  { id: "node-2", label: "JavaScript Basics", day: 2, x: 1, y: 0 },
  { id: "node-3", label: "DOM Manipulation", day: 3, x: 2, y: 0 },
  { id: "node-4", label: "Async JS & Fetch", day: 4, x: 3, y: 0 },
  { id: "node-5", label: "React Fundamentals", day: 5, x: 4, y: 0 },
  { id: "node-6", label: "State & Props", day: 6, x: 5, y: 0 },
  { id: "node-7", label: "REST APIs", day: 7, x: 6, y: 0 },
  { id: "node-8", label: "JWT Auth", day: 8, x: 7, y: 0, current: true },
  { id: "node-9", label: "Databases", day: 9, x: 8, y: 0, locked: true },
  { id: "node-10", label: "Deployment", day: 10, x: 9, y: 0, locked: true },
];

function SkillMapStrip({ completedNodes }) {
  return (
    <div style={{ overflowX: "auto", paddingBottom: "8px" }} className="hide-scrollbar">
      <div style={{ display: "flex", alignItems: "center", gap: "0", minWidth: "max-content", padding: "8px 4px" }}>
        {SKILL_NODES.map((node, i) => {
          const done = completedNodes.has(node.id);
          const current = node.current;
          const locked = node.locked;
          return (
            <React.Fragment key={node.id}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: done ? "var(--primary)" : current ? "#fff" : "#f1f5f9",
                  border: done ? "2px solid var(--primary)" : current ? "3px solid var(--primary)" : "2px solid #cbd5e1",
                  boxShadow: current ? "0 0 0 4px rgba(5,150,105,0.15)" : "none",
                  transition: "all 0.3s ease",
                  cursor: locked ? "not-allowed" : "pointer"
                }}>
                  {done ? <CheckCircle2 size={18} color="#fff" strokeWidth={2.5} /> :
                   locked ? <Lock size={14} color="#94a3b8" /> :
                   current ? <Play size={14} color="var(--primary)" fill="var(--primary)" /> :
                   <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b" }}>{node.day}</span>}
                </div>
                <div style={{
                  fontSize: "0.65rem", fontWeight: 600, color: done ? "var(--primary-text)" : current ? "var(--text-primary)" : "var(--text-muted)",
                  maxWidth: "64px", textAlign: "center", lineHeight: 1.2
                }}>{node.label}</div>
              </div>
              {i < SKILL_NODES.length - 1 && (
                <div style={{
                  width: "32px", height: "3px", flexShrink: 0, marginBottom: "22px",
                  background: done ? "var(--primary)" : "#e2e8f0",
                  borderRadius: "2px", transition: "background 0.3s ease"
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ── Confetti ───────────────────────────────────────────────────────────────────
function Confetti() {
  const colors = ["#059669","#2563eb","#7c3aed","#d97706","#e11d48","#06b6d4"];
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.8}s`,
    size: Math.random() * 8 + 6,
    duration: `${Math.random() * 1 + 1.5}s`,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {pieces.map((p) => (
        <div key={p.id} style={{
          position: "absolute", top: "-20px", left: p.left,
          width: `${p.size}px`, height: `${p.size}px`,
          background: p.color, borderRadius: "2px",
          animation: `confettiFall ${p.duration} ${p.delay} forwards ease-in`,
        }} />
      ))}
      <style>{`
        @keyframes confettiFall {
          to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function Dashboard({ onStartMission }) {
  const {
    streak, careerScore, squad, globalLeaderboard, currentMission,
    missionComplete, freezeTokens, xp, timeUntilReset, completedNodes, formatCountdown
  } = useSprint();
  const { user } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const [leaderTab, setLeaderTab] = useState("squad");

  useEffect(() => {
    if (missionComplete) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 3500);
      return () => clearTimeout(t);
    }
  }, [missionComplete]);

  const name = user?.displayName || user?.username || "Learner";
  const countdown = formatCountdown(timeUntilReset);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-canvas)", paddingBottom: "60px" }}>
      {showConfetti && <Confetti />}

      {/* Top Bar */}
      <div style={{
        background: "#fff", borderBottom: "1px solid var(--border)",
        padding: "16px 0", position: "sticky", top: "72px", zIndex: 50
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "2px" }}>
              Good morning, {name.split(" ")[0]} 👋
            </h1>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Web Dev Sprint · Day 8 of 14 · Streak resets in&nbsp;
              <strong style={{ color: "var(--text-primary)" }}>{countdown.hours}:{countdown.minutes}:{countdown.seconds}</strong>
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px",
              background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "20px"
            }}>
              <Flame size={16} fill="#ea580c" color="#ea580c" />
              <span style={{ fontWeight: 800, color: "#ea580c" }}>{streak}</span>
              <span style={{ fontSize: "0.8rem", color: "#c2410c" }}>day streak</span>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px",
              background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "20px"
            }}>
              <Zap size={14} color="#7c3aed" fill="#7c3aed" />
              <span style={{ fontWeight: 800, color: "#7c3aed" }}>{xp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "32px" }}>
        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "28px" }} className="dash-main-grid">

          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Today's Mission */}
            <div className="card" style={{ padding: "28px", background: "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)", border: "1px solid #a7f3d0" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <div style={{
                      background: "var(--primary)", color: "#fff", borderRadius: "6px",
                      padding: "3px 10px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em"
                    }}>TODAY'S MISSION</div>
                    <div className="badge badge-blue" style={{ fontSize: "0.72rem" }}>Day {currentMission.day}/{currentMission.totalDays}</div>
                  </div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "6px" }}>
                    {currentMission.title}
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "0.83rem", color: "var(--text-muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={13} /> ~{currentMission.estimatedMins} min
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Target size={13} /> {currentMission.difficulty}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Zap size={13} /> +150 XP
                    </span>
                  </div>
                </div>
                <CountdownTimer timeUntilReset={timeUntilReset} formatCountdown={formatCountdown} />
              </div>

              {missionComplete ? (
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px",
                  background: "#ecfdf5", border: "2px solid #059669", borderRadius: "10px"
                }}>
                  <CheckCircle2 size={22} color="#059669" />
                  <div>
                    <div style={{ fontWeight: 800, color: "#065f46", fontSize: "1rem" }}>Mission Complete! 🎉</div>
                    <div style={{ fontSize: "0.82rem", color: "#059669" }}>+150 XP · Streak extended · Career Score +2</div>
                  </div>
                </div>
              ) : (
                <button
                  id="start-mission-btn"
                  onClick={onStartMission}
                  className="btn btn-primary"
                  style={{ padding: "13px 28px", fontSize: "1rem", width: "100%", maxWidth: "280px" }}
                >
                  <Play size={18} fill="currentColor" />
                  <span>Launch Mission Workspace</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>

            {/* Career Readiness + Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }} className="stats-grid">
              <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <CareerScoreRing score={careerScore} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    {careerScore >= 80 ? "🔥 Employer Ready" : careerScore >= 60 ? "📈 On Track" : "🌱 Building Up"}
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <div style={{ background: "#fff7ed", borderRadius: "8px", padding: "8px" }}>
                    <Flame size={18} color="#ea580c" fill="#ea580c" />
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)" }}>Streak Stats</span>
                </div>
                <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ea580c", lineHeight: 1 }}>{streak}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>days in a row</div>
                <div style={{ marginTop: "12px", display: "flex", gap: "6px" }}>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} style={{
                      flex: 1, height: "6px", borderRadius: "3px",
                      background: i < (streak % 7 || 7) ? "#ea580c" : "#e2e8f0"
                    }} />
                  ))}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "6px" }}>This week</div>
                {freezeTokens > 0 && (
                  <div style={{
                    marginTop: "10px", padding: "6px 10px", background: "#f0f9ff",
                    border: "1px solid #bae6fd", borderRadius: "6px",
                    fontSize: "0.74rem", color: "#0284c7", fontWeight: 600,
                    display: "flex", alignItems: "center", gap: "4px"
                  }}>
                    <Shield size={11} /> {freezeTokens} Freeze Token{freezeTokens > 1 ? "s" : ""} available
                  </div>
                )}
              </div>

              <div className="card" style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <div style={{ background: "#f5f3ff", borderRadius: "8px", padding: "8px" }}>
                    <BarChart2 size={18} color="#7c3aed" />
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)" }}>XP Progress</span>
                </div>
                <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#7c3aed", lineHeight: 1 }}>
                  {(xp / 1000).toFixed(1)}k
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>total XP earned</div>
                <div style={{ marginTop: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                    <span>Level 9</span><span>Level 10</span>
                  </div>
                  <div style={{ background: "#e2e8f0", height: "6px", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: "82%", height: "100%", background: "linear-gradient(90deg,#7c3aed,#2563eb)", borderRadius: "3px" }} />
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "4px" }}>360 XP to next level</div>
                </div>
              </div>
            </div>

            {/* Skill Map */}
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "2px" }}>Web Dev Sprint — Skill Map</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Day 8 of 14 · 7 nodes completed</p>
                </div>
                <span className="badge badge-green">57% Complete</span>
              </div>
              <SkillMapStrip completedNodes={completedNodes} />
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Study Squad */}
            <div className="card" style={{ padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ background: "#eff6ff", borderRadius: "8px", padding: "7px" }}>
                    <Users size={16} color="#2563eb" />
                  </div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800 }}>Your Study Squad</h3>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700 }}>Squad #247</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
                {squad.map((m) => <SquadMember key={m.id} member={m} />)}
              </div>
              <div style={{
                padding: "10px 14px", background: "#ecfdf5", border: "1px solid #a7f3d0",
                borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px"
              }}>
                <Flame size={14} fill="#059669" color="#059669" />
                <span style={{ fontSize: "0.8rem", color: "#065f46", fontWeight: 600 }}>
                  Squad shared streak: <strong>6 days</strong>
                </span>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="card" style={{ padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <div style={{ background: "#fffbeb", borderRadius: "8px", padding: "7px" }}>
                  <Trophy size={16} color="#d97706" />
                </div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 800 }}>Leaderboard</h3>
              </div>
              <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
                {["squad","global"].map((t) => (
                  <button key={t} onClick={() => setLeaderTab(t)}
                    style={{
                      flex: 1, padding: "7px", borderRadius: "6px", border: "1px solid var(--border)",
                      background: leaderTab === t ? "var(--primary)" : "transparent",
                      color: leaderTab === t ? "#fff" : "var(--text-muted)",
                      fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
                      fontFamily: "var(--font-heading)", transition: "all 0.15s"
                    }}
                  >{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {(leaderTab === "squad" ? squad.map((m,i) => ({
                    rank: i+1, name: m.name, avatar: m.avatar,
                    score: m.score, streak: m.streak, change: 0,
                    isYou: m.name === "Sahil Khan"
                  })).sort((a,b)=>b.score-a.score)
                  : globalLeaderboard.slice(0,6)
                ).map((entry) => (
                  <div key={entry.rank || entry.name} style={{
                    display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px",
                    borderRadius: "8px", background: entry.isYou ? "#f0fdf4" : "transparent",
                    border: entry.isYou ? "1px solid #a7f3d0" : "1px solid transparent"
                  }}>
                    <span style={{
                      width: "22px", textAlign: "center", fontSize: "0.78rem",
                      fontWeight: 800, color: entry.rank <= 3 ? "#d97706" : "var(--text-muted)"
                    }}>
                      {entry.rank <= 3 ? ["🥇","🥈","🥉"][entry.rank-1] : `#${entry.rank}`}
                    </span>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: "var(--primary)", color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.65rem", fontWeight: 700, flexShrink: 0
                    }}>{entry.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {entry.name} {entry.isYou && <span style={{ color: "var(--primary)", fontSize: "0.7rem" }}>(you)</span>}
                      </div>
                    </div>
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--text-primary)", flexShrink: 0 }}>{entry.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Freeze tokens / Rewards */}
            <div className="card" style={{ padding: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Gift size={15} color="var(--text-muted)" />
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-secondary)" }}>Streak Insurance</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "12px", lineHeight: 1.5 }}>
                Missed a day? Use a Freeze Token to protect your streak. You have <strong style={{ color: "var(--primary)" }}>{freezeTokens} tokens</strong> available.
              </p>
              <button className="btn btn-secondary" style={{ width: "100%", fontSize: "0.85rem", padding: "9px" }}>
                <Shield size={14} /> Use Freeze Token
              </button>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .dash-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
