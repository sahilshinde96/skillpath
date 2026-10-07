"""
=============================================================================
SkillSprint Django Master Settings Configuration
=============================================================================
Configures:
 1. Core Django 5.x settings (Security, Installed Apps, Middleware pipeline)
 2. PostgreSQL database integration via dj-database-url (with SQLite local fallback)
 3. Django REST Framework & SimpleJWT token authentication
 4. WhiteNoise static file compression and caching for production
 5. Cross-Origin Resource Sharing (CORS) for Vercel SPA client communication
 6. Google OAuth2 Client ID integration
"""

from pathlib import Path
from datetime import timedelta
import os
import sys
import dj_database_url
from dotenv import load_dotenv

# Base Directory: Points to backend/
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from parent root or current directory .env
load_dotenv(BASE_DIR.parent / ".env")
load_dotenv(BASE_DIR / ".env")

# ── 1. Security & Environment ───────────────────────────────────────────────
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "django-insecure-skillpath-secret-key-change-in-prod-2026")
DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes")

# B8 FIX: Raise error if insecure defaults are used in production
if not DEBUG and SECRET_KEY.startswith("django-insecure"):
    raise RuntimeError(
        "DJANGO_SECRET_KEY env var must be set to a secure value in production (DEBUG=False). "
        "Generate one with: python -c \"from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())\""
    )

# Allowed HTTP Host headers (permits wildcard in staging, restricted in production)
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "*").split(",")

# ── 2. Installed Applications ───────────────────────────────────────────────
INSTALLED_APPS = [
    # Core Django apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    
    # Third-party extensions
    "rest_framework",              # REST API toolkit
    "rest_framework_simplejwt",    # JSON Web Token authentication
    "corsheaders",                 # Cross-Origin Resource Sharing headers
    
    # Local application domain apps
    "accounts",                    # User model, SimpleJWT, Google OAuth
    "plans",                       # User recommendations & 7-day checklist
    "roadmaps",                    # 6 skill roadmaps & milestone task progress
    "portfolio",                   # Case study generator & project briefs
]

# ── 3. Middleware Pipeline ──────────────────────────────────────────────────
# Note: CorsMiddleware MUST precede CommonMiddleware to attach headers to all responses.
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # High-performance static file serving
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "skillpath_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "skillpath_backend.wsgi.application"

# ── 4. Database Configuration (PostgreSQL / SQLite) ─────────────────────────
# In Production: Automatically parses DATABASE_URL provided by Render or Railway.
# In Development: Seamlessly defaults to local SQLite db.sqlite3 without configuration.
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    is_localhost = "localhost" in DATABASE_URL or "127.0.0.1" in DATABASE_URL
    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            ssl_require=not is_localhost,
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

# ── 5. Password Validation ──────────────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator", "OPTIONS": {"min_length": 8}},
]

# ── 6. Internationalization ─────────────────────────────────────────────────
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ── 7. Static Files & WhiteNoise Storage ────────────────────────────────────
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        # CompressedStaticFilesStorage provides gzip/brotli compression without manifest errors
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ── 8. Django REST Framework & SimpleJWT ────────────────────────────────────
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.AllowAny",
    ),
}

# Token Lifetimes: Access token valid for 2 hours, Refresh token valid for 7 days
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=2),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": False,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# ── 9. Cross-Origin Resource Sharing (CORS) ─────────────────────────────────
# B7 FIX: Restrict CORS to known origins in production.
# In development (DEBUG=True), allow all for convenience.
# In production, only allow the deployed frontend domain.
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOWED_ORIGINS = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ALLOWED_ORIGINS",
            "https://www.skillsprint.online,https://skillsprint.online"
        ).split(",")
        if origin.strip()
    ]
CORS_ALLOW_CREDENTIALS = True

# ── 10. Google OAuth2 Configuration ─────────────────────────────────────────
# Used in accounts.views.GoogleAuthView to verify the Google ID token's audience
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")

# ── 11. BlackSMS 2FA / OTP Configuration ────────────────────────────────────
# Infrastructure for mobile SMS OTP authentication via BlackSMS REST API (blacksms.in)
BLACKSMS_API_KEY = os.getenv("BLACKSMS_API_KEY", "")
BLACKSMS_API_URL = os.getenv("BLACKSMS_API_URL", "https://blacksms.in/api/v1/bulk-sms")
BLACKSMS_SENDER_ID = os.getenv("BLACKSMS_SENDER_ID", "")
BLACKSMS_DLT_TEMPLATE_ID = os.getenv("BLACKSMS_DLT_TEMPLATE_ID", "")
