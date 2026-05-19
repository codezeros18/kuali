# Low Fidelity Mockup Plan — Kuali

> Blueprint wireframe untuk seluruh 9 screen MVP Kuali.
> Gunakan ini sebagai acuan saat membuat mockup di Figma / Canva / Whimsical.
> Semua wireframe dalam representasi ASCII — proporsi mobile 360×780px.
> Simbol: █ = elemen solid | ░ = placeholder/gambar | ─ / │ = border

---

## Konvensi Wireframe

```
┌──────────────────────────────────────┐  ← frame HP (360px wide)
│ STATUS BAR                  9:41 ▐▌ │  ← status bar
├──────────────────────────────────────┤
│ HEADER / NAVBAR                      │  ← header 56px
├──────────────────────────────────────┤
│                                      │
│         CONTENT AREA                 │  ← scroll area
│                                      │
├──────────────────────────────────────┤
│  🏠    📋    🧑‍🍳    📊             │  ← bottom nav 64px
└──────────────────────────────────────┘

Komponen Legend:
  [████████████████]  = tombol primary (full width)
  [────────────────]  = tombol secondary / outline
  ┌─────────────────┐
  │ ░░ CARD ░░░░░░ │  = card dengan konten
  └─────────────────┘
  ● STATUS           = badge/pill status
  [▓▓▓▓▓▓░░░░]       = progress / confidence bar
```

---

## Screen 1 — Mock WhatsApp UI

**File Figma:** `screen-01-mock-whatsapp.fig`
**Prioritas:** P0 — wajib ada sebelum demo

```
┌──────────────────────────────────────┐
│ ◀  Chat Masuk            🧑‍🍳 Kuali │
├──────────────────────────────────────┤
│                                      │
│  ┌──────────────────────────────┐   │
│  │  ← Contoh Chat Dummy        │   │
│  │  Risol Mayo │ Nasi Box │ ...│   │
│  └──────────────────────────────┘   │
│                                      │
│  ╔══════════════════════════════╗   │
│  ║  👤 Dinda Ayu               ║   │
│  ╠══════════════════════════════╣   │
│  ║  "Kak mau pesan 12 risol    ║   │
│  ║   mayo buat besok jam 3,    ║   │
│  ║   atas nama Dinda. Bayar    ║   │
│  ║   nanti sore ya."           ║   │
│  ║                   08:15  ✓✓ ║   │
│  ╚══════════════════════════════╝   │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ Ketik atau tempel chat di   │   │
│  │ sini...                     │   │
│  │                             │   │
│  └──────────────────────────────┘   │
│                                      │
│  [████████ Proses dengan Kuali ████]│
│                                      │
│  ─────── Hasil Parsing ──────────   │
│  [Card muncul di sini setelah       │
│   diproses — lihat Screen 4]        │
│                                      │
│                                      │
├──────────────────────────────────────┤
│  🏠    📋    🧑‍🍳    📊             │
└──────────────────────────────────────┘
```

**Catatan desain:**
- Chat bubble kiri = pesan customer (background hijau muda, sudut kiri kotak)
- Preset chip menggunakan chat dari `dummy-chats.json`
- Tombol "Proses" disable jika textarea kosong
- Setelah diproses, scroll otomatis ke Draft Card di bawah

---

## Screen 2 — Dashboard Hari Ini

**File Figma:** `screen-02-dashboard.fig`
**Prioritas:** P0 — halaman utama

