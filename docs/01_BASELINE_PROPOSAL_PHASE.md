# 01 — Baseline Proposal Phase

> Fokus file ini: Phase 0, yaitu baseline proposal dan concept readiness. Jangan mengerjakan full production dari file ini.

## 1. Tujuan Phase 0

PHASE 0 — Baseline Proposal Phase bertujuan membuat fondasi ide, proposal, pitch awal, mockup, arsitektur, dan demo concept. Di fase ini belum perlu full app production. Fokusnya adalah membuat project terlihat jelas, feasible, dan siap dibagi ke anggota tim.

## 2. Output Phase 0

Output wajib:

- Ide final jelas.
- Problem-solution jelas.
- Pitch narrative aman.
- Mockup flow low/mid fidelity.
- Demo storyboard.
- Tech architecture baseline.
- Initial repo/docs.
- Data dummy.
- UI moodboard.
- AI parser concept.
- Sprint planning.
- Risk mitigation list.
- Task assignment awal.

## 3. Deliverables Proposal

| Deliverable | Format | Owner | Status Awal | Acceptance Criteria |
|---|---|---|---|---|
| Final idea summary | Markdown/slide | LEAD | BLUE / IN_REVIEW | Nama, tagline, problem, solution jelas |
| Problem statement | Markdown/slide | HUSTLER-A/B | GREY / NOT_STARTED | Tidak menyinggung UMKM/pemerintah |
| Persona Bu Rani | Markdown/slide | HUSTLER-B | GREY / NOT_STARTED | Ada pain, behavior, need |
| User journey | Diagram/table | HIPSTER-A/B | GREY / NOT_STARTED | Flow customer-owner-system jelas |
| Mockup low fidelity | Figma/Canva/image | HIPSTER-B | GREY / NOT_STARTED | Minimal dashboard, order detail, planner |
| Tech architecture | Diagram + docs | LEAD/HACKER-A | GREY / NOT_STARTED | Stack dan data flow jelas |
| AI parser schema draft | JSON/Markdown | HACKER-A | GREY / NOT_STARTED | Ada input/output JSON |
| Dummy data | JSON/CSV | HACKER-B/HUSTLER-B | GREY / NOT_STARTED | Menu, chat, order, bahan tersedia |
| Proposal outline | Markdown/Docs | HUSTLER-B | GREY / NOT_STARTED | Siap dipindah ke template proposal |
| Demo storyboard | Markdown | LEAD/HIPSTER-B | GREY / NOT_STARTED | Alur 3–5 menit jelas |

## 4. Baseline Mockup Requirement

Mockup minimal:

1. Mock WhatsApp order screen.
2. AI parsing result / draft order card.
3. Owner approval screen.
4. Order dashboard.
5. Payment reminder QRIS dummy preview.
6. Production planner.
7. Daily summary / impact dashboard.
8. Roadmap simulation card: community sourcing atau rescue sale, diberi label “Roadmap Simulation”.

Acceptance criteria:

- Mobile-first 360–430px.
- Bahasa Indonesia.
- Tombol besar.
- Status order jelas.
- Tidak terlihat seperti POS kasir lengkap.
- Tidak menampilkan fitur roadmap sebagai fitur aktif MVP.

## 5. Baseline Pitch Narrative

Narasi utama:

> Banyak UMKM kuliner sudah aktif menggunakan WhatsApp. Tantangannya bukan mereka belum digital, tetapi proses operasional di belakang chat masih sering manual.

Pitch harus menjelaskan:

- Masalah order WhatsApp tersebar.
- Pembayaran perlu dicek manual.
- Bahan produksi masih dihitung pakai perkiraan.
- Kuali membantu membuat draft order, reminder pembayaran, production planner, dan daily summary.
- AI membantu, owner tetap pegang kendali.
- Roadmap belanja bareng/rescue sale bukan MVP.

## 6. Baseline Technical Architecture

Baseline architecture:

```txt
Mock WhatsApp UI
  ↓
Next.js API Route /api/ai/parse-order
  ↓
AI Parser structured JSON
  ↓
Backend validation against menu/recipe data
  ↓
Draft Order + Confidence Score
  ↓
Owner Dashboard
  ↓
Owner Approval
  ↓
QRIS Dummy Reminder + Production Planner + Daily Summary
```

Baseline tech decisions:

