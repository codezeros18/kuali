/**
 * Kuali AI Order Parser
 *
 * GUARDRAILS — these rules must never be violated by any AI path:
 *   ❌ Do NOT invent a menu item not in MENU_CATALOG
 *   ❌ Do NOT invent a price not in MENU_CATALOG
 *   ❌ Do NOT set paymentStatus = "paid" based on chat text
 *   ❌ Do NOT auto-confirm or auto-approve any order
 *   ❌ Do NOT send any message to the customer
 *   ❌ Do NOT calculate ingredient needs (production planner's job)
 *   ✅ Always set needsOwnerReview = true when confidenceScore < 80
 *   ✅ Always list missingFields explicitly
 *   ✅ Always include rawMessage in output
 *   ✅ paymentStatus is always "unpaid" — owner marks paid manually
 */

import type { ParsedOrder } from "./dummy-data";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ChatInput {
  chatId: string;
  message: string;
  customerName?: string;
}

/** Extended output — superset of ParsedOrder, adds rawMessage */
export type ParseResult = ParsedOrder & { rawMessage: string };

// ── Menu catalog — single source of truth, prices from seed data ──────────────
// Any AI path MUST only return items and prices from this catalog.
export const MENU_CATALOG: Record<string, { id: string; unit: string; price: number }> = {
  "Risol Mayo":          { id: "menu-001", unit: "pcs",   price: 3500  },
  "Ayam Geprek":         { id: "menu-002", unit: "porsi", price: 15000 },
  "Nasi Kotak":          { id: "menu-003", unit: "kotak", price: 25000 },
  "Snack Box":           { id: "menu-004", unit: "kotak", price: 20000 },
  "Lumpia Basah":        { id: "menu-005", unit: "pcs",   price: 4000  },
  "Tahu Walik":          { id: "menu-006", unit: "pcs",   price: 3000  },
  "Kopi Susu Gula Aren": { id: "menu-007", unit: "liter", price: 18000 },
  "Frozen Ayam Crispy":  { id: "menu-008", unit: "pack",  price: 35000 },
};

// ── Date helpers ──────────────────────────────────────────────────────────────

function todayPlusDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function resolveRelativeDate(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("besok"))                          return todayPlusDays(1);
  if (m.includes("lusa"))                           return todayPlusDays(2);
  if (m.includes("hari ini") || m.includes("sekarang")) return todayPlusDays(0);

  const days: Record<string, number> = {
    senin: 1, selasa: 2, rabu: 3, kamis: 4, jumat: 5, sabtu: 6, minggu: 0,
  };
  for (const [name, dow] of Object.entries(days)) {
    if (m.includes(name)) {
      const today = new Date().getDay();
      let diff = dow - today;
      if (diff <= 0) diff += 7;
      return todayPlusDays(diff);
    }
  }
  return "";
}

function resolveTime(msg: string): string {
  const explicit = msg.match(/(?:jam|pukul)\s*(\d{1,2})(?:[.:](\d{2}))?\s*(pagi|siang|sore|malam)?/i);
  if (explicit) {
    let h = parseInt(explicit[1], 10);
    const m = explicit[2] ? parseInt(explicit[2], 10) : 0;
    const period = (explicit[3] ?? "").toLowerCase();
    if ((period === "sore" || period === "malam") && h < 12) h += 12;
    if (period === "pagi" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }
  const hhmm = msg.match(/\b(\d{1,2}):(\d{2})\b/);
  if (hhmm) return `${hhmm[1].padStart(2, "0")}:${hhmm[2]}`;
  return "";
}

// ── Quantity extractor ────────────────────────────────────────────────────────

function extractQty(msg: string): number | null {
  const patterns: RegExp[] = [
    /(\d+)\s*lusin\b/i,
    /(\d+)\s*(?:pcs|buah|porsi|kotak|pack|bungkus|loyang)\b/i,
    /pesan\s+(\d+)\b/i,
    /order\s+(\d+)\b/i,
    /(?:^|\s)(\d{1,3})(?:\s|$)/,
  ];
  for (const p of patterns) {
    const match = msg.match(p);
    if (match) {
      const qty = parseInt(match[1], 10);
      return p.source.includes("lusin") ? qty * 12 : qty;
    }
  }
  return null;
}

// ── Field resolvers ───────────────────────────────────────────────────────────

function resolvePickupMethod(msg: string): "delivery" | "pickup" {
  const m = msg.toLowerCase();
  if (m.includes("diantar") || m.includes("kirim") || m.includes("delivery") || m.includes("antar")) {
    return "delivery";
  }
  return "pickup";
}

function resolvePaymentNote(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("transfer") || m.includes(" tf ") || m.includes("tf ya")) return "Akan transfer";
  if (m.includes("bayar nanti") || m.includes("bayar belakangan"))           return "Bayar nanti";
  if (m.includes("cod") || m.includes("bayar di tempat"))                    return "COD / bayar di tempat";
  if (m.includes("dp") || m.includes("uang muka"))                           return "Minta DP";
  return "Belum disebutkan";
}

