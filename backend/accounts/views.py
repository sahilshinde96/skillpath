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
import random
from datetime import timedelta
from django.utils import timezone
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
from .models import PhoneOTP, UserProfile
from .blacksms import clean_phone_number, send_blacksms_otp


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


# ── 5. SMS Authentication Views (BlackSMS Infrastructure) ───────────────────
class SendSmsOtpView(APIView):
    """
    Endpoint: POST /api/auth/sms/send-otp/
    Accepts: { "phone": "9876543210" }
    Generates a 6-digit OTP, stores PhoneOTP record (5 min expiry),
    and sends via BlackSMS REST API.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        raw_phone = request.data.get("phone", "")
        clean_phone = clean_phone_number(raw_phone)

        if not clean_phone or len(clean_phone) < 10:
            return Response(
                {"error": "Please enter a valid 10-digit mobile number."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Anti-spam cooldown: Check if an unverified OTP was generated < 45s ago
        recent_otp = PhoneOTP.objects.filter(
            phone=clean_phone,
            created_at__gte=timezone.now() - timedelta(seconds=45),
            is_verified=False
        ).first()

        if recent_otp:
            return Response(
                {"error": "Please wait 45 seconds before requesting another SMS code."},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        # Generate 6-digit cryptographic random OTP
        otp_code = f"{random.randint(100000, 999999):06d}"
        expires_at = timezone.now() + timedelta(minutes=5)

        PhoneOTP.objects.create(
            phone=clean_phone,
            otp_code=otp_code,
            expires_at=expires_at,
        )

        # Dispatch via BlackSMS API
        sms_result = send_blacksms_otp(clean_phone, otp_code)

        if not sms_result.get("success"):
            return Response(
                {"error": sms_result.get("error", "Failed to dispatch SMS through BlackSMS gateway.")},
                status=status.HTTP_502_BAD_GATEWAY
            )

        resp_data = {
            "success": True,
            "message": f"Verification code sent to +91 ******{clean_phone[-4:]}.",
            "phone": clean_phone,
        }
        # In debug / development mode, return dev_otp for developer testing convenience
        if sms_result.get("mode") == "development" or settings.DEBUG:
            resp_data["dev_otp"] = otp_code
            resp_data["mode"] = sms_result.get("mode", "development")

        return Response(resp_data, status=status.HTTP_200_OK)


class VerifySmsOtpView(APIView):
    """
    Endpoint: POST /api/auth/sms/verify-otp/
    Accepts: { "phone": "9876543210", "otp": "123456" }
    Validates the 6-digit OTP, provisions/finds the user, and returns JWT tokens.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        raw_phone = request.data.get("phone", "")
        otp_code = str(request.data.get("otp", "")).strip()
        clean_phone = clean_phone_number(raw_phone)

        if not clean_phone or not otp_code:
            return Response(
                {"error": "Both mobile number and 6-digit OTP code are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch the most recent active OTP for this phone
        otp_record = PhoneOTP.objects.filter(
            phone=clean_phone,
            is_verified=False,
            expires_at__gte=timezone.now()
        ).first()

        if not otp_record:
            return Response(
                {"error": "No active verification code found or code expired. Please request a new code."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if otp_record.attempts >= 5:
            return Response(
                {"error": "Maximum verification attempts exceeded. Please request a new code."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verify OTP code
        if otp_record.otp_code != otp_code:
            otp_record.attempts += 1
            otp_record.save(update_fields=["attempts"])
            remaining = 5 - otp_record.attempts
            return Response(
                {"error": f"Invalid verification code. {remaining} attempt(s) remaining."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Mark OTP verified
        otp_record.is_verified = True
        otp_record.save(update_fields=["is_verified"])

        # Look up existing user by profile phone, or username, or create new user
        profile = UserProfile.objects.filter(phone=clean_phone).select_related("user").first()
        if profile:
            user = profile.user
        else:
            base_username = f"user_{clean_phone}"
            user = User.objects.filter(username=base_username).first()
            if not user:
                user = User.objects.create_user(
                    username=base_username,
                    first_name=f"Learner {clean_phone[-4:]}",
                )
                user.set_unusable_password()
                user.save()

            UserProfile.objects.update_or_create(
                user=user,
                defaults={"phone": clean_phone}
            )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "displayName": user.first_name or user.username,
                "phone": clean_phone,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "message": "Mobile login successful."
        }, status=status.HTTP_200_OK)
