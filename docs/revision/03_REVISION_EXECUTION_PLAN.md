# Kuali — Revision Execution Plan

> **Status:** ACTIVE  
> **Tanggal dibuat:** 2026-05-22  
> **Dibuat oleh:** Claude Code — Senior PM / UX Lead / Frontend Architect  
> **Sumber:** docs/revision/kuali_revision_docs/README.md, 01_MOCKUP_REVISION_PLAN.md, 02_PROPOSAL_REVISION_PLAN.md, audit repo lengkap  
> **Versi:** 1.0

---

## 0. Positioning Final (Terkunci)

> **"Kuali adalah workflow engine untuk UMKM kuliner pre-order berbasis WhatsApp yang mengubah chat pesanan menjadi order siap proses dan rencana produksi harian."**

Ini adalah satu-satunya positioning yang digunakan di seluruh proposal, mockup, demo, dan narasi tim. Jangan melebar dari ini.

---

## 1. Tujuan Revisi

| # | Tujuan | Alasan |
|---|---|---|
| 1 | Purge scope yang tidak masuk MVP | Tim dan reviewer merasa Kuali terlihat seperti super app |
| 2 | Tambahkan Mode Sederhana vs Mode Standar | Feedback UMKM mikro: dashboard terlalu ramai |
| 3 | Ganti "Company Profile" → "Profil Usaha" | Lebih ramah UMKM mikro, tidak terasa seperti korporat |
| 4 | Konsistenkan data hero order di semua halaman | Inkonsistensi angka merusak kepercayaan juri |
| 5 | Perbaiki typo dan copy yang tidak aman | "Belum Payar", istilah teknis, framing yang bisa salah tafsir |
| 6 | Pisahkan MVP dari Roadmap secara visual dan naratif | Roadmap tidak boleh terlihat seperti fitur aktif |
| 7 | Selaraskan proposal dengan prototype | Proposal menyebut Supabase; prototype pakai SQLite |
| 8 | Persiapkan screenshot untuk proposal final | Proposal butuh screenshot prototype yang sudah direvisi |

---

## 2. Batasan Keras (Do-Not-Build List)

Tidak ada yang berikut boleh masuk ke kode, demo, atau proposal sebagai MVP:

- Age-based dashboard / registrasi meminta umur
- Community sourcing / belanja bareng
- Supplier pooling
- Rescue sale / flash sale
- Real WhatsApp Cloud API
- Real QRIS / payment settlement
- Marketplace / multi-tenant SaaS
- Full POS / full inventory management
- Route optimization
- Auth production-grade (multi-user, role, permission)
- GCP / production cloud architecture
- Dashboard builder / custom widget drag-drop

---

## 3. Roadmap-Only (Boleh Disebutkan, Tidak Boleh Di-demo)

Item berikut boleh ada di bagian Roadmap proposal dan about page, tetapi **harus diberi label eksplisit "Roadmap — belum tersedia di MVP"**:

- Real WhatsApp Business Cloud API
- Customer opt-in list
- Community sourcing / belanja bareng
- Rescue sale berbasis consent
- SaaS subscription multi-tenant
- Supplier pooling

---

## 4. Temuan Audit Repo

### 4.1 Scope Risks (harus dipurge atau re-label)

| Lokasi | Masalah | Tindakan |
|---|---|---|
| `src/lib/dummy-data.ts:396` | Teks roadmap "belanja bareng" muncul di dummy data | Pastikan hanya muncul di RoadmapCard dengan label jelas |
| `src/lib/dummy-data.ts:405` | "rescue sale" dalam copy dummy | Pastikan label roadmap terpasang |
| `docs/proposal/04_HACKER_TECH_IMPLEMENTATION.md` | Menyebut "Supabase PostgreSQL" tapi implementasi pakai SQLite | Update tech stack di proposal |
| `docs/proposal/04_HACKER_TECH_IMPLEMENTATION.md` | Menyebut "Recharts, Zod, React Hook Form" tapi tidak ada di package.json | Selaraskan |