```
┌──────────────────────────────────────┐
│ ⠿  Kuali                   🔔       │
├──────────────────────────────────────┤
│                                      │
│  Selamat pagi, Bu Rani 👋            │
│  Sabtu, 17 Mei 2025                  │
│                                      │
│  ┌───────────┐  ┌───────────┐       │
│  │     11    │  │     4     │       │
│  │  Pesanan  │  │  ⚠ Blm   │       │
│  │  Hari Ini │  │    Bayar  │       │
│  └───────────┘  └───────────┘       │
│  ┌───────────┐  ┌───────────┐       │
│  │     3     │  │     5     │       │
│  │  Perlu    │  │  Draft    │       │
│  │  Dicek    │  │  Pending  │       │
│  └───────────┘  └───────────┘       │
│                                      │
│  [+██████ Proses Chat Baru ████████]│
│                                      │
│  ── Pesanan Terbaru ──────────────  │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ Dinda Ayu          ● DRAFT  │   │
│  │ Risol Mayo × 12             │   │
│  │ Besok 15:00      Rp 42.000 │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ Kak Rina       ● KONFIRMASI │   │
│  │ Nasi Kotak × 20             │   │
│  │ Jumat depan   Rp 500.000   │   │
│  └──────────────────────────────┘   │
│                                      │
│            Lihat semua →            │
│                                      │
├──────────────────────────────────────┤
│  🏠    📋    🧑‍🍳    📊             │
│  Aktif                               │
└──────────────────────────────────────┘
```

**Catatan desain:**
- 4 summary card = grid 2×2, touch area masing-masing tap ke Daftar Pesanan dengan filter
- Card "Belum Bayar" dan "Perlu Dicek" punya accent warna (amber dan merah)
- Tombol "Proses Chat Baru" = primary orange, full width dengan ikon +

---

## Screen 3 — Daftar Pesanan

**File Figma:** `screen-03-order-list.fig`
**Prioritas:** P0

```
┌──────────────────────────────────────┐
│ ◀  Pesanan                           │
├──────────────────────────────────────┤
│                                      │
│  ┌──────────────────────────────┐   │
│  │ 🔍 Cari nama atau nomor...  │   │
│  └──────────────────────────────┘   │
│                                      │
│  [Semua] [Draft] [Konfirmasi] [Blm ] │
│           Aktif             [Bayar]  │
│                                      │
│  ── Hari Ini ─────────────────────  │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ KL-20250517-001  ● Blm Bayar│   │
│  │ Dinda Ayu                   │   │
│  │ Risol Mayo × 12             │   │
│  │ Besok 15:00    [95% ✓] ▶   │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ KL-20250517-002  ● Draft    │   │
│  │ Mas Budi                    │   │
│  │ Ayam Geprek × 5             │   │
│  │ Hari ini siang [78% ⚠] ▶  │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ KL-20250517-004  ● Blm Bayar│   │
│  │ Mbak Dewi                   │   │
│  │ Risol × 8 + Lumpia × 10    │   │
│  │ Besok 07:00    [92% ✓] ▶   │   │
│  └──────────────────────────────┘   │
│                                      │
│  ── Minggu Lalu ───────────────────  │
│  [Lihat lebih banyak ↓]             │
│                                      │
├──────────────────────────────────────┤
│  🏠    📋    🧑‍🍳    📊             │
│        Aktif                         │
└──────────────────────────────────────┘
```

**Catatan desain:**
- Confidence score di pojok kanan bawah card (kecil, 12px)
- Filter chip horizontal scroll — satu bisa aktif saja
- Grouping by tanggal (Hari Ini / Kemarin / Minggu Lalu)

---

## Screen 4 — Order Detail + Draft Card

**File Figma:** `screen-04-order-detail.fig`
**Prioritas:** P0

