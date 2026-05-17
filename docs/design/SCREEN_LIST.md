# Screen List — Kuali MVP
### Daftar Lengkap Screen dengan Tujuan, Konten, CTA, dan Peran Demo

> Referensi: `docs/proposal/LOW_FIDELITY_MOCKUP_PLAN.md` (wireframe ASCII)
> Referensi: `docs/proposal/UI_MOODBOARD.md` (warna, tipografi, komponen)
> Semua screen mobile-first, artboard 360×780px.
> Semua teks dalam Bahasa Indonesia.

---

## Konvensi

| Kolom | Keterangan |
|---|---|
| Screen ID | S01–S09 |
| Route | URL path di Next.js App Router |
| Prioritas | P0 = wajib sebelum demo / P1 = sebelum pitch / P2 = nice to have |
| Demo Role | Peran screen dalam demo 3–5 menit |
| Entry Point | Bagaimana user sampai ke screen ini |

---

## S01 — Mock WhatsApp Chat

| Atribut | Detail |
|---|---|
| **Screen ID** | S01 |
| **Nama** | Mock WhatsApp Chat |
| **Route** | `/mock-whatsapp` |
| **Prioritas** | P0 |
| **Demo Role** | Scene 2 — Titik masuk pesanan ke sistem |

**Tujuan Screen:**
Mensimulasikan tampilan chat WhatsApp yang familiar bagi Bu Rani. Titik masuk pertama: chat pelanggan masuk, owner paste atau pilih dari preset, lalu kirim ke Kuali untuk diparse.

**Konten Wajib:**
- Header: "Chat Masuk" + nama toko
- Chip preset chat dari `dummy-chats.json` (dapat diklik untuk auto-fill)
- Chat bubble: tampilkan pesan pelanggan yang dipilih (kiri, bubble hijau muda)
- Textarea input: paste / ketik chat pesanan
- Tombol CTA: "Proses dengan Kuali"
- Area hasil: Draft Order card muncul di bawah setelah parsing (link ke S02)

**CTA Utama:**
- `[Proses dengan Kuali]` — disabled jika textarea kosong; loading state selama parsing

**State yang Diperlukan:**
- Default: textarea kosong, tombol disabled
- Filled: textarea ada teks, tombol aktif
- Loading: spinner + teks "Memproses..."
- Success: scroll otomatis ke Draft Order Card

**Tidak Boleh Ada:**
- Pilihan "kirim ke customer" dari halaman ini
- Tombol settlement atau payment apapun
- Konfirmasi otomatis tanpa owner approval

---

## S02 — AI Parsed Draft Order

| Atribut | Detail |
|---|---|
| **Screen ID** | S02 |
| **Nama** | AI Parsed Draft Order |
| **Route** | `/mock-whatsapp` (bagian bawah, muncul setelah parsing) atau `/orders/[id]` |
| **Prioritas** | P0 |
| **Demo Role** | Scene 3 — Tampilkan output AI parsing |

**Tujuan Screen:**
Menampilkan hasil parsing AI sebagai draft order yang bisa dicek owner sebelum diapprove. Ini adalah output dari AI parser — bukan konfirmasi final.

**Konten Wajib:**
- Label status: badge "DRAFT" (amber)
- Order number: `KL-20250517-001`
- Nama pelanggan
- Daftar item: nama menu + qty + subtotal per item
- Total harga
- Tanggal + jam pengiriman
- Metode pengiriman (diantar / ambil sendiri)
- Status pembayaran ("Belum Bayar" atau sesuai chat)
- **Confidence Score bar** — warna dinamis sesuai nilai (0–1)
  - ≥ 0.85 → hijau, label "Siap diapprove"
  - 0.70–0.84 → kuning, label "Cek dulu"
  - < 0.70 → merah, label "Perlu konfirmasi manual"
- **Missing fields** — jika ada: list field yang belum terdeteksi (merah, ikon ✗)
- Chat sumber (collapsible): raw teks chat aslinya

**CTA Utama:**
- `[✓ Approve Pesanan]` — menuju S03 (modal konfirmasi)
- `[✏️ Edit]` — buka edit form inline
- `[✗ Tolak]` — destructive, ubah status ke rejected

**State yang Diperlukan:**
- Confidence tinggi: bar hijau, field lengkap, approve enabled
- Confidence rendah: bar merah, missing fields tersorot, teks peringatan
- Setelah approve: status berubah ke "Dikonfirmasi", navigasi ke S05 (QRIS)

