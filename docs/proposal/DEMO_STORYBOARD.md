# Demo Storyboard — Kuali

> Dokumen ini adalah bagian dari Phase 0 Baseline Proposal Kuali.
> Storyboard demo 3 menit (versi inti) dan 5 menit (versi plus).

---

## Prinsip Demo

- Demo harus berjalan tanpa koneksi internet yang tidak stabil (gunakan mock/cached)
- Semua data demo sudah di-seed sebelum presentasi
- Aha moment ada di scene Production Planner
- Jangan klaim lebih dari yang terlihat di layar
- Roadmap simulation card hanya ditampilkan di versi 5 menit, dengan label jelas

---

## Demo 3 Menit — Versi Inti

### Scene 1 — Problem Hook (0:00–0:30)

**Narasi:**
> "Bu Rani punya usaha catering rumahan. Setiap pagi, pesanan WhatsApp masuk dari berbagai chat. Ada yang pesan baru, ada yang tanya stok, ada yang konfirmasi bayar. Semua campur aduk. Bu Rani harus catat manual. Kadang terlewat."

**Aksi di layar:**
- Tampilkan slide atau screenshot WhatsApp ramai (chat berantakan)
- Atau: buka halaman `/` yang menampilkan visual problem

**Tujuan:** Audiens langsung relate dengan masalah.

---

### Scene 2 — Chat Masuk ke Kuali (0:30–1:00)

**Narasi:**
> "Dengan Kuali, chat pesanan bisa langsung masuk ke satu tempat. Kita coba."

**Aksi di layar:**
1. Buka halaman `/mock-whatsapp`
2. Ketik atau paste chat: **"Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya."**
3. Klik tombol "Kirim ke Kuali"

**Tujuan:** Tunjukkan entry point yang familiar (seperti WhatsApp).

---

### Scene 3 — AI Parsing + Draft Order (1:00–1:30)

**Narasi:**
> "Kuali langsung membaca chat ini dan membuat draft order. Lihat: nama pelanggan, menu, jumlah, tanggal kirim, dan status pembayaran sudah terbaca. Confidence score 95% — artinya sistem cukup yakin parseli ini benar."

**Aksi di layar:**
1. Draft order card muncul:
   - Nama: Dinda
   - Menu: Risol Mayo × 12
   - Tanggal: Besok jam 3
   - Status bayar: Belum bayar
   - Confidence: 95%
2. Tidak ada missing fields

**Highlight:** Badge confidence score berwarna hijau.

**Tujuan:** Tunjukkan AI bekerja — dan output-nya terstruktur.

---

### Scene 4 — Owner Approval (1:30–1:45)

**Narasi:**
> "Tapi AI hanya membuat draft. Bu Rani tetap yang memutuskan. Kalau sudah benar, tinggal tekan Approve."

**Aksi di layar:**
1. Tekan tombol "Approve Order"
2. Status berubah: Draft → Dikonfirmasi
3. Toast notification: "Order Dinda berhasil dikonfirmasi"

**Tujuan:** Tegaskan bahwa owner tetap pegang kendali.

---

### Scene 5 — QRIS Dummy Reminder (1:45–2:00)

**Narasi:**
> "Setelah approve, Kuali langsung siapkan reminder pembayaran dengan QRIS. Ini dummy — bukan settlement otomatis. Bu Rani tinggal salin dan kirim sendiri ke Dinda."

**Aksi di layar:**
1. Card QRIS dummy muncul
2. Nominal: Rp 42.000
3. Tombol: "Salin Pesan Reminder"

**Tujuan:** Tunjukkan reminder pembayaran — dengan disclaimer dummy yang jelas.

---

### Scene 6 — Production Planner ⭐ AHA MOMENT (2:00–2:30)

**Narasi:**
> "Nah, ini yang paling membantu Bu Rani. Setelah semua order hari ini di-approve, Kuali otomatis menghitung bahan yang harus disiapkan. Dari order aktual — bukan perkiraan."

**Aksi di layar:**
1. Buka halaman `/production`
2. Tampilkan daftar bahan hari ini:
   - Tepung Terigu: 850g
   - Telur: 4,2 butir
   - Wortel: 350g
   - Ayam Potong: 2kg
   - Beras: 3kg
   - dsb.
