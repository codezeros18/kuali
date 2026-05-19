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
    const todayStr = new Date().toISOString().slice(0, 10);

    // Try stored summary first
    const stored = await prisma.dailySummary.findFirst({ where: { date: todayStr } });

    if (stored) {
      const parseRate = stored.totalChats > 0
        ? Math.round((stored.parsedChats / stored.totalChats) * 100)
        : 0;

      const narrative = buildNarrative({
        totalOrders: stored.totalOrders,
        confirmedOrders: stored.confirmedOrders,
        unpaidAmount: stored.unpaidAmount,
        parsedChats: stored.parsedChats,
        totalChats: stored.totalChats,
      });

      return NextResponse.json({ ...stored, parseRate, narrative });
    }

    // Fallback: aggregate live from orders
    const orders = await prisma.order.findMany({
      where: { createdAt: todayRange() },
      include: { items: true },
    });

    const totalOrders = orders.length;
    const confirmedOrders = orders.filter((o) => o.status === "confirmed").length;
    const draftOrders = orders.filter(
      (o) => o.status === "draft" || o.status === "needs_check"
    ).length;
    const totalRevenue = orders
      .filter((o) => o.status === "confirmed" && o.paymentStatus === "paid")
      .reduce((s, o) => s + o.totalAmount, 0);
    const unpaidAmount = orders
      .filter((o) => o.status === "confirmed" && o.paymentStatus === "unpaid")
      .reduce((s, o) => s + o.totalAmount, 0);

    const payload = {
      date: todayStr,
      totalOrders,
      confirmedOrders,
      draftOrders,
      totalRevenue,
      unpaidAmount,
      parsedChats: 0,
      totalChats: 0,
      parseRate: 0,
      narrative: buildNarrative({ totalOrders, confirmedOrders, unpaidAmount, parsedChats: 0, totalChats: 0 }),
    };

    return NextResponse.json(payload);
  } catch (e) {
    console.error("[GET /api/daily-summary]", e);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

function buildNarrative({
  totalOrders,
  confirmedOrders,
  unpaidAmount,
  parsedChats,
  totalChats,
}: {
  totalOrders: number;
  confirmedOrders: number;
  unpaidAmount: number;
  parsedChats: number;
  totalChats: number;
}): string {
  const parts: string[] = [];
  parts.push(`Hari ini ${totalOrders} pesanan masuk.`);
  if (confirmedOrders > 0) parts.push(`${confirmedOrders} sudah dikonfirmasi.`);
  if (unpaidAmount > 0) {
    parts.push(`Total belum dibayar: Rp ${unpaidAmount.toLocaleString("id-ID")}.`);
  }
  if (totalChats > 0) {
    parts.push(`${parsedChats} dari ${totalChats} chat berhasil diparse AI.`);
  }
  if (parts.length === 1) parts.push("Belum ada pesanan dikonfirmasi hari ini.");
  return parts.join(" ");
}
