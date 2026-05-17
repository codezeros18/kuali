import { cn } from "@/lib/utils";

interface MetricCardProps {
  value: string | number;
  label: string;
  sublabel?: string;
  accent?: "default" | "warning" | "danger" | "success";
  onClick?: () => void;
}

const accentStyles = {
  default: "border-transparent",
  warning: "border-l-4 border-l-status-draft",
  danger: "border-l-4 border-l-status-check",
  success: "border-l-4 border-l-status-confirmed",
};

export function MetricCard({ value, label, sublabel, accent = "default", onClick }: MetricCardProps) {
  return (
    <div
      className={cn(
        "card cursor-pointer active:scale-95 transition-all duration-150",
        accentStyles[accent]
      )}
      onClick={onClick}
    >
      <div className="text-2xl font-bold text-kuali-text-dark">{value}</div>
      <div className="text-xs font-medium text-kuali-text-mid mt-0.5">{label}</div>
      {sublabel && (
        <div className="text-xs text-kuali-text-light mt-0.5">{sublabel}</div>
      )}
    </div>
  );
}

interface BigMetricProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function BigMetric({ value, label, icon, className }: BigMetricProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {icon && <div className="text-2xl mb-1">{icon}</div>}
      <div className="text-3xl font-bold text-kuali-text-dark">{value}</div>
      <div className="text-xs text-kuali-text-mid mt-1">{label}</div>
    </div>
  );
}
