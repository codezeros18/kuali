# 08 — Claude / Codex Proposal Execution Guide

Dokumen ini mengatur cara Claude Code / Codex bekerja pada folder proposal agar tidak keluar scope.

## Cara Menggunakan Folder Proposal

Folder `docs/proposal/` adalah source of truth untuk Babak 1 Proposal Submission.

Agent harus membaca file proposal sebelum mengubah apapun.

Prioritas baca:

1. `00_PROPOSAL_MASTER_KUALI.md`
2. `01_PROPOSAL_CONTENT_DRAFT.md`
3. `07_PROPOSAL_TASK_BOARD.md`
4. Role-specific file sesuai task:
   - Hustler: `02_HUSTLER_BUSINESS_MARKET.md`
   - Hipster: `03_HIPSTER_UX_DESIGN.md`
   - Hacker: `04_HACKER_TECH_IMPLEMENTATION.md`
   - Diagram/mockup: `05_DIAGRAMS_AND_MOCKUP_PLAN.md`
   - Research: `06_REFERENCES_AND_RESEARCH_NOTES.md`

## Aturan Wajib Agent

- Always inspect existing files first.
- Do not delete or rewrite existing docs unless explicitly asked.
- Do not implement production features in proposal phase.
- Do not add roadmap features as MVP.
- Do not claim unsupported statistics.
- Mark unsupported data as `[NEED SOURCE]`.
- Do not use WAHA/Meta/real QRIS as required implementation for proposal.
- Keep mock WhatsApp as baseline.
- Report changed files and next steps.
- Update status board after working.

## CHECK Existing Files Rule

Sebelum implementasi:

- Cek apakah file sudah ada.
- Cek apakah section sudah ada.
- Cek apakah task sudah pernah dikerjakan.
- Jika sudah ada, update secara minimal.
- Jika ada konflik, report ke leader.

## Jangan Coding Production Feature

Tahap ini hanya proposal. Jangan implement:

- backend,
- database,
- real AI API,
- real WhatsApp API,
- WAHA,
- Meta API,
- real QRIS,
- marketplace,
- supplier pooling,
- full POS,
- full inventory.

## Prompt 1 — Initialize Proposal Docs

```txt
Read docs/proposal/00_PROPOSAL_MASTER_KUALI.md and docs/proposal/07_PROPOSAL_TASK_BOARD.md.

Check whether proposal docs already exist.
Create missing proposal docs only.
Do not implement app features.
Do not change MVP scope.
Report created files and missing items.
```

## Prompt 2 — Draft Business Section

```txt
Read docs/proposal/02_HUSTLER_BUSINESS_MARKET.md and docs/proposal/01_PROPOSAL_CONTENT_DRAFT.md.

Improve only the Business & Market Strategy section:
- BMC
- SWOT
- Competitor Benchmarking
- Go-To-Market
- Business Model
- Impact Measurement

Mark unsupported claims as [NEED SOURCE].
Do not touch tech or UX files.
Report changed files and remaining source needs.
```

## Prompt 3 — Draft UX Section

```txt
Read docs/proposal/03_HIPSTER_UX_DESIGN.md and docs/proposal/01_PROPOSAL_CONTENT_DRAFT.md.

Improve only the User Experience & Design section:
- User Persona
- User Journey
- Mockup explanation
- UX principles
- Screen requirements

Do not create actual UI code unless asked.
Do not add full POS/marketplace features.
Report changed files.
```

## Prompt 4 — Draft Tech Section

```txt
Read docs/proposal/04_HACKER_TECH_IMPLEMENTATION.md and docs/proposal/01_PROPOSAL_CONTENT_DRAFT.md.

Improve only the Technology & Implementation section:
- AI utilization
- AI JSON schema
- Use Case Diagram
- Sequence Diagram
- System Architecture
- Database design
- API draft
- Security/privacy

Use valid Mermaid diagrams.
Do not implement backend/frontend code.
Report changed files.
```

## Prompt 5 — Create Diagrams

```txt
Read docs/proposal/04_HACKER_TECH_IMPLEMENTATION.md and docs/proposal/05_DIAGRAMS_AND_MOCKUP_PLAN.md.

Create or improve Mermaid diagrams only:
- Use Case
- Sequence chat-to-order
- Sequence production planner
- System architecture
- ERD

Verify Mermaid syntax.
Do not modify unrelated proposal content.
Report diagrams changed.
```

## Prompt 6 — Create Mockup Requirements

```txt
Read docs/proposal/03_HIPSTER_UX_DESIGN.md and docs/proposal/05_DIAGRAMS_AND_MOCKUP_PLAN.md.

Create detailed mockup requirements for:
- Landing
- Mock WhatsApp
- Dashboard
- Order Detail
- Payment Reminder
- Production Planner
- Daily Summary
- Impact Dashboard
- Roadmap Simulation Card

Do not create actual frontend code.
Report files changed.
```

## Prompt 7 — Research References

```txt
Read docs/proposal/06_REFERENCES_AND_RESEARCH_NOTES.md.

Identify all [NEED SOURCE] claims.
Do not invent data.
If browsing is available, find reliable sources.
If browsing is not available, list source requirements clearly.

Update research notes with:
- claim
- source needed
- suggested source type
- status

Do not write unsupported statistics as facts.
```

## Prompt 8 — Final Review

```txt
Read all files in docs/proposal/.

Review the proposal for:
- completeness
- scoring criteria coverage
- narrative safety
- MVP vs roadmap clarity
- unsupported claims
- consistency
- page limit risk

Create docs/proposal/FINAL_REVIEW_REPORT.md.
Do not rewrite proposal unless asked.
```

## Prompt 9 — Export-ready Proposal

```txt
Read docs/proposal/01_PROPOSAL_CONTENT_DRAFT.md and all role files.

Assemble an export-ready proposal Markdown:
docs/proposal/PROPOSAL_EXPORT_READY.md

Requirements:
- Follow official proposal structure.
- Keep page limit in mind.
- Mark unresolved sources as [NEED SOURCE].
- Do not invent sources.
- Keep MVP and roadmap separate.
- Use formal Indonesian.
```

## What Not To Do

Agent must not:

- Delete existing docs.
- Rewrite all files unnecessarily.
- Implement app features.
- Add production backend.
- Add real WhatsApp API.
- Add real QRIS settlement.
- Add supplier pooling as MVP.
- Add rescue sale as MVP.
- Claim unsupported statistics.
- Use unsafe wording like “UMKM gaptek”.
- Overclaim impact.

## Definition of Done

Task is done when:

- File/section is updated.
- Acceptance criteria met.
- Scope remains proposal-only.
- Unsupported data marked `[NEED SOURCE]`.
- Narrative safe.
- Changed files reported.
- Status board updated if needed.
