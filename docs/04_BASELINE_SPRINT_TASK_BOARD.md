# 04 — Baseline Sprint Task Board

> Full task planning untuk Phase 0–3. Fokus detail terbesar: Phase 0 dan Phase 1.

## 0. Warning untuk Tim dan AI Coding Agent

- Jangan rebuild jika file/fitur sudah ada.
- Selalu CHECK sebelum IMPLEMENT.
- Jika menemukan implementasi existing, UPDATE, jangan rewrite.
- Jika task terlalu besar, pecah menjadi subtask.
- Jika menemukan conflict scope, REPORT dulu sebelum lanjut.
- Roadmap features tidak masuk MVP kecuali ada task eksplisit dari leader.
- Default status awal: GREY / NOT_STARTED.
- Task ide final boleh BLUE / IN_REVIEW jika sudah disepakati.

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

## 2. Report Format per Task

```txt
Task ID:
Status:
What was done:
Files changed:
Verification:
Blocker:
Next step:
```

---

# Phase 0 — Proposal Baseline

## Goal

Membuat baseline proposal, pitch, mockup, architecture, data dummy, dan task assignment.

## Deliverables

- Final idea source of truth.
- Proposal outline.
- Mockup low/mid fidelity.
- Architecture diagram.
- Dummy data.
- AI parser schema draft.
- Demo storyboard.
- README awal.
- Decision log.

## Timeline

1–2 hari intensif sebelum development utama.

## Phase 0 Task Board

