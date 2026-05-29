import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import food from "@/data/food.json";

export const metadata: Metadata = {
  title: "Food & Drinks in London",
  description: "Find London restaurants, halal food, coffee shops, and local food spots with TAP LONDON."
};

export default function FoodPage() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Food & Drinks</p>
            <h1 className="mt-3 font-heading text-5xl font-bold text-navy">Where to Eat in London</h1>
            <p className="mt-5 text-lg leading-8 text-ink/70">Restaurants, verified halal-friendly picks, serious coffee, and local market stops for a better London day.</p>
          </div>
          <div className="rounded-lg border border-emerald-700/20 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
            <strong className="block text-base">Verified halal concept</strong>
            Listings marked verified halal are intended for partner confirmation. Always ask staff about current suppliers, alcohol handling, and kitchen preparation if this matters to you.
          </div>
        </div>
        <DirectoryClient
          items={food.items}
          tabs={["Restaurants", "Halal Food", "Coffee Shops", "Local Spots"]}
          mode="food"
          searchPlaceholder="Search food, cuisine, or area"
        />
      </div>
    </section>
  );
}
