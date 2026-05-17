# ALL KUALI PROJECT DOCS

Gabungan semua file Markdown untuk mudah dicopy ke repository atau dibaca oleh Claude Code/Codex.



# File: docs/00_FINAL_IDEA_KUALI.md

````md
# 00 — Final Idea Kuali

> Source of truth ide final. File ini wajib dibaca sebelum mengerjakan proposal, desain, development, demo, dan pitch.

## 1. Nama Produk

**Kuali**

Catatan: nama ini masih perlu divalidasi secara manual sebelum dipakai publik/komersial. Jangan klaim nama aman secara legal sebelum cek domain, media sosial, PDKI/trademark, dan konflik brand lokal.

## 2. Tagline

**Order rapi, produksi siap.**

## 3. One-liner

**Kuali membantu UMKM kuliner yang berjualan lewat WhatsApp mengubah chat pesanan menjadi draft order, reminder pembayaran, estimasi bahan, dan rekap produksi harian.**

## 4. Product Vision

Kuali ingin menjadi asisten operasional ringan untuk UMKM kuliner WhatsApp-first. MVP tidak mencoba menjadi super app, POS lengkap, marketplace, atau platform supply-chain. Fokus awal adalah membantu owner merapikan order dan produksi harian yang sudah terjadi lewat WhatsApp.

Vision jangka panjang: ketika data order dan kebutuhan bahan sudah rapi, Kuali dapat berkembang menjadi platform operasional kuliner lokal yang mendukung community sourcing, supplier pooling, rescue sale opt-in, dan SaaS multi-tenant.

## 5. Problem Statement

Banyak UMKM kuliner sudah aktif berjualan lewat WhatsApp, tetapi proses operasional setelah chat masuk masih manual: pesanan tersebar di banyak chat, pembayaran perlu dicek satu per satu, bahan produksi dihitung pakai perkiraan, dan owner sering mengurus semuanya tanpa admin khusus.

## 6. Solution Statement

Kuali membantu owner mengubah chat pesanan menjadi draft order yang bisa dicek, menandai status pembayaran, memberi reminder QRIS dummy, menghitung kebutuhan bahan dari menu/resep sederhana, dan membuat rekap produksi harian.

## 7. Target User

UMKM kuliner WhatsApp-first seperti:

- Catering rumahan
- Nasi box
- Snack box
- Bakery rumahan
- Dessert box
- Frozen food
- Kopi literan
- Pre-order makanan rumahan

## 8. Persona Utama — Bu Rani

| Aspek | Detail |
|---|---|
| Nama | Bu Rani |
| Usia | 30–45 tahun |
| Usaha | Catering rumahan dan nasi box |
| Kanal jualan | WhatsApp, grup pelanggan, Instagram Story, repeat order |
| Volume order | 20–50 pesanan/hari saat ramai |
| Device | Android mid-low, sering dipakai sambil produksi |
| Kondisi tim | Tidak punya admin khusus atau hanya dibantu keluarga |
| Pain utama | Order tercecer, pembayaran belum jelas, bahan dihitung pakai feeling |
| Takut | Salah order, pelanggan kecewa, bahan kurang/berlebih, lupa tagih pembayaran |
| Butuh | Order rapi, reminder pembayaran, daftar bahan, rekap harian |

## 9. Jobs To Be Done

| Jenis Job | Kalimat JTBD |
|---|---|
| Functional | User sebenarnya tidak butuh POS lengkap, mereka butuh order WhatsApp tidak tercecer. |
| Emotional | User sebenarnya tidak butuh dashboard canggih, mereka butuh rasa tenang bahwa semua order sudah tercatat. |
| Financial | User sebenarnya tidak butuh laporan akuntansi rumit, mereka butuh tahu siapa yang belum bayar dan estimasi omzet harian. |
| Operational | User sebenarnya tidak butuh forecasting kompleks, mereka butuh tahu bahan apa yang harus disiapkan dari order aktual. |
| Customer service | User sebenarnya tidak butuh chatbot panjang, mereka butuh balasan konfirmasi yang cepat, sopan, dan konsisten. |
| Control/trust | User sebenarnya tidak butuh AI yang mengambil keputusan, mereka butuh AI yang membantu membuat draft lalu tetap bisa dicek owner. |

## 10. Core Value Proposition

**Kuali merapikan alur jualan WhatsApp UMKM kuliner: dari chat pelanggan menjadi order, pembayaran, dan rencana produksi yang lebih jelas.**

## 11. Positioning Statement

**Kuali bukan POS, bukan marketplace, dan bukan chatbot biasa. Kuali adalah asisten operasional WhatsApp-first untuk UMKM kuliner pre-order yang membantu merapikan pesanan, pembayaran, dan kebutuhan bahan harian.**

## 12. Subtema Hackathon

**Food & Culinary Business Tech**

Alasan: Kuali membantu pelaku usaha kuliner dalam efisiensi pesanan, pengelolaan bahan baku, rencana produksi, dan rekap operasional.

## 13. Kenapa Relevan dengan BuildLocal

- Fokus pada UMKM lokal, khususnya kuliner rumahan/pre-order.
- Mengikuti kebiasaan yang sudah dipakai: WhatsApp.
- Mobile-first dan ringan.
- AI dipakai untuk workflow nyata, bukan gimmick.
- QRIS hanya digunakan sebagai reminder dummy/milik merchant, bukan settlement real.
- Roadmap dapat mendukung ekosistem lokal seperti komunitas UMKM dan supplier bahan.

## 14. Kenapa WhatsApp-first

UMKM target sudah menggunakan WhatsApp untuk menerima pesanan. Membuat aplikasi baru yang memaksa customer install app akan memperbesar friction. Kuali menggunakan WhatsApp/mock WhatsApp sebagai pintu masuk dan dashboard sebagai alat bantu owner.

## 15. Kenapa AI Diperlukan

AI diperlukan karena chat pelanggan bersifat natural, tidak selalu rapi, dan sering mengandung variasi bahasa seperti:

- “Kak mau 12 risol buat besok jam 3.”
- “Ayam geprek 5 ya, ambil siang.”
- “Bayarnya nanti sore.”
- “Mau yang kemarin kayak biasa.”

AI dipakai untuk:

- Parsing chat menjadi structured JSON.
- Missing field detection.
- Suggested reply.
- Daily summary wording.

AI **tidak boleh**:

- Mengarang harga.
- Mengarang menu.
- Menghitung bahan tanpa data resep.
- Mengubah status pembayaran menjadi lunas tanpa input owner.
- Mengirim pesan tanpa approval/aturan.

## 16. Kenapa Bukan Chatbot Biasa

| Chatbot biasa | Kuali |
|---|---|
| Fokus balas pesan | Fokus workflow order dan produksi |
| Tidak punya data menu/resep | Terhubung dengan menu dan resep sederhana |
| Bisa menjawab bebas | Output dibatasi structured JSON |
| Bisa mengarang | Backend memvalidasi menu/harga/status |
| Tidak punya dashboard operasional | Ada order dashboard, production planner, impact dashboard |

## 17. Kenapa Bukan POS Biasa

POS biasanya dimulai dari transaksi kasir. Kuali dimulai dari **chat pre-order** sebelum transaksi final. Kuali tidak membuat fitur kasir lengkap, printer struk, meja, multi-cabang, full accounting, atau inventory kompleks di MVP.

## 18. MVP Scope

MVP wajib:

- Mock WhatsApp / chat order masuk
- AI Order Parser
- Structured output JSON
- Confidence score
- Missing field detector
- Owner approval/edit
- Order dashboard
- Payment reminder QRIS dummy
- Menu dan resep sederhana
- Production planner dari order aktual
- Daily summary
- Impact dashboard

## 19. Non-goals MVP

Jangan dibuat di MVP:

- Full POS
- Full inventory
- Marketplace
- Real QRIS settlement
- Flash sale otomatis
- Broadcast marketing tanpa opt-in
- Supplier pooling real
- Route optimization
- ML prediction kompleks
- Native mobile app berat
- Multi-tenant SaaS production-grade

