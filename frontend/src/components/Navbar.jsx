import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import { LogOut, Menu, X, Search, Terminal, ExternalLink, Trophy, Users, Briefcase, LayoutDashboard, User } from "lucide-react";

export default function Navbar({ onOpenLegal, onOpenSearch, onNavigate }) {
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "SIMULATOR", page: "lesson" },
    { label: "DASHBOARD", page: "dashboard" },
    { label: "LEADERBOARD", page: "leaderboard" },
    { label: "STUDY SQUAD", page: "squad" },
    { label: "PORTFOLIO", page: "portfolio" },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (link.page) {
      onNavigate?.(link.page);
    } else {
      onNavigate?.("landing");
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ── Top System Ticker ── */}
      <div style={{
        background: "#0f172a",
        color: "#94a3b8",
        fontSize: "0.6875rem",
        fontFamily: "var(--font-mono)",
        borderBottom: "1px solid #1e293b",
        padding: "6px 0",
        position: "sticky",
        top: 0,
        zIndex: 101,
      }}>
        <div className="ss-container" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--tertiary)", fontWeight: 600 }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--tertiary)",
                display: "inline-block",
                animation: "ping 1.2s cubic-bezier(0,0,0.2,1) infinite",
              }} />
              KERNEL: DETERMINISTIC CLUSTER ACTIVE
            </span>
            <span style={{ color: "#334155" }}>/</span>
            <span className="hide-mobile" style={{ color: "#cbd5e1" }}>
              SANDBOX RUNNER: JUDGE-0-V4 PROD
            </span>
            <span className="hide-mobile" style={{ color: "#334155" }}>/</span>
            <span style={{ color: "#94a3b8" }}>SYS LOAD: 0.18</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="hide-mobile" style={{ color: "#94a3b8" }}>
              EVALUATION METRIC: SHA-256 VERIFIED
            </span>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "rgba(51, 102, 204, 0.15)",
              color: "#93c5fd",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "0.625rem",
              fontWeight: 600,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 13, color: "#60a5fa" }}>verified</span>
              1,842 AUDITS TODAY
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Header ── */}
      <header style={{
        position: "sticky",
        top: "33px",
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--outline-variant)",
        transition: "box-shadow 0.2s ease",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}>
        <div className="ss-container">
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}>
            {/* Brand Logo on Left-Hand Side */}
            <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate?.("landing"); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
                aria-label="SkillSprint Home"
              >
                <Logo iconSize={36} theme="light" />
              </a>

              {/* Desktop Nav Links */}
              <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ width: 1, height: 16, background: "var(--outline-variant)" }} />
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    style={{
                      fontFamily: "var(--font-label)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: link.active ? "var(--primary)" : "var(--on-surface-variant)",
                      padding: "8px 0",
                      position: "relative",
                      transition: "color 0.15s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"}
                    onMouseLeave={(e) => {
                      if (!link.active) e.currentTarget.style.color = "var(--on-surface-variant)";
                    }}
                  >
                    {link.label}
                    {link.active && (
                      <span style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        backgroundColor: "var(--primary)",
                      }} />
                    )}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Engine Status Badge */}
              <div className="status-online hide-mobile">
                <span className="status-dot" />
                <span>ENGINE: ONLINE</span>
              </div>

              {/* Search button */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "34px",
                  height: "34px",
                  borderRadius: "4px",
                  border: "1px solid var(--outline-variant)",
                  background: "var(--surface)",
                  color: "var(--on-surface-variant)",
                  cursor: "pointer",
                  transition: "border-color 0.15s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--outline-variant)"}
              >
                <Search size={15} />
              </button>

              {/* Launch Simulator CTA */}
              <button
                type="button"
                onClick={() => onNavigate?.("lesson")}
                className="btn-primary"
                style={{ fontSize: "0.6875rem" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 15 }}>terminal</span>
                <span>LAUNCH SIMULATOR</span>
              </button>

              {/* User Avatar & Dropdown Menu */}
              {isLoggedIn ? (
                <div ref={menuRef} style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary-container)",
                      color: "var(--primary)",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid var(--outline-variant)",
                      cursor: "pointer",
                    }}
                    title={user?.displayName || user?.username || user?.email}
                  >
                    {(user?.displayName?.[0] || user?.username?.[0] || "U").toUpperCase()}
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div style={{
                      position: "absolute",
                      right: 0,
                      top: "44px",
                      width: "220px",
                      background: "var(--surface)",
                      border: "1px solid var(--outline-variant)",
                      borderRadius: "8px",
                      boxShadow: "var(--shadow-lg)",
                      zIndex: 200,
                      padding: "8px 0",
                      display: "flex",
                      flexDirection: "column",
                    }}>
                      <div style={{
                        padding: "10px 16px",
                        borderBottom: "1px solid var(--outline-variant)",
                      }}>
                        <div style={{
                          fontFamily: "var(--font-headline)",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          color: "var(--on-surface)",
                        }}>
                          {user?.displayName || user?.username || "Learner"}
                        </div>
                        <div style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          color: "var(--outline)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                          {user?.email}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onNavigate?.("profile");
                          setUserMenuOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 16px",
                          fontSize: "0.8125rem",
                          color: "var(--on-surface)",
                          cursor: "pointer",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-subtle)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                      >
                        <User size={15} color="var(--primary)" />
                        <span>Profile & Settings</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onNavigate?.("dashboard");
                          setUserMenuOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 16px",
                          fontSize: "0.8125rem",
                          color: "var(--on-surface)",
                          cursor: "pointer",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-subtle)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                      >
                        <LayoutDashboard size={15} color="var(--primary)" />
                        <span>Dashboard</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onNavigate?.("leaderboard");
                          setUserMenuOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 16px",
                          fontSize: "0.8125rem",
                          color: "var(--on-surface)",
                          cursor: "pointer",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-subtle)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                      >
                        <Trophy size={15} color="var(--amber)" />
                        <span>Leaderboard</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onNavigate?.("squad");
                          setUserMenuOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 16px",
                          fontSize: "0.8125rem",
                          color: "var(--on-surface)",
                          cursor: "pointer",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-subtle)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                      >
                        <Users size={15} color="var(--tertiary)" />
                        <span>Study Squad</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onNavigate?.("portfolio");
                          setUserMenuOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 16px",
                          fontSize: "0.8125rem",
                          color: "var(--on-surface)",
                          cursor: "pointer",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-subtle)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                      >
                        <Briefcase size={15} color="var(--primary)" />
                        <span>Public Portfolio</span>
                      </button>

                      <div style={{ borderTop: "1px solid var(--outline-variant)", margin: "4px 0" }} />

                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 16px",
                          fontSize: "0.8125rem",
                          color: "var(--error)",
                          cursor: "pointer",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "var(--error-container)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                      >
                        <LogOut size={15} color="var(--error)" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    border: "1px solid var(--outline-variant)",
                    background: "var(--surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--outline)",
                    cursor: "pointer",
                  }}
                  title="Sign In"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person</span>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="show-mobile-only"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--on-surface)",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--outline-variant)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: link.active ? "var(--primary)" : "var(--on-surface)",
                  padding: "6px 0",
                }}
              >
                {link.label}
              </a>
            ))}

            <div style={{ paddingTop: "8px", borderTop: "1px solid var(--outline-variant)", display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                type="button"
                onClick={() => {
                  onNavigate?.(isLoggedIn ? "dashboard" : "landing");
                  setMobileMenuOpen(false);
                }}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 15 }}>terminal</span>
                LAUNCH SIMULATOR
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate?.("leaderboard");
                  setMobileMenuOpen(false);
                }}
                className="btn-outline"
                style={{ width: "100%", justifyContent: "center" }}
              >
                LEADERBOARD
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate?.("portfolio");
                  setMobileMenuOpen(false);
                }}
                className="btn-outline"
                style={{ width: "100%", justifyContent: "center" }}
              >
                PUBLIC PORTFOLIO
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
