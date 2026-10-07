import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Award, HelpCircle, RotateCcw, ArrowRight } from "lucide-react";
import { useSprint } from "../context/SprintContext";

export default function DailyQuiz({ mission, onComplete }) {
  const { quizScores, submitQuizScore } = useSprint();
  const quizKey = `${mission.trackId}-day-${mission.day}`;
  const existingScore = quizScores[quizKey];

  const questions = mission.quizzes || [];
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Reset selected answers when day changes
  useEffect(() => {
    setSelectedAnswers({});
    setSubmitted(false);
  }, [mission.id]);

  if (!questions.length) {
    return (
      <div style={{ padding: "24px", color: "#94a3b8", textAlign: "center" }}>
        <HelpCircle size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
        <p>No quiz questions available for this sprint day.</p>
      </div>
    );
  }

  const handleSelect = (qIdx, optIdx) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setSubmitted(true);
    submitQuizScore(mission.trackId, mission.day, score, questions.length);
    onComplete?.(score, questions.length);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;
  const currentScore = submitted ? calculateScore() : existingScore ? existingScore.score : null;

  return (
    <div style={{ padding: "18px", color: "#e2e8f0", overflowY: "auto", height: "100%" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #334155"
      }}>
        <div>
          <span style={{ fontSize: "0.72rem", color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Day {mission.day} Mastery Check
          </span>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f8fafc", margin: "2px 0 0" }}>
            Knowledge Verification Quiz
          </h3>
        </div>

        {existingScore && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(5, 150, 105, 0.15)", border: "1px solid #059669",
            padding: "4px 10px", borderRadius: "12px", fontSize: "0.78rem", color: "#6ee7b7", fontWeight: 700
          }}>
            <Award size={14} />
            Best: {existingScore.score}/{existingScore.total}
          </div>
        )}
      </div>

      {/* Score Banner when submitted */}
      {submitted && (
        <div style={{
          background: currentScore >= Math.ceil(questions.length * 0.66) ? "rgba(5, 150, 105, 0.18)" : "rgba(225, 29, 72, 0.18)",
          border: `1px solid ${currentScore >= Math.ceil(questions.length * 0.66) ? "#059669" : "#e11d48"}`,
          borderRadius: "8px", padding: "14px 16px", marginBottom: "20px", display: "flex",
          alignItems: "center", justifyContent: "space-between"
        }}>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f8fafc" }}>
              Quiz Result: {currentScore} of {questions.length} Correct ({Math.round((currentScore / questions.length) * 100)}%)
            </div>
            <div style={{ fontSize: "0.78rem", color: "#cbd5e1", marginTop: "2px" }}>
              {currentScore === questions.length
                ? "🌟 Perfect score! You have thoroughly mastered this day's principles."
                : currentScore >= 2
                ? "✓ Passed! Solid grasp of core concepts. Review explanations below."
                : "Keep practicing. Read the mentor notes and try again."}
            </div>
          </div>
          <button
            type="button"
            onClick={handleRetry}
            style={{
              display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px",
              background: "#334155", color: "#fff", border: "none", borderRadius: "6px",
              fontSize: "0.78rem", fontWeight: 600, cursor: "pointer"
            }}
          >
            <RotateCcw size={12} /> Retry
          </button>
        </div>
      )}

      {/* Questions List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {questions.map((qObj, qIdx) => {
          const selected = selectedAnswers[qIdx];
          const isCorrect = submitted && selected === qObj.answer;
          const isWrong = submitted && selected !== undefined && selected !== qObj.answer;

          return (
            <div
              key={qIdx}
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                padding: "16px",
                transition: "border-color 0.2s"
              }}
            >
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "12px", lineHeight: 1.5 }}>
                <span style={{ color: "#60a5fa", marginRight: "8px" }}>Q{qIdx + 1}.</span>
                {qObj.q}
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {qObj.options.map((opt, optIdx) => {
                  const isOptSelected = selected === optIdx;
                  let optBg = "#0f172a";
                  let optBorder = "#334155";
                  let optColor = "#cbd5e1";

                  if (submitted) {
                    if (optIdx === qObj.answer) {
                      optBg = "rgba(5, 150, 105, 0.2)";
                      optBorder = "#059669";
                      optColor = "#6ee7b7";
                    } else if (isOptSelected && !isCorrect) {
                      optBg = "rgba(225, 29, 72, 0.2)";
                      optBorder = "#e11d48";
                      optColor = "#fca5a5";
                    }
                  } else if (isOptSelected) {
                    optBg = "rgba(37, 99, 235, 0.2)";
                    optBorder = "#2563eb";
                    optColor = "#93c5fd";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 14px",
                        background: optBg,
                        border: `1px solid ${optBorder}`,
                        borderRadius: "6px",
                        color: optColor,
                        fontSize: "0.82rem",
                        textAlign: "left",
                        cursor: submitted ? "default" : "pointer",
                        transition: "all 0.15s ease",
                        fontFamily: "inherit",
                        lineHeight: 1.45,
                      }}
                    >
                      <span
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          border: `1px solid ${optBorder}`,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          flexShrink: 0,
                          background: isOptSelected ? optBorder : "transparent",
                          color: isOptSelected ? "#fff" : "#94a3b8"
                        }}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span style={{ flex: 1 }}>{opt}</span>
                      {submitted && optIdx === qObj.answer && (
                        <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                      )}
                      {submitted && isOptSelected && !isCorrect && (
                        <XCircle size={16} color="#e11d48" style={{ flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit */}
              {submitted && (
                <div style={{
                  marginTop: "12px",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  background: isCorrect ? "rgba(5, 150, 105, 0.1)" : "rgba(225, 29, 72, 0.1)",
                  border: `1px solid ${isCorrect ? "rgba(5, 150, 105, 0.3)" : "rgba(225, 29, 72, 0.3)"}`,
                  fontSize: "0.78rem",
                  color: isCorrect ? "#6ee7b7" : "#fca5a5",
                  lineHeight: 1.5,
                }}>
                  <strong>{isCorrect ? "✓ Correct!" : "Explanation:"}</strong> {qObj.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #334155" }}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered}
            style={{
              width: "100%",
              padding: "12px",
              background: allAnswered ? "var(--primary, #4338ca)" : "#334155",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              cursor: allAnswered ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: allAnswered ? "0 2px 8px rgba(67, 56, 202, 0.4)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            <span>{allAnswered ? "Submit Quiz & Verify Answers" : `Answer all questions (${Object.keys(selectedAnswers).length}/${questions.length})`}</span>
            {allAnswered && <ArrowRight size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
