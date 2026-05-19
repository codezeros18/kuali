# User Flow UI — Kuali

> Dokumen ini menjelaskan alur navigasi dan states per screen untuk seluruh MVP Kuali.
> Fokus pada perspektif UI: layar apa → aksi apa → layar berikutnya.
> Berbeda dari USER_JOURNEY.md yang berfokus pada perspektif user story.

---

## Peta Navigasi

```
                    ┌─────────────────────┐
                    │   LANDING / ENTRY   │
                    │      (opsional)     │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   DASHBOARD         │◄──────────────────────────┐
                    │   HARI INI          │                           │
                    └──────────┬──────────┘                           │
             ┌─────────────────┼──────────────────┐                  │
             │                 │                  │                  │
    ┌────────▼───────┐ ┌───────▼───────┐  ┌──────▼──────┐          │
    │  MOCK          │ │  DAFTAR       │  │  PRODUKSI   │          │
    │  WHATSAPP UI   │ │  PESANAN      │  │  PLANNER    │          │
    └────────┬───────┘ └───────┬───────┘  └─────────────┘          │
             │                 │                                      │
    ┌────────▼───────┐ ┌───────▼───────┐                            │
    │  DRAFT ORDER   │ │  ORDER        │                            │
    │  CARD + AI     │ │  DETAIL       │                            │
    └────────┬───────┘ └───────┬───────┘                            │
             │                 │                                      │
             └────────┬────────┘                                      │
                      │                                               │
             ┌────────▼────────┐                                      │
             │  OWNER          │                                      │
             │  APPROVAL       │                                      │
             └────────┬────────┘                                      │
                      │                                               │
             ┌────────▼────────┐                                      │
             │  QRIS DUMMY     │                                      │
             │  REMINDER       │──────────────────────────────────────┘
             └─────────────────┘

Bottom Navigation selalu terlihat:
[Dashboard] [Pesanan] [Produksi] [Ringkasan]
                                      │
                             ┌────────▼────────┐
                             │  DAILY SUMMARY  │
                             │  + IMPACT DASH  │
                             └─────────────────┘
```

---

## Screen 1 — Mock WhatsApp UI

**Route:** `/mock-whatsapp`
**Diakses dari:** Tombol di Dashboard, atau link langsung untuk demo

### Tujuan Layar
Simulasi chat pesanan masuk seperti WhatsApp. Entry point utama demo. Owner bisa input chat baru atau pilih dari daftar chat dummy.

### Konten Utama

```
Header     : "Chat Masuk" (+ ikon MessageCircle)
Sub-header : "Pilih atau tulis chat pesanan"

Area Chat  : Bubble chat dari customer (kiri)
             Bubble balasan draft dari sistem (kanan, abu)

Input Area : Textarea "Ketik atau tempel chat pesanan di sini..."
             Tombol: [Proses dengan Kuali →]

Preset     : Chip/tombol kecil untuk load chat dummy
             "Contoh: Risol Mayo" | "Contoh: Nasi Box" | "Contoh: Low Confidence"
```

### States

| State | Tampilan |
|---|---|
| Default / kosong | Empty state dengan instruksi singkat + chip preset chat |
| Chat diketik | Textarea aktif, tombol "Proses" berwarna primary |
| Loading AI | Spinner di tombol + teks "Membaca chat..." |
| Hasil muncul | Scroll ke bawah, tampilkan Draft Order Card |

### CTA Utama
- **[Proses dengan Kuali →]** — trigger AI parsing

### Navigasi
- Header: tombol kembali ke Dashboard
- Bottom nav tetap terlihat

---

## Screen 2 — Dashboard Hari Ini

**Route:** `/dashboard` atau `/`
**Diakses dari:** Bottom nav tab pertama, atau setelah login

### Tujuan Layar
Ringkasan cepat kondisi operasional hari ini. Bu Rani buka ini pertama kali di pagi hari. Harus bisa dibaca dalam 5 detik.

### Konten Utama

