# assets/ — Aset Visual Kuali

> Folder ini berisi aset visual yang dibutuhkan untuk demo, mockup, dan proposal.

---

## Status

**Phase 0 — Folder disiapkan. Aset belum lengkap.**

---

## Isi yang Dibutuhkan

| File | Kebutuhan | Status | Owner |
|---|---|---|---|
| `qris-dummy.png` | QRIS dummy untuk preview reminder pembayaran di demo | BELUM ADA | HIPSTER-B |
| `logo-kuali.png` | Logo Kuali untuk pitch deck dan README | BELUM ADA | HIPSTER-B |
| `mockup/` | Screenshot atau export mockup low fidelity | BELUM ADA | HIPSTER-B |
| `moodboard/` | UI moodboard (warna, tipografi, tone) | BELUM ADA | HIPSTER-B |

---

## Prioritas

### Sebelum demo (wajib ada):

- [ ] `qris-dummy.png` — dipakai di halaman `/orders/[id]` dan QRIS reminder preview

### Untuk pitch deck (penting):

- [ ] `logo-kuali.png`
- [ ] Screenshot mockup minimal 3 screen (WhatsApp mock, order card, production planner)

---

## Panduan Aset

### qris-dummy.png

- Bisa gunakan QRIS dummy generator atau buat desain sederhana
- Harus jelas terlihat sebagai demo — tambahkan watermark "DEMO ONLY" jika perlu
- Resolusi minimal: 400×400px
- Format: PNG transparan lebih baik

### logo-kuali.png

- Nama "Kuali" dengan elemen visual sederhana (misal: ikon wajan/piring)
- Warna: sesuai moodboard (yang belum dibuat — koordinasi dengan HIPSTER-B)
- Format: PNG transparan, minimal 512×512px untuk fleksibilitas

### Mockup screenshots

- Export dari Figma/Canva/tools apapun yang digunakan
- Nama file: `mockup-01-whatsapp.png`, `mockup-02-order-card.png`, dst.
- Resolusi mobile: 360×780px atau 430×932px

---

## Aturan Folder Ini

- Jangan commit file besar (>5MB) tanpa konfirmasi leader
- Jangan simpan file AI prompt, API key, atau data sensitif di sini
- Naming convention: lowercase, pisah dengan tanda hubung (misal: `qris-dummy.png`)
