import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { productionPlan, productionSummary } from "@/lib/dummy-data";
import { formatWeight } from "@/lib/format";
import { NARRATIVE_SAFE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const statusConfig = {
  sufficient: {
    label: "Cukup",
    color: "text-status-confirmed",
    bg: "bg-[#DCFCE7]",
    Icon: CheckCircle,
  },
  low: {
    label: "Perlu tambah",
    color: "text-status-draft",
    bg: "bg-[#FEF3C7]",
    Icon: AlertTriangle,
  },
  insufficient: {
    label: "Kurang",
    color: "text-status-check",
    bg: "bg-[#FEE2E2]",
    Icon: XCircle,
  },
};

export function ProductionPlanCard() {
  return (
    <div className="flex flex-col gap-3">
      {/* Summary header */}
      <div className="card">
        <div className="text-sm font-semibold text-kuali-text-dark">{productionSummary.date}</div>
        <div className="text-xs text-kuali-text-mid mt-0.5">
          Berdasarkan {productionSummary.fromOrders} order dikonfirmasi
        </div>
        <div className="text-xs text-kuali-text-light mt-1">
          {productionSummary.menuList.map((m) => `${m.name} ×${m.qty}`).join(", ")}
        </div>
        <div className="flex items-start gap-1.5 mt-3 bg-kuali-surface-alt rounded-xl p-2.5">
          <Info size={13} className="text-kuali-text-light shrink-0 mt-0.5" />
          <p className="text-[10px] text-kuali-text-light leading-relaxed">
            {NARRATIVE_SAFE.productionNote}
          </p>
        </div>
      </div>

      {/* Ingredient list */}
      {productionPlan.map((item) => {
        const cfg = statusConfig[item.status];
        return (
          <div key={item.name} className="card flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm text-kuali-text-dark">{item.emoji} {item.name}</span>
              <div className={cn("flex items-center gap-1 rounded-badge px-2 py-0.5", cfg.bg)}>
                <cfg.Icon size={12} className={cfg.color} />
                <span className={cn("text-[10px] font-semibold", cfg.color)}>{cfg.label}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 text-xs gap-2">
              <div>
                <div className="text-kuali-text-light">Dibutuhkan</div>
                <div className="font-semibold text-kuali-text-dark">
                  {formatWeight(item.needed, item.unit)}
                </div>
              </div>
              <div>
                <div className="text-kuali-text-light">Stok saat ini</div>
                <div className={cn("font-semibold", item.status === "insufficient" ? "text-status-check" : "text-kuali-text-dark")}>
                  {formatWeight(item.stock, item.unit)}
                </div>
              </div>
              <div>
                <div className="text-kuali-text-light">Selisih</div>
                <div className={cn(
                  "font-semibold",
                  item.needed - item.stock > 0 ? "text-status-check" : "text-status-confirmed"
                )}>
                  {item.needed - item.stock > 0
                    ? `+${formatWeight(item.needed - item.stock, item.unit)} kurang`
                    : formatWeight(item.stock - item.needed, item.unit) + " sisa"}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-kuali-surface-alt rounded-full h-1.5 overflow-hidden">
              <div
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  item.status === "sufficient"
                    ? "bg-status-confirmed"
                    : item.status === "low"
                    ? "bg-status-draft"
                    : "bg-status-check"
                )}
                style={{ width: `${Math.min(100, (item.stock / item.needed) * 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
