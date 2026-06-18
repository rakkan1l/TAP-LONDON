'use client';

import { useState } from 'react';
import { fetchCollection } from '@/lib/firestore';

type NearItem = {
  id: string;
  name: string;
  area: string;
  image: string;
  mapsUrl: string;
  category: string;
  distance?: number;
};

const CATEGORIES = [
  { label: 'Food', icon: '🍽️', collection: 'food' },
  { label: 'Places', icon: '🏛️', collection: 'places' },
  { label: 'Nightlife', icon: '🌙', collection: 'nightlife' },
  { label: 'Hotels', icon: '🏨', collection: 'hotels' },
  { label: 'Kids', icon: '👨‍👩‍👧', collection: 'kids' },
  { label: 'Hidden Gems', icon: '💎', collection: 'hidden-gems' },
];

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Extract lat/lng from Google Maps URL
function extractCoords(mapsUrl: string): { lat: number; lng: number } | null {
  if (!mapsUrl) return null;
  const match = mapsUrl.match(/query=([^&]+)/);
  return null; // We'll use area-based approximation
}

// London area coordinates lookup
const AREA_COORDS: Record<string, [number, number]> = {
  'soho': [51.5130, -0.1310], 'covent garden': [51.5117, -0.1240],
  'mayfair': [51.5100, -0.1470], 'westminster': [51.4994, -0.1248],
  'shoreditch': [51.5237, -0.0779], 'camden': [51.5392, -0.1426],
  'notting hill': [51.5143, -0.1968], 'south bank': [51.5055, -0.1100],
  'london bridge': [51.5045, -0.0865], 'tower bridge': [51.5055, -0.0754],
  'canary wharf': [51.5054, -0.0235], 'greenwich': [51.4777, -0.0007],
  'kensington': [51.4991, -0.1938], 'chelsea': [51.4875, -0.1687],
  'brixton': [51.4627, -0.1145], 'hackney': [51.5450, -0.0553],
  'islington': [51.5362, -0.1033], 'fulham': [51.4787, -0.1917],
  'whitechapel': [51.5158, -0.0640], 'holborn': [51.5174, -0.1200],
  'city of london': [51.5155, -0.0922], 'clerkenwell': [51.5229, -0.1069],
  'bermondsey': [51.4979, -0.0798], 'peckham': [51.4736, -0.0699],
  'streatham': [51.4279, -0.1247], 'balham': [51.4432, -0.1528],
  'clapham': [51.4620, -0.1383], 'putney': [51.4619, -0.2161],
  'richmond': [51.4613, -0.3037], 'wimbledon': [51.4214, -0.2058],
  'kingston': [51.4098, -0.3024], 'heathrow': [51.4700, -0.4543],
  'wembley': [51.5560, -0.2796], 'harrow': [51.5798, -0.3346],
  'wood green': [51.5975, -0.1098], 'tottenham': [51.6008, -0.0671],
  'stratford': [51.5416, -0.0029], 'bow': [51.5269, -0.0204],
  'bethnal green': [51.5266, -0.0603], 'walthamstow': [51.5768, -0.0185],
  'strand': [51.5120, -0.1180], 'trafalgar square': [51.5080, -0.1281],
  'oxford street': [51.5153, -0.1426], 'bond street': [51.5143, -0.1494],
  'kings cross': [51.5309, -0.1233], 'euston': [51.5282, -0.1337],
  'paddington': [51.5154, -0.1755], 'victoria': [51.4965, -0.1439],
  'waterloo': [51.5036, -0.1143], 'elephant and castle': [51.4956, -0.1004],
  'maida vale': [51.5281, -0.1851], 'st john\'s wood': [51.5341, -0.1726],
  'hampstead': [51.5568, -0.1781], 'highbury': [51.5523, -0.0973],
  'holloway': [51.5559, -0.1154], 'archway': [51.5652, -0.1348],
};

function getAreaCoords(area: string): [number, number] | null {
  if (!area) return null;
  const lower = area.toLowerCase();
  for (const [key, coords] of Object.entries(AREA_COORDS)) {
    if (lower.includes(key)) return coords;
  }
  return null;
}

export default function NearMe() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<NearItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('food');
  const [locationError, setLocationError] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [searching, setSearching] = useState(false);

  const findNearMe = async (collection: string) => {
    setActiveCategory(collection);
    setSearching(true);
    setLocationError('');
    setResults([]);

    if (!navigator.geolocation) {
      setLocationError('Location not supported on this device');
      setSearching(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });

        setLoading(true);
        try {
          const items = await fetchCollection(collection);
          if (!items) { setLocationError('No items found'); setLoading(false); setSearching(false); return; }

          const withDistance = items
            .map(item => {
              const coords = getAreaCoords(item.area || '');
              if (!coords) return { ...item, distance: 999 };
              const dist = getDistanceKm(userLat, userLng, coords[0], coords[1]);
              return { ...item, distance: Math.round(dist * 10) / 10 };
            })
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 10);

          setResults(withDistance);
        } catch (e) {
          setLocationError('Error loading places');
        }
        setLoading(false);
        setSearching(false);
      },
      (err) => {
        setLocationError('Please allow location access to use Near Me');
        setSearching(false);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  if (!open) return (
    <button onClick={() => { setOpen(true); findNearMe('food'); }}
      style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #1a1a2e, #2d2d4e)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '50px', padding: '12px 22px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.86rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      Near Me
    </button>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9998, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={() => setOpen(false)}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#f9f7f2', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: '600px', maxHeight: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ background: '#1a1a2e', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>Near Me</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>
              {userLocation ? `📍 Location found` : '📍 Finding your location...'}
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
        </div>

        {/* Category buttons */}
        <div style={{ padding: '14px 16px', background: '#fff', display: 'flex', gap: '8px', overflowX: 'auto', flexShrink: 0, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.collection} onClick={() => findNearMe(cat.collection)}
              style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px', borderRadius: '40px', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', fontWeight: 600, background: activeCategory === cat.collection ? '#1a1a2e' : 'rgba(26,26,46,0.07)', color: activeCategory === cat.collection ? '#c9a84c' : '#555', transition: 'all 0.2s' }}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {(searching || loading) && (
            <div style={{ textAlign: 'center', padding: '40px', fontFamily: "'DM Sans', sans-serif", color: '#888' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📍</div>
              {searching ? 'Getting your location...' : 'Finding nearest places...'}
            </div>
          )}
          {locationError && (
            <div style={{ textAlign: 'center', padding: '32px', fontFamily: "'DM Sans', sans-serif" }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📍</div>
              <div style={{ color: '#e55', marginBottom: '8px', fontSize: '0.86rem' }}>{locationError}</div>
              <div style={{ color: '#888', fontSize: '0.76rem' }}>Please allow location access in your browser settings</div>
            </div>
          )}
          {!searching && !loading && !locationError && results.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {results.map(item => (
                <a key={item.id} href={item.mapsUrl || '#'} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'flex', gap: '12px', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(201,168,76,0.1)', padding: '10px', alignItems: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 700, color: '#1a1a2e' }}>{item.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#888' }}>📍 {item.area}</div>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'center' as const }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 700, color: '#c9a84c' }}>{item.distance === 999 ? '—' : `${item.distance}km`}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: '#888' }}>away</div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