### 4.2 UX Risks (harus diperbaiki)

| Lokasi | Masalah | Tindakan |
|---|---|---|
| `src/app/dashboard/page.tsx:95` | Typo "Belum Payar" | Ganti → "Belum Bayar" |
| `src/app/dashboard/page.tsx:139` | Greeting bisa muncul "kamu" jika user null | Hardcode "Bu Rani" untuk demo |
| `src/lib/dummy-data.ts:93,105,122` | Semua tanggal hardcoded ke Mei 2025 (sudah lewat) | Update ke 2026 atau relative |
| `src/lib/dummy-data.ts:122` | Kak Rina `paymentStatus: "paid"` — tapi hero order seharusnya "Belum Bayar" | Sesuaikan dengan keputusan hero order |
| Seluruh app | Tidak ada Mode Sederhana / Mode Standar | Tambahkan toggle + simple view |
| Seluruh app | Tidak ada halaman Profil Usaha | Tambahkan atau rename About |
| `src/app/production/page.tsx` | Semua bahan 100% sufficient — terlalu sempurna untuk demo | Buat satu bahan "Hampir Habis", satu "Perlu Beli" |

### 4.3 Data Consistency Issues

| Data | Saat Ini | Target |
|---|---|---|
| Hero order | Kak Rina = paid (parsedOrders) | Kak Rina = unpaid (hero demo unpaid) |
| Dashboard unpaid | Rp 167,000 (dari DB seed) | Harus konsisten dengan dummy-data.ts |
| Dates | Mei 2025 | Update ke 2026 |
| Production planner | 7 bahan semua CUKUP | Minimal 1 HAMPIR HABIS, 1 PERLU BELI |
| Order list | Ord-001 s/d ord-007 (7 orders) | Konsisten dengan target 4 order yang jelas |

### 4.4 Yang Sudah Baik (Jangan Diubah)

- NARRATIVE_SAFE constants di `src/lib/constants.ts` — semua frasa aman
- RoadmapCard sudah label "Belum tersedia di MVP"
- AI parser MENU_CATALOG guardrails
- `about/page.tsx` roadmap items sudah diberi label NOT MVP
- Tidak ada kata "gaptek", "menggantikan admin", "food waste pasti turun"
- Demo flow intro→parse→qris→production→impact→roadmap berjalan

---

## 5. Hero Order (Terkunci untuk Semua Halaman)

Gunakan data ini secara konsisten di semua halaman demo:

```
Customer    : Kak Rina
Pesanan     : 20× Nasi Box Ayam
Total       : Rp 500.000
Status      : Draft → Dikonfirmasi
Payment     : Belum Bayar
Tanggal     : Jumat, 23 Mei 2026
Jam         : 10.00
```

Dan satu edge case untuk demo low-confidence:

```
Customer    : Bu Tini
Pesanan     : ? (varian belum dikonfirmasi)
Total       : Rp 0 (harga belum bisa dihitung)
Confidence  : 45%
Status      : Perlu Cek
Missing     : menu, harga, tanggal, jam, pembayaran
```

---

## 6. Sprint Order Eksekusi

```
Sprint 0 — Scope Purge & Simplification     ← LAKUKAN PERTAMA
Sprint 1 — Audit & Gap Analysis
Sprint 2 — Proposal Revision
Sprint 3 — Mockup Revision (Mode Sederhana/Standar + Profil Usaha)
Sprint 4 — Dashboard Data Consistency Fix
Sprint 5 — Demo Flow Polish
Sprint 6 — Mermaid Diagram Refresh
Sprint 7 — Proposal + Mockup Alignment
Sprint 8 — Screenshot Guide & Final Review
Sprint 9 — Final Proposal Review / Export Prep
```

---

## 7. Sprint Detail

---

### Sprint 0 — Scope Purge & Aggressive Simplification

**Tujuan:** Pastikan tidak ada feature scope creep yang masuk ke kode atau proposal sebelum revisi dimulai.

