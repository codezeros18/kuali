# 06 — Codex / Claude Execution Guide

> File ini adalah instruksi khusus untuk AI coding agent seperti Claude Code / Codex. Tujuannya agar agent bisa membantu tanpa keluar scope.

## 1. Cara Membaca Project

Sebelum coding, AI agent wajib membaca file sesuai task:

| Task Type | Files to Read |
|---|---|
| General setup | `docs/00_FINAL_IDEA_KUALI.md`, `docs/02_LEADER_SETUP_AND_HANDOFF.md`, `docs/04_BASELINE_SPRINT_TASK_BOARD.md` |
| Frontend | `docs/00_FINAL_IDEA_KUALI.md`, `docs/04_BASELINE_SPRINT_TASK_BOARD.md`, `docs/05_FULL_MVP_PRODUCTION_PLAN.md` |
| Backend | `docs/05_FULL_MVP_PRODUCTION_PLAN.md`, `docs/02_LEADER_SETUP_AND_HANDOFF.md` |
| AI automation | `docs/00_FINAL_IDEA_KUALI.md`, `docs/05_FULL_MVP_PRODUCTION_PLAN.md` |
| Docs/pitch | `docs/00_FINAL_IDEA_KUALI.md`, `docs/01_BASELINE_PROPOSAL_PHASE.md`, `docs/07_STATUS_REPORT_AND_DECISION_LOG.md` |
| QA | `docs/04_BASELINE_SPRINT_TASK_BOARD.md`, `docs/07_STATUS_REPORT_AND_DECISION_LOG.md` |

## 2. Aturan Sebelum Coding

Always:

1. Inspect existing files first.
2. Identify what already exists.
3. Do not rebuild existing work.
4. Confirm task scope.
5. Implement in small batch.
6. Verify with acceptance criteria.
7. Report changed files and next steps.

## 3. Aturan CHECK Existing Files

Sebelum implementasi:

- Cek folder structure.
- Cek apakah file target sudah ada.
- Cek apakah component/API/model sudah ada.
- Cek dependency/package.
- Cek apakah ada konflik dengan docs.
- Cek apakah task termasuk MVP atau roadmap.

Jika sudah ada implementasi:

- Update secara minimal.
- Jangan rewrite total.
- Jangan delete tanpa instruksi eksplisit.

## 4. Aturan Jangan Rebuild

Dilarang:

- Menghapus dan membuat ulang project tanpa instruksi.
- Mengganti architecture tanpa report.
- Mengganti DB provider tanpa approval.
- Mengubah UI framework tanpa approval.
- Mengganti mock WhatsApp dengan WAHA/Meta tanpa task eksplisit.
- Menambah fitur roadmap ke MVP.

## 5. Aturan Jangan Keluar Scope

MVP hanya:

- Mock WhatsApp UI.
- AI order parser.
- Structured output.
- Confidence score.
- Missing field detector.
- Owner approval.
- Order dashboard.
- Payment reminder QRIS dummy.
- Menu/resep sederhana.
- Production planner.
- Daily summary.
- Impact dashboard.

Jangan implement:

- Full POS.
- Full inventory.
- Marketplace.
- Real QRIS settlement.
- Supplier pooling real.
- Flash sale otomatis.
- Broadcast marketing.
- Native mobile app.
- Route optimization.

## 6. Small Batch Implementation Rule

Satu prompt = satu batch kecil.

Contoh batch baik:

- “Implement Dashboard page using dummy data.”
- “Create Prisma schema only.”
- “Implement `/api/ai/parse-order` only.”
- “Add StatusBadge component only.”

Contoh batch buruk:

- “Build full app.”
- “Implement all backend and frontend.”
- “Create WhatsApp real integration and payment.”

## 7. Report Setelah Task

AI agent wajib report:

```txt
Task completed:
Files changed:
What was implemented:
How to verify:
Known limitations:
Next recommended step:
```

## 8. Prompt Template — Leader Setup

```txt
Read docs/00_FINAL_IDEA_KUALI.md, docs/02_LEADER_SETUP_AND_HANDOFF.md, and docs/04_BASELINE_SPRINT_TASK_BOARD.md.
Check current repository structure first.
Then create only the baseline folder structure and README.
Do not implement features yet.
Do not delete existing files.
After implementation, report changed files and next steps.
```

## 9. Prompt Template — Frontend Task

