# Mockup Requirements — Kuali MVP
### Spesifikasi Lengkap untuk Produksi Visual Mockup

> Dokumen ini ditujukan untuk **HIPSTER-B** yang akan membuat mockup di Figma, Canva, atau Whimsical.
> Referensi warna dan tipografi: `docs/proposal/UI_MOODBOARD.md`
> Referensi wireframe ASCII: `docs/proposal/LOW_FIDELITY_MOCKUP_PLAN.md`
> Referensi teks: `docs/design/COPYWRITING_ID.md`
> Jangan buat mockup yang bertentangan dengan konten dan navigasi di dokumen ini.

---

## Setup Awal

### Artboard
- **Ukuran:** 360 × 780 px (Android mid-low, paling umum dipakai target user)
- **Safe area atas:** 24px (status bar simulasi)
- **Safe area bawah:** 64px (bottom nav) + 16px extra
- **Padding horizontal halaman:** 16px kiri dan kanan

### Grid
- Kolom: 4 kolom, gutter 8px, margin 16px
- Row: skala 8px

### Font yang Digunakan
- **Heading (H1–H2):** Poppins SemiBold
- **Body utama:** Inter Regular / Medium
- **Caption / label kecil:** Inter Regular
- Import keduanya dari Google Fonts sebelum mulai

### Warna Utama (dari UI_MOODBOARD.md)
```
Primary CTA   : #E8541A  (Oranye Kuali)
Background    : #FAFAF8  (Putih Hangat)
Surface/Card  : #FFFFFF
Text Dark     : #1A1A1A
Text Mid      : #6B6B6B
Text Light    : #ADADAD
Confirmed     : #16A34A  (Hijau)
Draft         : #D97706  (Amber)
Needs Check   : #DC2626  (Merah)
Roadmap       : #7C3AED  (Ungu)
Surface Alt   : #F4F4F2  (Abu sangat muda)
```

### Component Library
- Icon: **Lucide React** icon set (atau Lucide SVG exports)
- Stroke width icon: 1.5px
- Ukuran icon default: 20px; action button: 24px

---

## Standar Komponen

### Button

| Tipe | BG | Text | Height | Radius |
|---|---|---|---|---|
| Primary | `#E8541A` | Putih 16px SemiBold | 52px min | 12px |
| Secondary | `#FFF` border `#E8541A` | `#E8541A` 16px SemiBold | 52px min | 12px |
| Destructive | `#DC2626` | Putih 16px SemiBold | 52px min | 12px |
| Ghost | Transparan | `#6B6B6B` 15px | auto | — |

Touch target minimum: **44×44px**. Semua tombol harus memenuhi ini.

### Status Badge / Pill
- Padding: 4px horizontal 10px
- Font: 12px SemiBold
- Radius: 99px (pill)
- Warna sesuai status (lihat warna di atas)

### Card
- Background: `#FFFFFF`
- Shadow: `0 1px 3px rgba(0,0,0,0.08)`
- Radius: 16px
- Padding: 16px
- Gap antar card: 12px

### Input Field
- Background: `#F4F4F2`
- Border focus: `1.5px solid #E8541A`
- Radius: 10px
- Height: 48px
- Font: 15px Regular

### Confidence Score Bar
- Container: 8px height, radius full, bg `#F4F4F2`
- Fill warna: merah < 0.5 / kuning 0.5–0.7 / hijau muda 0.7–0.9 / hijau solid ≥ 0.9

### Roadmap Card (aturan ketat)
- Border: `2px dashed #D1D5DB`
- Background: `#F4F4F2`
- Badge: bg `#7C3AED`, teks putih 11px, label "ROADMAP"
- Opacity konten: 70–80%
- Tidak ada tombol CTA aktif di dalam card

---

## Acceptance Criteria Umum

Semua mockup harus memenuhi checklist ini:

