"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, ClipboardList, ChefHat, BarChart2,
  MessageCircle, Home, ArrowLeft, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Navigation items ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { href: "/dashboard", label: "Hari Ini", Icon: LayoutDashboard },
  { href: "/orders",    label: "Pesanan",  Icon: ClipboardList },
  { href: "/production",label: "Produksi", Icon: ChefHat },
  { href: "/summary",   label: "Rekap",    Icon: BarChart2 },
];

// ── Desktop sidebar ───────────────────────────────────────────────────────────
function DesktopSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-white border-r border-kuali-border min-h-screen sticky top-0 z-20">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-kuali-border">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/kuali-logo-mark.svg"
            alt="Kuali"
            className="w-9 h-9 shrink-0 group-hover:opacity-80 transition-opacity"
          />
          <div>
            <div className="font-black text-sm text-kuali-text-dark leading-tight tracking-tight">kuali</div>
            <div className="text-[10px] text-kuali-text-light leading-tight">Dapur Bu Rani</div>
          </div>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        <p className="text-[9px] font-semibold text-kuali-text-light uppercase tracking-widest px-2 mb-2">Navigasi</p>
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-kuali-primary text-white shadow-sm"
                  : "text-kuali-text-mid hover:bg-kuali-surface-alt hover:text-kuali-text-dark"
              )}
            >
              <Icon size={16} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* CTA */}
      <div className="px-4 pb-6 flex flex-col gap-2">
        <button
          onClick={() => router.push("/demo")}
          className="btn-primary w-full text-sm py-2.5 min-h-[40px]"
        >
          <MessageCircle size={15} />
          Proses Chat Baru
        </button>
        <Link
          href="/about"
          className="flex items-center justify-center gap-1.5 text-[10px] text-kuali-text-light hover:text-kuali-primary font-medium transition-colors py-1"
        >
          <Info size={10} />
          Tentang Kuali
        </Link>
        <p className="text-[9px] text-kuali-text-light text-center leading-relaxed">
          MVP Prototype · Data Simulasi
        </p>
      </div>
    </aside>
  );
}

