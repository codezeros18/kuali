export const APP_NAME = "Kuali";
export const APP_TAGLINE = "Order rapi, produksi siap.";
export const APP_DESCRIPTION =
  "Asisten operasional WhatsApp-first untuk UMKM kuliner.";
export const BUSINESS_NAME = "Katering Bu Rani";
export const BUSINESS_AREA = "Kelapa Dua, Depok";

export const DEMO_DATE = "Jumat, 22 Mei 2026";
export const DEMO_PRODUCTION_DATE = "Sabtu, 23 Mei 2026";

export const NAV_ITEMS = [
  { label: "Hari Ini", href: "/dashboard", icon: "Home" },
  { label: "Pesanan", href: "/orders", icon: "ClipboardList" },
  { label: "Produksi", href: "/production", icon: "ChefHat" },
  { label: "Ringkasan", href: "/summary", icon: "BarChart2" },
] as const;

export const STATUS_LABELS = {
  draft: "Draft",
  confirmed: "Dikonfirmasi",
  needs_check: "Perlu Cek",
  completed: "Selesai",
  cancelled: "Dibatalkan",
} as const;

export const PAYMENT_LABELS = {
  unpaid: "Belum Bayar",
  paid: "Lunas",
  partial: "Sebagian",
} as const;

export const NARRATIVE_SAFE = {
  aiNote: "AI hanya membuat draft. Owner tetap menyetujui.",
  qrisNote: "Simulasi QRIS dummy. Kuali tidak memproses dana.",
  productionNote: "Estimasi bahan berdasarkan order aktual.",
  impactNote: "Angka ini dari data simulasi demo. Bukan klaim bisnis nyata.",
  roadmapNote: "Ini adalah simulasi roadmap — belum tersedia di MVP.",
} as const;
