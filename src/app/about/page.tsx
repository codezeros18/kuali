import Link from "next/link";
import {
  MessageCircle, CheckCircle, ChefHat, BarChart2,
  ArrowRight, Zap, Shield, Users, TrendingUp,
  AlertCircle, Clock, CreditCard, Package,
} from "lucide-react";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

// ── Data ─────────────────────────────────────────────────────────────────────

const painPoints = [
  {
    icon: MessageCircle,
    title: "Pesanan tercecer",
    desc: "Order dari berbagai chat tidak terangkum. Risiko salah atau lupa pesanan jadi tinggi.",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: CreditCard,
    title: "Pembayaran manual",
    desc: "Cek siapa yang sudah bayar harus dilakukan satu per satu. Mudah terlewat, sulit ditagih tepat waktu.",
    color: "bg-red-50 text-red-500",
  },
  {
    icon: Package,
    title: "Bahan pakai perkiraan",
    desc: "Kebutuhan bahan dihitung dari ingatan, bukan dari order aktual. Bisa kurang atau berlebih.",
    color: "bg-yellow-50 text-yellow-500",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: MessageCircle,
    title: "Chat masuk",
    desc: "Pesan WhatsApp dari pelanggan — bisa pakai bahasa sehari-hari, tidak perlu format khusus.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    step: "02",
    icon: Zap,
    title: "AI parsing",
    desc: "AI membaca chat dan menghasilkan draft order terstruktur lengkap dengan confidence score.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    step: "03",
    icon: Shield,
    title: "Owner konfirmasi",
    desc: "Bu Rani melihat draft, memeriksa, lalu memutuskan dikonfirmasi atau ditolak. AI tidak bertindak sendiri.",
    color: "bg-green-50 text-green-600",
  },
  {
    step: "04",
    icon: ChefHat,
    title: "Produksi siap",
    desc: "Dari order dikonfirmasi, Kuali menghitung estimasi bahan yang dibutuhkan untuk produksi hari ini.",
    color: "bg-orange-50 text-kuali-primary",
  },
];

const features = [
  {
    icon: MessageCircle,
    title: "Mock WhatsApp Parser",
    desc: "Simulasi parsing chat order menjadi draft terstruktur dengan confidence score dan missing field detector.",
    tag: "MVP",
    color: "bg-orange-50 text-kuali-primary",
  },
  {
    icon: CheckCircle,
    title: "Owner Approval Flow",
    desc: "Setiap order melalui review owner sebelum dikonfirmasi. Kuali tidak mengambil keputusan secara otomatis.",
    tag: "MVP",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: ChefHat,
    title: "Production Planner",
    desc: "Estimasi kebutuhan bahan dari order aktual yang sudah dikonfirmasi berdasarkan resep sederhana.",
    tag: "MVP",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: BarChart2,
    title: "Daily Dashboard",
    desc: "Rekap harian: total order, status pembayaran, confidence AI, dan ringkasan produksi dalam satu layar.",
    tag: "MVP",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: CreditCard,
    title: "Payment Reminder",
    desc: "Template pesan reminder pembayaran siap pakai dengan info QRIS dummy milik merchant.",
    tag: "MVP",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    icon: TrendingUp,
    title: "Community Sourcing",
    desc: "Rencana: penggabungan kebutuhan bahan dari beberapa UMKM untuk menekan biaya belanja bersama.",
    tag: "Roadmap",
    color: "bg-gray-50 text-gray-500",
  },
];

const notList = [
  { label: "Bukan POS kasir lengkap", desc: "Kuali dimulai dari chat pre-order, bukan dari transaksi kasir." },
  { label: "Bukan chatbot biasa", desc: "Output dibatasi ke structured JSON. AI tidak menjawab bebas atau mengarang data." },
  { label: "Bukan marketplace", desc: "Kuali tidak menjual produk. Kuali membantu owner mengelola pesanan yang sudah masuk." },
];

const roadmapItems = [
  "Integrasi WhatsApp Business Cloud API",
  "Auth multi-tenant untuk banyak UMKM",
  "Community sourcing — belanja bareng antarusaha",
  "Supplier pooling berbasis consent opt-in",
  "Rescue sale — manajemen stok sisa dengan persetujuan owner",
];

