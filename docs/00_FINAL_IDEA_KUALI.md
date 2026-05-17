# 00 — Final Idea Kuali

> Source of truth ide final. File ini wajib dibaca sebelum mengerjakan proposal, desain, development, demo, dan pitch.

## 1. Nama Produk

**Kuali**

Catatan: nama ini masih perlu divalidasi secara manual sebelum dipakai publik/komersial. Jangan klaim nama aman secara legal sebelum cek domain, media sosial, PDKI/trademark, dan konflik brand lokal.

## 2. Tagline

**Order rapi, produksi siap.**

## 3. One-liner

**Kuali membantu UMKM kuliner yang berjualan lewat WhatsApp mengubah chat pesanan menjadi draft order, reminder pembayaran, estimasi bahan, dan rekap produksi harian.**

## 4. Product Vision

Kuali ingin menjadi asisten operasional ringan untuk UMKM kuliner WhatsApp-first. MVP tidak mencoba menjadi super app, POS lengkap, marketplace, atau platform supply-chain. Fokus awal adalah membantu owner merapikan order dan produksi harian yang sudah terjadi lewat WhatsApp.

Vision jangka panjang: ketika data order dan kebutuhan bahan sudah rapi, Kuali dapat berkembang menjadi platform operasional kuliner lokal yang mendukung community sourcing, supplier pooling, rescue sale opt-in, dan SaaS multi-tenant.

## 5. Problem Statement

Banyak UMKM kuliner sudah aktif berjualan lewat WhatsApp, tetapi proses operasional setelah chat masuk masih manual: pesanan tersebar di banyak chat, pembayaran perlu dicek satu per satu, bahan produksi dihitung pakai perkiraan, dan owner sering mengurus semuanya tanpa admin khusus.

## 6. Solution Statement

Kuali membantu owner mengubah chat pesanan menjadi draft order yang bisa dicek, menandai status pembayaran, memberi reminder QRIS dummy, menghitung kebutuhan bahan dari menu/resep sederhana, dan membuat rekap produksi harian.

## 7. Target User

UMKM kuliner WhatsApp-first seperti:

- Catering rumahan
- Nasi box
- Snack box
- Bakery rumahan
- Dessert box
- Frozen food
- Kopi literan
- Pre-order makanan rumahan

## 8. Persona Utama — Bu Rani

| Aspek | Detail |
|---|---|
| Nama | Bu Rani |
| Usia | 30–45 tahun |
| Usaha | Catering rumahan dan nasi box |
| Kanal jualan | WhatsApp, grup pelanggan, Instagram Story, repeat order |
| Volume order | 20–50 pesanan/hari saat ramai |
| Device | Android mid-low, sering dipakai sambil produksi |
| Kondisi tim | Tidak punya admin khusus atau hanya dibantu keluarga |
| Pain utama | Order tercecer, pembayaran belum jelas, bahan dihitung pakai feeling |
| Takut | Salah order, pelanggan kecewa, bahan kurang/berlebih, lupa tagih pembayaran |
| Butuh | Order rapi, reminder pembayaran, daftar bahan, rekap harian |

## 9. Jobs To Be Done

| Jenis Job | Kalimat JTBD |
|---|---|
| Functional | User sebenarnya tidak butuh POS lengkap, mereka butuh order WhatsApp tidak tercecer. |
| Emotional | User sebenarnya tidak butuh dashboard canggih, mereka butuh rasa tenang bahwa semua order sudah tercatat. |
| Financial | User sebenarnya tidak butuh laporan akuntansi rumit, mereka butuh tahu siapa yang belum bayar dan estimasi omzet harian. |
| Operational | User sebenarnya tidak butuh forecasting kompleks, mereka butuh tahu bahan apa yang harus disiapkan dari order aktual. |
| Customer service | User sebenarnya tidak butuh chatbot panjang, mereka butuh balasan konfirmasi yang cepat, sopan, dan konsisten. |
| Control/trust | User sebenarnya tidak butuh AI yang mengambil keputusan, mereka butuh AI yang membantu membuat draft lalu tetap bisa dicek owner. |

## 10. Core Value Proposition

**Kuali merapikan alur jualan WhatsApp UMKM kuliner: dari chat pelanggan menjadi order, pembayaran, dan rencana produksi yang lebih jelas.**

## 11. Positioning Statement

