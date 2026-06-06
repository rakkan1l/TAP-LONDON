import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import fallbackData from "@/data/nightlife.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Nightlife in London | TAP LONDON",
  description: "Best bars, clubs and live music in London."
};

export default async function NightlifePage() {
  let items: any[] = [];

  try {
    const snap = await getDocs(
      query(collection(db, "nightlife"), orderBy("order", "asc"))
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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Nightlife</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">London Nightlife</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">
            Rooftop bars, underground clubs, live music venues and more.
          </p>
        </div>
        <DirectoryClient
          items={items}
          tabs={["Bars", "Clubs", "Live Music", "Rooftop Bars"]}
          mode="nightlife"
          searchPlaceholder="Search venues or areas"
        />
      </div>
    </section>
  );
}
