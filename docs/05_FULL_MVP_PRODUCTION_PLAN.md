# 05 — Full MVP Production Plan

> File ini untuk MVP prototype dan roadmap production. Jangan pakai file ini untuk memasukkan roadmap ke MVP tanpa approval.

## 1. Tech Decisions

| Area | Decision |
|---|---|
| App | Next.js fullstack first |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase PostgreSQL |
| ORM | Prisma |
| Local fallback | Docker PostgreSQL optional |
| AI | OpenAI/Anthropic structured JSON |
| WhatsApp | Mock WhatsApp first |
| Automation | n8n optional |
| Real WhatsApp | Meta WhatsApp Cloud API roadmap |
| Payment | QRIS dummy only in MVP |
| Production planner | Backend formula, not AI hallucination |
| Owner approval | Required before final order |

## 2. MVP Architecture

```txt
Browser / Mobile PWA
  ├─ Mock WhatsApp UI
  ├─ Owner Dashboard
  ├─ Order Detail
  ├─ Production Planner
  ├─ Daily Summary
  └─ Impact Dashboard
       ↓
Next.js API Routes
  ├─ /api/ai/parse-order
  ├─ /api/orders
  ├─ /api/menus
  ├─ /api/ingredients
  ├─ /api/production-plan
  ├─ /api/daily-summary
  └─ /api/notifications/payment-reminder
       ↓
Prisma ORM
       ↓
Supabase PostgreSQL
       ↓
AI Provider (optional live, fallback mock)
```

## 3. Full Production Architecture

```txt
Customer WhatsApp
  ↓
Meta WhatsApp Cloud API
  ↓
n8n / Webhook Gateway
  ↓
Kuali Backend API
  ├─ AI Parser Service
  ├─ Order Service
  ├─ Payment Reminder Service
  ├─ Production Planner Service
  ├─ Notification Service
  └─ Analytics Service
  ↓
PostgreSQL + Object Storage
  ↓
Owner PWA Dashboard
  ↓
Roadmap Modules
  ├─ Customer Opt-in System
  ├─ Community Sourcing
  ├─ Supplier Pooling
  └─ Rescue Sale Opt-in
```

## 4. Module List

| Module | MVP/Roadmap | Priority |
|---|---|---|
| Auth/Owner | MVP light | P1 |
| Business Profile | MVP | P1 |
| Menu | MVP | P0 |
| Ingredient | MVP | P0 |
| RecipeItem | MVP | P0 |
| Customer | MVP | P0 |
| Order | MVP | P0 |
| OrderItem | MVP | P0 |
| Payment | MVP dummy | P0 |
| NotificationLog | MVP light | P1 |
| DailySummary | MVP | P0 |
| AI Parser | MVP | P0 |
| Production Planner | MVP | P0 |
| Mock WhatsApp | MVP | P0 |
| Community Sourcing | Roadmap | P2 |
| Rescue Sale | Roadmap | P2 |

## 5. Database Entities

Minimal:

- User
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

Optional roadmap:

- CustomerConsent
- CommunitySuggestion
- Supplier
- SupplierOffer
- PoolingGroup
- RescueOffer

## 6. API Endpoint List

| Endpoint | Method | Purpose | Priority |
|---|---|---|---|
| `/api/health` | GET | Health check | P0 |
| `/api/dashboard` | GET | Today summary | P0 |
| `/api/orders` | GET | List orders | P0 |
| `/api/orders` | POST | Create order | P0 |
| `/api/orders/:id` | GET | Order detail | P0 |
| `/api/orders/:id/status` | PATCH | Update order status | P0 |
| `/api/orders/:id/payment` | PATCH | Update payment status | P0 |
| `/api/menus` | GET | List menu | P0 |
| `/api/menus` | POST | Create menu | P1 |
| `/api/ingredients` | GET | List ingredient | P0 |
| `/api/ingredients` | POST | Create ingredient | P1 |
| `/api/ai/parse-order` | POST | Parse chat | P0 |
| `/api/ai/daily-summary` | POST | Generate summary wording | P1 |
| `/api/production-plan` | GET/POST | Calculate ingredients | P0 |
| `/api/webhooks/whatsapp` | POST | Optional mock/n8n webhook | P1 |
| `/api/notifications/payment-reminder` | POST | Create reminder preview | P0 |

## 7. AI Service Design

AI use cases:

1. Order parser.
2. Missing field detection.
3. Suggested reply.
4. Daily summary wording.

AI not allowed:

- Mengarang menu.
- Mengarang harga.
- Mengubah payment menjadi paid.
- Menghitung bahan tanpa resep.
- Mengirim broadcast.

AI output schema example:

```json
{
  "customer_name": "Dinda",
  "order_items": [
    {
      "menu_name": "Risol Mayo",
      "quantity": 12
    }
  ],
  "pickup_time_text": "besok jam 3",
  "payment_status": "UNPAID",
  "missing_fields": [],
  "confidence_score": 0.92,
  "suggested_reply": "Baik Kak Dinda, pesanan 12 Risol Mayo untuk besok jam 15.00 sudah kami catat ya.",
  "needs_owner_review": false
}
```

