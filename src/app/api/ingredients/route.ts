import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(ingredients);
  } catch (e) {
    console.error("[/api/ingredients]", e);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
