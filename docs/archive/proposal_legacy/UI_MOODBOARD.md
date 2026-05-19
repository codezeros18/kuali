# UI Moodboard — Kuali

> Panduan visual dan tone untuk seluruh UI Kuali MVP.
> Dokumen ini untuk HIPSTER-B dan HACKER-C sebagai acuan desain dan implementasi.
> Phase 0 — Baseline. Bisa direvisi setelah mockup direview Leader.

---

## 1. Tone dan Kepribadian Visual

Kuali digunakan oleh Bu Rani — 38 tahun, catering rumahan, pakai HP Android mid-low, sering buka app sambil produksi. UI harus mencerminkan:

| Atribut | Penjelasan |
|---|---|
| **Hangat** | Bukan cold corporate blue. Warna memberi kesan dapur, makanan, kepercayaan. |
| **Ringkas** | Satu layar, satu tujuan. Tidak ada informasi yang tidak perlu. |
| **Jelas** | Status langsung terbaca. Tidak perlu baca keterangan panjang. |
| **Besar** | Tombol besar. Teks tidak kecil. Mudah dipakai satu tangan sambil masak. |
| **Bukan POS** | Tidak ada tampilan kasir, struk, meja, atau receipt. Ini operasional chat. |
| **Bukan Dashboard Analis** | Tidak ada grafik kompleks, tabel besar, atau angka kecil-kecil. |

---

## 2. Palet Warna

### Warna Utama

```
Primary    — #E8541A  (Oranye Kuali)
           Terinspirasi dari wajan panas dan kehangatan dapur.
           Digunakan untuk: CTA utama, header aktif, aksen brand.

Background — #FAFAF8  (Putih Hangat)
           Bukan pure white. Memberi kesan bersih tapi tidak dingin.
           Digunakan untuk: background halaman utama.

Surface    — #FFFFFF  (Kartu/Panel)
           Digunakan untuk: card, modal, input area.

Text Dark  — #1A1A1A  (Hampir Hitam)
           Digunakan untuk: heading, body text utama.

Text Mid   — #6B6B6B  (Abu Sedang)
           Digunakan untuk: label, placeholder, teks sekunder.

Text Light — #ADADAD  (Abu Muda)
           Digunakan untuk: disabled state, hint text.
```

### Warna Status

```
Confirmed  — #16A34A  (Hijau Solid)
           Teks putih di atas background hijau.
           Makna: order sudah dikonfirmasi owner.

Draft      — #D97706  (Amber/Kuning Tua)
           Teks putih di atas background amber.
           Makna: menunggu approval owner.

Needs Check — #DC2626  (Merah)
           Teks putih di atas background merah.
           Makna: confidence rendah, perlu verifikasi.

Paid       — #059669  (Hijau Terang)
           Pill/badge kecil.
           Makna: sudah bayar.

Unpaid     — #B45309  (Coklat Tua / Amber Dark)
           Pill/badge kecil.
           Makna: belum bayar, perlu ditagih.

Cancelled  — #9CA3AF  (Abu Netral)
           Teks abu gelap.
           Makna: order dibatalkan.

Roadmap    — #7C3AED  (Ungu)
           Khusus untuk card/label roadmap simulation.
           Makna: fitur ini belum tersedia di MVP.
```

### Warna Aksen

```
Info       — #0EA5E9  (Biru Muda)
           Digunakan untuk: tooltip, info box, hint.

Warning    — #F59E0B  (Kuning)
           Digunakan untuk: stok mendekati batas, perlu perhatian.

Surface Alt — #F4F4F2  (Abu Sangat Muda)
           Digunakan untuk: background section dalam card.
```

---

## 3. Tipografi

### Font