Backend validation:

- Match `menu_name` against Menu table.
- Use Menu.price from DB.
- Use RecipeItem for ingredient calculation.
- If menu not found, set `needs_owner_review=true`.
- If confidence below threshold, do not auto-confirm.

## 8. WhatsApp Integration Levels

| Level | Description | MVP? |
|---|---|---|
| Level 1 | Mock WhatsApp UI in app | Yes |
| Level 2 | n8n webhook simulation | Optional |
| Level 3 | Twilio/Meta sandbox | Optional if stable |
| Level 4 | Meta WhatsApp Cloud API production | Roadmap |

## 9. Payment Reminder Design

MVP:

- QRIS dummy image.
- Payment status: `UNPAID`, `WAITING_CONFIRMATION`, `PAID`.
- Reminder preview message.
- No real transaction.
- No settlement.
- No financial claim.

Reminder example:

> “Halo Kak Dinda, pesanan 12 Risol Mayo sudah tercatat. Total Rp60.000. Jika sudah siap, pembayaran bisa melalui QRIS berikut. Terima kasih 🙏”

## 10. Deployment Plan

MVP deployment priority:

1. Local stable.
2. Vercel app deploy.
3. Supabase DB.
4. Environment variables in Vercel.
5. Fallback video.

Bonus:

- Railway optional if backend separated.
- Google Cloud Run/Cloud SQL as roadmap or bonus technical slide.

## 11. Security and Privacy Plan

MVP principles:

- Use dummy data for demo.
- Do not store unnecessary customer data.
- No real payment data.
- No customer location precise.
- No broadcast without opt-in.
- Do not expose API keys.
- Do not commit `.env`.

Production principles:

- Data minimization.
- Consent management.
- Role-based access.
- Audit logs.
- Deletion/export customer data.
- Secure secret management.

## 12. Testing Plan

Manual tests:

- Health API returns success.
- Seed data exists.
- Mock WhatsApp can parse main chat.
- AI fallback works.
- Low-confidence chat marked review.
- Owner can approve order.
- Payment reminder preview appears.
- Production planner calculates ingredients.
- Daily summary appears.
- Impact dashboard uses safe metrics.

## 13. Observability / Logging Plan

MVP:

- Console logs in dev.
- NotificationLog for reminders.
- Store raw AI parser result for debug.
- Error toast in UI.

Production roadmap:

- Structured logging.
- Cloud Logging.
- Error tracking.
- AI parser audit.
- Webhook delivery logs.

## 14. Roadmap SaaS

- Multi-tenant business accounts.
- Staff roles.
- Subscription plans.
- Usage limits by monthly order.
- WhatsApp Cloud API setup wizard.
- Customer opt-in lists.
- Analytics.
- Export reports.

## 15. Roadmap Community Sourcing

Goal: use aggregated ingredient needs to suggest belanja bareng.

Not MVP because it needs:

- Supplier data.
- Area/community validation.
- Payment flow.
- Fulfilment model.
- Cancellation handling.
- Trust mechanism.

## 16. Roadmap Rescue Sale

Goal: allow opt-in customers to receive limited offers for safe, still-worthy stock/menu slots.

Not MVP because it needs:

- Consent.
- Food safety framing.
- Stock accuracy.
- Anti-spam controls.
- Clear opt-out.

## 17. Migration from Mock to Real WhatsApp

Steps:

1. Keep mock UI as test harness.
2. Add webhook endpoint.
3. Test with n8n.
4. Test with sandbox number.
5. Add consent/opt-in.
6. Add message template handling.
7. Add retry/logging.
8. Roll out to pilot merchant.

## 18. Migration from Dummy QRIS to Real Payment

Do not implement in MVP.

Roadmap steps:

1. Keep merchant-owned QRIS static.
2. Let owner manually mark paid.
3. Explore payment gateway sandbox.
4. Add payment status callback only after compliance review.
5. Never hold funds unless licensed/partnered.

## 19. Production Risks

| Risk | Mitigation |
|---|---|
| WhatsApp policy | Opt-in, template compliance, logs |
| AI hallucination | Structured output + validation + owner approval |
| Data privacy | Minimize data, consent, deletion |
| Payment regulation | Reminder only until proper partner |
| Owner onboarding | Start with 3 menu templates |
| Scope creep | MVP boundary document |

## 20. Production Backlog

- Auth multi-tenant.
- Staff management.
- Real WhatsApp Cloud API.
- Customer consent.
- Webhook logs.
- Advanced reporting.
- Export PDF/CSV.
- Community sourcing pilot.
- Supplier admin dashboard.
- Rescue sale opt-in.
- Billing/subscription.
- Monitoring/logging.

## 21. Module Specs

### 21.1 Auth / Owner

| Field | Detail |
|---|---|
| Purpose | Mengidentifikasi owner bisnis |
| Data/entity | User |
| API | `/api/auth/*` optional; MVP bisa mock user |
| UI | Login/settings optional |
| Priority | P1 |
| MVP/Roadmap | MVP light |
| Acceptance criteria | Owner dummy dapat mengakses dashboard |
| Risks | Auth terlalu kompleks, potong untuk MVP |

