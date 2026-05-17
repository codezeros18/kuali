import { ChevronRight } from "lucide-react";
import { StatusBadge, PaymentBadge, ConfidenceBadge } from "./StatusBadge";
import { formatRupiah } from "@/lib/format";
import type { Order } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
  compact?: boolean;
}

export function OrderCard({ order, onClick, compact = false }: OrderCardProps) {
  return (
    <div
      className={cn(
        "card cursor-pointer hover:shadow-card-hover transition-shadow active:scale-[0.99]",
        order.status === "needs_check" && "border border-status-check/20"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-kuali-text-dark truncate">
              {order.customerName}
            </span>
            <StatusBadge status={order.status} />
          </div>
          <div className="text-sm text-kuali-text-mid mt-1 truncate">{order.items}</div>
          {!compact && (
            <div className="text-xs text-kuali-text-light mt-0.5">{order.deliveryDate}</div>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {order.totalAmount > 0 && (
            <span className="text-sm font-semibold text-kuali-text-dark">
              {formatRupiah(order.totalAmount)}
            </span>
          )}
          <PaymentBadge status={order.paymentStatus} />
        </div>
      </div>
      {!compact && (
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-kuali-border">
          <div className="text-xs text-kuali-text-light font-mono">{order.orderNumber}</div>
          <div className="flex items-center gap-2">
            <ConfidenceBadge score={order.confidenceScore} />
            <ChevronRight size={14} className="text-kuali-text-light" />
          </div>
        </div>
      )}
    </div>
  );
}