## 20. Roadmap / Vision

Roadmap setelah MVP:

1. Real WhatsApp Business Cloud API.
2. n8n automation production-ready.
3. Auth multi-tenant.
4. Customer opt-in/opt-out system.
5. Community sourcing / belanja bareng.
6. Supplier pooling.
7. Rescue sale opt-in.
8. Stok sisa alert.
9. Google Cloud production deployment.
10. SaaS pricing dan billing.

## 21. Demo Story

Demo utama:

1. Bu Rani menerima chat order dari customer.
2. Chat masuk ke Mock WhatsApp UI.
3. AI mengubah chat menjadi draft order JSON.
4. Sistem menampilkan confidence score dan missing field.
5. Bu Rani approve/edit order.
6. Sistem membuat payment reminder QRIS dummy.
7. Order masuk dashboard.
8. Production planner menghitung bahan dari order aktual.
9. Daily summary menampilkan order, unpaid, perlu cek, dan bahan.
10. Optional card: community sourcing/rescue sale sebagai roadmap simulation, bukan MVP utama.

## 22. Impact Metrics

Gunakan metrik aman, bukan overclaim:

| Metric | Cara Mengukur |
|---|---|
| Jumlah order berhasil diparse | Dari dummy chat/order live demo |
| Jumlah order perlu cek | Confidence rendah/missing field |
| Jumlah order belum bayar | Payment status unpaid |
| Reminder terkirim | Notification log dummy |
| Estimasi bahan | Order aktual × resep |
| Waktu rekap simulasi | Manual vs bantuan draft order |
| Daily summary generated | Sistem menghasilkan ringkasan harian |

Jangan klaim:

- Profit naik pasti.
- Food waste turun sekian persen.
- Semua UMKM pasti terbantu.
- Semua stok sisa pasti laku.
- Harga bahan pasti lebih murah.

## 23. Narrative Safety

Framing aman:

> UMKM kuliner sudah aktif menggunakan WhatsApp. Tantangannya bukan mereka belum digital, tetapi proses operasional di belakang chat masih sering manual.

Kuali membantu, bukan menggantikan.

## 24. Kalimat yang Boleh Dipakai

- “Membantu owner merapikan order dari WhatsApp.”
- “AI membuat draft, owner tetap memegang kendali.”
- “Estimasi bahan berdasarkan order aktual dan resep yang dimasukkan owner.”
- “Reminder pembayaran menggunakan QRIS dummy/milik merchant.”
- “Belanja bareng dan rescue sale adalah roadmap berbasis consent, bukan klaim MVP.”
- “MVP fokus pada order operation dan production planner.”

## 25. Kalimat yang Harus Dihindari

- “UMKM gaptek.”
- “UMKM tertinggal.”
- “Pemerintah belum cukup membantu.”
- “AI menggantikan admin.”
- “Food waste pasti turun.”
- “Harga bahan pasti lebih murah.”
- “Semua stok sisa pasti laku.”
- “Broadcast otomatis ke pelanggan sekitar.”
- “QRIS settlement otomatis.”
- “Kuali adalah super app UMKM kuliner.”

## 26. Final Pitch 30 Detik

Banyak UMKM kuliner sudah aktif berjualan lewat WhatsApp. Tantangannya, setelah chat masuk, proses rekap order, pembayaran, dan kebutuhan bahan masih sering manual. Kuali membantu mengubah chat pesanan menjadi draft order, reminder pembayaran QRIS dummy, dan rencana produksi harian. AI hanya membantu membuat draft dan insight, sementara keputusan tetap di tangan pemilik usaha.

## 27. Final Pitch 1 Menit

Kuali adalah asisten operasional WhatsApp-first untuk UMKM kuliner seperti catering rumahan, snack box, bakery, dan pre-order makanan. Kami tidak berangkat dari asumsi bahwa UMKM belum digital. Justru banyak dari mereka sudah aktif memakai WhatsApp. Masalahnya ada di proses setelah chat masuk: order harus dicatat ulang, pembayaran dicek satu-satu, dan bahan produksi dihitung pakai perkiraan. Kuali membaca chat pelanggan menjadi draft order dengan structured output, menampilkan confidence score, memberi ruang owner untuk approve atau edit, lalu membantu membuat reminder pembayaran QRIS dummy dan production planner berdasarkan order aktual. Untuk MVP, kami fokus pada order operation dan production planner. Fitur belanja bareng dan rescue sale kami posisikan sebagai roadmap, bukan klaim MVP.

## 28. Final Closing Statement

**Kuali tidak mengganti cara UMKM berjualan. Kuali membantu merapikan alur yang sudah mereka pakai setiap hari: dari chat pelanggan menjadi order dan produksi yang lebih siap.**

## 29. Scope Reminder untuk Tim dan AI Agent

- Kuali MVP bukan super app.
- Core MVP tetap order operation + production planner.
- Belanja bareng dan rescue sale hanya roadmap/demo simulation.
- Selalu CHECK sebelum IMPLEMENT.
- Jangan rebuild jika fitur sudah ada.
- Jangan menambah fitur roadmap ke MVP tanpa approval leader.

````


# File: docs/01_BASELINE_PROPOSAL_PHASE.md

````md
# 01 — Baseline Proposal Phase

> Fokus file ini: Phase 0, yaitu baseline proposal dan concept readiness. Jangan mengerjakan full production dari file ini.

## 1. Tujuan Phase 0

PHASE 0 — Baseline Proposal Phase bertujuan membuat fondasi ide, proposal, pitch awal, mockup, arsitektur, dan demo concept. Di fase ini belum perlu full app production. Fokusnya adalah membuat project terlihat jelas, feasible, dan siap dibagi ke anggota tim.

## 2. Output Phase 0

Output wajib:

- Ide final jelas.
- Problem-solution jelas.
- Pitch narrative aman.
- Mockup flow low/mid fidelity.
- Demo storyboard.
- Tech architecture baseline.
- Initial repo/docs.
- Data dummy.
- UI moodboard.
- AI parser concept.
- Sprint planning.
- Risk mitigation list.
- Task assignment awal.

## 3. Deliverables Proposal

| Deliverable | Format | Owner | Status Awal | Acceptance Criteria |
|---|---|---|---|---|
| Final idea summary | Markdown/slide | LEAD | BLUE / IN_REVIEW | Nama, tagline, problem, solution jelas |
| Problem statement | Markdown/slide | HUSTLER-A/B | GREY / NOT_STARTED | Tidak menyinggung UMKM/pemerintah |
| Persona Bu Rani | Markdown/slide | HUSTLER-B | GREY / NOT_STARTED | Ada pain, behavior, need |
| User journey | Diagram/table | HIPSTER-A/B | GREY / NOT_STARTED | Flow customer-owner-system jelas |
| Mockup low fidelity | Figma/Canva/image | HIPSTER-B | GREY / NOT_STARTED | Minimal dashboard, order detail, planner |
| Tech architecture | Diagram + docs | LEAD/HACKER-A | GREY / NOT_STARTED | Stack dan data flow jelas |
| AI parser schema draft | JSON/Markdown | HACKER-A | GREY / NOT_STARTED | Ada input/output JSON |
| Dummy data | JSON/CSV | HACKER-B/HUSTLER-B | GREY / NOT_STARTED | Menu, chat, order, bahan tersedia |
| Proposal outline | Markdown/Docs | HUSTLER-B | GREY / NOT_STARTED | Siap dipindah ke template proposal |
| Demo storyboard | Markdown | LEAD/HIPSTER-B | GREY / NOT_STARTED | Alur 3–5 menit jelas |

## 4. Baseline Mockup Requirement

Mockup minimal:

1. Mock WhatsApp order screen.
2. AI parsing result / draft order card.
3. Owner approval screen.
4. Order dashboard.
5. Payment reminder QRIS dummy preview.
6. Production planner.
7. Daily summary / impact dashboard.
8. Roadmap simulation card: community sourcing atau rescue sale, diberi label “Roadmap Simulation”.