### 21.2 Business Profile

| Field | Detail |
|---|---|
| Purpose | Menyimpan data usaha |
| Data/entity | Business |
| API | `/api/business` optional |
| UI | Settings |
| Priority | P1 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Nama usaha muncul di dashboard |
| Risks | Jangan overbuild profile |

### 21.3 Menu

| Field | Detail |
|---|---|
| Purpose | Validasi menu dan harga |
| Data/entity | Menu |
| API | `/api/menus` |
| UI | Menu page |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Menu dapat digunakan parser/order |
| Risks | AI tidak boleh mengarang menu |

### 21.4 Ingredient

| Field | Detail |
|---|---|
| Purpose | Bahan produksi |
| Data/entity | Ingredient |
| API | `/api/ingredients` |
| UI | Menu/resep page |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Ingredient muncul di planner |
| Risks | Jangan jadi full inventory |

### 21.5 RecipeItem

| Field | Detail |
|---|---|
| Purpose | Bahan per menu |
| Data/entity | RecipeItem |
| API | `/api/recipes` optional |
| UI | Menu detail |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Planner dapat menghitung bahan |
| Risks | Unit harus jelas |

### 21.6 Customer

| Field | Detail |
|---|---|
| Purpose | Data pelanggan order |
| Data/entity | Customer |
| API | included in order |
| UI | Order detail |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Customer name/phone muncul |
| Risks | Privacy, gunakan dummy data |

### 21.7 Order

| Field | Detail |
|---|---|
| Purpose | Core pesanan |
| Data/entity | Order |
| API | `/api/orders` |
| UI | Dashboard/order detail |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Order bisa dibuat, approved, status update |
| Risks | Status flow harus jelas |

### 21.8 OrderItem

| Field | Detail |
|---|---|
| Purpose | Item dalam pesanan |
| Data/entity | OrderItem |
| API | included in order |
| UI | Order detail |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Multiple item supported minimal |
| Risks | Simpan harga dari DB |

### 21.9 Payment

| Field | Detail |
|---|---|
| Purpose | Status pembayaran dummy |
| Data/entity | Payment |
| API | `/api/orders/:id/payment` |
| UI | Payment badge/reminder |
| Priority | P0 |
| MVP/Roadmap | MVP dummy |
| Acceptance criteria | Status unpaid/paid bisa tampil |
| Risks | Jangan real settlement |

### 21.10 NotificationLog

| Field | Detail |
|---|---|
| Purpose | Catat reminder |
| Data/entity | NotificationLog |
| API | `/api/notifications/payment-reminder` |
| UI | Order detail optional |
| Priority | P1 |
| MVP/Roadmap | MVP light |
| Acceptance criteria | Reminder dummy tercatat |
| Risks | Jangan broadcast spam |

### 21.11 DailySummary

| Field | Detail |
|---|---|
| Purpose | Rekap harian |
| Data/entity | DailySummary/generated |
| API | `/api/ai/daily-summary` |
| UI | Summary page |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Summary muncul dari order data |
| Risks | Jangan overclaim |

### 21.12 AI Parser

| Field | Detail |
|---|---|
| Purpose | Parse chat menjadi draft order |
| Data/entity | AI result, Order draft |
| API | `/api/ai/parse-order` |
| UI | Mock WhatsApp/parser result |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Main sample chat parsed correctly |
| Risks | Hallucination, wajib validation |

### 21.13 Production Planner

| Field | Detail |
|---|---|
| Purpose | Hitung bahan dari order aktual |
| Data/entity | Menu, RecipeItem, OrderItem |
| API | `/api/production-plan` |
| UI | Production page |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Ingredient needed calculated correctly |
| Risks | Jangan AI bebas menghitung |

### 21.14 Mock WhatsApp

| Field | Detail |
|---|---|
| Purpose | Demo-safe order intake |
| Data/entity | Raw chat |
| API | `/api/ai/parse-order` |
| UI | Mock WhatsApp screen |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | User can send chat and see parsed order |
| Risks | Jangan klaim real WA jika mock |

### 21.15 Roadmap Community Sourcing

| Field | Detail |
|---|---|
| Purpose | Vision belanja bareng |
| Data/entity | CommunitySuggestion future |
| API | None in MVP |
| UI | Roadmap card optional |
| Priority | P2 |
| MVP/Roadmap | Roadmap |
| Acceptance criteria | Jika tampil, label jelas simulation/roadmap |
| Risks | Operasional berat |

### 21.16 Roadmap Rescue Sale

| Field | Detail |
|---|---|
| Purpose | Vision rescue stock/menu opt-in |
| Data/entity | RescueOffer future |
| API | None in MVP |
| UI | Roadmap card optional |
| Priority | P2 |
| MVP/Roadmap | Roadmap |
| Acceptance criteria | Tidak diklaim berjalan penuh |
| Risks | Spam, makanan sisa, food safety |
