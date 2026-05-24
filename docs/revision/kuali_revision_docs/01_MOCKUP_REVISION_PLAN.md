# Kuali — Mockup Revision Plan

> **Status dokumen:** Revisi UX/UI untuk frontend prototype Kuali  
> **Fokus:** Profil Usaha, Dashboard, Mode Sederhana vs Mode Standar, konsistensi data, copywriting, dan demo readiness  
> **Tujuan:** Membuat mockup/prototype lebih cocok untuk UMKM mikro, termasuk owner yang tidak nyaman membaca grafik atau dashboard kompleks.

---

## 0. Ringkasan Keputusan

Kita mendapatkan feedback valid dari beberapa UMKM mikro: dashboard yang terlalu banyak grafik, angka, tabel, dan status bisa membuat pengguna pusing. Hal ini tidak hanya berlaku untuk lansia; pengguna muda pun bisa kewalahan jika UI terlalu ramai.

Keputusan final revisi:

1. **Target user tetap UMKM mikro kuliner WhatsApp-first**, bukan khusus lansia.
2. **Jangan minta umur saat daftar** karena umur sensitif dan tidak selalu mewakili kemampuan digital.
3. Tambahkan konsep **Mode Tampilan**:
   - **Mode Sederhana**: fokus ke aksi utama, tanpa grafik kompleks.
   - **Mode Standar**: dashboard lengkap seperti prototype saat ini.
4. Ubah “Company Profile” menjadi **Profil Usaha** agar lebih ramah untuk UMKM mikro.
5. Pertahankan dashboard lengkap untuk admin/juri/demo, tapi tambahkan mode ringkas untuk owner awam.
6. Jangan membuat fitur ini terlalu besar. Untuk fase proposal/prototype, cukup:
   - toggle UI sederhana,
   - 1 screen Mode Sederhana,
   - update copy di proposal,
   - localStorage saja jika ingin interaktif.

---

## 1. Problem UX yang Ditemukan

### 1.1 Dashboard terlalu ramai untuk sebagian UMKM mikro

Prototype saat ini sudah terlihat profesional, tetapi beberapa elemen bisa menjadi beban kognitif:

- Banyak metric card.
- Grafik mini di banyak bagian.
- Tabel order.
- Status pembayaran.
- Status AI/confidence score.
- Progress bar.
- Sidebar.
- Roadmap section.
- Istilah seperti “confidence AI”, “efisiensi parsing”, “rasio pemenuhan stok”.

Untuk juri, ini terlihat canggih. Untuk owner UMKM mikro yang sedang sibuk produksi, ini bisa terasa seperti “aplikasi kantor”.

### 1.2 Umur bukan indikator utama

Sempat muncul ide: saat register, pengguna memasukkan umur lalu dashboard berubah untuk lansia.

Keputusan: **jangan lakukan ini**.

Alasan:

- Umur adalah data personal yang tidak perlu untuk MVP.
- Bisa terasa diskriminatif atau stereotyping.
- Ada pengguna lansia yang nyaman dengan dashboard.
- Ada pengguna muda yang tetap bingung melihat grafik.
- Yang lebih relevan adalah **kenyamanan membaca data**, bukan usia.

Solusi yang lebih baik:

> Pilih tampilan berdasarkan preferensi: **Sederhana** atau **Standar**.

---

## 2. Target User Final untuk UX

### 2.1 Primary User

**Pemilik UMKM kuliner mikro / rumahan** yang menjual lewat WhatsApp.

Contoh:
- Catering rumahan.
- Nasi box.
- Snack box.
- Bakery rumahan.
- Dessert box.
- Frozen food.
- Kopi literan.
- Pre-order makanan rumahan.

Karakter:
- Order 5–50 per hari.
- Sering menerima pesanan lewat WhatsApp.
- Belum punya admin khusus.
- Masih rekap manual.
- Butuh order rapi dan bahan produksi jelas.
- Tidak selalu nyaman membaca grafik atau dashboard kompleks.

