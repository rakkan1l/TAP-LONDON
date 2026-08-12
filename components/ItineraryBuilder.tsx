'use client';

import { useState } from 'react';
import Link from 'next/link';
import { fetchCollection } from '@/lib/firestore';

const INTEREST_OPTIONS = [
  { key: 'football', label: '⚽ Football', collections: ['sports'] },
  { key: 'history', label: '🏛️ History', collections: ['places'] },
  { key: 'food', label: '🍽️ Food', collections: ['food'] },
  { key: 'nightlife', label: '🌙 Nightlife', collections: ['nightlife'] },
  { key: 'shopping', label: '🛍️ Shopping', collections: ['shopping'] },
  { key: 'hidden-gems', label: '💎 Hidden Gems', collections: ['hiddenGems'] },
  { key: 'theatre', label: '🎭 Theatre', collections: ['theatre'] },
  { key: 'music', label: '🎵 Music', collections: ['music'] },
  { key: 'family', label: '👨‍👩‍👧 Family', collections: ['kids'] },
];

const TRAVEL_WITH = ['Solo', 'Partner', 'Friends', 'Family'];
const HOTEL_AREAS = ['Central London', 'West London', 'North London', 'East London', 'South London', "Doesn't matter"];

type DayPlan = {
  day: number;
  items: { time: string; name: string; area?: string; href: string; category: string }[];
};

function pickN(arr: any[], n: number, exclude: Set<string>) {
  const filtered = arr.filter(x => !exclude.has(x.id));
  const chosen = filtered.slice(0, n);
  chosen.forEach(c => exclude.add(c.id));
  return chosen;
}

