'use client';

import { useState } from 'react';
import Link from 'next/link';
import { fetchCollection } from '@/lib/firestore';

const INTEREST_OPTIONS = [
  { key: 'football', label: 'Football', icon: '⚽', collections: ['sports'] },
  { key: 'history', label: 'History', icon: '🏛️', collections: ['places'] },
  { key: 'food', label: 'Food', icon: '🍽️', collections: ['food'] },
  { key: 'nightlife', label: 'Nightlife', icon: '🌙', collections: ['nightlife'] },
  { key: 'shopping', label: 'Shopping', icon: '🛍️', collections: ['shopping'] },
  { key: 'hidden-gems', label: 'Hidden Gems', icon: '💎', collections: ['hiddenGems'] },
  { key: 'theatre', label: 'Theatre', icon: '🎭', collections: ['theatre'] },
  { key: 'music', label: 'Music', icon: '🎵', collections: ['music'] },
  { key: 'family', label: 'Family', icon: '👨‍👩‍👧', collections: ['kids'] },
];

const TRAVEL_WITH = ['Solo', 'Partner', 'Friends', 'Family'];
const HOTEL_AREAS = ['Central London', 'West London', 'North London', 'East London', 'South London', "Doesn't matter"];

type DayPlan = {
  day: number;
  items: { time: string; name: string; area?: string; href: string; slot: string }[];
};

function pickN(arr: any[], n: number, exclude: Set<string>) {
  const filtered = arr.filter(x => !exclude.has(x.id));
  const chosen = filtered.slice(0, n);
  chosen.forEach(c => exclude.add(c.id));
  return chosen;
}

const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');";

