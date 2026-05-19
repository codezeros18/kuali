"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MessageCircle, CreditCard, ArrowRight, Zap,
} from "lucide-react";
import { Shell } from "@/components/kuali/AppShell";
import { MetricCard } from "@/components/kuali/MetricCard";
import { OrderCard } from "@/components/kuali/OrderCard";
import { StatusBadge } from "@/components/kuali/StatusBadge";
import { formatRupiah } from "@/lib/format";
import { dashboardMetrics, orders as dummyOrders, business } from "@/lib/dummy-data";
import type { Order } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

interface Metrics {
  totalOrdersToday: number;
  confirmed: number;
  draftPending: number;
  needsReview: number;
  unpaidOrders: number;
  unpaidAmount: number;
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

function DashCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ borderColor: "rgba(249,115,22,0.25)", boxShadow: "0 12px 30px rgba(0,0,0,0.03)" }}
      transition={{ duration: 0.22 }}
      className={cn(
        "bg-white rounded-2xl border border-[#E8E8E6] p-6 flex flex-col gap-3 min-h-0 overflow-hidden shadow-sm w-full",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function DOrderRow({ order, onClick }: { order: Order; onClick: () => void }) {
  const confidence = typeof order.confidenceScore === "number"
    ? Math.round(order.confidenceScore > 1 ? order.confidenceScore : order.confidenceScore * 100)
    : 0;
  const confColor = confidence >= 85 ? "text-green-600" : confidence >= 70 ? "text-amber-500" : "text-red-500";

  return (
    <button
      onClick={onClick}
      className="grid grid-cols-[160px_1fr_140px_160px_100px] items-center gap-6 px-7 py-4 border-b border-[#F4F4F2] last:border-0 hover:bg-[#FAFAF8] transition-colors w-full text-left group"
    >
      <div className="shrink-0">
        <span className="text-[13px] font-mono font-semibold text-[#888888] bg-[#FAFAF8] px-2.5 py-1.5 rounded-xl border border-[#E8E8E6] group-hover:bg-white transition-colors">{order.orderNumber}</span>
      </div>
      <div className="min-w-0 pr-4">
        <div className="text-[15px] font-black text-[#1A1A1A] truncate group-hover:text-orange-500 transition-colors">{order.customerName}</div>
        <div className="text-[13px] text-[#6B6B6B] font-medium truncate mt-1">{order.items}</div>
      </div>
      <div className="shrink-0 flex items-center">
        <StatusBadge status={order.status as any} />
      </div>
      <div className="text-right pr-4">
        <div className="text-[15px] font-black text-[#1A1A1A] tracking-tight leading-none">{formatRupiah(order.totalAmount)}</div>
        <div className={cn(
          "text-[12px] font-bold mt-2 inline-block leading-none",
          order.paymentStatus === "paid" ? "text-green-600" : "text-amber-600"
        )}>
          {order.paymentStatus === "paid" ? "Lunas" : "Belum Payar"}
        </div>
      </div>
      <div className={cn("text-right text-[14px] font-black pr-4", confColor)}>
        {confidence > 0 ? `${confidence}%` : "—"}
      </div>
    </button>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<Metrics>(dashboardMetrics);
  const [recentOrders, setRecentOrders] = useState<Order[]>(dummyOrders.slice(0, 5));
  const [parsedChats, setParsedChats] = useState(13);
  const [totalChats, setTotalChats] = useState(15);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        setMetrics(data.metrics);
        setRecentOrders((data.recentOrders as ApiOrder[]).slice(0, 6).map(apiToOrder));
        setParsedChats(data.parsedChats);
        setTotalChats(data.totalChats);
      })
      .catch(() => null);
  }, []);

  const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });
  const parseRate = Math.round((parsedChats / totalChats) * 100);

  // ── Desktop Layout Full Width & Viewport Locked ──────────────────
  const desktopContent = (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-5 w-full px-6 overflow-hidden animate-fade-in">

      {/* Header Greeting */}
      <div className="flex-shrink-0 pt-1">
        <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
          Selamat datang, Bu Rani 👋
        </h2>
        <p className="text-[14px] font-medium text-[#6B6B6B] mt-0.5">
          {today} <span className="mx-1 text-[#CECECE]">·</span> <span className="text-orange-500 font-bold">{metrics.totalOrdersToday}</span> pesanan aktif hari ini
        </p>
      </div>

      {/* ── Row 1: 4 Dashboard Metric Cards (Lebih Lebar & Besar) ── */}
      <div className="grid grid-cols-4 gap-4 flex-shrink-0 w-full">
        {[
          { id: "total", label: "Total Order", value: metrics.totalOrdersToday, sub: "vs 8 kemarin", badge: "↑ 27%", bgIcon: "bg-[#EFF6FF] text-[#2563EB]", filter: "", path: "M0 24 L20 16 L40 22 L60 10 L80 14 L100 6 L120 12 L140 4", color: "#2563EB" },
          { id: "confirmed", label: "Dikonfirmasi", value: metrics.confirmed, sub: "siap produksi", badge: "↑ 2", bgIcon: "bg-[#F0FDF4] text-[#16A34A]", filter: "confirmed", path: "M0 28 L20 25 L40 26 L60 18 L80 20 L100 12 L120 14 L140 8", color: "#16A34A" },
          { id: "draft", label: "Draft / Pending", value: metrics.draftPending, sub: "menunggu review", badge: null, bgIcon: "bg-[#FFFBEB] text-[#D97706]", lineAccent: "border-l-4 border-l-[#D97706]", filter: "draft", path: "M0 20 L20 22 L40 18 L60 25 L80 22 L100 28 L120 24 L140 26", color: "#D97706" },
          { id: "review", label: "Perlu Dicek", value: metrics.needsReview, sub: "confidence rendah", badge: "!", bgIcon: "bg-[#FEF2F2] text-[#DC2626]", lineAccent: "border-l-4 border-l-[#DC2626]", filter: "needs_check", path: "M0 32 L20 31 L40 32 L60 29 L80 30 L100 27 L120 28 L140 26", color: "#DC2626" }
        ].map((card) => {
          const showFullOpacity = hoveredCard === null || hoveredCard === card.id;

          return (
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.012 }}
              whileTap={{ scale: 0.988 }}
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => router.push(`/orders${card.filter ? `?filter=${card.filter}` : ""}`)}
              className={cn(
                "bg-white rounded-2xl border border-[#E8E8E6] p-5 text-left flex min-h-[176px] flex-col justify-between shadow-sm transition-all relative overflow-hidden group w-full",
                card.lineAccent
              )}
            >
              <div className="flex justify-between items-start w-full">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0", card.bgIcon)}>
                  {card.id === "total" && <svg className="stroke-current stroke-[1.6] fill-none" width="18" height="18" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
                  {card.id === "confirmed" && <svg className="stroke-current stroke-[1.6] fill-none" width="18" height="18" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                  {card.id === "draft" && <svg className="stroke-current stroke-[1.6] fill-none" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                  {card.id === "review" && <svg className="stroke-current stroke-[1.6] fill-none" width="18" height="18" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                </div>
                {card.badge && (
                  <span className={cn(
                    "text-[11px] font-black px-2 py-0.5 rounded-md border",
                    card.id === "review" ? "text-[#DC2626] bg-[#FEF2F2] border-[#FCA5A5]" : "text-[#16A34A] bg-[#F0FDF4] border-[#BBF7D0]"
                  )}>
                    {card.badge}
                  </span>
                )}
              </div>
              
              <div className="min-w-0">
                <div className="text-[32px] font-black text-[#1A1A1A] leading-none tracking-tight mb-1">{card.value}</div>
                <div className="text-[14px] font-black text-[#1A1A1A] leading-tight tracking-tight truncate">{card.label}</div>
              </div>

              {/* Sparkline Multi-Series Core */}
              <div className="w-full h-9 relative">
                <svg width="100%" height="100%" viewBox="0 0 140 36" preserveAspectRatio="none">
                  <path 
                    d={card.path} 
                    fill="none" 
                    stroke={card.color} 
                    strokeWidth={showFullOpacity ? 2.2 : 1.0} 
                    strokeOpacity={showFullOpacity ? 1.0 : 0.14}
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="transition-all duration-300"
                  />
                </svg>
              </div>
              <div className="text-[12px] text-[#ADADAD] font-semibold leading-tight truncate">{card.sub}</div>
            </motion.button>
          );
        })}
      </div>

      {/* ── Row 2: Keuangan & Rasio Ekstraksi AI ── */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-4 flex-shrink-0 w-full">

        {/* Belum Dibayar Hero Card */}
        <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-2xl border border-[rgba(180,83,9,0.15)] p-6 relative overflow-hidden flex flex-col gap-2.5 shadow-sm w-full">
          <img 
            src="/pak-wok.svg"
            width="104" height="104" 
            alt=""
            onError={(e) => (e.currentTarget.style.display = "none")}
            className="absolute right-5 bottom-2 opacity-90 transform rotate-[6deg] pointer-events-none"
          />
          
          <div className="flex items-center gap-2">
            <svg className="stroke-[1.6] fill-none" width="14" height="14" viewBox="0 0 24 24" stroke="#B45309">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span className="text-[11px] font-black text-[#B45309] uppercase tracking-wider">Belum dibayar</span>
          </div>
          
          <div className="text-[32px] font-black text-[#1A1A1A] leading-none tracking-tight whitespace-nowrap">
            {formatRupiah(metrics.unpaidAmount)}
          </div>
          
          <div className="text-[13px] text-[#92400E] max-w-[65%] font-semibold mt-0.5">
            Dari <strong className="font-black text-[#1A1A1A]">{metrics.unpaidOrders} order</strong> dikonfirmasi · 1 lunas (Rp 500rb)
          </div>
          
          <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5 max-w-[65%] w-full mt-1.5">
            <div className="flex-[4] bg-[#B45309]"></div>
            <div className="flex-[1] bg-[#059669]"></div>
          </div>
          
          <div className="flex gap-4 text-[11px] font-black text-[#555555] mt-0.5">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B45309]"></span>{metrics.unpaidOrders} belum
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#059669]"></span>1 lunas
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/orders?filter=unpaid")}
            className="absolute right-5 top-5 flex items-center gap-1 text-[13px] font-black text-[#B45309] hover:text-[#78350f] bg-white/50 border border-[#B45309]/15 px-3.5 py-2 rounded-xl transition-all shadow-sm"
          >
            Lihat <ArrowRight size={13} />
          </motion.button>
        </div>

        {/* Parse Efficiency Card */}
        <DashCard className="p-6 justify-between gap-2 w-full">
          <div className="flex items-center gap-1.5">
            <svg className="stroke-[1.6] fill-none" width="14" height="14" viewBox="0 0 24 24" stroke="#E8541A">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span className="text-[11px] font-black text-[#6B6B6B] uppercase tracking-wider">Chat diparse</span>
          </div>
          
          <div className="flex items-baseline gap-1.5 w-full">
            <span className="text-[34px] font-black text-[#E8541A] leading-none tracking-tight">{parsedChats}</span>
            <span className="text-[15px] font-bold text-[#ADADAD]">/ {totalChats} chat</span>
            <span className="text-[12px] font-black text-[#16A34A] ml-auto flex items-center">{parseRate}%</span>
          </div>
          
          <svg width="100%" height="36" viewBox="0 0 140 36" preserveAspectRatio="none" className="mt-1">
            <path d="M0 28 L20 22 L40 25 L60 16 L80 18 L100 8 L120 12 L140 6" stroke="#E8541A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M0 28 L20 22 L40 25 L60 16 L80 18 L100 8 L120 12 L140 6 L140 36 L0 36 Z" fill="#E8541A" opacity="0.08"/>
            <circle cx="140" cy="6" r="3" fill="#E8541A"/>
          </svg>
          
          <div className="flex justify-between text-[10px] font-black text-[#ADADAD] tracking-wider uppercase mt-1">
            <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
          </div>
        </DashCard>
      </div>

      {/* ── Row 3: Tabel Log Order Terbaru (Scroll Internal) ── */}
      <DashCard className="p-0 gap-0 flex-1 min-h-0 w-full">
        <div className="flex items-center justify-between px-7 py-4 border-b border-[#F4F4F2] flex-shrink-0">
          <div>
            <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider">Ikhtisar Data</p>
            <h2 className="font-black text-[16px] text-[#1A1A1A] tracking-tight mt-0.5">Daftar Pesanan Terbaru</h2>
          </div>
          <button
            onClick={() => router.push("/orders")}
            className="flex items-center gap-1 text-[13px] text-orange-500 font-bold hover:text-orange-600 transition-colors"
          >
            Lihat semua <ArrowRight size={14} />
          </button>
        </div>
        
        {/* Header Tabel */}
        <div className="grid grid-cols-[150px_1fr_130px_140px_90px] items-center gap-4 px-7 py-3 bg-[#FAFAF8] border-b border-[#F4F4F2] flex-shrink-0 w-full">
          {[
            ["No. Order", ""],
            ["Nama Pelanggan & Item Menu", ""],
            ["Status", ""],
            ["Total Omzet", "text-right pr-2"],
            ["Akurasi AI", "text-right pr-2"],
          ].map(([col, cls], idx) => (
            <div key={idx} className={cn("text-[11px] font-black text-[#ADADAD] uppercase tracking-wider", cls)}>
              {col}
            </div>
          ))}
        </div>

        {/* Baris Konten Tabel dengan internal scrollbar */}
        <div className="divide-y divide-[#F4F4F2] overflow-y-auto flex-1 min-h-0 w-full no-scrollbar">
          {recentOrders.map((order) => (
            <DOrderRow key={order.id} order={order} onClick={() => router.push(`/orders/${order.id}`)} />
          ))}
        </div>
      </DashCard>

      {/* Tombol Aksi Cepat */}
      <div className="flex gap-3.5 flex-shrink-0 pb-1">
        <motion.button
          whileHover={{ scale: 1.015, boxShadow: "0 10px 25px rgba(232,84,26,0.2)" }}
          whileTap={{ scale: 0.985 }}
          onClick={() => router.push("/demo")}
          className="bg-orange-500 text-white font-bold text-[14px] px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-sm transition-colors hover:bg-orange-600"
        >
          <MessageCircle size={16} /> Jalankan Simulasi Chat Baru
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.012 }}
          whileTap={{ scale: 0.988 }}
          onClick={() => router.push("/production")}
          className="bg-white text-[#1A1A1A] font-bold text-[14px] px-6 py-3.5 rounded-2xl flex items-center gap-2 border border-[#E5E5E3] hover:bg-[#FAFAF8] transition-all shadow-sm"
        >
          Buka Rencana Produksi Dapur <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  );

  return (
    <Shell
      title="Dashboard Hari Ini"
      subtitle={business.name}
      headerRight={
        <div className="flex items-center gap-1.5 text-[12px] font-black text-orange-500 bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full shadow-sm">
          <Zap size={12} className="fill-orange-500" /> Mock AI aktif
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
