import httpx

from ..config import settings


def send_whatsapp_text(to_number: str, message: str) -> dict:
    """
    Kirim pesan teks lewat WhatsApp Cloud API.
    to_number format: 62812xxxxxxx (tanpa tanda +)
    """
    url = (
        f"https://graph.facebook.com/{settings.whatsapp_api_version}"
        f"/{settings.whatsapp_phone_number_id}/messages"
    )
    headers = {
        "Authorization": f"Bearer {settings.whatsapp_access_token}",
        "Content-Type": "application/json",
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "text",
        "text": {"body": message},
    }

    response = httpx.post(url, json=payload, headers=headers, timeout=10)
    response.raise_for_status()
    return response.json()