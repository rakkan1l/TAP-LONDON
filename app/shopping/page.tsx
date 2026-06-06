import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import fallbackData from "@/data/shopping.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Shopping in London | TAP LONDON",
  description: "Best shopping areas, markets and souvenir shops in London."
};

export default async function ShoppingPage() {
  let items: any[] = [];

  try {
    const snap = await getDocs(
      query(collection(db, "shopping"), orderBy("order", "asc"))
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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Shopping</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">Shopping in London</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">
            Luxury streets, vibrant markets, and the best souvenir shops in London.
          </p>
        </div>
        <DirectoryClient
          items={items}
          tabs={["Shopping Areas", "🏷️ Offers", "Markets", "Souvenir Shops"]}
          mode="shopping"
          searchPlaceholder="Search shops or areas"
        />
      </div>
    </section>
  );
}
