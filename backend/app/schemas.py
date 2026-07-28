from datetime import datetime
from typing import Optional, Literal

from pydantic import BaseModel, Field


class SessionCreateRequest(BaseModel):
    qr_code: str = Field(..., description="Kode unik dari QR, contoh: 'meja-12-cabang-a'")


class SessionResponse(BaseModel):
    token: str
    outlet_name: str
    status: str

    class Config:
        from_attributes = True


class RatingSubmitRequest(BaseModel):
    stage: Literal["initial", "followup"]
    stars: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None


class RatingSubmitResponse(BaseModel):
    next_action: Literal["google_maps", "whatsapp", "need_followup_rating", "already_resolved"]
    redirect_url: Optional[str] = None
    min_followup_rating: Optional[int] = None
    message: str


class RatingHistoryItem(BaseModel):
    stage: str
    stars: int
    comment: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class SessionDetailResponse(BaseModel):
    token: str
    status: str
    outlet_name: str
    ratings: list[RatingHistoryItem]

    class Config:
        from_attributes = True
