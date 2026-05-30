import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NFCBanner from "@/components/NFCBanner";
import NovaAssistant from "@/components/NovaAssistant";
import { MessageCircle } from "lucide-react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://taplondon.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TAP LONDON | Your Smart London Guide",
    template: "%s | TAP LONDON"
  },
  description: "TAP LONDON is a smart NFC-powered tourism guide for London: tap your souvenir, explore places, food, shopping, transport, services, and offers.",
  keywords: ["London tourism", "NFC London guide", "London places", "London food", "London transport", "TAP LONDON"],
  openGraph: {
    title: "TAP LONDON",
    description: "Your Smart London Guide - Tap. Explore. Enjoy.",
    url: siteUrl,
    siteName: "TAP LONDON",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "TAP LONDON smart tourism guide" }],
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "TAP LONDON",
    description: "Your Smart London Guide - Tap. Explore. Enjoy.",
    images: ["/og.svg"]
  }
};

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "447000000000";

  return (
    <html lang="en-GB" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        <NFCBanner />
        <main>{children}</main>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20TAP%20LONDON%2C%20I%20need%20help%20planning%20my%20visit.`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lift transition hover:-translate-y-1 hover:bg-emerald-700"
          aria-label="Contact TAP LONDON support on WhatsApp"
        >
          <MessageCircle aria-hidden="true" size={25} />
        </a>

        {/* NOVA AI Assistant */}
        <NovaAssistant />

        <Footer />
      </body>
    </html>
  );
}
