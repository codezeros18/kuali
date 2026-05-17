"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle, ClipboardList, ChefHat, BarChart2,
  ArrowRight, Home, CheckCircle,
} from "lucide-react";
import { Shell, SectionTitle } from "@/components/kuali/AppShell";
import { MockWhatsappChat } from "@/components/kuali/MockWhatsappChat";
import { ParsedOrderCard } from "@/components/kuali/ParsedOrderCard";
import { ProductionPlanCard } from "@/components/kuali/ProductionPlanCard";
import { ImpactDashboard } from "@/components/kuali/ImpactDashboard";
import { RoadmapCard } from "@/components/kuali/RoadmapCard";
import { DemoNavigation } from "@/components/kuali/DemoNavigation";
import type { ParsedOrder } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

type DemoStep = "intro" | "parse" | "approve" | "production" | "impact" | "roadmap" | "done";

const steps: { id: DemoStep; label: string; Icon: React.ElementType }[] = [
  { id: "parse", label: "Chat → Draft", Icon: MessageCircle },
  { id: "approve", label: "Konfirmasi", Icon: ClipboardList },
  { id: "production", label: "Produksi", Icon: ChefHat },
  { id: "impact", label: "Dampak", Icon: BarChart2 },
];

const STEP_ORDER: DemoStep[] = ["intro", "parse", "approve", "production", "impact", "roadmap", "done"];

