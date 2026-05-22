# Kuali — Revision Audit Report (Sprint R0)

> **Tanggal:** 2026-05-22  
> **Auditor:** Claude Code — Senior PM / UX Lead  
> **Scope:** Proposal docs, frontend mockup, dashboard, orders, production, summary, dummy data  
> **Output:** Gap analysis sebelum implementasi revisi dimulai  
> **Status:** COMPLETE — siap digunakan sebagai acuan Sprint R1–R9

---

## Legenda Prioritas

| Label | Arti |
|---|---|
| 🔴 MUST FIX | Wajib diperbaiki sebelum demo / submission |
| 🟡 SHOULD FIX | Sebaiknya diperbaiki untuk kualitas demo |
| 🟢 OPTIONAL | Perbaikan kosmetik, bisa skip jika waktu terbatas |
| ⚪ DO NOT CHANGE | Sudah benar, jangan diubah |

---

## 1. Temuan: Copywriting Issues

### 1.1 Typo Kritis

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| C-01 | 🔴 MUST FIX | `src/app/dashboard/page.tsx:95` | **"Belum Payar"** — typo terlihat jelas saat demo | Ganti → `"Belum Bayar"` |

### 1.2 Greeting Tidak Personal

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| C-02 | 🔴 MUST FIX | `src/app/dashboard/page.tsx:137` | `user?.name ?? "kamu"` — fallback "kamu" muncul di demo karena user context bisa null | Ganti fallback → `"Bu Rani"` |

### 1.3 Label AI Yang Membingungkan

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| C-03 | 🟡 SHOULD FIX | `src/app/dashboard/page.tsx:367` | Badge **"Mock AI aktif"** di header — istilah teknis yang bisa membingungkan owner | Ganti → `"Mode Demo aktif"` |
| C-04 | 🟡 SHOULD FIX | `src/components/kuali/DesktopLayout.tsx:120` | **"Mock AI aktif"** di sidebar kiri | Ganti → `"Mode Demo aktif"` |

### 1.4 Copy Yang Mengklaim Terlalu Banyak

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| C-05 | 🔴 MUST FIX | `src/app/demo/page.tsx:661` | **"ekosistem penuh Kuali"** di closing step — overclaim, tidak sesuai positioning | Ganti → `"alur operasional harian Kuali"` |
| C-06 | 🟡 SHOULD FIX | `src/components/landingPage/OverviewSection.tsx:24` | **"Satu ekosistem, semua terpadu"** — bahasa platform/super app | Ganti → `"Satu alur, semua terpadu."` |
| C-07 | 🟡 SHOULD FIX | `src/components/landingPage/OverviewSection.tsx:27` | **"Kuali menangani seluruh alur operasional katering kamu"** — overclaim | Ganti → `"Kuali membantu merapikan alur pesanan WhatsApp — dari chat masuk hingga dapur siap produksi."` |

### 1.5 Copy "Real-time" Yang Tidak Akurat

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| C-08 | 🟡 SHOULD FIX | `src/app/orders/page.tsx:359` | **"Log Real-time"** — prototype tidak real-time, ini data demo | Ganti → `"Log Pesanan"` |
| C-09 | 🟡 SHOULD FIX | `src/components/landingPage/AuthModal.tsx:127` | **"mengelola pesanan aktual hari ini secara real-time"** — false claim untuk prototype | Ganti → `"mengelola pesanan hari ini — data simulasi aktif."` |

### 1.6 Sublabel Yang Merusak Kepercayaan Produk

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| C-10 | 🔴 MUST FIX | `src/app/summary/page.tsx:194` | **"Keandalan sistem rendah"** sebagai sublabel kartu "Perlu Dicek" — membuat Kuali terlihat tidak handal, padahal ini adalah feature (AI butuh review owner) | Ganti → `"AI butuh review owner"` |

---

## 2. Temuan: Data Consistency Issues

