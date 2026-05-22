"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ClipboardList, CreditCard, ChefHat, MessageCircle, ChevronRight,
} from "lucide-react";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

interface SimpleDashboardMetrics {
  needsReview: number;
  unpaidOrders: number;
  unpaidAmount: number;
  totalOrdersToday: number;
}

interface SimpleDashboardViewProps {
  metrics: SimpleDashboardMetrics;
}

function StatusRow({
  icon, label, value, unit, subValue, accent = "neutral", onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | null;
  unit: string;
  subValue?: string;
  accent?: "danger" | "warning" | "ok" | "neutral";
  onClick: () => void;
}) {
  const colors = {
    danger:  { bg: "bg-red-50 border-red-200",    icon: "bg-red-100 text-red-600",    text: "text-red-700",    val: "text-red-700" },
    warning: { bg: "bg-amber-50 border-amber-200", icon: "bg-amber-100 text-amber-700", text: "text-amber-800", val: "text-amber-800" },
    ok:      { bg: "bg-green-50 border-green-200", icon: "bg-green-100 text-green-700", text: "text-green-800", val: "text-green-800" },
    neutral: { bg: "bg-white border-[#E8E8E6]",    icon: "bg-[#F4F4F2] text-[#555]",   text: "text-[#555555]", val: "text-[#1A1A1A]" },
  }[accent];

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-4 rounded-2xl border text-left transition-all w-full group",
        colors.bg,
        "hover:shadow-sm"
      )}
    >
      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", colors.icon)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("text-[13px] font-bold leading-snug", colors.text)}>{label}</p>
        {value !== null ? (
          <p className={cn("text-[22px] font-black leading-tight tracking-tight mt-0.5", colors.val)}>
            {value} <span className="text-[14px] font-semibold">{unit}</span>
          </p>
        ) : (
          <p className={cn("text-[13px] font-semibold mt-0.5", colors.val)}>{unit}</p>
        )}
        {subValue && (
          <p className="text-[12px] font-bold text-[#6B6B6B] mt-0.5">{subValue}</p>
        )}
      </div>
      <ChevronRight size={16} className="text-[#C8C8C6] group-hover:translate-x-0.5 transition-transform shrink-0" />
    </motion.button>
  );
}

function BigCTA({
  label, icon, onClick, primary = false,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.012, boxShadow: primary ? "0 8px 20px rgba(232,84,26,0.18)" : undefined }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-[15px] transition-all",
        primary
          ? "bg-orange-500 text-white shadow-sm hover:bg-orange-600"
          : "bg-white border border-[#E5E5E3] text-[#1A1A1A] hover:bg-[#FAFAF8] shadow-sm"
      )}
    >
      {icon}
      {label}
    </motion.button>
  );
}

export function SimpleDashboardView({ metrics }: SimpleDashboardViewProps) {
  const router = useRouter();
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long",
  });

  const needsReviewAccent = metrics.needsReview > 0 ? "danger" : "ok";
  const unpaidAccent = metrics.unpaidOrders > 0 ? "warning" : "ok";

  return (
    <div className="flex flex-col gap-5 w-full animate-fade-in">

      {/* Greeting */}
      <div className="pt-1">
        <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
          Selamat datang, Bu Rani 👋
        </h2>
        <p className="text-[14px] font-medium text-[#6B6B6B] mt-0.5">
          {today} <span className="mx-1 text-[#CECECE]">·</span>{" "}
          <span className="text-orange-500 font-bold">{metrics.totalOrdersToday}</span> pesanan aktif
        </p>
      </div>

      {/* Status rows */}
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-black text-[#ADADAD] uppercase tracking-wider">Yang perlu diperhatikan</p>

        <StatusRow
          icon={<ClipboardList size={20} />}
          label="Pesanan perlu dicek"
          value={metrics.needsReview}
          unit="pesanan"
          accent={needsReviewAccent}
          onClick={() => router.push("/orders?filter=needs_check")}
        />

        <StatusRow
          icon={<CreditCard size={20} />}
          label="Pelanggan belum bayar"
          value={metrics.unpaidOrders}
          unit="order"
          subValue={metrics.unpaidOrders > 0 ? `Total ${formatRupiah(metrics.unpaidAmount)}` : undefined}
          accent={unpaidAccent}
          onClick={() => router.push("/orders?filter=unpaid")}
        />

        <StatusRow
          icon={<ChefHat size={20} />}
          label="Bahan untuk produksi"
          value={null}
          unit="Lihat rencana produksi →"
          accent="neutral"
          onClick={() => router.push("/production")}
        />
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col gap-3 pt-1">
        <p className="text-[11px] font-black text-[#ADADAD] uppercase tracking-wider">Aksi cepat</p>

        <BigCTA
          label="Tinjau Pesanan"
          icon={<ClipboardList size={18} />}
          onClick={() => router.push("/orders?filter=needs_check")}
          primary
        />
        <BigCTA
          label="Kirim Pengingat Bayar"
          icon={<CreditCard size={18} />}
          onClick={() => router.push("/orders?filter=unpaid")}
        />
        <BigCTA
          label="Lihat Rencana Bahan"
          icon={<ChefHat size={18} />}
          onClick={() => router.push("/production")}
        />
        <BigCTA
          label="Proses Chat Baru"
          icon={<MessageCircle size={18} />}
          onClick={() => router.push("/demo")}
        />
      </div>
    </div>
  );
}
