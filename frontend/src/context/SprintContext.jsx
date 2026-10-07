import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { SPRINT_TRACKS } from "../data/sprintsData";

const SprintContext = createContext(null);

const MOCK_SQUAD = [
  { id: 1, name: "Riya Desai", avatar: "RD", streak: 14, online: true, score: 87, track: "Data Science" },
  { id: 2, name: "Arjun Mehta", avatar: "AM", streak: 9, online: true, score: 72, track: "Web Development" },
  { id: 3, name: "Sahil Khan", avatar: "SK", streak: 14, online: false, score: 91, track: "Web Development" },
  { id: 4, name: "Priya Nair", avatar: "PN", streak: 6, online: true, score: 65, track: "Data Science" },
];

const MOCK_GLOBAL_LEADERBOARD = [
  { rank: 1, name: "Tanmay Bhat", avatar: "TB", score: 99, streak: 42, track: "Data Science", change: 0 },
  { rank: 2, name: "Ananya Rao", avatar: "AR", score: 97, streak: 38, track: "Web Development", change: 1 },
  { rank: 3, name: "Dev Patel", avatar: "DP", score: 94, streak: 31, track: "Data Science", change: -1 },
  { rank: 4, name: "Sneha Gupta", avatar: "SG", score: 91, streak: 28, track: "Web Development", change: 2 },
  { rank: 5, name: "You (Learner)", avatar: "ME", score: 91, streak: 14, track: "Web Development", change: 0, isYou: true },
  { rank: 6, name: "Vikram Singh", avatar: "VS", score: 88, streak: 22, track: "Data Science", change: -2 },
  { rank: 7, name: "Meera Pillai", avatar: "MP", score: 85, streak: 19, track: "Web Development", change: 1 },
  { rank: 8, name: "Kunal Shah", avatar: "KS", score: 82, streak: 17, track: "Data Science", change: 0 },
];

function getNextMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime();
}

