# Pitch Deck Draft — Kuali
### Gunadarma Code Week 2.0

> **Event:** Gunadarma Code Week 2.0
> **Subtema:** Food & Culinary Business Tech
> **Durasi target:** 3 menit demo + 2 menit Q&A (total 5 menit)
> **Total slide:** 12
> **Semua angka demo diambil dari data dummy Katering Bu Rani (2025-05-17)**

---

## SLIDE 1 — Cover

**Judul:** Kuali

**Pesan Utama:**
Nama produk, tagline, dan kategori — kesan pertama harus clean dan percaya diri.

**Konten:**
- **Tagline besar:** Order rapi, produksi siap.
- **Subtitle:** Asisten operasional WhatsApp-first untuk UMKM kuliner
- **Kategori:** Food & Culinary Business Tech
- Nama tim + nama event

**Suggested Visual:**
- Logo Kuali (warna utama: hangat, earthy — coklat/oranye/krem)
- Background ilustrasi minimal: meja dapur, wajan, WhatsApp chat bubble
- Bukan foto stok. Bukan terlalu ramai.

**Speaker Notes:**
> Mulai dengan tenang. Tidak perlu buka dengan "Halo nama saya..." panjang. Langsung: "Ini Kuali." Biarkan slide berbicara 3 detik, baru mulai bicara.

**Jangan dikatakan:**
- Jangan sebut fitur apapun di sini
- Jangan mulai dengan "Kami adalah startup yang..."
- Jangan buka dengan statistik market yang belum divalidasi

---

## SLIDE 2 — Problem: Situasi Nyata

**Judul:** Order sudah ramai. Tapi setelah chat masuk, semuanya manual.

**Pesan Utama:**
Masalah bukan soal kemampuan digital — masalah ada di proses operasional setelah chat masuk.

**Konten:**

> "Bu Rani punya usaha catering rumahan. Setiap pagi, puluhan pesan WhatsApp masuk dari pelanggan. Ada yang pesan baru, ada yang konfirmasi bayar, ada yang tanya stok. Semua campur aduk. Tidak ada admin. Bu Rani mengerjakan semuanya sendiri — sambil memasak."

**3 masalah konkret (masing-masing satu ikon):**
1. 📋 **Order tercecer** — chat pesanan bercampur pesan pribadi, satu yang terlewat bisa rusak kepercayaan
2. 💸 **Pembayaran tidak terpantau** — harus ingat sendiri siapa yang sudah dan belum bayar
3. 🥕 **Bahan dihitung pakai perkiraan** — tidak ada yang hitung otomatis kebutuhan produksi esok hari

**Suggested Visual:**
- Simulasi screenshot WhatsApp yang ramai dan campur aduk (gunakan dummy chat, bukan WA nyata)
- Tiga ikon sederhana di bawah narasi
- Warna: netral/abu — ini bagian problem, belum solusi

**Speaker Notes:**
> Jangan buru-buru. Beri audiens waktu relate dengan Bu Rani. Framing yang benar: "Ini bukan soal mereka belum digital. Mereka sudah aktif pakai WhatsApp. Tantangannya ada di proses di balik chat itu."

**Jangan dikatakan:**
- "UMKM ini belum digital" — framing yang salah dan merendahkan
- "UMKM ini gaptek" — tidak boleh sama sekali
- "Pemerintah belum bantu UMKM" — bukan narasi produk
- Angka market size yang tidak tervalidasi ("UMKM Indonesia ada 64 juta...")

---

## SLIDE 3 — Persona: Kenalkan Bu Rani

**Judul:** Bu Rani sudah punya bisnis yang berjalan. Ia hanya butuh alur yang lebih rapi.

**Pesan Utama:**
Target user bukan orang awam teknologi — ia sudah pakai WhatsApp setiap hari. Kuali hadir untuk memperkuat apa yang sudah ada.

**Konten:**

