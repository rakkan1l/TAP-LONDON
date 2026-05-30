import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Muslim Tourist Guide London | Halal Food, Mosques & Prayer Rooms | TAP LONDON',
  description: 'Complete Muslim tourist guide for London — halal restaurants, mosques, prayer rooms, Qibla direction, Ramadan info and halal shopping.',
};

const MOSQUES = [
  {
    name: 'East London Mosque',
    area: 'Whitechapel, E1',
    desc: 'One of the largest mosques in the UK, holding Friday prayers for up to 7,000 worshippers. Welcoming to visitors.',
    image: 'https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=640',
    maps: 'https://www.google.com/maps/search/?api=1&query=East+London+Mosque+Whitechapel',
    tube: 'Whitechapel (District, Hammersmith & City, Elizabeth)',
  },
  {
    name: 'London Central Mosque',
    area: "Regent's Park, NW8",
    desc: "Located beside Regent's Park with a distinctive golden dome. Open to all visitors and tourists.",
    image: 'https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=640',
    maps: "https://www.google.com/maps/search/?api=1&query=London+Central+Mosque+Regent's+Park",
    tube: "Baker Street (Jubilee, Metropolitan, Circle)",
  },
  {
    name: 'Finsbury Park Mosque',
    area: 'Finsbury Park, N4',
    desc: 'A large community mosque in north London with active programmes and daily prayers.',
    image: 'https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=640',
    maps: 'https://www.google.com/maps/search/?api=1&query=Finsbury+Park+Mosque+London',
    tube: 'Finsbury Park (Victoria, Piccadilly)',
  },
  {
    name: 'Masjid Al-Tawhid',
    area: 'Leyton, E10',
    desc: 'Large east London mosque with extensive community facilities and regular Islamic education programmes.',
    image: 'https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=640',
    maps: 'https://www.google.com/maps/search/?api=1&query=Masjid+Al+Tawhid+Leyton+London',
    tube: 'Leyton (Central line)',
  },
  {
    name: 'Baitul Futuh Mosque',
    area: 'Morden, SM4',
    desc: 'One of the largest mosques in Western Europe, built by the Ahmadiyya Muslim Community. Open to all visitors.',
    image: 'https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=640',
    maps: 'https://www.google.com/maps/search/?api=1&query=Baitul+Futuh+Mosque+Morden',
    tube: 'Morden (Northern line)',
  },
  {
    name: 'Brixton Mosque',
    area: 'Brixton, SW9',
    desc: 'Diverse south London mosque known for its inclusive community and African-Caribbean Muslim congregation.',
    image: 'https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=640',
    maps: 'https://www.google.com/maps/search/?api=1&query=Brixton+Mosque+London',
    tube: 'Brixton (Victoria line)',
  },
];

const PRAYER_ROOMS = [
  { place: 'Heathrow Airport', detail: 'All terminals have multi-faith prayer rooms — follow airport signage', icon: '✈️' },
  { place: 'Gatwick Airport', detail: 'Multi-faith rooms in North and South terminals', icon: '✈️' },
  { place: 'Westfield Stratford City', detail: 'Multi-faith prayer room on Level 1 near customer services', icon: '🏬' },
  { place: 'Westfield London (White City)', detail: 'Prayer room available — ask at customer services desk', icon: '🏬' },
  { place: 'ExCeL London', detail: 'Prayer room available during events — check venue map', icon: '🏟️' },
  { place: 'O2 Arena', detail: 'Multi-faith room — ask staff on arrival', icon: '🎭' },
  { place: 'British Museum', detail: 'Quiet room available — ask at information desk', icon: '🏛️' },
  { place: 'St Pancras Station', detail: 'Multi-faith room available — follow station signage', icon: '🚂' },
];