**Tidak Boleh Ada:**
- Auto-approve tanpa tombol
- Harga yang tidak ada di data menu
- Menu yang tidak ada di `dummy-menus.json`

---

## S03 — Owner Approval (Modal)

| Atribut | Detail |
|---|---|
| **Screen ID** | S03 |
| **Nama** | Owner Approval Modal |
| **Route** | Modal di atas `/orders/[id]` atau `/mock-whatsapp` |
| **Prioritas** | P0 |
| **Demo Role** | Scene 4 — Tegaskan owner tetap pegang kendali |

**Tujuan Screen:**
Konfirmasi eksplisit sebelum order masuk sistem sebagai "Dikonfirmasi". Ini adalah guardrail utama — tidak ada order yang lolos tanpa persetujuan Bu Rani.

**Konten Wajib:**
- Judul modal: "Konfirmasi Pesanan"
- Instruksi singkat: "Pastikan detail sudah benar sebelum dikonfirmasi."
- Ringkasan order: nama pelanggan, menu, total, tanggal, status bayar
- Dua tombol: `[Ya, Konfirmasi]` dan `[Kembali]`

**CTA Utama:**
- `[Ya, Konfirmasi]` — primary, warna oranye
- `[Kembali]` — secondary / ghost

**State yang Diperlukan:**
- Default: modal terbuka, backdrop gelap
- Loading: spinner "Menyimpan..." setelah klik konfirmasi
- Success: modal tutup + toast "✓ Pesanan Dikonfirmasi!" (2 detik)

**Tidak Boleh Ada:**
- Auto-dismiss tanpa user action
- Konfirmasi langsung dari luar modal (tidak boleh bypass)

---

## S04 — Dashboard Hari Ini

| Atribut | Detail |
|---|---|
| **Screen ID** | S04 |
| **Nama** | Dashboard Hari Ini |
| **Route** | `/` atau `/dashboard` |
| **Prioritas** | P0 |
| **Demo Role** | Scene 1 (problem context) + Scene 7 (rekap akhir) |

**Tujuan Screen:**
Halaman utama. Memberikan gambaran operasional harian Bu Rani dalam satu layar: berapa order masuk, berapa yang perlu perhatian, dan tombol untuk memulai proses chat baru.

**Konten Wajib:**
- Sapaan: "Selamat pagi, Bu Rani 👋" + tanggal hari ini
- **4 summary card (grid 2×2):**
  1. Total pesanan hari ini: **11**
  2. Belum bayar: **4** (highlight amber)
  3. Perlu dicek: **3** (highlight merah)
  4. Draft pending: **6**
- CTA: `[+ Proses Chat Baru]` — primary, full width
- List pesanan terbaru (2–3 item preview): nama, menu, status badge
- Link "Lihat semua →" ke `/orders`

**CTA Utama:**
- `[+ Proses Chat Baru]` → navigasi ke S01

**State yang Diperlukan:**
- Default: data sesuai seed (angka canonical)
- Empty: jika belum ada order — empty state dengan ilustrasi + CTA
- Tap summary card → navigasi ke `/orders` dengan filter aktif

**Tidak Boleh Ada:**
- Grafik kompleks di halaman ini
- Angka pendapatan total (bukan scope MVP)
- Struk atau tampilan kasir

---

## S05 — Payment Reminder QRIS Dummy

| Atribut | Detail |
|---|---|
| **Screen ID** | S05 |
| **Nama** | QRIS Dummy Reminder |
| **Route** | `/orders/[id]/reminder` atau section dalam `/orders/[id]` |
| **Prioritas** | P0 |
| **Demo Role** | Scene 5 — Reminder pembayaran siap kirim |

**Tujuan Screen:**
Setelah order dikonfirmasi, tampilkan preview pesan reminder pembayaran lengkap dengan QRIS dummy. Bu Rani tinggal salin dan kirim sendiri ke pelanggan. Bukan settlement otomatis.

**Konten Wajib:**
- Header card: nama toko "KATERING BU RANI"
- **QRIS image placeholder** — kotak abu dengan label "CONTOH — BUKAN PEMBAYARAN" (wajib, tidak boleh dihapus)
- Detail pembayaran: Untuk (nama customer), Pesanan (item), Total (Rp)
- **Preview pesan siap kirim:** teks lengkap dalam Bahasa Indonesia siap disalin
- Tombol "Salin Pesan"
- Tombol secondary: "Tandai Sudah Dikirim"
- **Disclaimer** (wajib, teks 12px): "QRIS ini adalah contoh demo. Bu Rani mengirim sendiri ke pelanggan. Bukan settlement otomatis."

