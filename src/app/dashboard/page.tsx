"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MessageCircle, TrendingUp, CheckCircle2, Clock,
  AlertTriangle, CreditCard, ArrowRight, ChevronRight, Zap,
} from "lucide-react";
import { Shell, SectionTitle } from "@/components/kuali/AppShell";
import { MetricCard } from "@/components/kuali/MetricCard";
import { OrderCard } from "@/components/kuali/OrderCard";
import { StatusBadge } from "@/components/kuali/StatusBadge";
import { formatRupiah } from "@/lib/format";
import { dashboardMetrics, orders as dummyOrders, business } from "@/lib/dummy-data";
import type { Order } from "@/lib/dummy-data";

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

function DesktopMetricCard({ label, value, sublabel, icon: Icon, colorClass, onClick }: {
  label: string; value: number | string; sublabel?: string;
  icon: React.ElementType; colorClass: string; onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl shadow-card p-5 text-left hover:shadow-card-hover transition-shadow w-full group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
          <Icon size={20} />
        </div>
        <ChevronRight size={16} className="text-kuali-text-light group-hover:text-kuali-primary transition-colors mt-1" />
      </div>
      <div className="text-3xl font-bold text-kuali-text-dark mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
        {value}
      </div>
      <div className="text-sm font-medium text-kuali-text-mid">{label}</div>
      {sublabel && <div className="text-xs text-kuali-text-light mt-0.5">{sublabel}</div>}
    </button>
  );
}

