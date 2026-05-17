# Roadmap — Kuali

> Dokumen ini memisahkan dengan jelas apa yang ada di MVP dan apa yang ada di roadmap pasca-hackathon.
> **Tidak ada fitur roadmap yang diklaim sebagai MVP.**

---

## Fase Pengembangan

### Phase 0 — Baseline Proposal (Selesai)

Membuat fondasi: ide final, proposal, mockup spec, arsitektur baseline, data dummy, pitch narrative, dan task board. Tidak ada implementasi app produksi.

**Output:**
- docs/00 — docs/12 terdokumentasi
- 7 file dummy data JSON
- 11 file proposal di docs/proposal/
- Audit dan scope review selesai

**Status:** ✅ Siap difreeze

---

### Phase 1 — Hackathon MVP Prototype (Aktif berikutnya)

Membangun prototype yang bisa didemo: Next.js app berjalan lokal/Vercel, mock WhatsApp UI, AI parser endpoint, order dashboard, owner approval, QRIS dummy reminder, production planner, daily summary, impact dashboard, seed data.

**Target:** Demo berjalan end-to-end tanpa error dalam 3 menit.

**Task utama:**
- Setup Next.js + Tailwind + shadcn/ui
- Prisma schema + Supabase connection
- AI parse endpoint (mock-first)
- Mock WhatsApp UI
- Order dashboard + approval flow
- QRIS dummy reminder UI
- Production planner logic + UI
- Daily summary API + UI
- Impact dashboard UI
- Seed data script

---

### Phase 2 — Demo Hardening

Menstabilkan demo, memperbaiki bug, membuat fallback video, menyiapkan pitch Q&A, dan melakukan UI polish.

**Target:** Demo stabil 2 kali berturut-turut tanpa interupsi.

**Task utama:**
- Feature freeze
- Cached AI response untuk demo
- UI polish (hanya halaman demo)
- Demo script final (3 menit + 5 menit)
- Fallback video direkam
- Pitch Q&A disiapkan
- Final demo rehearsal

---

### Phase 3 — Roadmap Pasca Hackathon

Pengembangan dilakukan setelah hackathon selesai dan hanya jika ada validasi dari pengguna nyata.

---

## Fitur Roadmap (Bukan MVP)

Semua fitur di bawah ini adalah **roadmap** — tidak tersedia di MVP, tidak diklaim sebagai fitur aktif, dan hanya akan diimplementasikan setelah MVP terbukti dan ada validasi pengguna nyata.

| Fitur Roadmap | Deskripsi | Catatan Penting | Prioritas |
|---|---|---|---|
| **Real WhatsApp Business Cloud API** | Integrasi langsung dengan WhatsApp untuk terima pesanan otomatis | Perlu approval Meta. Proses bisa 2–4 minggu. | Tinggi |
| **QRIS Settlement Real** | Integrasi payment gateway — QRIS aktual bisa diproses | Butuh akun aggregator QRIS (Midtrans, Xendit, dll) dan compliance OJK | Sedang |
| **Opt-in Customer System** | Pelanggan bisa opt-in untuk menerima notifikasi dari owner | Berbasis consent eksplisit, bukan broadcast otomatis | Tinggi |
| **Community Sourcing** | Belanja bahan bersama UMKM sekitar untuk dapat harga lebih baik | **Berbasis consent penuh**. Tidak ada akses data pelanggan tanpa izin. Tidak ada broadcast otomatis. | Sedang |
| **Rescue Sale Opt-in** | Sisa stok ditawarkan ke pelanggan terdekat yang sudah opt-in | **Bukan klaim "sisa pasti habis"**. Berbasis opt-in transparan. | Sedang |
| **Supplier Pooling** | Jaringan supplier bahan baku untuk UMKM | Butuh kerja sama dengan supplier lokal | Jangka panjang |
| **Multi-tenant SaaS** | Satu platform untuk banyak UMKM dengan auth terpisah | Butuh auth system, isolasi data per bisnis | Jangka panjang |
| **Mobile App Native** | Aplikasi Android/iOS untuk owner | PWA sudah cukup untuk MVP. Native butuh resources lebih | Jangka panjang |
| **Google Cloud Production** | Deployment production-grade untuk skala besar | Vercel + Supabase cukup untuk MVP dan early growth | Jangka panjang |
| **ML Forecasting** | Prediksi kebutuhan bahan dari pola historis order | AI parser LLM sudah cukup untuk MVP | Jangka panjang |

---

## Cara Menyebut Roadmap di Pitch

**Kalimat yang aman:**
- "Fitur ini ada di roadmap kami — berbasis consent pengguna, bukan klaim MVP."
- "Belanja bareng dan rescue sale kami rancang dengan mekanisme opt-in yang transparan — bukan klaim bahwa semua stok sisa pasti laku."
- "Real WhatsApp API memerlukan proses approval Meta yang tidak feasible dalam timeline hackathon. Ini ada di roadmap."

**Jangan katakan:**
- "Fitur belanja bareng sudah ada di sistem." (jika belum diimplementasi)
- "Dengan Kuali, food waste bisa turun X%." (klaim tidak tervalidasi)
- "QRIS kita bisa langsung settlement." (bukan MVP)

---

## Roadmap Simulation Card (untuk Demo 5 Menit)

Jika waktu memungkinkan, tampilkan card roadmap simulation dengan visual yang jelas berbeda dari fitur MVP:

```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
  🗺️  Roadmap — Belum tersedia di MVP
│                                        │
  Belanja bahan bareng UMKM lain di
│ sekitar kamu (berbasis consent)        │

│ [Pelajari lebih lanjut →]              │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

**Aturan card roadmap:**
- Border dashed (bukan solid)
- Background berbeda (abu muda)
- Badge ungu dengan label "Roadmap"
- Tidak ada tombol aksi aktif
- **Wajib ada disclaimer** — jangan demo tanpa label jelas
