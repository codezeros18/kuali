# Pendekatan Teknologi — Kuali

---

## Stack Utama

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 14+ App Router + TypeScript | Fullstack dalam satu repo, deploy mudah, type safety |
| Styling | Tailwind CSS + shadcn/ui | Mobile-first, komponen siap pakai, cepat di hackathon |
| Database | Supabase PostgreSQL | Managed, gratis tier cukup untuk demo, tidak perlu infra sendiri |
| ORM | Prisma | Type-safe, schema migration terstruktur |
| AI Parser | OpenAI GPT-4o / Anthropic Claude | Structured JSON output, reliable untuk Bahasa Indonesia informal |
| AI Fallback | Mock response (USE_MOCK_AI=true) | Demo tetap berjalan tanpa bergantung koneksi API |
| WhatsApp | Mock UI (textarea + API route) | Tidak butuh approval Meta untuk demo |
| Payment | QRIS dummy image | Tidak butuh payment gateway untuk demo |
| Deploy | Vercel | Free tier, satu perintah dari GitHub |

---

## Alur Teknis

```
Mock WhatsApp UI (textarea input)
       ↓ POST chat text
/api/ai/parse-order
       ↓ prompt + menu context
AI Provider (OpenAI / Anthropic)
  atau Mock Fallback (USE_MOCK_AI=true)
       ↓ structured JSON
Backend Validation
  - cek menu exist di database
  - hitung confidence score
  - deteksi missing fields
  - generate suggested reply
       ↓
Draft Order → Owner Dashboard (/dashboard)
       ↓ owner approve
Database (Supabase PostgreSQL + Prisma)
       ↓
Order Dashboard + QRIS Dummy Reminder + Production Planner + Daily Summary
```

---

## Keputusan Teknis Penting

### Mock-first, bukan real-API-first

Semua integrasi eksternal (WhatsApp, QRIS, AI) memiliki fallback mode yang berjalan tanpa koneksi live. Ini memastikan demo tidak gagal karena masalah jaringan atau rate limit.

```
USE_MOCK_AI=true         → gunakan cached JSON response dari expected-ai-parser-output.json
USE_MOCK_WHATSAPP=true   → gunakan textarea simulasi, bukan WhatsApp Business API
```

### AI dengan guardrail ketat

AI parser hanya boleh menghasilkan output yang bisa divalidasi terhadap data menu aktual:
- Tidak boleh mengarang harga
- Tidak boleh mengarang menu yang tidak ada di daftar
- Tidak boleh mengubah status pembayaran tanpa input owner
- Tidak boleh mengirim pesan ke customer secara otomatis

Semua output AI divalidasi backend sebelum ditampilkan ke owner.

### Single-tenant untuk MVP

Satu instance aplikasi melayani satu bisnis (Katering Bu Rani). Multi-tenant diimplementasikan di roadmap sebagai bagian dari rencana SaaS.

---

## Database Entity Baseline

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

## API Endpoint Baseline

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

## AI Parser — Input/Output Schema

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
  "deliveryDateResolved": "2025-05-18",
  "deliveryTime": "15:00",
  "paymentStatus": "belum_bayar",
  "pickupMethod": "delivery",
  "specialRequest": null,
  "confidenceScore": 0.95,
  "missingFields": [],
  "suggestedReply": "Halo Kak Dinda, pesanan 12 risol mayo untuk besok jam 3 sudah kami catat ya. Kami akan kirimkan info pembayaran sore ini. Terima kasih! 🙏"
}
```

---

## Halaman UI (Routes)

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

## Deployment Plan (MVP)

1. Push ke GitHub
2. Connect ke Vercel
3. Set env variables di Vercel: `DATABASE_URL`, `OPENAI_API_KEY`, `USE_MOCK_AI`, `USE_MOCK_WHATSAPP`
4. Deploy otomatis dari branch `main`
5. Supabase DB tersedia via `DATABASE_URL`

---

## Batas Arsitektur MVP

| Di luar scope MVP | Keterangan |
|---|---|
| Real WhatsApp Business Cloud API | Butuh review Meta, tidak feasible di hackathon |
| Real QRIS settlement | Butuh integrasi payment gateway |
| n8n automation | Opsional, bukan dependency utama |
| Multi-tenant auth | Satu business saja untuk MVP demo |
| Native mobile app | PWA sudah cukup untuk demo |
| ML prediction kompleks | AI parser LLM sudah cukup |
| Community sourcing | Roadmap Phase 3 |
| Rescue sale | Roadmap Phase 3 |