function detectMissingFields(params: {
  hasItems: boolean;
  deliveryDate: string;
  deliveryTime: string;
  hasCustomerName: boolean;
  hasPedas: boolean;
}): string[] {
  const missing: string[] = [];
  if (!params.hasItems)        missing.push("item pesanan");
  if (!params.deliveryDate)    missing.push("tanggal kirim/ambil");
  if (!params.deliveryTime)    missing.push("jam kirim/ambil");
  if (!params.hasCustomerName) missing.push("nama pelanggan");
  if (params.hasPedas)         missing.push("konfirmasi varian pedas tersedia");
  return missing;
}

function scoreConfidence(missingFields: string[], hasPedas: boolean, hasItems: boolean): number {
  if (!hasItems) return 35;
  let score = 95;
  // Non-time missing fields penalise more
  const heavyMissing = missingFields.filter((f) => f !== "jam kirim/ambil");
  score -= heavyMissing.length * 12;
  if (missingFields.includes("jam kirim/ambil")) score -= 5;
  if (hasPedas) score -= 20;
  return Math.max(30, Math.min(98, score));
}

function buildReply(params: {
  customerName: string;
  itemSummary: string;
  total: number;
  missingFields: string[];
  confidenceScore: number;
}): string {
  const { customerName, itemSummary, total, missingFields, confidenceScore } = params;
  const name = customerName && customerName !== "Pelanggan"
    ? `Kak ${customerName.split(" ")[0]}`
    : "Kak";

  if (confidenceScore < 60 || !itemSummary) {
    return `Halo ${name}, maaf pesanan belum bisa dideteksi otomatis. Bisa ulangi dengan format: nama menu + jumlah + tanggal? 🙏`;
  }

  const totalFmt = total > 0 ? ` Total Rp ${total.toLocaleString("id-ID")}.` : "";
  const ask = missingFields.filter((f) => f !== "jam kirim/ambil").length > 0
    ? ` Boleh info juga: ${missingFields.filter((f) => f !== "jam kirim/ambil").slice(0, 2).join(" dan ")}?`
    : " Terima kasih! 🙏";

  return `Halo ${name} 😊 Pesanan ${itemSummary} sudah dicatat ya!${totalFmt}${ask}`;
}

// ── Predetermined demo responses ──────────────────────────────────────────────

function buildMockResponses(): Record<string, Omit<ParseResult, "rawMessage">> {
  return {
    "chat-001": {
      chatId: "chat-001", customerName: "Dinda Ayu",
      items: [{ menu: "Risol Mayo", qty: 12, unitPrice: 3500, subtotal: 42000 }],
      deliveryDate: todayPlusDays(1), deliveryTime: "15:00",
      paymentStatus: "unpaid", paymentNote: "Bayar nanti sore", pickupMethod: "delivery",
      confidenceScore: 95, missingFields: [], needsOwnerReview: false,
      suggestedReply:
        "Halo Kak Dinda 😊 Pesanan 12 Risol Mayo untuk besok jam 15:00 sudah dicatat ya! Total Rp 42.000. Kami akan kirimkan info pembayaran sore ini. Terima kasih! 🙏",
    },
    "chat-002": {
      chatId: "chat-002", customerName: "Mas Budi",
      items: [{ menu: "Ayam Geprek", qty: 5, unitPrice: 15000, subtotal: 75000 }],
      deliveryDate: todayPlusDays(0), deliveryTime: "12:00",
      paymentStatus: "unpaid", paymentNote: "Belum disebutkan", pickupMethod: "pickup",
      confidenceScore: 78, missingFields: ["status pembayaran"], needsOwnerReview: true,
      suggestedReply:
        "Halo Mas Budi 😊 Ayam Geprek 5 porsi untuk siang ini sudah dicatat. Total Rp 75.000. Boleh info metode pembayarannya? 🙏",
    },
    "chat-003": {
      chatId: "chat-003", customerName: "Kak Rina",
      items: [{ menu: "Nasi Kotak", qty: 20, unitPrice: 25000, subtotal: 500000 }],
      deliveryDate: todayPlusDays(4), deliveryTime: "12:00",
      paymentStatus: "unpaid", paymentNote: "Akan transfer", pickupMethod: "delivery",
      confidenceScore: 90, missingFields: ["jam pengiriman pasti"], needsOwnerReview: false,
      suggestedReply:
        "Halo Kak Rina 😊 Pesanan 20 Nasi Kotak untuk hari Jumat jam 12:00 sudah dicatat! Total Rp 500.000. Mohon konfirmasi DP sebelum Kamis ya. Terima kasih! 🙏",
    },
    "chat-004": {
      chatId: "chat-004", customerName: "Bu Tini",
      items: [{ menu: "Frozen Ayam Crispy", qty: 2, unitPrice: 35000, subtotal: 70000 }],
      deliveryDate: "", deliveryTime: "",
      paymentStatus: "unpaid", paymentNote: "Belum disebutkan", pickupMethod: "pickup",
      confidenceScore: 45,
      missingFields: ["tanggal kirim/ambil", "jam kirim/ambil", "status pembayaran", "konfirmasi varian pedas tersedia"],
      needsOwnerReview: true,
      suggestedReply:
        "Halo Bu Tini, untuk Frozen Ayam Crispy varian pedas kami perlu konfirmasi ketersediaannya dulu ya. Boleh info juga tanggal dan jam ambilnya? 🙏",
    },
  };
}

