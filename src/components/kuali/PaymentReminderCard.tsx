"use client";

import { useState } from "react";
import { Copy, Check, QrCode } from "lucide-react";
import { toast } from "sonner";
import { qrisDummy, generateReminderMessage } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/format";
import { NARRATIVE_SAFE } from "@/lib/constants";

interface PaymentReminderCardProps {
  customerName: string;
  amount: number;
  orderNumber: string;
  items?: string;
}

export function PaymentReminderCard({
  customerName,
  amount,
  orderNumber,
  items = orderNumber,
}: PaymentReminderCardProps) {
  const [copied, setCopied] = useState(false);

  const message = generateReminderMessage(customerName, amount, items);

  function handleCopy() {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      toast.success("Pesan disalin! Tempel di WhatsApp.", { duration: 2500 });
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="card flex flex-col gap-4">
      {/* QRIS dummy image */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-40 h-40 rounded-xl bg-white border-2 border-dashed border-kuali-border flex flex-col items-center justify-center gap-2 p-3">
          <QrCode size={64} className="text-kuali-text-light" strokeWidth={1} />
          <span className="text-[10px] text-kuali-text-light text-center font-medium leading-tight">
            QRIS DUMMY
            <br />
            Simulasi Pembayaran
          </span>
        </div>
        <div className="bg-[#FEF3C7] rounded-badge px-3 py-1">
          <span className="text-[10px] font-semibold text-status-draft">{qrisDummy.note}</span>
        </div>
      </div>

      {/* Amount */}
      <div className="text-center">
        <div className="text-2xl font-bold text-kuali-text-dark">{formatRupiah(amount)}</div>
        <div className="text-xs text-kuali-text-mid mt-0.5">
          {orderNumber} · {customerName}
        </div>
      </div>

      {/* Reminder message preview */}
      <div className="bg-kuali-surface-alt rounded-xl p-3">
        <div className="text-xs font-semibold text-kuali-text-dark mb-2">Preview pesan pengingat:</div>
        <p className="text-xs text-kuali-text-mid leading-relaxed whitespace-pre-line">{message}</p>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="btn-primary flex items-center justify-center gap-2"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Tersalin!" : "Salin Pesan"}
      </button>

      {/* Disclaimer */}
      <p className="text-[10px] text-kuali-text-light text-center leading-relaxed">
        {NARRATIVE_SAFE.qrisNote}
      </p>
    </div>
  );
}
