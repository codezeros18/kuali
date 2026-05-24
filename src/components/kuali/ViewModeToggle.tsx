"use client";

import { LayoutGrid, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/lib/view-mode";

interface ViewModeToggleProps {
  mode: ViewMode;
  onToggle: () => void;
  className?: string;
}

export function ViewModeToggle({ mode, onToggle, className }: ViewModeToggleProps) {
  const isSimple = mode === "simple";

  return (
    <button
      onClick={onToggle}
      title={isSimple ? "Beralih ke Mode Standar" : "Beralih ke Mode Sederhana"}
      className={cn(
        "flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-1.5 rounded-full border transition-all select-none",
        isSimple
          ? "bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100"
          : "bg-[#FAFAF8] border-[#E8E8E6] text-[#6B6B6B] hover:bg-white hover:border-[#D5D5D3]",
        className
      )}
    >
      {isSimple ? <LayoutGrid size={12} /> : <BarChart2 size={12} />}
      {isSimple ? "Mode Sederhana" : "Mode Standar"}
    </button>
  );
}
