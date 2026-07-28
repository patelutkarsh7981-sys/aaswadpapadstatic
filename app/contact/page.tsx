import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { manufacturer } from "@/data/products";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Aaswad Papad in Nadiad by phone, email, WhatsApp, or Google Maps.",
  alternates: {
    canonical: "/contact"
  }
};

const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(manufacturer.mapsQuery)}`;
const whatsapp = getWhatsAppUrl();

export default function ContactPage() {
  return (
    <main className="bg-cream pt-28 dark:bg-[#151914]">
      <section className="section-shell pb-20">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-leaf dark:text-[#b9d58f]">Contact</p>
            <h1 className="mt-3 font-serif text-5xl font-black text-cacao dark:text-cream md:text-6xl">Aaswad Papad</h1>
            <address className="mt-6 not-italic text-lg leading-8 text-cacao/78 dark:text-cream/84">
              Mota Pore Road, Junaraopura,
              <br />
              Nadiad - 387001,
              <br />
              Gujarat.
            </address>
            <div className="mt-6 grid gap-3 text-base font-bold text-cacao dark:text-cream">
              <p>Phone: {manufacturer.displayPhone}</p>
              <p>Email: {manufacturer.email}</p>
              <p>Search Location: {manufacturer.mapsQuery}</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Action href={`tel:+91${manufacturer.phone}`} icon={Phone} label="Call Now" />
              <Action href={`mailto:${manufacturer.email}`} icon={Mail} label="Email Us" />
              <Action href={maps} icon={MapPin} label="Open Google Maps" external />
              <Action href={whatsapp} icon={MessageCircle} label="Chat on WhatsApp" external accent />
            </div>
          </div>
          <div className="glass rounded-[8px] p-6 shadow-soft">
            <h2 className="font-serif text-3xl font-black text-cacao dark:text-cream">Visit Us</h2>
            <p className="mt-4 leading-7 text-cacao/78 dark:text-cream/82">
              Search for Aaswad Papad Nadiad on Google Maps, or connect directly by phone, email, or WhatsApp.
            </p>
            <div className="mt-6 grid gap-3">
              <Action href={maps} icon={MapPin} label="Open Google Maps" external />
              <Action href={whatsapp} icon={MessageCircle} label="Chat on WhatsApp" external accent />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Action({ href, icon: Icon, label, external, accent }: { href: string; icon: typeof Phone; label: string; external?: boolean; accent?: boolean }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-3 rounded-full px-5 py-4 font-black shadow-sm transition hover:-translate-y-1 ${
        accent ? "bg-[#25D366] text-white" : "bg-white/82 text-leaf dark:bg-[#253126] dark:text-[#d9efad]"
      }`}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}
