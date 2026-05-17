# Proposal Produk — Kuali
### Asisten Operasional WhatsApp-First untuk UMKM Kuliner

> **Tagline:** Order rapi, produksi siap.
> **Kategori:** Food & Culinary Business Tech
> **Subtema:** Teknologi untuk UMKM Kuliner Lokal

---

## 1. Latar Belakang

Indonesia memiliki jutaan pelaku usaha mikro di sektor kuliner. Sebagian besar dari mereka tidak berjualan di mall, tidak punya kasir, dan tidak mendaftar ke marketplace besar. Mereka berjualan lewat WhatsApp — langsung ke pelanggan tetap, grup komunitas, dan jaringan dari mulut ke mulut yang sudah terbentuk bertahun-tahun.

Ini bukan keterbatasan. Ini adalah kekuatan.

UMKM kuliner seperti catering rumahan, nasi box pre-order, snack box, bakery rumahan, dessert box, frozen food, dan kopi literan sudah memiliki pelanggan, sudah punya omzet, dan sudah tahu cara berjualan. WhatsApp adalah kanal yang mereka pilih karena memang di sanalah pelanggan mereka berada — personal, cepat, dan tanpa friction tambahan.

Tantangan yang mereka hadapi bukan soal bagaimana cara berjualan. Tantangannya ada di **proses operasional yang terjadi setelah chat masuk**: mencatat pesanan, memantau pembayaran, menghitung kebutuhan bahan, dan merekap kegiatan harian — semua dilakukan secara manual, tanpa tools yang dirancang khusus untuk alur kerja mereka.

Kuali hadir untuk membantu merapikan proses itu — bukan menggantikan cara mereka berjualan, tapi memperkuat fondasi operasional di baliknya.

---

## 2. Pernyataan Masalah

### Gambaran Situasi

Bu Rani, pemilik usaha catering rumahan yang melayani 20–50 pesanan per hari saat ramai. Setiap pagi, puluhan pesan masuk dari berbagai chat WhatsApp. Ada yang pesan baru, ada yang konfirmasi ulang, ada yang tanya stok, ada yang kabari sudah transfer. Semua campur aduk di satu aplikasi yang sama.

Bu Rani tidak punya admin khusus. Ia mengerjakan semuanya sendiri, sering sambil memasak, sambil mempersiapkan pesanan yang sudah harus siap jam 7 pagi.

### 5 Masalah Konkret

**1. Pesanan mudah tercecer.**
Chat pesanan datang dari banyak kontak berbeda, masuk di antara pesan pribadi dan notifikasi lain. Satu pesanan yang terlewat bisa merusak kepercayaan pelanggan setia.

**2. Status pembayaran tidak terpantau.**
Bu Rani harus mengingat sendiri siapa yang sudah bayar dan siapa yang belum. Kalau lupa menagih, arus kas ikut terganggu.

**3. Kebutuhan bahan dihitung pakai perkiraan.**
Tidak ada sistem yang menghitung otomatis berapa bahan yang harus disiapkan besok berdasarkan order yang sudah masuk.

**4. Tidak ada rekap harian otomatis.**
Di akhir hari, Bu Rani harus menyusun sendiri ringkasan operasional. Proses ini menghabiskan waktu yang harusnya bisa dipakai untuk istirahat atau persiapan produksi esok hari.

**5. Semua beban ada di satu orang.**
Tanpa admin, semua tanggung jawab operasional jatuh ke pemilik usaha. Kesalahan kecil bisa berdampak langsung ke kepuasan pelanggan dan reputasi usaha.

> **Framing yang tepat:** Masalah ini bukan tentang kemampuan digital. Bu Rani sudah aktif menggunakan WhatsApp setiap hari dan sudah membangun usaha yang berjalan. Tantangannya bersifat operasional: alur kerja di belakang chat yang belum punya sistem yang mendukungnya.

---

## 3. Target Pengguna

### Persona Utama: Bu Rani

| Aspek | Detail |
|---|---|
| Usia | 30–45 tahun |
| Jenis usaha | Catering rumahan, nasi box, snack box pre-order |
| Kanal utama | WhatsApp, Instagram Story, repeat order |
| Volume order | 20–50 pesanan/hari saat ramai |
| Perangkat | Android mid-low, dipakai sambil produksi |
| Tim | Tidak punya admin, dibantu keluarga |
| Pain utama | Order tercecer, pembayaran tidak terpantau, bahan dihitung perkiraan |

