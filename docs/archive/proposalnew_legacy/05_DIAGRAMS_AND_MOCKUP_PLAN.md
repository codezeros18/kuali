# 05 — Diagrams and Mockup Plan

Dokumen ini mencatat semua diagram dan mockup yang dibutuhkan untuk proposal Kuali.

Status:
- GREY / NOT_STARTED
- YELLOW / IN_PROGRESS
- BLUE / IN_REVIEW
- GREEN / DONE
- RED / BLOCKED
- PURPLE / DEFERRED
- BLACK / DROPPED

## Diagram Inventory

| ID | Type | Item | Owner | Status | Priority | Tool | Check | Decide | Implement | Verify | Report | Acceptance Criteria |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| DIA-01 | Diagram | Use Case Diagram | Hacker | GREY / NOT_STARTED | P0 | Mermaid | Cek use case utama | Pakai Mermaid flowchart | Buat diagram aktor dan use case | Diagram valid | Laporkan section | Aktor dan use case utama terlihat |
| DIA-02 | Diagram | Sequence: Chat order to draft order | Hacker | GREY / NOT_STARTED | P0 | Mermaid | Cek flow AI parser | Pakai sequence diagram | Buat alur customer→AI→owner | Diagram valid | Laporkan | Parsing dan approval jelas |
| DIA-03 | Diagram | Sequence: Production planner | Hacker | GREY / NOT_STARTED | P0 | Mermaid | Cek data order+resep | Pakai sequence diagram | Buat alur planner | Diagram valid | Laporkan | Bahan dari order aktual jelas |
| DIA-04 | Diagram | System Architecture Diagram | Hacker | GREY / NOT_STARTED | P0 | Mermaid | Cek tech stack | Pakai flowchart | Buat frontend/API/AI/DB diagram | Diagram valid | Laporkan | Mock WA, API, AI, DB terlihat |
| DIA-05 | Diagram | Data Flow Diagram | Hacker | GREY / NOT_STARTED | P1 | Mermaid | Cek data flow | Pakai flowchart | Buat raw chat→summary | Valid | Laporkan | Data flow mudah dipahami |
| DIA-06 | Diagram | ERD | Hacker | GREY / NOT_STARTED | P0 | Mermaid ERD | Cek entity list | Pakai MVP entities | Buat ERD | Valid | Laporkan | Semua entity core ada |
| DIA-07 | Diagram | Roadmap Architecture | Hacker/Lead | PURPLE / DEFERRED | P2 | Mermaid | Cek roadmap | Tandai roadmap | Buat layer roadmap | Valid | Laporkan | Tidak dianggap MVP |

## Mockup Inventory

| ID | Type | Item | Owner | Status | Priority | Tool | Check | Decide | Implement | Verify | Report | Acceptance Criteria |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| MCK-01 | Mockup | Landing / Hero | Hipster | GREY / NOT_STARTED | P0 | Figma/Frontend | Cek tagline | Mobile-first | Buat hero Kuali | Review visual | Laporkan | One-liner jelas |
| MCK-02 | Mockup | Mock WhatsApp | Hipster | GREY / NOT_STARTED | P0 | Figma/Frontend | Cek chat dummy | Mock only | Buat chat Dinda | Review | Laporkan | Chat realistis |
| MCK-03 | Mockup | Owner Dashboard | Hipster | GREY / NOT_STARTED | P0 | Figma/Frontend | Cek metric dummy | Card dashboard | Buat dashboard | Review | Laporkan | Metric utama tampil |
| MCK-04 | Mockup | Order List | Hipster | GREY / NOT_STARTED | P1 | Figma/Frontend | Cek order dummy | Card list | Buat list | Review | Laporkan | Status badge jelas |
| MCK-05 | Mockup | Order Detail | Hipster | GREY / NOT_STARTED | P0 | Figma/Frontend | Cek AI output | Owner approval | Buat detail | Review | Laporkan | Confidence dan CTA tampil |
| MCK-06 | Mockup | Payment Reminder | Hipster | GREY / NOT_STARTED | P0 | Figma/Frontend | Cek QRIS dummy | Payment dummy only | Buat preview reminder | Review | Laporkan | Ada note no settlement |
| MCK-07 | Mockup | Production Planner | Hipster | GREY / NOT_STARTED | P0 | Figma/Frontend | Cek recipe dummy | Estimasi bahan | Buat planner | Review | Laporkan | Bahan dari order aktual |
| MCK-08 | Mockup | Daily Summary | Hipster | GREY / NOT_STARTED | P1 | Figma/Frontend | Cek summary dummy | Summary aman | Buat card summary | Review | Laporkan | Tidak overclaim |
| MCK-09 | Mockup | Impact Dashboard | Hipster/Hustler | GREY / NOT_STARTED | P0 | Figma/Frontend | Cek metrics | Aman tanpa angka palsu | Buat dashboard | Review | Laporkan | Metric aman |
| MCK-10 | Mockup | Roadmap Simulation Card | Hipster/Lead | PURPLE / DEFERRED | P2 | Figma/Frontend | Cek roadmap | Label roadmap | Buat card | Review | Laporkan | Tidak tampak MVP |

## Priority

P0 Diagram: Use Case, Sequence chat-to-order, System Architecture, ERD, Sequence production planner.  
P0 Mockup: Landing, Mock WhatsApp, Order Detail, Payment Reminder, Production Planner, Impact Dashboard.

## CHECK → DECIDE → IMPLEMENT → VERIFY → REPORT

Setiap diagram/mockup harus:

- CHECK: cek apakah sudah ada.
- DECIDE: tentukan tool dan fidelity.
- IMPLEMENT: buat item.
- VERIFY: validasi scope dan kualitas.
- REPORT: laporkan status, file/link, blocker.

## Global Acceptance Criteria

- Diagram mudah dibaca non-teknis.
- Mockup mendukung demo story.
- Roadmap tidak tampak sebagai MVP.
- QRIS jelas dummy.
- WhatsApp jelas mock pada baseline.
- Tidak ada klaim production yang belum dibangun.
