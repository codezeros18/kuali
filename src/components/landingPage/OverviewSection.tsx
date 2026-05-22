"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { OVERVIEW_ITEMS } from "./constants";

export function OverviewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 text-center"
      >
        <span className="text-[11px] font-black text-[#E8541A] uppercase tracking-[0.16em]">Semua Fitur</span>
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black tracking-tight mt-1.5 text-[#1A1A1A]">
          Satu alur, semua terpadu.
        </h2>
        <p className="text-[15px] text-[#6B6B6B] mt-3 max-w-md mx-auto leading-relaxed">
          Kuali membantu merapikan alur pesanan WhatsApp — dari chat masuk hingga dapur siap produksi.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OVERVIEW_ITEMS.map(({ Icon, badge, title, desc, accent }, index) => (
          <motion.div
            key={badge}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: index * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, borderColor: "rgba(232,84,26,0.2)", boxShadow: "0 16px 40px rgba(0,0,0,0.06)" }}
            className="bg-white border border-[#E5E5E3] rounded-3xl p-7 flex flex-col gap-5 cursor-default transition-all"
          >
            <div className="flex items-start justify-between">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border", accent)}>
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <span className={cn("text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border", accent)}>
                {badge}
              </span>
            </div>
            <div>
              <h3 className="font-black text-[16px] text-[#1A1A1A] mb-1.5 tracking-tight">{title}</h3>
              <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.42, duration: 0.5 }}
        className="mt-8 flex items-center justify-center gap-3"
      >
        <Link
          href="/demo"
          className="bg-[#E8541A] text-white font-bold text-[13px] px-7 py-3.5 rounded-2xl flex items-center gap-2 shadow-xl shadow-orange-200/60 hover:bg-[#d4491a] active:scale-[0.97] transition-all"
        >
          Coba Demo Sekarang <ArrowRight size={14} />
        </Link>
        <Link
          href="/dashboard"
          className="bg-white text-[#1A1A1A] font-bold text-[13px] px-7 py-3.5 rounded-2xl flex items-center gap-2 border border-[#E5E5E3] shadow-sm hover:bg-[#F4F4F2] active:scale-[0.97] transition-all"
        >
          Dashboard
        </Link>
      </motion.div>
    </section>
  );
}
