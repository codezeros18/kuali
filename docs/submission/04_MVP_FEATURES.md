# Fitur MVP — Kuali

> MVP Kuali berfokus pada satu alur inti: dari chat WhatsApp masuk hingga produksi siap dan rekap harian tersedia.

---

## Fitur Inti MVP

### 1. Mock WhatsApp UI

Halaman simulasi chat WhatsApp yang menerima input teks pesanan. Dirancang agar demo bisa berjalan tanpa tergantung pada WhatsApp Business API yang memerlukan proses persetujuan Meta.

- Input: textarea chat pesanan
- Preset chip: load chat dummy dari 15 skenario (happy path, typo, ambiguous, low confidence)
- Output: diteruskan ke AI parser

### 2. AI Order Parser

Membaca teks chat pesanan dalam Bahasa Indonesia — termasuk variasi informal, typo, dan kalimat tidak lengkap — lalu menghasilkan structured JSON output.

**Field yang diparse:**
- Nama pelanggan
- Menu dan jumlah
- Tanggal dan jam kirim
- Status pembayaran
- Metode pengiriman
- Special request (jika ada)

**Guardrail AI (wajib):**
- Tidak boleh mengarang harga
- Tidak boleh mengarang menu yang tidak ada di daftar
- Tidak boleh mengubah status pembayaran menjadi lunas tanpa input owner
- Tidak boleh mengirim pesan tanpa approval

### 3. Confidence Score

Setiap hasil parsing diberi skor kepercayaan (0.0–1.0):

| Rentang | Kategori | Visual |
|---|---|---|
| 0.9–1.0 | Sangat yakin | Badge hijau solid |
| 0.7–0.9 | Yakin | Badge hijau muda |
| 0.5–0.7 | Perlu diperhatikan | Badge kuning |
| < 0.5 | Perlu cek Bu Rani | Badge merah |

### 4. Missing Field Detector

Secara otomatis mengidentifikasi informasi yang belum ada dalam chat — misalnya waktu pengiriman atau status pembayaran yang tidak disebutkan — dan menampilkannya sebagai field yang perlu dilengkapi owner.

### 5. Owner Approval

Owner melihat draft order, bisa mengedit, lalu menekan tombol approve. Status berubah dari Draft menjadi Dikonfirmasi. **Tidak ada konfirmasi otomatis oleh sistem.**

Flow approval:
1. Draft muncul di dashboard
2. Owner review (edit jika perlu)
3. Owner tekan "Approve Order"
4. Status: Draft → Dikonfirmasi
5. Toast notification sukses

### 6. Order Dashboard

Tampilan daftar semua order dengan status, tanggal pengiriman, dan status pembayaran. Dirancang mobile-first dengan tombol aksi yang besar.

**Status order yang ditampilkan:**
- Draft — menunggu review owner
- Dikonfirmasi — sudah diapprove
- Selesai — sudah dikirim/diambil
- Dibatalkan — cancelled

**Status pembayaran:**
- Belum Bayar
- Lunas
- Dikembalikan

### 7. QRIS Dummy Reminder

Setelah order dikonfirmasi, sistem menampilkan preview reminder pembayaran dengan QRIS dummy.

- QRIS adalah milik merchant — bukan settlement otomatis
- Bukan integrasi payment gateway
- Owner menyalin dan mengirimkan sendiri ke pelanggan
- Tombol: "Salin Pesan Reminder"

### 8. Production Planner

Menghitung kebutuhan bahan berdasarkan seluruh order yang sudah dikonfirmasi untuk tanggal produksi tertentu, dikalikan dengan resep sederhana yang sudah dimasukkan owner.

**Formula:**
```
Kebutuhan bahan = Σ (qty per order × qty bahan per serving dari resep)
```

**Contoh dari demo:**
- 26 pcs Risol Mayo + 10 pcs Lumpia Basah + menu lain (confirmed orders)
- Output: Tepung Terigu 1,7kg · Telur 6 butir · Wortel 520g · Mayones 260g · Minyak 720ml · Gula Aren 200g

### 9. Daily Summary

Rekap harian otomatis yang menampilkan:
- Total order masuk
- Order per status (dikonfirmasi, draft, dibatalkan)
- Order belum bayar dan totalnya
- Order perlu cek ulang (confidence rendah)
- Bahan yang harus disiapkan untuk produksi besok
- Narasi ringkasan dalam Bahasa Indonesia

**Data demo (2025-05-17):**
- 11 order masuk · 5 dikonfirmasi · 6 draft
- 4 order belum bayar (Rp 167.000)
- 3 order perlu cek ulang

### 10. Impact Dashboard

Tampilan metrik operasional dari data demo aktual — tidak overclaim.

| Metrik | Nilai Demo |
|---|---|
| Chat berhasil diparse | 13 dari 15 |
| Order perlu cek | 3 (confidence < 0.7) |
| Order belum bayar | 4 |
| Reminder siap dikirim | 4 |
| Bahan terhitung otomatis | ✓ |

---

## Yang Bukan Fitur MVP

| Fitur | Status | Keterangan |
|---|---|---|
| Real WhatsApp Business Cloud API | Roadmap | Perlu approval Meta, tidak feasible di hackathon |
| QRIS settlement otomatis | Roadmap | Butuh integrasi payment gateway |
| Community sourcing / belanja bareng | Roadmap | Fitur berbasis consent, bukan MVP |
| Rescue sale opt-in | Roadmap | Roadmap Phase 3 |
| Full POS / kasir | Bukan arah produk | Kuali bukan POS |
| Full inventory management | Bukan arah produk | Di luar scope MVP |
| Multi-tenant SaaS | Roadmap | Satu bisnis per demo |
| Marketplace | Bukan arah produk | Di luar scope Kuali |
| Route optimization | Bukan arah produk | — |
| ML forecasting kompleks | Roadmap | AI parser sudah cukup |
| Native mobile app | Roadmap | PWA cukup untuk MVP |

---

## Kenapa Ini Bukan POS

| POS Biasa | Kuali |
|---|---|
| Dimulai dari transaksi kasir | Dimulai dari pre-order chat WhatsApp |
| Butuh kasir dan input manual | AI parse chat otomatis |
| Fokus pada transaksi di tempat | Fokus pada operasional pre-order |
| Ada fitur meja, struk, multi-cabang | Tidak ada — bukan kebutuhan UMKM target |
| Berat di setup dan pelatihan | Ringan, langsung pakai |

## Kenapa Ini Bukan Chatbot Biasa

| Chatbot Biasa | Kuali |
|---|---|
| Fokus balas pesan | Fokus workflow order dan produksi |
| Tidak punya data menu/resep | Terhubung dengan menu dan resep owner |
| Output bebas/tidak terstruktur | Output dibatasi structured JSON yang divalidasi |
| Bisa mengarang | Backend memvalidasi menu, harga, dan status |
| Tidak punya dashboard operasional | Ada order dashboard, production planner, impact dashboard |
