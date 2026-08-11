'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCollection } from '@/lib/firestore';

type AreaGroup = { region: string; areas: string[] };

// Grouped the same way Visit London structures it: Central / North / South / East / West
const AREA_GROUPS: AreaGroup[] = [
  { region: 'Central London', areas: ['Soho', 'Covent Garden', 'Mayfair', 'Westminster', 'Marylebone', 'Fitzrovia', 'Holborn', 'Bloomsbury', 'City of London', 'Clerkenwell'] },
  { region: 'West London', areas: ['Notting Hill', 'Kensington', 'Chelsea', 'Paddington', 'Bayswater', 'Knightsbridge', 'Hammersmith', 'Shepherd\'s Bush', 'Fulham'] },
  { region: 'North London', areas: ['Camden', 'Islington', 'Hampstead', 'King\'s Cross', 'Highbury', 'Stoke Newington', 'Dalston'] },
  { region: 'East London', areas: ['Shoreditch', 'Hackney', 'Whitechapel', 'Bethnal Green', 'Stratford', 'Bow', 'Mile End'] },
  { region: 'South London', areas: ['South Bank', 'London Bridge', 'Borough', 'Greenwich', 'Brixton', 'Peckham', 'Clapham', 'Wimbledon', 'Richmond'] },
];

const CATEGORY_COLLECTIONS = [
  { collection: 'places', hrefBase: '/places', label: 'Places', icon: '🏛️' },
  { collection: 'food', hrefBase: '/food', label: 'Food', icon: '🍽️' },
  { collection: 'nightlife', hrefBase: '/nightlife', label: 'Nightlife', icon: '🌙' },
  { collection: 'hotels', hrefBase: '/hotels', label: 'Hotels', icon: '🏨' },
  { collection: 'shopping', hrefBase: '/shopping', label: 'Shopping', icon: '🛍️' },
  { collection: 'hiddenGems', hrefBase: '/hidden-gems', label: 'Hidden Gems', icon: '💎' },
];

export default function AreasPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);
  const [dataCache, setDataCache] = useState<Record<string, any[]>>({});

  const handleSelectArea = async (area: string) => {
    setSelectedArea(area);
    setLoading(true);

    const toFetch = CATEGORY_COLLECTIONS.filter(c => !(c.collection in dataCache));
    const fetched: Record<string, any[]> = { ...dataCache };
    if (toFetch.length > 0) {
      await Promise.all(
        toFetch.map(async (c) => {
          const items = await fetchCollection(c.collection);
          fetched[c.collection] = items || [];
        })
      );
      setDataCache(fetched);
    }

    const grouped: Record<string, any[]> = {};
    CATEGORY_COLLECTIONS.forEach(c => {
      const items = (fetched[c.collection] || []).filter((item: any) => {
        const itemArea = (item.area || item.location || '').toLowerCase();
        return itemArea.includes(area.toLowerCase());
      });
      if (items.length > 0) grouped[c.collection] = items.slice(0, 6);
    });

    setResults(grouped);
    setLoading(false);
  };

  return (
    <main className="bg-[#f9f7f2] dark:bg-[#0d0d1a]" style={{ minHeight: '100vh' }}>
      <div style={{ background: '#1a1a2e', padding: '60px 20px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const, marginBottom: '10px' }}>Explore</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#ffffff', margin: '0 0 14px' }}>London by Area</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.55)' }}>Explore Central, North, South, East and West London — find places, food, hotels and more in each neighbourhood.</p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px 80px' }}>
        {!selectedArea ? (
          AREA_GROUPS.map(group => (
            <div key={group.region} style={{ marginBottom: '36px' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '14px' }} className="dark:text-white">
                {group.region}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '10px' }}>
                {group.areas.map(area => (
                  <button
                    key={area}
                    onClick={() => handleSelectArea(area)}
                    style={{
                      padding: '10px 18px', borderRadius: '40px', border: '1px solid rgba(201,168,76,0.3)',
                      background: 'rgba(201,168,76,0.08)', color: '#1a1a2e', cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600,
                    }}
                    className="dark:text-white dark:border-gold/30"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>
            <button
              onClick={() => { setSelectedArea(null); setResults({}); }}
              style={{
                background: 'rgba(26,26,46,0.08)', border: 'none', color: '#1a1a2e',
                borderRadius: '50px', padding: '8px 18px', fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', marginBottom: '20px'
              }}
              className="dark:bg-white/10 dark:text-white"
            >
              ← All areas
            </button>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, color: '#1a1a2e', marginBottom: '24px' }} className="dark:text-white">
              {selectedArea}
            </h2>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(26,26,46,0.3)', fontFamily: "'DM Sans', sans-serif" }}>Loading...</div>
            ) : Object.keys(results).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(26,26,46,0.4)', fontFamily: "'DM Sans', sans-serif" }}>
                No listings found for {selectedArea} yet — check back soon as we add more content.
              </div>
            ) : (
              CATEGORY_COLLECTIONS.filter(c => results[c.collection]).map(cat => (
                <div key={cat.collection} style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 700, color: '#c9a84c', textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: '12px' }}>
                    {cat.icon} {cat.label}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
                    {results[cat.collection].map((item: any) => (
                      <Link key={item.id} href={`${cat.hrefBase}/${item.id}`} style={{ textDecoration: 'none' }}>
                        <div className="bg-white dark:bg-[#1a1a2e]" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
                          {item.image && (
                            <div style={{ height: '120px', overflow: 'hidden' }}>
                              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          )}
                          <div style={{ padding: '12px' }}>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 700, color: '#1a1a2e' }} className="dark:text-white">{item.name}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
