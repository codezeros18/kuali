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
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    password: "",
    confirm: "",
  });

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
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Terjadi kesalahan.");
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/*
        Frosted glass — dua layer terpisah:
        1. Blur layer: STATIC, dicomposite sekali oleh GPU (background landing page tidak bergerak)
        2. Tint layer: hanya animate opacity — murni compositor, tidak trigger repaint blur
        Ini berbeda dari satu layer blur+animate yang harus reblur tiap frame.
      */}
      <div className="absolute inset-0 backdrop-blur-md" />
      <motion.div
        className="absolute inset-0 bg-black/40 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      />

      <motion.div
        className="relative bg-white rounded-[28px] w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-[1.1fr_1fr] min-h-[580px] border border-white/10"
        style={{
          boxShadow: "0 32px 100px -20px rgba(0,0,0,0.3)",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.25 }}
      >
        {/* Tombol Close Pojok Atas */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 Regal z-30 w-9 h-9 rounded-full bg-gray-100 md:bg-white/10 hover:bg-gray-200 md:hover:bg-white/20 flex items-center justify-center transition-all active:scale-95 group shadow-sm border border-gray-200/20"
        >
          <X size={16} className="text-gray-600 md:text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* ── SISI KIRI: PANEL HERO VISUAL (DESKTOP ONLY) ── */}
        <div className="relative bg-gradient-to-br from-[#E8541A] via-[#F97316] to-[#FB923C] p-10 hidden md:flex flex-col justify-between overflow-hidden text-white">
          {/* Pola Titik Grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Ornamen Ring Sferis */}
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-black/15 rounded-full blur-2xl pointer-events-none" />

          {/* Logo Brand Kuali */}
          <div className="relative z-10 flex items-center gap-3">
            <img src="/kuali-logo-mark.svg" alt="Kuali" className="w-9 h-9 brightness-0 invert" />
            <span className="font-black text-2xl tracking-tight text-white">kuali</span>
          </div>

          {/* Konten Teks Kampanye Dinamis */}
          <div className="relative z-10 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col gap-3"
              >
                {mode === "login" ? (
                  <>
                    <h2 className="text-[2.25rem] font-black tracking-tight leading-[1.15]">
                      Merapikan Pesanan,<br/>Menyiapkan Dapur.
                    </h2>
                    <p className="text-white/80 text-[14px] font-medium leading-relaxed max-w-xs mt-2">
                      Masuk kembali untuk mengelola manifesto porsi masakan aktual Bu Rani hari ini secara real-time.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-[2.25rem] font-black tracking-tight leading-[1.15]">
                      Asisten Pintar<br/>Kuliner Pre-Order.
                    </h2>
                    <p className="text-white/80 text-[14px] font-medium leading-relaxed max-w-xs mt-2">
                      Mulai urai kerumitan chat WhatsApp pelanggan menjadi ringkasan bahan baku otomatis. Gratis selamanya.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Benefit Row Bullet */}
            <div className="flex flex-col gap-2.5 mt-8 border-t border-white/10 pt-6">
              {[
                "Otomatisasi Ekstraksi Manifes Teks Chat",
                "Kalkulator Kiloan Bahan Mentah Dapur",
                "Monitor Piutang Belum Lunas Instan",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[12px] font-bold text-white/90">
                  <CheckCircle2 size={13} className="text-orange-200 fill-orange-500/20" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info Platform */}
          <div className="relative z-10 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-white/60">
            <Sparkles size={11} /> MVP Prototype Platform v2.0
          </div>
        </div>

        {/* ── SISI KANAN: FORM ISIAN UTAMA (RESPONSIVE) ── */}
        <div className="p-8 sm:p-10 flex flex-col justify-center bg-white h-full">
          
          {/* Mobile Brand Header View (Tampil hanya di HP) */}
          <div className="flex items-center gap-2.5 mb-6 md:hidden">
            <img src="/kuali-logo-mark.svg" alt="Kuali" className="w-9 h-9" />
            <span className="font-black text-xl tracking-tight text-[#1A1A1A]">kuali</span>
          </div>

          {/* Tab Strip Switcher */}
          <div className="flex bg-[#F4F4F2] p-1 rounded-xl mb-6 w-full border border-gray-100">
            {(["login", "register"] as const).map((item) => {
              const isActive = mode === item;
              return (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={cn(
                    "flex-1 py-2.5 text-[13px] font-bold rounded-lg transition-all relative z-10",
                    isActive ? "text-[#1A1A1A] bg-white shadow-sm" : "text-[#888888] hover:text-[#555555]"
                  )}
                >
                  {item === "login" ? "Masuk ke Akun" : "Daftar Baru"}
                </button>
              );
            })}
          </div>

          {/* Dynamic Content Form */}
          <div className="flex-1 flex flex-col justify-center min-h-[320px]">
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4 w-full"
                >
                  <div>
                    <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight">Selamat Datang Kembali</h3>
                    <p className="text-[12px] font-medium text-[#888888] mt-0.5">Sila masukkan kredensial terdaftar untuk melangkah ke dashboard.</p>
                  </div>

                  <div className="flex flex-col gap-3 mt-1">
                    {/* Input Email */}
                    <div className="relative group border-b border-gray-200 focus-within:border-orange-500 transition-colors py-1.5 flex items-center gap-3">
                      <Mail size={15} className="text-[#ADADAD] group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="email"
                        placeholder="Alamat email Anda"
                        value={form.email}
                        onChange={(event) => set("email", event.target.value)}
                        className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD]"
                      />
                    </div>

                    {/* Input Password */}
                    <div className="relative group border-b border-gray-200 focus-within:border-orange-500 transition-colors py-1.5 flex items-center gap-3">
                      <Lock size={15} className="text-[#ADADAD] group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type={showPw ? "text" : "password"}
                        placeholder="Kata sandi sandaran"
                        value={form.password}
                        onChange={(event) => set("password", event.target.value)}
                        className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD] pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((prev) => !prev)}
                        className="absolute right-1 text-[#ADADAD] hover:text-[#555555] transition-colors"
                      >
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end -mt-1">
                    <button type="button" className="text-[13px] text-orange-500 font-bold hover:text-orange-600 transition-colors">
                      Lupa kata sandi?
                    </button>
                  </div>

                  {error && (
                    <p className="text-[12px] text-red-500 font-bold tracking-tight bg-red-50 border border-red-100 p-2.5 rounded-xl flex items-center gap-2">
                      ⚠️ {error}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.015, boxShadow: "0 10px 25px rgba(232,84,26,0.2)" }}
                    whileTap={{ scale: 0.985 }}
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-orange-500 text-white font-bold text-[14px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {loading ? "Memproses Otentikasi..." : <> Masuk Ke Workspace Kuali <ArrowRight size={15} /> </>}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="register-form"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4 w-full"
                >
                  <div>
                    <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight">Buat Akun Merchant Baru</h3>
                    <p className="text-[12px] font-medium text-[#888888] mt-0.5">Gabung bersama puluhan pegiat katering mandiri lainnya hari ini.</p>
                  </div>

                  <div className="flex flex-col gap-3.5 max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
                    {/* Input Nama */}
                    <div className="relative group border-b border-gray-200 focus-within:border-orange-500 transition-colors py-1.5 flex items-center gap-3">
                      <User size={15} className="text-[#ADADAD] group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="text"
                        placeholder="Nama lengkap Anda"
                        value={form.name}
                        onChange={(event) => set("name", event.target.value)}
                        className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD]"
                      />
                    </div>

                    {/* Input Email */}
                    <div className="relative group border-b border-gray-200 focus-within:border-orange-500 transition-colors py-1.5 flex items-center gap-3">
                      <Mail size={15} className="text-[#ADADAD] group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="email"
                        placeholder="Alamat email aktif"
                        value={form.email}
                        onChange={(event) => set("email", event.target.value)}
                        className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD]"
                      />
                    </div>

                    {/* Input Nama Usaha */}
                    <div className="relative group border-b border-gray-200 focus-within:border-orange-500 transition-colors py-1.5 flex items-center gap-3">
                      <Building2 size={15} className="text-[#ADADAD] group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="text"
                        placeholder="Nama usaha kuliner / katering"
                        value={form.business}
                        onChange={(event) => set("business", event.target.value)}
                        className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD]"
                      />
                    </div>

                    {/* Input Password */}
                    <div className="relative group border-b border-gray-200 focus-within:border-orange-500 transition-colors py-1.5 flex items-center gap-3">
                      <Lock size={15} className="text-[#ADADAD] group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type={showPw ? "text" : "password"}
                        placeholder="Susun kata sandi baru"
                        value={form.password}
                        onChange={(event) => set("password", event.target.value)}
                        className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD] pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((prev) => !prev)}
                        className="absolute right-1 text-[#ADADAD] hover:text-[#555555] transition-colors"
                      >
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>

                    {/* Input Confirm Password */}
                    <div className="relative group border-b border-gray-200 focus-within:border-orange-500 transition-colors py-1.5 flex items-center gap-3">
                      <Lock size={15} className="text-[#ADADAD] group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Ulangi verifikasi kata sandi"
                        value={form.confirm}
                        onChange={(event) => set("confirm", event.target.value)}
                        className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD] pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((prev) => !prev)}
                        className="absolute right-1 text-[#ADADAD] hover:text-[#555555] transition-colors"
                      >
                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-[12px] text-red-500 font-bold tracking-tight bg-red-50 border border-red-100 p-2.5 rounded-xl flex items-center gap-2">
                      ⚠️ {error}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.015, boxShadow: "0 10px 25px rgba(232,84,26,0.2)" }}
                    whileTap={{ scale: 0.985 }}
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-orange-500 text-white font-bold text-[14px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                  >
                    {loading ? "Mendaftarkan Merchant..." : <> Registrasi Akun Katering Gratis <ArrowRight size={15} /> </>}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Footer Switch Helper Label */}
          <p className="text-center text-[13px] text-[#888888] font-medium mt-5 border-t border-gray-100 pt-4 flex-shrink-0">
            {mode === "login" ? (
              <>
                Belum terdaftar sebagai mitra?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-orange-500 font-bold hover:text-orange-600 transition-colors ml-0.5"
                >
                  Daftar Sekarang
                </button>
              </>
            ) : (
              <>
                Sudah memiliki workspace terverifikasi?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-orange-500 font-bold hover:text-orange-600 transition-colors ml-0.5"
                >
                  Silakan Masuk
                </button>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}