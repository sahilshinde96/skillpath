from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta

class UserProfile(models.Model):
    """
    Extends standard Django User with phone number and SMS auth metadata.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=20, unique=True, null=True, blank=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} ({self.phone or 'No phone'})"


class PhoneOTP(models.Model):
    """
    Tracks one-time verification passcodes sent via BlackSMS API.
    """
    phone = models.CharField(max_length=20, db_index=True)
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_verified = models.BooleanField(default=False)
    attempts = models.IntegerField(default=0)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Phone OTP"
        verbose_name_plural = "Phone OTPs"

    def is_valid(self):
        """Returns True if OTP is unverified, unexpired, and within attempt limits."""
        return (not self.is_verified) and (timezone.now() <= self.expires_at) and (self.attempts < 5)

    def __str__(self):
        return f"{self.phone} - {self.otp_code} (Verified: {self.is_verified})"
