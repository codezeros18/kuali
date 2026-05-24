"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useLayoutEffect, useRef } from "react";

// Fires before browser paint on the client (prevents flash); falls back to
// useEffect on the server where useLayoutEffect would warn.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard, ClipboardList, ChefHat, BarChart2,
  MessageCircle, ArrowLeft, LogOut, Store,
  Menu, X, ChevronLeft, ChevronRight, HelpCircle, User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/user-context";

// ── Responsive tier
//   mobile   < 768px  → full-width, bottom nav + hamburger
//   tablet   768–1023px → collapsed icon sidebar (68px)
//   desktop  1024px+  → full sidebar (240px)
//
// HEADER_H is shared between sidebar logo section and the top bar so the
// horizontal divider lines align perfectly across both panels.
const HEADER_H = "h-[65px]";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Hari Ini",  Icon: LayoutDashboard },
  { href: "/orders",    label: "Pesanan",   Icon: ClipboardList },
  { href: "/production",label: "Produksi",  Icon: ChefHat },
  { href: "/summary",   label: "Rekap",     Icon: BarChart2 },
];

const SIDEBAR_EXTRA_ITEMS = [
  { href: "/profile", label: "Profil Usaha", Icon: Store },
  { href: "/help",    label: "Bantuan",       Icon: HelpCircle },
];

// ── Sidebar collapse (localStorage-persisted) ────────────────────────────────
function useSidebarCollapsed() {
  // Default: expanded (false). useIsomorphicLayoutEffect corrects from
  // localStorage before the first browser paint — so there is no flash and
  // no unwanted expand/collapse animation when navigating between pages.
  const [collapsed, setCollapsed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("kuali_sidebar_collapsed");
      if (stored !== null) {
        setCollapsed(stored === "true");
      }
    } catch {}
  }, []);

  const toggle = () => setCollapsed((prev) => {
    const next = !prev;
    try { localStorage.setItem("kuali_sidebar_collapsed", String(next)); } catch {}
    return next;
  });

  return { collapsed, toggle };
}

async function handleLogout() {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/";
}

