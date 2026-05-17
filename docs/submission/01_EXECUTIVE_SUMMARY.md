# Kuali — Executive Summary

> **Tagline:** Order rapi, produksi siap.
> **Kategori:** Food & Culinary Business Tech
> **Subtema:** Teknologi untuk UMKM Kuliner Lokal

---

## Identitas Produk

| Field | Detail |
|---|---|
| **Nama Produk** | Kuali |
| **Tagline** | Order rapi, produksi siap. |
| **Kategori Hackathon** | Food & Culinary Business Tech |
| **Positioning** | Asisten operasional WhatsApp-first untuk UMKM kuliner |

---

## One-Liner

**Kuali membantu UMKM kuliner yang berjualan lewat WhatsApp mengubah chat pesanan menjadi draft order terstruktur, reminder pembayaran, estimasi bahan produksi, dan rekap harian — dengan AI yang hanya membuat draft, sementara keputusan tetap di tangan owner.**

---

## Masalah yang Diselesaikan

Banyak UMKM kuliner sudah aktif berjualan lewat WhatsApp. Tantangannya bukan soal cara berjualan — tantangannya ada di **proses operasional setelah chat masuk**:

- **Pesanan mudah tercecer** di antara ratusan chat harian
- **Status pembayaran tidak terpantau** — harus dicek satu per satu secara manual
- **Kebutuhan bahan dihitung pakai perkiraan** — bukan dari data order aktual
- **Tidak ada rekap harian otomatis** — owner harus rekap manual di akhir hari
- **Semua beban ada di satu orang** — tanpa admin, tanpa sistem

---

## Solusi

Kuali adalah asisten operasional WhatsApp-first yang membantu owner UMKM kuliner merapikan alur yang sudah mereka jalankan:

```
Chat pelanggan masuk
    → AI membaca dan membuat draft order
    → Owner cek, edit jika perlu, lalu approve
    → Dashboard update, QRIS dummy reminder siap
    → Production planner menghitung bahan otomatis
    → Daily summary tersedia di akhir hari
```

**Kuali bukan POS. Bukan marketplace. Bukan chatbot biasa.**
Kuali adalah sistem operasional yang bekerja di atas kebiasaan yang sudah ada.

---

## MVP Scope

| Fitur | Status |
|---|---|
| Mock WhatsApp UI + AI Order Parser | ✅ MVP |
| Confidence Score + Missing Field Detector | ✅ MVP |
| Owner Approval + Order Dashboard | ✅ MVP |
| QRIS Dummy Reminder | ✅ MVP |
| Production Planner | ✅ MVP |
| Daily Summary + Impact Dashboard | ✅ MVP |
| Real WhatsApp API / QRIS Settlement / Community Sourcing | Roadmap |

---

## Tech Stack (Ringkas)

**Next.js + TypeScript — Supabase PostgreSQL + Prisma — OpenAI/Anthropic (mock-first) — Tailwind CSS + shadcn/ui — Vercel**

---

## Prinsip Utama

1. **AI hanya membuat draft** — tidak ada order terkonfirmasi tanpa persetujuan owner
2. **Mock-first** — demo tidak bergantung pada WhatsApp API atau AI live
3. **Single-tenant MVP** — satu bisnis, satu owner, tidak overcomplicate
4. **Tidak overclaim** — semua metrik dari data demo aktual, bukan proyeksi

---

## Relevansi dengan BuildLocal

- Fokus pada UMKM kuliner lokal, khususnya pre-order rumahan
- Mengikuti kebiasaan yang sudah ada: WhatsApp
- Mobile-first, ringan, bisa dipakai sambil masak
- AI untuk workflow nyata, bukan gimmick
- Roadmap mendukung ekosistem lokal: community sourcing (berbasis consent), supplier bahan
