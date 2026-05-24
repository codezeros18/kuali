# Kuali — Proposal Revision Plan

> **Status dokumen:** Revisi proposal setelah feedback UMKM mikro dan review prototype  
> **Fokus:** Target user, UX inclusivity, Profil Usaha, Mode Sederhana/Standar, dashboard clarity, scope safety, dan final proposal narrative  
> **Tujuan:** Memperkuat proposal Babak 1 agar lebih realistis, empatik, dan sesuai kondisi UMKM mikro.

---

## 0. Ringkasan Revisi Proposal

Proposal Kuali perlu direvisi berdasarkan feedback:

1. Sebagian UMKM mikro merasa grafik dan dashboard kompleks bisa membingungkan.
2. Target user perlu dijelaskan lebih tajam: bukan “semua UMKM”, tetapi UMKM kuliner mikro WhatsApp-first.
3. UX perlu menunjukkan bahwa Kuali tidak memaksa semua owner membaca dashboard lengkap.
4. “Company Profile” perlu diganti menjadi “Profil Usaha”.
5. Tambahkan konsep **Mode Sederhana** dan **Mode Standar** sebagai solusi UX.
6. Jangan menggunakan umur sebagai dasar tampilan; gunakan preferensi kenyamanan.
7. Proposal harus menampilkan bahwa Kuali memahami realita UMKM mikro, bukan hanya membangun dashboard keren.

---

## 1. Revisi Target User

### 1.1 Target User Lama

Sebelumnya target user dijelaskan sebagai:

```txt
UMKM kuliner seperti catering, snack box, bakery, dessert box, frozen food, dan pre-order makanan rumahan.
```

Ini benar, tetapi perlu dipertajam.

### 1.2 Target User Baru

Gunakan definisi:

> Target utama Kuali adalah pemilik UMKM kuliner mikro yang menerima pesanan melalui WhatsApp, belum memiliki admin khusus, dan masih melakukan rekap pesanan, pembayaran, serta kebutuhan bahan secara manual.

Contoh:
- Catering rumahan.
- Nasi box.
- Snack box.
- Bakery rumahan.
- Dessert box.
- Frozen food.
- Kopi literan.
- Pre-order makanan rumahan.

Karakter:
- Jualan lewat WhatsApp.
- Order 5–50 per hari.
- Rekap manual.
- Owner merangkap admin, produksi, dan customer service.
- Tidak semua nyaman membaca grafik atau dashboard kompleks.
- Membutuhkan alur yang cepat, jelas, dan tidak membebani.

---

## 2. Revisi Persona

### 2.1 Persona Utama — Bu Rani

**Nama:** Bu Rani  
**Usia:** Tidak perlu disebut sebagai syarat utama; jika disebut, cukup sebagai konteks persona.  
**Usaha:** Catering rumahan / nasi box  
**Kanal jualan:** WhatsApp, grup pelanggan, repeat order  
**Kondisi:** Mengurus order, pembayaran, dan produksi tanpa admin khusus  
**Masalah:** Chat pesanan tercecer, pembayaran perlu diingatkan manual, bahan dihitung pakai perkiraan  
**Kebutuhan:** Pesanan rapi, pelanggan belum bayar terlihat jelas, bahan produksi bisa dicek cepat  
**Kenyamanan digital:** Bisa memakai WhatsApp, tetapi tidak ingin dashboard yang terlalu rumit  

### 2.2 Persona Pendukung — Admin/Keluarga

**Profil:** Anak/anggota keluarga/admin part-time yang membantu usaha  
**Kebutuhan:** Melihat detail order, tabel, grafik, dan rekap yang lebih lengkap  
**Mode cocok:** Mode Standar

### 2.3 Persona Aksesibilitas — Owner yang Butuh Tampilan Ringkas

**Profil:** Owner yang kurang nyaman membaca grafik/tabel kompleks  
**Kebutuhan:** Tombol besar, teks jelas, aksi langsung  
**Mode cocok:** Mode Sederhana

