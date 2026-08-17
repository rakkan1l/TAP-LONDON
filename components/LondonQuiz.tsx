'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCollection } from '@/lib/firestore';

type ResultItem = {
  id: string;
  name: string;
  area?: string;
  description?: string;
  image?: string;
  icon?: string;
  category?: string;
  href: string;
};

type QuizOption = {
  key: string;
  label: string;
  icon: string;
  subtitle: string;
  // Each plan: which Firestore collections to pull from + a filter + how many to take + link prefix
  build: (data: Record<string, any[]>) => ResultItem[];
};

// Collections we may need across all the plans — fetched once, reused everywhere
const NEEDED_COLLECTIONS = ['places', 'food', 'hiddenGems', 'hotels', 'kids', 'offers'];

function isFree(item: any) {
  const p = (item.priceType || item.entryFee || '').toString().toLowerCase();
  return p === 'free' || p === '£0' || p === '0';
}

function priceLevel(item: any) {
  // priceRange like "£", "££", "£££" or hotel "£400-£1200/night"
  const pr = (item.priceRange || '').toString();
  const poundCount = (pr.match(/£/g) || []).length;
  return poundCount;
}

function pick(arr: any[], n: number) {
  return (arr || []).slice(0, n);
}

const QUESTIONS: QuizOption[] = [
  {
    key: 'one-day',
    label: 'I have 1 day in London',
    icon: '⏱️',
    subtitle: 'A tight, realistic one-day plan',
    build: (data) => {
      const morning = pick((data.places || []).filter(p => p.category?.includes('Top') || p.category?.includes('Attraction')), 2);
      const lunch = pick(data.food || [], 1);
      const afternoon = pick((data.places || []).slice(2), 2);
      const evening = pick((data.hiddenGems || []), 1);
      const results: ResultItem[] = [];
      morning.forEach(p => results.push({ ...p, href: `/places/${p.id}`, category: '🌅 Morning' }));
      lunch.forEach(p => results.push({ ...p, href: `/food/${p.id}`, category: '🍽️ Lunch' }));
      afternoon.forEach(p => results.push({ ...p, href: `/places/${p.id}`, category: '☀️ Afternoon' }));
      evening.forEach(p => results.push({ ...p, href: `/hidden-gems`, category: '🌆 Evening' }));
      return results;
    },
  },
  {
    key: 'first-time',
    label: 'First time in London',
    icon: '👋',
    subtitle: 'The essentials you shouldn\'t miss',
    build: (data) => {
      const mustSee = pick((data.places || []).filter(p => p.category?.includes('Top') || p.category?.includes('Attraction')), 4);
      return mustSee.map(p => ({ ...p, href: `/places/${p.id}`, category: '🏛️ Must-See' }));
    },
  },
  {
    key: 'kids',
    label: 'London with kids',
    icon: '👨‍👩‍👧',
    subtitle: 'Family-friendly picks',
    build: (data) => {
      const kidsSpots = pick(data.kids || [], 3);
      const familyHotels = pick((data.hotels || []).filter(h => h.familyFriendly), 1);
      const results: ResultItem[] = [];
      kidsSpots.forEach(p => results.push({ ...p, href: `/kids/${p.id}`, category: '👨‍👩‍👧 Kids Pick' }));
      familyHotels.forEach(p => results.push({ ...p, href: `/hotels/${p.id}`, category: '🏨 Family Hotel' }));
      return results;
    },
  },
  {
    key: 'cheap',
    label: 'Budget London',
    icon: '💷',
    subtitle: 'Free and budget picks only',
    build: (data) => {
      const freePlaces = pick((data.places || []).filter(isFree), 3);
      const cheapFood = pick((data.food || []).filter(f => priceLevel(f) <= 1), 2);
      const results: ResultItem[] = [];
      freePlaces.forEach(p => results.push({ ...p, href: `/places/${p.id}`, category: '🆓 Free Entry' }));
      cheapFood.forEach(p => results.push({ ...p, href: `/food/${p.id}`, category: '💷 Budget Eats' }));
      return results;
    },
  },
  {
    key: 'luxury',
    label: 'Luxury London',
    icon: '💎',
    subtitle: 'Top-tier hotels and fine dining',
    build: (data) => {
      const luxHotels = pick((data.hotels || []).filter(h => h.category === '5-star'), 2);
      const fineDining = pick((data.food || []).filter(f => priceLevel(f) >= 3), 2);
      const results: ResultItem[] = [];
      luxHotels.forEach(p => results.push({ ...p, href: `/hotels/${p.id}`, category: '🏨 5-Star Stay' }));
      fineDining.forEach(p => results.push({ ...p, href: `/food/${p.id}`, category: '🍽️ Fine Dining' }));
      return results;
    },
  },
  {
    key: 'hidden',
    label: 'Hidden gems only',
    icon: '💎',
    subtitle: 'Off the beaten path',
    build: (data) => {
      const gems = pick(data.hiddenGems || [], 4);
      return gems.map(p => ({ ...p, href: `/hidden-gems`, category: '💎 Hidden Gem' }));
    },
  },
];

