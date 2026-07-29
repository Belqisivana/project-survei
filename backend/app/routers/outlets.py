import io

import qrcode
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session as DBSession

from .. import models
from ..config import settings
from ..database import get_db

router = APIRouter(prefix="/api/outlets", tags=["outlets"])


class OutletCreateRequest(BaseModel):
    city_id: str
    name: str
    google_maps_review_link: str
    wa_number: str


class OutletUpdateRequest(BaseModel):
    city_id: str | None = None
    name: str | None = None
    google_maps_review_link: str | None = None
    wa_number: str | None = None


class OutletResponse(BaseModel):
    id: str
    city_id: str
    city_name: str
    name: str
    google_maps_review_link: str
    wa_number: str

    class Config:
        from_attributes = True

    @classmethod
    def from_orm_with_city(cls, outlet: "models.Outlet") -> "OutletResponse":
        return cls(
            id=outlet.id,
            city_id=outlet.city_id,
            city_name=outlet.city.name,
            name=outlet.name,
            google_maps_review_link=outlet.google_maps_review_link,
            wa_number=outlet.wa_number,
        )


class QRCodeCreateRequest(BaseModel):
    outlet_id: str
    code: str
    table_number: str | None = None


class QRCodeResponse(BaseModel):
    id: str
    outlet_id: str
    code: str
    table_number: str | None

    class Config:
        from_attributes = True


def _get_outlet_or_404(db: DBSession, outlet_id: str) -> models.Outlet:
    outlet = db.query(models.Outlet).filter(models.Outlet.id == outlet_id).first()
    if not outlet:
        raise HTTPException(status_code=404, detail=f"Outlet dengan id '{outlet_id}' tidak ditemukan")
    return outlet


def _get_city_or_404(db: DBSession, city_id: str) -> models.City:
    city = db.query(models.City).filter(models.City.id == city_id).first()
    if not city:
        raise HTTPException(status_code=404, detail=f"Kota dengan id '{city_id}' tidak ditemukan")
    return city


# ---------- Outlets ----------

@router.post("", response_model=OutletResponse)
def create_outlet(payload: OutletCreateRequest, db: DBSession = Depends(get_db)):
    _get_city_or_404(db, payload.city_id)  # cegah typo city_id lolos, sama kayak kasus outlet_id dulu

    outlet = models.Outlet(**payload.model_dump())
    db.add(outlet)
    db.commit()
    db.refresh(outlet)
    return OutletResponse.from_orm_with_city(outlet)


@router.get("", response_model=list[OutletResponse])
def list_outlets(city_id: str | None = None, db: DBSession = Depends(get_db)):
    query = db.query(models.Outlet)
    if city_id:
        query = query.filter(models.Outlet.city_id == city_id)
    return [OutletResponse.from_orm_with_city(o) for o in query.all()]


@router.get("/{outlet_id}", response_model=OutletResponse)
def get_outlet(outlet_id: str, db: DBSession = Depends(get_db)):
    outlet = _get_outlet_or_404(db, outlet_id)
    return OutletResponse.from_orm_with_city(outlet)


@router.put("/{outlet_id}", response_model=OutletResponse)
def update_outlet(outlet_id: str, payload: OutletUpdateRequest, db: DBSession = Depends(get_db)):
    outlet = _get_outlet_or_404(db, outlet_id)
    update_data = payload.model_dump(exclude_unset=True)
    if "city_id" in update_data:
        _get_city_or_404(db, update_data["city_id"])
    for field, value in update_data.items():
        setattr(outlet, field, value)
    db.commit()
    db.refresh(outlet)
    return OutletResponse.from_orm_with_city(outlet)


@router.delete("/{outlet_id}")
def delete_outlet(outlet_id: str, db: DBSession = Depends(get_db)):
    outlet = _get_outlet_or_404(db, outlet_id)
    db.delete(outlet)
    db.commit()
    return {"message": "Outlet dihapus"}


# ---------- QR Codes ----------

@router.post("/qr-codes", response_model=QRCodeResponse)
def create_qr_code(payload: QRCodeCreateRequest, db: DBSession = Depends(get_db)):
    # Validasi outlet_id beneran ada, biar gak kejadian lagi kayak sebelumnya
    # (typo outlet_id lolos ke database dan baru ketauan pas customer akses).
    _get_outlet_or_404(db, payload.outlet_id)

    existing = db.query(models.QRCode).filter(models.QRCode.code == payload.code).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Code '{payload.code}' sudah dipakai")

    qr = models.QRCode(**payload.model_dump())
    db.add(qr)
    db.commit()
    db.refresh(qr)
    return qr


@router.get("/qr-codes/all", response_model=list[QRCodeResponse])
def list_all_qr_codes(db: DBSession = Depends(get_db)):
    return db.query(models.QRCode).all()


@router.get("/{outlet_id}/qr-codes", response_model=list[QRCodeResponse])
def list_qr_codes_by_outlet(outlet_id: str, db: DBSession = Depends(get_db)):
    _get_outlet_or_404(db, outlet_id)
    return db.query(models.QRCode).filter(models.QRCode.outlet_id == outlet_id).all()


@router.delete("/qr-codes/{qr_id}")
def delete_qr_code(qr_id: str, db: DBSession = Depends(get_db)):
    qr = db.query(models.QRCode).filter(models.QRCode.id == qr_id).first()
    if not qr:
        raise HTTPException(status_code=404, detail="QR code tidak ditemukan")
    db.delete(qr)
    db.commit()
    return {"message": "QR code dihapus"}


@router.get("/qr-codes/{code}/image")
def get_qr_code_image(code: str, size: int = 10, db: DBSession = Depends(get_db)):
    """
    Generate gambar PNG QR code yang mengarah ke halaman survei (/r/<code>).
    Parameter `size` mengatur ukuran tiap kotak QR dalam pixel (default 10, box_size).
    Contoh akses langsung di browser: /api/outlets/qr-codes/meja-1-cabang-a/image
    """
    qr_record = db.query(models.QRCode).filter(models.QRCode.code == code).first()
    if not qr_record:
        raise HTTPException(status_code=404, detail=f"QR code '{code}' tidak ditemukan")

    target_url = f"{settings.frontend_base_url.rstrip('/')}/r/{code}"

    qr = qrcode.QRCode(
        version=None,  # auto-size sesuai panjang URL
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=size,
        border=4,
    )
    qr.add_data(target_url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="image/png",
        headers={"Content-Disposition": f'inline; filename="qr-{code}.png"'},
    )