"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, AlertTriangle, ChevronRight, BarChart2, CheckCircle2, Clock, CreditCard } from "lucide-react";
import { Shell, SectionTitle, Divider } from "@/components/kuali/AppShell";
import { BigMetric } from "@/components/kuali/MetricCard";
import { ImpactDashboard } from "@/components/kuali/ImpactDashboard";
import { RoadmapCard } from "@/components/kuali/RoadmapCard";
import { PaymentReminderCard } from "@/components/kuali/PaymentReminderCard";
import { formatRupiah } from "@/lib/format";
import { dailySummary, orders, dashboardMetrics } from "@/lib/dummy-data";
import { NARRATIVE_SAFE } from "@/lib/constants";

const unpaidOrder = orders.find((o) => o.paymentStatus === "unpaid" && o.totalAmount > 0);

export default function SummaryPage() {
  const router = useRouter();

  const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  // ── Desktop content ──────────────────────────────────────────────────────
  const desktopContent = (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top row: 4 stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: BarChart2, label: "Total Order", val: dailySummary.confirmed + dailySummary.draft, color: "bg-blue-50 text-blue-600" },
          { icon: CheckCircle2, label: "Dikonfirmasi", val: dailySummary.confirmed, color: "bg-green-50 text-green-600" },
          { icon: Clock, label: "Draft / Pending", val: dailySummary.draft, color: "bg-yellow-50 text-yellow-600" },
          { icon: AlertTriangle, label: "Perlu Dicek", val: dashboardMetrics.needsReview, color: "bg-red-50 text-red-500" },
        ].map(({ icon: Icon, label, val, color }) => (
          <div key={label} className="bg-white rounded-2xl shadow-card p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon size={20} />
            </div>
            <div className="text-3xl font-bold text-kuali-text-dark">{val}</div>
            <div className="text-sm text-kuali-text-mid mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Second row: unpaid + narrative */}
      <div className="grid grid-cols-2 gap-4">
        {/* Unpaid */}
        <div className="bg-[#FEF3C7] rounded-2xl border border-yellow-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={16} className="text-yellow-700" />
            <span className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">Belum Dibayar</span>
          </div>
          <div className="text-3xl font-bold text-kuali-text-dark mb-1">
            {formatRupiah(dashboardMetrics.unpaidAmount)}
          </div>
          <p className="text-sm text-kuali-text-mid">Dari {dashboardMetrics.unpaidOrders} order dikonfirmasi</p>
          <button
            onClick={() => router.push("/orders?filter=unpaid")}
            className="mt-4 flex items-center gap-1 text-xs font-semibold text-yellow-700 hover:text-yellow-900"
          >
            Lihat detail <ChevronRight size={12} />
          </button>
        </div>

        {/* Narrative */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <p className="text-xs font-semibold text-kuali-text-mid uppercase tracking-wide mb-3">Catatan Hari Ini</p>
          <p className="text-sm text-kuali-text-mid leading-relaxed">{dailySummary.narrative}</p>
          <p className="text-[10px] text-kuali-text-light mt-3 leading-relaxed">{NARRATIVE_SAFE.impactNote}</p>
        </div>
      </div>

      {/* Needs check warning */}
      {dashboardMetrics.needsReview > 0 && (
        <button
          onClick={() => router.push("/orders?filter=needs_check")}
          className="w-full bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 hover:bg-red-100 transition-colors text-left"
        >
          <AlertTriangle size={18} className="text-red-500 shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-semibold text-red-700">
              {dashboardMetrics.needsReview} pesanan perlu dicek ulang
            </span>
            <p className="text-xs text-red-500 mt-0.5">Confidence AI rendah — perlu verifikasi Bu Rani</p>
          </div>
          <ChevronRight size={16} className="text-red-400 shrink-0" />
        </button>
      )}

      {/* Bottom row: QRIS reminder + impact */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-sm font-semibold text-kuali-text-dark mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
            Contoh Reminder Pembayaran
          </h2>
          {unpaidOrder && (
            <PaymentReminderCard
              customerName={unpaidOrder.customerName}
              amount={unpaidOrder.totalAmount}
              orderNumber={unpaidOrder.orderNumber}
              items={unpaidOrder.items}
            />
          )}
        </div>
        <div>
          <h2 className="text-sm font-semibold text-kuali-text-dark mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
            Dashboard Dampak
          </h2>
          <ImpactDashboard />
        </div>
      </div>

      {/* Roadmap */}
      <div>
        <h2 className="text-sm font-semibold text-kuali-text-dark mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
          Fitur Roadmap
        </h2>
        <RoadmapCard />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={() => router.push("/production")} className="btn-secondary flex items-center justify-center gap-2">
          Lihat Rencana Produksi <ArrowRight size={16} />
        </button>
        <button onClick={() => router.push("/demo")} className="btn-ghost px-6">
          Ulangi Demo
        </button>
      </div>
    </div>
  );

  return (
    <Shell
      title="Rekap Harian"
      subtitle={today}
      desktopContent={desktopContent}
    >
      {/* Mobile content */}
      <div className="px-4 py-4 flex flex-col gap-5">
        <div>
          <SectionTitle>Angka Hari Ini</SectionTitle>
          <div className="card">
            <div className="grid grid-cols-3 gap-4 py-2">
              <BigMetric value={dailySummary.confirmed} label="Dikonfirmasi" icon="✅" />
              <BigMetric value={dailySummary.draft} label="Draft" icon="📝" />
              <BigMetric value={dashboardMetrics.needsReview} label="Perlu Cek" icon="⚠️" />
            </div>
            <Divider />
            <div className="text-center">
              <div className="text-xs text-kuali-text-mid mb-1">Total belum dibayar</div>
              <div className="text-2xl font-bold text-kuali-text-dark">
                {formatRupiah(dashboardMetrics.unpaidAmount)}
              </div>
              <div className="text-xs text-kuali-text-light mt-0.5">
                Dari {dashboardMetrics.unpaidOrders} order
              </div>
            </div>
          </div>
        </div>

        {dashboardMetrics.needsReview > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-card p-4 flex items-center gap-3">
            <AlertTriangle size={16} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-700 font-medium">
              {dashboardMetrics.needsReview} pesanan perlu dicek ulang
            </p>
          </div>
        )}

        <div>
          <SectionTitle>Catatan Hari Ini</SectionTitle>
          <div className="card">
            <p className="text-sm text-kuali-text-mid leading-relaxed">{dailySummary.narrative}</p>
            <p className="text-[10px] text-kuali-text-light mt-3 leading-relaxed">{NARRATIVE_SAFE.impactNote}</p>
          </div>
        </div>

        {unpaidOrder && (
          <div>
            <SectionTitle>Contoh Reminder Pembayaran</SectionTitle>
            <PaymentReminderCard
              customerName={unpaidOrder.customerName}
              amount={unpaidOrder.totalAmount}
              orderNumber={unpaidOrder.orderNumber}
              items={unpaidOrder.items}
            />
          </div>
        )}

        <div>
          <SectionTitle>Dashboard Dampak</SectionTitle>
          <ImpactDashboard />
        </div>

        <div>
          <SectionTitle>Fitur Roadmap</SectionTitle>
          <RoadmapCard />
        </div>

        <button onClick={() => router.push("/demo")} className="btn-secondary flex items-center justify-center gap-2">
          Ulangi Demo <ArrowRight size={16} />
        </button>
      </div>
    </Shell>
  );
}
