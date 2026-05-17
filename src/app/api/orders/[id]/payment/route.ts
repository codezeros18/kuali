import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { paymentStatus } = await req.json();
    if (!["unpaid", "paid"].includes(paymentStatus)) {
      return NextResponse.json({ error: "paymentStatus must be 'unpaid' or 'paid'" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { paymentStatus, qrisDummyShown: true },
    });
    return NextResponse.json(order);
  } catch (e) {
    console.error("[PATCH /api/orders/[id]/payment]", e);
    return NextResponse.json({ error: "Failed to update payment" }, { status: 500 });
  }
}