export default function DemoPage() {
  const [step, setStep] = useState<DemoStep>("intro");
  const [parsedOrder, setParsedOrder] = useState<ParsedOrder | null>(null);

  function advance(to?: DemoStep) {
    if (to) { setStep(to); return; }
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) setStep(STEP_ORDER[idx + 1]);
  }

  function handleParsed(order: ParsedOrder) {
    setParsedOrder(order);
  }

  const stepIndex = ["parse", "approve", "production", "impact"].indexOf(step);

  // Shared progress bar (used in both layouts)
  const progressBar = stepIndex >= 0 ? (
    <div className="px-0 py-3 border-b border-kuali-border mb-5">
      <div className="flex items-center gap-1">
        {steps.map((s, i) => {
          const done = stepIndex > i;
          const active = stepIndex === i;
          return (
            <div key={s.id} className="flex items-center gap-1 flex-1">
              <div className={cn(
                "flex-1 h-1.5 rounded-full transition-colors",
                done ? "bg-kuali-primary" : active ? "bg-kuali-primary/40" : "bg-kuali-surface-alt"
              )} />
              {i === steps.length - 1 && (
                <div className={cn("w-1.5 h-1.5 rounded-full", done || active ? "bg-kuali-primary" : "bg-kuali-surface-alt")} />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-1.5">
        {steps.map((s, i) => (
          <span key={s.id} className={cn(
            "text-[9px] font-medium",
            stepIndex >= i ? "text-kuali-primary" : "text-kuali-text-light"
          )}>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  ) : null;

  // ── Desktop content ──────────────────────────────────────────────────────────
  const desktopContent = (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {progressBar}

      {/* INTRO */}
      {step === "intro" && (
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-card p-8 text-center">
            <div className="text-5xl mb-4">👨‍🍳</div>
            <h2 className="text-2xl font-bold text-kuali-text-dark mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              Selamat datang di Demo
            </h2>
            <p className="text-sm text-kuali-text-mid leading-relaxed max-w-md mx-auto">
              Ikuti alur ini untuk melihat bagaimana Kuali membantu Bu Rani mengelola pesanan katering dari WhatsApp.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-5">
            <SectionTitle>Jelajahi halaman</SectionTitle>
            <DemoNavigation />
          </div>

          <button
            onClick={() => advance("parse")}
            className="btn-primary flex items-center justify-center gap-2 max-w-xs mx-auto w-full"
          >
            Mulai Demo Lengkap
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* STEP 1: Parse */}
      {step === "parse" && (
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-card p-5">
            <h3 className="font-semibold text-kuali-text-dark mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
              Langkah 1 — Chat masuk
            </h3>
            <p className="text-xs text-kuali-text-mid mb-4">
              Pilih contoh pesan pelanggan, lalu tekan &ldquo;Parse dengan AI&rdquo; untuk melihat hasil ekstraksi data pesanan.
            </p>
            <MockWhatsappChat onParsed={handleParsed} />
          </div>

          {parsedOrder && (
            <button
              onClick={() => advance("approve")}
              className="btn-primary flex items-center justify-center gap-2 max-w-xs mx-auto w-full"
            >
              Lanjut: Konfirmasi Order
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}

      {/* STEP 2: Approve */}
      {step === "approve" && (
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-card p-5">
            <h3 className="font-semibold text-kuali-text-dark mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
              Langkah 2 — Konfirmasi owner
            </h3>
            <p className="text-xs text-kuali-text-mid mb-4">
              Hasil parsing ditampilkan sebagai draft. Bu Rani memutuskan untuk mengonfirmasi atau menolak.
            </p>
            {parsedOrder ? (
              <ParsedOrderCard
                order={parsedOrder}
                onApprove={async () => {
                  fetch("/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(parsedOrder),
                  }).catch(() => null);
                  setTimeout(() => advance("production"), 800);
                }}
              />
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-kuali-text-mid mb-3">
                  Kembali ke langkah sebelumnya untuk mem-parse chat terlebih dahulu.
                </p>
                <button onClick={() => advance("parse")} className="btn-ghost">
                  Kembali
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: Production */}
      {step === "production" && (
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-card p-5">
            <h3 className="font-semibold text-kuali-text-dark mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
              Langkah 3 — Rencana produksi
            </h3>
            <p className="text-xs text-kuali-text-mid mb-4">
              Setelah order dikonfirmasi, Kuali menghitung estimasi bahan yang dibutuhkan hari ini.
            </p>
            <ProductionPlanCard />
          </div>

          <button
            onClick={() => advance("impact")}
            className="btn-primary flex items-center justify-center gap-2 max-w-xs mx-auto w-full"
          >
            Lanjut: Lihat Dampak
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* STEP 4: Impact */}
      {step === "impact" && (
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-card p-5">
            <h3 className="font-semibold text-kuali-text-dark mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
              Langkah 4 — Rekap & dampak
            </h3>
            <p className="text-xs text-kuali-text-mid mb-4">
              Ringkasan operasional hari ini. Semua angka berdasarkan simulasi demo.
            </p>
            <ImpactDashboard />
          </div>

          <div className="flex gap-3 max-w-xs mx-auto w-full flex-col">
            <button
              onClick={() => advance("roadmap")}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              Lihat Fitur Roadmap <ArrowRight size={16} />
            </button>
            <button
              onClick={() => advance("done")}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Selesai Demo <CheckCircle size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ROADMAP */}
      {step === "roadmap" && (
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-card p-5">
            <h3 className="font-semibold text-kuali-text-dark mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              Roadmap — Fitur Berikutnya
            </h3>
            <RoadmapCard />
          </div>

          <button
            onClick={() => advance("done")}
            className="btn-primary flex items-center justify-center gap-2 max-w-xs mx-auto w-full"
          >
            Selesai Demo <CheckCircle size={16} />
          </button>
        </div>
      )}

      {/* DONE */}
      {step === "done" && (
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-card p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-kuali-text-dark mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              Demo selesai!
            </h2>
            <p className="text-sm text-kuali-text-mid leading-relaxed max-w-md mx-auto">
              Itulah alur kerja Kuali — dari chat WhatsApp hingga rencana produksi, semua dalam satu tempat.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-5">
            <SectionTitle>Jelajahi lebih lanjut</SectionTitle>
            <DemoNavigation />
          </div>

          <button
            onClick={() => { setStep("intro"); setParsedOrder(null); }}
            className="btn-ghost text-center max-w-xs mx-auto w-full"
          >
            Ulangi Demo dari Awal
          </button>
        </div>
      )}
    </div>
  );

  return (
    <Shell
      title="Demo Kuali"
      subtitle="Alur kerja lengkap"
      headerRight={
        <Link href="/" className="flex items-center gap-1.5 text-sm text-kuali-text-mid hover:text-kuali-primary font-medium transition-colors">
          <Home size={15} />
          Beranda
        </Link>
      }
      mobileHeaderRight={
        <Link href="/" className="text-xs text-kuali-primary font-medium flex items-center gap-1">
          <Home size={14} />
          Beranda
        </Link>
      }
      noBottomNav
      desktopContent={desktopContent}
    >
      {/* Mobile content */}
      {/* Step progress indicator */}
      {stepIndex >= 0 && (
        <div className="px-4 py-3 bg-white border-b border-kuali-border">
          <div className="flex items-center gap-1">
            {steps.map((s, i) => {
              const done = stepIndex > i;
              const active = stepIndex === i;
              return (
                <div key={s.id} className="flex items-center gap-1 flex-1">
                  <div className={cn(
                    "flex-1 h-1.5 rounded-full transition-colors",
                    done ? "bg-kuali-primary" : active ? "bg-kuali-primary/40" : "bg-kuali-surface-alt"
                  )} />
                  {i === steps.length - 1 && (
                    <div className={cn("w-1.5 h-1.5 rounded-full", done || active ? "bg-kuali-primary" : "bg-kuali-surface-alt")} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-1">
            {steps.map((s, i) => (
              <span key={s.id} className={cn(
                "text-[9px] font-medium",
                stepIndex >= i ? "text-kuali-primary" : "text-kuali-text-light"
              )}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 py-5 flex flex-col gap-5">
        {/* INTRO */}
        {step === "intro" && (
          <div className="flex flex-col gap-5">
            <div className="card text-center py-6">
              <div className="text-4xl mb-3">👨‍🍳</div>
              <h2 className="text-lg font-bold text-kuali-text-dark mb-1">Selamat datang di Demo</h2>
              <p className="text-sm text-kuali-text-mid leading-relaxed">
                Ikuti alur ini untuk melihat bagaimana Kuali membantu Bu Rani mengelola pesanan katering dari WhatsApp.
              </p>
            </div>
            <div>
              <SectionTitle>Jelajahi halaman</SectionTitle>
              <DemoNavigation />
            </div>
            <button onClick={() => advance("parse")} className="btn-primary flex items-center justify-center gap-2">
              Mulai Demo Lengkap <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 1: Parse */}
        {step === "parse" && (
          <div className="flex flex-col gap-4">
            <div>
              <SectionTitle>Langkah 1 — Chat masuk</SectionTitle>
              <p className="text-xs text-kuali-text-mid mb-3">
                Pilih contoh pesan pelanggan, lalu tekan &ldquo;Parse dengan AI&rdquo; untuk melihat hasil ekstraksi data pesanan.
              </p>
              <MockWhatsappChat onParsed={handleParsed} />
            </div>
            {parsedOrder && (
              <button onClick={() => advance("approve")} className="btn-primary flex items-center justify-center gap-2">
                Lanjut: Konfirmasi Order <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}

        {/* STEP 2: Approve */}
        {step === "approve" && (
          <div className="flex flex-col gap-4">
            <div>
              <SectionTitle>Langkah 2 — Konfirmasi owner</SectionTitle>
              <p className="text-xs text-kuali-text-mid mb-3">
                Hasil parsing ditampilkan sebagai draft. Bu Rani memutuskan untuk mengonfirmasi atau menolak.
              </p>
              {parsedOrder ? (
                <ParsedOrderCard
                  order={parsedOrder}
                  onApprove={async () => {
                    fetch("/api/orders", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(parsedOrder),
                    }).catch(() => null);
                    setTimeout(() => advance("production"), 800);
                  }}
                />
              ) : (
                <div className="card text-center py-6">
                  <p className="text-sm text-kuali-text-mid">
                    Kembali ke langkah sebelumnya untuk mem-parse chat terlebih dahulu.
                  </p>
                  <button onClick={() => advance("parse")} className="btn-ghost mt-3 mx-auto">
                    Kembali
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Production */}
        {step === "production" && (
          <div className="flex flex-col gap-4">
            <div>
              <SectionTitle>Langkah 3 — Rencana produksi</SectionTitle>
              <p className="text-xs text-kuali-text-mid mb-3">
                Setelah order dikonfirmasi, Kuali menghitung estimasi bahan yang dibutuhkan hari ini.
              </p>
              <ProductionPlanCard />
            </div>
            <button onClick={() => advance("impact")} className="btn-primary flex items-center justify-center gap-2">
              Lanjut: Lihat Dampak <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 4: Impact */}
        {step === "impact" && (
          <div className="flex flex-col gap-4">
            <div>
              <SectionTitle>Langkah 4 — Rekap & dampak</SectionTitle>
              <p className="text-xs text-kuali-text-mid mb-3">
                Ringkasan operasional hari ini. Semua angka berdasarkan simulasi demo.
              </p>
              <ImpactDashboard />
            </div>
            <button onClick={() => advance("roadmap")} className="btn-secondary flex items-center justify-center gap-2">
              Lihat Fitur Roadmap <ArrowRight size={16} />
            </button>
            <button onClick={() => advance("done")} className="btn-primary flex items-center justify-center gap-2">
              Selesai Demo <CheckCircle size={16} />
            </button>
          </div>
        )}

        {/* ROADMAP */}
        {step === "roadmap" && (
          <div className="flex flex-col gap-4">
            <div>
              <SectionTitle>Roadmap — Fitur Berikutnya</SectionTitle>
              <RoadmapCard />
            </div>
            <button onClick={() => advance("done")} className="btn-primary flex items-center justify-center gap-2">
              Selesai Demo <CheckCircle size={16} />
            </button>
          </div>
        )}

        {/* DONE */}
        {step === "done" && (
          <div className="flex flex-col gap-5">
            <div className="card text-center py-8">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="text-lg font-bold text-kuali-text-dark mb-1">Demo selesai!</h2>
              <p className="text-sm text-kuali-text-mid leading-relaxed">
                Itulah alur kerja Kuali — dari chat WhatsApp hingga rencana produksi, semua dalam satu tempat.
              </p>
            </div>
            <div>
              <SectionTitle>Jelajahi lebih lanjut</SectionTitle>
              <DemoNavigation />
            </div>
            <button
              onClick={() => { setStep("intro"); setParsedOrder(null); }}
              className="btn-ghost text-center"
            >
              Ulangi Demo dari Awal
            </button>
          </div>
        )}
      </div>
    </Shell>
  );
}
