"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FEATURE_VISUALS } from "./FeatureMockups";
import { FEATURES } from "./constants";

export function StickyScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (value) => {
      setActiveIdx(Math.min(FEATURES.length - 1, Math.floor(value * FEATURES.length)));
    });
  }, [scrollYProgress]);

  const feature = FEATURES[activeIdx];

  return (
    <div ref={containerRef} className="relative" style={{ height: `${FEATURES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-[#FAFAF8]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className={cn(
              "absolute -top-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30",
              activeIdx === 0 ? "bg-orange-200" :
              activeIdx === 1 ? "bg-emerald-200" :
              activeIdx === 2 ? "bg-blue-200" :
              "bg-violet-200"
            )} />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full">
          <div className="lg:hidden flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-3", feature.accent.pill)}>
                  <feature.Icon size={11} /> {feature.badge}
                </span>
                <h2 className="text-[2rem] font-black text-[#1A1A1A] tracking-tight leading-tight mb-3 whitespace-pre-line">{feature.title}</h2>
                <p className="text-[14px] text-[#6B6B6B] leading-relaxed">{feature.desc}</p>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`v-${activeIdx}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
              >
                {FEATURE_VISUALS[activeIdx]}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden lg:grid grid-cols-[1fr_1fr] gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[11px] font-black text-[#ADADAD] uppercase tracking-widest">
                  Cara Kerja
                </span>
                <div className="flex gap-1.5">
                  {FEATURES.map((_, index) => (
                    <motion.div
                      key={index}
                      animate={{ width: index === activeIdx ? 28 : 6, backgroundColor: index === activeIdx ? "#E8541A" : "#E5E5E3" }}
                      transition={{ duration: 0.35 }}
                      className="h-1.5 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-black text-[#ADADAD]">
                  {activeIdx + 1} / {FEATURES.length}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={cn("text-[9rem] font-black leading-none select-none -mb-4 tracking-tighter", feature.accent.num)}>
                    {feature.number}
                  </div>
                  <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border mb-5", feature.accent.pill)}>
                    <feature.Icon size={11} /> {feature.badge}
                  </span>
                  <h2 className="text-[3.25rem] font-black text-[#1A1A1A] tracking-tighter leading-[1.0] mb-5 whitespace-pre-line">
                    {feature.title}
                  </h2>
                  <p className="text-[16px] text-[#6B6B6B] leading-relaxed max-w-[420px]">
                    {feature.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`v-${activeIdx}`}
                  initial={{ opacity: 0, scale: 0.93, y: 22 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: -18 }}
                  transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[400px]"
                >
                  {FEATURE_VISUALS[activeIdx]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {activeIdx === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
              >
                <span className="text-[10px] font-bold text-[#ADADAD] uppercase tracking-widest">Scroll</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  className="w-5 h-8 rounded-full border-2 border-[#E5E5E3] flex items-start justify-center pt-1.5"
                >
                  <div className="w-1 h-1.5 rounded-full bg-[#ADADAD]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