Acceptance criteria:

- Mobile-first 360–430px.
- Bahasa Indonesia.
- Tombol besar.
- Status order jelas.
- Tidak terlihat seperti POS kasir lengkap.
- Tidak menampilkan fitur roadmap sebagai fitur aktif MVP.

## 5. Baseline Pitch Narrative

Narasi utama:

> Banyak UMKM kuliner sudah aktif menggunakan WhatsApp. Tantangannya bukan mereka belum digital, tetapi proses operasional di belakang chat masih sering manual.

Pitch harus menjelaskan:

- Masalah order WhatsApp tersebar.
- Pembayaran perlu dicek manual.
- Bahan produksi masih dihitung pakai perkiraan.
- Kuali membantu membuat draft order, reminder pembayaran, production planner, dan daily summary.
- AI membantu, owner tetap pegang kendali.
- Roadmap belanja bareng/rescue sale bukan MVP.

## 6. Baseline Technical Architecture

Baseline architecture:

```txt
Mock WhatsApp UI
  ↓
Next.js API Route /api/ai/parse-order
  ↓
AI Parser structured JSON
  ↓
Backend validation against menu/recipe data
  ↓
Draft Order + Confidence Score
  ↓
Owner Dashboard
  ↓
Owner Approval
  ↓
QRIS Dummy Reminder + Production Planner + Daily Summary
```

Baseline tech decisions:

- Next.js App Router first.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Supabase PostgreSQL + Prisma.
- Mock WhatsApp first.
- AI parser structured JSON.
- QRIS dummy only.
- n8n optional, not dependency utama.

## 7. Baseline Demo Concept

Demo 3 menit:

1. Problem visual: chat order berantakan.
2. Customer order via mock WhatsApp.
3. AI parser mengubah chat menjadi JSON/order card.
4. Owner approve.
5. Reminder QRIS dummy.
6. Production planner menghitung bahan.
7. Daily summary / impact dashboard.
8. Closing.

Demo plus 5 menit:

- Tambahkan low-confidence case.
- Tambahkan roadmap simulation card: belanja bareng atau rescue sale opt-in.

## 8. Baseline Dummy Data

Data yang wajib disiapkan:

- Business: Katering Bu Rani.
- 8 menu dummy.
- 10 bahan dummy.
- 5 resep sederhana.
- 10 customer dummy.
- 20 order dummy.
- 15 chat dummy, termasuk typo dan ambiguous.
- QRIS dummy image.
- 1 daily summary dummy.
- 1 impact dashboard dummy.

Contoh chat utama:

> “Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya.”

## 9. Baseline Role Task

| Role | Fokus Phase 0 |
|---|---|
| LEAD | Final idea, scope, repo/docs, architecture, task split |
| HACKER-A | AI parser concept, architecture, integration plan |
| HACKER-B | DB entity draft, backend baseline, seed plan |
| HACKER-C | Frontend baseline, UI skeleton plan |
| HUSTLER-B | Problem validation, competitor comparison, impact narrative |
| HIPSTER-B | Mockup, moodboard, design system draft |

## 10. Baseline Risk Checklist

- [ ] Narasi tidak menyebut UMKM gaptek/tertinggal.
- [ ] Belanja bareng tidak diklaim sebagai fitur MVP.
- [ ] Rescue sale tidak diklaim sebagai stok pasti ludes.
- [ ] QRIS hanya dummy/reminder.
- [ ] AI hanya draft, owner approval wajib.
- [ ] Food waste/profit tidak diklaim naik/turun pasti.
- [ ] Mock WhatsApp jelas sebagai demo-safe.
- [ ] Proposal tidak terlihat seperti super app.

## 11. Baseline File/Repo Checklist

- [ ] `README.md`
- [ ] `docs/00_FINAL_IDEA_KUALI.md`
- [ ] `docs/01_BASELINE_PROPOSAL_PHASE.md`
- [ ] `docs/02_LEADER_SETUP_AND_HANDOFF.md`
- [ ] `docs/03_ROLE_AND_TEAM_WORKFLOW.md`
- [ ] `docs/04_BASELINE_SPRINT_TASK_BOARD.md`
- [ ] `docs/05_FULL_MVP_PRODUCTION_PLAN.md`
- [ ] `docs/06_CODEX_CLAUDE_EXECUTION_GUIDE.md`
- [ ] `docs/07_STATUS_REPORT_AND_DECISION_LOG.md`
- [ ] `data/dummy-chats.json`
- [ ] `data/dummy-menu.json`
- [ ] `data/dummy-ingredients.json`
- [ ] `data/dummy-orders.json`

## 12. Baseline Success Criteria

Phase 0 sukses jika:

- Tim bisa menjelaskan Kuali dalam 30 detik.
- Scope MVP jelas dan tidak melebar.
- Ada proposal outline.
- Ada mockup flow.
- Ada architecture diagram.
- Ada dummy data.
- Ada AI parser schema draft.
- Ada task board untuk Phase 1.
- Semua role tahu task pertama.

## 13. Task Board Phase 0

Status default: GREY / NOT_STARTED. Task yang ide final sudah disepakati diberi BLUE / IN_REVIEW.

| Task ID | Task | Owner | Role | Status | Priority | Check | Decide | Implement | Verify | Report | Acceptance Criteria |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P0-001 | Finalisasi nama Kuali | LEAD | LEAD | BLUE / IN_REVIEW | P0 | Cek alternatif nama dan risiko legal | Pakai Kuali sementara | Tulis nama/tagline di docs | Review bersama tim | Catat di decision log | Nama dan tagline disetujui sementara |
| P0-002 | Finalisasi problem statement | LEAD + HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P0 | Cek narasi aman | Gunakan framing WhatsApp-first | Tulis problem final | Tidak ada kata gaptek/tertinggal | Update proposal | Problem statement siap deck |
| P0-003 | Finalisasi pitch positioning | LEAD | LEAD | GREY / NOT_STARTED | P0 | Cek versi DapurFlow vs Kuali | Kuali = rebrand + core DapurFlow | Tulis positioning | Review 30 detik | Laporkan final | Positioning tidak super app |
| P0-004 | Competitor comparison ringan | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P1 | Cek WA Business, POS, ChatGPT | Bandingkan singkat | Buat tabel | Review akurasi | Tambah ke proposal | Ada diferensiasi jelas |
| P0-005 | Buat user persona Bu Rani | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P0 | Cek target user | Pakai persona catering rumahan | Tulis persona | Review relevansi | Simpan docs | Persona punya pain dan JTBD |
| P0-006 | Buat user journey baseline | HIPSTER-B | HIPSTER | GREY / NOT_STARTED | P0 | Cek flow demo | Pakai flow chat→order→planner | Buat table journey | Review dengan LEAD | Update docs | Journey mudah dipahami |
| P0-007 | Mockup low fidelity | HIPSTER-B | HIPSTER | GREY / NOT_STARTED | P0 | Cek required screens | Buat mobile-first | Mock 6–8 screen | Review visual flow | Export screenshot | Mockup siap proposal |
| P0-008 | UI moodboard | HIPSTER-B | HIPSTER | GREY / NOT_STARTED | P1 | Cek tone UMKM | Pilih warna/status | Buat moodboard | Review readability | Laporkan link | Moodboard mobile-friendly |
| P0-009 | Tech architecture diagram | LEAD/HACKER-A | HACKER | GREY / NOT_STARTED | P0 | Cek stack final | Next.js fullstack first | Buat diagram teks/visual | Review feasibility | Update docs | Diagram punya data flow jelas |
| P0-010 | Database entity draft | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | Cek module MVP | Pakai entity minimal | Draft ERD | Review schema | Simpan docs | Entity cukup untuk MVP |
| P0-011 | AI parser JSON schema draft | HACKER-A | HACKER | GREY / NOT_STARTED | P0 | Cek sample chat | Tentukan field output | Buat schema JSON | Test manual 3 chat | Laporkan format | JSON tidak mengarang harga |
| P0-012 | Dummy chat data | HUSTLER-B/HACKER-A | HUSTLER/HACKER | GREY / NOT_STARTED | P0 | Cek demo story | Buat 15 chat | Tulis JSON/MD | Review variasi | Simpan data | Ada happy + edge case |
| P0-013 | Dummy menu/resep/bahan | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | Cek target kuliner | Pilih 8 menu | Buat data dummy | Validasi calculation | Simpan data | Data cocok production planner |
| P0-014 | Proposal outline | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P0 | Cek guidebook/template | Tentukan section | Buat outline | Review LEAD | Update docs | Outline siap dipindah ke proposal |
| P0-015 | Pitch deck outline | LEAD + HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P1 | Cek demo story | 10–12 slide | Buat outline | Review flow | Simpan docs | Slide logic jelas |
| P0-016 | Demo storyboard | LEAD + HIPSTER-B | LEAD/HIPSTER | GREY / NOT_STARTED | P0 | Cek demo scenes | 3–5 menit | Buat storyboard | Dry-run verbal | Update docs | Aha moment jelas |
| P0-017 | README awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | Cek repo existing | Buat README ringkas | Tulis setup/docs index | Review | Commit | README bantu anggota start |
| P0-018 | Repo structure awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | Cek file existing | Tentukan folder | Buat folder docs/data | Verify tree | Report | Repo siap dikerjakan |
| P0-019 | Decision log awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | Cek keputusan existing | Pakai template | Isi initial decisions | Review | Update log | Ada catatan scope |
| P0-020 | Risk mitigation list | LEAD + HUSTLER-B | LEAD/HUSTLER | GREY / NOT_STARTED | P0 | Cek risiko utama | Pilih mitigasi | Buat tabel | Review | Update docs | Risiko tidak disembunyikan |
| P0-021 | Task assignment awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | Cek kapasitas tim | Bagi task role | Isi task board | Review tim | Publish | Semua punya task pertama |

