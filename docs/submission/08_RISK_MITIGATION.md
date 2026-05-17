# Mitigasi Risiko — Kuali

---

## Risiko Produk

| Risiko | Dampak | Probabilitas | Mitigasi |
|---|---|---|---|
| AI parser salah baca chat | Order salah → pelanggan kecewa | Sedang | Owner approval wajib sebelum konfirmasi. Confidence score ditampilkan. Missing field dideteksi otomatis. |
| Chat sangat ambigu (misal: "yang biasa ya") | AI tidak bisa parse → confidence sangat rendah | Sedang | Tampilkan badge "Perlu Cek", minta konfirmasi owner. Sistem tidak menebak atau mengarang. |
| Scope melebar selama hackathon | Fitur tidak selesai, demo berantakan | Tinggi | MVP boundary ketat, semua scope change lewat leader. Task board Phase 1 sudah terdefinisi. |
| Bahan habis saat produksi | Pesanan tidak bisa dipenuhi | Rendah (di MVP) | Production planner menampilkan kebutuhan vs stok tersedia. Informasi diberikan ke owner untuk tindakan. |

---

## Risiko Narasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Pitch terlihat seperti super app | Juri skeptis | Positioning eksplisit: "bukan POS, bukan marketplace" di semua dokumen |
| Overclaim impact metrics | Kehilangan kredibilitas | Hanya pakai metrik dari data demo aktual. Selalu sebut "simulasi" atau "dalam demo ini" |
| Community sourcing diklaim sebagai MVP | Scope tidak terpenuhi | Selalu beri label "Roadmap" pada semua fitur roadmap. Gunakan visual berbeda (border dashed, badge ungu) |
| QRIS diklaim sebagai payment settlement | Salah paham compliance | Selalu sebut "QRIS dummy/reminder — bukan settlement". Disclaimer ada di semua dokumen |
| Framing merendahkan UMKM | Narasi tidak empati | Tidak pernah gunakan kata "gaptek", "tertinggal", atau "belum digital" sebagai framing negatif |
| Klaim penghematan waktu tanpa data | Juri meminta bukti | Framing sebagai "simulasi ilustratif" dengan catatan bahwa validasi nyata diperlukan |

---

## Risiko Teknis

| Risiko | Dampak | Mitigasi |
|---|---|---|
| AI API lambat atau gagal saat demo | Demo terhenti | Mock fallback (USE_MOCK_AI=true) — demo berjalan dari cached response tanpa koneksi AI live |
| WhatsApp API tidak tersedia | Demo tidak bisa pakai WA nyata | Mock WhatsApp UI — tidak butuh approval Meta |
| Database tidak siap saat demo | Data tidak muncul | Seed data dijalankan sebelum presentasi. Screenshot sebagai fallback. |
| Konflik merge menjelang deadline | Fitur rusak | Branching strategy: `feature/*` → `dev` → `main`. Feature freeze sebelum demo (Phase 2). |
| Deployment gagal di Vercel | Demo tidak bisa diakses | Test deploy H-1. Siapkan localhost sebagai fallback. |
| AI output tidak konsisten antar run | Confidence score berfluktuasi | Gunakan cached/mock response untuk demo utama. |
| Rate limit API saat demo | Parser gagal | Mock mode aktif, tidak depend on live API. |

---

## Risiko Bisnis

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Target user tidak mau membayar | Model bisnis tidak valid | Validasi WTP di luar hackathon sebelum monetisasi. MVP bukan untuk monetisasi. |
| Persaingan dari incumbents | Sulit masuk pasar | Fokus pada niche yang tidak dilayani POS dan WhatsApp Business: pre-order UMKM kuliner tanpa admin. |
| Nama Kuali punya konflik brand | Masalah legal | Validasi manual domain, media sosial, dan PDKI sebelum go public. Saat ini dipakai sementara. |
| Dependensi pada WhatsApp | Platform risk | Mock-first sebagai strategi. Real API di roadmap setelah ada validasi. |

---

## Checklist Risiko — Status Saat Ini

### Narasi
- [x] Tidak ada kata "gaptek" atau "tertinggal" di semua dokumen
- [x] Semua roadmap diberi label "Roadmap" yang jelas
- [x] QRIS selalu disebut "dummy/reminder" — bukan settlement
- [x] Impact disebut "dalam simulasi ini" atau "dari data demo"
- [x] Community sourcing tidak diklaim sebagai fitur MVP
- [x] Tidak ada proyeksi profit/food waste yang pasti

### Demo
- [x] Mock AI siap (USE_MOCK_AI=true dan expected-ai-parser-output.json tersedia)
- [x] Chat demo siap di dummy-chats.json (15 skenario)
- [x] Seed data terdefinisi, siap dijalankan
- [ ] QRIS dummy image perlu dibuat (assets/qris-dummy.png)
- [ ] Fallback video perlu direkam (Phase 2)
- [ ] App perlu ditest end-to-end sebelum demo (Phase 2)

### Scope
- [x] MVP boundary terdokumentasi dan bersih (lihat SCOPE_REVIEW.md)
- [x] `reorderPoint` dihapus dari entity dan data (tidak ada inventory management di MVP)
- [x] Angka demo konsisten di semua dokumen
