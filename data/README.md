# data/ — Dummy Data Kuali

> Folder ini berisi data dummy untuk proposal, demo, dan development Phase 1.
> Jangan gunakan data ini sebagai data produksi.

---

## Status

**Phase 0 — Data dummy siap untuk proposal dan demo.**

---

## Isi Folder

| File | Isi | Jumlah |
|---|---|---|
| `dummy-chats.json` | Chat pesanan dummy (happy path, ambiguous, typo, cancellation, low confidence) | 15 chat |
| `dummy-menu.json` | Menu UMKM dummy lengkap dengan resep dan daftar bahan per menu | 8 menu |
| `dummy-ingredients.json` | Bahan baku dummy dengan stok, harga, reorder point, supplier | 10 bahan |
| `dummy-orders.json` | Order dummy dengan status, payment status, confidence score, missing fields | 20 order |

---

## Konteks Bisnis Demo

Semua data mengacu pada satu bisnis demo:

| Field | Nilai |
|---|---|
| Nama bisnis | Katering Bu Rani |
| Jenis usaha | Catering rumahan dan nasi box pre-order |
| Kanal | WhatsApp-first |
| Volume demo | 20 order aktif hari ini |

---

## Cara Pakai

### Untuk proposal dan pitch deck

Ambil contoh chat dari `dummy-chats.json` — terutama `chat-001` (Dinda, happy path) dan `chat-015` (Bu Tini, low confidence) untuk narasi demo.

### Untuk development Phase 1

Data ini akan di-seed ke database via `prisma/seed.ts`. Struktur JSON sudah dirancang konsisten dengan entity database di `docs/proposal/BASELINE_ARCHITECTURE.md`.

### Demo chat utama

```
"Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya."
```

Chat ini ada di `chat-001` dan menjadi entry point utama demo.

---

## Variasi Chat yang Tersedia

| Kategori | ID | Deskripsi |
|---|---|---|
| Happy path | chat-001, chat-004, chat-006, chat-011 | Order lengkap, confidence tinggi |
| Typo / informal | chat-010 | "bj" = "buah", bahasa singkat |
| Ambiguous | chat-003, chat-005 | Referensi ke pesanan sebelumnya |
| Multi-item | chat-006, chat-009, chat-014 | Lebih dari satu menu |
| Low confidence | chat-015 | Varian menu belum dikonfirmasi |
| Inquiry bukan order | chat-007 | Tanya ketersediaan menu |
| Konfirmasi bayar | chat-008 | Follow-up pembayaran |
| Pembatalan | chat-013 | Cancel order |
| Tambahan order | chat-014 | Tambah item ke order yang sudah ada |
| Koreksi | chat-012 | Koreksi chat sebelumnya yang ambiguous |

---

## Aturan Data Dummy

- Data ini tidak menggunakan nama/nomor telepon nyata
- Harga sudah disesuaikan dengan range UMKM kuliner rumahan
- Stok dan reorder point adalah estimasi demo, bukan data pasar aktual
- Data ini boleh diubah untuk kebutuhan demo — tapi update juga seed script jika sudah ada
