# Kuali — Scope Purge & Aggressive Simplification Report

> **Tanggal:** 2026-05-22  
> **Dibuat oleh:** Claude Code — Hackathon Strategy Reviewer & Product Simplification Lead  
> **Status:** COMPLETE  
> **Trigger:** Tim menerima feedback kritis bahwa Kuali masih terlalu broad dan berisiko terlihat over-scoped.

---

## 0. Positioning Final (Terkunci)

> **"Kuali adalah workflow engine untuk UMKM kuliner pre-order yang mengubah chat WhatsApp menjadi order siap proses dan rencana produksi harian."**

Bukan: platform, super app, SaaS, ekosistem UMKM, marketplace, atau komunitas sourcing.

---

## 1. Apa yang Dihapus dari Demo Utama

### 1.1 Fitur yang Di-purge dari Demo

| Fitur | Status Sebelumnya | Status Setelah Purge | Alasan |
|---|---|---|---|
| Community sourcing / belanja bareng | Disebut di section "Manfaat MVP" | Dipindah ke roadmap appendix saja | Bukan bagian alur operasional inti |
| Supplier pooling | Disebut di SWOT Opportunities | Tetap di SWOT, diperjelas "roadmap" | Jangan tampil di demo |
| Rescue sale / flash sale | Disebut di roadmap section | Tetap di roadmap, tidak ada perubahan | Sudah clean |
| Roadmap Simulation Card (MCK-10) | Listed sebagai item mockup wajib ke-12 | DROPPED — BLACK | Tidak perlu muncul di layar demo |
| Supabase PostgreSQL sebagai tech stack utama | Listed di tech overview, diagram, tabel system design | Dihapus dari semua tabel MVP — hanya disebut "roadmap" | Stack aktual adalah SQLite |
| n8n automation | Listed di deployment table | Dihapus dari proposal | Tidak digunakan di prototype |
| GCP deployment | Listed di cost structure dan deployment | Dihapus dari semua tabel MVP | Tidak digunakan di prototype |
| OpenAI/Anthropic di diagram utama | Node aktif di arsitektur diagram | Dihapus dari diagram MVP | Parser aktual adalah mock rule-based |
| Recharts, Zod, React Hook Form | Listed di tech overview | Dihapus dari tech table | Tidak ada di package.json |
| User entity di ERD | Listed sebagai entitas ke-1 | Dihapus — tidak ada di schema.prisma | Single-tenant prototype, tidak ada auth |

### 1.2 Wording yang Diubah

| Sebelum | Sesudah | Lokasi |
|---|---|---|
| "Satu platform melayani banyak UMKM" | "Satu sistem melayani banyak UMKM" | 99_FINAL_PROPOSAL_SUBMISSION.md §5.2 |
| "Vercel/GCP" di cost structure | "Vercel" | §2.1 Business Model Canvas |
| Database (prod roadmap) = Supabase | Database = SQLite via Prisma ORM | §4.4 System Design |
| Deployment: n8n (roadmap) | Dihapus dari tabel | §4.4 System Design |
| Community sourcing di "Manfaat bagi Pengguna" | Diganti note kecil → lihat §5.2 | §1.5 |
| Roadmap Simulation Card = item ke-12 mockup | Diganti dengan catatan tentang Q&A backup | §3.3 |

---

## 2. Apa yang Dipindah ke Roadmap

Semua item berikut **hanya boleh muncul di**:
- Bagian **5.2 Rencana Pengembangan** di proposal
- **Q&A backup** saat juri bertanya
- **DIA-07** dengan header warning eksplisit

| Item | Letak di Roadmap |
|---|---|
| Real WhatsApp Business Cloud API | Roadmap Fase 1 |
| Customer opt-in list | Roadmap Fase 1 |
| Real AI Parser (OpenAI / Anthropic) | Roadmap Fase 1 |
| Auth multi-tenant | Roadmap Fase 1 |
| Community sourcing | Roadmap Fase 2 |
| Supplier pooling berbasis consent | Roadmap Fase 2 |
| Rescue sale opt-in | Roadmap Fase 2 |
| SaaS subscription / freemium | Roadmap Fase 2 |
| GCP production deployment | Roadmap Fase 2 |

---

## 3. Files Updated

| File | Perubahan |
|---|---|
| `docs/proposal/99_FINAL_PROPOSAL_SUBMISSION.md` | 7 perubahan: hapus Supabase dari diagram & tabel, hapus n8n, hapus GCP, pindah community sourcing dari benefits ke note, hapus Roadmap Simulation Card dari mockup list, ganti "platform" → "sistem" |
| `docs/proposal/04_HACKER_TECH_IMPLEMENTATION.md` | Rewrite tech stack table (hapus Recharts, Zod, React Hook Form, Supabase, n8n, GCP); rewrite arsitektur diagram; rewrite ERD (hapus User entity); rewrite API list; rewrite WhatsApp integration table |
| `docs/proposal/05_DIAGRAMS_AND_MOCKUP_PLAN.md` | MCK-10 Roadmap Simulation Card: PURPLE/DEFERRED → BLACK/DROPPED |
| `docs/proposal/11_MERMAID_DIAGRAMS.md` | DIA-07 header ditambahkan warning eksplisit bahwa ini bukan bagian demo utama |
| `docs/revision/03_REVISION_EXECUTION_PLAN.md` | Sudah ada — scope purge tercatat sebagai Sprint 0 |

---

## 4. Files Checked (Not Modified)

