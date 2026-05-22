# 04 — Hacker: Technology & Implementation

## Hacker Objective

Role Hacker menjelaskan bagaimana Kuali dapat dibangun secara teknis dengan realistis untuk prototype hackathon. Fokus: baseline architecture, AI design, diagram, database draft, API draft, dan risiko teknis.

## Technical Overview

| Layer | Teknologi (Prototype Aktual) |
|---|---|
| Frontend | Next.js 14 App Router, TypeScript, Tailwind CSS |
| UI / Animation | Framer Motion, Lucide React, Sonner |
| Database | SQLite + Prisma ORM |
| AI (prototype) | Mock rule-based parser — tanpa external AI API |
| AI (roadmap) | OpenAI / Anthropic structured JSON output |
| WhatsApp | Mock WhatsApp UI — tidak ada integrasi real |
| WhatsApp (roadmap) | Meta WhatsApp Business Cloud API |
| Payment | QRIS dummy image, reminder siap salin — bukan settlement |
| Deployment | Vercel |

## AI Utilization

AI digunakan untuk:

1. AI Order Parser.
2. Missing Field Detector.
3. Suggested Reply.
4. Daily Summary.

AI tidak boleh mengarang menu, mengarang harga, mengonfirmasi pembayaran, menghitung bahan tanpa resep, menyetujui order otomatis, atau mengambil keputusan final.

## AI Structured JSON Schema

```json
{
  "customer_name": "Dinda",
  "phone_number": null,
  "order_items": [
    {
      "menu_name": "Risol Mayo",
      "matched_menu_id": "menu_risol_mayo",
      "quantity": 12,
      "unit_price": 5000,
      "subtotal": 60000
    }
  ],
  "pickup_time": "Besok, 15.00",
  "payment_status": "UNPAID",
  "missing_fields": [],
  "confidence_score": 0.92,
  "suggested_reply": "Baik Kak Dinda, pesanan 12 Risol Mayo untuk besok jam 15.00 sudah kami catat sebagai draft. Total Rp60.000.",
  "needs_owner_review": false,
  "raw_message": "Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya."
}
```

## Example Input Chat

```text
Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya.
```

## Human-in-the-loop Rule

Semua hasil AI bersifat draft. Owner selalu approve/edit sebelum order final.

| Score | Status | Tindakan |
|---:|---|---|
| 0.85–1.00 | High confidence | Draft siap approval |
| 0.60–0.84 | Medium confidence | Perlu cek owner |
| < 0.60 | Low confidence | Minta klarifikasi |

## Backend Validation Rule

Backend memvalidasi menu, harga, quantity, pickup time, payment status, dan ingredient calculation. Harga, menu, dan resep berasal dari database, bukan AI.

## System Architecture

```text
Mock WhatsApp UI
  ↓
Frontend Next.js
  ↓
API Route /api/ai/parse-order
  ↓
AI Provider / Mocked Fallback
  ↓
Validation Layer
  ↓
Draft Order
  ↓
Owner Approval
  ↓
Order Dashboard
  ↓
Payment Reminder + Production Planner + Daily Summary
```

## Use Case Diagram

```mermaid
flowchart LR
    Customer[Customer] -->|Kirim chat pesanan| Kuali[Kuali System]
    Owner[Owner UMKM] -->|Setup menu dan resep| Kuali
    Owner -->|Approve/Edit draft order| Kuali
    Kuali --> Parser[AI Order Parser]
    Parser --> Draft[Draft Order]
    Kuali --> Payment[Payment Reminder QRIS Dummy]
    Kuali --> Planner[Production Planner]
    Kuali --> Summary[Daily Summary]
    Owner -->|Lihat dashboard| Dashboard[Order Dashboard]
```

## Sequence Diagram: Chat Order to Draft Order

```mermaid
sequenceDiagram
    participant C as Customer
    participant UI as Mock WhatsApp UI
    participant API as Kuali API
    participant AI as AI Parser
    participant DB as Database
    participant O as Owner

    C->>UI: Kirim pesan order
    UI->>API: Send raw message
    API->>AI: Parse order request
    AI-->>API: Structured JSON + confidence
    API->>DB: Validate menu and price
    DB-->>API: Menu data
    API-->>UI: Draft order
    UI-->>O: Tampilkan draft order
    O->>API: Approve/Edit order
    API->>DB: Save approved order
```