- [ ] Artboard 360×780px
- [ ] Semua teks Bahasa Indonesia (sesuai `COPYWRITING_ID.md`)
- [ ] Tidak ada teks di bawah 12px
- [ ] Touch target semua tombol ≥ 44×44px
- [ ] Tombol CTA height ≥ 52px
- [ ] Status badge berwarna sesuai makna (tidak butuh baca label untuk tahu arti)
- [ ] Font: Poppins untuk heading, Inter untuk body
- [ ] Tidak ada tampilan kasir, struk, receipt, atau meja
- [ ] QRIS card selalu ada label "CONTOH — BUKAN PEMBAYARAN"
- [ ] Roadmap card selalu ada badge "ROADMAP" dan border dashed
- [ ] Elemen penting dalam jangkauan satu tangan di 360px width
- [ ] Bottom navigation selalu terlihat di semua screen (kecuali modal)

---

## Per-Screen Requirements

---

### S01 — Mock WhatsApp Chat

**Artboard:** 360×780px
**Background:** `#FAFAF8` (bukan hijau WhatsApp penuh — ini bukan klon WA)

**Elemen Wajib:**
1. Header: label "Chat Masuk" + nama toko kanan
2. Chip preset: horizontal scroll, max 4 chip terlihat
3. Chat bubble simulasi: background `#DCF8C6` (hijau muda), sudut kiri kotak, kanan rounded, timestamp `08:15 ✓✓`
4. Textarea: background `#F4F4F2`, placeholder abu, radius 10px
5. Tombol "Proses dengan Kuali": primary orange, full width, disabled state (abu) saat textarea kosong
6. Divider "── Hasil Parsing ──"
7. Area placeholder Draft Card (visible setelah parsing)
8. Bottom nav

**Asset yang dibutuhkan:** Tidak ada asset tambahan untuk S01.

---

### S02 — AI Parsed Draft Order

**Artboard:** 360×780px (scroll content)

**Elemen Wajib:**
1. Header "Detail Pesanan" + order number
2. Status badge "DRAFT" (amber)
3. Section "Pelanggan": nama + nomor WA
4. Section "Item Pesanan": nama menu, qty kanan, Rp kanan, total di bawah
5. Section "Pengiriman": ikon kalender + tanggal, ikon jam + waktu, ikon pengiriman + metode
6. Section "Pembayaran": status badge + kutipan dari chat
7. **Confidence bar** dengan label persentase dan status teks (warna dinamis)
8. Missing fields jika ada (merah, ikon ✗)
9. Collapsible "Chat Asli"
10. 3 tombol di bawah: Approve (primary), Edit (secondary), Tolak (destructive)

**Buat 2 varian:**
- Varian A: confidence 95%, semua field lengkap (happy path / chat-001)
- Varian B: confidence 45%, 3 missing fields (low confidence / chat-015)

---

### S03 — Owner Approval Modal

**Artboard:** 360×780px (dengan backdrop)
**Backdrop:** `rgba(0,0,0,0.5)` di belakang modal

**Elemen Wajib:**
1. Backdrop semi-transparan
2. Modal card: radius 20px, bg putih, shadow kuat, lebar 320px, centered
3. Judul "Konfirmasi Pesanan" (16px SemiBold)
4. Teks instruksi (14px, abu)
5. Divider
6. Ringkasan 4 baris: pelanggan, menu, total, pengiriman
7. Tombol "Ya, Konfirmasi" (primary, full width dalam modal)
8. Tombol "Kembali" (ghost, full width dalam modal)

**Buat 3 state:**
- State 1: Modal default (tombol aktif)
- State 2: Loading state ("Menyimpan..." + spinner)
- State 3: Toast sukses "✓ Pesanan Dikonfirmasi!" (modal sudah tutup, toast hijau di atas)

---

### S04 — Dashboard Hari Ini

**Artboard:** 360×780px

**Elemen Wajib:**
1. Header: logo Kuali kiri + icon notifikasi kanan
2. Sapaan: "Selamat pagi, Bu Rani 👋" + tanggal
3. **4 summary card (grid 2×2):** masing-masing dengan angka besar (24px) + label kecil (12px)
   - Card "Belum Bayar": accent amber, angka 4
   - Card "Perlu Dicek": accent merah, angka 3
   - Card "Pesanan Hari Ini": neutral, angka 11
   - Card "Draft Pending": neutral, angka 6
4. Tombol "Proses Chat Baru" (primary, full width, ikon + kiri)
5. Header "Pesanan Terbaru"
6. 2–3 order card preview: nama, menu, status badge, nominal, jam
7. Link "Lihat semua →" (ghost, right-aligned)
8. Bottom nav (Tab 1 aktif, oranye)