````


# File: docs/02_LEADER_SETUP_AND_HANDOFF.md

````md
# 02 — Leader Setup and Handoff

> File ini khusus untuk leader. Tujuannya agar leader memegang arah, bukan menjadi bottleneck.

## 1. Peran Leader

Leader bertanggung jawab sebagai:

- Product Owner
- Tech Lead
- System Architect
- Integrator
- AI/Automation direction owner
- Pitch direction owner
- Final decision maker

Leader tidak harus mengerjakan semua fitur. Leader wajib membuat fondasi, membagi task, menjaga scope, review hasil, dan mengintegrasikan output tim.

## 2. Hal yang Leader Own Sepenuhnya

- Final product scope.
- Nama/positioning final.
- Architecture decision.
- Tech stack decision.
- API convention.
- Database schema baseline.
- AI guardrail.
- MVP vs roadmap boundary.
- PR approval untuk perubahan besar.
- Final integration.
- Demo flow final.
- Pitch framing final.
- Scope change approval.

## 3. Hal yang Leader Setup Lalu Delegasikan

| Area | Setup Leader | Delegasi ke |
|---|---|---|
| Frontend | UI skeleton, route plan, component convention | HACKER-C / HIPSTER-B |
| Backend | Prisma baseline, API convention | HACKER-B |
| AI | Prompt strategy, output schema, guardrail | HACKER-A / AI task |
| Docs | Docs structure, template | HUSTLER-B / QA docs |
| Mockup | UX direction | HIPSTER-B |
| Pitch | Narrative skeleton | HUSTLER-B |
| Demo | Scene list | Semua role sesuai modul |

## 4. Hal yang Tidak Boleh Leader Pegang Sendiri

- Semua halaman UI.
- Semua CRUD endpoint.
- Semua styling detail.
- Semua test case.
- Semua deck design.
- Semua dummy data.
- Semua README update.
- Semua bug kecil.
- Semua component implementation.

Jika leader mengerjakan semua, tim akan pasif dan integrasi terlambat.

## 5. Project Setup Checklist

CHECK:

- [ ] Cek apakah repo sudah ada.
- [ ] Cek apakah ada file lama yang harus dipertahankan.
- [ ] Cek apakah docs sudah dibuat.
- [ ] Cek dependency tim: frontend/backend/AI.

DECIDE:

- [ ] Next.js fullstack first.
- [ ] Supabase PostgreSQL + Prisma.
- [ ] Mock WhatsApp first.
- [ ] QRIS dummy only.
- [ ] Roadmap features tidak masuk MVP.

IMPLEMENT:

- [ ] Buat repo/folder.
- [ ] Buat docs.
- [ ] Buat `.env.example`.
- [ ] Buat dummy data.
- [ ] Buat task board.
- [ ] Buat README.

VERIFY:

- [ ] Project bisa di-clone.
- [ ] Docs bisa dibaca tim.
- [ ] Task pertama jelas.
- [ ] Tidak ada fitur roadmap di MVP task.

REPORT:

- [ ] Kirim repo link.
- [ ] Kirim folder structure.
- [ ] Kirim task assignment.
- [ ] Kirim blocker/decision needed.

## 6. Repo Setup Checklist

- [ ] Buat repository `kuali` atau `kuali-ai`.
- [ ] Tambahkan README awal.
- [ ] Tambahkan `.gitignore`.
- [ ] Tambahkan `docs/`.
- [ ] Tambahkan `data/` untuk dummy JSON.
- [ ] Tambahkan `.env.example`.
- [ ] Tambahkan branch `main` dan `dev`.
- [ ] Buat GitHub Issues/Projects jika sempat.

## 7. Folder Structure

Rekomendasi Next.js fullstack:

```txt
kuali/
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   ├── orders/
│   ├── production/
│   ├── summary/
│   ├── impact/
│   └── api/
│       ├── health/
│       ├── orders/
│       ├── menus/
│       ├── ingredients/
│       ├── ai/
│       ├── webhooks/
│       └── notifications/
├── components/
│   ├── ui/
│   ├── kuali/
│   └── layout/
├── lib/
│   ├── ai/
│   ├── db/
│   ├── validators/
│   ├── constants.ts
│   └── dummy-data.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── data/
│   ├── dummy-chats.json
│   ├── dummy-menu.json
│   ├── dummy-ingredients.json
│   └── dummy-orders.json
├── docs/
├── public/
│   └── qris-dummy.png
├── .env.example
├── README.md
└── package.json
```

## 8. Environment Variables

`.env.example`:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""

# AI Provider
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
AI_PROVIDER="openai"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Demo
USE_MOCK_AI="true"
USE_MOCK_WHATSAPP="true"
```

## 9. Database Setup Plan

CHECK:

- [ ] Cek apakah Supabase project sudah ada.
- [ ] Cek apakah `DATABASE_URL` tersedia.
- [ ] Cek apakah tim butuh local DB fallback.

DECIDE:

- Primary: Supabase PostgreSQL.
- Fallback: Docker PostgreSQL local.
- ORM: Prisma.

IMPLEMENT:

- Buat Supabase project.
- Copy connection string.
- Setup Prisma.
- Buat schema baseline.
- Jalankan migration.
- Jalankan seed.

VERIFY:

- `npx prisma db push` sukses.
- `npx prisma studio` bisa buka data.
- Seed data muncul.

REPORT:

- Share env variable via channel aman, bukan commit.
- Update docs jika ada perubahan.

## 10. Prisma Setup Plan

- [ ] Install Prisma.
- [ ] Init Prisma.
- [ ] Buat models MVP.
- [ ] Buat enum status order/payment.
- [ ] Buat seed script.
- [ ] Tambah npm script:
  - `db:push`
  - `db:seed`
  - `db:studio`

## 11. Supabase Setup Plan

- [ ] Buat project Supabase.
- [ ] Pilih region yang stabil.
- [ ] Ambil PostgreSQL connection string.
- [ ] Disable RLS untuk MVP demo jika memakai Prisma direct DB, atau tulis keputusan di decision log.
- [ ] Jangan expose service role key di frontend.

## 12. Docker Local Fallback Plan

`docker-compose.yml` optional:

```yaml
services:
  postgres:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: kuali
      POSTGRES_PASSWORD: kuali
      POSTGRES_DB: kuali
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