// ── Components ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-kuali-primary uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl lg:text-3xl font-bold text-kuali-text-dark leading-tight mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
      {children}
    </h2>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-kuali-background text-kuali-text-dark">

      {/* ── Top nav bar ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-kuali-border">
        <div className="max-w-6xl mx-auto px-5 lg:px-10 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-kuali-primary flex items-center justify-center group-hover:brightness-90 transition-all">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>K</span>
            </div>
            <span className="font-bold text-sm text-kuali-text-dark" style={{ fontFamily: "Poppins, sans-serif" }}>Kuali</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:block text-sm text-kuali-text-mid hover:text-kuali-text-dark font-medium transition-colors">
              Dashboard
            </Link>
            <Link
              href="/demo"
              className="flex items-center gap-1.5 bg-kuali-primary text-white text-sm font-semibold px-4 py-2 rounded-button hover:bg-[#d4481a] transition-colors"
            >
              Lihat Demo <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="bg-kuali-primary">
          <div className="max-w-6xl mx-auto px-5 lg:px-10 py-16 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1.5 mb-6">
                <Zap size={12} className="text-white" />
                <span className="text-white/90 text-xs font-semibold">MVP Prototype · Gunadarma Code Week 2.0</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                {APP_TAGLINE}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-2xl">
                {APP_NAME} adalah asisten operasional WhatsApp-first untuk UMKM kuliner Indonesia.
                Dari chat pelanggan menjadi draft order, reminder pembayaran, dan rencana produksi harian.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/demo"
                  className="flex items-center gap-2 bg-white text-kuali-primary font-semibold px-6 py-3.5 rounded-button hover:bg-kuali-surface-alt transition-colors shadow-sm"
                >
                  Lihat Demo Lengkap <ArrowRight size={18} />
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-6 py-3.5 rounded-button hover:bg-white/10 transition-colors"
                >
                  Buka Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLEM ───────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5 lg:px-10">
            <div className="max-w-2xl mb-12">
              <SectionLabel>Tantangan nyata</SectionLabel>
              <SectionHeading>UMKM kuliner sudah aktif di WhatsApp. Masalahnya ada di proses setelah chat masuk.</SectionHeading>
              <p className="text-kuali-text-mid leading-relaxed">
                Bukan soal belum digital. Banyak usaha katering, nasi box, dan bakery rumahan sudah menerima puluhan pesanan per hari lewat WhatsApp. Tantangannya: rekap order, cek pembayaran, dan hitung bahan masih dilakukan manual.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {painPoints.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="bg-kuali-background rounded-2xl p-6">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-kuali-text-dark mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{title}</h3>
                  <p className="text-sm text-kuali-text-mid leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PERSONA ───────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-kuali-background">
          <div className="max-w-6xl mx-auto px-5 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <SectionLabel>Persona utama</SectionLabel>
                <SectionHeading>Bu Rani — Katering Rumahan Kelapa Dua</SectionHeading>
                <p className="text-kuali-text-mid leading-relaxed mb-6">
                  Bu Rani mengelola usaha katering rumahan dan nasi box sendiri, dibantu anggota keluarga. Ia menerima 20–50 pesanan per hari lewat WhatsApp dan grup pelanggan. Tidak ada admin khusus. Semua dicatat secara manual.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: AlertCircle, text: "Takut ada pesanan yang terlewat atau salah jumlah" },
                    { icon: Clock, text: "Hitung kebutuhan bahan sering mepet sebelum produksi" },
                    { icon: CreditCard, text: "Sulit ingat siapa yang sudah bayar dan siapa yang belum" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={14} className="text-red-500" />
                      </div>
                      <p className="text-sm text-kuali-text-mid leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats card */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <p className="text-xs font-semibold text-kuali-text-light uppercase tracking-wide mb-5">Profil usaha Bu Rani</p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Jenis usaha", val: "Katering rumahan & nasi box" },
                    { label: "Kanal jualan", val: "WhatsApp, Instagram Story, repeat order" },
                    { label: "Volume order", val: "20–50 pesanan/hari saat ramai" },
                    { label: "Ukuran tim", val: "Sendiri + dibantu keluarga" },
                    { label: "Device", val: "Android mid-low" },
                    { label: "Kebutuhan utama", val: "Order rapi, reminder bayar, daftar bahan" },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex items-start justify-between gap-4 pb-3.5 border-b border-kuali-border last:border-0 last:pb-0">
                      <span className="text-xs text-kuali-text-light shrink-0">{label}</span>
                      <span className="text-xs font-medium text-kuali-text-dark text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5 lg:px-10">
            <div className="text-center max-w-xl mx-auto mb-12">
              <SectionLabel>Cara kerja</SectionLabel>
              <SectionHeading>Dari chat masuk ke rencana produksi</SectionHeading>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {howItWorks.map(({ step, icon: Icon, title, desc, color }, i) => (
                <div key={step} className="relative">
                  {i < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(100%-8px)] w-full h-px bg-kuali-border z-0" />
                  )}
                  <div className="bg-kuali-background rounded-2xl p-5 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <span className="text-2xl font-bold text-kuali-border" style={{ fontFamily: "Poppins, sans-serif" }}>{step}</span>
                    </div>
                    <h3 className="font-semibold text-kuali-text-dark mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{title}</h3>
                    <p className="text-xs text-kuali-text-mid leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-kuali-background">
          <div className="max-w-6xl mx-auto px-5 lg:px-10">
            <div className="max-w-xl mb-12">
              <SectionLabel>Fitur</SectionLabel>
              <SectionHeading>Yang tersedia di MVP</SectionHeading>
              <p className="text-kuali-text-mid text-sm leading-relaxed">
                Fitur inti terfokus pada order operation dan production planner. Fitur roadmap ditampilkan sebagai simulasi, bukan klaim MVP.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map(({ icon: Icon, title, desc, tag, color }) => (
                <div key={title} className="bg-white rounded-2xl shadow-card p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${
                      tag === "MVP"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}>
                      {tag}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-kuali-text-dark mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{title}</h3>
                  <p className="text-xs text-kuali-text-mid leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI SAFETY ─────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <SectionLabel>Peran AI</SectionLabel>
                <SectionHeading>AI membantu membuat draft. Owner tetap memegang kendali.</SectionHeading>
                <p className="text-kuali-text-mid leading-relaxed mb-6">
                  Chat pelanggan bersifat natural, tidak selalu rapi, dan sering mengandung variasi bahasa. AI dipakai untuk membaca dan mengekstrak informasi — bukan untuk memutuskan.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { ok: true, text: "Parsing chat menjadi structured JSON" },
                    { ok: true, text: "Missing field detection & confidence score" },
                    { ok: true, text: "Suggested reply sebagai draft balasan" },
                    { ok: true, text: "Ringkasan operasional harian" },
                    { ok: false, text: "AI tidak mengarang harga atau menu" },
                    { ok: false, text: "AI tidak mengubah status bayar tanpa input owner" },
                    { ok: false, text: "AI tidak mengirim pesan ke pelanggan tanpa persetujuan" },
                  ].map(({ ok, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${ok ? "bg-green-100" : "bg-red-50"}`}>
                        {ok
                          ? <CheckCircle size={12} className="text-green-600" />
                          : <AlertCircle size={12} className="text-red-500" />
                        }
                      </div>
                      <span className={`text-sm ${ok ? "text-kuali-text-dark" : "text-kuali-text-mid line-through"}`}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Positioning */}
              <div className="flex flex-col gap-4">
                <div className="bg-kuali-background rounded-2xl p-6">
                  <SectionLabel>Positioning</SectionLabel>
                  <p className="text-sm font-semibold text-kuali-text-dark mb-4">Kuali bukan:</p>
                  <div className="flex flex-col gap-3">
                    {notList.map(({ label, desc }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                          <AlertCircle size={11} className="text-red-500" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-kuali-text-dark">{label}</div>
                          <div className="text-xs text-kuali-text-mid mt-0.5">{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-kuali-primary/5 border border-kuali-primary/20 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-kuali-primary uppercase tracking-wide mb-2">Positioning statement</p>
                  <p className="text-sm text-kuali-text-dark leading-relaxed font-medium">
                    &ldquo;Kuali adalah asisten operasional WhatsApp-first untuk UMKM kuliner pre-order yang membantu merapikan pesanan, pembayaran, dan kebutuhan bahan harian.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ROADMAP ───────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-kuali-background">
          <div className="max-w-6xl mx-auto px-5 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <SectionLabel>Visi ke depan</SectionLabel>
                <SectionHeading>Roadmap setelah MVP</SectionHeading>
                <p className="text-kuali-text-mid leading-relaxed mb-6">
                  Ketika data order dan kebutuhan bahan sudah rapi, Kuali dapat berkembang mendukung ekosistem kuliner lokal. Semua fitur roadmap berbasis consent opt-in, bukan otomatis.
                </p>
                <div className="flex flex-col gap-3">
                  {roadmapItems.map((item, i) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 text-[10px] font-bold text-purple-600">
                        {i + 1}
                      </div>
                      <span className="text-sm text-kuali-text-mid">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-kuali-text-light mt-4">
                  Roadmap adalah rencana — belum tersedia di MVP saat ini.
                </p>
              </div>

              {/* Vision quote */}
              <div className="bg-white rounded-2xl shadow-card p-8">
                <div className="text-5xl mb-5">🍳</div>
                <blockquote className="text-lg font-semibold text-kuali-text-dark leading-relaxed mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                  &ldquo;Kuali tidak mengganti cara UMKM berjualan. Kuali membantu merapikan alur yang sudah mereka pakai setiap hari.&rdquo;
                </blockquote>
                <p className="text-xs text-kuali-text-light">— Final closing statement, Kuali MVP</p>
                <div className="mt-6 pt-5 border-t border-kuali-border grid grid-cols-3 gap-4 text-center">
                  {[
                    { val: "11", label: "Order/hari" },
                    { val: "87%", label: "Parse rate" },
                    { val: "Rp167k", label: "Dikelola" },
                  ].map(({ val, label }) => (
                    <div key={label}>
                      <div className="text-xl font-bold text-kuali-primary" style={{ fontFamily: "Poppins, sans-serif" }}>{val}</div>
                      <div className="text-[10px] text-kuali-text-light mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── JOBS TO BE DONE ───────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5 lg:px-10">
            <div className="text-center max-w-xl mx-auto mb-10">
              <SectionLabel>Jobs to be done</SectionLabel>
              <SectionHeading>Apa yang sebenarnya dibutuhkan</SectionHeading>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { type: "Fungsional", text: "Tidak butuh POS lengkap — butuh order WhatsApp tidak tercecer." },
                { type: "Emosional", text: "Tidak butuh dashboard canggih — butuh rasa tenang bahwa semua order sudah tercatat." },
                { type: "Finansial", text: "Tidak butuh laporan akuntansi — butuh tahu siapa yang belum bayar." },
                { type: "Operasional", text: "Tidak butuh forecasting kompleks — butuh tahu bahan apa yang harus disiapkan." },
                { type: "Kontrol", text: "Tidak butuh AI yang memutuskan — butuh AI yang membantu membuat draft." },
                { type: "Kecepatan", text: "Tidak butuh chatbot panjang — butuh balasan konfirmasi yang cepat dan konsisten." },
              ].map(({ type, text }) => (
                <div key={type} className="bg-kuali-background rounded-xl p-4">
                  <p className="text-[10px] font-bold text-kuali-primary uppercase tracking-wide mb-2">{type}</p>
                  <p className="text-sm text-kuali-text-mid leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24 bg-kuali-primary">
          <div className="max-w-6xl mx-auto px-5 lg:px-10 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              Lihat Kuali bekerja
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
              Ikuti alur demo lengkap — dari chat pelanggan hingga rencana produksi.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/demo"
                className="flex items-center gap-2 bg-white text-kuali-primary font-semibold px-8 py-4 rounded-button hover:bg-kuali-surface-alt transition-colors shadow-sm text-base"
              >
                Mulai Demo <ArrowRight size={18} />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-button hover:bg-white/10 transition-colors text-base"
              >
                Lihat Dashboard
              </Link>
            </div>
            <p className="mt-8 text-white/40 text-xs">
              Prototipe MVP · Data Simulasi · Gunadarma Code Week 2.0
            </p>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-kuali-border py-6">
        <div className="max-w-6xl mx-auto px-5 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-kuali-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>K</span>
            </div>
            <span className="text-xs font-semibold text-kuali-text-dark">Kuali</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-xs text-kuali-text-light hover:text-kuali-text-mid transition-colors">Beranda</Link>
            <Link href="/about" className="text-xs text-kuali-text-light hover:text-kuali-text-mid transition-colors">Profil</Link>
            <Link href="/demo" className="text-xs text-kuali-text-light hover:text-kuali-text-mid transition-colors">Demo</Link>
            <Link href="/dashboard" className="text-xs text-kuali-text-light hover:text-kuali-text-mid transition-colors">Dashboard</Link>
          </div>
          <p className="text-[10px] text-kuali-text-light">MVP Prototype · Data Simulasi</p>
        </div>
      </footer>
    </div>
  );
}
