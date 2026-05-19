"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShoppingBasket, CheckCircle, AlertTriangle, XCircle, ChefHat, Layers3, ChevronRight } from "lucide-react";
import { Shell } from "@/components/kuali/AppShell";
import { ProductionPlanCard } from "@/components/kuali/ProductionPlanCard";
import { NARRATIVE_SAFE } from "@/lib/constants";

interface ApiIngredient {
  ingredientId: string;
  name: string;
  unit: string;
  needed: number;
  stock: number;
  status: "sufficient" | "low" | "insufficient";
}

interface ProductionPlan {
  confirmedOrderCount: number;
  totalItemCount: number;
  ingredientNeeds: ApiIngredient[];
}

type FilterStatus = "all" | "sufficient" | "low" | "insufficient";

const statusConfig = {
  sufficient:   { label: "Cukup",       Icon: CheckCircle,  bg: "bg-green-50 text-green-700",     bgActive: "bg-green-600",  borderActive: "border-green-600",  textActive: "text-white", bar: "bg-green-500", ring: "border-green-100" },
  low:          { label: "Hampir Habis", Icon: AlertTriangle,bg: "bg-amber-50 text-amber-700",   bgActive: "bg-amber-500",  borderActive: "border-amber-500",  textActive: "text-white", bar: "bg-amber-500", ring: "border-amber-100" },
  insufficient: { label: "Perlu Beli",  Icon: XCircle,      bg: "bg-red-50 text-red-700",         bgActive: "bg-red-600",    borderActive: "border-red-600",    textActive: "text-white", bar: "bg-red-500",   ring: "border-red-100" },
};

// ── Motion Animation Variants ────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.02 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 28 } }
};

