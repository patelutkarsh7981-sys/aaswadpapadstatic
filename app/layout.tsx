import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { ScrollToTop } from "@/components/scroll-to-top";
import { manufacturer } from "@/data/products";
import { MotionProvider, ScrollProgress } from "@/components/motion";

const logoPath = "/brand/aaswad-logo.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaswadpapad.com"),
  title: {
    default: "Aaswad Papad | Authentic Taste, Perfect Crisp",
    template: "%s | Aaswad Papad"
  },
  description:
    "Premium papad, rice papad, khichiya papad, mathiya, and chorafali from Aaswad Papad, Nadiad.",
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
    url: "https://aaswadpapad.com",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <MotionProvider>
          <ScrollProgress />
          <Header />
          {children}
          <ScrollToTop />
          <FloatingWhatsApp />
          <Footer />
        </MotionProvider>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://aaswadpapad.com/#business",
                name: manufacturer.name,
                image: `https://aaswadpapad.com${logoPath}`,
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
                  streetAddress: "Opp., Mota Pore Panchali Wadi, Near C.J Patel & Co.",
                  addressLocality: "Nadiad",
                  postalCode: "387001",
                  addressRegion: "Gujarat",
                  addressCountry: "IN"
                },
                url: "https://aaswadpapad.com"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://aaswadpapad.com/#website",
                name: "Aaswad Papad",
                url: "https://aaswadpapad.com",
                publisher: { "@id": "https://aaswadpapad.com/#business" }
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
