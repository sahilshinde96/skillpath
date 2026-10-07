from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    CustomLoginView,
    CurrentUserView,
    GoogleAuthView,
    SendSmsOtpView,
    VerifySmsOtpView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", CustomLoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", CurrentUserView.as_view(), name="current_user"),
    path("google/", GoogleAuthView.as_view(), name="google_auth"),
    path("sms/send-otp/", SendSmsOtpView.as_view(), name="sms_send_otp"),
    path("sms/verify-otp/", VerifySmsOtpView.as_view(), name="sms_verify_otp"),
]
