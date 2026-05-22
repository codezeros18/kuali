"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  X,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { AuthMode } from "./types";

interface AuthModalProps {
  defaultMode?: AuthMode;
  onClose: () => void;
}

export function AuthModal({ defaultMode = "login", onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", business: "", password: "", confirm: "" });

  const set = (key: keyof typeof form, value: string) => {
    setError(null);
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSubmit() {
    setError(null);
    if (mode === "register" && form.password !== form.confirm) {
      setError("Kata sandi tidak cocok.");
      return;
    }
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body = mode === "login"
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password, business: form.business };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({})) as { error?: string };
      if (!res.ok) { setError(data.error ?? "Terjadi kesalahan server."); return; }
      window.location.href = "/dashboard";
    } catch {
      setError("Tidak dapat terhubung ke server. Cek apakah server sudah berjalan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">

      {/* Layer 1 — blur static, hanya composite sekali terhadap background diam */}
      <div className="absolute inset-0 backdrop-blur-md" />

      {/* Layer 2 — tint, CSS animation (compositor thread) */}
      <div className="absolute inset-0 bg-black/40 animate-overlay-enter cursor-pointer" onClick={onClose} />

      {/*
        Modal card — CSS animation untuk ENTER (compositor thread, tidak kompetisi dengan React render).
        Framer Motion hanya dipakai untuk EXIT via AnimatePresence di parent.
        Tidak ada scale: overflow:hidden + scale = clip rect recalc per frame.
      */}
      <div
        className="relative bg-white rounded-[28px] w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-[1.1fr_1fr] min-h-[580px] border border-white/10 animate-modal-enter"
        style={{ boxShadow: "0 32px 100px -20px rgba(0,0,0,0.3)" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 w-9 h-9 rounded-full bg-gray-100 md:bg-white/10 hover:bg-gray-200 md:hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 group shadow-sm border border-gray-200/20"
        >
          <X size={16} className="text-gray-600 md:text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* ── Panel kiri (desktop) ── */}
        <div className="relative bg-gradient-to-br from-[#E8541A] via-[#F97316] to-[#FB923C] p-10 hidden md:flex flex-col justify-between overflow-hidden text-white">
          {/* Dot grid — tidak pakai filter, murni background-image */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)", backgroundSize: "24px 24px" }}
          />
          {/* Ornamen glow — radial-gradient, BUKAN filter:blur (tidak bikin compositing layer) */}
          <div className="absolute -top-16 -right-16 w-60 h-60 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,0,0,0.18) 0%, transparent 70%)" }} />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <img src="/kuali-logo-mark.svg" alt="Kuali" className="w-9 h-9 brightness-0 invert" />
            <span className="font-black text-2xl tracking-tight text-white">kuali</span>
          </div>

          {/* Teks kampanye — initial={false} agar TIDAK animate saat modal open, hanya saat switch mode */}
          <div className="relative z-10 mb-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col gap-3"
              >
                {mode === "login" ? (
                  <>
                    <h2 className="text-[2.25rem] font-black tracking-tight leading-[1.15]">
                      Merapikan Pesanan,<br />Menyiapkan Dapur.
                    </h2>
                    <p className="text-white/80 text-[14px] font-medium leading-relaxed max-w-xs mt-2">
                      Masuk kembali untuk mengelola pesanan aktual hari ini secara real-time.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-[2.25rem] font-black tracking-tight leading-[1.15]">
                      Asisten Pintar<br />Kuliner Pre-Order.
                    </h2>
                    <p className="text-white/80 text-[14px] font-medium leading-relaxed max-w-xs mt-2">
                      Ubah chat WhatsApp jadi draft order otomatis. Gratis selamanya.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-2.5 mt-8 border-t border-white/10 pt-6">
              {[
                "Otomatisasi Ekstraksi Manifes Teks Chat",
                "Kalkulator Kiloan Bahan Mentah Dapur",
                "Monitor Piutang Belum Lunas Instan",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[12px] font-bold text-white/90">
                  <CheckCircle2 size={13} className="text-orange-200 fill-orange-500/20" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-white/60">
            <Sparkles size={11} /> MVP Prototype Platform v2.0
          </div>
        </div>

        {/* ── Panel kanan (form) ── */}
        <div className="p-8 sm:p-10 flex flex-col justify-center bg-white h-full">

          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-6 md:hidden">
            <img src="/kuali-logo-mark.svg" alt="Kuali" className="w-9 h-9" />
            <span className="font-black text-xl tracking-tight text-[#1A1A1A]">kuali</span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-[#F4F4F2] p-1 rounded-xl mb-6 w-full border border-gray-100">
            {(["login", "register"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={cn(
                  "flex-1 py-2.5 text-[13px] font-bold rounded-lg transition-all",
                  mode === item ? "text-[#1A1A1A] bg-white shadow-sm" : "text-[#888888] hover:text-[#555555]"
                )}
              >
                {item === "login" ? "Masuk ke Akun" : "Daftar Baru"}
              </button>
            ))}
          </div>

          {/* Form — initial={false} agar form TIDAK animate saat modal pertama buka */}
          <div className="flex-1 flex flex-col justify-center min-h-[320px]">
            <AnimatePresence mode="wait" initial={false}>
              {mode === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4 w-full"
                >
                  <div>
                    <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight">Selamat Datang Kembali</h3>
                    <p className="text-[12px] font-medium text-[#888888] mt-0.5">Masukkan kredensial terdaftar untuk masuk ke dashboard.</p>
                  </div>

                  <div className="flex flex-col gap-3 mt-1">
                    <div className="relative group border-b border-gray-200 focus-within:border-orange-500 transition-colors py-1.5 flex items-center gap-3">
                      <Mail size={15} className="text-[#ADADAD] group-focus-within:text-orange-500 transition-colors shrink-0" />
                      <input type="email" placeholder="Alamat email" value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD]" />
                    </div>
                    <div className="relative group border-b border-gray-200 focus-within:border-orange-500 transition-colors py-1.5 flex items-center gap-3">
                      <Lock size={15} className="text-[#ADADAD] group-focus-within:text-orange-500 transition-colors shrink-0" />
                      <input type={showPw ? "text" : "password"} placeholder="Kata sandi" value={form.password}
                        onChange={(e) => set("password", e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD] pr-8" />
                      <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-1 text-[#ADADAD] hover:text-[#555] transition-colors">
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {error && <p className="text-[12px] text-red-500 font-bold bg-red-50 border border-red-100 p-2.5 rounded-xl">⚠️ {error}</p>}

                  <button type="button" onClick={handleSubmit} disabled={loading}
                    className="w-full bg-orange-500 text-white font-bold text-[14px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                    {loading ? "Memproses..." : <> Masuk ke Kuali <ArrowRight size={15} /> </>}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4 w-full"
                >
                  <div>
                    <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight">Buat Akun Baru</h3>
                    <p className="text-[12px] font-medium text-[#888888] mt-0.5">Gabung bersama pegiat katering mandiri lainnya.</p>
                  </div>

                  <div className="flex flex-col gap-3.5 max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
                    {[
                      { icon: User, key: "name", type: "text", placeholder: "Nama lengkap" },
                      { icon: Mail, key: "email", type: "email", placeholder: "Alamat email" },
                      { icon: Building2, key: "business", type: "text", placeholder: "Nama usaha kuliner / katering" },
                    ].map(({ icon: Icon, key, type, placeholder }) => (
                      <div key={key} className="relative group border-b border-gray-200 focus-within:border-orange-500 transition-colors py-1.5 flex items-center gap-3">
                        <Icon size={15} className="text-[#ADADAD] group-focus-within:text-orange-500 transition-colors shrink-0" />
                        <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]}
                          onChange={(e) => set(key as keyof typeof form, e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD]" />
                      </div>
                    ))}
                    {[
                      { key: "password", show: showPw, toggle: () => setShowPw(v => !v), placeholder: "Kata sandi baru" },
                      { key: "confirm", show: showConfirm, toggle: () => setShowConfirm(v => !v), placeholder: "Ulangi kata sandi" },
                    ].map(({ key, show, toggle, placeholder }) => (
                      <div key={key} className="relative group border-b border-gray-200 focus-within:border-orange-500 transition-colors py-1.5 flex items-center gap-3">
                        <Lock size={15} className="text-[#ADADAD] group-focus-within:text-orange-500 transition-colors shrink-0" />
                        <input type={show ? "text" : "password"} placeholder={placeholder} value={form[key as keyof typeof form]}
                          onChange={(e) => set(key as keyof typeof form, e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD] pr-8" />
                        <button type="button" onClick={toggle} className="absolute right-1 text-[#ADADAD] hover:text-[#555] transition-colors">
                          {show ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    ))}
                  </div>

                  {error && <p className="text-[12px] text-red-500 font-bold bg-red-50 border border-red-100 p-2.5 rounded-xl">⚠️ {error}</p>}

                  <button type="button" onClick={handleSubmit} disabled={loading}
                    className="w-full bg-orange-500 text-white font-bold text-[14px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1">
                    {loading ? "Mendaftarkan..." : <> Buat Akun Gratis <ArrowRight size={15} /> </>}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-center text-[13px] text-[#888888] font-medium mt-5 border-t border-gray-100 pt-4 flex-shrink-0">
            {mode === "login" ? (
              <> Belum punya akun?{" "}<button onClick={() => setMode("register")} className="text-orange-500 font-bold hover:text-orange-600 transition-colors">Daftar Sekarang</button> </>
            ) : (
              <> Sudah punya akun?{" "}<button onClick={() => setMode("login")} className="text-orange-500 font-bold hover:text-orange-600 transition-colors">Masuk</button> </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
