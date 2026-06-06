'use client';

import { useEffect, useState } from 'react';
import DirectoryClient from '@/components/DirectoryClient';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import fallbackData from '@/data/emergency.json';

export default function EmergencyPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, 'emergency'), orderBy('order', 'asc'))
        );
        if (!snap.empty) {
          setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setItems((fallbackData as any).items ?? []);
        }
      } catch {
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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Emergency</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">Emergency Help</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">Hospitals, police, safety tips and emergency numbers for London visitors.</p>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans', sans-serif" }}>
            Loading...
          </div>
        ) : (
          <DirectoryClient
            items={items}
            tabs={["Hospitals", "Police", "Scam Alerts", "Helplines"]}
            mode="place"
            searchPlaceholder="Search emergency services"
          />
        )}
      </div>
    </section>
  );
}