// ── Mobile bottom nav ─────────────────────────────────────────────────────────
function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 flex justify-center z-20">
      <div className="w-full max-w-[430px] bg-white border-t border-kuali-border safe-area-bottom">
        <div className="flex">
          {NAV_ITEMS.map(({ label, href, Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center py-3 gap-0.5 min-h-[60px] transition-colors",
                  isActive ? "text-kuali-primary" : "text-kuali-text-light"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                <span className={cn("text-[10px]", isActive ? "font-semibold" : "font-normal")}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Desktop top bar ────────────────────────────────────────────────────────────
function DesktopTopBar({
  title, subtitle, right, back,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  back?: boolean;
}) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-kuali-border px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {back && (
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-kuali-surface-alt transition-colors text-kuali-text-mid"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <div>
          <h1 className="text-lg font-black text-kuali-text-dark leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="text-sm text-kuali-text-mid mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {right && <div className="flex items-center gap-3">{right}</div>}
    </div>
  );
}

// ── Mobile header ──────────────────────────────────────────────────────────────
function MobileHeader({
  title, subtitle, right, left, sticky,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
  sticky?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-4 bg-white border-b border-kuali-border",
        sticky && "sticky top-0 z-10"
      )}
    >
      <div className="flex items-center gap-3">
        {left && <div className="shrink-0">{left}</div>}
        <div>
          <h1 className="font-semibold text-base text-kuali-text-dark leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-kuali-text-mid mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

// ── Main Shell ─────────────────────────────────────────────────────────────────
interface ShellProps {
  children: React.ReactNode;
  /** Page title shown in header */
  title: string;
  /** Subtitle shown below title */
  subtitle?: string;
  /** Element shown on right of desktop topbar */
  headerRight?: React.ReactNode;
  /** Desktop: content rendered in main area. Mobile: falls back to children */
  desktopContent?: React.ReactNode;
  /** Mobile: extra node on header right */
  mobileHeaderRight?: React.ReactNode;
  /** Mobile: extra node on header left (e.g. back button) */
  mobileHeaderLeft?: React.ReactNode;
  /** Show back button on desktop topbar */
  back?: boolean;
  /** Remove default padding from mobile content */
  noPadding?: boolean;
  /** Hide bottom nav (e.g. non-main pages) */
  noBottomNav?: boolean;
  /** Show mobile header (default true) */
  showMobileHeader?: boolean;
  /** Lock outer height to viewport — no page scroll, content scrolls internally */
  fullHeight?: boolean;
  className?: string;
}

export function Shell({
  children,
  title,
  subtitle,
  headerRight,
  desktopContent,
  mobileHeaderRight,
  mobileHeaderLeft,
  back,
  noPadding,
  noBottomNav,
  showMobileHeader = true,
  fullHeight = false,
  className,
}: ShellProps) {
  return (
    <div className={cn("bg-kuali-background", fullHeight ? "h-screen overflow-hidden" : "min-h-screen")}>
      {/* ── DESKTOP ────────────────────────────────────────────── */}
      <div className={cn("hidden lg:flex", fullHeight ? "h-screen overflow-hidden" : "min-h-screen")}>
        <DesktopSidebar />
        <div className={cn(
          "flex-1 flex flex-col",
          fullHeight ? "h-screen overflow-hidden" : "min-h-screen overflow-auto"
        )}>
          <DesktopTopBar title={title} subtitle={subtitle} right={headerRight} back={back} />
          <main className={cn("flex-1 px-8 py-6", fullHeight && "overflow-y-auto", className)}>
            {desktopContent ?? children}
          </main>
        </div>
      </div>

      {/* ── MOBILE ─────────────────────────────────────────────── */}
      <div className={cn("lg:hidden flex justify-center", fullHeight && "h-screen overflow-hidden")}>
        <div className={cn(
          "w-full max-w-[430px] bg-kuali-background relative flex flex-col",
          fullHeight ? "h-screen overflow-hidden" : "min-h-screen",
          !noBottomNav && "pb-20"
        )}>
          {showMobileHeader && (
            <MobileHeader
              title={title}
              subtitle={subtitle}
              right={mobileHeaderRight}
              left={mobileHeaderLeft}
              sticky
            />
          )}
          <div className={cn("flex-1", fullHeight && "overflow-y-auto", !noPadding && "")}>
            {children}
          </div>
          {!noBottomNav && <MobileBottomNav />}
        </div>
      </div>
    </div>
  );
}

// ── Legacy exports (backward compat) ─────────────────────────────────────────
export function AppShell({
  children,
  className,
  noPadding,
}: {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}) {
  return (
    <div className="min-h-screen bg-kuali-background flex justify-center">
      <div className={cn(
        "w-full max-w-[430px] min-h-screen bg-kuali-background relative",
        !noPadding && "pb-20",
        className
      )}>
        {children}
      </div>
    </div>
  );
}

export function PageHeader({
  title, subtitle, right, left, sticky,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
  sticky?: boolean;
}) {
  return (
    <div className={cn(
      "flex items-center justify-between px-4 py-4 bg-white border-b border-kuali-border",
      sticky && "sticky top-0 z-10"
    )}>
      <div className="flex items-center gap-3">
        {left && <div>{left}</div>}
        <div>
          <h1 className="font-semibold text-base text-kuali-text-dark">{title}</h1>
          {subtitle && <p className="text-xs text-kuali-text-mid mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-xs font-semibold text-kuali-text-mid uppercase tracking-wider mb-3", className)}>
      {children}
    </h2>
  );
}

export function Divider({ label }: { label?: string }) {
  if (!label) return <div className="border-t border-kuali-border my-4" />;
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 border-t border-kuali-border" />
      <span className="text-xs text-kuali-text-light font-medium">{label}</span>
      <div className="flex-1 border-t border-kuali-border" />
    </div>
  );
}
