import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NFCBanner from "@/components/NFCBanner";
import NovaAssistant from "@/components/NovaAssistant";
import PopupLoader from "@/components/PopupLoader";
import VisitTracker from "@/components/VisitTracker";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
    images: [{ url: "/logo.jpg", width: 1200, height: 1200, alt: "TAP LONDON smart tourism guide" }],
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "TAP LONDON",
    description: "Your Smart London Guide - Tap. Explore. Enjoy.",
    images: ["/logo.jpg"]
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg"
  }
};

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-GB" className={poppins.variable}>
      <body className="font-body antialiased">
        <VisitTracker />
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