const HALAL_FOOD = [
  {
    name: 'Tayyabs',
    area: 'Whitechapel, E1',
    cuisine: 'Pakistani grill',
    price: '££',
    desc: 'Legendary Punjabi restaurant famous for its tender lamb chops, fiery curries and tandoor breads. Always busy — book ahead.',
    maps: 'https://www.google.com/maps/search/?api=1&query=Tayyabs+Whitechapel+London',
    halal: true,
  },
  {
    name: 'Lahore Kebab House',
    area: 'Whitechapel, E1',
    cuisine: 'Pakistani BBQ',
    price: '£',
    desc: 'A London institution for 50 years. Enormous portions, authentic flavours, and some of the best seekh kebabs in the city.',
    maps: 'https://www.google.com/maps/search/?api=1&query=Lahore+Kebab+House+Whitechapel',
    halal: true,
  },
  {
    name: 'Roti King',
    area: 'Euston, NW1',
    cuisine: 'Malaysian',
    price: '£',
    desc: 'Brilliant Malaysian roti canai and dal curry. Always a queue but always worth it. One of London\'s best budget eats.',
    maps: 'https://www.google.com/maps/search/?api=1&query=Roti+King+Euston+London',
    halal: true,
  },
  {
    name: 'Edgware Road Arabic Strip',
    area: 'Edgware Road, W2',
    cuisine: 'Arabic / Lebanese',
    price: '££',
    desc: 'An entire street of Arabic restaurants, shisha cafes, and patisseries. Try Al Arez, Maroush, or Beirut Express.',
    maps: 'https://www.google.com/maps/search/?api=1&query=Edgware+Road+London+Arabic+restaurants',
    halal: true,
  },
  {
    name: 'Mangal 2',
    area: 'Dalston, N16',
    cuisine: 'Turkish grill',
    price: '££',
    desc: 'Charcoal-grilled meats and meze in one of London\'s best Turkish restaurants. Genuinely excellent ocakbasi cooking.',
    maps: 'https://www.google.com/maps/search/?api=1&query=Mangal+2+Dalston+London',
    halal: true,
  },
  {
    name: 'Dishoom',
    area: 'Multiple locations',
    cuisine: 'Bombay café',
    price: '££',
    desc: 'London\'s most loved Indian restaurant group. Famous for black daal, breakfast naan rolls and grills. Confirm current halal meat status with staff.',
    maps: 'https://www.google.com/maps/search/?api=1&query=Dishoom+London',
    halal: false,
    note: 'Confirm halal status with staff',
  },
  {
    name: 'Sakonis',
    area: 'Wembley / Harrow',
    cuisine: 'Indian vegetarian',
    price: '£',
    desc: 'Popular Indian vegetarian and vegan restaurant. Entirely halal-friendly and great value with a wide menu.',
    maps: 'https://www.google.com/maps/search/?api=1&query=Sakonis+Wembley+London',
    halal: true,
  },
  {
    name: 'Five Guys (many locations)',
    area: 'Citywide',
    cuisine: 'American burgers',
    price: '££',
    desc: 'Some Five Guys locations in London serve halal beef. Always confirm with the specific branch before ordering.',
    maps: 'https://www.google.com/maps/search/?api=1&query=Five+Guys+London+halal',
    halal: false,
    note: 'Check specific branch for halal',
  },
];

const RAMADAN_INFO = [
  {
    icon: '🌙',
    title: 'Iftar in London',
    desc: 'Many mosques host community iftars during Ramadan, particularly East London Mosque and London Central Mosque. Check their websites for dates and registration.',
  },
  {
    icon: '🕌',
    title: 'Tarawih Prayers',
    desc: 'Extended evening prayers held at all major London mosques throughout Ramadan. East London Mosque and London Central Mosque welcome visitors.',
  },
  {
    icon: '🍽️',
    title: 'Halal Restaurants Open Late',
    desc: 'The Edgware Road strip and Whitechapel restaurants stay open very late during Ramadan, often until 3-4am. Perfect for suhoor.',
  },
  {
    icon: '📅',
    title: 'Ramadan Dates',
    desc: 'Ramadan dates change each year based on the lunar calendar. Check islamicfinder.org or your local mosque for confirmed UK moon sighting dates.',
  },
  {
    icon: '🛒',
    title: 'Ramadan Shopping',
    desc: 'Whitechapel market, Edgware Road shops, and Southall Broadway stock a wide range of dates, dried fruits, and Ramadan food items.',
  },
  {
    icon: '🤲',
    title: 'Eid Celebrations',
    desc: 'Eid prayers in London are held at mosques and open-air venues. Trafalgar Square and various parks host Eid festivals. Check local listings.',
  },
];