| ID | Phase | Task | Owner | Role | Status | Priority | Dependencies | Check | Decide | Implement | Verify | Report | Acceptance Criteria |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P0-A01 | 0 | Final idea Kuali | LEAD | LEAD | BLUE / IN_REVIEW | P0 | None | Cek semua ide lama | Kuali = rebrand + core DapurFlow | Tulis docs/00 | Review tim | Decision log | Ide jelas dan tidak super app |
| P0-A02 | 0 | Problem statement final | LEAD/HUSTLER-B | HUSTLER | BLUE / IN_REVIEW | P0 | P0-A01 | Cek narasi aman | Pakai WhatsApp-first framing | Tulis problem | Review bahasa | Update docs | Tidak ada kata gaptek/tertinggal |
| P0-A03 | 0 | Solution statement final | LEAD | LEAD | BLUE / IN_REVIEW | P0 | P0-A02 | Cek MVP scope | Fokus order+planner | Tulis solusi | Review dengan mock flow | Update docs | Solusi ringkas dan realistis |
| P0-A04 | 0 | Persona Bu Rani | HUSTLER-B | HUSTLER | BLUE / IN_REVIEW | P0 | P0-A02 | Cek target user | Buat 1 persona utama | Tulis persona | Review relevansi | Report | Persona usable di deck |
| P0-A05 | 0 | JTBD | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P1 | P0-A04 | Cek pain points | Pilih 5 JTBD | Tulis JTBD | Review | Update docs | JTBD jelas dan praktis |
| P0-B01 | 0 | Validasi nama Kuali manual | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P1 | P0-A01 | Cek Google/domain/social/PDKI | Pakai sementara jika aman | Buat checklist hasil | Review leader | Report risiko | Tidak klaim legal availability |
| P0-B02 | 0 | Final tagline | LEAD/HIPSTER-B | HIPSTER | BLUE / IN_REVIEW | P0 | P0-A01 | Cek opsi tagline | Pakai “Order rapi, produksi siap” | Update docs | Review tim | Decision log | Tagline pendek dan aman |
| P0-C01 | 0 | Competitor comparison ringan | HUSTLER-B | HUSTLER | BLUE / IN_REVIEW | P1 | P0-A03 | Cek WA Business/POS/ChatGPT | Tabel ringkas | Tulis comparison | Review accuracy | Report | Diferensiasi jelas |
| P0-C02 | 0 | Impact metrics baseline | HUSTLER-B | HUSTLER | BLUE / IN_REVIEW | P0 | P0-A03 | Cek metrik aman | Gunakan simulasi rendah hati | Tulis metrics | Review no overclaim | Update docs | Tidak klaim profit/waste pasti |
| P0-C03 | 0 | Proposal outline | HUSTLER-B | HUSTLER | BLUE / IN_REVIEW | P0 | P0-A02 | Cek template proposal | Tentukan section | Tulis outline | Review LEAD | Report | Siap dipindah ke proposal |
| P0-C04 | 0 | Pitch deck outline | LEAD/HUSTLER-B | HUSTLER | BLUE / IN_REVIEW | P1 | P0-C03 | Cek demo flow | 10–12 slide | Tulis outline | Review | Update docs | Slide story jelas |
| P0-D01 | 0 | User journey table | HIPSTER-B | HIPSTER | BLUE / IN_REVIEW | P0 | P0-A04 | Cek persona | Flow 10–12 step | Buat table | Review | Report | Journey bisa jadi demo script |
| P0-D02 | 0 | Low fidelity mockup | HIPSTER-B | HIPSTER | YELLOW / IN_PROGRESS | P0 | P0-D01 | Cek required screens | Mobile-first | Buat mockup | Review leader | Share link | Minimal 6 screen |
| P0-D03 | 0 | UI moodboard | HIPSTER-B | HIPSTER | BLUE / IN_REVIEW | P1 | P0-B02 | Cek brand tone | Pilih warna/status | Buat moodboard | Review | Report | Cocok UMKM, tidak terlalu techy |
| P0-D04 | 0 | UX copy Bahasa Indonesia | HIPSTER-B/HUSTLER-B | HIPSTER | GREY / NOT_STARTED | P1 | P0-D02 | Cek screen | Pakai bahasa sederhana | Tulis copy | Review | Update docs | Copy tidak jargon |
| P0-E01 | 0 | Repo structure awal | LEAD | LEAD | BLUE / IN_REVIEW | P0 | None | Cek repo existing | Next.js structure | Buat folder | Verify tree | Report | Repo siap dikembangkan |
| P0-E02 | 0 | README awal | LEAD | LEAD | BLUE / IN_REVIEW | P0 | P0-E01 | Cek docs | README ringkas | Tulis README | Review | Commit | Anggota bisa start |
| P0-E03 | 0 | Docs index | LEAD | LEAD | BLUE / IN_REVIEW | P0 | P0-E01 | Cek docs files | 8 file docs | Buat docs | Verify | Report | Docs lengkap |
| P0-F01 | 0 | Architecture diagram baseline | LEAD/HACKER-A | HACKER | BLUE / IN_REVIEW | P0 | P0-A03 | Cek stack | Next.js+Supabase+AI | Buat diagram | Review | Update docs | Data flow jelas |
| P0-G01 | 0 | Database entity draft | HACKER-B | HACKER | BLUE / IN_REVIEW | P0 | P0-F01 | Cek modules | Entity minimal | Draft ERD | Review | Report | Cukup untuk MVP |
| P0-G02 | 0 | Prisma schema draft | HACKER-B | HACKER | GREY / NOT_STARTED | P1 | P0-G01 | Cek entity | Draft schema | Tulis schema draft | Review | Report | Belum perlu migration jika repo belum siap |
| P0-H01 | 0 | AI parser schema draft | HACKER-A | HACKER | BLUE / IN_REVIEW | P0 | P0-A03 | Cek sample chat | Tentukan JSON field | Tulis schema | Validate manual | Report | Output structured dan aman |
| P0-H02 | 0 | Prompt guardrail draft | HACKER-A | HACKER | GREY / NOT_STARTED | P1 | P0-H01 | Cek risiko AI | Guardrail no hallucination | Tulis prompt | Review | Report | AI tidak mengarang menu/harga |
| P0-I01 | 0 | Dummy chat data | HUSTLER-B/HACKER-A | HUSTLER/HACKER | BLUE / IN_REVIEW | P0 | P0-H01 | Cek demo story | Buat variasi chat | Tulis JSON | Review | Report | Ada happy dan edge case |
| P0-I02 | 0 | Dummy menu/resep/bahan | HACKER-B | HACKER | BLUE / IN_REVIEW | P0 | P0-G01 | Cek target menu | 8 menu, 10 bahan | Tulis JSON | Review calc | Report | Data bisa dipakai planner |
| P0-L01 | 0 | Demo storyboard | LEAD/HIPSTER-B | LEAD/HIPSTER | BLUE / IN_REVIEW | P0 | P0-D01 | Cek demo 3 menit | Pilih scenes | Tulis storyboard | Dry-run verbal | Report | Aha moment jelas |
| P0-M01 | 0 | Risk mitigation list | LEAD/HUSTLER-B | LEAD/HUSTLER | BLUE / IN_REVIEW | P0 | P0-A03 | Cek risiko | Tabel mitigasi | Tulis risk list | Review | Update docs | Risiko utama tercover |
| P0-N01 | 0 | Decision log awal | LEAD | LEAD | BLUE / IN_REVIEW | P0 | P0-A01 | Cek keputusan | Pakai template | Isi log | Review | Commit | Scope decisions tercatat |
| P0-N02 | 0 | Task assignment awal | LEAD | LEAD | BLUE / IN_REVIEW | P0 | All above | Cek kapasitas tim | Bagi task | Update board | Review tim | Report | Semua role punya task |

