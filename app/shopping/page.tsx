import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import shopping from "@/data/shopping.json";

export const metadata: Metadata = {
  title: "Shopping in London | TAP LONDON",
  description: "Best shopping areas, markets, and souvenir shops in London with TAP LONDON."
};

export default function ShoppingPage() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Shopping</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">Shopping in London</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">
            Luxury streets, vibrant markets, iconic department stores, and the best souvenir shops London has to offer.
          </p>
        </div>
        <DirectoryClient
          items={shopping.items}
          tabs={["Shopping Areas", "🏷️ Offers", "Markets", "Souvenir Shops"]}
          mode="shopping"
          searchPlaceholder="Search shops, markets, or areas"
        />
      </div>
    </section>
  );
}
