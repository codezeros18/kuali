# 07 — Proposal Task Board

Status legend:
- GREY / NOT_STARTED = belum dikerjakan
- YELLOW / IN_PROGRESS = sedang dikerjakan
- BLUE / IN_REVIEW = selesai awal, perlu review leader
- GREEN / DONE = selesai dan verified
- RED / BLOCKED = terhambat
- PURPLE / DEFERRED = ditunda ke roadmap
- BLACK / DROPPED = dibuang dari scope

Prinsip kerja semua task: **CHECK → DECIDE → IMPLEMENT → VERIFY → REPORT**

## Task Board

| ID | Phase | Task | Owner | Role | Status | Priority | Dependencies | Check | Decide | Implement | Verify | Report | Acceptance Criteria |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PRP-001 | Proposal | Finalisasi ide Kuali | Lead | Lead | BLUE / IN_REVIEW | P0 | - | Cek ide final | Pakai Kuali core DapurFlow-style | Tulis master direction | Review leader | Update status | Nama, tagline, positioning jelas |
| PRP-002 | Proposal | Buat master proposal direction | Lead | Lead | GREY / NOT_STARTED | P0 | PRP-001 | Cek template | Ikuti struktur resmi | Isi file master | Semua kriteria ada | Laporkan | 00 lengkap |
| PRP-003 | Proposal | Draft cover proposal | Lead | Lead | GREY / NOT_STARTED | P1 | PRP-001 | Cek nama tim | Gunakan placeholder | Buat cover draft | Lengkap | Laporkan | Cover berisi judul, tim, anggota |
| PRP-004 | Proposal | Draft pendahuluan | Hustler-B | Hustler | GREY / NOT_STARTED | P0 | PRP-001 | Cek problem | Pakai narasi aman | Tulis latar belakang | Tidak overclaim | Laporkan | Pendahuluan jelas |
| PRP-005 | Proposal | Problem statement final | Lead | Lead/Hustler | GREY / NOT_STARTED | P0 | PRP-004 | Cek wording | Gunakan safe framing | Finalisasi problem | Tidak menyinggung | Laporkan | Problem tajam dan aman |
| PRP-006 | Proposal | Solution statement final | Lead | Lead | GREY / NOT_STARTED | P0 | PRP-005 | Cek MVP | Fokus order+planner | Finalisasi solution | Tidak super app | Laporkan | Solution ringkas |
| BUS-001 | Proposal | BMC Kuali | Hustler-B | Hustler | GREY / NOT_STARTED | P0 | PRP-006 | Cek target user | BMC realistis | Isi BMC | Lengkap 9 blok | Laporkan | BMC lengkap |
| BUS-002 | Proposal | SWOT Analysis | Hustler-B | Hustler | GREY / NOT_STARTED | P0 | BUS-001 | Cek risiko | SWOT jujur | Buat SWOT | Tidak terlalu optimis | Laporkan | 4 kuadran terisi |
| BUS-003 | Proposal | Competitor benchmarking | Hustler-B | Hustler | GREY / NOT_STARTED | P0 | BUS-001 | Cek kompetitor | Bandingkan fair | Buat tabel | Diferensiasi jelas | Laporkan | Minimal 6 alternatif |
| BUS-004 | Proposal | Go-to-market strategy | Hustler-B | Hustler | GREY / NOT_STARTED | P1 | BUS-001 | Cek channel | Fokus UMKM kuliner | Tulis GTM | Realistis | Laporkan | Launch/acquisition/channel ada |
| BUS-005 | Proposal | Business model pricing draft | Hustler-B | Hustler | GREY / NOT_STARTED | P1 | BUS-001 | Cek willingness | Freemium/Starter/Pro | Buat pricing | Tidak overclaim | Laporkan | Pricing draft ada |
| BUS-006 | Proposal | Impact measurement | Hustler-B | Hustler | GREY / NOT_STARTED | P0 | PRP-006 | Cek metric aman | Hindari profit/food waste claim | Buat metrics | Aman | Laporkan | Metric bisa diukur |
| UX-001 | Proposal | Persona Bu Rani | Hipster-B | Hipster | GREY / NOT_STARTED | P0 | PRP-005 | Cek target user | Buat persona utama | Tulis persona | Jelas | Laporkan | Persona lengkap |
| UX-002 | Proposal | Persona tambahan | Hipster-B | Hipster | GREY / NOT_STARTED | P1 | UX-001 | Cek segmen | Buat 2 persona | Tulis persona | Relevan | Laporkan | 2 persona tambahan |
| UX-003 | Proposal | User journey before-after | Hipster-B | Hipster | GREY / NOT_STARTED | P0 | UX-001 | Cek flow | Before-after | Tulis journey | Mudah dipahami | Laporkan | Flow lengkap |
| UX-004 | Proposal | Mockup requirements | Hipster-B | Hipster | GREY / NOT_STARTED | P0 | UX-003 | Cek screen list | Mobile-first | Tulis mockup req | Semua screen ada | Laporkan | 10 screen requirements |
| UX-005 | Proposal | UX copy Bahasa Indonesia | Hipster-B | Hipster | GREY / NOT_STARTED | P1 | UX-004 | Cek tone | Friendly-professional | Tulis copy | Aman | Laporkan | Copy untuk CTA/status ada |
| TEC-001 | Proposal | AI utilization explanation | Hacker-A | Hacker | GREY / NOT_STARTED | P0 | PRP-006 | Cek AI use case | Parser/missing/suggested/summary | Tulis section | AI boundary jelas | Laporkan | AI tidak overclaim |
| TEC-002 | Proposal | AI JSON schema draft | Hacker-A | Hacker | GREY / NOT_STARTED | P0 | TEC-001 | Cek fields | Structured JSON | Buat schema | Valid JSON | Laporkan | Schema lengkap |
| TEC-003 | Proposal | Confidence score rules | Hacker-A | Hacker | GREY / NOT_STARTED | P0 | TEC-002 | Cek cases | High/med/low | Tulis rules | Owner approval ada | Laporkan | Rule jelas |
| TEC-004 | Proposal | Backend validation rules | Hacker-B | Hacker | GREY / NOT_STARTED | P0 | TEC-002 | Cek menu/harga | Harga dari DB | Tulis rules | Aman | Laporkan | No hallucination |
| DIA-001 | Proposal | Use Case Diagram | Hacker-B | Hacker | GREY / NOT_STARTED | P0 | TEC-001 | Cek actors | Mermaid | Buat diagram | Mermaid valid | Laporkan | Diagram bisa dicopy |
| DIA-002 | Proposal | Sequence chat-to-order | Hacker-B | Hacker | GREY / NOT_STARTED | P0 | TEC-001 | Cek flow | Mermaid sequence | Buat diagram | Valid | Laporkan | Flow jelas |
| DIA-003 | Proposal | Sequence production planner | Hacker-B | Hacker | GREY / NOT_STARTED | P0 | TEC-004 | Cek recipe | Mermaid | Buat diagram | Valid | Laporkan | Planner jelas |
| DIA-004 | Proposal | System architecture diagram | Hacker-B | Hacker | GREY / NOT_STARTED | P0 | TEC-001 | Cek stack | Mermaid | Buat diagram | Valid | Laporkan | Stack jelas |
| DIA-005 | Proposal | ERD | Hacker-B | Hacker | GREY / NOT_STARTED | P0 | TEC-004 | Cek entity | Mermaid ERD | Buat ERD | Valid | Laporkan | Entity MVP ada |
| MCK-001 | Proposal | Landing mockup | Hipster-B | Hipster | GREY / NOT_STARTED | P0 | UX-004 | Cek copy | Mobile-first | Buat mockup | Review | Laporkan | Hero jelas |
| MCK-002 | Proposal | Mock WhatsApp mockup | Hipster-B | Hipster | GREY / NOT_STARTED | P0 | UX-004 | Cek chat | Static mock | Buat mockup | Review | Laporkan | Chat realistis |
| MCK-003 | Proposal | Order detail mockup | Hipster-B | Hipster | GREY / NOT_STARTED | P0 | UX-004 | Cek AI output | Owner approval | Buat mockup | Review | Laporkan | Confidence tampil |
| MCK-004 | Proposal | Production planner mockup | Hipster-B | Hipster | GREY / NOT_STARTED | P0 | UX-004 | Cek bahan | Estimasi | Buat mockup | Review | Laporkan | Bahan dari order |
| RES-001 | Proposal | Cari sumber data UMKM | Hustler-B | Research | GREY / NOT_STARTED | P0 | PRP-004 | Cek claim | Sumber resmi | Tambah reference | Valid | Laporkan | Source ada |
| RES-002 | Proposal | Cari sumber QRIS | Hustler-B | Research | GREY / NOT_STARTED | P1 | PRP-004 | Cek claim | BI preferred | Tambah reference | Valid | Laporkan | Source ada |
| RES-003 | Proposal | Competitor source check | Hustler-B | Research | GREY / NOT_STARTED | P1 | BUS-003 | Cek website | Official site | Catat source | Valid | Laporkan | Source competitor ada |
| REV-001 | Proposal | Narrative safety review | Lead | Lead | GREY / NOT_STARTED | P0 | PRP-004 | Cek wording | Safe framing | Review docs | Tidak ada red flag | Laporkan | No unsafe terms |
| REV-002 | Proposal | Scope review | Lead | Lead | GREY / NOT_STARTED | P0 | All | Cek scope | MVP vs roadmap | Review proposal | No scope creep | Laporkan | MVP aman |
| PDF-001 | Proposal | Format proposal A4 | Lead/Hipster | Review | GREY / NOT_STARTED | P1 | Draft final | Cek format | Times New Roman 11 | Format doc | Sesuai aturan | Laporkan | Format sesuai |
| PDF-002 | Proposal | Export PDF | Lead | Review | GREY / NOT_STARTED | P1 | PDF-001 | Cek final | Export | Buat PDF | File benar | Laporkan | Proposal_NamaTim.pdf |
| SUB-001 | Submission | Final submission checklist | Lead | Lead | GREY / NOT_STARTED | P0 | PDF-002 | Cek semua | Siap submit | Final check | Lengkap | Laporkan | Ready submit |

## Daily Report Template

```md
## Daily Report
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

## Proposal Review Checklist

- [ ] Semua section template resmi ada
- [ ] Semua role berkontribusi
- [ ] Problem statement aman
- [ ] Solution statement jelas
- [ ] BMC, SWOT, benchmark lengkap
- [ ] Persona dan journey ada
- [ ] Diagram teknis ada
- [ ] Mockup plan ada
- [ ] Sumber statistik ada atau `[NEED SOURCE]`
- [ ] MVP dan roadmap dipisahkan
- [ ] Tidak ada overclaim

## Final PDF Checklist

- [ ] Maksimal 20 halaman utama
- [ ] A4
- [ ] Times New Roman minimal 11pt
- [ ] Spasi 1.5
- [ ] Margin atas 4, bawah 3, kiri 4, kanan 3
- [ ] Nama file `Proposal_NamaTim.pdf`
- [ ] Daftar pustaka ada
- [ ] Lampiran opsional terpisah
- [ ] Tidak ada typo besar
- [ ] Leader approval
