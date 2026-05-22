"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, ClipboardList, ChefHat, BarChart2,
  ArrowRight, Home, CheckCircle, RotateCcw, Sparkles,
  LayoutDashboard, TrendingUp, Zap, CreditCard, AlertTriangle,
} from "lucide-react";
import { Shell } from "@/components/kuali/AppShell";
import { MockWhatsappChat } from "@/components/kuali/MockWhatsappChat";
import { ParsedOrderCard } from "@/components/kuali/ParsedOrderCard";
import { ProductionPlanCard } from "@/components/kuali/ProductionPlanCard";
import { ImpactDashboard } from "@/components/kuali/ImpactDashboard";
import { RoadmapCard } from "@/components/kuali/RoadmapCard";
import { DemoNavigation } from "@/components/kuali/DemoNavigation";
import { PaymentReminderCard } from "@/components/kuali/PaymentReminderCard";
import type { ParsedOrder } from "@/lib/dummy-data";
import { dashboardMetrics, productionPlan } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────
type DemoStep = "intro" | "parse" | "qris" | "production" | "impact" | "roadmap" | "done";
const STEP_ORDER: DemoStep[] = ["intro", "parse", "qris", "production", "impact", "roadmap", "done"];
const FLOW_STEPS = [
  { id: "parse" as const,      label: "Chat",       Icon: MessageCircle },
  { id: "qris" as const,       label: "Pembayaran", Icon: CreditCard },
  { id: "production" as const, label: "Dapur",      Icon: ChefHat },
  { id: "impact" as const,     label: "Rekap",      Icon: BarChart2 },
];

const NAV_PAGES = [
  { label: "Dashboard",  href: "/dashboard",  Icon: LayoutDashboard },
  { label: "Pesanan",    href: "/orders",     Icon: ClipboardList },
  { label: "Produksi",   href: "/production", Icon: ChefHat },
  { label: "Rekap",      href: "/summary",    Icon: BarChart2 },
];