// ── Output validator (guardrail enforcement) ──────────────────────────────────

function validateOutput(result: Omit<ParseResult, "rawMessage">): Omit<ParseResult, "rawMessage"> {
  // Guardrail: paymentStatus must never be "paid" from parser
  if (result.paymentStatus === "paid") {
    console.warn("[ai-parser guardrail] Blocked paymentStatus=paid from parser output");
    result.paymentStatus = "unpaid";
    result.paymentNote = "[Guardrail] Parser tidak boleh konfirmasi pembayaran";
    result.missingFields = [...result.missingFields, "konfirmasi pembayaran dari owner"];
    result.needsOwnerReview = true;
    result.confidenceScore = Math.min(result.confidenceScore, 60);
  }

  // Guardrail: reject hallucinated menu items
  result.items = result.items.filter((item) => {
    if (MENU_CATALOG[item.menu]) return true;
    console.warn(`[ai-parser guardrail] Rejected unknown menu: "${item.menu}"`);
    return false;
  });

  // Guardrail: enforce catalog prices (no hallucinated prices)
  result.items = result.items.map((item) => {
    const catalog = MENU_CATALOG[item.menu];
    if (!catalog) return item;
    return { ...item, unitPrice: catalog.price, subtotal: catalog.price * item.qty };
  });

  // Guardrail: needsOwnerReview required if confidence < 80
  if (result.confidenceScore < 80) result.needsOwnerReview = true;

  // Guardrail: clamp confidence to valid range
  result.confidenceScore = Math.max(0, Math.min(100, Math.round(result.confidenceScore)));

  return result;
}

// ── Keyword parser ────────────────────────────────────────────────────────────