**CTA Utama:**
- `[📋 Salin Pesan]` → copy ke clipboard, berubah "✓ Tersalin!" selama 2 detik
- `[✓ Tandai Sudah Dikirim]` → secondary, update status reminder

**State yang Diperlukan:**
- Default: preview terbuka
- Setelah salin: feedback visual "Tersalin!"
- Sudah dikirim: badge "Reminder Terkirim" pada order card

**Tidak Boleh Ada:**
- Tombol "Bayar Sekarang" atau apapun yang mengarah ke payment gateway
- Teks yang menyiratkan settlement otomatis
- QRIS yang bisa di-scan untuk pembayaran nyata

---

## S06 — Production Planner

| Atribut | Detail |
|---|---|
| **Screen ID** | S06 |
| **Nama** | Production Planner |
| **Route** | `/production` |
| **Prioritas** | P0 ⭐ AHA MOMENT |
| **Demo Role** | Scene 6 — Momen paling impactful dalam demo |

**Tujuan Screen:**
Menampilkan daftar bahan yang perlu disiapkan Bu Rani berdasarkan order aktual yang sudah dikonfirmasi. Kalkulasi otomatis dari data resep × qty order — bukan perkiraan.

**Konten Wajib:**
- Judul: "Persiapan Produksi"
- Tanggal produksi (besok): "Untuk pesanan Minggu, 18 Mei 2025"
- Jumlah order yang dihitung: "Dari 5 pesanan dikonfirmasi"
- Tombol info `[ⓘ]`: tooltip penjelasan cara kalkulasi
- **Daftar bahan** (per bahan):
  - Nama bahan + ikon/emoji
  - Jumlah yang dibutuhkan: `Butuh: 1,70 kg`
  - Stok tersedia: `Stok: 10 kg`
  - **Status badge:** ✓ Cukup (hijau) / ⚠ Tipis (kuning) / ✗ Perlu Beli (merah)
- Expand per item: detail "dari order mana" + kalkulasi
- Section "Urutan Produksi" (opsional): urutan menu berdasarkan jam pengiriman

**Data dari demo (5 order dikonfirmasi):**
| Bahan | Dibutuhkan |
|---|---|
| Tepung Terigu | 1,70 kg |
| Telur | 6 butir |
| Wortel | 520 g |
| Mayones | 260 g |
| Minyak Goreng | 720 ml |
| Gula Aren | 200 g |

**CTA Utama:**
- Tidak ada CTA besar — halaman ini untuk membaca, bukan aksi
- Tap item → expand kalkulasi detail

**Tidak Boleh Ada:**
- Angka bahan dari perkiraan atau dari order yang belum diapprove
- Prediksi berdasarkan historis (bukan scope MVP)
- Fitur "beli bahan" atau link ke supplier (roadmap)

---

## S07 — Daily Summary

| Atribut | Detail |
|---|---|
| **Screen ID** | S07 |
| **Nama** | Daily Summary |
| **Route** | `/summary` |
| **Prioritas** | P0 |
| **Demo Role** | Scene 7 — Rekap akhir hari, penutup demo |

**Tujuan Screen:**
Rekap operasional harian dalam satu halaman. Bu Rani tidak perlu rekap manual — semua informasi yang dibutuhkan sudah tersedia.

**Konten Wajib:**
- Tanggal: "Sabtu, 17 Mei 2025"
- **Tabel ringkasan (3 kolom):**
  - Baris 1: Total (11) | Konfirmasi (5) | Draft (6)
  - Baris 2: Blm Bayar Rp 167.000 | 4 order unpaid | 1 Lunas
- **Card peringatan:** ⚠ "3 pesanan perlu dicek" (border amber, link ke daftar)
- **Ringkasan narasi** (dihasilkan sistem): teks ringkas dalam Bahasa Indonesia
- Tombol "Lihat Production Planner" → S06
- Quick stats: "13/15 chat diparse · 4 reminder siap"
- Link "Lihat semua metrik →" → S08

**CTA Utama:**
- `[Lihat Production Planner]` — secondary, link ke S06
- `[Lihat semua metrik]` — ghost, link ke S08

**Tidak Boleh Ada:**
- Angka yang tidak konsisten dengan canonical: 11/5/6/4/Rp167.000/3
- Klaim penghematan waktu dalam menit yang pasti
- Proyeksi profit atau revenue

---

## S08 — Impact Dashboard

