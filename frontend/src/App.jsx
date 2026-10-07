import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { SprintProvider } from "./context/SprintContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureHub from "./components/FeatureHub";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import LegalModal from "./components/LegalModal";
import SearchModal from "./components/SearchModal";
import Dashboard from "./pages/Dashboard";
import LessonPlayer from "./pages/LessonPlayer";
import Leaderboard from "./pages/Leaderboard";
import SquadPage from "./pages/SquadPage";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";

/* ── Compact & Direct Landing Page ────────────────────────────────────────── */
function LandingPage({ onNavigate }) {
  return (
    <main>
      <Hero
        onLaunchSimulator={() => onNavigate("lesson")}
        onOpenDashboard={() => onNavigate("dashboard")}
      />
      <FeatureHub onNavigate={onNavigate} />
    </main>
  );
}

/* ── App Shell ────────────────────────────────────────────────────────────── */
function AppShell() {
  const [page, setPage] = useState("landing");
  const [legalTopic, setLegalTopic] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Full-screen Lesson player
  if (page === "lesson") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar onNavigate={navigate} />
        <LessonPlayer
          onBack={() => navigate("dashboard")}
          onComplete={() => navigate("dashboard")}
        />
        <AuthModal />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar
        onOpenLegal={(t) => setLegalTopic(t)}
        onOpenSearch={() => setSearchOpen(true)}
        onNavigate={navigate}
      />

      <div style={{ flex: 1 }}>
        {page === "landing" && <LandingPage onNavigate={navigate} />}
        {page === "dashboard" && <Dashboard onStartMission={() => navigate("lesson")} />}
        {page === "leaderboard" && <Leaderboard standalone={true} />}
        {page === "squad" && <SquadPage />}
        {page === "portfolio" && <Portfolio />}
        {page === "profile" && <Profile onNavigate={navigate} />}
      </div>

      <Footer onOpenLegal={(t) => setLegalTopic(t)} />

      <AuthModal />
      <LegalModal
        topic={legalTopic}
        isOpen={!!legalTopic}
        onClose={() => setLegalTopic(null)}
      />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "skillsprint-dev-client-id.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <SprintProvider>
          <ToastProvider>
            <ErrorBoundary>
              <AppShell />
            </ErrorBoundary>
          </ToastProvider>
        </SprintProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
