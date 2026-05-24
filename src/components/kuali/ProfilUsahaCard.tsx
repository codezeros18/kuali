"use client";

import { Store, MapPin, Phone, LayoutGrid, BarChart2, QrCode, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/lib/view-mode";

interface ProfilUsahaCardProps {
  mode: ViewMode;
  onToggleMode: () => void;
}

const PROFIL = {
  namaUsaha: "Katering Bu Rani",
  jenisUsaha: "Catering rumahan & nasi box pre-order",
  area: "Kelapa Dua, Depok",
  whatsapp: "08XX-XXXX-XXXX",
  menuAktif: 5,
  qris: "CONTOH — BUKAN UNTUK PEMBAYARAN",
};

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#F4F4F2] last:border-0">
      <div className="w-8 h-8 rounded-lg bg-[#F4F4F2] flex items-center justify-center shrink-0 text-[#6B6B6B] mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold text-[#ADADAD] uppercase tracking-wider">{label}</p>
        <p className="text-[14px] font-bold text-[#1A1A1A] mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export function ProfilUsahaCard({ mode, onToggleMode }: ProfilUsahaCardProps) {
  const isSimple = mode === "simple";

  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-[#E8E8E6] flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0">
          <Store size={20} className="text-orange-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-wider">Profil Usaha</p>
          <p className="text-[16px] font-black text-[#1A1A1A] tracking-tight truncate">{PROFIL.namaUsaha}</p>
        </div>
      </div>

      {/* Info rows */}
      <div className="px-5">
        <Row icon={<UtensilsCrossed size={15} />} label="Jenis Usaha" value={PROFIL.jenisUsaha} />
        <Row icon={<MapPin size={15} />} label="Area" value={PROFIL.area} />
        <Row icon={<Phone size={15} />} label="WhatsApp" value={PROFIL.whatsapp} />
        <Row icon={<UtensilsCrossed size={15} />} label="Menu Aktif" value={`${PROFIL.menuAktif} jenis menu`} />
        <Row icon={<QrCode size={15} />} label="QRIS" value={PROFIL.qris} />
      </div>

      {/* Mode tampilan toggle */}
      <div className="px-5 py-4 bg-[#FAFAF8] border-t border-[#F4F4F2]">
        <p className="text-[11px] font-black text-[#ADADAD] uppercase tracking-wider mb-3">Mode Tampilan</p>
        <div className="flex gap-2">
          <button
            onClick={() => isSimple || onToggleMode()}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[13px] font-bold transition-all",
              isSimple
                ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                : "bg-white border-[#E8E8E6] text-[#6B6B6B] hover:border-orange-200 hover:text-orange-500"
            )}
          >
            <LayoutGrid size={14} />
            Mode Sederhana
          </button>
          <button
            onClick={() => isSimple && onToggleMode()}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[13px] font-bold transition-all",
              !isSimple
                ? "bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-sm"
                : "bg-white border-[#E8E8E6] text-[#6B6B6B] hover:border-[#ADADAD] hover:text-[#1A1A1A]"
            )}
          >
            <BarChart2 size={14} />
            Mode Standar
          </button>
        </div>
        <p className="text-[11px] text-[#ADADAD] font-medium mt-2.5 leading-relaxed">
          Pilihan tersimpan di perangkat ini. Dapat diubah kapan saja.
        </p>
      </div>
    </div>
  );
}
