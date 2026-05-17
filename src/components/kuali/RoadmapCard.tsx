import { RoadmapBadge } from "./StatusBadge";
import { roadmapItems } from "@/lib/dummy-data";
import { NARRATIVE_SAFE } from "@/lib/constants";

export function RoadmapCard() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-kuali-text-mid leading-relaxed">{NARRATIVE_SAFE.roadmapNote}</p>

      {roadmapItems.map((item) => (
        <div
          key={item.id}
          className="rounded-card border-2 border-dashed border-kuali-border bg-kuali-surface-alt p-4 flex flex-col gap-2"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 flex-1">
              <span className="text-lg shrink-0">{item.icon}</span>
              <div>
                <div className="font-semibold text-sm text-kuali-text-dark">{item.title}</div>
                <div className="text-xs text-kuali-text-mid mt-0.5">{item.description}</div>
              </div>
            </div>
            <RoadmapBadge />
          </div>

          {item.note && (
            <div className="text-xs text-kuali-text-light leading-relaxed pl-6">{item.note}</div>
          )}

          <div className="pl-6">
            <span className="text-[10px] bg-white border border-kuali-border rounded-badge px-2 py-0.5 text-kuali-text-light font-medium">
              Belum tersedia di MVP
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
