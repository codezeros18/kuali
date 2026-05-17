// Dummy data for Kuali prototype
// All data is fictional — for demo purposes only.

export const business = {
  id: "biz-001",
  name: "Katering Bu Rani",
  ownerName: "Bu Rani",
  area: "Kelapa Dua, Depok",
  phone: "08XX-XXXX-XXXX",
  tagline: "Order rapi, produksi siap.",
};

// ─────────────────────────────────────────
// MENU
// ─────────────────────────────────────────
export const menus = [
  { id: "menu-001", name: "Risol Mayo", category: "Gorengan", price: 3500, unit: "pcs", emoji: "🥐" },
  { id: "menu-002", name: "Ayam Geprek", category: "Lauk", price: 15000, unit: "porsi", emoji: "🍗" },
  { id: "menu-003", name: "Nasi Box Ayam", category: "Nasi Box", price: 25000, unit: "box", emoji: "🍱" },
  { id: "menu-004", name: "Lumpia Basah", category: "Gorengan", price: 5000, unit: "pcs", emoji: "🌯" },
  { id: "menu-005", name: "Tahu Isi", category: "Gorengan", price: 2500, unit: "pcs", emoji: "🟡" },
  { id: "menu-006", name: "Dessert Box", category: "Dessert", price: 18000, unit: "box", emoji: "🍰" },
  { id: "menu-007", name: "Kopi Susu Literan", category: "Minuman", price: 35000, unit: "liter", emoji: "☕" },
  { id: "menu-008", name: "Snack Box Mix", category: "Snack Box", price: 22000, unit: "box", emoji: "📦" },
] as const;

// ─────────────────────────────────────────
// DEMO CHATS (WhatsApp preset)
// ─────────────────────────────────────────
export const demoChats = [
  {
    id: "chat-001",
    customerName: "Dinda Ayu",
    message:
      "Kak mau pesan 12 risol mayo buat besok jam 3, atas nama Dinda. Bayar nanti sore ya.",
    label: "Dinda — 12 risol mayo",
    time: "08:15",
    category: "happy_path",
  },
  {
    id: "chat-002",
    customerName: "Mas Budi",
    message: "Ayam geprek 5 ya, ambil siang.",
    label: "Mas Budi — ayam geprek",
    time: "08:30",
    category: "happy_path",
  },
  {
    id: "chat-003",
    customerName: "Kak Rina",
    message:
      "Kak pesan nasi box ayam 20 pcs buat Jumat ya, ada acara kantor. Transfer dulu ya kak.",
    label: "Kak Rina — nasi box 20",
    time: "09:00",
    category: "happy_path",
  },
  {
    id: "chat-004",
    customerName: "Bu Tini",
    message: "Kak ayam crispynya ada yang pedas gak? Mau yang pedas semua 2 packnya.",
    label: "Bu Tini — perlu konfirmasi",
    time: "09:15",
    category: "low_confidence",
  },
] as const;

// ─────────────────────────────────────────
// PARSED ORDERS (fake AI output)
// ─────────────────────────────────────────
export type ParsedOrder = {
  chatId: string;
  customerName: string;
  items: { menu: string; qty: number; unitPrice: number; subtotal: number }[];
  deliveryDate: string;
  deliveryTime: string;
  paymentStatus: "unpaid" | "paid";
  paymentNote: string;
  pickupMethod: "delivery" | "pickup";
  confidenceScore: number;
  missingFields: string[];
  needsOwnerReview: boolean;
  suggestedReply: string;
};

export const parsedOrders: Record<string, ParsedOrder> = {
  "chat-001": {
    chatId: "chat-001",
    customerName: "Dinda Ayu",
    items: [{ menu: "Risol Mayo", qty: 12, unitPrice: 3500, subtotal: 42000 }],
    deliveryDate: "Besok, 18 Mei 2025",
    deliveryTime: "15:00",
    paymentStatus: "unpaid",
    paymentNote: "Bayar nanti sore",
    pickupMethod: "delivery",
    confidenceScore: 95,
    missingFields: [],
    needsOwnerReview: false,
    suggestedReply:
      "Halo Kak Dinda 👋 Pesanan 12 risol mayo untuk besok jam 3 sudah kami catat ya! Kami akan kirimkan info pembayaran sore ini. Terima kasih! 🙏",
  },
  "chat-002": {
    chatId: "chat-002",
    customerName: "Mas Budi",
    items: [{ menu: "Ayam Geprek", qty: 5, unitPrice: 15000, subtotal: 75000 }],
    deliveryDate: "Hari ini, 17 Mei 2025",
    deliveryTime: "12:00",
    paymentStatus: "unpaid",
    paymentNote: "-",
    pickupMethod: "pickup",
    confidenceScore: 78,
    missingFields: ["Status pembayaran belum disebutkan"],
    needsOwnerReview: true,
    suggestedReply:
      "Halo Mas Budi 👋 Ayam geprek 5 porsi untuk siang ini sudah kami catat. Mohon konfirmasi pembayaran ya. Terima kasih!",
  },
  "chat-003": {
    chatId: "chat-003",
    customerName: "Kak Rina",
    items: [{ menu: "Nasi Box Ayam", qty: 20, unitPrice: 25000, subtotal: 500000 }],
    deliveryDate: "Jumat, 23 Mei 2025",
    deliveryTime: "10:00",
    paymentStatus: "paid",
    paymentNote: "Transfer dulu",
    pickupMethod: "delivery",
    confidenceScore: 92,
    missingFields: [],
    needsOwnerReview: false,
    suggestedReply:
      "Halo Kak Rina 👋 Pesanan 20 nasi box ayam untuk acara Jumat sudah kami catat. Terima kasih sudah transfer duluan! 🙏",
  },
  "chat-004": {
    chatId: "chat-004",
    customerName: "Bu Tini",
    items: [{ menu: "Ayam Crispy Pedas", qty: 2, unitPrice: 0, subtotal: 0 }],
    deliveryDate: "-",
    deliveryTime: "-",
    paymentStatus: "unpaid",
    paymentNote: "-",
    pickupMethod: "pickup",
    confidenceScore: 45,
    missingFields: [
      "Menu belum dikonfirmasi (varian pedas belum ada di daftar)",
      "Harga belum bisa dihitung",
      "Tanggal dan jam pengambilan belum disebutkan",
      "Status pembayaran belum jelas",
    ],
    needsOwnerReview: true,
    suggestedReply: "",
  },
};

