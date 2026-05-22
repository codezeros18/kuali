"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

function MockParser() {
  return (
    <div className="bg-white rounded-3xl border border-[#E5E5E3] p-6 shadow-sm w-full max-w-sm mx-auto">
      <p className="text-[10px] font-black text-[#ADADAD] uppercase tracking-widest mb-4">WhatsApp → Draft</p>
      <div className="bg-[#DCF8C6] rounded-2xl rounded-tl-sm px-4 py-3 mb-4 text-[13px] text-[#1A1A1A] leading-relaxed">
        Halo bu, pesan nasi box 50 pcs, ayam goreng sama tempe. Kirim besok pagi ya 🙏
        <div className="text-[10px] text-[#ADADAD] text-right mt-1">09:14 ✓✓</div>
      </div>
      <div className="flex items-center gap-2 my-3">
        <div className="flex-1 h-px bg-orange-200" />
        <span className="text-[10px] font-black text-orange-500 flex items-center gap-1">
          <Zap size={10} fill="currentColor" /> AI Parser
        </span>
        <div className="flex-1 h-px bg-orange-200" />
      </div>
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[["Pelanggan", "Bu Ani"], ["Jumlah", "50 pcs"], ["Menu", "Nasi Box Ayam + Tempe"], ["Kirim", "Besok Pagi"]].map(([key, value]) => (
            <div key={key}>
              <p className="text-[9px] font-black text-[#ADADAD] uppercase mb-0.5">{key}</p>
              <p className="text-[12px] font-bold text-[#1A1A1A]">{value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-orange-100">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <p className="text-[10px] font-bold text-green-600">Akurasi 94% · Siap dikonfirmasi</p>
        </div>
      </div>
    </div>
  );
}

function MockValidasi() {
  return (
    <div className="bg-white rounded-3xl border border-[#E5E5E3] p-6 shadow-sm w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] font-black text-[#1A1A1A]">Draft #ORD-042</p>
        <span className="bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-black px-2 py-0.5 rounded-full">Menunggu</span>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {[["Nasi Box Ayam", "50 pcs", "Rp 125.000"], ["Tempe Goreng", "50 pcs", "Rp 50.000"]].map(([item, qty, price]) => (
          <div key={item} className="flex items-center justify-between bg-[#FAFAF8] rounded-xl px-3 py-2.5 text-[12px]">
            <span className="font-bold text-[#1A1A1A]">{item}</span>
            <span className="text-[#ADADAD]">{qty}</span>
            <span className="font-bold">{price}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center border-t border-[#F4F4F2] pt-3 mb-4">
        <span className="text-[13px] font-bold text-[#6B6B6B]">Total</span>
        <span className="text-[15px] font-black text-orange-500">Rp 175.000</span>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 bg-emerald-500 text-white text-[12px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5">
          <Check size={13} /> Setujui
        </button>
        <button className="flex-1 bg-[#F4F4F2] text-[#6B6B6B] text-[12px] font-bold py-2.5 rounded-xl">
          Edit
        </button>
      </div>
    </div>
  );
}

function MockDapur() {
  const items = [
    { name: "Beras", needed: "5 kg", stock: "8 kg", pct: 100, s: "ok" },
    { name: "Ayam Potong", needed: "3 kg", stock: "2.5 kg", pct: 72, s: "low" },
    { name: "Minyak Goreng", needed: "2 L", stock: "0.4 L", pct: 20, s: "bad" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#E5E5E3] p-6 shadow-sm w-full max-w-sm mx-auto">
      <p className="text-[10px] font-black text-[#E8541A] uppercase tracking-widest mb-5">Rencana Dapur · Besok</p>
      <div className="flex flex-col gap-4">
        {items.map(({ name, needed, stock, pct, s }) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-bold text-[#1A1A1A]">{name}</span>
              <span className={cn(
                "text-[10px] font-black px-2 py-0.5 rounded-full",
                s === "ok" ? "bg-green-50 text-green-600" :
                s === "low" ? "bg-amber-50 text-amber-600" :
                "bg-red-50 text-red-500"
              )}>
                {s === "ok" ? "Cukup" : s === "low" ? "Hampir Habis" : "Perlu Beli"}
              </span>
            </div>
            <div className="h-1.5 bg-[#F4F4F2] rounded-full overflow-hidden mb-1">
              <motion.div
                className={cn("h-full rounded-full", s === "ok" ? "bg-green-500" : s === "low" ? "bg-amber-500" : "bg-red-500")}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#ADADAD]">
              <span>Butuh {needed}</span>
              <span>Stok {stock}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockFinansial() {
  const bars = [60, 80, 50, 90, 70, 100, 85];

  return (
    <div className="bg-white rounded-3xl border border-[#E5E5E3] p-6 shadow-sm w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-black text-[#E8541A] uppercase tracking-widest">Rekap Harian</p>
        <span className="text-[11px] text-[#ADADAD]">Senin, 18 Mei</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {[
          { label: "Total Order", val: "11", cls: "bg-blue-50 text-blue-600" },
          { label: "Dikonfirmasi", val: "8", cls: "bg-green-50 text-green-600" },
          { label: "Belum Bayar", val: "Rp 320rb", cls: "bg-amber-50 text-amber-600" },
          { label: "Draft", val: "3", cls: "bg-gray-50 text-gray-500" },
        ].map(({ label, val, cls }) => (
          <div key={label} className={cn("rounded-xl p-3 border border-black/[0.04]", cls.split(" ")[0])}>
            <div className={cn("text-[17px] font-black leading-none mb-0.5", cls.split(" ")[1])}>{val}</div>
            <div className="text-[10px] text-[#ADADAD] font-medium">{label}</div>
          </div>
        ))}
      </div>
      <div className="h-14 flex items-end gap-1">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            className="flex-1 bg-orange-100 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[9px] text-[#ADADAD] mt-1.5 font-semibold">
        {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => <span key={day}>{day}</span>)}
      </div>
    </div>
  );
}

export const FEATURE_VISUALS = [
  <MockParser key="p" />,
  <MockValidasi key="v" />,
  <MockDapur key="d" />,
  <MockFinansial key="f" />,
];