Catatan penting:
- Jangan menulis “lansia gaptek”.
- Jangan menjadikan umur sebagai kategori produk.
- Gunakan istilah “tingkat kenyamanan digital berbeda-beda”.

---

## 3. Revisi Problem Statement

### 3.1 Problem Statement Lama

> UMKM kuliner sudah aktif berjualan lewat WhatsApp, tetapi proses operasional setelah chat masuk masih manual.

Ini tetap dipakai.

### 3.2 Problem Statement Baru yang Lebih Kuat

> Banyak UMKM kuliner mikro sudah aktif menerima pesanan melalui WhatsApp. Tantangannya bukan pada kemauan untuk digital, melainkan pada proses operasional setelah chat masuk: pesanan perlu direkap, pembayaran perlu diingatkan, dan kebutuhan bahan produksi masih sering dihitung secara manual. Di sisi lain, tidak semua owner nyaman membaca dashboard yang kompleks. Karena itu, solusi digital untuk UMKM mikro harus sederhana, mobile-first, dan langsung membantu aksi harian.

Kenapa lebih kuat:
- Tidak menyalahkan UMKM.
- Mengakui WhatsApp sebagai kebiasaan existing.
- Menambahkan insight UX dari feedback UMKM.
- Menjelaskan kenapa Mode Sederhana relevan.

---

## 4. Revisi Value Proposition

### 4.1 Value Proposition Lama

> Kuali membantu mengubah chat pesanan menjadi order rapi, reminder pembayaran, estimasi bahan, dan rekap produksi harian.

### 4.2 Value Proposition Baru

> Kuali membantu UMKM kuliner mikro merapikan pesanan WhatsApp menjadi order siap proses, reminder pembayaran, dan rencana bahan harian, dengan pilihan tampilan sederhana atau lengkap sesuai kenyamanan pengguna.

Versi pitch pendek:

> Dari chat WhatsApp ke order rapi dan dapur siap — dengan tampilan yang bisa dibuat sederhana untuk owner UMKM mikro.

---

## 5. Revisi UX Strategy di Proposal

Tambahkan subbab baru di bagian **User Experience & Design**.

### 5.1 Prinsip UX Kuali

Kuali menggunakan prinsip:

1. **WhatsApp-first**
   - User tetap memakai channel yang sudah familiar.
2. **Mobile-first**
   - Tampilan nyaman di HP.
3. **Low cognitive load**
   - Informasi utama ditampilkan ringkas.
4. **Human-in-the-loop**
   - AI hanya membuat draft; owner tetap menyetujui.
5. **Adaptive display preference**
   - Pengguna bisa memilih tampilan sederhana atau standar.
6. **Bahasa Indonesia sederhana**
   - Hindari istilah teknis yang membingungkan.

---

## 6. Mode Sederhana dan Mode Standar di Proposal

### 6.1 Penjelasan Konsep

Tambahkan narasi:

> Berdasarkan feedback dari calon pengguna UMKM mikro, dashboard yang terlalu banyak grafik dan angka dapat membingungkan sebagian owner. Karena itu, Kuali menyediakan dua pendekatan tampilan: Mode Sederhana dan Mode Standar. Mode Sederhana menampilkan aksi utama seperti cek pesanan, ingatkan pembayaran, dan lihat bahan produksi. Mode Standar menampilkan dashboard lengkap dengan grafik, tabel, dan metrik operasional untuk owner/admin yang membutuhkan detail lebih banyak.

### 6.2 Mode Sederhana

Isi:
- Pesanan perlu dicek.
- Pelanggan belum bayar.
- Bahan untuk besok.
- Rekap hari ini.

Cocok untuk:
- Owner yang ingin cepat paham.
- Pengguna HP kecil.
- Pengguna yang tidak nyaman melihat grafik.
- Owner yang sedang sibuk produksi.

