"use client";

import { useState } from "react";
import { MessageCircle, Zap } from "lucide-react";
import { demoChats } from "@/lib/dummy-data";
import type { ParsedOrder } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

interface MockWhatsappChatProps {
  onParsed?: (order: ParsedOrder) => void;
  onChatChange?: () => void;
}

export function MockWhatsappChat({ onParsed, onChatChange }: MockWhatsappChatProps) {
  const [selectedChatId, setSelectedChatId] = useState<string>("chat-001");
  const [isParsing, setIsParsing] = useState(false);
  const [parsedOrder, setParsedOrder] = useState<ParsedOrder | null>(null);

  const selectedChat = demoChats.find((c) => c.id === selectedChatId)!;

  async function handleParse() {
    if (isParsing) return;
    setParsedOrder(null);
    setIsParsing(true);
    try {
      const res = await fetch("/api/ai/parse-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: selectedChat.id,
          message: selectedChat.message,
          customerName: selectedChat.customerName,
        }),
      });
      const result: ParsedOrder = await res.json();
      setParsedOrder(result);
      onParsed?.(result);
    } catch {
      // silent — leave parsedOrder null so button stays visible
    } finally {
      setIsParsing(false);
    }
  }

  function handleSelectChat(id: string) {
    setSelectedChatId(id);
    setParsedOrder(null);
    setIsParsing(false);
    onChatChange?.();
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Chat selector chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {demoChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => handleSelectChat(chat.id)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-badge text-xs font-medium transition-colors",
              selectedChatId === chat.id
                ? "bg-kuali-primary text-white"
                : "bg-kuali-surface-alt text-kuali-text-mid"
            )}
          >
            {chat.customerName}
          </button>
        ))}
      </div>

      {/* WhatsApp-style chat bubble */}
      <div className="rounded-card bg-[#ECE5DD] overflow-hidden">
        {/* Header bar */}
        <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center shrink-0">
            <MessageCircle size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white text-sm font-semibold">{selectedChat.customerName}</div>
            <div className="text-[#B2DFDB] text-[10px]">Simulasi pesan masuk</div>
          </div>
        </div>

        {/* Messages */}
        <div className="px-3 py-3 flex flex-col gap-2 min-h-[140px]">
          {/* Customer message */}
          <div className="max-w-[80%] rounded-xl px-3 py-2 bg-white self-start rounded-tl-sm">
            <p className="text-[13px] text-[#111] leading-snug whitespace-pre-line">{selectedChat.message}</p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[10px] text-[#8696A0]">{selectedChat.time}</span>
            </div>
          </div>

          {isParsing && (
            <div className="bg-white self-start rounded-xl rounded-tl-sm px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#111]">Menganalisis pesan</span>
                <span className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-kuali-primary animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-kuali-primary animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-kuali-primary animate-bounce [animation-delay:300ms]" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-kuali-text-light text-center">
        Simulasi chat — bukan WhatsApp asli. Kontak & pesan adalah data fiktif untuk demo.
      </p>

      {/* Parse button */}
      {!parsedOrder && (
        <button
          onClick={handleParse}
          disabled={isParsing}
          className={cn(
            "btn-primary flex items-center justify-center gap-2",
            isParsing && "opacity-70 cursor-not-allowed"
          )}
        >
          <Zap size={16} />
          {isParsing ? "Sedang menganalisis..." : "Parse dengan AI"}
        </button>
      )}
    </div>
  );
}
