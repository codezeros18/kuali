"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Info } from "lucide-react";
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
  const router = useRouter();
  const { mode, toggle } = useViewMode();

  const activeMenus = menus.slice(0, 5);

  // ── Desktop ──────────────────────────────────────────────────────────────────
  const desktopContent = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl"
    >
      {/* Left column — profil card */}
      <motion.div variants={itemVariants}>
        <ProfilUsahaCard mode={mode} onToggleMode={toggle} />
      </motion.div>

      {/* Right column — menu aktif + catatan */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F4F4F2]">
            <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider mb-0.5">Daftar Menu</p>
            <p className="text-[16px] font-black text-[#1A1A1A] tracking-tight">Menu Aktif</p>
          </div>
          <div className="divide-y divide-[#F4F4F2]">
            {activeMenus.map((menu) => (
              <div key={menu.id} className="flex items-center gap-4 px-5 py-3">
                <span className="text-xl shrink-0">{menu.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-[#1A1A1A] truncate">{menu.name}</p>
                  <p className="text-[12px] text-[#6B6B6B] font-medium">{menu.category}</p>
                </div>
                <p className="text-[14px] font-black text-[#1A1A1A] shrink-0">
                  Rp {menu.price.toLocaleString("id-ID")} / {menu.unit}
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
    </motion.div>
  );

  return (
    <Shell
      title="Profil Usaha"
      subtitle="Katering Bu Rani"
      back
      desktopContent={desktopContent}
      mobileHeaderLeft={
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F4F4F2] text-[#6B6B6B] transition-colors"
        >
          <ArrowLeft size={17} />
        </button>
      }
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

        {/* Daftar menu aktif — mobile */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-[#F4F4F2]">
            <p className="text-[10px] font-black text-orange-500 uppercase tracking-wider mb-0.5">Daftar Menu</p>
            <p className="text-[14px] font-black text-[#1A1A1A]">Menu Aktif</p>
          </div>
          <div className="divide-y divide-[#F4F4F2]">
            {activeMenus.map((menu) => (
              <div key={menu.id} className="flex items-center gap-3 px-4 py-3">
                <span className="text-lg shrink-0">{menu.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-[#1A1A1A] truncate">{menu.name}</p>
                  <p className="text-[11px] text-[#6B6B6B] font-medium">{menu.category}</p>
                </div>
                <p className="text-[12px] font-black text-[#1A1A1A] shrink-0">
                  Rp {menu.price.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Catatan */}
        <motion.div
          variants={itemVariants}
          className="flex items-start gap-3 bg-[#FAFAF8] border border-[#E8E8E6] rounded-2xl p-4"
        >
          <Info size={14} className="text-[#ADADAD] shrink-0 mt-0.5" />
          <p className="text-[12px] text-[#6B6B6B] font-medium leading-relaxed">
            Data simulasi untuk prototype hackathon. Edit profil dan upload QRIS nyata tersedia di roadmap.
          </p>
        </motion.div>
      </motion.div>
    </Shell>
  );
}