## 13. AI Key Setup Plan

- [ ] Gunakan `OPENAI_API_KEY` atau `ANTHROPIC_API_KEY`.
- [ ] Jangan commit key.
- [ ] Tambah `USE_MOCK_AI=true` fallback.
- [ ] AI parser harus support cached response.
- [ ] AI tidak boleh mengarang menu/harga.

## 14. Mock WhatsApp Setup Plan

- [ ] Buat page `/mock-whatsapp` atau component di dashboard.
- [ ] Textarea input chat.
- [ ] Button “Kirim ke Kuali”.
- [ ] API call ke `/api/ai/parse-order`.
- [ ] Tampilkan raw chat + parsed order.
- [ ] Simpan draft order setelah owner approve.

## 15. UI Skeleton Setup Plan

Routes MVP:

- `/` landing/demo entry.
- `/dashboard` today dashboard.
- `/mock-whatsapp` chat simulator.
- `/orders` order list.
- `/orders/[id]` order detail.
- `/menus` menu & recipe.
- `/production` production planner.
- `/summary` daily summary.
- `/impact` impact dashboard.

## 16. API Convention Setup

Base response:

```ts
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
};
```

Rules:

- Use JSON.
- Use Zod validation.
- Return clear error messages.
- Never expose API keys.
- Keep endpoints demo-safe.

## 17. Branching Strategy

- `main`: stable demo/submission.
- `dev`: integration.
- `feature/*`: feature branch.
- `fix/*`: bugfix.
- `docs/*`: documentation.

Rules:

- Work from `dev`.
- PR to `dev`.
- Merge to `main` only after demo verified.

## 18. Commit Convention

Format:

```txt
feat(scope): short description
fix(scope): short description
docs(scope): short description
chore(scope): short description
refactor(scope): short description
```

Examples:

- `feat(ai): add order parser mock response`
- `feat(ui): add mobile dashboard shell`
- `docs(plan): add phase 0 task board`
- `fix(order): handle missing pickup time`

## 19. PR Review Rule

PR wajib berisi:

- Summary.
- Files changed.
- How to test.
- Screenshot/video if UI.
- Risk.
- Checklist acceptance criteria.

Leader review:

- Cek scope.
- Cek tidak merusak demo.
- Cek tidak menambah roadmap features.
- Cek build/lint jika ada.

## 20. Handoff Checklist ke Frontend

- [ ] Route list.
- [ ] Dummy data.
- [ ] UI copy Bahasa Indonesia.
- [ ] Component list.
- [ ] Status badge rules.
- [ ] API contract.
- [ ] Acceptance criteria per page.

## 21. Handoff Checklist ke Backend

- [ ] Entity list.
- [ ] Prisma schema baseline.
- [ ] API endpoint list.
- [ ] Validation rules.
- [ ] Seed data plan.
- [ ] AI output schema.
- [ ] Payment dummy rule.

## 22. Handoff Checklist ke AI/Automation

- [ ] Prompt purpose.
- [ ] Structured JSON schema.
- [ ] Sample chats.
- [ ] Menu data.
- [ ] Guardrails.
- [ ] Mock AI fallback.
- [ ] No real WhatsApp dependency.

## 23. Handoff Checklist ke Hustler/Research

- [ ] Problem statement.
- [ ] Persona.
- [ ] Competitor comparison.
- [ ] Impact metrics.
- [ ] Business model draft.
- [ ] Safe narrative rules.

## 24. Handoff Checklist ke Hipster/UI

- [ ] Brand direction.
- [ ] Tagline.
- [ ] Required screens.
- [ ] Mobile-first rules.
- [ ] Design system basics.
- [ ] Mockup acceptance criteria.

## 25. Leader Daily Checklist

- [ ] Cek task status.
- [ ] Cek blocker.
- [ ] Review PR.
- [ ] Update decision log.
- [ ] Potong scope jika melebar.
- [ ] Pastikan demo flow tetap jalan.
- [ ] Pastikan docs update.
- [ ] Pastikan semua role punya next task.

## 26. Leader Decision-Making Rule

Jika ada konflik:

1. Demo stability menang atas fitur baru.
2. MVP scope menang atas roadmap.
3. Mock/fallback menang atas live integration yang belum stabil.
4. Narasi aman menang atas klaim besar.
5. Data aktual/dummy jelas menang atas overclaim AI.

## 27. Anti-Bottleneck Rule

Leader harus:

- Setup sekali, delegasikan eksekusi.
- Buat task kecil.
- Jangan semua PR menunggu review lama.
- Beri anggota ownership modul.
- Jangan pegang semua UI/backend/docs sendiri.
- Gunakan `IN_REVIEW` untuk review cepat.

## 28. Checklist Project Siap Dikerjakan Tim

- [ ] Repo bisa di-clone.
- [ ] README ada.
- [ ] Docs ada.
- [ ] Folder structure jelas.
- [ ] `.env.example` ada.
- [ ] Dummy data ada.
- [ ] Task board ada.
- [ ] Role assignment ada.
- [ ] Scope MVP jelas.
- [ ] Non-goals jelas.

## 29. Checklist Task Siap Diambil Anggota

- [ ] Task ID jelas.
- [ ] Owner jelas.
- [ ] Priority jelas.
- [ ] Dependencies jelas.
- [ ] CHECK instructions jelas.
- [ ] IMPLEMENT instructions jelas.
- [ ] Acceptance criteria ada.
- [ ] Deadline/phase jelas.

## 30. Checklist Task Selesai dan Siap Review

- [ ] Task sesuai acceptance criteria.
- [ ] Tidak keluar scope.
- [ ] Tidak merusak fitur lain.
- [ ] Files changed jelas.
- [ ] Screenshot/video jika UI.
- [ ] Test manual dilakukan.
- [ ] Report ditulis.

## 31. Checklist Task Boleh Merge

- [ ] PR review selesai.
- [ ] Build tidak rusak.
- [ ] Scope aman.
- [ ] Demo flow tidak terganggu.
- [ ] Konflik merge resolved.
- [ ] Docs update jika perlu.

## 32. Checklist Task Harus Rollback

Rollback jika:

- [ ] Build gagal dan tidak cepat diperbaiki.
- [ ] Merusak demo flow utama.
- [ ] Menghapus file penting tanpa approval.
- [ ] Menambah fitur roadmap ke MVP.
- [ ] Mengubah DB provider/architecture tanpa approval.
- [ ] Membocorkan API key/secret.

````


# File: docs/03_ROLE_AND_TEAM_WORKFLOW.md

````md
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

````


# File: docs/04_BASELINE_SPRINT_TASK_BOARD.md