export function SprintProvider({ children }) {
  // Track & Day selection
  const [activeTrackId, setActiveTrackId] = useState(() => {
    return localStorage.getItem("skillsprint_active_track") || "data-science";
  });
  const [activeDay, setActiveDay] = useState(() => {
    const saved = localStorage.getItem("skillsprint_active_day");
    return saved ? parseInt(saved, 10) : 1;
  });

  const [streak, setStreak] = useState(14);
  const [careerScore, setCareerScore] = useState(91);
  const [squad] = useState(MOCK_SQUAD);
  const [globalLeaderboard] = useState(MOCK_GLOBAL_LEADERBOARD);
  const [freezeTokens, setFreezeTokens] = useState(2);
  const [xp, setXp] = useState(4820);
  const [timeUntilReset, setTimeUntilReset] = useState(0);

  // Persistent completed days per track: { "data-science": [1, 2, 3], "web-dev": [1, 2, 3, 4] }
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const stored = localStorage.getItem("skillsprint_completed_days");
      return stored ? JSON.parse(stored) : { "data-science": [1, 2, 3], "web-dev": [1, 2, 3, 4] };
    } catch {
      return { "data-science": [1, 2, 3], "web-dev": [1, 2, 3, 4] };
    }
  });

  // Persistent quiz scores: { "data-science-day-1": { score: 3, total: 3 } }
  const [quizScores, setQuizScores] = useState(() => {
    try {
      const stored = localStorage.getItem("skillsprint_quiz_scores");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Save active track & day
  useEffect(() => {
    localStorage.setItem("skillsprint_active_track", activeTrackId);
  }, [activeTrackId]);

  useEffect(() => {
    localStorage.setItem("skillsprint_active_day", String(activeDay));
  }, [activeDay]);

  useEffect(() => {
    localStorage.setItem("skillsprint_completed_days", JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem("skillsprint_quiz_scores", JSON.stringify(quizScores));
  }, [quizScores]);

  // Current track and day data
  const currentTrack = useMemo(() => {
    return SPRINT_TRACKS[activeTrackId] || SPRINT_TRACKS["data-science"];
  }, [activeTrackId]);

  const currentDayData = useMemo(() => {
    return currentTrack.days.find((d) => d.day === activeDay) || currentTrack.days[0];
  }, [currentTrack, activeDay]);

  // Format into mission object expected by LessonPlayer
  const currentMission = useMemo(() => {
    if (!currentDayData) return null;
    return {
      id: `${activeTrackId}-day-${currentDayData.day}`,
      day: currentDayData.day,
      totalDays: 14,
      title: currentDayData.title,
      skill: currentDayData.skill,
      track: currentTrack.shortTitle,
      trackId: activeTrackId,
      progressionStep: currentDayData.progressionStep,
      difficulty: currentDayData.day <= 4 ? "Beginner" : currentDayData.day <= 9 ? "Intermediate" : "Advanced",
      estimatedMins: 25,
      language: currentDayData.language,
      starterCode: currentDayData.starterCode,
      solutionCode: currentDayData.solutionCode,
      concept: currentDayData.concept,
      codingTask: currentDayData.codingTask,
      commonErrors: currentDayData.commonErrors,
      mentorQuestions: currentDayData.mentorQuestions,
      quizzes: currentDayData.quizzes || [],
      clientBrief: currentTrack.clientBrief,
    };
  }, [currentTrack, currentDayData, activeTrackId]);

  // Countdown to daily reset (midnight)
  useEffect(() => {
    const tick = () => {
      const remaining = getNextMidnight() - Date.now();
      setTimeUntilReset(remaining > 0 ? remaining : 0);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = useCallback((ms) => {
    const totalSecs = Math.floor(ms / 1000);
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return {
      hours: String(h).padStart(2, "0"),
      minutes: String(m).padStart(2, "0"),
      seconds: String(s).padStart(2, "0"),
    };
  }, []);

  const selectMission = useCallback((trackId, dayNum) => {
    if (SPRINT_TRACKS[trackId]) {
      setActiveTrackId(trackId);
    }
    setActiveDay(Math.max(1, Math.min(14, dayNum)));
  }, []);

  const completeMission = useCallback((trackId = activeTrackId, dayNum = activeDay) => {
    setCompletedDays((prev) => {
      const currentList = prev[trackId] || [];
      if (!currentList.includes(dayNum)) {
        return { ...prev, [trackId]: [...currentList, dayNum].sort((a, b) => a - b) };
      }
      return prev;
    });
    setStreak((s) => s + 1);
    setCareerScore((c) => Math.min(100, c + 2));
    setXp((x) => x + 150);
  }, [activeTrackId, activeDay]);

  const submitQuizScore = useCallback((trackId, dayNum, score, total) => {
    const key = `${trackId}-day-${dayNum}`;
    setQuizScores((prev) => ({
      ...prev,
      [key]: { score, total, timestamp: Date.now(), passed: score >= Math.ceil(total * 0.66) }
    }));
    setXp((x) => x + score * 50);
  }, []);

  const useFreezeToken = useCallback(() => {
    if (freezeTokens > 0) {
      setFreezeTokens((t) => t - 1);
      return true;
    }
    return false;
  }, [freezeTokens]);

  return (
    <SprintContext.Provider
      value={{
        activeTrackId,
        setActiveTrackId,
        activeDay,
        setActiveDay,
        currentTrack,
        currentDayData,
        currentMission,
        completedDays,
        quizScores,
        streak,
        careerScore,
        squad,
        globalLeaderboard,
        freezeTokens,
        xp,
        timeUntilReset,
        sprintTracks: SPRINT_TRACKS,
        formatCountdown,
        selectMission,
        completeMission,
        submitQuizScore,
        useFreezeToken,
        setStreak,
        setCareerScore,
      }}
    >
      {children}
    </SprintContext.Provider>
  );
}

export function useSprint() {
  const ctx = useContext(SprintContext);
  if (!ctx) throw new Error("useSprint must be used inside SprintProvider");
  return ctx;
}
