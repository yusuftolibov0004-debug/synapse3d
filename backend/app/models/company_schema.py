"""
app/models/company_schema.py

Pydantic sxemalari — Company uchun API so'rov/javob shakllari.
SQLAlchemy modeli (company.py) bazadagi jadvalni tasvirlaydi,
bu fayldagi sxemalar esa API orqali kiradigan/chiqadigan JSON shaklini.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CompanyCreate(BaseModel):
    """Yangi kompaniya yaratishda kerak bo'ladigan maydonlar."""
    name: str


class CompanyUpdate(BaseModel):
    """Kompaniyani yangilashda ixtiyoriy maydonlar."""
    name: str | None = None
    status: str | None = None


class CompanyOut(BaseModel):
    """API javobida qaytariladigan to'liq kompaniya ma'lumoti."""
    id: uuid.UUID
    name: str
    status: str
    created_at: datetime
    updated_at: datetime

    # SQLAlchemy obyektidan to'g'ridan-to'g'ri o'qishga ruxsat beradi
    model_config = ConfigDict(from_attributes=True)