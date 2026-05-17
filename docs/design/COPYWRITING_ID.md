# Copywriting Bahasa Indonesia — Kuali MVP
### Semua Teks UI, Label, CTA, Toast, dan Disclaimer

> Prinsip: Bahasa Indonesia sehari-hari, bukan formal. Singkat. Tidak menggurui.
> Referensi: `docs/proposal/UI_MOODBOARD.md` Section 9 (Tone Teks UI)
> Semua teks ini adalah sumber kebenaran untuk implementasi — jangan terjemahkan atau modifikasi tanpa approval Leader.

---

## Prinsip Penulisan

| Prinsip | Contoh Salah | Contoh Benar |
|---|---|---|
| Kata kerja untuk tombol | "Confirmation" | "Konfirmasi" |
| Hindari jargon teknis | "Parse order" | "Baca pesanan" |
| Bahasa sehari-hari | "Input your message" | "Ketik atau tempel chat di sini" |
| Singkat di tombol | "Click here to approve your order" | "Approve Pesanan" |
| Empati, bukan kaku | "Error: missing fields detected" | "Ada beberapa hal yang perlu dicek" |
| Tidak menggurui | "You must fill this field" | "Tanggal pengiriman belum disebutkan" |

---

## Global / Navigasi

### Bottom Navigation Labels
- Tab 1: **Hari Ini**
- Tab 2: **Pesanan**
- Tab 3: **Produksi**
- Tab 4: **Ringkasan**

### Header Default
- App name: **Kuali**
- Back button: `◀` tanpa label (atau `◀ Kembali` jika perlu konteks)

### Loading States
- Parsing AI: **"Memproses..."**
- Menyimpan: **"Menyimpan..."**
- Memuat data: **"Memuat..."**

### Error Umum
- Gagal koneksi: **"Gagal terhubung. Periksa koneksi internet kamu."**
- Gagal simpan: **"Gagal menyimpan. Coba lagi."**
- Gagal parsing: **"Gagal memproses chat ini. Coba lagi."**
- Data tidak ditemukan: **"Data tidak ditemukan."**

---

## S01 — Mock WhatsApp Chat

### Header
- **"Chat Masuk"**
- Subtitle: nama toko (dari data Business)

### Chip Preset
- Label: **"Pilih contoh chat:"**
- Chip 1: **"Dinda — 12 risol mayo"**
- Chip 2: **"Bu Tini — ayam crispy"**
- Chip 3: **"Mas Budi — ayam geprek"**
- Chip 4: **"Kak Rina — nasi kotak 20"**

### Input Area
- Placeholder: **"Ketik atau tempel pesan pesanan di sini..."**
- Label atas: **"Pesan dari pelanggan"**

### Chat Bubble (simulasi)
- Nama pengirim: nama customer (dari data dummy)
- Timestamp: **"08:15 ✓✓"**

### Tombol Aksi
- CTA utama: **"Proses dengan Kuali"**
- State disabled tooltip: **"Isi pesan dulu ya"**
- State loading: **"Memproses..."**

### Divider setelah tombol
- **"─── Hasil Parsing ───"**

### Empty state hasil (sebelum parsing)
- **"Hasil parsing akan muncul di sini setelah kamu klik 'Proses'."**

---

## S02 — AI Parsed Draft Order

### Header
- **"Detail Pesanan"**
- Order number: **"KL-20250517-001"**

### Status Badge
- Draft: **"DRAFT"**
- Dikonfirmasi: **"DIKONFIRMASI"**
- Perlu Cek: **"PERLU CEK"**
- Ditolak: **"DITOLAK"**

### Section Labels
- **"Pelanggan"**
- **"Item Pesanan"**
- **"Pengiriman"**
- **"Pembayaran"**
- **"Keyakinan AI"**
- **"Catatan"**
- **"Chat Asli"** (collapsible)

### Confidence Score
- Label: **"Keyakinan AI:"**
- High (≥ 0.85): **"95% — Siap diapprove"** (teks hijau)
- Medium (0.70–0.84): **"78% — Cek dulu sebelum approve"** (teks kuning)
- Low (< 0.70): **"45% — Perlu konfirmasi manual"** (teks merah)

### Missing Fields
- Header: **"Ada beberapa hal yang perlu dicek:"**
- Tanggal: **"✗ Tanggal pengiriman belum disebutkan"**
- Waktu: **"✗ Jam pengiriman belum jelas"**
- Menu varian: **"✗ Varian menu belum dikonfirmasi"**
- Status bayar: **"✗ Status pembayaran belum jelas"**
- Kuantitas: **"✗ Jumlah pesanan tidak terbaca"**

### Semua Field Lengkap
- **"✓ Semua informasi sudah terbaca"**

### Tombol Aksi
- Approve: **"✓ Approve Pesanan"**
- Edit: **"✏️ Edit"**
- Tolak: **"✗ Tolak"**

### Info Pembayaran
- Belum bayar: **"Belum Bayar"**
- Lunas: **"Sudah Bayar"**
- Catatan dari chat: tampilkan kutipan ("Bayar nanti sore")

