import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function todayRange(): { gte: Date; lt: Date } {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { gte: start, lt: end };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const todayOnly = searchParams.get("today") === "true";

    const where: Record<string, unknown> = {};
    if (status && status !== "all") where.status = status;
    if (todayOnly) where.createdAt = todayRange();

    const orders = await prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (e) {
    console.error("[GET /api/orders]", e);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const count = await prisma.order.count();
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const orderNumber = `KL-${today}-${String(count + 1).padStart(3, "0")}`;

    const totalAmount = (body.items as { subtotal: number }[]).reduce((s, i) => s + i.subtotal, 0);

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: body.customerName ?? "Pelanggan",
        customerPhone: body.customerPhone ?? null,
        sourceChat: body.chatId ?? null,
        status: "draft",
        paymentStatus: "unpaid",
        totalAmount,
        deliveryDate: body.deliveryDate ?? null,
        deliveryTime: body.deliveryTime ?? null,
        pickupMethod: body.pickupMethod ?? null,
        confidenceScore: body.confidenceScore ?? 0,
        missingFields: JSON.stringify(body.missingFields ?? []),
        notes: body.notes ?? null,
        items: {
          create: (body.items as { menu: string; qty: number; unitPrice: number; subtotal: number }[]).map((item) => ({
            menuId: resolveMenuId(item.menu),
            menuName: item.menu,
            qty: item.qty,
            unitPrice: item.unitPrice,
            subtotal: item.subtotal,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (e) {
    console.error("[POST /api/orders]", e);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// Maps menu name to ID; defaults to menu-001 if unrecognized
function resolveMenuId(menuName: string): string {
  const map: Record<string, string> = {
    "Risol Mayo": "menu-001",
    "Ayam Geprek": "menu-002",
    "Nasi Kotak": "menu-003",
    "Snack Box": "menu-004",
    "Lumpia Basah": "menu-005",
    "Tahu Walik": "menu-006",
    "Kopi Susu Gula Aren": "menu-007",
    "Frozen Ayam Crispy": "menu-008",
    "Frozen Ayam Crispy (Pedas?)": "menu-008",
  };
  return map[menuName] ?? "menu-001";
}