**Files:**
- `src/app/about/page.tsx`
- `src/lib/dummy-data.ts` (roadmap section)
- `docs/proposal/04_HACKER_TECH_IMPLEMENTATION.md`
- `docs/proposal/99_FINAL_PROPOSAL_SUBMISSION.md`

**Tasks:**
- [ ] Audit semua komponen — pastikan roadmap items **tidak terlihat aktif**
- [ ] Pastikan RoadmapCard selalu menampilkan badge "Belum tersedia di MVP"
- [ ] Update `about/page.tsx` jika ada fitur roadmap yang terlihat seperti MVP
- [ ] Hapus atau re-label referensi "belanja bareng", "rescue sale", "supplier pooling" di dummy data agar jelas ini roadmap
- [ ] Tambahkan disclaimer `// Roadmap only` di dummy-data.ts pada bagian roadmap items

**Acceptance Criteria:**
- [ ] Tidak ada roadmap item yang bisa diklik atau terlihat aktif di UI
- [ ] Semua roadmap item memiliki label eksplisit
- [ ] `npm run build` tetap pass

---

### Sprint 1 — Revision Audit & Gap Analysis

**Tujuan:** Dokumen gap antara revision plan dan kondisi repo saat ini.

**Output:** `docs/revision/04_AUDIT_GAP_ANALYSIS.md`

**Tasks:**
- [ ] Cek setiap acceptance criteria di `01_MOCKUP_REVISION_PLAN.md` — centang mana yang sudah done
- [ ] Cek setiap acceptance criteria di `02_PROPOSAL_REVISION_PLAN.md` — centang mana yang sudah done
- [ ] Identifikasi file mana yang paling banyak perlu diubah
- [ ] Buat priority order: HIGH / MEDIUM / LOW per item

**Acceptance Criteria:**
- [ ] Gap analysis document dibuat
- [ ] Semua acceptance criteria dari kedua revision plan dicek statusnya
- [ ] List HIGH priority items ≤ 10 items

---

### Sprint 2 — Proposal Revision

**Tujuan:** Update docs proposal agar selaras dengan positioning final dan UX inclusivity.

**Files:**
- `docs/proposal/99_FINAL_PROPOSAL_SUBMISSION.md` ← utama
- `docs/proposal/03_HIPSTER_UX_DESIGN.md`
- `docs/proposal/04_HACKER_TECH_IMPLEMENTATION.md`
- `docs/proposal/02_HUSTLER_BUSINESS_MARKET.md`

**Tasks:**
- [ ] Tambahkan subbab Mode Sederhana / Mode Standar di bagian UX
- [ ] Tambahkan penjelasan kenapa tidak berdasarkan umur
- [ ] Update tech stack: ganti Supabase → SQLite (prototype), ganti Recharts/Zod/React Hook Form dengan yang ada di package.json
- [ ] Update value proposition ke versi baru
- [ ] Update problem statement ke versi yang lebih kuat
- [ ] Tambahkan Profil Usaha explanation
- [ ] Update competitor differentiation (tambahkan kolom Mode Sederhana)
- [ ] Update SWOT (tambahkan Strength: Mode Sederhana)
- [ ] Update roadmap — pastikan community sourcing dll hanya ada di roadmap
- [ ] Update impact measurement — hapus overclaim, ganti dengan usability metric
- [ ] Update Data Minimization & Inclusive UX section
- [ ] Buat `docs/proposal/17_PROPOSAL_REVISION_REPORT.md`

**Acceptance Criteria:**
- [ ] Tech stack di proposal sesuai dengan `package.json`
- [ ] Mode Sederhana / Standar ada di bagian UX
- [ ] Tidak ada umur sebagai syarat personalisasi
- [ ] Roadmap tidak terlihat sebagai MVP
- [ ] Impact claim tidak ada % yang tidak berdasar

---

### Sprint 3 — Mockup Revision (Mode Sederhana/Standar + Profil Usaha)

