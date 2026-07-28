"""
Logika inti penentuan alur berdasarkan rating.

Aturan:
1. Rating tahap 'initial' (di landing page):
   - >= threshold (default 4) -> arahkan ke Google Maps
   - < threshold               -> arahkan ke WhatsApp CS
2. Rating tahap 'followup' (setelah diskusi via WhatsApp):
   - wajib >= max(threshold, rating_initial_sebelumnya)
     Contoh: rating awal 5 -> followup wajib >= 5.
             rating awal 3 -> followup wajib >= 4 (threshold yang menentukan).
   - Jika belum memenuhi, minta customer mengisi ulang / lanjut diskusi,
     JANGAN diarahkan ke Google Maps.
"""

from ..config import settings


def min_allowed_followup(initial_stars: int) -> int:
    return max(initial_stars, settings.min_rating_threshold)


def decide_initial_action(stars: int) -> str:
    return "google_maps" if stars >= settings.min_rating_threshold else "whatsapp"


def decide_followup_action(stars: int, initial_stars: int) -> tuple[bool, int]:
    """Return (memenuhi_syarat, minimum_yang_dibutuhkan)."""
    minimum_required = min_allowed_followup(initial_stars)
    return stars >= minimum_required, minimum_required