### 2.1 Semua Tanggal di dummy-data.ts Sudah Lewat (2025)

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| D-01 | 🔴 MUST FIX | `src/lib/dummy-data.ts:93` | `parsedOrders["chat-001"].deliveryDate = "Besok, 18 Mei 2025"` | Ganti → `"Besok, 23 Mei 2026"` |
| D-02 | 🔴 MUST FIX | `src/lib/dummy-data.ts:105` | `parsedOrders["chat-002"].deliveryDate = "Hari ini, 17 Mei 2025"` | Ganti → `"Hari ini, 22 Mei 2026"` |
| D-03 | 🔴 MUST FIX | `src/lib/dummy-data.ts:122` | `parsedOrders["chat-003"].deliveryDate = "Jumat, 23 Mei 2025"` | Ganti → `"Jumat, 30 Mei 2026"` |
| D-04 | 🟡 SHOULD FIX | `src/lib/dummy-data.ts:341` | `productionSummary.date = "Minggu, 18 Mei 2025"` | Ganti → `"Jumat, 30 Mei 2026"` |
| D-05 | 🟡 SHOULD FIX | `src/lib/dummy-data.ts:355` | `dailySummary.date = "Sabtu, 17 Mei 2025"` | Ganti → `"Kamis, 22 Mei 2026"` |
| D-06 | 🟡 SHOULD FIX | `src/lib/dummy-data.ts:175` | `orders[0].deliveryDate = "Besok, 15:00"` | Ganti → `"Besok, 23 Mei"` |
| D-07 | 🟡 SHOULD FIX | `src/lib/dummy-data.ts:184` | `orders[1].deliveryDate = "Hari ini, 12:00"` | Ganti → `"Hari ini, 12:00"` (relative ok, tapi order number masih 2025) |
| D-08 | 🟡 SHOULD FIX | `src/lib/dummy-data.ts:170,178,186...` | `orderNumber` semua masih `KL-20250517-XXX` | Ganti prefix ke `KL-20260522-XXX` |

### 2.2 Kak Rina paymentStatus Konflik dengan Hero Order

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| D-09 | 🔴 MUST FIX | `src/lib/dummy-data.ts:122` | `parsedOrders["chat-003"].paymentStatus = "paid"` — Kak Rina langsung terlihat "Lunas" padahal hero demo harus "Belum Bayar" agar flow QRIS reminder meaningful | Ganti → `"unpaid"` |
| D-10 | 🔴 MUST FIX | `src/lib/dummy-data.ts:199` | `orders[2] (Kak Rina) paymentStatus = "paid"` — sama | Ganti → `"unpaid"` |

### 2.3 Production Plan — Semua Bahan 100% Sufficient (Tidak Realistis)

*Catatan: Setelah review dummy-data.ts secara lengkap, Kecap Manis (line ~315) sudah `"low"`. Tapi production page yang terlihat di screenshot menampilkan semua CUKUP karena halaman mengambil dari API live (bukan dummy), dan seed data menghasilkan semua sufficient.*

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| D-11 | 🔴 MUST FIX | `src/lib/dummy-data.ts` — `productionPlan` array | Dari 7 bahan, 6 `"sufficient"` dan 1 `"low"` — tidak cukup meyakinkan juri bahwa sistem berguna | Ubah: Tambah 1 `"insufficient"` (Perlu Beli) dan pastikan 1 `"low"` (Hampir Habis) dengan angka yang masuk akal |
| D-12 | 🟡 SHOULD FIX | `prisma/seed.ts` | Jika API production-plan juga semuanya sufficient, seed perlu dikonfigurasi agar ada bahan dengan stok kurang | Update seed data untuk 1–2 bahan dengan stockQty rendah |

### 2.4 dashboardMetrics vs orders Array Tidak Sinkron

| # | Kode | Lokasi | Masalah | Dampak |
|---|---|---|---|---|
| D-13 | 🟡 SHOULD FIX | `src/lib/dummy-data.ts:258-268` | `dashboardMetrics.unpaidAmount = 167000` — tetapi jika menghitung manual dari `orders[]`: Dinda(42k) + Mbak Dewi(78k) + Pak Hendra(110k) + Bu Tini(0) + Nisa(54k) = 284,000 → tidak sinkron | Dashboard dummy vs orders list inconsistent. Pilih satu versi dan konsistenkan. |
| D-14 | 🟡 SHOULD FIX | `src/lib/dummy-data.ts` | `dashboardMetrics.draftPending = 6` tetapi dari orders (7 total): confirmed=3, needs_check=2, draft=1 → tidak cocok | Sesuaikan atau klarifikasi bahwa dummy-data dan DB seed adalah dua sumber data berbeda |