**Tujuan:** Tambahkan Mode Sederhana ke dashboard dan buat Profil Usaha section.

**Files:**
- `src/app/dashboard/page.tsx` ← utama
- `src/app/about/page.tsx` atau buat `src/app/profile/page.tsx`
- `src/components/kuali/AppShell.tsx` (nav item update)
- `src/lib/dummy-data.ts` (tambahkan profileData jika belum ada)

**Tasks:**
- [ ] Tambahkan localStorage-based mode toggle: `kuali_display_mode` = `"simple" | "standard"`
- [ ] Buat komponen `SimpleDashboard` dengan layout:
  - Card "Pesanan Perlu Dicek" (tombol besar, jumlah, CTA → /orders)
  - Card "Pelanggan Belum Bayar" (total amount, CTA → reminder)
  - Card "Bahan untuk Besok" (jumlah bahan perlu disiapkan, CTA → /production)
  - Card "Rekap Hari Ini" (ringkasan chat, CTA → /summary)
  - Tanpa grafik, tanpa tabel, tanpa metric card confidence
- [ ] Toggle "Ganti Tampilan" di dashboard header (persists ke localStorage)
- [ ] Mode Standar = dashboard yang sudah ada (perbaiki typo dan data saja)
- [ ] Default mode = Sederhana untuk demo pertama kali
- [ ] Buat atau update halaman Profil Usaha:
  - Nama usaha: Katering Bu Rani
  - Jenis usaha: Catering rumahan
  - Area: Kelapa Dua, Depok
  - WhatsApp: 08XX-XXXX-XXXX
  - Menu aktif: 8 menu
  - Mode tampilan: Sederhana / Standar (toggle)
  - Status: Data simulasi prototype
  - QRIS dummy thumbnail
  - Label: "Mode demo — tidak membutuhkan akun asli"

**Acceptance Criteria:**
- [ ] Dashboard Mode Sederhana tampil tanpa grafik
- [ ] Dashboard Mode Standar tampil dengan grafik dan tabel
- [ ] Toggle mode berfungsi dan persistent (localStorage)
- [ ] Profil Usaha ada dan dapat diakses dari nav
- [ ] Tidak ada input umur
- [ ] `npm run build` pass

---

### Sprint 4 — Dashboard Data Consistency Fix

**Tujuan:** Sinkronkan semua angka, tanggal, dan status di seluruh halaman.

**Files:**
- `src/lib/dummy-data.ts`
- `src/app/dashboard/page.tsx`
- `src/app/orders/page.tsx`
- `src/app/orders/[id]/page.tsx`
- `src/app/production/page.tsx`
- `src/app/summary/page.tsx`

**Tasks:**

**dummy-data.ts:**
- [ ] Update semua tanggal dari 2025 → 2026
- [ ] Hero order Kak Rina (chat-003): ubah `paymentStatus: "paid"` → `"unpaid"` (sesuai hero order yang "Belum Bayar")
- [ ] Revisi `orders` array: gunakan 4-5 order yang bervariasi (1 confirmed, 1 needs_check, 2 draft) bukan 7 order
- [ ] Tambahkan Kak Rina sebagai entry utama yang prominent di orders list
- [ ] Revisi `productionPlan`: ubah agar minimal 1 bahan `"low"` dan 1 `"insufficient"`
  - Contoh: Ayam kebutuhan 4 kg stok 4.5 kg → `"low"` (hampir habis)
  - Box makanan kebutuhan 22 pcs stok 18 pcs → `"insufficient"` (perlu beli)

**dashboard/page.tsx:**
- [ ] Ganti `"Belum Payar"` → `"Belum Bayar"` (line 95)
- [ ] Ganti `user?.name ?? "kamu"` → `user?.name ?? "Bu Rani"` untuk demo
- [ ] Pastikan unpaidAmount di dummy-data konsisten dengan yang ditampilkan

