import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tourist Emergency & Scam Help London | TAP LONDON',
  description: 'Emergency numbers, scam warnings, lost passport help, money exchange tips and tourist safety guide for London visitors.',
};

const EMERGENCY_NUMBERS = [
  {
    number: '999',
    title: 'Police, Fire, Ambulance',
    desc: 'For immediate danger or crime happening right now. Always free to call.',
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.08)',
    border: 'rgba(220,38,38,0.3)',
    icon: '🚨',
    tel: 'tel:999',
  },
  {
    number: '101',
    title: 'Non-Emergency Police',
    desc: 'Report a crime that already happened or seek police advice.',
    color: '#1a1a2e',
    bg: 'rgba(26,26,46,0.06)',
    border: 'rgba(26,26,46,0.2)',
    icon: '👮',
    tel: 'tel:101',
  },
  {
    number: '111',
    title: 'NHS Medical Advice',
    desc: 'Urgent medical help when it is not a life-threatening emergency. Free 24/7.',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.08)',
    border: 'rgba(22,163,74,0.3)',
    icon: '🏥',
    tel: 'tel:111',
  },
  {
    number: '116 123',
    title: 'Samaritans',
    desc: 'Emotional support, free and confidential, 24 hours a day, 7 days a week.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.3)',
    icon: '💜',
    tel: 'tel:116123',
  },
  {
    number: '+44 20 7008 5000',
    title: 'UK Foreign Office',
    desc: 'Lost passport, British consulate help, emergency travel documents.',
    color: '#c9a84c',
    bg: 'rgba(201,168,76,0.08)',
    border: 'rgba(201,168,76,0.3)',
    icon: '🛂',
    tel: 'tel:+442070085000',
  },
  {
    number: '+44 20 7361 6000',
    title: 'US Embassy London',
    desc: 'Emergency services for US citizens. Lost passport, arrest, serious illness.',
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.08)',
    border: 'rgba(37,99,235,0.3)',
    icon: '🇺🇸',
    tel: 'tel:+442073616000',
  },
];

const LOST_DOCUMENTS = [
  {
    icon: '📘',
    title: 'Lost Passport',
    color: '#1a1a2e',
    steps: [
      'Report to the nearest police station — get a crime reference number',
      'Contact your country\'s embassy in London immediately',
      'Call UK Foreign Office: +44 20 7008 5000 for guidance',
      'Apply online at gov.uk/emergency-travel-document for emergency travel doc',
    ],
  },
  {
    icon: '📱',
    title: 'Lost or Stolen Phone',
    color: '#7c3aed',
    steps: [
      'Use another device to log out of your Apple ID or Google account remotely',
      'Report to police and get a crime reference number for insurance',
      'Call your network provider to block the SIM card immediately',
      'Call your bank right away if banking or payment apps were on the phone',
    ],
  },
  {
    icon: '💳',
    title: 'Lost Wallet or Cards',
    color: '#dc2626',
    steps: [
      'Call your bank immediately to freeze or cancel all cards',
      'Report to police and get a crime reference number',
      'Contact your embassy if you need emergency cash assistance',
      'Use Western Union or MoneyGram for emergency money transfers from family',
    ],
  },
];

const SCAMS = [
  {
    icon: '🎴',
    title: 'Three Card Trick',
    desc: 'Street gambling near bridges, tourist squares and markets. The crowd around the table is part of the setup. You cannot win. Walk away immediately.',
  },
  {
    icon: '📋',
    title: 'Fake Charity Clipboards',
    desc: 'Aggressive collectors with clipboards asking for card details or signatures near Oxford Street and tourist areas. Never give card details on the street.',
  },
  {
    icon: '🎫',
    title: 'Unofficial Ticket Sellers',
    desc: 'People selling theatre, attraction, or concert tickets on the street. Always buy from official venue box offices or recognised sellers like Ticketmaster.',
  },
  {
    icon: '👜',
    title: 'Distraction Pickpockets',
    desc: 'One person distracts while another steals. Common around Oxford Street, Leicester Square, Camden, Westminster Bridge and busy Tube platforms. Keep bags in front.',
  },
  {
    icon: '🚕',
    title: 'Unlicensed Minicabs',
    desc: 'Drivers approaching you in the street or outside clubs and stations. Never accept rides. Use official black cabs, licensed taxi ranks, Uber, or Bolt only.',
  },
  {
    icon: '💱',
    title: 'Airport Money Exchange',
    desc: 'Airport exchange kiosks charge very poor rates. Use your bank card in ATMs in the city, or compare bureaux in Victoria, Marble Arch, or Queensway.',
  },
  {
    icon: '📸',
    title: 'Forced Photos',
    desc: 'People in costume near tourist sites who offer photos then demand payment. Agree a price upfront or decline entirely — they can be very persistent.',
  },
  {
    icon: '💍',
    title: 'Found Ring or Gold Scam',
    desc: 'A stranger "finds" a gold ring or bracelet and offers to sell it to you at a deal. The item is worthless. Common near Tower Bridge and Covent Garden.',
  },
];