**Kuali bukan POS, bukan marketplace, dan bukan chatbot biasa. Kuali adalah asisten operasional WhatsApp-first untuk UMKM kuliner pre-order yang membantu merapikan pesanan, pembayaran, dan kebutuhan bahan harian.**

## 12. Subtema Hackathon

**Food & Culinary Business Tech**

Alasan: Kuali membantu pelaku usaha kuliner dalam efisiensi pesanan, pengelolaan bahan baku, rencana produksi, dan rekap operasional.

## 13. Kenapa Relevan dengan BuildLocal

- Fokus pada UMKM lokal, khususnya kuliner rumahan/pre-order.
- Mengikuti kebiasaan yang sudah dipakai: WhatsApp.
- Mobile-first dan ringan.
- AI dipakai untuk workflow nyata, bukan gimmick.
- QRIS hanya digunakan sebagai reminder dummy/milik merchant, bukan settlement real.
- Roadmap dapat mendukung ekosistem lokal seperti komunitas UMKM dan supplier bahan.

## 14. Kenapa WhatsApp-first

UMKM target sudah menggunakan WhatsApp untuk menerima pesanan. Membuat aplikasi baru yang memaksa customer install app akan memperbesar friction. Kuali menggunakan WhatsApp/mock WhatsApp sebagai pintu masuk dan dashboard sebagai alat bantu owner.

## 15. Kenapa AI Diperlukan

AI diperlukan karena chat pelanggan bersifat natural, tidak selalu rapi, dan sering mengandung variasi bahasa seperti:

- “Kak mau 12 risol buat besok jam 3.”
- “Ayam geprek 5 ya, ambil siang.”
- “Bayarnya nanti sore.”
- “Mau yang kemarin kayak biasa.”

AI dipakai untuk:

- Parsing chat menjadi structured JSON.
- Missing field detection.
- Suggested reply.
- Daily summary wording.

AI **tidak boleh**:

- Mengarang harga.
- Mengarang menu.
- Menghitung bahan tanpa data resep.
- Mengubah status pembayaran menjadi lunas tanpa input owner.
- Mengirim pesan tanpa approval/aturan.

## 16. Kenapa Bukan Chatbot Biasa

| Chatbot biasa | Kuali |
|---|---|
| Fokus balas pesan | Fokus workflow order dan produksi |
| Tidak punya data menu/resep | Terhubung dengan menu dan resep sederhana |
| Bisa menjawab bebas | Output dibatasi structured JSON |
| Bisa mengarang | Backend memvalidasi menu/harga/status |
| Tidak punya dashboard operasional | Ada order dashboard, production planner, impact dashboard |

## 17. Kenapa Bukan POS Biasa

POS biasanya dimulai dari transaksi kasir. Kuali dimulai dari **chat pre-order** sebelum transaksi final. Kuali tidak membuat fitur kasir lengkap, printer struk, meja, multi-cabang, full accounting, atau inventory kompleks di MVP.

## 18. MVP Scope

MVP wajib:

- Mock WhatsApp / chat order masuk
- AI Order Parser
- Structured output JSON
- Confidence score
- Missing field detector
- Owner approval/edit
- Order dashboard
- Payment reminder QRIS dummy
- Menu dan resep sederhana
- Production planner dari order aktual
- Daily summary
- Impact dashboard

## 19. Non-goals MVP

Jangan dibuat di MVP:

- Full POS
- Full inventory
- Marketplace
- Real QRIS settlement
- Flash sale otomatis
- Broadcast marketing tanpa opt-in
- Supplier pooling real
- Route optimization
- ML prediction kompleks
- Native mobile app berat
- Multi-tenant SaaS production-grade

## 20. Roadmap / Vision

Roadmap setelah MVP:

1. Real WhatsApp Business Cloud API.
2. n8n automation production-ready.
3. Auth multi-tenant.
4. Customer opt-in/opt-out system.
5. Community sourcing / belanja bareng.
6. Supplier pooling.
7. Rescue sale opt-in.
8. Stok sisa alert.
9. Google Cloud production deployment.
10. SaaS pricing dan billing.

## 21. Demo Story

Demo utama:

