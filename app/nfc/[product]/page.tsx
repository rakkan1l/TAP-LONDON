import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgePercent, Bus, Landmark, ShoppingBag, Sparkles, Utensils } from "lucide-react";
import products from "@/data/nfc-products.json";
import ShareButton from "@/components/ShareButton";

type Product = {
  name: string;
  welcome: string;
  emoji: string;
  color: string;
};

const productEntries = Object.entries(products).filter(([key, value]) => key !== "__comment" && typeof value === "object") as [string, Product][];
const productMap = Object.fromEntries(productEntries) as Record<string, Product>;

const sections = [
  { href: "/places", label: "Best Places", Icon: Landmark },
  { href: "/food", label: "Food & Drinks", Icon: Utensils },
  { href: "/shopping", label: "Shopping", Icon: ShoppingBag },
  { href: "/transport", label: "Transport", Icon: Bus },
  { href: "/services", label: "Trusted Services", Icon: Sparkles },
  { href: "/offers", label: "Offers", Icon: BadgePercent }
];

export function generateStaticParams() {
  return productEntries.map(([product]) => ({ product }));
}

export function generateMetadata({ params }: { params: { product: string } }): Metadata {
  const product = productMap[params.product];
  if (!product) {
    return {
      title: "NFC Product"
    };
  }

  return {
    title: `${product.name} NFC Landing Page`,
    description: product.welcome
  };
}

export default function NFCProductPage({ params }: { params: { product: string } }) {
  const product = productMap[params.product];
  if (!product) notFound();

  return (
    <section className="bg-navy text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 london-skyline opacity-80" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,26,46,0.1),rgba(26,26,46,0.94))]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 text-sm font-bold text-gold backdrop-blur">
              <span className="flex h-8 min-w-8 items-center justify-center rounded-full border border-white/20 text-xs text-white" style={{ backgroundColor: product.color }}>
                {product.emoji}
              </span>
              NFC confirmed
            </div>
            <h1 className="font-heading text-5xl font-bold leading-tight sm:text-7xl">{product.name}</h1>
            <p className="mt-6 text-xl leading-8 text-white/80">{product.welcome}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/places" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-navy transition hover:bg-gold">
                Explore London now <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <ShareButton title="TAP LONDON" text="Explore London with TAP LONDON." />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cream px-4 py-14 text-ink sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-gold/40 bg-white p-5 shadow-premium">
            <p className="inline-flex min-h-12 items-center gap-3 rounded-full bg-gold/20 px-5 text-sm font-black text-navy">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold">{product.emoji}</span>
              You tapped your {product.name.replace("TAP LONDON ", "")}!
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map(({ href, label, Icon }) => (
              <Link key={href} href={href} className="group flex min-h-32 items-center justify-between rounded-lg border border-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-gold hover:shadow-lift">
                <span className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <span className="font-heading text-2xl font-bold text-navy">{label}</span>
                </span>
                <ArrowRight aria-hidden="true" size={18} className="text-gold transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
