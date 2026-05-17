# 07 — Status Report and Decision Log

> File ini dipakai untuk tracking progress, keputusan, blocker, risiko, change request, dan readiness checklist.

## 1. Status Legend

| Status | Arti |
|---|---|
| GREY / NOT_STARTED | Belum dikerjakan |
| YELLOW / IN_PROGRESS | Sedang dikerjakan |
| BLUE / IN_REVIEW | Selesai awal, perlu review leader |
| GREEN / DONE | Selesai dan verified |
| RED / BLOCKED | Terhambat |
| PURPLE / DEFERRED | Ditunda ke roadmap |
| BLACK / DROPPED | Dibuang dari scope |

## 2. Daily Status Template

```txt
Date:
Reporter:
Role:
Yesterday:
Today:
Blocker:
Status:
Files changed:
Need decision from leader:
Next step:
```

## 3. Weekly / Sprint Status Template

```txt
Sprint/Phase:
Date range:
Reporter:
Overall status:
Completed:
In progress:
Blocked:
Deferred:
Dropped:
Major decisions:
Risks:
Next sprint focus:
```

## 4. Decision Log

| Date | Decision | Options Considered | Reason | Owner | Impact | Status |
|---|---|---|---|---|---|---|
| 2026-05-17 | Product name sementara: Kuali | Kuali, DapurFlow, KualiFlow | Kuali lebih lokal dan cocok kuliner | LEAD | Brand/pitch | BLUE / IN_REVIEW |
| 2026-05-17 | Core MVP tetap order operation + production planner | Fusion full vs MVP sempit | MVP sempit lebih feasible | LEAD | Scope | BLUE / IN_REVIEW |
| 2026-05-17 | Mock WhatsApp first | Mock, n8n, Meta API | Demo harus stabil | LEAD/HACKER-A | Tech/demo | BLUE / IN_REVIEW |
| 2026-05-17 | QRIS dummy only | Dummy, real payment, payment gateway | Hindari risiko regulasi | LEAD | Payment | BLUE / IN_REVIEW |
| 2026-05-17 | Community sourcing/rescue sale roadmap | MVP vs roadmap | Terlalu operasional untuk MVP | LEAD | Scope | BLUE / IN_REVIEW |

## 5. Blocker Log

| Date | Blocker | Task ID | Owner | Impact | Options | Decision Needed | Status |
|---|---|---|---|---|---|---|---|
| 2026-05-17 | — | — | — | — | — | — | GREY / NOT_STARTED |

## 6. Risk Log

| Date | Risk | Category | Probability | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|---|
| 2026-05-17 | Scope melebar jadi super app | Product | High | High | Lock MVP layer 1–2 | LEAD | YELLOW / IN_PROGRESS |
| 2026-05-17 | AI salah parsing | Technical | Medium | High | Confidence + owner approval + fallback | HACKER-A | GREY / NOT_STARTED |
| 2026-05-17 | WhatsApp API gagal | Demo | Medium | High | Mock WhatsApp first | HACKER-A/HACKER-C | BLUE / IN_REVIEW |
| 2026-05-17 | Narasi overclaim | Pitch | Medium | High | Safe narrative doc (docs/12_PITCH_NARRATIVE.md) | HUSTLER-B | BLUE / IN_REVIEW |
| 2026-05-17 | Payment dianggap fintech | Regulation | Low | High | QRIS dummy, reminder only | LEAD | BLUE / IN_REVIEW |

## 7. Change Request Log

| Date | Request | Requested By | Reason | MVP/Roadmap | Decision | Owner | Status |
|---|---|---|---|---|---|---|---|
| 2026-05-17 | — | — | — | — | — | — | GREY / NOT_STARTED |

## 8. Scope Change Approval Rule

Scope change wajib approval leader jika:

- Menambah fitur baru.
- Mengubah MVP/roadmap boundary.
- Mengubah stack.
- Mengubah database provider.
- Mengubah API contract besar.
- Menambah real external integration.
- Menambah payment functionality.
- Mengubah pitch positioning.

Template request:

```txt
Scope Change Request
Request:
Reason:
Impact on demo:
Impact on timeline:
Risk:
Alternative:
Recommendation:
Need approval from:
```

## 9. Done Task Report Template

| Task ID | Status | What was done | Files changed | Verification | Blocker | Next step |
|---|---|---|---|---|---|---|
|  | GREEN / DONE |  |  |  |  |  |

## 10. Review Report Template

```txt
Review Report
Task ID:
Reviewer:
Status: APPROVED / NEEDS_REVISION / BLOCKED
What works:
Issues:
Required changes:
Optional suggestions:
Decision:
```

## 11. Demo Readiness Checklist

Core demo:

