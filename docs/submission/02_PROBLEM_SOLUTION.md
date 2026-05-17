# Problem & Solution — Kuali

---

## Bagian A — Pernyataan Masalah

### Konteks

Indonesia memiliki jutaan pelaku usaha kuliner skala rumahan. Mereka tidak berjualan di mall, tidak punya kasir, dan tidak mendaftar ke marketplace besar. Mereka berjualan lewat WhatsApp — langsung ke pelanggan tetap, grup komunitas, dan jaringan dari mulut ke mulut yang sudah terbentuk bertahun-tahun.

Ini bukan keterbatasan. Ini adalah kekuatan.

UMKM kuliner seperti catering rumahan, nasi box pre-order, snack box, bakery rumahan, dessert box, frozen food, dan kopi literan sudah memiliki pelanggan, sudah punya omzet, dan sudah tahu cara berjualan. WhatsApp adalah kanal yang mereka pilih karena memang di sanalah pelanggan mereka berada.

**Tantangan yang mereka hadapi bukan soal bagaimana cara berjualan.**
**Tantangannya ada di proses operasional yang terjadi setelah chat masuk.**

### 5 Masalah Konkret

**Masalah 1 — Pesanan mudah tercecer**

Chat pesanan datang dari banyak kontak berbeda, masuk di antara pesan pribadi dan notifikasi lain. Tidak ada sistem yang memisahkan mana chat pesanan dan mana yang bukan. Satu pesanan yang terlewat bisa merusak kepercayaan pelanggan setia.

**Masalah 2 — Status pembayaran tidak terpantau**

Owner harus mengingat sendiri siapa yang sudah bayar dan siapa yang belum. Tidak ada notifikasi otomatis. Tidak ada daftar yang bisa dibuka kapan saja. Kalau lupa menagih, arus kas ikut terganggu.

**Masalah 3 — Kebutuhan bahan dihitung pakai perkiraan**

Tidak ada sistem yang menghitung secara otomatis berapa bahan yang harus disiapkan besok berdasarkan order yang sudah masuk. Semua dihitung dari ingatan atau catatan kasar — akurasinya tergantung kondisi dan waktu yang tersedia.

**Masalah 4 — Tidak ada rekap harian otomatis**

Di akhir hari, owner harus menyusun sendiri ringkasan operasional: berapa order yang masuk, siapa yang belum bayar, bahan apa yang perlu disiapkan besok. Proses ini menghabiskan waktu yang harusnya bisa dipakai untuk istirahat atau persiapan produksi esok hari.

**Masalah 5 — Semua beban ada di satu orang**

Tanpa admin khusus, semua tanggung jawab operasional jatuh ke pemilik usaha. Kesalahan kecil — salah baca pesanan, lupa tanggal kirim, kurang bahan — bisa berdampak langsung ke kepuasan pelanggan dan reputasi usaha.

### Framing yang Tepat

> UMKM kuliner ini sudah aktif berdigital. WhatsApp bukan keterbatasan — WhatsApp adalah infrastruktur jualan yang sudah berjalan. Kuali hadir bukan untuk mengajari cara berjualan, tapi untuk membantu merapikan proses operasional di balik chat yang sudah ada setiap hari.

---

## Bagian B — Solusi

### Positioning

**Kuali adalah asisten operasional WhatsApp-first untuk UMKM kuliner yang membantu mengubah chat pesanan menjadi draft order, reminder pembayaran, estimasi bahan, dan rekap produksi harian.**

Kuali bukan POS. Bukan marketplace. Bukan chatbot percakapan umum.
Kuali adalah sistem operasional yang bekerja di atas kebiasaan yang sudah ada — mengambil chat WhatsApp yang datang setiap hari dan mengubahnya menjadi data terstruktur yang bisa dikelola owner.

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

### Contoh Nyata: Demo Chat Utama

**Input chat dari pelanggan:**
> "Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya."

**Output AI parser (draft order):**

| Field | Nilai Terdeteksi |
|---|---|
| Nama pelanggan | Dinda |
| Menu | Risol Mayo × 12 |
| Tanggal kirim | Besok (2025-05-18) |
| Jam kirim | 15:00 |
| Status bayar | Belum bayar |
| Confidence score | 95% |
| Missing fields | — (tidak ada) |

**Yang terjadi setelah owner approve:**
- Order masuk dashboard dengan status Dikonfirmasi
- QRIS dummy reminder siap (nominal Rp 42.000)
- Production planner update: +0,6kg tepung, +1,2 butir telur, +0,24kg wortel, dll.

### 4 Prinsip Desain Solusi

**1. Owner tetap pegang kendali.**
Tidak ada satu pun order yang dikonfirmasi tanpa persetujuan eksplisit dari owner. AI hanya membantu draft.

**2. Tidak menambah beban belajar.**
Pelanggan tidak perlu install apapun. Owner hanya membuka satu dashboard tambahan — bukan belajar sistem baru.

**3. Output yang bisa langsung dipakai.**
Setiap fitur menghasilkan output konkret: draft yang bisa diapprove, reminder yang bisa dikirim, daftar bahan yang bisa dijadikan acuan belanja.

**4. Aman untuk demo — tidak overclaim.**
Semua kalkulasi dari order aktual × resep. AI tidak menebak, tidak mengarang harga, tidak mengklaim hasil yang tidak bisa diverifikasi.
