import React, { useState } from "react";
import { useSprint } from "../context/SprintContext";
import {
  Users, Flame, Trophy, MessageSquare, Zap, Star,
  Send, Calendar, Target, CheckCircle2, Clock
} from "lucide-react";

const SQUAD_FEED = [
  { user: "Riya Desai", avatar: "RD", action: "completed", mission: "Binary Tree Traversal", time: "2 min ago", xp: 120 },
  { user: "Arjun Mehta", avatar: "AM", action: "joined streak", mission: "7-day milestone 🔥", time: "15 min ago", xp: 50 },
  { user: "Sahil Khan", avatar: "SK", action: "completed", mission: "JWT Auth Middleware", time: "1 hr ago", xp: 150 },
  { user: "Priya Nair", avatar: "PN", action: "requested hint", mission: "Async/Await Patterns", time: "2 hr ago", xp: 0 },
];

const CHALLENGES = [
  { title: "First to finish Day 9", reward: "50 bonus XP", deadline: "23:14:08", active: true },
  { title: "Highest score this week", reward: "Squad badge + 200 XP", deadline: "3d 12h", active: true },
  { title: "Full squad streak (7 days)", reward: "Exclusive Sprint badge", deadline: "5d", active: false },
];

const COLORS = ["#059669","#2563eb","#7c3aed","#d97706"];

export default function SquadPage() {
  const { squad, streak } = useSprint();
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { user: "Riya", avatar: "RD", msg: "Anyone get stuck on the JWT task?", time: "10:32" },
    { user: "Arjun", avatar: "AM", msg: "Yeah the token expiry edge case is tricky", time: "10:35" },
    { user: "Sahil", avatar: "SK", msg: "I just finished it — the AI mentor hint was super helpful!", time: "10:41", isYou: true },
  ]);

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    setChatHistory((h) => [...h, { user: "Sahil", avatar: "SK", msg: chatMsg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isYou: true }]);
    setChatMsg("");
  };

  const sortedSquad = [...squad].sort((a, b) => b.score - a.score);

  return (
    <div style={{ background: "var(--bg-canvas)", minHeight: "80vh", padding: "40px 0 60px" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div className="eyebrow" style={{ marginBottom: "10px" }}>
            <Users size={13} /> <span>SQUAD #247</span>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "8px" }}>
            The Night Owls 🦉
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Web Dev Sprint · 4 members · Squad streak: <strong style={{ color: "#ea580c" }}>6 days</strong>
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }} className="squad-grid">

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Members */}
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Users size={16} color="var(--primary)" /> Members
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {sortedSquad.map((m, i) => (
                  <div key={m.id} style={{
                    display: "grid", gridTemplateColumns: "auto 1fr auto auto",
                    alignItems: "center", gap: "12px",
                    padding: "12px 14px", borderRadius: "10px",
                    background: m.name === "Sahil Khan" ? "var(--primary-light)" : "var(--bg-subtle)",
                    border: m.name === "Sahil Khan" ? "1px solid var(--primary-border)" : "1px solid var(--border)",
                  }}>
                    <div style={{ position: "relative" }}>
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        background: COLORS[i % COLORS.length], color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700, fontSize: "0.82rem"
                      }}>{m.avatar}</div>
                      <div style={{
                        position: "absolute", bottom: 0, right: 0, width: "10px", height: "10px",
                        borderRadius: "50%", background: m.online ? "#059669" : "#94a3b8",
                        border: "2px solid #fff"
                      }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                        {m.name} {m.name === "Sahil Khan" && <span style={{ color: "var(--primary)", fontSize: "0.72rem" }}>(you)</span>}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {m.online ? "Online now" : "Last seen 2h ago"}
                      </div>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      background: "#fff7ed", border: "1px solid #fed7aa",
                      borderRadius: "16px", padding: "3px 9px"
                    }}>
                      <Flame size={11} fill="#ea580c" color="#ea580c" />
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ea580c" }}>{m.streak}</span>
                    </div>
                    <div style={{
                      fontWeight: 800, fontSize: "0.95rem",
                      color: i === 0 ? "#d97706" : "var(--text-primary)"
                    }}>
                      {i === 0 ? "🏆" : ""} {m.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Target size={16} color="#d97706" /> Active Challenges
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {CHALLENGES.map((c, i) => (
                  <div key={i} style={{
                    padding: "14px", borderRadius: "10px",
                    background: c.active ? "var(--bg-tint-amber)" : "var(--bg-subtle)",
                    border: c.active ? "1px solid #fde68a" : "1px solid var(--border)"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{c.title}</div>
                      {c.active && (
                        <div style={{ background: "#d97706", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "2px 7px", borderRadius: "10px", letterSpacing: "0.05em" }}>LIVE</div>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Zap size={11} color="#d97706" /> {c.reward}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={11} /> {c.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Activity Feed */}
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "16px" }}>Recent Activity</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {SQUAD_FEED.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
                      background: COLORS[i % COLORS.length], color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.72rem", fontWeight: 700
                    }}>{item.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                        <strong style={{ color: "var(--text-primary)" }}>{item.user}</strong>{" "}
                        <span style={{ color: "var(--text-muted)" }}>{item.action}</span>{" "}
                        <strong>{item.mission}</strong>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                        <span style={{ fontSize: "0.73rem", color: "var(--text-muted)" }}>{item.time}</span>
                        {item.xp > 0 && (
                          <span style={{ fontSize: "0.73rem", color: "#7c3aed", fontWeight: 700 }}>+{item.xp} XP</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Squad Chat */}
            <div className="card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column", height: "340px" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "8px" }}>
                <MessageSquare size={15} color="var(--primary)" />
                <h3 style={{ fontSize: "0.95rem", fontWeight: 800 }}>Squad Chat</h3>
                <span style={{ fontSize: "0.72rem", background: "#ecfdf5", color: "var(--primary)", padding: "2px 8px", borderRadius: "10px", fontWeight: 700, marginLeft: "auto" }}>3 online</span>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }} className="hide-scrollbar">
                {chatHistory.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", flexDirection: c.isYou ? "row-reverse" : "row" }}>
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                      background: c.isYou ? "var(--primary)" : "#2563eb", color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.6rem", fontWeight: 700
                    }}>{c.avatar}</div>
                    <div>
                      {!c.isYou && <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "2px" }}>{c.user}</div>}
                      <div style={{
                        padding: "8px 12px", borderRadius: c.isYou ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
                        background: c.isYou ? "var(--primary)" : "var(--bg-subtle)",
                        color: c.isYou ? "#fff" : "var(--text-secondary)",
                        fontSize: "0.83rem", maxWidth: "220px"
                      }}>{c.msg}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "2px", textAlign: c.isYou ? "right" : "left" }}>{c.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "10px 14px", borderTop: "1px solid var(--border)", display: "flex", gap: "8px" }}>
                <input
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChat()}
                  placeholder="Message your squad..."
                  style={{
                    flex: 1, padding: "8px 12px", border: "1px solid var(--border-medium)",
                    borderRadius: "8px", fontSize: "0.83rem", outline: "none",
                    fontFamily: "var(--font-body)", color: "var(--text-primary)"
                  }}
                />
                <button onClick={sendChat} style={{
                  width: "34px", height: "34px", borderRadius: "8px", background: "var(--primary)",
                  border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Send size={13} color="#fff" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .squad-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