// ── Animations ───────────────────────────────────────────────────────────────
const stepIn = {
  hidden:  { opacity: 0, y: 18, scale: 0.985 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -10, scale: 0.99, transition: { duration: 0.22 } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
};
const staggerItem = {
  hidden:  { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
};

// ── Stepper ──────────────────────────────────────────────────────────────────
function Stepper({ step, hasParsed }: { step: DemoStep; hasParsed: boolean }) {
  // Tentukan index progres aktif dasar
  let currentIdx = FLOW_STEPS.findIndex(s => s.id === step);
  
  // When parse is done (order extracted) highlight "Pembayaran" as the next target
  if (step === "parse" && hasParsed) currentIdx = 1;

  return (
    <div className="mb-6 flex-shrink-0">
      {/* Circles + connectors */}
      <div className="flex items-center max-w-xl mx-auto px-4">
        {FLOW_STEPS.map((s, i) => {
          const done   = currentIdx > i;
          const active = currentIdx === i;
          const isLast = i === FLOW_STEPS.length - 1;
          return (
            <Fragment key={s.id}>
              <motion.div
                animate={{
                  backgroundColor: done || active ? "#f97316" : "rgba(0,0,0,0.04)",
                  borderColor:     done || active ? "#f97316" : "rgba(0,0,0,0.10)",
                  color:           done || active ? "#fff"    : "#ADADAD",
                  scale:           active ? 1.12 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-10 h-10 rounded-xl border-2 flex items-center justify-center flex-shrink-0 shadow-sm"
              >
                {done
                  ? <CheckCircle size={16} strokeWidth={2.5} />
                  : <s.Icon size={16} strokeWidth={active ? 2.5 : 1.8} />}
              </motion.div>
              {!isLast && (
                <div className="flex-1 h-[2px] mx-3 bg-black/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-orange-500 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: done || (i === 0 && currentIdx >= 1) ? 1 : 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
      {/* Labels */}
      <div className="flex mt-3 max-w-xl mx-auto px-2">
        {FLOW_STEPS.map((s, i) => {
          const done   = currentIdx > i;
          const active = currentIdx === i;
          const isLast = i === FLOW_STEPS.length - 1;
          return (
            <Fragment key={s.id}>
              <span className={cn(
                "w-10 text-[11px] font-black uppercase tracking-wider text-center leading-none transition-colors duration-300",
                done || active ? "text-orange-500" : "text-[#A3A3A3]"
              )}>
                {s.label}
              </span>
              {!isLast && <div className="flex-1 mx-3" />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ── GlassCard ────────────────────────────────────────────────────────────────
function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ borderColor: "rgba(249,115,22,0.28)", boxShadow: "0 0 28px rgba(249,115,22,0.09)" }}
      transition={{ duration: 0.25 }}
      className={cn(
        "bg-white rounded-2xl border border-[#E8E8E6] p-6 flex flex-col min-h-0 overflow-hidden shadow-sm",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// ── StepHeader ───────────────────────────────────────────────────────────────
function StepHeader({
  number, title, desc, accent = "orange",
}: {
  number: number | React.ReactNode; title: string; desc: string; accent?: "orange" | "violet";
}) {
  return (
    <div className="flex items-start gap-3.5 mb-5 flex-shrink-0">
      <div className={cn(
        "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-black text-[13px] shadow-sm",
        accent === "violet" ? "bg-purple-500" : "bg-orange-500"
      )}>
        {number}
      </div>
      <div>
        <h3 className="font-black text-[16px] text-[#1A1A1A] tracking-tight leading-tight">{title}</h3>
        <p className="text-[13px] font-medium text-[#6B6B6B] leading-relaxed mt-1">{desc}</p>
      </div>
    </div>
  );
}

// ── Buttons ──────────────────────────────────────────────────────────────────
function PrimaryBtn({
  onClick, children, disabled,
}: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02, boxShadow: "0 10px 25px rgba(249,115,22,0.25)" } : {}}
      whileTap={!disabled  ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "w-full bg-orange-500 text-white font-bold text-[14px] py-4 px-6 rounded-2xl flex items-center justify-center gap-2 flex-shrink-0 transition-colors shadow-sm",
        disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-orange-600"
      )}
    >
      {children}
    </motion.button>
  );
}

function GhostBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="w-full bg-white text-[#1A1A1A] font-bold text-[14px] py-4 px-6 rounded-2xl flex items-center justify-center gap-2 border border-[#E5E5E3] hover:bg-[#FAFAF8] transition-colors flex-shrink-0 shadow-sm"
    >
      {children}
    </motion.button>
  );
}

// ── Compact nav grid (intro / done) ──────────────────────────────────────────
function CompactNav() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {NAV_PAGES.map(({ label, href, Icon }) => (
        <Link key={href} href={href}>
          <motion.div
            whileHover={{ scale: 1.025, borderColor: "rgba(249,115,22,0.3)" }}
            whileTap={{ scale: 0.975 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#FAFAF8] rounded-xl border border-[#F0F0EE] cursor-pointer group"
          >
            <Icon size={14} className="text-orange-500 shrink-0" />
            <span className="text-[13px] font-bold text-[#1A1A1A] leading-tight transition-colors group-hover:text-orange-500">{label}</span>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}

// ── Floating idle animation ───────────────────────────────────────────────────
const floatAnim = {
  animate: { y: [0, -6, 0] },
  transition: { repeat: Infinity, duration: 2.8, ease: "easeInOut" },
};

// ── Main Page ────────────────────────────────────────────────────────────────
export default function DemoPage() {
  const [step, setStep]           = useState<DemoStep>("intro");
  const [parsedOrder, setParsedOrder] = useState<ParsedOrder | null>(null);

  function advance(to?: DemoStep) {
    if (to) { setStep(to); return; }
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) setStep(STEP_ORDER[idx + 1]);
  }
  function reset() { setStep("intro"); setParsedOrder(null); }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  const introContent = (
    <motion.div key="intro" variants={stepIn} initial="hidden" animate="visible" exit="exit"
      className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-4 h-full w-full min-h-0"
    >
      {/* LEFT: Hero */}
      <GlassCard className="relative overflow-hidden justify-between">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 opacity-70 pointer-events-none blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-orange-50 opacity-50 pointer-events-none blur-xl" />

        <div className="relative z-10 flex flex-col h-full justify-between gap-5">
          {/* Logo + badge */}
          <div className="flex items-center justify-between">
            <motion.img
              src="/kuali-logo-mark.svg" alt="Kuali" className="w-11 h-11"
              whileHover={{ rotate: [-4, 4, -2, 0], scale: 1.12 }}
              transition={{ duration: 0.5 }}
            />
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="bg-orange-50 text-orange-600 border border-orange-100 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full"
            >
              Demo Interaktif
            </motion.span>
          </div>

          {/* Heading */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.25rem] font-black text-[#1A1A1A] tracking-tight leading-tight mb-3"
            >
              Lihat kuali<br/>
              <span className="text-orange-500">bekerja nyata.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.45 }}
              className="text-[14px] font-medium text-[#555555] leading-relaxed max-w-sm"
            >
              Simulasikan alur inti — dari pesan WhatsApp pelanggan hingga laporan rekap harian — dalam 3 menit.
            </motion.p>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { Icon: MessageCircle, val: "24+",    label: "Pesan diproses" },
              { Icon: TrendingUp,    val: "Rp3.2jt",label: "Omzet dikelola" },
              { Icon: Zap,           val: "~2dtk",  label: "Waktu ekstraksi" },
            ].map(({ Icon, val, label }) => (
              <div key={label} className="bg-[#FAFAF8] rounded-xl p-3.5 border border-[#EFEFED]">
                <Icon size={14} className="text-orange-500 mb-2" />
                <div className="text-[16px] font-black text-[#1A1A1A] leading-none">{val}</div>
                <div className="text-[11px] font-bold text-[#888888] mt-1.5 leading-tight">{label}</div>
              </div>
            ))}
          </motion.div>
          <p className="text-[10px] text-[#CECECE] font-semibold text-center">· Data simulasi demo — bukan data nyata ·</p>
        </div>
      </GlassCard>

      {/* RIGHT: Steps + CTA */}
      <div className="flex flex-col gap-3 min-h-0 overflow-hidden">
        {/* Workflow steps */}
        <GlassCard className="flex-1 min-h-0">
          <p className="text-[11px] font-black text-[#A3A3A3] uppercase tracking-wider mb-3 flex-shrink-0">
            Alur Kerja · 4 Modul
          </p>
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-2.5">
            {[
              { n: "01", Icon: MessageCircle, title: "Chat Masuk",      desc: "AI baca & ekstrak pesan WA",    color: "bg-orange-50 text-orange-500 border-orange-100" },
              { n: "02", Icon: ClipboardList, title: "Konfirmasi Order", desc: "Pemilik verifikasi & setujui",  color: "bg-green-50 text-green-600 border-green-100" },
              { n: "03", Icon: ChefHat,       title: "Dapur Siap",      desc: "Kalkulasi bahan otomatis",      color: "bg-blue-50 text-blue-500 border-blue-100" },
              { n: "04", Icon: BarChart2,     title: "Rekap Harian",    desc: "Laporan & analisis instan",     color: "bg-purple-50 text-purple-600 border-purple-100" },
            ].map(({ n, Icon, title, desc, color }) => (
              <motion.div key={n} variants={staggerItem}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-[#FAFAF8] border border-[#F0F0EE] hover:border-orange-200 hover:bg-orange-50/25 transition-all group cursor-default"
              >
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border", color)}>
                  <Icon size={16} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-[#1A1A1A]">{title}</div>
                  <div className="text-[11px] font-medium text-[#6B6B6B] mt-0.5">{desc}</div>
                </div>
                <span className="text-[11px] font-black text-[#CECECE] group-hover:text-orange-500 transition-colors">{n}</span>
              </motion.div>
            ))}
          </motion.div>
        </GlassCard>

        {/* CTA */}
        <PrimaryBtn onClick={() => advance("parse")}>
          Mulai Simulasi <ArrowRight size={15} />
        </PrimaryBtn>

        {/* Compact nav */}
        <div>
          <p className="text-[10px] text-[#A3A3A3] font-black uppercase tracking-wider mb-2 text-center">
            atau lompat ke modul
          </p>
          <CompactNav />
        </div>
      </div>
    </motion.div>
  );

  // ── PARSE & AUTOCONFIRM ALUR BARU ──────────────────────────────────────────
  const parseContent = (
    <motion.div key="parse" variants={stepIn} initial="hidden" animate="visible" exit="exit"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full w-full min-h-0"
    >
      {/* Kiri: WhatsApp Chat */}
      <GlassCard>
        <StepHeader number={1} title="1. Pilih Chat Masuk"
          desc="Pilih contoh pesan pelanggan di bawah, lalu tekan tombol 'Parse dengan AI' untuk mengekstrak data otomatis." />
        <div className="flex-1 overflow-y-auto min-h-0">
          <MockWhatsappChat
            onParsed={(data) => setParsedOrder(data)}
            onChatChange={() => setParsedOrder(null)}
          />
        </div>
      </GlassCard>

      {/* Kanan: Hasil Draft / Konfirmasi Langsung */}
      <div className="flex flex-col gap-3 min-h-0">
        <GlassCard className={cn("flex-1", !parsedOrder && "items-center justify-center border-2 border-dashed border-[#F0F0EE]")}>
          {parsedOrder ? (
            <div className="flex flex-col h-full min-h-0">
              <StepHeader number={2} title="2. Konfirmasi Draft Order"
                desc="Hasil ekstraksi AI tersaji sebagai draft. Periksa & verifikasi data, lalu klik Konfirmasi — AI hanya membuat draft, keputusan ada di Bu Rani." />

              {/* Low-confidence callout */}
              {parsedOrder.confidenceScore < 70 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 flex gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3 flex-shrink-0"
                >
                  <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] font-black text-red-700 mb-0.5">Confidence rendah ({parsedOrder.confidenceScore}%)</p>
                    <p className="text-[11px] text-red-500 font-medium leading-relaxed">
                      Ini contoh kasus yang <em className="not-italic font-bold">butuh review manual</em>. Tombol konfirmasi dinonaktifkan. Pilih chat lain (Dinda/Mas Budi/Kak Rina) untuk melanjutkan demo penuh.
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="flex-1 overflow-y-auto min-h-0">
                <ParsedOrderCard
                  order={parsedOrder}
                  onApprove={async () => {
                    fetch("/api/orders", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(parsedOrder),
                    }).catch(() => null);
                    setTimeout(() => advance("qris"), 400);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="text-center px-4">
              <motion.div {...floatAnim}
                className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mx-auto mb-4"
              >
                <Sparkles size={24} />
              </motion.div>
              <p className="text-[14px] font-bold text-[#1A1A1A] mb-1.5">Belum ada draft</p>
              <p className="text-[13px] text-[#6B6B6B] font-medium leading-relaxed">
                Tekan tombol <strong className="text-orange-500 font-bold">Parse dengan AI</strong> di sebelah kiri untuk membaca pesan dan menyusun draft order.
              </p>
            </div>
          )}
        </GlassCard>
      </div>
    </motion.div>
  );

  // ── QRIS / PAYMENT REMINDER ───────────────────────────────────────────────
  const qrisAmount = parsedOrder?.items.reduce((s, i) => s + i.subtotal, 0) ?? 42000;
  const qrisItems  = parsedOrder?.items.map((i) => `${i.qty}x ${i.menu}`).join(", ") ?? "12x Risol Mayo";
  const qrisCustomer = parsedOrder?.customerName ?? "Dinda Ayu";

  const qrisContent = (
    <motion.div key="qris" variants={stepIn} initial="hidden" animate="visible" exit="exit"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full w-full min-h-0"
    >
      {/* Left: Payment reminder card */}
      <GlassCard>
        <StepHeader number={<CreditCard size={13} />} title="QRIS Dummy & Reminder Pembayaran"
          desc="Setelah order dikonfirmasi, Kuali menyiapkan draft pesan reminder dan QRIS dummy — bukan pembayaran nyata — untuk diforward ke pelanggan." />
        <div className="flex-1 overflow-y-auto min-h-0">
          <PaymentReminderCard
            customerName={qrisCustomer}
            amount={qrisAmount}
            orderNumber="KL-20260522-001"
            items={qrisItems}
          />
        </div>
      </GlassCard>

      {/* Right: Context + next */}
      <div className="flex flex-col gap-3 min-h-0">
        <GlassCard className="flex-1 bg-amber-50/30 border-amber-100">
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto mb-4"
          >
            <CreditCard size={26} />
          </motion.div>
          <p className="text-[15px] font-bold text-[#1A1A1A] text-center mb-2">Tagih lebih mudah</p>
          <p className="text-[13px] text-[#6B6B6B] font-medium text-center max-w-[240px] leading-relaxed mx-auto">
            Salin pesan + QRIS dummy, lalu paste ke chat WhatsApp pelanggan. Tidak ada API WhatsApp nyata yang digunakan.
          </p>

          {/* Feature callout grid */}
          <div className="mt-5 grid grid-cols-1 gap-2 w-full">
            {[
              { icon: "✅", text: "Draft pesan reminder otomatis" },
              { icon: "📋", text: "Satu klik salin ke clipboard" },
              { icon: "🔒", text: "QR dummy — tidak ada pembayaran nyata" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl border border-amber-100">
                <span className="text-base leading-none">{icon}</span>
                <span className="text-[12px] font-semibold text-[#555555]">{text}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <PrimaryBtn onClick={() => advance("production")}>
          Lanjut ke Rencana Dapur <ArrowRight size={15} />
        </PrimaryBtn>
      </div>
    </motion.div>
  );

  // ── PRODUCTION ────────────────────────────────────────────────────────────
  const productionContent = (
    <motion.div key="production" variants={stepIn} initial="hidden" animate="visible" exit="exit"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full w-full min-h-0"
    >
      <GlassCard>
        <StepHeader number={3} title="Rencana Kebutuhan Dapur"
          desc="Pesanan dikonfirmasi dikonversi otomatis menjadi daftar bahan mentah dan estimasi jumlahnya." />
        <div className="flex-1 overflow-y-auto min-h-0">
          <ProductionPlanCard />
        </div>
      </GlassCard>

      <div className="flex flex-col gap-3 min-h-0">
        <GlassCard className="flex-1 flex-col gap-4">
          {/* Confirmed order badge */}
          {parsedOrder && (
            <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5 flex-shrink-0">
              <CheckCircle size={14} className="text-green-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-[12px] font-black text-green-700 leading-none">Order dikonfirmasi</p>
                <p className="text-[11px] text-green-600 font-medium mt-0.5 truncate">
                  {parsedOrder.customerName} — {parsedOrder.items.map(i => `${i.qty}× ${i.menu}`).join(", ")}
                </p>
              </div>
            </div>
          )}

          {/* Ingredient status summary */}
          <div className="flex-shrink-0">
            <p className="text-[11px] font-black text-[#A3A3A3] uppercase tracking-wider mb-2.5">Status Bahan Baku</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Cukup",        count: productionPlan.filter(i => i.status === "sufficient").length,   color: "text-green-600",  bg: "bg-green-50",  border: "border-green-200" },
                { label: "Hampir Habis", count: productionPlan.filter(i => i.status === "low").length,          color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200" },
                { label: "Perlu Beli",   count: productionPlan.filter(i => i.status === "insufficient").length, color: "text-red-600",    bg: "bg-red-50",    border: "border-red-200"   },
              ].map(({ label, count, color, bg, border }) => (
                <div key={label} className={`${bg} border ${border} rounded-xl p-2.5 text-center`}>
                  <div className={`text-[20px] font-black ${color} leading-none`}>{count}</div>
                  <div className="text-[10px] font-bold text-[#6B6B6B] mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Context note */}
          <p className="text-[12px] text-[#6B6B6B] font-medium leading-relaxed flex-1">
            Kuali menghitung kebutuhan bahan dari resep dan stok aktual — sehingga Bu Rani tahu persis apa yang harus disiapkan sebelum mulai masak.
          </p>
        </GlassCard>
        <PrimaryBtn onClick={() => advance("impact")}>
          Buka Laporan Rekap <ArrowRight size={15} />
        </PrimaryBtn>
      </div>
    </motion.div>
  );

  // ── IMPACT ────────────────────────────────────────────────────────────────
  const impactContent = (
    <motion.div key="impact" variants={stepIn} initial="hidden" animate="visible" exit="exit"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full w-full min-h-0"
    >
      <GlassCard>
        <StepHeader number={4} title="Rekap Harian & Dampak Operasional"
          desc="Pantau total pesanan, piutang, dan efisiensi parsing AI dalam satu laporan harian." />

        {/* Daily summary strip */}
        <div className="grid grid-cols-4 gap-2 mb-4 flex-shrink-0">
          {[
            { val: dashboardMetrics.totalOrdersToday, label: "Order Masuk",   color: "text-blue-600",  bg: "bg-blue-50" },
            { val: dashboardMetrics.confirmed,         label: "Dikonfirmasi", color: "text-green-600", bg: "bg-green-50" },
            { val: dashboardMetrics.needsReview,       label: "Perlu Cek",    color: "text-red-500",   bg: "bg-red-50" },
            { val: formatRupiah(dashboardMetrics.unpaidAmount), label: "Belum Bayar", color: "text-amber-700", bg: "bg-amber-50" },
          ].map(({ val, label, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-2.5 text-center`}>
              <div className={`text-[16px] font-black ${color} leading-none mb-0.5`}>{val}</div>
              <div className="text-[10px] font-bold text-[#6B6B6B] leading-tight">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          <ImpactDashboard />
        </div>
      </GlassCard>

      <div className="flex flex-col gap-3 min-h-0 justify-end">
        <GlassCard className="flex-1 items-center justify-center bg-[#FAFAF8]">
          <motion.div {...floatAnim}
            className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-500 mx-auto mb-4"
          >
            <BarChart2 size={26} />
          </motion.div>
          <p className="text-[15px] font-bold text-[#1A1A1A] text-center mb-2">Alur hampir selesai</p>
          <p className="text-[13px] text-[#6B6B6B] font-medium text-center max-w-[220px] leading-relaxed">
            Selesaikan demo 3 menit di sini, atau lihat roadmap sebagai referensi opsional.
          </p>
        </GlassCard>
        <GhostBtn onClick={() => advance("roadmap")}>
          Lihat Roadmap (Opsional) <ArrowRight size={15} />
        </GhostBtn>
        <PrimaryBtn onClick={() => advance("done")}>
          Selesaikan Demo <CheckCircle size={15} />
        </PrimaryBtn>
      </div>
    </motion.div>
  );

  // ── ROADMAP ───────────────────────────────────────────────────────────────
  const roadmapContent = (
    <motion.div key="roadmap" variants={stepIn} initial="hidden" animate="visible" exit="exit"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full w-full min-h-0"
    >
      <GlassCard>
        <StepHeader number={<Sparkles size={13} />} title="Roadmap Pengembangan Kuali"
          desc="Fitur-fitur ini belum tersedia di MVP. Ditampilkan sebagai referensi arah pengembangan — bukan bagian dari demo utama."
          accent="violet" />
        <div className="flex-1 overflow-y-auto min-h-0">
          <RoadmapCard />
        </div>
      </GlassCard>

      <div className="flex flex-col gap-3 justify-end">
        <GlassCard className="flex-1 items-center justify-center bg-purple-50/30 border-purple-100">
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, 4, -4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-500 mx-auto mb-4"
          >
            <Sparkles size={26} />
          </motion.div>
          <p className="text-[15px] font-bold text-[#1A1A1A] text-center mb-2">Coming soon</p>
          <p className="text-[13px] text-[#6B6B6B] font-medium text-center max-w-[220px] leading-relaxed">
            Fitur-fitur ini belum tersedia di demo MVP. Modul ini hanya untuk referensi juri.
          </p>
        </GlassCard>
        <PrimaryBtn onClick={() => advance("done")}>
          Selesaikan Demo <CheckCircle size={15} />
        </PrimaryBtn>
      </div>
    </motion.div>
  );

  // ── DONE ──────────────────────────────────────────────────────────────────
  const doneContent = (
    <motion.div key="done" variants={stepIn} initial="hidden" animate="visible" exit="exit"
      className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-4 h-full w-full min-h-0"
    >
      <GlassCard className="items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 via-white to-orange-50/30 pointer-events-none" />
        <div className="relative z-10 text-center flex flex-col items-center gap-5">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center text-green-600"
          >
            <CheckCircle size={32} strokeWidth={2} />
          </motion.div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-[1.85rem] font-black text-[#1A1A1A] tracking-tight mb-2"
            >
              Simulasi Selesai!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-[14px] text-[#555555] font-medium leading-relaxed max-w-sm mx-auto"
            >
              Anda telah melihat alur operasional harian Kuali — dari pesan WhatsApp tak terstruktur hingga laporan harian siap pakai.
            </motion.p>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            onClick={reset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 bg-white border border-[#E5E5E3] text-[#1A1A1A] font-bold text-[13px] px-5 py-3 rounded-full hover:bg-[#FAFAF8] transition-colors shadow-sm"
          >
            <RotateCcw size={14} /> Jalankan ulang alur
          </motion.button>
        </div>
      </GlassCard>

      <div className="flex flex-col gap-3 min-h-0 overflow-y-auto">
        <p className="text-[11px] text-[#A3A3A3] font-black uppercase tracking-wider text-center flex-shrink-0">
          Jelajahi dasbor mandiri
        </p>
        <DemoNavigation />
      </div>
    </motion.div>
  );

  const contentMap: Record<DemoStep, React.ReactNode> = {
    intro:      introContent,
    parse:      parseContent,
    qris:       qrisContent,
    production: productionContent,
    impact:     impactContent,
    roadmap:    roadmapContent,
    done:       doneContent,
  };

  const desktopContent = (
    <div className="h-full flex flex-col min-h-0 max-w-6xl mx-auto w-full px-2">
      <Stepper step={step} hasParsed={!!parsedOrder} />
      <div className="flex-1 min-h-0 flex items-stretch w-full">
        <AnimatePresence mode="wait">
          {contentMap[step]}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <Shell
      title="Demo Simulasi"
      subtitle="Alur kerja end-to-end"
      headerRight={
        <Link href="/"
          className="flex items-center gap-1.5 text-[13px] text-[#6B6B6B] hover:text-orange-500 font-bold transition-colors"
        >
          <Home size={14} /> Kembali ke Beranda
        </Link>
      }
      mobileHeaderRight={
        <Link href="/" className="flex items-center gap-1 text-[12px] text-orange-500 font-black">
          <Home size={13} /> Beranda
        </Link>
      }
      noBottomNav
      desktopContent={desktopContent}
    >
      {/* Mobile */}
      <div className="px-4 py-4 flex flex-col min-h-0 overflow-y-auto gap-4">
        <Stepper step={step} hasParsed={!!parsedOrder} />
        <AnimatePresence mode="wait">
          {contentMap[step]}
        </AnimatePresence>
      </div>
    </Shell>
  );
}