# 01 — Proposal Content Draft Kuali

> Draft isi proposal dari cover sampai lampiran. Semua angka statistik harus diverifikasi. Jika belum ada sumber, tandai `[NEED SOURCE]`.

---

# Cover

**Judul Proposal:** Kuali: Asisten Operasional WhatsApp-first untuk UMKM Kuliner  
**Nama Tim:** [NAMA TIM]  
**Tagline:** Order rapi, produksi siap.

| Nama | Peran | Kontribusi |
|---|---|---|
| [Leader] | Hacker / Hustler / Hipster Lead | Product direction, architecture, AI, integration |
| [Anggota 2] | Hacker | Backend/database/API |
| [Anggota 3] | Hacker | Frontend/prototype |
| [Anggota 4] | Hustler | Business, market, impact |
| [Anggota 5] | Hipster | UI/UX, mockup, design |

---

# Daftar Isi

1. Pendahuluan  
2. Business & Market Strategy  
3. User Experience & Design  
4. Teknologi & Implementasi  
5. Kesimpulan & Rencana Pengembangan  
6. Daftar Pustaka  
7. Lampiran Opsional  

---

# 1. Pendahuluan

## 1.1 Latar Belakang

UMKM kuliner merupakan salah satu bentuk usaha lokal yang dekat dengan kehidupan masyarakat Indonesia. Banyak pelaku usaha kuliner rumahan seperti catering, nasi box, snack box, bakery rumahan, dessert box, frozen food, kopi literan, dan pre-order makanan telah memanfaatkan kanal digital sederhana untuk menerima pesanan, terutama WhatsApp.

Hal ini menunjukkan bahwa banyak UMKM sebenarnya sudah aktif menggunakan teknologi dalam aktivitas jualan. Tantangannya bukan mereka belum digital, tetapi proses operasional di belakang chat masih sering manual. Setelah pesanan masuk, pemilik usaha masih perlu membaca percakapan satu per satu, mencatat pesanan, memastikan pembayaran, menghitung kebutuhan bahan, dan membuat rekap produksi harian.

Pada skala kecil, proses manual masih dapat berjalan. Namun ketika pesanan meningkat, risiko pesanan terlewat, informasi tidak lengkap, pembayaran belum tercatat, dan kebutuhan bahan kurang tepat menjadi semakin besar. Masalah ini dapat menghabiskan waktu pemilik usaha yang seharusnya dapat digunakan untuk produksi, pelayanan pelanggan, atau pengembangan bisnis.

Data jumlah UMKM Indonesia, kontribusi UMKM terhadap ekonomi, dan penggunaan kanal digital oleh pelaku UMKM perlu dilengkapi dari sumber resmi. [NEED SOURCE]

## 1.2 Masalah yang Ingin Diselesaikan

Masalah utama yang ingin diselesaikan Kuali adalah ketidakteraturan operasional setelah pesanan masuk lewat WhatsApp:

- Pesanan tersebar di banyak chat.
- Owner harus merekap secara manual.
- Pesanan bisa terlewat atau salah dibaca.
- Pembayaran belum tentu langsung tercatat.
- Pelanggan perlu diingatkan untuk membayar.
- Owner bingung harus menyiapkan bahan berapa banyak.
- Produksi harian masih sering dihitung berdasarkan perkiraan.
- Laporan harian belum rapi.
- Banyak owner tidak memiliki admin khusus.

## 1.3 Mengapa Masalah Ini Penting

Masalah ini penting karena operasional harian adalah fondasi pertumbuhan usaha. Ketika order, pembayaran, dan produksi tidak tercatat dengan rapi, UMKM kuliner dapat kesulitan menjaga akurasi pesanan, memantau pembayaran, menyiapkan bahan, dan memberikan layanan pelanggan yang konsisten.

## 1.4 Tujuan Solusi

Kuali bertujuan membantu UMKM kuliner WhatsApp-first merapikan operasional pesanan dengan cara sederhana, mobile-first, dan tetap dalam kendali pemilik usaha.

Tujuan spesifik:

1. Mengubah chat pesanan menjadi draft order terstruktur.
2. Membantu owner mengecek dan menyetujui pesanan.
3. Menandai status pembayaran.
4. Menyediakan reminder pembayaran QRIS dummy pada prototype.
5. Menghitung estimasi kebutuhan bahan berdasarkan order aktual.
6. Menyediakan rekap produksi harian dan impact dashboard.

## 1.5 Dampak yang Diharapkan

Dampak yang diharapkan:

