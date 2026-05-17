import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function todayAt(hour: number, minute = 0): Date {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d;
}

function todayString(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

async function main() {
  console.log("Seeding Kuali MVP database...");

  await prisma.$transaction([
    prisma.notificationLog.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.recipeItem.deleteMany(),
    prisma.customer.deleteMany(),
    prisma.ingredient.deleteMany(),
    prisma.menu.deleteMany(),
    prisma.business.deleteMany(),
    prisma.dailySummary.deleteMany(),
  ]);

  // ── Business ─────────────────────────────────────────────────────────────
  const business = await prisma.business.create({
    data: { id: "biz-001", name: "Dapur Bu Rani", ownerName: "Bu Rani" },
  });

  // ── Ingredients ──────────────────────────────────────────────────────────
  await prisma.ingredient.createMany({
    data: [
      { id: "ing-001", name: "Tepung Terigu", unit: "kg", stockQty: 10 },
      { id: "ing-002", name: "Telur", unit: "butir", stockQty: 60 },
      { id: "ing-003", name: "Wortel", unit: "kg", stockQty: 3 },
      { id: "ing-004", name: "Mayones", unit: "kg", stockQty: 1.5 },
      { id: "ing-005", name: "Minyak Goreng", unit: "liter", stockQty: 8 },
      { id: "ing-006", name: "Ayam Potong", unit: "kg", stockQty: 5 },
      { id: "ing-007", name: "Cabai Rawit", unit: "kg", stockQty: 0.5 },
      { id: "ing-008", name: "Bawang Putih", unit: "kg", stockQty: 1 },
      { id: "ing-009", name: "Beras", unit: "kg", stockQty: 20 },
      { id: "ing-010", name: "Minyak Sawit", unit: "liter", stockQty: 5 },
      { id: "ing-011", name: "Tahu Putih", unit: "buah", stockQty: 30 },
      { id: "ing-012", name: "Gula Aren", unit: "kg", stockQty: 2 },
    ],
  });

  // ── Menus ─────────────────────────────────────────────────────────────────
  await prisma.menu.createMany({
    data: [
      { id: "menu-001", name: "Risol Mayo", unit: "pcs", pricePerUnit: 3500 },
      { id: "menu-002", name: "Ayam Geprek", unit: "porsi", pricePerUnit: 15000 },
      { id: "menu-003", name: "Nasi Kotak", unit: "kotak", pricePerUnit: 25000 },
      { id: "menu-004", name: "Snack Box", unit: "kotak", pricePerUnit: 20000 },
      { id: "menu-005", name: "Lumpia Basah", unit: "pcs", pricePerUnit: 4000 },
      { id: "menu-006", name: "Tahu Walik", unit: "pcs", pricePerUnit: 3000 },
      { id: "menu-007", name: "Kopi Susu Gula Aren", unit: "liter", pricePerUnit: 18000 },
      { id: "menu-008", name: "Frozen Ayam Crispy", unit: "pack", pricePerUnit: 35000 },
    ],
  });

  // ── Recipe Items ──────────────────────────────────────────────────────────
  // Risol Mayo (menu-001): per pcs
  await prisma.recipeItem.createMany({
    data: [
      { menuId: "menu-001", ingredientId: "ing-001", qtyPerUnit: 0.02 },  // tepung terigu 20g
      { menuId: "menu-001", ingredientId: "ing-002", qtyPerUnit: 0.1 },   // telur 0.1 butir
      { menuId: "menu-001", ingredientId: "ing-003", qtyPerUnit: 0.01 },  // wortel 10g
      { menuId: "menu-001", ingredientId: "ing-004", qtyPerUnit: 0.005 }, // mayones 5g
      { menuId: "menu-001", ingredientId: "ing-005", qtyPerUnit: 0.01 },  // minyak goreng 10ml
      // Ayam Geprek (menu-002): per porsi
      { menuId: "menu-002", ingredientId: "ing-006", qtyPerUnit: 0.15 },  // ayam 150g
      { menuId: "menu-002", ingredientId: "ing-007", qtyPerUnit: 0.01 },  // cabai rawit 10g
      { menuId: "menu-002", ingredientId: "ing-008", qtyPerUnit: 0.005 }, // bawang putih 5g
      { menuId: "menu-002", ingredientId: "ing-005", qtyPerUnit: 0.05 },  // minyak goreng 50ml
      { menuId: "menu-002", ingredientId: "ing-009", qtyPerUnit: 0.15 },  // beras 150g
      // Nasi Kotak (menu-003): per kotak
      { menuId: "menu-003", ingredientId: "ing-009", qtyPerUnit: 0.15 },  // beras 150g
      { menuId: "menu-003", ingredientId: "ing-006", qtyPerUnit: 0.1 },   // ayam 100g
      { menuId: "menu-003", ingredientId: "ing-002", qtyPerUnit: 0.5 },   // telur 0.5 butir
      // Snack Box (menu-004): per kotak
      { menuId: "menu-004", ingredientId: "ing-001", qtyPerUnit: 0.05 },  // tepung terigu 50g
      { menuId: "menu-004", ingredientId: "ing-002", qtyPerUnit: 1 },     // telur 1 butir
      { menuId: "menu-004", ingredientId: "ing-005", qtyPerUnit: 0.02 },  // minyak goreng 20ml
      // Lumpia Basah (menu-005): per pcs
      { menuId: "menu-005", ingredientId: "ing-001", qtyPerUnit: 0.015 }, // tepung terigu 15g
      { menuId: "menu-005", ingredientId: "ing-003", qtyPerUnit: 0.02 },  // wortel 20g
      { menuId: "menu-005", ingredientId: "ing-010", qtyPerUnit: 0.005 }, // minyak sawit 5ml
      // Tahu Walik (menu-006): per pcs
      { menuId: "menu-006", ingredientId: "ing-011", qtyPerUnit: 1 },     // tahu putih 1 buah
      { menuId: "menu-006", ingredientId: "ing-005", qtyPerUnit: 0.01 },  // minyak goreng 10ml
      // Kopi Susu Gula Aren (menu-007): per liter
      { menuId: "menu-007", ingredientId: "ing-012", qtyPerUnit: 0.05 },  // gula aren 50g
      // Frozen Ayam Crispy (menu-008): per pack
      { menuId: "menu-008", ingredientId: "ing-006", qtyPerUnit: 0.3 },   // ayam 300g
      { menuId: "menu-008", ingredientId: "ing-001", qtyPerUnit: 0.05 },  // tepung terigu 50g
      { menuId: "menu-008", ingredientId: "ing-005", qtyPerUnit: 0.03 },  // minyak goreng 30ml
    ],
  });

  // ── Customers ─────────────────────────────────────────────────────────────
  const customers = await Promise.all([
    prisma.customer.create({ data: { id: "cust-001", name: "Dinda Ayu", phone: "081234567890" } }),
    prisma.customer.create({ data: { id: "cust-002", name: "Mas Budi", phone: "081234567891" } }),
    prisma.customer.create({ data: { id: "cust-003", name: "Ibu Sari", phone: "081234567892" } }),
    prisma.customer.create({ data: { id: "cust-004", name: "Kak Rina", phone: "081234567893" } }),
    prisma.customer.create({ data: { id: "cust-005", name: "Pak Hendra", phone: "081234567894" } }),
    prisma.customer.create({ data: { id: "cust-006", name: "Mbak Dewi", phone: "081234567895" } }),
    prisma.customer.create({ data: { id: "cust-007", name: "Anonim", phone: "081234567896" } }),
    prisma.customer.create({ data: { id: "cust-008", name: "Bu Tini", phone: "081234567897" } }),
    prisma.customer.create({ data: { id: "cust-009", name: "Mas Agus", phone: "081234567898" } }),
    prisma.customer.create({ data: { id: "cust-010", name: "Kak Lisa", phone: "081234567899" } }),
  ]);
  void customers;

  const today = todayString();

  // ── Today's 11 Orders ────────────────────────────────────────────────────
  // Breakdown: 5 confirmed (3 unpaid→167k, 1 paid), 3 draft, 3 needs_check

  // order-001: confirmed, unpaid, 42,000
  const o1 = await prisma.order.create({
    data: {
      id: "order-001", orderNumber: "KL-TODAY-001", businessId: business.id,
      customerId: "cust-001", customerName: "Dinda Ayu", customerPhone: "081234567890",
      sourceChat: "chat-001", status: "confirmed", paymentStatus: "unpaid",
      totalAmount: 42000, deliveryDate: today, deliveryTime: "15:00",
      pickupMethod: "delivery", confidenceScore: 0.95, missingFields: "[]",
      qrisDummyShown: true, notes: "Pelanggan minta bayar nanti sore",
      createdAt: todayAt(8, 15), approvedAt: todayAt(8, 20),
    },
  });
  await prisma.orderItem.create({
    data: { orderId: o1.id, menuId: "menu-001", menuName: "Risol Mayo", qty: 12, unitPrice: 3500, subtotal: 42000 },
  });

  // order-002: draft, unpaid, 75,000
  const o2 = await prisma.order.create({
    data: {
      id: "order-002", orderNumber: "KL-TODAY-002", businessId: business.id,
      customerId: "cust-002", customerName: "Mas Budi", customerPhone: "081234567891",
      sourceChat: "chat-002", status: "draft", paymentStatus: "unpaid",
      totalAmount: 75000, deliveryDate: today, deliveryTime: null,
      pickupMethod: "ambil_sendiri", confidenceScore: 0.78, missingFields: JSON.stringify(["paymentStatus", "exactTime"]),
      qrisDummyShown: false, notes: "Waktu ambil siang tidak jelas, perlu konfirmasi",
      createdAt: todayAt(8, 30),
    },
  });
  await prisma.orderItem.create({
    data: { orderId: o2.id, menuId: "menu-002", menuName: "Ayam Geprek", qty: 5, unitPrice: 15000, subtotal: 75000 },
  });

  // order-003: confirmed, paid, 500,000
  const o3 = await prisma.order.create({
    data: {
      id: "order-003", orderNumber: "KL-TODAY-003", businessId: business.id,
      customerId: "cust-004", customerName: "Kak Rina", customerPhone: "081234567893",
      sourceChat: "chat-004", status: "confirmed", paymentStatus: "paid",
      totalAmount: 500000, deliveryDate: today, deliveryTime: null,
      pickupMethod: "ambil_sendiri", confidenceScore: 0.90, missingFields: JSON.stringify(["pickupTime"]),
      qrisDummyShown: true, notes: "Sudah transfer. Acara kantor.",
      createdAt: todayAt(9, 0), approvedAt: todayAt(9, 5),
    },
  });
  await prisma.orderItem.create({
    data: { orderId: o3.id, menuId: "menu-003", menuName: "Nasi Kotak", qty: 20, unitPrice: 25000, subtotal: 500000 },
  });

  // order-004: confirmed, unpaid, 68,000
  const o4 = await prisma.order.create({
    data: {
      id: "order-004", orderNumber: "KL-TODAY-004", businessId: business.id,
      customerId: "cust-006", customerName: "Mbak Dewi", customerPhone: "081234567895",
      sourceChat: "chat-006", status: "confirmed", paymentStatus: "unpaid",
      totalAmount: 68000, deliveryDate: today, deliveryTime: "07:00",
      pickupMethod: "delivery", confidenceScore: 0.92, missingFields: "[]",
      qrisDummyShown: true, notes: null,
      createdAt: todayAt(9, 30), approvedAt: todayAt(9, 35),
    },
  });
  await prisma.orderItem.createMany({
    data: [
      { orderId: o4.id, menuId: "menu-001", menuName: "Risol Mayo", qty: 8, unitPrice: 3500, subtotal: 28000 },
      { orderId: o4.id, menuId: "menu-005", menuName: "Lumpia Basah", qty: 10, unitPrice: 4000, subtotal: 40000 },
    ],
  });

  // order-005: needs_check, unpaid, 70,000 (confidence 0.65)
  const o5 = await prisma.order.create({
    data: {
      id: "order-005", orderNumber: "KL-TODAY-005", businessId: business.id,
      customerId: "cust-008", customerName: "Bu Tini", customerPhone: "081234567897",
      sourceChat: "chat-009", status: "needs_check", paymentStatus: "unpaid",
      totalAmount: 70000, deliveryDate: null, deliveryTime: null,
      pickupMethod: null, confidenceScore: 0.65, missingFields: JSON.stringify(["deliveryDate", "paymentStatus", "pickupMethod"]),
      qrisDummyShown: false, notes: "Masih perlu dikonfirmasi tanggal dan cara pengambilan",
      createdAt: todayAt(10, 15),
    },
  });
  await prisma.orderItem.create({
    data: { orderId: o5.id, menuId: "menu-008", menuName: "Frozen Ayam Crispy", qty: 2, unitPrice: 35000, subtotal: 70000 },
  });

  // order-006: confirmed, unpaid, 21,000
  const o6 = await prisma.order.create({
    data: {
      id: "order-006", orderNumber: "KL-TODAY-006", businessId: business.id,
      customerId: "cust-009", customerName: "Mas Agus", customerPhone: "081234567898",
      sourceChat: "chat-010", status: "confirmed", paymentStatus: "unpaid",
      totalAmount: 21000, deliveryDate: today, deliveryTime: null,
      pickupMethod: "delivery", confidenceScore: 0.82, missingFields: JSON.stringify(["paymentStatus", "exactTime"]),
      qrisDummyShown: true, notes: "'bj' ditafsirkan sebagai 'buah'",
      createdAt: todayAt(10, 30), approvedAt: todayAt(10, 35),
    },
  });
  await prisma.orderItem.create({
    data: { orderId: o6.id, menuId: "menu-001", menuName: "Risol Mayo", qty: 6, unitPrice: 3500, subtotal: 21000 },
  });

  // order-007: confirmed, unpaid, 36,000
  const o7 = await prisma.order.create({
    data: {
      id: "order-007", orderNumber: "KL-TODAY-007", businessId: business.id,
      customerId: "cust-010", customerName: "Kak Lisa", customerPhone: "081234567899",
      sourceChat: "chat-011", status: "confirmed", paymentStatus: "unpaid",
      totalAmount: 36000, deliveryDate: today, deliveryTime: "08:00",
      pickupMethod: "kurir", specialRequest: "dikirim via kurir",
      confidenceScore: 0.94, missingFields: "[]",
      qrisDummyShown: true, notes: null,
      createdAt: todayAt(10, 45), approvedAt: todayAt(10, 50),
    },
  });
  await prisma.orderItem.create({
    data: { orderId: o7.id, menuId: "menu-007", menuName: "Kopi Susu Gula Aren", qty: 2, unitPrice: 18000, subtotal: 36000 },
  });

  // order-008: draft, unpaid, 375,000
  const o8 = await prisma.order.create({
    data: {
      id: "order-008", orderNumber: "KL-TODAY-008", businessId: business.id,
      customerId: "cust-003", customerName: "Ibu Sari", customerPhone: "081234567892",
      sourceChat: "chat-012", status: "draft", paymentStatus: "unpaid",
      totalAmount: 375000, deliveryDate: today, deliveryTime: null,
      pickupMethod: null, specialRequest: "tulis nama di setiap kotak",
      confidenceScore: 0.75, missingFields: JSON.stringify(["paymentStatus", "exactTime", "pickupMethod"]),
      qrisDummyShown: false, notes: "Special request: nama di kotak.",
      createdAt: todayAt(11, 0),
    },
  });
  await prisma.orderItem.create({
    data: { orderId: o8.id, menuId: "menu-003", menuName: "Nasi Kotak", qty: 15, unitPrice: 25000, subtotal: 375000 },
  });

  // order-009: draft, unpaid, 51,000
  const o9 = await prisma.order.create({
    data: {
      id: "order-009", orderNumber: "KL-TODAY-009", businessId: business.id,
      customerId: "cust-002", customerName: "Mas Budi", customerPhone: "081234567891",
      sourceChat: "chat-014", status: "draft", paymentStatus: "unpaid",
      totalAmount: 51000, deliveryDate: today, deliveryTime: null,
      pickupMethod: "ambil_sendiri", confidenceScore: 0.80, missingFields: JSON.stringify(["paymentStatus"]),
      qrisDummyShown: false, notes: "Tambahan ke order-002 dari Mas Budi.",
      createdAt: todayAt(11, 30),
    },
  });
  await prisma.orderItem.createMany({
    data: [
      { orderId: o9.id, menuId: "menu-002", menuName: "Ayam Geprek", qty: 3, unitPrice: 15000, subtotal: 45000 },
      { orderId: o9.id, menuId: "menu-006", menuName: "Tahu Walik", qty: 2, unitPrice: 3000, subtotal: 6000 },
    ],
  });

  // order-019: needs_check, unpaid, 100,000 (confidence 0.60)
  const o19 = await prisma.order.create({
    data: {
      id: "order-019", orderNumber: "KL-TODAY-010", businessId: business.id,
      customerId: "cust-005", customerName: "Pak Hendra", customerPhone: "081234567894",
      sourceChat: "chat-005", status: "needs_check", paymentStatus: "unpaid",
      totalAmount: 100000, deliveryDate: null, deliveryTime: null,
      pickupMethod: null, specialRequest: "pertanyaan apakah termasuk coklat di order sebelumnya",
      confidenceScore: 0.60, missingFields: JSON.stringify(["deliveryDate", "paymentStatus"]),
      qrisDummyShown: false, notes: "Ada pertanyaan tentang order sebelumnya, perlu klarifikasi manual",
      createdAt: todayAt(9, 15),
    },
  });
  await prisma.orderItem.create({
    data: { orderId: o19.id, menuId: "menu-004", menuName: "Snack Box", qty: 5, unitPrice: 20000, subtotal: 100000 },
  });

  // order-020: needs_check, unpaid, 70,000 (confidence 0.45)
  const o20 = await prisma.order.create({
    data: {
      id: "order-020", orderNumber: "KL-TODAY-011", businessId: business.id,
      customerId: "cust-008", customerName: "Bu Tini", customerPhone: "081234567897",
      sourceChat: "chat-015", status: "needs_check", paymentStatus: "unpaid",
      totalAmount: 70000, deliveryDate: null, deliveryTime: null,
      pickupMethod: null, specialRequest: "varian pedas — belum dikonfirmasi tersedia",
      confidenceScore: 0.45, missingFields: JSON.stringify(["deliveryDate", "paymentStatus", "menuVariantConfirmation"]),
      qrisDummyShown: false, notes: "LOW CONFIDENCE — varian pedas belum ada di menu standar.",
      createdAt: todayAt(11, 45),
    },
  });
  await prisma.orderItem.create({
    data: { orderId: o20.id, menuId: "menu-008", menuName: "Frozen Ayam Crispy (Pedas?)", qty: 2, unitPrice: 35000, subtotal: 70000 },
  });

  void [o1, o2, o3, o4, o5, o6, o7, o8, o9, o19, o20];

  // ── Daily Summary ─────────────────────────────────────────────────────────
  await prisma.dailySummary.create({
    data: {
      date: today,
      totalOrders: 11,
      confirmedOrders: 5,
      draftOrders: 6,
      totalRevenue: 500000 + 42000 + 68000 + 21000 + 36000,
      unpaidAmount: 42000 + 68000 + 21000 + 36000,
      parsedChats: 13,
      totalChats: 15,
    },
  });

  console.log("✅ Seed complete:");
  console.log("   - 11 today orders (5 confirmed, 3 draft, 3 needs_check)");
  console.log("   - 4 confirmed unpaid = Rp 167,000");
  console.log("   - 8 menus, 12 ingredients, recipe items");
  console.log("   - 1 daily summary");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