// ─────────────────────────────────────────
// ORDERS LIST
// ─────────────────────────────────────────
export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  items: string;
  totalAmount: number;
  deliveryDate: string;
  deliveryTime: string;
  status: "draft" | "confirmed" | "needs_check" | "completed" | "cancelled";
  paymentStatus: "unpaid" | "paid";
  confidenceScore: number;
};

export const orders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "KL-20250517-001",
    customerName: "Dinda Ayu",
    items: "Risol Mayo × 12",
    totalAmount: 42000,
    deliveryDate: "Besok, 15:00",
    deliveryTime: "15:00",
    status: "confirmed",
    paymentStatus: "unpaid",
    confidenceScore: 95,
  },
  {
    id: "ord-002",
    orderNumber: "KL-20250517-002",
    customerName: "Mas Budi",
    items: "Ayam Geprek × 5",
    totalAmount: 75000,
    deliveryDate: "Hari ini, 12:00",
    deliveryTime: "12:00",
    status: "needs_check",
    paymentStatus: "unpaid",
    confidenceScore: 78,
  },
  {
    id: "ord-003",
    orderNumber: "KL-20250517-003",
    customerName: "Kak Rina",
    items: "Nasi Box Ayam × 20",
    totalAmount: 500000,
    deliveryDate: "Jumat, 23 Mei",
    deliveryTime: "10:00",
    status: "confirmed",
    paymentStatus: "paid",
    confidenceScore: 92,
  },
  {
    id: "ord-004",
    orderNumber: "KL-20250517-004",
    customerName: "Mbak Dewi",
    items: "Risol Mayo × 8 + Lumpia × 10",
    totalAmount: 78000,
    deliveryDate: "Besok, 07:00",
    deliveryTime: "07:00",
    status: "confirmed",
    paymentStatus: "unpaid",
    confidenceScore: 91,
  },
  {
    id: "ord-005",
    orderNumber: "KL-20250517-005",
    customerName: "Pak Hendra",
    items: "Snack Box Mix × 5",
    totalAmount: 110000,
    deliveryDate: "Besok, 08:00",
    deliveryTime: "08:00",
    status: "confirmed",
    paymentStatus: "unpaid",
    confidenceScore: 88,
  },
  {
    id: "ord-006",
    orderNumber: "KL-20250517-006",
    customerName: "Bu Tini",
    items: "Ayam Crispy (belum terkonfirmasi)",
    totalAmount: 0,
    deliveryDate: "-",
    deliveryTime: "-",
    status: "needs_check",
    paymentStatus: "unpaid",
    confidenceScore: 45,
  },
  {
    id: "ord-007",
    orderNumber: "KL-20250517-007",
    customerName: "Nisa Ramadhani",
    items: "Dessert Box × 3",
    totalAmount: 54000,
    deliveryDate: "Besok, 10:00",
    deliveryTime: "10:00",
    status: "draft",
    paymentStatus: "unpaid",
    confidenceScore: 82,
  },
];

// ─────────────────────────────────────────
// DASHBOARD METRICS
// ─────────────────────────────────────────
export const dashboardMetrics = {
  totalOrdersToday: 11,
  confirmed: 5,
  draftPending: 6,
  unpaidOrders: 4,
  unpaidAmount: 167000,
  needsReview: 3,
  topMenu: "Risol Mayo",
  parsedChats: 13,
  totalChats: 15,
};

// ─────────────────────────────────────────
// PRODUCTION PLAN
// ─────────────────────────────────────────
export type IngredientNeed = {
  name: string;
  needed: number;
  unit: string;
  stock: number;
  status: "sufficient" | "low" | "insufficient";
  emoji: string;
  fromOrders: string;
};

