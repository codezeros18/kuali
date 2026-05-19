# Perbandingan Kompetitor — Kuali

> Dokumen ini adalah bagian dari Phase 0 Baseline Proposal Kuali.
> Framing: bukan untuk menyerang kompetitor, tapi menjelaskan diferensiasi Kuali.

---

## Pendekatan Perbandingan

Kuali tidak mencoba menggantikan semua tools yang sudah ada. Kuali mengisi celah spesifik yang tidak dilayani dengan baik oleh tools yang ada: **operasional order WhatsApp untuk UMKM kuliner pre-order yang tidak punya admin.**

---

## Tabel Perbandingan

| Aspek | WhatsApp Business | POS (Kasir, Moka, dll) | ChatGPT / AI Umum | Spreadsheet Manual | **Kuali** |
|---|---|---|---|---|---|
| **Masalah utama yang diselesaikan** | Komunikasi dengan pelanggan | Transaksi kasir & inventory | Pertanyaan umum | Rekap manual | Order dari chat → produksi |
| **Entry point** | Chat WhatsApp | Transaksi di kasir | Prompt manual | Input manual | Chat WhatsApp masuk langsung |
| **Parsing chat jadi order** | ✗ Tidak ada | ✗ Tidak ada | ⚠️ Perlu copy-paste manual | ✗ Tidak ada | ✓ Otomatis dengan AI |
| **Owner approval / kontrol** | ✗ Tidak ada flow | ⚠️ Kasir input manual | ✗ Tidak ada | ✓ Manual total | ✓ Draft → approve → confirmed |
| **Production planner dari order** | ✗ Tidak ada | ⚠️ Hanya jika terintegrasi inventory | ✗ Tidak ada | ✗ Tidak ada | ✓ Otomatis dari order aktual |
| **Reminder pembayaran** | ⚠️ Manual, butuh diingat sendiri | ⚠️ Butuh modul tambahan | ✗ Tidak ada | ✗ Tidak ada | ✓ QRIS dummy, satu klik |
| **Daily summary otomatis** | ✗ Tidak ada | ⚠️ Laporan ada, tapi bukan UMKM-first | ✗ Tidak ada | ✗ Manual rekap | ✓ Otomatis, bahasa sederhana |
| **Target pengguna** | Semua bisnis | Bisnis kasir / ritel | Umum | Siapa saja | UMKM kuliner pre-order |
| **Mobile-first** | ✓ | ⚠️ Tergantung app | ✓ | ✗ | ✓ |
| **Setup awal** | Mudah | ⚠️ Butuh pelatihan | Mudah | Mudah | Mudah |
| **Biaya** | Gratis (basic) | Berbayar (langganan) | Berbayar | Gratis | TBD (MVP gratis/demo) |
| **Cocok untuk UMKM pre-order** | ⚠️ Sebagian | ⚠️ Tidak didesain untuk ini | ⚠️ Perlu effort besar | ✓ Tapi melelahkan | ✓ |

---

## Penjelasan Per Kompetitor

### WhatsApp Business

WhatsApp Business adalah tools komunikasi, bukan tools operasional. Bu Rani sudah menggunakan WhatsApp Business. Masalahnya bukan di komunikasi — masalahnya ada di proses setelah chat masuk: rekap order, cek pembayaran, hitung bahan.

**Diferensiasi Kuali:** Kuali bukan pengganti WhatsApp. Kuali bekerja di atas WhatsApp — mengubah chat yang sudah ada menjadi data terstruktur.

---

### POS (Kasir, Moka, GoBiz, dll)

POS dirancang untuk transaksi kasir: pelanggan datang, bayar, selesai. POS tidak didesain untuk pre-order chat-based. Fiturnya terlalu kompleks dan tidak relevan untuk Bu Rani yang tidak punya kasir.

**Diferensiasi Kuali:** Kuali bukan POS. Kuali dimulai dari pre-order chat, bukan transaksi kasir. Tidak ada fitur meja, printer struk, atau multi-cabang di MVP.

---

### ChatGPT / AI Umum

ChatGPT bisa membantu parsing chat jika di-copy-paste manual. Tapi tidak ada workflow, tidak ada dashboard, tidak ada integrasi dengan menu/resep, dan tidak ada reminder pembayaran. Butuh effort besar dari user untuk mendapat manfaat.

**Diferensiasi Kuali:** Kuali adalah AI yang sudah dikonfigurasi khusus untuk operasional UMKM kuliner. Output terstruktur, divalidasi terhadap menu aktual, dan terhubung dengan dashboard dan planner.

---

### Spreadsheet / Catatan Manual

Banyak UMKM sudah pakai spreadsheet atau buku tulis. Ini sudah lebih baik dari tidak ada pencatatan, tapi butuh input manual yang melelahkan dan mudah salah saat ramai.

**Diferensiasi Kuali:** Kuali mengotomasi proses input dari chat — bukan menggantikan spreadsheet sepenuhnya, tapi mengurangi kerja input manual.

---

## Positioning Statement

> **Kuali bukan POS, bukan marketplace, dan bukan chatbot biasa. Kuali adalah asisten operasional WhatsApp-first untuk UMKM kuliner pre-order yang membantu merapikan pesanan, pembayaran, dan kebutuhan bahan harian.**

---

## Celah Pasar yang Diisi Kuali

UMKM kuliner pre-order yang:
- Sudah aktif pakai WhatsApp (tidak perlu adopsi baru)
- Volume 10–100 order/hari (terlalu kecil untuk POS enterprise, terlalu besar untuk manual)
- Tidak punya admin khusus
- Butuh tools ringan yang bisa dipakai sendiri

---

## Catatan Framing Aman

- Jangan sebut kompetitor "buruk" atau "gagal melayani UMKM"
- Framing: setiap tools ada peruntukannya — Kuali mengisi celah yang belum dilayani
- Jangan klaim Kuali lebih murah atau lebih canggih secara absolut tanpa data
