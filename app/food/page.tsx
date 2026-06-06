import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import fallbackData from "@/data/food.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Food \& Drinks in London | TAP LONDON",
  description: "Find London restaurants, halal food, coffee shops, and local food spots."
};

export default async function FoodPage() {
  let items: any[] = [];

  try {
    const snap = await getDocs(
      query(collection(db, "food"), orderBy("order", "asc"))
    );
    if (!snap.empty) {
      items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      // Fallback to JSON if Firebase is empty
      items = (fallbackData as any).items ?? [];
    }
  } catch {
    // Fallback to JSON on any error
    items = (fallbackData as any).items ?? [];
  }

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Food \& Drinks</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">Where to Eat in London</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">
            Restaurants, halal food, speciality coffee, and the best local food spots.
          </p>
        </div>
        <DirectoryClient
          items={items}
          tabs={["Restaurants", "🏷️ Offers", "Halal Food", "Coffee Shops", "Local Spots"]}
          mode="food"
          searchPlaceholder="Search food, cuisine, or area"
        />
      </div>
    </section>
  );
}
