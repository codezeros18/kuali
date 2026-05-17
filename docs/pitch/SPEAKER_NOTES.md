# Speaker Notes — Kuali Pitch
### Gunadarma Code Week 2.0

> Dokumen ini adalah panduan berbicara untuk presenter. Baca sebelum rehearsal, hafalkan struktur, jangan baca saat presentasi.
> **Kalimat yang tertulis di sini adalah contoh — bukan skrip yang harus dibaca kata per kata.**

---

## Prinsip Presentasi

1. **Jangan baca slide** — slide adalah visual pendukung, bukan teleprompter
2. **Demo langsung lebih kuat dari slide penjelasan** — kalau app berjalan, buka app-nya
3. **Bicara ke audiens, bukan ke layar** — tatap juri saat menyampaikan poin kunci
4. **Jika ada silence, biarkan** — terutama setelah Production Planner. Beri audiens waktu baca angka.
5. **Jawab Q&A dengan jujur** — kalau belum ada, bilang "ini di roadmap" atau "kami belum punya data itu"

---

## Pembukaan (sebelum Slide 1) — Opsional

Jika ada waktu untuk hook pembuka sebelum slide 1:

> "Bayangkan Anda bangun jam 5 pagi, sudah ada 30 pesan WhatsApp masuk. Pesanan baru, konfirmasi pembayaran, pertanyaan stok — semua campur aduk. Dan Anda harus masak jam 7."

Pause. Lalu: "Itulah hari-hari Bu Rani. Kuali hadir untuk membantu merapikan satu bagian dari hari itu."

---

## Slide-by-Slide: Panduan Berbicara

---

### Slide 1 — Cover

**Timing:** 5–10 detik

**Yang dikatakan:**
> "Ini Kuali. Asisten operasional WhatsApp-first untuk UMKM kuliner."

Langsung lanjut ke slide 2. Jangan habiskan waktu di cover.

---

### Slide 2 — Problem

**Timing:** 25–35 detik

**Yang dikatakan:**
> "Bu Rani punya usaha catering rumahan. Setiap pagi, puluhan pesan WhatsApp masuk — pesanan baru, konfirmasi bayar, pertanyaan stok. Semua campur aduk di satu aplikasi. Tidak ada admin. Bu Rani mengerjakan semuanya sendiri, sambil memasak."

> "Masalahnya bukan Bu Rani belum pakai teknologi. Ia sudah aktif pakai WhatsApp setiap hari. Masalahnya ada di proses yang terjadi setelah chat masuk — dan proses itu masih manual."

**Poin yang harus disampaikan:**
- Order tercecer → satu yang terlewat bisa rusak kepercayaan pelanggan setia
- Pembayaran tidak terpantau → harus ingat sendiri
- Bahan produksi dihitung pakai feeling

**Tone:** Empati. Bukan "kasihan UMKM". Tapi "ini adalah tantangan operasional yang nyata dan bisa diselesaikan."

---

### Slide 3 — Persona

**Timing:** 15–20 detik

**Yang dikatakan:**
> "Target kami spesifik: UMKM kuliner yang berjualan lewat WhatsApp, volume 10–100 order per hari, tidak punya admin khusus, dan sudah aktif menggunakan WhatsApp sebagai kanal utama."

> "Mereka bukan orang yang perlu diajari pakai teknologi. Mereka butuh alat yang bekerja di atas kanal yang sudah mereka pakai."

---

### Slide 4 — Solusi Overview

**Timing:** 15–20 detik

**Yang dikatakan:**
> "Kuali bukan POS. Bukan marketplace. Bukan chatbot percakapan umum."

> "Kuali membaca chat pesanan, membuat draft order, lalu memberi owner ruang untuk approve atau edit sebelum apapun dikonfirmasi. Dari sana, production planner menghitung kebutuhan bahan. Di akhir hari, rekap tersedia tanpa rekap manual."

Lalu: "Mari kita lihat langsung."

---

### Slide 5 — Demo: AI Parser

**Timing:** 25–35 detik (atau lebih jika live demo)

**Yang dikatakan (sambil demo atau tunjuk screenshot):**
> "Chat masuk: 'Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya.'"

> "Kuali membaca chat ini dan membuat draft order. Nama pelanggan, menu, jumlah, tanggal kirim, status pembayaran — semuanya sudah terbaca. Confidence score 95% — artinya AI cukup yakin hasil parsing ini benar."

**Kalimat kunci yang harus disampaikan:**
> "AI hanya membuat draft. Owner yang approve."

---

### Slide 6 — Owner Approval & Confidence

**Timing:** 20–25 detik

**Yang dikatakan:**
> "Bu Rani cek draft-nya, kalau sudah benar, tekan Approve. Status berubah dari Draft menjadi Dikonfirmasi."