### 2.5 impactMetrics — Klaim Waktu Tanpa Disclaimer

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| D-15 | 🟡 SHOULD FIX | `src/lib/dummy-data.ts:381-382` | `estimatedManualRecapTime: "30–45 menit"` dan `kualiMode: "~5–8 menit"` — klaim efisiensi tanpa validasi lapangan | Pastikan ada disclaimer di halaman bahwa ini adalah estimasi simulasi, bukan hasil pengukuran nyata |

---

## 3. Temuan: UX Accessibility Issues

### 3.1 Mode Sederhana / Mode Standar Belum Ada

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| U-01 | 🔴 MUST FIX | Seluruh app | Tidak ada Mode Sederhana sama sekali | Implementasi Sprint 3: tambahkan toggle di dashboard, buat SimpleDashboard view |
| U-02 | 🔴 MUST FIX | `src/app/dashboard/page.tsx` | Dashboard saat ini adalah satu mode — penuh grafik, metric card, mini chart, tabel | Mode ini harus menjadi "Mode Standar", dengan tambahan Mode Sederhana sebagai default |

### 3.2 Profil Usaha Belum Ada

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| U-03 | 🔴 MUST FIX | Tidak ada file `src/app/profile/` | Tidak ada halaman Profil Usaha sama sekali | Buat `src/app/profile/page.tsx` atau update `src/app/about/page.tsx` |
| U-04 | 🟡 SHOULD FIX | `src/components/kuali/AppShell.tsx` | Nav tidak ada link ke Profil Usaha | Tambahkan nav item setelah Profil Usaha dibuat |

### 3.3 Tidak Ada age-based Logic — Status: BERSIH ✅

Hasil grep: tidak ada mention "lansia", "Gen Z", "age", "umur" di dalam `src/` untuk tujuan personalisasi. **Tidak perlu perubahan.**

---

## 4. Temuan: Scope Risks di Frontend

| # | Kode | Lokasi | Masalah | Fix |
|---|---|---|---|---|
| S-01 | 🔴 MUST FIX | `src/app/demo/page.tsx:661` | "**ekosistem penuh Kuali**" di closing — klaim berlebihan, bertentangan dengan positioning | Ganti teks |
| S-02 | 🟡 SHOULD FIX | `src/components/landingPage/OverviewSection.tsx:24` | "**Satu ekosistem, semua terpadu**" — bahasa platform | Ganti ke "Satu alur, semua terpadu" |
| S-03 | 🟡 SHOULD FIX | `src/lib/dummy-data.ts:390-409` | `roadmapItems` array berisi "Belanja Bahan Bareng" dan "Sisa Stok Opt-in" — label "Roadmap Simulation" ada, tapi tidak ada komentar kode `// [ROADMAP ONLY]` | Tambahkan komentar untuk kejelasan tim |
| S-04 | 🟢 OPTIONAL | `src/app/about/page.tsx:346` | "**Kapabilitas Ekosistem**" sebagai chip label di about page | Bisa diganti ke "Fitur Mendatang" jika dianggap terlalu luas |
| S-05 | 🟢 OPTIONAL | `src/app/about/page.tsx:456` | "Kuali dapat berkembang mendukung **ekosistem kuliner lokal**" | Bisa dipertahankan karena sudah di-frame sebagai roadmap |

---

## 5. Temuan: Proposal Issues

*Beberapa isu sudah diperbaiki di sesi sebelumnya (Sprint Scope Purge). Status tercatat di sini untuk referensi.*