function keywordParse(input: ChatInput): Omit<ParseResult, "rawMessage"> {
  const msg = input.message;
  const m = msg.toLowerCase();
  const customerName = input.customerName ?? "Pelanggan";

  const keywordMap: [RegExp, string][] = [
    [/risol\s*mayo|risol/i,                       "Risol Mayo"],
    [/ayam\s*geprek|geprek/i,                     "Ayam Geprek"],
    [/nasi\s*kotak|nasi\s*box|catering\s*nasi/i,  "Nasi Kotak"],
    [/snack\s*box|snackbox/i,                     "Snack Box"],
    [/lumpia\s*basah|lumpia/i,                    "Lumpia Basah"],
    [/tahu\s*walik|tahu\s+walik/i,               "Tahu Walik"],
    [/kopi\s*susu|kopi\s*gula\s*aren|kopi/i,      "Kopi Susu Gula Aren"],
    [/frozen|ayam\s*crispy|crispy/i,              "Frozen Ayam Crispy"],
  ];

  let matchedMenu: string | null = null;
  for (const [pattern, menuName] of keywordMap) {
    if (pattern.test(m)) { matchedMenu = menuName; break; }
  }

  const hasItems = matchedMenu !== null;
  const hasPedas = m.includes("pedas");
  const deliveryDate = resolveRelativeDate(msg);
  const deliveryTime = resolveTime(msg);
  const pickupMethod = resolvePickupMethod(msg);
  const paymentNote = resolvePaymentNote(msg);

  const items = hasItems
    ? (() => {
        const catalog = MENU_CATALOG[matchedMenu!];
        const qty = extractQty(m) ?? 1;
        return [{ menu: matchedMenu!, qty, unitPrice: catalog.price, subtotal: catalog.price * qty }];
      })()
    : [];

  const missingFields = detectMissingFields({
    hasItems, deliveryDate, deliveryTime,
    hasCustomerName: !!(input.customerName && input.customerName !== "Pelanggan"),
    hasPedas,
  });

  const total = items.reduce((s, i) => s + i.subtotal, 0);
  const itemSummary = items.map((i) => `${i.qty} ${i.menu}`).join(", ");
  const confidenceScore = scoreConfidence(missingFields, hasPedas, hasItems);

  return {
    chatId: input.chatId,
    customerName,
    items,
    deliveryDate,
    deliveryTime,
    paymentStatus: "unpaid",
    paymentNote,
    pickupMethod,
    confidenceScore,
    missingFields,
    needsOwnerReview: confidenceScore < 80 || hasPedas,
    suggestedReply: buildReply({ customerName, itemSummary, total, missingFields, confidenceScore }),
  };
}

// ── Optional real-AI path (stub — uncomment when SDK is installed) ─────────────
//
// import Anthropic from "@anthropic-ai/sdk";
//
// async function callRealAI(input: ChatInput): Promise<Omit<ParseResult,"rawMessage">|null> {
//   const apiKey = process.env.ANTHROPIC_API_KEY;
//   if (!apiKey) return null;
//
//   const client = new Anthropic({ apiKey });
//   const menuList = Object.entries(MENU_CATALOG)
//     .map(([n, v]) => `${n} — Rp ${v.price.toLocaleString("id-ID")} per ${v.unit}`)
//     .join("\n");
//
//   const res = await client.messages.create({
//     model: "claude-haiku-4-5-20251001",
//     max_tokens: 512,
//     messages: [{
//       role: "user",
//       content:
//         `Kamu adalah parser pesanan UMKM kuliner. Ekstrak informasi dari pesan pelanggan.\n\n` +
//         `MENU TERSEDIA (HANYA gunakan menu ini):\n${menuList}\n\n` +
//         `ATURAN:\n` +
//         `- paymentStatus selalu "unpaid"\n` +
//         `- Jangan karang menu/harga baru\n` +
//         `- missingFields harus lengkap\n` +
//         `- confidenceScore < 80 → needsOwnerReview = true\n\n` +
//         `Kembalikan JSON: customerName, items[]{menu,qty,unitPrice,subtotal}, deliveryDate (YYYY-MM-DD),\n` +
//         `deliveryTime (HH:MM), paymentStatus, paymentNote, pickupMethod, confidenceScore, missingFields[], needsOwnerReview, suggestedReply\n\n` +
//         `Pesan: "${input.message}"\nNama: "${input.customerName ?? "tidak diketahui"}"`,
//     }],
//   });
//
//   try {
//     const text = res.content[0].type === "text" ? res.content[0].text : "";
//     const json = JSON.parse(text.match(/\{[\s\S]+\}/)?.[0] ?? "{}");
//     return { chatId: input.chatId, ...json };
//   } catch { return null; }
// }

// ── Public entry point ────────────────────────────────────────────────────────

export async function parseOrder(input: ChatInput): Promise<ParseResult> {
  const useMock = process.env.USE_MOCK_AI !== "false";
  const rawMessage = input.message;

  // Simulate AI processing delay for realistic demo feel
  await new Promise((r) => setTimeout(r, useMock ? 1200 : 0));

  // 1. Exact chatId preset → deterministic demo output
  const MOCK_RESPONSES = buildMockResponses();
  if (MOCK_RESPONSES[input.chatId]) {
    return { ...validateOutput(MOCK_RESPONSES[input.chatId]), rawMessage };
  }

  // 2. Real AI path (requires ANTHROPIC_API_KEY + SDK — currently stub)
  // if (!useMock) {
  //   const aiResult = await callRealAI(input);
  //   if (aiResult) return { ...validateOutput(aiResult), rawMessage };
  // }

  // 3. Keyword fallback — handles any free-text input without an API key
  return { ...validateOutput(keywordParse(input)), rawMessage };
}
