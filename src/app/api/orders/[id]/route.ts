import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { items: true, payments: true },
    });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json(order);
  } catch (e) {
    console.error("[GET /api/orders/[id]]", e);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