// ── Desktop Table Row (Rapi, Presisi & Sejajar) ──────────────────────────
function IngredientRow({ item }: { item: ApiIngredient }) {
  const cfg = statusConfig[item.status];
  const pct = Math.min(100, Math.round((item.stock / Math.max(item.needed, 0.001)) * 100));

  return (
    <motion.div variants={itemVariants} className="w-full">
      <div className="grid grid-cols-[200px_1fr_160px_160px_160px] items-center gap-6 px-8 py-5 border-b border-[#F4F4F2] last:border-0 hover:bg-[#FAFAF8] transition-colors w-full text-left group relative">
        
        {/* 1. Nama Bahan Baku */}
        <div className="flex items-center gap-3 pr-2">
          <div className="w-9 h-9 rounded-xl bg-[#FAFAF8] border border-[#E8E8E6] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
            <ShoppingBasket size={15} className="text-[#6B6B6B]" />
          </div>
          <span className="font-black text-[14px] text-[#1A1A1A] tracking-tight">{item.name}</span>
        </div>

        {/* 2. Visual Progres Bar & Rasio Stok */}
        <div className="flex items-center gap-4 w-full pr-6">
          <div className="flex-1 h-2 bg-[#F4F4F2] rounded-full overflow-hidden shadow-inner relative">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: pct / 100 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={cn("h-full rounded-full origin-left", cfg.bar)} 
            />
          </div>
          <span className="text-[13px] font-mono font-bold text-[#6B6B6B] shrink-0 w-10 text-right">{pct}%</span>
        </div>

        {/* 3. Status Badge Kuali */}
        <div className="flex items-center">
          <span className={cn(
            "flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm",
            cfg.bg, cfg.ring
          )}>
            <cfg.Icon size={12} strokeWidth={2.5} /> {cfg.label}
          </span>
        </div>

        {/* 4. Kebutuhan Porsi Dapur */}
        <div className="text-right pr-4">
          <span className="text-[15px] font-black text-[#1A1A1A] tracking-tight">{item.needed}</span>
          <span className="text-[13px] font-bold text-[#888888] ml-1">{item.unit}</span>
        </div>

        {/* 5. Sisa Stok Gudang */}
        <div className="text-right pr-4">
          <span className="text-[15px] font-black text-[#1A1A1A] tracking-tight">{item.stock}</span>
          <span className="text-[13px] font-bold text-[#888888] ml-1">{item.unit}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Filter Tugas Berbentuk Card Statistik Persegi (Highlight Focus Sparkline) ──
function MetricTabStrip({
  active, totals, onSelect
}: {
  active: FilterStatus;
  totals: Record<FilterStatus, number>;
  onSelect: (t: FilterStatus) => void;
}) {
  const cards = [
    { id: "all" as const, label: "Semua Bahan", colorClass: "bg-gray-100 text-gray-700", bgActive: "bg-orange-500", borderActive: "border-orange-500", textActive: "text-white", path: "M0 24 L20 18 L40 22 L60 14 L80 16 L100 8 L120 12 L140 4", stroke: "#F97316" },
    { id: "sufficient" as const, label: "Stok Cukup", colorClass: statusConfig.sufficient.bg, bgActive: statusConfig.sufficient.bgActive, borderActive: statusConfig.sufficient.borderActive, textActive: statusConfig.sufficient.textActive, path: "M0 20 L20 18 L40 22 L60 14 L80 16 L100 8 L120 10 L140 2", stroke: "#16A34A" },
    { id: "low" as const, label: "Hampir Habis", colorClass: statusConfig.low.bg, bgActive: statusConfig.low.bgActive, borderActive: statusConfig.low.borderActive, textActive: statusConfig.low.textActive, path: "M0 26 L20 24 L40 25 L60 20 L80 22 L100 16 L120 18 L140 14", stroke: "#D97706" },
    { id: "insufficient" as const, label: "Perlu Beli", colorClass: statusConfig.insufficient.bg, bgActive: statusConfig.insufficient.bgActive, borderActive: statusConfig.insufficient.borderActive, textActive: statusConfig.insufficient.textActive, path: "M0 32 L20 31 L40 32 L60 29 L80 30 L100 26 L120 28 L140 26", stroke: "#DC2626" },
  ];

  const [hoveredCard, setHoveredCard] = useState<FilterStatus | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full relative z-10 flex-shrink-0">
      {cards.map((card) => {
        const isActive = active === card.id;
        const showFullOpacity = hoveredCard === null || hoveredCard === card.id;

        return (
          <button
            key={card.id}
            onClick={() => onSelect(card.id)}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={cn(
              "p-5 rounded-xl text-left border flex flex-col justify-between min-h-[160px] transition-all shadow-sm relative overflow-hidden group select-none",
              isActive 
                ? `${card.bgActive} ${card.borderActive} ${card.textActive}`
                : "bg-white border-[#E8E8E6] text-[#1A1A1A] hover:border-gray-300"
            )}
          >
            {/* Top Row: Label & Counter Badge */}
            <div className="flex items-center justify-between w-full">
              <span className={cn(
                "text-[11px] font-black uppercase tracking-wider",
                isActive ? "text-white/80" : "text-[#888888]"
              )}>
                {card.label}
              </span>
              <span className={cn(
                "text-[11px] font-black rounded-lg px-2 py-0.5 min-w-[22px] text-center shadow-sm",
                isActive ? "bg-white/20 text-white" : card.colorClass
              )}>
                {totals[card.id]}
              </span>
            </div>

            {/* Middle Row: Multi-Sparkline Focus Integration */}
            <div className="w-full h-8 mt-4 mb-2 relative">
              <svg width="100%" height="100%" viewBox="0 0 140 36" preserveAspectRatio="none">
                <path 
                  d={card.path} 
                  fill="none" 
                  stroke={isActive ? "#FFFFFF" : card.stroke} 
                  strokeWidth={showFullOpacity ? 2.2 : 1.0} 
                  strokeOpacity={showFullOpacity ? 1.0 : 0.14}
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="transition-all duration-300"
                />
              </svg>
            </div>
            
            {/* Bottom Row: Large Counter View */}
            <div className="flex items-baseline justify-between w-full mt-1">
              <span className={cn(
                "text-2xl font-black tracking-tight leading-none",
                isActive ? "text-white" : "text-[#1A1A1A]"
              )}>
                {totals[card.id]}
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

export default function ProductionPage() {
  const [plan, setPlan] = useState<ProductionPlan | null>(null);
  const [activeTab, setActiveTab] = useState<FilterStatus>("all");

  useEffect(() => {
    fetch("/api/production-plan")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setPlan(data); })
      .catch(() => null);
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });

  const allIngredients = plan?.ingredientNeeds ?? [];
  const confirmedCount = plan?.confirmedOrderCount ?? 5;

  // Filter logika data bahan baku
  const filteredIngredients = allIngredients.filter((item) => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });

  const statusTotals = {
    all:          allIngredients.length,
    sufficient:   allIngredients.filter((i) => i.status === "sufficient").length,
    low:          allIngredients.filter((i) => i.status === "low").length,
    insufficient: allIngredients.filter((i) => i.status === "insufficient").length,
  };

  // ── Desktop Layout Viewport Locked (No Scroll Luar) ───────────────────
  const desktopContent = (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-5 w-full px-6 overflow-hidden animate-fade-in mt-1">

      {/* Info bar top header widget */}
      <div className="bg-white rounded-2xl border border-[#E8E8E6] p-5 flex items-center gap-5 flex-shrink-0 shadow-sm w-full">
        <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 shadow-sm">
          <ChefHat size={22} className="text-orange-500" />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-0.5">Estimasi Kebutuhan Belanja</p>
          <p className="font-black text-[16px] text-[#1A1A1A] tracking-tight">
            Rencana Produksi Untuk {tomorrowStr}
          </p>
          <p className="text-[13px] text-[#6B6B6B] font-medium mt-1">
            <span className="text-[#1A1A1A] font-bold">{confirmedCount}</span> pesanan dikonfirmasi <span className="mx-1 text-gray-300">·</span> <span className="text-[#1A1A1A] font-bold">{plan?.totalItemCount ?? 58}</span> total porsi item masakan
          </p>
        </div>
        <p className="text-[12px] text-[#ADADAD] font-medium max-w-[240px] text-right leading-relaxed hidden lg:block">
          {NARRATIVE_SAFE.productionNote}
        </p>
      </div>

      {allIngredients.length > 0 ? (
        <>
          {/* Card Statistik Filter Persegi Multi-Sparkline */}
          <MetricTabStrip active={activeTab} totals={statusTotals} onSelect={setActiveTab} />

          {/* Tabel Utama Bahan Baku (Scroll Internal Terkunci) */}
          <div className="bg-white rounded-2xl border border-[#E8E8E6] overflow-hidden shadow-sm flex flex-col flex-1 min-h-0 w-full">
            
            {/* Header Tabel Grid Pas dan Presisi */}
            <div className="grid grid-cols-[200px_1fr_160px_160px_160px] items-center gap-4 px-8 py-4 bg-[#FAFAF8] border-b border-[#F4F4F2] flex-shrink-0 w-full">
              {[
                ["Nama Bahan Mentah", ""],
                ["Rasio Pemenuhan Stok", ""],
                ["Status Kecukupan", ""],
                ["Kebutuhan Dapur", "text-right pr-4"],
                ["Stok Saat Ini", "text-right pr-4"],
              ].map(([col, cls], idx) => (
                <div key={idx} className={cn("text-[11px] font-black text-[#ADADAD] uppercase tracking-wider", cls)}>
                  {col}
                </div>
              ))}
            </div>

            {/* Konten Data Baris Tabel (Scrollable internal) */}
            <AnimatePresence mode="wait">
              {filteredIngredients.length === 0 ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-24 text-center flex flex-col items-center justify-center flex-1"
                >
                  <p className="text-4xl mb-3">📋</p>
                  <p className="text-[14px] font-bold text-[#1A1A1A]">Bahan baku tidak ditemukan</p>
                  <p className="text-[13px] text-[#888888] mt-0.5">Tidak ada bahan baku dengan kategori status ini.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key={activeTab}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="divide-y divide-[#F4F4F2] overflow-y-auto flex-1 min-h-0 w-full no-scrollbar"
                >
                  {filteredIngredients.map((item) => (
                    <IngredientRow key={item.ingredientId} item={item} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Log Items */}
          <AnimatePresence mode="wait">
            {filteredIngredients.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-[13px] text-[#A3A3A3] font-semibold px-2 flex-shrink-0 pb-1"
              >
                <Layers3 size={13} className="text-orange-500" />
                <span>Terdeteksi <span className="text-[#1A1A1A] font-black">{filteredIngredients.length}</span> jenis bahan masakan dapur harian</span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E8E8E6] p-20 text-center flex flex-col items-center justify-center flex-1 shadow-sm w-full">
          <p className="text-5xl mb-4">🍳</p>
          <p className="font-black text-[16px] text-[#1A1A1A] tracking-tight">Belum ada pesanan dikonfirmasi</p>
          <p className="text-[13px] text-[#6B6B6B] mt-1 max-w-xs leading-relaxed">Rencana kalkulasi belanja bahan produksi otomatis akan muncul seketika setelah order chat pelanggan disetujui harian.</p>
        </div>
      )}
    </div>
  );

  return (
    <Shell
      title="Rencana Produksi"
      subtitle={`Untuk besok, ${tomorrowStr}`}
      desktopContent={desktopContent}
    >
      {/* Mobile view standard card sync */}
      <div className="px-4 py-5 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          {cardsMobileShort(statusTotals).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "p-4 rounded-xl border text-left flex flex-col justify-between min-h-[76px]",
                activeTab === tab.id ? `${tab.bgActive} text-white` : "bg-white border-[#E8E8E6]"
              )}
            >
              <span className={cn("text-[10px] font-black uppercase tracking-wider", activeTab === tab.id ? "text-white/80" : "text-[#888888]")}>{tab.label}</span>
              <span className="text-lg font-black mt-1">{statusTotals[tab.id]}</span>
            </button>
          ))}
        </div>
        <div className="mt-2">
          <ProductionPlanCard />
        </div>
      </div>
    </Shell>
  );
}

// Fungsi helper statis data mobile view
function cardsMobileShort(totals: any) {
  return [
    { id: "all" as const, label: "Semua", bgActive: "bg-orange-500" },
    { id: "sufficient" as const, label: "Cukup", bgActive: "bg-green-600" },
    { id: "low" as const, label: "Menipis", bgActive: "bg-amber-500" },
    { id: "insufficient" as const, label: "Kurang", bgActive: "bg-red-600" },
  ];
}