| # | Kode | Lokasi | Masalah | Status |
|---|---|---|---|---|
| P-01 | ✅ DONE | `99_FINAL_PROPOSAL_SUBMISSION.md` | Supabase PostgreSQL di tech table | Sudah diperbaiki |
| P-02 | ✅ DONE | `99_FINAL_PROPOSAL_SUBMISSION.md` | n8n di deployment table | Sudah diperbaiki |
| P-03 | ✅ DONE | `99_FINAL_PROPOSAL_SUBMISSION.md` | GCP di cost structure | Sudah diperbaiki |
| P-04 | ✅ DONE | `99_FINAL_PROPOSAL_SUBMISSION.md` | Roadmap Simulation Card di mockup list | Sudah diperbaiki |
| P-05 | ✅ DONE | `99_FINAL_PROPOSAL_SUBMISSION.md` | Community sourcing di section Manfaat | Sudah diperbaiki |
| P-06 | ✅ DONE | `04_HACKER_TECH_IMPLEMENTATION.md` | Recharts, Zod, React Hook Form | Sudah diperbaiki |
| P-07 | 🔴 MUST FIX | `99_FINAL_PROPOSAL_SUBMISSION.md` §3 | Tidak ada penjelasan Mode Sederhana / Mode Standar di proposal | Tambahkan subbab UX §3.4 |
| P-08 | 🔴 MUST FIX | `99_FINAL_PROPOSAL_SUBMISSION.md` §3 | Tidak ada Profil Usaha di proposal | Tambahkan ke §3.3 atau §4 |
| P-09 | 🟡 SHOULD FIX | `99_FINAL_PROPOSAL_SUBMISSION.md` §3.1 | Persona Bu Rani menyebut usia "30–45 tahun" — usia dipakai sebagai context, tapi perlu dipastikan tidak terlihat seperti age-gating | Tambahkan kalimat "kenyamanan digital berbeda-beda" |
| P-10 | 🟡 SHOULD FIX | `99_FINAL_PROPOSAL_SUBMISSION.md` §2.3 SWOT | Opportunities menyebut "fitur komunitas sourcing sebagai differensiator roadmap" — perlu ditegaskan "roadmap, bukan MVP" | Tambahkan tanda kurung "(roadmap jangka panjang)" |

---

## 6. Temuan: Mode Sederhana / Mode Standar

**Status saat ini: BELUM DIIMPLEMENTASI sama sekali.**

Perbandingan requirement vs kondisi:

| Requirement | Status |
|---|---|
| Toggle Mode Sederhana / Mode Standar | ❌ Belum ada |
| localStorage persistence mode | ❌ Belum ada |
| SimpleDashboard view (4 big action cards) | ❌ Belum ada |
| Mode Standar = dashboard saat ini | ✅ Sudah ada (tinggal wrap) |
| Default mode = Sederhana | ❌ Belum ada |
| Profil Usaha menampilkan mode preference | ❌ Belum ada (halaman belum ada) |
| Explanation di proposal | ❌ Belum ada |

---

## 7. Ringkasan: Recommended Fixes by Priority

### 🔴 MUST FIX (wajib sebelum demo)

| ID | File | Fix |
|---|---|---|
| C-01 | `src/app/dashboard/page.tsx:95` | "Belum Payar" → "Belum Bayar" |
| C-02 | `src/app/dashboard/page.tsx:137` | fallback "kamu" → "Bu Rani" |
| C-05 | `src/app/demo/page.tsx:661` | "ekosistem penuh" → "alur operasional harian" |
| C-10 | `src/app/summary/page.tsx:194` | "Keandalan sistem rendah" → "AI butuh review owner" |
| D-01–D-03 | `src/lib/dummy-data.ts` | Semua tanggal 2025 → 2026 |
| D-08 | `src/lib/dummy-data.ts` | Order number prefix 20250517 → 20260522 |
| D-09 | `src/lib/dummy-data.ts:122` | Kak Rina `paymentStatus: "paid"` → `"unpaid"` |
| D-10 | `src/lib/dummy-data.ts:199` | Kak Rina orders `paymentStatus: "paid"` → `"unpaid"` |
| D-11 | `src/lib/dummy-data.ts` | Production plan: tambah 1 bahan `"insufficient"` |
| U-01 | Dashboard | Implementasi Mode Sederhana / Mode Standar toggle |
| U-03 | App | Buat halaman Profil Usaha |
| P-07 | Proposal | Tambahkan Mode Sederhana/Standar ke §3 UX |
| P-08 | Proposal | Tambahkan Profil Usaha ke proposal |

### 🟡 SHOULD FIX (sebaiknya sebelum screenshot untuk proposal)

| ID | File | Fix |
|---|---|---|
| C-03, C-04 | dashboard, DesktopLayout | "Mock AI aktif" → "Mode Demo aktif" |
| C-06, C-07 | OverviewSection | Hilangkan klaim "ekosistem" dan "seluruh alur" |
| C-08 | orders/page.tsx | "Log Real-time" → "Log Pesanan" |
| C-09 | AuthModal | Hapus "real-time" dari copy |
| D-04–D-07 | dummy-data.ts | Update tanggal di productionSummary dan dailySummary |
| D-12 | prisma/seed.ts | Tambah 1–2 bahan dengan stok kurang |
| D-13, D-14 | dummy-data.ts | Konsistenkan dashboardMetrics dengan orders array |
| D-15 | dummy-data.ts | Tambah disclaimer pada impactMetrics |
| P-09 | Proposal §3.1 | Tambah kalimat inklusivitas di persona Bu Rani |
| P-10 | Proposal §2.3 | Perjelas "(roadmap)" di SWOT Opportunities |