```
┌──────────────────────────────────────┐
│ ◀  Detail Pesanan                    │
├──────────────────────────────────────┤
│                                      │
│  KL-20250517-001              ● DRAFT│
│                                      │
│  ── Pelanggan ────────────────────  │
│  Dinda Ayu                          │
│  0812-3456-7890                     │
│                                      │
│  ── Item Pesanan ─────────────────  │
│  Risol Mayo           × 12          │
│                           Rp 42.000 │
│  ─────────────────────────────────  │
│  Total                    Rp 42.000 │
│                                      │
│  ── Pengiriman ───────────────────  │
│  📅 Besok, 18 Mei 2025              │
│  🕒 15:00                           │
│  📦 Diantar                         │
│                                      │
│  ── Pembayaran ───────────────────  │
│  ● Belum Bayar                      │
│  "Bayar nanti sore"                 │
│                                      │
│  ── Keyakinan AI ─────────────────  │
│  [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░] 95%           │
│  ✓ Semua field terisi               │
│                                      │
│  ── Catatan ──────────────────────  │
│  Pelanggan minta bayar nanti sore   │
│                                      │
├──────────────────────────────────────┤
│                                      │
│  [████████ ✓ Approve Pesanan ██████]│
│                                      │
│  [──── ✏️ Edit ────] [── ✗ Tolak ──]│
│                                      │
└──────────────────────────────────────┘
```

**Varian — jika confidence rendah (chat-015):**
```
│  ── Keyakinan AI ─────────────────  │
│  [▓▓▓▓░░░░░░░░░░░░] 45%            │
│  ⚠ Perlu dicek Bu Rani             │
│                                      │
│  Field yang belum jelas:            │
│  ✗ Tanggal pengiriman              │
│  ✗ Varian menu (pedas?) belum ada  │
│  ✗ Status pembayaran               │
```

**Catatan desain:**
- Confidence bar: warna dinamis (merah/kuning/hijau)
- Missing field disorot dengan ikon ✗ merah
- Tombol Approve disabled jika ada missing field kritis (opsional — tergantung keputusan Leader)

---

## Screen 5 — Owner Approval (Modal)

**File Figma:** `screen-05-approval-modal.fig`
**Prioritas:** P0

```
┌──────────────────────────────────────┐
│ (backdrop semi-transparan)           │
│                                      │
│   ┌──────────────────────────────┐  │
│   │  ✓ Konfirmasi Pesanan        │  │
│   │                              │  │
│   │  "Pastikan detail sudah      │  │
│   │   benar sebelum konfirmasi." │  │
│   │                              │  │
│   │  ─────────────────────────  │  │
│   │  👤 Dinda Ayu               │  │
│   │  Risol Mayo × 12            │  │
│   │  Besok, 15:00               │  │
│   │  Rp 42.000 — Belum Bayar   │  │
│   │  ─────────────────────────  │  │
│   │                              │  │
│   │  [████ Ya, Konfirmasi ████] │  │
│   │                              │  │
│   │      [Kembali / Batal]       │  │
│   └──────────────────────────────┘  │
│                                      │
└──────────────────────────────────────┘
```

**Loading state:**
```
│   │  [  ⟳ Menyimpan...        ] │  │
```

**Success state (toast):**
```
┌──────────────────────────────────────┐
│  ✓ Pesanan Dikonfirmasi!             │  ← toast hijau, muncul 2 detik
└──────────────────────────────────────┘
```

**Catatan desain:**
- Modal di tengah layar, tidak full screen
- Backdrop 50% opacity hitam
- Radius card: 20px (lebih besar dari card biasa)

---

## Screen 6 — QRIS Dummy Reminder

**File Figma:** `screen-06-qris-reminder.fig`
**Prioritas:** P0

