'use client';

import { useEffect, useState } from 'react';
import DirectoryClient from '@/components/DirectoryClient';
import { fetchCollection } from '@/lib/firestore';
import fallbackData from '@/data/places.json';

export default function PlacesPageClient() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const firebaseItems = await fetchCollection('places');
      if (firebaseItems && firebaseItems.length > 0) {
        setItems(firebaseItems);
      } else {
        setItems((fallbackData as any).items ?? []);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Places</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">Best Places in London</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">Top attractions, hidden gems, iconic photo spots, and the best free things to do in London.</p>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(26,26,46,0.3)', fontFamily: "'DM Sans', sans-serif" }}>Loading...</div>
        ) : (
          <DirectoryClient items={items} tabs={["Top Attractions", "Hidden Gems", "Photo Spots", "Free Things"]} mode="place" searchPlaceholder="Search places, areas, or attractions" />
        )}
      </div>
    </section>
  );
}
