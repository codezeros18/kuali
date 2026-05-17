# 02 — Leader Setup and Handoff

> File ini khusus untuk leader. Tujuannya agar leader memegang arah, bukan menjadi bottleneck.

## 1. Peran Leader

Leader bertanggung jawab sebagai:

- Product Owner
- Tech Lead
- System Architect
- Integrator
- AI/Automation direction owner
- Pitch direction owner
- Final decision maker

Leader tidak harus mengerjakan semua fitur. Leader wajib membuat fondasi, membagi task, menjaga scope, review hasil, dan mengintegrasikan output tim.

## 2. Hal yang Leader Own Sepenuhnya

- Final product scope.
- Nama/positioning final.
- Architecture decision.
- Tech stack decision.
- API convention.
- Database schema baseline.
- AI guardrail.
- MVP vs roadmap boundary.
- PR approval untuk perubahan besar.
- Final integration.
- Demo flow final.
- Pitch framing final.
- Scope change approval.

## 3. Hal yang Leader Setup Lalu Delegasikan

| Area | Setup Leader | Delegasi ke |
|---|---|---|
| Frontend | UI skeleton, route plan, component convention | HACKER-C / HIPSTER-B |
| Backend | Prisma baseline, API convention | HACKER-B |
| AI | Prompt strategy, output schema, guardrail | HACKER-A / AI task |
| Docs | Docs structure, template | HUSTLER-B / QA docs |
| Mockup | UX direction | HIPSTER-B |
| Pitch | Narrative skeleton | HUSTLER-B |
| Demo | Scene list | Semua role sesuai modul |

## 4. Hal yang Tidak Boleh Leader Pegang Sendiri

- Semua halaman UI.
- Semua CRUD endpoint.
- Semua styling detail.
- Semua test case.
- Semua deck design.
- Semua dummy data.
- Semua README update.
- Semua bug kecil.
- Semua component implementation.

Jika leader mengerjakan semua, tim akan pasif dan integrasi terlambat.

## 5. Project Setup Checklist

CHECK:

- [ ] Cek apakah repo sudah ada.
- [ ] Cek apakah ada file lama yang harus dipertahankan.
- [ ] Cek apakah docs sudah dibuat.
- [ ] Cek dependency tim: frontend/backend/AI.

DECIDE:

- [ ] Next.js fullstack first.
- [ ] Supabase PostgreSQL + Prisma.
- [ ] Mock WhatsApp first.
- [ ] QRIS dummy only.
- [ ] Roadmap features tidak masuk MVP.

IMPLEMENT:

- [ ] Buat repo/folder.
- [ ] Buat docs.
- [ ] Buat `.env.example`.
- [ ] Buat dummy data.
- [ ] Buat task board.
- [ ] Buat README.

VERIFY:

- [ ] Project bisa di-clone.
- [ ] Docs bisa dibaca tim.
- [ ] Task pertama jelas.
- [ ] Tidak ada fitur roadmap di MVP task.

REPORT:

- [ ] Kirim repo link.
- [ ] Kirim folder structure.
- [ ] Kirim task assignment.
- [ ] Kirim blocker/decision needed.

## 6. Repo Setup Checklist

- [ ] Buat repository `kuali` atau `kuali-ai`.
- [ ] Tambahkan README awal.
- [ ] Tambahkan `.gitignore`.
- [ ] Tambahkan `docs/`.
- [ ] Tambahkan `data/` untuk dummy JSON.
- [ ] Tambahkan `.env.example`.
- [ ] Tambahkan branch `main` dan `dev`.
- [ ] Buat GitHub Issues/Projects jika sempat.

## 7. Folder Structure

Rekomendasi Next.js fullstack:

```txt
kuali/
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   ├── orders/
│   ├── production/
│   ├── summary/
│   ├── impact/
│   └── api/
│       ├── health/
│       ├── orders/
│       ├── menus/
│       ├── ingredients/
│       ├── ai/
│       ├── webhooks/
│       └── notifications/
├── components/
│   ├── ui/
│   ├── kuali/
│   └── layout/
├── lib/
│   ├── ai/
│   ├── db/
│   ├── validators/
│   ├── constants.ts
│   └── dummy-data.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── data/
│   ├── dummy-chats.json
│   ├── dummy-menu.json
│   ├── dummy-ingredients.json
│   └── dummy-orders.json
├── docs/
├── public/
│   └── qris-dummy.png
├── .env.example
├── README.md
└── package.json
```

