import type { Metadata } from "next";
import Image from "next/image";
import { Award, Factory, Leaf, ShieldCheck, Sparkles, Wheat } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Aaswad Papad, a premium traditional Gujarati snack brand from Nadiad.",
  alternates: {
    canonical: "/about"
  }
};

const values = [
  { label: "Authentic Taste", icon: Sparkles },
  { label: "Perfect Crisp", icon: Award },
  { label: "Premium Quality", icon: ShieldCheck },
  { label: "Traditional Manufacturing", icon: Factory },
  { label: "High Hygiene Standards", icon: Leaf },
  { label: "Fresh Ingredients", icon: Wheat }
];

export default function AboutPage() {
  return (
    <main className="bg-cream pt-28 dark:bg-[#151914]">
      <section className="section-shell pb-20">
        <Breadcrumbs items={[{ label: "About Us" }]} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-[8px] shadow-soft">
            <Image
              src="/brochure/tradition.jpg"
              alt="Aaswad tradition and quality"
              width={900}
              height={1100}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-leaf dark:text-[#b9d58f]">Aaswad Papad</p>
            <h1 className="mt-3 font-serif text-5xl font-black text-cacao dark:text-cream md:text-6xl">
              Serving Tradition Since Generations
            </h1>
            <p className="mt-5 text-lg leading-8 text-cacao/72 dark:text-cream/72">
              Aaswad brings authentic taste and perfect crisp to traditional Gujarati snacks with a focus on premium quality,
              traditional manufacturing, high hygiene standards, and fresh ingredients.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="glass flex items-center gap-3 rounded-[8px] p-5 shadow-sm">
                    <span className="grid size-10 place-items-center rounded-full bg-leaf text-white">
                      <Icon size={18} />
                    </span>
                    <span className="font-black text-cacao dark:text-cream">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
