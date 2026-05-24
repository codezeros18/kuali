"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  TrendingUp, CheckCircle2, Clock, AlertTriangle,
  Bot, Wallet, ArrowRight, MessageCircle, ChefHat,
} from "lucide-react";
import { Shell } from "@/components/kuali/AppShell";
import { OrderCard } from "@/components/kuali/OrderCard";
import { formatRupiah } from "@/lib/format";
import { dashboardMetrics, orders as dummyOrders } from "@/lib/dummy-data";
import type { Order } from "@/lib/dummy-data";
import { useUser } from "@/lib/user-context";
import { cn } from "@/lib/utils";

interface Metrics {
  totalOrdersToday: number;
  confirmed: number;
  draftPending: number;
  needsReview: number;
  unpaidOrders: number;
  unpaidAmount: number;
  paidOrders: number;
  paidAmount: number;
}

interface ApiOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  confidenceScore: number;
  createdAt: string;
  items: { menuName: string; qty: number }[];
}

function apiToOrder(o: ApiOrder): Order {
  return {
    id: o.id, orderNumber: o.orderNumber, customerName: o.customerName,
    items: o.items.map((i) => `${i.qty}x ${i.menuName}`).join(", "),
    totalAmount: o.totalAmount, deliveryDate: "", deliveryTime: "",
    status: o.status as Order["status"],
    paymentStatus: o.paymentStatus as Order["paymentStatus"],
    confidenceScore: o.confidenceScore,
  };
}

