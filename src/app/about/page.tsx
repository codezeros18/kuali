"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  MessageCircle, CheckCircle, ChefHat, BarChart2,
  ArrowRight, Zap, Shield, TrendingUp,
  AlertCircle, Clock, CreditCard, Package, Sparkles,
} from "lucide-react";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────────────────────────────
const painPoints = [
  {
    icon: MessageCircle,
    title: "Pesanan tercecer",
    desc: "Order dari berbagai chat tidak terangkum. Risiko salah atau lupa pesanan jadi tinggi.",
    color: "bg-orange-50 text-orange-500 border-orange-100",
    num: "01",
  },
  {
    icon: CreditCard,
    title: "Pembayaran manual",
    desc: "Cek siapa yang sudah bayar harus dilakukan satu per satu. Mudah terlewat, sulit ditagih tepat waktu.",
    color: "bg-red-50 text-red-500 border-red-100",
    num: "02",
  },
  {
    icon: Package,
    title: "Bahan pakai perkiraan",
    desc: "Kebutuhan bahan dihitung dari ingatan, bukan dari order aktual. Bisa kurang atau berlebih.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    num: "03",
  },
];

const howItWorks = [
  { step: "01", icon: MessageCircle, title: "Chat masuk", desc: "Pesan WhatsApp dari pelanggan — bisa pakai bahasa sehari-hari, tidak perlu format khusus.", accent: "#2563EB", bg: "bg-blue-500" },
  { step: "02", icon: Zap,           title: "AI parsing",  desc: "AI membaca chat dan menghasilkan draft order terstruktur lengkap dengan confidence score.",         accent: "#E8541A", bg: "bg-orange-500" },
  { step: "03", icon: Shield,        title: "Owner konfirmasi", desc: "Bu Rani melihat draft, memeriksa, lalu memutuskan dikonfirmasi atau ditolak. AI tidak bertindak sendiri.", accent: "#16A34A", bg: "bg-green-500" },
  { step: "04", icon: ChefHat,       title: "Produksi siap", desc: "Dari order dikonfirmasi, Kuali menghitung estimasi bahan yang dibutuhkan untuk produksi hari ini.", accent: "#7C3AED", bg: "bg-purple-500" },
];

const features = [
  { icon: MessageCircle, title: "Mock WhatsApp Parser",  desc: "Simulasi parsing chat order menjadi draft terstruktur dengan confidence score dan missing field detector.", tag: "MVP",     color: "bg-orange-50 text-orange-500", size: "lg" },
  { icon: CheckCircle,   title: "Owner Approval Flow",   desc: "Setiap order melalui review owner sebelum dikonfirmasi. Kuali tidak mengambil keputusan secara otomatis.",  tag: "MVP",     color: "bg-green-50 text-green-600",  size: "sm" },
  { icon: ChefHat,       title: "Production Planner",    desc: "Estimasi kebutuhan bahan dari order aktual yang sudah dikonfirmasi berdasarkan resep sederhana.",            tag: "MVP",     color: "bg-blue-50 text-blue-600",    size: "sm" },
  { icon: BarChart2,     title: "Daily Dashboard",       desc: "Rekap harian: total order, status pembayaran, confidence AI, dan ringkasan produksi dalam satu layar.",      tag: "MVP",     color: "bg-purple-50 text-purple-600",size: "sm" },
  { icon: CreditCard,    title: "Payment Reminder",      desc: "Template pesan reminder pembayaran siap pakai dengan info QRIS dummy milik merchant.",                        tag: "MVP",     color: "bg-amber-50 text-amber-600",  size: "sm" },
  { icon: TrendingUp,    title: "Community Sourcing",    desc: "Rencana: penggabungan kebutuhan bahan dari beberapa UMKM untuk menekan biaya belanja bersama.",              tag: "Roadmap", color: "bg-gray-50 text-gray-500",    size: "sm" },
];

const notList = [
  { label: "Bukan POS kasir lengkap",  desc: "Kuali dimulai dari chat pre-order, bukan dari transaksi kasir." },
  { label: "Bukan chatbot biasa",       desc: "Output dibatasi ke structured JSON. AI tidak menjawab bebas atau mengarang data." },
  { label: "Bukan marketplace",         desc: "Kuali tidak menjual produk. Kuali membantu owner mengelola pesanan yang sudah masuk." },
];