**orders/page.tsx:**
- [ ] Pastikan Kak Rina muncul sebagai order utama (Draft atau Confirmed, Belum Bayar)
- [ ] Pastikan Bu Tini muncul sebagai Perlu Cek dengan confidence 45%
- [ ] Kurangi duplikasi nama (hindari 3 Dinda)

**orders/[id]/page.tsx:**
- [ ] Jika order confidence ≥ 85% dan missingFields kosong → JANGAN tampilkan warning
- [ ] Jika ada missingFields → tampilkan warning dengan confidence < 65%
- [ ] Tambahkan note: "AI hanya membuat draft. Owner tetap menyetujui sebelum order masuk produksi."

**production/page.tsx:**
- [ ] Pastikan production plan mengandung status yang bervariasi (tidak semua CUKUP)
- [ ] Hindari unit yang aneh (1.2 butir telur, dll) — gunakan unit bulat yang masuk akal

**summary/page.tsx:**
- [ ] Sinkronkan metrik dengan dashboard:
  - 15 chat masuk, 13 berhasil dibaca AI
  - Rp yang belum bayar sesuai actual
- [ ] Ganti copy tidak aman: "Keandalan sistem rendah" → "1 order perlu konfirmasi tambahan"
- [ ] Tambahkan note: "Angka ini berasal dari data simulasi demo, bukan klaim bisnis nyata."

**Acceptance Criteria:**
- [ ] Semua tanggal tahun 2026
- [ ] Tidak ada "Belum Payar" (typo)
- [ ] Kak Rina konsisten: Belum Bayar di semua halaman
- [ ] Production plan punya minimal 1 HAMPIR HABIS dan 1 PERLU BELI
- [ ] Confidence dan missingFields tidak konflik
- [ ] Angka dashboard konsisten dengan orders dan summary

---

### Sprint 5 — Demo Flow Polish

**Tujuan:** Pastikan alur demo `/demo` berjalan mulus dari intro sampai done.

**Files:**
- `src/app/demo/page.tsx`

**Tasks:**
- [ ] Pastikan semua 7 step berjalan: intro → parse → qris → production → impact → roadmap → done
- [ ] Fix reject path: setelah "Tolak" di ParsedOrderCard, tampilkan pesan "Order ditolak. Pilih percakapan lain." dan reset parsedOrder setelah 2 detik
- [ ] Demo production step: ganti dummy import dengan data yang updated (setelah Sprint 4)
- [ ] Pastikan roadmap step tidak terlihat seperti fitur aktif
- [ ] Pastikan NARRATIVE_SAFE constants digunakan di semua callout
- [ ] Test flow mobile + desktop

**Acceptance Criteria:**
- [ ] Semua 7 step berjalan tanpa dead end
- [ ] Reject path ada forward guidance
- [ ] Roadmap step diberi label jelas
- [ ] Tidak ada step yang menampilkan loading infinite

---

### Sprint 6 — Mermaid Diagram Refresh

**Tujuan:** Update diagram untuk mencerminkan scope MVP yang sudah dipurge.

**Files:**
- `docs/proposal/11_MERMAID_DIAGRAMS.md`

**Tasks:**
- [ ] DIA-01 Use Case: Pastikan tidak ada use case roadmap yang terlihat aktif
- [ ] DIA-04 System Architecture: Ganti Supabase → SQLite, hapus GCP dari diagram utama
- [ ] DIA-07 Roadmap Architecture: Pastikan terpisah jelas dari diagram MVP
- [ ] Tambahkan Mode Sederhana ke DIA-01 jika relevan (sebagai feature, bukan aktor)
- [ ] Re-export SVG jika ada perubahan

**Acceptance Criteria:**
- [ ] Tech stack di diagram sesuai dengan implementasi nyata
- [ ] Roadmap architecture terisolasi dari MVP architecture
- [ ] Tidak ada GCP atau Supabase di diagram utama MVP

---

### Sprint 7 — Proposal + Mockup Alignment

**Tujuan:** Pastikan semua screenshot yang akan masuk proposal sudah mewakili mockup yang sudah direvisi.

