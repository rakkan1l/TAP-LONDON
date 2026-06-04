'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import placesData from '@/data/places.json';
import foodData from '@/data/food.json';
import shoppingData from '@/data/shopping.json';

type Result = {
  id: string;
  name: string;
  category: string;
  type: 'place' | 'food' | 'shopping';
  href: string;
  image?: string;
};

function buildIndex(): Result[] {
  const results: Result[] = [];

  (placesData.items || []).forEach((p: any) => {
    results.push({ id: p.id, name: p.name, category: p.category || p.area || 'Place', type: 'place', href: `/places/${p.id}`, image: p.image });
  });

  (foodData.items || []).forEach((f: any) => {
    results.push({ id: f.id, name: f.name, category: f.category || f.cuisine || 'Food', type: 'food', href: `/food/${f.id}`, image: f.image });
  });

  (shoppingData.items || []).forEach((s: any) => {
    results.push({ id: s.id, name: s.name, category: s.category || 'Shopping', type: 'shopping', href: `/shopping/${s.id}`, image: s.image });
  });

  return results;
}

const TYPE_COLOR: Record<string, string> = {
  place: '#c9a84c',
  food: '#d4956a',
  shopping: '#9ab8d4',
};

const TYPE_LABEL: Record<string, string> = {
  place: 'Place',
  food: 'Food',
  shopping: 'Shopping',
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const allItems = useRef<Result[]>([]);

  useEffect(() => {
    allItems.current = buildIndex();
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    const matched = allItems.current
      .filter(item => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q))
      .slice(0, 8);
    setResults(matched);
    setOpen(matched.length > 0);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (href: string) => {
    setQuery('');
    setOpen(false);
    router.push(href);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) handleSelect(results[0].href);
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', maxWidth: '580px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex', alignItems: 'center',
          background: focused ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.09)',
          border: focused ? '1px solid rgba(201,168,76,0.55)' : '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50px', overflow: 'hidden',
          backdropFilter: 'blur(16px)',
          transition: 'all 0.25s ease',
          boxShadow: focused ? '0 0 0 3px rgba(201,168,76,0.12)' : 'none',
        }}>
          {/* Search icon */}
          <div style={{ padding: '0 0 0 20px', color: focused ? '#c9a84c' : 'rgba(255,255,255,0.35)', flexShrink: 0, transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Search places, food, shopping..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              padding: '15px 14px', fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.92rem', color: '#ffffff',
            }}
          />

          {/* Clear button */}
          {query && (
            <button type="button" onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus(); }}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: '0 8px', fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
              ✕
            </button>
          )}

          {/* Search button */}
          <button type="submit" style={{
            background: 'linear-gradient(135deg, #c9a84c, #f0d07a)', color: '#1a1a2e',
            border: 'none', borderRadius: '40px', padding: '10px 22px',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.8rem',
            cursor: 'pointer', margin: '5px 5px 5px 0', whiteSpace: 'nowrap' as const,
            flexShrink: 0,
          }}>
            Search
          </button>
        </div>
      </form>

      {/* Dropdown results */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 100,
              background: 'rgba(18,18,36,0.97)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(201,168,76,0.2)', borderRadius: '16px',
              overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {results.map((r, i) => (
              <motion.button
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => handleSelect(r.href)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', background: 'none', border: 'none',
                  borderBottom: i < results.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  cursor: 'pointer', textAlign: 'left' as const,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                {/* Thumbnail */}
                {r.image ? (
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={r.image} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(201,168,76,0.1)', flexShrink: 0 }} />
                )}

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.name}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', marginTop: '1px' }}>
                    {r.category}
                  </div>
                </div>

                {/* Type badge */}
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 700,
                  letterSpacing: '0.8px', textTransform: 'uppercase' as const,
                  color: TYPE_COLOR[r.type], background: `${TYPE_COLOR[r.type]}18`,
                  padding: '3px 8px', borderRadius: '20px', flexShrink: 0,
                  border: `1px solid ${TYPE_COLOR[r.type]}30`,
                }}>
                  {TYPE_LABEL[r.type]}
                </div>

                {/* Arrow */}
                <div style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </motion.button>
            ))}

            {/* No results */}
            {results.length === 0 && query.length >= 2 && (
              <div style={{ padding: '20px 16px', textAlign: 'center' as const, fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)' }}>
                No results for "{query}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
