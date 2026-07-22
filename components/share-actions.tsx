"use client";

import { MessageCircle, Phone, Share2 } from "lucide-react";
import Link from "next/link";
import { manufacturer, type Product } from "@/data/products";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function ShareActions({ product }: { product: Product }) {
  const message = `Hello Aaswad Papad, I am interested in ${product.name}.`;
  const whatsapp = getWhatsAppUrl(message);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, text: product.description, url });
      return;
    }
    await navigator.clipboard.writeText(url);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center justify-center gap-3 rounded-full border border-leaf/25 bg-white/80 px-5 py-4 font-black text-leaf transition hover:bg-leaf hover:text-white dark:border-white/25 dark:bg-[#253126] dark:text-[#d9efad]"
      >
        <Share2 size={18} />
        Share
      </button>
      <Link href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-5 py-4 font-black text-white">
        <MessageCircle size={18} />
        WhatsApp
      </Link>
      <Link href={`tel:+91${manufacturer.phone}`} className="inline-flex items-center justify-center gap-3 rounded-full bg-leaf px-5 py-4 font-black text-white">
        <Phone size={18} />
        Call Now
      </Link>
    </div>
  );
}
