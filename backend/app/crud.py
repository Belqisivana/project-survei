from sqlalchemy.orm import Session as DBSession

from . import models


def get_qr_code(db: DBSession, code: str) -> models.QRCode | None:
    return db.query(models.QRCode).filter(models.QRCode.code == code).first()


def get_or_create_session(db: DBSession, qr_code: models.QRCode) -> models.SurveySession:
    # Untuk MVP: setiap scan bikin session baru. Kalau mau reuse session dalam
    # rentang waktu tertentu (misal 1 jam), tinggal tambah filter created_at di sini.
    session = models.SurveySession(
        qr_code_id=qr_code.id,
        outlet_id=qr_code.outlet_id,
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


def get_session_by_token(db: DBSession, token: str) -> models.SurveySession | None:
    return db.query(models.SurveySession).filter(models.SurveySession.token == token).first()


def get_ratings_for_session(db: DBSession, session_id: str) -> list[models.Rating]:
    return (
        db.query(models.Rating)
        .filter(models.Rating.session_id == session_id)
        .order_by(models.Rating.created_at)
        .all()
    )


def add_rating(db: DBSession, session_id: str, stage: str, stars: int, comment: str | None) -> models.Rating:
    rating = models.Rating(session_id=session_id, stage=stage, stars=stars, comment=comment)
    db.add(rating)
    db.commit()
    db.refresh(rating)
    return rating


def update_session_status(db: DBSession, session: models.SurveySession, status: str) -> None:
    session.status = status
    db.commit()
