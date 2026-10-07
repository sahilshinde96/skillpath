import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSprint } from "../context/SprintContext";
import {
  Send, Bot, User, X, Maximize2, Minimize2, ChevronLeft,
  Play, RotateCcw, CheckCircle2, AlertCircle, Lightbulb,
  Clock, Zap, Code2, BookOpen, MessageSquare, Loader2
} from "lucide-react";
import Editor from "@monaco-editor/react";

// ── Markdown Renderer (simple, no lib needed) ──────────────────────────────────
function MarkdownContent({ content }) {
  const parsed = content
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre class="code-block" data-lang="${lang}"><code>${code.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>`)
    .replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="md-h1">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code class="inline-code">$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p class="md-p">');

  return (
    <>
      <div className="md-content" dangerouslySetInnerHTML={{ __html: `<p class="md-p">${parsed}</p>` }} />
      <style>{`
        .md-content { font-family: var(--font-body); line-height: 1.7; color: var(--text-secondary); }
        .md-h1,.md-h2,.md-h3 { font-family: var(--font-heading); color: var(--text-primary); margin: 20px 0 10px; }
        .md-h1 { font-size: 1.5rem; font-weight: 800; }
        .md-h2 { font-size: 1.2rem; font-weight: 700; }
        .md-h3 { font-size: 1.05rem; font-weight: 700; }
        .md-p { margin-bottom: 14px; font-size: 0.93rem; }
        .code-block { background: #0f172a; color: #e2e8f0; border-radius: 8px; padding: 16px; margin: 14px 0; overflow-x: auto; font-family: 'Fira Code', monospace; font-size: 0.85rem; }
        .code-block::before { content: attr(data-lang); display: block; font-size: 0.7rem; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em; }
        .inline-code { background: #f1f5f9; color: #059669; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.88em; }
        li { margin: 5px 0 5px 18px; font-size: 0.93rem; }
      `}</style>
    </>
  );
}

// ── AI Mentor Chat ─────────────────────────────────────────────────────────────
const MENTOR_RESPONSES = [
  "Take a look at how you're extracting the token from the `Authorization` header. What format does the Bearer token scheme use — and how would you split that string to get just the token part?",
  "You're on the right track! Now think about what happens when `jwt.verify()` throws an error. What kinds of errors could it throw, and how should each be handled differently?",
  "Good instinct! Before calling `next()`, make sure you're actually attaching the decoded payload to the request object — which property should you use so the next middleware can access the user?",
  "Consider edge cases: what if the `Authorization` header is missing entirely? Your middleware should gracefully handle that before even trying to verify anything.",
  "Think about the HTTP status codes semantically. For a missing token versus an expired token — should they return the same status code and message, or different ones?",
];

function AIMentorPane({ userCode, currentError, isCollapsed, onToggle }) {
  const [messages, setMessages] = useState([
    {
      role: "mentor",
      content: "Hey! I'm your AI Mentor for this sprint. I won't give you the answer directly — instead, I'll ask guiding questions that help you think through the problem yourself. Ready to get unstuck?",
      ts: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseIdx, setResponseIdx] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input, ts: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate AI response with realistic delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
    const mentorMsg = {
      role: "mentor",
      content: MENTOR_RESPONSES[responseIdx % MENTOR_RESPONSES.length],
      ts: new Date(),
    };
    setResponseIdx((i) => i + 1);
    setMessages((m) => [...m, mentorMsg]);
    setLoading(false);
  }, [input, loading, responseIdx]);

  const requestHint = useCallback(async () => {
    if (loading) return;
    const hintMsg = {
      role: "user",
      content: `I'm stuck on my code. Here's what I have:\n\`\`\`js\n${userCode?.slice(0, 300) || "(empty)"}\n\`\`\`${currentError ? `\n\nError: ${currentError}` : ""}`,
      ts: new Date(),
    };
    setMessages((m) => [...m, hintMsg]);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    const mentorMsg = {
      role: "mentor",
      content: MENTOR_RESPONSES[responseIdx % MENTOR_RESPONSES.length],
      ts: new Date(),
    };
    setResponseIdx((i) => i + 1);
    setMessages((m) => [...m, mentorMsg]);
    setLoading(false);
  }, [loading, userCode, currentError, responseIdx]);

  if (isCollapsed) {
    return (
      <button onClick={onToggle} style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: "8px", width: "44px", height: "100%", background: "#f8fafc",
        border: "none", borderLeft: "1px solid var(--border)", cursor: "pointer",
        color: "var(--text-muted)", padding: "16px 0"
      }}>
        <Bot size={18} color="var(--primary)" />
        <span style={{ fontSize: "0.65rem", fontWeight: 700, writingMode: "vertical-rl", letterSpacing: "0.05em", color: "var(--text-muted)" }}>AI MENTOR</span>
      </button>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff" }}>
      {/* Header */}
      <div style={{
        padding: "12px 16px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ background: "var(--primary)", borderRadius: "7px", padding: "5px", display: "flex" }}>
            <Bot size={14} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>AI Mentor</div>
            <div style={{ fontSize: "0.68rem", color: "var(--primary)", fontWeight: 600 }}>● Online · Socratic mode</div>
          </div>
        </div>
        <button onClick={onToggle} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", padding: "4px" }}>
          <Minimize2 size={14} />
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "12px" }} className="hide-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
              background: msg.role === "mentor" ? "var(--primary)" : "#2563eb",
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {msg.role === "mentor" ? <Bot size={13} /> : <User size={13} />}
            </div>
            <div style={{
              maxWidth: "80%", padding: "10px 13px", borderRadius: msg.role === "user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
              background: msg.role === "mentor" ? "#f8fafc" : "#eff6ff",
              border: msg.role === "mentor" ? "1px solid var(--border)" : "1px solid #bfdbfe",
              fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.55
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={13} color="#fff" />
            </div>
            <div style={{ display: "flex", gap: "4px", padding: "10px 14px", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "4px 12px 12px 12px" }}>
              {[0,1,2].map((i) => (
                <div key={i} style={{
                  width: "6px", height: "6px", borderRadius: "50%", background: "var(--text-muted)",
                  animation: "dotBounce 1.2s infinite", animationDelay: `${i * 0.2}s`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Hint Button */}
      <div style={{ padding: "8px 14px", borderTop: "1px solid var(--border-subtle)" }}>
        <button onClick={requestHint} disabled={loading} className="btn btn-secondary" style={{ width: "100%", fontSize: "0.8rem", padding: "8px", gap: "6px" }}>
          <Lightbulb size={13} color="#d97706" />
          Request a Hint
        </button>
      </div>

      {/* Input */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid var(--border)", display: "flex", gap: "8px", flexShrink: 0 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder="Ask a question..."
          style={{
            flex: 1, padding: "9px 12px", border: "1px solid var(--border-medium)",
            borderRadius: "8px", fontSize: "0.84rem", fontFamily: "var(--font-body)",
            outline: "none", color: "var(--text-primary)", background: "#fff"
          }}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}
          style={{
            width: "36px", height: "36px", borderRadius: "8px", background: "var(--primary)",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0, opacity: loading || !input.trim() ? 0.5 : 1
          }}>
          <Send size={14} color="#fff" />
        </button>
      </div>

      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── Test Results Panel ─────────────────────────────────────────────────────────
function TestResults({ results, loading }) {
  if (!results && !loading) return null;
  return (
    <div style={{ borderTop: "1px solid var(--border)", background: "#0f172a", padding: "14px 16px", maxHeight: "200px", overflowY: "auto" }}>
      <div style={{ fontSize: "0.75rem", color: "#64748b", letterSpacing: "0.08em", marginBottom: "10px", fontWeight: 700 }}>
        {loading ? "RUNNING TESTS..." : "TEST RESULTS"}
      </div>
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "0.83rem" }}>
          <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
          Submitting to Judge0 sandbox...
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {results.tests.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem" }}>
              {t.passed ? <CheckCircle2 size={13} color="#059669" /> : <X size={13} color="#e11d48" />}
              <span style={{ color: t.passed ? "#6ee7b7" : "#fca5a5" }}>{t.name}</span>
              {t.error && <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>— {t.error}</span>}
            </div>
          ))}
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Main Lesson Player ─────────────────────────────────────────────────────────
export default function LessonPlayer({ onBack, onComplete }) {
  const { currentMission, completeMission } = useSprint();
  const [code, setCode] = useState(currentMission?.starterCode || "");
  const [runResults, setRunResults] = useState(null);
  const [runLoading, setRunLoading] = useState(false);
  const [currentError, setCurrentError] = useState("");
  const [mentorCollapsed, setMentorCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("lesson"); // lesson | content

  const MOCK_TEST_RESULTS_FAIL = {
    tests: [
      { name: "Valid token → calls next()", passed: false, error: "Expected next() to be called but wasn't" },
      { name: "Missing token → 401 response", passed: false, error: "TypeError: Cannot read property of undefined" },
      { name: "Expired token → 401 with message", passed: false, error: "Not yet implemented" },
      { name: "Malformed token → 401 response", passed: false, error: "Not yet implemented" },
    ],
  };

  const MOCK_TEST_RESULTS_PASS = {
    tests: [
      { name: "Valid token → calls next()", passed: true },
      { name: "Missing token → 401 response", passed: true },
      { name: "Expired token → 401 with message", passed: true },
      { name: "Malformed token → 401 response", passed: true },
    ],
  };

  const handleRun = async () => {
    setRunLoading(true);
    setRunResults(null);
    setCurrentError("");
    await new Promise((r) => setTimeout(r, 2200));
    // Simulate failing first time
    const hasImpl = code.includes("jwt.verify") && code.includes("req.user") && code.includes("next()");
    if (hasImpl) {
      setRunResults(MOCK_TEST_RESULTS_PASS);
      completeMission();
      onComplete?.();
    } else {
      const results = MOCK_TEST_RESULTS_FAIL;
      setRunResults(results);
      setCurrentError("TypeError: Cannot read property of undefined at line 12");
    }
    setRunLoading(false);
  };

  const handleReset = () => {
    setCode(currentMission?.starterCode || "");
    setRunResults(null);
    setCurrentError("");
  };

  const allPassed = runResults?.tests?.every((t) => t.passed);

  return (
    <div style={{ height: "calc(100vh - 72px)", display: "flex", flexDirection: "column", background: "#0f172a" }}>

      {/* Top Bar */}
      <div style={{
        height: "52px", background: "#1e293b", borderBottom: "1px solid #334155",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", flexShrink: 0
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button onClick={onBack} style={{
            display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none",
            color: "#94a3b8", cursor: "pointer", fontSize: "0.83rem", fontFamily: "var(--font-body)"
          }}>
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
          <div style={{ width: "1px", height: "20px", background: "#334155" }} />
          <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-heading)" }}>
            {currentMission?.title}
          </span>
          <span className="badge" style={{ background: "#2563eb22", color: "#60a5fa", border: "1px solid #3b82f644", fontSize: "0.7rem" }}>
            {currentMission?.track}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#94a3b8", fontSize: "0.8rem" }}>
            <Clock size={13} /> ~{currentMission?.estimatedMins} min
          </div>
          {allPassed && (
            <div style={{
              display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px",
              background: "#05966922", border: "1px solid #059669", borderRadius: "20px",
              color: "#6ee7b7", fontSize: "0.8rem", fontWeight: 700
            }}>
              <CheckCircle2 size={13} /> All Tests Passed
            </div>
          )}
        </div>
      </div>

      {/* Three-Pane Layout */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: `360px 1fr ${mentorCollapsed ? "44px" : "320px"}`, overflow: "hidden" }} className="lesson-grid">

        {/* PANE 1: Content */}
        <div style={{ borderRight: "1px solid #334155", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tab bar */}
          <div style={{ background: "#1e293b", borderBottom: "1px solid #334155", display: "flex", flexShrink: 0 }}>
            {[
              { id: "lesson", icon: BookOpen, label: "Lesson" },
            ].map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "10px 16px", background: "transparent", border: "none",
                  borderBottom: "2px solid transparent",
                  borderBottomColor: activeTab === id ? "var(--primary)" : "transparent",
                  color: activeTab === id ? "#e2e8f0" : "#64748b",
                  cursor: "pointer", fontSize: "0.82rem", fontWeight: 600,
                  fontFamily: "var(--font-heading)", transition: "all 0.15s"
                }}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", background: "#fff" }} className="hide-scrollbar">
            <MarkdownContent content={currentMission?.content || ""} />
          </div>
        </div>

        {/* PANE 2: Code Editor */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Editor toolbar */}
          <div style={{
            background: "#1e293b", borderBottom: "1px solid #334155",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "8px 14px", flexShrink: 0
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Code2 size={14} color="#94a3b8" />
              <span style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 600, fontFamily: "var(--font-heading)", letterSpacing: "0.04em" }}>
                CODE ARENA · {currentMission?.language?.toUpperCase()}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={handleReset}
                style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 12px", background: "#334155", border: "none", borderRadius: "6px", color: "#94a3b8", cursor: "pointer", fontSize: "0.78rem", fontFamily: "var(--font-heading)" }}>
                <RotateCcw size={12} /> Reset
              </button>
              <button onClick={handleRun} disabled={runLoading}
                style={{
                  display: "flex", alignItems: "center", gap: "6px", padding: "6px 16px",
                  background: allPassed ? "#059669" : "var(--primary)", border: "none",
                  borderRadius: "6px", color: "#fff", cursor: runLoading ? "not-allowed" : "pointer",
                  fontSize: "0.82rem", fontWeight: 700, fontFamily: "var(--font-heading)",
                  opacity: runLoading ? 0.7 : 1
                }}>
                {runLoading ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Play size={13} fill="currentColor" />}
                {runLoading ? "Running..." : allPassed ? "✓ Submitted" : "Submit Task"}
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <Editor
              height="100%"
              language={currentMission?.language || "javascript"}
              value={code}
              onChange={(v) => setCode(v || "")}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                lineNumbersMinChars: 3,
                wordWrap: "on",
              }}
            />
          </div>

          {/* Test Results */}
          <TestResults results={runResults} loading={runLoading} />
        </div>

        {/* PANE 3: AI Mentor */}
        <div style={{ borderLeft: "1px solid #334155", overflow: "hidden" }}>
          <AIMentorPane
            userCode={code}
            currentError={currentError}
            isCollapsed={mentorCollapsed}
            onToggle={() => setMentorCollapsed((c) => !c)}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .lesson-grid { grid-template-columns: 1fr !important; grid-template-rows: 40% 1fr; }
        }
      `}</style>
    </div>
  );
}
