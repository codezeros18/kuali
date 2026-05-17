# UI Flow — Kuali MVP
### Navigasi Antar Screen, Trigger, dan State Transitions

> Referensi: `docs/design/SCREEN_LIST.md` (daftar screen)
> Referensi: `docs/proposal/USER_JOURNEY.md` (alur aktor)
> Mobile-first. Bottom navigation 4 tab.

---

## Struktur Navigasi Utama

### Bottom Navigation (4 Tab Tetap)

```
┌────────────────────────────────────────┐
│  🏠          📋         🧑‍🍳       📊  │
│ Hari Ini   Pesanan   Produksi  Ringkasan│
└────────────────────────────────────────┘
```

| Tab | Label | Route | Screen |
|---|---|---|---|
| Tab 1 | Hari Ini | `/` | S04 — Dashboard |
| Tab 2 | Pesanan | `/orders` | Daftar Order |
| Tab 3 | Produksi | `/production` | S06 — Production Planner |
| Tab 4 | Ringkasan | `/summary` | S07 — Daily Summary |

**Halaman yang tidak ada di bottom nav** (diakses via aksi / link):
- S01 Mock WhatsApp → dari Dashboard (tombol "Proses Chat Baru")
- S02 Draft Order Card → muncul di bawah S01 setelah parsing
- S03 Approval Modal → dari S02 (tombol "Approve")
- S05 QRIS Reminder → dari S02 setelah approve dikonfirmasi
- S08 Impact Dashboard → dari S07 (link "Lihat semua metrik")
- S09 Roadmap Card → bagian bawah S08

---

## Flow Utama: Happy Path Demo

```
[S04 Dashboard]
       │
       │ Tap: "Proses Chat Baru"
       ▼
[S01 Mock WhatsApp]
       │
       │ Input chat → Tap: "Proses dengan Kuali"
       │ (loading ~1–2 detik)
       ▼
[S02 Draft Order Card]  ←── muncul di bawah S01
  (confidence 95%, no missing fields)
       │
       │ Tap: "Approve Pesanan"
       ▼
[S03 Approval Modal]
       │
       │ Tap: "Ya, Konfirmasi"
       │ (loading, lalu toast "✓ Dikonfirmasi!")
       ▼
[S05 QRIS Dummy Reminder]
       │
       │ Tap: "Salin Pesan"
       │ (feedback "✓ Tersalin!")
       │
       │ Navigasi manual ke Tab 3 atau link
       ▼
[S06 Production Planner]  ←── AHA MOMENT
       │
       │ Navigasi ke Tab 4
       ▼
[S07 Daily Summary]  ←── Closing demo
```

---

## Flow Lengkap: Semua Jalur Navigasi

### 1. Dari Dashboard (S04)

| Aksi | Tujuan | Trigger |
|---|---|---|
| Tap tombol "Proses Chat Baru" | S01 Mock WhatsApp | Button tap |
| Tap card "Belum Bayar" (4) | `/orders?filter=unpaid` | Card tap |
| Tap card "Perlu Dicek" (3) | `/orders?filter=needs_check` | Card tap |
| Tap card "Draft Pending" (6) | `/orders?filter=draft` | Card tap |
| Tap order item di list terbaru | `/orders/[id]` (S02) | List item tap |
| Tap "Lihat semua →" | `/orders` | Link tap |
| Tab 2 | `/orders` | Bottom nav |
| Tab 3 | `/production` (S06) | Bottom nav |
| Tab 4 | `/summary` (S07) | Bottom nav |

---

### 2. Dari Mock WhatsApp (S01)

| Aksi | Tujuan | Trigger |
|---|---|---|
| Pilih chat preset chip | Auto-fill textarea | Chip tap |
| Kosongkan textarea | Tombol disabled | Input change |
| Isi textarea → tap "Proses" | Parsing → S02 (scroll ke bawah) | Button tap |
| Tap preset lain setelah parsing | Reset dan parsing ulang | Chip tap |
| Tap Back / Tab lain | Kembali ke sebelumnya | Navigation |

**State transitions S01:**
```
EMPTY                → FILLED            → LOADING           → SUCCESS
(tombol disabled)      (tombol aktif)      (spinner, disabled)  (scroll ke S02)
```

---

### 3. Dari Draft Order Card (S02)

| Aksi | Tujuan | Trigger |
|---|---|---|
| Tap "Approve Pesanan" | S03 Approval Modal | Button tap |
| Tap "✏️ Edit" | Edit form inline | Button tap |
| Tap "✗ Tolak" | Konfirmasi reject dialog | Button tap |
| Tap confidence bar | Tooltip: penjelasan skor | Tap |
| Tap missing field item | Highlight field yang perlu diisi | Tap |
| Tap order number | `/orders/[id]` (full detail) | Link tap |

