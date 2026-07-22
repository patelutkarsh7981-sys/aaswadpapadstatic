import { AboutContact } from "@/components/about-contact";
import { Hero } from "@/components/hero";
import { ProductExplorer } from "@/components/product-explorer";
import { QrExperience } from "@/components/qr-experience";

export default async function Home({ searchParams }: { searchParams: Promise<{ source?: string }> }) {
  const params = await searchParams;
  const qrMode = params.source === "qr";

  return (
    <main>
      <QrExperience enabled={qrMode} />
      <Hero />
      <ProductExplorer qrMode={qrMode} />
      <AboutContact />
    </main>
  );
}
