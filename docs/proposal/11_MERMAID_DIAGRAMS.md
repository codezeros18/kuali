# 11 — Mermaid Diagrams

> **Diperbarui:** 2026-05-23
> **Dibuat oleh:** Claude Code — Technical Architect & Mermaid Diagram Specialist
> **Sumber:** 00_PROPOSAL_MASTER_KUALI.md · 04_HACKER_TECH_IMPLEMENTATION.md · 07_SCOPE_PURGE_AND_SIMPLIFICATION_REPORT.md · 99_FINAL_PROPOSAL_SUBMISSION.md
>
> **Cara preview:** Buka di VS Code → install "Markdown Preview Mermaid Support" (bitnoop) → Ctrl+Shift+V.
>
> **Cara export PNG/SVG:** `npx -p @mermaid-js/mermaid-cli mmdc -i 11_MERMAID_DIAGRAMS.md -o diagrams/ -e png`
> Atau copy blok ke [mermaid.live](https://mermaid.live) → Actions → Download SVG/PNG.
>
> **File .mmd tersedia di:** `docs/proposal/diagrams/` — satu file per diagram untuk batch export.

---

## Daftar Diagram

| ID | Nama | Tipe | Scope | Prioritas | Status |
|---|---|---|---|---|---|
| DIA-01 | Use Case Diagram | flowchart TD | MVP Saat Ini | P0 | ✅ DONE |
| DIA-02 | Sequence: Chat Order → Draft Order | sequenceDiagram | MVP Saat Ini | P0 | ✅ DONE |
| DIA-03 | Sequence: Production Planner | sequenceDiagram | MVP Saat Ini | P0 | ✅ DONE |
| DIA-04 | System Architecture | flowchart TB | MVP Saat Ini | P0 | ✅ DONE |
| DIA-05 | Data Flow Diagram | flowchart TD | MVP Saat Ini | P1 | ✅ DONE |
| DIA-06 | Simplified ERD — Konseptual | erDiagram | MVP Saat Ini | P0 | ✅ DONE |
| DIA-07 | Roadmap Architecture | flowchart LR | Roadmap Saja | P2 | ✅ DONE |

---

# BAGIAN A — Diagram MVP Saat Ini

> Semua diagram di bagian ini menggambarkan **prototype hackathon yang berjalan sekarang**.
> Stack aktual: Next.js 14 · SQLite (Prisma ORM) · Mock WhatsApp UI · Mock AI Parser (rule-based).
> Tidak ada Supabase, GCP, WhatsApp Cloud API, atau n8n dalam prototype saat ini.

---

## DIA-01 — Use Case Diagram

**Tujuan:** Menggambarkan semua aktor dan interaksi utama dalam sistem Kuali MVP.
**Scope:** Prototype hackathon — saat ini.
**Catatan juri:** Owner selalu memegang kendali di UC4. AI tidak pernah mengonfirmasi order secara otomatis.

```mermaid
flowchart TD
    Pelanggan(["👤 Pelanggan"])
    Owner(["🧑‍🍳 Owner / Bu Rani"])
    Admin(["👨‍👩‍👧 Admin / Keluarga"])
    AIParser(["🤖 AI Parser\n(Rule-based · Mock)"])
    KualiSys(["⚙️ Sistem Kuali\n(Next.js + SQLite)"])

    subgraph UseCaseMVP["🟢 Use Case — MVP Saat Ini"]
        UC0["Kirim chat pesanan\n(Mock WA UI)"]
        UC1["Input & pilih chat\npesanan masuk"]
        UC2["Parse chat menjadi\ndraft order terstruktur"]
        UC3["Tampilkan confidence score\n& missing fields"]
        UC4["Review dan konfirmasi\natau tolak draft order"]
        UC5["Kirim reminder pembayaran\n(QRIS dummy — teks siap salin)"]
        UC6["Buka production planner"]
        UC7["Lihat daftar bahan\ndari order aktual hari ini"]
        UC8["Lihat daily summary\n& impact dashboard"]
    end

    Pelanggan -->|"Kirim pesan pesanan"| UC0
    UC0 -->|"Chat masuk ke owner"| UC1

    Owner --> UC1
    Admin --> UC1
    Owner --> UC4
    Owner --> UC5
    Owner --> UC6
    Owner --> UC8

    UC1 --> AIParser
    AIParser --> UC2
    UC2 --> UC3
    UC3 --> UC4

    UC4 --> KualiSys
    KualiSys --> UC6
    UC6 --> UC7
    KualiSys --> UC8
```

---

## DIA-02 — Sequence Diagram: Chat Order → Draft Order

**Tujuan:** Menggambarkan alur dari pesan chat pelanggan masuk hingga owner mengonfirmasi order.
**Scope:** MVP — prototype. Storage menggunakan SQLite lokal, AI menggunakan mock rule-based parser.

```mermaid
sequenceDiagram
    participant Pelanggan as Pelanggan
    participant MockWA as Mock WhatsApp UI
    participant API as Kuali API (Next.js)
    participant AI as AI Parser (Rule-based)
    participant DB as Prototype Storage (SQLite)
    participant Owner as Owner / Bu Rani

    Pelanggan->>MockWA: Kirim pesan pesanan
    Note over MockWA: "Kak mau pesan 12 risol mayo<br/>buat besok jam 3. Atas nama Dinda."
    MockWA->>API: POST /api/ai/parse-order
    API->>AI: Teks chat mentah

    AI->>AI: Ekstrak nama, menu, qty,<br/>tanggal, metode bayar
    AI-->>API: Draft JSON + confidence score

    API->>DB: Validasi menu & harga dari data bisnis
    DB-->>API: Data menu dari prototype storage

    API-->>MockWA: Draft order terstruktur
    MockWA-->>Owner: Tampilkan ParsedOrderCard<br/>(confidence, missing fields)

    alt Confidence tinggi (≥ 85%)
        Owner->>API: Konfirmasi order langsung
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

**Tujuan:** Menggambarkan kalkulasi kebutuhan bahan dari order yang sudah dikonfirmasi.
**Scope:** MVP — semua kalkulasi dilakukan dari resep yang tersimpan di prototype storage (SQLite). Bukan estimasi AI.

```mermaid
sequenceDiagram
    participant Owner as Owner / Bu Rani
    participant Dashboard as Dashboard UI (Next.js)
    participant API as Kuali API (Next.js)
    participant OrderDB as Order Store (SQLite)
    participant RecipeDB as Recipe Store (SQLite)
    participant Planner as Production Planner

    Owner->>Dashboard: Buka halaman Production Planner
    Dashboard->>API: GET /api/production-plan?date=hari-ini
    API->>OrderDB: Ambil semua order confirmed hari ini
    OrderDB-->>API: Daftar order + OrderItem

    loop Untuk setiap OrderItem
        API->>RecipeDB: Hitung qty bahan = qty_order × qty_per_resep
        RecipeDB-->>API: Kebutuhan bahan per item
    end

    API->>API: Agregasi total kebutuhan<br/>per bahan (groupBy ingredient)
    API-->>Dashboard: Daftar bahan + total qty + status stok

    Dashboard-->>Owner: Tampilkan ingredient list<br/>(nama bahan, total, satuan, CUKUP/HAMPIR HABIS/PERLU BELI)

    Note over Owner,Dashboard: Owner bisa screenshot atau salin<br/>untuk panduan belanja bahan
```

---

## DIA-04 — System Architecture Diagram

**Tujuan:** Menggambarkan lapisan teknologi sistem Kuali dari client hingga storage pada scope MVP.
**Scope:** MVP — prototype saat ini. Tidak ada cloud database, tidak ada external API, tidak ada n8n.

```mermaid
flowchart TB
    subgraph Client["🖥️ Client Layer — Browser / Mobile"]
        NextJS["Next.js 14 App Router\nTypeScript + Tailwind CSS\nFramer Motion · Lucide React"]
    end

    subgraph APILayer["⚡ API Layer — Next.js API Routes"]
        ParseAPI["POST /api/ai/parse-order"]
        OrderAPI["GET /POST /api/orders\nPATCH /api/orders/:id/status\nPATCH /api/orders/:id/payment"]
        DashAPI["GET /api/dashboard"]
        PlanAPI["GET /api/production-plan"]
        NotifAPI["POST /api/notifications/payment-reminder"]
    end

    subgraph AILayer["🤖 AI Layer — Prototype"]
        MockParser["Mock AI Parser\nRule-based — tanpa external API\nKonfidence score dari heuristik"]
    end

    subgraph DBLayer["🗄️ Storage Layer — Prototype"]
        Prisma["Prisma ORM"]
        SQLite["SQLite\n(Development & Demo)\nDummy seed data"]
        Prisma --> SQLite
    end

    NextJS --> ParseAPI
    NextJS --> OrderAPI
    NextJS --> DashAPI
    NextJS --> PlanAPI
    NextJS --> NotifAPI

    ParseAPI --> MockParser
    MockParser --> Prisma

    OrderAPI --> Prisma
    DashAPI --> Prisma
    PlanAPI --> Prisma
    NotifAPI --> Prisma
```

---

## DIA-05 — Data Flow Diagram

**Tujuan:** Menggambarkan alur data dari chat mentah hingga output ke owner (produksi, pembayaran, rekap).
**Scope:** MVP — seluruh alur berjalan di prototype lokal. Tidak ada external service.

```mermaid
flowchart TD
    Pelanggan(["👤 Pelanggan"])
    Owner(["🧑‍🍳 Owner / Bu Rani"])

    Pelanggan -->|"Teks chat pesanan"| D1

    D1[/"Input: Raw Chat Text\n(Mock WA UI)"/]
    D1 --> P1

    P1["AI Parser — Rule-based\nEkstraksi entitas dari teks"]
    P1 -->|"Draft JSON + confidence score"| D2

    D2[/"Draft Order\nnama · menu · qty · tanggal · bayar"/]
    D2 --> P2

    P2["Owner Review\nKonfirmasi / Edit / Tolak"]
    Owner -->|"Approve atau edit"| P2

    P2 -->|"Order dikonfirmasi"| DS1

    DS1[("Prototype Storage\nSQLite via Prisma ORM")]

    DS1 --> P3
    DS1 --> P4
    DS1 --> P5

    P3["Kalkulasi Bahan\nbahan = qty_order × qty_resep"]
    P3 -->|"Daftar bahan harian"| D3

    P4["Payment Reminder\nGenerate teks + QRIS dummy\n(bukan gateway pembayaran)"]
    P4 -->|"Draft reminder siap salin"| D4

    P5["Daily Summary\nRekap total order, bayar, produksi"]
    P5 -->|"Ringkasan hari ini"| D5

    D3[/"Production Planner Output\n(ingredient list + status stok)"/]
    D4[/"Payment Reminder Draft\n(teks siap disalin ke WA)"/]
    D5[/"Daily Summary Card\n(metrik dampak harian)"/]

    D3 --> Owner
    D4 --> Owner
    D5 --> Owner
```

---

## DIA-06 — Simplified ERD — Model Konseptual

**Tujuan:** Menggambarkan tiga entitas konseptual utama dalam sistem Kuali MVP.
**Scope:** Model konseptual — disederhanakan untuk proposal. Skema Prisma lengkap tersedia di `prisma/schema.prisma`.
**Catatan:** Prototype menggunakan single-tenant — satu bisnis per instance. Tidak ada autentikasi multi-user.

```mermaid
erDiagram
    BusinessState ||--o{ OrderStore : "menerima pesanan"
    BusinessState ||--o{ InventoryEstimation : "menentukan resep bahan"
    OrderStore ||--|{ InventoryEstimation : "memicu kalkulasi"

    BusinessState {
        string namaUsaha
        string ownerName
        string menuAktif
        string resepBahan
        string modetampilan
    }

    OrderStore {
        string orderNumber
        string pelangganName
        string itemDipesan
        string statusOrder
        string statusPembayaran
        datetime tanggalKirim
        float confidenceScore
        string rawMessage
    }

    InventoryEstimation {
        date tanggalProduksi
        string namaBahan
        float totalQtyDibutuhkan
        string satuan
        string statusStok
    }
```

> **Keterangan status stok:** `CUKUP` · `HAMPIR HABIS` · `PERLU BELI`
> **Keterangan status order:** `PENDING` → `CONFIRMED` → `CANCELLED`
> **Keterangan status pembayaran:** `UNPAID` · `PARTIAL` · `PAID`

---

# BAGIAN B — Diagram Roadmap Masa Depan

> ⚠️ **BUKAN BAGIAN DEMO UTAMA.** Diagram ini menggambarkan arah pengembangan jangka panjang.
> Supabase, GCP, WhatsApp Cloud API, n8n, dan seluruh item di Roadmap Fase 1 & 2 **tidak tersedia** dalam prototype hackathon saat ini.
> Gunakan hanya untuk bagian Q&A juri atau Bab 5.2 Rencana Pengembangan dalam proposal.

---

## DIA-07 — Production Roadmap Architecture

**Tujuan:** Menggambarkan jalur pengembangan dari MVP ke sistem produksi penuh.
**Scope:** ROADMAP SAJA — bukan fitur saat ini.

```mermaid
flowchart LR
    subgraph MVP["🟢 MVP — Prototype Hackathon (Saat Ini)"]
        direction TB
        M1["Mock WhatsApp UI\n(Input manual chat)"]
        M2["Mock AI Parser\n(Rule-based · tanpa external API)"]
        M3["SQLite + Prisma ORM\n(Dev & Demo · dummy data)"]
        M4["QRIS Dummy Reminder\n(Teks siap salin · bukan gateway)"]
        M5["Production Planner\n(Kalkulasi dari resep lokal)"]
        M6["Daily Summary\n(Rekap otomatis)"]
    end

    subgraph R1["🔵 Roadmap Fase 1 — Post-Hackathon"]
        direction TB
        R1A["WhatsApp Business Cloud API\n(Meta · webhook nyata)"]
        R1B["Real AI Parser\n(OpenAI / Anthropic structured output)"]
        R1C["Supabase PostgreSQL\n(Multi-tenant · scalable)"]
        R1D["Real QRIS Payment Reminder\n(BI SNAP API · bukan settlement)"]
        R1E["Auth Multi-tenant\n(Owner + staff access)"]
    end

    subgraph R2["🟣 Roadmap Fase 2 — Skala"]
        direction TB
        R2A["Community Sourcing\n(Opt-in supplier pooling)"]
        R2B["Rescue Sale\n(Consent-based flash sale)"]
        R2C["GCP Cloud Run\n(Production deployment)"]
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

# Catatan Teknis Mermaid

| Isu | Penjelasan | Mitigasi |
|---|---|---|
| `subgraph` dengan `direction` | Hanya didukung Mermaid ≥ 9.0 | Jika gagal render, hapus `direction TB` di dalam subgraph |
| Label dengan `\n` | Baris baru dalam node label — Mermaid ≥ 8.x | Jika gagal, ganti dengan label satu baris |
| `Note over` dengan `<br/>` | HTML dalam note — didukung sebagian renderer | Jika gagal, ganti `<br/>` dengan spasi |
| Emoji dalam node label | Didukung sebagian renderer | Hapus emoji jika renderer PDF tidak mendukung unicode |
| `style` di flowchart | Dipakai di DIA-07 untuk warna zona | Hapus baris `style` jika renderer tidak mendukung |

---

# Cara Export PNG/SVG

### Opsi 1 — Mermaid Live (tanpa install, tercepat)
1. Buka [mermaid.live](https://mermaid.live)
2. Copy blok Mermaid (tanpa ` ```mermaid ` dan ` ``` `)
3. Paste ke editor kiri → Download PNG atau SVG dari tombol Actions

### Opsi 2 — CLI (batch export semua diagram sekaligus)
```bash
npx -p @mermaid-js/mermaid-cli mmdc \
  -i docs/proposal/11_MERMAID_DIAGRAMS.md \
  -o docs/proposal/diagrams/ \
  -e png \
  --backgroundColor white
```
Output: `docs/proposal/diagrams/11_MERMAID_DIAGRAMS-1.png` hingga `-7.png`

### Opsi 3 — Export per diagram via .mmd files
File .mmd sudah tersedia di `docs/proposal/diagrams/`:
```bash
npx -p @mermaid-js/mermaid-cli mmdc -i docs/proposal/diagrams/01_use_case_mvp.mmd -o docs/proposal/diagrams/01_use_case_mvp.png -e png --backgroundColor white
```

### Opsi 4 — VS Code Preview + Screenshot
1. Ctrl+Shift+V untuk preview
2. Klik kanan diagram → Save image, atau Snipping Tool (Win+Shift+S)

### Untuk proposal PDF
- Export DIA-01 hingga DIA-06 sebagai PNG → sisipkan di Bab 4 (Teknologi & Implementasi)
- Export DIA-07 sebagai PNG → sisipkan di Bab 5.2 (Rencana Pengembangan)
- Lampiran B: semua 7 diagram resolusi tinggi

> **Catatan re-rendering:** File SVG di `docs/proposal/` (`11_MERMAID_DIAGRAMS_rendered-*.svg`) dibuat dari versi sebelumnya dan perlu di-render ulang setelah revisi ini.

---

# Laporan Status

| Item | Status |
|---|---|
| DIA-01 Use Case | ✅ Diperbarui — ditambahkan aktor Pelanggan, Admin/Keluarga, Sistem Kuali |
| DIA-02 Sequence Chat→Order | ✅ Diperbarui — DB label: "Prototype Storage (SQLite)" |
| DIA-03 Sequence Production Planner | ✅ Diperbarui — DB labels: "Order Store" & "Recipe Store (SQLite)" |
| DIA-04 System Architecture | ✅ Bersih — tidak ada perubahan diperlukan |
| DIA-05 Data Flow Diagram | ✅ Bersih — tidak ada perubahan diperlukan |
| DIA-06 Simplified ERD | ✅ Diganti — model konseptual 3-entitas (BusinessState / OrderStore / InventoryEstimation) |
| DIA-07 Roadmap Architecture | ✅ Diperbarui — ditambahkan R1E (Auth Multi-tenant), warning diperkuat |
| Scope MVP terjaga | ✅ Supabase/GCP/WhatsApp API/n8n hanya di DIA-07 Bagian B |
| .mmd files | ✅ Dibuat di `docs/proposal/diagrams/` — 7 file |
| SVG files existing | ⚠️ Perlu di-render ulang — versi lama di `docs/proposal/*.svg` |
