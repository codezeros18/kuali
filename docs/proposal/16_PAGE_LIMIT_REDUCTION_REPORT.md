# 16 — Page Limit Reduction Report

> **Dibuat:** 2026-05-23
> **Dibuat oleh:** Claude Code — Proposal Editor & PDF Export Specialist
> **Status:** COMPLETE
> **Trigger:** PDF export error + proposal melebihi batas 20 halaman (estimasi 22 halaman)

---

## 1. Masalah Awal

| Masalah | Detail |
|---|---|
| Rendering error | "An error occurred while rendering the page" |
| Panjang proposal | 774 baris Markdown → estimasi 22 halaman PDF |
| Batas maksimum | 20 halaman (target 18–19 halaman) |

---

## 2. Root Cause — Rendering Error

Rendering error disebabkan oleh kombinasi berikut dalam blok Mermaid di dalam body proposal:

| Cause | Lokasi | Detail |
|---|---|---|
| HTML `<br/>` dalam Mermaid Note | §4.3 Sequence Diagram 1, baris 420 & 428 | `Note over MockWA: "...<br/>..."` — HTML raw tag tidak didukung semua renderer |
| ZWJ emoji dalam Mermaid node | §4.2 Use Case, baris 373–377 | `🧑‍🍳` (U+1F9D1 ZWJ U+1F373) dan `👨‍👩‍👧` (multi-codepoint) menyebabkan parse error di renderer PDF |
| `\n` dalam Mermaid sequence text | §4.3 baris 423 | `AI->>AI: Ekstrak nama, menu, qty,<br/>tanggal...` — backslash-n dalam step text |
| Subgraph dengan emoji di label | §4.4.1 Architecture, baris 496–516 | `"🖥️ Client Layer"`, `"⚡ API Layer"`, `"🤖 AI Layer"`, `"🗄️ Storage Layer"` |

**Penyebab utama:** PDF renderer tidak mendukung HTML tag di dalam Mermaid blocks dan gagal mem-parse ZWJ emoji sequences dalam node labels.

---

## 3. Analisis Panjang Proposal Original (99_FINAL_PROPOSAL_SUBMISSION.md)

| Bagian | Baris | Estimasi PDF |
|---|---|---|
| Cover + TOC | 50 | ~1.5 halaman |
| §1 Pendahuluan | 70 | ~2 halaman |
| §2 Business & Market | 88 | ~2.5 halaman |
| §3 UX & Design | 105 | ~3 halaman |
| §4 Teknologi (teks) | 189 | ~5.5 halaman |
| §4 — 5 blok Mermaid (rendered) | 158 baris markdown | ~3–4 halaman gambar |
| §5 Kesimpulan & Roadmap | 37 | ~1 halaman |
| §6 Pustaka | 15 | ~0.5 halaman |
| §7 Lampiran (termasuk JSON) | 47 | ~1.5 halaman |
| Whitespace & dividers | ~15 | — |
| **TOTAL ESTIMASI** | **774 baris** | **~22 halaman** |

---

## 4. Konten yang Dipindahkan ke Lampiran / Dokumen Terpisah

| Konten | Dari | Ke |
|---|---|---|
| DIA-01 Use Case Diagram (Mermaid) | §4.2 body proposal | Lampiran B / 11_MERMAID_DIAGRAMS.md |
| DIA-02 Sequence Chat→Order (Mermaid) | §4.3 body proposal | Lampiran B / 11_MERMAID_DIAGRAMS.md |
| DIA-03 Sequence Production Planner (Mermaid) | §4.3 body proposal | Lampiran B / 11_MERMAID_DIAGRAMS.md |
| DIA-04 System Architecture (Mermaid flowchart) | §4.4.1 body proposal | Lampiran B / 11_MERMAID_DIAGRAMS.md |
| DIA-06 Simplified ERD (Mermaid erDiagram) | §4.4.1 body proposal | Lampiran B / 11_MERMAID_DIAGRAMS.md |
| JSON AI Parser output (22-baris code block) | Lampiran C inline | Lampiran C: ringkasan field saja |
| §4.4.4 Batasan Implementasi (tabel 8 baris) | Body §4.4 | Dihapus — konten sudah ada di §4.4.2 rationale |
| §4.4.2 verbose rationale (4 bold-header paragraphs) | Body §4.4 | Dipadatkan menjadi 4 bullet points |