## Phase 0 Risks

| Risk | Mitigation |
|---|---|
| Ide terlihat super app | Pitch MVP kecil, roadmap terpisah |
| Mockup terlalu luas | Hanya screen demo utama |
| Nama belum tervalidasi | Gunakan sementara + cek manual |
| Narasi overclaim | Gunakan safe narrative |

---

# Phase 1 — Hackathon MVP Prototype

## Goal

Membangun prototype yang bisa didemo: Next.js app, mock WhatsApp UI, AI parser, dashboard order, QRIS dummy, production planner, daily summary, impact dashboard.

## Deliverables

- App berjalan lokal.
- Mock WhatsApp UI.
- AI parser endpoint.
- Order dashboard.
- Owner approval.
- Payment reminder QRIS dummy.
- Production planner.
- Daily summary.
- Impact dashboard.
- Seed data.
- Demo script.

## Phase 1 Task Board

| ID | Phase | Task | Owner | Role | Status | Priority | Dependencies | Check | Decide | Implement | Verify | Report | Acceptance Criteria |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P1-E01 | 1 | Setup Next.js App Router | LEAD/HACKER-C | HACKER | GREY / NOT_STARTED | P0 | P0-E01 | Cek app existing | Next.js fullstack | Create app | Run dev | Report | App jalan localhost |
| P1-E02 | 1 | Install UI deps | HACKER-C | HACKER | GREY / NOT_STARTED | P0 | P1-E01 | Cek package | Tailwind, shadcn, lucide, sonner | Install deps | Build | Report | Dependencies aman |
| P1-E03 | 1 | Layout shell | HACKER-C/HIPSTER-B | HACKER/HIPSTER | GREY / NOT_STARTED | P0 | P1-E02 | Cek mockup | Bottom nav/mobile | Build layout | Responsive check | Report | Mobile 360px aman |
| P1-F01 | 1 | Prisma setup | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | P0-G02 | Cek prisma folder | Use Prisma | Init schema | db push | Report | Prisma connected |
| P1-F02 | 1 | Supabase DB connection | HACKER-B/LEAD | HACKER | GREY / NOT_STARTED | P0 | P1-F01 | Cek env | Supabase primary | Set DATABASE_URL | Test connection | Report | DB reachable |
| P1-F03 | 1 | Seed data | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | P1-F02/P0-I02 | Cek dummy data | Seed script | Implement seed | Prisma studio | Report | Business/menu/order appear |
| P1-G01 | 1 | API health | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | P1-E01 | Cek API route | /api/health | Implement | curl/browser | Report | Returns success |
| P1-G02 | 1 | API orders list | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | P1-F03 | Cek schema | GET /api/orders | Implement | Test JSON | Report | Orders returned |
| P1-G03 | 1 | API order detail | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | P1-G02 | Cek routes | GET /api/orders/:id | Implement | Test | Report | Detail returned |
| P1-G04 | 1 | API approve order | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | P1-G03 | Cek status enum | PATCH approval | Implement | Test status | Report | Draft→confirmed works |
| P1-G05 | 1 | Payment status API | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | P1-G03 | Cek payment model | Dummy only | Implement | Test | Report | unpaid/paid status works |
| P1-H01 | 1 | AI parse endpoint | HACKER-A | HACKER | GREY / NOT_STARTED | P0 | P0-H01 | Cek prompt/schema | Mock first + real optional | Implement /api/ai/parse-order | Test sample chat | Report | Structured JSON returned |
| P1-H02 | 1 | Missing field detector | HACKER-A | HACKER | GREY / NOT_STARTED | P0 | P1-H01 | Cek sample ambiguous | Simple rules + AI | Implement | Test edge case | Report | Missing fields appear |
| P1-H03 | 1 | Confidence score | HACKER-A | HACKER | GREY / NOT_STARTED | P0 | P1-H01 | Cek criteria | Deterministic heuristic + AI | Implement | Test high/low | Report | Low confidence marked |
| P1-H04 | 1 | Suggested reply | HACKER-A | HACKER | GREY / NOT_STARTED | P1 | P1-H01 | Cek tone | Safe reply | Implement | Review copy | Report | Reply polite and no overclaim |
| P1-I01 | 1 | Mock WhatsApp UI | HACKER-C/HACKER-A | HACKER | GREY / NOT_STARTED | P0 | P1-H01 | Cek mockup | Textarea/send | Build UI | Test send | Report | Chat parses to draft |
| P1-J01 | 1 | Order dashboard page | HACKER-C | HACKER | GREY / NOT_STARTED | P0 | P1-G02 | Cek dummy/API | Cards + status | Build page | Responsive | Report | Orders visible |
| P1-J02 | 1 | Order detail page | HACKER-C | HACKER | GREY / NOT_STARTED | P0 | P1-G03 | Cek data | Detail + approval | Build page | Click approve | Report | Approval flow works |
| P1-J03 | 1 | Payment reminder UI | HACKER-C | HACKER | GREY / NOT_STARTED | P0 | P1-G05 | Cek QRIS image | Dummy QRIS | Build UI | Test copy | Report | Reminder preview shown |
| P1-K01 | 1 | Production planner logic | HACKER-B/HACKER-A | HACKER | GREY / NOT_STARTED | P0 | P1-F03 | Cek recipe data | Formula backend | Implement | Test calc | Report | Ingredients calculated |
| P1-K02 | 1 | Production planner page | HACKER-C | HACKER | GREY / NOT_STARTED | P0 | P1-K01 | Cek API | List ingredients | Build page | Responsive | Report | Planner visible |
| P1-K03 | 1 | Daily summary API | HACKER-B/HACKER-A | HACKER | GREY / NOT_STARTED | P0 | P1-G02 | Cek summary fields | Aggregate + AI wording | Implement | Test | Report | Summary returned |
| P1-K04 | 1 | Daily summary page | HACKER-C | HACKER | GREY / NOT_STARTED | P0 | P1-K03 | Cek API | Summary cards | Build page | Review | Report | Summary displayed |
| P1-K05 | 1 | Impact dashboard | HACKER-C/HUSTLER-B | HACKER/HUSTLER | GREY / NOT_STARTED | P1 | P1-G02 | Cek metrics safe | Simulated metrics | Build page | Review no overclaim | Report | Metrics safe and clear |
| P1-L01 | 1 | Roadmap simulation card | HIPSTER-B/HACKER-C | HIPSTER/HACKER | PURPLE / DEFERRED | P2 | Core demo | Cek scope | Demo only if time | Build card | Label roadmap | Report | Clearly marked simulation |
| P1-M01 | 1 | Manual QA happy path | HUSTLER-B | QA | GREY / NOT_STARTED | P0 | Core flow | Cek demo flow | Test happy path | Run flow | Log bugs | Report | Flow works end-to-end |
| P1-M02 | 1 | Manual QA edge cases | HUSTLER-B | QA | GREY / NOT_STARTED | P1 | P1-H02 | Cek edge chat | Test low confidence | Run tests | Log bugs | Report | Ambiguous chat handled |
| P1-N01 | 1 | Update docs after MVP | HUSTLER-B/LEAD | DOCS | GREY / NOT_STARTED | P1 | MVP tasks | Cek changed scope | Update docs | Edit docs | Review | Report | Docs match app |