| Atribut | Detail |
|---|---|
| **Screen ID** | S08 |
| **Nama** | Impact Dashboard |
| **Route** | `/impact` |
| **Prioritas** | P1 |
| **Demo Role** | Opsional — tunjukkan di demo 5 menit atau di pitch slide |

**Tujuan Screen:**
Menampilkan metrik operasional dari data demo. Semua angka bisa diverifikasi langsung dari demo — bukan proyeksi atau klaim pasar.

**Konten Wajib:**
- **Disclaimer bar** (wajib, biru muda): "ⓘ Angka ini dari data demo simulasi. Bukan klaim bisnis nyata."
- **Parsing metric:** "13 dari 15 chat berhasil diparse" + progress bar 86,7%
- **4 metric card (grid 2×2):**
  1. Dikonfirmasi: 5
  2. Reminder siap: 4
  3. Perlu cek: 3
  4. Bahan terhitung: 6 jenis
- **Perbandingan waktu** (simulasi): Tanpa Kuali ~40 menit vs Dengan Kuali ~8 menit
  - Catatan kecil: "* Simulasi ilustratif — bukan data tervalidasi"
- **Sparkline tren 7 hari** (dari `dummy-impact-metrics.json`) — sederhana, bukan chart kompleks
- Section roadmap simulation → S09

**CTA Utama:**
- Tidak ada CTA utama
- `[Lihat roadmap simulation ↓]` — scroll ke S09

**Tidak Boleh Ada:**
- Angka food waste atau profit yang diklaim
- Proyeksi pendapatan
- Market size yang tidak tervalidasi

---

## S09 — Roadmap Simulation Card

| Atribut | Detail |
|---|---|
| **Screen ID** | S09 |
| **Nama** | Roadmap Simulation Card |
| **Route** | Section bawah `/impact` (bukan halaman tersendiri) |
| **Prioritas** | P1 |
| **Demo Role** | Demo 5 menit — visi roadmap, bukan klaim MVP |

**Tujuan Screen:**
Menampilkan fitur roadmap secara visual yang jelas berbeda dari fitur MVP aktif. Label dan desain harus tidak ambiguous.

**Konten Wajib:**
- Header section: "🗺️ Roadmap — Fitur ini sedang direncanakan. Belum tersedia di MVP."
- **Card roadmap 1:** "Belanja Bahan Bareng" — berbasis consent pengguna
- **Card roadmap 2:** "Sisa Stok Opt-in" — bukan broadcast otomatis
- Setiap card: badge "ROADMAP" (ungu), deskripsi singkat, catatan consent

**Visual Wajib (tidak boleh dilanggar):**
- Border card: `2px dashed #D1D5DB` (bukan solid)
- Background card: `#F4F4F2` (abu sangat muda)
- Badge: background `#7C3AED`, teks putih, 11px
- Opacity konten: 70–80%
- **Tidak ada tombol CTA aktif di dalam card**

**Tidak Boleh Ada:**
- Tombol yang bisa diklik untuk "mencoba" fitur roadmap
- Teks yang menyiratkan fitur sudah tersedia
- Demo aktif dari fitur roadmap

---

## Summary Table

| ID | Nama Screen | Route | Prioritas | Demo Role |
|---|---|---|---|---|
| S01 | Mock WhatsApp Chat | `/mock-whatsapp` | P0 | Scene 2 — Entry point |
| S02 | AI Parsed Draft Order | `/mock-whatsapp` / `/orders/[id]` | P0 | Scene 3 — AI output |
| S03 | Owner Approval Modal | Modal overlay | P0 | Scene 4 — Control |
| S04 | Dashboard Hari Ini | `/` | P0 | Scene 1, 7 |
| S05 | QRIS Dummy Reminder | `/orders/[id]/reminder` | P0 | Scene 5 |
| S06 | Production Planner | `/production` | P0 ⭐ | Scene 6 — AHA MOMENT |
| S07 | Daily Summary | `/summary` | P0 | Scene 7 — Closing |
| S08 | Impact Dashboard | `/impact` | P1 | Opsional / Pitch |
| S09 | Roadmap Simulation Card | Section di `/impact` | P1 | Demo 5 menit |

---

*Dokumen ini adalah bagian dari docs/design/ Kuali Phase 1 preparation.*
*Wireframe ASCII tersedia di `docs/proposal/LOW_FIDELITY_MOCKUP_PLAN.md`.*
*Panduan visual tersedia di `docs/proposal/UI_MOODBOARD.md`.*