- [ ] Mock WhatsApp works.
- [ ] AI parser works.
- [ ] Structured JSON visible/logged.
- [ ] Confidence score works.
- [ ] Missing field detector works.
- [ ] Owner approval works.
- [ ] Order dashboard works.
- [ ] QRIS dummy works.
- [ ] Payment reminder preview works.
- [ ] Production planner works.
- [ ] Daily summary works.
- [ ] Impact dashboard works.
- [ ] Low-confidence case works.
- [ ] Roadmap simulation labeled clearly if shown.
- [ ] Fallback video exists.
- [ ] Cached AI response exists.
- [ ] Seed data ready.
- [ ] Pitch script ready.

## 12. Proposal Readiness Checklist

- [x] Product name and tagline ready. — docs/00, README.md
- [x] Problem statement ready. — PROPOSAL_FULL.md Bagian 2
- [x] Solution statement ready. — PROPOSAL_FULL.md Bagian 4
- [x] Target user/persona ready. — docs/proposal/USER_PERSONA.md
- [x] MVP scope ready. — PROPOSAL_FULL.md Bagian 5
- [x] Non-goals ready. — PROPOSAL_FULL.md Bagian 5 (tabel non-goals)
- [x] Tech architecture ready. — docs/proposal/BASELINE_ARCHITECTURE.md
- [x] Impact metrics ready. — PROPOSAL_FULL.md Bagian 7 + data/dummy-impact-metrics.json
- [x] Risk mitigation ready. — PROPOSAL_FULL.md Bagian 9
- [x] Business model draft ready. — PROPOSAL_FULL.md Bagian 8
- [x] Roadmap ready. — PROPOSAL_FULL.md Bagian 10
- [x] Safe narrative checked. — docs/12_PITCH_NARRATIVE.md

## 13. MVP Readiness Checklist

- [ ] App runs locally.
- [ ] Database connected or dummy fallback works.
- [ ] Seed data loaded.
- [ ] Mock WhatsApp available.
- [ ] AI parser endpoint available.
- [ ] Order dashboard available.
- [ ] Approval flow available.
- [ ] Payment reminder dummy available.
- [ ] Production planner available.
- [ ] Daily summary available.
- [ ] Impact dashboard available.
- [ ] Docs updated.
- [ ] Demo script updated.

## 14. Final Submission Checklist

- [ ] Repository link ready.
- [ ] README updated.
- [ ] Progress report ready.
- [ ] Pitch deck exported.
- [ ] Video pitch exported.
- [ ] Demo fallback video ready.
- [ ] All secrets removed from repo.
- [ ] App build tested.
- [ ] Demo tested at least 2 times.
- [ ] Q&A prepared.
- [ ] Narrative safe.
- [ ] MVP/roadmap distinction clear.

## 15. Daily Report Archive

Use this section for copied daily reports.

```txt
Date:
Reporter:
Role:
Yesterday:
Today:
Blocker:
Status:
Files changed:
Need decision from leader:
Next step:
```

---

### Laporan 2026-05-17

```txt
Date: 2026-05-17
Reporter: AI Coding Agent (Claude / claude-sonnet-4-6)
Role: Senior CTO / Technical Writer (Agent) — instruksi dari LEAD
Yesterday: Sesi pertama — tidak ada yesterday
Today: Selesai semua deliverable Phase 0 Baseline dalam satu sesi panjang:
  - Repo setup: README.md, assets/README.md
  - Dummy data: 7 file JSON (chats, menu, ingredients, orders, recipes, daily-summary, impact-metrics)
  - Proposal docs: 11 file di docs/proposal/ (USER_PERSONA, USER_JOURNEY, COMPETITOR_COMPARISON, BASELINE_ARCHITECTURE, PROPOSAL_OUTLINE, PITCH_DECK_OUTLINE, DEMO_STORYBOARD, PROPOSAL_FULL, UI_MOODBOARD, LOW_FIDELITY_MOCKUP_PLAN, USER_FLOW_UI)
  - Pitch narrative: docs/12_PITCH_NARRATIVE.md
  - Status update: docs/07, docs/04 (sesi ini)
Blocker: Tidak ada
Status: BLUE / IN_REVIEW — semua file selesai dibuat, menunggu review LEAD
Files changed: README.md, assets/README.md, data/README.md, data/dummy-chats.json, data/dummy-menu.json, data/dummy-ingredients.json, data/dummy-orders.json, data/dummy-recipes.json, data/dummy-daily-summary.json, data/dummy-impact-metrics.json, docs/proposal/README.md, docs/proposal/USER_PERSONA.md, docs/proposal/USER_JOURNEY.md, docs/proposal/COMPETITOR_COMPARISON.md, docs/proposal/BASELINE_ARCHITECTURE.md, docs/proposal/PROPOSAL_OUTLINE.md, docs/proposal/PITCH_DECK_OUTLINE.md, docs/proposal/DEMO_STORYBOARD.md, docs/proposal/PROPOSAL_FULL.md, docs/proposal/UI_MOODBOARD.md, docs/proposal/LOW_FIDELITY_MOCKUP_PLAN.md, docs/proposal/USER_FLOW_UI.md, docs/12_PITCH_NARRATIVE.md, docs/07_STATUS_REPORT_AND_DECISION_LOG.md, docs/04_BASELINE_SPRINT_TASK_BOARD.md
Need decision from leader: (1) Review docs/proposal/ — konfirmasi apakah semua deliverable siap dimark GREEN. (2) Konfirmasi P0-D02: LOW_FIDELITY_MOCKUP_PLAN.md sudah ada sebagai spec — apakah HIPSTER-B diminta lanjut ke Figma atau pakai ASCII mockup saja untuk hackathon?
Next step: HIPSTER-B buat mockup Figma berdasarkan LOW_FIDELITY_MOCKUP_PLAN.md (P0-D02); HACKER-B draft Prisma schema (P0-G02); LEAD review semua docs dan mark tasks GREEN atau request revision.
```