---

### S05 — QRIS Dummy Reminder

**Artboard:** 360×780px (scroll content)

**Elemen Wajib:**
1. Header "Reminder Pembayaran"
2. QRIS Card: nama toko uppercase, QRIS image placeholder, label "CONTOH — BUKAN PEMBAYARAN" (bold, merah atau hitam)
3. Detail: Untuk, Pesanan, Total (layout label: value)
4. Divider "── Pesan Siap Dikirim ──"
5. Preview pesan dalam box abu muda (radius 10px, padding 16px, font 14px)
6. Tombol "📋 Salin Pesan" (primary, full width)
7. Tombol "✓ Tandai Sudah Dikirim" (secondary, full width)
8. Disclaimer: ikon ⓘ + teks 12px abu (wajib, tidak boleh dihapus)
9. Bottom nav

**Asset yang dibutuhkan:** `assets/qris-dummy.png` — min 200×200px, putih, border hitam tipis, label "CONTOH" di bawah QR pattern

---

### S06 — Production Planner ⭐

**Artboard:** 360×780px (scroll content, ini screen paling panjang)

**Elemen Wajib:**
1. Header "Persiapan Produksi" + ikon `[ⓘ]` kanan
2. Subtitle: tanggal produksi + jumlah order
3. Section header "Bahan yang Perlu Disiapkan"
4. **Per bahan card:**
   - Emoji/ikon bahan kiri
   - Nama bahan (15px SemiBold)
   - "Butuh : [N] [satuan]"
   - "Stok  : [N] [satuan] + status badge"
   - Badge: hijau (✓ Cukup), kuning (⚠ Tipis), merah (✗ Perlu Beli)
5. Accordion "Expand detail": detail kalkulasi per order
6. Tombol "+ [N] bahan lainnya ▼"
7. Section "Urutan Produksi" (list bernomor)
8. Bottom nav (Tab 3 aktif)

**Buat 2 varian bahan:**
- Semua cukup (happy path)
- 1 bahan merah "Perlu Beli" (edge case demo)

**Data yang digunakan (dari canonical demo):**
- Tepung Terigu: 1,70 kg (stok 10 kg → Cukup)
- Telur: 6 butir (stok 60 butir → Cukup)
- Wortel: 520 g (stok 3 kg → Cukup)
- Mayones: 260 g (stok 500 g → Tipis/Cukup)
- Minyak Goreng: 720 ml
- Gula Aren: 200 g

---

### S07 — Daily Summary

**Artboard:** 360×780px

**Elemen Wajib:**
1. Header "Rekap Hari Ini"
2. Tanggal
3. Tabel ringkasan 2 baris × 3 kolom (border ringan, background putih)
   - Angka **11 / 5 / 6** (baris 1)
   - **Rp167.000 / 4 / 1** (baris 2)
4. Card peringatan amber: "⚠ 3 pesanan perlu dicek → Lihat detail"
5. Card narasi summary: teks italic abu + tombol edit kecil
6. Tombol "Lihat Production Planner" (secondary)
7. Link "Lihat semua metrik →" (ghost)
8. Quick stats bar: "13/15 chat diparse · 4 reminder siap"
9. Bottom nav (Tab 4 aktif)

---

### S08 — Impact Dashboard

**Artboard:** 360×780px (scroll)

**Elemen Wajib:**
1. Header "Dampak Operasional"
2. **Disclaimer bar** (wajib): background biru sangat muda `#EFF6FF`, ikon ⓘ, teks 12px abu
3. Parsing metric: teks + progress bar (86,7%, hijau)
4. **4 metric card (grid 2×2):** angka besar 36px, label 12px
5. Perbandingan waktu card: 2 baris + catatan "* Simulasi ilustratif"
6. Sparkline chart tren 7 hari (sederhana, bukan chart library berat — bisa SVG atau canvas minimal)
7. Link "Lihat roadmap simulation ↓"
8. Section S09 di bawah
9. Bottom nav

---

### S09 — Roadmap Simulation Card

**Artboard:** Dalam S08, bukan screen terpisah