---

# Phase 2 — Demo Hardening

## Goal

Menstabilkan demo, memperbaiki bug, membuat fallback, video, pitch Q&A, dan UI polish.

| ID | Phase | Task | Owner | Role | Status | Priority | Dependencies | Check | Decide | Implement | Verify | Report | Acceptance Criteria |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P2-A01 | 2 | Feature freeze | LEAD | LEAD | GREY / NOT_STARTED | P0 | MVP core | Cek unfinished | Freeze scope | Announce freeze | Verify team | Report | Tidak ada fitur baru |
| P2-B01 | 2 | Cached AI response | HACKER-A | HACKER | GREY / NOT_STARTED | P0 | P1-H01 | Cek AI stability | Use fallback JSON | Implement | Test offline | Report | Demo works without AI API |
| P2-B02 | 2 | Seed data final | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | P1-F03 | Cek demo data | Lock seed | Update seed | Verify | Report | Data matches script |
| P2-C01 | 2 | UI polish | HACKER-C/HIPSTER-B | HIPSTER | GREY / NOT_STARTED | P0 | Demo pages | Cek screen | Polish only demo | Implement | Mobile check | Report | Demo screens clean |
| P2-D01 | 2 | Demo script final | LEAD/HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P0 | Core flow | Cek timing | 3 and 5 min script | Write script | Dry-run | Report | Script within time |
| P2-D02 | 2 | Fallback video | HUSTLER-B/HIPSTER-B | QA/HIPSTER | GREY / NOT_STARTED | P0 | P2-D01 | Cek app | Record fallback | Record/edit | Play check | Report | Video ready |
| P2-E01 | 2 | Pitch Q&A | HUSTLER-B/LEAD | HUSTLER | GREY / NOT_STARTED | P1 | Pitch | Cek likely questions | Prepare answers | Write Q&A | Review | Report | Answers safe |
| P2-F01 | 2 | Final demo rehearsal | Semua | ALL | GREY / NOT_STARTED | P0 | All core | Cek setup | Run full demo | Rehearse | Log bugs | Report | Demo stable 2x |

