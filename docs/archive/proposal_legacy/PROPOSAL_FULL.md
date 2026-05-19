# Proposal Produk — Kuali
### Asisten Operasional WhatsApp-First untuk UMKM Kuliner

> **Tagline:** Order rapi, produksi siap.
>
> **Kategori:** Food & Culinary Business Tech
>
> **Subtema Hackathon:** Teknologi untuk UMKM Kuliner Lokal

---

## Bagian 1 — Latar Belakang

Indonesia memiliki jutaan pelaku usaha mikro di sektor kuliner. Sebagian besar dari mereka tidak berjualan di mall, tidak punya kasir, dan tidak mendaftar ke marketplace besar. Mereka berjualan lewat WhatsApp — langsung ke pelanggan tetap, grup komunitas, dan jaringan dari mulut ke mulut yang sudah terbentuk bertahun-tahun.

Ini bukan keterbatasan. Ini adalah kekuatan.

UMKM kuliner seperti catering rumahan, nasi box pre-order, snack box, bakery rumahan, dessert box, frozen food, dan kopi literan sudah memiliki pelanggan, sudah punya omzet, dan sudah tahu cara berjualan. WhatsApp adalah kanal yang mereka pilih karena sesuai dengan cara pelanggan mereka berkomunikasi — personal, cepat, dan tanpa friction tambahan.

Tantangan yang mereka hadapi bukan soal bagaimana cara berjualan. Tantangannya ada di **proses operasional yang terjadi setelah chat masuk**: mencatat pesanan, memantau pembayaran, menghitung kebutuhan bahan, dan merekap kegiatan harian. Proses ini sering dilakukan secara manual, tanpa tools yang dirancang khusus untuk alur kerja mereka.

Kuali hadir untuk membantu merapikan proses itu — bukan menggantikan cara mereka berjualan, tapi memperkuat fondasi operasional di baliknya.

---

## Bagian 2 — Pernyataan Masalah

### Gambaran Situasi

Bayangkan Bu Rani, pemilik usaha catering rumahan yang melayani 20 hingga 50 pesanan per hari saat ramai. Setiap pagi, puluhan pesan masuk dari berbagai chat WhatsApp. Ada yang pesan baru, ada yang konfirmasi ulang, ada yang tanya stok, ada yang kabari sudah transfer. Semua campur aduk di satu aplikasi yang sama.

Bu Rani tidak punya admin khusus. Ia mengerjakan semuanya sendiri, sering sambil memasak, sambil mempersiapkan pesanan yang sudah harus siap jam 7 pagi.

### Masalah Konkret

**1. Pesanan mudah tercecer.**
Chat pesanan datang dari banyak kontak berbeda, masuk di antara pesan pribadi dan notifikasi lain. Tidak ada sistem yang memisahkan mana chat pesanan dan mana yang bukan. Satu pesanan yang terlewat bisa merusak kepercayaan pelanggan setia.

**2. Status pembayaran tidak terpantau.**
Bu Rani harus mengingat sendiri siapa yang sudah bayar dan siapa yang belum. Tidak ada notifikasi otomatis. Tidak ada daftar yang bisa dibuka kapan saja. Kalau lupa menagih, arus kas ikut terganggu.

**3. Kebutuhan bahan dihitung pakai perkiraan.**
Tidak ada sistem yang menghitung secara otomatis berapa beras, ayam, atau tepung yang harus disiapkan besok berdasarkan order yang sudah masuk. Semua dihitung dari ingatan atau catatan kasar — akurasinya tergantung kondisi dan waktu yang tersedia.

**4. Tidak ada rekap harian yang otomatis.**
Di akhir hari, Bu Rani harus menyusun sendiri ringkasan operasional: berapa order yang masuk, siapa yang belum bayar, dan bahan apa yang perlu dibeli besok. Proses ini menghabiskan waktu yang seharusnya bisa dipakai untuk istirahat atau persiapan produksi esok hari.

