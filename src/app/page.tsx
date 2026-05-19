"use client";

import Link from "next/link";
import { motion, useInView, useScroll, AnimatePresence } from "framer-motion";
import {
  ArrowRight, MessageCircle, CheckCircle, ChefHat, BarChart2,
  Zap, ArrowUpRight, Check,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const dur = 1400;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ── Sticky features data ──────────────────────────────────────────────────────
const FEATURES = [
  {
    number: "01",
    badge: "AI Parser",
    Icon: MessageCircle,
    title: "Chat masuk,\norder rapi.",
    desc: "Pesan WhatsApp dari pelanggan langsung diparse jadi draft order otomatis — tanpa ketik ulang, tanpa salah baca. AI kami membaca konteks natural language seperti manusia.",
    accent: { pill: "bg-orange-50 text-orange-500 border-orange-100", bar: "bg-orange-500", num: "text-orange-100" },
  },
  {
    number: "02",
    badge: "Validasi",
    Icon: CheckCircle,
    title: "Owner tetap\npegang kendali.",
    desc: "Konfirmasi manual sebelum order masuk sistem. Setiap draft bisa diedit, disetujui, atau ditolak. Anti-salah, anti-kabur — keputusan ada di tangan kamu.",
    accent: { pill: "bg-emerald-50 text-emerald-600 border-emerald-100", bar: "bg-emerald-500", num: "text-emerald-100" },
  },
  {
    number: "03",
    badge: "Dapur",
    Icon: ChefHat,
    title: "Dapur siap\nsebelum subuh.",
    desc: "Estimasi bahan otomatis dari order aktual yang sudah dikonfirmasi. Tahu persis apa yang perlu dibeli, berapa jumlahnya, sebelum hari produksi dimulai.",
    accent: { pill: "bg-blue-50 text-blue-600 border-blue-100", bar: "bg-blue-500", num: "text-blue-100" },
  },
  {
    number: "04",
    badge: "Finansial",
    Icon: BarChart2,
    title: "Rekap harian\ntanpa ribet.",
    desc: "Semua order, pembayaran, dan status tersaji dalam satu layar ringkas. Tahu siapa belum bayar, berapa yang sudah masuk, dan tren performa harian dengan sekali lihat.",
    accent: { pill: "bg-violet-50 text-violet-600 border-violet-100", bar: "bg-violet-500", num: "text-violet-100" },
  },
];

// ── Right-side visual mockups ─────────────────────────────────────────────────
function MockParser() {
  return (
    <div className="bg-white rounded-3xl border border-[#E5E5E3] p-6 shadow-sm w-full max-w-sm mx-auto">
      <p className="text-[10px] font-black text-[#ADADAD] uppercase tracking-widest mb-4">WhatsApp → Draft</p>
      <div className="bg-[#DCF8C6] rounded-2xl rounded-tl-sm px-4 py-3 mb-4 text-[13px] text-[#1A1A1A] leading-relaxed">
        Halo bu, pesan nasi box 50 pcs, ayam goreng sama tempe. Kirim besok pagi ya 🙏
        <div className="text-[10px] text-[#ADADAD] text-right mt-1">09:14 ✓✓</div>
      </div>
      <div className="flex items-center gap-2 my-3">
        <div className="flex-1 h-px bg-orange-200" />
        <span className="text-[10px] font-black text-orange-500 flex items-center gap-1">
          <Zap size={10} fill="currentColor" /> AI Parser
        </span>
        <div className="flex-1 h-px bg-orange-200" />
      </div>
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[["Pelanggan", "Bu Ani"], ["Jumlah", "50 pcs"], ["Menu", "Nasi Box Ayam + Tempe"], ["Kirim", "Besok Pagi"]].map(([k, v]) => (
            <div key={k}>
              <p className="text-[9px] font-black text-[#ADADAD] uppercase mb-0.5">{k}</p>
              <p className="text-[12px] font-bold text-[#1A1A1A]">{v}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-orange-100">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <p className="text-[10px] font-bold text-green-600">Akurasi 94% · Siap dikonfirmasi</p>
        </div>
      </div>
    </div>
  );
}

function MockValidasi() {
  return (
    <div className="bg-white rounded-3xl border border-[#E5E5E3] p-6 shadow-sm w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] font-black text-[#1A1A1A]">Draft #ORD-042</p>
        <span className="bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-black px-2 py-0.5 rounded-full">Menunggu</span>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {[["Nasi Box Ayam", "50 pcs", "Rp 125.000"], ["Tempe Goreng", "50 pcs", "Rp 50.000"]].map(([item, qty, price]) => (
          <div key={item} className="flex items-center justify-between bg-[#FAFAF8] rounded-xl px-3 py-2.5 text-[12px]">
            <span className="font-bold text-[#1A1A1A]">{item}</span>
            <span className="text-[#ADADAD]">{qty}</span>
            <span className="font-bold">{price}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center border-t border-[#F4F4F2] pt-3 mb-4">
        <span className="text-[13px] font-bold text-[#6B6B6B]">Total</span>
        <span className="text-[15px] font-black text-orange-500">Rp 175.000</span>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 bg-emerald-500 text-white text-[12px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5">
          <Check size={13} /> Setujui
        </button>
        <button className="flex-1 bg-[#F4F4F2] text-[#6B6B6B] text-[12px] font-bold py-2.5 rounded-xl">
          Edit
        </button>
      </div>
    </div>
  );
}

function MockDapur() {
  const items = [
    { name: "Beras", needed: "5 kg", stock: "8 kg", pct: 100, s: "ok" },
    { name: "Ayam Potong", needed: "3 kg", stock: "2.5 kg", pct: 72, s: "low" },
    { name: "Minyak Goreng", needed: "2 L", stock: "0.4 L", pct: 20, s: "bad" },
  ];
  return (
    <div className="bg-white rounded-3xl border border-[#E5E5E3] p-6 shadow-sm w-full max-w-sm mx-auto">
      <p className="text-[10px] font-black text-[#E8541A] uppercase tracking-widest mb-5">Rencana Dapur · Besok</p>
      <div className="flex flex-col gap-4">
        {items.map(({ name, needed, stock, pct, s }) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-bold text-[#1A1A1A]">{name}</span>
              <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full",
                s === "ok" ? "bg-green-50 text-green-600" :
                s === "low" ? "bg-amber-50 text-amber-600" :
                "bg-red-50 text-red-500"
              )}>
                {s === "ok" ? "Cukup" : s === "low" ? "Hampir Habis" : "Perlu Beli"}
              </span>
            </div>
            <div className="h-1.5 bg-[#F4F4F2] rounded-full overflow-hidden mb-1">
              <motion.div
                className={cn("h-full rounded-full", s === "ok" ? "bg-green-500" : s === "low" ? "bg-amber-500" : "bg-red-500")}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#ADADAD]">
              <span>Butuh {needed}</span><span>Stok {stock}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockFinansial() {
  const bars = [60, 80, 50, 90, 70, 100, 85];
  return (
    <div className="bg-white rounded-3xl border border-[#E5E5E3] p-6 shadow-sm w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-black text-[#E8541A] uppercase tracking-widest">Rekap Harian</p>
        <span className="text-[11px] text-[#ADADAD]">Senin, 18 Mei</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {[
          { label: "Total Order", val: "11", cls: "bg-blue-50 text-blue-600" },
          { label: "Dikonfirmasi", val: "8",  cls: "bg-green-50 text-green-600" },
          { label: "Belum Bayar", val: "Rp 320rb", cls: "bg-amber-50 text-amber-600" },
          { label: "Draft",       val: "3",  cls: "bg-gray-50 text-gray-500" },
        ].map(({ label, val, cls }) => (
          <div key={label} className={cn("rounded-xl p-3 border border-black/[0.04]", cls.split(" ")[0])}>
            <div className={cn("text-[17px] font-black leading-none mb-0.5", cls.split(" ")[1])}>{val}</div>
            <div className="text-[10px] text-[#ADADAD] font-medium">{label}</div>
          </div>
        ))}
      </div>
      <div className="h-14 flex items-end gap-1">
        {bars.map((h, i) => (
          <motion.div key={i} className="flex-1 bg-orange-100 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[9px] text-[#ADADAD] mt-1.5 font-semibold">
        {["Sen","Sel","Rab","Kam","Jum","Sab","Min"].map(d => <span key={d}>{d}</span>)}
      </div>
    </div>
  );
}

const FEATURE_VISUALS = [<MockParser key="p" />, <MockValidasi key="v" />, <MockDapur key="d" />, <MockFinansial key="f" />];

// ── Sticky scroll section ─────────────────────────────────────────────────────
function StickyScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActiveIdx(Math.min(FEATURES.length - 1, Math.floor(v * FEATURES.length)));
    });
  }, [scrollYProgress]);

  const f = FEATURES[activeIdx];

  return (
    <div ref={containerRef} className="relative" style={{ height: `${FEATURES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-[#FAFAF8]">

        {/* Background accent that shifts per feature */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className={cn(
              "absolute -top-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30",
              activeIdx === 0 ? "bg-orange-200" :
              activeIdx === 1 ? "bg-emerald-200" :
              activeIdx === 2 ? "bg-blue-200" :
              "bg-violet-200"
            )} />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full">

          {/* Mobile: simple stacked (scroll within) */}
          <div className="lg:hidden flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div key={activeIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}>
                <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-3", f.accent.pill)}>
                  <f.Icon size={11} /> {f.badge}
                </span>
                <h2 className="text-[2rem] font-black text-[#1A1A1A] tracking-tight leading-tight mb-3 whitespace-pre-line">{f.title}</h2>
                <p className="text-[14px] text-[#6B6B6B] leading-relaxed">{f.desc}</p>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div key={`v-${activeIdx}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }}>
                {FEATURE_VISUALS[activeIdx]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop: two-column */}
          <div className="hidden lg:grid grid-cols-[1fr_1fr] gap-20 items-center">

            {/* LEFT */}
            <div>
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[11px] font-black text-[#ADADAD] uppercase tracking-widest">
                  Cara Kerja
                </span>
                <div className="flex gap-1.5">
                  {FEATURES.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ width: i === activeIdx ? 28 : 6, backgroundColor: i === activeIdx ? "#E8541A" : "#E5E5E3" }}
                      transition={{ duration: 0.35 }}
                      className="h-1.5 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-black text-[#ADADAD]">{activeIdx + 1} / {FEATURES.length}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Big ghost number */}
                  <div className={cn("text-[9rem] font-black leading-none select-none -mb-4 tracking-tighter", f.accent.num)}>
                    {f.number}
                  </div>

                  {/* Badge */}
                  <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border mb-5", f.accent.pill)}>
                    <f.Icon size={11} /> {f.badge}
                  </span>

                  {/* Title */}
                  <h2 className="text-[3.25rem] font-black text-[#1A1A1A] tracking-tighter leading-[1.0] mb-5 whitespace-pre-line">
                    {f.title}
                  </h2>

                  {/* Desc */}
                  <p className="text-[16px] text-[#6B6B6B] leading-relaxed max-w-[420px]">
                    {f.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: visual */}
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`v-${activeIdx}`}
                  initial={{ opacity: 0, scale: 0.93, y: 22 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: -18 }}
                  transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[400px]"
                >
                  {FEATURE_VISUALS[activeIdx]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Scroll cue (shown on first feature) */}
          <AnimatePresence>
            {activeIdx === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
              >
                <span className="text-[10px] font-bold text-[#ADADAD] uppercase tracking-widest">Scroll</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  className="w-5 h-8 rounded-full border-2 border-[#E5E5E3] flex items-start justify-center pt-1.5"
                >
                  <div className="w-1 h-1.5 rounded-full bg-[#ADADAD]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Overview section (all features at once) ───────────────────────────────────
const OVERVIEW_ITEMS = [
  { Icon: MessageCircle, badge: "AI Parser",  title: "Chat masuk, order rapi",      desc: "Parse WA jadi draft order otomatis.",           accent: "bg-orange-50 text-orange-500 border-orange-100" },
  { Icon: CheckCircle,   badge: "Validasi",   title: "Owner tetap pegang kendali",  desc: "Konfirmasi manual, anti-salah, anti-kabur.",    accent: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { Icon: ChefHat,       badge: "Dapur",      title: "Dapur siap sebelum subuh",    desc: "Estimasi bahan dari order aktual terkonfirmasi.", accent: "bg-blue-50 text-blue-600 border-blue-100" },
  { Icon: BarChart2,     badge: "Finansial",  title: "Rekap harian tanpa ribet",    desc: "Semua order dan pembayaran dalam satu layar.",  accent: "bg-violet-50 text-violet-600 border-violet-100" },
];

function OverviewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 text-center"
      >
        <span className="text-[11px] font-black text-[#E8541A] uppercase tracking-[0.16em]">Semua Fitur</span>
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black tracking-tight mt-1.5 text-[#1A1A1A]">
          Satu ekosistem, semua terpadu.
        </h2>
        <p className="text-[15px] text-[#6B6B6B] mt-3 max-w-md mx-auto leading-relaxed">
          Dari pesan masuk hingga laporan selesai — Kuali menangani seluruh alur operasional katering kamu.
        </p>
      </motion.div>

      {/* 2×2 bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OVERVIEW_ITEMS.map(({ Icon, badge, title, desc, accent }, i) => (
          <motion.div
            key={badge}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, borderColor: "rgba(232,84,26,0.2)", boxShadow: "0 16px 40px rgba(0,0,0,0.06)" }}
            className="bg-white border border-[#E5E5E3] rounded-3xl p-7 flex flex-col gap-5 cursor-default transition-all"
          >
            <div className="flex items-start justify-between">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border", accent)}>
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <span className={cn("text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border", accent)}>
                {badge}
              </span>
            </div>
            <div>
              <h3 className="font-black text-[16px] text-[#1A1A1A] mb-1.5 tracking-tight">{title}</h3>
              <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA inside overview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.42, duration: 0.5 }}
        className="mt-8 flex items-center justify-center gap-3"
      >
        <Link href="/demo"
          className="bg-[#E8541A] text-white font-bold text-[13px] px-7 py-3.5 rounded-2xl flex items-center gap-2 shadow-xl shadow-orange-200/60 hover:bg-[#d4491a] active:scale-[0.97] transition-all"
        >
          Coba Demo Sekarang <ArrowRight size={14} />
        </Link>
        <Link href="/dashboard"
          className="bg-white text-[#1A1A1A] font-bold text-[13px] px-7 py-3.5 rounded-2xl flex items-center gap-2 border border-[#E5E5E3] shadow-sm hover:bg-[#F4F4F2] active:scale-[0.97] transition-all"
        >
          Dashboard
        </Link>
      </motion.div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats  = [{ value: 11, suffix: "+", label: "Order dikelola/hari" }, { value: 95, suffix: "%", label: "Akurasi AI Parser" }, { value: 12, prefix: "<", suffix: "s", label: "Kecepatan proses" }];
const metrics = [{ val: "Rp 167rb", label: "Volume / hari" }, { val: "< 1.2s", label: "Kecepatan proses" }, { val: "100%", label: "Uptime simulasi" }];

const fadeUp  = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const scaleUp = { hidden: { opacity: 0, scale: 0.95, y: 18 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } } };

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] antialiased">

      {/* Floating bg orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div animate={{ x: [0, 22, 0], y: [0, -18, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-orange-100/80 via-amber-50/40 to-transparent blur-[110px]" />
        <motion.div animate={{ x: [0, -14, 0], y: [0, 20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-amber-50/70 to-transparent blur-[90px]" />
      </div>

      <div className="relative z-10">

        {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
        <motion.nav initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-5"
        >
          <div className="flex items-center gap-2.5">
            <motion.div whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }} transition={{ duration: 0.4 }} className="cursor-pointer select-none">
              <img src="/kuali-logo-mark.svg" alt="Kuali" className="w-10 h-10" />
            </motion.div>
            <span className="font-black text-[28px] tracking-tight">kuali</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur border border-[#E5E5E3] rounded-full px-3.5 py-1.5 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-[#6B6B6B]">Gunadarma Code Week 2.0</span>
            </div>
            <Link href="/demo" className="bg-[#E8541A] text-white text-[13px] font-bold px-5 py-2.5 rounded-full shadow-lg shadow-orange-200/50 hover:bg-[#d4491a] active:scale-[0.97] transition-all">
              Coba Demo
            </Link>
          </div>
        </motion.nav>

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-20 lg:pt-16 lg:pb-28">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center text-center">
            <motion.div variants={fadeUp} className="mb-7">
              <span className="inline-flex items-center gap-2 bg-orange-50 text-[#E8541A] border border-orange-100 rounded-full px-4 py-1.5 text-[12px] font-bold">
                <Zap size={11} strokeWidth={2.5} fill="currentColor" />
                WhatsApp-first · UMKM Kuliner · AI Otomatis
              </span>
            </motion.div>

            <motion.h1 variants={stagger} className="text-[clamp(3.25rem,10.5vw,7.75rem)] font-black tracking-tighter leading-[0.9] mb-7">
              <motion.span variants={fadeUp} className="block">
                Order{" "}
                <span className="text-[#E8541A] relative inline-block">
                  rapi
                  <motion.span className="absolute left-0 -bottom-1 right-0 h-[6px] lg:h-[9px] bg-orange-100 -z-10 rounded-sm"
                    initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.75, duration: 0.45, ease: [0.16, 1, 0.3, 1] }} />
                </span>,
              </motion.span>
              <motion.span variants={fadeUp} className="block">
                produksi{" "}
                <span className="text-[#E8541A] relative inline-block">
                  siap
                  <motion.span className="absolute left-0 -bottom-1 right-0 h-[6px] lg:h-[9px] bg-orange-100 -z-10 rounded-sm"
                    initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.45, ease: [0.16, 1, 0.3, 1] }} />
                </span>.
              </motion.span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[15px] lg:text-[17px] text-[#6B6B6B] max-w-[420px] leading-relaxed mb-8">
              Sistem parsing AI yang mengubah chat WhatsApp pelanggan menjadi alur produksi kuliner yang terstruktur.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap justify-center mb-14">
              <Link href="/demo" className="bg-[#E8541A] text-white font-bold text-[13px] px-7 py-3.5 rounded-2xl flex items-center gap-2 shadow-xl shadow-orange-200/60 hover:bg-[#d4491a] active:scale-[0.97] transition-all">
                Lihat Demo <ArrowRight size={14} />
              </Link>
              <Link href="/dashboard" className="bg-white text-[#1A1A1A] font-bold text-[13px] px-7 py-3.5 rounded-2xl flex items-center gap-2 border border-[#E5E5E3] shadow-sm hover:bg-[#F4F4F2] active:scale-[0.97] transition-all">
                Dashboard
              </Link>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-3 gap-3 w-full max-w-md lg:max-w-lg">
              {stats.map((s, i) => (
                <motion.div key={i} variants={scaleUp} className="bg-white border border-[#E5E5E3] rounded-2xl p-4 lg:p-5 text-center shadow-sm">
                  <div className="text-[clamp(1.5rem,4vw,2.25rem)] font-black tabular-nums text-[#1A1A1A] leading-none mb-1.5">
                    <AnimatedNumber value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] text-[#ADADAD] font-semibold uppercase tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── STICKY SCROLL ──────────────────────────────────────────────────── */}
        <StickyScrollSection />

        {/* ── OVERVIEW (all features at once) ────────────────────────────────── */}
        <OverviewSection />

        {/* ── DARK METRICS BAR ───────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-[#1A1A1A] rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white font-bold text-sm">Server AI Aktif</span>
            </div>
            <div className="flex items-center gap-6 sm:gap-10">
              {metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-white font-black text-sm font-mono">{m.val}</div>
                  <div className="text-[10px] text-white/35 uppercase tracking-wider mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── CTA BANNER ─────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="relative bg-gradient-to-br from-[#E8541A] to-[#F97316] rounded-[32px] p-10 lg:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-1/2 -right-1/4 w-3/4 h-full bg-white/5 rounded-full blur-[70px]" />
              <div className="absolute -bottom-1/2 -left-1/4 w-1/2 h-full bg-black/10 rounded-full blur-[50px]" />
              <div className="absolute inset-0 opacity-[0.07]"
                style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)", backgroundSize: "28px 28px" }} />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-white tracking-tight leading-[1.05]">
                Siap tingkatkan efisiensi<br className="hidden sm:block" /> dapur kamu?
              </h2>
              <p className="text-white/75 text-[14px] lg:text-[15px] max-w-sm">
                Coba simulasi demo Kuali sekarang, tanpa perlu registrasi.
              </p>
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <Link href="/demo" className="bg-white text-[#E8541A] font-black text-[13px] px-8 py-3.5 rounded-2xl flex items-center gap-2 shadow-xl hover:bg-orange-50 active:scale-[0.97] transition-all">
                  Mulai Demo Sekarang <ArrowRight size={14} />
                </Link>
                <Link href="/dashboard" className="bg-white/15 text-white font-bold text-[13px] px-8 py-3.5 rounded-2xl border border-white/25 hover:bg-white/25 active:scale-[0.97] transition-all backdrop-blur-sm">
                  Masuk Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
        <footer className="max-w-6xl mx-auto px-5 sm:px-8 pb-10 pt-8 flex items-center justify-between border-t border-[#E5E5E3]">
          <div className="flex items-center gap-2">
            <img src="/kuali-logo-mark.svg" alt="Kuali" className="w-6 h-6 opacity-80" />
            <span className="text-[12px] font-bold text-[#6B6B6B]">kuali</span>
          </div>
          <span className="text-[11px] text-[#ADADAD] hidden sm:block">Gunadarma Code Week 2.0 · MVP Prototype</span>
          <Link href="/about" className="text-[12px] text-[#6B6B6B] font-bold hover:text-[#E8541A] transition-colors flex items-center gap-1">
            Tentang <ArrowUpRight size={11} />
          </Link>
        </footer>

      </div>
    </div>
  );
}
