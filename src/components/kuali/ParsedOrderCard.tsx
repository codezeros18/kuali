"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { ConfidenceBadge } from "./StatusBadge";
import { formatRupiah } from "@/lib/format";
import { NARRATIVE_SAFE } from "@/lib/constants";
import type { ParsedOrder } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

interface ParsedOrderCardProps {
  order: ParsedOrder;
  onApprove?: () => void;
  onReject?: () => void;
}

function ConfidenceBar({ score }: { score: number }) {
  const color =
    score >= 85 ? "bg-status-confirmed" : score >= 70 ? "bg-status-draft" : "bg-status-check";
  return (
    <div className="w-full bg-kuali-surface-alt rounded-full h-2 overflow-hidden">
      <div
        className={cn("h-2 rounded-full transition-all duration-700", color)}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export function ParsedOrderCard({ order, onApprove, onReject }: ParsedOrderCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  function handleApprove() {
    setApproved(true);
    toast.success("Order dikonfirmasi! Draft disimpan.", { duration: 3000 });
    onApprove?.();
  }

  function handleReject() {
    setRejected(true);
    toast.error("Order ditolak. Pesan perlu dikonfirmasi ulang.", { duration: 3000 });
    onReject?.();
  }

  const canApprove = order.confidenceScore >= 70 && !approved && !rejected;

  return (
    <div className="card flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-semibold text-sm text-kuali-text-dark">{order.customerName}</div>
          <div className="text-xs text-kuali-text-mid mt-0.5">{order.items.map(i => `${i.menu} ×${i.qty}`).join(", ")}</div>
        </div>
        <ConfidenceBadge score={order.confidenceScore} />
      </div>

      {/* Confidence bar */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-kuali-text-mid">Confidence AI</span>
          <span className="font-semibold text-kuali-text-dark">{order.confidenceScore}%</span>
        </div>
        <ConfidenceBar score={order.confidenceScore} />
      </div>

      {/* Key fields */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
        {order.deliveryDate && order.deliveryDate !== "-" && (
          <div>
            <span className="text-kuali-text-light">Tanggal</span>
            <div className="font-medium text-kuali-text-dark">{order.deliveryDate}</div>
          </div>
        )}
        {order.deliveryTime && order.deliveryTime !== "-" && (
          <div>
            <span className="text-kuali-text-light">Waktu</span>
            <div className="font-medium text-kuali-text-dark">{order.deliveryTime}</div>
          </div>
        )}
        {order.items.length > 0 && (
          <div>
            <span className="text-kuali-text-light">Jumlah item</span>
            <div className="font-medium text-kuali-text-dark">{order.items.reduce((s, i) => s + i.qty, 0)} pcs</div>
          </div>
        )}
        {order.items.reduce((s, i) => s + i.subtotal, 0) > 0 && (
          <div>
            <span className="text-kuali-text-light">Total</span>
            <div className="font-medium text-kuali-text-dark">
              {formatRupiah(order.items.reduce((s, i) => s + i.subtotal, 0))}
            </div>
          </div>
        )}
      </div>

      {/* Missing fields warning */}
      {order.missingFields.length > 0 && (
        <div className="bg-[#FEF3C7] rounded-xl p-3 flex gap-2">
          <AlertCircle size={14} className="text-status-draft shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-medium text-status-draft mb-0.5">Informasi belum lengkap</div>
            <ul className="text-xs text-kuali-text-mid list-disc list-inside">
              {order.missingFields.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Toggle detail */}
      <button
        onClick={() => setShowDetail((v) => !v)}
        className="flex items-center gap-1 text-xs text-kuali-primary font-medium self-start"
      >
        {showDetail ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {showDetail ? "Sembunyikan detail" : "Lihat detail parsing"}
      </button>

      {showDetail && (
        <div className="bg-kuali-surface-alt rounded-xl p-3 text-xs text-kuali-text-mid space-y-1">
          <div className="font-semibold text-kuali-text-dark mb-1">Item pesanan:</div>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>{item.menu} × {item.qty}</span>
              <span>{item.subtotal > 0 ? formatRupiah(item.subtotal) : "–"}</span>
            </div>
          ))}
          {order.suggestedReply && (
            <>
              <div className="font-semibold text-kuali-text-dark mt-2 mb-1">Balasan saran AI:</div>
              <p className="leading-relaxed">{order.suggestedReply}</p>
            </>
          )}
        </div>
      )}

      {/* AI note */}
      <p className="text-[10px] text-kuali-text-light leading-relaxed">{NARRATIVE_SAFE.aiNote}</p>

      {/* Action buttons */}
      {!approved && !rejected && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleReject}
            className="btn-ghost flex-1 flex items-center justify-center gap-1.5 text-status-check border-status-check/30"
          >
            <XCircle size={15} />
            Tolak
          </button>
          <button
            onClick={handleApprove}
            disabled={!canApprove}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 rounded-button py-3 text-sm font-semibold transition-colors",
              canApprove
                ? "bg-status-confirmed text-white"
                : "bg-kuali-surface-alt text-kuali-text-light cursor-not-allowed"
            )}
          >
            <CheckCircle size={15} />
            Konfirmasi
          </button>
        </div>
      )}

      {approved && (
        <div className="flex items-center gap-2 bg-[#DCFCE7] rounded-xl p-3">
          <CheckCircle size={16} className="text-status-confirmed shrink-0" />
          <span className="text-sm font-medium text-status-confirmed">Order dikonfirmasi</span>
        </div>
      )}

      {rejected && (
        <div className="flex items-center gap-2 bg-[#FEE2E2] rounded-xl p-3">
          <XCircle size={16} className="text-status-check shrink-0" />
          <span className="text-sm font-medium text-status-check">Order ditolak</span>
        </div>
      )}
    </div>
  );
}
