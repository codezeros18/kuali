# 11 — Mermaid Diagrams

> Dibuat: 2026-05-18
> Dibuat oleh: Claude Code — Technical Architect & Mermaid Diagram Specialist
> Sumber: 00_PROPOSAL_MASTER_KUALI.md, 04_HACKER_TECH_IMPLEMENTATION.md, 05_DIAGRAMS_AND_MOCKUP_PLAN.md, 99_FINAL_PROPOSAL_SUBMISSION.md
>
> **Cara preview:** Buka file ini di VS Code → install extension "Markdown Preview Mermaid Support" (bitnoop) atau "Mermaid Preview" (vstirbu) → tekan Ctrl+Shift+V untuk preview.
>
> **Cara export PNG/SVG:** Gunakan mermaid-js CLI (`npx -p @mermaid-js/mermaid-cli mmdc -i file.md -o diagram.png`) atau copy blok mermaid ke mermaid.live kemudian export.

---

## Daftar Diagram

| ID | Nama | Tipe | Prioritas | Status |
|---|---|---|---|---|
| DIA-01 | Use Case Diagram | flowchart TD | P0 | ✅ DONE |
| DIA-02 | Sequence: Chat Order → Draft Order | sequenceDiagram | P0 | ✅ DONE |
| DIA-03 | Sequence: Production Planner | sequenceDiagram | P0 | ✅ DONE |
| DIA-04 | System Architecture Diagram | flowchart TB | P0 | ✅ DONE |
| DIA-05 | Data Flow Diagram | flowchart TD | P1 | ✅ DONE |
| DIA-06 | Entity Relationship Diagram (ERD) | erDiagram | P0 | ✅ DONE |
| DIA-07 | Roadmap Architecture Diagram | flowchart LR | P2 | ✅ DONE |

---

## DIA-01 — Use Case Diagram

Menggambarkan aktor dan use case utama dalam sistem Kuali MVP.

```mermaid
flowchart TD
    subgraph Aktor
        Owner(["👤 Owner / Bu Rani"])
        AI(["🤖 Sistem AI"])
        Backend(["⚙️ Sistem Backend"])
    end

    subgraph UseCaseMVP["Use Case — MVP"]
        UC1["Pilih chat pesanan masuk"]
        UC2["Parse chat menjadi draft order"]
        UC3["Tampilkan confidence score\n& missing fields"]
        UC4["Review dan konfirmasi\natau tolak draft"]
        UC5["Kirim reminder pembayaran\nQRIS dummy"]
        UC6["Buka production planner"]
        UC7["Lihat daftar bahan\ndari order aktual"]
        UC8["Lihat daily summary\n& impact dashboard"]
    end

    Owner --> UC1
    Owner --> UC4
    Owner --> UC5
    Owner --> UC6
    Owner --> UC8

    UC1 --> AI
    AI --> UC2
    UC2 --> UC3
    UC3 --> UC4

    UC4 --> Backend
    Backend --> UC6
    UC6 --> UC7
    Backend --> UC8
```

**Catatan juri:** Owner selalu memegang kendali di UC4 — AI tidak pernah mengonfirmasi order secara otomatis.

---

## DIA-02 — Sequence Diagram: Chat Order → Draft Order

Menggambarkan alur dari pesan chat pelanggan masuk hingga owner mengonfirmasi order ke sistem.

```mermaid
sequenceDiagram
    participant Pelanggan as Pelanggan
    participant MockWA as Mock WhatsApp UI
    participant API as Kuali API
    participant AI as AI Parser
    participant DB as Database
    participant Owner as Owner / Bu Rani

    Pelanggan->>MockWA: Kirim pesan pesanan
    Note over MockWA: "Kak mau pesan 12 risol mayo<br/>buat besok jam 3. Atas nama Dinda."
    MockWA->>API: POST /api/ai/parse-order
    API->>AI: Teks chat mentah

    AI->>AI: Ekstrak nama, menu, qty,\ntanggal, metode bayar
    AI-->>API: Draft JSON + confidence score

    API->>DB: Validasi menu & harga
    DB-->>API: Data menu dari database bisnis

    API-->>MockWA: Draft order terstruktur
    MockWA-->>Owner: Tampilkan ParsedOrderCard\n(confidence, missing fields)

    alt Confidence tinggi (≥ 85%)
        Owner->>API: Konfirmasi order
    else Confidence sedang (60–84%)
        Owner->>API: Edit lalu konfirmasi
    else Confidence rendah (< 60%)
        Owner->>MockWA: Minta klarifikasi ke pelanggan
    end

    API->>DB: Simpan order dikonfirmasi
    DB-->>API: Order ID tersimpan
    API-->>MockWA: Status order: Confirmed
```

