import type { ParsedOrder } from "./dummy-data";

interface ChatInput {
  chatId: string;
  message: string;
  customerName?: string;
}

function todayPlusDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

// Predetermined responses keyed by chatId
const MOCK_RESPONSES: Record<string, ParsedOrder> = {
  "chat-001": {
    chatId: "chat-001",
    customerName: "Dinda Ayu",
    items: [{ menu: "Risol Mayo", qty: 12, unitPrice: 3500, subtotal: 42000 }],
    deliveryDate: todayPlusDays(1),
    deliveryTime: "15:00",
    paymentStatus: "unpaid",
    paymentNote: "Belum bayar",
    pickupMethod: "delivery",
    confidenceScore: 95,
    missingFields: [],
    needsOwnerReview: false,
    suggestedReply:
      "Halo Dinda 😊 Pesanan 12 Risol Mayo untuk besok jam 15:00 sudah dicatat ya! Total Rp 42.000. Silakan transfer sebelum pengiriman.",
  },
  "chat-002": {
    chatId: "chat-002",
    customerName: "Mas Budi",
    items: [{ menu: "Ayam Geprek", qty: 5, unitPrice: 15000, subtotal: 75000 }],
    deliveryDate: todayPlusDays(0),
    deliveryTime: "",
    paymentStatus: "unpaid",
    paymentNote: "Belum konfirmasi",
    pickupMethod: "pickup",
    confidenceScore: 78,
    missingFields: ["paymentStatus", "exactTime"],
    needsOwnerReview: true,
    suggestedReply:
      "Halo Mas Budi, pesanan 5 Ayam Geprek (Rp 75.000) sudah dicatat. Bisa konfirmasi jam ambil dan metode pembayaran?",
  },
  "chat-003": {
    chatId: "chat-003",
    customerName: "Ibu Sari",
    items: [{ menu: "Nasi Kotak", qty: 10, unitPrice: 25000, subtotal: 250000 }],
    deliveryDate: todayPlusDays(3),
    deliveryTime: "12:00",
    paymentStatus: "unpaid",
    paymentNote: "Belum bayar",
    pickupMethod: "delivery",
    confidenceScore: 88,
    missingFields: [],
    needsOwnerReview: false,
    suggestedReply:
      "Halo Bu Sari 😊 Pesanan 10 Nasi Kotak untuk hari Jumat jam 12:00 sudah dicatat. Total Rp 250.000. Mohon konfirmasi DP minimal 50%.",
  },
  "chat-004": {
    chatId: "chat-004",
    customerName: "Bu Tini",
    items: [{ menu: "Frozen Ayam Crispy", qty: 2, unitPrice: 35000, subtotal: 70000 }],
    deliveryDate: "",
    deliveryTime: "",
    paymentStatus: "unpaid",
    paymentNote: "Belum dikonfirmasi",
    pickupMethod: "pickup",
    confidenceScore: 52,
    missingFields: ["deliveryDate", "pickupMethod", "paymentStatus"],
    needsOwnerReview: true,
    suggestedReply:
      "Halo Bu Tini, pesanan 2 pack Frozen Ayam Crispy (Rp 70.000) sudah dicatat. Bisa info tanggal kirim dan mau diantar atau ambil sendiri?",
  },
};

