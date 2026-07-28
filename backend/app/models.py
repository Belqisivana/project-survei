import uuid
from datetime import datetime

from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Text, Enum
from sqlalchemy.orm import relationship
import enum

from .database import Base


def gen_uuid() -> str:
    return str(uuid.uuid4())


class SessionStatus(str, enum.Enum):
    initial = "initial"
    routed_to_maps = "routed_to_maps"
    routed_to_wa = "routed_to_wa"
    resolved = "resolved"


class RatingStage(str, enum.Enum):
    initial = "initial"
    followup = "followup"


class Outlet(Base):
    __tablename__ = "outlets"

    id = Column(String, primary_key=True, default=gen_uuid)
    name = Column(String, nullable=False)
    google_maps_review_link = Column(String, nullable=False)
    wa_number = Column(String, nullable=False)  # format: 62812xxxxxxx
    created_at = Column(DateTime, default=datetime.utcnow)

    qr_codes = relationship("QRCode", back_populates="outlet")


class QRCode(Base):
    __tablename__ = "qr_codes"

    id = Column(String, primary_key=True, default=gen_uuid)
    outlet_id = Column(String, ForeignKey("outlets.id"), nullable=False)
    code = Column(String, unique=True, nullable=False)  # dipakai di URL /r/[code]
    table_number = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    outlet = relationship("Outlet", back_populates="qr_codes")


class SurveySession(Base):
    __tablename__ = "survey_sessions"

    id = Column(String, primary_key=True, default=gen_uuid)
    qr_code_id = Column(String, ForeignKey("qr_codes.id"), nullable=False)
    outlet_id = Column(String, ForeignKey("outlets.id"), nullable=False)
    token = Column(String, unique=True, nullable=False, default=gen_uuid)
    status = Column(Enum(SessionStatus), default=SessionStatus.initial)
    created_at = Column(DateTime, default=datetime.utcnow)

    ratings = relationship("Rating", back_populates="session")
    outlet = relationship("Outlet")


class Rating(Base):
    __tablename__ = "ratings"

    id = Column(String, primary_key=True, default=gen_uuid)
    session_id = Column(String, ForeignKey("survey_sessions.id"), nullable=False)
    stage = Column(Enum(RatingStage), nullable=False)
    stars = Column(Integer, nullable=False)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("SurveySession", back_populates="ratings")
