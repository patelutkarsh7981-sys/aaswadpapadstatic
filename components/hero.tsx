import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Phone } from "lucide-react";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-v4 overflow-hidden bg-[#f7f4ee] pt-16">
      <div className="section-shell grid min-h-[calc(92vh-4rem)] items-center gap-8 py-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:py-20">
        <div className="relative z-10 py-8">
          <p className="mb-7 text-xs font-black uppercase tracking-[0.28em] text-leaf">Aaswad Papad</p>
          <h1 id="hero-title" className="display-title max-w-xl font-serif text-5xl font-black text-cacao sm:text-6xl md:text-8xl">
            Authentic Taste.
            <br />
            Perfect Crispy.
          </h1>
          <p className="mt-7 max-w-md text-lg font-medium leading-8 text-cacao/70 md:text-xl">Serving Tradition Since Generations.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#products"
              className="inline-flex items-center gap-3 rounded-full bg-leaf px-7 py-4 font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-cacao"
            >
              View Products
              <ArrowDown size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-cacao/25 px-7 py-4 font-black text-cacao transition hover:-translate-y-1 hover:bg-cacao hover:text-white"
            >
              Contact Us
              <Phone size={18} />
            </Link>
          </div>
        </div>
        <div className="order-first relative aspect-square overflow-hidden rounded-[1.5rem] bg-cacao shadow-soft md:rounded-[2rem] lg:order-none">
          <Image src="/brochure/hero-v4-square.png" alt="Aaswad Papad traditional crispy papad arranged with spices" fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-cacao/55 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 max-w-[15rem] text-sm font-bold uppercase tracking-[0.18em] text-white">Crispy, authentic, unforgettable.</p>
        </div>
      </div>
    </section>
  );
}