---

## DIA-03 — Sequence Diagram: Production Planner

Menggambarkan alur kalkulasi kebutuhan bahan dari order yang sudah dikonfirmasi.

```mermaid
sequenceDiagram
    participant Owner as Owner / Bu Rani
    participant Dashboard as Dashboard UI
    participant API as Kuali API
    participant OrderDB as Order Database
    participant RecipeDB as Recipe Database
    participant Planner as Production Planner

    Owner->>Dashboard: Buka halaman Production Planner
    Dashboard->>API: GET /api/production-plan?date=hari-ini
    API->>OrderDB: Ambil semua order confirmed hari ini
    OrderDB-->>API: Daftar order + OrderItem

    loop Untuk setiap OrderItem
        API->>RecipeDB: Hitung qty bahan = qty_order × qty_per_resep
        RecipeDB-->>API: Kebutuhan bahan per item
    end

    API->>API: Agregasi total kebutuhan\nper bahan (groupBy ingredient)
    API-->>Dashboard: Daftar bahan + total qty + status stok

    Dashboard-->>Owner: Tampilkan ingredient list\n(nama bahan, total, satuan, status cukup/kurang)

    Note over Owner,Dashboard: Owner bisa cetak atau screenshot\nuntuk panduan belanja bahan
```

---

## DIA-04 — System Architecture Diagram

Menggambarkan lapisan teknologi sistem Kuali dari client hingga database pada scope MVP.

```mermaid
flowchart TB
    subgraph Client["🖥️ Client Layer — Browser / Mobile"]
        NextJS["Next.js 14 App Router\nTypeScript + Tailwind CSS\nMobile-first PWA"]
    end

    subgraph APILayer["⚡ API Layer — Next.js API Routes"]
        ParseAPI["POST /api/ai/parse-order"]
        OrderAPI["GET/POST /api/orders\nPATCH /api/orders/:id/status\nPATCH /api/orders/:id/payment"]
        DashAPI["GET /api/dashboard"]
        PlanAPI["GET /api/production-plan"]
        NotifAPI["POST /api/notifications/payment-reminder"]
    end

    subgraph AILayer["🤖 AI Layer"]
        MockParser["Mock AI Parser\nRule-based — tanpa external API\n(Prototype MVP)"]
    end

    subgraph DBLayer["🗄️ Database Layer — Prisma ORM"]
        SQLite["SQLite\n(Development & Demo)"]
    end

    NextJS --> ParseAPI
    NextJS --> OrderAPI
    NextJS --> DashAPI
    NextJS --> PlanAPI
    NextJS --> NotifAPI

    ParseAPI --> MockParser
    MockParser --> DBLayer

    OrderAPI --> SQLite
    DashAPI --> SQLite
    PlanAPI --> SQLite
    NotifAPI --> SQLite
```

---

## DIA-05 — Data Flow Diagram

Menggambarkan alur data dari chat mentah masuk hingga output yang diterima owner (produksi, pembayaran, rekap).

