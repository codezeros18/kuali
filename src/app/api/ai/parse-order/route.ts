import { NextRequest, NextResponse } from "next/server";
import { parseOrder } from "@/lib/ai-parser";

const MAX_MESSAGE_LENGTH = 1000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chatId, message, customerName } = body;

    // Input validation
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message is required and must be a string" }, { status: 400 });
    }
    if (message.trim().length === 0) {
      return NextResponse.json({ error: "message must not be empty" }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `message too long (max ${MAX_MESSAGE_LENGTH} characters)` },
        { status: 400 }
      );
    }

    const result = await parseOrder({
      chatId: typeof chatId === "string" ? chatId : "unknown",
      message: message.trim(),
      customerName: typeof customerName === "string" ? customerName.trim() || undefined : undefined,
    });

    return NextResponse.json({
      ...result,
      _meta: {
        parserMode: process.env.USE_MOCK_AI !== "false" ? "mock" : "live",
        disclaimer: "Draft order — menunggu konfirmasi owner. AI tidak mengkonfirmasi pembayaran.",
      },
    });
  } catch (e) {
    console.error("[POST /api/ai/parse-order]", e);
    return NextResponse.json({ error: "Parse failed" }, { status: 500 });
  }
}
