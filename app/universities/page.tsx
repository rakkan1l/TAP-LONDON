'use client';

import { useEffect, useState } from 'react';
import { fetchCollection } from '@/lib/firestore';

export default function UniversitiesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [loadFailed, setLoadFailed] = useState(false);

  const load = () => {
    setLoading(true);
    setLoadFailed(false);
    fetchCollection('universities').then(data => {
      if (data && data.length > 0) {
        setItems(data);
      } else {
        setLoadFailed(true);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="bg-[#f9f7f2] dark:bg-[#0d0d1a]" style={{ minHeight: '100vh' }}>
      <div style={{ background: '#1a1a2e', padding: '60px 20px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const, marginBottom: '10px' }}>Education</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#ffffff', margin: '0 0 14px' }}>Best Universities in London</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.55)' }}>World-ranking institutions across the capital, from science and engineering to social sciences and the arts.</p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px 80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(26,26,46,0.3)', fontFamily: "'DM Sans', sans-serif" }}>Loading...</div>
         loadFailed ? (
          <div style={{ textAlign: 'center', padding: '60px', fontFamily: "'DM Sans', sans-serif" }}>
            <div style={{ color: 'rgba(26,26,46,0.5)', marginBottom: '16px' }}>Couldn't load this right now. Please try again.</div>
            <button onClick={load} style={{ background: '#1a1a2e', color: '#c9a84c', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>Retry</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {items.map((u) => (
              <div key={u.id} className="bg-white dark:bg-[#1a1a2e]" style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(201,168,76,0.1)' }}>
                <div style={{ height: '150px', overflow: 'hidden' }}>
                  <img src={u.image} alt={u.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 700, margin: '0 0 6px' }}>{u.name}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#888', marginBottom: '8px' }}>📍 {u.area} · Founded {u.founded}</p>
                  <p className="text-[#555] dark:text-[#bbb]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '10px' }}>{u.description}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
                    <span style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', borderRadius: '20px', padding: '3px 10px', fontSize: '0.66rem', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{u.ranking}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