### 6.3 Mode Standar

Isi:
- Metric cards.
- Grafik sederhana.
- Daftar order.
- Payment status.
- Production planner detail.
- Rekap harian.

Cocok untuk:
- Admin.
- Anak/keluarga yang membantu usaha.
- Owner yang ingin melihat detail operasional.

### 6.4 Kenapa tidak berdasarkan umur?

Tulis:

> Kuali tidak menggunakan umur sebagai dasar personalisasi tampilan, karena kemampuan digital tidak selalu ditentukan oleh usia. Sebagai gantinya, Kuali memberikan pilihan tampilan berdasarkan kenyamanan pengguna: Sederhana atau Standar.

Ini penting untuk etika dan inclusivity.

---

## 7. Revisi Mockup Section di Proposal

Tambahkan daftar mockup yang akan dimasukkan:

1. Landing page.
2. Login/demo entry.
3. Profil Usaha.
4. Dashboard Mode Sederhana.
5. Dashboard Mode Standar.
6. Mock WhatsApp Chat.
7. AI Parsed Draft Order.
8. Order Detail & Owner Approval.
9. QRIS Dummy Reminder.
10. Production Planner.
11. Daily Summary/Impact.

Catatan:
- Roadmap screenshot tidak perlu ditonjolkan.
- Jika dimasukkan, letakkan di lampiran atau bagian rencana pengembangan.

---

## 8. Revisi Bagian Teknologi & Implementasi

Teknologi tetap sama, tetapi tambahkan penjelasan UX-display layer.

### 8.1 Frontend

Tambahkan:

> Frontend Kuali dirancang dengan dua mode tampilan. Mode Sederhana menampilkan ringkasan aksi utama tanpa grafik, sedangkan Mode Standar menampilkan dashboard operasional lengkap. Pada tahap prototype, preferensi tampilan dapat disimpan secara lokal agar tidak membutuhkan sistem autentikasi kompleks.

### 8.2 AI

Tetap tekankan:
- AI parser membaca chat menjadi draft order.
- AI tidak mengambil keputusan final.
- Owner approval tetap wajib.
- Confidence score tidak ditampilkan terlalu teknis di Mode Sederhana.

### 8.3 Backend/Data

Untuk proposal:
- Profil Usaha menyimpan data usaha, bukan data personal berlebihan.
- Tidak perlu menyimpan umur.
- Payment tetap QRIS dummy.
- Data pengguna minimal.

---

## 9. Revisi Security, Privacy, and Ethics

Tambahkan bagian:

### 9.1 Data Minimization

Kuali tidak meminta data yang tidak diperlukan untuk alur MVP. Umur pengguna tidak menjadi field wajib karena preferensi tampilan cukup dipilih secara langsung.

### 9.2 Inclusive UX

Kuali menghindari asumsi bahwa pengguna tertentu tidak mampu menggunakan teknologi berdasarkan usia. Pilihan tampilan diberikan agar setiap owner dapat memilih pengalaman yang paling nyaman.

### 9.3 Payment Safety

Reminder QRIS pada prototype hanya berupa dummy. Kuali tidak memproses dana.

### 9.4 AI Safety

AI hanya membuat draft order dan rekomendasi; keputusan tetap berada pada pemilik usaha.

---

## 10. Revisi Business & Market Strategy

Tambahkan bahwa Mode Sederhana meningkatkan peluang adopsi tanpa overclaim.

### 10.1 Impact terhadap adopsi

Mode Sederhana membantu mengurangi hambatan awal bagi UMKM mikro yang tidak terbiasa dengan dashboard kompleks. Ini bisa meningkatkan peluang trial/adoption karena user langsung melihat aksi penting tanpa perlu memahami grafik.

### 10.2 Segmentasi pengguna

