"""
app/core/database.py

Bazaga async ulanishni sozlaymiz. SQLAlchemy'ning async engine'i orqali
PostgreSQL (Supabase) bilan ishlaymiz. Barcha modellar 'Base' klassidan
meros oladi.

MUHIM: Supabase'ning "Transaction pooler" (pgbouncer) prepared statements'ni
qo'llab-quvvatlamaydi, shuning uchun asyncpg uchun statement_cache_size=0
qilib o'chiramiz (connect_args orqali).
"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

from app.core.config import get_settings

settings = get_settings()

# Async engine — bazaga ulanishni boshqaradi
engine = create_async_engine(
    settings.database_url,
    echo=settings.debug,  # debug=True bo'lsa, barcha SQL so'rovlar konsolga chiqadi
    pool_pre_ping=True,   # ulanish "o'lik" bo'lsa, avtomatik qayta tekshiradi
    connect_args={
        "statement_cache_size": 0,  # pgbouncer transaction pooler uchun majburiy
    },
)

# Session yaratuvchi — har bir so'rov uchun yangi session ochamiz
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    """Barcha SQLAlchemy modellari shu klassdan meros oladi."""
    pass


async def get_db():
    """
    FastAPI dependency — har bir endpoint uchun bazaga session ochadi
    va ish tugagach avtomatik yopadi.
    """
    async with AsyncSessionLocal() as session:
        yield session