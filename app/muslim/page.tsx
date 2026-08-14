'use client';

import { useEffect, useState } from 'react';
import DirectoryClient from '@/components/DirectoryClient';
import { fetchCollection } from '@/lib/firestore';

export default function MuslimPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [loadFailed, setLoadFailed] = useState(false);

  const load = async () => {
    setLoading(true);
    setLoadFailed(false);
    const firebaseItems = await fetchCollection('muslim');
    if (firebaseItems && firebaseItems.length > 0) {
      setItems(firebaseItems);
    } else {
      setLoadFailed(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Muslim Guide</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">Muslim Guide</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">Halal food, mosques, prayer rooms and Islamic sites across London.</p>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(26,26,46,0.3)', fontFamily: "'DM Sans', sans-serif" }}>Loading...</div>
        ) : (
          <DirectoryClient items={items} tabs={["Mosques", "Halal Food", "Prayer Rooms", "Islamic Sites"]} mode="muslim" searchPlaceholder="Search halal food or mosques" />
        )}
      </div>
    </section>
  );
}