```
Header     : "Selamat pagi, Bu Rani 👋"
Sub-header : Tanggal + jumlah order aktif

Summary Cards (3 card horizontal scroll atau grid 2×2):
  ┌─────────────┐  ┌─────────────┐
  │  9 Pesanan  │  │  4 Unpaid   │
  │  Hari Ini   │  │  ⚠ Belum   │
  │             │  │    Bayar    │
  └─────────────┘  └─────────────┘
  ┌─────────────┐  ┌─────────────┐
  │  2 Perlu    │  │  3 Draft    │
  │  Dicek      │  │  Menunggu   │
  └─────────────┘  └─────────────┘

Tombol Aksi Utama:
  [+ Proses Chat Baru]    ← tombol besar, primary color

Seksi "Pesanan Terbaru":
  List 3–5 order terbaru (card ringkas)
  Setiap card: nama customer, menu, status badge, jam

Tautan:
  "Lihat semua pesanan →"
```

### States

| State | Tampilan |
|---|---|
| Ada order | Semua card terisi, list order tampil |
| Tidak ada order | Empty state: ikon besar + "Belum ada pesanan hari ini" + tombol "Proses Chat" |
| Ada unpaid banyak | Card Unpaid diberi border merah/amber untuk perhatian |

### CTA Utama
- **[+ Proses Chat Baru]** → Mock WhatsApp UI

### Navigasi
- Bottom nav: tab Dashboard aktif
- Card summary: tap → filter otomatis di halaman Pesanan

---

## Screen 3 — Daftar Pesanan

**Route:** `/orders`
**Diakses dari:** Bottom nav tab kedua, atau tap card summary di Dashboard

### Tujuan Layar
Seluruh daftar order. Bu Rani bisa filter berdasarkan status dan cari berdasarkan nama.

### Konten Utama

```
Header     : "Pesanan"

Filter Chips (horizontal scroll):
  [Semua] [Draft] [Dikonfirmasi] [Belum Bayar] [Selesai]

Search Bar : "Cari nama atau nomor pesanan..."

List Order (card per order):
  ┌──────────────────────────────────────┐
  │ KL-20250517-001           [UNPAID]   │
  │ Dinda Ayu                            │
  │ Risol Mayo × 12 — Rp 42.000         │
  │ Besok, 15:00                [95% ✓] │
  └──────────────────────────────────────┘
  ┌──────────────────────────────────────┐
  │ KL-20250517-002         [DRAFT ⏳]  │
  │ Mas Budi                             │
  │ Ayam Geprek × 5 — Rp 75.000        │
  │ Hari ini siang          [78% ⚠️]   │
  └──────────────────────────────────────┘
```

### States

| State | Tampilan |
|---|---|
| Default | Semua order, terbaru di atas |
| Filter aktif | Chip filter terpilih highlight, list difilter |
| Search aktif | Keyboard muncul, list update real-time |
| Tidak ada hasil | "Tidak ada pesanan dengan filter ini" |

### CTA Utama
- **Tap card** → Order Detail

---

## Screen 4 — Order Detail

**Route:** `/orders/[id]`
**Diakses dari:** Daftar Pesanan, atau notifikasi

### Tujuan Layar
Detail lengkap satu order. Dari sini owner bisa approve, edit, atau lihat reminder QRIS.

### Konten Utama

```
Header     : "Detail Pesanan"  ← [Kembali]
Sub-header : KL-20250517-001  [● DRAFT]

SECTION: Pelanggan
  Nama     : Dinda Ayu
  Telepon  : 0812-3456-7890

SECTION: Item Pesanan
  Risol Mayo          × 12     Rp 42.000
  ────────────────────────────────────
  Total                        Rp 42.000

SECTION: Info Pengiriman
  Tanggal  : Besok, 18 Mei 2025
  Jam      : 15:00
  Metode   : Diantar

SECTION: Pembayaran
  Status   : [● Belum Bayar]
  Catatan  : "Bayar nanti sore"

SECTION: AI Info (hanya untuk draft)
  Keyakinan AI: [████████░░] 95%   ← confidence bar
  Field lengkap: ✓ Semua terisi

SECTION: Catatan
  "Pelanggan minta bayar nanti sore"

─────────────────────────────────────
TOMBOL AKSI (sticky bottom):

Jika status DRAFT:
  [✓ Approve Pesanan]         ← primary, full width
  [✏️ Edit]  [✗ Tolak]        ← secondary, row

Jika status DIKONFIRMASI:
  [📋 Salin Reminder QRIS]    ← primary
  [Update Status Bayar ▾]     ← dropdown: Lunas / Belum Bayar
```

