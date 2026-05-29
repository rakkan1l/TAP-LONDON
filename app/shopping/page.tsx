import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import shopping from "@/data/shopping.json";

export const metadata: Metadata = {
  title: "Shopping & Markets in London",
  description: "Explore London shopping areas, markets, and souvenir shops with TAP LONDON."
};

export default function ShoppingPage() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Shopping & Markets</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy">Shop London Properly</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">From Oxford Street and Covent Garden to flower markets, antiques, and tasteful London gifts.</p>
        </div>
        <DirectoryClient
          items={shopping.items}
          tabs={["Shopping Areas", "Markets", "Souvenir Shops"]}
          mode="shopping"
          searchPlaceholder="Search shopping, markets, or gifts"
        />
      </div>
    </section>
  );
}