export default function LondonQuiz() {
  const [selected, setSelected] = useState<QuizOption | null>(null);
  const [dataCache, setDataCache] = useState<Record<string, any[]>>({});
  const [loadingData, setLoadingData] = useState(false);
  const [results, setResults] = useState<ResultItem[]>([]);

  const handleSelect = async (q: QuizOption) => {
    setSelected(q);
    setLoadingData(true);

    // Fetch any collections we don't already have cached
    const toFetch = NEEDED_COLLECTIONS.filter(c => !(c in dataCache));
    const fetched: Record<string, any[]> = { ...dataCache };

    if (toFetch.length > 0) {
      await Promise.all(
        toFetch.map(async (c) => {
          const items = await fetchCollection(c);
          fetched[c] = items || [];
        })
      );
      setDataCache(fetched);
    }

    const built = q.build(fetched);
    setResults(built.filter(r => r.name)); // drop any empty slots if a category was short on data
    setLoadingData(false);
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%' }}>
      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: '#c9a84c',
                fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const, marginBottom: '8px'
              }}>Personalise Your Trip</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                fontWeight: 700, color: '#ffffff', margin: 0
              }}>What are you looking for today?</h2>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px'
            }}>
              {QUESTIONS.map((q, i) => (
                <motion.button
                  key={q.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleSelect(q)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '14px', padding: '14px 16px', cursor: 'pointer',
                    textAlign: 'left' as const, transition: 'all 0.2s',
                  }}
                  whileHover={{ background: 'rgba(201,168,76,0.15)', borderColor: 'rgba(201,168,76,0.4)' }}
                >
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{q.icon}</span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#fff'
                  }}>{q.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <button
                onClick={() => { setSelected(null); setResults([]); }}
                style={{
                  background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.6)',
                  borderRadius: '50px', padding: '6px 16px', fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', marginBottom: '14px'
                }}
              >
                ← Try another
              </button>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                fontWeight: 700, color: '#ffffff', margin: 0
              }}>
                {selected.icon} {selected.subtitle}
              </h2>
            </div>

            {loadingData ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif" }}>
                Building your picks...
              </div>
            ) : results.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif" }}>
                Couldn't load picks right now — try again in a moment.
              </div>
            ) : (
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px'
              }}>
                {results.map((r, i) => (
                  <motion.div
                    key={r.id + i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link href={r.href} style={{ textDecoration: 'none' }}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        style={{
                          background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
                          border: '1px solid rgba(201,168,76,0.35)', borderRadius: '16px',
                          overflow: 'hidden', cursor: 'pointer',
                        }}
                      >
                        {r.image && (
                          <div style={{ height: '110px', overflow: 'hidden' }}>
                            <img src={r.image} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                        <div style={{ padding: '14px 16px', textAlign: 'left' as const }}>
                          <div style={{
                            color: '#c9a84c', fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.64rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: '6px'
                          }}>{r.category}</div>
                          <div style={{
                            fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem',
                            fontWeight: 700, color: '#fff', marginBottom: '4px'
                          }}>{r.name}</div>
                          {r.area && (
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem' }}>📍 {r.area}</div>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