- Mengurangi waktu rekap manual.
- Membantu meminimalkan risiko pesanan terlewat.
- Membantu owner melihat order yang belum bayar.
- Membantu owner menyiapkan bahan berdasarkan pesanan aktual.
- Membantu owner memahami performa harian.

Catatan: proposal tidak mengklaim profit naik, food waste turun, atau harga bahan pasti lebih murah tanpa validasi lapangan.

---

# 2. Business & Market Strategy

## 2.1 Business Model Canvas

| Elemen | Isi |
|---|---|
| Customer Segments | UMKM kuliner WhatsApp-first: catering, nasi box, snack box, bakery, dessert, frozen food, kopi literan |
| Value Propositions | Mengubah chat pesanan menjadi order rapi, reminder pembayaran, production planner, dan daily summary |
| Channels | Komunitas UMKM, kampus, WhatsApp group, Instagram, demo langsung |
| Customer Relationships | Self-service onboarding, template menu, edukasi singkat, support via WhatsApp |
| Revenue Streams | Freemium, Starter, Pro, future supplier partnership |
| Key Resources | AI parser, dashboard mobile, database menu/resep, tim teknis |
| Key Activities | Product development, user testing, onboarding, partnership komunitas |
| Key Partnerships | Komunitas UMKM, kampus, payment provider roadmap, supplier roadmap |
| Cost Structure | Hosting, AI API, database, development, marketing, support |

## 2.2 SWOT Analysis

| Strengths | Weaknesses |
|---|---|
| WhatsApp-first dan sesuai kebiasaan user | Butuh input menu/resep awal |
| AI punya use case jelas | AI bisa salah parsing |
| Fokus niche kuliner pre-order | Belum validasi lapangan besar |
| Demo visual kuat | Bisa dianggap chatbot/POS jika positioning lemah |

| Opportunities | Threats |
|---|---|
| Banyak UMKM kuliner menggunakan chat order [NEED SOURCE] | WhatsApp Business, POS, ChatGPT |
| Integrasi WhatsApp/QRIS/GCP relevan dengan hackathon | Owner malas input data |
| Potensi SaaS ringan | Regulasi data/payment saat production |

## 2.3 Competitor Benchmarking

| Alternatif | Kelebihan | Keterbatasan | Diferensiasi Kuali |
|---|---|---|---|
| WhatsApp Business | Familiar, katalog, quick replies | Order tetap perlu dicatat manual | Chat menjadi draft order + production planner |
| POS Majoo/Qasir | Fitur transaksi lengkap | Bisa terlalu kompleks untuk pre-order rumahan | Kuali fokus sebelum transaksi kasir |
| BukuWarung/BukuKas | Pembukuan sederhana | Tidak fokus chat order dan produksi | Kuali fokus order-to-production |
| Spreadsheet/buku manual | Murah dan fleksibel | Manual dan rawan tercecer | Kuali mengurangi input ulang |
| ChatGPT biasa | Bisa bantu teks | Tidak punya workflow order dan data bisnis | Kuali punya workflow dan validation |
| Admin manusia | Fleksibel | Butuh biaya tambahan | Kuali membantu pekerjaan administratif berulang |

## 2.4 Go-To-Market

Strategi awal Kuali fokus pada segmen sempit: UMKM kuliner pre-order yang menerima pesanan lewat WhatsApp. Target awal berasal dari lingkungan kampus, komunitas UMKM lokal, grup kuliner rumahan, dan jaringan personal tim.

Tahap peluncuran awal:

1. Validasi dengan 5–10 pelaku UMKM kuliner.
2. Demo prototype mobile-first.
3. Kumpulkan feedback user journey.
4. Uji pemahaman owner terhadap order parser dan production planner.
5. Perbaiki copywriting dan flow.

---

# 3. User Experience & Design

## 3.1 User Persona

**Bu Rani** adalah pemilik catering rumahan berusia sekitar 34 tahun. Ia menerima pesanan dari WhatsApp dan Instagram Story, menggunakan Android mid-low, dan sering mengurus chat, pembayaran, serta produksi tanpa admin khusus.

Pain point Bu Rani:
- Order tersebar di banyak chat.
- Pembayaran belum rapi.
- Bahan dihitung berdasarkan perkiraan.
- Takut pesanan salah atau kelewat.

Kebutuhan:
- Order rapi.
- Reminder pembayaran.
- Daftar bahan produksi.
- Dashboard sederhana.

## 3.2 User Journey

### Sebelum Kuali

