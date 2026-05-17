"use client";

import { useEffect, useState } from "react";
import { Shell } from "@/components/kuali/AppShell";
import { ProductionPlanCard } from "@/components/kuali/ProductionPlanCard";
import { productionPlan as dummyIngredients } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { ShoppingBasket, CheckCircle, AlertTriangle, XCircle, ChefHat } from "lucide-react";
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

function statusConfig(s: string) {
  if (s === "sufficient") return { label: "Cukup", color: "text-green-600 bg-green-50", Icon: CheckCircle };
  if (s === "low") return { label: "Hampir Habis", color: "text-yellow-600 bg-yellow-50", Icon: AlertTriangle };
  return { label: "Perlu Beli", color: "text-red-600 bg-red-50", Icon: XCircle };
}

function IngredientRow({ item }: { item: ApiIngredient }) {
  const cfg = statusConfig(item.status);
  const pct = Math.min(100, Math.round((item.stock / Math.max(item.needed, 0.001)) * 100));
  const barColor = item.status === "sufficient" ? "bg-green-500" : item.status === "low" ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-kuali-surface-alt flex items-center justify-center shrink-0">
            <ShoppingBasket size={15} className="text-kuali-text-mid" />
          </div>
          <span className="font-semibold text-sm text-kuali-text-dark">{item.name}</span>
        </div>
        <span className={cn("flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full shrink-0", cfg.color)}>
          <cfg.Icon size={10} />
          {cfg.label}
        </span>
      </div>

      <div className="flex items-end justify-between text-xs">
        <div>
          <span className="text-kuali-text-light">Butuh </span>
          <span className="font-semibold text-kuali-text-dark">{item.needed} {item.unit}</span>
        </div>
        <div className="text-right">
          <span className="text-kuali-text-light">Stok </span>
          <span className="font-semibold text-kuali-text-dark">{item.stock} {item.unit}</span>
        </div>
      </div>

      <div className="h-1.5 bg-kuali-surface-alt rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-700", barColor)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function ProductionPage() {
  const [plan, setPlan] = useState<ProductionPlan | null>(null);

  useEffect(() => {
    fetch("/api/production-plan")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setPlan(data); })
      .catch(() => null);
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });

  const ingredients = plan?.ingredientNeeds ?? [];
  const confirmedCount = plan?.confirmedOrderCount ?? 5;

  // Desktop content
  const desktopContent = (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Info bar */}
      <div className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
          <ChefHat size={22} className="text-kuali-primary" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-kuali-text-dark">Produksi untuk {tomorrowStr}</p>
          <p className="text-sm text-kuali-text-mid mt-0.5">
            Berdasarkan {confirmedCount} pesanan dikonfirmasi · {plan?.totalItemCount ?? 58} total item
          </p>
        </div>
        <p className="text-[10px] text-kuali-text-light max-w-[180px] text-right">{NARRATIVE_SAFE.productionNote}</p>
      </div>

      {/* Ingredient grid */}
      {ingredients.length > 0 ? (
        <>
          <div>
            <h2 className="text-sm font-semibold text-kuali-text-dark mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
              Bahan yang Perlu Disiapkan
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {ingredients.map((item) => (
                <IngredientRow key={item.ingredientId} item={item} />
              ))}
            </div>
          </div>

          {/* Status summary */}
          <div className="grid grid-cols-3 gap-4">
            {(["sufficient", "low", "insufficient"] as const).map((s) => {
              const cfg = statusConfig(s);
              const count = ingredients.filter((i) => i.status === s).length;
              return (
                <div key={s} className={cn("rounded-2xl p-4 flex items-center gap-3", cfg.color.split(" ")[1], "border border-current/10")}>
                  <cfg.Icon size={20} className={cfg.color.split(" ")[0]} />
                  <div>
                    <div className={cn("text-xl font-bold", cfg.color.split(" ")[0])}>{count}</div>
                    <div className="text-xs text-kuali-text-mid">{cfg.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-card p-12 text-center">
          <div className="text-5xl mb-4">🍳</div>
          <p className="font-semibold text-kuali-text-dark">Belum ada pesanan dikonfirmasi</p>
          <p className="text-sm text-kuali-text-mid mt-1">Rencana produksi akan muncul setelah order disetujui</p>
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
      {/* Mobile content */}
      <div className="px-4 py-4">
        <ProductionPlanCard />
      </div>
    </Shell>
  );
}