### 2.2 Secondary User

**Anak/admin/keluarga yang membantu usaha.**

Karakter:
- Lebih terbiasa dengan aplikasi.
- Bisa membaca grafik/tabel.
- Membantu owner mengelola order.
- Cocok memakai Mode Standar.

### 2.3 Accessibility User

**Owner senior atau pengguna yang kurang nyaman dengan aplikasi kompleks.**

Catatan:
- Jangan sebut sebagai “lansia gaptek”.
- Gunakan istilah aman:
  - pengguna yang membutuhkan tampilan lebih ringkas,
  - owner yang ingin fokus ke aksi utama,
  - pengguna dengan kenyamanan digital berbeda.

---

## 3. Konsep Mode Tampilan

### 3.1 Mode Sederhana

Mode untuk owner UMKM mikro yang ingin langsung tahu apa yang harus dilakukan.

Prinsip:
- Tanpa grafik.
- Tanpa tabel panjang.
- Tanpa istilah teknis.
- Tombol besar.
- Teks langsung ke aksi.
- Maksimal 3–4 informasi utama.

Isi utama:

1. Pesanan perlu dicek.
2. Pelanggan belum bayar.
3. Bahan yang perlu disiapkan.
4. Ringkasan order hari ini.

Contoh layout:

```txt
Halo Bu Rani 👋
Hari ini ada 4 pesanan.

[3 Pesanan Perlu Dicek]
Tinjau sekarang

[1 Pelanggan Belum Bayar]
Kirim pengingat

[Bahan untuk Besok]
Lihat daftar bahan

[Rekap Hari Ini]
Lihat ringkasan
```

CTA utama:

- Tinjau Pesanan.
- Kirim Pengingat.
- Lihat Bahan.
- Lihat Rekap.

Bahasa yang dipakai:

| Hindari | Gunakan |
|---|---|
| Confidence AI | Tingkat keyakinan AI |
| Parsing efficiency | Pesan berhasil dibaca |
| Rasio pemenuhan stok | Status bahan |
| Draft/Pending | Perlu dicek |
| Real-time | Data simulasi aktif |
| Ekosistem penuh | Alur inti |

---

### 3.2 Mode Standar

Mode untuk admin/owner yang ingin detail lebih lengkap.

Isi:
- Metric cards.
- Grafik ringan.
- Tabel order.
- Confidence score.
- Payment status.
- Production planner detail.
- Rekap harian.

Ini adalah dashboard yang sudah ada sekarang, tetapi perlu perbaikan konsistensi data dan copywriting.

---

### 3.3 Kenapa tidak membuat 3 mode: Angka / Grafik / Gabungan?

Kritik UMKM benar, tetapi solusi 3 mode bisa membuat UX terlalu rumit.

Jika onboarding bertanya:

```txt
Pilih tampilan:
1. Angka
2. Grafik
3. Angka + Grafik
```

Pengguna bisa bingung memilih.

Solusi final:

```txt
Pilih tampilan yang paling nyaman:

[Mode Sederhana]
Fokus ke pesanan, pembayaran, dan bahan.

[Mode Standar]
Tampilkan grafik, tabel, dan detail operasional.
```

Jika nanti ingin fitur tambahan, **di dalam Mode Standar** boleh ada toggle kecil:

```txt
Tampilan data: Ringkas / Grafik
```

Tetapi ini **bukan MVP**.

---

## 4. Revisi Profil Usaha

### 4.1 Ganti istilah

Ganti:

```txt
Company Profile
```

Menjadi:

```txt
Profil Usaha
```

Alasan:
- UMKM mikro belum tentu merasa dirinya “company”.
- “Profil Usaha” lebih lokal, sederhana, dan familiar.

---

### 4.2 Isi Profil Usaha MVP

Profil Usaha tidak perlu kompleks. Isi minimal:

| Field | Contoh | Catatan |
|---|---|---|
| Nama usaha | Katering Bu Rani | Wajib |
| Jenis usaha | Catering rumahan | Wajib |
| Area | Kelapa Dua, Depok | Opsional |
| Nomor WhatsApp | 08xx-xxxx | Dummy untuk prototype |
| Mode tampilan | Sederhana / Standar | Baru |
| QRIS | QRIS dummy | Prototype only |
| Menu aktif | 5 menu | Dari dummy data |
| Status prototype | Data simulasi | Transparansi |

---

### 4.3 Yang tidak boleh masuk Profil Usaha sekarang

Jangan masukkan:

- KTP.
- NPWP.
- Legal entity.
- Multi-cabang.
- Staff permission.
- Subscription billing.
- Bank account.
- Real payment settlement.
- Verifikasi WhatsApp.
- Upload dokumen legal.

Itu terlalu production dan bisa membuat scope melebar.

---

## 5. Revisi Dashboard

### 5.1 Masalah utama dashboard saat ini

Dari review prototype, beberapa masalah utama:

1. **Copy belum personal**
   - “Selamat datang, kamu” terlalu generic.
   - Ganti dengan “Selamat datang, Bu Rani” atau “Dashboard Katering Bu Rani”.

2. **Angka pembayaran tidak konsisten**
   - Dashboard menampilkan Rp0 belum dibayar, tetapi order/detail menunjukkan Rp500.000 belum bayar.

3. **Typo**
   - “Belum Payar” harus menjadi “Belum Bayar”.

4. **Confidence tinggi tetapi ada missing field**
   - Jika confidence 90%, jangan tampilkan warning “Perlu dilengkapi”.
   - Jika ada missing field, confidence harus lebih rendah dan status harus “Perlu Cek”.

5. **Tanggal tidak konsisten**
   - Ada campuran 2025 dan 2026.
   - Gunakan satu timeline.

6. **Roadmap terlalu mudah terlihat**
   - Roadmap boleh ada, tapi jangan muncul sebagai main demo flow.

---

### 5.2 Data hero order yang harus diseragamkan

Pilih satu hero order untuk semua halaman demo:

```txt
Customer: Kak Rina
Pesanan: 20x Nasi Kotak
Total: Rp500.000
Status: Draft → Dikonfirmasi
Payment: Belum Bayar
Tanggal produksi: Sabtu, 23 Mei 2026
```

Semua halaman harus mengikuti data ini:

| Halaman | Harus Sinkron |
|---|---|
| Dashboard | Piutang aktif Rp500.000 |
| Orders | Kak Rina muncul sebagai draft/belum bayar |
| Detail Order | Total Rp500.000, payment belum bayar |
| Production | Berdasarkan order dikonfirmasi, 20 porsi nasi kotak |
| Summary | Jika belum bayar, rekap harus mencatat Rp500.000 atau jelaskan sebagai contoh |

---

### 5.3 Aturan confidence score

Gunakan aturan:

| Confidence | Status UI | Aksi |
|---:|---|---|
| 85–100% | Tinggi | Bisa dikonfirmasi owner |
| 65–84% | Perlu Cek Ringan | Owner perlu review |
| <65% | Perlu Konfirmasi | Minta info tambahan pelanggan |

Jika ada missing field penting, jangan tampilkan sebagai 90% hijau.

Contoh happy path:

```txt
Confidence AI: 90%
Status: Tinggi
Tidak ada informasi penting yang hilang.
CTA: Konfirmasi Order
```

Contoh edge case:

```txt
Confidence AI: 58%
Status: Perlu Cek
Missing fields:
- Menu belum spesifik
- Jam ambil belum pasti
CTA: Minta Konfirmasi ke Pelanggan
```

---

## 6. Revisi Halaman Spesifik

### 6.1 Landing Page

Yang dipertahankan:
- Visual clean.
- Tagline “Order rapi, produksi siap.”
- CTA “Lihat Demo”.

Revisi copy:

| Saat ini | Revisi |
|---|---|
| Sistem parsing AI yang mengubah chat WhatsApp pelanggan menjadi alur produksi kuliner yang terstruktur | Kuali membantu mengubah chat pesanan WhatsApp menjadi draft order, reminder pembayaran, dan rencana produksi harian. |