### Segmen yang Relevan

- Volume 10–100 order per hari
- Tidak memiliki sistem POS atau admin khusus
- Menerima pesanan secara pre-order, bukan walk-in kasir
- Sudah aktif menggunakan WhatsApp sebagai kanal utama

---

## 4. Solusi

### Positioning

**Kuali adalah asisten operasional WhatsApp-first untuk UMKM kuliner yang membantu mengubah chat pesanan menjadi draft order, reminder pembayaran, estimasi bahan, dan rekap produksi harian.**

Kuali bukan POS. Bukan marketplace. Bukan chatbot percakapan umum.

### Cara Kerja

```
Chat pelanggan masuk
       ↓
AI membaca dan membuat draft order
(structured JSON + confidence score + missing field detection)
       ↓
Owner mengecek draft — edit jika perlu — lalu approve
(AI hanya membuat draft, keputusan tetap di tangan owner)
       ↓
Order masuk dashboard
QRIS dummy reminder siap dikirim ke pelanggan
       ↓
Production planner menghitung bahan otomatis
(dari order yang sudah dikonfirmasi × resep yang dimasukkan owner)
       ↓
Daily summary tersedia di akhir hari
```

### Prinsip Desain

1. **Owner tetap pegang kendali** — tidak ada order terkonfirmasi tanpa persetujuan eksplisit owner
2. **Tidak menambah beban belajar** — bekerja di atas WhatsApp yang sudah dipakai
3. **Output yang bisa langsung dipakai** — draft, reminder, daftar bahan, rekap
4. **Tidak overclaim** — semua kalkulasi dari order aktual dan resep yang dimasukkan owner

---

## 5. Fitur MVP

| Fitur | Deskripsi |
|---|---|
| Mock WhatsApp UI | Simulasi chat pesanan masuk — demo tanpa butuh WhatsApp API |
| AI Order Parser | Chat → structured JSON: nama, menu, qty, tanggal, status bayar |
| Confidence Score | Skor 0–1 per hasil parsing, visual badge per kategori |
| Missing Field Detector | Deteksi field yang belum tersebut dalam chat |
| Owner Approval | Draft → cek → edit → approve. Tidak ada konfirmasi otomatis. |
| Order Dashboard | Daftar semua order, status, filter — mobile-first |
| QRIS Dummy Reminder | Preview reminder + QRIS milik merchant. Bukan settlement. |
| Production Planner | Kebutuhan bahan dari order aktual × resep sederhana |
| Daily Summary | Rekap order, unpaid, perlu cek, bahan besok — otomatis |
| Impact Dashboard | Metrik operasional dari data demo aktual — tidak overclaim |

### Yang Bukan Fitur MVP

| Fitur | Status |
|---|---|
| Real WhatsApp Business Cloud API | Roadmap |
| QRIS settlement otomatis | Roadmap |
| Community sourcing / belanja bareng | Roadmap — berbasis consent |
| Rescue sale opt-in | Roadmap |
| Full POS / kasir | Bukan arah produk |
| Full inventory management | Bukan arah produk |
| Multi-tenant SaaS | Roadmap |
| Marketplace | Bukan arah produk |

---

## 6. Teknologi

### Stack Utama

| Layer | Pilihan |
|---|---|
| Framework | Next.js 14+ App Router + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase PostgreSQL + Prisma |
| AI Parser | OpenAI GPT-4o / Anthropic Claude (mock-first) |
| Deploy | Vercel |

### Keputusan Teknis Penting

- **Mock-first:** `USE_MOCK_AI=true` dan `USE_MOCK_WHATSAPP=true` — demo tidak bergantung pada koneksi live
- **AI guardrail ketat:** tidak mengarang harga, menu, atau status bayar
- **Single-tenant:** satu bisnis per demo — multi-tenant di roadmap

---

## 7. Metrik Dampak

### Metrik yang Dilaporkan dalam Demo

| Metrik | Nilai Demo |
|---|---|
| Chat berhasil diparse menjadi draft order | 13 dari 15 chat |
| Order terdeteksi perlu cek | 3 (confidence < 0.7) |
| Order dikonfirmasi hari ini | 5 |
| Order belum bayar | 4 (Rp 167.000) |
| Reminder pembayaran siap | 4 |
| Bahan terhitung dari order aktual | 6 jenis bahan |
| Daily summary dibuat otomatis | 1 — tanpa rekap manual |