| | |
|---|---|
| **Usaha** | Catering rumahan, nasi box, snack box pre-order |
| **Kanal** | WhatsApp, Instagram Story, repeat order |
| **Volume** | 20–50 pesanan/hari saat ramai |
| **Perangkat** | Android mid-low, dipakai sambil produksi |
| **Tim** | Tidak ada admin khusus |

**JTBD (Jobs To Be Done) — 1 kalimat:**
> "Bu Rani tidak butuh POS lengkap. Ia butuh pesanan WhatsApp-nya tidak tercecer."

**Ketakutan nyata:**
- Salah order → pelanggan kecewa
- Lupa tagih → arus kas terganggu
- Bahan kurang → produksi terhenti

**Suggested Visual:**
- Ilustrasi avatar Bu Rani (bukan foto orang nyata)
- Kartu profil / persona card yang clean
- Ikon WhatsApp di latar belakang

**Speaker Notes:**
> Slide ini membangun empati. Audiens harus bisa membayangkan Bu Rani nyata. Jangan baca tabel — ceritakan. "Bu Rani tidak punya admin. Ia mengerjakan semuanya sendiri, sering sambil memasak."

**Jangan dikatakan:**
- "Kami mentarget semua UMKM Indonesia" — terlalu luas
- "Bu Rani tidak bisa pakai teknologi" — tidak benar dan merendahkan

---

## SLIDE 4 — Solusi: Gambaran Umum

**Judul:** Kuali mengubah chat pesanan menjadi order, pembayaran, dan rencana produksi yang rapi.

**Pesan Utama:**
Kuali bukan POS, bukan marketplace, bukan chatbot biasa. Kuali adalah asisten operasional di belakang WhatsApp.

**Flow (visual utama slide ini):**

```
Chat Pelanggan
     ↓
AI Membaca & Membuat Draft Order
(bukan memutuskan — hanya draft)
     ↓
Owner Cek, Edit, Approve
(keputusan tetap di tangan owner)
     ↓
Order Masuk Dashboard
Reminder QRIS Siap Dikirim
     ↓
Production Planner
Hitung Bahan Otomatis
     ↓
Daily Summary
Rekap Tanpa Rekap Manual
```

**3 prinsip (singkat):**
1. Owner tetap pegang kendali — tidak ada order terkonfirmasi tanpa approval
2. Bekerja di atas WhatsApp yang sudah dipakai
3. Output yang langsung bisa dipakai: draft, reminder, daftar bahan, rekap

**Suggested Visual:**
- Flow diagram vertikal atau horizontal dengan ikon per tahap
- Warna hijau mulai masuk (ini bagian solusi)
- Jangan penuh teks — flow visual lebih kuat

**Speaker Notes:**
> Slide ini adalah jembatan dari problem ke demo. Bacakan flow sekali, lalu langsung bilang: "Mari kita lihat langsung."

**Jangan dikatakan:**
- "Kuali adalah super app untuk UMKM" — bukan positioning yang benar
- "AI akan menggantikan admin" — salah framing
- "Kuali bisa settlement QRIS" — bukan MVP

---

## SLIDE 5 — Demo: AI Parser (Mock WhatsApp → Draft Order)

**Judul:** Dari chat menjadi draft order dalam detik.

**Pesan Utama:**
AI membaca bahasa natural chat pelanggan dan mengubahnya menjadi data terstruktur yang bisa dicek owner.

**Konten:**

**Chat masuk (contoh nyata dari demo):**
> "Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya."

**Output AI — Draft Order:**
| Field | Hasil Parsing |
|---|---|
| Pelanggan | Dinda |
| Menu | Risol Mayo × 12 |
| Tanggal | Besok, 15:00 |
| Status Bayar | Belum bayar |
| Confidence | 95% ✅ |
| Missing Fields | — (tidak ada) |

**Badge confidence:**
- 🟢 Tinggi (≥ 0.85) — siap approve
- 🟡 Sedang (0.7–0.84) — cek dulu
- 🔴 Perlu Cek (< 0.7) — minta konfirmasi owner

