import logging

from fastapi import APIRouter, Request, Response, Depends
from sqlalchemy.orm import Session as DBSession

from ..config import settings
from ..database import get_db
from ..services.whatsapp_bot import handle_incoming_whatsapp_message

logger = logging.getLogger("whatsapp_webhook")

router = APIRouter(prefix="/api/whatsapp", tags=["whatsapp"])


@router.get("/webhook")
def verify_webhook(request: Request):
    """
    Meta akan memanggil endpoint ini sekali waktu kamu setup webhook di dashboard,
    untuk memastikan server kamu benar-benar dikendalikan olehmu.
    """
    mode = request.query_params.get("hub.mode")
    token = request.query_params.get("hub.verify_token")
    challenge = request.query_params.get("hub.challenge")

    if mode == "subscribe" and token == settings.whatsapp_verify_token:
        return Response(content=challenge, media_type="text/plain")

    return Response(content="Verifikasi gagal", status_code=403)


@router.post("/webhook")
async def receive_webhook(payload: dict, db: DBSession = Depends(get_db)):
    """
    Menerima notifikasi pesan masuk dari Meta.
    Struktur payload mengikuti format resmi WhatsApp Cloud API webhook.
    """
    try:
        entry = payload.get("entry", [])[0]
        change = entry.get("changes", [])[0]
        value = change.get("value", {})
        messages = value.get("messages")

        if not messages:
            # Bisa jadi ini notifikasi status (delivered/read), bukan pesan baru — abaikan.
            return {"status": "ignored"}

        message = messages[0]
        from_number = message.get("from")
        message_text = message.get("text", {}).get("body", "")

        if from_number and message_text:
            handle_incoming_whatsapp_message(db, from_number, message_text)

    except (IndexError, KeyError) as e:
        logger.warning(f"Payload webhook tidak sesuai format yang diharapkan: {e}")

    return {"status": "ok"}