"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle, XCircle, Clock, Package, CreditCard,
  MapPin, Calendar, AlertTriangle, Zap, Hash,
} from "lucide-react";
import { Shell } from "@/components/kuali/AppShell";
import { StatusBadge } from "@/components/kuali/StatusBadge";
import { NARRATIVE_SAFE } from "@/lib/constants";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
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

type ValidStatus = "draft" | "confirmed" | "needs_check" | "completed" | "cancelled";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 360, damping: 28, delay: i * 0.05 },
  }),
};

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden", className)}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-3">{children}</p>
  );
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

  const confidence = order
    ? Math.round(order.confidenceScore > 1 ? order.confidenceScore : order.confidenceScore * 100)
    : 0;
  const confColor = confidence >= 85 ? "#16A34A" : confidence >= 70 ? "#D97706" : "#DC2626";
  const confBg    = confidence >= 85 ? "bg-green-500" : confidence >= 70 ? "bg-amber-400" : "bg-red-500";
  const confLabel = confidence >= 85 ? "Tinggi" : confidence >= 70 ? "Sedang" : "Rendah";
  const missing: string[] = order ? JSON.parse(order.missingFields || "[]") : [];

  const loadingEl = (
    <div className="flex items-center justify-center py-20 text-[#ADADAD] text-sm font-medium">
      Memuat...
    </div>
  );

  const errorEl = error ? (
    <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm text-center py-12 px-4">
      <p className="text-sm text-red-500 font-medium">{error}</p>
    </div>
  ) : null;

  // ── Desktop ───────────────────────────────────────────────────────────────────
  const desktopContent = (
    <div className="animate-fade-in w-full">
      {loading && loadingEl}
      {errorEl}
      {order && (
        <div className="grid grid-cols-[1fr_320px] gap-5 items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-4">

            {/* Hero header card */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <Card className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-[12px] font-mono font-black text-[#888] bg-[#F4F4F2] px-2.5 py-1 rounded-lg border border-[#E8E8E6] flex items-center gap-1">
                        <Hash size={10} className="opacity-60" />
                        {order.orderNumber}
                      </span>
                      <StatusBadge status={order.status as ValidStatus} />
                    </div>
                    <h2 className="text-[24px] font-black text-[#1A1A1A] tracking-tight leading-tight truncate">
                      {order.customerName}
                    </h2>
                    {order.customerPhone && (
                      <p className="text-[14px] text-[#6B6B6B] font-medium mt-0.5">{order.customerPhone}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[28px] font-black text-[#1A1A1A] tracking-tight leading-none">
                      {formatRupiah(order.totalAmount)}
                    </p>
                    <span className={cn(
                      "text-[11px] font-black px-2.5 py-1 rounded-full inline-block mt-1.5",
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    )}>
                      {order.paymentStatus === "paid" ? "Lunas" : "Belum Bayar"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[12px] text-[#ADADAD] font-medium mt-4 pt-4 border-t border-[#F4F4F2]">
                  <Clock size={12} />
                  {new Date(order.createdAt).toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" })}
                  {order.approvedAt && (
                    <>
                      <span className="mx-2 text-[#E8E8E6]">·</span>
                      <CheckCircle size={12} className="text-green-500" />
                      <span className="text-green-600">
                        Dikonfirmasi {new Date(order.approvedAt).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}
                      </span>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Items table */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <Card>
                <div className="px-6 py-4 border-b border-[#F4F4F2]">
                  <SectionLabel>Item Pesanan</SectionLabel>
                  <div className="grid grid-cols-[1fr_48px_120px] gap-4 text-[11px] font-black text-[#ADADAD] uppercase tracking-wider">
                    <span>Menu</span>
                    <span className="text-center">Qty</span>
                    <span className="text-right">Subtotal</span>
                  </div>
                </div>
                <div className="divide-y divide-[#F4F4F2]">
                  {order.items.map((item) => (
                    <div key={item.id} className="grid grid-cols-[1fr_48px_120px] gap-4 px-6 py-3.5 items-center">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                          <Package size={13} className="text-orange-400" />
                        </div>
                        <span className="text-[14px] font-semibold text-[#1A1A1A] truncate">{item.menuName}</span>
                      </div>
                      <span className="text-[14px] font-black text-[#6B6B6B] text-center">{item.qty}</span>
                      <span className="text-[14px] font-black text-[#1A1A1A] text-right">{formatRupiah(item.subtotal)}</span>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 bg-[#FAFAF8] border-t border-[#F4F4F2] flex items-center justify-between">
                  <span className="text-[13px] font-black text-[#6B6B6B] uppercase tracking-wide">Total</span>
                  <span className="text-[20px] font-black text-orange-500 tracking-tight">{formatRupiah(order.totalAmount)}</span>
                </div>
              </Card>
            </motion.div>

            {/* Delivery info */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
              <Card className="p-6">
                <SectionLabel>Info Pengiriman</SectionLabel>
                {!order.deliveryDate && !order.pickupMethod ? (
                  <p className="text-[13px] text-[#ADADAD] font-medium">Info pengiriman belum lengkap.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {order.deliveryDate && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                          <Calendar size={14} className="text-blue-500" />
                        </div>
                        <div>
                          <p className="text-[13px] font-black text-[#1A1A1A]">{order.deliveryDate}</p>
                          {order.deliveryTime && (
                            <p className="text-[12px] text-[#6B6B6B] font-medium">{order.deliveryTime}</p>
                          )}
                        </div>
                      </div>
                    )}
                    {order.pickupMethod && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                          <MapPin size={14} className="text-purple-500" />
                        </div>
                        <p className="text-[13px] font-black text-[#1A1A1A] capitalize">{order.pickupMethod}</p>
                      </div>
                    )}
                    {order.specialRequest && (
                      <p className="text-[12px] text-[#6B6B6B] font-medium italic pl-11">
                        "{order.specialRequest}"
                      </p>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>

            {order.notes && (
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
                <Card className="p-5">
                  <SectionLabel>Catatan Internal</SectionLabel>
                  <p className="text-[13px] text-[#6B6B6B] font-medium leading-relaxed">{order.notes}</p>
                </Card>
              </motion.div>
            )}
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-4">

            {/* AI Confidence */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <Card className="p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <Zap size={12} className="text-orange-500 fill-orange-400" />
                  <SectionLabel>Confidence AI</SectionLabel>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-[48px] font-black leading-none tracking-tight" style={{ color: confColor }}>
                    {confidence}
                  </span>
                  <span className="text-[18px] font-black mb-1.5" style={{ color: confColor }}>%</span>
                  <span className="mb-1.5 ml-auto text-[11px] font-black px-2 py-0.5 rounded-full border"
                    style={{ color: confColor, borderColor: confColor + "33", backgroundColor: confColor + "11" }}>
                    {confLabel}
                  </span>
                </div>
                <div className="h-2 bg-[#F4F4F2] rounded-full overflow-hidden mb-3">
                  <motion.div
                    className={cn("h-full rounded-full", confBg)}
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
                {missing.length > 0 && (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-3 flex gap-2">
                    <AlertTriangle size={13} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-black text-red-600 mb-0.5">Perlu dilengkapi:</p>
                      <p className="text-[11px] text-red-500 font-medium">{missing.join(", ")}</p>
                    </div>
                  </div>
                )}
                <p className="text-[10px] text-[#ADADAD] font-medium leading-relaxed">{NARRATIVE_SAFE.aiNote}</p>
              </Card>
            </motion.div>

            {/* Actions */}
            {(order.status === "draft" || order.status === "needs_check") && (
              <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
                <Card className="p-5">
                  <SectionLabel>Tindakan</SectionLabel>
                  <div className="flex flex-col gap-2.5">
                    <motion.button
                      whileHover={{ scale: 1.015, boxShadow: "0 8px 20px rgba(232,84,26,0.2)" }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleStatus("confirmed")}
                      disabled={acting}
                      className="w-full bg-[#E8541A] text-white font-black text-[13px] py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-[#d4491a] transition-colors disabled:opacity-60"
                    >
                      <CheckCircle size={15} />
                      Konfirmasi Order
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleStatus("cancelled")}
                      disabled={acting}
                      className="w-full bg-white text-red-600 font-black text-[13px] py-3 rounded-xl flex items-center justify-center gap-2 border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-60"
                    >
                      <XCircle size={15} />
                      Tolak Order
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Payment */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
              {order.paymentStatus === "unpaid" ? (
                <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-2xl border border-amber-200 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
                      <CreditCard size={13} className="text-white" />
                    </div>
                    <SectionLabel>Pembayaran</SectionLabel>
                  </div>
                  <p className="text-[22px] font-black text-[#1A1A1A] tracking-tight leading-none mb-1">
                    {formatRupiah(order.totalAmount)}
                  </p>
                  <p className="text-[12px] text-amber-700 font-semibold mb-4">Menunggu konfirmasi pembayaran</p>
                  {order.status === "confirmed" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleMarkPaid}
                      disabled={acting}
                      className="w-full bg-white text-amber-700 font-black text-[13px] py-2.5 rounded-xl border border-amber-300 hover:bg-amber-50 transition-colors disabled:opacity-60"
                    >
                      Tandai Sudah Bayar
                    </motion.button>
                  )}
                  <p className="text-[10px] text-amber-600/70 font-medium leading-relaxed mt-3">{NARRATIVE_SAFE.qrisNote}</p>
                </div>
              ) : (
                <Card className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                      <CreditCard size={13} className="text-green-600" />
                    </div>
                    <SectionLabel>Pembayaran</SectionLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-[14px] font-black text-green-700">Sudah Lunas</span>
                  </div>
                  <p className="text-[22px] font-black text-[#1A1A1A] tracking-tight mt-1">{formatRupiah(order.totalAmount)}</p>
                </Card>
              )}
            </motion.div>

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
      noBottomNav
    >
      {/* ── Mobile ─────────────────────────────────────────────────────────────── */}
      {loading && loadingEl}
      {errorEl}
      {order && (
        <div className="flex flex-col gap-3 px-4 py-4">

          {/* Header */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-black text-[#888] bg-[#F4F4F2] px-2 py-0.5 rounded-lg border border-[#E8E8E6]">
                {order.orderNumber}
              </span>
              <StatusBadge status={order.status as ValidStatus} />
            </div>
            <p className="text-[18px] font-black text-[#1A1A1A] tracking-tight">{order.customerName}</p>
            {order.customerPhone && (
              <p className="text-[13px] text-[#6B6B6B] font-medium mt-0.5">{order.customerPhone}</p>
            )}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F4F4F2]">
              <div className="flex items-center gap-1 text-[11px] text-[#ADADAD] font-medium">
                <Clock size={11} />
                {new Date(order.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
              </div>
              <span className={cn(
                "text-[11px] font-black px-2.5 py-1 rounded-full",
                order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
              )}>
                {order.paymentStatus === "paid" ? "Lunas" : "Belum Bayar"}
              </span>
            </div>
          </Card>

          {/* AI Confidence */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Zap size={11} className="text-orange-500 fill-orange-400" />
                <span className="text-[11px] font-black text-orange-500 uppercase tracking-wider">Confidence AI</span>
              </div>
              <span className="text-[22px] font-black tracking-tight leading-none" style={{ color: confColor }}>
                {confidence}%
              </span>
            </div>
            <div className="h-1.5 bg-[#F4F4F2] rounded-full overflow-hidden mb-2">
              <div className={cn("h-full rounded-full transition-all duration-700", confBg)} style={{ width: `${confidence}%` }} />
            </div>
            {missing.length > 0 && (
              <p className="text-[11px] text-red-500 font-medium">Perlu dilengkapi: {missing.join(", ")}</p>
            )}
          </Card>

          {/* Items */}
          <Card>
            <div className="px-4 pt-4 pb-2">
              <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-2">Item Pesanan</p>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                      <Package size={11} className="text-orange-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{item.menuName}</p>
                      <p className="text-[11px] text-[#ADADAD] font-medium">×{item.qty}</p>
                    </div>
                  </div>
                  <span className="text-[13px] font-black text-[#1A1A1A] shrink-0">{formatRupiah(item.subtotal)}</span>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 bg-[#FAFAF8] border-t border-[#F4F4F2] flex items-center justify-between">
              <span className="text-[12px] font-black text-[#6B6B6B] uppercase tracking-wide">Total</span>
              <span className="text-[16px] font-black text-orange-500">{formatRupiah(order.totalAmount)}</span>
            </div>
          </Card>

          {/* Delivery */}
          {(order.deliveryDate || order.pickupMethod) && (
            <Card className="p-4">
              <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-2.5">Info Pengiriman</p>
              <div className="flex flex-col gap-2.5">
                {order.deliveryDate && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Calendar size={13} className="text-blue-500" />
                    </div>
                    <p className="text-[13px] font-semibold text-[#1A1A1A]">
                      {order.deliveryDate}{order.deliveryTime ? ` · ${order.deliveryTime}` : ""}
                    </p>
                  </div>
                )}
                {order.pickupMethod && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                      <MapPin size={13} className="text-purple-500" />
                    </div>
                    <p className="text-[13px] font-semibold text-[#1A1A1A] capitalize">{order.pickupMethod}</p>
                  </div>
                )}
                {order.specialRequest && (
                  <p className="text-[12px] text-[#6B6B6B] italic pl-9">"{order.specialRequest}"</p>
                )}
              </div>
            </Card>
          )}

          {/* Payment mobile */}
          {order.paymentStatus === "unpaid" && order.status === "confirmed" && (
            <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-2xl border border-amber-200 p-4">
              <p className="text-[11px] font-black text-amber-700 uppercase tracking-wider mb-1">Belum Dibayar</p>
              <p className="text-[18px] font-black text-[#1A1A1A] tracking-tight mb-3">{formatRupiah(order.totalAmount)}</p>
              <button
                onClick={handleMarkPaid}
                disabled={acting}
                className="w-full bg-white text-amber-700 font-black text-[13px] py-2.5 rounded-xl border border-amber-300 hover:bg-amber-50 transition-colors disabled:opacity-60"
              >
                Tandai Sudah Bayar
              </button>
            </div>
          )}

          {/* Actions mobile */}
          {(order.status === "draft" || order.status === "needs_check") && (
            <div className="flex gap-2.5 pb-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleStatus("cancelled")}
                disabled={acting}
                className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl border border-red-200 text-red-600 text-[13px] font-black bg-white hover:bg-red-50 transition-colors disabled:opacity-60"
              >
                <XCircle size={15} /> Tolak
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleStatus("confirmed")}
                disabled={acting}
                className="flex-2 flex-[2] flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-[#E8541A] text-white text-[13px] font-black shadow-sm hover:bg-[#d4491a] transition-colors disabled:opacity-60"
              >
                <CheckCircle size={15} /> Konfirmasi Order
              </motion.button>
            </div>
          )}

          {order.notes && (
            <Card className="p-4">
              <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-1.5">Catatan</p>
              <p className="text-[13px] text-[#6B6B6B] font-medium leading-relaxed">{order.notes}</p>
            </Card>
          )}
        </div>
      )}
    </Shell>
  );
}
