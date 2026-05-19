# 02 — Hustler: Business & Market Strategy

## Hustler Objective

Role Hustler bertanggung jawab membuktikan bahwa Kuali menyelesaikan masalah nyata, punya target pengguna jelas, dapat diposisikan secara kompetitif, dan memiliki potensi bisnis yang realistis.

## Problem-Market Fit

Kuali menyasar UMKM kuliner WhatsApp-first yang sudah aktif menerima pesanan melalui chat, tetapi proses operasional setelah chat masih manual. Masalah ini terjadi berulang: order masuk, owner rekap manual, pembayaran dicek satu per satu, dan bahan produksi dihitung berdasarkan perkiraan.

Kekuatan problem-market fit:

1. Entry point sudah ada: WhatsApp.
2. Masalah terjadi berulang.
3. Target user spesifik.
4. Solusi tidak memaksa perubahan perilaku besar.
5. MVP dapat didemokan secara visual.

## Target Segment

### Primary Segment

- Catering rumahan
- Nasi box
- Snack box
- Bakery rumahan
- Dessert box
- Frozen food
- Kopi literan
- Pre-order makanan rumahan

### Early Adopter

- Menerima minimal 10–20 order per hari/minggu via WhatsApp.
- Punya menu yang relatif tetap.
- Sering rekap manual.
- Sering mengecek pembayaran manual.
- Belum membutuhkan POS kompleks.

## User Pain Analysis

| Pain | Dampak | Solusi Kuali |
|---|---|---|
| Pesanan tersebar di chat | Order bisa kelewat | AI order parser |
| Rekap manual | Waktu owner terbuang | Draft order otomatis |
| Pembayaran belum tercatat | Cashflow sulit dipantau | Payment status + reminder |
| Bahan dihitung pakai feeling | Produksi kurang terencana | Production planner |
| Tidak ada admin | Owner multitasking | Workflow ringan |
| Chat tidak lengkap | Perlu tanya ulang manual | Missing field detector |

## Business Model Canvas

| Elemen | Isi |
|---|---|
| Customer Segments | UMKM kuliner WhatsApp-first |
| Value Propositions | Order rapi, payment reminder, production planner, daily summary |
| Channels | Komunitas UMKM, WhatsApp group, Instagram, kampus, demo langsung |
| Customer Relationships | Self-service onboarding, template menu, edukasi ringan, support via WhatsApp |
| Revenue Streams | Freemium, Starter, Pro, future supplier partnership |
| Key Resources | AI parser, dashboard mobile, database menu/resep, tim teknis |
| Key Activities | Product development, user testing, onboarding, community partnership |
| Key Partnerships | Komunitas UMKM, kampus, payment provider roadmap, supplier roadmap |
| Cost Structure | Hosting, AI API, database, development, marketing, support |

## SWOT Analysis

| Strengths | Weaknesses |
|---|---|
| WhatsApp-first | Butuh input menu/resep awal |
| AI use case jelas | AI bisa salah parsing |
| Fokus niche kuliner pre-order | Belum validasi lapangan besar |
| Demo visual kuat | Bisa dianggap chatbot/POS jika positioning lemah |

| Opportunities | Threats |
|---|---|
| UMKM kuliner banyak memakai chat order [NEED SOURCE] | WhatsApp Business, POS, ChatGPT |
| WhatsApp/QRIS/GCP relevan dengan hackathon | Owner malas input data |
| Potensi SaaS ringan | Regulasi data/payment saat production |

## Competitor Benchmarking

| Alternatif | Kelebihan | Keterbatasan | Diferensiasi Kuali |
|---|---|---|---|
| WhatsApp Business | Familiar, katalog, quick replies | Order tetap manual | Chat menjadi draft order + planner |
| Majoo/Qasir | POS lengkap | Terlalu berat untuk pre-order rumahan | Fokus sebelum kasir |
| BukuWarung/BukuKas | Pembukuan | Tidak fokus production planning | Fokus order-to-production |
| Spreadsheet/manual book | Murah | Manual dan tercecer | Mengurangi input ulang |
| ChatGPT biasa | Bisa bantu teks | Tidak punya workflow/database | AI terhubung ke data bisnis |
| Admin manusia | Fleksibel | Biaya tambahan | Membantu admin repetitif |

## Differentiation

1. WhatsApp-first.
2. Chat-to-order workflow.
3. Owner approval.
4. Production planner dari order aktual.
5. Bukan POS, bukan marketplace, bukan chatbot biasa.

## Go-To-Market Strategy

### Launch Strategy

1. Prototype high-fidelity.
2. Validasi 5–10 UMKM kuliner.
3. Demo mobile-first.
4. Kumpulkan feedback.
5. Iterasi flow.

### First User Acquisition

- UMKM sekitar kampus.
- Penjual snack box mahasiswa.
- Catering rumahan lokal.
- Komunitas UMKM WhatsApp/Facebook/Instagram.
- Jaringan personal tim.

### Marketing Channels

- Instagram reels edukasi.
- Demo video pendek.
- WhatsApp group UMKM.
- Komunitas kampus.
- Event kewirausahaan.

### Distribution Channels

- Web app / PWA.
- WhatsApp link onboarding.
- Demo langsung.
- Referral antar owner kuliner.

## Business Model

| Plan | Target | Fitur | Pricing Draft |
|---|---|---|---|
| Free | Seller kecil | Order terbatas, dashboard dasar | Rp0 |
| Starter | UMKM pre-order rutin | Order lebih banyak, reminder, daily summary | Rp49k/bulan |
| Pro | Volume lebih tinggi | Production planner, customer history, analytics | Rp99k–149k/bulan |
| Future Partnership | Supplier/payment partner | Supplier sourcing, opt-in promo | Revenue share/fee |

Willingness to pay harus divalidasi. Jangan klaim semua UMKM langsung bayar.

## Impact Measurement

Metrik aman:

- Jumlah chat berhasil diparse.
- Jumlah order perlu review.
- Jumlah order belum bayar.
- Jumlah reminder terkirim.
- Estimasi bahan berdasarkan order aktual.
- Waktu rekap manual vs review draft.
- Daily summary generated.

## Risk and Mitigation

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Owner malas input menu/resep | Planner tidak optimal | Mulai dari 3–5 menu utama |
| AI salah parsing | Trust turun | Confidence score + owner approval |
| Dianggap chatbot biasa | Inovasi turun | Tunjukkan workflow order-to-production |
| Dianggap POS biasa | Red ocean | Tekankan pre-order WhatsApp-first |
| Willingness to pay rendah | SaaS sulit | Freemium + validasi user awal |
| Roadmap terlalu luas | Juri skeptis | Pisahkan MVP dan roadmap |

## Hustler Task Checklist

- [ ] Validasi problem statement
- [ ] Lengkapi BMC
- [ ] Lengkapi SWOT
- [ ] Lengkapi benchmark
- [ ] Buat GTM
- [ ] Buat pricing draft
- [ ] Buat impact measurement
- [ ] Tandai klaim butuh sumber

## Hustler Acceptance Criteria

- Business section jelas.
- Target user spesifik.
- Competitor comparison fair.
- Pricing realistis.
- Impact metrics aman.
- Tidak overclaim.