**5. Semua beban ada di satu orang.**
Tanpa admin, semua tanggung jawab operasional jatuh ke pemilik usaha. Kesalahan kecil — salah baca pesanan, lupa tanggal kirim, kurang bahan — bisa berdampak langsung ke kepuasan pelanggan dan reputasi usaha.

### Framing yang Tepat

Masalah ini bukan tentang kemampuan digital. Bu Rani sudah menggunakan WhatsApp setiap hari, sudah aktif melayani puluhan pelanggan, dan sudah membangun usaha yang berjalan. Tantangannya bersifat operasional: alur kerja di belakang chat yang belum punya sistem yang mendukungnya.

---

## Bagian 3 — Target Pengguna

### Persona Utama: Bu Rani

Bu Rani mewakili segmen UMKM kuliner WhatsApp-first yang menjadi fokus Kuali.

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

Kuali dirancang untuk UMKM kuliner yang memenuhi karakteristik berikut:

- Sudah aktif menerima pesanan lewat WhatsApp
- Volume antara 10 hingga 100 order per hari
- Tidak memiliki sistem POS atau admin khusus
- Menerima pesanan secara pre-order, bukan walk-in kasir
- Menggunakan smartphone Android sebagai alat utama operasional

Jenis usaha yang masuk dalam segmen ini antara lain: catering rumahan, nasi kotak, snack box, bakery rumahan, dessert box, frozen food, kopi literan, dan pre-order makanan rumahan.

### Yang Bukan Target Utama MVP

Kuali MVP tidak dirancang untuk restoran dengan sistem kasir, warung dengan transaksi walk-in, atau bisnis kuliner dengan tim operasional lengkap. Fokus MVP adalah pada owner yang mengerjakan operasional sendiri atau dengan bantuan minimal.

---

## Bagian 4 — Solusi

### Positioning

**Kuali adalah asisten operasional WhatsApp-first untuk UMKM kuliner yang membantu mengubah chat pesanan menjadi draft order, reminder pembayaran, estimasi bahan, dan rekap produksi harian.**

Kuali bukan POS. Bukan marketplace. Bukan chatbot percakapan umum. Kuali adalah sistem operasional yang bekerja di atas kebiasaan yang sudah ada — mengambil chat WhatsApp yang datang setiap hari dan mengubahnya menjadi data terstruktur yang bisa dikelola oleh owner.

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

**1. Owner tetap pegang kendali.**
AI hanya membantu membuat draft. Tidak ada satu pun order yang dikonfirmasi tanpa persetujuan eksplisit dari owner. Sistem dirancang untuk mempercepat proses, bukan mengambil alih keputusan.

**2. Tidak menambah beban belajar.**
Kuali bekerja di atas WhatsApp yang sudah dipakai setiap hari. Pelanggan tidak perlu install apapun. Owner hanya perlu membuka satu dashboard tambahan — bukan belajar sistem baru dari awal.

**3. Output yang nyata dan bisa dipakai langsung.**
Setiap fitur Kuali menghasilkan output konkret: draft order yang bisa diapprove, reminder yang bisa dikirim, daftar bahan yang bisa dijadikan acuan belanja, dan ringkasan yang bisa dibaca sekilas.

**4. Aman untuk demo — tidak overclaim.**
Semua kalkulasi bahan didasarkan pada order aktual yang sudah dikonfirmasi dan resep yang sudah dimasukkan owner. Kuali tidak menebak, tidak mengarang harga, dan tidak mengklaim hasil yang tidak bisa diverifikasi.

---

## Bagian 5 — Fitur MVP

MVP Kuali berfokus pada satu alur inti: dari chat WhatsApp masuk hingga produksi siap dan rekap harian tersedia.

### Fitur Inti

**1. Mock WhatsApp UI**
Halaman simulasi chat WhatsApp yang menerima input teks pesanan. Dirancang agar demo bisa berjalan tanpa tergantung pada WhatsApp Business API yang memerlukan proses persetujuan Meta.

