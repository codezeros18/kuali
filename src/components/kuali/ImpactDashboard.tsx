import { Info } from "lucide-react";
import { impactMetrics, dailySummary } from "@/lib/dummy-data";
import { NARRATIVE_SAFE } from "@/lib/constants";

function ImpactMetricRow({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-kuali-border last:border-0">
      <div>
        <div className="text-sm text-kuali-text-dark">{label}</div>
        {sublabel && <div className="text-[10px] text-kuali-text-light mt-0.5">{sublabel}</div>}
      </div>
      <div className="text-sm font-bold text-kuali-text-dark">{value}</div>
    </div>
  );
}

export function ImpactDashboard() {
  const parseRate = impactMetrics.parseSuccessRate;

  return (
    <div className="flex flex-col gap-4">
      {/* Parse rate visual */}
      <div className="card">
        <div className="text-xs font-semibold text-kuali-text-mid uppercase tracking-wider mb-3">
          Efisiensi Parsing Hari Ini
        </div>
        <div className="flex items-end gap-3 mb-3">
          <div className="text-4xl font-bold text-kuali-primary">{parseRate.toFixed(0)}%</div>
          <div className="text-xs text-kuali-text-mid mb-1 leading-relaxed">
            {impactMetrics.parsedSuccessfully} dari {impactMetrics.simulatedChats} chat
            <br />
            berhasil diparse
          </div>
        </div>
        <div className="w-full bg-kuali-surface-alt rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full bg-kuali-primary transition-all duration-700"
            style={{ width: `${parseRate}%` }}
          />
        </div>
      </div>

      {/* Impact metrics */}
      <div className="card">
        <div className="text-xs font-semibold text-kuali-text-mid uppercase tracking-wider mb-1">
          Ringkasan Operasional
        </div>
        <ImpactMetricRow
          label="Chat masuk hari ini"
          value={impactMetrics.simulatedChats}
          sublabel="Simulasi pesan WhatsApp"
        />
        <ImpactMetricRow
          label="Berhasil diparse"
          value={impactMetrics.parsedSuccessfully}
          sublabel="Tanpa input manual"
        />
        <ImpactMetricRow
          label="Order dikonfirmasi"
          value={dailySummary.confirmed}
          sublabel="Disetujui oleh owner"
        />
        <ImpactMetricRow
          label="Draft menunggu"
          value={dailySummary.draft}
          sublabel="Perlu ditinjau"
        />
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 bg-kuali-surface-alt rounded-xl p-3">
        <Info size={14} className="text-kuali-text-light shrink-0 mt-0.5" />
        <p className="text-[10px] text-kuali-text-light leading-relaxed">
          {NARRATIVE_SAFE.impactNote}
        </p>
      </div>
    </div>
  );
}
