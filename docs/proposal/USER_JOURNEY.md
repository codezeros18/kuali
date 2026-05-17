# User Journey — Kuali

> Dokumen ini adalah bagian dari Phase 0 Baseline Proposal Kuali.

---

## Alur Utama: Customer → Owner → Sistem

Flow demo 3–5 menit. Titik "Aha Moment" pada langkah 6–7.

| # | Aktor | Langkah | Touchpoint | Status/Output | Emosi Bu Rani |
|---|---|---|---|---|---|
| 1 | Customer | Mengirim pesan pesanan lewat WhatsApp | WhatsApp chat | Chat masuk ke Bu Rani | — |
| 2 | Sistem (Kuali) | Chat masuk ke Mock WhatsApp UI Kuali | Mock WhatsApp UI | Chat terbaca oleh sistem | Deg-degan, banyak order masuk |
| 3 | Sistem (AI) | AI membaca chat dan membuat draft order | AI Parser | Draft order JSON + confidence score | Penasaran |
| 4 | Sistem | Sistem menampilkan draft order ke Bu Rani | Order Draft Card | Draft + missing field (jika ada) | Mulai lega |
| 5 | Owner (Bu Rani) | Bu Rani cek draft, edit jika perlu, lalu approve | Owner Dashboard | Order status: Draft → Confirmed | Lega, terkontrol |
| 6 | Sistem | Sistem membuat QRIS dummy reminder pembayaran | QRIS Dummy Preview | Reminder siap dikirim ke customer | Senang, hemat waktu |
| 7 | Sistem | Order masuk ke dashboard, production planner update | Order Dashboard + Planner | Daftar bahan otomatis terhitung | **AHA MOMENT** — "Ini yang saya butuhkan!" |
| 8 | Sistem | Daily summary dibuat di akhir hari | Daily Summary | Rekap order, unpaid, bahan | Tenang, siap besok |
| 9 | Owner (Bu Rani) | Bu Rani lihat impact dashboard | Impact Dashboard | Metrik operasional hari ini | Percaya diri |

---

## Detail Flow per Scene

### Scene 1 — Masalah Awal (Problem)

**Konteks:** Bu Rani membuka WhatsApp pagi hari. Ada 12 pesan masuk dari berbagai pelanggan: ada yang pesan baru, ada yang tanya ketersediaan, ada yang konfirmasi bayar, ada yang minta ubah pesanan.

**Masalah:** Semua chat campur aduk. Bu Rani harus baca satu per satu, catat manual di buku atau notes HP. Mudah tercecer, apalagi kalau sambil masak.

**Visual demo:** Tampilan chat WhatsApp yang ramai dan berantakan (screenshot atau simulasi).

---

### Scene 2 — Chat Masuk ke Kuali

**Konteks:** Bu Rani membuka Kuali. Chat dari Dinda sudah masuk ke Mock WhatsApp UI.

**Chat:** "Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya."

**Visual demo:** Mock WhatsApp UI menampilkan pesan, ada tombol "Kirim ke Kuali".

---

### Scene 3 — AI Parsing

**Konteks:** Kuali memproses chat dan menampilkan draft order.

**Output AI:**
```json
{
  "customerName": "Dinda",
  "items": [{ "menu": "Risol Mayo", "qty": 12 }],
  "deliveryDate": "besok jam 3",
  "paymentStatus": "bayar nanti",
  "confidenceScore": 0.95,
  "missingFields": []
}
```

**Visual demo:** Draft order card muncul dengan badge confidence score "95% — siap approve".

---

### Scene 4 — Owner Approval

**Konteks:** Bu Rani melihat draft, memverifikasi, dan menekan tombol "Approve".

**Visual demo:** Tombol besar "Approve Order" di layar mobile. Status berubah dari "Draft" ke "Dikonfirmasi".

**Catatan:** AI hanya membuat draft — keputusan tetap di Bu Rani.

---

### Scene 5 — QRIS Dummy Reminder

**Konteks:** Setelah approve, Kuali menampilkan preview QRIS dummy untuk dikirim ke Dinda.

**Visual demo:** Card reminder dengan QRIS dummy, nominal, dan tombol "Salin Link Reminder".

**Penting:** QRIS hanya dummy/reminder. Bukan settlement real.

---

### Scene 6 — Order Dashboard & Production Planner ⭐ (AHA MOMENT)

**Konteks:** Bu Rani membuka dashboard. Semua order hari ini terlihat jelas: yang confirmed, yang belum bayar, yang perlu cek.

**Production Planner:** Dari order aktual, sistem menghitung:
- Tepung Terigu: 600g (dari 12 risol)
- Telur: 1,2 butir
- Wortel: 240g
- dst.

**Visual demo:** Halaman production planner dengan daftar bahan dan jumlah yang perlu disiapkan.

---

### Scene 7 — Daily Summary

**Konteks:** Di akhir hari, Bu Rani membuka daily summary.

**Output:**
- Total order hari ini: 11 order
- Sudah dikonfirmasi: 5
- Belum bayar: 4 order (Rp 167.000)
- Perlu cek ulang: 3 order (confidence rendah)
- Bahan utama yang dibutuhkan besok: lihat production planner

**Visual demo:** Summary card yang ringkas dan mudah dibaca.

---

### Scene 8 — (Opsional/Roadmap) Simulasi Fitur Roadmap

**Konteks:** Untuk demo tambahan, ditampilkan card roadmap simulation dengan label jelas.

**Label wajib:** "🗺️ Roadmap — Belum tersedia di MVP"

**Contoh card:** "Belanja bahan bareng UMKM lain di sekitar kamu" atau "Notifikasi sisa stok mendekati batas."

**Penting:** Ini hanya simulasi visual, bukan fitur aktif. Tidak diklaim sebagai MVP.

---

## Titik Kritis dalam Journey

| Titik | Risiko | Mitigasi |
|---|---|---|
| Chat ambiguous (misal: "yang biasa ya") | AI salah parse → confidence rendah | Tampilkan missing fields, minta konfirmasi owner |
| Owner tidak approve draft | Order tidak masuk sistem | Draft tetap tersimpan, ada notif pending |
| Bahan tidak cukup di stok | Produksi terganggu | Production planner menampilkan kebutuhan bahan; tandai jika kebutuhan melebihi stok tersedia |
| Customer belum bayar | Arus kas terganggu | QRIS dummy reminder bisa dikirim ulang |

---

## Catatan Flow untuk Demo

- Demo happy path: chat-001 (Dinda, 12 risol mayo) → confidence 95% → approve → QRIS dummy → planner update
- Demo low confidence: chat-015 (Bu Tini, varian pedas) → confidence 45% → perlu konfirmasi manual
- Demo cancellation: chat-013 (Kak Rina, batal) → status cancelled → tidak masuk planner
