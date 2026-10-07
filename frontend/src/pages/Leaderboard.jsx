import React, { useState } from "react";
import { useSprint } from "../context/SprintContext";
import { Trophy, TrendingUp, TrendingDown, Minus, Flame, Zap, BarChart2, Users, Star } from "lucide-react";

const TABS = ["Global", "Squad", "Career Score"];

function RankChange({ change }) {
  if (change > 0) return (
    <span style={{ display: "flex", alignItems: "center", gap: "2px", color: "#059669", fontSize: "0.75rem", fontWeight: 700 }}>
      <TrendingUp size={11} />+{change}
    </span>
  );
  if (change < 0) return (
    <span style={{ display: "flex", alignItems: "center", gap: "2px", color: "#e11d48", fontSize: "0.75rem", fontWeight: 700 }}>
      <TrendingDown size={11} />{change}
    </span>
  );
  return <Minus size={11} color="#94a3b8" />;
}

const AVATAR_COLORS = ["#059669","#2563eb","#7c3aed","#d97706","#e11d48","#0891b2","#be185d","#65a30d"];

export default function Leaderboard({ standalone = true }) {
  const { globalLeaderboard, squad } = useSprint();
  const [tab, setTab] = useState("Global");

  const squadEntries = squad
    .map((m, i) => ({
      rank: i + 1, name: m.name, avatar: m.avatar,
      score: m.score, streak: m.streak, change: 0,
      isYou: m.name === "Sahil Khan"
    }))
    .sort((a, b) => b.score - a.score)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  const entries = tab === "Global" ? globalLeaderboard : tab === "Squad" ? squadEntries : globalLeaderboard;

  const wrapper = (
    <div style={{ background: "var(--bg-canvas)", minHeight: standalone ? "80vh" : "auto", padding: standalone ? "48px 0" : "0" }}>
      <div className={standalone ? "container" : ""} style={{ maxWidth: standalone ? "800px" : "100%" }}>
        {standalone && (
          <div className="section-header" style={{ textAlign: "left", marginBottom: "32px" }}>
            <div className="eyebrow">
              <Trophy size={13} />
              <span>RANKINGS</span>
            </div>
            <h2 style={{ fontSize: "2rem" }}>Sprint Leaderboard</h2>
            <p>Compete with your squad and the global SkillSprint community. Rankings update in real-time based on Career Score, streak, and daily mission completions.</p>
          </div>
        )}

        {/* Tabs */}
        <div className="tabs-container" style={{ marginBottom: "24px" }}>
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`tab-btn ${tab === t ? "active" : ""}`}>{t}</button>
          ))}
        </div>

        {/* Top 3 Podium */}
        {entries.length >= 3 && (
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
            {[entries[1], entries[0], entries[2]].map((e, pIdx) => {
              const heights = ["120px", "148px", "104px"];
              const medals = ["🥈","🥇","🥉"];
              const bgColors = ["#f1f5f9","linear-gradient(135deg,#fef3c7,#fffbeb)","#fef2f2"];
              const borderColors = ["#cbd5e1","#d97706","#fca5a5"];
              return (
                <div key={e.rank} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: "180px"
                }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "6px" }}>{medals[pIdx]}</div>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "50%",
                    background: AVATAR_COLORS[e.rank % AVATAR_COLORS.length],
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "0.9rem", marginBottom: "8px",
                    border: pIdx === 1 ? "3px solid #d97706" : "2px solid var(--border)",
                    boxShadow: pIdx === 1 ? "0 0 0 4px #fef3c7" : "none"
                  }}>{e.avatar}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px", textAlign: "center" }}>
                    {e.name} {e.isYou && "(you)"}
                  </div>
                  <div style={{
                    width: "100%", height: heights[pIdx], background: bgColors[pIdx],
                    border: `2px solid ${borderColors[pIdx]}`, borderRadius: "10px 10px 0 0",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", gap: "4px"
                  }}>
                    <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)" }}>{e.score}</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600 }}>SCORE</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Full Rankings Table */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "40px 1fr 80px 80px 60px 50px", gap: "8px", fontSize: "0.73rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.05em" }}>
            <span>#</span><span>PLAYER</span><span style={{ textAlign: "center" }}>SCORE</span>
            <span style={{ textAlign: "center" }}>STREAK</span><span style={{ textAlign: "center" }}>XP</span><span style={{ textAlign: "center" }}>ΔRANK</span>
          </div>
          {entries.map((e, i) => (
            <div key={i} style={{
              padding: "12px 20px", display: "grid",
              gridTemplateColumns: "40px 1fr 80px 80px 60px 50px", gap: "8px",
              alignItems: "center", background: e.isYou ? "#f0fdf4" : i % 2 === 0 ? "#fff" : "var(--bg-subtle)",
              borderBottom: "1px solid var(--border-subtle)", transition: "background 0.15s"
            }}>
              <span style={{ fontWeight: 800, fontSize: "0.9rem", color: i < 3 ? "#d97706" : "var(--text-muted)" }}>
                {i < 3 ? ["🥇","🥈","🥉"][i] : `#${e.rank}`}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: AVATAR_COLORS[e.rank % AVATAR_COLORS.length],
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.72rem", fontWeight: 700, flexShrink: 0
                }}>{e.avatar}</div>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {e.name} {e.isYou && <span style={{ color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700 }}>(you)</span>}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Web Dev Track</div>
                </div>
              </div>
              <div style={{ textAlign: "center", fontWeight: 800, fontSize: "0.95rem", color: "var(--text-primary)" }}>{e.score}</div>
              <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                <Flame size={13} fill="#ea580c" color="#ea580c" />
                <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#ea580c" }}>{e.streak}</span>
              </div>
              <div style={{ textAlign: "center", fontSize: "0.82rem", color: "#7c3aed", fontWeight: 600 }}>
                {((e.score * 52) + 480).toLocaleString()}
              </div>
              <div style={{ textAlign: "center" }}><RankChange change={e.change || 0} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return wrapper;
}