| File | Status |
|---|---|
| `src/app/demo/page.tsx` | ✅ Bersih — roadmap card sudah berlabel, tidak ada rescue sale di demo flow |
| `src/app/about/page.tsx` | ✅ Bersih — roadmap items sudah berlabel "NOT MVP" |
| `src/lib/dummy-data.ts` | ⚠️ Roadmap text ada (community sourcing, rescue sale) — perlu tambah comment `// [ROADMAP ONLY]` |
| `src/lib/constants.ts` | ✅ NARRATIVE_SAFE constants semua clean |
| `src/components/kuali/RoadmapCard.tsx` | ✅ Berlabel "Belum tersedia di MVP" |
| `README.md` | ✅ Tidak ada scope issue |
| `docs/proposal/00_PROPOSAL_MASTER_KUALI.md` | ✅ Sudah mendaftar apa yang tidak boleh di-MVP |
| `docs/proposal/09_PROPOSAL_REFACTOR_REPORT.md` | ✅ Sudah mencatat community sourcing = roadmap |
| `docs/proposal/10_FINAL_PROPOSAL_REVIEW.md` | ✅ Sudah verifikasi community sourcing = roadmap |

---

## 5. Remaining Scope Risks

| Risk | Severity | Tindakan yang Direkomendasikan |
|---|---|---|
| `src/lib/dummy-data.ts` roadmap section tidak ada komentar | LOW | Tambahkan `// [ROADMAP ONLY]` comment di Sprint 0 lanjutan |
| Proposal masih menyebut "Supabase (roadmap)" di beberapa kalimat teks biasa (bukan tabel) | LOW | Acceptable — konteksnya sudah jelas roadmap |
| `10_FINAL_PROPOSAL_REVIEW.md` arsitektur diagram masih punya Supabase node | LOW | Hanya dokumen review internal, tidak masuk submission |
| Demo step "roadmap" masih ada di `/demo` | LOW | Sudah berlabel dengan benar — tidak perlu dihapus |
| `03_HIPSTER_UX_DESIGN.md` menyebut MCK-10 Roadmap Simulation Card | LOW | Dokumen internal draft — tidak masuk submission |

---

## 6. Final 3-Minute Demo Flow

Gunakan alur ini secara ketat. Tidak ada roadmap feature yang masuk:

```
[00:00–00:20] Intro — Problem
  "Bu Rani nerima pesanan WA, tapi semua direkap manual."
  Tampilkan: problem visual atau landing page

[00:20–01:00] Chat → AI Parser (40 detik)
  Pilih chat Kak Rina (20 Nasi Box, Jumat, Belum Bayar)
  Klik "Parse dengan AI"
  Tampilkan: ParsedOrderCard — nama, menu, qty, confidence 92%
  → Konfirmasi order

[01:00–01:20] QRIS Dummy Reminder (20 detik)
  Tampilkan: PaymentReminderCard
  "Reminder siap disalin, bukan gateway pembayaran"

[01:20–01:50] Production Planner (30 detik)
  Tampilkan: daftar bahan — mix status CUKUP/HAMPIR HABIS/PERLU BELI
  "Dihitung dari resep aktual, bukan perkiraan"

[01:50–02:20] Daily Summary / Impact (30 detik)
  Tampilkan: metrik hari ini — 13/15 chat diparse, 4 order, Rp167k unpaid

[02:20–02:40] Mode Sederhana (opsional, 20 detik)
  Toggle ke Mode Sederhana di dashboard
  "Untuk owner yang tidak ingin lihat grafik"

[02:40–03:00] Closing
  "Kuali — Order rapi, produksi siap."
  Selesai. Tidak ada roadmap yang disebutkan.
```

**Jika juri bertanya soal roadmap:** Jawab dengan, "Itu ada di rencana pengembangan kami — saat ini fokus kami adalah membuktikan alur inti ini bisa membantu UMKM kuliner pre-order."

---

## 7. Final Pitch Positioning

**Satu kalimat:**
> "Kuali adalah workflow engine untuk UMKM kuliner pre-order yang mengubah chat WhatsApp menjadi order siap proses dan rencana produksi harian."

**Tiga poin utama untuk pitch:**
1. **Problem nyata:** UMKM kuliner sudah aktif di WhatsApp, tapi rekap pesanan masih manual.
2. **Solusi fokus:** Chat masuk → AI baca → draft order → owner konfirmasi → dapur siap produksi.
3. **Defensible MVP:** Mock parser, SQLite, Vercel — cukup untuk membuktikan alur inti dalam hackathon.

**Yang TIDAK disebutkan dalam pitch 3 menit:**
- Community sourcing
- Supplier pooling
- Rescue sale
- Flash sale
- SaaS billing
- GCP
- n8n
- Supabase
- Real WhatsApp API

---

## 8. VERIFY Checklist

- [x] Kuali tidak lagi terlihat seperti super app di proposal
- [x] Demo 3 menit bisa dijelaskan tanpa fitur roadmap
- [x] Roadmap features tidak ditampilkan sebagai MVP aktif
- [x] Tech stack di proposal sesuai dengan implementasi aktual (SQLite, Prisma, Next.js, Framer Motion, Lucide)
- [x] Mode Sederhana/Standar tetap ada sebagai UX improvement (bukan dihapus)
- [x] Tidak ada age-based personalization
- [x] Proposal tetap terlihat ambisius — problem, solution, traction metrics, roadmap vision semua ada
- [x] Tidak ada klaim palsu tentang tech yang belum ada

---

## 9. Recommended Next Task

**Immediate (lakukan sekarang):**
```
Sprint 3 + 4 dari docs/revision/03_REVISION_EXECUTION_PLAN.md:
- Tambahkan Mode Sederhana ke dashboard
- Fix data consistency (typo "Belum Payar", tanggal 2025→2026, Kak Rina paymentStatus)
- Fix production planner dummy data (tambah HAMPIR HABIS dan PERLU BELI)
```

**Setelah itu:**
```
Sprint 8: Ambil screenshot dari prototype yang sudah direvisi
→ Masukkan ke proposal final
```
