"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MessageCircle, ArrowRight, ChevronRight,
} from "lucide-react";
import { Shell } from "@/components/kuali/AppShell";
import { MetricCard } from "@/components/kuali/MetricCard";
import { OrderCard } from "@/components/kuali/OrderCard";
import { StatusBadge } from "@/components/kuali/StatusBadge";
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

const WEEK_DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const WEEK_HEIGHTS = [38, 54, 44, 72, 62, 85, 78];

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

  const todayDowIdx = (() => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; })();

  const desktopContent = (
    <div className="flex flex-col gap-5 w-full px-6 pb-6 animate-fade-in">

      {/* ── Greeting + CTA ── */}
      <div className="flex items-center justify-between flex-shrink-0 pt-1">
        <div>
          <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
            Selamat datang, {user?.name ?? "kamu"} 👋
          </h2>
          <p className="text-[14px] font-medium text-[#6B6B6B] mt-0.5">
            {today} · <span className="text-orange-500 font-bold">{metrics.totalOrdersToday}</span> pesanan aktif hari ini
          </p>
        </div>
        <button
          onClick={() => router.push("/demo")}
          className="bg-orange-500 text-white font-bold text-[13px] px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm hover:bg-orange-600 active:scale-[0.97] transition-all"
        >
          <MessageCircle size={15} /> Proses Chat Baru
        </button>
      </div>

      {/* ── Main Row: hero chart (left) + recent orders (right) ── */}
      <div className="grid grid-cols-[3fr_2fr] gap-4 flex-shrink-0">

        {/* LEFT: Lollipop Chart Hero */}
        <div className="bg-white rounded-2xl border border-[#E8E8E6] p-6 flex flex-col gap-4 shadow-sm overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-7 h-7 rounded-lg bg-[#FFF3EB] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8541A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
                <h3 className="font-black text-[18px] text-[#1A1A1A] tracking-tight">Performa Order</h3>
              </div>
              <p className="text-[13px] text-[#888888] font-medium">
                Pantau tren pesanan masuk dan status produksi harian
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F4F4F2] border border-[#E8E8E6] px-3 py-1.5 rounded-full">
              <span className="text-[12px] font-bold text-[#6B6B6B]">Minggu ini</span>
            </div>
          </div>

          {/* Lollipop chart */}
          <svg width="100%" height="120" viewBox="0 0 280 120" preserveAspectRatio="xMidYMid meet">
            {WEEK_DAYS.map((day, i) => {
              const x = 20 + i * 40;
              const isFuture = i > todayDowIdx;
              const isActive = i === todayDowIdx;
              const topY = isFuture ? 88 : 90 - WEEK_HEIGHTS[i] * 0.7;
              return (
                <g key={day}>
                  {isActive && (
                    <>
                      <rect x={x - 24} y={topY - 26} width={48} height={20} rx={10} fill="#1A1A1A" />
                      <text x={x} y={topY - 12} textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="system-ui">
                        {metrics.totalOrdersToday} order
                      </text>
                    </>
                  )}
                  <line
                    x1={x} y1={90} x2={x} y2={topY + (isActive ? 6 : isFuture ? 0 : 4)}
                    stroke={isActive ? "#1A1A1A" : isFuture ? "#F0F0EE" : "#E0E0DE"}
                    strokeWidth={isActive ? 2.5 : 1.5} strokeLinecap="round"
                  />
                  <circle cx={x} cy={isFuture ? 88 : topY} r={isActive ? 6 : 4}
                    fill={isActive ? "#1A1A1A" : isFuture ? "#F0F0EE" : "#E0E0DE"} />
                  <text x={x} y={108} textAnchor="middle"
                    fill={isActive ? "#1A1A1A" : "#ADADAD"} fontSize="10"
                    fontWeight={isActive ? "900" : "600"} fontFamily="system-ui"
                  >{day}</text>
                </g>
              );
            })}
          </svg>

          {/* Bottom stat */}
          <div className="flex items-center gap-5 pt-3 border-t border-[#F4F4F2]">
            <div>
              <div className="text-[30px] font-black text-[#1A1A1A] leading-none tracking-tight">
                +{metrics.totalOrdersToday > 0 ? Math.round((metrics.confirmed / metrics.totalOrdersToday) * 100) : 0}%
              </div>
              <p className="text-[12px] text-[#888888] font-medium mt-1 leading-tight">
                Pesanan terkonfirmasi dari total order hari ini
              </p>
            </div>
            <div className="ml-auto flex flex-col gap-1.5 items-end">
              <span className="text-[12px] font-black text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-lg">
                ✓ {metrics.confirmed} konfirmasi
              </span>
              {metrics.needsReview > 0 && (
                <span className="text-[12px] font-black text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg">
                  ! {metrics.needsReview} perlu cek
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Recent orders list */}
        <div className="bg-white rounded-2xl border border-[#E8E8E6] flex flex-col shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F4F4F2]">
            <div>
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-wider">Log Terbaru</p>
              <h3 className="font-black text-[15px] text-[#1A1A1A] tracking-tight mt-0.5">Pesanan Masuk</h3>
            </div>
            <button
              onClick={() => router.push("/orders")}
              className="text-[12px] font-bold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-0.5"
            >
              Lihat semua <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex flex-col overflow-y-auto flex-1">
            {recentOrders.slice(0, 5).map((order) => (
              <button
                key={order.id}
                onClick={() => router.push(`/orders/${order.id}`)}
                className="flex items-center gap-3 px-5 py-3.5 border-b border-[#F9F9F7] last:border-0 hover:bg-[#FAFAF8] transition-colors text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FFF3EB] border border-orange-100/80 flex items-center justify-center flex-shrink-0">
                  <span className="text-[13px] font-black text-orange-500">
                    {order.customerName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-black text-[#1A1A1A] truncate group-hover:text-orange-500 transition-colors">
                    {order.customerName}
                  </div>
                  <div className="text-[11px] text-[#888888] font-medium mt-0.5">
                    {formatRupiah(order.totalAmount)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <StatusBadge status={order.status as any} />
                  <span className={cn(
                    "text-[10px] font-bold",
                    order.paymentStatus === "paid" ? "text-green-600" : "text-amber-600"
                  )}>
                    {order.paymentStatus === "paid" ? "Lunas" : "Belum Bayar"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Row: 3 cards ── */}
      <div className="grid grid-cols-3 gap-4 flex-shrink-0">

        {/* Finance card */}
        <div className="bg-white rounded-2xl border border-[#E8E8E6] p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-[#B45309] uppercase tracking-wider">Piutang Belum Lunas</p>
            <button
              onClick={() => router.push("/orders?filter=unpaid")}
              className="text-[11px] font-bold text-orange-500 hover:text-orange-600 transition-colors"
            >
              Tagih
            </button>
          </div>
          <div className="text-[26px] font-black text-[#1A1A1A] leading-none tracking-tight">
            {formatRupiah(metrics.unpaidAmount)}
          </div>
          <p className="text-[12px] text-[#888888] font-medium">
            {metrics.unpaidOrders} order dikonfirmasi · belum lunas
          </p>
          {(metrics.unpaidOrders + metrics.paidOrders) > 0 && (
            <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden">
              {metrics.unpaidOrders > 0 && <div className="bg-[#B45309] rounded-l-full" style={{ flex: metrics.unpaidOrders }} />}
              {metrics.paidOrders > 0 && <div className="bg-[#059669]" style={{ flex: metrics.paidOrders }} />}
            </div>
          )}
          <div className="flex gap-4 text-[11px] font-bold text-[#6B6B6B]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#B45309] inline-block" />{metrics.unpaidOrders} belum</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#059669] inline-block" />{metrics.paidOrders} lunas</span>
          </div>
        </div>

        {/* Dark CTA card */}
        <div className="bg-[#1A1A1A] rounded-2xl p-5 flex flex-col justify-between gap-3 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)", backgroundSize: "20px 20px" }} />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <MessageCircle size={16} className="text-orange-400" />
            </div>
            <h3 className="font-black text-white text-[15px] leading-tight mt-1">
              Proses Chat<br />WhatsApp Baru
            </h3>
            <p className="text-[12px] text-white/50 leading-relaxed">
              Ekstrak pesanan dari chat pelanggan secara otomatis dengan AI
            </p>
          </div>
          <button
            onClick={() => router.push("/demo")}
            className="relative z-10 bg-white text-[#1A1A1A] font-black text-[13px] px-4 py-2.5 rounded-xl flex items-center justify-between hover:bg-orange-50 transition-colors active:scale-[0.97]"
          >
            Mulai sekarang <ArrowRight size={14} />
          </button>
        </div>

        {/* AI parse stats card */}
        <div className="bg-white rounded-2xl border border-[#E8E8E6] p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-[#6B6B6B] uppercase tracking-wider">Efisiensi AI Parse</p>
            <span className="text-[11px] font-black text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-lg">{parseRate}%</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Diparse", value: parsedChats, color: "text-orange-500" },
              { label: "Total Chat", value: totalChats, color: "text-[#1A1A1A]" },
              { label: "Draft", value: metrics.draftPending, color: "text-amber-500" },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className={cn("text-[22px] font-black leading-none", color)}>{value}</div>
                <div className="text-[9px] font-black text-[#ADADAD] uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-1 h-9">
            {[30, 52, 38, 68, 58, 82, parseRate].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm"
                style={{ height: `${h}%`, backgroundColor: i === 6 ? "#E8541A" : "#F0F0EE" }} />
            ))}
          </div>
          <div className="flex justify-between text-[9px] font-black text-[#ADADAD] uppercase">
            {WEEK_DAYS.map((d) => <span key={d}>{d.charAt(0)}</span>)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Shell
      title="Dashboard Hari Ini"
      subtitle={user?.business ?? user?.name}
      headerRight={
        <div className="flex items-center gap-1.5 text-[12px] font-black text-orange-500 bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> Mock AI aktif
        </div>
      }
      desktopContent={desktopContent}
    >
      {/* Mobile view */}
      <div className="px-4 py-4 flex flex-col gap-5">
        <div>
          <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-3">Ringkasan</p>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard value={metrics.totalOrdersToday} label="Total Order" sublabel="Hari ini" onClick={() => router.push("/orders")} />
            <MetricCard value={metrics.confirmed} label="Dikonfirmasi" accent="success" onClick={() => router.push("/orders?filter=confirmed")} />
            <MetricCard value={metrics.draftPending} label="Draft / Pending" accent="warning" onClick={() => router.push("/orders?filter=draft")} />
            <MetricCard value={metrics.needsReview} label="Perlu Dicek" sublabel={`${metrics.unpaidOrders} belum bayar`} accent="danger" onClick={() => router.push("/orders?filter=needs_check")} />
          </div>
        </div>

        {metrics.unpaidAmount > 0 && (
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[11px] font-black text-amber-800 uppercase tracking-wider mb-1">
              Total belum dibayar
            </p>
            <p className="text-2xl font-black text-[#1A1A1A] tracking-tight">{formatRupiah(metrics.unpaidAmount)}</p>
            <p className="text-[13px] text-[#6B6B6B] font-medium mt-1">
              {metrics.unpaidOrders} order · {parsedChats}/{totalChats} chat diparse
            </p>
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/demo")}
          className="bg-orange-500 text-white font-bold text-[14px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-orange-200/40 hover:bg-orange-600 transition-all"
        >
          <MessageCircle size={16} /> Proses Chat Baru
        </motion.button>

        <div>
          <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-3">Order Terbaru</p>
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
