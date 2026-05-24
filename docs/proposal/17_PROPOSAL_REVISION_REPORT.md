# 17 — Proposal Revision Report (Sprint R1)

> **Tanggal:** 2026-05-22
> **Dibuat oleh:** Claude Code — Hackathon Strategy Reviewer & Proposal Editor
> **Status:** COMPLETE
> **Sprint:** R1 — Proposal Revision (Inclusive UX, Mode Sederhana, Profil Usaha)

---

## 0. Trigger

Sprint R1 dijalankan setelah audit Sprint R0 (`docs/revision/04_REVISION_AUDIT_REPORT.md`) menemukan gap berikut di proposal:

| Gap | ID Audit |
|---|---|
| Tidak ada konsep Mode Sederhana / Mode Standar di proposal | P-07 |
| Persona Bu Rani masih punya field `Usia: 34 tahun` yang perlu dihapus | P-03 |
| Tidak ada Persona Aksesibilitas (kenyamanan digital berbeda, bukan usia) | P-04 |
| Profil Usaha belum ada di proposal, hanya disebut sebagai "Company Profile" | P-06 |
| UX Principles masih ada "Dashboard ringan" yang tidak menjelaskan mekanisme | P-08 |
| SWOT Opportunities tidak memberi label jelas "roadmap" untuk community sourcing | P-10 |
| SWOT Threats menyebut "variasi kemampuan adopsi" dengan framing kurang inklusif | P-09 |

---

## 1. Files yang Diubah

### 1.1 `docs/proposal/99_FINAL_PROPOSAL_SUBMISSION.md`

| Lokasi | Perubahan | Gap Ditangani |
|---|---|---|
| §1.3 User Persona — Bu Rani | Hapus field `Usia: 34 tahun`; tambah field `Tampilan yang cocok: Mode Sederhana` | P-03 |
| §1.3 Persona Sekunder | Tambah keterangan mode preference untuk Mas Budi dan Kak Rina | P-04 |
| §1.3 (baru) Persona Aksesibilitas | Tambah paragraf Persona Aksesibilitas (non-demografis, berbasis kenyamanan digital) | P-04 |
| §3.3 Alur Layar Produk | Ekspansi dari 11 ke 13 layar: tambah Dashboard Mode Sederhana (layar 5), Dashboard Mode Standar (layar 6), Profil Usaha (layar 13) | P-06, P-07 |
| §3.4 Prinsip UX | Ganti "Dashboard ringan" → "Pilihan tampilan adaptif"; tambah "Low cognitive load" bullet | P-08 |
| §3.5 (baru) Desain Inklusif | Tambah section baru: filosofi inklusif, definisi Mode Sederhana dan Mode Standar, prinsip desain inklusif 5 poin | P-07, P-09 |
| §2.3 SWOT Opportunities | Tambah label `(roadmap jangka panjang)` di community sourcing; tambah bullet kenyamanan digital sebagai peluang | P-10 |
| §2.3 SWOT Threats | Ubah framing "variasi kemampuan adopsi" → "kenyamanan adopsi teknologi baru bervariasi — membutuhkan onboarding ringkas" | P-09 |
| Table of Contents | Tambah entri §3.5 | — |

### 1.2 `docs/proposal/03_HIPSTER_UX_DESIGN.md`

| Lokasi | Perubahan |
|---|---|
| UX Principles | Ganti "Dashboard ringan" + "Tidak terlalu banyak chart" → Mode Sederhana/Standar; tambah prinsip inklusif |
| Design Principles tabel | Tambah Mode Sederhana, Mode Standar, dan Inklusif tanpa asumsi |
| Persona Utama — Bu Rani | Hapus `Usia: 34 tahun`; tambah `Tampilan yang cocok: Mode Sederhana` |
| Persona 3 — Pak Arif | Tambah `Tampilan yang cocok: Mode Standar` |
| Persona Aksesibilitas (baru) | Tambah persona use-case berbasis kenyamanan digital — bukan demografis |
| Mockup screens | Tambah layar 10 (Mode Sederhana), 11 (Mode Standar), 12 (Profil Usaha); ubah label layar 13 |
| UI Component List | Tambah `SimpleDashboard`, `ViewModeToggle`, `ProfilUsahaCard` |

---

## 2. Keputusan Desain Kunci

### Mode Sederhana vs Mode Standar

- **Bukan** fitur untuk "lansia" atau "pengguna gaptek"
- **Ya:** pilihan tampilan untuk semua pengguna berdasarkan preferensi dan kenyamanan di hari itu
- Toggle tersedia kapan saja — tidak perlu isi profil, tidak ada pertanyaan usia
- Preferensi disimpan di localStorage — tidak dikirim ke server
- Kedua mode setara, tidak ada hirarki kemampuan

### Persona Aksesibilitas

- Bukan pengguna dengan disabilitas tertentu
- Use-case persona: orang yang terbiasa WhatsApp, kurang nyaman dengan grafik/tabel/jargon
- Bisa berumur berapa saja — kenyamanan digital = fungsi kebiasaan + konteks, bukan usia
- Kuali tidak mengumpulkan data demografis untuk menentukan mode — pengguna memilih sendiri

### Profil Usaha

- Bukan "Company Profile" (terlalu korporat)
- Konten: nama usaha, jenis kuliner, area, WhatsApp, menu aktif, QRIS dummy
- Termasuk toggle default tampilan (Mode Sederhana / Mode Standar)
- Lightweight — bukan full onboarding form

---

## 3. Hal yang Tidak Diubah (dan Alasannya)

| Item | Alasan Tidak Diubah |
|---|---|
| Klaim persentase efisiensi | Sudah dihapus di Sprint R0 — tidak perlu diulang |
| Community sourcing di BMC | Sudah di-label "roadmap" di Sprint R0 — tidak perlu ubah |
| Supabase / n8n / GCP | Sudah dihapus di Scope Purge (Sprint 0) |
| Mode Sederhana di kode frontend | Sprint R3 — belum dikerjakan |
| Profil Usaha di kode frontend | Sprint R3 — belum dikerjakan |

---

## 4. Sprint Berikutnya

| Sprint | Scope |
|---|---|
| R2 | Data & copy fix di `dummy-data.ts`, `dashboard/page.tsx`, `summary/page.tsx`, `demo/page.tsx` |
| R3 | Implementasi Mode Sederhana + Profil Usaha di frontend |
| R4 | Polish copy (badge "Mock AI aktif" → "Mode Demo aktif", hapus klaim "ekosistem") |
| R5 | Screenshot 11 layar dari prototype, insert ke proposal |

---

## 5. Verify Checklist Sprint R1

- [x] Field `Usia` dihapus dari Persona Bu Rani di proposal utama dan di `03_HIPSTER_UX_DESIGN.md`
- [x] Persona Aksesibilitas ditambahkan sebagai use-case, bukan demografis
- [x] Mode Sederhana dan Mode Standar dijelaskan di §3.4 dan §3.5
- [x] §3.5 "Desain Inklusif" ditambahkan sebagai section baru
- [x] Mockup list diperluas ke 13 layar
- [x] SWOT community sourcing diberi label "(roadmap jangka panjang)"
- [x] SWOT Threats diubah dengan framing inklusif
- [x] `03_HIPSTER_UX_DESIGN.md` diperbarui: UX Principles, Design Principles, Persona, Mockup screens, Component list
- [x] Tidak ada klaim usia, "gaptek", "tertinggal" dalam teks baru
- [x] Tidak ada mekanisme input usia yang ditambahkan ke proposal
