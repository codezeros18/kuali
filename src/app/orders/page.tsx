"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, FileText, Calendar, Layers3 } from "lucide-react";
import { Shell } from "@/components/kuali/AppShell";
import { StatusBadge } from "@/components/kuali/StatusBadge";
import { OrderCard } from "@/components/kuali/OrderCard";
import { orders as dummyOrders } from "@/lib/dummy-data";
import type { Order } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "confirmed" | "draft" | "needs_check" | "unpaid";

interface TabConfig {
  id: FilterTab;
  label: string;
  colorClass: string;
  bgActive: string;
  borderActive: string;
  textActive: string;
}

const tabs: TabConfig[] = [
  { id: "all",        label: "Semua",         colorClass: "bg-gray-100 text-gray-700",      bgActive: "bg-orange-500", borderActive: "border-orange-500", textActive: "text-white" },
  { id: "confirmed",  label: "Dikonfirmasi",  colorClass: "bg-green-50 text-green-700",     bgActive: "bg-green-600",  borderActive: "border-green-600",  textActive: "text-white" },
  { id: "draft",      label: "Draft",         colorClass: "bg-amber-50 text-amber-700",     bgActive: "bg-amber-500",  borderActive: "border-amber-500",  textActive: "text-white" },
  { id: "needs_check",label: "Perlu Cek",     colorClass: "bg-red-50 text-red-700",         bgActive: "bg-red-600",    borderActive: "border-red-600",    textActive: "text-white" },
  { id: "unpaid",     label: "Belum Bayar",   colorClass: "bg-amber-50 text-amber-700",     bgActive: "bg-amber-700",  borderActive: "border-amber-700",  textActive: "text-white" },
];

function filterOrders(list: Order[], tab: FilterTab): Order[] {
  switch (tab) {
    case "confirmed":  return list.filter((o) => o.status === "confirmed");
    case "draft":      return list.filter((o) => o.status === "draft");
    case "needs_check":return list.filter((o) => o.status === "needs_check");
    case "unpaid":     return list.filter((o) => o.paymentStatus === "unpaid");
    default:           return list;
  }
}

interface ApiOrder {
  id: string; orderNumber: string; customerName: string;
  status: string; paymentStatus: string; totalAmount: number;
  confidenceScore: number; deliveryDate: string | null;
  deliveryTime: string | null; createdAt: string;
  items: { menuName: string; qty: number }[];
}

function apiOrderToOrder(o: ApiOrder): Order {
  return {
    id: o.id, orderNumber: o.orderNumber, customerName: o.customerName,
    items: o.items.map((i) => `${i.qty}x ${i.menuName}`).join(", "),
    totalAmount: o.totalAmount, deliveryDate: o.deliveryDate ?? "",
    deliveryTime: o.deliveryTime ?? "",
    status: o.status as Order["status"],
    paymentStatus: o.paymentStatus as Order["paymentStatus"],
    confidenceScore: o.confidenceScore,
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.02 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 28 } }
};