**2. AI Order Parser**
Membaca teks chat pesanan dalam Bahasa Indonesia — termasuk variasi informal, typo, dan kalimat tidak lengkap — lalu menghasilkan structured JSON: nama pelanggan, menu, jumlah, tanggal kirim, status pembayaran, dan metode pengiriman.

**3. Confidence Score**
Setiap hasil parsing diberi skor kepercayaan (0–1). Pesanan dengan skor rendah ditandai secara visual agar owner tahu mana yang perlu diverifikasi sebelum dikonfirmasi.

**4. Missing Field Detector**
Secara otomatis mengidentifikasi informasi yang belum ada dalam chat — misalnya waktu pengiriman atau status pembayaran yang tidak disebutkan — dan menampilkannya sebagai field yang perlu dilengkapi.

**5. Owner Approval**
Owner melihat draft order, bisa mengedit, lalu menekan tombol approve. Status berubah dari Draft menjadi Dikonfirmasi. Tidak ada konfirmasi otomatis.

**6. Order Dashboard**
Tampilan daftar semua order dengan status, tanggal pengiriman, dan status pembayaran. Dirancang mobile-first dengan tombol aksi yang besar dan mudah dioperasikan sambil produksi.

**7. QRIS Dummy Reminder**
Setelah order dikonfirmasi, sistem menampilkan preview reminder pembayaran dengan QRIS dummy. Owner menyalin dan mengirimkan sendiri ke pelanggan. QRIS ini adalah milik merchant — bukan settlement otomatis, bukan integrasi payment gateway.

**8. Production Planner**
Menghitung kebutuhan bahan berdasarkan seluruh order yang sudah dikonfirmasi untuk tanggal produksi tertentu, dikalikan dengan resep sederhana yang sudah dimasukkan owner. Hasilnya adalah daftar bahan dengan jumlah yang harus disiapkan.

**9. Daily Summary**
Rekap harian otomatis yang menampilkan: total order, status masing-masing, jumlah yang belum bayar, dan bahan yang harus disiapkan untuk produksi besok. Tersedia dalam narasi Bahasa Indonesia yang ringkas.

**10. Impact Dashboard**
Tampilan metrik operasional dummy yang menggambarkan nilai Kuali secara kuantitatif — berapa order berhasil diparse, berapa terdeteksi perlu cek, berapa reminder siap dikirim. Semua angka dari data demo aktual, tidak overclaim.

### Yang Bukan Fitur MVP

| Fitur | Status | Keterangan |
|---|---|---|
| Real WhatsApp Business Cloud API | Roadmap | Perlu approval Meta, tidak feasible di hackathon |
| QRIS settlement otomatis | Roadmap | Butuh integrasi payment gateway |
| Community sourcing | Roadmap | Fitur berbasis consent, bukan klaim MVP |
| Rescue sale opt-in | Roadmap | Roadmap Phase 3 |
| Full POS / kasir | Bukan arah produk | Kuali bukan POS |
| Full inventory management | Bukan arah produk | Di luar scope MVP |
| Multi-tenant SaaS | Roadmap | Satu bisnis per demo |
| Marketplace | Bukan arah produk | Di luar scope Kuali |

---

## Bagian 6 — Teknologi

### Stack Utama

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 14+ App Router + TypeScript | Fullstack dalam satu repo, deploy mudah, type safety |
| Styling | Tailwind CSS + shadcn/ui | Mobile-first, komponen siap pakai, cepat di hackathon |
| Database | Supabase PostgreSQL | Managed, gratis tier cukup untuk demo, tidak perlu infra sendiri |
| ORM | Prisma | Type-safe, schema migration terstruktur |
| AI Parser | OpenAI GPT-4o / Anthropic Claude | Structured JSON output, reliable untuk Bahasa Indonesia informal |
| AI Fallback | Mock response (USE_MOCK_AI=true) | Demo tetap berjalan tanpa bergantung koneksi API |
| WhatsApp | Mock UI (textarea + API call) | Tidak butuh approval Meta untuk demo |
| Payment | QRIS dummy image | Tidak butuh payment gateway untuk demo |
| Deploy | Vercel | Gratis, satu perintah dari GitHub |