// ── Desktop / Tablet sidebar ──────────────────────────────────────────────────
function DesktopSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUser();

  return (
    // sticky so it stays in place as page scrolls; no overflow-hidden here —
    // the toggle button at -right-3 must not be clipped.
    // Transition is only enabled after `ready` (post-localStorage-read) so
    // navigating between pages never triggers an unwanted grow/shrink animation.
    <aside
      className={cn(
        "hidden md:flex flex-col shrink-0 bg-white border-r border-kuali-border h-screen sticky top-0 z-20 transition-[width] duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-60"
      )}
    >
      {/* Inner wrapper clips label text during width animation */}
      <div className="flex flex-col h-full overflow-hidden">

        {/* Logo — HEADER_H so it aligns with DesktopTopBar */}
        <div className={cn(
          "border-b border-kuali-border flex items-center shrink-0",
          HEADER_H,
          collapsed ? "justify-center px-4" : "px-5"
        )}>
          {collapsed ? (
            <Link href="/" className="group">
              <img src="/kuali-logo-mark.svg" alt="Kuali" className="w-9 h-9 group-hover:opacity-80 transition-opacity" />
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-3 group min-w-0">
              <img src="/kuali-logo-mark.svg" alt="Kuali" className="w-9 h-9 shrink-0 group-hover:opacity-80 transition-opacity" />
              <div className="min-w-0">
                <div className="font-black text-sm text-kuali-text-dark leading-tight tracking-tight">kuali</div>
                <div className="text-[10px] text-kuali-text-light leading-tight truncate">
                  {user?.business ?? user?.name ?? "Kuali"}
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Main nav */}
        <nav className={cn("flex flex-col gap-1 py-4 flex-1 overflow-y-auto", collapsed ? "px-2" : "px-3")}>
          {!collapsed && (
            <p className="text-[9px] font-semibold text-kuali-text-light uppercase tracking-widest px-2 mb-2">Navigasi</p>
          )}
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href} href={href}
                title={collapsed ? label : undefined}
                className={cn(
                  "flex items-center rounded-xl transition-all whitespace-nowrap text-sm font-medium",
                  collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
                  active
                    ? "bg-kuali-primary text-white shadow-sm"
                    : "text-kuali-text-mid hover:bg-kuali-surface-alt hover:text-kuali-text-dark"
                )}
              >
                <Icon size={16} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
                {!collapsed && label}
              </Link>
            );
          })}
        </nav>

        {/* Settings nav */}
        <div className={cn("pb-2 shrink-0", collapsed ? "px-2" : "px-3")}>
          {!collapsed && (
            <p className="text-[9px] font-semibold text-kuali-text-light uppercase tracking-widest px-2 mb-2">Pengaturan</p>
          )}
          {SIDEBAR_EXTRA_ITEMS.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href} href={href}
                title={collapsed ? label : undefined}
                className={cn(
                  "flex items-center rounded-xl transition-all whitespace-nowrap text-sm font-medium",
                  collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
                  active
                    ? "bg-kuali-primary text-white shadow-sm"
                    : "text-kuali-text-mid hover:bg-kuali-surface-alt hover:text-kuali-text-dark"
                )}
              >
                <Icon size={16} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
                {!collapsed && label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className={cn("pb-5 shrink-0 flex flex-col gap-2", collapsed ? "px-2 items-center" : "px-4")}>
          {collapsed ? (
            <button
              onClick={() => router.push("/demo")}
              title="Proses Chat Baru"
              className="w-10 h-10 rounded-xl bg-kuali-primary text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-sm"
            >
              <MessageCircle size={16} />
            </button>
          ) : (
            <button onClick={() => router.push("/demo")} className="btn-primary w-full text-sm py-2.5 min-h-[40px]">
              <MessageCircle size={15} /> Proses Chat Baru
            </button>
          )}
        </div>
      </div>

      {/* Collapse toggle — outside inner wrapper to escape overflow:hidden
          top-[32px] = half of HEADER_H (65px) so it sits on the divider line */}
      <button
        onClick={onToggle}
        title={collapsed ? "Perluas sidebar" : "Perkecil sidebar"}
        className="absolute top-[32px] -translate-y-1/2 -right-3 w-6 h-6 bg-white border border-kuali-border rounded-full flex items-center justify-center shadow-sm hover:bg-kuali-surface-alt transition-colors z-30"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}

