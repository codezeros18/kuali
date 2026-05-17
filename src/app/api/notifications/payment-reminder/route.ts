import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();
    if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const itemSummary = order.items.map((i) => `${i.qty}x ${i.menuName}`).join(", ");
    const message = `Halo ${order.customerName}! Mengingatkan pembayaran order (${itemSummary}) sebesar Rp ${order.totalAmount.toLocaleString("id-ID")}. Silakan transfer ke rekening Kuali. Terima kasih! 🙏`;

    // Simulate WhatsApp notification — no real API called
    await prisma.notificationLog.create({
      data: {
        orderId: order.id,
        type: "payment_reminder",
        recipient: order.customerPhone ?? order.customerName,
        message,
        status: "simulated",
      },
    });

    await prisma.order.update({ where: { id: orderId }, data: { qrisDummyShown: true } });

    return NextResponse.json({ success: true, message, note: "Simulasi reminder — tidak ada pesan WhatsApp nyata yang dikirim." });
  } catch (e) {
    console.error("[POST /api/notifications/payment-reminder]", e);
    return NextResponse.json({ error: "Failed to send reminder" }, { status: 500 });
  }
}
