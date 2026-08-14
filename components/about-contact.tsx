import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/motion";
import { manufacturer } from "@/data/products";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function AboutContact() {
  const whatsapp = getWhatsAppUrl();
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(manufacturer.mapsQuery)}`;

  return (
    <>
      <section id="about" className="bg-cacao py-24 text-cream dark:bg-[#1b2119]">
        <div className="section-shell">
          <Reveal className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron">About Aaswad</p>
            <h2 className="display-title mt-3 max-w-3xl font-serif text-4xl font-black text-cream sm:text-5xl md:text-7xl">Serving Tradition Since Generations</h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-cream/75 dark:text-cream/82">
              Aaswad Papad brings authentic taste, perfect crispy, and premium quality to traditional Gujarati snacks.
              The brand stands for freshness, crispiness, authenticity, quality, tradition, and excellence.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Authentic Taste", "Perfect Crispy", "Premium Quality", "Traditional Manufacturing", "High Hygiene Standards", "Fresh Ingredients"].map((item, index) => (
                <Reveal key={item} delay={index * 0.05} className="rounded-[8px] border border-cream/20 p-5 text-center font-black text-saffron">
                {item}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="bg-cream py-20 dark:bg-[#151914]">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-leaf dark:text-[#b9d58f]">Contact</p>
            <h2 className="mt-3 font-serif text-4xl font-black text-cacao dark:text-cream">Aaswad Papad</h2>
            <address className="mt-5 not-italic leading-8 text-cacao/78 dark:text-cream/84">
              Mota Pore Road, Junaraopura
              <br />
              Nadiad - 387001
              <br />
              Dist. Kheda, Gujarat
            </address>
            <p className="mt-5 font-bold">Phone: {manufacturer.displayPhone}</p>
            <p className="font-bold">Email: {manufacturer.email}</p>
          </div>
          <div className="glass rounded-[8px] p-6 shadow-soft">
            <div className="grid gap-4">
              <Link href={maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full bg-leaf px-6 py-4 font-black text-white">
                <MapPin size={18} />
                Open Google Maps
              </Link>
              <Link href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 font-black text-white">
                <MessageCircle size={18} />
                Chat on WhatsApp
              </Link>
              <Link href={`tel:+91${manufacturer.phone}`} className="inline-flex items-center justify-center gap-3 rounded-full border border-leaf/25 bg-white/70 px-6 py-4 font-black text-leaf dark:border-white/25 dark:bg-[#253126] dark:text-[#d9efad]">
                <Phone size={18} />
                Call Now
              </Link>
              <Link href={`mailto:${manufacturer.email}`} className="inline-flex items-center justify-center gap-3 rounded-full border border-leaf/25 bg-white/70 px-6 py-4 font-black text-leaf dark:border-white/25 dark:bg-[#253126] dark:text-[#d9efad]">
                <Mail size={18} />
                Email Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