// ── Mobile slide drawer ───────────────────────────────────────────────────────
function MobileMenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUser();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white flex flex-col shadow-2xl"
          >
            <div className={cn("flex items-center justify-between px-5 border-b border-kuali-border shrink-0", HEADER_H)}>
              <div className="flex items-center gap-2.5">
                <img src="/kuali-logo-mark.svg" alt="Kuali" className="w-8 h-8" />
                <div>
                  <div className="font-black text-sm text-kuali-text-dark leading-tight">kuali</div>
                  <div className="text-[10px] text-kuali-text-light leading-tight truncate max-w-[140px]">
                    {user?.business ?? user?.name ?? "Kuali"}
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X size={15} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-3 py-4 flex-1 overflow-y-auto">
              <p className="text-[9px] font-semibold text-kuali-text-light uppercase tracking-widest px-2 mb-2">Navigasi</p>
              {NAV_ITEMS.map(({ href, label, Icon }) => {
                const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                return (
                  <Link key={href} href={href} onClick={onClose}
                    className={cn("flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                      active ? "bg-kuali-primary text-white shadow-sm" : "text-kuali-text-mid hover:bg-kuali-surface-alt hover:text-kuali-text-dark")}>
                    <Icon size={17} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
                    {label}
                  </Link>
                );
              })}
              <p className="text-[9px] font-semibold text-kuali-text-light uppercase tracking-widest px-2 mb-2 mt-4">Lainnya</p>
              {SIDEBAR_EXTRA_ITEMS.map(({ href, label, Icon }) => {
                const active = pathname === href;
                return (
                  <Link key={href} href={href} onClick={onClose}
                    className={cn("flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                      active ? "bg-kuali-primary text-white shadow-sm" : "text-kuali-text-mid hover:bg-kuali-surface-alt hover:text-kuali-text-dark")}>
                    <Icon size={17} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-4 py-5 border-t border-kuali-border flex flex-col gap-2 shrink-0">
              <button onClick={() => { onClose(); router.push("/demo"); }} className="btn-primary w-full text-sm py-3">
                <MessageCircle size={15} /> Proses Chat Baru
              </button>
              <button onClick={() => { onClose(); handleLogout(); }}
                className="flex items-center justify-center gap-2 text-sm text-red-500 hover:bg-red-50 rounded-xl py-2.5 font-medium transition-colors w-full">
                <LogOut size={15} /> Keluar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Mobile bottom nav ─────────────────────────────────────────────────────────
function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-kuali-border z-20 safe-area-bottom">
      <div className="flex">
        {NAV_ITEMS.map(({ label, href, Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href}
              className={cn("flex-1 flex flex-col items-center justify-center py-3 gap-0.5 min-h-[60px] transition-colors",
                isActive ? "text-kuali-primary" : "text-kuali-text-light")}>
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className={cn("text-[10px]", isActive ? "font-semibold" : "font-normal")}>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ── Profile Dropdown ──────────────────────────────────────────────────────────
function ProfileDropdown() {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="relative" ref={ref}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-9 h-9 rounded-full bg-orange-500 text-white font-black text-[13px] flex items-center justify-center transition-all shadow-sm hover:bg-orange-600 active:scale-95",
          open && "ring-2 ring-orange-300 ring-offset-1"
        )}
      >
        {initials}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white rounded-2xl border border-[#E8E8E6] shadow-xl shadow-black/[0.08] overflow-hidden z-50"
          style={{ animation: "modal-enter 0.18s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          {/* User info */}
          <div className="px-4 py-3 border-b border-[#F4F4F2]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <User size={14} className="text-orange-500" />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-black text-[#1A1A1A] leading-tight truncate">{user?.name ?? "Pengguna"}</div>
                {user?.business && (
                  <div className="text-[11px] text-[#888] font-medium truncate">{user.business}</div>
                )}
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="p-1.5 flex flex-col gap-0.5">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-[#555] hover:bg-[#F4F4F2] transition-colors"
            >
              <Store size={15} className="text-[#ADADAD]" />
              Profil Usaha
            </Link>
            <Link
              href="/help"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-[#555] hover:bg-[#F4F4F2] transition-colors"
            >
              <HelpCircle size={15} className="text-[#ADADAD]" />
              Bantuan
            </Link>
            <div className="h-px bg-[#F4F4F2] mx-1 my-0.5" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-colors w-full text-left"
            >
              <LogOut size={15} />
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tablet / Desktop top bar — HEADER_H matches sidebar logo height ───────────
function DesktopTopBar({ title, subtitle, right, back }: {
  title: string; subtitle?: string; right?: React.ReactNode; back?: boolean;
}) {
  const router = useRouter();
  return (
    <div className={cn(
      "sticky top-0 z-10 bg-white border-b border-kuali-border px-6 flex items-center justify-between shrink-0",
      HEADER_H
    )}>
      <div className="flex items-center gap-3 min-w-0">
        {back && (
          <button onClick={() => router.back()}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-kuali-surface-alt transition-colors text-kuali-text-mid shrink-0">
            <ArrowLeft size={18} />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-base font-black text-kuali-text-dark leading-tight tracking-tight truncate">{title}</h1>
          {subtitle && <p className="text-xs text-kuali-text-mid mt-0.5 truncate">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-3">
        {right}
        <ProfileDropdown />
      </div>
    </div>
  );
}

// ── Mobile header ─────────────────────────────────────────────────────────────
function MobileHeader({ title, subtitle, right, left, onMenuOpen }: {
  title: string; subtitle?: string; right?: React.ReactNode;
  left?: React.ReactNode; onMenuOpen: () => void;
}) {
  return (
    <div className={cn("sticky top-0 z-10 flex items-center justify-between px-4 bg-white border-b border-kuali-border", HEADER_H)}>
      <div className="flex items-center gap-3 min-w-0">
        {left && <div className="shrink-0">{left}</div>}
        <div className="min-w-0">
          <h1 className="font-semibold text-base text-kuali-text-dark leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-xs text-kuali-text-mid mt-0.5 truncate">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-3">
        {right}
        <button onClick={onMenuOpen}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-kuali-text-dark hover:bg-kuali-surface-alt transition-colors"
          aria-label="Buka menu">
          <Menu size={18} />
        </button>
      </div>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────
interface ShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  desktopContent?: React.ReactNode;
  mobileHeaderRight?: React.ReactNode;
  mobileHeaderLeft?: React.ReactNode;
  back?: boolean;
  noPadding?: boolean;
  noBottomNav?: boolean;
  showMobileHeader?: boolean;
  fullHeight?: boolean;
  className?: string;
}

export function Shell({
  children, title, subtitle, headerRight, desktopContent,
  mobileHeaderRight, mobileHeaderLeft, back,
  noPadding, noBottomNav, showMobileHeader = true,
  fullHeight = false, className,
}: ShellProps) {
  const { collapsed, toggle } = useSidebarCollapsed();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className={cn("bg-kuali-background", fullHeight ? "h-screen overflow-hidden" : "min-h-screen")}>
      <MobileMenuDrawer open={showMobileMenu} onClose={() => setShowMobileMenu(false)} />

      {/* ── TABLET + DESKTOP (md = 768px+) ────────────────────── */}
      <div className={cn("hidden md:flex", fullHeight ? "h-screen overflow-hidden" : "min-h-screen")}>
        <DesktopSidebar collapsed={collapsed} onToggle={toggle} />
        <div className={cn("flex-1 flex flex-col min-w-0", fullHeight ? "h-screen overflow-hidden" : "min-h-screen")}>
          <DesktopTopBar title={title} subtitle={subtitle} right={headerRight} back={back} />
          <main className={cn(
            "flex-1 overflow-y-auto",
            /* Fluid padding: tighter on tablet, spacious on desktop */
            "p-4 md:p-5 lg:p-7",
            fullHeight && "overflow-y-auto",
            className
          )}>
            {desktopContent ?? children}
          </main>
        </div>
      </div>

      {/* ── MOBILE (< md = 768px) — full width, no centering ──── */}
      <div className={cn(
        "md:hidden flex flex-col w-full bg-kuali-background",
        fullHeight ? "h-screen overflow-hidden" : "min-h-screen",
        !noBottomNav && "pb-[60px]"  /* space for fixed bottom nav */
      )}>
        {showMobileHeader && (
          <MobileHeader
            title={title} subtitle={subtitle}
            right={mobileHeaderRight} left={mobileHeaderLeft}
            onMenuOpen={() => setShowMobileMenu(true)}
          />
        )}
        <div className={cn("flex-1", fullHeight && "overflow-y-auto")}>
          {children}
        </div>
        {!noBottomNav && <MobileBottomNav />}
      </div>
    </div>
  );
}

// ── Legacy exports ────────────────────────────────────────────────────────────
export function AppShell({ children, className, noPadding }: {
  children: React.ReactNode; className?: string; noPadding?: boolean;
}) {
  return (
    <div className="min-h-screen bg-kuali-background">
      <div className={cn("w-full min-h-screen bg-kuali-background relative", !noPadding && "pb-[60px]", className)}>
        {children}
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, right, left, sticky }: {
  title: string; subtitle?: string; right?: React.ReactNode; left?: React.ReactNode; sticky?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-between px-4 py-4 bg-white border-b border-kuali-border", sticky && "sticky top-0 z-10")}>
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