### Alur Teknis Ringkas

```
Mock WhatsApp UI
    ↓ POST chat text
/api/ai/parse-order
    ↓ prompt + menu context
AI Provider (atau mock fallback)
    ↓ structured JSON
Backend Validation
(cek menu exist, confidence score, missing field)
    ↓
Draft Order → Owner Dashboard
    ↓ owner approve
Database (Supabase + Prisma)
    ↓
Order Dashboard + QRIS Reminder + Production Planner + Daily Summary
```

### Keputusan Teknis Penting

**Mock-first, bukan real-API-first.**
Semua integrasi eksternal (WhatsApp, QRIS, AI) memiliki fallback mode yang berjalan tanpa koneksi live. Ini memastikan demo tidak gagal karena masalah jaringan atau rate limit.

**AI dengan guardrail ketat.**
AI parser hanya boleh menghasilkan output yang bisa divalidasi terhadap data menu aktual. AI tidak boleh mengarang harga, tidak boleh mengarang menu yang tidak ada, dan tidak boleh mengubah status pembayaran tanpa input owner.

**Single-tenant untuk MVP.**
Satu instance aplikasi melayani satu bisnis (Katering Bu Rani). Multi-tenant akan diimplementasikan di roadmap sebagai bagian dari rencana SaaS.

---

## Bagian 7 — Metrik Dampak

### Prinsip Pelaporan Metrik

Kuali menggunakan metrik yang bisa diverifikasi langsung dari data demo — bukan proyeksi, bukan klaim pasar, dan bukan estimasi penghematan yang tidak bisa diukur secara aktual.

### Metrik yang Dilaporkan dalam Demo

| Metrik | Sumber Data | Cara Ukur |
|---|---|---|
| Chat berhasil diparse | dummy-chats.json (15 chat) | Jumlah chat yang menghasilkan draft order valid |
| Order terdeteksi perlu cek | confidence score < 0.7 | Badge otomatis dari sistem |
| Order belum bayar | paymentStatus: unpaid | Filter di order dashboard |
| Reminder pembayaran siap | qrisDummyShown: true | Log di order record |
| Bahan terhitung dari order aktual | production planner | Kalkulasi aggregated dari confirmed orders × resep |
| Daily summary tersedia | dummy-daily-summary.json | Sistem menghasilkan tanpa input manual |

### Hasil Simulasi Demo (dari Data Dummy)

Dalam skenario demo dengan data Katering Bu Rani:

- **13 dari 15 chat** berhasil diparse menjadi draft order — 2 chat tidak diparse karena merupakan inquiry (bukan order) atau referensi ke pesanan lama yang perlu cek history
- **3 pesanan** teridentifikasi confidence rendah dan ditandai "Perlu Cek" sebelum owner approve
- **4 pesanan dikonfirmasi** masih belum bayar, total Rp 167.000 — reminder siap dikirim
- **6 jenis bahan** terhitung otomatis untuk produksi besok, berdasarkan 4 order yang sudah dikonfirmasi
- **Kebutuhan bahan** dari order aktual tidak melebihi stok yang tersedia — produksi besok dapat berjalan sesuai rencana
- **1 daily summary** dibuat otomatis tanpa rekap manual dari Bu Rani

### Yang Tidak Diklaim

- Profit Bu Rani naik sekian persen
- Food waste turun sekian persen
- Semua UMKM pasti terbantu
- Semua stok sisa pasti habis terjual
- Harga bahan baku lebih murah
- Semua pelanggan pasti puas

Metrik Kuali adalah metrik operasional, bukan metrik bisnis yang bergantung pada banyak faktor di luar kendali sistem.

---

## Bagian 8 — Potensi Bisnis

### Segmen Pasar

