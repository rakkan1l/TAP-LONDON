import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import food from "@/data/food.json";

export const metadata: Metadata = {
  title: "Food & Drinks in London | TAP LONDON",
  description: "Find London restaurants, halal food, coffee shops, and local food spots with TAP LONDON."
};

export default function FoodPage() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Food & Drinks</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">Where to Eat in London</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">
            Restaurants, halal food, speciality coffee, and the best local food spots for a perfect London day.
          </p>
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