```
┌──────────────────────────────────────┐
│ ◀  Reminder Pembayaran               │
├──────────────────────────────────────┤
│                                      │
│  ┌──────────────────────────────┐   │
│  │       KATERING BU RANI      │   │
│  │                              │   │
│  │   ┌──────────────────────┐  │   │
│  │   │  ░░░░░░░░░░░░░░░░  │  │   │
│  │   │  ░░░  QRIS IMG  ░░░  │  │   │
│  │   │  ░░░░░░░░░░░░░░░░  │  │   │
│  │   └──────────────────────┘  │   │
│  │   CONTOH — BUKAN PEMBAYARAN │   │
│  │                              │   │
│  │  Untuk  : Dinda Ayu         │   │
│  │  Pesanan: Risol Mayo × 12   │   │
│  │  Total  : Rp 42.000         │   │
│  └──────────────────────────────┘   │
│                                      │
│  ── Pesan Siap Kirim ─────────────  │
│  ┌──────────────────────────────┐   │
│  │  Halo Kak Dinda 👋           │   │
│  │  Terima kasih sudah pesan   │   │
│  │  di Katering Bu Rani!       │   │
│  │                              │   │
│  │  Mohon transfer Rp 42.000   │   │
│  │  ke QRIS di atas ya Kak.   │   │
│  │  Konfirmasi setelah bayar.  │   │
│  │  Terima kasih! 🙏           │   │
│  └──────────────────────────────┘   │
│                                      │
│  [████████ 📋 Salin Pesan █████████]│
│  [────── ✓ Tandai Sudah Dikirim ───]│
│                                      │
│  ⓘ QRIS ini contoh demo. Bu Rani   │
│    kirim sendiri ke pelanggan.      │
│                                      │
├──────────────────────────────────────┤
│  🏠    📋    🧑‍🍳    📊             │
└──────────────────────────────────────┘
```

**Catatan desain:**
- QRIS image placeholder: kotak abu dengan label "QRIS DUMMY"
- Label "CONTOH — BUKAN PEMBAYARAN" wajib tampil di bawah QR
- Tombol "Salin" setelah diklik: berubah "✓ Tersalin!" (2 detik), lalu kembali normal
- Disclaimer kecil di bawah tombol, font 12px, abu

---

## Screen 7 — Production Planner

**File Figma:** `screen-07-production-planner.fig`
**Prioritas:** P0 — Aha Moment screen

```
┌──────────────────────────────────────┐
│ ◀  Persiapan Produksi                │
├──────────────────────────────────────┤
│                                      │
│  Untuk pesanan Minggu, 18 Mei 2025  │
│  Dari 4 pesanan dikonfirmasi        │
│                                [ⓘ] │
│                                      │
│  ── Bahan yang Perlu Disiapkan ───  │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ 🌾  Tepung Terigu           │   │
│  │     Butuh : 1,7 kg          │   │
│  │     Stok  : 10 kg  [✓ Cukup]│   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ 🥚  Telur                   │   │
│  │     Butuh : 6 butir         │   │
│  │     Stok  : 60 butir [✓ Cukup│   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ 🥕  Wortel                  │   │
│  │     Butuh : 0,52 kg         │   │
│  │     Stok  : 3 kg   [✓ Cukup]│   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ ⚠ Cabai Rawit               │   │  ← contoh stok hampir habis
│  │     Butuh : 0,3 kg          │   │
│  │     Stok  : 0,5 kg [⚠ Tipis]│   │
│  └──────────────────────────────┘   │
│                                      │
│  [+ 2 bahan lainnya ▼]              │
│                                      │
│  ── Urutan Produksi ──────────────  │
│  1. Risol Mayo (26 pcs) — 07:00    │
│  2. Lumpia Basah (10 pcs)           │
│  3. Kopi Susu (2 liter) — 08:00    │
│  4. Sisa risol — sore hari          │
│                                      │
├──────────────────────────────────────┤
│  🏠    📋    🧑‍🍳    📊             │
│              Aktif                   │
└──────────────────────────────────────┘
```

**Varian stok kurang (untuk demo edge case):**
```
│  ┌──────────────────────────────┐   │
│  │ ✗ Mayones                   │   │
│  │     Butuh : 0,5 kg          │   │
│  │     Stok  : 0,26 kg [✗ Beli]│   │  ← merah, perlu beli
│  └──────────────────────────────┘   │
```

**Catatan desain:**
- Badge status: hijau (Cukup), kuning (Tipis), merah (Perlu Beli)
- Tap item → expand detail: "Dari order mana" + kalkulasi
- Tidak ada tombol CTA besar — halaman ini untuk baca