```mermaid
flowchart TD
    P0(["Pelanggan"])
    O(["Owner / Bu Rani"])

    P0 -->|"Teks chat pesanan"| D1

    D1[/"Input: Raw Chat Text"/]
    D1 --> P1

    P1["AI Parser\nEkstraksi entitas dari teks"]
    P1 -->|"Draft JSON + confidence score"| D2

    D2[/"Draft Order\nnama, menu, qty, tanggal, bayar"/]
    D2 --> P2

    P2["Owner Review\nKonfirmasi / Edit / Tolak"]
    O -->|"Approve atau edit"| P2

    P2 -->|"Order dikonfirmasi"| DS1

    DS1[("Database\nOrder + OrderItem")]

    DS1 --> P3
    DS1 --> P4
    DS1 --> P5

    P3["Kalkulasi Bahan\nbahan = qty_order × qty_resep"]
    P3 -->|"Daftar bahan harian"| D3

    P4["Payment Reminder\nGenerate teks reminder + QRIS dummy"]
    P4 -->|"Draft reminder siap salin"| D4

    P5["Daily Summary\nRekap total order, bayar, produksi"]
    P5 -->|"Ringkasan hari ini"| D5

    D3[/"Production Planner Output"/]
    D4[/"Payment Reminder Draft"/]
    D5[/"Daily Summary Card"/]

    D3 --> O
    D4 --> O
    D5 --> O
```

---

## DIA-06 — Entity Relationship Diagram (ERD)

Menggambarkan relasi antar entitas database pada scope MVP Kuali.

```mermaid
erDiagram
    Business ||--o{ Menu : "punya"
    Business ||--o{ Ingredient : "punya"
    Business ||--o{ Customer : "melayani"
    Business ||--o{ Order : "menerima"
    Business ||--o{ DailySummary : "menghasilkan"

    Menu ||--o{ RecipeItem : "menggunakan"
    Ingredient ||--o{ RecipeItem : "dipakai_di"

    Customer ||--o{ Order : "memesan"

    Order ||--o{ OrderItem : "berisi"
    Order ||--o| Payment : "punya"
    Order ||--o{ NotificationLog : "menghasilkan"

    Menu ||--o{ OrderItem : "direferensikan_oleh"

    Business {
        string id
        string name
        string ownerName
        string phone
    }

    Menu {
        string id
        string name
        string unit
        number pricePerUnit
        boolean isActive
    }

    Ingredient {
        string id
        string name
        string unit
        number stockQty
    }

    RecipeItem {
        string id
        string menuId
        string ingredientId
        number qtyPerUnit
    }

    Customer {
        string id
        string name
        string phone
    }

    Order {
        string id
        string orderNumber
        string status
        string paymentStatus
        number totalAmount
        number confidenceScore
        string missingFields
        string rawMessage
        datetime deliveryDate
        datetime createdAt
        datetime approvedAt
    }

    OrderItem {
        string id
        string orderId
        string menuId
        number quantity
        number unitPrice
        number subtotal
    }

    Payment {
        string id
        string orderId
        string method
        string status
        number amount
        datetime paidAt
    }

    NotificationLog {
        string id
        string orderId
        string type
        string message
        datetime sentAt
    }

    DailySummary {
        string id
        string businessId
        date date
        number totalOrders
        number confirmedOrders
        number pendingOrders
        number unpaidAmount
    }
```

---

## DIA-07 — Roadmap Architecture Diagram

Menggambarkan evolusi arsitektur Kuali dari MVP prototype hingga visi roadmap. **Diagram ini hanya untuk menunjukkan arah pengembangan — bukan bagian MVP yang didemonstrasikan.**

```mermaid
flowchart LR
    subgraph MVP["🟢 MVP — Prototype Hackathon (Saat Ini)"]
        direction TB
        M1["Mock WhatsApp UI\n(Input manual chat)"]
        M2["Mock AI Parser\n(Rule-based, no external API)"]
        M3["SQLite Database\n(Dev & Demo)"]
        M4["QRIS Dummy Reminder\n(Teks siap salin, bukan gateway)"]
        M5["Production Planner\n(Kalkulasi dari resep)"]
        M6["Daily Summary\n(Rekap otomatis)"]
    end

    subgraph R1["🔵 Roadmap Fase 1 — Post-Hackathon"]
        direction TB
        R1A["WhatsApp Business Cloud API\n(Meta — webhook nyata)"]
        R1B["Real AI Parser\n(OpenAI / Anthropic structured output)"]
        R1C["Supabase PostgreSQL\n(Multi-tenant, scalable)"]
        R1D["Real QRIS / Payment Reminder\n(BI SNAP API — bukan settlement)"]
    end

    subgraph R2["🟣 Roadmap Fase 2 — Skala"]
        direction TB
        R2A["Community Sourcing\n(Opt-in supplier pooling)"]
        R2B["Rescue Sale\n(Consent-based flash sale)"]
        R2C["Multi-Staff Access\n(Autentikasi multi-akun)"]
        R2D["SaaS Subscription\n(Freemium → Pro plan)"]
    end

    MVP -->|"Validasi product-market fit\npost-hackathon"| R1
    R1 -->|"Traction & revenue\nvalidation"| R2

    style MVP fill:#d4edda,stroke:#28a745,color:#000
    style R1 fill:#cce5ff,stroke:#004085,color:#000
    style R2 fill:#e2d9f3,stroke:#6f42c1,color:#000
```