export const productionPlan: IngredientNeed[] = [
  {
    name: "Tepung Terigu",
    needed: 1.7,
    unit: "kg",
    stock: 10,
    status: "sufficient",
    emoji: "🌾",
    fromOrders: "Risol 26pcs × 50g + Lumpia 10pcs × 40g + Tahu 8pcs × 30g",
  },
  {
    name: "Telur",
    needed: 6,
    unit: "butir",
    stock: 60,
    status: "sufficient",
    emoji: "🥚",
    fromOrders: "Risol 26pcs × 0.1 + Lumpia 10pcs × 0.2 + Tahu 8pcs × 0.1",
  },
  {
    name: "Wortel",
    needed: 520,
    unit: "gram",
    stock: 3000,
    status: "sufficient",
    emoji: "🥕",
    fromOrders: "Risol 26pcs × 20g",
  },
  {
    name: "Mayones",
    needed: 260,
    unit: "gram",
    stock: 500,
    status: "low",
    emoji: "🫙",
    fromOrders: "Risol 26pcs × 10g",
  },
  {
    name: "Minyak Goreng",
    needed: 720,
    unit: "ml",
    stock: 2000,
    status: "sufficient",
    emoji: "🫗",
    fromOrders: "Risol 26pcs × 20ml + Tahu 8pcs × 25ml",
  },
  {
    name: "Gula Aren",
    needed: 200,
    unit: "gram",
    stock: 1000,
    status: "sufficient",
    emoji: "🍯",
    fromOrders: "Kopi Susu 2L × 100g",
  },
];

export const productionSummary = {
  date: "Minggu, 18 Mei 2025",
  fromOrders: 5,
  menuList: [
    { name: "Risol Mayo", qty: 26, time: "07:00" },
    { name: "Lumpia Basah", qty: 10, time: "07:30" },
    { name: "Tahu Isi", qty: 8, time: "08:00" },
    { name: "Kopi Susu Literan", qty: "2L", time: "08:30" },
  ],
};

// ─────────────────────────────────────────
// DAILY SUMMARY
// ─────────────────────────────────────────
export const dailySummary = {
  date: "Sabtu, 17 Mei 2025",
  totalOrders: 11,
  confirmed: 5,
  draft: 6,
  unpaidCount: 4,
  unpaidAmount: 167000,
  paidCount: 1,
  paidAmount: 500000,
  needsCheck: 3,
  parsedChats: 13,
  totalChats: 15,
  narrative:
    "Hari ini 11 pesanan masuk. 5 sudah dikonfirmasi. 4 belum bayar — total Rp 167.000. Besok siapkan: 26 risol, 10 lumpia, dan 2L kopi susu.",
};

// ─────────────────────────────────────────
// IMPACT METRICS
// ─────────────────────────────────────────
export const impactMetrics = {
  simulatedChats: 15,
  parsedSuccessfully: 13,
  parseSuccessRate: 86.7,
  needsReview: 3,
  confirmed: 5,
  reminderReady: 4,
  ingredientsCalculated: 6,
  estimatedManualRecapTime: "30–45 menit",
  kualiMode: "~5–8 menit",
  weeklyTrend: [8, 11, 9, 14, 11, 13, 11],
  weekDays: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
};

// ─────────────────────────────────────────
// ROADMAP SIMULATION
// ─────────────────────────────────────────
export const roadmapItems = [
  {
    id: "roadmap-001",
    icon: "🛒",
    title: "Belanja Bahan Bareng",
    description:
      "Berdasarkan kebutuhan bahan, Kuali ke depan dapat membantu UMKM sekitar menemukan peluang belanja bareng.",
    note: "Berbasis consent pengguna penuh.",
    label: "Roadmap Simulation",
  },
  {
    id: "roadmap-002",
    icon: "♻️",
    title: "Sisa Stok Opt-in",
    description:
      "Tawarkan sisa produksi ke pelanggan yang sudah opt-in. Bukan broadcast otomatis.",
    note: "Hanya untuk pelanggan yang sudah mendaftar.",
    label: "Roadmap Simulation",
  },
];

// ─────────────────────────────────────────
// QRIS DUMMY
// ─────────────────────────────────────────
export const qrisDummy = {
  businessName: "KATERING BU RANI",
  note: "CONTOH — BUKAN UNTUK PEMBAYARAN",
  disclaimer:
    "Simulasi QRIS dummy. Kuali tidak memproses dana. Bu Rani mengirim QRIS miliknya sendiri ke pelanggan.",
};

export function generateReminderMessage(
  customerName: string,
  amount: number,
  items: string
): string {
  const amountFormatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

  return `Halo Kak ${customerName} 👋\nTerima kasih sudah pesan di Katering Bu Rani!\n\nPesanan: ${items}\nTotal: ${amountFormatted}\n\nMohon transfer ke QRIS di atas ya Kak.\nKonfirmasi setelah transfer. Terima kasih! 🙏\n– Bu Rani`;
}
