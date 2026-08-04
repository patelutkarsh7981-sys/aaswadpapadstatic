import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { ScrollToTop } from "@/components/scroll-to-top";
import { manufacturer } from "@/data/products";
import { ScrollProgress } from "@/components/motion";

const siteUrl = "https://aaswadpapad.com";
const logoPath = "/brand/aaswad-logo.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aaswad Papad | Papad Manufacturer in Nadiad, Gujarat",
    template: "%s | Aaswad Papad"
  },
  description:
    "Aaswad Papad is a trusted papad manufacturer in Nadiad, Gujarat. Explore authentic papad, rice papad, khichiya, mathiya and chorafali.",
  applicationName: "Aaswad Papad",
  authors: [{ name: "Aaswad Papad" }],
  creator: "Aaswad Papad",
  publisher: "Aaswad Papad",
  category: "Food and beverage",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION
  },
  keywords: [
    "papad",
    "Aaswad papad",
    "papad manufacturer",
    "papad manufacturer in Nadiad",
    "papad manufacturer in Gujarat",
    "buy papad in Nadiad",
    "khichiya papad",
    "rice papad",
    "mathiya",
    "chorafali",
    "Gujarati snacks",
    "Aaswad Papad",
    "papad in Nadiad",
    "papad manufacturer in Gujarat"
  ],
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: logoPath,
    shortcut: logoPath,
    apple: logoPath
  },
  openGraph: {
    title: "Aaswad Papad",
    description: "Serving Tradition Since Generations.",
    url: siteUrl,
    siteName: "Aaswad Papad",
    locale: "en_IN",
    images: [logoPath],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaswad Papad",
    description: "Authentic Taste. Perfect Crisp.",
    images: [logoPath]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f0dc"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ScrollProgress />
        <Header />
        {children}
        <ScrollToTop />
        <FloatingWhatsApp />
        <Footer />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": `${siteUrl}/#business`,
                name: manufacturer.name,
                alternateName: "Aaswad Gruh Udhyog",
                image: `${siteUrl}${logoPath}`,
                logo: `${siteUrl}${logoPath}`,
                telephone: manufacturer.displayPhone,
                email: manufacturer.email,
                priceRange: "₹₹",
                areaServed: ["Nadiad", "Gujarat", "India"],
                knowsAbout: ["Papad", "Khichiya Papad", "Rice Papad", "Mathiya", "Chorafali"],
                sameAs: [
                  "https://www.instagram.com/aaswadgruhudhyog",
                  "https://www.facebook.com/share/1FAfyUZUs1/?mibextid=wwXIfr"
                ],
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Mota Pore Road, Junaraopura",
                  addressLocality: "Nadiad",
                  postalCode: "387001",
                  addressRegion: "Gujarat",
                  addressCountry: "IN"
                },
                url: siteUrl
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: "Aaswad Papad",
                url: siteUrl,
                publisher: { "@id": "https://aaswadpapad.com/#business" }
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