Tambahkan small note:

```txt
Prototype demo menggunakan data simulasi.
```

---

### 6.2 Login/Register

Keputusan:
- Boleh ada sebagai tampilan product-ready.
- Jangan implement auth real.
- Jangan jadikan fokus demo.

Revisi copy:

| Saat ini | Revisi |
|---|---|
| Masuk ke Kuali | Masuk sebagai Bu Rani |
| Daftar Baru | Lihat Mode Demo |
| MVP PROTOTYPE PLATFORM V2.0 | Prototype Demo — Gunadarma Code Week 2.0 |
| Otomatisasi Ekstraksi Manifes Teks Chat | Ubah chat pesanan jadi order rapi |
| Kalkulator Kiloan Bahan Mentah Dapur | Hitung kebutuhan bahan produksi |
| Monitor Piutang Belum Lunas Instan | Pantau pesanan yang belum bayar |

Tambahkan:

```txt
Mode demo — tidak membutuhkan akun asli.
```

---

### 6.3 Dashboard Mode Sederhana

Buat halaman atau state baru:

```txt
/dashboard?mode=simple
```

Atau gunakan toggle state/localStorage.

Isi:

```txt
Selamat datang, Bu Rani 👋
Hari ini ada 4 pesanan aktif.

[3 Pesanan Perlu Dicek]
AI sudah membaca pesan, owner tinggal cek.
CTA: Tinjau Pesanan

[1 Pelanggan Belum Bayar]
Total belum bayar: Rp500.000
CTA: Kirim Pengingat

[Bahan untuk Besok]
20 porsi nasi kotak perlu disiapkan.
CTA: Lihat Bahan

[Rekap Hari Ini]
15 chat masuk, 13 berhasil dibaca.
CTA: Lihat Rekap
```

Tidak perlu:
- grafik,
- tabel panjang,
- confidence numeric di halaman utama,
- mini chart,
- istilah teknis.

---

### 6.4 Dashboard Mode Standar

Tetap seperti dashboard sekarang, tetapi revisi:

- “Selamat datang, kamu” → “Selamat datang, Bu Rani”.
- “Mock AI aktif” → “Mode demo aktif”.
- “Real-time” → “Data simulasi aktif”.
- “Belum Payar” → “Belum Bayar”.
- Sinkronkan angka pembayaran.
- Jangan tampilkan Rp0 jika ada order belum bayar.
- Kalau ada 4 order, jumlah kategori harus konsisten.

---

### 6.5 Daftar Pesanan

Revisi data agar lebih natural:

Daripada 3 Dinda Ayu duplikat:

```txt
Kak Rina — 20x Nasi Kotak — Draft — Belum Bayar — 90%
Dinda Ayu — 12x Risol Mayo — Dikonfirmasi — Lunas — 95%
Mas Budi — 5x Ayam Geprek — Draft — Belum Bayar — 82%
Bu Tini — 3x Dessert Box — Perlu Cek — Belum Bayar — 58%
```

Kategori:

```txt
Semua: 4
Dikonfirmasi: 1
Draft: 2
Perlu Cek: 1
Belum Bayar: 3
```

Ini lebih bagus daripada Perlu Cek 0, karena membuktikan AI tidak asal approve.

---

### 6.6 Detail Order

Revisi detail order untuk Kak Rina:

Happy path:

```txt
Kak Rina
20x Nasi Kotak
Total: Rp500.000
Tanggal: Sabtu, 23 Mei 2026
Jam: 12.00
Status: Draft
Payment: Belum Bayar
Confidence AI: 90% — Tinggi
```

Hapus warning jika tidak ada missing field.

Tambahkan note:

```txt
AI hanya membuat draft. Owner tetap menyetujui sebelum order masuk produksi.
```

Edge case untuk Bu Tini:

```txt
Confidence AI: 58%
Status: Perlu Cek
Informasi belum lengkap:
- varian dessert belum jelas
- jam ambil belum pasti
CTA: Minta Konfirmasi ke Pelanggan
```

---

### 6.7 Production Planner

Pastikan sinkron dengan order yang dikonfirmasi.

Jika order dikonfirmasi adalah Kak Rina 20x Nasi Kotak:

```txt
Rencana Produksi untuk Sabtu, 23 Mei 2026
1 pesanan dikonfirmasi
20 total porsi
```

Contoh bahan:

```txt
Beras: kebutuhan 3 kg, stok 10 kg, cukup
Ayam: kebutuhan 4 kg, stok 5 kg, hampir habis
Box makanan: kebutuhan 20 pcs, stok 18 pcs, perlu beli 2 pcs
Sambal: kebutuhan 1 kg, stok 2 kg, cukup
```

Hindari:
- telur 1.2 butir,
- mayones sisa tetapi status perlu tambah,
- rasio 100% untuk semua bahan.

Status logic:

| Kondisi | Status |
|---|---|
| Stok >= kebutuhan + buffer | Cukup |
| Stok >= kebutuhan tapi sisa kecil | Hampir Habis |
| Stok < kebutuhan | Perlu Beli |

---

### 6.8 Summary / Rekap Harian

Revisi metrik agar sinkron:

```txt
15 chat masuk
13 berhasil dibaca AI
4 menjadi order aktif
1 order dikonfirmasi
2 draft menunggu review
1 perlu cek
Rp500.000 belum bayar
```

Card copy:

| Saat ini | Revisi |
|---|---|
| Keandalan sistem rendah | 1 order perlu konfirmasi |
| Piutang belum dibayar Rp0 | Piutang aktif Rp500.000 |
| Efisiensi parsing | Pesan berhasil dibaca AI |

Tambahkan note:

```txt
Angka ini berasal dari data simulasi demo, bukan klaim bisnis nyata.
```

---

### 6.9 Roadmap Section

Tetap boleh ada, tetapi:
- berada di bawah,
- tidak muncul di main demo 3 menit,
- diberi label jelas “Roadmap — belum tersedia di MVP”.

Roadmap yang aman:
- Real WhatsApp Business Cloud API.
- Customer opt-in.
- Belanja bahan bareng berbasis consent.
- Sisa stok opt-in.
- SaaS multi-tenant.

Jangan jadikan:
- tombol utama,
- demo utama,
- fitur yang tampak sudah aktif.

---

## 7. Acceptance Criteria Mockup Revision

Revisi dianggap selesai jika:

- [ ] Ada pilihan Mode Sederhana / Mode Standar.
- [ ] Mode Sederhana menampilkan aksi utama tanpa grafik.
- [ ] Mode Standar tetap menampilkan dashboard lengkap.
- [ ] Profil Usaha menggantikan Company Profile.
- [ ] Tidak ada input umur sebagai syarat.
- [ ] Data hero order konsisten di semua halaman.
- [ ] Payment metrics konsisten.
- [ ] Confidence dan missing field tidak konflik.
- [ ] Production planner logic masuk akal.
- [ ] Summary metrics konsisten.
- [ ] Roadmap hanya muncul sebagai roadmap.
- [ ] Copy lebih ramah UMKM mikro.
- [ ] Tidak ada kata “gaptek”, “tertinggal”, “menggantikan admin”.
- [ ] UI tetap terlihat profesional untuk juri.

---

## 8. Prompt Claude/Codex — Mockup Revision

Gunakan prompt ini untuk eksekusi:

```txt
You are a Senior UX Engineer, Product Designer, and Hackathon Prototype Refactoring Assistant for the Kuali project.

Current task:
Mockup Revision — Profil Usaha, Dashboard Mode Sederhana/Standar, data consistency, and UX copy improvement.

Goal:
Improve the current Kuali frontend prototype so it is more suitable for micro culinary MSME owners while still looking professional for judges.

Important:
Do NOT add production backend.
Do NOT implement real auth.
Do NOT implement real WhatsApp API.
Do NOT implement real QRIS/payment.
Do NOT add age-based personalization.
Do NOT add roadmap features as MVP.

Read:
- docs/proposal/99_FINAL_PROPOSAL_SUBMISSION.md if available
- src/app/page.tsx
- src/app/demo/page.tsx
- src/app/dashboard/page.tsx
- src/app/orders/page.tsx
- src/app/orders/[id]/page.tsx
- src/app/production/page.tsx
- src/app/summary/page.tsx
- src/lib/dummy-data.ts
- components related to dashboard and cards

CHECK:
1. Check current landing, login/register, dashboard, order list, detail order, production planner, and summary pages.
2. Check all dummy data.
3. Check whether there is a profile/company profile page or section.
4. Check for copywriting that is too technical.
5. Check for data inconsistencies.
6. Check whether roadmap features are too prominent.

DECIDE:
1. Replace "Company Profile" with "Profil Usaha".
2. Add display preference:
   - Mode Sederhana
   - Mode Standar
3. Do not ask for user age.
4. Default for UMKM mikro should be Mode Sederhana.
5. Existing full dashboard becomes Mode Standar.
6. Use one consistent hero order:
   - Kak Rina
   - 20x Nasi Kotak
   - Rp500.000
   - Draft → Dikonfirmasi
   - Belum Bayar
   - Sabtu, 23 Mei 2026
7. Add one low-confidence case:
   - Bu Tini
   - 3x Dessert Box
   - confidence 58%
   - needs owner review

IMPLEMENT:
1. Add Simple/Standard mode toggle on dashboard.
2. Create or update simple dashboard view:
   - Pesanan perlu dicek
   - Pelanggan belum bayar
   - Bahan untuk besok
   - Rekap hari ini
   Use large cards, minimal text, no charts.
3. Keep current dashboard as standard mode, but fix data and copy.
4. Update profile naming to "Profil Usaha".
5. Update login/register copy:
   - "Masuk sebagai Bu Rani"
   - "Mode demo — tidak membutuhkan akun asli"
   - Replace technical bullet points with human-readable benefits.
6. Fix order list data to avoid duplicate Dinda rows.
7. Fix order detail:
   - If confidence 90%, remove missing field warning.
   - If missing field exists, lower confidence and mark Perlu Cek.
8. Fix production planner:
   - Use realistic units.
   - Ensure stock status logic is correct.
9. Fix summary:
   - Align metrics with dashboard/order data.
   - Replace unsafe copy.
10. Keep roadmap below fold and label clearly:
   "Roadmap — belum tersedia di MVP."

VERIFY:
1. Dashboard simple mode works.
2. Dashboard standard mode works.
3. No age-based logic exists.
4. All numbers are consistent.
5. Payment status is consistent.
6. Production planner is logical.
7. Roadmap is not presented as MVP.
8. UI remains mobile-friendly.
9. No unsafe narrative appears.
10. npm run build passes if possible.

REPORT:
Report:
- Files checked
- Files updated
- UX changes made
- Data consistency fixes
- Remaining issues
- Recommended screenshots for proposal
```

---

## 9. Suggested Screenshots After Revision

Untuk proposal, ambil screenshot:

1. Landing page.
2. Mode Sederhana dashboard.
3. Mode Standar dashboard.
4. AI parsed draft order.
5. Detail order with owner approval.
6. Production planner.
7. Summary/impact.
8. Profil Usaha.

---

## 10. Final UX Positioning

Gunakan narasi ini:

> Kuali memahami bahwa tidak semua pemilik UMKM mikro nyaman membaca grafik atau tabel kompleks. Karena itu, Kuali menyediakan Mode Sederhana untuk aksi cepat dan Mode Standar untuk detail operasional. Dengan pendekatan ini, owner dapat memilih cara kerja yang paling nyaman tanpa kehilangan fungsi utama: merapikan pesanan, mengingatkan pembayaran, dan menyiapkan bahan produksi.