## 8. Environment Variables

`.env.example`:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""

# AI Provider
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
AI_PROVIDER="openai"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Demo
USE_MOCK_AI="true"
USE_MOCK_WHATSAPP="true"
```

## 9. Database Setup Plan

CHECK:

- [ ] Cek apakah Supabase project sudah ada.
- [ ] Cek apakah `DATABASE_URL` tersedia.
- [ ] Cek apakah tim butuh local DB fallback.

DECIDE:

- Primary: Supabase PostgreSQL.
- Fallback: Docker PostgreSQL local.
- ORM: Prisma.

IMPLEMENT:

- Buat Supabase project.
- Copy connection string.
- Setup Prisma.
- Buat schema baseline.
- Jalankan migration.
- Jalankan seed.

VERIFY:

- `npx prisma db push` sukses.
- `npx prisma studio` bisa buka data.
- Seed data muncul.

REPORT:

- Share env variable via channel aman, bukan commit.
- Update docs jika ada perubahan.

## 10. Prisma Setup Plan

- [ ] Install Prisma.
- [ ] Init Prisma.
- [ ] Buat models MVP.
- [ ] Buat enum status order/payment.
- [ ] Buat seed script.
- [ ] Tambah npm script:
  - `db:push`
  - `db:seed`
  - `db:studio`

## 11. Supabase Setup Plan

- [ ] Buat project Supabase.
- [ ] Pilih region yang stabil.
- [ ] Ambil PostgreSQL connection string.
- [ ] Disable RLS untuk MVP demo jika memakai Prisma direct DB, atau tulis keputusan di decision log.
- [ ] Jangan expose service role key di frontend.

## 12. Docker Local Fallback Plan

`docker-compose.yml` optional:

```yaml
services:
  postgres:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: kuali
      POSTGRES_PASSWORD: kuali
      POSTGRES_DB: kuali
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

## 13. AI Key Setup Plan

- [ ] Gunakan `OPENAI_API_KEY` atau `ANTHROPIC_API_KEY`.
- [ ] Jangan commit key.
- [ ] Tambah `USE_MOCK_AI=true` fallback.
- [ ] AI parser harus support cached response.
- [ ] AI tidak boleh mengarang menu/harga.

## 14. Mock WhatsApp Setup Plan

- [ ] Buat page `/mock-whatsapp` atau component di dashboard.
- [ ] Textarea input chat.
- [ ] Button “Kirim ke Kuali”.
- [ ] API call ke `/api/ai/parse-order`.
- [ ] Tampilkan raw chat + parsed order.
- [ ] Simpan draft order setelah owner approve.

## 15. UI Skeleton Setup Plan

Routes MVP:

- `/` landing/demo entry.
- `/dashboard` today dashboard.
- `/mock-whatsapp` chat simulator.
- `/orders` order list.
- `/orders/[id]` order detail.
- `/menus` menu & recipe.
- `/production` production planner.
- `/summary` daily summary.
- `/impact` impact dashboard.

## 16. API Convention Setup

Base response:

```ts
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
};
```

Rules:

- Use JSON.
- Use Zod validation.
- Return clear error messages.
- Never expose API keys.
- Keep endpoints demo-safe.

## 17. Branching Strategy

- `main`: stable demo/submission.
- `dev`: integration.
- `feature/*`: feature branch.
- `fix/*`: bugfix.
- `docs/*`: documentation.

Rules:

- Work from `dev`.
- PR to `dev`.
- Merge to `main` only after demo verified.

## 18. Commit Convention

Format:

```txt
feat(scope): short description
fix(scope): short description
docs(scope): short description
chore(scope): short description
refactor(scope): short description
```

Examples:

- `feat(ai): add order parser mock response`
- `feat(ui): add mobile dashboard shell`
- `docs(plan): add phase 0 task board`
- `fix(order): handle missing pickup time`

## 19. PR Review Rule

PR wajib berisi:

- Summary.
- Files changed.
- How to test.
- Screenshot/video if UI.
- Risk.
- Checklist acceptance criteria.

Leader review:

- Cek scope.
- Cek tidak merusak demo.
- Cek tidak menambah roadmap features.
- Cek build/lint jika ada.

## 20. Handoff Checklist ke Frontend

- [ ] Route list.
- [ ] Dummy data.
- [ ] UI copy Bahasa Indonesia.
- [ ] Component list.
- [ ] Status badge rules.
- [ ] API contract.
- [ ] Acceptance criteria per page.

## 21. Handoff Checklist ke Backend

- [ ] Entity list.
- [ ] Prisma schema baseline.
- [ ] API endpoint list.
- [ ] Validation rules.
- [ ] Seed data plan.
- [ ] AI output schema.
- [ ] Payment dummy rule.

## 22. Handoff Checklist ke AI/Automation

- [ ] Prompt purpose.
- [ ] Structured JSON schema.
- [ ] Sample chats.
- [ ] Menu data.
- [ ] Guardrails.
- [ ] Mock AI fallback.
- [ ] No real WhatsApp dependency.

## 23. Handoff Checklist ke Hustler/Research

- [ ] Problem statement.
- [ ] Persona.
- [ ] Competitor comparison.
- [ ] Impact metrics.
- [ ] Business model draft.
- [ ] Safe narrative rules.

## 24. Handoff Checklist ke Hipster/UI

- [ ] Brand direction.
- [ ] Tagline.
- [ ] Required screens.
- [ ] Mobile-first rules.
- [ ] Design system basics.
- [ ] Mockup acceptance criteria.

## 25. Leader Daily Checklist

- [ ] Cek task status.
- [ ] Cek blocker.
- [ ] Review PR.
- [ ] Update decision log.
- [ ] Potong scope jika melebar.
- [ ] Pastikan demo flow tetap jalan.
- [ ] Pastikan docs update.
- [ ] Pastikan semua role punya next task.

## 26. Leader Decision-Making Rule

Jika ada konflik:

1. Demo stability menang atas fitur baru.
2. MVP scope menang atas roadmap.
3. Mock/fallback menang atas live integration yang belum stabil.
4. Narasi aman menang atas klaim besar.
5. Data aktual/dummy jelas menang atas overclaim AI.

## 27. Anti-Bottleneck Rule

Leader harus:

- Setup sekali, delegasikan eksekusi.
- Buat task kecil.
- Jangan semua PR menunggu review lama.
- Beri anggota ownership modul.
- Jangan pegang semua UI/backend/docs sendiri.
- Gunakan `IN_REVIEW` untuk review cepat.

## 28. Checklist Project Siap Dikerjakan Tim

- [ ] Repo bisa di-clone.
- [ ] README ada.
- [ ] Docs ada.
- [ ] Folder structure jelas.
- [ ] `.env.example` ada.
- [ ] Dummy data ada.
- [ ] Task board ada.
- [ ] Role assignment ada.
- [ ] Scope MVP jelas.
- [ ] Non-goals jelas.

## 29. Checklist Task Siap Diambil Anggota

- [ ] Task ID jelas.
- [ ] Owner jelas.
- [ ] Priority jelas.
- [ ] Dependencies jelas.
- [ ] CHECK instructions jelas.
- [ ] IMPLEMENT instructions jelas.
- [ ] Acceptance criteria ada.
- [ ] Deadline/phase jelas.

## 30. Checklist Task Selesai dan Siap Review

- [ ] Task sesuai acceptance criteria.
- [ ] Tidak keluar scope.
- [ ] Tidak merusak fitur lain.
- [ ] Files changed jelas.
- [ ] Screenshot/video jika UI.
- [ ] Test manual dilakukan.
- [ ] Report ditulis.

## 31. Checklist Task Boleh Merge

- [ ] PR review selesai.
- [ ] Build tidak rusak.
- [ ] Scope aman.
- [ ] Demo flow tidak terganggu.
- [ ] Konflik merge resolved.
- [ ] Docs update jika perlu.

## 32. Checklist Task Harus Rollback

Rollback jika:

- [ ] Build gagal dan tidak cepat diperbaiki.
- [ ] Merusak demo flow utama.
- [ ] Menghapus file penting tanpa approval.
- [ ] Menambah fitur roadmap ke MVP.
- [ ] Mengubah DB provider/architecture tanpa approval.
- [ ] Membocorkan API key/secret.