### States

| State | Tampilan |
|---|---|
| Draft — confidence tinggi | Bar hijau, tombol Approve aktif |
| Draft — confidence rendah | Bar merah, warning "Perlu dicek", field missing disorot merah |
| Draft — ada missing field | Section "Perlu Dilengkapi" muncul di atas tombol |
| Dikonfirmasi — unpaid | Tombol QRIS muncul, badge unpaid amber |
| Dikonfirmasi — paid | Badge "Lunas" hijau, tidak ada tombol QRIS |
| Cancelled | Banner abu "Pesanan Dibatalkan", semua tombol disabled |

### CTA Utama
- **[✓ Approve Pesanan]** → trigger konfirmasi → QRIS Reminder Screen
- **[✏️ Edit]** → form edit inline atau modal
- **[✗ Tolak]** → konfirmasi → status cancelled

---

## Screen 5 — Owner Approval

**Route:** Modal di atas Order Detail (atau halaman `/orders/[id]/approve`)
**Diakses dari:** Tombol "Approve Pesanan" di Order Detail

### Tujuan Layar
Konfirmasi final sebelum order dikonfirmasi. Satu langkah penting yang menegaskan owner yang memutuskan, bukan AI.

### Konten Utama

```
Modal / Full Screen:

  ┌──────────────────────────────────────┐
  │  ✓ Konfirmasi Pesanan               │
  │                                      │
  │  "Pesanan dari Dinda Ayu akan        │
  │   dikonfirmasi. Pastikan detail      │
  │   sudah benar."                      │
  │                                      │
  │  RINGKASAN:                          │
  │  Dinda Ayu                           │
  │  Risol Mayo × 12                     │
  │  Besok, 15:00                        │
  │  Rp 42.000 — Belum Bayar            │
  │                                      │
  │  ┌────────────────────────────────┐  │
  │  │  ✓ Ya, Konfirmasi Pesanan     │  │
  │  └────────────────────────────────┘  │
  │          [Kembali / Batal]           │
  └──────────────────────────────────────┘
```

### States

| State | Tampilan |
|---|---|
| Default | Ringkasan order + 2 tombol |
| Loading (proses) | Tombol disable + spinner "Menyimpan..." |
| Sukses | Toast hijau "Pesanan Dikonfirmasi!" + redirect ke QRIS |
| Error | Toast merah "Gagal menyimpan. Coba lagi." |

### CTA Utama
- **[✓ Ya, Konfirmasi Pesanan]** → simpan ke DB, status → confirmed, buka QRIS screen

---

## Screen 6 — Payment Reminder QRIS Dummy

**Route:** `/orders/[id]/reminder` atau modal post-approval
**Diakses dari:** Setelah approve, atau tombol di Order Detail

### Tujuan Layar
Bu Rani mendapat preview reminder pembayaran yang bisa langsung disalin dan dikirim ke pelanggan. QRIS adalah dummy/milik merchant — bukan integrasi payment gateway.

### Konten Utama

