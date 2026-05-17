# Pengukuran Dampak — Kuali

> Kuali menggunakan metrik yang bisa diverifikasi langsung dari data demo — bukan proyeksi, bukan klaim pasar, dan bukan estimasi yang tidak bisa diukur secara aktual.

---

## Prinsip Pelaporan Metrik

**Yang dilakukan:**
- Laporkan angka dari data demo aktual
- Selalu sebut "dalam simulasi ini" atau "dari data demo"
- Bedakan metrik operasional (terukur) dari metrik bisnis (tidak bisa dijamin)

**Yang tidak dilakukan:**
- Klaim profit Bu Rani naik sekian persen
- Klaim food waste turun sekian persen
- Klaim semua UMKM pasti terbantu
- Klaim semua stok sisa pasti habis terjual
- Klaim harga bahan baku lebih murah
- Proyeksi pendapatan sebagai target yang dijamin

---

## Metrik Operasional MVP (Terukur dari Demo)

| Metrik | Cara Mengukur | Nilai Demo |
|---|---|---|
| Chat berhasil diparse menjadi draft order | Dari 15 chat dummy, hitung yang menghasilkan JSON valid | **13 dari 15** (86,7%) |
| Order terdeteksi perlu cek | confidence score < 0.7 → badge otomatis | **3 order** |
| Order dikonfirmasi hari ini | Status confirmed di database | **5 order** |
| Order belum bayar | paymentStatus: unpaid, status: confirmed | **4 order** |
| Total unpaid dikonfirmasi | Sum totalAmount dari unpaid confirmed orders | **Rp 167.000** |
| Reminder pembayaran siap | qrisDummyShown: true | **4 reminder** |
| Bahan terhitung dari order aktual | Production planner: Σ (qty × resep) | **6 jenis bahan** |
| Daily summary dibuat otomatis | Sistem menghasilkan ringkasan | **1 summary** tanpa rekap manual |

---

## Hasil Simulasi Demo — Skenario Katering Bu Rani (2025-05-17)

### Order Summary

Dari 15 chat yang masuk hari ini:
- **13 chat** berhasil diparse menjadi draft order — 2 chat tidak diparse karena merupakan inquiry (bukan order) atau referensi ke pesanan lama yang perlu cek history
- **3 draft** teridentifikasi confidence rendah dan ditandai "Perlu Cek" sebelum owner approve
- **11 order** terbuat — 5 dikonfirmasi, 6 masih draft

### Payment Summary

Dari 5 order yang dikonfirmasi:
- **1 order** sudah lunas (Rp 500.000 — Kak Rina, nasi kotak 20 pcs)
- **4 order** belum bayar — total Rp 167.000 — reminder QRIS siap dikirim

### Production Planning

Dari order yang dikonfirmasi untuk produksi 2025-05-18:

| Bahan | Kebutuhan | Dasar Kalkulasi |
|---|---|---|
| Tepung Terigu | 1,70 kg | Risol 26pcs × 0,05kg + Lumpia 10pcs × 0,04kg + Tahu 8pcs × 0,03kg |
| Telur | 6 butir | Risol 26pcs × 0,1 + Lumpia 10pcs × 0,2 + Tahu 8pcs × 0,1 |
| Wortel | 520 g | Risol 26pcs × 0,02kg = 520g |
| Mayones | 260 g | Risol 26pcs × 0,01kg = 260g |
| Minyak Goreng | 720 ml | Risol 26pcs × 0,02L + Tahu 8pcs × 0,025L |
| Gula Aren | 200 g | Kopi Gula Aren 2L × 0,1kg |

*Semua angka dihitung dari formula: qty order aktual × qty bahan per serving dari data resep.*

---

## Perbandingan Waktu Rekap (Simulasi)

> **Catatan penting:** Angka berikut adalah simulasi ilustratif, bukan hasil studi waktu yang tervalidasi. Tidak diklaim sebagai penghematan yang pasti.

| Aktivitas | Estimasi Manual | Dengan Kuali | Catatan |
|---|---|---|---|
| Rekap 15 chat menjadi daftar order | ~30–40 menit | ~5 menit (review + approve) | Tergantung kecepatan baca dan jumlah chat |
| Hitung kebutuhan bahan untuk besok | ~15–20 menit | ~1 menit (lihat planner) | Tergantung jumlah menu dan order |
| Rekap harian (order, payment, bahan) | ~20–30 menit | Otomatis tersedia | Tidak perlu rekap manual |

**Framing aman:** "Dalam simulasi ini, proses rekap order dan kalkulasi bahan dapat diselesaikan lebih cepat dibandingkan cara manual. Penghematan waktu aktual tergantung volume order dan kebiasaan masing-masing owner."

---

## Metrik yang Aman Dipakai di Pitch

*(Diekstrak dari `data/dummy-impact-metrics.json` → `metricsSafeToUseInPitch`)*

- "13 dari 15 chat berhasil diparse menjadi draft order dalam demo ini"
- "3 pesanan terdeteksi perlu konfirmasi ulang sebelum dikonfirmasi"
- "4 pesanan belum bayar terdeteksi otomatis — reminder QRIS siap dikirim"
- "6 jenis bahan terhitung otomatis dari order aktual yang sudah dikonfirmasi"
- "1 daily summary dibuat tanpa rekap manual dari Bu Rani"
- "AI hanya membuat draft — tidak ada order terkonfirmasi tanpa persetujuan owner"

---

## Metrik yang Tidak Boleh Diklaim di Pitch

*(Diekstrak dari `data/dummy-impact-metrics.json` → `metricsForbiddenInPitch`)*

- "Food waste Bu Rani turun X%" — tidak ada data aktual
- "Omzet Bu Rani naik X%" — tidak ada baseline nyata
- "Semua stok sisa pasti habis" — tidak ada mekanisme penjualan sisa di MVP
- "Kuali menghemat X jam per hari" — angka waktu belum divalidasi dengan user nyata
- "Semua UMKM pasti terbantu" — terlalu general
- "Harga bahan lebih murah dengan Kuali" — tidak ada supplier integration di MVP
