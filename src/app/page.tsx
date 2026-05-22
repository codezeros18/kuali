"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatedNumber } from "@/components/landingPage/AnimatedNumber";
import { AuthModal } from "@/components/landingPage/AuthModal";
import { OverviewSection } from "@/components/landingPage/OverviewSection";
import { StickyScrollSection } from "@/components/landingPage/StickyScrollSection";
import { fadeUp, metrics, scaleUp, stagger, stats } from "@/components/landingPage/constants";
import type { AuthMode } from "@/components/landingPage/types";

export default function Page() {
  const [authModal, setAuthModal] = useState<AuthMode | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setIsLoggedIn(true); })
      .catch(() => null);
  }, []);

  function handleLogin() {
    if (isLoggedIn) { window.location.href = "/dashboard"; return; }
    setAuthModal("login");
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] antialiased">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ x: [0, 22, 0], y: [0, -18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-orange-100/80 via-amber-50/40 to-transparent blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -14, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-amber-50/70 to-transparent blur-[90px]"
        />
      </div>

      <div className="relative z-10">
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-5"
        >
          <div className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="cursor-pointer select-none"
            >
              <img src="/kuali-logo-mark.svg" alt="Kuali" className="w-10 h-10" />
            </motion.div>
            <span className="font-black text-[28px] tracking-tight">kuali</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur border border-[#E5E5E3] rounded-full px-3.5 py-1.5 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-[#6B6B6B]">Gunadarma Code Week 2.0</span>
            </div>
            <button
              onClick={handleLogin}
              className="hidden sm:block text-[13px] font-bold text-[#6B6B6B] px-4 py-2.5 rounded-full hover:bg-[#F4F4F2] active:scale-[0.97] transition-all"
            >
              {isLoggedIn ? "Ke Dashboard" : "Masuk"}
            </button>
            <button
              onClick={() => isLoggedIn ? window.location.href = "/dashboard" : setAuthModal("register")}
              className="bg-[#E8541A] text-white text-[13px] font-bold px-5 py-2.5 rounded-full shadow-lg shadow-orange-200/50 hover:bg-[#d4491a] active:scale-[0.97] transition-all"
            >
              {isLoggedIn ? "Dashboard" : "Daftar"}
            </button>
          </div>
        </motion.nav>

        <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-20 lg:pt-16 lg:pb-28">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center text-center">
            <motion.div variants={fadeUp} className="mb-7">
              <span className="inline-flex items-center gap-2 bg-orange-50 text-[#E8541A] border border-orange-100 rounded-full px-4 py-1.5 text-[12px] font-bold">
                <Zap size={11} strokeWidth={2.5} fill="currentColor" />
                WhatsApp-first · UMKM Kuliner · AI Otomatis
              </span>
            </motion.div>

            <motion.h1 variants={stagger} className="text-[clamp(3.25rem,10.5vw,7.75rem)] font-black tracking-tighter leading-[0.9] mb-7">
              <motion.span variants={fadeUp} className="block">
                Order{" "}
                <span className="text-[#E8541A] relative inline-block">
                  rapi
                  <motion.span
                    className="absolute left-0 -bottom-1 right-0 h-[6px] lg:h-[9px] bg-orange-100 -z-10 rounded-sm"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.75, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
                ,
              </motion.span>
              <motion.span variants={fadeUp} className="block">
                produksi{" "}
                <span className="text-[#E8541A] relative inline-block">
                  siap
                  <motion.span
                    className="absolute left-0 -bottom-1 right-0 h-[6px] lg:h-[9px] bg-orange-100 -z-10 rounded-sm"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
                .
              </motion.span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[15px] lg:text-[17px] text-[#6B6B6B] max-w-[420px] leading-relaxed mb-8">
              Sistem parsing AI yang mengubah chat WhatsApp pelanggan menjadi alur produksi kuliner yang terstruktur.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap justify-center mb-14">
              <Link href="/demo" className="bg-[#E8541A] text-white font-bold text-[13px] px-7 py-3.5 rounded-2xl flex items-center gap-2 shadow-xl shadow-orange-200/60 hover:bg-[#d4491a] active:scale-[0.97] transition-all">
                Lihat Demo <ArrowRight size={14} />
              </Link>
              <Link href="/dashboard" className="bg-white text-[#1A1A1A] font-bold text-[13px] px-7 py-3.5 rounded-2xl flex items-center gap-2 border border-[#E5E5E3] shadow-sm hover:bg-[#F4F4F2] active:scale-[0.97] transition-all">
                Dashboard
              </Link>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-3 gap-3 w-full max-w-md lg:max-w-lg">
              {stats.map((stat, index) => (
                <motion.div key={index} variants={scaleUp} className="bg-white border border-[#E5E5E3] rounded-2xl p-4 lg:p-5 text-center shadow-sm">
                  <div className="text-[clamp(1.5rem,4vw,2.25rem)] font-black tabular-nums text-[#1A1A1A] leading-none mb-1.5">
                    <AnimatedNumber value={stat.value} prefix={stat.prefix ?? ""} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] text-[#ADADAD] font-semibold uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <StickyScrollSection />
        <OverviewSection />

        <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-[#1A1A1A] rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white font-bold text-sm">Server AI Aktif</span>
            </div>
            <div className="flex items-center gap-6 sm:gap-10">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-white font-black text-sm font-mono">{metric.val}</div>
                  <div className="text-[10px] text-white/35 uppercase tracking-wider mt-0.5">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative bg-gradient-to-br from-[#E8541A] to-[#F97316] rounded-[32px] p-10 lg:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-1/2 -right-1/4 w-3/4 h-full bg-white/5 rounded-full blur-[70px]" />
              <div className="absolute -bottom-1/2 -left-1/4 w-1/2 h-full bg-black/10 rounded-full blur-[50px]" />
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-white tracking-tight leading-[1.05]">
                Siap tingkatkan efisiensi<br className="hidden sm:block" /> dapur kamu?
              </h2>
              <p className="text-white/75 text-[14px] lg:text-[15px] max-w-sm">
                Coba simulasi demo Kuali sekarang, tanpa perlu registrasi.
              </p>
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <Link href="/demo" className="bg-white text-[#E8541A] font-black text-[13px] px-8 py-3.5 rounded-2xl flex items-center gap-2 shadow-xl hover:bg-orange-50 active:scale-[0.97] transition-all">
                  Mulai Demo Sekarang <ArrowRight size={14} />
                </Link>
                <button
                  onClick={handleLogin}
                  className="bg-white/15 text-white font-bold text-[13px] px-8 py-3.5 rounded-2xl border border-white/25 hover:bg-white/25 active:scale-[0.97] transition-all backdrop-blur-sm"
                >
                  {isLoggedIn ? "Ke Dashboard" : "Masuk ke Kuali"}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="max-w-6xl mx-auto px-5 sm:px-8 pb-10 pt-8 flex items-center justify-between border-t border-[#E5E5E3]">
          <div className="flex items-center gap-2">
            <img src="/kuali-logo-mark.svg" alt="Kuali" className="w-6 h-6 opacity-80" />
            <span className="text-[12px] font-bold text-[#6B6B6B]">kuali</span>
          </div>
          <span className="text-[11px] text-[#ADADAD] hidden sm:block">Gunadarma Code Week 2.0 · MVP Prototype</span>
          <Link href="/about" className="text-[12px] text-[#6B6B6B] font-bold hover:text-[#E8541A] transition-colors flex items-center gap-1">
            Tentang <ArrowUpRight size={11} />
          </Link>
        </footer>
      </div>

      <AnimatePresence>
        {authModal && (
          <AuthModal defaultMode={authModal} onClose={() => setAuthModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
