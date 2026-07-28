from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session as DBSession

from .. import models
from ..database import get_db

router = APIRouter(prefix="/api/outlets", tags=["outlets"])


class OutletCreateRequest(BaseModel):
    name: str
    google_maps_review_link: str
    wa_number: str


class QRCodeCreateRequest(BaseModel):
    outlet_id: str
    code: str
    table_number: str | None = None


@router.post("")
def create_outlet(payload: OutletCreateRequest, db: DBSession = Depends(get_db)):
    outlet = models.Outlet(**payload.model_dump())
    db.add(outlet)
    db.commit()
    db.refresh(outlet)
    return {"id": outlet.id, "name": outlet.name}


@router.post("/qr-codes")
def create_qr_code(payload: QRCodeCreateRequest, db: DBSession = Depends(get_db)):
    qr = models.QRCode(**payload.model_dump())
    db.add(qr)
    db.commit()
    db.refresh(qr)
    return {"id": qr.id, "code": qr.code, "url": f"/r/{qr.code}"}