> "Tapi bagaimana kalau chat-nya tidak jelas? Misalnya: 'Kak ayam crispynya ada yang pedas gak?' — AI tidak mengarang. Confidence score turun ke 45%, sistem tandai sebagai Perlu Cek, dan minta Bu Rani konfirmasi manual."

**Tegaskan:**
> "Sistem tidak pernah mengarang menu yang tidak ada, tidak mengarang harga, dan tidak mengubah status pembayaran tanpa input owner."

---

### Slide 7 — Production Planner ⭐

**Timing:** 30–40 detik — ini adalah aha moment, beri ruang

**Yang dikatakan:**
> "Ini yang paling membantu Bu Rani."

*(Pause. Biarkan visual production planner muncul.)*

> "Dari 5 order yang sudah di-approve hari ini, Kuali otomatis menghitung: 1,7 kg tepung terigu, 6 butir telur, 520 gram wortel, dan seterusnya."

*(Pause lagi. Biarkan audiens baca.)*

> "Ini bukan perkiraan. Ini dihitung dari order aktual yang sudah di-approve, menggunakan resep yang Bu Rani sendiri masukkan. Sebelumnya, Bu Rani hitung ini dari ingatan. Sekarang, begitu order di-approve, daftarnya langsung ada."

---

### Slide 8 — Daily Summary & QRIS

**Timing:** 20–25 detik

**Yang dikatakan:**
> "Di akhir hari, Bu Rani bisa lihat semua informasi yang ia butuhkan di satu halaman: 11 order hari ini, 5 dikonfirmasi, 4 belum bayar total Rp 167.000, dan 3 order yang perlu dicek ulang."

> "Untuk yang belum bayar, Kuali siapkan reminder pembayaran dengan QRIS. Ini adalah QRIS dummy — Bu Rani tinggal salin dan kirim sendiri ke pelanggan. Bukan settlement otomatis."

---

### Slide 9 — Impact

**Timing:** 20–25 detik

**Yang dikatakan:**
> "Dari simulasi demo tadi: 13 dari 15 chat berhasil diparse menjadi draft order. 3 order terdeteksi perlu konfirmasi sebelum dikonfirmasi. 4 order belum bayar terdeteksi otomatis. 6 jenis bahan terhitung dari order aktual."

> "Semua angka ini bisa dilihat langsung di demo. Ini bukan proyeksi — ini adalah output aktual dari data dummy yang kami siapkan."

**Selalu tutup dengan:**
> "Kami tidak mengklaim profit naik sekian persen atau food waste turun sekian persen. Yang kami ukur adalah yang bisa diverifikasi langsung."

---

### Slide 10 — MVP vs Roadmap

**Timing:** 15–20 detik

**Yang dikatakan:**
> "Kami tahu persis batas MVP kami. Yang ada di kolom kiri bisa dilihat langsung di demo tadi. Yang di kolom kanan adalah rencana setelah hackathon — setelah ada validasi dari pengguna nyata."

> "Community sourcing dan rescue sale ada di roadmap, dirancang berbasis consent pengguna — bukan broadcast otomatis."

---

### Slide 11 — Tech Stack

**Timing:** 15–20 detik

**Yang dikatakan (versi non-teknis):**
> "Kuali berjalan di browser — tidak butuh install app. AI bekerja dalam mode simulasi, jadi demo tidak bergantung pada koneksi internet eksternal."

**Yang dikatakan (tambahan untuk juri teknis):**
> "Next.js App Router, Supabase PostgreSQL, Prisma ORM, OpenAI/Anthropic dengan mock-first fallback. Deploy ke Vercel. Stack ini dipilih untuk demo yang stabil dan pengembangan cepat."

---

### Slide 12 — Penutup

**Timing:** 15–20 detik

**Yang dikatakan:**
> "Kuali tidak mengubah cara UMKM kuliner berjualan. Kuali membantu merapikan alur yang sudah mereka pakai setiap hari — dari chat pelanggan menjadi order yang tercatat, pembayaran yang terpantau, dan produksi yang lebih siap."

*(Pause.)*

> "Terima kasih. Kami siap untuk pertanyaan."

---

## Antisipasi Q&A

### "Apakah ini WhatsApp nyata?"

> "Ini mock UI untuk demo. Kami tidak terhubung ke WhatsApp API di MVP karena proses approval Meta membutuhkan waktu 2–4 minggu. Real WhatsApp integration ada di roadmap kami."

### "QRIS-nya bisa langsung bayar?"

> "Ini QRIS dummy — reminder yang menyertakan QRIS milik merchant. Bu Rani kirim sendiri ke pelanggan. Payment settlement otomatis ada di roadmap, bukan fitur MVP."

