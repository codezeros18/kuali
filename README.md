# Kuali — Order rapi, produksi siap.

Asisten operasional WhatsApp-first untuk UMKM kuliner Indonesia.  
**Prototipe MVP · Data Simulasi · Gunadarma Code Week 2.0**

---

## Prasyarat

Pastikan sudah terinstall sebelum mulai:

| Tool | Versi minimum | Cek dengan |
|---|---|---|
| **Node.js** | 18.x atau lebih baru | `node --version` |
| **npm** | 9.x atau lebih baru | `npm --version` |
| **Git** | sembarang versi | `git --version` |

> Belum ada Node.js? Download di **[nodejs.org](https://nodejs.org)** — pilih versi **LTS**.

---

## Setup Pertama Kali (setelah clone)

Jalankan langkah-langkah ini **secara berurutan**, satu kali saat pertama setup.

### 1. Clone repository

```bash
git clone https://github.com/codezeros18/kuali.git
cd kuali
```

### 2. Install semua dependencies

```bash
npm install
```

### 3. Buat file `.env`

Buat file baru bernama `.env` di folder root (sejajar dengan `package.json`).  
Isi dengan teks berikut persis seperti ini:

```env
DATABASE_URL="file:./dev.db"
USE_MOCK_AI="true"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

> ⚠️ Jangan ubah nilainya. Isi default ini sudah benar untuk development lokal.  
> ⚠️ File `.env` **tidak masuk ke Git** (sudah ada di `.gitignore`) — jadi setiap anggota tim harus membuatnya sendiri.

### 4. Generate Prisma Client

```bash
npm run db:generate
```

Perintah ini membuat file client yang dibutuhkan Prisma untuk berkomunikasi dengan database.

### 5. Buat database dan semua tabel

```bash
npm run db:push
```

Ini akan membuat file `dev.db` (SQLite) secara otomatis.

### 6. Isi database dengan data dummy

```bash
npm run db:seed
```

Output yang muncul kalau berhasil:

```
Seeding Kuali MVP database...
✅ Seeding complete.
```

Data yang diisi: 1 bisnis, 8 menu, 12 bahan, resep, 11 pesanan hari ini, dan pembayaran.

### 7. Jalankan development server

```bash
npm run dev
```

Buka browser → **http://localhost:3000** 🎉

---

## Halaman yang Tersedia

| URL | Halaman | Keterangan |
|---|---|---|
| `/` | Landing page | Tagline + CTA |
| `/about` | Company profile | Profil produk Kuali lengkap |
| `/demo` | Demo alur | Chat → parse AI → konfirmasi → produksi → rekap |
| `/dashboard` | Dashboard harian | Metrik hari ini + daftar order terbaru |
| `/orders` | Daftar pesanan | Filter: Semua / Dikonfirmasi / Draft / Perlu Cek / Belum Bayar |
| `/orders/[id]` | Detail pesanan | Info order, konfirmasi, pembayaran |
| `/production` | Rencana produksi | Estimasi bahan dari order dikonfirmasi |
| `/summary` | Rekap harian | Ringkasan + payment reminder + roadmap |

---

## Perintah yang Tersedia

```bash
# Jalankan development server
npm run dev

# Build production (wajib 0 error sebelum push)
npm run build

# Generate ulang Prisma Client (jalankan setelah ubah schema.prisma)
npm run db:generate

# Buat/update tabel database dari schema
npm run db:push

# Isi ulang data dummy (tidak hapus schema)
npm run db:seed

# Reset total: hapus semua data + seed ulang
npm run db:reset

# Lihat isi database lewat UI browser (port 5555)
npm run db:studio
```

---

## Angka Kanonik Demo

Angka-angka ini harus selalu konsisten di seluruh halaman:

| Metrik | Nilai |
|---|---|
| Total order hari ini | **11** |
| Dikonfirmasi | **5** |
| Draft / pending | **3** |
| Perlu dicek (confidence rendah) | **3** |
| Order belum bayar | **4 order — Rp 167.000** |
| Chat berhasil diparse | **13 dari 15** |

---

## Troubleshooting

### ❌ `Cannot find module '@prisma/client'`

Prisma client belum di-generate. Jalankan:

```bash
npm run db:generate
```

---

### ❌ `Error: No such file or directory 'dev.db'` atau tabel tidak ada

Database belum dibuat. Jalankan langkah 5 dan 6:

```bash
npm run db:push
npm run db:seed
```

---

### ❌ Dashboard menampilkan angka salah atau data kosong

Data mungkin kotor atau seed belum jalan. Reset total:

```bash
npm run db:reset
```

> Perintah ini menghapus semua data lama dan mengisi ulang data dummy dari awal.

---

### ❌ `EPERM: operation not permitted` saat install atau generate

Ada proses Node.js lain yang masih berjalan dan mengunci file (biasanya sisa `npm run dev` yang belum ditutup).

Tutup semua terminal yang menjalankan `npm run dev`, lalu:

```bash
# Windows PowerShell
taskkill /F /IM node.exe
npm run db:generate
```

---

### ❌ Port 3000 sudah dipakai

```bash
npx next dev -p 3001
```

Buka: http://localhost:3001

---

## Struktur Folder

```
kuali/
├── src/
│   ├── app/                        # Semua halaman (Next.js App Router)
│   │   ├── page.tsx                # Landing /
│   │   ├── about/page.tsx          # Company profile /about
│   │   ├── dashboard/page.tsx      # Dashboard /dashboard
│   │   ├── demo/page.tsx           # Demo flow /demo
│   │   ├── orders/
│   │   │   ├── page.tsx            # Daftar order /orders
│   │   │   └── [id]/page.tsx       # Detail order /orders/:id
│   │   ├── production/page.tsx     # Produksi /production
│   │   ├── summary/page.tsx        # Rekap /summary
│   │   └── api/                    # API Routes (backend)
│   │       ├── dashboard/
│   │       ├── orders/
│   │       ├── production-plan/
│   │       ├── menus/
│   │       ├── ingredients/
│   │       ├── ai/parse-order/
│   │       └── notifications/
│   ├── components/
│   │   └── kuali/                  # Semua komponen UI
│   │       ├── AppShell.tsx        # Layout utama (sidebar + mobile nav)
│   │       ├── MockWhatsappChat.tsx
│   │       ├── ParsedOrderCard.tsx
│   │       ├── PaymentReminderCard.tsx
│   │       ├── ProductionPlanCard.tsx
│   │       ├── ImpactDashboard.tsx
│   │       ├── RoadmapCard.tsx
│   │       ├── OrderCard.tsx
│   │       ├── MetricCard.tsx
│   │       └── StatusBadge.tsx
│   └── lib/
│       ├── dummy-data.ts           # Data statis (fallback jika API gagal)
│       ├── constants.ts            # Teks & konstanta app
│       ├── ai-parser.ts            # Mock AI parser (tanpa API eksternal)
│       ├── prisma.ts               # Prisma client singleton
│       ├── format.ts               # formatRupiah, formatWeight
│       └── utils.ts                # cn() helper
├── prisma/
│   ├── schema.prisma               # Skema database (SQLite)
│   └── seed.ts                     # Script data dummy
├── .env                            # ⚠️ Buat manual, tidak ada di Git
├── .env.example                    # Template .env (kalau ada)
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## Deploy ke Vercel

Untuk melihat di Vercel tanpa database cloud (UI pakai dummy data):

**Build Command** (override di Vercel settings):
```
prisma generate && next build
```

**Environment Variables** yang perlu diisi di Vercel:

| Key | Value |
|---|---|
| `DATABASE_URL` | `file:./dev.db` |
| `USE_MOCK_AI` | `true` |

> Dengan setup ini, semua halaman tampil via dummy data. API database akan gagal silently dan frontend otomatis fallback ke data statis.

---

## Untuk Tim Redesign

Kalau tugasmu adalah **redesign visual/tampilan saja**, ini batasannya:

**✅ Boleh diubah:**
- `tailwind.config.ts` — warna, font, spacing, shadow, border-radius
- `src/app/globals.css` — CSS variables, utility classes, animasi
- Semua `className` di file `.tsx` — styling Tailwind saja

**❌ Jangan disentuh:**
- `prisma/` — schema & seed
- `src/lib/` — semua file (dummy-data, constants, ai-parser, prisma, format, utils)
- `src/app/api/` — semua API routes
- Semua teks konten dalam Bahasa Indonesia
- Semua angka (11 order, Rp 167.000, 13/15 chat, dll)
- Semua logika JavaScript (useEffect, fetch, event handler)

Wajib jalankan `npm run build` setelah semua perubahan — harus **0 error**.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS + custom design tokens |
| Database | SQLite via Prisma ORM |
| Icons | Lucide React |
| Toast | Sonner |
| AI Parser | Mock rule-based (tanpa API eksternal) |
| Deploy | Vercel |

---

> **Prototipe MVP** — semua data adalah simulasi. Tidak ada transaksi nyata, tidak ada WhatsApp asli, tidak ada QRIS aktif.
