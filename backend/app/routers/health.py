"""
app/routers/health.py

Serverning ishlab turgan-turmaganini tekshirish uchun oddiy endpoint.
Bu keyinchalik monitoring tizimlari (masalan Render, UptimeRobot) tomonidan
ham ishlatiladi.
"""

from fastapi import APIRouter
from app.core.config import get_settings

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("/")
def health_check():
    """Server holatini va asosiy sozlamalarni qaytaradi."""
    settings = get_settings()
    return {
        "status": "ok",
        "app_name": settings.app_name,
        "environment": settings.app_env,
    }