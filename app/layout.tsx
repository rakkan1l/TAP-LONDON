import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NFCBanner from "@/components/NFCBanner";
import NovaAssistant from "@/components/NovaAssistant";
import PopupLoader from "@/components/PopupLoader";

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
  return (
    <html lang="en-GB" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        <NFCBanner />
        <main>{children}</main>
        <NovaAssistant />
        <PopupLoader />
        <Footer />
      </body>
    </html>
  );
}
