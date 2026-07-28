from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, engine
from .routers import session, outlets

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


@app.get("/health")
def health_check():
    return {"status": "ok"}