---

## Screen 8 — Daily Summary

**File Figma:** `screen-08-daily-summary.fig`
**Prioritas:** P0

```
┌──────────────────────────────────────┐
│ ◀  Rekap Hari Ini                    │
├──────────────────────────────────────┤
│                                      │
│  Sabtu, 17 Mei 2025                 │
│                                      │
│  ┌──────────────────────────────┐   │
│  │  11    │    5    │    6      │   │
│  │ Total  │ Konfirm │  Draft    │   │
│  ├────────┼─────────┼───────────┤   │
│  │ 167rb  │ 4 order │  1 Lunas  │   │
│  │ Blm Byr│  unpaid │           │   │
│  └──────────────────────────────┘   │
│                                      │
│  ┌──────────────────────────────┐   │
│  │  ⚠ 3 pesanan perlu dicek    │   │
│  │  Lihat detail →             │   │
│  └──────────────────────────────┘   │
│                                      │
│  ── Ringkasan ────────────────────  │
│  ┌──────────────────────────────┐   │
│  │  "Hari ini 11 pesanan baru. │   │
│  │   5 dikonfirmasi. 4 belum   │   │
│  │   bayar Rp 167.000. Besok  │   │
│  │   siapkan 26 risol, 10      │   │
│  │   lumpia, dan 2L kopi susu."│   │
│  │                              │   │
│  │           [✏️ Edit]          │   │
│  └──────────────────────────────┘   │
│                                      │
│  [────── Lihat Production Planner ─]│
│                                      │
│  ── Cepat ────────────────────────  │
│  13/15 chat diparse • 5 reminder   │
│  [Lihat semua metrik →]             │
│                                      │
├──────────────────────────────────────┤
│  🏠    📋    🧑‍🍳    📊             │
│                          Aktif       │
└──────────────────────────────────────┘
```

**Catatan desain:**
- Tabel angka: 3 kolom, border ringan
- Card "Perlu Dicek" pakai border amber dan background amber muda
- Ringkasan narasi: font 14px, italic, warna abu gelap
- Tombol Edit narasi kecil, di dalam card

---

## Screen 9 — Impact Dashboard

**File Figma:** `screen-09-impact-dashboard.fig`
**Prioritas:** P1

```
┌──────────────────────────────────────┐
│ ◀  Dampak Operasional                │
├──────────────────────────────────────┤
│                                      │
│  ┌──────────────────────────────┐   │
│  │ ⓘ Angka ini dari data demo. │   │
│  │   Bukan klaim bisnis.        │   │
│  └──────────────────────────────┘   │
│                                      │
│  ── Chat & Parsing ───────────────  │
│  ┌──────────────────────────────┐   │
│  │  13 dari 15 chat diparse    │   │
│  │  [▓▓▓▓▓▓▓▓▓▓▓▓▓░░] 86,7%  │   │
│  └──────────────────────────────┘   │
│                                      │
│  ┌──────────┐  ┌──────────────────┐ │
│  │    5     │  │        4         │ │
│  │Dikonfirm.│  │  Reminder Siap   │ │
│  └──────────┘  └──────────────────┘ │
│  ┌──────────┐  ┌──────────────────┐ │
│  │    3     │  │        6         │ │
│  │Perlu Cek │  │  Bahan Terhitung │ │
│  └──────────┘  └──────────────────┘ │
│                                      │
│  ── Simulasi Perbandingan ────────  │
│  ┌──────────────────────────────┐   │
│  │  Tanpa Kuali  : ~40 mnt     │   │
│  │  Dengan Kuali : ~8 mnt      │   │
│  │  * Simulasi ilustratif      │   │
│  └──────────────────────────────┘   │
│                                      │
│  ── Tren 7 Hari (Simulasi) ───────  │
│                                      │
│    14 │         ●                   │
│    11 │    ●         ●     ●        │
│     9 │        ●                    │
│     8 │●                            │
│     7 │              ●              │
│       └──────────────────────────   │
│        Sen Sel Rab Kam Jum Sab Min  │
│                                      │
│  ── Roadmap Preview ──────────────  │
│  [Lihat roadmap simulation ↓]       │
│                                      │
├──────────────────────────────────────┤
│  🏠    📋    🧑‍🍳    📊             │
└──────────────────────────────────────┘
```