**Suggested Visual:**
- Screenshot Mock WhatsApp UI di kiri
- Draft order card di kanan dengan badge confidence hijau
- Split-screen atau before/after

**Speaker Notes:**
> Demo langsung lebih kuat dari slide. Idealnya slide ini muncul singkat, lalu langsung switch ke live app. Jika fallback: tunjukkan screenshot.
> Kalimat kunci: "AI hanya membuat draft. Owner yang memutuskan."

**Jangan dikatakan:**
- "AI kita 100% akurat" — tidak boleh diklaim
- "AI langsung konfirmasi order" — salah, selalu ada owner approval

---

## SLIDE 6 — Demo: Owner Approval & Confidence Score

**Judul:** Owner tetap pegang kendali penuh.

**Pesan Utama:**
Tidak ada order yang terkonfirmasi tanpa persetujuan eksplisit owner. AI hanya menyiapkan draft.

**Konten:**

**Skenario happy path:**
1. Draft muncul → confidence 95% → tidak ada missing fields
2. Owner tekan **Approve** → status berubah: Draft → Dikonfirmasi
3. Notifikasi: "Order Dinda berhasil dikonfirmasi"

**Skenario confidence rendah (chat ambigu):**
> "Kak ayam crispynya ada yang pedas gak? Mau yang pedas semua 2 packnya."
- Confidence: 45% 🔴
- Missing fields: varian menu, tanggal tidak disebutkan
- Sistem minta owner konfirmasi manual sebelum approve

**Kalimat kunci:**
> "Kalau AI tidak yakin, sistem bilang terus terang — dan meminta owner untuk konfirmasi. Sistem tidak mengarang."

**Suggested Visual:**
- Dua kartu berdampingan: satu confidence tinggi (hijau), satu confidence rendah (merah/oranye)
- Tombol Approve yang besar dan jelas di mobile view

**Speaker Notes:**
> Ini adalah slide kepercayaan. Juri skeptis soal AI yang "asal-asalan" perlu melihat bahwa Kuali punya guardrail yang ketat. Tegaskan: AI tidak pernah mengarang menu, harga, atau status bayar.

**Jangan dikatakan:**
- "AI kita tidak pernah salah" — terlalu klaim
- "AI otomatis approve kalau confidence tinggi" — salah, tetap butuh owner

---

## SLIDE 7 — Demo: Production Planner ⭐ AHA MOMENT

**Judul:** Tahu bahan apa yang harus disiapkan — dari order aktual, bukan perkiraan.

**Pesan Utama:**
Production Planner adalah fitur yang paling langsung berdampak pada workflow Bu Rani. Ini adalah sesuatu yang belum pernah ada sebelumnya untuk segmen ini.

**Konten:**

**Logika kalkulasi:**
> Kebutuhan bahan = Σ (qty order yang dikonfirmasi × qty bahan per serving dari resep)

**Contoh output (dari 5 order dikonfirmasi hari ini):**

| Bahan | Kebutuhan | Dasar Kalkulasi |
|---|---|---|
| Tepung Terigu | 1,70 kg | Risol 26pcs × 50g + Lumpia 10pcs × 40g + Tahu 8pcs × 30g |
| Telur | 6 butir | Kombinasi dari 3 menu |
| Wortel | 520 g | Risol 26pcs × 20g |
| Mayones | 260 g | Risol 26pcs × 10g |
| Minyak Goreng | 720 ml | Risol + Tahu |
| Gula Aren | 200 g | Kopi Gula Aren 2L |

**Kalimat kunci:**
> "Bukan perkiraan. Dari order aktual yang sudah di-approve. Dihitung dari resep yang dimasukkan Bu Rani sendiri."

**Suggested Visual:**
- Screenshot Production Planner mobile-first
- Daftar bahan dengan angka jelas
- Highlight "5 order dikonfirmasi → 6 jenis bahan terhitung"
- Ini adalah aha moment — beri visual yang impactful

