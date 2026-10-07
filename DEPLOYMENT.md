# SkillSprint Deployment Guide

## Architecture Overview

```
skillpath/
├── frontend/          ← React 18 + Vite (Deploy to Vercel)
├── backend/           ← Django 5.x + DRF (Deploy to Render)
├── .env.example       ← Environment variable reference
├── .gitignore
├── DEPLOYMENT.md      ← This file
└── README.md
```

---

## Backend Deployment (Django → Render)

### Step 1: Create a PostgreSQL Database on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **PostgreSQL**
3. Name: `skillsprint-db`
4. Click **Create Database**
5. Copy the **Internal Database URL** (starts with `postgresql://...`)

### Step 2: Create a Web Service on Render
1. Click **New** → **Web Service**
2. Connect your GitHub repo: `kalesahil5023/skillpath`
3. Configure these settings:

| Setting | Value |
|---|---|
| **Name** | `skillsprint-api` |
| **Root Directory** | `backend` |
| **Runtime** | `Python 3` |
| **Build Command** | `./build.sh` |
| **Start Command** | `gunicorn skillpath_backend.wsgi:application --bind 0.0.0.0:$PORT` |

### Step 3: Add Environment Variables
| Key | Value |
|---|---|
| `DATABASE_URL` | *(Paste your PostgreSQL Internal URL)* |
| `DJANGO_SECRET_KEY` | *(Any random 50-char string)* |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `*` |
| `GOOGLE_CLIENT_ID` | *(Your Google OAuth Client ID)* |
| `PYTHON_VERSION` | `3.13.0` |

### Step 4: Deploy
Click **Manual Deploy** → **Clear build cache & deploy**

---

## Frontend Deployment (React → Vercel)

### Step 1: Import Project on Vercel
1. Go to [Vercel](https://vercel.com/) and click **Add New Project**
2. Import your GitHub repo: `kalesahil5023/skillpath`

### Step 2: Configure Settings
| Setting | Value |
|---|---|
| **Framework Preset** | `Vite` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Step 3: Add Environment Variables
| Type | Key | Value |
|---|---|---|
| Config | `VITE_API_URL` | `https://skillsprint-api.onrender.com` |
| Config | `VITE_GOOGLE_CLIENT_ID` | *(Your Google OAuth Client ID)* |

### Step 4: Deploy
Click **Deploy**. Vercel auto-deploys on every push to `main`.

---

## Google OAuth Setup