**Tasks:**
- [ ] Buat daftar screenshot yang dibutuhkan (lihat Sprint 8)
- [ ] Pastikan setiap section di proposal sudah menggambarkan UI yang akan ada di mockup
- [ ] Update `docs/proposal/05_DIAGRAMS_AND_MOCKUP_PLAN.md` dengan list mockup yang direvisi
- [ ] Pastikan Profil Usaha disebut di proposal dan ada di mockup
- [ ] Pastikan Mode Sederhana disebut di proposal dan ada di mockup

**Acceptance Criteria:**
- [ ] Setiap section proposal yang menyebut fitur → fitur tersebut ada di mockup
- [ ] Tidak ada fitur di mockup yang tidak disebut di proposal

---

### Sprint 8 — Screenshot Guide & Final Review

**Tujuan:** Ambil screenshot dari prototype untuk dimasukkan ke proposal.

**Screenshot yang dibutuhkan (urutan prioritas):**

| # | Halaman | Mode | Catatan |
|---|---|---|---|
| 1 | Landing page | - | Hero section + tagline |
| 2 | Dashboard Mode Sederhana | Mobile | 4 big action cards |
| 3 | Dashboard Mode Standar | Desktop | Full metric cards + table |
| 4 | Mock WhatsApp + AI Parse | Demo | Chat Kak Rina atau Dinda |
| 5 | Parsed Order (happy path) | Demo | Confidence 90%+, no warning |
| 6 | Parsed Order (edge case) | Demo | Bu Tini, confidence 45% |
| 7 | Detail Order + Approval | Orders | Kak Rina, Belum Bayar |
| 8 | QRIS Dummy Reminder | Demo/Summary | Payment reminder card |
| 9 | Production Planner | Production | Mix status: cukup/hampir/perlu |
| 10 | Daily Summary / Impact | Summary | Metrik konsisten |
| 11 | Profil Usaha | Profile | Nama, jenis, area, mode toggle |

**Tasks:**
- [ ] Jalankan `npm run dev`
- [ ] Ambil screenshot tiap halaman (mobile + desktop jika relevan)
- [ ] Simpan di `docs/screenshots/` dengan nama deskriptif
- [ ] Masukkan ke `docs/proposal/99_FINAL_PROPOSAL_SUBMISSION.md` di section Lampiran

**Acceptance Criteria:**
- [ ] 11 screenshot diambil
- [ ] Semua screenshot menampilkan data yang sudah konsisten
- [ ] Tidak ada screenshot yang menampilkan "Belum Payar", tanggal 2025, atau grafik error

---

### Sprint 9 — Final Proposal Review / Export Prep

**Tujuan:** Review final proposal dan siapkan untuk submission.

**Tasks:**
- [ ] Review semua acceptance criteria dari Sprint 0–8
- [ ] Cek proposal tidak ada overclaim (%, "pasti", "selalu")
- [ ] Cek tidak ada kata-kata sensitif: "gaptek", "tertinggal", "menggantikan", "food waste pasti"
- [ ] Cek tech stack di proposal sesuai implementasi
- [ ] Cek roadmap vs MVP boundary jelas
- [ ] Cek screenshot sudah masuk ke proposal
- [ ] Export proposal ke PDF jika diperlukan
- [ ] Update `docs/revision/03_REVISION_EXECUTION_PLAN.md` dengan status DONE

**Acceptance Criteria:**
- [ ] Proposal siap disubmit
- [ ] `npm run build` pass
- [ ] Tidak ada TODO yang tertinggal di proposal teks

---

## 8. Risiko

