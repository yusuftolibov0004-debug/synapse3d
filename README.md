# Synapse 3D — Next-Gen AI-Driven Operations Command

Kompaniyangiz uchun 3D vizual "raqamli egizak" (digital twin) va ko'p-agentli AI
yordamchi tizimi. Moliya, server yuklamasi va boshqa metrikalarni real vaqtda
3D kosmik-kema kabinasi ko'rinishida kuzatadi, anomaliyalarni AI yordamida
aniqlaydi va yechim taklif qiladi.

## Texnologiyalar (barchasi bepul / open-source)

| Qatlam | Texnologiya |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS, Three.js / React Three Fiber |
| Backend (API) | FastAPI (Python) |
| Backend (Realtime) | Node.js + WebSocket (ws) |
| Baza | PostgreSQL (Supabase Free Tier) |
| Vector DB | PGVector (Postgres extension) |
| AI / LLM | Ollama (lokal, bepul) + LangGraph (multi-agent) |
| Hosting | Vercel (frontend) + Render.com (backend), ikkalasi ham bepul tarif |

## Loyiha strukturasi

synapse3d/
├── backend/           # FastAPI ilovasi
│   ├── app/
│   │   ├── core/       # config, database
│   │   ├── routers/    # API endpointlar
│   │   ├── models/     # SQLAlchemy modellar
│   │   └── services/   # biznes logika
│   ├── main.py
│   └── requirements.txt
├── frontend/          # Next.js ilovasi (keyingi bosqichda)
├── docs/              # texnik hujjatlar
├── .gitignore
├── .env.example
└── README.md

## Ishga tushirish (lokal)

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Server ishga tushgach: http://127.0.0.1:8000/docs

## Holat

🟢 Faza 0 — Tayyorgarlik: tugallandi
⬜ Faza 1 — Backend fundamenti (FastAPI): boshlandi