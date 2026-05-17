"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shell, SectionTitle } from "@/components/kuali/AppShell";
import { StatusBadge } from "@/components/kuali/StatusBadge";
import { OrderCard } from "@/components/kuali/OrderCard";
import { orders as dummyOrders } from "@/lib/dummy-data";
import type { Order } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type FilterTab = "all" | "confirmed" | "draft" | "needs_check" | "unpaid";

const tabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "confirmed", label: "Dikonfirmasi" },
  { id: "draft", label: "Draft" },
  { id: "needs_check", label: "Perlu Cek" },
  { id: "unpaid", label: "Belum Bayar" },
];

function filterOrders(list: Order[], tab: FilterTab): Order[] {
  switch (tab) {
    case "confirmed": return list.filter((o) => o.status === "confirmed");
    case "draft": return list.filter((o) => o.status === "draft");
    case "needs_check": return list.filter((o) => o.status === "needs_check");
    case "unpaid": return list.filter((o) => o.paymentStatus === "unpaid");
    default: return list;
  }
}

interface ApiOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  confidenceScore: number;
  deliveryDate: string | null;
  deliveryTime: string | null;
  createdAt: string;
  items: { menuName: string; qty: number }[];
}

function apiOrderToOrder(o: ApiOrder): Order {
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    customerName: o.customerName,
    items: o.items.map((i) => `${i.qty}x ${i.menuName}`).join(", "),
    totalAmount: o.totalAmount,
    deliveryDate: o.deliveryDate ?? "",
    deliveryTime: o.deliveryTime ?? "",
    status: o.status as Order["status"],
    paymentStatus: o.paymentStatus as Order["paymentStatus"],
    confidenceScore: o.confidenceScore,
  };
}

// Desktop table row
function DesktopOrderRow({ order, onClick }: { order: Order; onClick: () => void }) {
  const confidence = typeof order.confidenceScore === "number"
    ? Math.round(order.confidenceScore > 1 ? order.confidenceScore : order.confidenceScore * 100)
    : 0;
  const confColor = confidence >= 85 ? "text-green-600" : confidence >= 70 ? "text-yellow-600" : "text-red-500";

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 px-5 py-3.5 border-b border-kuali-border last:border-0 hover:bg-kuali-surface-alt/60 transition-colors w-full text-left group"
    >
      <div className="w-36 shrink-0">
        <span className="text-xs font-mono text-kuali-text-mid">{order.orderNumber}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-kuali-text-dark truncate">{order.customerName}</div>
        <div className="text-xs text-kuali-text-light truncate">{order.items}</div>
      </div>
      <StatusBadge status={order.status as "draft" | "confirmed" | "needs_check" | "completed" | "cancelled"} />
      <div className="w-32 shrink-0 text-right">
        <div className="text-sm font-semibold text-kuali-text-dark">{formatRupiah(order.totalAmount)}</div>
        <div className={`text-xs ${order.paymentStatus === "paid" ? "text-green-600" : "text-amber-600"}`}>
          {order.paymentStatus === "paid" ? "Lunas" : "Belum bayar"}
        </div>
      </div>
      <div className={`w-12 shrink-0 text-right text-xs font-bold ${confColor}`}>
        {confidence > 0 ? `${confidence}%` : "—"}
      </div>
      <ChevronRight size={14} className="text-kuali-text-light group-hover:text-kuali-primary transition-colors shrink-0" />
    </button>
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
      .catch(() => {/* keep dummy-data fallback */});
  }, []);

  const filtered = filterOrders(allOrders, activeTab);

  // ── Desktop content ──────────────────────────────────────────────────────────
  const desktopContent = (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {tabs.map((tab) => {
          const count = tab.id === "all" ? allOrders.length : filterOrders(allOrders, tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2",
                activeTab === tab.id
                  ? "bg-kuali-primary text-white shadow-sm"
                  : "bg-white text-kuali-text-mid hover:bg-kuali-surface-alt border border-kuali-border"
              )}
            >
              {tab.label}
              <span className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-kuali-surface-alt text-kuali-text-mid"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {/* Table header */}
        <div className="flex items-center gap-4 px-5 py-3 bg-kuali-surface-alt border-b border-kuali-border">
          {["No. Order", "Pelanggan", "Status", "Total", "AI", ""].map((col, i) => (
            <div
              key={col + i}
              className={cn(
                "text-[10px] font-semibold text-kuali-text-light uppercase tracking-wide",
                i === 0 ? "w-36 shrink-0" :
                i === 1 ? "flex-1" :
                i === 2 ? "shrink-0 w-24" :
                i === 3 ? "w-32 shrink-0 text-right" :
                i === 4 ? "w-12 shrink-0 text-right" :
                "w-4 shrink-0"
              )}
            >
              {col}
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-sm text-kuali-text-mid">Tidak ada order di kategori ini.</p>
          </div>
        ) : (
          filtered.map((order) => (
            <DesktopOrderRow
              key={order.id}
              order={order}
              onClick={() => router.push(`/orders/${order.id}`)}
            />
          ))
        )}
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-kuali-text-light">{filtered.length} order ditemukan</p>
      )}
    </div>
  );

  return (
    <Shell
      title="Daftar Pesanan"
      subtitle={`${allOrders.length} order hari ini`}
      desktopContent={desktopContent}
    >
      {/* Mobile content */}
      {/* Filter tabs */}
      <div className="bg-white border-b border-kuali-border sticky top-[61px] z-10">
        <div className="flex overflow-x-auto no-scrollbar px-4 py-2 gap-2">
          {tabs.map((tab) => {
            const count = tab.id === "all" ? allOrders.length : filterOrders(allOrders, tab.id).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-badge text-xs font-medium transition-colors flex items-center gap-1.5",
                  activeTab === tab.id
                    ? "bg-kuali-primary text-white"
                    : "bg-kuali-surface-alt text-kuali-text-mid"
                )}
              >
                {tab.label}
                {count > 0 && (
                  <span className={cn(
                    "rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold",
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-kuali-border text-kuali-text-mid"
                  )}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-3xl mb-3">📋</div>
            <p className="text-sm text-kuali-text-mid">Tidak ada order di kategori ini.</p>
          </div>
        ) : (
          <>
            <SectionTitle>{filtered.length} order ditemukan</SectionTitle>
            {filtered.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => router.push(`/orders/${order.id}`)}
              />
            ))}
          </>
        )}
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
