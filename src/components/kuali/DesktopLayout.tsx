"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ClipboardList, ChefHat, FileText, MessageCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/user-context";

const navItems = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/orders", label: "Pesanan", Icon: ClipboardList },
  { href: "/production", label: "Produksi", Icon: ChefHat },
  { href: "/summary", label: "Rekap Harian", Icon: FileText },
];

function DesktopSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUser();

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-white border-r border-kuali-border min-h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-kuali-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-kuali-primary flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <div>
            <div className="font-bold text-sm text-kuali-text-dark leading-tight">kuali</div>
            <div className="text-[10px] text-kuali-text-light leading-tight">{user?.business ?? user?.name ?? "Kuali"}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-left",
                active
                  ? "bg-kuali-primary/10 text-kuali-primary"
                  : "text-kuali-text-mid hover:bg-kuali-surface-alt hover:text-kuali-text-dark"
              )}
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </button>
          );
        })}
      </nav>

      {/* CTA */}
      <div className="px-4 pb-6">
        <button
          onClick={() => router.push("/demo")}
          className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-2.5"
        >
          <MessageCircle size={15} />
          Proses Chat
        </button>
      </div>
    </aside>
  );
}

interface DesktopLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export function DesktopLayout({ children, header }: DesktopLayoutProps) {
  return (
    <div className="min-h-screen bg-kuali-background">
      {/* Mobile layout — max 430px centered */}
      <div className="lg:hidden flex justify-center">
        <div className="w-full max-w-[430px] min-h-screen bg-kuali-background relative pb-20">
          {children}
        </div>
      </div>

      {/* Desktop layout — sidebar + main */}
      <div className="hidden lg:flex min-h-screen">
        <DesktopSidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-auto">
          {header && (
            <div className="sticky top-0 z-10 bg-white border-b border-kuali-border px-8 py-4 flex items-center justify-between">
              {header}
            </div>
          )}
          <main className="flex-1 px-8 py-6 max-w-5xl w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export function DesktopPageHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <>
      <div>
        <h1 className="text-lg font-bold text-kuali-text-dark">{title}</h1>
        {subtitle && <p className="text-sm text-kuali-text-mid mt-0.5">{subtitle}</p>}
      </div>
      {right && <div>{right}</div>}
    </>
  );
}

export function DesktopZapBadge() {
  return (
    <div className="flex items-center gap-1.5 text-xs text-kuali-primary font-medium bg-kuali-primary/10 px-3 py-1.5 rounded-full">
      <Zap size={12} />
      Mock AI aktif
    </div>
  );
}