Indonesia memiliki lebih dari 64 juta UMKM, dengan sektor kuliner menjadi salah satu yang terbesar. Dari jumlah itu, sebagian besar pelaku usaha kuliner skala rumahan menggunakan WhatsApp sebagai kanal penjualan utama — bukan karena tidak ada pilihan lain, tapi karena WhatsApp memang sudah menjadi infrastruktur komunikasi sehari-hari.

Kuali menyasar segmen yang spesifik: UMKM kuliner WhatsApp-first yang menerima pesanan pre-order, belum punya sistem operasional, dan tidak membutuhkan POS lengkap.

### Model Bisnis yang Mungkin (Roadmap)

Pada fase awal, Kuali dapat berjalan sebagai alat gratis untuk membangun basis pengguna dan memvalidasi nilai produk. Setelah MVP terbukti berguna, beberapa model pendapatan dapat dikembangkan:

| Model | Deskripsi | Fase |
|---|---|---|
| Freemium | Dasar gratis, fitur lanjutan berbayar | Roadmap |
| Langganan bulanan | Rp 50.000–150.000/bulan per UMKM | Roadmap |
| Biaya layanan berbasis usage | Biaya layanan berdasarkan volume order yang diproses per bulan | Roadmap |
| Fitur komunitas premium | Akses belanja bareng, supplier pooling | Roadmap jangka panjang |

### Asumsi yang Dipakai (Bukan Klaim)

Angka di bawah adalah ilustrasi untuk menggambarkan potensi pasar — bukan proyeksi pendapatan yang dijamin.

Jika Kuali berhasil melayani 1.000 UMKM kuliner aktif dengan langganan rata-rata Rp 75.000/bulan, potensi recurring revenue adalah Rp 75 juta/bulan. Angka ini perlu divalidasi melalui willingness-to-pay research sebelum dijadikan target resmi.

### Relevansi dengan Ekosistem Lokal

Kuali dirancang untuk tumbuh bersama ekosistem UMKM lokal. Di roadmap jangka panjang, ketika data operasional sudah terkumpul dan kepercayaan pengguna sudah terbangun, Kuali dapat berkembang ke arah yang lebih dalam:

- Menghubungkan UMKM dengan supplier bahan baku lokal (community sourcing berbasis consent)
- Membantu mengurangi sisa produksi melalui mekanisme opt-in yang transparan (rescue sale — bukan broadcast otomatis)
- Menjadi platform data operasional kuliner yang bisa digunakan untuk mendukung program pemberdayaan UMKM

Semua ini adalah **visi roadmap**, bukan klaim MVP.

---

## Bagian 9 — Mitigasi Risiko

### Risiko Produk

| Risiko | Dampak | Mitigasi |
|---|---|---|
| AI parser salah baca chat | Order salah → pelanggan kecewa | Owner approval wajib sebelum konfirmasi. Confidence score ditampilkan. Missing field dideteksi otomatis. |
| Dependensi pada AI API saat demo | Demo gagal karena koneksi | Mock AI fallback (USE_MOCK_AI=true) — demo berjalan offline |
| WhatsApp API belum tersedia | Demo tidak bisa pakai WhatsApp nyata | Mock WhatsApp UI — tidak butuh approval Meta |
| Scope melebar selama hackathon | Fitur tidak selesai, demo berantakan | MVP boundary ketat, semua scope change lewat leader |

### Risiko Narasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Pitch terlihat seperti super app | Juri skeptis | Positioning eksplisit: "bukan POS, bukan marketplace" |
| Overclaim impact metrics | Kehilangan kredibilitas | Hanya pakai metrik dari data demo aktual, selalu sebut "simulasi" |
| Community sourcing diklaim sebagai MVP | Scope tidak terpenuhi | Selalu beri label "Roadmap" pada semua fitur roadmap |
| QRIS diklaim sebagai payment settlement | Salah paham compliance | Selalu sebut "QRIS dummy/reminder — bukan settlement" |
| Framing merendahkan UMKM | Narasi tidak empati | Tidak pernah gunakan kata "gaptek", "tertinggal", atau "belum digital" |

