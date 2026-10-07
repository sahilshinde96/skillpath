"""
=============================================================================
Accounts & Authentication API Views (Django REST Framework)
=============================================================================
Handles:
 1. Standard user registration with encrypted password storage
 2. Custom SimpleJWT login returning access/refresh tokens and user metadata
 3. Current user profile inspection (/api/auth/me/)
 4. Google OAuth2 ID token verification & automatic user provisioning
"""

import uuid
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from .serializers import RegisterSerializer, UserSerializer, CustomTokenObtainPairSerializer


# ── 1. Custom JWT Login View ────────────────────────────────────────────────
class CustomLoginView(TokenObtainPairView):
    """
    Endpoint: POST /api/auth/login/
    Accepts: { username, password }
    Returns: { access, refresh, user: { id, username, email, displayName } }
    Overridden to inject user profile details into the JWT response payload.
    """
    serializer_class = CustomTokenObtainPairSerializer


# ── 2. User Registration View ───────────────────────────────────────────────
class RegisterView(generics.CreateAPIView):
    """
    Endpoint: POST /api/auth/register/
    Accepts: { username, email, password, displayName }
    Creates a new Django User with hashed password and immediately generates
    SimpleJWT access and refresh tokens so the user is logged in upon sign-up.
    """
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        # Validate incoming data using RegisterSerializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate JWT tokens immediately upon registration
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "displayName": user.first_name or user.username,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "message": "User registered successfully."
        }, status=status.HTTP_201_CREATED)


# ── 3. Current User Profile View ────────────────────────────────────────────
class CurrentUserView(APIView):
    """
    Endpoint: GET /api/auth/me/
    Requires: Bearer JWT in Authorization header
    Returns: { user: { id, username, email, displayName, date_joined } }
    Used on app mount to verify token validity and fetch user profile.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({"user": serializer.data})

    def patch(self, request):
        """Update authenticated user's display name or email."""
        user = request.user
        display_name = request.data.get("displayName")
        if display_name is not None:
            user.first_name = display_name.strip()
        email = request.data.get("email")
        if email:
            email = email.lower().strip()
            if User.objects.filter(email__iexact=email).exclude(id=user.id).exists():
                return Response(
                    {"error": "This email address is already in use by another account."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            user.email = email
        user.save()
        serializer = UserSerializer(user)
        return Response({
            "user": serializer.data,
            "message": "Profile updated successfully."
        }, status=status.HTTP_200_OK)


# ── 4. Google OAuth 2.0 Verification View ───────────────────────────────────
class GoogleAuthView(APIView):
    """
    Endpoint: POST /api/auth/google/
    Accepts: { "credential": "<Google ID Token from Google Identity Services>" }
    Performs:
      1. Cryptographic token verification using Google's public certs (google-auth).
      2. Validates token audience against GOOGLE_CLIENT_ID if configured.
      3. Extracts verified email and user name.
      4. Gets or creates the corresponding user in PostgreSQL.
      5. Issues standard SimpleJWT access (2h) and refresh (7d) tokens.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        credential = request.data.get("credential")
        if not credential:
            return Response(
                {"error": "Google credential token is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # In development mode (DEBUG=True), allow simulated Google credentials for instant local testing
        if settings.DEBUG and (credential.startswith("mock_") or credential.startswith("dev_") or credential.startswith("demo_")):
            email = request.data.get("email") or "google.learner@skillsprint.online"
            name = request.data.get("name") or "Google Verified Learner"
            email = email.lower().strip()

            user = User.objects.filter(email__iexact=email).first()
            if not user:
                base_username = email.split("@")[0].replace(".", "_")[:20]
                unique_suffix = str(uuid.uuid4())[:6]
                username = f"{base_username}_{unique_suffix}"
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    first_name=name,
                )
                user.set_unusable_password()
                user.save()
            elif not user.first_name and name:
                user.first_name = name
                user.save()

            refresh = RefreshToken.for_user(user)
            return Response({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "displayName": user.first_name or user.username,
                },
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "message": "Google authentication successful."
            }, status=status.HTTP_200_OK)

        try:
            # Verify ID token using Google public certificates
            client_id = getattr(settings, "GOOGLE_CLIENT_ID", "") or None
            idinfo = id_token.verify_oauth2_token(
                credential,
                google_requests.Request(),
                audience=client_id,
            )

            email = idinfo.get("email")
            if not email:
                return Response(
                    {"error": "Google account did not provide an email address."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            email = email.lower().strip()
            name = idinfo.get("name", "")

            # Look up existing user by email or create new account
            user = User.objects.filter(email__iexact=email).first()
            if not user:
                # Generate a clean unique username
                base_username = email.split("@")[0].replace(".", "_")[:20]
                unique_suffix = str(uuid.uuid4())[:6]
                username = f"{base_username}_{unique_suffix}"

                user = User.objects.create_user(
                    username=username,
                    email=email,
                    first_name=name,
                )
                user.set_unusable_password()
                user.save()
            elif not user.first_name and name:
                user.first_name = name
                user.save()

            # Issue standard SimpleJWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "displayName": user.first_name or user.username,
                },
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "message": "Google authentication successful."
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            # Token signature invalid, expired, or audience mismatch
            return Response(
                {"error": f"Invalid Google token: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Google authentication failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
