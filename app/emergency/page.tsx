import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tourist Emergency & Scam Help London | TAP LONDON',
  description: 'Emergency numbers, scam warnings, lost passport help, money exchange tips and tourist safety guide for London visitors.',
};

export default function EmergencyPage() {
  return (
    <main style={{ background: '#f9f7f2', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1a1a 100%)', padding: '56px 20px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)', color: '#fca5a5', borderRadius: '40px', padding: '6px 18px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', marginBottom: '20px', textTransform: 'uppercase' }}>
            🚨 Tourist Safety Guide
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', color: '#ffffff', fontWeight: 700, marginBottom: '16px' }}>
            Emergency & Scam Help
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            Everything you need if something goes wrong in London — emergency numbers, scam warnings, lost document steps, and trusted money advice.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 20px' }}>

        {/* Emergency Numbers */}
        <p style={{ fontSize: '0.7rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Emergency Numbers</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#1a1a2e', fontWeight: 700, marginBottom: '24px' }}>Tap to Call</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '56px' }}>
          <a href="tel:999" style={{ display: 'block', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '16px', padding: '24px 20px', textDecoration: 'none' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🚨</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: '#dc2626', marginBottom: '4px' }}>999</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a2e', marginBottom: '6px' }}>Police, Fire, Ambulance</div>
            <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, margin: '0 0 12px' }}>For immediate danger or crime happening right now. Always free to call.</p>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#dc2626', letterSpacing: '0.5px' }}>TAP TO CALL →</div>
          </a>

          <a href="tel:101" style={{ display: 'block', background: 'rgba(26,26,46,0.06)', border: '1px solid rgba(26,26,46,0.2)', borderRadius: '16px', padding: '24px 20px', textDecoration: 'none' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>👮</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '4px' }}>101</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a2e', marginBottom: '6px' }}>Non-Emergency Police</div>
            <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, margin: '0 0 12px' }}>Report a crime that already happened or seek police advice.</p>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1a1a2e', letterSpacing: '0.5px' }}>TAP TO CALL →</div>
          </a>

          <a href="tel:111" style={{ display: 'block', background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.3)', borderRadius: '16px', padding: '24px 20px', textDecoration: 'none' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🏥</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: '#16a34a', marginBottom: '4px' }}>111</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a2e', marginBottom: '6px' }}>NHS Medical Advice</div>
            <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, margin: '0 0 12px' }}>Urgent medical help when not life-threatening. Free 24/7.</p>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#16a34a', letterSpacing: '0.5px' }}>TAP TO CALL →</div>
          </a>

          <a href="tel:116123" style={{ display: 'block', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '16px', padding: '24px 20px', textDecoration: 'none' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>💜</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: '#7c3aed', marginBottom: '4px' }}>116 123</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a2e', marginBottom: '6px' }}>Samaritans</div>
            <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, margin: '0 0 12px' }}>Emotional support, free and confidential, 24 hours a day.</p>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7c3aed', letterSpacing: '0.5px' }}>TAP TO CALL →</div>
          </a>

          <a href="tel:+442070085000" style={{ display: 'block', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '16px', padding: '24px 20px', textDecoration: 'none' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🛂</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#c9a84c', marginBottom: '4px' }}>+44 20 7008 5000</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a2e', marginBottom: '6px' }}>UK Foreign Office</div>
            <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, margin: '0 0 12px' }}>Lost passport, consulate help, emergency travel documents.</p>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.5px' }}>TAP TO CALL →</div>
          </a>

          <a href="tel:+442073616000" style={{ display: 'block', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '16px', padding: '24px 20px', textDecoration: 'none' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🇺🇸</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2563eb', marginBottom: '4px' }}>+44 20 7361 6000</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a2e', marginBottom: '6px' }}>US Embassy London</div>
            <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, margin: '0 0 12px' }}>Emergency services for US citizens. Lost passport, arrest, illness.</p>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.5px' }}>TAP TO CALL →</div>
          </a>
        </div>

        {/* Lost Documents */}
        <p style={{ fontSize: '0.7rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>If Something Is Lost</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#1a1a2e', fontWeight: 700, marginBottom: '24px' }}>Step-by-Step Help</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '56px' }}>
          <div style={{ background: '#ffffff', border: '1px solid rgba(26,26,46,0.1)', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📘</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '16px' }}>Lost Passport</h3>
            <ol style={{ paddingLeft: '18px', margin: 0 }}>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Report to nearest police station — get a crime reference number</li>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Contact your country's embassy in London immediately</li>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Call UK Foreign Office: +44 20 7008 5000 for guidance</li>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Apply at gov.uk/emergency-travel-document for emergency travel doc</li>
            </ol>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid rgba(26,26,46,0.1)', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📱</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 700, color: '#7c3aed', marginBottom: '16px' }}>Lost or Stolen Phone</h3>
            <ol style={{ paddingLeft: '18px', margin: 0 }}>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Use another device to log out of Apple ID or Google account remotely</li>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Report to police and get a crime reference number for insurance</li>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Call your network provider to block the SIM card immediately</li>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Call your bank right away if banking apps were on the phone</li>
            </ol>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid rgba(26,26,46,0.1)', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💳</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 700, color: '#dc2626', marginBottom: '16px' }}>Lost Wallet or Cards</h3>
            <ol style={{ paddingLeft: '18px', margin: 0 }}>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Call your bank immediately to freeze or cancel all cards</li>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Report to police and get a crime reference number</li>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Contact your embassy if you need emergency cash assistance</li>
              <li style={{ fontSize: '0.83rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>Use Western Union or MoneyGram for emergency money transfers</li>
            </ol>
          </div>
        </div>

        {/* Scams */}
        <p style={{ fontSize: '0.7rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Stay Safe</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#1a1a2e', fontWeight: 700, marginBottom: '24px' }}>Common London Scams</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px', marginBottom: '56px' }}>
          {[
            { icon: '🎴', title: 'Three Card Trick', desc: 'Street gambling near bridges and tourist squares. The crowd is part of the setup. You cannot win. Walk away immediately.' },
            { icon: '📋', title: 'Fake Charity Clipboards', desc: 'Aggressive collectors asking for card details near Oxford Street. Never give card details on the street.' },
            { icon: '🎫', title: 'Unofficial Ticket Sellers', desc: 'People selling theatre or attraction tickets on the street. Always buy from official venue box offices only.' },
            { icon: '👜', title: 'Distraction Pickpockets', desc: 'One person distracts while another steals. Common on Oxford Street, Camden, Westminster Bridge and busy Tube platforms.' },
            { icon: '🚕', title: 'Unlicensed Minicabs', desc: 'Drivers approaching you in the street. Never accept rides. Use official black cabs, Uber, or Bolt only.' },
            { icon: '💱', title: 'Airport Money Exchange', desc: 'Airport kiosks charge very poor rates. Use ATMs in the city or compare bureaux in Victoria, Marble Arch, or Queensway.' },
            { icon: '📸', title: 'Forced Photos', desc: 'People in costume who offer photos then demand payment. Agree a price upfront or decline entirely.' },
            { icon: '💍', title: 'Found Ring Scam', desc: 'A stranger finds a gold ring and offers to sell it cheaply. The item is worthless. Common near Tower Bridge and Covent Garden.' },
          ].map((scam) => (
            <div key={scam.title} style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{scam.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#92400e', marginBottom: '6px' }}>⚠️ {scam.title}</div>
                  <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.55, margin: 0 }}>{scam.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Money Tips */}
        <p style={{ fontSize: '0.7rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Money Exchange</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#1a1a2e', fontWeight: 700, marginBottom: '24px' }}>Trusted Money Tips</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '56px' }}>
          {[
            { icon: '🏧', title: 'Use ATMs in the city', desc: 'Withdraw money after arriving in central London. Avoid airport kiosks entirely if possible.' },
            { icon: '📊', title: 'Compare the final amount', desc: 'Always ask how much you receive after all fees — not just the headline rate.' },
            { icon: '📍', title: 'Best areas for exchange', desc: 'Victoria, Marble Arch, Queensway, and Edgware Road have multiple bureaux close together.' },
            { icon: '💳', title: 'London is card friendly', desc: 'Contactless cards work on the Tube, buses, and almost every shop in London.' },
          ].map((tip) => (
            <div key={tip.title} style={{ background: '#ffffff', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{tip.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1a1a2e', marginBottom: '6px' }}>{tip.title}</div>
              <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.55, margin: 0 }}>{tip.desc}</p>
            </div>
          ))}
        </div>

        {/* Useful Links */}
        <p style={{ fontSize: '0.7rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Official Resources</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#1a1a2e', fontWeight: 700, marginBottom: '24px' }}>Useful Links</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px', marginBottom: '48px' }}>
          {[
            { icon: '🛂', label: 'gov.uk emergency travel document', url: 'https://www.gov.uk/emergency-travel-document' },
            { icon: '👮', label: 'Met Police lost property', url: 'https://www.met.police.uk/ro/report/lostproperty/v2/about-this-service/' },
            { icon: '🚇', label: 'TfL lost property', url: 'https://tfl.gov.uk/travel-information/lost-property/' },
            { icon: '🎣', label: 'Action Fraud — report scams', url: 'https://www.actionfraud.police.uk/' },
            { icon: '🏥', label: 'NHS 111 online', url: 'https://111.nhs.uk/' },
            { icon: '💸', label: 'Western Union emergency transfer', url: 'https://www.westernunion.com/' },
          ].map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', border: '1px solid rgba(26,26,46,0.1)', borderRadius: '12px', padding: '14px 18px', textDecoration: 'none' }}>
              <span style={{ fontSize: '1.3rem' }}>{link.icon}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1a1a2e' }}>{link.label} →</span>
            </a>
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
