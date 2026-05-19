# Outline Proposal — Kuali

> Dokumen ini adalah bagian dari Phase 0 Baseline Proposal Kuali.
> Outline ini siap dipindahkan ke template proposal resmi hackathon.
> Semua konten dalam Bahasa Indonesia.

---

## Struktur Proposal

### Bagian 1 — Identitas Proyek

| Field | Isi |
|---|---|
| Nama Produk | Kuali |
| Tagline | Order rapi, produksi siap. |
| Subtema | Food & Culinary Business Tech |
| Kategori | Teknologi untuk UMKM Kuliner |
| Tim | [nama anggota tim] |

---

### Bagian 2 — Problem Statement

**Judul:** Proses Operasional di Balik Chat WhatsApp Masih Manual

**Narasi:**

Banyak UMKM kuliner sudah aktif berjualan lewat WhatsApp — bukan karena terpaksa, tapi karena memang di sanalah pelanggan mereka berada. WhatsApp adalah kanal jualan yang sudah berjalan, sudah dipahami, dan sudah punya basis pelanggan.

Tantangannya bukan bahwa mereka belum digital. Tantangannya ada di proses operasional **setelah chat masuk**:

- Pesanan tersebar di banyak chat dan mudah tercecer
- Status pembayaran harus dicek satu per satu
- Kebutuhan bahan produksi dihitung pakai perkiraan
- Tidak ada rekap harian yang otomatis
- Owner sering mengurus semuanya tanpa admin khusus

**Dampak nyata:**
- Order terlewat → pelanggan kecewa
- Lupa tagih → arus kas terganggu
- Bahan kurang/berlebih → biaya produksi tidak efisien
- Rekap manual → waktu habis di administrasi

**Framing aman:**
> UMKM kuliner ini sudah aktif berdigital. Kuali hadir bukan untuk mengajari cara berjualan, tapi untuk membantu merapikan proses yang sudah berjalan setiap hari.

---

### Bagian 3 — Solution Statement

**Judul:** Kuali — Asisten Operasional WhatsApp-First untuk UMKM Kuliner

**Narasi:**

Kuali membantu owner UMKM kuliner mengubah chat pesanan menjadi draft order yang bisa dicek, menandai status pembayaran, memberi reminder QRIS dummy, menghitung kebutuhan bahan dari resep sederhana, dan membuat rekap produksi harian.

**Cara kerja ringkas:**
1. Chat pelanggan masuk → Kuali membaca dan membuat draft order
2. Owner cek draft, edit jika perlu, lalu approve
3. Order masuk dashboard, reminder QRIS dummy siap dikirim
4. Production planner otomatis hitung bahan dari order aktual
5. Daily summary dibuat di akhir hari

**Prinsip utama:**
- AI hanya membuat draft — owner tetap pegang kendali
- Tidak perlu install app baru di sisi customer
- Berjalan di atas kebiasaan yang sudah ada (WhatsApp)

---

### Bagian 4 — Target Pengguna

**Persona Utama:** Bu Rani (lihat `USER_PERSONA.md`)

**Segmen target:**
- Catering rumahan
- Nasi box / nasi kotak pre-order
- Snack box
- Bakery rumahan
- Dessert box
- Frozen food rumahan
- Kopi literan
- Pre-order makanan rumahan

**Karakteristik umum:**
- Sudah aktif pakai WhatsApp untuk jualan
- Volume 10–100 order/hari
- Tidak punya admin khusus
- Android mid-low, mobile-first

---

### Bagian 5 — Fitur MVP

| Fitur | Deskripsi |
|---|---|
| Mock WhatsApp UI | Simulasi chat pesanan masuk |
| AI Order Parser | Chat → draft order JSON terstruktur |
| Confidence Score | Indikator kepercayaan hasil parsing |
| Missing Field Detector | Deteksi field yang belum lengkap |
| Owner Approval | Draft → Konfirmasi oleh owner |
| Order Dashboard | Daftar dan status semua order |
| QRIS Dummy Reminder | Preview reminder pembayaran (bukan settlement) |
| Production Planner | Kebutuhan bahan dari order aktual × resep |
| Daily Summary | Rekap order, unpaid, perlu cek, bahan |
| Impact Dashboard | Metrik operasional dummy (tidak overclaim) |

