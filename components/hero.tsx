import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Phone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-16">
      <Image
        src="/brochure/hero.jpg"
        alt="Aaswad Papad traditional crispy papad"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-cacao/94 via-cacao/62 to-cacao/10 dark:from-black/88 dark:via-black/52 dark:to-transparent" />
      <div className="section-shell relative z-10 flex min-h-[calc(92vh-4rem)] items-center pb-14 pt-20">
        <div className="max-w-2xl text-white drop-shadow-[0_3px_10px_rgba(40,24,12,0.65)]">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/24 bg-white/14 px-4 py-2 text-sm font-bold backdrop-blur">
            Aaswad Papad
          </div>
          <h1 className="font-serif text-5xl font-black leading-tight md:text-7xl">
            Authentic Taste.
            <br />
            Perfect Crisp.
          </h1>
          <p className="mt-5 text-xl font-medium text-white/86 md:text-2xl">Serving Tradition Since Generations.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#products"
              className="inline-flex items-center gap-3 rounded-full bg-saffron px-7 py-4 font-black text-cacao shadow-soft transition hover:-translate-y-1 hover:bg-white"
            >
              View Products
              <ArrowDown size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-white/35 bg-white/14 px-7 py-4 font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-cacao"
            >
              Contact Us
              <Phone size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
