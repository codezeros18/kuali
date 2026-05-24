"use client";

import { useEffect, useState } from "react";

export type ViewMode = "simple" | "standard";

const STORAGE_KEY = "kuali_view_mode";

export function useViewMode() {
  const [mode, setModeState] = useState<ViewMode>("simple");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "standard") setModeState("standard");
    } catch {}
  }, []);

  const setMode = (next: ViewMode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  const toggle = () => setMode(mode === "simple" ? "standard" : "simple");

  return { mode, setMode, toggle };
}
