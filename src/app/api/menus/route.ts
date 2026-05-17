import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const menus = await prisma.menu.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
    return NextResponse.json(menus);
  } catch (e) {
    console.error("[/api/menus]", e);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
