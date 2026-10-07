import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const SprintContext = createContext(null);

// Mock data for the UI — replace with real API calls
const MOCK_SQUAD = [
  { id: 1, name: "Riya Desai", avatar: "RD", streak: 14, online: true, score: 87 },
  { id: 2, name: "Arjun Mehta", avatar: "AM", streak: 9, online: true, score: 72 },
  { id: 3, name: "Sahil Khan", avatar: "SK", streak: 14, online: false, score: 91 },
  { id: 4, name: "Priya Nair", avatar: "PN", streak: 6, online: true, score: 65 },
];

const MOCK_GLOBAL_LEADERBOARD = [
  { rank: 1, name: "Tanmay Bhat", avatar: "TB", score: 99, streak: 42, change: 0 },
  { rank: 2, name: "Ananya Rao", avatar: "AR", score: 97, streak: 38, change: 1 },
  { rank: 3, name: "Dev Patel", avatar: "DP", score: 94, streak: 31, change: -1 },
  { rank: 4, name: "Sneha Gupta", avatar: "SG", score: 91, streak: 28, change: 2 },
  { rank: 5, name: "Sahil Khan", avatar: "SK", score: 91, streak: 14, change: 0, isYou: true },
  { rank: 6, name: "Vikram Singh", avatar: "VS", score: 88, streak: 22, change: -2 },
  { rank: 7, name: "Meera Pillai", avatar: "MP", score: 85, streak: 19, change: 1 },
  { rank: 8, name: "Kunal Shah", avatar: "KS", score: 82, streak: 17, change: 0 },
];

const MOCK_MISSIONS = [
  {
    id: "m1",
    lessonId: "l1",
    title: "Build a REST API with JWT Auth",
    track: "Web Development",
    day: 8,
    totalDays: 14,
    difficulty: "Intermediate",
    estimatedMins: 25,
    language: "javascript",
    starterCode: `// Day 8: JWT Authentication Middleware
const jwt = require('jsonwebtoken');

// TODO: Implement the verifyToken middleware
// It should:
// 1. Extract the token from the Authorization header
// 2. Verify it using process.env.JWT_SECRET
// 3. Attach the decoded user to req.user
// 4. Call next() on success, return 401 on failure

function verifyToken(req, res, next) {
  // Your implementation here
}

module.exports = verifyToken;`,
    content: `## Day 8: JWT Authentication Middleware

### What you'll build today
A production-ready JWT verification middleware that protects API routes from unauthorized access.

### Why this matters
Every production backend you'll ever work on uses some form of token-based auth. Understanding how JWT verification works — at the middleware level — is non-negotiable for full-stack engineers.

### The Pattern
\`\`\`
Client → sends Bearer token → Middleware extracts & verifies → Route handler runs
\`\`\`

### Key Concepts
- **Authorization header format**: \`Bearer <token>\`
- **jwt.verify()**: throws if token is invalid or expired
- **Middleware chain**: calling \`next()\` passes control to the next handler

### Test Cases
Your implementation will be tested against:
1. Valid token → should call next() and set req.user
2. Missing token → should return 401 with message
3. Expired token → should return 401 with "Token expired"
4. Malformed token → should return 401 with "Invalid token"`,
  },
];

function getNextMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime();
}

export function SprintProvider({ children }) {
  const [streak, setStreak] = useState(14);
  const [careerScore, setCareerScore] = useState(91);
  const [squad, setSquad] = useState(MOCK_SQUAD);
  const [globalLeaderboard] = useState(MOCK_GLOBAL_LEADERBOARD);
  const [currentMission] = useState(MOCK_MISSIONS[0]);
  const [missionComplete, setMissionComplete] = useState(false);
  const [freezeTokens, setFreezeTokens] = useState(2);
  const [xp, setXp] = useState(4820);
  const [timeUntilReset, setTimeUntilReset] = useState(0);
  const [completedNodes, setCompletedNodes] = useState(
    new Set(["node-1", "node-2", "node-3", "node-4", "node-5", "node-6", "node-7"])
  );

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

  const completeMission = useCallback(() => {
    setMissionComplete(true);
    setStreak((s) => s + 1);
    setCareerScore((c) => Math.min(100, c + 2));
    setXp((x) => x + 150);
  }, []);

  const useFreezeToken = useCallback(() => {
    if (freezeTokens > 0) {
      setFreezeTokens((t) => t - 1);
      return true;
    }
    return false;
  }, [freezeTokens]);

  const unlockNode = useCallback((nodeId) => {
    setCompletedNodes((prev) => new Set([...prev, nodeId]));
  }, []);

  return (
    <SprintContext.Provider
      value={{
        streak,
        careerScore,
        squad,
        globalLeaderboard,
        currentMission,
        missionComplete,
        freezeTokens,
        xp,
        timeUntilReset,
        completedNodes,
        formatCountdown,
        completeMission,
        useFreezeToken,
        unlockNode,
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