> Semua angka dari data dummy Katering Bu Rani (2025-05-17). Ini adalah simulasi demo, bukan klaim operasional nyata.

### Yang Tidak Diklaim

- Profit Bu Rani naik sekian persen
- Food waste turun sekian persen
- Semua UMKM pasti terbantu
- Semua stok sisa pasti habis terjual
- Penghematan waktu yang dijamin

---

## 8. Model Bisnis (Roadmap)

Pada fase MVP, Kuali berjalan gratis untuk memvalidasi nilai produk. Model bisnis yang mungkin dikembangkan setelah validasi:

| Model | Deskripsi | Fase |
|---|---|---|
| Freemium | Dasar gratis, fitur lanjutan berbayar | Roadmap |
| Langganan bulanan | Per UMKM per bulan | Roadmap |
| Biaya layanan berbasis usage | Berdasarkan volume order diproses | Roadmap |
| Fitur komunitas premium | Community sourcing, supplier pooling | Roadmap jangka panjang |

*Semua model bisnis memerlukan validasi willingness-to-pay sebelum diimplementasikan.*

---

## 9. Mitigasi Risiko

### Risiko Produk

| Risiko | Mitigasi |
|---|---|
| AI parser salah baca chat | Owner approval wajib. Confidence score ditampilkan. Missing field dideteksi. |
| Dependensi AI API saat demo | Mock AI fallback — demo berjalan offline |
| WhatsApp API tidak tersedia | Mock WhatsApp UI — tidak butuh approval Meta |
| Scope melebar selama hackathon | MVP boundary ketat, scope change lewat leader |

### Risiko Narasi

| Risiko | Mitigasi |
|---|---|
| Pitch terlihat seperti super app | Positioning eksplisit: "bukan POS, bukan marketplace" |
| Overclaim impact metrics | Hanya pakai metrik dari data demo aktual, selalu sebut "simulasi" |
| Community sourcing diklaim MVP | Selalu label "Roadmap" pada semua fitur roadmap |
| QRIS diklaim settlement | Selalu sebut "QRIS dummy/reminder — bukan settlement" |
| Framing merendahkan UMKM | Tidak pernah gunakan kata "gaptek", "tertinggal", atau "belum digital" |

### Risiko Teknis

| Risiko | Mitigasi |
|---|---|
| Database tidak siap saat demo | Seed data dijalankan sebelum presentasi. Screenshot sebagai fallback. |
| Deployment gagal | Test deploy H-1. Localhost sebagai fallback. |
| AI output tidak konsisten | Cached/mock response untuk demo utama. |

---

## 10. Roadmap

### Fase Saat Ini: Phase 0 — Baseline Proposal ✅ Selesai

### Phase 1 — Hackathon MVP Prototype

Target: demo berjalan end-to-end dalam 3 menit tanpa error.

Fitur: Next.js app + mock WhatsApp UI + AI parser + order dashboard + approval + QRIS dummy + production planner + daily summary + impact dashboard + seed data.

### Phase 2 — Demo Hardening

Target: demo stabil 2 kali berturut-turut. Feature freeze. Fallback video siap.

### Phase 3 — Roadmap Pasca Hackathon

| Fitur Roadmap | Catatan |
|---|---|
| Real WhatsApp Business Cloud API | Perlu approval Meta |
| QRIS Settlement Real | Perlu integrasi payment gateway |
| Opt-in Customer System | Berbasis consent |
| Community Sourcing | Berbasis consent — bukan broadcast otomatis |
| Rescue Sale Opt-in | Berbasis opt-in — bukan klaim "stok pasti habis" |
| Supplier Pooling | Jangka panjang |
| Multi-tenant SaaS | Jangka panjang |

---

## Penutup

Kuali tidak mengubah cara UMKM kuliner berjualan. Kuali membantu merapikan alur yang sudah mereka jalankan setiap hari — dari chat pelanggan menjadi order yang tercatat, pembayaran yang terpantau, bahan yang terhitung, dan hari kerja yang lebih siap.

AI berperan sebagai asisten yang membuat draft. Keputusan tetap di tangan owner.

> **"Order rapi, produksi siap."**

---

*Proposal ini dibuat untuk keperluan Phase 0 hackathon Kuali. Semua data dan metrik yang disebutkan berasal dari data dummy yang dirancang untuk keperluan demo — bukan klaim operasional nyata.*