- **Primary Font:** [Inter](https://fonts.google.com/specimen/Inter) atau **Poppins**
  - Inter: lebih technical, clean, banyak dipakai
  - Poppins: lebih bulat, friendlier — lebih cocok tone Kuali
  - Pilihan final: **Poppins** untuk heading, **Inter** untuk body teks panjang

- **Fallback:** `system-ui, -apple-system, sans-serif`

### Ukuran Teks

```
Display    36px  Bold      Angka besar di impact dashboard
H1        24px  SemiBold  Judul halaman
H2        18px  SemiBold  Judul section/card
H3        16px  Medium    Sub-section, label card
Body      15px  Regular   Teks konten utama
Body SM   13px  Regular   Label sekunder, timestamp, hint
Caption   11px  Regular   Disclaimer, footer note
```

> **Aturan minimum:** Tidak ada teks di bawah 12px. HP kentang dengan layar kecil harus tetap bisa baca.

### Line Height

- Body: 1.6
- Heading: 1.3
- Caption: 1.5

---

## 4. Spacing dan Grid

### Prinsip Spacing (Skala 4px)

```
xs    4px    Jarak antar elemen sangat dekat (icon-label)
sm    8px    Padding dalam badge/pill
md    12px   Jarak antar list item
lg    16px   Padding card internal
xl    20px   Jarak antar section
2xl   24px   Padding halaman horizontal
3xl   32px   Jarak besar antar block
4xl   48px   Margin top/bottom section besar
```

### Layout

- Padding horizontal halaman: **16px** (kiri dan kanan)
- Max width card: **100%** (full width mobile)
- Gap antar card dalam list: **12px**
- Bottom safe area (bottom nav): **64px + 16px extra**

---

## 5. Komponen UI

### Button

```
PRIMARY (CTA Utama)
──────────────────────────────────────
Background : #E8541A
Text       : #FFFFFF, 16px, SemiBold
Border Rad : 12px
Height     : 52px minimum (touch target besar)
Padding    : 16px horizontal
Shadow     : ringan (2px 4px rgba(0,0,0,0.1))

Contoh label: "Approve Order", "Simpan Pesanan"

──────────────────────────────────────
SECONDARY
Background : #FFFFFF
Border     : 1.5px solid #E8541A
Text       : #E8541A, 16px, SemiBold
Border Rad : 12px
Height     : 52px

Contoh label: "Edit", "Lihat Detail"

──────────────────────────────────────
DESTRUCTIVE
Background : #DC2626
Text       : #FFFFFF, 16px, SemiBold
Height     : 52px

Contoh label: "Tolak Order", "Batalkan"

──────────────────────────────────────
GHOST / TEXT ONLY
Background : Transparent
Text       : #6B6B6B, 15px
Tidak ada border

Contoh label: "Lewati", "Lihat semua →"
```

### Status Badge / Pill

```
Ukuran    : Padding 4px 10px, font 12px SemiBold, border-radius 99px
Contoh    : ● Dikonfirmasi   ● Draft   ● Perlu Cek   ● Lunas   ● Belum Bayar
```

### Card

```
Background    : #FFFFFF
Border Radius : 16px
Shadow        : 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)
Padding       : 16px
Border        : Tidak ada (pakai shadow saja)
```

### Input Field

```
Background    : #F4F4F2
Border        : 1.5px solid transparent (focus: #E8541A)
Border Radius : 10px
Height        : 48px
Font          : 15px Regular
Padding       : 12px 16px
```

### Confidence Score Bar

```
Container  : rounded, full width, height 8px, background #F4F4F2
Fill       : color sesuai nilai
  0.0–0.5  : #DC2626 (merah)
  0.5–0.7  : #F59E0B (kuning)
  0.7–0.9  : #16A34A (hijau muda)
  0.9–1.0  : #059669 (hijau solid)

Label teks di atas bar: "Keyakinan AI: 95%"
```

---

## 6. Navigasi Bawah (Bottom Navigation)

```
┌─────────────────────────────────────────┐
│  🏠        📋        🧑‍🍳        📊      │
│ Hari Ini  Pesanan   Produksi  Ringkasan  │
└─────────────────────────────────────────┘
```

- 4 tab utama
- Icon + label text (12px)
- Tab aktif: warna Primary (#E8541A), label bold
- Tab non-aktif: abu (#9CA3AF)
- Height: 64px
- Background: #FFFFFF dengan border-top tipis

**Halaman yang tidak ada di bottom nav (diakses dari Dashboard):**
- Mock WhatsApp UI → tombol di Dashboard "Proses Chat Baru"
- Order Detail → tap dari list
- Owner Approval → dari Order Detail
- QRIS Reminder → dari Order Detail setelah approve
- Impact Dashboard → link di halaman Ringkasan

---

## 7. Icon Style

- Library: **Lucide React** (konsisten, open source, ringan)
- Ukuran default: 20px (24px untuk action button)
- Stroke width: 1.5px (terlihat lebih clean di layar kecil)
- Warna: mengikuti konteks (text color atau primary color)

Ikon yang dipakai:

| Konteks | Ikon |
|---|---|
| Dashboard / Home | `Home` |
| Pesanan / Order | `ClipboardList` |
| Produksi | `ChefHat` |
| Ringkasan | `BarChart2` |
| WhatsApp mock | `MessageCircle` |
| Approve | `CheckCircle` |
| Edit | `Pencil` |
| Reject | `XCircle` |
| Unpaid | `AlertCircle` |
| Paid | `BadgeCheck` |
| QRIS | `QrCode` |
| Bahan / Planner | `ShoppingBasket` |
| Confidence tinggi | `ShieldCheck` |
| Confidence rendah | `AlertTriangle` |
| Roadmap | `Map` |
| Copy | `Copy` |
| Timer / Deadline | `Clock` |

---

## 8. Ilustrasi dan Gambar

### Prinsip
- Tidak ada stock photo wajah manusia
- Ilustrasi flat sederhana (bukan 3D render)
- Ikon besar untuk empty state dan onboarding
- Warna ilustrasi mengikuti palet Kuali

### Empty State
Setiap halaman punya empty state yang ramah:

```
[Ikon besar, 80px]
Belum ada pesanan hari ini
Proses chat pesanan baru dari WhatsApp.
[Tombol: Proses Chat Baru]
```

### QRIS Image
- File: `assets/qris-dummy.png`
- Resolusi: min 400×400px
- Tambahkan label "CONTOH - BUKAN UNTUK PEMBAYARAN" di bagian bawah image
- Background: putih, border hitam tipis

---

## 9. Tone Teks UI (UX Copy)

### Prinsip

- **Bahasa Indonesia sehari-hari**, bukan formal
- **Singkat dan langsung** — satu kalimat per instruksi
- **Tidak menggurui** — Bu Rani sudah tahu bisnis kuliner lebih baik dari app ini
- **Action-oriented** — teks tombol = kata kerja (Approve, Simpan, Salin, Kirim)

### Contoh Teks UI

| Konteks | Jangan | Pakai |
|---|---|---|
| Tombol konfirmasi | "Submit Confirmation" | "Approve Pesanan" |
| Status belum bayar | "Payment Pending" | "Belum Bayar" |
| Confidence rendah | "Low Confidence Score" | "Perlu Dicek Bu Rani" |
| Empty state | "No orders found" | "Belum ada pesanan hari ini" |
| Error | "An error occurred" | "Gagal memproses. Coba lagi." |
| QRIS note | "This is a demo QR code" | "Ini QRIS contoh — kirim setelah dicek Bu Rani" |
| Roadmap card | "Feature coming soon" | "Fitur ini sedang direncanakan (Roadmap)" |
| Production planner | "Ingredient calculation" | "Bahan yang perlu disiapkan" |
| Daily summary | "End of day report" | "Rekap Hari Ini" |

---

## 10. Apa yang Tidak Boleh Ada di UI

| Larangan | Alasan |
|---|---|
| Tampilan kasir / struk / receipt | Kuali bukan POS |
| Tabel besar dengan banyak kolom | Tidak mobile-friendly |
| Grafik kompleks (candlestick, scatter, dll) | Tidak relevan untuk UMKM kuliner |
| Form panjang lebih dari 5 field sekaligus | Terlalu berat untuk owner sambil produksi |
| Popup berlapis-lapis | Membingungkan di HP kecil |
| Warna neon atau terlalu banyak warna | Noisy, tidak profesional |
| Teks di bawah 12px | Tidak terbaca di layar kecil |
| Touch target di bawah 44×44px | Susah ditekan satu tangan |
| Label berbahasa Inggris tanpa konteks | Pengguna target tidak familiar |
| Fitur roadmap tanpa label jelas | Bisa disalahartikan sebagai MVP |

---

## Referensi Visual Eksternal (untuk HIPSTER-B)

Tone dan referensi yang bisa dijadikan inspirasi:

| Referensi | Aspek yang Relevan |
|---|---|
| Warung pintar / GoBiz | Simplicity untuk UMKM, bottom nav |
| Tokopedia Seller | Card-based layout, status badge |
| WhatsApp Business | Familiar chat look untuk mock UI |
| Notion mobile | Clean typography, readable content |
| Halodoc | Friendly medical app — tone hangat, clear CTA |

Hindari referensi: Shopify (terlalu enterprise), Xero (terlalu accounting), Square POS (terlalu kasir).
