import Link from "next/link";
import { ArrowRight, MessageCircle, CheckCircle, ChefHat, BarChart2 } from "lucide-react";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

const features = [
  {
    Icon: MessageCircle,
    title: "Chat masuk, order rapi",
    desc: "Pesan WhatsApp dari pelanggan langsung diparse jadi draft order.",
    color: "bg-orange-50 text-kuali-primary",
  },
  {
    Icon: CheckCircle,
    title: "Owner tetap pegang kendali",
    desc: "Setiap order dikonfirmasi sendiri oleh pemilik usaha — bukan otomatis.",
    color: "bg-green-50 text-green-600",
  },
  {
    Icon: ChefHat,
    title: "Produksi siap lebih awal",
    desc: "Estimasi bahan otomatis berdasarkan order yang sudah dikonfirmasi.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    Icon: BarChart2,
    title: "Rekap harian sekejap",
    desc: "Semua order, pembayaran, dan status tersaji dalam satu layar.",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-kuali-background">
      {/* ── MOBILE ─────────────────────────────────────── */}
      <div className="lg:hidden flex justify-center">
        <div className="w-full max-w-[430px] min-h-screen flex flex-col px-5 py-10">
          <div className="flex-1 flex flex-col justify-center gap-8">
            {/* Hero */}
            <div className="flex flex-col gap-3">
              <div className="w-14 h-14 rounded-2xl bg-kuali-primary flex items-center justify-center shadow-card">
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>K</span>
              </div>
              <h1 className="text-3xl font-bold text-kuali-text-dark" style={{ fontFamily: "Poppins, sans-serif" }}>
                {APP_NAME}
              </h1>
              <p className="text-lg font-semibold text-kuali-primary">{APP_TAGLINE}</p>
              <p className="text-sm text-kuali-text-mid leading-relaxed">
                Asisten operasional berbasis WhatsApp untuk usaha kuliner Indonesia.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3">
              {features.slice(0, 3).map(({ Icon, title, desc, color }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${color}`}>
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-kuali-text-dark">{title}</div>
                    <div className="text-xs text-kuali-text-mid mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <Link href="/demo" className="btn-primary flex items-center justify-center gap-2">
                Lihat Demo <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard" className="btn-secondary flex items-center justify-center">
                Buka Dashboard
              </Link>
            </div>
          </div>
          <div className="pt-6 text-center flex flex-col gap-2">
            <Link href="/about" className="text-xs text-kuali-primary font-medium underline underline-offset-2">
              Tentang Kuali — Company Profile
            </Link>
            <p className="text-[10px] text-kuali-text-light">
              Prototipe · Data Simulasi · Gunadarma Code Week 2.0
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP ────────────────────────────────────── */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left panel */}
        <div className="w-1/2 min-h-screen bg-kuali-primary flex flex-col justify-center px-16 py-20">
          <div className="max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>K</span>
              </div>
              <span className="text-white font-bold text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>Kuali</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              {APP_TAGLINE}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              Asisten operasional WhatsApp-first untuk UMKM kuliner Indonesia.
              Dari chat jadi order, dari order jadi rencana produksi.
            </p>

            <div className="flex gap-3">
              <Link
                href="/demo"
                className="flex items-center gap-2 bg-white text-kuali-primary font-semibold px-6 py-3.5 rounded-button hover:bg-kuali-surface-alt transition-colors shadow-sm"
              >
                Lihat Demo <ArrowRight size={18} />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-6 py-3.5 rounded-button hover:bg-white/10 transition-colors"
              >
                Dashboard
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-1.5">
              <Link href="/about" className="text-white/60 hover:text-white text-sm font-medium transition-colors underline underline-offset-2">
                Tentang Kuali
              </Link>
              <span className="text-white/30 text-sm">·</span>
              <span className="text-white/40 text-xs">Company Profile</span>
            </div>

            <p className="mt-4 text-white/50 text-xs">
              Prototipe MVP · Data Simulasi · Gunadarma Code Week 2.0
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-1/2 min-h-screen bg-kuali-background flex flex-col justify-center px-16 py-20">
          <div className="max-w-md">
            <p className="text-xs font-semibold text-kuali-text-light uppercase tracking-widest mb-6">
              Fitur MVP
            </p>
            <div className="flex flex-col gap-4">
              {features.map(({ Icon, title, desc, color }) => (
                <div key={title} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-card">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-kuali-text-dark">{title}</div>
                    <div className="text-xs text-kuali-text-mid mt-1 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats bar */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { val: "11", label: "Order/hari" },
                { val: "95%", label: "Akurasi AI" },
                { val: "Rp167k", label: "Dikelola" },
              ].map(({ val, label }) => (
                <div key={label} className="bg-white rounded-xl p-3 text-center shadow-card">
                  <div className="text-lg font-bold text-kuali-primary">{val}</div>
                  <div className="text-[10px] text-kuali-text-mid mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
