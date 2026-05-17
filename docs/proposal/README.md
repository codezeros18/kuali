# docs/proposal/ — Output Phase 0 Kuali

> Folder ini berisi semua deliverable Phase 0: proposal, pitch, persona, journey, arsitektur, dan storyboard.
> Semua konten dalam Bahasa Indonesia kecuali file arsitektur teknis yang bersifat bilingual.

---

## Status

**Phase 0 — Baseline Proposal Phase** (aktif)

Semua file di folder ini adalah **output Phase 0**. Jangan implementasi fitur produksi dari folder ini.

---

## Isi Folder

| File | Peran | Owner | Status |
|---|---|---|---|
| `PROPOSAL_OUTLINE.md` | Outline proposal lengkap siap dipindah ke template resmi | HUSTLER-B | BLUE / IN_REVIEW |
| `PITCH_DECK_OUTLINE.md` | Outline 12 slide pitch deck dengan narasi dan visual hint | LEAD + HUSTLER-B | BLUE / IN_REVIEW |
| `DEMO_STORYBOARD.md` | Storyboard demo 3 menit + 5 menit, checklist, fallback plan | LEAD + HIPSTER-B | BLUE / IN_REVIEW |
| `USER_PERSONA.md` | Persona Bu Rani: profil, pain points, JTBD, skenario demo | HUSTLER-B | BLUE / IN_REVIEW |
| `USER_JOURNEY.md` | User journey 9 langkah, detail per scene, titik kritis | HIPSTER-B | BLUE / IN_REVIEW |
| `COMPETITOR_COMPARISON.md` | Perbandingan vs WhatsApp Business, POS, ChatGPT, Spreadsheet | HUSTLER-B | BLUE / IN_REVIEW |
| `BASELINE_ARCHITECTURE.md` | Data flow, tech stack, entity, API, AI parser schema, guardrail | LEAD + HACKER-A | BLUE / IN_REVIEW |

---

## Urutan Baca yang Disarankan

Jika kamu baru bergabung ke proyek:

1. **Mulai dari sini:** `docs/00_FINAL_IDEA_KUALI.md` — source of truth ide final
2. **Pahami target user:** `USER_PERSONA.md`
3. **Pahami alur produk:** `USER_JOURNEY.md`
4. **Pahami positioning:** `COMPETITOR_COMPARISON.md`
5. **Pahami teknis:** `BASELINE_ARCHITECTURE.md`
6. **Siapkan pitch:** `PROPOSAL_OUTLINE.md` → `PITCH_DECK_OUTLINE.md`
7. **Siapkan demo:** `DEMO_STORYBOARD.md`

---

## Yang Belum Ada di Folder Ini

Berikut deliverable Phase 0 yang belum dibuat dan masih butuh dikerjakan tim:

| Deliverable | Owner | Catatan |
|---|---|---|
| Mockup low fidelity (Figma/Canva) | HIPSTER-B | Mengacu `USER_JOURNEY.md` dan `DEMO_STORYBOARD.md`. Minimal 6 screen. |
| UI moodboard | HIPSTER-B | Warna, tipografi, tone UMKM. Mobile-first. |
| UX copy Bahasa Indonesia | HIPSTER-B + HUSTLER-B | Copy per screen mengacu mockup |
| QRIS dummy image | HIPSTER-B / LEAD | Simpan di `assets/qris-dummy.png` |
| Database entity draft (ERD) | HACKER-B | Mengacu section Entity di `BASELINE_ARCHITECTURE.md` |
| Prisma schema draft | HACKER-B | Draft saja, belum perlu migration |

---

## Aturan Folder Ini

- Semua file harus konsisten dengan `docs/00_FINAL_IDEA_KUALI.md`
- Jangan tambah fitur roadmap sebagai MVP di file manapun
- Community sourcing dan rescue sale selalu ditandai **roadmap**
- QRIS selalu disebut **dummy/reminder**, bukan settlement
- Narasi tidak boleh mengklaim profit naik, food waste turun, atau stok pasti laku

---

## Cara Berkontribusi

1. Ambil task dari `docs/04_BASELINE_SPRINT_TASK_BOARD.md`
2. Check file yang relevan sebelum edit
3. Ikuti format yang sudah ada
4. Buat PR ke branch `dev` setelah selesai
5. Tag LEAD untuk review