| Risiko | Kemungkinan | Dampak | Mitigasi |
|---|---|---|---|
| Mode Sederhana jadi terlalu kompleks untuk diimplementasi | Sedang | Tinggi | Buat sebagai static page, bukan sistem mode yang rumit |
| Data consistency fix merusak live API | Rendah | Sedang | Perbaiki dummy-data.ts dulu, lalu pastikan API fallback tetap pakai dummy |
| Proposal jadi terlalu berbeda dari prototype | Sedang | Tinggi | Jalankan Sprint 7 (alignment) sebelum screenshot |
| Sprint 6 (Mermaid) memakan waktu lama | Sedang | Rendah | Prioritaskan DIA-04 (System Architecture) saja, sisanya bisa di-skip |
| SQLite di Vercel tetap gagal | Tinggi | Sedang | Gunakan demo dari localhost saat presentasi |

---

## 9. Bagaimana Plan Ini Menjawab Feedback

### UX Feedback dari UMKM Mikro
**Masalah:** Dashboard terlalu banyak grafik, angka, dan istilah teknis.  
**Jawaban:** Sprint 3 menambahkan Mode Sederhana dengan 4 big action card tanpa grafik. Mode bisa dipilih dan persistent.

### Dashboard Complexity Issue
**Masalah:** Metric card, mini chart, tabel, confidence score, roadmap section semuanya di satu halaman.  
**Jawaban:** Sprint 3 + 4 memisahkan Mode Sederhana (aksi utama) dari Mode Standar (dashboard lengkap). Roadmap dipindahkan ke bawah fold.

### Team Criticism: Over-Scoping
**Masalah:** Kuali terlihat seperti super app dengan terlalu banyak fitur.  
**Jawaban:** Sprint 0 memastikan scope purge dilakukan sebelum semua sprint lain. Positioning final dikunci dan tidak boleh berubah.

### Roadmap Bloat
**Masalah:** Roadmap features (rescue sale, belanja bareng, supplier pooling) terlalu mudah terlihat sebagai MVP.  
**Jawaban:** Sprint 0 + 2 memastikan semua roadmap items berlabel eksplisit. Demo flow tidak menampilkan roadmap sebagai step aktif.

### Architecture Overengineering
**Masalah:** Proposal menyebut Supabase, GCP, n8n, Recharts yang tidak ada di implementasi.  
**Jawaban:** Sprint 2 + 6 update proposal dan diagram untuk mencerminkan stack yang benar-benar digunakan (SQLite, Next.js, Prisma, Framer Motion, Lucide).

---

## 10. Recommended Next Prompt

Setelah plan ini dibuat, jalankan sprint dalam urutan berikut:

**Prompt 1 (Sprint 0 + 4):**
```
You are a Frontend Engineer for Kuali. Execute Sprint 0 (scope purge) and Sprint 4 (data consistency fix) from docs/revision/03_REVISION_EXECUTION_PLAN.md.

Fixes to apply:
1. Fix typo "Belum Payar" → "Belum Bayar" in dashboard/page.tsx
2. Fix greeting "kamu" → "Bu Rani" as fallback in dashboard/page.tsx
3. Update dummy-data.ts: all dates from 2025 → 2026
4. Update dummy-data.ts: chat-003 Kak Rina paymentStatus "paid" → "unpaid"
5. Update productionPlan in dummy-data.ts: set 1 item to "low" and 1 item to "insufficient" with realistic numbers
6. Add // [ROADMAP ONLY] comment on roadmap items in dummy-data.ts
7. Fix confidence/missingFields conflict in orders/[id]/page.tsx

Do NOT add Mode Sederhana yet (that is Sprint 3).
Run npm run build after all fixes.
```

**Prompt 2 (Sprint 3):**
```
You are a Senior Frontend Engineer for Kuali. Execute Sprint 3 (Mode Sederhana/Standar + Profil Usaha) from docs/revision/03_REVISION_EXECUTION_PLAN.md.
```

**Prompt 3 (Sprint 2):**
```
You are a Technical Writer and Senior PM for Kuali. Execute Sprint 2 (Proposal Revision) from docs/revision/03_REVISION_EXECUTION_PLAN.md.
```

---

*Dokumen ini adalah panduan utama revisi Kuali. Semua sprint harus mengacu ke dokumen ini.*
