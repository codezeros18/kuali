import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["draft", "confirmed", "needs_check", "completed", "cancelled"];

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Invalid status: ${status}` }, { status: 400 });
    }

    const data: Record<string, unknown> = { status };
    if (status === "confirmed") data.approvedAt = new Date();

    const order = await prisma.order.update({ where: { id: params.id }, data });
    return NextResponse.json(order);
  } catch (e) {
    console.error("[PATCH /api/orders/[id]/status]", e);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
