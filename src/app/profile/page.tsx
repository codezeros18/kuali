"use client";

import { motion } from "framer-motion";
import { Info, Store } from "lucide-react";
import { Shell } from "@/components/kuali/AppShell";
import { ProfilUsahaCard } from "@/components/kuali/ProfilUsahaCard";
import { useViewMode } from "@/lib/view-mode";
import { menus } from "@/lib/dummy-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 28 } },
};

export default function ProfilePage() {
  const { mode, toggle } = useViewMode();
  const activeMenus = menus.slice(0, 5);

  const desktopContent = (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">

      {/* Banner */}
      <motion.div
        variants={itemVariants}
        className="bg-white border border-[#E8E8E6] rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm"
      >
        <div>
          <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-0.5">Pengaturan</p>
          <h2 className="text-[16px] font-black text-[#1A1A1A] tracking-tight">Profil & Data Usaha</h2>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] font-black text-[#888] bg-[#F4F4F2] border border-[#E8E8E6] px-4 py-2 rounded-full">
          <Store size={12} /> Katering Bu Rani
        </div>
      </motion.div>

      {/* 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

        {/* Kiri: ProfilUsahaCard */}
        <motion.div variants={itemVariants}>
          <ProfilUsahaCard mode={mode} onToggleMode={toggle} />
        </motion.div>

        {/* Kanan: Menu aktif + catatan */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F4F4F2] flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-0.5">Daftar Menu</p>
                <p className="text-[16px] font-black text-[#1A1A1A] tracking-tight">Menu Aktif</p>
              </div>
              <span className="text-[11px] font-black text-green-600 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
                {activeMenus.length} item
              </span>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {activeMenus.map((menu) => (
                <div key={menu.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#FAFAF8] transition-colors">
                  <span className="text-xl shrink-0">{menu.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-[#1A1A1A] truncate">{menu.name}</p>
                    <p className="text-[12px] text-[#6B6B6B] font-medium">{menu.category}</p>
                  </div>
                  <p className="text-[14px] font-black text-[#1A1A1A] shrink-0 tabular-nums">
                    Rp {menu.price.toLocaleString("id-ID")} <span className="text-[#ADADAD] font-semibold text-[12px]">/ {menu.unit}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#FAFAF8] border border-[#E8E8E6] rounded-2xl p-4">
            <Info size={15} className="text-[#ADADAD] shrink-0 mt-0.5" />
            <p className="text-[12px] text-[#6B6B6B] font-medium leading-relaxed">
              Profil usaha ini adalah data simulasi untuk prototype hackathon. Fitur edit profil, manajemen menu, dan upload QRIS nyata tersedia di roadmap pengembangan.
            </p>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );

  return (
    <Shell
      title="Profil Usaha"
      subtitle="Katering Bu Rani"
      desktopContent={desktopContent}
    >
      {/* ── Mobile ────────────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-5 flex flex-col gap-4"
      >
        <motion.div variants={itemVariants}>
          <ProfilUsahaCard mode={mode} onToggleMode={toggle} />
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-[#F4F4F2] flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-wider mb-0.5">Daftar Menu</p>
              <p className="text-[14px] font-black text-[#1A1A1A]">Menu Aktif</p>
            </div>
            <span className="text-[10px] font-black text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
              {activeMenus.length} item
            </span>
          </div>
          <div className="divide-y divide-[#F4F4F2]">
            {activeMenus.map((menu) => (
              <div key={menu.id} className="flex items-center gap-3 px-4 py-3">
                <span className="text-lg shrink-0">{menu.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-[#1A1A1A] truncate">{menu.name}</p>
                  <p className="text-[11px] text-[#6B6B6B] font-medium">{menu.category}</p>
                </div>
                <p className="text-[12px] font-black text-[#1A1A1A] shrink-0 tabular-nums">
                  Rp {menu.price.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-start gap-3 bg-[#FAFAF8] border border-[#E8E8E6] rounded-2xl p-4">
          <Info size={14} className="text-[#ADADAD] shrink-0 mt-0.5" />
          <p className="text-[12px] text-[#6B6B6B] font-medium leading-relaxed">
            Data simulasi untuk prototype hackathon. Edit profil dan upload QRIS nyata tersedia di roadmap.
          </p>
        </motion.div>

      </motion.div>
    </Shell>
  );
}
