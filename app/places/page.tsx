import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import places from "@/data/places.json";

export const metadata: Metadata = {
  title: "Best Places in London",
  description: "Discover 40+ top attractions, hidden gems, photo spots, and free things to do in London with TAP LONDON."
};

export default function PlacesPage() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Best Places to Visit</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy">Best Places in London</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">Filter by must-see icons, quieter discoveries, camera-ready views, and free London experiences.</p>
        </div>
        <DirectoryClient
          items={places.items}
          tabs={["Top Attractions", "Hidden Gems", "Photo Spots", "Free Things"]}
          mode="place"
          searchPlaceholder="Search places, areas, or categories"
        />
      </div>
    </section>
  );
}
