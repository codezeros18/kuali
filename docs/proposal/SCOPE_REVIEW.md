# Scope Review — Kuali MVP

> Review tanggal: 2026-05-17
> Reviewer: AI Coding Agent (Strict Scope Review Mode)
> Untuk: LEAD
> File yang direview: docs/00, docs/01, docs/04, semua docs/proposal/*

---

## Ringkasan Eksekutif

| Kategori | Status | Temuan |
|---|---|---|
| Full POS | ✅ BERSIH | Tidak ditemukan, eksplisit ditolak di semua dokumen |
| Full inventory | ⚠️ PERLU PERBAIKAN | `reorderPoint` dan "stok vs kebutuhan" perlu dikonfirmasi scope-nya |
| Marketplace | ✅ BERSIH | Tidak ditemukan |
| Real QRIS settlement | ✅ BERSIH | Konsisten "dummy/reminder" di semua dokumen |
| Flash sale otomatis | ✅ BERSIH | Rescue sale selalu Roadmap, tidak pernah otomatis |
| Broadcast tanpa opt-in | ✅ BERSIH | Tidak ada, community sourcing selalu Roadmap + consent |
| Supplier pooling real MVP | ✅ BERSIH | Selalu Roadmap |
| Route optimization | ✅ BERSIH | Tidak ditemukan di manapun |
| ML prediction kompleks | ✅ BERSIH | AI parser = structured JSON, bukan ML kompleks |
| Native mobile app | ✅ BERSIH | Selalu Roadmap, PWA cukup |
| Multi-tenant SaaS sebagai MVP | ✅ BERSIH | "Single-tenant untuk MVP" eksplisit di arsitektur |
| Narasi aman (tidak menyinggung UMKM) | ✅ BERSIH | Tidak ada kata gaptek/tertinggal |
| Data konsistensi antar dokumen | ⚠️ PERLU PERBAIKAN | 3 set angka berbeda untuk skenario demo yang sama |
| Klaim bisnis (revenue) | ⚠️ PERLU PERHATIAN | Angka proyeksi revenue perlu framing lebih hati-hati |

**Kesimpulan:** Scope Kuali MVP secara keseluruhan **TIDAK MELEBAR** secara signifikan. Tidak ada scope creep besar ditemukan. Namun ada **4 flag** yang perlu ditindaklanjuti sebelum demo: 2 flag wording, 1 flag data inconsistency, 1 flag klaim bisnis.

---

## Bagian 1 — Scope Check: 11 Item Forbidden

### 1.1 Full POS

**Status: ✅ BERSIH**

Semua dokumen eksplisit menolak POS:
- docs/00 Section 4: "MVP tidak mencoba menjadi super app, POS lengkap, marketplace"
- PROPOSAL_FULL Bagian 4: "Tidak memiliki sistem POS atau admin khusus"
- COMPETITOR_COMPARISON.md: "Kuali bukan POS. Kuali dimulai dari pre-order chat"
- BASELINE_ARCHITECTURE Section 9: "Full POS / kasir — Di luar scope MVP"

Tidak ada fitur kasir, meja, printer struk, atau multi-cabang di manapun.

---

### 1.2 Full Inventory Management

**Status: ⚠️ FLAG — Perlu perbaikan minor**

**Item yang ditemukan:**

**FLAG-01 — `reorderPoint` di entity Ingredient (BASELINE_ARCHITECTURE.md)**

```
Ingredient
  id, businessId, name, unit, pricePerUnit, currentStock, reorderPoint
```

`reorderPoint` adalah konsep inventory management (titik pemesanan ulang). Ini lebih dari sekadar kebutuhan Production Planner. Production Planner hanya butuh `currentStock` untuk membandingkan dengan kebutuhan bahan.

- File: `docs/proposal/BASELINE_ARCHITECTURE.md` Section 4
- Klasifikasi: **Roadmap only — perlu diremove dari entity MVP**
- Rekomendasi: Hapus field `reorderPoint` dari entity MVP. Cukup gunakan `currentStock`.

**FLAG-02 — "stok vs kebutuhan" di USER_JOURNEY.md**

```
| Bahan tidak cukup di stok | Produksi terganggu | Production planner tampilkan stok vs kebutuhan |
```

Framing "stok vs kebutuhan" bisa dibaca sebagai fitur inventory comparison aktif. Konteksnya benar (ini adalah fungsi Production Planner), tapi bahasanya ambigu — bisa disalahartikan sebagai full inventory management.

- File: `docs/proposal/USER_JOURNEY.md` tabel titik kritis
- Klasifikasi: **OK untuk MVP, tapi perlu penyesuaian wording**
- Rekomendasi: Ubah "tampilkan stok vs kebutuhan" menjadi "planner menampilkan kebutuhan bahan; jika stok kurang, ditandai"

**FLAG-03 — "0 stock warning" di PROPOSAL_FULL.md**

```
"0 stock warning — semua stok mencukupi untuk produksi esok hari"
```

Kalimat ini di Bagian 7 (Metrik Dampak) mengimplikasikan sistem secara aktif memantau dan memberi warning stok. Ini bisa dibaca sebagai fitur inventory alert.

- File: `docs/proposal/PROPOSAL_FULL.md` Bagian 7
- Klasifikasi: **Perlu penyesuaian wording**
- Rekomendasi: Ubah menjadi "Dari data order aktual, kebutuhan bahan besok tidak melebihi stok yang tersedia." Hindari kata "stock warning" karena memberi kesan ada sistem alert terpisah.

---

### 1.3 Marketplace

**Status: ✅ BERSIH**

Tidak ditemukan di manapun. Semua dokumen eksplisit menolak marketplace sebagai non-goal MVP.

---

### 1.4 Real QRIS Settlement

**Status: ✅ BERSIH**

Konsistensi sangat baik di seluruh dokumen:
- PROPOSAL_FULL: "QRIS ini adalah milik merchant — bukan settlement otomatis, bukan integrasi payment gateway"
- DEMO_STORYBOARD: "Ini dummy — bukan settlement otomatis"
- BASELINE_ARCHITECTURE: "Payment — QRIS dummy — Tidak butuh settlement real di MVP"
- PITCH_DECK_OUTLINE: Disclaimer jelas di Slide 9

---

### 1.5 Flash Sale Otomatis

**Status: ✅ BERSIH**

Rescue sale secara konsisten:
- Selalu dilabeli Roadmap Phase 3
- Selalu disebutkan berbasis "opt-in" dan "consent pengguna"
- Tidak pernah diklaim sebagai fitur aktif MVP
- Tidak pernah diklaim "broadcast otomatis"

---

### 1.6 Broadcast Marketing Tanpa Opt-in

**Status: ✅ BERSIH**

Community sourcing dan notifikasi ke pelanggan sekitar tidak pernah diklaim sebagai broadcast otomatis. Selalu ada catatan "consent pengguna", "opt-in", atau "Roadmap".

---

### 1.7 Supplier Pooling Real MVP

**Status: ✅ BERSIH**

Selalu di-label "Roadmap jangka panjang" di semua dokumen. Tidak ada implementasi atau spec detail supplier pooling di docs Phase 0.

---

### 1.8 Route Optimization

**Status: ✅ BERSIH**

Tidak ditemukan di manapun. Fitur pengantaran/logistik tidak ada di scope.

---

### 1.9 ML Prediction Kompleks

**Status: ✅ BERSIH**

AI yang dipakai adalah LLM (OpenAI/Anthropic) untuk structured JSON parsing — bukan ML prediction model khusus. BASELINE_ARCHITECTURE Section 9 eksplisit: "ML prediction kompleks → Roadmap Phase 3."

---

### 1.10 Native Mobile App

**Status: ✅ BERSIH**

BASELINE_ARCHITECTURE Section 9: "Native mobile app — PWA sudah cukup untuk demo." Mobile app selalu Roadmap.

---

### 1.11 Multi-tenant SaaS sebagai MVP

**Status: ✅ BERSIH**

PROPOSAL_FULL Bagian 6 eksplisit: "Single-tenant untuk MVP. Satu instance aplikasi melayani satu bisnis (Katering Bu Rani). Multi-tenant akan diimplementasikan di roadmap."

---

## Bagian 2 — Inkonsistensi Data Demo

Ini bukan scope creep, tapi merupakan **risiko demo** yang serius. Tiga dokumen berbeda menyebut angka yang berbeda untuk skenario demo yang sama.

### FLAG-04 — Angka Demo Tidak Konsisten Antar Dokumen

| Metrik | DEMO_STORYBOARD | USER_JOURNEY | PROPOSAL_FULL / Dummy Data |
|---|---|---|---|
| Total order | 9 | 9 | **11** |
| Dikonfirmasi | 7 | 7 | **5** |
| Belum bayar | 5 | 5 | **4** |
| Total unpaid | Rp 272.000 | Rp 272.000 | **Rp 167.000** |
| Perlu cek | 2 | 2 | **3** |
| Chat berhasil diparse | — | — | 13 dari 15 |

- **DEMO_STORYBOARD** dan **USER_JOURNEY** konsisten satu sama lain → 9 total, 7 confirmed
- **PROPOSAL_FULL** dan **dummy-daily-summary.json** konsisten satu sama lain → 11 total, 5 confirmed
- **PITCH_DECK_OUTLINE Slide 9** menyebut "Reminder disiapkan: 7" — tidak cocok dengan keduanya

**Dampak:** Jika juri membandingkan pitch deck dengan demo langsung, angka tidak cocok → kehilangan kredibilitas.

**Rekomendasi:** Kanonikal satu set angka untuk semua dokumen. Gunakan angka dari `dummy-daily-summary.json` dan `dummy-orders.json` sebagai sumber kebenaran (karena ini yang akan ter-seed ke database):

| Metrik | Angka Kanonikal |
|---|---|
| Total order hari ini | **11** |
| Dikonfirmasi | **5** |
| Draft/menunggu | **6** |
| Belum bayar (dari yang dikonfirmasi) | **4** |
| Total unpaid | **Rp 167.000** |
| Perlu cek (confidence < 0.7) | **3** |
| Chat berhasil diparse | **13 dari 15** |

File yang perlu diupdate angkanya: DEMO_STORYBOARD.md (Scene 7), USER_JOURNEY.md (Scene 7), PITCH_DECK_OUTLINE.md (Slide 9).

---

## Bagian 3 — Klaim Bisnis

### FLAG-05 — Angka Revenue Proyeksi di PROPOSAL_FULL

```
"Jika Kuali berhasil melayani 1.000 UMKM kuliner aktif dengan langganan rata-rata Rp 75.000/bulan,
potensi recurring revenue adalah Rp 75 juta/bulan."
```

**Lokasi:** `docs/proposal/PROPOSAL_FULL.md` Bagian 8

**Analisis:**
- Sudah ada disclaimer "Angka di bawah adalah ilustrasi... bukan proyeksi pendapatan yang dijamin"
- Sudah ada note "perlu divalidasi melalui willingness-to-pay research"
- **Masalah:** Angka spesifik (1.000 UMKM, Rp 75.000/bulan, Rp 75 juta/bulan) bisa dikutip juri untuk menguji validitas. Jika tidak ada data pendukung, ini menjadi titik lemah.

**Klasifikasi: Perlu perhatian (bukan scope creep)**

**Rekomendasi:** Dua opsi untuk LEAD:
1. Hapus angka spesifik, ganti dengan "dengan asumsi penetrasi pasar yang konservatif, potensi recurring revenue layak untuk divalidasi lebih lanjut."
2. Pertahankan tapi tambahkan sumber referensi atau asumsikan lebih konservatif (misal 100 UMKM, bukan 1.000).

### FLAG-06 — Model "Komisi per transaksi" di PROPOSAL_FULL

**Lokasi:** `docs/proposal/PROPOSAL_FULL.md` Bagian 8

**Analisis:**
- Sudah berlabel Roadmap dan terikat pada "dengan QRIS real"
- **Masalah:** Komisi dari transaksi bisa dibaca sebagai Kuali berperan sebagai payment intermediary → mungkin masuk kategori fintech/jasa keuangan yang butuh regulasi OJK

**Status: ✅ RESOLVED — Opsi B dipilih oleh LEAD (2026-05-17)**

Diubah dari "Komisi per transaksi" menjadi "Biaya layanan berbasis usage — biaya layanan berdasarkan volume order yang diproses per bulan." Framing ini netral, tidak menyentuh ranah payment/fintech, dan tidak memerlukan integrasi QRIS settlement.

---

## Bagian 4 — Narrative Safety Review

### 4.1 Framing UMKM

**Status: ✅ BERSIH**

- Tidak ada kata "gaptek" di manapun
- Tidak ada kata "tertinggal" di manapun
- Tidak ada kata "belum digital" dipakai sebagai framing negatif
- Framing positif konsisten: "UMKM sudah aktif berjualan"

### 4.2 Klaim AI

**Status: ✅ BERSIH**

- "AI hanya membuat draft" konsisten di semua dokumen
- "Owner yang memutuskan" konsisten
- Guardrail AI terdokumentasi di BASELINE_ARCHITECTURE dan docs/00

### 4.3 Klaim Impact

**Status: ✅ BERSIH**

Semua dokumen eksplisit melarang:
- "Profit naik pasti"
- "Food waste turun sekian persen"
- "Semua UMKM pasti terbantu"
- "Stok sisa pasti laku"
- "Harga bahan pasti lebih murah"

Dan dummy-impact-metrics.json berisi array `metricsForbiddenInPitch` yang sudah dibangun sebagai safeguard.

### 4.4 Community Sourcing / Rescue Sale

**Status: ✅ BERSIH**

Konsisten Roadmap di:
- docs/00
- PROPOSAL_FULL Bagian 10
- DEMO_STORYBOARD Scene 6C (dengan label "Roadmap — Belum tersedia di MVP")
- BASELINE_ARCHITECTURE Section 9
- PITCH_DECK_OUTLINE Slide 10
- PROPOSAL_OUTLINE Bagian 6

---

## Bagian 5 — Rekomendasi Perubahan

### Prioritas Tinggi (P0 — sebelum demo)

| ID | File | Perubahan | Alasan |
|---|---|---|---|
| CHG-01 | BASELINE_ARCHITECTURE.md | Hapus `reorderPoint` dari entity Ingredient | Bukan kebutuhan MVP, berkesan inventory management |
| CHG-02 | DEMO_STORYBOARD.md Scene 7 | Update angka ke: Total 11, Confirmed 5, Belum bayar 4, Rp 167.000, Perlu cek 3 | Konsistensi dengan dummy data aktual |
| CHG-03 | USER_JOURNEY.md Scene 7 | Samakan angka dengan dummy data aktual | Konsistensi |
| CHG-04 | PITCH_DECK_OUTLINE.md Slide 9 | Samakan angka metrik dengan dummy data; ubah "Reminder disiapkan: 7" menjadi "4" | Konsistensi |

### Prioritas Sedang (P1 — sebelum pitch)

| ID | File | Perubahan | Alasan |
|---|---|---|---|
| CHG-05 | PROPOSAL_FULL.md Bagian 7 | Ubah "0 stock warning" menjadi "Kebutuhan bahan dari order aktual tidak melebihi stok yang tersedia" | Hindari kesan ada fitur stock alert aktif |
| CHG-06 | USER_JOURNEY.md Titik Kritis | Ubah "tampilkan stok vs kebutuhan" menjadi "menampilkan kebutuhan bahan; tandai jika stok kurang" | Wording lebih tepat scope |
| CHG-07 | PROPOSAL_FULL.md Bagian 8 | Pertimbangkan hapus atau moderasi angka Rp 75 juta/bulan | Risiko juri uji validitas |

### Perlu Keputusan Leader (LD)

| ID | File | Isu | Opsi |
|---|---|---|---|
| LD-01 | PROPOSAL_FULL.md Bagian 8 | "Komisi per transaksi" bisa masuk ke area fintech | ✅ Opsi B dipilih — diubah ke "Biaya layanan berbasis usage" |
| LD-02 | BASELINE_ARCHITECTURE.md | `currentStock` di entity Ingredient — apakah produksi planner butuh membandingkan dengan stok? | (A) Pertahankan currentStock, hapus reorderPoint; (B) Hapus keduanya, planner hanya dari order quantity |

---

## Bagian 6 — Konfirmasi Batas MVP

Setelah review menyeluruh, MVP boundary Kuali **TERKONFIRMASI** sebagai berikut:

### Yang Ada di MVP

1. Mock WhatsApp UI (simulasi, bukan WhatsApp API real)
2. AI Order Parser → Structured JSON (LLM-based, bukan ML kompleks)
3. Confidence Score
4. Missing Field Detector
5. Owner Approval / Edit
6. Order Dashboard
7. QRIS Dummy Reminder (bukan settlement)
8. Production Planner (dari order aktual × resep — bukan inventory system)
9. Daily Summary
10. Impact Dashboard (metrik dummy, tidak overclaim)

### Yang Wajib Tidak Ada di MVP

1. ❌ Real WhatsApp Business Cloud API
2. ❌ QRIS settlement / payment gateway
3. ❌ Community sourcing (selalu Roadmap + label jelas)
4. ❌ Rescue sale (selalu Roadmap)
5. ❌ Supplier pooling
6. ❌ Multi-tenant auth / SaaS
7. ❌ Native mobile app
8. ❌ Full inventory (reorderPoint, alert system)
9. ❌ ML forecasting / prediction
10. ❌ Route optimization
11. ❌ Marketplace
12. ❌ Full POS

### Zone Abu-abu (butuh keputusan leader)

- `currentStock` di entity Ingredient: Diperbolehkan untuk perbandingan sederhana di planner (cukup menampilkan "kebutuhan > stok" sebagai informasi), TAPI bukan sebagai fitur inventory management aktif
- Roadmap simulation card di demo: Diperbolehkan HANYA jika label "Roadmap — Belum tersedia di MVP" terlihat jelas (border dashed, warna berbeda, teks disclaimer)

---

## Bagian 7 — Checklist Final untuk Leader

**Scope:**
- [x] Tidak ada fitur POS di manapun
- [x] QRIS konsisten dummy/reminder
- [x] Community sourcing konsisten Roadmap
- [x] Rescue sale konsisten Roadmap
- [x] AI selalu "hanya draft, owner yang putuskan"
- [ ] `reorderPoint` perlu dihapus dari entity (CHG-01)
- [ ] Angka demo perlu disamakan antar dokumen (CHG-02, CHG-03, CHG-04)

**Narasi:**
- [x] Tidak ada kata gaptek/tertinggal
- [x] Tidak ada klaim food waste/profit pasti
- [x] Framing UMKM positif dan konsisten
- [ ] "0 stock warning" perlu diubah phrasing-nya (CHG-05)
- [x] "Komisi per transaksi" diubah ke "Biaya layanan berbasis usage" — Opsi B (LD-01)

**Konsistensi data:**
- [ ] DEMO_STORYBOARD, USER_JOURNEY, PITCH_DECK_OUTLINE perlu disamakan ke angka dummy data kanonikal

---

## Batas Scope — Pernyataan Final

> **Kuali MVP adalah:** Asisten operasional WhatsApp-first yang membantu UMKM kuliner mengubah chat pesanan menjadi draft order (dengan AI parser + confidence score + owner approval), mengingatkan pembayaran via QRIS dummy, menghitung kebutuhan bahan dari order aktual × resep sederhana, dan membuat rekap harian. Satu bisnis, satu dashboard, satu owner.
>
> **Kuali MVP bukan:** POS, inventory system, marketplace, payment gateway, supplier network, chatbot broadcast, multi-tenant SaaS, native app, atau platform ML forecasting.
>
> **Roadmap (bukan klaim MVP):** WhatsApp API real, QRIS settlement, community sourcing, rescue sale, supplier pooling, multi-tenant SaaS, native mobile app.

---

*Review ini dibuat 2026-05-17 oleh AI Coding Agent dalam mode Strict Scope Reviewer.*
*Semua flag perlu dikonfirmasi dan di-resolve oleh LEAD sebelum demo.*