3. Highlight: "Dari 5 order yang dikonfirmasi hari ini"

**Tujuan:** Ini adalah aha moment — sesuatu yang belum pernah ada sebelumnya untuk Bu Rani.

---

### Scene 7 — Daily Summary + Closing (2:30–3:00)

**Narasi:**
> "Di akhir hari, Bu Rani bisa lihat rekap harian. Berapa order masuk, berapa yang belum bayar, dan bahan apa yang perlu disiapkan besok. Semua dalam satu halaman."

**Aksi di layar:**
1. Buka halaman `/summary`
2. Tampilkan:
   - Total order: 11
   - Dikonfirmasi: 5
   - Belum bayar: 4 (Rp 167.000)
   - Perlu cek: 3

**Narasi penutup:**
> "Kuali tidak mengubah cara Bu Rani berjualan. Kuali membantu merapikan alur yang sudah ia pakai setiap hari — dari chat pelanggan menjadi order dan produksi yang lebih siap."

---

## Demo 5 Menit — Versi Plus

Tambahkan 2 scene setelah Scene 6:

### Scene 6B — Low Confidence Case (2:30–3:00)

**Narasi:**
> "Bagaimana kalau chat-nya tidak jelas? Misalnya Bu Tini kirim: 'Kak ayam crispynya ada yang pedas gak? Mau yang pedas semua 2 packnya.'"

**Aksi di layar:**
1. Paste chat-015 dari Bu Tini
2. Draft order muncul dengan confidence score 45% — badge merah/oranye
3. Missing fields: varian menu belum dikonfirmasi, tanggal belum jelas
4. Sistem minta Bu Rani konfirmasi manual sebelum approve

**Tujuan:** Tunjukkan sistem tidak mengarang — kalau tidak yakin, minta konfirmasi.

---

### Scene 6C — Roadmap Simulation Card (3:00–3:30)

**Narasi:**
> "Ke depan, kami berencana menambahkan fitur seperti ini. Tapi ini adalah simulasi roadmap — belum tersedia di MVP."

**Aksi di layar:**
1. Tampilkan card dengan label jelas: **"🗺️ Roadmap — Belum tersedia di MVP"**
2. Contoh: "Belanja bahan bareng UMKM lain di sekitar kamu"
3. Contoh: "Notifikasi sisa stok mendekati batas"

**Tujuan:** Tunjukkan visi — tapi jelas dibedakan dari fitur aktif.

**PENTING:** Jangan demo ini tanpa label roadmap yang jelas.

---

## Checklist Sebelum Demo

- [ ] Seed data sudah dijalankan (`npx prisma db seed`)
- [ ] App berjalan di localhost atau Vercel
- [ ] USE_MOCK_AI=true (untuk antisipasi AI API lambat)
- [ ] Chat demo (chat-001 s.d. chat-015) sudah siap di clipboard
- [ ] QRIS dummy image sudah ada di `/public/qris-dummy.png`
- [ ] Semua halaman sudah dibuka sekali (cache warmup)
- [ ] Koneksi internet stabil (atau siap pakai fallback video)

---

## Fallback Plan

Jika app crash atau koneksi bermasalah:
1. Switch ke video recording (rekam sebelum presentasi)
2. Gunakan slide screenshot sebagai fallback
3. Jelaskan flow secara verbal — data dummy sudah cukup dikenal tim

---

## Pertanyaan Antisipasi

| Pertanyaan | Jawaban Aman |
|---|---|
| "Apakah ini real WhatsApp?" | "Ini mock UI untuk demo. Real WhatsApp API ada di roadmap." |
| "Bagaimana dengan community sourcing?" | "Itu roadmap berbasis consent pengguna, bukan fitur MVP kami." |
| "QRIS-nya bisa langsung bayar?" | "Ini reminder dummy. Payment settlement ada di roadmap." |
| "Apakah food waste bisa turun sekian persen?" | "Kami tidak klaim angka pasti. Yang kami ukur adalah bahan terhitung dari order aktual." |
| "Siapa kompetitornya?" | "WhatsApp Business, POS, dan spreadsheet — tapi tidak ada yang khusus untuk pre-order chat-based." |
