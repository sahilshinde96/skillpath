/**
 * ============================================================================
 * SkillSprint API Client & Network Service Layer
 * ============================================================================
 * Handles all HTTP communication between the React frontend and Django backend.
 * Features:
 *  - Automatic JWT Bearer token injection in outgoing requests
 *  - Silent token refresh interceptor when 401 Unauthorized occurs
 *  - LocalStorage token persistence helper (access token, refresh token, user cache)
 *  - Dynamic Base URL resolving to Vercel environment or local dev proxy
 */

import axios from "axios";

// ── 1. Base URL Configuration ───────────────────────────────────────────────
// In production (Vercel): Uses VITE_API_URL pointing to the Render backend.
// In local development: Defaults to '/api' which Vite proxies to localhost:8000.
const API_BASE_URL = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, "") : "") + "/api";

// Create configured Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Storage keys for persisting session tokens in the user's browser
const TOKEN_KEY = "skillpath_access_token";
const REFRESH_KEY = "skillpath_refresh_token";
const USER_KEY = "skillpath_user_cache";

// ── 2. Token Storage Utility ────────────────────────────────────────────────
// Encapsulates localStorage read, write, and cleanup operations.
export const tokenStorage = {
  // Retrieve short-lived JWT access token (used in Authorization header)
  getAccessToken: () => localStorage.getItem(TOKEN_KEY),
  
  // Retrieve long-lived refresh token (used to get a new access token)
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
  
  // Retrieve cached user profile metadata (name, email, id)
  getUser: () => {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  
  // Save tokens and optional user object upon successful login/registration
  setTokens: (access, refresh, user) => {
    if (access) localStorage.setItem(TOKEN_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  
  // Clear all credentials upon logout or invalid token
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

// ── 3. Request Interceptor: Attach JWT Token ────────────────────────────────
// Automatically inspects every outgoing HTTP request and appends:
// "Authorization: Bearer <access_token>" if an access token exists.
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── 4. Response Interceptor: Silent Token Refresh ───────────────────────────
// If an API request fails with 401 Unauthorized (expired access token):
// 1. Intercepts the failure before it reaches the component.
// 2. Uses the long-lived refresh token to request a fresh access token from /auth/token/refresh/.
// 3. Updates stored tokens and retries the original failed request seamlessly.
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if error is 401 and hasn't already been retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login/") &&
      !originalRequest.url.includes("/auth/token/refresh/")
    ) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();
      
      if (refreshToken) {
        try {
          // Attempt to exchange refresh token for a new access token
          const res = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccess = res.data.access;
          tokenStorage.setTokens(newAccess, res.data.refresh || refreshToken);
          
          // Re-attach new token and replay the original request
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return apiClient(originalRequest);
        } catch {
          // Refresh token expired or revoked -> clear session to prompt re-login
          tokenStorage.clear();
        }
      }
    }
    return Promise.reject(error);
  }
);

// ── 5. Authentication API Endpoints ─────────────────────────────────────────
export const authApi = {
  // Register a new user with username, email, password, displayName
  register: (payload) => apiClient.post("/auth/register/", payload),
  
  // Authenticate user credentials and retrieve JWT tokens
  login: (payload) => apiClient.post("/auth/login/", payload),
  
  // Authenticate via Google OAuth2 ID token
  googleLogin: (credential, extra = {}) => apiClient.post("/auth/google/", { credential, ...extra }),
  
  // Fetch currently authenticated user profile
  getMe: () => apiClient.get("/auth/me/"),
};

// ── 6. User Plans API Endpoints ─────────────────────────────────────────────
export const plansApi = {
  // Fetch user's active personalized path & 7-day starter checklist
  getPlan: () => apiClient.get("/plans/"),
  
  // Save or replace active plan and checklist
  savePlan: (payload) => apiClient.post("/plans/", payload),
  
  // Toggle individual checklist day item (Day 1..7)
  toggleChecklist: (day, completed) => apiClient.patch(`/plans/checklist/${day}/`, { completed }),
  
  // Reset / delete current plan
  deletePlan: () => apiClient.delete("/plans/"),
};

// ── 7. Roadmap Progress API Endpoints ───────────────────────────────────────
export const roadmapsApi = {
  // Retrieve all completed roadmap task indices grouped by skill
  getProgress: () => apiClient.get("/roadmaps/progress/"),
  
  // Update or toggle task completion state for a skill discipline
  updateProgress: (skill, taskIndex, completed) =>
    apiClient.post("/roadmaps/progress/", { skill, taskIndex, completed }),
};

// ── 8. Portfolio & Projects API Endpoints ───────────────────────────────────
export const portfolioApi = {
  // List all portfolio case studies
  getEntries: () => apiClient.get("/portfolio/"),
  
  // Create a new portfolio case study
  createEntry: (payload) => apiClient.post("/portfolio/", payload),
  
  // Update an existing portfolio entry
  updateEntry: (id, payload) => apiClient.put(`/portfolio/${id}/`, payload),
  
  // Delete a portfolio entry
  deleteEntry: (id) => apiClient.delete(`/portfolio/${id}/`),
  
  // List saved practice project plans
  getProjects: () => apiClient.get("/portfolio/projects/"),
  
  // Save a practice project brief
  createProject: (payload) => apiClient.post("/portfolio/projects/", payload),
  
  // Delete a saved practice project plan
  deleteProject: (id) => apiClient.delete(`/portfolio/projects/${id}/`),
};

export default apiClient;
