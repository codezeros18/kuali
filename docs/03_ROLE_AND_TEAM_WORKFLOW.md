# 03 — Role and Team Workflow

> File ini menjelaskan cara tim 5 orang bekerja tanpa menunggu leader terus-menerus.

## 1. Prinsip Role

Role di hackathon harus fleksibel, tapi ownership harus jelas. Leader boleh memegang semua arah, tetapi task harus tetap bisa didelegasikan.

Prinsip utama:

- Leader Accountable di keputusan penting.
- Anggota Responsible di task yang didelegasikan.
- Semua task harus punya acceptance criteria.
- Semua perubahan scope harus lewat leader.
- Demo lebih penting daripada fitur lengkap.
- Roadmap tidak boleh masuk MVP tanpa approval.

## 2. Label Role

| Label | Pemilik | Fokus |
|---|---|---|
| LEAD | Saya | Product owner, tech lead, integrator, final decision |
| HACKER-A | Saya | AI automation, architecture, integration |
| HACKER-B | Anggota backend/frontend | Backend, database, API |
| HACKER-C | Anggota frontend/backend | Frontend, dashboard, UI implementation |
| HUSTLER-A | Saya | Pitch strategy, positioning, business direction |
| HUSTLER-B | Anggota business/impact | Research, impact, competitor, business model |
| HIPSTER-A | Saya | UX direction, design approval |
| HIPSTER-B | Anggota UI/UX | UI mockup, design system, prototype polish |

## 3. Task Responsibility

| Area | Primary Responsible | Support | Accountable |
|---|---|---|---|
| Product scope | LEAD | HUSTLER-B | LEAD |
| Architecture | HACKER-A | HACKER-B | LEAD |
| Backend/API | HACKER-B | HACKER-A | LEAD |
| Frontend/UI | HACKER-C | HIPSTER-B | LEAD |
| AI parser | HACKER-A | HACKER-B | LEAD |
| Mock WhatsApp | HACKER-C/HACKER-A | HIPSTER-B | LEAD |
| Production planner | HACKER-B | HACKER-A/HACKER-C | LEAD |
| Pitch/deck | HUSTLER-B | HUSTLER-A/HIPSTER-B | LEAD |
| QA/demo | Semua | HUSTLER-B | LEAD |
| Docs | HUSTLER-B | Semua | LEAD |

## 4. Dependency Antar Role

| Role | Bergantung pada | Output untuk Role Lain |
|---|---|---|
| HACKER-B | Schema, API convention | API, DB, seed data |
| HACKER-C | Dummy data, API contract, UI direction | Demo screens |
| HACKER-A | Menu data, sample chat | Parser output, AI fallback |
| HUSTLER-B | Product scope, demo status | Pitch, impact, Q&A |
| HIPSTER-B | UX direction, required screens | Mockup, design system |
| LEAD | Semua progress | Decision, integration, scope control |

## 5. Communication Flow

1. Task dibuat di task board.
2. Owner melakukan CHECK.
3. Jika ada konflik/scope issue, owner REPORT sebelum implementasi.
4. Owner implement small batch.
5. Owner VERIFY dengan acceptance criteria.
6. Owner submit report/PR.
7. Leader review dan merge/rollback.

## 6. Standup Format

```txt
Date:
Name:
Role:
Yesterday:
Today:
Blocker:
Task Status:
Need Decision:
Link PR/Files:
```

## 7. Blocker Format

```txt
BLOCKER
Task ID:
Owner:
Problem:
What I checked:
Options:
Decision needed:
Impact if not solved:
Deadline affected:
```

## 8. Progress Report Format

```txt
PROGRESS UPDATE
Task ID:
Status:
What was done:
Files changed:
Verification:
Blocker:
Next step:
```

## 9. PR Review Format

```txt
PR Title:
Task ID:
Summary:
Files changed:
How to test:
Screenshot/video:
Risks:
Acceptance criteria checklist:
Need leader decision:
```