**Speaker Notes:**
> Pause sebentar setelah menampilkan ini. Biarkan audiens baca angkanya. Lalu: "Sebelumnya Bu Rani hitung ini pakai ingatan atau perkiraan. Sekarang datanya langsung ada begitu order di-approve."

**Jangan dikatakan:**
- "Kuali menghemat X jam per hari" — angka tidak tervalidasi
- "Food waste turun X%" — tidak bisa diklaim

---

## SLIDE 8 — Demo: Daily Summary & QRIS Dummy Reminder

**Judul:** Rekap harian otomatis. Reminder pembayaran siap kirim.

**Pesan Utama:**
Di akhir hari, semua informasi yang Bu Rani butuhkan sudah tersedia — tanpa harus rekap manual.

**Konten:**

**Daily Summary — dari data demo 2025-05-17:**
- Total order hari ini: **11**
- Dikonfirmasi: **5**
- Draft/menunggu approve: **6**
- Belum bayar (confirmed): **4 — total Rp 167.000**
- Perlu cek (confidence < 0.7): **3**

**QRIS Dummy Reminder:**
- Preview pesan reminder dengan nominal order
- Tombol "Salin Pesan Reminder" — Bu Rani kirim sendiri ke pelanggan
- **Bukan settlement otomatis.** QRIS dummy / milik merchant sendiri.
- Disclaimer selalu terlihat: "Reminder ini bukan transaksi pembayaran otomatis"

**Suggested Visual:**
- Daily summary card (mobile) di kiri
- QRIS dummy card di kanan dengan disclaimer jelas
- Badge unpaid yang mencolok

**Speaker Notes:**
> "Ini yang Bu Rani lihat di akhir hari. Semua informasi tersedia tanpa ia harus rekap manual." Untuk QRIS: tegas tapi singkat — "reminder dummy, bukan settlement. Bu Rani kirim sendiri ke pelanggan."

**Jangan dikatakan:**
- "QRIS-nya bisa langsung bayar" — bukan fitur MVP
- "Settlement otomatis" — jangan sekali pun diucapkan
- Angka berbeda dari canonical (11/5/4/Rp167.000/3)

---

## SLIDE 9 — Impact: Yang Bisa Diukur dari Demo

**Judul:** Apa yang bisa dilihat langsung dari demo ini.

**Pesan Utama:**
Kuali tidak mengklaim hasil yang tidak bisa diverifikasi. Semua angka dari data demo aktual — bukan proyeksi, bukan estimasi pasar.

**Konten:**

| Metrik | Nilai Demo | Keterangan |
|---|---|---|
| Chat berhasil diparse | 13 dari 15 chat | 86,7% berhasil jadi draft order |
| Order perlu cek | 3 order | confidence < 0.7, ditandai otomatis |
| Order belum bayar terdeteksi | 4 order (Rp 167.000) | reminder siap dikirim |
| Bahan terhitung otomatis | 6 jenis bahan | dari 5 order dikonfirmasi × resep |
| Daily summary dibuat | 1 summary | tanpa rekap manual dari Bu Rani |
| AI hanya buat draft | 100% | tidak ada order terkonfirmasi tanpa owner |

**Disclaimer (wajib tampil di slide):**
> *Semua angka dari data dummy Katering Bu Rani (2025-05-17). Ini adalah simulasi demo, bukan klaim operasional nyata.*

**Suggested Visual:**
- 6 metrik card dalam grid 2×3
- Angka besar, label kecil
- Footer disclaimer kecil tapi terbaca

**Speaker Notes:**
> Bacakan 2-3 metrik yang paling kuat. Sisanya biarkan audiens baca. Selalu tutup dengan: "Semua angka ini dari data dummy yang bisa dilihat langsung di demo."

**Jangan dikatakan:**
- "Profit Bu Rani naik sekian persen" — tidak ada data
- "Food waste turun sekian persen" — tidak ada mekanisme di MVP
- "Penghematan X jam per hari dijamin" — tidak tervalidasi
- "Kami membantu jutaan UMKM" — terlalu klaim

