import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Muslim Tourist Guide London | Halal Food, Mosques & Prayer Rooms | TAP LONDON',
  description: 'Complete Muslim tourist guide for London — halal restaurants, mosques, prayer rooms, Qibla direction, Ramadan info and halal shopping.',
};

export default function MuslimGuidePage() {
  return (
    <main style={{ minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }} className="bg-[#f9f7f2] dark:bg-[#0d0d1a]">

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0f2027 100%)', padding: '56px 20px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c', borderRadius: '40px', padding: '6px 18px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', marginBottom: '20px', textTransform: 'uppercase' as const }}>
            🕌 Muslim Tourist Guide
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', color: '#ffffff', fontWeight: 700, marginBottom: '16px' }}>
            Muslim-Friendly London
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            Halal restaurants, mosques, prayer rooms, Qibla direction, Ramadan information, and halal shopping — everything the Muslim traveller needs in London.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 20px' }}>

        {/* Qibla */}
        <div className="dark:bg-[#1a1a2e] dark:border-gold/30" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(26,26,46,0.06))', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '18px', padding: '28px 24px', marginBottom: '56px', display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' as const }}>
          <div style={{ fontSize: '3rem', flexShrink: 0 }}>🧭</div>
          <div>
            <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>Qibla Direction in London</h2>
            <p className="text-[#444] dark:text-[#ccc]" style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '12px' }}>
              London Qibla direction is approximately 119° (south-east). Use the free Muslim Pro app or islamicfinder.org to find the exact Qibla from your current location.
            </p>
            <a href="https://www.islamicfinder.org/qibla-finder/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#c9a84c', color: '#1a1a2e', padding: '9px 22px', borderRadius: '50px', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none' }}>
              Find Qibla Now →
            </a>
          </div>
        </div>

        {/* Mosques */}
        <p className="text-[#c9a84c]" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '6px' }}>Places of Worship</p>
        <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, marginBottom: '24px' }}>Mosques in London</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px', marginBottom: '56px' }}>
          {[
            { name: 'East London Mosque', area: 'Whitechapel, E1', tube: 'Whitechapel (District, Elizabeth)', desc: 'One of the largest mosques in the UK, holding Friday prayers for up to 7,000 worshippers. Welcoming to visitors.', maps: 'https://www.google.com/maps/search/?api=1&query=East+London+Mosque' },
            { name: 'London Central Mosque', area: "Regent's Park, NW8", tube: 'Baker Street (Jubilee, Metropolitan)', desc: "Located beside Regent's Park with a distinctive golden dome. Open to all visitors.", maps: "https://www.google.com/maps/search/?api=1&query=London+Central+Mosque" },
            { name: 'Finsbury Park Mosque', area: 'Finsbury Park, N4', tube: 'Finsbury Park (Victoria, Piccadilly)', desc: 'A large community mosque in north London with active programmes and daily prayers.', maps: 'https://www.google.com/maps/search/?api=1&query=Finsbury+Park+Mosque' },
            { name: 'Masjid Al-Tawhid', area: 'Leyton, E10', tube: 'Leyton (Central line)', desc: 'Large east London mosque with extensive community facilities and regular Islamic education programmes.', maps: 'https://www.google.com/maps/search/?api=1&query=Masjid+Al+Tawhid+Leyton' },
            { name: 'Baitul Futuh Mosque', area: 'Morden, SM4', tube: 'Morden (Northern line)', desc: 'One of the largest mosques in Western Europe. Open to all visitors.', maps: 'https://www.google.com/maps/search/?api=1&query=Baitul+Futuh+Mosque+Morden' },
            { name: 'Brixton Mosque', area: 'Brixton, SW9', tube: 'Brixton (Victoria line)', desc: 'Diverse south London mosque known for its inclusive community and welcoming atmosphere.', maps: 'https://www.google.com/maps/search/?api=1&query=Brixton+Mosque' },
          ].map((m) => (
            <div key={m.name} className="bg-white dark:bg-[#1a1a2e] border border-navy/10 dark:border-gold/20" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #0f2027)', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🕌</div>
              <div style={{ padding: '18px' }}>
                <div style={{ fontSize: '0.68rem', color: '#c9a84c', fontWeight: 700, marginBottom: '4px' }}>📍 {m.area}</div>
                <h3 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>{m.name}</h3>
                <div className="text-[#888] dark:text-[#999]" style={{ fontSize: '0.7rem', marginBottom: '8px' }}>🚇 {m.tube}</div>
                <p className="text-[#555] dark:text-[#bbb]" style={{ fontSize: '0.8rem', lineHeight: 1.55, marginBottom: '14px' }}>{m.desc}</p>
                <a href={m.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#1a1a2e', color: '#c9a84c', padding: '9px 0', borderRadius: '8px', fontWeight: 600, fontSize: '0.78rem', textDecoration: 'none', textAlign: 'center' as const }}>
                  Get Directions →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Prayer Rooms */}
        <p className="text-[#c9a84c]" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '6px' }}>Prayer Rooms</p>
        <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, marginBottom: '24px' }}>Where to Pray in London</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px', marginBottom: '56px' }}>
          {[
            { place: 'Heathrow Airport', detail: 'All terminals have multi-faith prayer rooms — follow airport signage', icon: '✈️' },
            { place: 'Gatwick Airport', detail: 'Multi-faith rooms in North and South terminals', icon: '✈️' },
            { place: 'Westfield Stratford', detail: 'Multi-faith prayer room on Level 1 near customer services', icon: '🏬' },
            { place: 'Westfield London', detail: 'Prayer room available — ask at customer services desk', icon: '🏬' },
            { place: 'ExCeL London', detail: 'Prayer room available during events — check venue map', icon: '🏟️' },
            { place: 'St Pancras Station', detail: 'Multi-faith room available — follow station signage', icon: '🚂' },
            { place: 'British Museum', detail: 'Quiet room available — ask at information desk', icon: '🏛️' },
            { place: 'O2 Arena', detail: 'Multi-faith room — ask staff on arrival', icon: '🎭' },
          ].map((room) => (
            <div key={room.place} className="bg-white dark:bg-[#1a1a2e] border border-[rgba(201,168,76,0.15)] dark:border-gold/20" style={{ borderRadius: '12px', padding: '16px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{room.icon}</span>
              <div>
                <div className="text-navy dark:text-[#f9f7f2]" style={{ fontWeight: 700, fontSize: '0.87rem', marginBottom: '4px' }}>{room.place}</div>
                <div className="text-[#666] dark:text-[#aaa]" style={{ fontSize: '0.76rem', lineHeight: 1.4 }}>{room.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Halal Food */}
        <p className="text-[#c9a84c]" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '6px' }}>Halal Dining</p>
        <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, marginBottom: '12px' }}>Best Halal Restaurants</h2>
        <p className="text-[#888] dark:text-[#aaa]" style={{ fontSize: '0.8rem', marginBottom: '20px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '12px 16px' }}>
          ℹ️ Always confirm halal certification directly with the restaurant, as suppliers and practices can change.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '56px' }}>
          {[
            { name: 'Tayyabs', area: 'Whitechapel, E1', cuisine: 'Pakistani grill', price: '££', halal: true, desc: 'Legendary Punjabi restaurant famous for tender lamb chops, fiery curries and tandoor breads. Always busy — book ahead.', maps: 'https://www.google.com/maps/search/?api=1&query=Tayyabs+Whitechapel' },
            { name: 'Lahore Kebab House', area: 'Whitechapel, E1', cuisine: 'Pakistani BBQ', price: '£', halal: true, desc: "A London institution for 50 years. Enormous portions, authentic flavours and some of the best seekh kebabs in the city.", maps: 'https://www.google.com/maps/search/?api=1&query=Lahore+Kebab+House+Whitechapel' },
            { name: 'Roti King', area: 'Euston, NW1', cuisine: 'Malaysian', price: '£', halal: true, desc: "Brilliant Malaysian roti canai and dal curry. Always a queue but always worth it. One of London's best budget eats.", maps: 'https://www.google.com/maps/search/?api=1&query=Roti+King+Euston' },
            { name: 'Edgware Road Arabic Strip', area: 'Edgware Road, W2', cuisine: 'Arabic / Lebanese', price: '££', halal: true, desc: 'An entire street of Arabic restaurants, shisha cafes, and patisseries. Try Al Arez, Maroush, or Beirut Express.', maps: 'https://www.google.com/maps/search/?api=1&query=Edgware+Road+London+Arabic+restaurants' },
            { name: 'Mangal 2', area: 'Dalston, N16', cuisine: 'Turkish grill', price: '££', halal: true, desc: "Charcoal-grilled meats and meze in one of London's best Turkish restaurants. Genuinely excellent cooking.", maps: 'https://www.google.com/maps/search/?api=1&query=Mangal+2+Dalston' },
            { name: 'Dishoom', area: 'Multiple locations', cuisine: 'Bombay café', price: '££', halal: false, desc: "London's most loved Indian restaurant group. Famous for black daal, breakfast naan rolls and grills.", maps: 'https://www.google.com/maps/search/?api=1&query=Dishoom+London' },
          ].map((r) => (
            <div key={r.name} className="bg-white dark:bg-[#1a1a2e]" style={{ border: `1px solid ${r.halal ? 'rgba(22,163,74,0.2)' : 'rgba(26,26,46,0.1)'}`, borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div className="text-[#888] dark:text-[#999]" style={{ fontSize: '0.68rem', marginBottom: '3px' }}>📍 {r.area} · {r.cuisine} · {r.price}</div>
                  <h3 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 700 }}>{r.name}</h3>
                </div>
                <span style={{ background: r.halal ? 'rgba(22,163,74,0.1)' : 'rgba(245,158,11,0.1)', color: r.halal ? '#16a34a' : '#92400e', border: `1px solid ${r.halal ? 'rgba(22,163,74,0.3)' : 'rgba(245,158,11,0.3)'}`, borderRadius: '6px', padding: '3px 8px', fontSize: '0.65rem', fontWeight: 700, whiteSpace: 'nowrap' as const, flexShrink: 0, marginLeft: '8px' }}>
                  {r.halal ? '✓ Halal' : '⚠️ Confirm'}
                </span>
              </div>
              <p className="text-[#555] dark:text-[#bbb]" style={{ fontSize: '0.8rem', lineHeight: 1.55, marginBottom: '14px' }}>{r.desc}</p>
              <a href={r.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#1a1a2e', color: '#c9a84c', padding: '8px 0', borderRadius: '8px', fontWeight: 600, fontSize: '0.76rem', textDecoration: 'none', textAlign: 'center' as const }}>
                Find on Google Maps →
              </a>
            </div>
          ))}
        </div>

        {/* Ramadan */}
        <p className="text-[#c9a84c]" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '6px' }}>Ramadan & Eid</p>
        <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, marginBottom: '24px' }}>Ramadan in London</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '56px' }}>
          {[
            { icon: '🌙', title: 'Iftar in London', desc: 'Many mosques host community iftars during Ramadan, particularly East London Mosque and London Central Mosque.' },
            { icon: '🕌', title: 'Tarawih Prayers', desc: 'Extended evening prayers held at all major London mosques throughout Ramadan. Visitors are welcome.' },
            { icon: '🍽️', title: 'Restaurants Open Late', desc: 'Edgware Road and Whitechapel restaurants stay open very late during Ramadan, often until 3-4am for suhoor.' },
            { icon: '📅', title: 'Ramadan Dates', desc: 'Ramadan dates change each year. Check islamicfinder.org or your local mosque for confirmed UK moon sighting dates.' },
            { icon: '🛒', title: 'Ramadan Shopping', desc: 'Whitechapel market, Edgware Road, and Southall Broadway stock dates, dried fruits, and Ramadan food items.' },
            { icon: '🤲', title: 'Eid Celebrations', desc: 'Eid prayers in London are held at mosques and open-air venues. Various parks host Eid festivals — check local listings.' },
          ].map((r) => (
            <div key={r.title} className="bg-white dark:bg-[#1a1a2e] border border-navy/10 dark:border-gold/20" style={{ borderRadius: '14px', padding: '20px' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{r.icon}</div>
              <h3 className="text-navy dark:text-[#f9f7f2]" style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>{r.title}</h3>
              <p className="text-[#555] dark:text-[#bbb]" style={{ fontSize: '0.8rem', lineHeight: 1.55, margin: 0 }}>{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Halal Shopping */}
        <p className="text-[#c9a84c]" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '6px' }}>Muslim-Friendly Shopping</p>
        <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, marginBottom: '24px' }}>Halal Shopping Areas</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px', marginBottom: '48px' }}>
          {[
            { name: 'Whitechapel Market', area: 'E1', desc: 'Outdoor market with halal butchers, spices, Arabic sweets, and Islamic clothing.' },
            { name: 'Edgware Road', area: 'W2', desc: 'Arabic supermarkets, halal butchers, hookah shops, and Middle Eastern bakeries.' },
            { name: 'Southall Broadway', area: 'Southall', desc: 'Little India — halal butchers, sari shops, Indian groceries, and sweet shops.' },
            { name: 'Green Street', area: 'Forest Gate, E7', desc: 'Bengali and Pakistani shops, halal meat, Islamic clothing, and jewellery.' },
            { name: 'Brick Lane', area: 'E1', desc: 'Bengali community area with halal food, fabric shops, and curry houses.' },
            { name: 'Tooting Broadway', area: 'SW17', desc: 'South Asian community hub with halal butchers and diverse Muslim-friendly eateries.' },
          ].map((s) => (
            <div key={s.name} className="bg-white dark:bg-[#1a1a2e] border border-[rgba(201,168,76,0.15)] dark:border-gold/20" style={{ borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h3 className="text-navy dark:text-[#f9f7f2]" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.name}</h3>
                <span style={{ fontSize: '0.68rem', color: '#c9a84c', fontWeight: 600, flexShrink: 0, marginLeft: '8px' }}>{s.area}</span>
              </div>
              <p className="text-[#666] dark:text-[#bbb]" style={{ fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', paddingTop: '16px' }}>
          <Link href="/" style={{ display: 'inline-block', background: '#1a1a2e', color: '#c9a84c', padding: '13px 32px', borderRadius: '50px', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
            ← Back to TAP LONDON
          </Link>
        </div>
      </div>
    </main>
  );
}
