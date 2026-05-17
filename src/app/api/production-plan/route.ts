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
    // Confirmed orders for today only
    const orders = await prisma.order.findMany({
      where: { status: "confirmed", createdAt: todayRange() },
      include: {
        items: {
          include: {
            menu: {
              include: { recipeItems: { include: { ingredient: true } } },
            },
          },
        },
      },
    });

    // Aggregate ingredient needs across all confirmed order items
    const needs = new Map<string, { ingredientId: string; name: string; unit: string; needed: number; stock: number }>();

    for (const order of orders) {
      for (const item of order.items) {
        for (const recipe of item.menu.recipeItems) {
          const ing = recipe.ingredient;
          const existing = needs.get(ing.id);
          const qtyNeeded = recipe.qtyPerUnit * item.qty;
          if (existing) {
            existing.needed += qtyNeeded;
          } else {
            needs.set(ing.id, {
              ingredientId: ing.id,
              name: ing.name,
              unit: ing.unit,
              needed: qtyNeeded,
              stock: ing.stockQty,
            });
          }
        }
      }
    }

    const ingredientNeeds = Array.from(needs.values()).map((n) => {
      let status: "sufficient" | "low" | "insufficient";
      if (n.stock >= n.needed) status = "sufficient";
      else if (n.stock >= n.needed * 0.5) status = "low";
      else status = "insufficient";
      return { ...n, needed: Math.round(n.needed * 100) / 100, status };
    });

    const confirmedOrderCount = orders.length;
    const totalItemCount = orders.reduce((s, o) => s + o.items.reduce((ss, i) => ss + i.qty, 0), 0);

    return NextResponse.json({ confirmedOrderCount, totalItemCount, ingredientNeeds });
  } catch (e) {
    console.error("[/api/production-plan]", e);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
