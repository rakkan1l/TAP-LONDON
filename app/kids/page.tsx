import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import fallbackData from "@/data/kids.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kids \& Family in London | TAP LONDON",
  description: "Best family attractions, parks and activities for kids in London."
};

export default async function KidsPage() {
  let items: any[] = [];

  try {
    const snap = await getDocs(
      query(collection(db, "kids"), orderBy("order", "asc"))
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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Kids \& Family</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">Kids \& Family</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">
            Attractions, parks, museums and activities the whole family will love.
          </p>
        </div>
        <DirectoryClient
          items={items}
          tabs={["Parks", "Museums", "Activities", "Entertainment"]}
          mode="kids"
          searchPlaceholder="Search kids activities"
        />
      </div>
    </section>
  );
}
