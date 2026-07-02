"""
app/routers/health.py

Serverning va bazaning ishlab turgan-turmaganini tekshirish uchun endpointlar.
"""

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.database import get_db

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


@router.get("/db")
async def db_health_check(db: AsyncSession = Depends(get_db)):
    """Bazaga haqiqiy ulanishni tekshiradi — oddiy SELECT 1 so'rovi yuboradi."""
    result = await db.execute(text("SELECT 1"))
    value = result.scalar()
    return {
        "status": "ok" if value == 1 else "error",
        "database": "connected",
    }