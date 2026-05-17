# Kuali — Asisten Operasional WhatsApp-First untuk UMKM Kuliner

> **Order rapi, produksi siap.**

Kuali membantu UMKM kuliner yang berjualan lewat WhatsApp mengubah chat pesanan menjadi draft order, reminder pembayaran, estimasi bahan, dan rekap produksi harian.

> **Ini adalah Phase 0.5 frontend prototype menggunakan dummy data saja.**
> Tidak ada backend nyata, database, AI API, WhatsApp API, atau payment settlement.

---

## Status Proyek

**PHASE 0.5 — High-Fidelity Frontend Prototype** ✅ Selesai

Phase 0 (Baseline Proposal) sudah di-freeze. Phase 0.5 adalah prototype Next.js 14 App Router berbasis dummy data, siap di-deploy ke Vercel tanpa konfigurasi tambahan.

---

## Cara Menjalankan (Lokal)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
npm run lint     # ESLint
```

Tidak ada file `.env` yang diperlukan. Tidak ada API key. Tidak ada database.

---

## Deploy ke Vercel

Lihat panduan lengkap: [docs/DEPLOYMENT_VERCEL.md](docs/DEPLOYMENT_VERCEL.md)

Ringkasan cepat:
1. Push repo ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import repo
3. Vercel auto-detect Next.js — tidak ada setting tambahan
4. **Jangan isi environment variables** — tidak ada yang dibutuhkan
5. Klik Deploy

---

## Route yang Tersedia

| Route | Halaman | Keterangan |
|---|---|---|
| `/` | Landing page | Tagline + CTA ke /demo |
| `/demo` | **Demo utama** | Alur parse → konfirmasi → produksi → rekap |
| `/dashboard` | Dashboard hari ini | Metrik + order terbaru + bottom nav |
| `/orders` | Daftar order | Filter tab: Semua / Dikonfirmasi / Draft / Perlu Cek / Belum Bayar |
| `/production` | Produksi planner | Estimasi bahan dari order dikonfirmasi |
| `/summary` | Rekap harian | Rekap + QRIS reminder + dampak + roadmap |

---

## Angka Kanonik Demo

| Metrik | Nilai |
|---|---|
| Total order hari ini | 11 |
| Dikonfirmasi | 5 |
| Draft / pending | 6 |
| Belum bayar | 4 — Rp 167.000 |
| Perlu dicek | 3 |
| Chat berhasil diparse | 13 dari 15 |

---

## Struktur Folder

```
kuali/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing /
│   │   ├── layout.tsx            # Root layout + Toaster
│   │   ├── globals.css
│   │   ├── demo/page.tsx         # Demo utama /demo
│   │   ├── dashboard/page.tsx    # /dashboard
│   │   ├── orders/page.tsx       # /orders
│   │   ├── production/page.tsx   # /production
│   │   └── summary/page.tsx      # /summary
│   ├── components/
│   │   └── kuali/
│   │       ├── AppShell.tsx      # Layout shell + PageHeader + SectionTitle
│   │       ├── BottomNav.tsx     # Tab navigasi bawah
│   │       ├── DemoNavigation.tsx
│   │       ├── ImpactDashboard.tsx
│   │       ├── MetricCard.tsx
│   │       ├── MockWhatsappChat.tsx
│   │       ├── OrderCard.tsx
│   │       ├── ParsedOrderCard.tsx
│   │       ├── PaymentReminderCard.tsx
│   │       ├── ProductionPlanCard.tsx
│   │       ├── RoadmapCard.tsx
│   │       └── StatusBadge.tsx
│   └── lib/
│       ├── constants.ts          # Teks aman narasi, label status
│       ├── dummy-data.ts         # Semua data demo (tidak ada API call)
│       ├── format.ts             # formatRupiah, formatWeight, dll
│       └── utils.ts              # cn() helper
├── public/
│   └── qris-dummy.svg            # QRIS dummy SVG untuk demo
├── docs/                         # Dokumen proposal & desain
├── data/                         # Data JSON referensi
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Tech Stack

| Layer | Pilihan |
|---|---|
| Framework | Next.js 14 App Router + TypeScript |
| Styling | Tailwind CSS (custom token kuali.\*) |
| Icons | Lucide React |
| Toast | Sonner |
| Utilities | clsx + tailwind-merge |
| Data | Dummy data lokal (dummy-data.ts) — tanpa API |
| Deploy | Vercel |

---

## Batas Scope (Wajib Dipatuhi)

Prototype ini **TIDAK** menggunakan dan **tidak boleh** ditambahkan:

- Backend nyata, database, Prisma, Supabase
- OpenAI API, Anthropic API, WhatsApp Cloud API
- QRIS payment settlement nyata
- Multi-tenant SaaS, native app, marketplace
- Inventory management penuh, POS/kasir

Jika ada fitur baru yang perlu ditambah, label sebagai **ROADMAP** dan jangan aktifkan CTA-nya.

---

## Narasi yang Tidak Boleh Muncul

- UMKM gaptek / tertinggal
- AI menggantikan admin
- Food waste pasti turun X%
- Profit pasti naik
- Semua stok sisa pasti laku
- QRIS settlement otomatis
- Broadcast otomatis ke pelanggan sekitar

---

## MVP Boundary

| Termasuk Prototype | Bukan Prototype (Roadmap) |
|---|---|
| Mock WhatsApp UI | Real WhatsApp Business Cloud API |
| Simulasi AI parser | ML prediction kompleks |
| Draft order + approval flow | Full POS / kasir |
| QRIS dummy reminder | QRIS settlement real |
| Order dashboard + filter | Full inventory management |
| Production planner | Community sourcing real |
| Daily summary + impact | Rescue sale otomatis |
| Roadmap card (labelled) | Marketplace, multi-tenant |

---

## Workflow

```
CHECK → DECIDE → IMPLEMENT → VERIFY → REPORT
```