---

# Phase 3 — Full Production Roadmap

## Goal

Mencatat roadmap setelah hackathon. Jangan implement di MVP kecuali diminta.

| ID | Phase | Task | Owner | Role | Status | Priority | Dependencies | Check | Decide | Implement | Verify | Report | Acceptance Criteria |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P3-A01 | 3 | Real WhatsApp Cloud API plan | LEAD/HACKER-A | HACKER | PURPLE / DEFERRED | P2 | MVP stable | Cek policy | Roadmap only | Write plan | Review | Report | Plan documented |
| P3-A02 | 3 | Opt-in customer system | HACKER-B | HACKER | PURPLE / DEFERRED | P2 | Customer model | Cek privacy | Roadmap only | Spec only | Review | Report | Consent flow documented |
| P3-A03 | 3 | Community sourcing roadmap | HUSTLER-B/LEAD | HUSTLER | PURPLE / DEFERRED | P2 | Planner data | Cek ops risk | Roadmap only | Spec only | Review | Report | No MVP commitment |
| P3-A04 | 3 | Rescue sale roadmap | HUSTLER-B | HUSTLER | PURPLE / DEFERRED | P2 | Opt-in | Cek sensitivity | Roadmap only | Spec only | Review | Report | Safe narrative documented |
| P3-A05 | 3 | SaaS pricing roadmap | HUSTLER-B | HUSTLER | PURPLE / DEFERRED | P2 | Business model | Cek WTP | Roadmap only | Spec pricing | Review | Report | Pricing assumptions clear |