## Sequence Diagram: Production Planner

```mermaid
sequenceDiagram
    participant O as Owner
    participant UI as Dashboard
    participant API as Kuali API
    participant DB as Database
    participant Planner as Production Planner

    O->>UI: Buka rencana produksi
    UI->>API: Request production plan
    API->>DB: Get approved orders
    API->>DB: Get menu recipes
    DB-->>API: Orders + recipes
    API->>Planner: Calculate ingredients
    Planner-->>API: Ingredient estimation
    API-->>UI: Production plan
    UI-->>O: Tampilkan daftar bahan
```

## System Design Diagram

```mermaid
flowchart TD
    A[Mock WhatsApp UI] --> B[Next.js Frontend]
    B --> C[API Routes]
    C --> D[Mock AI Parser\nRule-based, no external API]
    C --> E[Order Service]
    C --> F[Production Planner Service]
    C --> G[Daily Summary Service]
    E --> H[(SQLite via Prisma ORM)]
    F --> H
    G --> H
    C --> J[Notification Service]
    J --> K[QRIS Dummy Reminder\nSimulasi saja]
```

## ERD

```mermaid
erDiagram
    Business ||--o{ Menu : has
    Business ||--o{ Ingredient : has
    Business ||--o{ Order : receives
    Business ||--o{ DailySummary : generates
    Menu ||--o{ RecipeItem : uses
    Ingredient ||--o{ RecipeItem : included_in
    Customer ||--o{ Order : places
    Order ||--o{ OrderItem : contains
    Menu ||--o{ OrderItem : ordered
    Order ||--o| Payment : has
    Order ||--o{ NotificationLog : sends
```

## Database Design

Entities MVP (10 entitas — sesuai `prisma/schema.prisma` aktual):
- Business
- Menu
- Ingredient
- RecipeItem
- Customer
- Order
- OrderItem
- Payment
- NotificationLog
- DailySummary

*Catatan: Tidak ada entitas User / Auth di MVP — single-tenant prototype.*

## API Endpoint Draft

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard` | Dashboard metrics |
| GET | `/api/orders` | List orders |
| POST | `/api/orders` | Create draft/manual order |
| GET | `/api/orders/:id` | Order detail |
| PATCH | `/api/orders/:id/status` | Update order status |
| PATCH | `/api/orders/:id/payment` | Update payment status |
| GET | `/api/menus` | List menu |
| POST | `/api/menus` | Add menu |
| GET | `/api/ingredients` | List ingredients |
| POST | `/api/ai/parse-order` | Parse chat |
| GET | `/api/production-plan` | Production plan dari order aktual |
| GET | `/api/daily-summary` | Rekap harian |
| POST | `/api/notifications/payment-reminder` | Payment reminder dummy |

## WhatsApp Integration Plan

| Phase | Approach | Status |
|---|---|---|
| MVP / Demo | Mock WhatsApp UI (built-in) | ✅ Aktif |
| Roadmap | Meta WhatsApp Business Cloud API | Belum diimplementasi |

## Payment Plan

QRIS dummy only. No real settlement. Kuali tidak diklaim sebagai payment gateway.

## Security / Privacy

- Data minimization.
- Dummy data untuk proposal/demo.
- Owner approval required.
- Future broadcast requires opt-in.
- Payment data not processed in MVP.

## Technical Risks and Mitigation

| Risiko | Mitigasi |
|---|---|
| AI salah parsing | Confidence score + owner approval |
| AI hallucinate harga | Harga dari database |
| WhatsApp API gagal | Mock UI first |
| Payment risk | QRIS dummy only |
| Scope creep | MVP boundary docs |
| Demo error | Static fallback and dummy data |

## Hacker Task Checklist

- [ ] AI JSON schema draft
- [ ] Mermaid use case diagram
- [ ] Mermaid sequence diagram
- [ ] Mermaid architecture diagram
- [ ] ERD draft
- [ ] API endpoint draft
- [ ] Database entity draft
- [ ] Risk mitigation

## Acceptance Criteria

- Diagram valid.
- AI boundary jelas.
- MVP tidak butuh real WhatsApp/QRIS.
- Database entity cukup untuk MVP.
- API draft mendukung demo flow.
