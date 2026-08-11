'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCollection } from '@/lib/firestore';

const PARK_KEYWORDS = ['park', 'garden', 'green', 'heath', 'common', 'meadow', 'woods'];

export default function ParksPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollection('places').then(data => {
      const all = data || [];
      const parks = all.filter((item: any) => {
        const haystack = `${item.name} ${item.category}`.toLowerCase();
        return PARK_KEYWORDS.some(kw => haystack.includes(kw));
      });
      setItems(parks);
      setLoading(false);
    });
  }, []);

  return (
    <main className="bg-[#f9f7f2] dark:bg-[#0d0d1a]" style={{ minHeight: '100vh' }}>
      <div style={{ background: '#1a1a2e', padding: '60px 20px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const, marginBottom: '10px' }}>Outdoors</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#ffffff', margin: '0 0 14px' }}>Parks & Outdoors</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.55)' }}>Royal parks, hidden gardens and green spaces to escape the city, all in one place.</p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px 80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(26,26,46,0.3)', fontFamily: "'DM Sans', sans-serif" }}>Loading...</div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(26,26,46,0.4)', fontFamily: "'DM Sans', sans-serif" }}>No parks found yet.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {items.map((park: any) => (
              <Link key={park.id} href={`/places/${park.id}`} style={{ textDecoration: 'none' }}>
                <div className="bg-white dark:bg-[#1a1a2e]" style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(201,168,76,0.1)', cursor: 'pointer' }}>
                  {park.image && (
                    <div style={{ height: '160px', overflow: 'hidden' }}>
                      <img src={park.image} alt={park.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '16px' }}>
                    <h3 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 700, margin: '0 0 6px' }}>{park.name}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#888', marginBottom: '8px' }}>📍 {park.area}</p>
                    {park.description && (
                      <p className="text-[#555] dark:text-[#bbb]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', lineHeight: 1.6 }}>{park.description}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