### "Bagaimana dengan community sourcing / belanja bareng?"

> "Itu ada di roadmap kami. Kami rancang berbasis consent pengguna — tidak ada akses data pelanggan tanpa izin, tidak ada broadcast otomatis. Kami belum klaim itu sebagai fitur aktif."

### "Food waste bisa turun berapa persen?"

> "Kami tidak klaim angka itu. Yang kami ukur adalah bahan yang terhitung dari order aktual — 6 jenis bahan dari 5 order terkonfirmasi. Dampak aktual terhadap food waste memerlukan validasi dengan pengguna nyata."

### "Siapa kompetitornya?"

> "WhatsApp Business sudah punya fitur pesan, tapi tidak bisa parse chat jadi order. POS seperti Moka bagus untuk kasir walk-in, tapi tidak cocok untuk pre-order chat-based tanpa admin. Spreadsheet bisa, tapi melelahkan. Kuali mengisi celah spesifik: UMKM kuliner pre-order, 10–100 order per hari, tanpa admin, WhatsApp-first."

### "Apakah sudah ada pengguna nyata?"

> "MVP ini adalah prototype untuk hackathon. Kami menggunakan data dummy yang dirancang sesuai skenario nyata. Validasi dengan pengguna nyata adalah langkah berikutnya setelah hackathon."

### "Model bisnisnya bagaimana?"

> "Fase MVP berjalan gratis untuk validasi nilai produk. Setelah terbukti berguna, kami akan mengeksplorasi freemium atau langganan bulanan. Tapi validasi willingness-to-pay dengan pengguna nyata harus dilakukan dulu sebelum monetisasi."

### "Kenapa tidak pakai native app?"

> "PWA di browser sudah cukup untuk segmen ini. Android mid-low yang dipakai Bu Rani tidak butuh native app khusus untuk fitur yang kami bangun di MVP. Native app ada di roadmap jangka panjang."

---

## Kalimat yang Boleh Dipakai

- "Dalam simulasi demo ini, kami melihat bahwa..."
- "AI membuat draft. Owner yang memutuskan."
- "Bukan perkiraan. Dari order aktual yang sudah di-approve."
- "Fitur ini ada di roadmap kami — berbasis consent pengguna."
- "Kami tidak klaim angka yang tidak bisa kami verifikasi langsung."

## Kalimat yang Harus Dihindari

- "UMKM ini belum digital / gaptek / tertinggal"
- "AI kami akurat 100%"
- "AI langsung konfirmasi order tanpa owner"
- "QRIS settlement otomatis"
- "Food waste turun X%"
- "Profit Bu Rani naik X%"
- "Kami akan bantu jutaan UMKM"
- "Fitur belanja bareng sudah ada di sistem"
- "Semua stok sisa pasti laku"

---

## Timing Summary

| Bagian | Durasi | Kumulatif |
|---|---|---|
| Cover | 10 detik | 0:10 |
| Problem + Persona | 55 detik | 1:05 |
| Solusi Overview | 20 detik | 1:25 |
| Demo (5 slides) | 1:45 | 3:10 |
| Impact + MVP vs Roadmap | 35 detik | 3:45 |
| Tech + Penutup | 35 detik | 4:20 |
| Buffer transisi | 40 detik | 5:00 |

---

## Fallback Plan jika Demo Gagal

**Urutan prioritas fallback:**

1. **Mock mode aktif** (`USE_MOCK_AI=true`) — coba jalankan app tetap
2. **Screenshot dalam slide** — sudah disiapkan sebagai gambar di slide 5–8
3. **Video rekaman demo** — rekam sebelum presentasi, siapkan offline
4. **Verbal + slide** — jelaskan flow secara verbal sambil tunjuk wireframe/mockup

**Kalimat jika terpaksa switch:**
> "Untuk memastikan kelancaran demo, kami akan tunjukkan rekaman yang telah kami siapkan."

Jangan panik. Juri memahami risiko live demo. Yang dinilai adalah ide dan kemampuan menjelaskan — bukan apakah app tidak pernah error.

---

## Rehearsal Checklist

- [ ] Baca PITCH_DECK_DRAFT.md satu kali penuh
- [ ] Rehearsal tanpa slide (verbal only) — apakah alurnya masuk akal?
- [ ] Rehearsal dengan slide — apakah timing sesuai?
- [ ] Rehearsal dengan live demo — apakah bisa smooth?
- [ ] Rehearsal Q&A — jawab semua pertanyaan di atas
- [ ] Test demo 2 kali berturut-turut tanpa error (target Phase 2)

---

*Speaker notes ini dibuat untuk persiapan pitch Gunadarma Code Week 2.0. Gunakan sebagai panduan rehearsal, bukan skrip presentasi.*
