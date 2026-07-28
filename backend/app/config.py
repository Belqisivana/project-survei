from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Default pakai SQLite biar langsung bisa jalan tanpa setup Postgres dulu.
    # Ganti ke connection string Postgres kamu di file .env saat mau produksi.
    database_url: str = "sqlite:///./review_funnel.db"
    min_rating_threshold: int = 4
    frontend_origin: str = "http://localhost:3000"

    class Config:
        env_file = ".env"


settings = Settings()
