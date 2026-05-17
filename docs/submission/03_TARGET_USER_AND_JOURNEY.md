# Target Pengguna & User Journey — Kuali

---

## Bagian A — Persona Utama: Bu Rani

Bu Rani mewakili segmen UMKM kuliner WhatsApp-first yang menjadi fokus Kuali.

### Profil

| Aspek | Detail |
|---|---|
| Usia | 30–45 tahun |
| Jenis usaha | Catering rumahan, nasi box, snack box pre-order |
| Kanal utama | WhatsApp, grup pelanggan, Instagram Story, repeat order |
| Volume order | 20–50 pesanan/hari saat ramai |
| Perangkat | Android mid-low, sering dipakai sambil memasak |
| Tim | Tidak punya admin khusus, dibantu suami/anak |
| Lokasi | Kota/kabupaten tingkat menengah, Indonesia |
| Usaha berjalan | 2–5 tahun, pelanggan tetap dari lingkungan dan komunitas |

### Rutinitas Harian

| Waktu | Aktivitas |
|---|---|
| Pagi | Terima pesanan dari banyak chat sekaligus, produksi, balas pesan |
| Siang | Produksi sambil balas chat, sering multitasking |
| Sore | Antar pesanan, tagih pembayaran yang belum masuk |
| Malam | Rekap manual, hitung kebutuhan bahan besok |

### Pain Points

| # | Masalah |
|---|---|
| 1 | Pesanan masuk dari banyak chat berbeda dan mudah tercecer |
| 2 | Sulit ingat siapa yang sudah bayar dan siapa yang belum |
| 3 | Hitung kebutuhan bahan pakai feeling atau catatan manual |
| 4 | Sering lupa tagih pelanggan yang bayar nanti |
| 5 | Saat ramai, tidak sempat balas konfirmasi pesanan satu per satu |
| 6 | Tidak ada rekap harian yang otomatis |
| 7 | Tidak ada gambaran berapa omzet hari ini sebelum selesai |

### Jobs To Be Done

| Jenis | JTBD |
|---|---|
| Functional | Bu Rani tidak butuh POS lengkap, tapi butuh order WhatsApp tidak tercecer |
| Emotional | Bu Rani tidak butuh dashboard canggih, tapi butuh rasa tenang bahwa semua order sudah tercatat |
| Financial | Bu Rani tidak butuh laporan akuntansi, tapi butuh tahu siapa yang belum bayar hari ini |
| Operasional | Bu Rani tidak butuh forecasting kompleks, tapi butuh daftar bahan dari order aktual |
| Layanan | Bu Rani tidak butuh chatbot panjang, tapi butuh balasan konfirmasi yang cepat dan konsisten |
| Kontrol | Bu Rani tidak butuh AI yang ambil keputusan, tapi butuh AI yang bantu buat draft lalu tetap bisa dicek sendiri |

### Ketakutan

- Salah order → pelanggan kecewa → reputasi turun
- Bahan kurang di saat ramai → produksi terganggu
- Bahan berlebih → rugi karena tidak terpakai
- Lupa tagih pembayaran → kas berantakan
- Kehilangan pelanggan setia karena pelayanan lambat

### Yang Dibutuhkan dari Kuali

1. Order rapi — semua chat pesanan masuk ke satu tempat
2. Status pembayaran jelas — siapa yang sudah dan belum bayar
3. Reminder pembayaran — bisa kirim pengingat tanpa harus ingat sendiri
4. Daftar bahan produksi — dari order aktual, bukan perkiraan
5. Rekap harian — ringkasan yang mudah dibaca di akhir hari
6. Tetap pegang kendali — AI hanya bantu draft, keputusan tetap di Bu Rani

---

## Bagian B — Segmen Target

Kuali dirancang untuk UMKM kuliner yang memenuhi karakteristik berikut:

- Sudah aktif menerima pesanan lewat WhatsApp
- Volume antara 10–100 order per hari
- Tidak memiliki sistem POS atau admin khusus
- Menerima pesanan secara pre-order, bukan walk-in kasir
- Menggunakan smartphone Android sebagai alat utama operasional

**Jenis usaha yang relevan:** catering rumahan, nasi kotak, snack box, bakery rumahan, dessert box, frozen food, kopi literan, pre-order makanan rumahan.

**Yang bukan target utama MVP:** restoran dengan sistem kasir, warung walk-in, bisnis kuliner dengan tim operasional lengkap.

---

## Bagian C — User Journey

Flow demo 3–5 menit. Titik "Aha Moment" pada langkah 7.

| # | Aktor | Langkah | Touchpoint | Output | Emosi Bu Rani |
|---|---|---|---|---|---|
| 1 | Customer | Kirim pesan pesanan lewat WhatsApp | WhatsApp chat | Chat masuk ke Bu Rani | — |
| 2 | Sistem (Kuali) | Chat masuk ke Mock WhatsApp UI Kuali | Mock WhatsApp UI | Chat terbaca sistem | Deg-degan, banyak order masuk |
| 3 | Sistem (AI) | AI membaca chat dan membuat draft order | AI Parser | Draft order JSON + confidence score | Penasaran |
| 4 | Sistem | Sistem menampilkan draft order ke Bu Rani | Order Draft Card | Draft + missing field (jika ada) | Mulai lega |
| 5 | Owner | Bu Rani cek draft, edit jika perlu, lalu approve | Owner Dashboard | Order status: Draft → Dikonfirmasi | Lega, terkontrol |
| 6 | Sistem | Sistem membuat QRIS dummy reminder pembayaran | QRIS Dummy Preview | Reminder siap dikirim ke customer | Senang, hemat waktu |
| 7 | Sistem | Order masuk dashboard, production planner update | Order Dashboard + Planner | Daftar bahan otomatis terhitung | **AHA MOMENT** |
| 8 | Sistem | Daily summary dibuat di akhir hari | Daily Summary | Rekap order, unpaid, bahan besok | Tenang, siap besok |
| 9 | Owner | Bu Rani lihat impact dashboard | Impact Dashboard | Metrik operasional hari ini | Percaya diri |

### Titik Kritis dalam Journey

| Titik | Risiko | Mitigasi |
|---|---|---|
| Chat ambiguous ("yang biasa ya") | AI salah parse → confidence rendah | Tampilkan missing fields, minta konfirmasi owner |
| Owner tidak approve draft | Order tidak masuk sistem | Draft tetap tersimpan, ada notif pending |
| Bahan tidak cukup | Produksi terganggu | Production planner menampilkan kebutuhan bahan; tandai jika kebutuhan melebihi stok tersedia |
| Customer belum bayar | Arus kas terganggu | QRIS dummy reminder bisa dikirim ulang |

### Skenario Demo Utama

> Bu Rani menerima chat dari Dinda: *"Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya."*
>
> Chat masuk ke Kuali → AI membuat draft order (confidence 95%) → Bu Rani cek dan approve → QRIS dummy reminder muncul → order masuk dashboard → production planner otomatis update kebutuhan bahan.

### Skenario Demo Edge Case

> Bu Tini mengirim: *"Kak ayam crispynya ada yang pedas gak? Mau yang pedas semua 2 packnya."*
>
> Chat masuk → AI parse dengan confidence 45% → sistem tampilkan badge "Perlu Cek" + 5 missing fields → Bu Rani diminta verifikasi manual sebelum approve.
