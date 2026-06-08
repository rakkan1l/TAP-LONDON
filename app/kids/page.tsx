'use client';

import { useEffect, useState } from 'react';
import DirectoryClient from '@/components/DirectoryClient';
import { fetchCollection } from '@/lib/firestore';
import fallbackData from '@/data/kids.json';

export default function KidsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const firebaseItems = await fetchCollection('kids');
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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Kids \& Family</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">Kids \& Family</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">Attractions, parks, museums and activities the whole family will love.</p>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(26,26,46,0.3)', fontFamily: "'DM Sans', sans-serif" }}>Loading...</div>
        ) : (
          <DirectoryClient items={items} tabs={["Parks", "Museums", "Activities", "Entertainment"]} mode="kids" searchPlaceholder="Search kids activities" />
        )}
      </div>
    </section>
  );
}