**Label wajib dalam proposal:** Fase 1 dan Fase 2 harus disebutkan sebagai *rencana pengembangan lanjutan*, bukan fitur yang tersedia dalam prototype hackathon.

---

## Catatan Syntax Mermaid

| Isu | Penjelasan | Mitigasi |
|---|---|---|
| `subgraph` dengan `direction` | Hanya didukung Mermaid ≥ 9.0. VS Code Mermaid extension umumnya sudah versi baru | Jika gagal render, hapus `direction TB` di dalam subgraph |
| Label dengan `\n` | Baris baru dalam node label — didukung di Mermaid ≥ 8.x | Jika gagal, ganti dengan label satu baris |
| `Note over` dengan `<br/>` | HTML dalam note — didukung oleh sebagian renderer | Jika gagal, ganti `<br/>` dengan spasi |
| ERD label dengan spasi | Mermaid ERD menggunakan `"label dalam kutip"` untuk relasi — sudah diterapkan | Pastikan tidak ada kutip tunggal dalam label |
| Emoji dalam node label | Didukung di sebagian renderer. Jika gagal di PDF, hapus emoji | Hapus karakter emoji jika renderer PDF tidak mendukung unicode |
| `style` di flowchart | Dipakai di DIA-07 untuk warna MVP/Roadmap | Jika renderer tidak mendukung, hapus baris `style` |

---

## Next Step: Export ke PNG/SVG

### Opsi 1 — Mermaid Live (tanpa install)
1. Buka [mermaid.live](https://mermaid.live)
2. Copy blok Mermaid (tanpa ` ```mermaid ` dan ` ``` `)
3. Paste ke editor kiri
4. Download PNG atau SVG dari tombol Actions

### Opsi 2 — CLI (untuk batch export)
```bash
npm install -g @mermaid-js/mermaid-cli
mmdc -i 11_MERMAID_DIAGRAMS.md -o diagrams/ -e png
```
Ini akan mengekstrak semua blok Mermaid dan mengekspornya sebagai file PNG terpisah.

### Opsi 3 — VS Code Screenshot
1. Buka preview (Ctrl+Shift+V)
2. Klik kanan diagram → Save image
3. Atau screenshot dan crop dengan Snipping Tool (Win+Shift+S)

### Untuk proposal PDF
- Export semua 7 diagram sebagai PNG
- Sisipkan di Bab 4 (Teknologi & Implementasi) untuk DIA-01 hingga DIA-06
- DIA-07 Roadmap sisipkan di Bab 5 (Kesimpulan & Roadmap)
- Lampiran B dapat berisi semua diagram dalam resolusi tinggi

---

## Laporan Status

| Item | Status |
|---|---|
| DIA-01 Use Case | ✅ Dibuat — flowchart TD, aktor dan UC jelas |
| DIA-02 Sequence Chat→Order | ✅ Dibuat — confidence score branching ada |
| DIA-03 Sequence Production Planner | ✅ Dibuat — loop kalkulasi bahan per item ada |
| DIA-04 System Architecture | ✅ Dibuat — API routes spesifik, no roadmap items |
| DIA-05 Data Flow Diagram | ✅ Dibuat — external entity, proses, data store |
| DIA-06 ERD | ✅ Dibuat — 10 entitas, field detail untuk Order/Menu/Ingredient |
| DIA-07 Roadmap Architecture | ✅ Dibuat — 3 fase dengan warna berbeda, label eksplisit |
| File app code diubah | ✅ Tidak ada — hanya docs/ |
| Scope MVP terjaga | ✅ Roadmap hanya di DIA-07 dengan label jelas |
