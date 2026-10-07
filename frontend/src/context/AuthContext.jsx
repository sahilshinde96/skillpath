/**
 * ============================================================================
 * SkillSprint Global Authentication Context & State Provider
 * ============================================================================
 * Manages user identity, session state, login/register flows, and modal controls.
 * Features:
 *  - Persistent sessions (verifies JWT token on browser load via /api/auth/me/)
 *  - Seamless state synchronization across components (Navbar, MyPlan, Roadmaps)
 *  - Unified handlers for standard email/password and Google OAuth2 authentication
 *  - Custom useAuth() hook for clean, easy consumption in UI components
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi, tokenStorage } from "../api/client";

// Create context for authentication state
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize user from cached localStorage if available (fast first render)
  const [user, setUser] = useState(() => tokenStorage.getUser());
  
  // Loading state indicates whether initial session verification is in flight
  const [isLoading, setIsLoading] = useState(true);
  
  // Global modal visibility and mode ("login" or "register")
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");

  // ── 1. Initial Session Verification on App Mount ──────────────────────────
  // Checks if an access token exists in localStorage, and verifies it with the backend.
  useEffect(() => {
    const initAuth = async () => {
      const token = tokenStorage.getAccessToken();
      if (token) {
        try {
          // Query backend profile endpoint
          const res = await authApi.getMe();
          setUser(res.data.user);
          tokenStorage.setTokens(null, null, res.data.user);
        } catch {
          // Token is expired or invalid -> clear storage and reset state
          tokenStorage.clear();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // ── 2. Standard Username/Password Login ────────────────────────────────────
  const login = async (username, password) => {
    const res = await authApi.login({ username, password });
    const { access, refresh, user: userData } = res.data;
    
    // Store tokens in browser storage and update React state
    tokenStorage.setTokens(access, refresh, userData);
    setUser(userData);
    setAuthModalOpen(false); // Close auth modal on success
    return userData;
  };

  // ── 3. Standard Account Registration ──────────────────────────────────────
  const register = async (username, email, password, displayName) => {
    const res = await authApi.register({ username, email, password, displayName });
    const { access, refresh, user: userData } = res.data;
    
    tokenStorage.setTokens(access, refresh, userData);
    setUser(userData);
    setAuthModalOpen(false);
    return userData;
  };

  // ── 4. Google OAuth2 Sign-In / Registration ───────────────────────────────
  // Receives the verified Google ID token (credential) from Google Identity Services,
  // forwards it to the Django backend for cryptographic verification, and stores tokens.
  const loginWithGoogle = async (credential, extraData = {}) => {
    const res = await authApi.googleLogin(credential, extraData);
    const { access, refresh, user: userData } = res.data;
    
    tokenStorage.setTokens(access, refresh, userData);
    setUser(userData);
    setAuthModalOpen(false);
    return userData;
  };

  // ── 5. User Logout ────────────────────────────────────────────────────────
  // Clears tokens from browser storage and resets state back to guest mode.
  const logout = () => {
    tokenStorage.clear();
    setUser(null);
  };

  // ── 6. Modal Open/Close Triggers ──────────────────────────────────────────
  const openAuthModal = (mode = "login") => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ── 7. Custom Hook for Consuming Auth State ─────────────────────────────────
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
