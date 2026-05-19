import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const menus = await prisma.menu.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
    return NextResponse.json(menus);
  } catch (e) {
    console.error("[GET /api/menus]", e);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name: string = (body.name ?? "").toString().trim();
    const unit: string = (body.unit ?? "").toString().trim();
    const pricePerUnit = Number(body.pricePerUnit);

    if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 });
    if (!unit) return NextResponse.json({ error: "unit is required" }, { status: 400 });
    if (!Number.isFinite(pricePerUnit) || pricePerUnit < 0) {
      return NextResponse.json({ error: "pricePerUnit must be a non-negative number" }, { status: 400 });
    }

    // Generate ID from name slug
    const id = `menu-${Date.now()}`;

    const menu = await prisma.menu.create({
      data: { id, name, unit, pricePerUnit, isActive: true },
    });

    return NextResponse.json(menu, { status: 201 });
  } catch (e) {
    console.error("[POST /api/menus]", e);
    return NextResponse.json({ error: "Failed to create menu" }, { status: 500 });
  }
}