```
Header     : "Reminder Pembayaran"  ← [Kembali]

CARD REMINDER:
  ┌──────────────────────────────────────┐
  │  KATERING BU RANI                   │
  │                                      │
  │         [QRIS IMAGE]                │
  │    ┌──────────────────────┐          │
  │    │  ▓▓▓ ▓ ▓▓▓ ▓ ▓▓▓  │          │
  │    │  ▓   ▓ ▓   ▓ ▓     │          │
  │    │  ▓▓▓ ▓ ▓▓▓ ▓ ▓▓▓  │          │
  │    │      ▓             ▓│          │
  │    └──────────────────────┘          │
  │    CONTOH — BUKAN UNTUK PEMBAYARAN   │
  │                                      │
  │  Untuk: Dinda Ayu                   │
  │  Pesanan: Risol Mayo × 12           │
  │  Total: Rp 42.000                   │
  └──────────────────────────────────────┘

PESAN SIAP KIRIM:
  ┌──────────────────────────────────────┐
  │  Halo Kak Dinda 👋                  │
  │  Terima kasih sudah pesan di        │
  │  Katering Bu Rani!                  │
  │                                      │
  │  Mohon transfer Rp 42.000 ke QRIS   │
  │  di atas ya Kak. Konfirmasi setelah │
  │  transfer. Terima kasih! 🙏         │
  └──────────────────────────────────────┘

TOMBOL:
  [📋 Salin Pesan Reminder]    ← primary
  [✓ Tandai Sudah Dikirim]     ← secondary

DISCLAIMER (kecil, bawah):
  "QRIS ini adalah contoh demo. Bu Rani
   mengirim sendiri ke pelanggan."
```

### States

| State | Tampilan |
|---|---|
| Default | Preview lengkap + 2 tombol |
| Setelah salin | Tombol berubah "✓ Tersalin!" (2 detik), lalu kembali normal |
| Setelah ditandai | Badge "Reminder Terkirim" muncul di order |

### CTA Utama
- **[📋 Salin Pesan Reminder]** → clipboard copy, toast "Tersalin!"
- **[✓ Tandai Sudah Dikirim]** → update log, kembali ke Dashboard

---

## Screen 7 — Production Planner

**Route:** `/production`
**Diakses dari:** Bottom nav tab ketiga

### Tujuan Layar
Daftar bahan yang harus disiapkan Bu Rani untuk produksi esok hari, dihitung otomatis dari order yang sudah dikonfirmasi. Aha moment screen.

### Konten Utama

```
Header     : "Persiapan Produksi"
Sub-header : "Untuk pesanan 18 Mei 2025"

INFO BAR:
  Berdasarkan 4 pesanan dikonfirmasi | 3 menu
  [Lihat detail pesanan →]

SECTION: Bahan yang Perlu Disiapkan

  ┌──────────────────────────────────────┐
  │ 🌾 Tepung Terigu                    │
  │     Butuh  : 1,7 kg                 │
  │     Stok   : 10 kg        [✓ Cukup] │
  └──────────────────────────────────────┘

  ┌──────────────────────────────────────┐
  │ 🥚 Telur                            │
  │     Butuh  : 6 butir                │
  │     Stok   : 60 butir     [✓ Cukup] │
  └──────────────────────────────────────┘

  ┌──────────────────────────────────────┐
  │ 🥕 Wortel                           │
  │     Butuh  : 0,52 kg                │
  │     Stok   : 3 kg         [✓ Cukup] │
  └──────────────────────────────────────┘

  [+ 3 bahan lainnya — Ketuk untuk lihat]

SECTION: Urutan Produksi
  1. Risol Mayo (26 pcs) — kirim Mbak Dewi jam 07:00
  2. Lumpia Basah (10 pcs) — bersamaan dengan risol
  3. Kopi Susu Gula Aren (2 liter) — kirim Kak Lisa jam 08:00
  4. Sisa Risol (12 pcs Dinda + 6 pcs Mas Agus) — sore
```

### States

| State | Tampilan |
|---|---|
| Normal (stok cukup) | Semua baris hijau "✓ Cukup" |
| Stok mendekati batas | Badge kuning "⚠ Hampir Habis" |
| Stok tidak cukup | Badge merah "✗ Perlu Beli", teks merah |
| Tidak ada order confirmed | Empty state: "Belum ada pesanan dikonfirmasi untuk besok" |

