"""
app/routers/company.py

Company (kompaniya) uchun to'liq CRUD API:
- POST   /companies/       -> yangi kompaniya yaratish
- GET    /companies/       -> barcha kompaniyalar ro'yxati
- GET    /companies/{id}   -> bitta kompaniyani olish
- PUT    /companies/{id}   -> kompaniyani yangilash
- DELETE /companies/{id}   -> kompaniyani o'chirish
"""

import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.company import Company
from app.models.company_schema import CompanyCreate, CompanyUpdate, CompanyOut

router = APIRouter(prefix="/companies", tags=["Companies"])


@router.post("/", response_model=CompanyOut, status_code=status.HTTP_201_CREATED)
async def create_company(payload: CompanyCreate, db: AsyncSession = Depends(get_db)):
    """Yangi kompaniya yaratadi."""
    new_company = Company(name=payload.name)
    db.add(new_company)
    await db.commit()
    await db.refresh(new_company)
    return new_company


@router.get("/", response_model=list[CompanyOut])
async def list_companies(db: AsyncSession = Depends(get_db)):
    """Barcha kompaniyalar ro'yxatini qaytaradi."""
    result = await db.execute(select(Company).order_by(Company.created_at.desc()))
    return result.scalars().all()


@router.get("/{company_id}", response_model=CompanyOut)
async def get_company(company_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Bitta kompaniyani ID orqali topadi."""
    company = await db.get(Company, company_id)
    if company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return company


@router.put("/{company_id}", response_model=CompanyOut)
async def update_company(
    company_id: uuid.UUID, payload: CompanyUpdate, db: AsyncSession = Depends(get_db)
):
    """Kompaniya ma'lumotlarini yangilaydi (faqat berilgan maydonlarni)."""
    company = await db.get(Company, company_id)
    if company is None:
        raise HTTPException(status_code=404, detail="Company not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(company, field, value)

    await db.commit()
    await db.refresh(company)
    return company


@router.delete("/{company_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_company(company_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Kompaniyani o'chiradi."""
    company = await db.get(Company, company_id)
    if company is None:
        raise HTTPException(status_code=404, detail="Company not found")

    await db.delete(company)
    await db.commit()
    return None