**Catatan desain:**
- Disclaimer bar: background biru sangat muda, ikon ⓘ, teks kecil
- Grafik tren: sparkline sederhana (bukan chart library berat)
- 4 metric card: grid 2×2, angka besar, label kecil

---

## Screen 10 — Roadmap Simulation Card

**Posisi:** Section bawah Impact Dashboard (bukan halaman tersendiri)

```
┌──────────────────────────────────────┐
│                                      │
│  ── 🗺️ Roadmap ──────────────────── │
│  Fitur ini sedang direncanakan.      │
│  Belum tersedia di MVP.              │
│                                      │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  │
│  │ [ROADMAP]                     │  │  ← badge ungu
│  │ 🛒 Belanja Bahan Bareng       │  │
│  │                                │  │
│  │ UMKM sekitar bisa patungan    │  │
│  │ beli bahan — harga lebih      │  │
│  │ efisien.                      │  │
│  │                                │  │
│  │ Berbasis consent pengguna.    │  │
│   ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│                                      │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  │
│  │ [ROADMAP]                     │  │
│  │ ♻️ Sisa Stok Opt-in          │  │
│  │                                │  │
│  │ Tawarkan sisa ke pelanggan    │  │
│  │ yang sudah opt-in saja.       │  │
│  │ Bukan broadcast otomatis.     │  │
│   ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│                                      │
└──────────────────────────────────────┘
```

**Catatan desain wajib:**
- Border card: 2px `dashed` abu (bukan solid)
- Background: abu sangat muda (`#F4F4F2`)
- Badge "ROADMAP": background ungu, teks putih, 11px
- Opacity teks konten: 70–80%
- Tidak ada tombol CTA aktif di dalam card roadmap

---

## Checklist Mockup untuk HIPSTER-B

### Sebelum mulai di Figma/Canva

- [ ] Baca `UI_MOODBOARD.md` untuk palet warna dan tipografi
- [ ] Baca `USER_FLOW_UI.md` untuk navigasi dan states
- [ ] Setup artboard: **360×780px** (Android mid-low)
- [ ] Import font Poppins + Inter ke Figma

### Screen yang wajib selesai sebelum pitch

- [ ] Screen 1 — Mock WhatsApp UI
- [ ] Screen 2 — Dashboard Hari Ini
- [ ] Screen 4 — Order Detail (dengan confidence bar)
- [ ] Screen 5 — Owner Approval (modal)
- [ ] Screen 6 — QRIS Dummy Reminder
- [ ] Screen 7 — Production Planner ⭐ (aha moment)

### Screen yang bisa dikerjakan setelah P0 core selesai

- [ ] Screen 3 — Daftar Pesanan
- [ ] Screen 8 — Daily Summary
- [ ] Screen 9 — Impact Dashboard
- [ ] Screen 10 — Roadmap Simulation Card

### Acceptance Criteria Mockup

- [ ] Semua teks dalam Bahasa Indonesia
- [ ] Tombol CTA tinggi minimum 52px (touch-friendly)
- [ ] Tidak ada teks di bawah 12px
- [ ] Status badge berwarna dan terbaca tanpa baca label (color meaning)
- [ ] QRIS card ada label "CONTOH — BUKAN PEMBAYARAN"
- [ ] Roadmap card ada label "ROADMAP" dan border dashed
- [ ] Tidak ada tampilan kasir, struk, atau receipt
- [ ] Bisa dibaca satu tangan (elemen penting dalam 360px width)
