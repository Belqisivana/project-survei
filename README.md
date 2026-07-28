# QR Review Funnel

Alur: scan QR -> rating pelayanan -> jika 4-5 bintang ke Google Maps, jika 1-3 ke WhatsApp CS -> setelah diskusi, rating ulang minimal 4 (dan tidak boleh lebih rendah dari rating awal) -> Google Maps.

## Struktur

```
project/
├── frontend/          Next.js (App Router, TypeScript, Tailwind)
│   ├── app/
│   │   ├── r/[code]/page.tsx       halaman awal dari QR (rating pertama)
│   │   └── f/[token]/page.tsx      halaman followup (link dikirim CS via WA)
│   ├── components/StarRating.tsx
│   ├── lib/api.ts                  wrapper fetch ke backend
│   └── types/index.ts
│
└── backend/            FastAPI
    └── app/
        ├── main.py                 entry point + CORS
        ├── models.py               SQLAlchemy: Outlet, QRCode, SurveySession, Rating
        ├── schemas.py               Pydantic request/response
        ├── crud.py
        ├── services/rating_logic.py  <- logika validasi rating (inti bisnis)
        └── routers/
            ├── session.py           POST /api/sessions, POST /api/sessions/{token}/rating
            └── outlets.py           setup data outlet & QR (untuk testing)
```

## Menjalankan backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Buat data uji lewat API (atau pakai /docs Swagger UI):

```bash
curl -X POST http://localhost:8000/api/outlets \
  -H "Content-Type: application/json" \
  -d '{"name":"Cabang A","google_maps_review_link":"https://g.page/r/xxxx/review","wa_number":"6281234567890"}'

curl -X POST http://localhost:8000/api/outlets/qr-codes \
  -H "Content-Type: application/json" \
  -d '{"outlet_id":"<ID_OUTLET>","code":"meja-1-cabang-a"}'
```

## Menjalankan frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Buka `http://localhost:3000/r/meja-1-cabang-a` (ganti sesuai `code` yang dibuat di atas).

## Catatan penting

- Validasi "rating followup minimal = max(rating_awal, 4)" ada di `backend/app/services/rating_logic.py` — satu-satunya sumber kebenaran, jangan duplikasi logic ini di frontend.
- QR code generation (jadi gambar PNG) belum termasuk di sini — tinggal generate dari `code` yang disimpan (misal pakai library `qrcode` Python atau `qrcode.react` di frontend) yang mengarah ke `https://domainmu.com/r/<code>`.
- Integrasi WhatsApp saat ini pakai `wa.me` deep link manual (CS balas manual). Untuk chatbot otomatis, ganti bagian redirect WA di `routers/session.py` dengan pemanggilan WhatsApp Cloud API / provider pihak ketiga, dan tambahkan webhook endpoint baru untuk terima balasan.
