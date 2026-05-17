# Model Bisnis — Kuali

> Semua model bisnis di dokumen ini adalah **Roadmap** — bukan klaim MVP.
> MVP Kuali berjalan sebagai demo gratis untuk membuktikan nilai produk.

---

## Segmen Pasar

Indonesia memiliki jutaan UMKM di sektor kuliner. Dari jumlah itu, sebagian besar pelaku usaha kuliner skala rumahan menggunakan WhatsApp sebagai kanal penjualan utama — bukan karena tidak ada pilihan lain, tapi karena WhatsApp memang sudah menjadi infrastruktur komunikasi sehari-hari.

**Segmen spesifik Kuali:**

UMKM kuliner WhatsApp-first yang menerima pesanan pre-order, belum punya sistem operasional, dan tidak membutuhkan POS lengkap.

Karakteristik segmen:
- Volume 10–100 order/hari
- Tidak punya admin khusus
- Android mid-low sebagai perangkat utama
- WhatsApp sebagai satu-satunya kanal order

---

## Model Bisnis yang Mungkin (Roadmap)

Pada fase awal, Kuali berjalan sebagai alat gratis untuk membangun basis pengguna dan memvalidasi nilai produk. Setelah MVP terbukti berguna, beberapa model pendapatan dapat dikembangkan:

| Model | Deskripsi | Fase |
|---|---|---|
| Freemium | Dasar gratis, fitur lanjutan berbayar | Roadmap |
| Langganan bulanan | Rp 50.000–150.000/bulan per UMKM | Roadmap |
| Biaya layanan berbasis usage | Biaya layanan berdasarkan volume order yang diproses per bulan | Roadmap |
| Fitur komunitas premium | Akses belanja bareng, supplier pooling | Roadmap jangka panjang |

---

## Asumsi Pasar (Ilustrasi — Bukan Klaim)

Angka di bawah adalah ilustrasi untuk menggambarkan potensi pasar — bukan proyeksi pendapatan yang dijamin dan bukan target resmi.

> Jika Kuali berhasil melayani UMKM kuliner aktif dengan model langganan bulanan, potensi recurring revenue dapat diestimasi dari penetrasi pasar yang konservatif. Validasi willingness-to-pay diperlukan sebelum angka ini dijadikan target.

Asumsi yang perlu divalidasi sebelum monetisasi:
- Berapa UMKM yang mau membayar untuk tool operasional?
- Berapa harga yang bisa diterima (WTP) untuk segmen ini?
- Fitur mana yang paling mendorong konversi dari free ke paid?

---

## Relevansi dengan Ekosistem Lokal

Kuali dirancang untuk tumbuh bersama ekosistem UMKM lokal. Di roadmap jangka panjang, ketika data operasional sudah terkumpul dan kepercayaan pengguna sudah terbangun, Kuali dapat berkembang:

- **Community sourcing** — menghubungkan UMKM dengan supplier bahan baku lokal (berbasis consent pengguna, bukan broadcast otomatis)
- **Rescue sale opt-in** — membantu mengurangi sisa produksi melalui mekanisme opt-in yang transparan (bukan klaim "sisa stok pasti habis")
- **Platform data operasional** — mendukung program pemberdayaan UMKM dari data agregat yang anonim

**Semua ini adalah visi roadmap, bukan klaim MVP.**

---

## Differensiasi vs Kompetitor

| Aspek | WhatsApp Business | POS (Moka, dll) | ChatGPT | Spreadsheet | **Kuali** |
|---|---|---|---|---|---|
| Parsing chat jadi order | ✗ | ✗ | ⚠️ manual | ✗ | ✓ otomatis |
| Owner approval/kontrol | ✗ | ⚠️ kasir | ✗ | ✓ manual | ✓ terstruktur |
| Production planner dari order | ✗ | ⚠️ perlu inventory | ✗ | ✗ | ✓ otomatis |
| Reminder pembayaran | ⚠️ manual | ⚠️ modul tambahan | ✗ | ✗ | ✓ satu klik |
| Daily summary otomatis | ✗ | ⚠️ bukan UMKM-first | ✗ | ✗ manual | ✓ |
| Cocok untuk pre-order UMKM | ⚠️ | ⚠️ | ⚠️ | ✓ tapi melelahkan | ✓ |

**Celah pasar yang diisi Kuali:** UMKM kuliner pre-order, 10–100 order/hari, tidak punya admin, sudah aktif pakai WhatsApp — segmen yang terlalu kecil untuk POS enterprise, terlalu besar untuk dikelola manual.

---

## Catatan Framing untuk Pitch

**Boleh dipakai:**
- "Kuali mengisi celah yang belum dilayani POS dan WhatsApp Business"
- "Model bisnis freemium dan langganan dalam roadmap, setelah MVP terbukti berguna"
- "Validasi WTP diperlukan sebelum monetisasi"

**Jangan dipakai:**
- "Market size Rp X triliun" — tanpa data yang divalidasi
- "Kami akan bantu jutaan UMKM" — terlalu besar tanpa dasar
- "Profit Bu Rani pasti naik dengan Kuali" — tidak bisa dijamin
