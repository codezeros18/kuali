# Baseline Architecture — Kuali

> Dokumen ini adalah bagian dari Phase 0 Baseline Proposal Kuali.
> Architecture ini adalah baseline untuk demo dan proposal — bukan production-grade final.

---

## 1. Gambaran Umum

Kuali adalah aplikasi Next.js fullstack yang mensimulasikan alur: chat WhatsApp → AI parser → draft order → owner approval → production planner → daily summary.

Untuk MVP hackathon, semua komponen berjalan di satu Next.js app. WhatsApp dan QRIS hanya berupa simulasi/mock.

---

## 2. Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  CUSTOMER                                                       │
│  Kirim chat pesanan via WhatsApp                                │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  MOCK WHATSAPP UI  (Next.js page: /mock-whatsapp)              │
│  - Textarea input simulasi chat WhatsApp                        │
│  - Tombol "Kirim ke Kuali"                                      │
│  - Tampilkan raw chat + hasil parsing                           │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  API ROUTE: /api/ai/parse-order  (Next.js API)                 │
│  - Terima raw chat text                                         │
│  - Kirim ke AI provider (OpenAI / Anthropic)                    │
│  - Fallback: USE_MOCK_AI=true → gunakan cached JSON response   │
│  - Output: structured JSON order draft                          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  BACKEND VALIDATION  (lib/validators/)                         │
│  - Validasi menu terhadap data menu aktual                      │
│  - Hitung confidence score                                      │
│  - Deteksi missing fields                                       │
│  - Generate suggested reply                                     │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  DRAFT ORDER CARD  (Owner Dashboard)                           │
│  - Tampilkan draft order + confidence score                     │
│  - Tampilkan missing fields (jika ada)                          │
│  - Tombol: Approve / Edit / Reject                              │
└─────────────────────────┬───────────────────────────────────────┘
                          │ Owner tekan Approve
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  DATABASE  (Supabase PostgreSQL + Prisma ORM)                  │
│  - Order tersimpan dengan status: confirmed                     │
│  - Payment status: unpaid (default)                             │
│  - Link ke menu, customer, bahan                                │
└───────┬──────────────────┬───────────────────┬─────────────────┘
        │                  │                   │
        ▼                  ▼                   ▼
┌──────────────┐  ┌─────────────────┐  ┌──────────────────────┐
│ ORDER DASH   │  │ QRIS DUMMY      │  │ PRODUCTION PLANNER   │
│ /orders      │  │ REMINDER        │  │ /production          │
│              │  │                 │  │                      │
│ - List order │  │ - Preview QRIS  │  │ - Hitung bahan dari  │
│ - Status     │  │ - Salin reminder│  │   order aktual       │
│ - Filter     │  │ - Dummy only    │  │   × resep            │
│ - Detail     │  │ - Bukan settle  │  │ - Daftar bahan       │
└──────────────┘  └─────────────────┘  └──────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  DAILY SUMMARY  (/summary)  +  IMPACT DASHBOARD  (/impact)    │
│  - Rekap order hari ini                                         │
│  - Total unpaid, confirmed, perlu cek                           │
│  - Estimasi bahan dari order aktual                             │
│  - Metrik dummy (aman, tidak overclaim)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 14+ App Router | Fullstack, satu repo, demo-ready |
| Language | TypeScript | Type safety, lebih mudah debug |
| Styling | Tailwind CSS + shadcn/ui | Mobile-first, cepat, component siap pakai |
| Database | Supabase PostgreSQL | Managed, gratis tier cukup untuk demo |
| ORM | Prisma | Type-safe, migrasi mudah |
| AI | OpenAI GPT-4o / Anthropic Claude | Structured output support |
| AI Mock | USE_MOCK_AI=true | Fallback demo tanpa API key |
| WhatsApp | Mock UI saja | Tidak perlu real API di MVP |
| Payment | QRIS dummy | Tidak perlu settlement real di MVP |
| Deployment | Vercel | Free tier, satu perintah deploy |

---

## 4. Database Entity Baseline