---

### Bagian 6 — Non-Goals MVP (Roadmap)

Fitur berikut adalah **roadmap** dan tidak termasuk MVP:

| Fitur | Posisi |
|---|---|
| Real WhatsApp Business Cloud API | Roadmap Phase 2 |
| QRIS settlement real | Roadmap |
| Community sourcing / belanja bareng | Roadmap Phase 3 (berbasis consent) |
| Rescue sale otomatis | Roadmap Phase 3 |
| Full POS / inventory | Bukan arah produk |
| Marketplace | Bukan arah produk |
| Multi-tenant SaaS | Roadmap jangka panjang |
| ML prediction kompleks | Roadmap |

---

### Bagian 7 — Arsitektur Teknis Baseline

Lihat `BASELINE_ARCHITECTURE.md` untuk diagram lengkap.

**Ringkasan:**
- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui (mobile-first)
- Supabase PostgreSQL + Prisma ORM
- AI: OpenAI / Anthropic (mock-first untuk demo)
- WhatsApp: mock UI
- QRIS: dummy reminder only
- Deploy: Vercel

---

### Bagian 8 — Demo Flow

Lihat `DEMO_STORYBOARD.md` untuk storyboard lengkap.

**Ringkasan demo 3 menit:**
1. Problem: chat WhatsApp ramai dan berantakan
2. Chat masuk ke Kuali mock UI
3. AI parsing → draft order + confidence score
4. Owner approve
5. QRIS dummy reminder muncul
6. Production planner update
7. Daily summary
8. Closing

---

### Bagian 9 — Impact Metrics (Aman)

| Metrik | Cara Mengukur |
|---|---|
| Jumlah order berhasil diparse | Dari dummy chat / live demo |
| Jumlah order perlu cek | Confidence rendah / missing field |
| Jumlah order belum bayar | Payment status unpaid |
| Reminder terkirim | Notification log dummy |
| Estimasi bahan | Order aktual × resep |
| Daily summary dibuat | Sistem menghasilkan ringkasan |

**Klaim yang dihindari:**
- Profit naik pasti
- Food waste turun sekian persen
- Semua UMKM pasti terbantu
- Stok sisa pasti laku
- Harga bahan pasti lebih murah

---

### Bagian 10 — Roadmap Vision

**Setelah MVP hackathon:**
1. Integrasi WhatsApp Business Cloud API
2. QRIS settlement via payment gateway
3. Opt-in customer untuk reminder
4. Community sourcing (belanja bahan bersama — berbasis consent)
5. Rescue sale opt-in (sisa stok ditawarkan ke pelanggan sekitar)
6. Supplier pooling
7. Multi-tenant SaaS
8. Google Cloud production deployment

---

### Bagian 11 — Mengapa Relevan dengan Hackathon BuildLocal

- Fokus pada UMKM lokal, khususnya kuliner rumahan/pre-order
- Mengikuti kebiasaan yang sudah ada: WhatsApp
- Mobile-first dan ringan
- AI digunakan untuk workflow nyata, bukan gimmick
- Roadmap mendukung ekosistem lokal: komunitas UMKM dan supplier bahan

---

## Catatan Penulisan Proposal

- Gunakan Bahasa Indonesia
- Hindari klaim besar tanpa data
- Framing positif: UMKM aktif berjualan, Kuali membantu merapikan
- Jangan sebut UMKM "gaptek" atau "tertinggal"
- Jangan klaim community sourcing/rescue sale sebagai fitur MVP
- Selalu sebut QRIS sebagai dummy/reminder, bukan settlement