- Next.js App Router first.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Supabase PostgreSQL + Prisma.
- Mock WhatsApp first.
- AI parser structured JSON.
- QRIS dummy only.
- n8n optional, not dependency utama.

## 7. Baseline Demo Concept

Demo 3 menit:

1. Problem visual: chat order berantakan.
2. Customer order via mock WhatsApp.
3. AI parser mengubah chat menjadi JSON/order card.
4. Owner approve.
5. Reminder QRIS dummy.
6. Production planner menghitung bahan.
7. Daily summary / impact dashboard.
8. Closing.

Demo plus 5 menit:

- Tambahkan low-confidence case.
- Tambahkan roadmap simulation card: belanja bareng atau rescue sale opt-in.

## 8. Baseline Dummy Data

Data yang wajib disiapkan:

- Business: Katering Bu Rani.
- 8 menu dummy.
- 10 bahan dummy.
- 5 resep sederhana.
- 10 customer dummy.
- 20 order dummy.
- 15 chat dummy, termasuk typo dan ambiguous.
- QRIS dummy image.
- 1 daily summary dummy.
- 1 impact dashboard dummy.

Contoh chat utama:

> “Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya.”

## 9. Baseline Role Task

| Role | Fokus Phase 0 |
|---|---|
| LEAD | Final idea, scope, repo/docs, architecture, task split |
| HACKER-A | AI parser concept, architecture, integration plan |
| HACKER-B | DB entity draft, backend baseline, seed plan |
| HACKER-C | Frontend baseline, UI skeleton plan |
| HUSTLER-B | Problem validation, competitor comparison, impact narrative |
| HIPSTER-B | Mockup, moodboard, design system draft |

## 10. Baseline Risk Checklist

- [ ] Narasi tidak menyebut UMKM gaptek/tertinggal.
- [ ] Belanja bareng tidak diklaim sebagai fitur MVP.
- [ ] Rescue sale tidak diklaim sebagai stok pasti ludes.
- [ ] QRIS hanya dummy/reminder.
- [ ] AI hanya draft, owner approval wajib.
- [ ] Food waste/profit tidak diklaim naik/turun pasti.
- [ ] Mock WhatsApp jelas sebagai demo-safe.
- [ ] Proposal tidak terlihat seperti super app.

## 11. Baseline File/Repo Checklist

- [ ] `README.md`
- [ ] `docs/00_FINAL_IDEA_KUALI.md`
- [ ] `docs/01_BASELINE_PROPOSAL_PHASE.md`
- [ ] `docs/02_LEADER_SETUP_AND_HANDOFF.md`
- [ ] `docs/03_ROLE_AND_TEAM_WORKFLOW.md`
- [ ] `docs/04_BASELINE_SPRINT_TASK_BOARD.md`
- [ ] `docs/05_FULL_MVP_PRODUCTION_PLAN.md`
- [ ] `docs/06_CODEX_CLAUDE_EXECUTION_GUIDE.md`
- [ ] `docs/07_STATUS_REPORT_AND_DECISION_LOG.md`
- [ ] `data/dummy-chats.json`
- [ ] `data/dummy-menu.json`
- [ ] `data/dummy-ingredients.json`
- [ ] `data/dummy-orders.json`

## 12. Baseline Success Criteria

Phase 0 sukses jika:

- Tim bisa menjelaskan Kuali dalam 30 detik.
- Scope MVP jelas dan tidak melebar.
- Ada proposal outline.
- Ada mockup flow.
- Ada architecture diagram.
- Ada dummy data.
- Ada AI parser schema draft.
- Ada task board untuk Phase 1.
- Semua role tahu task pertama.

## 13. Task Board Phase 0

Status default: GREY / NOT_STARTED. Task yang ide final sudah disepakati diberi BLUE / IN_REVIEW.

