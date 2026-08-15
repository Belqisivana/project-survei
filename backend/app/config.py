from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Default pakai SQLite biar langsung bisa jalan tanpa setup Postgres dulu.
    # Ganti ke connection string Postgres kamu di file .env saat mau produksi.
    database_url: str = "sqlite:///./review_funnel.db"
    min_rating_threshold: int = 4
    frontend_origin: str = "http://localhost:3000"

    @property
    def frontend_origins_list(self) -> list[str]:
        """FRONTEND_ORIGIN bisa diisi beberapa domain dipisah koma, misal:
        https://domain-lama.vercel.app,https://domain-baru.vercel.app"""
        return [origin.strip() for origin in self.frontend_origin.split(",")]
    # URL publik frontend yang dipakai untuk membuat isi QR code (mengarah ke /r/<code>).
    # Ganti ke domain asli saat sudah deploy, misal https://survei.namabisnis.com
    frontend_base_url: str = "http://localhost:3000"

    # --- WhatsApp Cloud API ---
    whatsapp_access_token: str = ""
    whatsapp_phone_number_id: str = ""
    whatsapp_verify_token: str = "lkimanis10"
    whatsapp_api_version: str = "v21.0"

    class Config:
        env_file = ".env"


settings = Settings()