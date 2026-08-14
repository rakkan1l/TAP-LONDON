'use client';

import { useEffect, useState } from 'react';
import DirectoryClient from '@/components/DirectoryClient';
import { fetchCollection } from '@/lib/firestore';

export default function ShoppingPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [loadFailed, setLoadFailed] = useState(false);

  const load = async () => {
    setLoading(true);
    setLoadFailed(false);
    const firebaseItems = await fetchCollection('shopping');
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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Shopping</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">Shopping in London</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">Luxury streets, vibrant markets, and the best souvenir shops in London.</p>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(26,26,46,0.3)', fontFamily: "'DM Sans', sans-serif" }}>Loading...</div>
        ) : (
          <DirectoryClient items={items} tabs={["Shopping Areas", "Markets", "Souvenir Shops"]} mode="shopping" searchPlaceholder="Search shops or areas" />
        )}
      </div>
    </section>
  );
}