| Task ID | Task | Owner | Role | Status | Priority | Check | Decide | Implement | Verify | Report | Acceptance Criteria |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P0-001 | Finalisasi nama Kuali | LEAD | LEAD | BLUE / IN_REVIEW | P0 | Cek alternatif nama dan risiko legal | Pakai Kuali sementara | Tulis nama/tagline di docs | Review bersama tim | Catat di decision log | Nama dan tagline disetujui sementara |
| P0-002 | Finalisasi problem statement | LEAD + HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P0 | Cek narasi aman | Gunakan framing WhatsApp-first | Tulis problem final | Tidak ada kata gaptek/tertinggal | Update proposal | Problem statement siap deck |
| P0-003 | Finalisasi pitch positioning | LEAD | LEAD | GREY / NOT_STARTED | P0 | Cek versi DapurFlow vs Kuali | Kuali = rebrand + core DapurFlow | Tulis positioning | Review 30 detik | Laporkan final | Positioning tidak super app |
| P0-004 | Competitor comparison ringan | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P1 | Cek WA Business, POS, ChatGPT | Bandingkan singkat | Buat tabel | Review akurasi | Tambah ke proposal | Ada diferensiasi jelas |
| P0-005 | Buat user persona Bu Rani | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P0 | Cek target user | Pakai persona catering rumahan | Tulis persona | Review relevansi | Simpan docs | Persona punya pain dan JTBD |
| P0-006 | Buat user journey baseline | HIPSTER-B | HIPSTER | GREY / NOT_STARTED | P0 | Cek flow demo | Pakai flow chat→order→planner | Buat table journey | Review dengan LEAD | Update docs | Journey mudah dipahami |
| P0-007 | Mockup low fidelity | HIPSTER-B | HIPSTER | GREY / NOT_STARTED | P0 | Cek required screens | Buat mobile-first | Mock 6–8 screen | Review visual flow | Export screenshot | Mockup siap proposal |
| P0-008 | UI moodboard | HIPSTER-B | HIPSTER | GREY / NOT_STARTED | P1 | Cek tone UMKM | Pilih warna/status | Buat moodboard | Review readability | Laporkan link | Moodboard mobile-friendly |
| P0-009 | Tech architecture diagram | LEAD/HACKER-A | HACKER | GREY / NOT_STARTED | P0 | Cek stack final | Next.js fullstack first | Buat diagram teks/visual | Review feasibility | Update docs | Diagram punya data flow jelas |
| P0-010 | Database entity draft | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | Cek module MVP | Pakai entity minimal | Draft ERD | Review schema | Simpan docs | Entity cukup untuk MVP |
| P0-011 | AI parser JSON schema draft | HACKER-A | HACKER | GREY / NOT_STARTED | P0 | Cek sample chat | Tentukan field output | Buat schema JSON | Test manual 3 chat | Laporkan format | JSON tidak mengarang harga |
| P0-012 | Dummy chat data | HUSTLER-B/HACKER-A | HUSTLER/HACKER | GREY / NOT_STARTED | P0 | Cek demo story | Buat 15 chat | Tulis JSON/MD | Review variasi | Simpan data | Ada happy + edge case |
| P0-013 | Dummy menu/resep/bahan | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | Cek target kuliner | Pilih 8 menu | Buat data dummy | Validasi calculation | Simpan data | Data cocok production planner |
| P0-014 | Proposal outline | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P0 | Cek guidebook/template | Tentukan section | Buat outline | Review LEAD | Update docs | Outline siap dipindah ke proposal |
| P0-015 | Pitch deck outline | LEAD + HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P1 | Cek demo story | 10–12 slide | Buat outline | Review flow | Simpan docs | Slide logic jelas |
| P0-016 | Demo storyboard | LEAD + HIPSTER-B | LEAD/HIPSTER | GREY / NOT_STARTED | P0 | Cek demo scenes | 3–5 menit | Buat storyboard | Dry-run verbal | Update docs | Aha moment jelas |
| P0-017 | README awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | Cek repo existing | Buat README ringkas | Tulis setup/docs index | Review | Commit | README bantu anggota start |
| P0-018 | Repo structure awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | Cek file existing | Tentukan folder | Buat folder docs/data | Verify tree | Report | Repo siap dikerjakan |
| P0-019 | Decision log awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | Cek keputusan existing | Pakai template | Isi initial decisions | Review | Update log | Ada catatan scope |
| P0-020 | Risk mitigation list | LEAD + HUSTLER-B | LEAD/HUSTLER | GREY / NOT_STARTED | P0 | Cek risiko utama | Pilih mitigasi | Buat tabel | Review | Update docs | Risiko tidak disembunyikan |
| P0-021 | Task assignment awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | Cek kapasitas tim | Bagi task role | Isi task board | Review tim | Publish | Semua punya task pertama |