````md
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
| P0-A02 | 0 | Problem statement final | LEAD/HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P0 | P0-A01 | Cek narasi aman | Pakai WhatsApp-first framing | Tulis problem | Review bahasa | Update docs | Tidak ada kata gaptek/tertinggal |
| P0-A03 | 0 | Solution statement final | LEAD | LEAD | GREY / NOT_STARTED | P0 | P0-A02 | Cek MVP scope | Fokus order+planner | Tulis solusi | Review dengan mock flow | Update docs | Solusi ringkas dan realistis |
| P0-A04 | 0 | Persona Bu Rani | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P0 | P0-A02 | Cek target user | Buat 1 persona utama | Tulis persona | Review relevansi | Report | Persona usable di deck |
| P0-A05 | 0 | JTBD | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P1 | P0-A04 | Cek pain points | Pilih 5 JTBD | Tulis JTBD | Review | Update docs | JTBD jelas dan praktis |
| P0-B01 | 0 | Validasi nama Kuali manual | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P1 | P0-A01 | Cek Google/domain/social/PDKI | Pakai sementara jika aman | Buat checklist hasil | Review leader | Report risiko | Tidak klaim legal availability |
| P0-B02 | 0 | Final tagline | LEAD/HIPSTER-B | HIPSTER | GREY / NOT_STARTED | P0 | P0-A01 | Cek opsi tagline | Pakai “Order rapi, produksi siap” | Update docs | Review tim | Decision log | Tagline pendek dan aman |
| P0-C01 | 0 | Competitor comparison ringan | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P1 | P0-A03 | Cek WA Business/POS/ChatGPT | Tabel ringkas | Tulis comparison | Review accuracy | Report | Diferensiasi jelas |
| P0-C02 | 0 | Impact metrics baseline | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P0 | P0-A03 | Cek metrik aman | Gunakan simulasi rendah hati | Tulis metrics | Review no overclaim | Update docs | Tidak klaim profit/waste pasti |
| P0-C03 | 0 | Proposal outline | HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P0 | P0-A02 | Cek template proposal | Tentukan section | Tulis outline | Review LEAD | Report | Siap dipindah ke proposal |
| P0-C04 | 0 | Pitch deck outline | LEAD/HUSTLER-B | HUSTLER | GREY / NOT_STARTED | P1 | P0-C03 | Cek demo flow | 10–12 slide | Tulis outline | Review | Update docs | Slide story jelas |
| P0-D01 | 0 | User journey table | HIPSTER-B | HIPSTER | GREY / NOT_STARTED | P0 | P0-A04 | Cek persona | Flow 10–12 step | Buat table | Review | Report | Journey bisa jadi demo script |
| P0-D02 | 0 | Low fidelity mockup | HIPSTER-B | HIPSTER | GREY / NOT_STARTED | P0 | P0-D01 | Cek required screens | Mobile-first | Buat mockup | Review leader | Share link | Minimal 6 screen |
| P0-D03 | 0 | UI moodboard | HIPSTER-B | HIPSTER | GREY / NOT_STARTED | P1 | P0-B02 | Cek brand tone | Pilih warna/status | Buat moodboard | Review | Report | Cocok UMKM, tidak terlalu techy |
| P0-D04 | 0 | UX copy Bahasa Indonesia | HIPSTER-B/HUSTLER-B | HIPSTER | GREY / NOT_STARTED | P1 | P0-D02 | Cek screen | Pakai bahasa sederhana | Tulis copy | Review | Update docs | Copy tidak jargon |
| P0-E01 | 0 | Repo structure awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | None | Cek repo existing | Next.js structure | Buat folder | Verify tree | Report | Repo siap dikembangkan |
| P0-E02 | 0 | README awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | P0-E01 | Cek docs | README ringkas | Tulis README | Review | Commit | Anggota bisa start |
| P0-E03 | 0 | Docs index | LEAD | LEAD | GREY / NOT_STARTED | P0 | P0-E01 | Cek docs files | 8 file docs | Buat docs | Verify | Report | Docs lengkap |
| P0-F01 | 0 | Architecture diagram baseline | LEAD/HACKER-A | HACKER | GREY / NOT_STARTED | P0 | P0-A03 | Cek stack | Next.js+Supabase+AI | Buat diagram | Review | Update docs | Data flow jelas |
| P0-G01 | 0 | Database entity draft | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | P0-F01 | Cek modules | Entity minimal | Draft ERD | Review | Report | Cukup untuk MVP |
| P0-G02 | 0 | Prisma schema draft | HACKER-B | HACKER | GREY / NOT_STARTED | P1 | P0-G01 | Cek entity | Draft schema | Tulis schema draft | Review | Report | Belum perlu migration jika repo belum siap |
| P0-H01 | 0 | AI parser schema draft | HACKER-A | HACKER | GREY / NOT_STARTED | P0 | P0-A03 | Cek sample chat | Tentukan JSON field | Tulis schema | Validate manual | Report | Output structured dan aman |
| P0-H02 | 0 | Prompt guardrail draft | HACKER-A | HACKER | GREY / NOT_STARTED | P1 | P0-H01 | Cek risiko AI | Guardrail no hallucination | Tulis prompt | Review | Report | AI tidak mengarang menu/harga |
| P0-I01 | 0 | Dummy chat data | HUSTLER-B/HACKER-A | HUSTLER/HACKER | GREY / NOT_STARTED | P0 | P0-H01 | Cek demo story | Buat variasi chat | Tulis JSON | Review | Report | Ada happy dan edge case |
| P0-I02 | 0 | Dummy menu/resep/bahan | HACKER-B | HACKER | GREY / NOT_STARTED | P0 | P0-G01 | Cek target menu | 8 menu, 10 bahan | Tulis JSON | Review calc | Report | Data bisa dipakai planner |
| P0-L01 | 0 | Demo storyboard | LEAD/HIPSTER-B | LEAD/HIPSTER | GREY / NOT_STARTED | P0 | P0-D01 | Cek demo 3 menit | Pilih scenes | Tulis storyboard | Dry-run verbal | Report | Aha moment jelas |
| P0-M01 | 0 | Risk mitigation list | LEAD/HUSTLER-B | LEAD/HUSTLER | GREY / NOT_STARTED | P0 | P0-A03 | Cek risiko | Tabel mitigasi | Tulis risk list | Review | Update docs | Risiko utama tercover |
| P0-N01 | 0 | Decision log awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | P0-A01 | Cek keputusan | Pakai template | Isi log | Review | Commit | Scope decisions tercatat |
| P0-N02 | 0 | Task assignment awal | LEAD | LEAD | GREY / NOT_STARTED | P0 | All above | Cek kapasitas tim | Bagi task | Update board | Review tim | Report | Semua role punya task |

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

````


# File: docs/05_FULL_MVP_PRODUCTION_PLAN.md

````md
# 05 — Full MVP Production Plan

> File ini untuk MVP prototype dan roadmap production. Jangan pakai file ini untuk memasukkan roadmap ke MVP tanpa approval.

## 1. Tech Decisions

| Area | Decision |
|---|---|
| App | Next.js fullstack first |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase PostgreSQL |
| ORM | Prisma |
| Local fallback | Docker PostgreSQL optional |
| AI | OpenAI/Anthropic structured JSON |
| WhatsApp | Mock WhatsApp first |
| Automation | n8n optional |
| Real WhatsApp | Meta WhatsApp Cloud API roadmap |
| Payment | QRIS dummy only in MVP |
| Production planner | Backend formula, not AI hallucination |
| Owner approval | Required before final order |

## 2. MVP Architecture

```txt
Browser / Mobile PWA
  ├─ Mock WhatsApp UI
  ├─ Owner Dashboard
  ├─ Order Detail
  ├─ Production Planner
  ├─ Daily Summary
  └─ Impact Dashboard
       ↓
Next.js API Routes
  ├─ /api/ai/parse-order
  ├─ /api/orders
  ├─ /api/menus
  ├─ /api/ingredients
  ├─ /api/production-plan
  ├─ /api/daily-summary
  └─ /api/notifications/payment-reminder
       ↓
Prisma ORM
       ↓
Supabase PostgreSQL
       ↓
AI Provider (optional live, fallback mock)
```

## 3. Full Production Architecture

```txt
Customer WhatsApp
  ↓
Meta WhatsApp Cloud API
  ↓
n8n / Webhook Gateway
  ↓
Kuali Backend API
  ├─ AI Parser Service
  ├─ Order Service
  ├─ Payment Reminder Service
  ├─ Production Planner Service
  ├─ Notification Service
  └─ Analytics Service
  ↓
PostgreSQL + Object Storage
  ↓
Owner PWA Dashboard
  ↓
Roadmap Modules
  ├─ Customer Opt-in System
  ├─ Community Sourcing
  ├─ Supplier Pooling
  └─ Rescue Sale Opt-in
```

## 4. Module List

