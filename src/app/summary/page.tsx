"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight, AlertTriangle, ChevronRight,
  BarChart2, CheckCircle2, Clock, CreditCard, Layers3,
} from "lucide-react";
import { Shell } from "@/components/kuali/AppShell";
import { BigMetric } from "@/components/kuali/MetricCard";
import { ImpactDashboard } from "@/components/kuali/ImpactDashboard";
import { RoadmapCard } from "@/components/kuali/RoadmapCard";
import { PaymentReminderCard } from "@/components/kuali/PaymentReminderCard";
import { formatRupiah } from "@/lib/format";
import { dailySummary, orders as dummyOrders, dashboardMetrics } from "@/lib/dummy-data";
import { NARRATIVE_SAFE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LiveMetrics {
  totalOrdersToday: number;
  confirmed: number;
  draftPending: number;
  needsReview: number;
  unpaidOrders: number;
  unpaidAmount: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
}

const DUMMY_METRICS: LiveMetrics = {
  totalOrdersToday: dashboardMetrics.totalOrdersToday,
  confirmed: dashboardMetrics.confirmed,
  draftPending: dashboardMetrics.draftPending,
  needsReview: dashboardMetrics.needsReview,
  unpaidOrders: dashboardMetrics.unpaidOrders,
  unpaidAmount: dashboardMetrics.unpaidAmount,
};

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 28 } },
};

// ── Label ─────────────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-2.5">
      {children}
    </p>
  );
}

// ── Sparkline stat card ───────────────────────────────────────────────────────
function StatCard({
  id, label, val, sublabel, badge, bgIcon, icon: Icon, path, color,
  hoveredCard, onHoverStart, onHoverEnd, onClick,
}: {
  id: string; label: string; val: number; sublabel: string; badge?: string | null;
  bgIcon: string; icon: React.ElementType; path: string; color: string;
  hoveredCard: string | null; onHoverStart: () => void; onHoverEnd: () => void;
  onClick: () => void;
}) {
  const dimmed = hoveredCard !== null && hoveredCard !== id;

  return (
    <motion.button
      variants={itemVariants}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl border border-[#E8E8E6] p-5 text-left flex flex-col justify-between min-h-[160px] shadow-sm transition-opacity relative overflow-hidden w-full select-none",
        dimmed ? "opacity-40" : "opacity-100"
      )}
    >
      <div className="flex justify-between items-start w-full">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shadow-sm shrink-0", bgIcon)}>
          <Icon size={16} strokeWidth={2.2} />
        </div>
        {badge && (
          <span className={cn(
            "text-[10px] font-black px-2 py-0.5 rounded-md border",
            id === "review"
              ? "text-[#DC2626] bg-[#FEF2F2] border-[#FCA5A5]"
              : "text-[#16A34A] bg-[#F0FDF4] border-[#BBF7D0]"
          )}>
            {badge}
          </span>
        )}
      </div>

      {/* Sparkline */}
      <div className="w-full h-8 my-2">
        <svg width="100%" height="100%" viewBox="0 0 140 36" preserveAspectRatio="none">
          <path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <div className="text-[28px] font-black text-[#1A1A1A] leading-none tracking-tight mb-1">
          {val}
        </div>
        <div className="text-[13px] font-bold text-[#1A1A1A] tracking-tight mb-0.5">{label}</div>
        <div className="text-[11px] text-[#ADADAD] font-semibold leading-none">{sublabel}</div>
      </div>
    </motion.button>
  );
}