export default function ItineraryBuilder() {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(500);
  const [interests, setInterests] = useState<string[]>([]);
  const [travelWith, setTravelWith] = useState('Friends');
  const [hotelArea, setHotelArea] = useState('Central London');
  const [itinerary, setItinerary] = useState<DayPlan[]>([]);
  const [hotelPicks, setHotelPicks] = useState<any[]>([]);

  const toggleInterest = (key: string) => {
    setInterests(prev => prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key]);
  };

  const generate = async () => {
    setStep('loading');

    // Figure out which collections we need based on chosen interests
    const neededCollections = new Set<string>(['places', 'food']); // always include core categories for a balanced day
    interests.forEach(key => {
      const opt = INTEREST_OPTIONS.find(o => o.key === key);
      opt?.collections.forEach(c => neededCollections.add(c));
    });

    const budgetLevel = budget < 300 ? 'low' : budget < 800 ? 'mid' : 'high';
    if (hotelArea) neededCollections.add('hotels');

    const dataCache: Record<string, any[]> = {};
    await Promise.all(
      Array.from(neededCollections).map(async (c) => {
        const items = await fetchCollection(c);
        dataCache[c] = items || [];
      })
    );

    // Budget-aware hotel picks
    const hotels = (dataCache.hotels || []).filter((h: any) => {
      const areaMatch = hotelArea === "Doesn't matter" || (h.area || '').toLowerCase().includes(hotelArea.replace(' London', '').toLowerCase());
      if (budgetLevel === 'low') return areaMatch && (h.category === '3-star' || h.category === '4-star');
      if (budgetLevel === 'mid') return areaMatch && h.category !== '5-star';
      return areaMatch;
    });
    setHotelPicks(hotels.slice(0, 3));

    // Build interest-weighted pools - things matching chosen interests go first
    const interestCollections = interests
      .map(key => INTEREST_OPTIONS.find(o => o.key === key))
      .filter(Boolean)
      .flatMap(o => o!.collections);

    const usedIds = new Set<string>();
    const plan: DayPlan[] = [];

    for (let d = 1; d <= days; d++) {
      const dayItems: DayPlan['items'] = [];

      // Morning: prioritize an interest-matched place, else a top attraction
      const morningPool = interestCollections.includes('sports') && dataCache.sports?.length
        ? dataCache.sports
        : interestCollections.includes('hiddenGems') && dataCache.hiddenGems?.length
        ? dataCache.hiddenGems
        : (dataCache.places || []).filter((p: any) => p.category?.includes('Top') || p.category?.includes('Attraction'));
      const morning = pickN(morningPool, 1, usedIds);
      morning.forEach(p => dayItems.push({ time: '10:00 AM', name: p.name, area: p.area, href: p.type === 'sports' ? '/sports' : (p.category ? '/places/' + p.id : '/hidden-gems'), category: '🌅 Morning' }));

      // Lunch: food pick, budget-aware
      const foodPool = (dataCache.food || []).filter((f: any) => {
        const pr = (f.priceRange || '').toString();
        const level = (pr.match(/£/g) || []).length;
        if (budgetLevel === 'low') return level <= 1;
        if (budgetLevel === 'mid') return level <= 2;
        return true;
      });
      const lunch = pickN(foodPool, 1, usedIds);
      lunch.forEach(f => dayItems.push({ time: '1:00 PM', name: f.name, area: f.area, href: `/food/${f.id}`, category: '🍽️ Lunch' }));

      // Afternoon: interest-based (theatre, shopping, music) or another top place
      let afternoonPool = dataCache.places || [];
      if (interests.includes('shopping') && dataCache.shopping?.length) afternoonPool = dataCache.shopping;
      else if (interests.includes('theatre') && dataCache.theatre?.length && d === days) afternoonPool = dataCache.theatre;
      else if (interests.includes('music') && dataCache.music?.length) afternoonPool = dataCache.music;
      const afternoon = pickN(afternoonPool, 1, usedIds);
      afternoon.forEach(p => dayItems.push({
        time: '3:00 PM', name: p.name, area: p.area,
        href: dataCache.shopping?.includes(p) ? `/shopping/${p.id}` : dataCache.theatre?.includes(p) ? `/theatre/${p.id}` : dataCache.music?.includes(p) ? `/music/${p.id}` : `/places/${p.id}`,
        category: '☀️ Afternoon',
      }));

      // Evening: nightlife if interested, else dinner
      const eveningPool = interests.includes('nightlife') && dataCache.nightlife?.length ? dataCache.nightlife : dataCache.food || [];
      const evening = pickN(eveningPool, 1, usedIds);
      evening.forEach(p => dayItems.push({
        time: '7:30 PM', name: p.name, area: p.area,
        href: dataCache.nightlife?.includes(p) ? `/nightlife/${p.id}` : `/food/${p.id}`,
        category: '🌆 Evening',
      }));

      plan.push({ day: d, items: dayItems });
    }

    setItinerary(plan);
    setStep('result');
  };

  const reset = () => {
    setStep('form');
    setItinerary([]);
    setHotelPicks([]);
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%' }}>
      {step === 'form' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const, marginBottom: '8px' }}>AI Itinerary Builder</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, color: '#ffffff', margin: 0 }}>Build My London Trip</h2>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '10px' }}>Days: {days}</label>
              <input type="range" min={1} max={7} value={days} onChange={e => setDays(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '10px' }}>Budget: £{budget}</label>
              <input type="range" min={100} max={2000} step={50} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '10px' }}>Interests</label>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                {INTEREST_OPTIONS.map(opt => (
                  <button key={opt.key} onClick={() => toggleInterest(opt.key)} style={{
                    padding: '8px 16px', borderRadius: '40px', border: 'none', cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600,
                    background: interests.includes(opt.key) ? '#c9a84c' : 'rgba(255,255,255,0.1)',
                    color: interests.includes(opt.key) ? '#1a1a2e' : '#fff',
                  }}>{opt.label}</button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '10px' }}>Travelling With</label>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                {TRAVEL_WITH.map(t => (
                  <button key={t} onClick={() => setTravelWith(t)} style={{
                    padding: '8px 16px', borderRadius: '40px', border: 'none', cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600,
                    background: travelWith === t ? '#c9a84c' : 'rgba(255,255,255,0.1)',
                    color: travelWith === t ? '#1a1a2e' : '#fff',
                  }}>{t}</button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '10px' }}>Hotel Area</label>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                {HOTEL_AREAS.map(a => (
                  <button key={a} onClick={() => setHotelArea(a)} style={{
                    padding: '8px 16px', borderRadius: '40px', border: 'none', cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600,
                    background: hotelArea === a ? '#c9a84c' : 'rgba(255,255,255,0.1)',
                    color: hotelArea === a ? '#1a1a2e' : '#fff',
                  }}>{a}</button>
                ))}
              </div>
            </div>

            <button onClick={generate} style={{
              marginTop: '8px', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#c9a84c,#f0d07a)', color: '#1a1a2e',
              fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 700,
            }}>Generate my trip →</button>
          </div>
        </div>
      )}

      {step === 'loading' && (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Sans', sans-serif" }}>
          Building your {days}-day London trip...
        </div>
      )}

      {step === 'result' && (
        <div>
          <button onClick={reset} style={{
            background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.6)',
            borderRadius: '50px', padding: '8px 18px', fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', marginBottom: '20px',
          }}>← Start over</button>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
            Your {days}-Day London Trip
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '28px' }}>
            £{budget} budget · {travelWith} · {interests.map(i => INTEREST_OPTIONS.find(o => o.key === i)?.label).join(', ') || 'General sightseeing'}
          </p>

          {hotelPicks.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', fontWeight: 700, color: '#c9a84c', textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: '12px' }}>🏨 Suggested Hotels — {hotelArea}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '10px' }}>
                {hotelPicks.map(h => (
                  <Link key={h.id} href={`/hotels/${h.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px 14px' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{h.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{h.priceRange}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {itinerary.map(day => (
            <div key={day.day} style={{ marginBottom: '28px' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 700, color: '#c9a84c', marginBottom: '12px' }}>Day {day.day}</h3>
              <div style={{ display: 'grid', gap: '8px' }}>
                {day.items.map((item, i) => (
                  <Link key={i} href={item.href} style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '12px 16px' }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#c9a84c', fontWeight: 700, minWidth: '70px' }}>{item.time}</div>
                      <div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{item.name}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>{item.category}{item.area ? ` · ${item.area}` : ''}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