// ── Stat Card (Desktop + Mobile) ────────────────────────────────────────────
function StatCard({
  icon: Icon, label, value, sub, color, bg, onClick,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  sub: string;
  color: string;
  bg: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-[#E8E8E6] p-5 text-left flex flex-col gap-3 shadow-sm w-full"
    >
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", bg)}>
        <Icon size={18} className={color} strokeWidth={2} />
      </div>
      <div>
        <div className="text-[34px] font-black text-[#1A1A1A] leading-none tracking-tight">{value}</div>
        <div className="text-[13px] font-bold text-[#1A1A1A] mt-1">{label}</div>
      </div>
      <div className="text-[12px] text-[#ADADAD] font-medium">{sub}</div>
    </motion.button>
  );
}

// ── Weekly Stats Card ────────────────────────────────────────────────────────
function WeeklyStatsCard({ metrics }: { metrics: Metrics }) {
  const DAY = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const todayIdx = new Date().getDay();

  // Mock past 6 days — deterministic so it doesn't flicker on re-render
  const MOCK_PAST = [6, 11, 8, 14, 9, 12];
  const weekData = Array.from({ length: 7 }, (_, i) => {
    if (i === 6) return { day: DAY[todayIdx], value: metrics.totalOrdersToday, isToday: true };
    const dayIdx = (todayIdx - (6 - i) + 7) % 7;
    return { day: DAY[dayIdx], value: MOCK_PAST[i], isToday: false };
  });

  const maxValue = Math.max(...weekData.map((d) => d.value), 1);

  const breakdown = [
    { label: "Dikonfirmasi", value: metrics.confirmed,   color: "bg-green-500", textColor: "text-green-600" },
    { label: "Nunggu Konfirmasi",  value: metrics.draftPending, color: "bg-amber-400", textColor: "text-amber-600" },
    { label: "Perlu Dicek",  value: metrics.needsReview, color: "bg-red-400",   textColor: "text-red-500"   },
  ];
  const total = Math.max(metrics.totalOrdersToday, 1);

  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E6] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider">Statistik</p>
          <h3 className="font-black text-[16px] text-[#1A1A1A] tracking-tight">Tren 7 Hari Terakhir</h3>
        </div>
        <span className="text-[11px] font-bold text-[#ADADAD] bg-[#F4F4F2] px-3 py-1 rounded-lg">Jumlah pesanan masuk</span>
      </div>

      <div className="grid grid-cols-[1fr_1px_260px] gap-6 items-start">

        {/* Bar chart */}
        <div>
          <div className="flex items-end gap-2 h-[100px]">
            {weekData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                {/* Tooltip on hover */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-[10px] font-black px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {d.value}
                </div>
                <div className="w-full flex items-end" style={{ height: "100px" }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max((d.value / maxValue) * 100, 6)}%` }}
                    transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "w-full rounded-t-lg transition-colors",
                      d.isToday
                        ? "bg-orange-500"
                        : "bg-[#EBEBEB] group-hover:bg-orange-200"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Day labels */}
          <div className="flex gap-2 mt-2">
            {weekData.map((d, i) => (
              <div key={i} className={cn(
                "flex-1 text-center text-[10px] font-black",
                d.isToday ? "text-orange-500" : "text-[#CECECE]"
              )}>
                {d.day}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#ADADAD]">
              <span className="w-3 h-3 rounded-sm bg-orange-500 inline-block" /> Hari ini
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#ADADAD]">
              <span className="w-3 h-3 rounded-sm bg-[#EBEBEB] inline-block" /> Hari lain (estimasi)
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="self-stretch bg-[#F0F0EE] rounded-full" />

        {/* Breakdown hari ini */}
        <div className="flex flex-col gap-4">
          <p className="text-[11px] font-black text-[#ADADAD] uppercase tracking-wider">Komposisi Hari Ini</p>
          {breakdown.map((b) => (
            <div key={b.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#555]">{b.label}</span>
                <span className={cn("text-[13px] font-black tabular-nums", b.textColor)}>{b.value}</span>
              </div>
              <div className="w-full h-2.5 bg-[#F4F4F2] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round((b.value / total) * 100)}%` }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("h-full rounded-full", b.color)}
                />
              </div>
              <span className="text-[11px] text-[#CECECE] font-medium">
                {Math.round((b.value / total) * 100)}% dari total
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Desktop Order Row ────────────────────────────────────────────────────────
function DOrderRow({ order, onClick }: { order: Order; onClick: () => void }) {
  const confidence = typeof order.confidenceScore === "number"
    ? Math.round(order.confidenceScore > 1 ? order.confidenceScore : order.confidenceScore * 100)
    : 0;

  const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
    confirmed:   { label: "✅ Konfirmasi", bg: "bg-green-50",  text: "text-green-700" },
    draft:       { label: "📝 Draft",      bg: "bg-amber-50",  text: "text-amber-700" },
    needs_check: { label: "⚠️ Perlu Cek", bg: "bg-red-50",    text: "text-red-700"   },
    cancelled:   { label: "❌ Batal",      bg: "bg-gray-100",  text: "text-gray-500"  },
  };
  const s = statusConfig[order.status] ?? { label: order.status, bg: "bg-gray-100", text: "text-gray-600" };

  return (
    <button
      onClick={onClick}
      className="grid grid-cols-[1fr_120px_140px_80px] items-center gap-5 px-6 py-4 border-b border-[#F4F4F2] last:border-0 hover:bg-[#FAFAF8] transition-colors w-full text-left group"
    >
      <div className="min-w-0">
        <div className="text-[14px] font-black text-[#1A1A1A] truncate group-hover:text-orange-500 transition-colors">
          {order.customerName}
        </div>
        <div className="text-[12px] text-[#6B6B6B] truncate mt-0.5">{order.items}</div>
      </div>
      <div>
        <span className={cn("text-[11px] font-black px-2.5 py-1 rounded-lg", s.bg, s.text)}>
          {s.label}
        </span>
      </div>
      <div>
        <div className="text-[14px] font-black text-[#1A1A1A]">{formatRupiah(order.totalAmount)}</div>
        <div className={cn("text-[11px] font-bold mt-0.5", order.paymentStatus === "paid" ? "text-green-600" : "text-amber-600")}>
          {order.paymentStatus === "paid" ? "Lunas ✓" : "Belum bayar"}
        </div>
      </div>
      <div className={cn(
        "text-[14px] font-black text-right",
        confidence >= 85 ? "text-green-600" : confidence >= 70 ? "text-amber-500" : "text-red-500"
      )}>
        {confidence > 0 ? `${confidence}%` : "—"}
      </div>
    </button>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const user = useUser();
  const [metrics, setMetrics] = useState<Metrics>({ ...dashboardMetrics, paidOrders: 1, paidAmount: 500000 });
  const [recentOrders, setRecentOrders] = useState<Order[]>(dummyOrders.slice(0, 5));
  const [parsedChats, setParsedChats] = useState(13);
  const [totalChats, setTotalChats] = useState(15);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || data.metrics.totalOrdersToday === 0) return;
        setMetrics(data.metrics);
        setRecentOrders((data.recentOrders as ApiOrder[]).slice(0, 6).map(apiToOrder));
        setParsedChats(data.parsedChats);
        setTotalChats(data.totalChats);
      })
      .catch(() => null);
  }, []);

  const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });
  const parseRate = Math.round((parsedChats / totalChats) * 100);

  const statCards = [
    {
      id: "total",     icon: TrendingUp,    label: "Total Pesanan",   value: metrics.totalOrdersToday,
      sub: "masuk hari ini",         color: "text-blue-600",   bg: "bg-blue-50",   filter: "",
    },
    {
      id: "confirmed", icon: CheckCircle2,  label: "Dikonfirmasi",    value: metrics.confirmed,
      sub: "siap ke dapur",          color: "text-green-600",  bg: "bg-green-50",  filter: "confirmed",
    },
    {
      id: "draft",     icon: Clock,         label: "Nunggu Konfirmasi", value: metrics.draftPending,
      sub: "perlu kamu review",      color: "text-amber-600",  bg: "bg-amber-50",  filter: "draft",
    },
    {
      id: "review",    icon: AlertTriangle, label: "Perlu Dicek",     value: metrics.needsReview,
      sub: "AI kurang yakin",        color: "text-red-500",    bg: "bg-red-50",    filter: "needs_check",
    },
  ];

  // ── Desktop ───────────────────────────────────────────────────────────────
  const desktopContent = (
    <div className="flex flex-col gap-6 w-full px-6 pb-6 animate-fade-in">

      {/* Greeting */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
            Halo, {user?.name ?? "kamu"}! 👋
          </h2>
          <p className="text-[14px] text-[#6B6B6B] font-medium mt-0.5">
            {today}
            {metrics.totalOrdersToday > 0 && (
              <> · ada <span className="text-orange-500 font-bold">{metrics.totalOrdersToday} pesanan</span> masuk hari ini</>
            )}
          </p>
        </div>
        {metrics.needsReview > 0 && (
          <button
            onClick={() => router.push("/orders?filter=needs_check")}
            className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-[12px] font-black px-4 py-2 rounded-full hover:bg-red-100 transition-colors"
          >
            ⚠️ {metrics.needsReview} perlu dicek
          </button>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map((c) => (
          <StatCard
            key={c.id} icon={c.icon} label={c.label} value={c.value}
            sub={c.sub} color={c.color} bg={c.bg}
            onClick={() => router.push(`/orders${c.filter ? `?filter=${c.filter}` : ""}`)}
          />
        ))}
      </div>

      {/* Stats Chart */}
      <WeeklyStatsCard metrics={metrics} />

      {/* Row 2: Finance + AI */}
      <div className="grid grid-cols-[1.5fr_1fr] gap-4">

        {/* Tagihan Belum Bayar */}
        <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-2xl border border-amber-200/50 p-6 flex flex-col gap-3 relative overflow-hidden shadow-sm">
          <img
            src="/pak-wok.svg" width="96" height="96" alt=""
            onError={(e) => (e.currentTarget.style.display = "none")}
            className="absolute right-4 bottom-2 opacity-80 rotate-6 pointer-events-none"
          />
          <div className="flex items-center gap-2">
            <Wallet size={14} className="text-amber-700" strokeWidth={2} />
            <span className="text-[11px] font-black text-amber-700 uppercase tracking-wider">Tagihan Belum Masuk</span>
          </div>
          <div className="text-[30px] font-black text-[#1A1A1A] leading-none tracking-tight">
            {formatRupiah(metrics.unpaidAmount)}
          </div>
          <p className="text-[13px] text-amber-800 font-semibold max-w-[60%]">
            {metrics.unpaidOrders} order belum bayar
            {metrics.paidOrders > 0 && (
              <span className="text-amber-700"> · {metrics.paidOrders} sudah lunas ({formatRupiah(metrics.paidAmount)})</span>
            )}
          </p>
          {(metrics.unpaidOrders + metrics.paidOrders) > 0 && (
            <div className="flex h-2 rounded-full overflow-hidden gap-0.5 max-w-[60%]">
              {metrics.unpaidOrders > 0 && <div className="bg-amber-600 rounded-full" style={{ flex: metrics.unpaidOrders }} />}
              {metrics.paidOrders > 0 && <div className="bg-emerald-500 rounded-full" style={{ flex: metrics.paidOrders }} />}
            </div>
          )}
          <div className="flex gap-4 text-[11px] font-bold text-amber-900">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />{metrics.unpaidOrders} belum bayar</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />{metrics.paidOrders} lunas</span>
          </div>
          <button
            onClick={() => router.push("/orders?filter=unpaid")}
            className="absolute right-5 top-5 flex items-center gap-1 text-[12px] font-black text-amber-700 bg-white/60 border border-amber-300/40 px-3 py-1.5 rounded-xl hover:bg-white/80 transition-all"
          >
            Lihat <ArrowRight size={12} />
          </button>
        </div>

        {/* AI Parsing Rate */}
        <div className="bg-white rounded-2xl border border-[#E8E8E6] p-6 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Bot size={14} className="text-orange-500" strokeWidth={2} />
            <span className="text-[11px] font-black text-[#6B6B6B] uppercase tracking-wider">AI udah baca</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[34px] font-black text-[#E8541A] leading-none">{parsedChats}</span>
            <span className="text-[15px] font-bold text-[#ADADAD]">dari {totalChats} chat</span>
            <span className="ml-auto text-[13px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">{parseRate}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-400 rounded-full transition-all" style={{ width: `${parseRate}%` }} />
          </div>
          <p className="text-[12px] text-[#ADADAD] font-medium">
            {parseRate >= 80 ? "🔥 Performa bagus hari ini!" : parseRate >= 60 ? "👍 Lumayan, terus semangat!" : "💪 Masih ada yang perlu diproses"}
          </p>
          <div className="flex justify-between text-[10px] font-bold text-[#D4D4D4] uppercase tracking-wider mt-auto">
            <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F4F4F2]">
          <div>
            <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider">Terbaru</p>
            <h2 className="font-black text-[16px] text-[#1A1A1A] tracking-tight">Pesanan Masuk Hari Ini</h2>
          </div>
          <button
            onClick={() => router.push("/orders")}
            className="flex items-center gap-1 text-[13px] text-orange-500 font-bold hover:text-orange-600 transition-colors"
          >
            Lihat semua <ArrowRight size={14} />
          </button>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[1fr_120px_140px_80px] gap-5 px-6 py-3 bg-[#FAFAF8] border-b border-[#F4F4F2] text-[11px] font-black text-[#ADADAD] uppercase tracking-wider">
          <span>Pelanggan</span>
          <span>Status</span>
          <span>Total</span>
          <span className="text-right">Akurasi</span>
        </div>

        <div>
          {recentOrders.map((order) => (
            <DOrderRow key={order.id} order={order} onClick={() => router.push(`/orders/${order.id}`)} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 pb-1">
        <motion.button
          whileHover={{ scale: 1.015, boxShadow: "0 8px 24px rgba(232,84,26,0.18)" }}
          whileTap={{ scale: 0.985 }}
          onClick={() => router.push("/demo")}
          className="bg-orange-500 text-white font-bold text-[14px] px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-sm hover:bg-orange-600 transition-colors"
        >
          <MessageCircle size={16} /> Simulasi Chat Baru
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.012 }}
          whileTap={{ scale: 0.988 }}
          onClick={() => router.push("/production")}
          className="bg-white text-[#1A1A1A] font-bold text-[14px] px-6 py-3.5 rounded-2xl flex items-center gap-2 border border-[#E5E5E3] hover:bg-[#FAFAF8] transition-all shadow-sm"
        >
          <ChefHat size={16} /> Rencana Produksi <ArrowRight size={15} />
        </motion.button>
      </div>
    </div>
  );

  // ── Mobile ────────────────────────────────────────────────────────────────
  return (
    <Shell
      title="Dashboard"
      subtitle={user?.business ?? user?.name}
      desktopContent={desktopContent}
    >
      <div className="px-4 py-5 flex flex-col gap-5">

        {/* Greeting */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-400 rounded-2xl p-5 text-white shadow-md shadow-orange-200/40">
          <p className="text-[13px] font-semibold text-orange-100">{today}</p>
          <h2 className="text-xl font-black mt-1 leading-tight">
            Halo, {user?.name ?? "kamu"}! 👋
          </h2>
          <p className="text-[13px] text-orange-100 font-medium mt-1">
            {metrics.totalOrdersToday > 0
              ? `Ada ${metrics.totalOrdersToday} pesanan hari ini`
              : "Belum ada pesanan masuk hari ini"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((c) => (
            <motion.button
              key={c.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => router.push(`/orders${c.filter ? `?filter=${c.filter}` : ""}`)}
              className="bg-white rounded-2xl border border-[#E8E8E6] p-4 text-left shadow-sm flex flex-col gap-2"
            >
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", c.bg)}>
                <c.icon size={15} className={c.color} strokeWidth={2} />
              </div>
              <div className="text-[28px] font-black text-[#1A1A1A] leading-none">{c.value}</div>
              <div className="text-[12px] font-bold text-[#1A1A1A]">{c.label}</div>
              <div className="text-[11px] text-[#ADADAD]">{c.sub}</div>
            </motion.button>
          ))}
        </div>

        {/* Payment Banner */}
        {(metrics.unpaidOrders > 0 || metrics.paidOrders > 0) && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-[11px] font-black text-amber-700 uppercase tracking-wider mb-1">💰 Tagihan Belum Masuk</p>
            <p className="text-2xl font-black text-[#1A1A1A] tracking-tight">{formatRupiah(metrics.unpaidAmount)}</p>
            <p className="text-[12px] text-amber-700 font-semibold mt-1">
              {metrics.unpaidOrders} belum bayar · {metrics.paidOrders} sudah lunas
            </p>
            <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5 mt-2">
              {metrics.unpaidOrders > 0 && <div className="bg-amber-500 rounded-full" style={{ flex: metrics.unpaidOrders }} />}
              {metrics.paidOrders > 0 && <div className="bg-emerald-500 rounded-full" style={{ flex: metrics.paidOrders }} />}
            </div>
          </div>
        )}

        {/* AI Rate */}
        <div className="bg-white border border-[#E8E8E6] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bot size={14} className="text-orange-500" />
              <span className="text-[12px] font-black text-[#6B6B6B] uppercase tracking-wider">AI udah baca</span>
            </div>
            <span className="text-[12px] font-black text-green-600">{parseRate}%</span>
          </div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-2xl font-black text-orange-500">{parsedChats}</span>
            <span className="text-[13px] text-[#ADADAD] font-medium">dari {totalChats} chat</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-400 rounded-full" style={{ width: `${parseRate}%` }} />
          </div>
        </div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/demo")}
          className="bg-orange-500 text-white font-bold text-[14px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-orange-200/40 hover:bg-orange-600 transition-all"
        >
          <MessageCircle size={16} /> Simulasi Chat Baru
        </motion.button>

        {/* Stats — Mobile */}
        <div className="bg-white rounded-2xl border border-[#E8E8E6] p-4 shadow-sm">
          <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-1">Statistik</p>
          <p className="font-black text-[15px] text-[#1A1A1A] mb-4">Tren 7 Hari Terakhir</p>

          {/* Mini bar chart */}
          {(() => {
            const DAY = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
            const todayIdx = new Date().getDay();
            const MOCK_PAST = [6, 11, 8, 14, 9, 12];
            const weekData = Array.from({ length: 7 }, (_, i) => {
              if (i === 6) return { day: DAY[todayIdx], value: metrics.totalOrdersToday, isToday: true };
              return { day: DAY[(todayIdx - (6 - i) + 7) % 7], value: MOCK_PAST[i], isToday: false };
            });
            const maxValue = Math.max(...weekData.map((d) => d.value), 1);
            return (
              <div className="flex items-end gap-1.5 h-[72px] mb-2">
                {weekData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center" style={{ height: "72px", justifyContent: "flex-end" }}>
                    <div
                      className={cn("w-full rounded-t-md transition-all", d.isToday ? "bg-orange-500" : "bg-[#EBEBEB]")}
                      style={{ height: `${Math.max((d.value / maxValue) * 100, 8)}%` }}
                    />
                  </div>
                ))}
              </div>
            );
          })()}
          <div className="flex gap-1.5 mb-4">
            {(() => {
              const DAY = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
              const todayIdx = new Date().getDay();
              const MOCK_PAST = [6, 11, 8, 14, 9, 12];
              return Array.from({ length: 7 }, (_, i) => {
                const isToday = i === 6;
                const day = isToday ? DAY[todayIdx] : DAY[(todayIdx - (6 - i) + 7) % 7];
                return (
                  <div key={i} className={cn("flex-1 text-center text-[9px] font-black", isToday ? "text-orange-500" : "text-[#CECECE]")}>
                    {day}
                  </div>
                );
              });
            })()}
          </div>

          {/* Breakdown */}
          <div className="flex flex-col gap-2.5">
            {[
              { label: "Dikonfirmasi",      value: metrics.confirmed,   color: "bg-green-500", textColor: "text-green-600" },
              { label: "Nunggu Konfirmasi", value: metrics.draftPending, color: "bg-amber-400", textColor: "text-amber-600" },
              { label: "Perlu Dicek",       value: metrics.needsReview, color: "bg-red-400",   textColor: "text-red-500"   },
            ].map((b) => {
              const pct = Math.round((b.value / Math.max(metrics.totalOrdersToday, 1)) * 100);
              return (
                <div key={b.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[12px] font-bold text-[#555]">{b.label}</span>
                    <span className={cn("text-[12px] font-black", b.textColor)}>{b.value} <span className="text-[#ADADAD] font-medium">({pct}%)</span></span>
                  </div>
                  <div className="w-full h-2 bg-[#F4F4F2] rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", b.color)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-3">Pesanan Terbaru</p>
          <div className="flex flex-col gap-3">
            {recentOrders.map((order) => (
              <OrderCard key={order.id} order={order} onClick={() => router.push(`/orders/${order.id}`)} />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