**Elemen Wajib:**
1. Section header "🗺️ Roadmap" + subteks
2. Card Belanja Bareng:
   - Border `2px dashed #D1D5DB`
   - Background `#F4F4F2`
   - Badge "ROADMAP" (ungu `#7C3AED`)
   - Ikon 🛒 + judul + deskripsi + catatan consent
3. Card Sisa Stok Opt-in (format sama)
4. **Tidak ada tombol aktif** di dalam kedua card

---

## Priority Order untuk Produksi Mockup

### Batch 1 — Wajib Sebelum Demo (P0 Core)
Kerjakan berurutan, selesai satu baru lanjut:

| # | Screen | Waktu Estimasi |
|---|---|---|
| 1 | S04 Dashboard | 2 jam |
| 2 | S01 Mock WhatsApp | 1,5 jam |
| 3 | S02 Draft Order (2 varian) | 2 jam |
| 4 | S03 Approval Modal (3 state) | 1 jam |
| 5 | S06 Production Planner ⭐ | 2,5 jam |
| 6 | S05 QRIS Dummy Reminder | 1,5 jam |

**Total estimasi Batch 1:** ~10,5 jam

### Batch 2 — Sebelum Pitch (P0 Supporting)

| # | Screen | Waktu Estimasi |
|---|---|---|
| 7 | S07 Daily Summary | 1,5 jam |
| 8 | Daftar Pesanan (`/orders`) | 1,5 jam |

**Total estimasi Batch 2:** ~3 jam

### Batch 3 — Nice to Have (P1)

| # | Screen | Waktu Estimasi |
|---|---|---|
| 9 | S08 Impact Dashboard | 2 jam |
| 10 | S09 Roadmap Card (dalam S08) | 0,5 jam |

---

## Asset yang Dibutuhkan

| Asset | Spesifikasi | Prioritas | Status |
|---|---|---|---|
| `assets/logo-kuali.png` | Min 512×512px, transparan, oranye | P0 | ❌ Belum ada |
| `assets/qris-dummy.png` | Min 400×400px, label "CONTOH" di bawah | P0 | ❌ Belum ada |
| Avatar Bu Rani (ilustrasi) | Flat illustration, bukan foto, 200×200px | P1 | ❌ Belum ada |
| Ikon bahan (6 emoji/flat icon) | Tepung, Telur, Wortel, Mayones, Minyak, Gula | P0 | Bisa pakai emoji |
| Empty state illustration | Chat kosong, order kosong | P2 | ❌ Belum ada |

---

## Output File Naming Convention

```
screen-01-mock-whatsapp.fig     (atau .png untuk export)
screen-02-draft-order-a.fig     (varian A: confidence tinggi)
screen-02-draft-order-b.fig     (varian B: confidence rendah)
screen-03-approval-default.fig
screen-03-approval-loading.fig
screen-03-approval-toast.fig
screen-04-dashboard.fig
screen-05-qris-reminder.fig
screen-06-production-planner.fig
screen-07-daily-summary.fig
screen-08-impact-dashboard.fig  (include S09)
```

Export untuk pitch: PNG @2x, background tidak transparan.

---

## Hal yang Tidak Boleh Ada di Mockup

| Larangan | Alasan |
|---|---|
| Tampilan kasir / struk / receipt | Kuali bukan POS |
| Tabel dengan lebih dari 4 kolom | Tidak mobile-friendly di 360px |
| Form lebih dari 5 field sekaligus | Terlalu berat untuk owner sambil produksi |
| Grafik candlestick / scatter / multi-axis | Tidak relevan |
| Tombol "Bayar Sekarang" apapun | Bukan fitur MVP |
| Teks bahasa Inggris tanpa konteks | User target mungkin tidak familiar |
| QRIS tanpa disclaimer | Menyesatkan |
| Roadmap card tanpa badge ROADMAP | Wajib dibedakan secara visual |
| Touch target < 44px | Tidak bisa ditekan satu tangan |
| Teks < 12px | Tidak terbaca di HP kentang |

---

*Dokumen ini adalah spesifikasi lengkap mockup untuk HIPSTER-B.*
*Setelah mockup dibuat, review bersama Leader sebelum dipakai di pitch.*
*Wireframe ASCII sebagai referensi tata letak: `docs/proposal/LOW_FIDELITY_MOCKUP_PLAN.md`.*
