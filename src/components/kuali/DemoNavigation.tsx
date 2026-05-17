import Link from "next/link";
import { ArrowRight, LayoutDashboard, ClipboardList, ChefHat, BarChart2 } from "lucide-react";

const pages = [
  { label: "Dashboard Hari Ini", href: "/dashboard", Icon: LayoutDashboard, desc: "Ringkasan pesanan & metrik" },
  { label: "Daftar Pesanan", href: "/orders", Icon: ClipboardList, desc: "Semua order dengan status" },
  { label: "Produksi Planner", href: "/production", Icon: ChefHat, desc: "Estimasi bahan otomatis" },
  { label: "Rekap Harian", href: "/summary", Icon: BarChart2, desc: "Summary & impact metrics" },
];

export function DemoNavigation() {
  return (
    <div className="grid grid-cols-1 gap-3">
      {pages.map(({ label, href, Icon, desc }) => (
        <Link key={href} href={href}>
          <div className="card flex items-center gap-3 hover:shadow-card-hover transition-shadow active:scale-[0.99]">
            <div className="w-10 h-10 rounded-xl bg-kuali-surface-alt flex items-center justify-center shrink-0">
              <Icon size={20} className="text-kuali-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-kuali-text-dark">{label}</div>
              <div className="text-xs text-kuali-text-mid">{desc}</div>
            </div>
            <ArrowRight size={16} className="text-kuali-text-light shrink-0" />
          </div>
        </Link>
      ))}
    </div>
  );
}
