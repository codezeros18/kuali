# Kuali Revision Docs — Mockup & Proposal

Folder ini berisi dua dokumen revisi besar untuk Kuali setelah feedback UMKM mikro:

1. `01_MOCKUP_REVISION_PLAN.md`  
   Fokus pada revisi frontend prototype: Profil Usaha, Dashboard Mode Sederhana/Standar, konsistensi data, copywriting, hero order, production planner, summary, dan prompt Claude/Codex.

2. `02_PROPOSAL_REVISION_PLAN.md`  
   Fokus pada revisi proposal: target user UMKM kuliner mikro, UX inclusivity, Mode Sederhana/Standar, data minimization, Profil Usaha, SWOT/competitor/impact/roadmap, dan prompt Claude/Codex.

## Rekomendasi urutan eksekusi

1. Jalankan prompt dari `02_PROPOSAL_REVISION_PLAN.md` terlebih dahulu agar narasi proposal terkunci.
2. Jalankan prompt dari `01_MOCKUP_REVISION_PLAN.md` untuk memperbaiki frontend prototype sesuai narasi baru.
3. Ambil screenshot setelah mockup selesai.
4. Masukkan screenshot ke proposal final.
5. Review ulang scope agar tidak overengineering.

## Batasan penting

Revisi ini bukan production build. Jangan implement:
- real auth,
- real payment,
- real WhatsApp API,
- age-based personalization,
- dashboard builder,
- full profile/account management.