### CTA Utama
- Tidak ada CTA khusus — ini adalah halaman baca
- Tap item bahan → expand detail (dari menu mana, kalkulasinya)

---

## Screen 8 — Daily Summary

**Route:** `/summary`
**Diakses dari:** Bottom nav tab keempat

### Tujuan Layar
Rekap akhir hari. Bu Rani buka ini sebelum tutup toko untuk tahu situasi hari ini.

### Konten Utama

```
Header     : "Rekap Hari Ini"
Sub-header : Sabtu, 17 Mei 2025

SECTION: Angka Hari Ini
  ┌──────────────────────────────────────┐
  │  11         │  5          │  6       │
  │  Total      │  Dikonfirm- │  Draft   │
  │  Pesanan    │  asi        │          │
  ├─────────────┼─────────────┼──────────┤
  │  Rp 167.000 │  4 order    │  1 lunas │
  │  Belum Bayar│  unpaid     │          │
  └──────────────────────────────────────┘

SECTION: Perlu Perhatian Bu Rani
  ┌──────────────────────────────────────┐
  │  ⚠ 3 pesanan perlu dicek ulang     │
  │  Ketuk untuk lihat →                │
  └──────────────────────────────────────┘

SECTION: Ringkasan Narasi (AI-generated)
  ┌──────────────────────────────────────┐
  │  "Hari ini Katering Bu Rani         │
  │   menerima 11 pesanan baru. Lima    │
  │   sudah dikonfirmasi. Empat masih   │
  │   belum bayar total Rp 167.000.     │
  │   Besok siapkan 26 risol, 10 lumpia,│
  │   dan 2 liter kopi susu."           │
  │                                      │
  │  [✏️ Edit Ringkasan]                │
  └──────────────────────────────────────┘

SECTION: Produksi Besok
  [→ Lihat Production Planner]

SECTION: Impact Hari Ini (ringkas)
  13/15 chat diparse  •  Reminder disiapkan: 5
  [Lihat semua metrik →]
```

### States

| State | Tampilan |
|---|---|
| Default | Summary lengkap |
| Tidak ada order | "Hari ini tidak ada pesanan. Selamat istirahat!" |
| Ada order perlu cek | Section "Perlu Perhatian" muncul di atas |

### CTA Utama
- **[✏️ Edit Ringkasan]** → edit narasi sebelum dibagikan
- **[→ Lihat Production Planner]** → navigasi ke screen 7

---

## Screen 9 — Impact Dashboard

**Route:** `/impact`
**Diakses dari:** Link di halaman Daily Summary

### Tujuan Layar
Menampilkan metrik operasional dari data demo. Dipakai untuk demo ke juri. Semua angka dari data dummy — tidak ada klaim berlebih.

### Konten Utama

```
Header     : "Dampak Operasional"
Sub-header : "Berdasarkan data demo hari ini"

DISCLAIMER BAR:
  ⓘ Angka ini dari data demo. Bukan klaim bisnis.

SECTION: Metrik Parsing
  ┌──────────────────────────────────────┐
  │  13 dari 15                         │
  │  Chat berhasil diparse              │
  │  menjadi draft order                │
  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓░░  86,7%           │
  └──────────────────────────────────────┘

SECTION: Metrik Order
  ┌─────────────┐  ┌─────────────┐
  │      5      │  │      4      │
  │  Dikonfirm- │  │  Reminder   │
  │  asi        │  │  Siap Kirim │
  └─────────────┘  └─────────────┘
  ┌─────────────┐  ┌─────────────┐
  │      3      │  │      6      │
  │  Perlu Cek  │  │  Jenis Bahan│
  │             │  │  Terhitung  │
  └─────────────┘  └─────────────┘

SECTION: Simulasi Perbandingan
  ┌──────────────────────────────────────┐
  │  Tanpa Kuali   : ~40 menit rekap    │
  │  Dengan Kuali  : ~8 menit rekap     │
  │                                      │
  │  * Simulasi ilustratif dari demo    │
  └──────────────────────────────────────┘

SECTION: Tren Mingguan (dummy sparkline)
  ───────────────────
  Pesanan masuk 7 hari terakhir:
  8  10  14  9  11  7  11
  Mo Tu We Th Fr Sa Su
```

