from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session as DBSession

from .. import models
from ..database import get_db

router = APIRouter(prefix="/api/cities", tags=["cities"])


class CityCreateRequest(BaseModel):
    name: str


class CityResponse(BaseModel):
    id: str
    name: str

    class Config:
        from_attributes = True


@router.post("", response_model=CityResponse)
def create_city(payload: CityCreateRequest, db: DBSession = Depends(get_db)):
    existing = db.query(models.City).filter(models.City.name == payload.name).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Kota '{payload.name}' sudah ada")

    city = models.City(name=payload.name)
    db.add(city)
    db.commit()
    db.refresh(city)
    return city


@router.get("", response_model=list[CityResponse])
def list_cities(db: DBSession = Depends(get_db)):
    return db.query(models.City).all()


@router.delete("/{city_id}")
def delete_city(city_id: str, db: DBSession = Depends(get_db)):
    city = db.query(models.City).filter(models.City.id == city_id).first()
    if not city:
        raise HTTPException(status_code=404, detail="Kota tidak ditemukan")

    has_outlets = db.query(models.Outlet).filter(models.Outlet.city_id == city_id).first()
    if has_outlets:
        raise HTTPException(
            status_code=400,
            detail="Kota ini masih punya outlet terdaftar, pindahkan/hapus outlet dulu",
        )

    db.delete(city)
    db.commit()
    return {"message": "Kota dihapus"}