### Metode Pengiriman
- Diantar: **"Diantar"**
- Ambil sendiri: **"Ambil sendiri"**

---

## S03 — Owner Approval Modal

### Judul
- **"Konfirmasi Pesanan"**

### Body
- **"Pastikan detail sudah benar sebelum dikonfirmasi."**

### Ringkasan Order
- Label: **"Pelanggan:"** / **"Menu:"** / **"Total:"** / **"Pengiriman:"** / **"Pembayaran:"**

### Tombol
- Konfirmasi: **"Ya, Konfirmasi"**
- Batal: **"Kembali"**

### State Loading
- **"Menyimpan..."**

### Toast Sukses
- **"✓ Pesanan Dikonfirmasi!"**
- Durasi: 2 detik, lalu auto-dismiss

### Toast Gagal
- **"Gagal mengkonfirmasi. Coba lagi."**

### Konfirmasi Tolak (dialog terpisah)
- Judul: **"Tolak pesanan ini?"**
- Body: **"Pesanan yang ditolak tidak bisa dikembalikan ke Draft."**
- Tombol ya: **"Ya, Tolak"**
- Tombol tidak: **"Batal"**

---

## S04 — Dashboard Hari Ini

### Sapaan
- Pagi (05:00–11:59): **"Selamat pagi, Bu Rani 👋"**
- Siang (12:00–14:59): **"Selamat siang, Bu Rani 👋"**
- Sore (15:00–17:59): **"Selamat sore, Bu Rani 👋"**
- Malam (18:00+): **"Selamat malam, Bu Rani 👋"**
- Tanggal: format **"Sabtu, 17 Mei 2025"**

### 4 Summary Card Labels
1. **"Pesanan Hari Ini"**
2. **"Belum Bayar"** (+ nominal Rp)
3. **"Perlu Dicek"**
4. **"Draft Pending"**

### CTA Utama
- **"+ Proses Chat Baru"**

### List Pesanan Terbaru
- Header: **"Pesanan Terbaru"**
- Footer link: **"Lihat semua →"**

### Empty State (belum ada pesanan)
- Ikon: `ClipboardList` (80px, abu)
- Judul: **"Belum ada pesanan hari ini"**
- Subteks: **"Proses chat pesanan baru dari WhatsApp."**
- CTA: **"Proses Chat Baru"**

---

## S05 — QRIS Dummy Reminder

### Header
- **"Reminder Pembayaran"**

### Card Nama Toko
- **"KATERING BU RANI"** (uppercase, centered)

### Label QRIS
- **"CONTOH — BUKAN PEMBAYARAN"** (wajib, di bawah QR image)

### Detail Pembayaran
- **"Untuk:"** [nama customer]
- **"Pesanan:"** [nama menu × qty]
- **"Total:"** Rp [nominal]

### Header Pesan Siap Kirim
- **"Pesan Siap Dikirim"**

### Template Pesan (isi otomatis, bisa disalin)
```
Halo Kak [nama_customer] 👋
Terima kasih sudah pesan di Katering Bu Rani!

Mohon transfer Rp [total] ke QRIS di atas ya Kak.
Konfirmasi setelah transfer ke nomor ini.

Terima kasih! 🙏
– Bu Rani
```

### Tombol
- Salin: **"📋 Salin Pesan"**
- Setelah disalin: **"✓ Tersalin!"** (durasi 2 detik)
- Secondary: **"✓ Tandai Sudah Dikirim"**

### Disclaimer (wajib tampil)
- **"ⓘ QRIS ini adalah contoh demo. Bu Rani mengirim sendiri ke pelanggan. Bukan settlement otomatis."**
- Font: 12px, abu, tidak boleh dihapus

---

## S06 — Production Planner

### Header
- **"Persiapan Produksi"**

### Subtitle
- **"Untuk pesanan [hari], [tanggal]"**
- **"Dari [N] pesanan dikonfirmasi"**

### Tooltip `[ⓘ]`
- **"Kebutuhan bahan dihitung dari: jumlah pesanan dikonfirmasi × bahan per sajian dari resep yang kamu masukkan."**

### Section Header
- **"Bahan yang Perlu Disiapkan"**

### Per Bahan Card
- **"Butuh :"** [angka] [satuan]
- **"Stok  :"** [angka] [satuan]

### Status Badge Stok
- Cukup: **"✓ Cukup"** (hijau)
- Hampir habis: **"⚠ Tipis"** (kuning)
- Kurang: **"✗ Perlu Beli"** (merah)

### Expand Detail
- **"Dari pesanan:"**
- Format: "[menu] [N] pcs × [bahan per pcs] = [total]"

### Tombol Expand List
- **"+ [N] bahan lainnya ▼"**

### Section Urutan Produksi (opsional)
- Header: **"Urutan Produksi"**
- Format: **"1. [nama menu] ([N] pcs) — [jam]"**

### Empty State (tidak ada order confirmed)
- **"Belum ada pesanan yang dikonfirmasi untuk besok."**
- Subteks: **"Approve pesanan terlebih dahulu."**