1. Bu Rani menerima chat order dari customer.
2. Chat masuk ke Mock WhatsApp UI.
3. AI mengubah chat menjadi draft order JSON.
4. Sistem menampilkan confidence score dan missing field.
5. Bu Rani approve/edit order.
6. Sistem membuat payment reminder QRIS dummy.
7. Order masuk dashboard.
8. Production planner menghitung bahan dari order aktual.
9. Daily summary menampilkan order, unpaid, perlu cek, dan bahan.
10. Optional card: community sourcing/rescue sale sebagai roadmap simulation, bukan MVP utama.

## 22. Impact Metrics

Gunakan metrik aman, bukan overclaim:

| Metric | Cara Mengukur |
|---|---|
| Jumlah order berhasil diparse | Dari dummy chat/order live demo |
| Jumlah order perlu cek | Confidence rendah/missing field |
| Jumlah order belum bayar | Payment status unpaid |
| Reminder terkirim | Notification log dummy |
| Estimasi bahan | Order aktual × resep |
| Waktu rekap simulasi | Manual vs bantuan draft order |
| Daily summary generated | Sistem menghasilkan ringkasan harian |

Jangan klaim:

- Profit naik pasti.
- Food waste turun sekian persen.
- Semua UMKM pasti terbantu.
- Semua stok sisa pasti laku.
- Harga bahan pasti lebih murah.

## 23. Narrative Safety

Framing aman:

> UMKM kuliner sudah aktif menggunakan WhatsApp. Tantangannya bukan mereka belum digital, tetapi proses operasional di belakang chat masih sering manual.

Kuali membantu, bukan menggantikan.

## 24. Kalimat yang Boleh Dipakai

- “Membantu owner merapikan order dari WhatsApp.”
- “AI membuat draft, owner tetap memegang kendali.”
- “Estimasi bahan berdasarkan order aktual dan resep yang dimasukkan owner.”
- “Reminder pembayaran menggunakan QRIS dummy/milik merchant.”
- “Belanja bareng dan rescue sale adalah roadmap berbasis consent, bukan klaim MVP.”
- “MVP fokus pada order operation dan production planner.”

## 25. Kalimat yang Harus Dihindari

- “UMKM gaptek.”
- “UMKM tertinggal.”
- “Pemerintah belum cukup membantu.”
- “AI menggantikan admin.”
- “Food waste pasti turun.”
- “Harga bahan pasti lebih murah.”
- “Semua stok sisa pasti laku.”
- “Broadcast otomatis ke pelanggan sekitar.”
- “QRIS settlement otomatis.”
- “Kuali adalah super app UMKM kuliner.”

## 26. Final Pitch 30 Detik

Banyak UMKM kuliner sudah aktif berjualan lewat WhatsApp. Tantangannya, setelah chat masuk, proses rekap order, pembayaran, dan kebutuhan bahan masih sering manual. Kuali membantu mengubah chat pesanan menjadi draft order, reminder pembayaran QRIS dummy, dan rencana produksi harian. AI hanya membantu membuat draft dan insight, sementara keputusan tetap di tangan pemilik usaha.

## 27. Final Pitch 1 Menit

Kuali adalah asisten operasional WhatsApp-first untuk UMKM kuliner seperti catering rumahan, snack box, bakery, dan pre-order makanan. Kami tidak berangkat dari asumsi bahwa UMKM belum digital. Justru banyak dari mereka sudah aktif memakai WhatsApp. Masalahnya ada di proses setelah chat masuk: order harus dicatat ulang, pembayaran dicek satu-satu, dan bahan produksi dihitung pakai perkiraan. Kuali membaca chat pelanggan menjadi draft order dengan structured output, menampilkan confidence score, memberi ruang owner untuk approve atau edit, lalu membantu membuat reminder pembayaran QRIS dummy dan production planner berdasarkan order aktual. Untuk MVP, kami fokus pada order operation dan production planner. Fitur belanja bareng dan rescue sale kami posisikan sebagai roadmap, bukan klaim MVP.

## 28. Final Closing Statement

**Kuali tidak mengganti cara UMKM berjualan. Kuali membantu merapikan alur yang sudah mereka pakai setiap hari: dari chat pelanggan menjadi order dan produksi yang lebih siap.**

## 29. Scope Reminder untuk Tim dan AI Agent

- Kuali MVP bukan super app.
- Core MVP tetap order operation + production planner.
- Belanja bareng dan rescue sale hanya roadmap/demo simulation.
- Selalu CHECK sebelum IMPLEMENT.
- Jangan rebuild jika fitur sudah ada.
- Jangan menambah fitur roadmap ke MVP tanpa approval leader.