```txt
Read docs/00_FINAL_IDEA_KUALI.md, docs/04_BASELINE_SPRINT_TASK_BOARD.md, and docs/05_FULL_MVP_PRODUCTION_PLAN.md.
Implement only [PAGE/COMPONENT NAME] using dummy data first.
Check existing components first.
Do not touch backend logic.
Do not add roadmap features.
Use Bahasa Indonesia copy and mobile-first layout.
Report changed files and how to verify.
```

Example:

```txt
Read docs/00, docs/04, docs/05. Implement only mock WhatsApp UI and dashboard shell using dummy data. Check existing components first. Do not touch backend logic.
```

## 10. Prompt Template — Backend Task

```txt
Read docs/05_FULL_MVP_PRODUCTION_PLAN.md and docs/02_LEADER_SETUP_AND_HANDOFF.md.
Implement only [API/MODULE NAME].
Check existing prisma folder and API routes first.
Do not modify frontend.
Do not change database provider.
Use Prisma and Zod validation if relevant.
Report changed files and test instructions.
```

Example:

```txt
Read docs/05. Implement only Prisma schema and seed data. Check existing prisma folder first. Do not modify frontend.
```

## 11. Prompt Template — AI Automation Task

```txt
Read docs/00_FINAL_IDEA_KUALI.md and docs/05_FULL_MVP_PRODUCTION_PLAN.md.
Implement only /api/ai/parse-order with structured JSON.
Use mocked response fallback controlled by USE_MOCK_AI.
Do not create production planner yet.
Do not let AI invent menu or price.
Report changed files and sample response.
```

## 12. Prompt Template — Database Task

```txt
Read docs/05_FULL_MVP_PRODUCTION_PLAN.md.
Check existing prisma/schema.prisma first.
Implement only the requested models or seed data.
Do not change provider unless explicitly instructed.
Do not remove existing models.
Report migration/seed commands and verification steps.
```

## 13. Prompt Template — Pitch/Docs Task

```txt
Read docs/00_FINAL_IDEA_KUALI.md and docs/01_BASELINE_PROPOSAL_PHASE.md.
Update only [DOC FILE/SECTION].
Keep narrative safe: do not say UMKM gaptek/tertinggal, do not overclaim profit/food waste.
Do not change product scope.
Report changed sections.
```

## 14. Prompt Template — QA Task

```txt
Read docs/04_BASELINE_SPRINT_TASK_BOARD.md and docs/07_STATUS_REPORT_AND_DECISION_LOG.md.
Check current demo flow against the checklist.
Report missing items, bugs, and blockers.
Do not modify code unless explicitly requested.
```

## 15. Prompt Template — Bugfix

```txt
Check existing implementation related to [BUG].
Fix only the bug described.
Do not refactor unrelated files.
Do not change UI/architecture outside the fix.
Report root cause, files changed, and how to verify.
```

## 16. Prompt Template — Refactor

```txt
Check existing files first.
Refactor only [TARGET AREA] for readability/duplication.
Do not change behavior.
Do not change API contract.
Do not add features.
Report before/after and verification.
```

## 17. Prompt Template — Status Update

```txt
Review current files and docs relevant to [PHASE/TASK].
Create a status report using docs/07_STATUS_REPORT_AND_DECISION_LOG.md template.
Do not modify code.
List completed items, blockers, and recommended next tasks.
```

## 18. Definition of Done for AI Agent

A task is done only if:

- Existing files were checked.
- Scope was followed.
- Changed files are listed.
- Acceptance criteria are met.
- Verification steps are provided.
- No roadmap feature was added accidentally.
- No secret/API key was exposed.
- No architecture change happened without report.

## 19. What NOT To Do

Never:

- Delete or rewrite files unless explicitly instructed.
- Add features outside assigned task.
- Change architecture without reporting.
- Implement roadmap features in MVP unless requested.
- Integrate real WhatsApp API unless task specifically says so.
- Implement real payment settlement.
- Replace mock WhatsApp with WAHA/Meta without approval.
- Change database provider without approval.
- Commit API keys.
- Add broad refactors during feature tasks.
- Rename product/brand without approval.
- Use unsafe narrative in docs.

## 20. Final Instruction for Agents

If unsure, stop and report:

```txt
I found ambiguity/conflict:
- Issue:
- Files checked:
- Options:
- Recommended decision:
- Need leader approval before implementing.
```