### Risiko Teknis

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Database tidak siap saat demo | Data tidak muncul | Seed data dummy di-run sebelum presentasi. Screenshot sebagai fallback. |
| Konflik merge menjelang deadline | Fitur rusak | Branching strategy: feature/* → dev → main. Feature freeze sebelum demo. |
| Deployment gagal di Vercel | Demo tidak bisa diakses | Test deploy H-1. Siapkan localhost sebagai fallback. |
| AI output tidak konsisten | Confidence score berfluktuasi | Gunakan cached/mock response untuk demo utama |

### Risiko Bisnis

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Target user tidak mau bayar | Model bisnis tidak valid | Validasi WTP di luar hackathon sebelum monetisasi |
| Persaingan dari incumbents | Sulit masuk pasar | Fokus pada niche yang tidak dilayani POS dan WhatsApp Business |
| Nama Kuali punya konflik brand | Masalah legal | Validasi manual domain, media sosial, PDKI sebelum go public |

---

## Bagian 10 — Roadmap

### Fase Saat Ini: Phase 0 — Baseline Proposal (Aktif)

Membuat fondasi: ide final, proposal, mockup, arsitektur, data dummy, dan task board. Tidak ada implementasi app produksi di fase ini.

### Phase 1 — Hackathon MVP Prototype

Membangun prototype yang bisa didemo: Next.js app berjalan lokal/Vercel, mock WhatsApp UI, AI parser endpoint, order dashboard, owner approval, QRIS dummy reminder, production planner, daily summary, impact dashboard, seed data.

**Target:** Demo berjalan end-to-end tanpa error dalam 3 menit.

### Phase 2 — Demo Hardening

Menstabilkan demo, memperbaiki bug, membuat fallback video, menyiapkan pitch Q&A, dan melakukan UI polish. Feature freeze. Semua fitur baru ditolak.

**Target:** Demo stabil 2 kali berturut-turut tanpa interupsi.

### Phase 3 — Roadmap Pasca Hackathon

Pengembangan dilakukan setelah hackathon selesai dan hanya jika ada validasi dari pengguna nyata:

| Fitur Roadmap | Deskripsi | Prioritas |
|---|---|---|
| Real WhatsApp Business Cloud API | Integrasi langsung dengan WhatsApp — perlu approval Meta | Tinggi |
| QRIS Settlement Real | Integrasi payment gateway — QRIS aktual | Sedang |
| Opt-in Customer System | Pelanggan bisa opt-in untuk notifikasi | Tinggi |
| Community Sourcing | Belanja bahan bersama UMKM sekitar — berbasis consent penuh | Sedang |
| Rescue Sale Opt-in | Sisa stok ditawarkan ke pelanggan terdekat yang sudah opt-in | Sedang |
| Supplier Pooling | Jaringan supplier bahan baku untuk UMKM | Jangka panjang |
| Multi-tenant SaaS | Satu platform untuk banyak UMKM | Jangka panjang |
| Mobile App Native | Aplikasi Android/iOS untuk owner | Jangka panjang |
| Google Cloud Production | Deployment production-grade | Jangka panjang |

> **Catatan:** Community sourcing dan rescue sale adalah **roadmap berbasis consent pengguna**. Tidak ada broadcast otomatis, tidak ada akses data pelanggan tanpa izin, dan tidak ada klaim bahwa sisa stok pasti habis terjual.

---

## Penutup

Kuali tidak mengubah cara UMKM kuliner berjualan. Kuali membantu merapikan alur yang sudah mereka jalankan setiap hari — dari chat pelanggan menjadi order yang tercatat, pembayaran yang terpantau, bahan yang terhitung, dan hari kerja yang lebih siap.

AI berperan sebagai asisten yang membuat draft. Keputusan tetap di tangan owner.

> **"Order rapi, produksi siap."**

---

*Proposal ini dibuat untuk keperluan Phase 0 hackathon Kuali. Semua data dan metrik yang disebutkan berasal dari data dummy yang dirancang untuk keperluan demo dan proposal — bukan klaim operasional nyata.*
