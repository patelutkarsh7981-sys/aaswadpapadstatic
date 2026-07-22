"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <Link
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us"
      className="group fixed bottom-5 right-5 z-[70] grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:-translate-y-1 hover:scale-105"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/35" />
      <MessageCircle className="relative" size={25} />
      <span className="pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-full bg-cacao px-3 py-2 text-xs font-black text-white opacity-0 shadow-sm transition group-hover:opacity-100">
        Chat with us
      </span>
    </Link>
  );
}