```
Business
  id, name, ownerName, phone, address

Customer
  id, businessId, name, phone, notes

Menu
  id, businessId, name, category, price, unit, isAvailable, leadTimeHours

Ingredient
  id, businessId, name, unit, pricePerUnit, currentStock

Recipe
  id, menuId, servings
  RecipeIngredient: recipeId, ingredientId, qty, unit

Order
  id, businessId, customerId, orderNumber, status, paymentStatus
  deliveryDate, deliveryTime, pickupMethod, specialRequest
  confidenceScore, missingFields, sourceChat
  createdAt, approvedAt

OrderItem
  id, orderId, menuId, qty, unitPrice, subtotal

PaymentReminder
  id, orderId, qrisDummyUrl, sentAt, status (dummy only)

DailyProductionPlan
  id, businessId, date
  DailyIngredientNeed: planId, ingredientId, totalQtyNeeded, unit
```

---

## 5. API Endpoint Baseline

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /api/health | Cek app berjalan |
| POST | /api/ai/parse-order | Parsing chat → draft order JSON |
| GET | /api/orders | List semua order |
| GET | /api/orders/:id | Detail satu order |
| PATCH | /api/orders/:id/approve | Approve draft → confirmed |
| PATCH | /api/orders/:id/payment | Update status pembayaran |
| GET | /api/menus | List menu |
| GET | /api/ingredients | List bahan |
| GET | /api/production/plan | Hitung kebutuhan bahan dari order aktual |
| GET | /api/summary/daily | Daily summary |
| GET | /api/impact | Metrik impact dummy |

---

## 6. AI Parser — Schema Input/Output

### Input

```json
{
  "chatText": "Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya.",
  "availableMenus": ["Risol Mayo", "Ayam Geprek", "Nasi Kotak"],
  "businessContext": "Katering Bu Rani — pre-order makanan rumahan"
}
```

### Output (Structured JSON)

```json
{
  "customerName": "Dinda",
  "items": [
    { "menuName": "Risol Mayo", "qty": 12, "matchedMenuId": "menu-001" }
  ],
  "deliveryDate": "besok",
  "deliveryTime": "15:00",
  "paymentStatus": "belum_bayar",
  "pickupMethod": "delivery",
  "specialRequest": null,
  "confidenceScore": 0.95,
  "missingFields": [],
  "suggestedReply": "Halo Kak Dinda, pesanan 12 risol mayo untuk besok jam 3 sudah kami catat. Kami akan kirimkan info pembayaran sore ini. Terima kasih! 🙏"
}
```

### Guardrail AI

- AI tidak boleh mengarang harga
- AI tidak boleh mengarang menu yang tidak ada di daftar
- AI tidak boleh mengubah status pembayaran menjadi "lunas" tanpa konfirmasi owner
- AI tidak boleh mengirim pesan ke customer secara otomatis
- Semua output divalidasi oleh backend sebelum ditampilkan ke owner

---

## 7. Route UI Baseline

| Route | Halaman |
|---|---|
| `/` | Landing / entry demo |
| `/mock-whatsapp` | Simulasi chat WhatsApp masuk |
| `/dashboard` | Dashboard order hari ini |
| `/orders` | Daftar semua order |
| `/orders/[id]` | Detail order + approval |
| `/menus` | Daftar menu dan resep |
| `/production` | Production planner (kebutuhan bahan) |
| `/summary` | Daily summary |
| `/impact` | Impact dashboard (metrik dummy) |

---

## 8. Deployment Plan (MVP)

1. Push ke GitHub
2. Connect ke Vercel
3. Set env variables di Vercel dashboard
4. Deploy otomatis dari branch `main`
5. Supabase DB sudah tersedia via `DATABASE_URL`
6. Demo URL: `https://kuali-demo.vercel.app` (placeholder)

---

## 9. Batas Arsitektur MVP

| Di luar scope MVP | Catatan |
|---|---|
| Real WhatsApp Business Cloud API | Butuh review Meta, tidak feasible di hackathon |
| Real QRIS settlement | Butuh integrasi payment gateway, bukan MVP |
| n8n automation | Opsional, bukan dependency utama |
| Multi-tenant auth | Satu business saja untuk MVP demo |
| Native mobile app | PWA sudah cukup untuk demo |
| ML prediction kompleks | AI parser sudah cukup |
| Community sourcing | Roadmap Phase 3 |
| Rescue sale | Roadmap Phase 3 |

---

## 10. Catatan untuk Tim

- Semua keputusan arsitektur besar harus melalui LEAD
- Jangan ubah DB provider atau framework tanpa approval
- Gunakan `USE_MOCK_AI=true` dan `USE_MOCK_WHATSAPP=true` untuk demo
- Seed data dari `data/dummy-*.json` harus tersedia sebelum demo
