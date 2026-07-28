from urllib.parse import quote

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session as DBSession

from .. import crud, schemas
from ..database import get_db
from ..services import rating_logic

router = APIRouter(prefix="/api/sessions", tags=["sessions"])


@router.post("", response_model=schemas.SessionResponse)
def create_session(payload: schemas.SessionCreateRequest, db: DBSession = Depends(get_db)):
    qr_code = crud.get_qr_code(db, payload.qr_code)
    if not qr_code:
        raise HTTPException(status_code=404, detail="QR code tidak ditemukan")

    session = crud.get_or_create_session(db, qr_code)
    return schemas.SessionResponse(
        token=session.token,
        outlet_name=session.outlet.name,
        status=session.status.value,
    )


@router.get("/{token}", response_model=schemas.SessionDetailResponse)
def get_session_detail(token: str, db: DBSession = Depends(get_db)):
    session = crud.get_session_by_token(db, token)
    if not session:
        raise HTTPException(status_code=404, detail="Session tidak ditemukan")

    ratings = crud.get_ratings_for_session(db, session.id)
    return schemas.SessionDetailResponse(
        token=session.token,
        status=session.status.value,
        outlet_name=session.outlet.name,
        ratings=ratings,
    )


@router.post("/{token}/rating", response_model=schemas.RatingSubmitResponse)
def submit_rating(token: str, payload: schemas.RatingSubmitRequest, db: DBSession = Depends(get_db)):
    session = crud.get_session_by_token(db, token)
    if not session:
        raise HTTPException(status_code=404, detail="Session tidak ditemukan")

    if session.status.value == "resolved":
        return schemas.RatingSubmitResponse(
            next_action="already_resolved",
            message="Sesi ini sudah selesai, terima kasih atas feedback-nya.",
        )

    existing_ratings = crud.get_ratings_for_session(db, session.id)

    if payload.stage == "initial":
        if any(r.stage.value == "initial" for r in existing_ratings):
            raise HTTPException(status_code=400, detail="Rating awal untuk sesi ini sudah pernah diisi")

        crud.add_rating(db, session.id, "initial", payload.stars, payload.comment)
        action = rating_logic.decide_initial_action(payload.stars)

        if action == "google_maps":
            crud.update_session_status(db, session, "routed_to_maps")
            return schemas.RatingSubmitResponse(
                next_action="google_maps",
                redirect_url=session.outlet.google_maps_review_link,
                message="Terima kasih! Yuk bantu kami dengan review di Google Maps.",
            )
        else:
            crud.update_session_status(db, session, "routed_to_wa")
            wa_message = (
                f"Halo, saya baru saja mengisi survei (kode sesi: {token}) "
                f"dan ingin berdiskusi lebih lanjut mengenai pengalaman saya."
            )
            wa_url = f"https://wa.me/{session.outlet.wa_number}?text={quote(wa_message)}"
            return schemas.RatingSubmitResponse(
                next_action="whatsapp",
                redirect_url=wa_url,
                min_followup_rating=rating_logic.min_allowed_followup(payload.stars),
                message="Mohon maaf atas pengalaman kurang menyenangkan. Tim kami akan follow up via WhatsApp.",
            )

    else:  # stage == "followup"
        initial_rating = next((r for r in existing_ratings if r.stage.value == "initial"), None)
        if not initial_rating:
            raise HTTPException(status_code=400, detail="Rating awal belum ada, tidak bisa submit rating susulan")

        is_valid, minimum_required = rating_logic.decide_followup_action(payload.stars, initial_rating.stars)

        if not is_valid:
            return schemas.RatingSubmitResponse(
                next_action="need_followup_rating",
                min_followup_rating=minimum_required,
                message=f"Rating minimal {minimum_required} bintang diperlukan sebelum lanjut ke Google Maps.",
            )

        crud.add_rating(db, session.id, "followup", payload.stars, payload.comment)
        crud.update_session_status(db, session, "resolved")
        return schemas.RatingSubmitResponse(
            next_action="google_maps",
            redirect_url=session.outlet.google_maps_review_link,
            message="Terima kasih! Yuk bantu kami dengan review di Google Maps.",
        )