| Segment | Need | Mode |
|---|---|---|
| Owner mikro sibuk produksi | Aksi cepat | Sederhana |
| Owner/admin lebih digital | Detail operasional | Standar |
| Tim/keluarga yang membantu | Rekap dan monitoring | Standar |
| Owner yang tidak suka grafik | Info inti | Sederhana |

---

## 11. Revisi Impact Measurement

Jangan klaim:
- “Mode Sederhana pasti meningkatkan adopsi X%.”
- “Lansia pasti lebih mudah.”

Gunakan metrik yang aman:

- Jumlah klik untuk menemukan pesanan perlu dicek.
- Waktu yang dibutuhkan user untuk menemukan pelanggan belum bayar.
- Jumlah informasi utama yang terlihat di layar pertama.
- Feedback kualitatif dari UMKM mikro.
- Perbandingan task completion Mode Sederhana vs Mode Standar.

Contoh kalimat:

> Pada tahap lanjut, Kuali dapat menguji efektivitas Mode Sederhana melalui usability testing sederhana dengan pelaku UMKM mikro, misalnya mengukur apakah pengguna dapat menemukan pesanan yang perlu dicek dan daftar bahan produksi tanpa bantuan.

---

## 12. Revisi SWOT

Tambahkan:

### Strength
- Memiliki pilihan Mode Sederhana dan Standar sehingga lebih adaptif untuk UMKM mikro.

### Weakness
- Mode Sederhana harus tetap dijaga agar tidak kehilangan informasi penting.

### Opportunity
- Banyak UMKM mikro membutuhkan tools yang ringan dan tidak terasa seperti dashboard perusahaan besar.

### Threat
- Jika UI terlalu kompleks, user bisa kembali ke catatan manual/WhatsApp biasa.

---

## 13. Revisi Differentiation

Tambahkan ke competitor comparison:

| Alternatif | Kelemahan untuk UMKM mikro | Diferensiasi Kuali |
|---|---|---|
| Spreadsheet | Fleksibel tapi harus input manual | Kuali mengubah chat menjadi draft order |
| POS lengkap | Fitur banyak, bisa terasa kompleks | Kuali fokus pada pre-order WhatsApp |
| WhatsApp Business | Chat tetap perlu direkap manual | Kuali bantu order, pembayaran, dan produksi |
| ChatGPT biasa | Tidak punya dashboard/order state | Kuali punya workflow dan owner approval |
| Dashboard inventory | Bisa terlalu rumit | Kuali punya Mode Sederhana |

---

## 14. Revisi Roadmap

Roadmap tetap ada, tetapi jangan melebar.

Urutan roadmap:

1. Real WhatsApp Business Cloud API.
2. Customer opt-in.
3. Mode Sederhana usability testing.
4. Multi-user owner/admin ringan.
5. SaaS subscription.
6. Community sourcing.
7. Rescue sale opt-in.

Mode Sederhana masuk roadmap validasi, bukan production kompleks.

---

## 15. Revisi Proposal Final — Teks Siap Tempel

### 15.1 Paragraf Target User

> Target utama Kuali adalah pemilik UMKM kuliner mikro yang menerima pesanan melalui WhatsApp, seperti catering rumahan, snack box, nasi box, bakery rumahan, dessert box, frozen food, dan pre-order makanan rumahan. Segmen ini sering kali belum memiliki admin khusus, sehingga pemilik usaha harus merangkap sebagai admin chat, pencatat order, pengingat pembayaran, dan pengatur produksi. Kuali dirancang untuk membantu alur tersebut tanpa memaksa pengguna berpindah dari kebiasaan utama mereka, yaitu berjualan melalui WhatsApp.

### 15.2 Paragraf UX Inclusivity