### 🟢 OPTIONAL (skip jika waktu terbatas)

| ID | File | Fix |
|---|---|---|
| S-03 | dummy-data.ts | Tambah `// [ROADMAP ONLY]` comment |
| S-04 | about/page.tsx | Ganti "Kapabilitas Ekosistem" |
| S-05 | about/page.tsx | Review "ekosistem kuliner lokal" |

### ⚪ DO NOT CHANGE

| File | Alasan |
|---|---|
| `src/lib/constants.ts` — NARRATIVE_SAFE | Sudah benar dan digunakan dengan tepat |
| `src/components/kuali/RoadmapCard.tsx` | Sudah berlabel "Belum tersedia di MVP" |
| `src/app/about/page.tsx` — roadmap items | Sudah berlabel NOT MVP, tidak di demo utama |
| `src/app/demo/page.tsx` — step flow | Flow inti sudah benar, hanya perlu fix copy C-05 |
| `src/lib/ai-parser.ts` — guardrails | MENU_CATALOG dan validateOutput sudah solid |
| `src/app/orders/[id]/page.tsx` — logic | Confidence/missing field logic sudah tepat |

---

## 8. Priority Order Implementasi

```
Sprint R1 — Data & Copy Fix (MUST FIX cepat, ~1–2 jam)
  ↓ Fix C-01, C-02, C-05, C-10
  ↓ Fix D-01 s/d D-10 (tanggal 2026, Kak Rina unpaid)
  ↓ Fix D-11 (production plan bervariasi)
  ↓ Run: npm run build — harus pass

Sprint R2 — Proposal Update (MUST FIX P-07, P-08, SHOULD FIX P-09, P-10)
  ↓ Tambahkan Mode Sederhana/Standar ke §3 UX
  ↓ Tambahkan Profil Usaha ke §3
  ↓ Fix SWOT wording

Sprint R3 — Mode Sederhana + Profil Usaha (fitur baru)
  ↓ Tambahkan localStorage toggle
  ↓ Buat SimpleDashboard (4 big action cards)
  ↓ Buat /profile page
  ↓ Update nav

Sprint R4 — SHOULD FIX Copy & Polish
  ↓ Fix C-03, C-04, C-06–C-09
  ↓ Fix D-12–D-15
  ↓ Fix seed.ts jika production plan masih 100% sufficient

Sprint R5 — Screenshot & Final Review
  ↓ Ambil 11 screenshot
  ↓ Masukkan ke proposal
  ↓ Final review
```

---

## 9. Files Likely Affected Per Sprint

| Sprint | Files |
|---|---|
| R1 | `src/lib/dummy-data.ts`, `src/app/dashboard/page.tsx`, `src/app/summary/page.tsx`, `src/app/demo/page.tsx` |
| R2 | `docs/proposal/99_FINAL_PROPOSAL_SUBMISSION.md` |
| R3 | `src/app/dashboard/page.tsx`, new `src/app/profile/page.tsx`, `src/components/kuali/AppShell.tsx` |
| R4 | `src/app/orders/page.tsx`, `src/components/landingPage/OverviewSection.tsx`, `src/components/kuali/DesktopLayout.tsx`, `src/components/landingPage/AuthModal.tsx`, `prisma/seed.ts` |
| R5 | `docs/proposal/99_FINAL_PROPOSAL_SUBMISSION.md` |

---

## 10. VERIFY Checklist

- [x] Audit spesifik dan actionable — setiap item punya file, baris, dan fix yang jelas
- [x] Tidak ada implementasi yang dilakukan di sprint ini — hanya audit
- [x] Tidak ada fitur baru yang diperkenalkan
- [x] Setiap issue menyebut file yang terdampak
- [x] Priority order jelas: MUST FIX → SHOULD FIX → OPTIONAL
- [x] Roadmap features tidak masuk ke must-fix (sudah bersih dari sesi sebelumnya)
- [x] Mode Sederhana/Standar tercatat sebagai MUST FIX di Sprint R3