---

## 5. Konten yang Dipadatkan di Proposal Compact

| Bagian | Perubahan | Baris Dipangkas |
|---|---|---|
| §1.3 + §1.4 + §1.5 | Digabung menjadi §1.3 "Tujuan dan Manfaat" | -20 baris |
| §2.2 Kompetitor | Dikurangi dari 4 kolom menjadi 3 kolom; 1 kolom "Apa yang Diselesaikan" dihapus | -5 baris |
| §2.3 SWOT | Diubah dari 4 sub-header + bullets menjadi 4 paragraf pendek | -8 baris |
| §2.4 GTM | Sub-header dihapus, jadi 3 bullet pendek | -10 baris |
| §3.1 Persona | Persona Aksesibilitas dihapus; 2 persona sekunder digabung 1 paragraf | -12 baris |
| §3.3 Screens | 13 layar → 8 layar utama | -8 baris |
| §3.4 + §3.5 | Digabung jadi §3.4 "Prinsip UX dan Desain Inklusif" | -12 baris |
| §4.1 AI | 5 paragraf bold-header → 1 tabel compact + bullet list boundary | -10 baris |
| §4.2 Use Case | 9-item numbered list dihapus (redundan dengan diagram); aktor dipertahankan | -10 baris |
| §4.3 Sequence | 2 Mermaid blocks (54 baris) → 2 ringkasan teks + referensi Lampiran B | -44 baris |
| §4.4.1 Mermaid | 2 Mermaid blocks (70 baris) → 1 kalimat referensi + model data sebagai teks | -60 baris |
| §4.4.2 Rationale | 4 paragraf verbose → 4 bullet pendek | -10 baris |
| §4.4.3 Roadmap table | "Keterangan" kolom dipendekkan | -5 baris |
| §4.4.4 Batasan | Seluruh tabel dihapus | -12 baris |
| §5.2 Roadmap | 8 item prose → tabel 3-kolom compact | -5 baris |
| Lampiran C | 22-baris JSON dihapus → ringkasan field (4 baris) | -18 baris |
| **Total dipangkas** | | **~249 baris** |

---

## 6. Estimasi Panjang Proposal Compact

| Bagian | Baris Compact | Estimasi PDF |
|---|---|---|
| Cover + TOC | 25 | ~0.8 halaman |
| §1 Pendahuluan | 42 | ~1.2 halaman |
| §2 Business & Market | 62 | ~1.8 halaman |
| §3 UX & Design | 72 | ~2 halaman |
| §4 Teknologi (tanpa Mermaid) | 105 | ~3 halaman |
| §5 Kesimpulan & Roadmap | 32 | ~1 halaman |
| §6 Pustaka | 13 | ~0.4 halaman |
| §7 Lampiran | 30 | ~0.8 halaman |
| Whitespace & dividers | ~15 | — |
| **Subtotal teks** | **~396 baris** | **~11 halaman teks** |
| + Screenshot Lampiran A (4 gambar) | — | ~4 halaman |
| + Diagram PNG Lampiran B (jika di-inline) | — | ~2 halaman |
| **TOTAL ESTIMASI COMPACT** | | **~17–19 halaman** |

> Catatan: Jika menggunakan screenshot 4 di Lampiran A dan hanya menyisipkan 2 diagram PNG di §4, total bisa tepat di 18 halaman.

---

## 7. Rendering Safety Check

| Check | Status |
|---|---|
| Tidak ada blok Mermaid di body compact | AMAN |
| Tidak ada HTML `<br/>` di Markdown | AMAN |
| Tidak ada ZWJ emoji dalam diagram | AMAN (diagram hanya di Lampiran B) |
| Tidak ada raw HTML di Markdown | AMAN |
| Tabel paling lebar: 3 kolom (Roadmap table) | AMAN |
| Code block: tidak ada di body | AMAN |
| Emoji di body teks biasa: tidak ada | AMAN |
| Link referensi: semua relative path | AMAN |

---

## 8. Files Changed / Created

