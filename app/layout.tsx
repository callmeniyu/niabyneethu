import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import "./asset-overrides.css";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600"], display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700"], display: "swap" });

const siteUrl = "https://niabyneethu.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nia by Neethu — Made for the way you feel",
    template: "%s | Nia by Neethu",
  },
  description: "Discover Nia by Neethu: easy, expressive Indian wear inspired by the colours, craft and everyday rhythm of Kerala. Sarees, kurtas, tops and more.",
  applicationName: "Nia by Neethu",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Nia by Neethu",
    title: "Nia by Neethu — Made for the way you feel",
    description: "Clothes with a little Kerala in every thread. Meet the world of Nia by Neethu.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Nia by Neethu — Kerala-inspired everyday wear" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nia by Neethu — Made for the way you feel",
    description: "Clothes with a little Kerala in every thread.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "fashion",
};

export const viewport: Viewport = {
  themeColor: "#f4f0e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Nia by Neethu",
    url: siteUrl,
    description: "Kerala-inspired women's clothing and Indian wear from Nia by Neethu.",
    sameAs: ["https://www.instagram.com/nia_by_neethu/"],
    address: { "@type": "PostalAddress", addressRegion: "Kerala", addressCountry: "IN" },
  };

  return (
    <html lang="en-IN">
      <body className={`${display.variable} ${sans.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
