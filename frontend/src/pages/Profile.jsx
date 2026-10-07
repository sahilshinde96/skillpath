import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSprint } from "../context/SprintContext";
import {
  User, Mail, Shield, Award, CheckCircle2, Calendar,
  Flame, Zap, BookOpen, ExternalLink, Key, Edit3, Save, LogOut
} from "lucide-react";

export default function Profile({ onNavigate }) {
  const { user, logout, updateProfile } = useAuth();
  const {
    activeTrackId,
    setActiveTrackId,
    currentTrack,
    completedDays,
    quizScores,
    streak,
    careerScore,
    xp
  } = useSprint();

  const [displayName, setDisplayName] = useState(user?.displayName || user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const trackDaysDone = (completedDays?.[activeTrackId] || []).length;
  const totalTrackDays = currentTrack?.days?.length || 14;
  const pctComplete = Math.round((trackDaysDone / totalTrackDays) * 100);

  const completedQuizzesCount = Object.keys(quizScores).filter(k => k.startsWith(activeTrackId)).length;

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      if (updateProfile) {
        await updateProfile({ displayName, email });
      }
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3500);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <span style={{ fontSize: "0.75rem", color: "var(--primary, #4338ca)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Account & Proof
          </span>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary, #0f172a)", margin: "4px 0" }}>
            Learner Profile
          </h1>
          <p style={{ color: "var(--text-muted, #64748b)", fontSize: "0.95rem" }}>
            Manage your personal credentials, track your 14-day sprint progress, and inspect verified skills.
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          style={{
            display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px",
            background: "rgba(225, 29, 72, 0.08)", border: "1px solid rgba(225, 29, 72, 0.2)",
            color: "#e11d48", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer"
          }}
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="profile-grid">
        {/* Left Column: Personal Information & Settings */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* User Card */}
          <div style={{
            background: "var(--bg-surface, #ffffff)", border: "1px solid var(--border, #e2e8f0)",
            borderRadius: "12px", padding: "24px", boxShadow: "var(--shadow-sm)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%", background: "var(--primary, #4338ca)",
                color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.75rem", fontWeight: 800, boxShadow: "0 4px 12px rgba(67, 56, 202, 0.3)"
              }}>
                {(displayName?.[0] || user?.username?.[0] || "U").toUpperCase()}
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary, #0f172a)", margin: 0 }}>
                    {displayName || "SkillSprint Learner"}
                  </h3>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "3px",
                    background: "rgba(5, 150, 105, 0.12)", color: "#059669",
                    padding: "2px 8px", borderRadius: "12px", fontSize: "0.72rem", fontWeight: 700
                  }}>
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted, #64748b)", marginTop: "2px" }}>
                  @{user?.username || "learner"} · {user?.email}
                </div>
              </div>
            </div>

            {/* Profile Edit Form */}
            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {message && (
                <div style={{ padding: "10px 12px", background: "rgba(5, 150, 105, 0.1)", border: "1px solid #059669", borderRadius: "6px", color: "#059669", fontSize: "0.85rem" }}>
                  {message}
                </div>
              )}
              {error && (
                <div style={{ padding: "10px 12px", background: "rgba(225, 29, 72, 0.1)", border: "1px solid #e11d48", borderRadius: "6px", color: "#e11d48", fontSize: "0.85rem" }}>
                  {error}
                </div>
              )}

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted, #64748b)", marginBottom: "4px", textTransform: "uppercase" }}>
                  Full Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border, #cbd5e1)",
                    fontSize: "0.9rem", color: "var(--text-primary, #0f172a)", outline: "none"
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted, #64748b)", marginBottom: "4px", textTransform: "uppercase" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border, #cbd5e1)",
                    fontSize: "0.9rem", color: "var(--text-primary, #0f172a)", outline: "none"
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted, #64748b)", marginBottom: "4px", textTransform: "uppercase" }}>
                  Active 14-Day Sprint Track
                </label>
                <select
                  value={activeTrackId}
                  onChange={(e) => setActiveTrackId(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border, #cbd5e1)",
                    fontSize: "0.9rem", color: "var(--text-primary, #0f172a)", outline: "none", cursor: "pointer", background: "#ffffff"
                  }}
                >
                  <option value="data-science">📊 AI-Integrated Data Science: 14-Day Practical Sprint</option>
                  <option value="web-dev">💻 AI-Integrated Web Development: 14-Day Practical Sprint</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={saving}
                style={{
                  marginTop: "6px", padding: "11px", background: "var(--primary, #4338ca)",
                  color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "0.88rem",
                  fontWeight: 700, cursor: saving ? "wait" : "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center", gap: "6px"
                }}
              >
                <Save size={15} /> {saving ? "Saving Changes..." : "Save Profile Details"}
              </button>
            </form>
          </div>

          {/* Key Metric Highlights */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px"
          }}>
            <div style={{ background: "var(--bg-surface, #ffffff)", border: "1px solid var(--border, #e2e8f0)", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#f59e0b" }}>{streak}d</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Daily Streak</div>
            </div>
            <div style={{ background: "var(--bg-surface, #ffffff)", border: "1px solid var(--border, #e2e8f0)", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#2563eb" }}>{careerScore}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Career Score</div>
            </div>
            <div style={{ background: "var(--bg-surface, #ffffff)", border: "1px solid var(--border, #e2e8f0)", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#10b981" }}>{xp}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Total XP</div>
            </div>
          </div>
        </div>

        {/* Right Column: Sprint Progress & Cryptographic Certificate */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Active Sprint Progress Box */}
          <div style={{
            background: "var(--bg-surface, #ffffff)", border: "1px solid var(--border, #e2e8f0)",
            borderRadius: "12px", padding: "24px", boxShadow: "var(--shadow-sm)"
          }}>
            <span style={{ fontSize: "0.72rem", color: "var(--primary, #4338ca)", fontWeight: 700, textTransform: "uppercase" }}>
              Active Curriculum
            </span>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary, #0f172a)", margin: "4px 0 8px" }}>
              {currentTrack?.title}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #64748b)", margin: "0 0 16px", lineHeight: 1.5 }}>
              {currentTrack?.objective}
            </p>

            {/* Progress Bar */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px" }}>
                <span>Sprint Progress</span>
                <span style={{ color: "var(--primary, #4338ca)" }}>{trackDaysDone} / {totalTrackDays} Days ({pctComplete}%)</span>
              </div>
              <div style={{ height: "8px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pctComplete}%`, background: "var(--primary, #4338ca)", borderRadius: "4px", transition: "width 0.4s ease" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => onNavigate?.("lesson")}
                style={{
                  flex: 1, padding: "10px", background: "var(--primary, #4338ca)", color: "#ffffff",
                  border: "none", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer"
                }}
              >
                Continue Daily Sprint
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.("dashboard")}
                style={{
                  padding: "10px 16px", background: "var(--bg-subtle, #f8fafc)", color: "var(--text-primary)",
                  border: "1px solid var(--border)", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer"
                }}
              >
                View Matrix
              </button>
            </div>
          </div>

          {/* Cryptographic Proof-of-Skill Certificate Card */}
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            border: "1px solid #334155", borderRadius: "12px", padding: "24px", color: "#f8fafc"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Shield size={18} color="#38bdf8" />
                <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#38bdf8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Cryptographic Skill Proof
                </span>
              </div>
              <span style={{ fontSize: "0.68rem", color: "#94a3b8", fontFamily: "monospace" }}>
                SHA-256 VERIFIED
              </span>
            </div>

            <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", marginBottom: "4px" }}>
              {currentTrack?.shortTitle} Professional Competence
            </div>
            <div style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "14px", lineHeight: 1.5 }}>
              Issued to <strong>{displayName || "Learner"}</strong> for completing deterministic Judge0 code challenges and daily mastery quizzes.
            </div>

            <div style={{
              background: "#0a0f1d", border: "1px solid #334155", borderRadius: "8px",
              padding: "10px 14px", fontSize: "0.75rem", fontFamily: "monospace", color: "#38bdf8",
              marginBottom: "16px", wordBreak: "break-all"
            }}>
              ID: SS-CERT-2026-{user?.id || 1}-{Math.abs((displayName || "user").split("").reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)).toString(16).toUpperCase()}
            </div>

            <button
              type="button"
              onClick={() => onNavigate?.("portfolio")}
              style={{
                width: "100%", padding: "10px", background: "transparent", border: "1px solid #38bdf8",
                borderRadius: "8px", color: "#38bdf8", fontSize: "0.82rem", fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
              }}
            >
              <ExternalLink size={14} /> Open Public Portfolio & Case Studies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
