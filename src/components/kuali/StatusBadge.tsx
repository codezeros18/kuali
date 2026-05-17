import { cn } from "@/lib/utils";

type Status = "draft" | "confirmed" | "needs_check" | "completed" | "cancelled";
type Payment = "unpaid" | "paid";

const statusConfig: Record<Status, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-status-draft-bg text-status-draft border border-status-draft/20" },
  confirmed: { label: "Dikonfirmasi", className: "bg-status-confirmed-bg text-status-confirmed border border-status-confirmed/20" },
  needs_check: { label: "Perlu Cek", className: "bg-status-check-bg text-status-check border border-status-check/20" },
  completed: { label: "Selesai", className: "bg-gray-100 text-gray-600 border border-gray-200" },
  cancelled: { label: "Dibatalkan", className: "bg-gray-100 text-status-cancelled border border-gray-200" },
};

const paymentConfig: Record<Payment, { label: string; className: string }> = {
  unpaid: { label: "Belum Bayar", className: "bg-status-unpaid-bg text-status-unpaid border border-status-unpaid/20" },
  paid: { label: "Lunas", className: "bg-status-paid-bg text-status-paid border border-status-paid/20" },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-badge text-xs font-semibold", config.className)}>
      {config.label}
    </span>
  );
}

export function PaymentBadge({ status }: { status: Payment }) {
  const config = paymentConfig[status];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-badge text-xs font-semibold", config.className)}>
      {config.label}
    </span>
  );
}

export function RoadmapBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-badge text-[11px] font-semibold bg-status-roadmap text-white">
      ROADMAP
    </span>
  );
}

export function ConfidenceBadge({ score }: { score: number }) {
  const isHigh = score >= 85;
  const isMid = score >= 70 && score < 85;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-badge text-xs font-semibold",
        isHigh && "bg-status-confirmed-bg text-status-confirmed",
        isMid && "bg-status-draft-bg text-status-draft",
        !isHigh && !isMid && "bg-status-check-bg text-status-check"
      )}
    >
      {isHigh ? "✓" : isMid ? "⚠" : "!"} {score}%
    </span>
  );
}
