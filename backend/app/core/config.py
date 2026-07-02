"""
app/core/config.py

Loyihaning barcha muhit o'zgaruvchilarini (.env) shu yerda markazlashtirib
o'qiymiz. Boshqa hech bir joyda to'g'ridan-to'g'ri os.environ ishlatilmaydi —
bu kelajakda sozlamalarni boshqarishni osonlashtiradi.
"""

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # --- Umumiy ---
    app_name: str = "Synapse3D"
    app_env: str = "development"
    debug: bool = True

    # --- Baza (keyingi fazada ishlatiladi) ---
    database_url: str = "postgresql+asyncpg://postgres:password@localhost:5432/synapse3d"

    # --- Auth (keyingi fazada ishlatiladi) ---
    secret_key: str = "change-this-to-a-random-secret-string"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    # --- Realtime server ---
    realtime_port: int = 4000
    realtime_url: str = "ws://localhost:4000"

    # --- Ollama ---
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.1"

    model_config = SettingsConfigDict(
        env_file="../.env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    """
    Settings obyektini cache qilib qaytaramiz — har chaqirilganda .env qayta
    o'qilmasin, dastur davomida bitta nusxa ishlatilsin.
    """
    return Settings()