## 16. Task Report Archive

Use this section for completed task reports.

| Task ID | Status | What was done | Files changed | Verification | Blocker | Next step |
|---|---|---|---|---|---|---|
| P0-E01 | BLUE / IN_REVIEW | Repo structure: folder root, data/, docs/, docs/proposal/, assets/ dibuat. .env.example tersedia di docs/proposal/BASELINE_ARCHITECTURE.md | README.md, assets/README.md, data/README.md, docs/proposal/README.md | Struktur folder terkonfirmasi ada | Tidak ada | LEAD review, mark GREEN |
| P0-E02 | BLUE / IN_REVIEW | README.md ditulis ulang dari 23 baris menjadi 200+ baris: folder map, tech stack, env vars, MVP boundary table, docs index, team workflow rules | README.md | Dibaca manual, struktur lengkap | Tidak ada | LEAD review |
| P0-E03 | BLUE / IN_REVIEW | Semua docs fase 0 dibuat: 12 file di docs/ level dan docs/proposal/. Index tersedia di docs/proposal/README.md | docs/proposal/README.md + semua file docs/proposal/ | File count terverifikasi | Tidak ada | LEAD review |
| P0-A02 | BLUE / IN_REVIEW | Problem statement final ditulis dalam PROPOSAL_FULL.md Bagian 2: 5 masalah konkret, framing WhatsApp-first, tidak ada kata gaptek/tertinggal | docs/proposal/PROPOSAL_FULL.md | Dibaca manual, bahasa aman | Tidak ada | HUSTLER-B review |
| P0-A03 | BLUE / IN_REVIEW | Solution statement ditulis di PROPOSAL_FULL.md Bagian 4: positioning bukan POS/marketplace, flow diagram ASCII, 4 design principles | docs/proposal/PROPOSAL_FULL.md | Dibaca manual | Tidak ada | LEAD review |
| P0-A04 | BLUE / IN_REVIEW | Persona Bu Rani lengkap: tabel profil, kondisi harian, 7 pain points, 6 JTBD, kebiasaan digital, apa yang Kuali berikan | docs/proposal/USER_PERSONA.md | File dibaca, semua field ada | Tidak ada | HIPSTER-B jadikan acuan mockup |
| P0-B02 | BLUE / IN_REVIEW | Tagline final "Order rapi, produksi siap." terdokumentasi di README.md dan docs/00 | README.md | Muncul di README header | Tidak ada | LEAD konfirmasi |
| P0-C01 | BLUE / IN_REVIEW | Competitor comparison: 5 kolom (WhatsApp Business, POS, ChatGPT, Spreadsheet, Kuali), posisi Kuali jelas | docs/proposal/COMPETITOR_COMPARISON.md | Dibaca manual, diferensiasi jelas | Tidak ada | HUSTLER-B pakai di deck |
| P0-C02 | BLUE / IN_REVIEW | Impact metrics baseline + metricsSafeToUseInPitch + metricsForbiddenInPitch array. Semua klaim berlabel simulasi | docs/proposal/PROPOSAL_FULL.md Bagian 7, data/dummy-impact-metrics.json | Tidak ada klaim profit/waste pasti | Tidak ada | HUSTLER-B gunakan array safe |
| P0-C03 | BLUE / IN_REVIEW | Proposal outline 11 bagian + PROPOSAL_FULL.md prose 400 baris Bahasa Indonesia | docs/proposal/PROPOSAL_OUTLINE.md, docs/proposal/PROPOSAL_FULL.md | Semua 10 bagian terisi | Tidak ada | LEAD review keseluruhan |
| P0-C04 | BLUE / IN_REVIEW | Pitch deck outline 12 slide dengan narasi, visual hints, presenter notes | docs/proposal/PITCH_DECK_OUTLINE.md | Dibaca manual, flow 3 menit terpetakan | Tidak ada | HUSTLER-B eksekusi ke slides |
| P0-D01 | BLUE / IN_REVIEW | User journey table 9 langkah (Customer→Owner→System), 8 scene detail, touchpoint risk table | docs/proposal/USER_JOURNEY.md | Flow bisa jadi demo script | Tidak ada | HIPSTER-B jadikan acuan mockup |
| P0-D02 | YELLOW / IN_PROGRESS | LOW_FIDELITY_MOCKUP_PLAN.md selesai: ASCII wireframes 10 screen, design notes, acceptance criteria. Figma actual belum dibuat — menunggu HIPSTER-B | docs/proposal/LOW_FIDELITY_MOCKUP_PLAN.md | Spec tersedia, bisa dieksekusi | Menunggu HIPSTER-B eksekusi Figma | HIPSTER-B buat mockup berdasarkan spec |
| P0-D03 | BLUE / IN_REVIEW | UI moodboard lengkap: palet warna (#E8541A + 11 warna), tipografi, spacing, komponen, ikon Lucide, UX copy, larangan UI | docs/proposal/UI_MOODBOARD.md | Dibaca manual, semua section ada | Tidak ada | HIPSTER-B/HACKER-C gunakan sebagai acuan |
| P0-F01 | BLUE / IN_REVIEW | Architecture diagram: data flow ASCII, tech stack table, 10 database entity, 11 API endpoint, AI parser JSON schema, UI routes, deployment plan | docs/proposal/BASELINE_ARCHITECTURE.md | Dibaca manual, data flow jelas | Tidak ada | HACKER-A/B gunakan sebagai baseline |
| P0-G01 | BLUE / IN_REVIEW | Database entity draft: 10 entity (Business, Customer, Menu, Ingredient, Recipe, RecipeIngredient, Order, OrderItem, PaymentReminder, DailyProductionPlan) di BASELINE_ARCHITECTURE.md | docs/proposal/BASELINE_ARCHITECTURE.md | Entity cukup untuk MVP | Tidak ada | HACKER-B lanjut ke P0-G02 Prisma schema |
| P0-H01 | BLUE / IN_REVIEW | AI parser schema draft: input/output JSON, guardrails (tidak invent harga/menu/status), confidence score logic | docs/proposal/BASELINE_ARCHITECTURE.md | Schema divalidasi manual dengan sample chat | Tidak ada | HACKER-A implementasi di P1-H01 |
| P0-I01 | BLUE / IN_REVIEW | 15 dummy chats: happy_path, typo_informal, ambiguous, inquiry_not_order, cancellation, dll. Setiap entry punya parseHint | data/dummy-chats.json | 15 record, variasi ada | Tidak ada | HACKER-A gunakan untuk test parser |
| P0-I02 | BLUE / IN_REVIEW | dummy-menu.json (8 menu + resep tertanam), dummy-ingredients.json (12 bahan termasuk ing-011 Tahu & ing-012 Gula Aren), dummy-recipes.json (8 resep standalone dengan productionCalcExample) | data/dummy-menu.json, data/dummy-ingredients.json, data/dummy-recipes.json | Kalkulasi produksi diverifikasi manual | Tidak ada | HACKER-B gunakan untuk seed |
| P0-L01 | BLUE / IN_REVIEW | Demo storyboard: 3-menit core (7 scene) + 5-menit plus (2 scene extra), pre-demo checklist, fallback plan, Q&A table | docs/proposal/DEMO_STORYBOARD.md | Dry-run verbal terverifikasi di PITCH_NARRATIVE | Tidak ada | HUSTLER-B/LEAD dry-run fisik |
| P0-M01 | BLUE / IN_REVIEW | Risk mitigation: 4 kategori risiko (product, technical, demo, regulation, narasi) di PROPOSAL_FULL.md Bagian 9 dan Risk Log di docs/07 | docs/proposal/PROPOSAL_FULL.md Bagian 9, docs/07 | Risiko utama tercover | Tidak ada | LEAD review |
| P0-N01 | BLUE / IN_REVIEW | Decision log: 5 keputusan utama tercatat dengan tanggal 2026-05-17, owner, reason, status | docs/07_STATUS_REPORT_AND_DECISION_LOG.md | Log terisi | Tidak ada | LEAD review dan mark GREEN |
| P0-N02 | BLUE / IN_REVIEW | Task assignment: semua task Phase 0 diupdate dari GREY ke status sesuai progress. P0-D02 IN_PROGRESS, 5 task tetap GREY karena belum dikerjakan | docs/04_BASELINE_SPRINT_TASK_BOARD.md | Board diupdate sesi ini | Tidak ada | LEAD review assignment |
