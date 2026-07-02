"""
alembic/env.py

Alembic migratsiya muhitini sozlash. Bu fayl .env'dan DATABASE_URL'ni
o'qiydi va barcha SQLAlchemy modellarini (Base.metadata) taniydi, shunda
'alembic revision --autogenerate' avtomatik ravishda model o'zgarishlarini
migratsiyaga aylantira oladi.

MUHIM: Supabase'ning "Transaction pooler" (pgbouncer) prepared statements'ni
qo'llab-quvvatlamaydi, shuning uchun statement_cache_size=0 qilib o'chiramiz.
"""

import asyncio
import sys
from logging.config import fileConfig
from pathlib import Path

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import create_async_engine

from alembic import context

# Backend papkasini import yo'liga qo'shamiz, shunda "app.*" modullarini
# topa oladi (alembic buyruqlari backend/ ichidan ishga tushiriladi).
sys.path.append(str(Path(__file__).resolve().parents[1]))

from app.core.config import get_settings
from app.core.database import Base
# Barcha modellarni shu yerga import qilamiz, shunda Base.metadata ularni
# "ko'radi" va autogenerate to'g'ri ishlaydi.
from app.models.company import Company  # noqa: F401

# Alembic Config obyekti — alembic.ini sozlamalariga kirish imkonini beradi
config = context.config

# .env'dan haqiqiy DATABASE_URL'ni olib, alembic.ini o'rniga shuni ishlatamiz
settings = get_settings()
config.set_main_option("sqlalchemy.url", settings.database_url)

# Logging sozlamalarini alembic.ini'dan o'qiymiz
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Barcha modellarning metadata'si — autogenerate shu orqali farqni topadi
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """'Offline' rejimda migratsiya — bazaga ulanmasdan SQL generatsiya qiladi."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """Bazaga async ulanib, migratsiyani ishga tushiramiz."""
    connectable = create_async_engine(
        settings.database_url,
        poolclass=pool.NullPool,
        connect_args={
            "statement_cache_size": 0,  # pgbouncer transaction pooler uchun majburiy
        },
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    """'Online' rejimda migratsiya — haqiqiy bazaga ulanib ishga tushadi."""
    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()