"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChefHat,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "register";

interface AuthModalProps {
  defaultMode?: AuthMode;
  onClose: () => void;
}

export function AuthModal({ defaultMode = "login", onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    password: "",
    confirm: "",
  });
  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative bg-[#FAFAF8] rounded-3xl w-full max-w-md overflow-hidden"
        style={{ boxShadow: "0 28px 90px rgba(0,0,0,0.2)" }}
        initial={{ opacity: 0, scale: 0.93, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 28 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors"
        >
          <X size={15} className="text-white" />
        </button>

        <div className="relative bg-gradient-to-br from-[#E8541A] to-[#F97316] px-7 pt-7 pb-6 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-black/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 bg-white/20 rounded-2xl flex items-center justify-center">
                <ChefHat size={18} className="text-white" strokeWidth={2} />
              </div>
              <span className="font-black text-[22px] text-white tracking-tight">kuali</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={mode}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="text-white/80 text-[13px]"
              >
                {mode === "login"
                  ? "Selamat datang kembali 👋"
                  : "Bergabung dan kelola usaha kuliner kamu 🍽️"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex bg-white border-b border-[#E5E5E3]">
          {(["login", "register"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={cn(
                "flex-1 py-3.5 text-[13px] font-bold transition-colors relative",
                mode === item ? "text-[#E8541A]" : "text-[#ADADAD] hover:text-[#6B6B6B]"
              )}
            >
              {item === "login" ? "Masuk" : "Daftar"}
              {mode === item && (
                <motion.div
                  layoutId="auth-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8541A]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="px-6 py-5">
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3"
              >
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ADADAD] pointer-events-none"
                  />
                  <input
                    type="email"
                    placeholder="Email kamu"
                    value={form.email}
                    onChange={(event) => set("email", event.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <div className="relative">
                  <Lock
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ADADAD] pointer-events-none"
                  />
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="Kata sandi"
                    value={form.password}
                    onChange={(event) => set("password", event.target.value)}
                    className="input-field pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#ADADAD] hover:text-[#6B6B6B] transition-colors"
                  >
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <div className="flex justify-end -mt-1">
                  <button
                    type="button"
                    className="text-[12px] text-[#E8541A] font-semibold hover:underline"
                  >
                    Lupa kata sandi?
                  </button>
                </div>
                <button
                  type="button"
                  className="w-full bg-[#E8541A] text-white font-bold text-[14px] py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-orange-200/60 hover:bg-[#d4491a] active:scale-[0.97] transition-all"
                >
                  Masuk ke Kuali <ArrowRight size={14} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="register-form"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3"
              >
                <div className="relative">
                  <User
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ADADAD] pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Nama lengkap"
                    value={form.name}
                    onChange={(event) => set("name", event.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ADADAD] pointer-events-none"
                  />
                  <input
                    type="email"
                    placeholder="Email kamu"
                    value={form.email}
                    onChange={(event) => set("email", event.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <div className="relative">
                  <Building2
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ADADAD] pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Nama usaha kuliner"
                    value={form.business}
                    onChange={(event) => set("business", event.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <div className="relative">
                  <Lock
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ADADAD] pointer-events-none"
                  />
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="Kata sandi"
                    value={form.password}
                    onChange={(event) => set("password", event.target.value)}
                    className="input-field pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#ADADAD] hover:text-[#6B6B6B] transition-colors"
                  >
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <div className="relative">
                  <Lock
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ADADAD] pointer-events-none"
                  />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Konfirmasi kata sandi"
                    value={form.confirm}
                    onChange={(event) => set("confirm", event.target.value)}
                    className="input-field pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#ADADAD] hover:text-[#6B6B6B] transition-colors"
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <button
                  type="button"
                  className="w-full bg-[#E8541A] text-white font-bold text-[14px] py-3.5 rounded-2xl mt-1 flex items-center justify-center gap-2 shadow-lg shadow-orange-200/60 hover:bg-[#d4491a] active:scale-[0.97] transition-all"
                >
                  Buat Akun Gratis <ArrowRight size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-[12px] text-[#ADADAD] mt-4">
            {mode === "login" ? (
              <>
                Belum punya akun?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-[#E8541A] font-bold hover:underline"
                >
                  Daftar sekarang
                </button>
              </>
            ) : (
              <>
                Sudah punya akun?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-[#E8541A] font-bold hover:underline"
                >
                  Masuk
                </button>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
