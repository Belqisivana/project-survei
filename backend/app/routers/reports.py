from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session as DBSession, joinedload

from .. import models
from ..database import get_db

router = APIRouter(prefix="/api/reports", tags=["reports"])


class ComplaintItem(BaseModel):
    session_token: str
    city_name: str
    outlet_name: str
    stars: int
    comment: str | None
    session_status: str
    created_at: str


class OutletSummary(BaseModel):
    outlet_id: str
    outlet_name: str
    city_name: str
    total_sessions: int
    total_complaints: int  # rating awal <= 3
    resolved_complaints: int  # sudah lanjut sampai rating followup


@router.get("/complaints", response_model=list[ComplaintItem])
def list_complaints(
    city_id: str | None = None,
    outlet_id: str | None = None,
    only_unresolved: bool = False,
    db: DBSession = Depends(get_db),
):
    """
    List semua komplain (rating awal <= 3 bintang), bisa difilter per kota atau per outlet.
    `only_unresolved=true` untuk cuma nampilin yang belum selesai ditangani CS (status masih 'routed_to_wa').
    """
    query = (
        db.query(models.Rating)
        .join(models.SurveySession, models.Rating.session_id == models.SurveySession.id)
        .join(models.Outlet, models.SurveySession.outlet_id == models.Outlet.id)
        .join(models.City, models.Outlet.city_id == models.City.id)
        .options(
            joinedload(models.Rating.session)
            .joinedload(models.SurveySession.outlet)
            .joinedload(models.Outlet.city)
        )
        .filter(models.Rating.stage == "initial")
        .filter(models.Rating.stars <= 3)
    )

    if city_id:
        query = query.filter(models.Outlet.city_id == city_id)
    if outlet_id:
        query = query.filter(models.SurveySession.outlet_id == outlet_id)
    if only_unresolved:
        query = query.filter(models.SurveySession.status == "routed_to_wa")

    ratings = query.order_by(models.Rating.created_at.desc()).all()

    return [
        ComplaintItem(
            session_token=r.session.token,
            city_name=r.session.outlet.city.name,
            outlet_name=r.session.outlet.name,
            stars=r.stars,
            comment=r.comment,
            session_status=r.session.status.value,
            created_at=r.created_at.isoformat(),
        )
        for r in ratings
    ]


@router.get("/summary", response_model=list[OutletSummary])
def summary_by_outlet(city_id: str | None = None, db: DBSession = Depends(get_db)):
    """Ringkasan jumlah sesi & komplain per outlet, untuk lihat outlet mana paling sering dikomplain."""
    query = db.query(models.Outlet).options(joinedload(models.Outlet.city))
    if city_id:
        query = query.filter(models.Outlet.city_id == city_id)
    outlets = query.all()

    result = []
    for outlet in outlets:
        sessions = db.query(models.SurveySession).filter(models.SurveySession.outlet_id == outlet.id).all()
        session_ids = [s.id for s in sessions]

        total_complaints = 0
        resolved_complaints = 0
        if session_ids:
            initial_ratings = (
                db.query(models.Rating)
                .filter(models.Rating.session_id.in_(session_ids))
                .filter(models.Rating.stage == "initial")
                .filter(models.Rating.stars <= 3)
                .all()
            )
            total_complaints = len(initial_ratings)
            complaint_session_ids = {r.session_id for r in initial_ratings}
            resolved_complaints = (
                db.query(models.Rating)
                .filter(models.Rating.session_id.in_(complaint_session_ids))
                .filter(models.Rating.stage == "followup")
                .count()
            )

        result.append(
            OutletSummary(
                outlet_id=outlet.id,
                outlet_name=outlet.name,
                city_name=outlet.city.name,
                total_sessions=len(sessions),
                total_complaints=total_complaints,
                resolved_complaints=resolved_complaints,
            )
        )

    return result