// ── Desktop Layout Baris Pesanan ────────────────────────────────
function DOrderRow({ order, onClick }: { order: Order; onClick: () => void }) {
  const confidence = typeof order.confidenceScore === "number"
    ? Math.round(order.confidenceScore > 1 ? order.confidenceScore : order.confidenceScore * 100)
    : 0;
  const confColor = confidence >= 85 ? "text-green-600" : confidence >= 70 ? "text-amber-500" : "text-red-500";

  const menuItems = order.items.split(", ");

  return (
    <motion.div variants={itemVariants} className="w-full">
      <button
        onClick={onClick}
        className="grid grid-cols-[160px_1fr_140px_150px_100px_40px] items-start gap-4 px-8 py-5 hover:bg-[#FAFAF8] transition-colors w-full text-left group relative"
      >
        {/* 1. No. Order */}
        <div className="pt-0.5">
          <span className="text-[12px] font-mono font-semibold text-[#888888] bg-[#FAFAF8] px-2.5 py-1.5 rounded-xl border border-[#E8E8E6] group-hover:bg-white transition-colors">
            {order.orderNumber}
          </span>
        </div>

        {/* 2. Nama Pelanggan & Detail Menu */}
        <div className="min-w-0 pr-4">
          <div className="text-[15px] font-black text-[#1A1A1A] tracking-tight group-hover:text-orange-500 transition-colors">
            {order.customerName}
          </div>
          <div className="flex flex-col gap-1.5 mt-2.5">
            {menuItems.map((item, idx) => (
              <span key={idx} className="text-[13px] text-[#6B6B6B] font-medium leading-none block">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Status Badge */}
        <div className="pt-0.5 flex items-center">
          <StatusBadge status={order.status as any} />
        </div>

        {/* 4. Total Harga & Status Pembayaran */}
        <div className="text-right pr-4">
          <div className="text-[15px] font-black text-[#1A1A1A] tracking-tight leading-none">{formatRupiah(order.totalAmount)}</div>
          <div className={cn(
            "text-[12px] font-bold mt-2 inline-block leading-none",
            order.paymentStatus === "paid" ? "text-green-600" : "text-amber-600"
          )}>
            {order.paymentStatus === "paid" ? "Lunas" : "Belum bayar"}
          </div>
        </div>

        {/* 5. Akurasi AI */}
        <div className="text-right pr-4 pt-0.5">
          <div className={cn("text-[14px] font-black leading-none", confColor)}>
            {confidence > 0 ? `${confidence}%` : "—"}
          </div>
        </div>

        {/* 6. Arrow Trigger */}
        <div className="flex justify-end pt-1">
          <ChevronRight size={16} className="text-[#CECECE] group-hover:text-orange-500 group-hover:translate-x-1 transition-all shrink-0" />
        </div>
      </button>
    </motion.div>
  );
}

// ── Filter Tugas Berbentuk Card Statistik Multi-Sparkline (Highlight Focus) ──
function MetricTabStrip({
  active, counts, onSelect
}: {
  active: FilterTab;
  counts: Record<FilterTab, number>;
  onSelect: (t: FilterTab) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full relative z-10 flex-shrink-0">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={cn(
              "p-5 rounded-2xl text-left border flex flex-col justify-between min-h-[175px] transition-all shadow-sm relative overflow-hidden group select-none",
              isActive 
                ? `${tab.bgActive} ${tab.borderActive} ${tab.textActive}`
                : "bg-white border-[#E8E8E6] text-[#1A1A1A] hover:border-gray-300"
            )}
          >
            {/* Atas: Label & Badge */}
            <div className="flex items-center justify-between w-full">
              <span className={cn(
                "text-[11px] font-black uppercase tracking-wider",
                isActive ? "text-white/80" : "text-[#888888]"
              )}>
                {tab.label}
              </span>
              <span className={cn(
                "text-[11px] font-black rounded-lg px-2 py-0.5 min-w-[22px] text-center",
                isActive ? "bg-white/20 text-white" : tab.colorClass
              )}>
                {counts[tab.id]}
              </span>
            </div>
            
            {/* Tengah: Multi-Series Sparkline Chart dengan Efek Highlight Opacity */}
            <div className="w-full h-10 mt-4 mb-1 relative">
              <svg width="100%" height="100%" viewBox="0 0 140 36" preserveAspectRatio="none">
                {[
                  { id: "all",        color: "#F97316", activeColor: "#FFFFFF", path: "M0 22 L20 16 L40 20 L60 10 L80 12 L100 6 L120 10 L140 2" },
                  { id: "confirmed",  color: "#16A34A", activeColor: "#FFFFFF", path: "M0 28 L20 24 L40 26 L60 16 L80 20 L100 12 L120 16 L140 8" },
                  { id: "draft",      color: "#D97706", activeColor: "#FFFFFF", path: "M0 25 L20 21 L40 23 L60 13 L80 17 L100 9 L120 13 L140 5" },
                  { id: "needs_check",color: "#DC2626", activeColor: "#FFFFFF", path: "M0 32 L20 31 L40 32 L60 28 L80 30 L100 26 L120 28 L140 26" },
                  { id: "unpaid",     color: "#B45309", activeColor: "#FFFFFF", path: "M0 34 L20 33 L40 34 L60 30 L80 31 L100 28 L120 30 L140 28" },
                ].map((series) => {
                  // Cek apakah seri data ini milik card ini
                  const isCurrentSeries = series.id === tab.id;
                  
                  // Warna stroke menyesuaikan state aktif card
                  const strokeColor = isActive ? series.activeColor : series.color;
                  
                  // LOGIKA OPACITY HIGHLIGHT REQUEST USER:
                  // Jika miliknya sendiri = 100% (1.0). Jika milik yang lain, opacity diturunkan drastis.
                  const strokeOpacity = isCurrentSeries ? 1.0 : (isActive ? 0.22 : 0.12);
                  const strokeWidth = isCurrentSeries ? 2.2 : 1.0;
                  
                  return (
                    <path
                      key={series.id}
                      d={series.path}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeOpacity={strokeOpacity}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Nama-Nama Hari di Bawah Grafik */}
            <div className={cn(
              "flex justify-between w-full text-[9px] font-bold tracking-wider uppercase mb-3",
              isActive ? "text-white/50" : "text-[#CECECE]"
            )}>
              <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
            </div>
            
            {/* Bawah: Total Nilai & Chevron */}
            <div className="flex items-baseline justify-between w-full mt-1">
              <span className={cn(
                "text-2xl font-black tracking-tight leading-none",
                isActive ? "text-white" : "text-[#1A1A1A]"
              )}>
                {counts[tab.id]}
              </span>
              <ChevronRight 
                size={14} 
                className={cn(
                  "transition-transform group-hover:translate-x-0.5",
                  isActive ? "text-white/60" : "text-[#CECECE]"
                )} 
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

function OrdersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilter = (searchParams.get("filter") as FilterTab) ?? "all";
  const [activeTab, setActiveTab] = useState<FilterTab>(initialFilter);
  const [allOrders, setAllOrders] = useState<Order[]>(dummyOrders);

  useEffect(() => {
    fetch("/api/orders?today=true")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: ApiOrder[] | null) => {
        if (!data || data.length === 0) return;
        setAllOrders(data.map(apiOrderToOrder));
      })
      .catch(() => null);
  }, []);

  const filtered = filterOrders(allOrders, activeTab);

  const counts: Record<FilterTab, number> = {
    all:         allOrders.length,
    confirmed:   filterOrders(allOrders, "confirmed").length,
    draft:       filterOrders(allOrders, "draft").length,
    needs_check: filterOrders(allOrders, "needs_check").length,
    unpaid:      filterOrders(allOrders, "unpaid").length,
  };

  // ── Desktop Layout ─────────────────────────────────────────
  const desktopContent = (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-5 w-full overflow-hidden animate-fade-in mt-1">
      <MetricTabStrip active={activeTab} counts={counts} onSelect={setActiveTab} />

      <div className="bg-white rounded-2xl border border-[#E8E8E6] overflow-hidden shadow-sm flex flex-col flex-1 min-h-0 w-full">
        {/* Table Header */}
        <div className="grid grid-cols-[160px_minmax(0,1fr)_140px_150px_100px_40px] items-center gap-4 px-8 py-4 bg-[#FAFAF8] border-b border-[#F4F4F2] flex-shrink-0">
          {[
            ["No. Order", "w-auto"],
            ["Nama Pelanggan & Detail Menu", "w-auto"],
            ["Status", "w-auto"],
            ["Total Harga", "text-right pr-4"],
            ["Akurasi AI", "text-right pr-4"],
            ["", "w-auto"],
          ].map(([col, cls], i) => (
            <div key={col + i} className={cn("text-[11px] font-black text-[#ADADAD] uppercase tracking-wider", cls)}>
              {col}
            </div>
          ))}
        </div>

        {/* Animated Order Rows Wrapper */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-28 text-center flex flex-col items-center justify-center flex-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-4 shadow-sm">
                <FileText size={26} />
              </div>
              <p className="text-[15px] font-black text-[#1A1A1A] mb-1">Tidak ada pesanan</p>
              <p className="text-[13px] font-medium text-[#888888]">Tidak ada log order ditemukan di kategori ini.</p>
            </motion.div>
          ) : (
            <motion.div 
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="divide-y divide-[#F4F4F2] overflow-y-auto flex-1 min-h-0"
            >
              {filtered.map((order) => (
                <DOrderRow
                  key={order.id}
                  order={order}
                  onClick={() => router.push(`/orders/${order.id}`)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-[13px] text-[#A3A3A3] font-semibold px-2 pb-1 flex-shrink-0"
          >
            <Layers3 size={13} className="text-orange-500" />
            <span>Menampilkan <span className="text-[#1A1A1A] font-black">{filtered.length}</span> order harian</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <Shell
      title="Daftar Pesanan"
      subtitle={`${allOrders.length} order aktif hari ini`}
      headerRight={
        <div className="flex items-center gap-1.5 text-[12px] font-black text-orange-500 bg-orange-50 border border-orange-100 px-4 py-2 rounded-full shadow-sm">
          <Calendar size={12} /> Log Real-time
        </div>
      }
      desktopContent={desktopContent}
    >
      {/* Mobile list view */}
      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Mobile Filter Grid */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          {tabs.slice(0, 4).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "p-4 rounded-xl border text-left flex flex-col justify-between min-h-[76px]",
                activeTab === tab.id ? `${tab.bgActive} text-white` : "bg-white border-[#E8E8E6]"
              )}
            >
              <span className={cn("text-[10px] font-black uppercase tracking-wider", activeTab === tab.id ? "text-white/80" : "text-[#888888]")}>{tab.label}</span>
              <span className="text-lg font-black mt-1">{counts[tab.id]}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-3">
                <FileText size={22} />
              </div>
              <p className="text-[14px] font-bold text-[#1A1A1A] mb-0.5">Tidak ada pesanan</p>
              <p className="text-[12px] text-[#888888]">Kategori ini saat ini masih kosong.</p>
            </motion.div>
          ) : (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4 mt-2"
            >
              <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider px-1">
                {filtered.length} order ditemukan
              </p>
              <div className="flex flex-col gap-4">
                {filtered.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onClick={() => router.push(`/orders/${order.id}`)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={null}>
      <OrdersContent />
    </Suspense>
  );
}