**State confidence score:**
```
Score ≥ 0.85 → bar hijau, "Siap diapprove", approve enabled
Score 0.70–0.84 → bar kuning, "Cek dulu"
Score < 0.70 → bar merah, "Perlu konfirmasi manual"
```

---

### 4. Dari Approval Modal (S03)

| Aksi | Tujuan | Trigger |
|---|---|---|
| Tap "Ya, Konfirmasi" | Loading → toast → tutup modal → S05 | Button tap |
| Tap "Kembali" | Tutup modal, kembali ke S02 | Button tap |
| Tap backdrop | Tidak ada aksi (modal tidak dismiss via backdrop) | — |

**State transitions S03:**
```
OPEN → LOADING ("Menyimpan...") → CLOSED + TOAST ("✓ Dikonfirmasi!") → S05
```

---

### 5. Dari QRIS Dummy Reminder (S05)

| Aksi | Tujuan | Trigger |
|---|---|---|
| Tap "Salin Pesan" | Copy ke clipboard + feedback "✓ Tersalin!" | Button tap |
| Tap "Tandai Sudah Dikirim" | Update status reminder, badge "Terkirim" | Button tap |
| Tap Back | Kembali ke `/orders/[id]` | Navigation |
| Tab 3 | `/production` (S06) | Bottom nav |

---

### 6. Dari Production Planner (S06)

| Aksi | Tujuan | Trigger |
|---|---|---|
| Tap bahan item | Expand: detail kalkulasi "dari order mana" | List item tap |
| Tap `[ⓘ]` | Tooltip: penjelasan cara hitung | Icon tap |
| Tap "+ N bahan lainnya ▼" | Expand sisa list | Accordion |
| Tab 4 | `/summary` (S07) | Bottom nav |

---

### 7. Dari Daily Summary (S07)

| Aksi | Tujuan | Trigger |
|---|---|---|
| Tap "⚠ 3 pesanan perlu dicek" | `/orders?filter=needs_check` | Card tap |
| Tap "Lihat Production Planner" | `/production` (S06) | Button tap |
| Tap "Lihat semua metrik →" | `/impact` (S08) | Link tap |
| Tab 1 | `/` (S04 Dashboard) | Bottom nav |

---

### 8. Dari Impact Dashboard (S08)

| Aksi | Tujuan | Trigger |
|---|---|---|
| Tap "Lihat roadmap simulation ↓" | Scroll ke S09 section | Anchor |
| Tap metric card | Tidak ada navigasi (read-only) | — |
| Tab navigasi lain | Sesuai tab | Bottom nav |

---

### 9. Dari Roadmap Simulation Card (S09)

| Aksi | Tujuan | Trigger |
|---|---|---|
| Tap card roadmap | Tidak ada aksi (visual only) | — |
| Scroll ke atas | Kembali ke S08 | Scroll |

**Semua tombol di dalam S09 adalah non-functional by design.**

---

## State Global yang Perlu Diperhatikan

### Order Status Transitions

```
PENDING (chat masuk)
    │
    │ AI parsing
    ▼
DRAFT (menunggu owner)
    │          │
    │ approve  │ reject
    ▼          ▼
CONFIRMED   REJECTED
    │
    │ [manual]
    ▼
COMPLETED
```

### Payment Status Transitions

```
UNPAID (default setelah confirmed)
    │
    │ owner update manual
    ▼
PAID
```

### QRIS Reminder Status

```
NOT_SENT (default)
    │
    │ "Tandai Sudah Dikirim"
    ▼
SENT (timestamp)
```

---

## Error States dan Edge Cases

| Kondisi | Perilaku |
|---|---|
| AI parsing gagal | Tampilkan error card: "Gagal memproses. Coba lagi." + tombol retry |
| Chat kosong saat submit | Tombol disabled, tidak ada error message |
| Confidence sangat rendah (< 0.3) | Warning lebih tegas: "Sistem tidak bisa membaca pesanan ini dengan baik. Masukkan manual." |
| Semua field missing | Tampilkan semua missing fields, disable approve |
| Database error | Toast merah: "Gagal menyimpan. Coba lagi." |
| Demo mode (seed data) | App tetap berfungsi dari data lokal |

---

## Navigation Guards

| Kondisi | Guard |
|---|---|
| Klik approve dengan missing field kritis | Tampilkan peringatan, tunda approve (behavior dapat diputuskan Leader) |
| Klik konfirmasi di S03 | Harus ada action eksplisit — tidak bisa di-bypass |
| Akses S05 tanpa order confirmed | Redirect ke `/orders` |
| Akses S02 tanpa chat input | Redirect ke S01 |

---

*Dokumen ini adalah navigasi spec untuk HACKER-B dan HACKER-C.*
*Wireframe detail ada di `docs/proposal/LOW_FIDELITY_MOCKUP_PLAN.md`.*