| Module | MVP/Roadmap | Priority |
|---|---|---|
| Auth/Owner | MVP light | P1 |
| Business Profile | MVP | P1 |
| Menu | MVP | P0 |
| Ingredient | MVP | P0 |
| RecipeItem | MVP | P0 |
| Customer | MVP | P0 |
| Order | MVP | P0 |
| OrderItem | MVP | P0 |
| Payment | MVP dummy | P0 |
| NotificationLog | MVP light | P1 |
| DailySummary | MVP | P0 |
| AI Parser | MVP | P0 |
| Production Planner | MVP | P0 |
| Mock WhatsApp | MVP | P0 |
| Community Sourcing | Roadmap | P2 |
| Rescue Sale | Roadmap | P2 |

## 5. Database Entities

Minimal:

- User
- Business
- Menu
- Ingredient
- RecipeItem
- Customer
- Order
- OrderItem
- Payment
- NotificationLog
- DailySummary

Optional roadmap:

- CustomerConsent
- CommunitySuggestion
- Supplier
- SupplierOffer
- PoolingGroup
- RescueOffer

## 6. API Endpoint List

| Endpoint | Method | Purpose | Priority |
|---|---|---|---|
| `/api/health` | GET | Health check | P0 |
| `/api/dashboard` | GET | Today summary | P0 |
| `/api/orders` | GET | List orders | P0 |
| `/api/orders` | POST | Create order | P0 |
| `/api/orders/:id` | GET | Order detail | P0 |
| `/api/orders/:id/status` | PATCH | Update order status | P0 |
| `/api/orders/:id/payment` | PATCH | Update payment status | P0 |
| `/api/menus` | GET | List menu | P0 |
| `/api/menus` | POST | Create menu | P1 |
| `/api/ingredients` | GET | List ingredient | P0 |
| `/api/ingredients` | POST | Create ingredient | P1 |
| `/api/ai/parse-order` | POST | Parse chat | P0 |
| `/api/ai/daily-summary` | POST | Generate summary wording | P1 |
| `/api/production-plan` | GET/POST | Calculate ingredients | P0 |
| `/api/webhooks/whatsapp` | POST | Optional mock/n8n webhook | P1 |
| `/api/notifications/payment-reminder` | POST | Create reminder preview | P0 |

## 7. AI Service Design

AI use cases:

1. Order parser.
2. Missing field detection.
3. Suggested reply.
4. Daily summary wording.

AI not allowed:

- Mengarang menu.
- Mengarang harga.
- Mengubah payment menjadi paid.
- Menghitung bahan tanpa resep.
- Mengirim broadcast.

AI output schema example:

```json
{
  "customer_name": "Dinda",
  "order_items": [
    {
      "menu_name": "Risol Mayo",
      "quantity": 12
    }
  ],
  "pickup_time_text": "besok jam 3",
  "payment_status": "UNPAID",
  "missing_fields": [],
  "confidence_score": 0.92,
  "suggested_reply": "Baik Kak Dinda, pesanan 12 Risol Mayo untuk besok jam 15.00 sudah kami catat ya.",
  "needs_owner_review": false
}
```

Backend validation:

- Match `menu_name` against Menu table.
- Use Menu.price from DB.
- Use RecipeItem for ingredient calculation.
- If menu not found, set `needs_owner_review=true`.
- If confidence below threshold, do not auto-confirm.

## 8. WhatsApp Integration Levels

| Level | Description | MVP? |
|---|---|---|
| Level 1 | Mock WhatsApp UI in app | Yes |
| Level 2 | n8n webhook simulation | Optional |
| Level 3 | Twilio/Meta sandbox | Optional if stable |
| Level 4 | Meta WhatsApp Cloud API production | Roadmap |

## 9. Payment Reminder Design

MVP:

- QRIS dummy image.
- Payment status: `UNPAID`, `WAITING_CONFIRMATION`, `PAID`.
- Reminder preview message.
- No real transaction.
- No settlement.
- No financial claim.

Reminder example:

> “Halo Kak Dinda, pesanan 12 Risol Mayo sudah tercatat. Total Rp60.000. Jika sudah siap, pembayaran bisa melalui QRIS berikut. Terima kasih 🙏”

## 10. Deployment Plan

MVP deployment priority:

1. Local stable.
2. Vercel app deploy.
3. Supabase DB.
4. Environment variables in Vercel.
5. Fallback video.

Bonus:

- Railway optional if backend separated.
- Google Cloud Run/Cloud SQL as roadmap or bonus technical slide.

## 11. Security and Privacy Plan

MVP principles:

- Use dummy data for demo.
- Do not store unnecessary customer data.
- No real payment data.
- No customer location precise.
- No broadcast without opt-in.
- Do not expose API keys.
- Do not commit `.env`.

Production principles:

- Data minimization.
- Consent management.
- Role-based access.
- Audit logs.
- Deletion/export customer data.
- Secure secret management.

## 12. Testing Plan

Manual tests:

- Health API returns success.
- Seed data exists.
- Mock WhatsApp can parse main chat.
- AI fallback works.
- Low-confidence chat marked review.
- Owner can approve order.
- Payment reminder preview appears.
- Production planner calculates ingredients.
- Daily summary appears.
- Impact dashboard uses safe metrics.

## 13. Observability / Logging Plan

MVP:

- Console logs in dev.
- NotificationLog for reminders.
- Store raw AI parser result for debug.
- Error toast in UI.

Production roadmap:

- Structured logging.
- Cloud Logging.
- Error tracking.
- AI parser audit.
- Webhook delivery logs.

## 14. Roadmap SaaS

- Multi-tenant business accounts.
- Staff roles.
- Subscription plans.
- Usage limits by monthly order.
- WhatsApp Cloud API setup wizard.
- Customer opt-in lists.
- Analytics.
- Export reports.

## 15. Roadmap Community Sourcing

Goal: use aggregated ingredient needs to suggest belanja bareng.

Not MVP because it needs:

- Supplier data.
- Area/community validation.
- Payment flow.
- Fulfilment model.
- Cancellation handling.
- Trust mechanism.

## 16. Roadmap Rescue Sale

Goal: allow opt-in customers to receive limited offers for safe, still-worthy stock/menu slots.

Not MVP because it needs:

- Consent.
- Food safety framing.
- Stock accuracy.
- Anti-spam controls.
- Clear opt-out.

## 17. Migration from Mock to Real WhatsApp

Steps:

1. Keep mock UI as test harness.
2. Add webhook endpoint.
3. Test with n8n.
4. Test with sandbox number.
5. Add consent/opt-in.
6. Add message template handling.
7. Add retry/logging.
8. Roll out to pilot merchant.

## 18. Migration from Dummy QRIS to Real Payment

Do not implement in MVP.

Roadmap steps:

1. Keep merchant-owned QRIS static.
2. Let owner manually mark paid.
3. Explore payment gateway sandbox.
4. Add payment status callback only after compliance review.
5. Never hold funds unless licensed/partnered.

## 19. Production Risks

| Risk | Mitigation |
|---|---|
| WhatsApp policy | Opt-in, template compliance, logs |
| AI hallucination | Structured output + validation + owner approval |
| Data privacy | Minimize data, consent, deletion |
| Payment regulation | Reminder only until proper partner |
| Owner onboarding | Start with 3 menu templates |
| Scope creep | MVP boundary document |

## 20. Production Backlog

- Auth multi-tenant.
- Staff management.
- Real WhatsApp Cloud API.
- Customer consent.
- Webhook logs.
- Advanced reporting.
- Export PDF/CSV.
- Community sourcing pilot.
- Supplier admin dashboard.
- Rescue sale opt-in.
- Billing/subscription.
- Monitoring/logging.

## 21. Module Specs

### 21.1 Auth / Owner

| Field | Detail |
|---|---|
| Purpose | Mengidentifikasi owner bisnis |
| Data/entity | User |
| API | `/api/auth/*` optional; MVP bisa mock user |
| UI | Login/settings optional |
| Priority | P1 |
| MVP/Roadmap | MVP light |
| Acceptance criteria | Owner dummy dapat mengakses dashboard |
| Risks | Auth terlalu kompleks, potong untuk MVP |