### States
Halaman ini bersifat read-only — tidak ada state interaktif selain scroll.

---

## Screen 10 — Roadmap Simulation Card

**Posisi:** Card terpisah di bagian bawah Impact Dashboard, atau tab "Roadmap" di Daily Summary
**Bukan halaman full — ini adalah card/section**

### Tujuan
Menampilkan visi roadmap untuk keperluan demo ke juri. Harus dibedakan secara visual dari fitur aktif.

### Konten

```
LABEL WAJIB:
  ┌──────────────────────────────────────┐
  │  🗺️  ROADMAP — Belum tersedia di    │
  │       MVP. Ini simulasi demo saja.  │
  │                          [Ungu/Abu] │
  └──────────────────────────────────────┘

CARD 1:
  ┌──────────────────────────────────────┐
  │  🛒 Belanja Bahan Bareng            │
  │                                      │
  │  UMKM sekitar bisa patungan beli    │
  │  bahan dalam jumlah besar — harga   │
  │  lebih efisien.                     │
  │                                      │
  │  [Berbasis consent pengguna]        │
  └──────────────────────────────────────┘

CARD 2:
  ┌──────────────────────────────────────┐
  │  ♻️ Sisa Stok Opt-in               │
  │                                      │
  │  Tawarkan sisa produksi ke          │
  │  pelanggan terdekat yang sudah      │
  │  opt-in — hanya jika owner setuju.  │
  │                                      │
  │  [Bukan broadcast otomatis]         │
  └──────────────────────────────────────┘
```

### Aturan Visual
- Background card: abu sangat muda (`#F4F4F2`)
- Border: 2px dashed abu (`#D1D5DB`)
- Badge: ungu (`#7C3AED`) teks "Roadmap"
- Opacity teks: 80% (menandakan "belum aktif")
- Tidak ada tombol CTA aktif

---

## Ringkasan Flow Utama untuk Demo

```
[Chat Dinda masuk]
      ↓
SCREEN 1: Mock WhatsApp — input chat, tekan Proses
      ↓
SCREEN 4/5: Draft Order Card muncul — confidence 95% — Approve
      ↓
SCREEN 5: Konfirmasi Approval — tekan "Ya, Konfirmasi"
      ↓
SCREEN 6: QRIS Dummy Reminder — salin pesan
      ↓
SCREEN 2: Dashboard — order masuk, angka update
      ↓
SCREEN 7: Production Planner — bahan terhitung [AHA MOMENT]
      ↓
SCREEN 8: Daily Summary — rekap hari ini
      ↓
SCREEN 9: Impact Dashboard — metrik demo
      ↓
SCREEN 10: Roadmap Card — visi ke depan [label jelas]
```

---

## Catatan Navigasi untuk Developer (HACKER-C)

| Dari | Aksi | Ke |
|---|---|---|
| Dashboard | Tap [+ Proses Chat Baru] | Mock WhatsApp UI |
| Dashboard | Tap card order | Order Detail |
| Dashboard | Tap [Lihat semua pesanan] | Daftar Pesanan |
| Daftar Pesanan | Tap card order | Order Detail |
| Order Detail (draft) | Tap [Approve] | Owner Approval modal |
| Owner Approval | Tap [Ya, Konfirmasi] | QRIS Reminder |
| QRIS Reminder | Tap [Salin] | Toast + tetap di halaman |
| QRIS Reminder | Tap [Tandai Terkirim] | Kembali ke Dashboard |
| Mock WhatsApp | Tap [Proses] | Draft Card muncul di bawah |
| Draft Card | Tap [Approve] | Owner Approval modal |
| Daily Summary | Tap [Lihat Production Planner] | Production Planner |
| Daily Summary | Tap [Lihat semua metrik] | Impact Dashboard |
| Impact Dashboard | Scroll ke bawah | Roadmap Card |