export default function TripBuilderPage() {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(500);
  const [interests, setInterests] = useState<string[]>([]);
  const [travelWith, setTravelWith] = useState('Friends');
  const [hotelArea, setHotelArea] = useState('Central London');
  const [itinerary, setItinerary] = useState<DayPlan[]>([]);
  const [hotelPicks, setHotelPicks] = useState<any[]>([]);
  const [tripCode] = useState(() => 'LDN-' + Math.random().toString(36).slice(2, 7).toUpperCase());

  const toggleInterest = (key: string) => {
    setInterests(prev => prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key]);
  };

  const generate = async () => {
    setStep('loading');

    const neededCollections = new Set<string>(['places', 'food']);
    interests.forEach(key => {
      const opt = INTEREST_OPTIONS.find(o => o.key === key);
      opt?.collections.forEach(c => neededCollections.add(c));
    });
    const budgetLevel = budget < 300 ? 'low' : budget < 800 ? 'mid' : 'high';
    neededCollections.add('hotels');

    const dataCache: Record<string, any[]> = {};
    await Promise.all(
      Array.from(neededCollections).map(async (c) => {
        const items = await fetchCollection(c);
        dataCache[c] = items || [];
      })
    );

    const hotels = (dataCache.hotels || []).filter((h: any) => {
      const areaMatch = hotelArea === "Doesn't matter" || (h.area || '').toLowerCase().includes(hotelArea.replace(' London', '').toLowerCase());
      if (budgetLevel === 'low') return areaMatch && (h.category === '3-star' || h.category === '4-star');
      if (budgetLevel === 'mid') return areaMatch && h.category !== '5-star';
      return areaMatch;
    });
    setHotelPicks(hotels.slice(0, 3));

    const interestCollections = interests
      .map(key => INTEREST_OPTIONS.find(o => o.key === key))
      .filter(Boolean)
      .flatMap(o => o!.collections);

    const usedIds = new Set<string>();
    const plan: DayPlan[] = [];

    for (let d = 1; d <= days; d++) {
      const dayItems: DayPlan['items'] = [];

      const morningPool = interestCollections.includes('sports') && dataCache.sports?.length
        ? dataCache.sports
        : interestCollections.includes('hiddenGems') && dataCache.hiddenGems?.length
        ? dataCache.hiddenGems
        : (dataCache.places || []).filter((p: any) => p.category?.includes('Top') || p.category?.includes('Attraction'));
      const morning = pickN(morningPool, 1, usedIds);
      morning.forEach(p => dayItems.push({ time: '10:00', name: p.name, area: p.area, href: p.type === 'sports' ? '/sports' : (p.category ? '/places/' + p.id : '/hidden-gems'), slot: 'Morning' }));

      const foodPool = (dataCache.food || []).filter((f: any) => {
        const pr = (f.priceRange || '').toString();
        const level = (pr.match(/£/g) || []).length;
        if (budgetLevel === 'low') return level <= 1;
        if (budgetLevel === 'mid') return level <= 2;
        return true;
      });
      const lunch = pickN(foodPool, 1, usedIds);
      lunch.forEach(f => dayItems.push({ time: '13:00', name: f.name, area: f.area, href: `/food/${f.id}`, slot: 'Lunch' }));

      let afternoonPool = dataCache.places || [];
      if (interests.includes('shopping') && dataCache.shopping?.length) afternoonPool = dataCache.shopping;
      else if (interests.includes('theatre') && dataCache.theatre?.length && d === days) afternoonPool = dataCache.theatre;
      else if (interests.includes('music') && dataCache.music?.length) afternoonPool = dataCache.music;
      const afternoon = pickN(afternoonPool, 1, usedIds);
      afternoon.forEach(p => dayItems.push({
        time: '15:00', name: p.name, area: p.area,
        href: dataCache.shopping?.includes(p) ? `/shopping/${p.id}` : dataCache.theatre?.includes(p) ? `/theatre/${p.id}` : dataCache.music?.includes(p) ? `/music/${p.id}` : `/places/${p.id}`,
        slot: 'Afternoon',
      }));

      const eveningPool = interests.includes('nightlife') && dataCache.nightlife?.length ? dataCache.nightlife : dataCache.food || [];
      const evening = pickN(eveningPool, 1, usedIds);
      evening.forEach(p => dayItems.push({
        time: '19:30', name: p.name, area: p.area,
        href: dataCache.nightlife?.includes(p) ? `/nightlife/${p.id}` : `/food/${p.id}`,
        slot: 'Evening',
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
    <main style={{ minHeight: '100vh', background: '#0f0f1c' }}>
      <style>{FONT_IMPORT}</style>

      {/* HERO */}
      <div style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.12), transparent), #12121f',
        padding: '70px 20px 50px', borderBottom: '1px solid rgba(201,168,76,0.15)',
      }}>
        <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: "'DM Mono', monospace",
            fontSize: '0.68rem', color: '#c9a84c', letterSpacing: '3px', textTransform: 'uppercase' as const,
            border: '1px solid rgba(201,168,76,0.3)', borderRadius: '40px', padding: '6px 16px', marginBottom: '22px',
          }}>
            ✦ AI Itinerary Builder
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: '#fff',
            fontSize: 'clamp(2.2rem, 6vw, 4rem)', lineHeight: 1.05, margin: '0 0 18px', letterSpacing: '-0.01em',
          }}>
            Build My<br /><span style={{ color: '#c9a84c', fontStyle: 'italic' }}>London Trip</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '0 auto' }}>
            Tell us your days, budget and interests — we'll draft a full schedule from what's actually happening in London right now.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 20px 100px' }}>
        {step === 'form' && (
          <div style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
            border: '1px solid rgba(201,168,76,0.18)', borderRadius: '22px', padding: 'clamp(24px, 5vw, 46px)',
          }}>
            <FormField label="Trip Length">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '14px' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.6rem', fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}>{days}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{days === 1 ? 'day' : 'days'} in London</span>
              </div>
              <input type="range" min={1} max={7} value={days} onChange={e => setDays(Number(e.target.value))} className="tap-slider" />
            </FormField>

            <FormField label="Budget">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '14px' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.6rem', fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}>£{budget}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginLeft: '8px' }}>total trip budget</span>
              </div>
              <input type="range" min={100} max={2000} step={50} value={budget} onChange={e => setBudget(Number(e.target.value))} className="tap-slider" />
            </FormField>

            <FormField label="What are you into">
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '9px' }}>
                {INTEREST_OPTIONS.map(opt => {
                  const active = interests.includes(opt.key);
                  return (
                    <button key={opt.key} onClick={() => toggleInterest(opt.key)} style={{
                      padding: '10px 18px', borderRadius: '10px', cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: 600,
                      background: active ? 'linear-gradient(135deg,#c9a84c,#e0be6a)' : 'rgba(255,255,255,0.05)',
                      color: active ? '#1a1a2e' : 'rgba(255,255,255,0.75)',
                      border: active ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.15s',
                    }}>{opt.icon} {opt.label}</button>
                  );
                })}
              </div>
            </FormField>

            <FormField label="Travelling With">
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '9px' }}>
                {TRAVEL_WITH.map(t => (
                  <PillButton key={t} active={travelWith === t} onClick={() => setTravelWith(t)}>{t}</PillButton>
                ))}
              </div>
            </FormField>

            <FormField label="Hotel Area" last>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '9px' }}>
                {HOTEL_AREAS.map(a => (
                  <PillButton key={a} active={hotelArea === a} onClick={() => setHotelArea(a)}>{a}</PillButton>
                ))}
              </div>
            </FormField>

            <button onClick={generate} style={{
              width: '100%', marginTop: '36px', padding: '18px', borderRadius: '14px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#c9a84c,#e8c46f)', color: '#1a1a2e',
              fontFamily: "'DM Sans', sans-serif", fontSize: '1.02rem', fontWeight: 700,
              boxShadow: '0 8px 30px rgba(201,168,76,0.25)', letterSpacing: '0.2px',
            }}>Generate my trip →</button>
          </div>
        )}

        {step === 'loading' && (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <div style={{
              width: '54px', height: '54px', margin: '0 auto 24px', borderRadius: '50%',
              border: '2px solid rgba(201,168,76,0.2)', borderTopColor: '#c9a84c',
              animation: 'tap-spin 0.9s linear infinite',
            }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
              Drafting your {days}-day itinerary...
            </p>
            <style>{'@keyframes tap-spin { to { transform: rotate(360deg); } }'}</style>
          </div>
        )}

        {step === 'result' && (
          <div>
            <button onClick={reset} style={{
              background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.6)',
              borderRadius: '10px', padding: '9px 18px', fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', marginBottom: '28px',
            }}>← Build another trip</button>

            {/* TRIP SUMMARY STRIP */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              borderBottom: '1px dashed rgba(201,168,76,0.35)', paddingBottom: '20px', marginBottom: '36px', flexWrap: 'wrap' as const, gap: '16px',
            }}>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.66rem', color: '#c9a84c', letterSpacing: '2px', marginBottom: '6px' }}>TRIP {tripCode}</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', fontWeight: 700, color: '#fff', margin: 0 }}>
                  {days}-Day London Itinerary
                </h2>
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', textAlign: 'right' as const }}>
                £{budget} · {travelWith}<br />
                {interests.map(i => INTEREST_OPTIONS.find(o => o.key === i)?.label).join(' · ') || 'General sightseeing'}
              </div>
            </div>

            {hotelPicks.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <SectionLabel>🏨 Suggested Stay — {hotelArea}</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '10px', marginTop: '14px' }}>
                  {hotelPicks.map(h => (
                    <Link key={h.id} href={`/hotels/${h.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 16px' }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{h.name}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#c9a84c', marginTop: '2px' }}>{h.priceRange}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* DAY TICKETS */}
            <div style={{ display: 'grid', gap: '22px' }}>
              {itinerary.map(day => (
                <div key={day.day} style={{
                  position: 'relative', background: 'linear-gradient(135deg, rgba(201,168,76,0.07), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(201,168,76,0.22)', borderRadius: '18px', overflow: 'hidden',
                }}>
                  <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    {/* Ticket stub */}
                    <div style={{
                      background: 'linear-gradient(160deg,#c9a84c,#a8842f)', minWidth: '84px', display: 'flex',
                      flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '18px 10px',
                      borderRight: '2px dashed rgba(15,15,28,0.35)',
                    }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(26,26,46,0.6)', letterSpacing: '1px' }}>DAY</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 700, color: '#1a1a2e', lineHeight: 1 }}>{day.day}</div>
                    </div>

                    <div style={{ padding: '20px clamp(16px,3vw,26px)', flex: 1 }}>
                      <div style={{ display: 'grid', gap: '4px' }}>
                        {day.items.map((item, i) => (
                          <Link key={i} href={item.href} style={{ textDecoration: 'none' }}>
                            <div style={{
                              display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 8px', borderRadius: '8px',
                              transition: 'background 0.15s',
                            }} className="tap-itinerary-row">
                              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#c9a84c', minWidth: '46px' }}>{item.time}</div>
                              <div style={{ width: '1px', height: '28px', background: 'rgba(201,168,76,0.25)' }} />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.08rem', fontWeight: 700, color: '#fff' }}>{item.name}</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.66rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                                  {item.slot}{item.area ? ` · ${item.area}` : ''}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .tap-slider {
          -webkit-appearance: none; width: 100%; height: 4px; border-radius: 4px;
          background: rgba(255,255,255,0.12); outline: none;
        }
        .tap-slider::-webkit-slider-thumb {
          -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%;
          background: #c9a84c; cursor: pointer; border: 3px solid #12121f;
          box-shadow: 0 0 0 1px rgba(201,168,76,0.4);
        }
        .tap-itinerary-row:hover { background: rgba(255,255,255,0.04); }
      `}</style>
    </main>
  );
}

function FormField({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ marginBottom: last ? 0 : '30px' }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase' as const, letterSpacing: '1.5px', marginBottom: '14px',
      }}>{label}</div>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 700, color: '#c9a84c',
      textTransform: 'uppercase' as const, letterSpacing: '1.2px',
    }}>{children}</div>
  );
}

function PillButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 18px', borderRadius: '10px', cursor: 'pointer',
      fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: 600,
      background: active ? 'linear-gradient(135deg,#c9a84c,#e0be6a)' : 'rgba(255,255,255,0.05)',
      color: active ? '#1a1a2e' : 'rgba(255,255,255,0.75)',
      border: active ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
    }}>{children}</button>
  );
}
