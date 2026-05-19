# Outline Pitch Deck — Kuali

> Dokumen ini adalah bagian dari Phase 0 Baseline Proposal Kuali.
> 10–12 slide. Semua konten dalam Bahasa Indonesia.
> Dirancang untuk presentasi 3–5 menit + Q&A.

---

## Prinsip Deck

- Satu pesan utama per slide
- Visual lebih banyak dari teks
- Mobile-first screenshot/mockup di setiap slide fitur
- Tidak ada klaim besar tanpa dasar
- Roadmap vs MVP dibedakan dengan jelas

---

## Slide 1 — Cover

**Judul:** Kuali

**Subtitle:** Asisten operasional WhatsApp-first untuk UMKM kuliner

**Tagline:** Order rapi, produksi siap.

**Visual:** Logo Kuali + latar belakang dapur sederhana / ilustrasi UMKM

---

## Slide 2 — Problem

**Judul:** Order sudah ramai, tapi operasional masih manual

**Narasi:**
> Banyak UMKM kuliner sudah aktif berjualan lewat WhatsApp. Tantangannya bukan mereka belum digital — tantangannya ada di proses setelah chat masuk.

**Visual (3 kolom):**
- Chat tercecer di banyak percakapan
- Pembayaran perlu dicek satu per satu
- Bahan produksi dihitung pakai perkiraan

**Kalimat kunci:** "Semua ini dikerjakan tanpa admin khusus."

---

## Slide 3 — Persona

**Judul:** Kenalkan Bu Rani

**Visual:** Ilustrasi Bu Rani (30–45 thn, catering rumahan, pakai Android)

**Pain points (3 poin):**
- Order tercecer di chat
- Lupa tagih yang belum bayar
- Hitung bahan pakai feeling

**JTBD:** "Bu Rani tidak butuh POS canggih. Ia butuh order WhatsApp-nya tidak tercecer."

---

## Slide 4 — Solution

**Judul:** Kuali — dari chat menjadi order dan produksi yang rapi

**Visual:** Flow sederhana dengan ikon

```
Chat WhatsApp → Kuali → Draft Order → Approve → Dashboard + Planner
```

**3 poin utama:**
- AI mengubah chat jadi draft order
- Owner approve, bukan AI yang putuskan
- Kebutuhan bahan terhitung otomatis

---

## Slide 5 — Demo: AI Parser

**Judul:** Dari chat menjadi draft order dalam detik

**Visual:** Screenshot Mock WhatsApp UI + hasil parsing

**Chat contoh:** "Kak mau pesan 12 risol mayo buat besok jam 3. Bayar nanti sore ya."

**Output:** Draft order card + confidence score 95%

**Kalimat kunci:** "AI membuat draft. Owner yang approve."

---

## Slide 6 — Demo: Dashboard & Approval

**Judul:** Semua order dalam satu tempat

**Visual:** Screenshot order dashboard (mobile)

**Poin:**
- Status order jelas (Draft, Dikonfirmasi, Selesai)
- Badge unpaid yang mudah dilihat
- Tombol approve besar di layar mobile

---

## Slide 7 — Demo: Production Planner

**Judul:** Tahu bahan apa yang harus disiapkan hari ini

**Visual:** Screenshot production planner

**Contoh:**
- Dari 12 risol → 600g tepung, 1.2 butir telur, 240g wortel

**Kalimat kunci:** "Bukan perkiraan. Dari order aktual yang sudah di-approve."

---

## Slide 8 — Demo: Daily Summary

**Judul:** Rekap harian tanpa perlu rekap manual

**Visual:** Screenshot daily summary card

**Isi:**
- 9 order hari ini
- 5 belum bayar
- 2 perlu cek ulang
- Bahan produksi besok: lihat planner

---

## Slide 9 — Impact (Aman)

**Judul:** Apa yang bisa diukur dari demo ini

**Visual:** Metrik sederhana dari data dummy

| Metrik | Simulasi |
|---|---|
| Order berhasil diparse | 13 dari 15 chat |
| Order perlu cek | 3 (confidence < 0.7) |
| Order belum bayar | 4 (Rp 167.000) |
| Reminder siap dikirim | 4 |
| Bahan terhitung otomatis | ✓ |

**Disclaimer:** Metrik ini adalah simulasi dari data dummy demo, bukan klaim operasional nyata.

---

## Slide 10 — MVP vs Roadmap

**Judul:** MVP fokus, roadmap realistis

**Dua kolom:**

| MVP (sudah ada) | Roadmap (nanti) |
|---|---|
| Mock WhatsApp UI | Real WhatsApp API |
| AI order parser | ML prediction |
| QRIS dummy reminder | QRIS settlement |
| Production planner | Community sourcing* |
| Daily summary | Rescue sale opt-in* |

*Roadmap berbasis consent pengguna, bukan klaim MVP.

---

## Slide 11 — Tech Stack

**Judul:** Arsitektur ringan, siap dikembangkan

**Visual:** Diagram sederhana

- Next.js + TypeScript
- Supabase PostgreSQL + Prisma
- OpenAI / Anthropic (mock-first)
- Tailwind CSS + shadcn/ui
- Vercel (deploy)

---

## Slide 12 — Penutup

**Judul:** Kuali tidak mengubah cara UMKM berjualan.

**Tagline besar:**
> Kuali membantu merapikan alur yang sudah mereka pakai setiap hari: dari chat pelanggan menjadi order dan produksi yang lebih siap.

**Call to action:** "Mari coba demo."

**Kontak tim:** [nama + email + link repo/demo]

---

## Catatan Presenter

- Jangan baca slide — slide hanya visual pendukung
- Demo langsung lebih kuat dari slide penjelasan
- Jika ada pertanyaan community sourcing: jawab sebagai roadmap berbasis consent, bukan klaim MVP
- Jika ditanya real WhatsApp API: sudah dalam roadmap, MVP pakai mock untuk keamanan demo
- Jika ditanya profit/food waste: gunakan metrik aman, jangan klaim angka pasti
