from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, engine
from .routers import session, outlets, cities, reports, whatsapp

# Untuk MVP kita create_all langsung. Kalau sudah production, ganti ke Alembic migration.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="QR Review Funnel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(session.router)
app.include_router(outlets.router)
app.include_router(cities.router)
app.include_router(reports.router)
app.include_router(whatsapp.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}