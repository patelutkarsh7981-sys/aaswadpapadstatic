import Image from "next/image";

export function RetailPartners() {
  return (
    <section aria-labelledby="retail-title" className="relative isolate overflow-hidden bg-saffron py-16 text-cacao md:py-20">
      <div className="absolute inset-0 -z-10 opacity-15" aria-hidden="true">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_transparent_0_34%,_rgba(56,47,34,0.65)_35%_37%,_transparent_38%)] [background-size:76px_54px] [transform:rotate(-28deg)_scale(1.5)]" />
      </div>
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="retail-title" className="display-title font-serif text-5xl font-black sm:text-6xl md:text-8xl">Available at</h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 md:mt-12">
          <div aria-label="D-Mart retail partner" className="flex min-h-40 items-center justify-center rounded-[1.5rem] bg-white px-6 shadow-soft sm:min-h-48">
            <span className="relative block h-28 w-full max-w-[24rem] overflow-hidden sm:h-36">
              <Image src="/brand/dmart-logo.png" alt="D-Mart" fill sizes="(max-width: 640px) 85vw, 380px" className="object-cover object-center" />
            </span>
          </div>
          <div aria-label="Reliance Retail retail partner" className="flex min-h-40 items-center justify-center rounded-[1.5rem] bg-white px-6 shadow-soft sm:min-h-48">
            <Image src="/brand/reliance-retail-logo.png" alt="Reliance Retail" width={272} height={147} className="h-auto w-full max-w-[22rem] object-contain p-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