> Kuali juga mempertimbangkan bahwa tingkat kenyamanan digital setiap pelaku UMKM berbeda-beda. Tidak semua owner nyaman membaca grafik, tabel panjang, atau istilah teknis. Karena itu, Kuali mengusulkan dua mode tampilan: Mode Sederhana dan Mode Standar. Mode Sederhana menampilkan aksi utama seperti pesanan yang perlu dicek, pelanggan yang belum bayar, dan bahan yang perlu disiapkan. Mode Standar menyediakan dashboard lengkap untuk owner atau admin yang membutuhkan detail operasional lebih lanjut.

### 15.3 Paragraf Kenapa Tidak Berdasarkan Umur

> Kuali tidak menggunakan umur sebagai dasar personalisasi tampilan, karena kemampuan dan kenyamanan digital tidak selalu ditentukan oleh usia. Sebagai gantinya, Kuali memberi pengguna pilihan tampilan berdasarkan preferensi: Sederhana atau Standar. Pendekatan ini lebih inklusif dan tidak menambah pengumpulan data pribadi yang tidak diperlukan.

### 15.4 Paragraf Profil Usaha

> Pada tahap awal, Kuali menggunakan konsep Profil Usaha untuk menyimpan informasi dasar seperti nama usaha, jenis usaha, area operasional, nomor WhatsApp usaha, menu aktif, QRIS dummy, dan preferensi tampilan. Profil ini dibuat ringan agar sesuai dengan kebutuhan UMKM mikro dan tidak membebani pengguna dengan informasi legal atau administratif yang belum diperlukan pada MVP.

### 15.5 Paragraf Impact UX

> Dengan Mode Sederhana, Kuali berupaya mengurangi beban kognitif pengguna. Owner tidak perlu langsung membaca grafik atau tabel detail; mereka cukup melihat aksi penting yang harus dilakukan hari itu. Pendekatan ini diharapkan dapat membuat proses adopsi lebih ringan, terutama bagi UMKM mikro yang terbiasa bekerja cepat melalui WhatsApp.

---

## 16. Acceptance Criteria Proposal Revision

Revisi proposal selesai jika:

- [ ] Target user dijelaskan sebagai UMKM kuliner mikro WhatsApp-first.
- [ ] Persona mencakup owner mikro dan admin/keluarga.
- [ ] Ada subbab Mode Sederhana dan Mode Standar.
- [ ] Tidak ada personalisasi berdasarkan umur.
- [ ] Ada penjelasan data minimization.
- [ ] Company Profile diganti menjadi Profil Usaha.
- [ ] UX inclusivity masuk proposal.
- [ ] Impact measurement tidak overclaim.
- [ ] Roadmap tidak dijadikan MVP.
- [ ] Narasi tetap aman dan tidak menyinggung UMKM.
- [ ] Proposal tetap sesuai template resmi.

---

## 17. Prompt Claude/Codex — Proposal Revision

Gunakan prompt ini untuk update proposal:

```txt
You are a Senior Product Manager, UX Researcher, Technical Writer, and Hackathon Proposal Reviewer for the Kuali project.

Current task:
Proposal Revision — Target user clarity, Mode Sederhana/Standar, Profil Usaha, UX inclusivity, and scope safety.

Goal:
Update the proposal documentation so Kuali better reflects feedback from micro culinary MSMEs who may feel overwhelmed by charts and complex dashboards.

Important:
Do NOT implement code in this task.
Do NOT add production features.
Do NOT add age-based personalization.
Do NOT present roadmap features as MVP.
Do NOT overclaim adoption, profit, or food waste impact.

Read:
- docs/proposal/99_FINAL_PROPOSAL_SUBMISSION.md
- docs/proposal/00_PROPOSAL_MASTER_KUALI.md
- docs/proposal/01_PROPOSAL_CONTENT_DRAFT.md
- docs/proposal/02_HUSTLER_BUSINESS_MARKET.md
- docs/proposal/03_HIPSTER_UX_DESIGN.md
- docs/proposal/04_HACKER_TECH_IMPLEMENTATION.md
- docs/proposal/05_DIAGRAMS_AND_MOCKUP_PLAN.md
- docs/proposal/06_REFERENCES_AND_RESEARCH_NOTES.md
- docs/proposal/14_PROPOSAL_FINAL_REVIEW.md if exists

CHECK:
1. Check how target user is currently described.
2. Check whether UX mentions different digital comfort levels.
3. Check whether dashboard complexity risk is mentioned.
4. Check whether Company Profile is used anywhere.
5. Check whether age-based logic is suggested anywhere.
6. Check whether roadmap features are mixed into MVP.
7. Check whether impact claims are overclaimed.

DECIDE:
1. Target user must be:
   "UMKM kuliner mikro WhatsApp-first."
2. Add two display concepts:
   - Mode Sederhana
   - Mode Standar
3. Replace "Company Profile" with "Profil Usaha".
4. Do not use age as personalization.
5. Add data minimization and inclusive UX explanation.
6. Add Mode Sederhana to UX and roadmap validation.
7. Keep dashboard charts as Mode Standar.

IMPLEMENT:
Update proposal files to include:
1. Revised target user section.
2. Revised persona section.
3. UX inclusivity section.
4. Mode Sederhana vs Mode Standar explanation.
5. Profil Usaha explanation.
6. Data minimization note.
7. Updated competitor differentiation.
8. Updated SWOT.
9. Updated impact measurement.
10. Updated roadmap.
11. Updated final proposal text.

Also create:
docs/proposal/17_PROPOSAL_REVISION_REPORT.md

The report must include:
- What was revised
- Files changed
- New UX strategy
- Scope safety notes
- Remaining proposal TODO

VERIFY:
1. Proposal still follows official structure.
2. MVP remains order operation + production planner.
3. Mode Sederhana is not overbuilt.
4. No age-based feature is introduced.
5. Roadmap features remain roadmap.
6. No unsafe narrative appears.
7. No unsupported statistics are added.

REPORT:
Report:
- Files updated
- Sections changed
- Proposal readiness
- Remaining gaps
```

---

## 18. Final Proposal Positioning Setelah Revisi

Gunakan positioning ini:

> Kuali adalah asisten operasional WhatsApp-first untuk UMKM kuliner mikro yang membantu mengubah chat pesanan menjadi draft order, reminder pembayaran, rencana bahan produksi, dan rekap harian, dengan pilihan Mode Sederhana dan Mode Standar agar sesuai dengan kenyamanan pengguna.

---

## 19. Hal yang Wajib Dihindari di Proposal

Jangan tulis:

- “Kuali khusus untuk lansia.”
- “Lansia sulit memahami teknologi.”
- “Gen Z lebih mudah memahami dashboard.”
- “Mode Sederhana pasti meningkatkan adopsi.”
- “Kuali menggantikan admin.”
- “UMKM masih tertinggal.”
- “UMKM gaptek.”
- “Grafik tidak cocok untuk UMKM.”
- “Semua owner tidak suka dashboard.”

Gunakan:

- “tingkat kenyamanan digital berbeda-beda,”
- “mengurangi beban kognitif,”
- “memberi pilihan tampilan,”
- “owner tetap memegang kendali,”
- “dashboard lengkap tersedia untuk pengguna yang membutuhkan detail.”

---

## 20. Final Recommendation

Revisi ini **tidak over** jika scope dijaga.

Yang masuk:
- Mode Sederhana vs Mode Standar sebagai UX concept.
- Profil Usaha.
- Copy lebih ramah UMKM mikro.
- Proposal UX inclusivity.
- Data minimization.

Yang tidak masuk:
- Age-based personalization.
- Dashboard builder.
- Banyak tipe grafik.
- Role management kompleks.
- Real profile/account system production.

Kesimpulan:

> Revisi ini justru memperkuat Kuali karena menunjukkan bahwa tim memahami realita UMKM mikro: mereka butuh solusi yang membantu, bukan dashboard yang membuat pusing.
