# Persona Pengguna — Bu Rani

> Dokumen ini adalah bagian dari Phase 0 Baseline Proposal Kuali.

---

## Persona Utama: Bu Rani

| Aspek | Detail |
|---|---|
| Nama | Bu Rani |
| Usia | 30–45 tahun |
| Lokasi | Kota/kabupaten tingkat menengah, Indonesia |
| Usaha | Catering rumahan dan nasi box pre-order |
| Kanal Jualan | WhatsApp, grup pelanggan, Instagram Story, repeat order |
| Volume Order | 20–50 pesanan/hari saat ramai |
| Perangkat | Android mid-low, sering dipakai sambil masak |
| Tim | Tidak punya admin khusus, dibantu suami/anak |

---

## Profil Usaha

Bu Rani menjalankan usaha makanan rumahan yang sudah berjalan 2–5 tahun. Pelanggannya sebagian besar adalah pelanggan tetap dari lingkungan sekitar, kantor, dan grup komunitas. Bu Rani tidak berjualan di marketplace besar karena merasa repot dengan sistem dan komisi. WhatsApp sudah cukup untuk usahanya saat ini.

---

## Kondisi Sehari-hari

- Pagi: terima pesanan dari banyak chat sekaligus
- Siang: produksi sambil balas chat, sering multitasking
- Sore: antar pesanan, tagih pembayaran yang belum masuk
- Malam: rekap manual, hitung kebutuhan besok

---

## Pain Points

| # | Masalah |
|---|---|
| 1 | Pesanan masuk dari banyak chat berbeda dan sering tercecer |
| 2 | Sulit ingat siapa yang sudah bayar dan siapa yang belum |
| 3 | Hitung kebutuhan bahan pakai feeling atau catatan manual |
| 4 | Sering lupa tagih pelanggan yang bayar nanti |
| 5 | Kalau ramai, tidak sempat balas konfirmasi pesanan satu per satu |
| 6 | Tidak ada rekap harian yang otomatis |
| 7 | Tidak ada gambaran berapa omzet hari ini sebelum selesai |

---

## Jobs To Be Done

| Jenis | Kalimat JTBD |
|---|---|
| Functional | Bu Rani tidak butuh POS lengkap, tapi butuh order WhatsApp tidak tercecer |
| Emotional | Bu Rani tidak butuh dashboard canggih, tapi butuh rasa tenang bahwa semua order sudah tercatat |
| Financial | Bu Rani tidak butuh laporan akuntansi, tapi butuh tahu siapa yang belum bayar hari ini |
| Operasional | Bu Rani tidak butuh forecasting kompleks, tapi butuh daftar bahan yang harus disiapkan dari order aktual |
| Layanan | Bu Rani tidak butuh chatbot panjang, tapi butuh balasan konfirmasi yang cepat dan konsisten |
| Kontrol | Bu Rani tidak butuh AI yang ambil keputusan, tapi butuh AI yang bantu buat draft lalu tetap bisa dicek sendiri |

---

## Kebiasaan Digital

- WhatsApp adalah aplikasi utama untuk komunikasi bisnis
- Jarang pakai spreadsheet atau aplikasi khusus
- Tidak nyaman dengan aplikasi yang membutuhkan banyak setup
- Lebih suka tools yang langsung bisa dipakai, tidak perlu training panjang
- Sering buka HP sambil memasak atau mengurus pesanan

---

## Ketakutan

- Salah order → pelanggan kecewa → reputasi turun
- Bahan kurang di saat ramai → produksi terganggu
- Bahan berlebih → rugi karena tidak terpakai
- Lupa tagih pembayaran → kas berantakan
- Kehilangan pelanggan setia karena pelayanan lambat

---

## Yang Dibutuhkan dari Kuali

1. **Order rapi** — semua chat pesanan masuk ke satu tempat, tidak tercecer
2. **Status pembayaran jelas** — siapa yang sudah dan belum bayar
3. **Reminder pembayaran** — bisa kirim pengingat tanpa harus ingat sendiri
4. **Daftar bahan produksi** — dari order aktual, bukan perkiraan
5. **Rekap harian** — ringkasan yang mudah dibaca di akhir hari
6. **Tetap pegang kendali** — AI hanya bantu draft, keputusan tetap di Bu Rani

---

## Skenario Demo Utama

> Bu Rani menerima chat dari Dinda: "Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya."
>
> Chat masuk ke Kuali → AI membuat draft order → Bu Rani cek dan approve → QRIS dummy reminder muncul → order masuk dashboard → production planner otomatis update kebutuhan bahan.

---

## Catatan Framing Aman

- Jangan sebut Bu Rani sebagai "gaptek" atau "belum digital"
- Bu Rani sudah aktif pakai WhatsApp — tantangannya adalah proses operasional di belakang chat
- Kuali membantu, bukan menggantikan cara Bu Rani bekerja
