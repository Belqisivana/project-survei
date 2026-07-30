import re

from sqlalchemy.orm import Session as DBSession

from .. import crud, models
from .whatsapp_client import send_whatsapp_text

# Menangkap token UUID setelah kata "kode sesi:" dari pesan yang dikirim frontend
SESSION_TOKEN_PATTERN = re.compile(
    r"kode sesi:\s*([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})",
    re.IGNORECASE,
)


def extract_session_token(message_text: str) -> str | None:
    match = SESSION_TOKEN_PATTERN.search(message_text)
    return match.group(1) if match else None


def build_greeting_message(session: models.SurveySession, initial_rating: models.Rating | None) -> str:
    outlet_name = session.outlet.name
    city_name = session.outlet.city.name
    stars = initial_rating.stars if initial_rating else None
    comment = initial_rating.comment if initial_rating else None

    lines = [
        f"Halo! Terima kasih sudah menghubungi kami terkait pengalaman kamu di "
        f"{outlet_name} - {city_name}.",
        "Mohon maaf atas ketidaknyamanan yang kamu alami. 🙏",
    ]
    if comment:
        lines.append(f'Kami sudah baca catatan kamu: "{comment}"')
    lines.append(
        "Boleh ceritakan lebih detail apa yang membuat pengalaman kamu kurang memuaskan? "
        "Tim kami akan segera bantu carikan solusinya."
    )
    return "\n\n".join(lines)


def handle_incoming_whatsapp_message(db: DBSession, from_number: str, message_text: str) -> str | None:
    """
    Dipanggil dari webhook setiap ada pesan masuk.
    Return pesan yang dikirim balik (untuk logging/testing), atau None kalau tidak ada aksi diambil.
    """
    token = extract_session_token(message_text)
    if not token:
        return None  # bukan pesan dari alur web survei, biarkan CS manusia yang handle

    session = crud.get_session_by_token(db, token)
    if not session:
        return None

    if session.bot_greeted:
        return None  # sudah pernah disapa bot, jangan balas otomatis lagi (biar gak nabrak CS)

    ratings = crud.get_ratings_for_session(db, session.id)
    initial_rating = next((r for r in ratings if r.stage.value == "initial"), None)

    reply_text = build_greeting_message(session, initial_rating)
    send_whatsapp_text(from_number, reply_text)

    session.bot_greeted = True
    db.commit()

    return reply_text