const MONEY_TIPS = [
  {
    icon: '🏧',
    title: 'Use ATMs in the city',
    desc: 'Withdraw money after arriving in central London. Use your bank card and check your bank\'s overseas fees. Avoid airport kiosks entirely if possible.',
  },
  {
    icon: '📊',
    title: 'Compare the final amount',
    desc: 'Always ask how much you receive after all fees — not just the headline rate. A great-looking rate can include heavy commission charges.',
  },
  {
    icon: '📍',
    title: 'Best areas for exchange',
    desc: 'Victoria, Marble Arch, Queensway, and Edgware Road have multiple bureaux close together making it easy to compare. Avoid tourist hotspot kiosks near major attractions.',
  },
  {
    icon: '💳',
    title: 'London is very card friendly',
    desc: 'Contactless cards and phones work on the Tube, buses, and almost every shop. Keep a small amount of cash for markets, small cafes, and stalls.',
  },
];

const USEFUL_LINKS = [
  { label: 'gov.uk emergency travel document', url: 'https://www.gov.uk/emergency-travel-document', icon: '🛂' },
  { label: 'Met Police lost property', url: 'https://www.met.police.uk/ro/report/lostproperty/v2/about-this-service/', icon: '👮' },
  { label: 'TfL lost property', url: 'https://tfl.gov.uk/travel-information/lost-property/', icon: '🚇' },
  { label: 'Action Fraud (report scams)', url: 'https://www.actionfraud.police.uk/', icon: '🎣' },
  { label: 'NHS 111 online', url: 'https://111.nhs.uk/', icon: '🏥' },
  { label: 'Western Union emergency transfer', url: 'https://www.westernunion.com/', icon: '💸' },
];

export default function EmergencyPage() {
  return (
    <main style={{ background: '#f9f7f2', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1a1a 100%)',
          padding: '56px 20px 48px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(220,38,38,0.15)',
              border: '1px solid rgba(220,38,38,0.4)',
              color: '#fca5a5',
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
            🚨 Tourist Safety Guide
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
            Emergency & Scam Help
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              marginBottom: '0',
            }}
          >
            Everything you need if something goes wrong in London — emergency numbers, scam warnings, lost document steps, and trusted money advice.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 20px' }}>

        {/* Emergency Numbers */}
        <SectionHeader label="Emergency Numbers" title="Tap to Call" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '56px',
          }}
        >
          {EMERGENCY_NUMBERS.map((n) => (
            <a
              key={n.number}
              href={n.tel}
              style={{
                display: 'block',
                background: n.bg,
                border: `1px solid ${n.border}`,
                borderRadius: '16px',
                padding: '24px 20px',
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{n.icon}</div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: n.color,
                  marginBottom: '4px',
                }}
              >
                {n.number}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: '#1a1a2e',
                  marginBottom: '6px',
                }}
              >
                {n.title}
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  color: '#555',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {n.desc}
              </p>
              <div
                style={{
                  marginTop: '12px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: n.color,
                  letterSpacing: '0.5px',
                }}
              >
                TAP TO CALL →
              </div>
            </a>
          ))}
        </div>

        {/* Lost Documents */}
        <SectionHeader label="If Something Is Lost" title="Step-by-Step Help" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '56px' }}>
          {LOST_DOCUMENTS.map((doc) => (
            <div
              key={doc.title}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(26,26,46,0.1)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{doc.icon}</div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: doc.color,
                  marginBottom: '16px',
                }}
              >
                {doc.title}
              </h3>
              <ol style={{ paddingLeft: '18px', margin: 0 }}>
                {doc.steps.map((step, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.83rem',
                      color: '#444',
                      lineHeight: 1.6,
                      marginBottom: '10px',
                    }}
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Scam Warnings */}
        <SectionHeader label="Stay Safe" title="Common London Scams" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px', marginBottom: '56px' }}>
          {SCAMS.map((scam) => (
            <div
              key={scam.title}
              style={{
                background: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{scam.icon}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#92400e',
                      marginBottom: '6px',
                    }}
                  >
                    ⚠️ {scam.title}
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.8rem',
                      color: '#555',
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {scam.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Money Tips */}
        <SectionHeader label="Money Exchange" title="Trusted Money Tips" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '56px' }}>
          {MONEY_TIPS.map((tip) => (
            <div
              key={tip.title}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '14px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{tip.icon}</div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  color: '#1a1a2e',
                  marginBottom: '6px',
                }}
              >
                {tip.title}
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  color: '#555',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {tip.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Useful Links */}
        <SectionHeader label="Official Resources" title="Useful Links" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px', marginBottom: '56px' }}>
          {USEFUL_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#ffffff',
                border: '1px solid rgba(26,26,46,0.1)',
                borderRadius: '12px',
                padding: '14px 18px',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = '#c9a84c'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(26,26,46,0.1)'}
            >
              <span style={{ fontSize: '1.3rem' }}>{link.icon}</span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#1a1a2e',
                }}
              >
                {link.label} →
              </span>
            </a>
          ))}
        </div>

        {/* Back home */}
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