---

## SLIDE 10 — MVP vs Roadmap: Batas yang Jelas

**Judul:** MVP fokus. Roadmap realistis. Tidak ada klaim yang berlebih.

**Pesan Utama:**
Kuali tahu persis apa yang sudah ada dan apa yang belum. Roadmap dibedakan secara visual dan verbal.

**Konten:**

| ✅ MVP — Sudah Ada di Demo | 🗺️ Roadmap — Nanti |
|---|---|
| Mock WhatsApp UI | Real WhatsApp Business Cloud API |
| AI Order Parser (mock-first) | ML prediction berbasis historis |
| Confidence Score + Missing Field | — |
| Owner Approval | — |
| Order Dashboard | — |
| QRIS Dummy Reminder | QRIS Settlement real |
| Production Planner | Community sourcing (berbasis consent) |
| Daily Summary | Rescue sale opt-in (berbasis consent) |
| Impact Dashboard | Supplier pooling |
| — | Multi-tenant SaaS |

**Catatan roadmap:**
> Community sourcing dan rescue sale dirancang berbasis consent pengguna — bukan broadcast otomatis, bukan klaim MVP.

**Suggested Visual:**
- Dua kolom jelas: hijau (MVP) vs abu/dashed (Roadmap)
- Badge ungu "Roadmap" pada kolom kanan
- Tidak ada tombol aksi pada kolom roadmap

**Speaker Notes:**
> "Kami sadar batas MVP kami. Yang ada di kolom kiri bisa dilihat langsung di demo tadi. Yang di kanan adalah rencana pengembangan setelah hackathon, dengan validasi pengguna nyata terlebih dahulu."

**Jangan dikatakan:**
- "Fitur belanja bareng sudah ada di sistem" — tidak benar
- "QRIS kita bisa langsung settlement" — bukan MVP
- "Roadmap kami adalah..." lalu klaim sebagai fitur aktif

---

## SLIDE 11 — Tech Stack: Ringan, Bisa Dikembangkan

**Judul:** Dibangun dengan stack yang proven — siap dikembangkan setelah hackathon.

**Pesan Utama:**
Teknologi yang dipilih bukan yang paling kompleks, tapi yang paling tepat untuk demo yang stabil dan pengembangan cepat.

**Konten:**

**Untuk audiens non-teknis:**
- **Platform web modern** yang berjalan di browser — tidak perlu install app
- **AI dengan guardrail ketat** — hanya buat draft, tidak memutuskan sendiri
- **Database terkelola** — data order, menu, dan bahan tersimpan aman
- **Demo tidak bergantung koneksi internet real** — AI dan WhatsApp berjalan dalam mode simulasi

**Untuk audiens teknis:**

| Layer | Teknologi |
|---|---|
| Framework | Next.js 14+ App Router + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase PostgreSQL + Prisma ORM |
| AI Parser | OpenAI GPT-4o / Claude (mock-first via `USE_MOCK_AI=true`) |
| Deployment | Vercel |
| Mock | `USE_MOCK_AI=true` + `USE_MOCK_WHATSAPP=true` |

**Keputusan teknis utama:**
- **Mock-first:** Demo tidak bergantung pada API key live — aman untuk presentasi
- **Single-tenant:** Satu bisnis per demo, multi-tenant di roadmap
- **No real WhatsApp API:** Tidak perlu approval Meta untuk hackathon

**Suggested Visual:**
- Diagram alur sederhana (Chat → AI → DB → Dashboard) dengan ikon teknologi
- Bukan slide teks panjang
- Cukup 1 diagram + 1 tabel ringkas

**Speaker Notes:**
> Untuk juri teknis: jelaskan mock-first strategy sebagai keputusan sadar — bukan keterbatasan. "Kami tidak bergantung pada API eksternal saat demo, sehingga tidak ada titik kegagalan di luar kontrol kami."
> Untuk juri non-teknis: fokus pada "bekerja di browser, tidak butuh install app."

