import React, { useState, useEffect } from "react";
import { useSprint } from "../context/SprintContext";
import { useAuth } from "../context/AuthContext";
import {
  Flame, Trophy, Star, Clock, Target, ChevronRight, Users, Zap,
  TrendingUp, ArrowRight, CheckCircle2, Lock, Play, Award,
  BarChart2, Calendar, Shield, Gift, HelpCircle, Briefcase, Database, Code
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
            background: "var(--bg-contrast, #0f172a)", color: "#fff", borderRadius: "8px",
            padding: "8px 12px", textAlign: "center", minWidth: "50px",
          }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, fontFamily: "var(--font-heading)", lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: "0.58rem", color: "#94a3b8", letterSpacing: "0.08em", marginTop: "2px" }}>
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
      padding: "10px 14px", background: "var(--bg-subtle, #f8fafc)", borderRadius: "10px",
      border: "1px solid var(--border, #e2e8f0)",
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
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{member.name}</div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{member.track || "Data Science"} · {member.streak}d streak</div>
        </div>
      </div>
      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary, #4338ca)" }}>
        {member.score}
      </div>
    </div>
  );
}

// ── 14-Day Dynamic Skill Map Strip ─────────────────────────────────────────────
function DynamicSkillMapStrip({ track, activeDay, completedDays, onSelectDay }) {
  const days = track?.days || [];
  return (
    <div style={{ overflowX: "auto", paddingBottom: "8px" }} className="hide-scrollbar">
      <div style={{ display: "flex", alignItems: "center", minWidth: "max-content", padding: "8px 4px" }}>
        {days.map((dayItem, i) => {
          const isDone = completedDays.includes(dayItem.day);
          const isCurrent = dayItem.day === activeDay;

          return (
            <React.Fragment key={dayItem.day}>
              <div
                onClick={() => onSelectDay(dayItem.day)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", cursor: "pointer" }}
                title={`Day ${dayItem.day}: ${dayItem.title}`}
              >
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isDone ? "var(--primary, #4338ca)" : isCurrent ? "#fff" : "#f1f5f9",
                  border: isDone ? "2px solid var(--primary, #4338ca)" : isCurrent ? "3px solid var(--primary, #4338ca)" : "2px solid #cbd5e1",
                  boxShadow: isCurrent ? "0 0 0 4px rgba(67, 56, 202, 0.18)" : "none",
                  transition: "all 0.2s ease",
                }}>
                  {isDone ? (
                    <CheckCircle2 size={18} color="#fff" strokeWidth={2.5} />
                  ) : isCurrent ? (
                    <Play size={13} color="var(--primary, #4338ca)" fill="var(--primary, #4338ca)" />
                  ) : (
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b" }}>{dayItem.day}</span>
                  )}
                </div>
                <div style={{
                  fontSize: "0.65rem", fontWeight: 600,
                  color: isDone ? "var(--primary, #4338ca)" : isCurrent ? "var(--text-primary)" : "var(--text-muted)",
                  maxWidth: "68px", textAlign: "center", lineHeight: 1.2
                }}>
                  {dayItem.progressionStep}
                </div>
              </div>

              {i < days.length - 1 && (
                <div style={{
                  width: "28px", height: "3px", flexShrink: 0, marginBottom: "20px",
                  background: isDone ? "var(--primary, #4338ca)" : "#e2e8f0",
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

// ── Main Dashboard Component ───────────────────────────────────────────────────
export default function Dashboard({ onStartMission }) {
  const {
    activeTrackId,
    setActiveTrackId,
    activeDay,
    setActiveDay,
    currentTrack,
    currentMission,
    completedDays,
    quizScores,
    streak,
    careerScore,
    squad,
    globalLeaderboard,
    xp,
    timeUntilReset,
    formatCountdown,
    selectMission,
    sprintTracks
  } = useSprint();

  const { user } = useAuth();
  const [leaderTab, setLeaderTab] = useState("squad");

  const name = user?.displayName || user?.username || "Learner";
  const countdown = formatCountdown(timeUntilReset);
  const trackCompletedList = completedDays?.[activeTrackId] || [];
  const isMissionDone = trackCompletedList.includes(activeDay);

  const trackList = Object.values(sprintTracks || {});

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-canvas, #f8fafc)", paddingBottom: "60px" }}>
      {/* Top Banner Bar */}
      <div style={{
        background: "#ffffff", borderBottom: "1px solid var(--border, #e2e8f0)",
        padding: "16px 0", position: "sticky", top: "72px", zIndex: 50
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "2px" }}>
              Welcome back, {name.split(" ")[0]} 👋
            </h1>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {currentTrack?.title} · Day {activeDay} of 14 · Reset in&nbsp;
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

      <div className="container" style={{ paddingTop: "28px" }}>
        {/* Track Switcher Tabs */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px",
          background: "#ffffff", padding: "6px", borderRadius: "10px", border: "1px solid var(--border)",
          width: "fit-content"
        }}>
          {trackList.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => selectMission(t.id, 1)}
              style={{
                display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px",
                borderRadius: "8px", border: "none", cursor: "pointer",
                background: activeTrackId === t.id ? "var(--primary, #4338ca)" : "transparent",
                color: activeTrackId === t.id ? "#ffffff" : "var(--text-muted)",
                fontWeight: activeTrackId === t.id ? 700 : 500, fontSize: "0.85rem",
                transition: "all 0.15s ease"
              }}
            >
              {t.id === "data-science" ? <Database size={15} /> : <Code size={15} />}
              <span>{t.title}</span>
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "28px" }} className="dash-main-grid">

          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Active Sprint Day Card */}
            <div className="card" style={{ padding: "28px", background: "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)", border: "1px solid #bfdbfe" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <div style={{
                      background: "var(--primary, #4338ca)", color: "#fff", borderRadius: "6px",
                      padding: "3px 10px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em"
                    }}>TODAY'S PRACTICAL SPRINT</div>
                    <div className="badge badge-blue" style={{ fontSize: "0.72rem" }}>Day {activeDay} of 14 · {currentMission?.progressionStep}</div>
                  </div>
                  <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "6px" }}>
                    {currentMission?.title}
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "0.83rem", color: "var(--text-muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={13} /> ~{currentMission?.estimatedMins} min
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Target size={13} /> {currentMission?.difficulty}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Zap size={13} /> +150 XP
                    </span>
                  </div>
                </div>
                <CountdownTimer timeUntilReset={timeUntilReset} formatCountdown={formatCountdown} />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <button
                  id="start-mission-btn"
                  onClick={onStartMission}
                  className="btn btn-primary"
                  style={{ padding: "12px 24px", fontSize: "0.95rem" }}
                >
                  <Play size={16} fill="currentColor" />
                  <span>Launch Sprint Workspace</span>
                  <ArrowRight size={15} />
                </button>

                {isMissionDone && (
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 12px",
                    background: "#ecfdf5", border: "1px solid #10b981", borderRadius: "20px",
                    color: "#059669", fontSize: "0.82rem", fontWeight: 700
                  }}>
                    <CheckCircle2 size={15} /> Day {activeDay} Completed
                  </span>
                )}
              </div>
            </div>

            {/* 14-Day Progressive Skill Map Strip */}
            <div className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                    14-Day Progressive Skill Unlock Map
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "2px 0 0" }}>
                    Click any milestone to inspect daily matrix tasks, starter code, and quizzes.
                  </p>
                </div>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary, #4338ca)" }}>
                  {trackCompletedList.length} / 14 Completed
                </span>
              </div>

              <DynamicSkillMapStrip
                track={currentTrack}
                activeDay={activeDay}
                completedDays={trackCompletedList}
                onSelectDay={(dayNum) => setActiveDay(dayNum)}
              />
            </div>

            {/* Complete 14-Day Daily Practical Matrix */}
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                    {currentTrack?.shortTitle} Curriculum Matrix
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "2px 0 0" }}>
                    «No passive learning days. Every day ends with a working code/data artifact.»
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {currentTrack?.days?.map((d) => {
                  const done = trackCompletedList.includes(d.day);
                  const isCurrent = d.day === activeDay;
                  const quizScore = quizScores[`${activeTrackId}-day-${d.day}`];

                  return (
                    <div
                      key={d.day}
                      onClick={() => {
                        setActiveDay(d.day);
                      }}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "12px 16px", borderRadius: "8px", border: isCurrent ? "2px solid var(--primary, #4338ca)" : "1px solid var(--border)",
                        background: isCurrent ? "rgba(67, 56, 202, 0.04)" : done ? "var(--bg-subtle, #f8fafc)" : "#ffffff",
                        cursor: "pointer", transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{
                          width: "28px", height: "28px", borderRadius: "50%",
                          background: done ? "var(--primary, #4338ca)" : isCurrent ? "#2563eb" : "#e2e8f0",
                          color: done || isCurrent ? "#ffffff" : "#64748b",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.75rem", fontWeight: 700
                        }}>
                          {done ? "✓" : d.day}
                        </span>

                        <div>
                          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
                            Day {d.day}: {d.title}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {d.skill} · <span style={{ color: "#2563eb", fontWeight: 600 }}>{d.progressionStep}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {quizScore && (
                          <span style={{
                            fontSize: "0.72rem", background: "rgba(5, 150, 105, 0.12)", color: "#059669",
                            padding: "3px 8px", borderRadius: "10px", fontWeight: 700
                          }}>
                            Quiz: {quizScore.score}/{quizScore.total}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDay(d.day);
                            onStartMission?.();
                          }}
                          style={{
                            padding: "6px 12px", background: isCurrent ? "var(--primary, #4338ca)" : "transparent",
                            color: isCurrent ? "#ffffff" : "var(--primary, #4338ca)",
                            border: "1px solid var(--primary, #4338ca)", borderRadius: "6px",
                            fontSize: "0.78rem", fontWeight: 700, cursor: "pointer"
                          }}
                        >
                          {done ? "Review" : "Launch"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Career Score Ring */}
            <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <CareerScoreRing score={careerScore} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  {careerScore >= 80 ? "🔥 Employer Ready (Top 10%)" : "📈 On Track"}
                </div>
              </div>
            </div>

            {/* Client Brief Banner */}
            <div className="card" style={{ padding: "20px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#f8fafc" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#38bdf8", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase" }}>
                <Briefcase size={14} /> Capstone Client Brief
              </div>
              <h4 style={{ fontSize: "1rem", color: "#ffffff", margin: "6px 0 4px" }}>
                {currentTrack?.clientBrief?.client}
              </h4>
              <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.5, margin: "0 0 12px" }}>
                {currentTrack?.clientBrief?.projectTitle}
              </p>
              <div style={{ fontSize: "0.75rem", color: "#cbd5e1", lineHeight: 1.45 }}>
                {currentTrack?.clientBrief?.background}
              </div>
            </div>

            {/* Squad & Global Leaderboard */}
            <div className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px", borderBottom: "1px solid var(--border)", paddingBottom: "10px" }}>
                <button
                  type="button"
                  onClick={() => setLeaderTab("squad")}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "0.85rem", fontWeight: leaderTab === "squad" ? 800 : 500,
                    color: leaderTab === "squad" ? "var(--primary, #4338ca)" : "var(--text-muted)"
                  }}
                >
                  Study Squad
                </button>
                <button
                  type="button"
                  onClick={() => setLeaderTab("global")}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "0.85rem", fontWeight: leaderTab === "global" ? 800 : 500,
                    color: leaderTab === "global" ? "var(--primary, #4338ca)" : "var(--text-muted)"
                  }}
                >
                  Global Top 10
                </button>
              </div>

              {leaderTab === "squad" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {squad.map((member) => (
                    <SquadMember key={member.id} member={member} />
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {globalLeaderboard.slice(0, 5).map((u) => (
                    <div key={u.rank} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", fontSize: "0.82rem" }}>
                      <span style={{ fontWeight: 700, color: u.rank <= 3 ? "#f59e0b" : "var(--text-muted)" }}>#{u.rank} {u.name}</span>
                      <span style={{ fontWeight: 800, color: "var(--primary)" }}>{u.score} pts</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
