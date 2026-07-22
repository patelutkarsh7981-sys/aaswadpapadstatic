import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { RecentlyViewed } from "@/components/recently-viewed";
import { ShareActions } from "@/components/share-actions";
import { getProductBySlug, getRelatedProducts, getSegmentForProduct, manufacturer, products, segmentToSlug } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Aaswad Papad`,
      description: product.description,
      images: [product.image]
    },
    keywords: [product.name, product.category, "Aaswad Papad", "Gujarati snacks"],
    alternates: {
      canonical: `/products/${slug}`
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const segment = getSegmentForProduct(product);

  return (
    <main className="bg-cream pt-28 dark:bg-[#151914]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: [`https://aaswadpapad.com${product.image}`],
            category: product.category,
            brand: {
              "@type": "Brand",
              name: "Aaswad Papad"
            },
            url: `https://aaswadpapad.com/products/${product.slug}`
          })
        }}
      />
      <section className="section-shell pb-20">
        <Breadcrumbs
          items={[
            segment ? { label: segment.name, href: `/categories/${segmentToSlug(segment.name)}` } : { label: product.category },
            { label: product.name }
          ]}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="glass overflow-hidden rounded-[8px] p-3 shadow-soft">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-white p-4">
              <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-contain" />
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-leaf dark:text-[#b9d58f]">{product.category}</p>
            <h1 className="mt-3 font-serif text-4xl font-black text-cacao dark:text-cream md:text-6xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-cacao/72 dark:text-[#f8f0dc]">{product.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {product.weight.map((weight) => (
                <span key={weight} className="rounded-full bg-white px-4 py-2 text-sm font-black text-leaf shadow-sm dark:bg-[#253126] dark:text-[#d9efad]">
                  {weight}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <ShareActions product={product} />
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <InfoBlock title="Ingredients" items={product.ingredients?.length ? product.ingredients : ["Information coming soon"]} />
          <InfoBlock title="Nutrition Facts" items={product.nutrition ? Object.entries(product.nutrition).map(([key, value]) => `${key}: ${value}`) : ["Information coming soon"]} />
          <InfoBlock title="Storage Instructions" items={["Store in a cool, dry place", "Keep away from moisture", "Seal pack after opening"]} />
          <InfoBlock title="Manufactured by" items={[manufacturer.name, manufacturer.address, `Phone: ${manufacturer.displayPhone}`, `Email: ${manufacturer.email}`]} />
        </div>
      </section>
      <RecentlyViewed currentSlug={product.slug} />
      {related.length ? (
        <section className="bg-white py-16 dark:bg-[#1b2119]">
          <div className="section-shell">
            <h2 className="font-serif text-3xl font-black text-cacao dark:text-cream">Related Products</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass rounded-[8px] p-5 shadow-soft">
      <h2 className="font-black text-cacao dark:text-cream">{title}</h2>
      <ul className="mt-4 grid gap-2 text-sm leading-6 text-cacao/70 dark:text-[#f8f0dc]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