**Jangan dikatakan:**
- Istilah teknis tanpa penjelasan untuk audiens campuran
- "Kami akan pakai WhatsApp API kalau ada waktu" — sudah jelas roadmap
- Angka server, cost, atau SLA yang tidak tervalidasi

---

## SLIDE 12 — Penutup & CTA

**Judul:** Kuali tidak mengubah cara UMKM berjualan.

**Pesan Utama:**
Kuali memperkuat fondasi operasional yang sudah ada — bukan mengganti cara kerja yang sudah terbukti.

**Konten:**

**Tagline besar:**
> "Kuali membantu merapikan alur yang sudah mereka pakai setiap hari:
> dari chat pelanggan menjadi order dan produksi yang lebih siap."

**3 hal yang bisa diingat audiens:**
1. AI membuat draft — owner yang memutuskan
2. Production planner dari order aktual, bukan perkiraan
3. Tidak ada klaim yang tidak bisa diverifikasi langsung di demo

**Call to action:**
> "Silakan coba demo kami di: [URL demo]"

**Kontak tim:**
- Nama tim
- Email / GitHub / link demo

**Suggested Visual:**
- Background hangat, clean
- Tagline besar di tengah
- Logo Kuali kecil di pojok
- QR code ke demo URL (jika tersedia)

**Speaker Notes:**
> Tutup dengan tenang. Tidak perlu rush. "Kami percaya UMKM kuliner sudah punya pelanggan, sudah punya alur, dan sudah tahu cara berjualan. Kuali hanya membantu merapikan satu bagian yang selama ini masih manual."
> Lalu: "Terima kasih. Kami siap untuk pertanyaan."

**Jangan dikatakan:**
- "Semoga produk kami bisa membantu jutaan UMKM" — terlalu besar tanpa dasar
- "Kami akan jadi yang terbesar di..." — bukan bagian pitch yang tepat
- Klaim roadmap sebagai fitur sekarang

---

## Ringkasan Slide

| # | Judul | Durasi Target | Tipe |
|---|---|---|---|
| 1 | Cover | 5 detik | Identity |
| 2 | Problem | 30 detik | Empati |
| 3 | Persona: Bu Rani | 20 detik | Context |
| 4 | Solusi Overview | 20 detik | Bridge |
| 5 | Demo: AI Parser | 30 detik | Demo |
| 6 | Demo: Approval & Confidence | 20 detik | Demo |
| 7 | Demo: Production Planner ⭐ | 30 detik | Demo (AHA) |
| 8 | Demo: Daily Summary & QRIS | 20 detik | Demo |
| 9 | Impact (safe) | 20 detik | Evidence |
| 10 | MVP vs Roadmap | 15 detik | Clarity |
| 11 | Tech Stack | 15 detik | Credibility |
| 12 | Penutup & CTA | 15 detik | Close |
| **Total** | | **~3:40** | |

> Sisa waktu: buffer untuk transisi + Q&A buffer

---

## Verifikasi Checklist

- [x] Deck bisa dibawakan dalam < 5 menit
- [x] Problem diframing dengan empati — tidak merendahkan UMKM
- [x] Solusi tidak overclaimed — AI hanya draft, owner approve
- [x] Roadmap dipisahkan secara visual dan verbal dari MVP
- [x] Tech slide tidak butuh latar belakang teknis untuk dipahami
- [x] Semua angka demo konsisten: 11 total / 5 dikonfirmasi / 4 unpaid Rp167.000 / 3 perlu cek
- [x] QRIS selalu disebut "dummy/reminder" — tidak pernah "settlement"
- [x] Community sourcing/rescue sale selalu berlabel "Roadmap"
- [x] Tidak ada kata "gaptek", "tertinggal", atau "belum digital" sebagai framing negatif

---

*Draft ini dibuat untuk persiapan pitch Gunadarma Code Week 2.0. Semua data dan metrik dari data dummy Katering Bu Rani — bukan klaim operasional nyata.*