function DesktopOrderRow({ order, onClick }: { order: Order; onClick: () => void }) {
  const confidence = typeof order.confidenceScore === "number"
    ? Math.round(order.confidenceScore > 1 ? order.confidenceScore : order.confidenceScore * 100)
    : 0;
  const confColor = confidence >= 85 ? "text-green-600" : confidence >= 70 ? "text-yellow-600" : "text-red-500";

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 px-5 py-3.5 border-b border-kuali-border last:border-0 hover:bg-kuali-surface-alt/60 transition-colors w-full text-left"
    >
      <div className="w-36 shrink-0">
        <span className="text-xs font-mono text-kuali-text-mid">{order.orderNumber}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-kuali-text-dark truncate">{order.customerName}</div>
        <div className="text-xs text-kuali-text-light truncate">{order.items}</div>
      </div>
      <StatusBadge status={order.status as "draft" | "confirmed" | "needs_check" | "completed" | "cancelled"} />
      <div className="w-28 shrink-0 text-right">
        <div className="text-sm font-semibold text-kuali-text-dark">{formatRupiah(order.totalAmount)}</div>
        <div className={`text-xs ${order.paymentStatus === "paid" ? "text-green-600" : "text-amber-600"}`}>
          {order.paymentStatus === "paid" ? "Lunas" : "Belum bayar"}
        </div>
      </div>
      <div className={`w-12 shrink-0 text-right text-xs font-bold ${confColor}`}>
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

  // ── Desktop layout ──────────────────────────────────────────────────────────
  const desktopContent = (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-bold text-kuali-text-dark" style={{ fontFamily: "Poppins, sans-serif" }}>
          Selamat datang, Bu Rani 👋
        </h2>
        <p className="text-sm text-kuali-text-mid mt-0.5">{today} · {metrics.totalOrdersToday} pesanan aktif hari ini</p>
      </div>

      {/* 4 Metric cards */}
      <div className="grid grid-cols-4 gap-4">
        <DesktopMetricCard label="Total Order" value={metrics.totalOrdersToday}
          sublabel="Hari ini" icon={TrendingUp} colorClass="bg-blue-50 text-blue-600"
          onClick={() => router.push("/orders")} />
        <DesktopMetricCard label="Dikonfirmasi" value={metrics.confirmed}
          sublabel="Siap produksi" icon={CheckCircle2} colorClass="bg-green-50 text-green-600"
          onClick={() => router.push("/orders?filter=confirmed")} />
        <DesktopMetricCard label="Draft / Pending" value={metrics.draftPending}
          sublabel="Menunggu review" icon={Clock} colorClass="bg-yellow-50 text-yellow-600"
          onClick={() => router.push("/orders?filter=draft")} />
        <DesktopMetricCard label="Perlu Dicek" value={metrics.needsReview}
          sublabel="Confidence rendah" icon={AlertTriangle} colorClass="bg-red-50 text-red-500"
          onClick={() => router.push("/orders?filter=needs_check")} />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Unpaid banner */}
        <div className="col-span-2 bg-[#FEF3C7] rounded-2xl border border-yellow-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
            <CreditCard size={22} className="text-yellow-700" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-yellow-700 mb-0.5">Total Belum Dibayar</p>
            <p className="text-2xl font-bold text-kuali-text-dark" style={{ fontFamily: "Poppins, sans-serif" }}>
              {formatRupiah(metrics.unpaidAmount)}
            </p>
            <p className="text-xs text-kuali-text-mid mt-0.5">Dari {metrics.unpaidOrders} order dikonfirmasi</p>
          </div>
          <button onClick={() => router.push("/orders?filter=unpaid")}
            className="flex items-center gap-1 text-sm font-semibold text-yellow-700 hover:text-yellow-900 shrink-0">
            Lihat <ArrowRight size={14} />
          </button>
        </div>

        {/* Parse rate */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-kuali-primary" />
            <span className="text-xs font-semibold text-kuali-text-mid">Chat Berhasil Diparse</span>
          </div>
          <div className="flex items-end gap-1.5 mb-2">
            <span className="text-3xl font-bold text-kuali-primary" style={{ fontFamily: "Poppins, sans-serif" }}>
              {parsedChats}
            </span>
            <span className="text-sm text-kuali-text-light mb-1">/ {totalChats}</span>
          </div>
          <div className="h-2 bg-kuali-surface-alt rounded-full overflow-hidden mb-1">
            <div className="h-2 bg-kuali-primary rounded-full"
              style={{ width: `${Math.round((parsedChats / totalChats) * 100)}%` }} />
          </div>
          <p className="text-xs text-kuali-text-light">
            {Math.round((parsedChats / totalChats) * 100)}% success rate
          </p>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-kuali-border">
          <h2 className="font-semibold text-sm text-kuali-text-dark" style={{ fontFamily: "Poppins, sans-serif" }}>
            Order Terbaru
          </h2>
          <button onClick={() => router.push("/orders")}
            className="flex items-center gap-1 text-xs text-kuali-primary font-semibold hover:underline">
            Lihat semua <ArrowRight size={12} />
          </button>
        </div>
        {/* Table header */}
        <div className="flex items-center gap-4 px-5 py-2.5 bg-kuali-surface-alt">
          {["No. Order", "Pelanggan", "Status", "Total", "AI"].map((col, i) => (
            <div key={col} className={`text-[10px] font-semibold text-kuali-text-light uppercase tracking-wide
              ${i === 0 ? "w-36 shrink-0" : i === 1 ? "flex-1" : i === 2 ? "shrink-0 w-28" : i === 3 ? "w-28 shrink-0 text-right" : "w-12 shrink-0 text-right"}`}>
              {col}
            </div>
          ))}
        </div>
        {recentOrders.map((order) => (
          <DesktopOrderRow key={order.id} order={order} onClick={() => router.push(`/orders/${order.id}`)} />
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3">
        <button onClick={() => router.push("/demo")} className="btn-primary flex items-center justify-center gap-2 max-w-xs">
          <MessageCircle size={16} /> Proses Chat Baru
        </button>
        <button onClick={() => router.push("/production")} className="btn-secondary flex items-center justify-center gap-2 max-w-xs">
          Rencana Produksi <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <Shell
      title="Dashboard Hari Ini"
      subtitle={business.name}
      headerRight={
        <div className="flex items-center gap-1.5 text-xs text-kuali-primary font-semibold bg-orange-50 px-3 py-1.5 rounded-full">
          <Zap size={12} /> Mock AI aktif
        </div>
      }
      desktopContent={desktopContent}
    >
      {/* Mobile content */}
      <div className="px-4 py-4 flex flex-col gap-5">
        <div>
          <SectionTitle>Ringkasan</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard value={metrics.totalOrdersToday} label="Total Order" sublabel="Hari ini" onClick={() => router.push("/orders")} />
            <MetricCard value={metrics.confirmed} label="Dikonfirmasi" accent="success" onClick={() => router.push("/orders?filter=confirmed")} />
            <MetricCard value={metrics.draftPending} label="Draft / Pending" accent="warning" onClick={() => router.push("/orders?filter=draft")} />
            <MetricCard value={metrics.needsReview} label="Perlu Dicek" sublabel={`${metrics.unpaidOrders} belum bayar`} accent="danger" onClick={() => router.push("/orders?filter=needs_check")} />
          </div>
        </div>

        {metrics.unpaidAmount > 0 && (
          <div className="bg-[#FEF3C7] rounded-card p-4">
            <div className="text-xs font-semibold text-status-draft mb-0.5">Total belum dibayar</div>
            <div className="text-xl font-bold text-kuali-text-dark">{formatRupiah(metrics.unpaidAmount)}</div>
            <div className="text-xs text-kuali-text-mid mt-0.5">
              {metrics.unpaidOrders} order · {parsedChats}/{totalChats} chat diparse
            </div>
          </div>
        )}

        <button onClick={() => router.push("/demo")} className="btn-primary flex items-center justify-center gap-2">
          <MessageCircle size={16} /> Proses Chat Baru
        </button>

        <div>
          <SectionTitle>Order Terbaru</SectionTitle>
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