const roadmapItems = [
  "Integrasi WhatsApp Business Cloud API",
  "Auth multi-tenant untuk banyak UMKM",
  "Community sourcing — belanja bareng antarusaha",
  "Supplier pooling berbasis consent opt-in",
  "Rescue sale — manajemen stok sisa dengan persetujuan owner",
];

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 24 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

// ── Sub-components ─────────────────────────────────────────────────────────────
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full mb-4">
      <Zap size={10} className="fill-orange-400" /> {children}
    </span>
  );
}


function Heading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-3xl lg:text-4xl font-black text-[#2F241F] tracking-tight leading-[1.1] mb-4", className)}>
      {children}
    </h2>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#2F241F] selection:bg-orange-500 selection:text-white">

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#E8E8E6]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/kuali-logo-mark.svg"
              alt="Kuali"
              width={36}
              height={36}
              className="w-9 h-9 shrink-0 drop-shadow-sm group-hover:opacity-85 transition-opacity"
            />
            <span className="font-black text-lg text-[#2F241F] tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>kuali</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/dashboard" className="hidden sm:block text-[13px] text-[#6B6B6B] hover:text-orange-500 font-bold transition-colors">
              Dashboard
            </Link>
            <Link href="/demo" className="flex items-center gap-1.5 bg-orange-500 text-white text-[13px] font-black px-4 py-2.5 rounded-xl hover:bg-orange-600 shadow-sm transition-all">
              Mulai Simulasi <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ── HERO — full-bleed bento ───────────────────────────────────── */}
        <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-[#FFF7ED] via-[#FAFAF8] to-[#ECFDF5] min-h-[88vh] flex items-center border-b border-[#E8E8E6]">
          {/* Soft operational backdrop */}
          <div className="absolute -top-24 right-[-10%] w-[520px] h-[520px] bg-orange-200/45 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-[-18%] left-[-8%] w-[440px] h-[440px] bg-emerald-200/35 rounded-full blur-[100px] pointer-events-none" />
          {/* Dot grid pattern */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(232,84,26,0.12) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <motion.div style={{ y: heroY }} className="relative w-full max-w-6xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-[1fr_420px] gap-12 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <div className="inline-flex items-center gap-2 bg-white border border-orange-100 text-orange-600 rounded-full px-3.5 py-1.5 mb-6 text-[11px] font-black uppercase tracking-widest shadow-sm">
                <Zap size={11} className="text-orange-500 fill-orange-500" />
                MVP Prototype · Gunadarma Code Week 2.0
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-[#2F241F] leading-[1.0] tracking-tight mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                {APP_TAGLINE.split(",")[0]},<br />
                <span className="text-orange-500">Produksi Siap.</span>
              </h1>
              <p className="text-[#6B6B6B] text-[15px] lg:text-[17px] font-medium leading-relaxed mb-10 max-w-xl">
                {APP_NAME} adalah asisten operasional WhatsApp-first untuk UMKM kuliner Indonesia.
                Dari chat pelanggan menjadi draft order, reminder pembayaran, dan rencana produksi harian.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/demo" className="flex items-center gap-2 bg-orange-500 text-white font-black text-[14px] px-7 py-4 rounded-2xl hover:bg-orange-400 shadow-lg shadow-orange-500/30 active:scale-[0.98] transition-all">
                  Jalankan Demo Lengkap <ArrowRight size={16} />
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 bg-white text-[#2F241F] font-bold text-[14px] px-7 py-4 rounded-2xl border border-[#E8E8E6] hover:border-orange-200 hover:bg-orange-50/60 shadow-sm transition-all">
                  Buka Dashboard
                </Link>
              </div>
            </motion.div>

            {/* Right — bento stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-col gap-3"
            >
              {/* Floating card — tagline */}
              <div className="bg-white border border-[#E8E8E6] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/40 shrink-0">
                  <Sparkles size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-[#2F241F] font-black text-[15px] tracking-tight leading-tight">Order Rapi, Dapur Siap</p>
                  <p className="text-[#888888] text-[12px] font-medium mt-0.5">Kuali MVP Engine · Operasional UMKM</p>
                </div>
              </div>
              {/* Stats trio */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: "11", label: "Order/hari", icon: "📦" },
                  { val: "87%", label: "Parse rate", icon: "🤖" },
                  { val: "Rp167k", label: "Dikelola", icon: "💰" },
                ].map(({ val, label, icon }) => (
                  <div key={label} className="bg-white border border-[#E8E8E6] rounded-2xl p-4 text-center shadow-sm">
                    <div className="text-2xl mb-1">{icon}</div>
                    <div className="text-xl font-black text-orange-400" style={{ fontFamily: "Poppins, sans-serif" }}>{val}</div>
                    <div className="text-[10px] text-[#888888] font-semibold mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              {/* WhatsApp chat mini-mockup */}
              <div className="bg-[#128C7E] rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/20">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm">👩</div>
                  <div>
                    <p className="text-white font-black text-[12px]">Bu Rani - Katering</p>
                    <p className="text-white/60 text-[10px]">online</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bg-white/15 text-white text-[11px] font-medium rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                    mba order 50 nasi box rendang besok jam 10 pagi, mau diantar ke kantor
                  </div>
                  <div className="bg-white text-[#2F241F] text-[11px] font-black rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%] self-end shadow-sm">
                    ✅ Draft order dibuat — 50× Nasi Rendang · Antar 10:00
                    <span className="block text-[9px] text-green-600 mt-0.5 font-bold">AI Confidence: 94%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── PROBLEM — numbered big cards ─────────────────────────────── */}
        <section className="py-24 bg-white border-b border-[#E8E8E6]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mb-14">
              <Chip>Tantangan Nyata Lapangan</Chip>
              <Heading>UMKM kuliner sudah aktif di WhatsApp. Masalahnya ada di proses setelah chat masuk.</Heading>
              <p className="text-[#6B6B6B] font-medium text-[14px] leading-relaxed">
                Bukan soal belum digital. Banyak katering, nasi box, dan bakery rumahan sudah terima puluhan order per hari. Tantangannya: rekap, cek bayar, dan hitung bahan masih manual.
              </p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {painPoints.map(({ icon: Icon, title, desc, color, num }) => (
                <motion.div key={title} variants={fadeUp}
                  className="relative bg-[#FAFAF8] border border-[#E8E8E6] rounded-3xl p-7 overflow-hidden group hover:border-orange-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  {/* Big background number */}
                  <span className="absolute bottom-4 right-5 text-[88px] font-black text-[#F0F0EE] leading-none select-none group-hover:text-orange-50 transition-colors">
                    {num}
                  </span>
                  <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center border mb-5 shadow-sm shrink-0 relative z-10", color)}>
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="font-black text-[17px] text-[#2F241F] tracking-tight mb-2 relative z-10">{title}</h3>
                  <p className="text-[13px] text-[#6B6B6B] font-medium leading-relaxed relative z-10">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── PERSONA — ID card style ───────────────────────────────────── */}
        <section className="py-24 bg-[#FBFBFB] border-b border-[#E8E8E6]">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Chip>Fokus Persona Utama</Chip>
              <Heading>Bu Rani — Katering Rumahan Kelapa Dua</Heading>
              <p className="text-[#6B6B6B] font-medium text-[14px] leading-relaxed mb-7">
                Bu Rani mengelola usaha katering rumahan dan nasi box sendiri, dibantu anggota keluarga. Ia menerima 20–50 pesanan per hari lewat WhatsApp dan grup pelanggan. Tidak ada admin khusus. Semua dicatat secara manual.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: AlertCircle, text: "Takut ada pesanan yang terlewat atau salah jumlah", bg: "bg-red-100 text-red-600" },
                  { icon: Clock, text: "Hitung kebutuhan bahan sering mepet sebelum produksi", bg: "bg-amber-100 text-amber-600" },
                  { icon: CreditCard, text: "Sulit ingat siapa yang sudah bayar dan siapa yang belum", bg: "bg-orange-100 text-orange-600" },
                ].map(({ icon: Icon, text, bg }) => (
                  <div key={text} className="flex items-center gap-3.5 bg-white border border-[#E8E8E6] p-3.5 rounded-2xl shadow-sm hover:border-red-200 transition-colors group">
                    <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", bg)}>
                      <Icon size={14} strokeWidth={2.5} />
                    </div>
                    <p className="text-[13px] text-[#3A3A3A] font-bold leading-snug">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ID Card */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="bg-white rounded-3xl border border-[#E8E8E6] overflow-hidden shadow-lg">
              {/* Card header strip */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl">👩‍🍳</div>
                <div>
                  <p className="text-white font-black text-[14px] leading-tight">Profil Merchant</p>
                  <p className="text-white/70 text-[11px] font-semibold">Kateri Bu Rani · Kelapa Dua, Depok</p>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-0">
                {[
                  { label: "Jenis usaha",     val: "Katering rumahan & nasi box" },
                  { label: "Kanal jualan",    val: "WhatsApp, Instagram Story, repeat order" },
                  { label: "Volume order",    val: "20–50 pesanan/hari saat ramai" },
                  { label: "Ukuran tim",      val: "Sendiri + dibantu keluarga" },
                  { label: "Device",          val: "Android mid-low" },
                  { label: "Kebutuhan utama", val: "Order rapi, reminder bayar, daftar bahan" },
                ].map(({ label, val }, i) => (
                  <div key={label} className={cn("flex items-start justify-between gap-4 py-3.5", i < 5 && "border-b border-[#F4F4F2]")}>
                    <span className="text-[12px] text-[#ADADAD] font-bold shrink-0">{label}</span>
                    <span className="text-[13px] font-black text-[#2F241F] text-right">{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS — horizontal timeline ───────────────────────── */}
        <section className="py-24 bg-white border-b border-[#E8E8E6] overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16">
              <Chip>Alur Pemrosesan</Chip>
              <Heading>Dari Chat Masuk ke Rencana Produksi</Heading>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-10 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-0.5 bg-gradient-to-r from-blue-200 via-orange-200 via-green-200 to-purple-200" />

              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorks.map(({ step, icon: Icon, title, desc, bg }, i) => (
                  <motion.div key={step} variants={fadeUp} className="flex flex-col items-center text-center relative">
                    {/* Step bubble */}
                    <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg relative z-10", bg)}>
                      <Icon size={30} className="text-white" strokeWidth={2} />
                    </div>
                    {/* Step number */}
                    <span className="text-[11px] font-black text-[#ADADAD] uppercase tracking-widest mb-2">{step}</span>
                    <h3 className="font-black text-[16px] text-[#2F241F] tracking-tight mb-2">{title}</h3>
                    <p className="text-[13px] text-[#6B6B6B] font-medium leading-relaxed max-w-[200px]">{desc}</p>
                    {/* Arrow between */}
                    {i < 3 && (
                      <div className="hidden lg:block absolute top-10 -right-3 z-20 text-[#ADADAD]">
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FEATURES — bento grid ─────────────────────────────────────── */}
        <section className="py-24 bg-[#FBFBFB] border-b border-[#E8E8E6]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-xl mb-14">
              <Chip>Kapabilitas Ekosistem</Chip>
              <Heading>Modul Inti Operasional Kuali MVP</Heading>
              <p className="text-[#6B6B6B] font-medium text-[14px] leading-relaxed">
                Fitur inti terfokus pada order operation dan production planner. Fitur roadmap ditampilkan sebagai simulasi, bukan klaim MVP.
              </p>
            </div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Large card — first feature */}
              {features.map(({ icon: Icon, title, desc, tag, color }, idx) => (
                <motion.div key={title} variants={fadeUp}
                  className={cn(
                    "bg-white rounded-3xl border border-[#E8E8E6] shadow-sm flex flex-col justify-between overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300",
                    idx === 0 ? "lg:col-span-2 p-8" : "p-6"
                  )}>
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div className={cn("rounded-xl flex items-center justify-center border shadow-sm shrink-0", color, idx === 0 ? "w-14 h-14" : "w-10 h-10")}>
                        <Icon size={idx === 0 ? 26 : 18} strokeWidth={2} />
                      </div>
                      <span className={cn(
                        "text-[10px] font-black px-2.5 py-1 rounded-lg border",
                        tag === "MVP" ? "bg-green-50 text-green-600 border-green-200" : "bg-purple-50 text-purple-600 border-purple-200"
                      )}>
                        {tag}
                      </span>
                    </div>
                    <h3 className={cn("font-black text-[#2F241F] tracking-tight mb-2", idx === 0 ? "text-[20px]" : "text-[15px]")}>{title}</h3>
                    <p className={cn("text-[#6B6B6B] font-medium leading-relaxed", idx === 0 ? "text-[14px]" : "text-[13px]")}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── AI SAFETY ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-white border-b border-[#E8E8E6]">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Chip>Batasan Etis AI</Chip>
              <Heading>AI membantu membuat draft. Owner tetap memegang kendali.</Heading>
              <p className="text-[#6B6B6B] font-medium text-[14px] leading-relaxed mb-7">
                Chat pelanggan bersifat natural, tidak selalu rapi, dan sering mengandung variasi bahasa. AI dipakai untuk membaca dan mengekstrak informasi — bukan untuk memutuskan.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { ok: true,  text: "Parsing chat menjadi structured JSON" },
                  { ok: true,  text: "Missing field detection & confidence score" },
                  { ok: true,  text: "Suggested reply sebagai draft balasan" },
                  { ok: true,  text: "Ringkasan operasional harian" },
                  { ok: false, text: "AI tidak mengarang harga atau menu" },
                  { ok: false, text: "AI tidak mengubah status bayar tanpa input owner" },
                  { ok: false, text: "AI tidak mengirim pesan ke pelanggan tanpa persetujuan" },
                ].map(({ ok, text }) => (
                  <div key={text} className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors",
                    ok ? "bg-green-50/60 border-green-100" : "bg-red-50/50 border-red-100"
                  )}>
                    <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 border", ok ? "bg-green-100 border-green-200" : "bg-red-100 border-red-200")}>
                      {ok
                        ? <CheckCircle size={11} className="text-green-600" strokeWidth={3} />
                        : <AlertCircle size={11} className="text-red-500" strokeWidth={3} />}
                    </div>
                    <span className={cn("text-[13px] font-bold", ok ? "text-[#2F241F]" : "text-[#888] line-through")}>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col gap-4">
              {/* Not list */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-[#FAFAF8] rounded-3xl border border-[#E8E8E6] p-7">
                <p className="text-[11px] font-black text-[#ADADAD] uppercase tracking-widest mb-1">Definisi Diferensiasi</p>
                <p className="font-black text-[16px] text-[#2F241F] mb-5">Kuali bukan:</p>
                <div className="flex flex-col gap-4">
                  {notList.map(({ label, desc }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertCircle size={10} className="text-red-500" strokeWidth={3} />
                      </div>
                      <div>
                        <div className="text-[13px] font-black text-[#2F241F]">{label}</div>
                        <div className="text-[12px] text-[#6B6B6B] font-medium mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* Positioning statement */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-orange-500 rounded-3xl p-7">
                <p className="text-[11px] font-black text-orange-200 uppercase tracking-widest mb-3">Positioning Statement</p>
                <p className="text-[14px] text-white font-bold leading-relaxed">
                  &ldquo;Kuali adalah asisten operasional WhatsApp-first untuk UMKM kuliner pre-order yang membantu merapikan pesanan, pembayaran, dan kebutuhan bahan harian.&rdquo;
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── ROADMAP — vertical timeline ───────────────────────────────── */}
        <section className="py-24 bg-[#FBFBFB] border-b border-[#E8E8E6]">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Chip>Visi ke Depan</Chip>
              <Heading>Roadmap setelah MVP</Heading>
              <p className="text-[#6B6B6B] font-medium text-[14px] leading-relaxed mb-8">
                Ketika data order dan kebutuhan bahan sudah rapi, Kuali dapat berkembang mendukung ekosistem kuliner lokal. Semua fitur roadmap berbasis consent opt-in.
              </p>
              {/* Vertical timeline */}
              <div className="relative pl-8">
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-300 to-purple-100" />
                {roadmapItems.map((item, i) => (
                  <motion.div key={item}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                    className="relative flex items-start gap-4 mb-5 last:mb-0">
                    <div className="absolute -left-5 w-6 h-6 rounded-full bg-purple-100 border-2 border-purple-300 flex items-center justify-center text-[11px] font-black text-purple-600 shrink-0 shadow-sm">
                      {i + 1}
                    </div>
                    <p className="text-[13px] font-bold text-[#3A3A3A] leading-snug bg-white border border-[#E8E8E6] px-4 py-3 rounded-xl w-full shadow-sm">{item}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-[11px] text-[#ADADAD] font-semibold mt-5">Roadmap adalah rencana — belum tersedia di MVP saat ini.</p>
            </motion.div>

            {/* Quote card */}
            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="sticky top-20 bg-gradient-to-br from-[#FFF7ED] to-[#ECFDF5] rounded-3xl p-10 text-[#2F241F] flex flex-col justify-between min-h-[460px] overflow-hidden relative border border-orange-100 shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/40 rounded-full blur-[80px] pointer-events-none" />
              <div className="text-7xl font-black text-orange-500/25 leading-none select-none">&ldquo;</div>
              <blockquote className="text-[18px] lg:text-[22px] font-black text-[#2F241F] leading-snug tracking-tight my-4 relative z-10">
                Kuali tidak mengganti cara UMKM berjualan. Kuali membantu merapikan alur yang sudah mereka pakai setiap hari.
              </blockquote>
              <div>
                <p className="text-[11px] font-black text-[#ADADAD] uppercase tracking-widest mb-5">— Final closing statement, Kuali MVP</p>
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-orange-100">
                  {[
                    { val: "11", label: "Order/hari" },
                    { val: "87%", label: "Parse rate" },
                    { val: "Rp167k", label: "Dikelola" },
                  ].map(({ val, label }) => (
                    <div key={label} className="text-center">
                      <div className="text-xl font-black text-orange-400" style={{ fontFamily: "Poppins, sans-serif" }}>{val}</div>
                      <div className="text-[10px] text-[#888888] font-bold uppercase tracking-wider mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── JOBS TO BE DONE ───────────────────────────────────────────── */}
        <section className="py-24 bg-white border-b border-[#E8E8E6]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-14">
              <Chip>Jobs to be Done</Chip>
              <Heading>Apa yang sebenarnya dibutuhkan</Heading>
            </div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                { type: "Fungsional",    text: "Tidak butuh POS lengkap — butuh order WhatsApp tidak tercecer." },
                { type: "Emosional",     text: "Tidak butuh dashboard canggih — butuh rasa tenang bahwa semua order sudah tercatat." },
                { type: "Finansial",     text: "Tidak butuh laporan akuntansi — butuh tahu siapa yang belum bayar." },
                { type: "Operasional",   text: "Tidak butuh forecasting kompleks — butuh tahu bahan apa yang harus disiapkan." },
                { type: "Kontrol",       text: "Tidak butuh AI yang memutuskan — butuh AI yang membantu membuat draft." },
                { type: "Kecepatan",     text: "Tidak butuh chatbot panjang — butuh balasan konfirmasi yang cepat dan konsisten." },
              ].map(({ type, text }) => (
                <motion.div key={type} variants={fadeUp}
                  className="bg-[#FAFAF8] border border-[#E8E8E6] rounded-2xl p-5 hover:border-orange-200 hover:bg-orange-50/30 transition-colors group">
                  <p className="text-[11px] font-black text-orange-500 uppercase tracking-widest mb-2.5 group-hover:text-orange-600 transition-colors">{type}</p>
                  <p className="text-[13px] text-[#555] font-medium leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA — warm finish ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF7ED] via-white to-[#FAFAF8] py-28">
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(232,84,26,0.11) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-200/55 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-white border border-orange-100 text-orange-600 rounded-full px-4 py-2 mb-6 text-[11px] font-black uppercase tracking-widest shadow-sm">
                <Sparkles size={11} className="text-orange-500" /> Lihat Kuali bekerja
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-[#2F241F] tracking-tight leading-tight mb-5" style={{ fontFamily: "Poppins, sans-serif" }}>
                Dari Chat ke Dapur,<br /><span className="text-orange-500">Semua dalam Satu Tempat.</span>
              </h2>
              <p className="text-[#6B6B6B] text-[16px] font-medium mb-10 max-w-md mx-auto leading-relaxed">
                Ikuti alur demo lengkap — dari chat pelanggan hingga rencana produksi.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/demo" className="flex items-center gap-2 bg-orange-500 text-white font-black text-[15px] px-9 py-4 rounded-2xl hover:bg-orange-400 shadow-xl shadow-orange-500/30 active:scale-[0.98] transition-all">
                  Mulai Demo <ArrowRight size={18} />
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 bg-white text-[#2F241F] font-bold text-[15px] px-9 py-4 rounded-2xl border border-[#E8E8E6] hover:border-orange-200 hover:bg-orange-50/60 shadow-sm transition-all">
                  Lihat Dashboard
                </Link>
              </div>
              <p className="mt-10 text-[#ADADAD] font-semibold text-[11px] uppercase tracking-widest">
                Prototipe MVP · Data Simulasi · Gunadarma Code Week 2.0
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-[#E8E8E6] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/kuali-logo-mark.svg"
              alt="Kuali"
              width={28}
              height={28}
              className="w-7 h-7 shrink-0"
            />
            <span className="text-sm font-black text-[#2F241F] tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>Kuali</span>
          </div>
          <div className="flex items-center gap-6 text-[12px] font-bold text-[#6B6B6B]">
            <Link href="/" className="hover:text-orange-500 transition-colors">Beranda</Link>
            <Link href="/about" className="text-orange-500">Profil</Link>
            <Link href="/demo" className="hover:text-orange-500 transition-colors">Demo</Link>
            <Link href="/dashboard" className="hover:text-orange-500 transition-colors">Dashboard</Link>
          </div>
          <p className="text-[12px] text-[#ADADAD] font-medium">MVP Prototype · Data Simulasi</p>
        </div>
      </footer>
    </div>
  );
}