---

## S07 — Daily Summary

### Header
- **"Rekap Hari Ini"**

### Tanggal
- Format: **"Sabtu, 17 Mei 2025"**

### Tabel Ringkasan — Label
- **"Total"** / **"Konfirm."** / **"Draft"**
- **"Blm Bayar"** / **"Belum Bayar"** / **"Lunas"**

### Card Peringatan
- **"⚠ [N] pesanan perlu dicek"**
- Link: **"Lihat detail →"**

### Header Ringkasan Narasi
- **"Ringkasan Hari Ini"**

### Contoh Teks Narasi (dihasilkan sistem)
```
Hari ini 11 pesanan masuk. 5 sudah dikonfirmasi.
4 belum bayar — total Rp 167.000.
Besok siapkan: 26 risol, 10 lumpia, dan 2L kopi susu.
```

### Tombol Edit Narasi (kecil, dalam card)
- **"✏️ Edit"**

### CTA
- **"Lihat Production Planner"**
- Link: **"Lihat semua metrik →"**

### Quick Stats
- Format: **"[N]/[total] chat diparse · [N] reminder siap"**

---

## S08 — Impact Dashboard

### Header
- **"Dampak Operasional"**

### Disclaimer Bar (wajib)
- **"ⓘ Angka ini dari data demo simulasi. Bukan klaim bisnis nyata."**

### Section Labels
- **"Chat & Parsing"**
- **"Simulasi Perbandingan Waktu"**
- **"Tren 7 Hari (Simulasi)"**

### Parsing Metric
- **"[N] dari [total] chat berhasil diparse menjadi draft order"**
- Persentase: **"[XX]%"**

### 4 Metric Card Labels
1. **"Dikonfirmasi"**
2. **"Reminder Siap"**
3. **"Perlu Cek"**
4. **"Bahan Terhitung"**

### Perbandingan Waktu
- **"Tanpa Kuali  : ~40 mnt"**
- **"Dengan Kuali : ~8 mnt"**
- Catatan: **"* Simulasi ilustratif — bukan data tervalidasi"**

### Tren Chart
- Label sumbu: **"Sen Sel Rab Kam Jum Sab Min"**
- Label sumbu Y: angka pesanan

### Link ke Roadmap
- **"Lihat roadmap simulation ↓"**

---

## S09 — Roadmap Simulation Card

### Header Section
- **"🗺️ Roadmap"**
- Subteks: **"Fitur ini sedang direncanakan. Belum tersedia di MVP."**

### Badge
- **"ROADMAP"** (uppercase, 11px, ungu)

### Card 1: Belanja Bareng
- Ikon: 🛒
- Judul: **"Belanja Bahan Bareng"**
- Deskripsi: **"UMKM sekitar bisa patungan beli bahan — lebih efisien."**
- Catatan: **"Berbasis consent pengguna penuh."**

### Card 2: Sisa Stok Opt-in
- Ikon: ♻️
- Judul: **"Sisa Stok Opt-in"**
- Deskripsi: **"Tawarkan sisa ke pelanggan yang sudah opt-in."**
- Catatan: **"Bukan broadcast otomatis."**

### Tidak Ada CTA
- Tidak ada teks tombol di dalam roadmap card

---

## Toast / Notifikasi Sistem

| Kondisi | Teks | Warna |
|---|---|---|
| Order dikonfirmasi | **"✓ Pesanan Dikonfirmasi!"** | Hijau |
| Order ditolak | **"✗ Pesanan Ditolak"** | Merah |
| Pesan disalin | **"✓ Tersalin!"** | Hijau |
| Reminder ditandai terkirim | **"✓ Reminder Ditandai Terkirim"** | Hijau |
| Gagal konfirmasi | **"Gagal mengkonfirmasi. Coba lagi."** | Merah |
| Gagal parsing | **"Gagal memproses chat. Coba lagi."** | Merah |
| Perubahan tersimpan | **"✓ Perubahan disimpan"** | Hijau |

---

## Teks yang Tidak Boleh Muncul di UI

| Teks Terlarang | Alasan |
|---|---|
| "UMKM gaptek" / "tertinggal" | Merendahkan target user |
| "Settlement otomatis" | QRIS hanya dummy |
| "Food waste turun X%" | Tidak ada data |
| "Profit naik X%" | Tidak ada data |
| "AI langsung konfirmasi" | Selalu butuh owner approval |
| "Fitur belanja bareng tersedia" | Masih roadmap |
| "QRIS siap dipakai" (tanpa disclaimer) | Menyesatkan |
| "Submit" / "Cancel" / "Confirm" (bahasa Inggris) | Ganti ke Bahasa Indonesia |
| "Low confidence score detected" | Ganti ke bahasa ramah |
| "Error 500" atau kode error teknis | Tampilkan pesan ramah |

---

*Dokumen ini adalah sumber kebenaran untuk semua teks UI Kuali.*
*Update dokumen ini jika ada perubahan copy — jangan ubah langsung di kode tanpa update di sini.*
