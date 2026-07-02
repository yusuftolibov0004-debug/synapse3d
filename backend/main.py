"""
main.py

Synapse 3D backendining kirish nuqtasi (entry point).
Bu yerda FastAPI ilovasi yaratiladi va barcha routerlar ulanadi.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import health, company

app = FastAPI(
    title="Synapse 3D API",
    description="Kompaniyaning 3D raqamli egizagi uchun backend API",
    version="0.1.0",
)

# CORS — frontend (Next.js, boshqa portda ishlaydi) backend bilan
# gaplasha olishi uchun ruxsat berish. Hozircha barcha manzillarga ochiq,
# keyingi fazalarda bu qattiqlashtiriladi.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routerlarni ulash
app.include_router(health.router)
app.include_router(company.router)


@app.get("/")
def read_root():
    """Eng oddiy tekshiruv endpointi."""
    return {"message": "Hello Synapse", "status": "running"}