from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    displayName = serializers.CharField(source="first_name", required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "displayName", "date_joined"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    displayName = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "displayName"]

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email is required.")
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value.lower()

    def create(self, validated_data):
        display_name = validated_data.pop("displayName", "")
        email = validated_data.get("email", "").lower()
        username = validated_data.get("username", "").strip()
        if not username:
            username = email

        user = User.objects.create_user(
            username=username,
            email=email,
            password=validated_data["password"],
            first_name=display_name
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Allow authentication via either username or email address (case-insensitive)
        login_input = attrs.get(self.username_field, "").strip()
        if login_input:
            user_by_email = User.objects.filter(email__iexact=login_input).first()
            if user_by_email:
                attrs[self.username_field] = user_by_email.username
            else:
                user_by_username = User.objects.filter(username__iexact=login_input).first()
                if user_by_username:
                    attrs[self.username_field] = user_by_username.username

        data = super().validate(attrs)
        data["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "displayName": self.user.first_name or self.user.username,
        }
        return data
