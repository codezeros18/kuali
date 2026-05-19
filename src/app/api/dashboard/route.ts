import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function todayRange(): { gte: Date; lt: Date } {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { gte: start, lt: end };
}

export async function GET() {
  try {
    const range = todayRange();

    const [orders, summary] = await Promise.all([
      prisma.order.findMany({
        where: { createdAt: range },
        include: { items: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.dailySummary.findFirst({ where: { date: new Date().toISOString().slice(0, 10) } }),
    ]);

    const totalOrdersToday = orders.length;
    const confirmed = orders.filter((o) => o.status === "confirmed").length;
    const draftPending = orders.filter((o) => o.status === "draft" || o.status === "needs_check").length;
    const needsReview = orders.filter((o) => o.status === "needs_check").length;

    const unpaidConfirmed = orders.filter((o) => o.status === "confirmed" && o.paymentStatus === "unpaid");
    const unpaidOrders = unpaidConfirmed.length;
    const unpaidAmount = unpaidConfirmed.reduce((sum, o) => sum + o.totalAmount, 0);

    const recentOrders = orders.slice(0, 5).map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      status: o.status,
      paymentStatus: o.paymentStatus,
      totalAmount: o.totalAmount,
      confidenceScore: o.confidenceScore,
      createdAt: o.createdAt,
      items: o.items.map((i) => ({ menuName: i.menuName, qty: i.qty })),
    }));

    return NextResponse.json({
      metrics: { totalOrdersToday, confirmed, draftPending, needsReview, unpaidOrders, unpaidAmount },
      recentOrders,
      parsedChats: summary?.parsedChats ?? 13,
      totalChats: summary?.totalChats ?? 15,
    });
  } catch (e) {
    console.error("[/api/dashboard]", e);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