## 10. Definition of Ready

Task siap dikerjakan jika:

- [ ] Ada Task ID.
- [ ] Ada owner.
- [ ] Ada phase.
- [ ] Ada status.
- [ ] Ada priority.
- [ ] Ada dependencies.
- [ ] Ada CHECK instruction.
- [ ] Ada acceptance criteria.
- [ ] Tidak bertentangan dengan non-goals.

## 11. Definition of Done

Task selesai jika:

- [ ] Output sesuai acceptance criteria.
- [ ] Tidak keluar scope.
- [ ] Tidak merusak demo flow.
- [ ] Sudah diverifikasi manual.
- [ ] Files changed dilaporkan.
- [ ] Blocker/next step jelas.
- [ ] PR/review selesai jika menyentuh code.

## 12. Anti-Scope-Creep Rules

Dilarang tanpa approval leader:

- Menambah real WhatsApp API.
- Menambah real payment settlement.
- Menambah marketplace.
- Menambah full POS.
- Menambah full inventory.
- Menambah community sourcing real.
- Menambah route optimization.
- Mengubah DB provider.
- Mengubah architecture besar.
- Mengubah positioning pitch.

## 13. How to Report Status

Gunakan status:

- GREY / NOT_STARTED
- YELLOW / IN_PROGRESS
- BLUE / IN_REVIEW
- GREEN / DONE
- RED / BLOCKED
- PURPLE / DEFERRED
- BLACK / DROPPED

Update status minimal 1 kali per hari.

## 14. How to Escalate Blockers

Escalate ke leader jika:

- Task butuh keputusan scope.
- API contract berubah.
- Schema DB berubah.
- Ada risiko demo gagal.
- Ada integrasi yang tidak stabil.
- Ada fitur roadmap masuk MVP.
- Ada konflik merge besar.

## 15. Meeting Rules

- Standup maksimal 15 menit.
- Diskusi teknis detail pindah ke thread kecil.
- Decision tidak boleh menggantung lebih dari 30 menit saat sprint.
- Setiap meeting harus menghasilkan next action.
- Jika debat terlalu lama, leader memutuskan.

## 16. Decision Owner

| Keputusan | Owner Final |
|---|---|
| Product scope | LEAD |
| MVP vs roadmap | LEAD |
| Tech stack | LEAD |
| Database schema besar | LEAD |
| API contract | LEAD + HACKER-B |
| AI prompt/guardrail | LEAD/HACKER-A |
| UI direction | LEAD/HIPSTER-A |
| Pitch narrative | LEAD/HUSTLER-A |
| Merge PR besar | LEAD |
| Demo flow final | LEAD |

## 17. RACI Matrix

R = Responsible, A = Accountable, C = Consulted, I = Informed

| Area | LEAD | HACKER-A | HACKER-B | HACKER-C | HUSTLER-B | HIPSTER-B |
|---|---|---|---|---|---|---|
| Product scope | A/R | C | I | I | C | C |
| Pitch narrative | A/R | C | I | I | R | C |
| Research/impact | A/C | I | I | I | R | C |
| UI direction | A/R | I | I | C | C | R |
| Design system | A/C | I | I | C | I | R |
| Frontend | A/C | I | C | R | I | C |
| Backend | A/C | C | R | I | I | I |
| Database | A/C | C | R | I | I | I |
| AI parser | A | R | C | I | I | I |
| WhatsApp mock | A | R/C | C | R | I | C |
| Production planner | A | C | R | C | I | I |
| Daily summary | A | R | C | C | C | I |
| Demo script | A/R | C | I | C | R | C |
| Pitch deck | A | I | I | C | R | R/C |
| QA | A | C | C | C | R | C |
| Deployment | A/R | C | R/C | C | I | I |
| Final integration | A/R | R/C | R/C | R/C | I | I |