// Keyword fallback for free-text input
function keywordParse(input: ChatInput): ParsedOrder {
  const msg = input.message.toLowerCase();

  if (msg.includes("risol")) {
    const qty = extractQty(msg) ?? 12;
    return {
      chatId: input.chatId,
      customerName: input.customerName ?? "Pelanggan",
      items: [{ menu: "Risol Mayo", qty, unitPrice: 3500, subtotal: qty * 3500 }],
      deliveryDate: todayPlusDays(1),
      deliveryTime: "15:00",
      paymentStatus: "unpaid",
      paymentNote: "Belum bayar",
      pickupMethod: "delivery",
      confidenceScore: 82,
      missingFields: [],
      needsOwnerReview: false,
      suggestedReply: `Pesanan ${qty} Risol Mayo (Rp ${(qty * 3500).toLocaleString("id-ID")}) sudah dicatat!`,
    };
  }

  if (msg.includes("ayam geprek") || msg.includes("geprek")) {
    const qty = extractQty(msg) ?? 3;
    return {
      chatId: input.chatId,
      customerName: input.customerName ?? "Pelanggan",
      items: [{ menu: "Ayam Geprek", qty, unitPrice: 15000, subtotal: qty * 15000 }],
      deliveryDate: todayPlusDays(0),
      deliveryTime: "",
      paymentStatus: "unpaid",
      paymentNote: "Belum dikonfirmasi",
      pickupMethod: "pickup",
      confidenceScore: 75,
      missingFields: ["exactTime", "paymentStatus"],
      needsOwnerReview: true,
      suggestedReply: `Pesanan ${qty} Ayam Geprek (Rp ${(qty * 15000).toLocaleString("id-ID")}) dicatat. Jam berapa ambilnya?`,
    };
  }

  if (msg.includes("nasi kotak") || msg.includes("nasi box")) {
    const qty = extractQty(msg) ?? 20;
    return {
      chatId: input.chatId,
      customerName: input.customerName ?? "Pelanggan",
      items: [{ menu: "Nasi Kotak", qty, unitPrice: 25000, subtotal: qty * 25000 }],
      deliveryDate: todayPlusDays(2),
      deliveryTime: "12:00",
      paymentStatus: "unpaid",
      paymentNote: "Belum bayar",
      pickupMethod: "delivery",
      confidenceScore: 85,
      missingFields: [],
      needsOwnerReview: false,
      suggestedReply: `Pesanan ${qty} Nasi Kotak (Rp ${(qty * 25000).toLocaleString("id-ID")}) dicatat. Total konfirmasi besok ya.`,
    };
  }

  if (msg.includes("frozen") || msg.includes("crispy") || msg.includes("pedas")) {
    const qty = extractQty(msg) ?? 2;
    return {
      chatId: input.chatId,
      customerName: input.customerName ?? "Pelanggan",
      items: [{ menu: "Frozen Ayam Crispy", qty, unitPrice: 35000, subtotal: qty * 35000 }],
      deliveryDate: "",
      deliveryTime: "",
      paymentStatus: "unpaid",
      paymentNote: "Belum dikonfirmasi",
      pickupMethod: "pickup",
      confidenceScore: 55,
      missingFields: ["deliveryDate", "pickupMethod", "paymentStatus"],
      needsOwnerReview: true,
      suggestedReply: `Pesanan ${qty} pack Frozen Ayam Crispy dicatat. Bisa konfirmasi tanggal kirim?`,
    };
  }

  // Default: low-confidence generic
  return {
    chatId: input.chatId,
    customerName: input.customerName ?? "Pelanggan",
    items: [],
    deliveryDate: "",
    deliveryTime: "",
    paymentStatus: "unpaid",
    paymentNote: "Tidak dapat dideteksi",
    pickupMethod: "pickup",
    confidenceScore: 40,
    missingFields: ["item", "qty", "deliveryDate", "paymentStatus"],
    needsOwnerReview: true,
    suggestedReply: "Maaf, pesan tidak berhasil dideteksi. Bisa ulangi dengan format: nama menu + jumlah + tanggal?",
  };
}

function extractQty(msg: string): number | null {
  const match = msg.match(/(\d+)\s*(pcs|buah|porsi|kotak|pack|bungkus|lusin)?/i);
  if (match) {
    const qty = parseInt(match[1], 10);
    const unit = (match[2] ?? "").toLowerCase();
    return unit === "lusin" ? qty * 12 : qty;
  }
  return null;
}

export async function parseOrder(input: ChatInput): Promise<ParsedOrder> {
  // 1. Exact chatId match (demo presets)
  if (MOCK_RESPONSES[input.chatId]) {
    // Simulate 1.2s AI processing
    await new Promise((r) => setTimeout(r, 1200));
    return MOCK_RESPONSES[input.chatId];
  }

  // 2. Keyword fallback
  await new Promise((r) => setTimeout(r, 1200));
  return keywordParse(input);
}