const QIBLA_NOTE = "London Qibla direction is approximately 119° (south-east). You can also use the free Muslim Pro app or islamicfinder.org to find the exact Qibla from your current location.";

const HALAL_SHOPPING = [
  { name: 'Whitechapel Market', area: 'E1', desc: 'Outdoor market with halal butchers, spices, Arabic sweets, and Islamic clothing' },
  { name: 'Edgware Road', area: 'W2', desc: 'Arabic supermarkets, halal butchers, hookah shops, and Middle Eastern bakeries' },
  { name: 'Southall Broadway', area: 'Southall', desc: 'Little India — halal butchers, sari shops, Indian groceries, and sweet shops' },
  { name: 'Green Street', area: 'Forest Gate, E7', desc: 'Bengali and Pakistani shops, halal meat, Islamic clothing, and jewellery' },
  { name: 'Brick Lane', area: 'E1', desc: 'Bengali community area with halal food, fabric shops, and curry houses' },
  { name: 'Tooting Broadway', area: 'SW17', desc: 'South Asian community hub with halal butchers and diverse Muslim-friendly eateries' },
];

export default function MuslimGuidePage() {
  return (
    <main style={{ background: '#f9f7f2', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0f2027 100%)',
          padding: '56px 20px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(201,168,76,0.15)',
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#c9a84c',
              borderRadius: '40px',
              padding: '6px 18px',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '1.5px',
              marginBottom: '20px',
              textTransform: 'uppercase' as const,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            🕌 Muslim Tourist Guide
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
              color: '#ffffff',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            Muslim-Friendly London
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
            }}
          >
            Halal restaurants, mosques, prayer rooms, Qibla direction, Ramadan information, and halal shopping — everything the Muslim traveller needs in London.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 20px' }}>

        {/* Qibla */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(26,26,46,0.06))',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '18px',
            padding: '28px 24px',
            marginBottom: '56px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px',
          }}
        >
          <div style={{ fontSize: '3rem', flexShrink: 0 }}>🧭</div>
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: '8px',
              }}
            >
              Qibla Direction in London
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.88rem',
                color: '#444',
                lineHeight: 1.7,
                marginBottom: '12px',
              }}
            >
              {QIBLA_NOTE}
            </p>
            <a
              href="https://www.islamicfinder.org/qibla-finder/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#c9a84c',
                color: '#1a1a2e',
                padding: '9px 22px',
                borderRadius: '50px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: '0.8rem',
                textDecoration: 'none',
              }}
            >
              Find Qibla Now →
            </a>
          </div>
        </div>

        {/* Mosques */}
        <SectionHeader label="Places of Worship" title="Mosques in London" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px', marginBottom: '56px' }}>
          {MOSQUES.map((m) => (
            <div
              key={m.name}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(26,26,46,0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={m.image}
                  alt={m.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(26,26,46,0.7) 0%, transparent 60%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '12px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.8)',
                    background: 'rgba(0,0,0,0.4)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  🚇 {m.tube}
                </div>
              </div>
              <div style={{ padding: '18px' }}>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.68rem',
                    color: '#c9a84c',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    marginBottom: '4px',
                  }}
                >
                  📍 {m.area}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#1a1a2e',
                    marginBottom: '8px',
                  }}
                >
                  {m.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.8rem',
                    color: '#555',
                    lineHeight: 1.55,
                    marginBottom: '14px',
                  }}
                >
                  {m.desc}
                </p>
                <a
                  href={m.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    background: '#1a1a2e',
                    color: '#c9a84c',
                    padding: '9px 0',
                    borderRadius: '8px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Get Directions →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Prayer Rooms */}
        <SectionHeader label="Prayer Rooms" title="Where to Pray in London" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px', marginBottom: '56px' }}>
          {PRAYER_ROOMS.map((room) => (
            <div
              key={room.place}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '12px',
                padding: '16px 18px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}
            >
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{room.icon}</span>
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.87rem',
                    color: '#1a1a2e',
                    marginBottom: '4px',
                  }}
                >
                  {room.place}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.76rem',
                    color: '#666',
                    lineHeight: 1.4,
                  }}
                >
                  {room.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Halal Food */}
        <SectionHeader label="Halal Dining" title="Best Halal Restaurants" />
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.8rem',
            color: '#888',
            marginBottom: '20px',
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '10px',
            padding: '12px 16px',
          }}
        >
          ℹ️ Always confirm halal certification directly with the restaurant, as suppliers and practices can change.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '56px' }}>
          {HALAL_FOOD.map((r) => (
            <div
              key={r.name}
              style={{
                background: '#ffffff',
                border: `1px solid ${r.halal ? 'rgba(22,163,74,0.2)' : 'rgba(26,26,46,0.1)'}`,
                borderRadius: '14px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.68rem',
                      color: '#888',
                      marginBottom: '3px',
                    }}
                  >
                    📍 {r.area} · {r.cuisine} · {r.price}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#1a1a2e',
                    }}
                  >
                    {r.name}
                  </h3>
                </div>
                <span
                  style={{
                    background: r.halal ? 'rgba(22,163,74,0.1)' : 'rgba(245,158,11,0.1)',
                    color: r.halal ? '#16a34a' : '#92400e',
                    border: `1px solid ${r.halal ? 'rgba(22,163,74,0.3)' : 'rgba(245,158,11,0.3)'}`,
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    whiteSpace: 'nowrap' as const,
                    flexShrink: 0,
                    marginLeft: '8px',
                  }}
                >
                  {r.halal ? '✓ Halal' : '⚠️ Confirm'}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  color: '#555',
                  lineHeight: 1.55,
                  marginBottom: r.note ? '8px' : '14px',
                }}
              >
                {r.desc}
              </p>
              {r.note && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#92400e', marginBottom: '12px' }}>
                  ⚠️ {r.note}
                </p>
              )}
              <a
                href={r.maps}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: '#1a1a2e',
                  color: '#c9a84c',
                  padding: '8px 0',
                  borderRadius: '8px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.76rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Find on Google Maps →
              </a>
            </div>
          ))}
        </div>

        {/* Ramadan */}
        <SectionHeader label="Ramadan & Eid" title="Ramadan in London" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '56px' }}>
          {RAMADAN_INFO.map((r) => (
            <div
              key={r.title}
              style={{
                background: 'rgba(26,26,46,0.04)',
                border: '1px solid rgba(26,26,46,0.1)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{r.icon}</div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#1a1a2e',
                  marginBottom: '6px',
                }}
              >
                {r.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  color: '#555',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Halal Shopping */}
        <SectionHeader label="Muslim-Friendly Shopping" title="Halal Shopping Areas" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px', marginBottom: '56px' }}>
          {HALAL_SHOPPING.map((s) => (
            <div
              key={s.name}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '12px',
                padding: '18px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#1a1a2e',
                  }}
                >
                  {s.name}
                </h3>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.68rem',
                    color: '#c9a84c',
                    fontWeight: 600,
                    flexShrink: 0,
                    marginLeft: '8px',
                  }}
                >
                  {s.area}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.78rem',
                  color: '#666',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Back */}
        <div style={{ textAlign: 'center', paddingTop: '16px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: '#1a1a2e',
              color: '#c9a84c',
              padding: '13px 32px',
              borderRadius: '50px',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            ← Back to TAP LONDON
          </Link>
        </div>
      </div>
    </main>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.7rem',
          color: '#c9a84c',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          marginBottom: '6px',
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          color: '#1a1a2e',
          fontWeight: 700,
        }}
      >
        {title}
      </h2>
    </div>
  );
}