1. Customer chat via WhatsApp.
2. Owner membaca chat satu per satu.
3. Pesanan dicatat manual.
4. Pembayaran dicek manual.
5. Bahan dihitung berdasarkan perkiraan.
6. Rekap harian dibuat jika sempat.

### Setelah Kuali

1. Customer tetap chat seperti biasa.
2. AI membaca chat dan membuat draft order.
3. Owner approve/edit.
4. Sistem menandai status pembayaran.
5. Reminder QRIS dummy dapat dibuat.
6. Sistem menghitung estimasi bahan berdasarkan order aktual.
7. Daily summary menampilkan rekap.

## 3.3 Mockup Product Explanation

Mockup produk dibuat sebagai high-fidelity frontend prototype mobile-first. Halaman utama:

- Landing / intro
- Mock WhatsApp screen
- Dashboard hari ini
- Order list
- Order detail
- Payment reminder
- Production planner
- Daily summary
- Impact dashboard
- Roadmap simulation card

Mockup tidak menampilkan full POS, marketplace, atau real payment settlement.

---

# 4. Teknologi & Implementasi

## 4.1 Pemanfaatan AI

AI digunakan untuk:

1. AI Order Parser — membaca chat dan menghasilkan structured JSON.
2. Missing Field Detector — menandai data yang kurang.
3. Suggested Reply — memberi draft balasan sopan.
4. Daily Summary — menyusun ringkasan berdasarkan data order.

AI tidak digunakan untuk mengarang menu, mengarang harga, mengonfirmasi pembayaran, menghitung bahan tanpa data resep, atau mengambil keputusan final.

## 4.2 Use Case Diagram Explanation

Aktor utama:
- Customer
- Owner UMKM
- AI Parser
- Sistem Kuali

Use case utama:
- Customer mengirim pesanan.
- AI membuat draft order.
- Owner approve/edit order.
- Sistem membuat payment reminder.
- Sistem membuat production planner.
- Owner melihat daily summary.

## 4.3 Sequence Diagram Explanation

Alur utama:

1. Customer mengirim chat.
2. Sistem menerima pesan.
3. AI parser mengubah pesan menjadi JSON.
4. Backend memvalidasi menu, harga, dan data order.
5. Owner approve/edit.
6. Sistem menyimpan order.
7. Sistem membuat payment reminder dan production planner.

## 4.4 System Design Explanation

Baseline architecture:

- Frontend: Next.js App Router, Tailwind, shadcn/ui
- Backend: Next.js API Routes pada MVP lanjutan
- Database: Supabase PostgreSQL + Prisma
- AI: OpenAI/Anthropic structured output
- WhatsApp: mock UI pada tahap awal, real API sebagai roadmap
- Payment: QRIS dummy reminder only
- Deployment: Vercel untuk frontend prototype

---

# 5. Kesimpulan & Rencana Pengembangan

Kuali adalah solusi WhatsApp-first untuk membantu UMKM kuliner merapikan operasional pesanan, pembayaran, dan produksi harian. Fokus utama Kuali bukan mengganti kebiasaan pelaku UMKM, tetapi mengikuti cara jualan yang sudah mereka gunakan.

Keunggulan Kuali:

- Fokus pada masalah nyata dan spesifik.
- AI digunakan secara fungsional.
- Owner tetap memegang kendali.
- Mobile-first dan sederhana.
- Roadmap pengembangan jelas.

Rencana pengembangan:

1. Uji coba dengan UMKM kuliner nyata.
2. Integrasi WhatsApp Business Cloud API.
3. Pengembangan opt-in customer list.
4. SaaS multi-tenant.
5. Community sourcing dan supplier pooling.
6. Rescue sale consent-based.
7. Analytics dan monitoring.

---

# 6. Daftar Pustaka Placeholder

- [NEED SOURCE] Data jumlah UMKM Indonesia.
- [NEED SOURCE] Kontribusi UMKM terhadap PDB/tenaga kerja.
- [NEED SOURCE] Data penggunaan WhatsApp di Indonesia.
- [NEED SOURCE] Data QRIS adoption dan merchant UMKM.
- [NEED SOURCE] Referensi structured output LLM.
- [NEED SOURCE] Referensi privasi data/consent.

---

# 7. Lampiran Opsional Placeholder

- Lampiran A: Mockup screen
- Lampiran B: Diagram arsitektur
- Lampiran C: AI JSON schema
- Lampiran D: Dummy chat data
- Lampiran E: Task board dan pembagian role