export default function SummaryPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<LiveMetrics>(DUMMY_METRICS);
  const [narrative, setNarrative] = useState<string>(dailySummary.narrative);
  const [unpaidOrder, setUnpaidOrder] = useState<RecentOrder | null>(
    dummyOrders.find((o) => o.paymentStatus === "unpaid" && o.totalAmount > 0) as RecentOrder | null
  );

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || data.metrics.totalOrdersToday === 0) return;
        setMetrics(data.metrics);
        const firstUnpaid = (data.recentOrders as RecentOrder[]).find(
          (o) => o.paymentStatus === "unpaid" && o.status === "confirmed"
        );
        if (firstUnpaid) setUnpaidOrder(firstUnpaid);
        const m = data.metrics as LiveMetrics;
        setNarrative(
          `Hari ini ${m.totalOrdersToday} pesanan masuk. ${m.confirmed} sudah dikonfirmasi. ` +
          `${m.unpaidOrders} belum bayar — total ${m.unpaidAmount > 0 ? "Rp " + m.unpaidAmount.toLocaleString("id-ID") : "Rp 0"}. ` +
          (m.needsReview > 0 ? `${m.needsReview} pesanan perlu dicek ulang oleh Bu Rani.` : "Semua pesanan sudah diproses.")
        );
      })
      .catch(() => null);
  }, []);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const statCardsData = [
    {
      id: "total", icon: BarChart2, label: "Total Order",
      val: metrics.totalOrdersToday,
      sublabel: "Pesanan masuk harian", badge: "Aktivitas",
      bgIcon: "bg-[#EFF6FF] text-[#2563EB]", color: "#2563EB",
      path: "M0 24 L20 16 L40 22 L60 10 L80 14 L100 6 L120 12 L140 4",
      filter: "",
    },
    {
      id: "confirmed", icon: CheckCircle2, label: "Dikonfirmasi",
      val: metrics.confirmed,
      sublabel: "Siap diproduksi harian", badge: "Stabil",
      bgIcon: "bg-[#F0FDF4] text-[#16A34A]", color: "#16A34A",
      path: "M0 28 L20 25 L40 26 L60 18 L80 20 L100 12 L120 14 L140 8",
      filter: "confirmed",
    },
    {
      id: "draft", icon: Clock, label: "Draft / Pending",
      val: metrics.draftPending,
      sublabel: "Menunggu review berkas", badge: null,
      bgIcon: "bg-[#FFFBEB] text-[#D97706]", color: "#D97706",
      path: "M0 20 L20 22 L40 18 L60 25 L80 22 L100 28 L120 24 L140 26",
      filter: "draft",
    },
    {
      id: "review", icon: AlertTriangle, label: "Perlu Dicek",
      val: metrics.needsReview,
      sublabel: "AI butuh review owner",
      badge: metrics.needsReview > 0 ? "Tinjau" : null,
      bgIcon: "bg-[#FEF2F2] text-[#DC2626]", color: "#DC2626",
      path: "M0 32 L20 31 L40 32 L60 29 L80 30 L100 27 L120 28 L140 26",
      filter: "needs_check",
    },
  ];

  // ── Desktop ───────────────────────────────────────────────────────────────
  const desktopContent = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5"
    >
      {/* Banner header */}
      <motion.div
        variants={itemVariants}
        className="bg-white border border-[#E8E8E6] rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm"
      >
        <div>
          <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-0.5">
            Ringkasan Riwayat
          </p>
          <h2 className="text-[16px] font-black text-[#1A1A1A] tracking-tight capitalize">
            Rekap Operasional · {today}
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] font-black text-orange-500 bg-orange-50 border border-orange-100 px-4 py-2 rounded-full">
          <Layers3 size={12} /> Data Terkonsolidasi
        </div>
      </motion.div>

      {/* 4 sparkline stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {statCardsData.map((s) => (
          <StatCard
            key={s.id}
            {...s}
            hoveredCard={hoveredCard}
            onHoverStart={() => setHoveredCard(s.id)}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={() => router.push(`/orders${s.filter ? `?filter=${s.filter}` : ""}`)}
          />
        ))}
      </div>

      {/* Unpaid + Narrative */}
      <div className="grid grid-cols-2 gap-4">
        {/* Unpaid */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-2xl border border-amber-200 p-5 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
              <CreditCard size={13} className="text-white" />
            </div>
            <span className="text-[11px] font-black text-[#B45309] uppercase tracking-wider">
              Piutang Belum Dibayar
            </span>
          </div>
          <p className="text-[28px] font-black text-[#1A1A1A] leading-none tracking-tight mb-1">
            {formatRupiah(metrics.unpaidAmount)}
          </p>
          <p className="text-[13px] text-[#92400E] font-semibold">
            Dari <strong className="font-black text-[#1A1A1A]">{metrics.unpaidOrders} order</strong> dikonfirmasi
          </p>
          <button
            onClick={() => router.push("/orders?filter=unpaid")}
            className="mt-4 flex items-center gap-1.5 text-[12px] font-black text-[#B45309] hover:text-[#78350f] transition-colors"
          >
            Lihat detail <ChevronRight size={13} />
          </button>
        </motion.div>

        {/* Narrative */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-[#E8E8E6] p-5 shadow-sm">
          <Label>Catatan Hari Ini</Label>
          <p className="text-[13px] text-[#555555] font-medium leading-relaxed">
            {narrative}
          </p>
          <p className="text-[10px] text-[#ADADAD] font-semibold mt-3 pt-3 border-t border-[#F4F4F2] leading-relaxed">
            {NARRATIVE_SAFE.impactNote}
          </p>
        </motion.div>
      </div>

      {/* Needs-check alert */}
      {metrics.needsReview > 0 && (
        <motion.div variants={itemVariants}>
          <button
            onClick={() => router.push("/orders?filter=needs_check")}
            className="w-full bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 hover:bg-red-100 transition-colors text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0 border border-red-200">
              <AlertTriangle size={16} className="text-red-600" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-black text-red-700">
                {metrics.needsReview} pesanan perlu dicek ulang
              </p>
              <p className="text-[11px] text-red-500 font-medium mt-0.5">
                Confidence AI rendah — perlu verifikasi Bu Rani
              </p>
            </div>
            <ChevronRight size={15} className="text-red-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </motion.div>
      )}

      {/* Payment reminder + Impact */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <Label>Contoh Reminder Pembayaran</Label>
          {unpaidOrder && (
            <PaymentReminderCard
              customerName={unpaidOrder.customerName}
              amount={unpaidOrder.totalAmount}
              orderNumber={unpaidOrder.orderNumber}
              items={unpaidOrder.orderNumber}
            />
          )}
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <Label>Dashboard Dampak</Label>
          <ImpactDashboard />
        </motion.div>
      </div>

      {/* Roadmap */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2.5 mb-2.5">
          <p className="text-[11px] font-black text-[#A3A3A3] uppercase tracking-wider">Roadmap Pengembangan</p>
          <span className="text-[10px] font-black text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">Belum tersedia di MVP</span>
        </div>
        <RoadmapCard />
      </motion.div>

      {/* Actions */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between border-t border-[#F4F4F2] pt-4"
      >
        <div className="flex items-center gap-2 text-[12px] text-[#ADADAD] font-semibold">
          <Layers3 size={12} className="text-orange-400" />
          Data simulasi demo · bukan data produksi nyata
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/production")}
            className="bg-white text-[#1A1A1A] font-bold text-[13px] px-5 py-3 rounded-2xl flex items-center gap-2 border border-[#E5E5E3] hover:bg-[#FAFAF8] shadow-sm transition-all"
          >
            Lihat Rencana Produksi <ArrowRight size={14} />
          </button>
          <button
            onClick={() => router.push("/demo")}
            className="text-[#6B6B6B] font-bold text-[13px] px-5 py-3 rounded-2xl hover:bg-[#F4F4F2] transition-colors"
          >
            Ulangi Demo
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <Shell
      title="Rekap Harian"
      subtitle={today}
      desktopContent={desktopContent}
    >
      {/* ── Mobile ───────────────────────────────────────────────────────── */}
      <div className="px-4 py-5 flex flex-col gap-5">
        {/* Banner */}
        <div className="bg-white border border-[#E8E8E6] rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] font-black text-orange-500 uppercase tracking-wider mb-0.5">
              Rekap Operasional
            </p>
            <p className="text-[14px] font-black text-[#1A1A1A] capitalize leading-snug">{today}</p>
          </div>
          <div className="text-3xl select-none">📊</div>
        </div>

        {/* Angka hari ini */}
        <div>
          <Label>Angka Capaian Hari Ini</Label>
          <div className="bg-white rounded-2xl border border-[#E8E8E6] p-4 shadow-sm">
            <div className="grid grid-cols-3 gap-4 py-1">
              <BigMetric value={metrics.confirmed} label="Dikonfirmasi" icon="✅" />
              <BigMetric value={metrics.draftPending} label="Draft" icon="📝" />
              <BigMetric value={metrics.needsReview} label="Perlu Cek" icon="⚠️" />
            </div>
            <div className="border-t border-[#F4F4F2] my-3" />
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
              <p className="text-[11px] text-amber-800 font-black uppercase tracking-wider mb-1">
                Total belum dibayar
              </p>
              <p className="text-2xl font-black text-[#1A1A1A] tracking-tight">
                {formatRupiah(metrics.unpaidAmount)}
              </p>
              <p className="text-[12px] text-[#6B6B6B] font-medium mt-1">
                Dari {metrics.unpaidOrders} order
              </p>
            </div>
          </div>
        </div>

        {/* Needs check */}
        {metrics.needsReview > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle size={15} className="text-red-600" strokeWidth={2.5} />
            </div>
            <p className="text-[13px] text-red-700 font-bold leading-tight">
              {metrics.needsReview} pesanan perlu dicek ulang
            </p>
          </div>
        )}

        {/* Catatan */}
        <div>
          <Label>Catatan Hari Ini</Label>
          <div className="bg-white rounded-2xl border border-[#E8E8E6] p-4 shadow-sm">
            <p className="text-[13px] text-[#555555] font-medium leading-relaxed">
              {narrative}
            </p>
            <p className="text-[10px] text-[#ADADAD] mt-3 pt-3 border-t border-[#F4F4F2] leading-relaxed">
              {NARRATIVE_SAFE.impactNote}
            </p>
          </div>
        </div>

        {/* Payment reminder */}
        {unpaidOrder && (
          <div>
            <Label>Contoh Reminder Pembayaran</Label>
            <PaymentReminderCard
              customerName={unpaidOrder.customerName}
              amount={unpaidOrder.totalAmount}
              orderNumber={unpaidOrder.orderNumber}
              items={unpaidOrder.orderNumber}
            />
          </div>
        )}

        {/* Impact */}
        <div>
          <Label>Dashboard Dampak</Label>
          <ImpactDashboard />
        </div>

        {/* Roadmap */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[11px] font-black text-[#A3A3A3] uppercase tracking-wider">Roadmap Pengembangan</p>
            <span className="text-[10px] font-black text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">Belum tersedia di MVP</span>
          </div>
          <RoadmapCard />
        </div>

        {/* Actions */}
        <button
          onClick={() => router.push("/demo")}
          className="bg-white text-[#1A1A1A] font-black text-[13px] py-4 rounded-2xl flex items-center justify-center gap-2 border border-[#E5E5E3] hover:bg-[#FAFAF8] active:scale-[0.98] transition-all shadow-sm"
        >
          Ulangi Demo <ArrowRight size={14} />
        </button>
      </div>
    </Shell>
  );
}
