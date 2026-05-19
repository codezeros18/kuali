# 09 — Proposal Refactor Report

> Dibuat: 2026-05-17
> Dibuat oleh: Claude Code (AI Agent) — dokumentasi refactor saja, tidak menyentuh app code.

---

## 1. Folder yang Ditemukan

| Folder | Status |
|---|---|
| `d:\kuali\docs\proposal\` | Ditemukan — berisi 14 file unnumbered + README.md |
| `d:\kuali\docs\proposalnew\` | Ditemukan — berisi 9 file bernomor 00–08 |
| `d:\kuali\docs\archive\` | TIDAK ADA saat audit dimulai — dibuat selama refactor ini |
| `d:\kuali\docs\archive\proposal_legacy\` | TIDAK ADA saat audit dimulai — dibuat selama refactor ini |

---

## 2. File yang Diaudit

### docs/proposal/ (sebelum refactor)

| File | Ukuran | Deskripsi |
|---|---|---|
| BASELINE_ARCHITECTURE.md | 11.6 KB | Arsitektur teknis lengkap: data flow, tech stack, entity, API, AI schema, guardrail |
| COMPETITOR_COMPARISON.md | 4.6 KB | Perbandingan 5-kolom vs WhatsApp Business, POS, ChatGPT, Spreadsheet |
| DEMO_STORYBOARD.md | 6.5 KB | Storyboard demo 3 menit + 5 menit, checklist, fallback, Q&A |
| LOW_FIDELITY_MOCKUP_PLAN.md | 32.8 KB | Blueprint wireframe ASCII 10 screen MVP, acceptance criteria |
| PHASE_0_READINESS_AUDIT.md | 15.8 KB | Audit readiness Phase 0: 13 deliverable, data dummy, scope check |
| PITCH_DECK_OUTLINE.md | 4.8 KB | 12-slide pitch deck dengan narasi, visual hints, catatan presenter |
| PROPOSAL_FULL.md | 21.2 KB | Proposal lengkap 10 bagian: latar belakang, masalah, solusi, teknologi, metrik, bisnis, roadmap |
| PROPOSAL_OUTLINE.md | 6.3 KB | Skeleton 11-section proposal siap dipindah ke template resmi |
| README.md | 3.1 KB | Index folder, urutan baca, aturan folder |
| SCOPE_REVIEW.md | 15.6 KB | Review ketat: 11 item forbidden, inkonsistensi data, klaim bisnis |
| UI_MOODBOARD.md | 11.2 KB | Palet warna, tipografi, komponen, ikon, spacing, UX copy |
| USER_FLOW_UI.md | 25.9 KB | Navigation map, spec per screen, 10-step demo flow, transition table |
| USER_JOURNEY.md | 5.5 KB | User journey 9 langkah, detail per scene, titik kritis |
| USER_PERSONA.md | 4.0 KB | Persona Bu Rani: profil, pain points, JTBD, skenario demo |

### docs/proposalnew/ (sebelum refactor)

| File | Ukuran | Deskripsi |
|---|---|---|
| 00_PROPOSAL_MASTER_KUALI.md | 5.8 KB | Master direction: struktur resmi hackathon, scoring criteria, MVP scope, narrative safety |
| 01_PROPOSAL_CONTENT_DRAFT.md | 11.2 KB | Draft proposal end-to-end: cover sampai lampiran |
| 02_HUSTLER_BUSINESS_MARKET.md | 6.2 KB | Business section: BMC, SWOT, benchmarking, GTM, pricing draft |
| 03_HIPSTER_UX_DESIGN.md | 5.3 KB | UX section: persona, journey, mockup req, UX copy, component list |
| 04_HACKER_TECH_IMPLEMENTATION.md | 7.5 KB | Tech section: AI schema, diagram Mermaid, ERD, API draft |
| 05_DIAGRAMS_AND_MOCKUP_PLAN.md | 4.7 KB | Inventory diagram dan mockup dengan status dan acceptance criteria |
| 06_REFERENCES_AND_RESEARCH_NOTES.md | 4.4 KB | Research questions, data yang perlu dicari, source priority |
| 07_PROPOSAL_TASK_BOARD.md | 8.8 KB | Task board lengkap dengan owner, status, dependensi, acceptance criteria |
| 08_CLAUDE_CODEX_PROPOSAL_EXECUTION.md | 5.8 KB | Panduan agent: aturan wajib, prompt template, definition of done |

---

## 3. Analisis Duplikasi dan Tumpang Tindih

### Konten Tumpang Tindih (proposalnew lebih terstruktur)

| Topik | File Lama (proposal/) | File Baru (proposalnew/) | Keputusan |
|---|---|---|---|
| User Persona | USER_PERSONA.md | 03_HIPSTER_UX_DESIGN.md | Proposalnew lebih ringkas + ada persona tambahan. Legacy diarsipkan. |
| User Journey | USER_JOURNEY.md | 01_PROPOSAL_CONTENT_DRAFT.md + 03_HIPSTER_UX_DESIGN.md | Proposalnew lebih sesuai struktur resmi hackathon. Legacy diarsipkan. |
| Competitor Analysis | COMPETITOR_COMPARISON.md | 02_HUSTLER_BUSINESS_MARKET.md | Proposalnew format lebih rapi. Legacy diarsipkan. |
| Proposal Draft | PROPOSAL_FULL.md + PROPOSAL_OUTLINE.md | 01_PROPOSAL_CONTENT_DRAFT.md | Proposalnew lebih sesuai template Gunadarma Code Week 2.0. Legacy diarsipkan. |
| Tech Architecture | BASELINE_ARCHITECTURE.md | 04_HACKER_TECH_IMPLEMENTATION.md | Proposalnew punya Mermaid diagrams. Legacy diarsipkan. |
| Mockup Plan | LOW_FIDELITY_MOCKUP_PLAN.md | 03_HIPSTER_UX_DESIGN.md + 05_DIAGRAMS_AND_MOCKUP_PLAN.md | Proposalnew lebih modular. Legacy diarsipkan. |
| Scope Review | SCOPE_REVIEW.md | 00_PROPOSAL_MASTER_KUALI.md + 08_CLAUDE_CODEX_PROPOSAL_EXECUTION.md | Legacy punya lebih detail, tapi proposalnew cukup untuk proposal phase. Legacy diarsipkan. |
| UI Moodboard | UI_MOODBOARD.md | Tidak ada di proposalnew | Legacy memiliki unique content (palet warna detail). Diarsipkan — tim perlu merujuk jika butuh panduan visual. |
| Demo Storyboard | DEMO_STORYBOARD.md | Tidak ada di proposalnew | Unique content (demo script 3 & 5 menit). Diarsipkan — relevan untuk Phase 1 demo. |
| Pitch Deck | PITCH_DECK_OUTLINE.md | Tidak ada di proposalnew | Unique content (12-slide outline). Diarsipkan — relevan untuk pitch deck. |
| Readiness Audit | PHASE_0_READINESS_AUDIT.md | Tidak ada di proposalnew | Unique content (audit formal). Diarsipkan. |

### File Unik di proposalnew (tidak ada di proposal/)

| File | Konten Unik |
|---|---|
| 00_PROPOSAL_MASTER_KUALI.md | Scoring criteria hackathon, format PDF resmi (A4, margin, font) |
| 07_PROPOSAL_TASK_BOARD.md | Task board lengkap dengan CHECK-DECIDE-IMPLEMENT-VERIFY-REPORT |
| 08_CLAUDE_CODEX_PROPOSAL_EXECUTION.md | Panduan agent dengan prompt template |
| 06_REFERENCES_AND_RESEARCH_NOTES.md | Research questions sistematis, source priority |

---

## 4. File yang Diarsipkan

Semua 13 file unnumbered berikut dipindah dari `docs/proposal/` ke `docs/archive/proposal_legacy/`:

1. BASELINE_ARCHITECTURE.md
2. COMPETITOR_COMPARISON.md
3. DEMO_STORYBOARD.md
4. LOW_FIDELITY_MOCKUP_PLAN.md
5. PHASE_0_READINESS_AUDIT.md
6. PITCH_DECK_OUTLINE.md
7. PROPOSAL_FULL.md
8. PROPOSAL_OUTLINE.md
9. SCOPE_REVIEW.md
10. UI_MOODBOARD.md
11. USER_FLOW_UI.md
12. USER_JOURNEY.md
13. USER_PERSONA.md

README.md dipertahankan di `docs/proposal/` (masih relevan sebagai index umum).

---

## 5. File yang Disalin / Ditambahkan

Semua 9 file dari `docs/proposalnew/` disalin ke `docs/proposal/`:

1. 00_PROPOSAL_MASTER_KUALI.md
2. 01_PROPOSAL_CONTENT_DRAFT.md
3. 02_HUSTLER_BUSINESS_MARKET.md
4. 03_HIPSTER_UX_DESIGN.md
5. 04_HACKER_TECH_IMPLEMENTATION.md
6. 05_DIAGRAMS_AND_MOCKUP_PLAN.md
7. 06_REFERENCES_AND_RESEARCH_NOTES.md
8. 07_PROPOSAL_TASK_BOARD.md
9. 08_CLAUDE_CODEX_PROPOSAL_EXECUTION.md

File baru dalam refactor ini:
- 09_PROPOSAL_REFACTOR_REPORT.md (dokumen ini)
- 99_FINAL_PROPOSAL_SUBMISSION.md (proposal final Bahasa Indonesia)

---

## 6. Konflik Konten Ditemukan

### Konflik Data Numerik Demo (Sudah didokumentasikan di SCOPE_REVIEW.md legacy)

Tiga set angka berbeda untuk skenario demo yang sama:

| Metrik | DEMO_STORYBOARD (legacy) | PROPOSAL_FULL (legacy) | dummy data |
|---|---|---|---|
| Total order | 9 | 11 | 11 |
| Dikonfirmasi | 7 | 5 | 5 |
| Belum bayar | 5 | 4 | 4 |
| Total unpaid | Rp 272.000 | Rp 167.000 | Rp 167.000 |

**Keputusan:** Gunakan angka dari dummy data (11, 5, 4, Rp 167.000) sebagai kanonikal. File legacy tidak diedit — hanya diarsipkan. File proposalnew tidak menyebut angka spesifik demo sehingga tidak ada konflik aktif.

### Konflik Entitas Database

`reorderPoint` ada di BASELINE_ARCHITECTURE.md (legacy) tapi sudah dihapus per SCOPE_REVIEW.md. File proposalnew (04_HACKER_TECH_IMPLEMENTATION.md) tidak menyertakan `reorderPoint` — sudah bersih.

### Perbedaan Persona Tambahan

- Proposalnew: persona tambahan Kak Dinda (snack box) dan Pak Arif (bakery)
- Legacy: hanya Bu Rani sebagai persona utama, ada Mas Budi dan Kak Rina di DEMO_STORYBOARD
- Keputusan: Proposalnew menjadi referensi aktif. Legacy diarsipkan.

---

## 7. Isu Scope (Roadmap vs MVP)

### Hasil Pemeriksaan

Semua file proposalnew **bersih dari scope creep**:
- Community sourcing selalu disebut roadmap
- Rescue sale selalu disebut roadmap
- QRIS selalu disebut dummy/reminder
- WhatsApp API selalu disebut mock/roadmap
- Tidak ada klaim "AI menggantikan admin"
- Tidak ada kata "gaptek" atau "tertinggal"

### Item yang Perlu Diperhatikan di proposalnew

1. **02_HUSTLER_BUSINESS_MARKET.md** — Pricing table (Rp 49k/99k/149k) bersifat draft dan sudah diberi disclaimer "Willingness to pay harus divalidasi." Aman.
2. **01_PROPOSAL_CONTENT_DRAFT.md** — Proposal tidak menyebut angka revenue spesifik. Lebih aman dari PROPOSAL_FULL.md legacy yang menyebut angka Rp 75 juta/bulan.

---

## 8. Keamanan Narasi

| Item | Status |
|---|---|
| "UMKM gaptek" | TIDAK ADA di proposalnew |
| "UMKM tertinggal" | TIDAK ADA di proposalnew |
| "AI menggantikan admin" | TIDAK ADA — selalu "AI membantu, owner tetap pegang kendali" |
| Klaim food waste turun pasti | TIDAK ADA |
| Klaim profit naik pasti | TIDAK ADA |
| Framing positif UMKM | KONSISTEN — "sudah aktif menggunakan WhatsApp" |
| QRIS diklaim settlement | TIDAK ADA — selalu "dummy/reminder" |
| Community sourcing sebagai MVP | TIDAK ADA — selalu roadmap |

---

## 9. Keamanan Sumber Data

Semua klaim statistik yang belum punya sumber sudah ditandai `[NEED SOURCE]` di file proposalnew. Tidak ada angka yang dikarang. File 06_REFERENCES_AND_RESEARCH_NOTES.md menyediakan panduan sumber yang harus dicari.

---

## 10. Keputusan yang Dibuat

| # | Keputusan | Alasan |
|---|---|---|
| D-01 | Proposalnew menjadi canonical, proposal/ lama diarsipkan | Proposalnew sesuai template resmi Gunadarma Code Week 2.0 |
| D-02 | Semua 9 file proposalnew disalin ke proposal/ | Canonical folder adalah docs/proposal/ |
| D-03 | 13 file unnumbered diarsipkan ke archive/proposal_legacy/ | Konten berguna tapi tidak dalam format yang dipakai |
| D-04 | README.md di proposal/ dipertahankan | Masih relevan sebagai index |
| D-05 | Angka demo kanonikal: 11 order, 5 confirmed, 4 unpaid, Rp 167.000 | Konsisten dengan dummy data aktual |
| D-06 | File legacy TIDAK dihapus | Mungkin ada referensi berguna (UI_MOODBOARD, DEMO_STORYBOARD, SCOPE_REVIEW) |

---

## 11. TODO yang Tersisa

### Sebelum Submission Final

- [ ] Tim mengisi nama tim dan anggota di 01_PROPOSAL_CONTENT_DRAFT.md (masih placeholder)
- [ ] Tim mencari sumber untuk semua [NEED SOURCE] — lihat 06_REFERENCES_AND_RESEARCH_NOTES.md
- [ ] Tim membuat mockup visual (Figma/Canva) mengacu 03_HIPSTER_UX_DESIGN.md
- [ ] Tim membuat diagram Mermaid final mengacu 04_HACKER_TECH_IMPLEMENTATION.md
- [ ] Tim review scoring criteria di 00_PROPOSAL_MASTER_KUALI.md dan pastikan semua bobot terpenuhi
- [ ] Leader review 99_FINAL_PROPOSAL_SUBMISSION.md sebelum export PDF
- [ ] Format proposal ke A4, Times New Roman 11pt, spasi 1.5, margin sesuai aturan hackathon
- [ ] Export PDF: Proposal_NamaTim.pdf

### Referensi Berguna di Archive

Jika tim butuh materi dari file lama, cari di `docs/archive/proposal_legacy/`:
- **UI_MOODBOARD.md** — palet warna, tipografi, komponen (berguna untuk desainer)
- **DEMO_STORYBOARD.md** — skrip demo 3 menit (berguna untuk presentasi)
- **PITCH_DECK_OUTLINE.md** — outline 12 slide (berguna untuk buat deck)
- **SCOPE_REVIEW.md** — analisis mendalam scope MVP (berguna untuk review akhir)
- **LOW_FIDELITY_MOCKUP_PLAN.md** — wireframe ASCII 10 screen (berguna untuk mockup)

---

## 12. Rekomendasi Sebelum Export Proposal

1. **Isi semua placeholder** — nama tim, nama anggota, detail event
2. **Cari semua sumber [NEED SOURCE]** — prioritas: BPS/Kemenkop, Bank Indonesia, DataReportal
3. **Buat mockup minimal 4 screen** — Landing, Mock WhatsApp, Order Detail, Production Planner
4. **Verifikasi Mermaid diagram** di 04_HACKER_TECH_IMPLEMENTATION.md sebelum dimasukkan ke PDF
5. **Review 99_FINAL_PROPOSAL_SUBMISSION.md** sebagai draft proposal final
6. **Jangan klaim angka demo** sebagai hasil nyata — selalu sebut "simulasi dari data dummy"
7. **Cek page limit** — maksimal 20 halaman A4 tidak termasuk lampiran

---

---

## 13. Status Akhir (Selesai)

**Selesai dieksekusi: 2026-05-18**

| Item | Status |
|---|---|
| `docs/proposal/` — folder kanonik | ✅ Bersih — 11 file (00–09 + 99) |
| `docs/proposalnew/` — kosong | ✅ Dikosongkan — isi diarsipkan ke `docs/archive/proposalnew_legacy/` |
| `docs/archive/proposal_legacy/` | ✅ 13 file legacy dari docs/proposal/ lama |
| `docs/archive/proposalnew_legacy/` | ✅ 9 file dari docs/proposalnew/ (backup sebelum dikosongkan) |
| `99_FINAL_PROPOSAL_SUBMISSION.md` | ✅ Lengkap — 7 bab, Bahasa Indonesia, siap review leader |
| Tidak ada file app code disentuh | ✅ Konfirmasi |

---

*Refactor report ini dibuat 2026-05-17, diselesaikan 2026-05-18. Tidak ada file app code (src/, prisma/) yang diubah.*
