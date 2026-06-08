'use client';

import { useEffect, useState } from 'react';
import DirectoryClient from '@/components/DirectoryClient';
import fallbackData from '@/data/places.json';

const PROJECT_ID = 'tap-london';

async function fetchFromFirestore(collection: string) {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}?pageSize=200`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Firestore fetch failed');
    const json = await res.json();
    if (!json.documents || json.documents.length === 0) return null;

    const items = json.documents.map((doc: any) => {
      const fields = doc.fields || {};
      const item: any = {};
      // Convert Firestore field format to plain object
      Object.keys(fields).forEach(key => {
        const field = fields[key];
        if (field.stringValue !== undefined) item[key] = field.stringValue;
        else if (field.integerValue !== undefined) item[key] = parseInt(field.integerValue);
        else if (field.doubleValue !== undefined) item[key] = field.doubleValue;
        else if (field.booleanValue !== undefined) item[key] = field.booleanValue;
        else if (field.arrayValue !== undefined) {
          item[key] = (field.arrayValue.values || []).map((v: any) => v.stringValue || '');
        }
      });
      // Extract ID from document name
      const nameParts = doc.name.split('/');
      item.id = nameParts[nameParts.length - 1];
      return item;
    });

    // Sort by order field
    items.sort((a: any, b: any) => (a.order ?? 999) - (b.order ?? 999));
    return items;
  } catch (e) {
    return null;
  }
}

export default function PlacesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const firebaseItems = await fetchFromFirestore('places');
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
