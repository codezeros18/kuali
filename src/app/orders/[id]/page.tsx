"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CheckCircle, XCircle, Clock, Package, CreditCard, MapPin, Calendar, ArrowLeft,
} from "lucide-react";
import { Shell } from "@/components/kuali/AppShell";
import { StatusBadge } from "@/components/kuali/StatusBadge";
import { NARRATIVE_SAFE } from "@/lib/constants";
import { formatRupiah } from "@/lib/format";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  menuName: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
}

interface OrderDetail {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string | null;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  deliveryDate: string | null;
  deliveryTime: string | null;
  pickupMethod: string | null;
  specialRequest: string | null;
  confidenceScore: number;
  missingFields: string;
  notes: string | null;
  createdAt: string;
  approvedAt: string | null;
  items: OrderItem[];
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setOrder)
      .catch(() => setError("Order tidak ditemukan."))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleStatus(status: string) {
    if (!order) return;
    setActing(true);
    try {
      const res = await fetch(`/api/orders/${order.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setOrder((prev) => prev ? { ...prev, status: updated.status, approvedAt: updated.approvedAt } : prev);
      toast.success(status === "confirmed" ? "Order dikonfirmasi ✓" : "Order ditolak");
    } catch {
      toast.error("Gagal mengubah status order.");
    } finally {
      setActing(false);
    }
  }

  async function handleMarkPaid() {
    if (!order) return;
    setActing(true);
    try {
      const res = await fetch(`/api/orders/${order.id}/payment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: "paid" }),
      });
      if (!res.ok) throw new Error();
      setOrder((prev) => prev ? { ...prev, paymentStatus: "paid" } : prev);
      toast.success("Pembayaran dikonfirmasi ✓");
    } catch {
      toast.error("Gagal mengonfirmasi pembayaran.");
    } finally {
      setActing(false);
    }
  }

  // confidenceScore is stored as 0–100 integer in the DB
  const confidence = order
    ? Math.round(order.confidenceScore > 1 ? order.confidenceScore : order.confidenceScore * 100)
    : 0;
  const confidenceColor = confidence >= 85 ? "text-green-600" : confidence >= 70 ? "text-yellow-600" : "text-red-600";
  const confidenceBarColor = confidence >= 85 ? "bg-green-500" : confidence >= 70 ? "bg-yellow-500" : "bg-red-500";
  const missing: string[] = order ? JSON.parse(order.missingFields || "[]") : [];

  // Shared sections (used in both desktop and mobile)
  const loadingEl = (
    <div className="flex items-center justify-center py-16 text-kuali-text-mid text-sm">
      Memuat...
    </div>
  );

  const errorEl = error ? (
    <div className="bg-white rounded-2xl shadow-card text-center py-8 px-4">
      <p className="text-sm text-red-500">{error}</p>
    </div>
  ) : null;

  // ── Desktop content ──────────────────────────────────────────────────────────
  const desktopContent = (
    <div className="animate-fade-in">
      {loading && loadingEl}
      {errorEl}
      {order && (
        <div className="grid grid-cols-3 gap-5">
          {/* Left column: order info + items + delivery */}
          <div className="col-span-2 flex flex-col gap-4">
            {/* Customer & status */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-kuali-text-dark" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {order.customerName}
                  </h2>
                  {order.customerPhone && (
                    <p className="text-sm text-kuali-text-mid mt-0.5">{order.customerPhone}</p>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-kuali-text-light mt-1.5">
                    <Clock size={12} />
                    {new Date(order.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                  </div>
                </div>
                <StatusBadge status={order.status as "draft" | "confirmed" | "needs_check" | "completed" | "cancelled"} />
              </div>
              {order.approvedAt && (
                <p className="text-xs text-green-600">
                  Dikonfirmasi: {new Date(order.approvedAt).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}
                </p>
              )}
            </div>

            {/* Items */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <p className="text-xs font-semibold text-kuali-text-mid uppercase tracking-wide mb-4">Item Pesanan</p>
              <div className="flex flex-col gap-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package size={15} className="text-kuali-text-light shrink-0" />
                      <span className="text-sm text-kuali-text-dark">{item.menuName}</span>
                      <span className="text-xs text-kuali-text-light">×{item.qty}</span>
                    </div>
                    <span className="text-sm font-medium text-kuali-text-dark">{formatRupiah(item.subtotal)}</span>
                  </div>
                ))}
                <div className="pt-3 mt-1 border-t border-kuali-border flex items-center justify-between">
                  <span className="text-sm font-semibold text-kuali-text-dark">Total</span>
                  <span className="text-lg font-bold text-kuali-primary">{formatRupiah(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Delivery info */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <p className="text-xs font-semibold text-kuali-text-mid uppercase tracking-wide mb-4">Info Pengiriman</p>
              <div className="flex flex-col gap-2.5 text-sm">
                {order.deliveryDate && (
                  <div className="flex items-center gap-2.5 text-kuali-text-dark">
                    <Calendar size={15} className="text-kuali-text-light shrink-0" />
                    <span>{order.deliveryDate}{order.deliveryTime ? ` · ${order.deliveryTime}` : ""}</span>
                  </div>
                )}
                {order.pickupMethod && (
                  <div className="flex items-center gap-2.5 text-kuali-text-dark">
                    <MapPin size={15} className="text-kuali-text-light shrink-0" />
                    <span className="capitalize">{order.pickupMethod}</span>
                  </div>
                )}
                {order.specialRequest && (
                  <p className="text-xs text-kuali-text-mid italic">Permintaan khusus: {order.specialRequest}</p>
                )}
                {!order.deliveryDate && !order.pickupMethod && (
                  <p className="text-xs text-kuali-text-light">Info pengiriman belum lengkap.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right column: AI confidence + actions + payment */}
          <div className="flex flex-col gap-4">
            {/* AI confidence */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <p className="text-xs font-semibold text-kuali-text-mid uppercase tracking-wide mb-4">Confidence AI</p>
              <div className="flex items-end gap-2 mb-3">
                <span className={`text-4xl font-bold ${confidenceColor}`} style={{ fontFamily: "Poppins, sans-serif" }}>
                  {confidence}%
                </span>
              </div>
              <div className="h-2 bg-kuali-surface-alt rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${confidenceBarColor}`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              {missing.length > 0 && (
                <div className="bg-red-50 rounded-xl p-3 mb-3">
                  <p className="text-xs text-red-600 font-medium">Perlu dilengkapi:</p>
                  <p className="text-xs text-red-500 mt-0.5">{missing.join(", ")}</p>
                </div>
              )}
              <p className="text-[10px] text-kuali-text-light leading-relaxed">{NARRATIVE_SAFE.aiNote}</p>
            </div>

            {/* Actions */}
            {(order.status === "draft" || order.status === "needs_check") && (
              <div className="bg-white rounded-2xl shadow-card p-5 flex flex-col gap-3">
                <p className="text-xs font-semibold text-kuali-text-mid uppercase tracking-wide">Tindakan</p>
                <button
                  onClick={() => handleStatus("confirmed")}
                  disabled={acting}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} />
                  Konfirmasi Order
                </button>
                <button
                  onClick={() => handleStatus("cancelled")}
                  disabled={acting}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-200 text-red-600 text-sm font-medium bg-white hover:bg-red-50 transition-colors"
                >
                  <XCircle size={16} />
                  Tolak Order
                </button>
              </div>
            )}

            {/* Payment */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CreditCard size={15} className="text-kuali-text-light" />
                  <span className="text-sm font-medium text-kuali-text-dark">Pembayaran</span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {order.paymentStatus === "paid" ? "Sudah Bayar" : "Belum Bayar"}
                </span>
              </div>
              {order.paymentStatus === "unpaid" && order.status === "confirmed" && (
                <button
                  onClick={handleMarkPaid}
                  disabled={acting}
                  className="w-full py-2.5 px-4 rounded-xl border border-green-300 text-green-700 text-sm font-medium bg-white hover:bg-green-50 transition-colors"
                >
                  Tandai Sudah Bayar
                </button>
              )}
              <p className="text-[10px] text-kuali-text-light mt-3 leading-relaxed">{NARRATIVE_SAFE.qrisNote}</p>
            </div>

            {order.notes && (
              <div className="bg-white rounded-2xl shadow-card p-4">
                <p className="text-xs text-kuali-text-light">Catatan: {order.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Shell
      title="Detail Order"
      subtitle={order?.orderNumber ?? ""}
      back
      desktopContent={desktopContent}
      mobileHeaderLeft={
        <button onClick={() => router.back()} className="text-kuali-primary">
          <ArrowLeft size={20} />
        </button>
      }
      noBottomNav
    >
      {/* Mobile content */}
      {loading && loadingEl}
      {errorEl}
      {order && (
        <div className="flex flex-col gap-4 px-4 py-4">
          {/* Header card */}
          <div className="card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-kuali-text-dark">{order.customerName}</p>
                {order.customerPhone && (
                  <p className="text-xs text-kuali-text-mid">{order.customerPhone}</p>
                )}
              </div>
              <StatusBadge status={order.status as "draft" | "confirmed" | "needs_check" | "completed" | "cancelled"} />
            </div>

            <div className="flex items-center gap-2 text-xs text-kuali-text-mid mb-2">
              <Clock size={12} />
              <span>{new Date(order.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</span>
            </div>

            {/* AI confidence */}
            <div className="mt-3 pt-3 border-t border-kuali-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-kuali-text-mid">Confidence AI</span>
                <span className={`text-xs font-semibold ${confidenceColor}`}>{confidence}%</span>
              </div>
              <div className="h-1.5 bg-kuali-surface-alt rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${confidenceBarColor}`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              {missing.length > 0 && (
                <p className="text-xs text-red-500 mt-1.5">Perlu dilengkapi: {missing.join(", ")}</p>
              )}
              <p className="text-[10px] text-kuali-text-light mt-1">{NARRATIVE_SAFE.aiNote}</p>
            </div>
          </div>

          {/* Items */}
          <div className="card">
            <p className="text-xs font-semibold text-kuali-text-mid mb-3 uppercase tracking-wide">Item Pesanan</p>
            <div className="flex flex-col gap-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-kuali-text-light" />
                    <span className="text-sm text-kuali-text-dark">{item.menuName}</span>
                    <span className="text-xs text-kuali-text-light">×{item.qty}</span>
                  </div>
                  <span className="text-sm font-medium text-kuali-text-dark">{formatRupiah(item.subtotal)}</span>
                </div>
              ))}
              <div className="pt-2 mt-1 border-t border-kuali-border flex items-center justify-between">
                <span className="text-sm font-semibold text-kuali-text-dark">Total</span>
                <span className="text-sm font-bold text-kuali-primary">{formatRupiah(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Delivery info */}
          <div className="card">
            <p className="text-xs font-semibold text-kuali-text-mid mb-3 uppercase tracking-wide">Info Pengiriman</p>
            <div className="flex flex-col gap-2 text-sm">
              {order.deliveryDate && (
                <div className="flex items-center gap-2 text-kuali-text-dark">
                  <Calendar size={14} className="text-kuali-text-light" />
                  <span>{order.deliveryDate}{order.deliveryTime ? ` · ${order.deliveryTime}` : ""}</span>
                </div>
              )}
              {order.pickupMethod && (
                <div className="flex items-center gap-2 text-kuali-text-dark">
                  <MapPin size={14} className="text-kuali-text-light" />
                  <span>{order.pickupMethod}</span>
                </div>
              )}
              {order.specialRequest && (
                <p className="text-xs text-kuali-text-mid italic">Permintaan khusus: {order.specialRequest}</p>
              )}
              {!order.deliveryDate && !order.pickupMethod && (
                <p className="text-xs text-kuali-text-light">Info pengiriman belum lengkap.</p>
              )}
            </div>
          </div>

          {/* Payment */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard size={14} className="text-kuali-text-light" />
                <span className="text-sm text-kuali-text-dark">Pembayaran</span>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {order.paymentStatus === "paid" ? "Sudah Bayar" : "Belum Bayar"}
              </span>
            </div>
            {order.paymentStatus === "unpaid" && order.status === "confirmed" && (
              <button
                onClick={handleMarkPaid}
                disabled={acting}
                className="btn-ghost text-sm mt-3 w-full border border-green-300 text-green-700 hover:bg-green-50"
              >
                Tandai Sudah Bayar
              </button>
            )}
            <p className="text-[10px] text-kuali-text-light mt-2">{NARRATIVE_SAFE.qrisNote}</p>
          </div>

          {/* Actions */}
          {(order.status === "draft" || order.status === "needs_check") && (
            <div className="flex gap-3">
              <button
                onClick={() => handleStatus("cancelled")}
                disabled={acting}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 text-red-600 text-sm font-medium bg-white"
              >
                <XCircle size={16} />
                Tolak
              </button>
              <button
                onClick={() => handleStatus("confirmed")}
                disabled={acting}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                Konfirmasi
              </button>
            </div>
          )}

          {order.notes && (
            <p className="text-xs text-kuali-text-light px-1">Catatan: {order.notes}</p>
          )}
        </div>
      )}
    </Shell>
  );
}
