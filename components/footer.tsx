import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MapPin, MessageCircle } from "lucide-react";
import { manufacturer } from "@/data/products";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-cacao px-4 py-12 text-cream dark:bg-black">
      <div className="section-shell grid gap-8 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative size-12 overflow-hidden rounded-full border-2 border-cream/90 bg-cream">
              <Image
                src="/brand/aaswad-logo.png"
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <p className="text-xl font-black">Aaswad Papad</p>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-cream/72">
            Authentic Taste, Perfect Crisp. Serving Tradition Since Generations from Nadiad, Gujarat.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { href: getWhatsAppUrl(), label: "WhatsApp", icon: MessageCircle },
              { href: "https://www.instagram.com/aaswadgruhudhyog?igsh=bHd5bmxjMGNpNGhu", label: "Instagram", icon: Instagram },
              { href: "https://www.facebook.com/share/1FAfyUZUs1/?mibextid=wwXIfr", label: "Facebook", icon: Facebook },
              { href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(manufacturer.mapsQuery)}`, label: "Google Maps", icon: MapPin }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-cream transition hover:-translate-y-1 hover:bg-saffron hover:text-cacao"
                >
                  <Icon size={18} />
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <p className="font-bold">Quick Links</p>
          <div className="mt-3 grid gap-2 text-sm text-cream/72">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="font-bold">Contact</p>
          <p className="mt-3 text-sm leading-6 text-cream/72">{manufacturer.address}</p>
          <p className="mt-2 text-sm text-cream/72">{manufacturer.displayPhone}</p>
          <p className="text-sm text-cream/72">{manufacturer.email}</p>
        </div>
      </div>
    </footer>
  );
}
