# 00 — Proposal Master Kuali

## Ringkasan Lomba dan Tujuan Proposal

Kuali adalah proposal solusi untuk Gunadarma Code Week 2.0 Hackathon bertema **BuildLocal: Tech Solutions for Indonesian MSMEs**. Tahap saat ini adalah **Babak 1: Proposal Submission**. Fokus dokumen proposal adalah membuktikan bahwa Kuali relevan untuk UMKM Indonesia, aplikatif, implementatif, mobile-first, memakai AI secara masuk akal, feasible untuk prototype hackathon, dan aman secara narasi.

Tahap proposal **bukan full production build**. Fokus tahap ini:
- proposal,
- baseline ide,
- baseline mockup,
- baseline diagram,
- baseline architecture,
- research notes,
- task planning,
- draft narasi proposal.

## Aturan Format Proposal

| Item | Aturan |
|---|---|
| Format akhir | PDF |
| Nama file | `Proposal_NamaTim.pdf` |
| Maksimal halaman | 20 halaman, tidak termasuk lampiran |
| Kertas | A4 |
| Font | Times New Roman minimal 11pt |
| Spasi | 1.5 |
| Margin | Atas 4 cm, bawah 3 cm, kiri 4 cm, kanan 3 cm |
| Bahasa | Jelas, sistematis, formal, tidak plagiarisme |
| Role | Hustler, Hipster, Hacker harus terlihat berkontribusi |

## Struktur Proposal Resmi

1. Pendahuluan
2. Business & Market Strategy (Hustler)
3. User Experience & Design (Hipster)
4. Teknologi & Implementasi (Hacker)
5. Kesimpulan & Rencana Pengembangan
6. Daftar Pustaka
7. Lampiran Opsional

## Scoring Criteria dan Strategi

| Bagian Proposal | Bobot | Fokus Jawaban | Owner Role | Output yang Harus Ada |
|---|---:|---|---|---|
| Pendahuluan | 15% | Urgency, problem nyata, tujuan solusi | Hustler + Lead | Latar belakang, problem, tujuan, impact |
| Business & Market Strategy | 20% | BMC, SWOT, kompetitor, GTM realistis | Hustler | BMC, SWOT, benchmark, GTM |
| User Experience & Design | 20% | Persona, journey, mockup, flow | Hipster | Persona Bu Rani, journey, mockup plan |
| Teknologi & Implementasi | 25% | AI, diagram, architecture, feasibility | Hacker | AI schema, Mermaid diagram, DB/API draft |
| Kesimpulan & Roadmap | 10% | Keunggulan, next step, tantangan | Lead + Hustler | Kesimpulan dan roadmap |
| Kejelasan Proposal | 10% | Proposal rapi, terpadu, tidak melebar | Lead | Final review dan coherence |

## Ide Final Kuali

**Nama produk:** Kuali  
**Tagline:** Order rapi, produksi siap.  
**One-liner:** Kuali membantu UMKM kuliner yang berjualan lewat WhatsApp mengubah chat pesanan menjadi order rapi, reminder pembayaran, dan rencana produksi harian.

## Problem Statement

Banyak UMKM kuliner sudah aktif berjualan lewat WhatsApp, tetapi proses operasional setelah chat masuk masih manual: pesanan tersebar, pembayaran perlu dicek satu per satu, bahan produksi dihitung pakai perkiraan, dan owner sering mengurus semuanya tanpa admin khusus.

## Solution Statement

Kuali membantu owner mengubah chat pesanan menjadi draft order yang bisa dicek, menandai status pembayaran, memberi reminder QRIS dummy, menghitung kebutuhan bahan dari menu/resep sederhana, dan membuat rekap produksi harian.

## Target User

UMKM kuliner WhatsApp-first:
- Catering rumahan
- Nasi box
- Snack box
- Bakery rumahan
- Dessert box
- Frozen food
- Kopi literan
- Pre-order makanan rumahan

## MVP Scope Proposal

1. Mock WhatsApp / chat order masuk
2. AI Order Parser
3. Structured output JSON
4. Confidence score
5. Missing field detector
6. Owner approval/edit
7. Order dashboard
8. Payment reminder QRIS dummy
9. Menu dan resep sederhana
10. Production planner dari order aktual
11. Daily summary
12. Impact dashboard

## Non-goals

Tidak masuk MVP/proposal tahap awal:
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

## Roadmap

- Real WhatsApp Business Cloud API
- Opt-in customer list
- Belanja bareng / community sourcing
- Supplier pooling
- Rescue sale consent-based
- Stock alert
- Multi-staff
- Analytics
- SaaS subscription

Roadmap harus disebut sebagai pengembangan lanjutan, bukan fitur MVP.

## Role Contribution

| Role | Kontribusi | Output |
|---|---|---|
| Hustler | Market, BMC, SWOT, GTM, impact | Business section |
| Hipster | Persona, journey, mockup, UX copy | UX section |
| Hacker | AI, architecture, DB, API, diagram | Tech section |
| Lead | Scope, integration, review | Proposal final |

## Proposal Writing Rules

- Gunakan Bahasa Indonesia formal dan jelas.
- Tandai data yang belum punya sumber dengan `[NEED SOURCE]`.
- Jangan mengarang statistik.
- Pisahkan MVP dan roadmap.
- Gunakan istilah aman: membantu, draft, estimasi, owner approval, berdasarkan order aktual.

## Narrative Safety

### Boleh dipakai
- “Banyak UMKM kuliner sudah aktif menggunakan WhatsApp.”
- “Tantangannya bukan mereka belum digital, tetapi proses operasional di belakang chat masih sering manual.”
- “AI membantu membuat draft order, owner tetap memegang kendali.”
- “Estimasi bahan dihitung berdasarkan order aktual.”

### Hindari
- UMKM gaptek
- UMKM tertinggal
- Pemerintah belum cukup membantu
- AI menggantikan admin
- Food waste pasti turun
- Profit pasti naik
- Harga bahan pasti lebih murah

## Proposal Checklist

- [ ] Cover lengkap
- [ ] Daftar isi
- [ ] Pendahuluan
- [ ] BMC
- [ ] SWOT
- [ ] Competitor benchmarking
- [ ] GTM
- [ ] Persona dan journey
- [ ] Mockup plan
- [ ] AI utilization
- [ ] Use case diagram
- [ ] Sequence diagram
- [ ] System design
- [ ] Database/API draft
- [ ] Risk mitigation
- [ ] Roadmap
- [ ] Daftar pustaka
- [ ] Semua claim data punya sumber atau `[NEED SOURCE]`

## Definition of Done Proposal

Proposal selesai jika semua section resmi terisi, tidak overclaim, tidak scope creep, semua role terlihat kontribusinya, MVP dan roadmap jelas, diagram/mockup tersedia, dan leader sudah review final.
