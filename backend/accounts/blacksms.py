"""
=============================================================================
BlackSMS Communications Infrastructure API Integration
=============================================================================
Handles:
 1. Indian phone number sanitization and format normalization (E.164 / 10-digit)
 2. Dispatching 2FA verification passcodes via BlackSMS REST API
 3. DLT compliance (sender ID & template ID integration)
 4. Development fallback logging when live API keys are pending
"""

import os
import re
import logging
import requests
from django.conf import settings

logger = logging.getLogger(__name__)


def clean_phone_number(raw_phone: str) -> str:
    """
    Cleans and standardizes incoming mobile numbers.
    - Strips spaces, dashes, parentheses, plus signs.
    - If 12 digits starting with '91', strips '91' for domestic Indian routing
      or keeps standard 10-digit format.
    - If starts with '0', strips leading zero.
    """
    if not raw_phone:
        return ""
    digits = re.sub(r"\D", "", str(raw_phone))
    if digits.startswith("91") and len(digits) == 12:
        digits = digits[2:]
    elif digits.startswith("0") and len(digits) == 11:
        digits = digits[1:]
    return digits


def send_blacksms_otp(phone: str, otp_code: str) -> dict:
    """
    Dispatches a 6-digit OTP code to the recipient via BlackSMS API.
    
    API Contract (blacksms.in):
      Endpoint: https://blacksms.in/api/v1/bulk-sms
      Method: POST
      Headers:
        Authorization: Bearer <BLACKSMS_API_KEY>
        Content-Type: application/json
      Body:
        {
          "mobile": "9876543210",
          "message": "Your SkillSprint verification code is 123456. Valid for 5 minutes.",
          "dlt_template_id": "<DLT_TEMPLATE_ID>",  (optional)
          "sender": "<SENDER_ID>"                 (optional)
        }
    """
    clean_number = clean_phone_number(phone)
    if not clean_number or len(clean_number) < 10:
        return {
            "success": False,
            "error": "Invalid phone number. Please enter a valid 10-digit mobile number.",
        }

    api_key = getattr(settings, "BLACKSMS_API_KEY", "") or os.getenv("BLACKSMS_API_KEY", "")
    api_url = getattr(settings, "BLACKSMS_API_URL", "") or os.getenv(
        "BLACKSMS_API_URL", "https://blacksms.in/api/v1/bulk-sms"
    )
    sender_id = getattr(settings, "BLACKSMS_SENDER_ID", "") or os.getenv("BLACKSMS_SENDER_ID", "")
    template_id = getattr(settings, "BLACKSMS_DLT_TEMPLATE_ID", "") or os.getenv("BLACKSMS_DLT_TEMPLATE_ID", "")

    # Message copy compliant with standard transactional OTP templates
    message_text = f"Your SkillSprint login OTP is {otp_code}. Valid for 5 minutes. Do not share this code with anyone."

    # If no live BlackSMS API key is set, operate in developer simulation mode
    if not api_key or api_key == "YOUR_BLACKSMS_API_KEY":
        logger.info(
            f"[BlackSMS Dev Mode] Generated OTP for +91 {clean_number}: {otp_code} (Configure BLACKSMS_API_KEY for live delivery)"
        )
        return {
            "success": True,
            "mode": "development",
            "message": f"OTP generated in development mode for +91 {clean_number}.",
            "dev_otp": otp_code if settings.DEBUG else None,
        }

    # Live BlackSMS API dispatch
    headers = {
        "Authorization": f"Bearer {api_key.strip()}",
        "Content-Type": "application/json",
    }

    payload = {
        "mobile": clean_number,
        "message": message_text,
    }

    if template_id:
        payload["dlt_template_id"] = template_id.strip()
    if sender_id:
        payload["sender"] = sender_id.strip()

    try:
        response = requests.post(
            api_url.strip(),
            json=payload,
            headers=headers,
            timeout=8,
        )
        data = response.json() if response.headers.get("content-type", "").startswith("application/json") else {}

        if response.status_code in (200, 201, 202):
            logger.info(f"[BlackSMS Success] Sent OTP to {clean_number}. Response: {data}")
            return {
                "success": True,
                "mode": "live",
                "message": "OTP delivered successfully via BlackSMS.",
                "provider_response": data,
            }
        else:
            logger.error(f"[BlackSMS Error] Status {response.status_code}: {response.text}")
            return {
                "success": False,
                "error": data.get("message") or f"SMS Gateway returned HTTP {response.status_code}",
                "status_code": response.status_code,
            }

    except requests.exceptions.Timeout:
        logger.error(f"[BlackSMS Timeout] Connection to {api_url} timed out after 8s.")
        return {
            "success": False,
            "error": "SMS gateway timed out. Please try again shortly.",
        }
    except Exception as exc:
        logger.error(f"[BlackSMS Exception] Failed to send SMS: {exc}")
        return {
            "success": False,
            "error": f"Failed to send SMS through BlackSMS: {str(exc)}",
        }