| File | Aksi | Keterangan |
|---|---|---|
| `docs/proposal/99_FINAL_PROPOSAL_COMPACT.md` | CREATED | Versi compact export-ready — 18–19 halaman |
| `docs/proposal/16_PAGE_LIMIT_REDUCTION_REPORT.md` | CREATED | Dokumen ini |
| `docs/proposal/99_FINAL_PROPOSAL_SUBMISSION.md` | TIDAK DIUBAH | Dipertahankan sebagai sumber lengkap |

---

## 9. Tindakan Manual yang Masih Diperlukan Sebelum Export

| Prioritas | Aksi | Keterangan |
|---|---|---|
| HIGH | Ganti `[NAMA TIM]` dan `[Nama 1–5]` di Cover | Harus selesai sebelum submission |
| HIGH | Ganti `[NEED SOURCE]` dengan 5 sumber terverifikasi (BPS, DataReportal, Bank Indonesia, LPEM FEB UI) | Jangan mengarang statistik |
| HIGH | Ambil 4 screenshot dari prototype (localhost:3000 atau Vercel URL) untuk Lampiran A | Gunakan panduan di `12_MOCKUP_SCREENSHOT_GUIDE.md` |
| MEDIUM | Export 2–3 diagram dari `docs/proposal/diagrams/` sebagai PNG untuk Lampiran B inline | Gunakan `mmdc` CLI atau mermaid.live |
| MEDIUM | Sisipkan screenshot dan diagram PNG ke dalam `99_FINAL_PROPOSAL_COMPACT.md` menggunakan `![alt](path)` | Pastikan path gambar benar sebelum PDF export |
| LOW | Re-render 7 SVG lama di `docs/proposal/*.svg` yang dibuat dari versi diagram sebelumnya | Tidak wajib untuk submission, tapi baik untuk arsip |
| LOW | Review sekali lagi apakah ada sumber yang bisa ditambahkan untuk `[NEED SOURCE]` | Misal: laporan DataReportal 2024 tersedia gratis |

---

## 10. Panduan PDF Export

### Opsi 1 — Pandoc (Recommended, rendering paling stabil)
```bash
pandoc docs/proposal/99_FINAL_PROPOSAL_COMPACT.md \
  -o docs/proposal/kuali_proposal_final.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=2cm \
  -V fontsize=11pt \
  -V mainfont="Noto Sans" \
  --highlight-style=github
```

### Opsi 2 — VS Code Markdown PDF Extension
1. Install extension "Markdown PDF" (yzane)
2. Buka `99_FINAL_PROPOSAL_COMPACT.md`
3. Ctrl+Shift+P → "Markdown PDF: Export (pdf)"
4. Cek page count di PDF viewer

### Opsi 3 — Typora / Obsidian Export
1. Buka file di Typora atau Obsidian
2. File → Export → PDF
3. Pilih page size A4, margin normal

### Yang TIDAK direkomendasikan
- GitHub Markdown renderer: tidak mendukung PDF export dengan image embed
- Render Mermaid online lalu screenshot: tidak konsisten hasilnya

---

## 11. Verify Checklist

- [x] Compact proposal lebih pendek dari original (396 baris vs 774 baris)
- [x] Estimasi PDF: 17–19 halaman (dalam batas 20 halaman)
- [x] Tidak ada seksi wajib yang hilang dari struktur proposal
- [x] Tidak ada fitur roadmap yang disajikan sebagai MVP aktif
- [x] SQLite / prototype framing jelas dan tidak apologetik
- [x] Tidak ada Mermaid block di body compact (rendering error dihilangkan)
- [x] Tidak ada HTML raw tag (`<br/>`, `<img>`, dll)
- [x] Tidak ada ZWJ emoji di dalam diagram
- [x] Tabel paling lebar 3 kolom — aman untuk PDF
- [x] Proposal tetap lengkap dan judge-ready
- [x] Roadmap dipisahkan dengan jelas dari MVP
- [ ] Screenshot Lampiran A (aksi manual)
- [ ] [NEED SOURCE] diisi (aksi manual)
- [ ] Nama tim diisi (aksi manual)
- [ ] Diagram PNG disisipkan (aksi manual)
