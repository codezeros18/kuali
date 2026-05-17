import { NextRequest, NextResponse } from "next/server";
import { parseOrder } from "@/lib/ai-parser";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chatId, message, customerName } = body;

    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const result = await parseOrder({ chatId: chatId ?? "unknown", message, customerName });
    return NextResponse.json(result);
  } catch (e) {
    console.error("[POST /api/ai/parse-order]", e);
    return NextResponse.json({ error: "Parse failed" }, { status: 500 });
  }
}
