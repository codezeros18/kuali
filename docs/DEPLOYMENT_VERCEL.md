# Panduan Deploy Kuali ke Vercel

> Prototype frontend Phase 0.5 — dummy data only. Tidak ada env var yang diperlukan.

---

## Prasyarat

- Akun Vercel (gratis): https://vercel.com/signup
- Repo sudah di GitHub / GitLab / Bitbucket
- Node.js ≥ 18 di lokal (hanya untuk verifikasi lokal)

---

## Verifikasi Lokal Sebelum Deploy

```bash
npm install
npm run lint     # harus: No ESLint warnings or errors
npm run build    # harus: ✓ Generating static pages (9/9)
```

Build yang berhasil akan menampilkan 9 route:

```
Route (app)        Size
/                  ~172 B
/demo              ~6 kB
/dashboard         ~2.1 kB
/orders            ~2 kB
/production        ~843 B
/summary           ~4.8 kB
```

---

## Langkah Deploy (GitHub → Vercel)

### 1. Push ke GitHub

```bash
git add .
git commit -m "Phase 0.5 frontend prototype — ready for Vercel"
git push origin main
```

### 2. Import di Vercel

1. Buka https://vercel.com/new
2. Klik **Import Git Repository**
3. Pilih repo `kuali`
4. Vercel akan otomatis mendeteksi **Next.js**

### 3. Konfigurasi Project

| Setting | Nilai |
|---|---|
| Framework Preset | Next.js (auto-detected) |
| Root Directory | `.` (default) |
| Build Command | `npm run build` (default) |
| Output Directory | `.next` (default) |
| Install Command | `npm install` (default) |

**Environment Variables: KOSONGKAN — tidak ada yang diperlukan.**

Jangan isi variabel seperti `DATABASE_URL`, `OPENAI_API_KEY`, dll. Prototype ini tidak menggunakannya.

### 4. Deploy

Klik **Deploy**. Proses build memakan waktu ~1–2 menit.

Setelah selesai, Vercel memberikan URL seperti:
```
https://kuali-xxxx.vercel.app
```

---

## Setelah Deploy

### URL yang langsung bisa dibuka

| Route | Tujuan |
|---|---|
| `/` | Landing page |
| `/demo` | **Demo utama — tunjukkan ini ke juri** |
| `/dashboard` | Dashboard operasional |
| `/orders` | Daftar order |
| `/production` | Produksi planner |
| `/summary` | Rekap harian |

### Custom domain (opsional)

1. Vercel Dashboard → Settings → Domains
2. Tambahkan domain kustom jika ada
3. Ikuti instruksi DNS dari Vercel

---

## Redeploy Otomatis

Setelah terhubung ke GitHub, setiap `git push` ke branch `main` akan otomatis memicu redeploy.

---

## Troubleshoot

### Build gagal di Vercel tapi lokal berhasil

- Pastikan Node.js versi di Vercel ≥ 18 (Settings → General → Node.js Version)
- Pastikan tidak ada file `next.config.ts` — harus `next.config.mjs`

### Halaman 404 setelah deploy

- Pastikan semua page file ada di `src/app/*/page.tsx`
- Cek Output di Vercel Build Log — apakah ada route yang gagal di-generate?

### Tailwind tidak muncul

- Pastikan `tailwind.config.ts` memiliki `content` yang mencakup `./src/**/*.{ts,tsx}`
- Pastikan `globals.css` di-import di `src/app/layout.tsx`

---

## Catatan Penting

- **Tidak ada environment variables yang dibutuhkan.** Semua data berasal dari `src/lib/dummy-data.ts`.
- **Tidak ada API routes.** Semua halaman adalah static/client-side.
- **QRIS adalah simulasi.** Tidak ada transaksi nyata.
- **Data adalah fiksi.** Nama, nomor telepon, dan order adalah data demo.

---

## Checklist Deploy

- [ ] `npm run lint` — no errors
- [ ] `npm run build` — 9/9 static pages generated
- [ ] Push ke GitHub
- [ ] Import di Vercel
- [ ] Build berhasil di Vercel
- [ ] Buka `/demo` — alur parse → konfirmasi → produksi → rekap berjalan
- [ ] Buka `/dashboard` — metrik 11 order tampil benar
- [ ] Bottom nav berfungsi di semua halaman
- [ ] QRIS dummy card muncul di `/summary`
