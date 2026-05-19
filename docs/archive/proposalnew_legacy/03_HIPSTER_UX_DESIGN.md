# 03 — Hipster: User Experience & Design

## Hipster Objective

Role Hipster bertanggung jawab membuat Kuali mudah dipahami, mudah digunakan, mobile-first, dan cocok untuk UMKM kuliner awam. Output utama: persona, user journey, mockup, design principles, UX copy, dan flow navigasi.

## UX Principles

1. Mobile-first.
2. WhatsApp-first.
3. Bahasa Indonesia sederhana.
4. Tombol besar.
5. Dashboard ringan.
6. Tidak terlalu banyak chart.
7. Cocok untuk HP kentang.
8. Owner tetap memegang kendali.

## Design Principles

| Prinsip | Implementasi |
|---|---|
| 3 Tap Rule | Flow utama maksimal 3 tap dari dashboard |
| Status jelas | Badge Perlu Cek, Belum Bayar, Siap |
| Owner in control | Semua hasil AI tampil sebagai draft |
| Roadmap separated | Belanja bareng/rescue sale hanya roadmap card |
| Visual calm | Card layout, spacing luas, copy pendek |

## User Persona

### Persona Utama — Bu Rani

| Aspek | Detail |
|---|---|
| Usia | 34 tahun |
| Usaha | Catering rumahan dan nasi box |
| Kanal jualan | WhatsApp, Instagram Story, repeat customer |
| Device | Android mid-low |
| Pain point | Order banyak, rekap manual, pembayaran belum rapi, bahan dihitung perkiraan |
| Kebutuhan | Order rapi, payment reminder, daftar bahan produksi |
| Kekhawatiran | Order salah, pelanggan kecewa, bahan kurang, app terlalu ribet |

### Persona 2 — Kak Dinda, Penjual Snack Box

| Aspek | Detail |
|---|---|
| Usaha | Risol, snack box, dessert mini |
| Kanal | WhatsApp group, teman kampus/kantor |
| Pain | Pesanan kecil tapi banyak, banyak custom request |
| Butuh | Draft order cepat, reminder pembayaran, rekap sederhana |

### Persona 3 — Pak Arif, Bakery Rumahan

| Aspek | Detail |
|---|---|
| Usaha | Roti dan dessert box pre-order |
| Kanal | WhatsApp dan Instagram |
| Pain | Banyak order beda tanggal dan varian |
| Butuh | Order detail, tanggal ambil, production list |

## User Journey

### Sebelum Kuali

1. Customer chat via WhatsApp.
2. Owner membaca chat satu per satu.
3. Owner mencatat manual.
4. Owner mengecek pembayaran manual.
5. Owner menghitung bahan dari perkiraan.
6. Owner produksi.
7. Rekap harian sering tidak lengkap.

### Setelah Kuali

1. Customer chat seperti biasa.
2. Kuali membuat draft order.
3. Owner approve/edit.
4. Kuali menandai pembayaran.
5. Kuali menyiapkan reminder QRIS dummy.
6. Kuali membuat production planner.
7. Owner melihat daily summary.

## Main Flow

```text
Chat Masuk → AI Parse → Draft Order → Owner Approve/Edit → Payment Reminder → Production Planner → Daily Summary
```

## Mockup Requirements dan Wireframe Teks

### 1. Landing / Intro

Tujuan: menjelaskan produk dalam 5 detik.

```text
[Kuali]
Order rapi, produksi siap.
Asisten operasional WhatsApp-first untuk UMKM kuliner.

[ Lihat Demo ]
[ Lihat Dashboard ]
```

### 2. Mock WhatsApp Screen

Tujuan: menunjukkan customer tetap chat seperti biasa.

```text
Dinda:
Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda.
Bayar nanti sore ya.

[ Parse dengan AI ]
```

### 3. Dashboard Hari Ini

```text
Dashboard Hari Ini
[18 Order] [5 Belum Bayar]
[2 Perlu Cek] [Rp850.000]
Order Terbaru
- Dinda: 12 Risol Mayo
```

### 4. Order List

Card order berisi nama customer, item, waktu ambil, status order, status pembayaran.

### 5. Order Detail

Raw chat, parsed order, confidence score, missing fields, CTA Setujui/Edit.

### 6. Payment Reminder

QRIS dummy, message preview, CTA Kirim Reminder.

Copy wajib: **“Simulasi QRIS dummy. Kuali tidak memproses dana.”**

### 7. Production Planner

Daftar menu yang harus diproduksi dan estimasi bahan berdasarkan order aktual.

### 8. Daily Summary

Total order, belum bayar, menu terlaris, ringkasan AI.

### 9. Impact Dashboard

Metrik aman: chat disimulasikan, parsed, perlu cek, unpaid, estimasi waktu rekap.

### 10. Roadmap Simulation Card

Label: **Roadmap Simulation**. Jelaskan belanja bareng/rescue sale sebagai vision, bukan MVP.

## UX Copy Bahasa Indonesia

| Situasi | Copy |
|---|---|
| AI draft | “AI hanya membuat draft. Owner tetap menyetujui.” |
| Low confidence | “Pesanan ini perlu dicek dulu.” |
| Payment | “Belum bayar” |
| Reminder | “Kirim reminder pembayaran” |
| Production | “Estimasi bahan berdasarkan order aktual.” |
| Roadmap | “Fitur ini adalah simulasi roadmap, bukan MVP utama.” |

## UI Component List

- AppShell
- MockWhatsappChat
- ParsedOrderCard
- MetricCard
- OrderCard
- StatusBadge
- PaymentBadge
- PaymentReminderCard
- ProductionPlanCard
- DailySummaryCard
- ImpactDashboard
- RoadmapCard
- EmptyState
- LoadingState
- ErrorState
- ConfirmationModal

## Animation Plan

| Area | Animation |
|---|---|
| Chat bubble | Motion fade/slide ringan |
| Parsed order | Card appear |
| Approval | Sonner toast “Order disetujui” |
| Metrics | Gentle reveal |
| Roadmap card | Subtle badge animation |

## Mockup Acceptance Criteria

- Mobile-first.
- Bahasa Indonesia jelas.
- Flow demo bisa dipahami dalam 3–5 menit.
- Tidak terlihat seperti full POS.
- QRIS jelas dummy.
- Roadmap simulation tidak terlihat sebagai MVP.
- CTA utama jelas.

## Hipster Task Checklist

- [ ] Persona utama dan tambahan.
- [ ] User journey before-after.
- [ ] Screen list.
- [ ] Wireframe teks.
- [ ] UI moodboard.
- [ ] UX copy.
- [ ] Component list.
- [ ] Mockup acceptance criteria.