### 21.2 Business Profile

| Field | Detail |
|---|---|
| Purpose | Menyimpan data usaha |
| Data/entity | Business |
| API | `/api/business` optional |
| UI | Settings |
| Priority | P1 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Nama usaha muncul di dashboard |
| Risks | Jangan overbuild profile |

### 21.3 Menu

| Field | Detail |
|---|---|
| Purpose | Validasi menu dan harga |
| Data/entity | Menu |
| API | `/api/menus` |
| UI | Menu page |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Menu dapat digunakan parser/order |
| Risks | AI tidak boleh mengarang menu |

### 21.4 Ingredient

| Field | Detail |
|---|---|
| Purpose | Bahan produksi |
| Data/entity | Ingredient |
| API | `/api/ingredients` |
| UI | Menu/resep page |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Ingredient muncul di planner |
| Risks | Jangan jadi full inventory |

### 21.5 RecipeItem

| Field | Detail |
|---|---|
| Purpose | Bahan per menu |
| Data/entity | RecipeItem |
| API | `/api/recipes` optional |
| UI | Menu detail |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Planner dapat menghitung bahan |
| Risks | Unit harus jelas |

### 21.6 Customer

| Field | Detail |
|---|---|
| Purpose | Data pelanggan order |
| Data/entity | Customer |
| API | included in order |
| UI | Order detail |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Customer name/phone muncul |
| Risks | Privacy, gunakan dummy data |

### 21.7 Order

| Field | Detail |
|---|---|
| Purpose | Core pesanan |
| Data/entity | Order |
| API | `/api/orders` |
| UI | Dashboard/order detail |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Order bisa dibuat, approved, status update |
| Risks | Status flow harus jelas |

### 21.8 OrderItem

| Field | Detail |
|---|---|
| Purpose | Item dalam pesanan |
| Data/entity | OrderItem |
| API | included in order |
| UI | Order detail |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Multiple item supported minimal |
| Risks | Simpan harga dari DB |

### 21.9 Payment

| Field | Detail |
|---|---|
| Purpose | Status pembayaran dummy |
| Data/entity | Payment |
| API | `/api/orders/:id/payment` |
| UI | Payment badge/reminder |
| Priority | P0 |
| MVP/Roadmap | MVP dummy |
| Acceptance criteria | Status unpaid/paid bisa tampil |
| Risks | Jangan real settlement |

### 21.10 NotificationLog

| Field | Detail |
|---|---|
| Purpose | Catat reminder |
| Data/entity | NotificationLog |
| API | `/api/notifications/payment-reminder` |
| UI | Order detail optional |
| Priority | P1 |
| MVP/Roadmap | MVP light |
| Acceptance criteria | Reminder dummy tercatat |
| Risks | Jangan broadcast spam |

### 21.11 DailySummary

| Field | Detail |
|---|---|
| Purpose | Rekap harian |
| Data/entity | DailySummary/generated |
| API | `/api/ai/daily-summary` |
| UI | Summary page |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Summary muncul dari order data |
| Risks | Jangan overclaim |

### 21.12 AI Parser

| Field | Detail |
|---|---|
| Purpose | Parse chat menjadi draft order |
| Data/entity | AI result, Order draft |
| API | `/api/ai/parse-order` |
| UI | Mock WhatsApp/parser result |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Main sample chat parsed correctly |
| Risks | Hallucination, wajib validation |

### 21.13 Production Planner

| Field | Detail |
|---|---|
| Purpose | Hitung bahan dari order aktual |
| Data/entity | Menu, RecipeItem, OrderItem |
| API | `/api/production-plan` |
| UI | Production page |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | Ingredient needed calculated correctly |
| Risks | Jangan AI bebas menghitung |

### 21.14 Mock WhatsApp

| Field | Detail |
|---|---|
| Purpose | Demo-safe order intake |
| Data/entity | Raw chat |
| API | `/api/ai/parse-order` |
| UI | Mock WhatsApp screen |
| Priority | P0 |
| MVP/Roadmap | MVP |
| Acceptance criteria | User can send chat and see parsed order |
| Risks | Jangan klaim real WA jika mock |

### 21.15 Roadmap Community Sourcing

| Field | Detail |
|---|---|
| Purpose | Vision belanja bareng |
| Data/entity | CommunitySuggestion future |
| API | None in MVP |
| UI | Roadmap card optional |
| Priority | P2 |
| MVP/Roadmap | Roadmap |
| Acceptance criteria | Jika tampil, label jelas simulation/roadmap |
| Risks | Operasional berat |

### 21.16 Roadmap Rescue Sale

| Field | Detail |
|---|---|
| Purpose | Vision rescue stock/menu opt-in |
| Data/entity | RescueOffer future |
| API | None in MVP |
| UI | Roadmap card optional |
| Priority | P2 |
| MVP/Roadmap | Roadmap |
| Acceptance criteria | Tidak diklaim berjalan penuh |
| Risks | Spam, makanan sisa, food safety |

````


# File: docs/06_CODEX_CLAUDE_EXECUTION_GUIDE.md

````md
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

````


# File: docs/07_STATUS_REPORT_AND_DECISION_LOG.md

````md
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
| TBD | Product name sementara: Kuali | Kuali, DapurFlow, KualiFlow | Kuali lebih lokal dan cocok kuliner | LEAD | Brand/pitch | BLUE / IN_REVIEW |
| TBD | Core MVP tetap order operation + production planner | Fusion full vs MVP sempit | MVP sempit lebih feasible | LEAD | Scope | BLUE / IN_REVIEW |
| TBD | Mock WhatsApp first | Mock, n8n, Meta API | Demo harus stabil | LEAD/HACKER-A | Tech/demo | BLUE / IN_REVIEW |
| TBD | QRIS dummy only | Dummy, real payment, payment gateway | Hindari risiko regulasi | LEAD | Payment | BLUE / IN_REVIEW |
| TBD | Community sourcing/rescue sale roadmap | MVP vs roadmap | Terlalu operasional untuk MVP | LEAD | Scope | BLUE / IN_REVIEW |

## 5. Blocker Log

| Date | Blocker | Task ID | Owner | Impact | Options | Decision Needed | Status |
|---|---|---|---|---|---|---|---|
| TBD |  |  |  |  |  |  | GREY / NOT_STARTED |

## 6. Risk Log

| Date | Risk | Category | Probability | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|---|
| TBD | Scope melebar jadi super app | Product | High | High | Lock MVP layer 1–2 | LEAD | YELLOW / IN_PROGRESS |
| TBD | AI salah parsing | Technical | Medium | High | Confidence + owner approval + fallback | HACKER-A | GREY / NOT_STARTED |
| TBD | WhatsApp API gagal | Demo | Medium | High | Mock WhatsApp first | HACKER-A/HACKER-C | BLUE / IN_REVIEW |
| TBD | Narasi overclaim | Pitch | Medium | High | Safe narrative doc | HUSTLER-B | GREY / NOT_STARTED |
| TBD | Payment dianggap fintech | Regulation | Low | High | QRIS dummy, reminder only | LEAD | BLUE / IN_REVIEW |

## 7. Change Request Log

| Date | Request | Requested By | Reason | MVP/Roadmap | Decision | Owner | Status |
|---|---|---|---|---|---|---|---|
| TBD |  |  |  |  |  |  | GREY / NOT_STARTED |

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

- [ ] Product name and tagline ready.
- [ ] Problem statement ready.
- [ ] Solution statement ready.
- [ ] Target user/persona ready.
- [ ] MVP scope ready.
- [ ] Non-goals ready.
- [ ] Tech architecture ready.
- [ ] Impact metrics ready.
- [ ] Risk mitigation ready.
- [ ] Business model draft ready.
- [ ] Roadmap ready.
- [ ] Safe narrative checked.

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

## 16. Task Report Archive

Use this section for completed task reports.

| Task ID | Status | What was done | Files changed | Verification | Blocker | Next step |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

````
