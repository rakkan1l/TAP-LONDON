'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeUp, SlideLeft, SlideRight, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation';

const CATEGORY_CARDS = [
  { label: 'Best Places', sub: 'Top attractions, hidden gems & photo spots', href: '/places', image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', accent: '#c9a84c' },
  { label: 'Food & Drinks', sub: 'Restaurants, halal food & local favourites', href: '/food', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', accent: '#d4956a' },
  { label: 'Shopping', sub: 'Luxury streets, markets & hidden gems', href: '/shopping', image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800', accent: '#9ab8d4' },
  { label: 'Transport', sub: 'Tube, bus, taxi & travel tips', href: '/transport', image: 'https://images.pexels.com/photos/5765/london-street-landmark-double-decker.jpg?auto=compress&cs=tinysrgb&w=800', accent: '#c94c4c' },
  { label: 'Kids & Family', sub: 'Attractions, parks & family fun', href: '/kids', image: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800', accent: '#7ac9a0' },
  { label: 'Nightlife', sub: 'Rooftop bars, clubs & live music', href: '/nightlife', image: 'https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800', accent: '#a884c9' },
  { label: 'Muslim Guide', sub: 'Halal food, mosques & prayer rooms', href: '/muslim', image: 'https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=800', accent: '#84c9b8' },
  { label: 'Emergency Help', sub: 'Safety tips, scam alerts & emergency numbers', href: '/emergency', image: 'https://images.pexels.com/photos/63901/pexels-photo-63901.jpeg?auto=compress&cs=tinysrgb&w=800', accent: '#c94c4c' },
];

const HOW_IT_WORKS = [
  { icon: '📱', title: 'Tap the souvenir', desc: 'Hold your phone near the TAP LONDON NFC product — keyring, card, tote bag, or coaster.', step: '01' },
  { icon: '🌐', title: 'Open the guide', desc: 'Your browser opens taplondon.co.uk instantly. No app, no login, no delay.', step: '02' },
  { icon: '🗺️', title: 'Choose a section', desc: 'Find places, food, shopping, transport, or emergency help in seconds.', step: '03' },
  { icon: '🎉', title: 'Enjoy London', desc: 'Use real directions, trusted tips, halal guides and future partner discounts.', step: '04' },
];

const STATS = [
  { number: '50+', label: 'Curated Places' },
  { number: '35+', label: 'Restaurants' },
  { number: '12', label: 'Languages' },
  { number: '24/7', label: 'AI Guide' },
];

const FEATURED_SPOTS = [
  { name: 'Tower Bridge', tag: 'Iconic', image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Notting Hill', tag: 'Neighbourhood', image: 'https://images.pexels.com/photos/1796735/pexels-photo-1796735.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Borough Market', tag: 'Food & Drink', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ overflowX: 'hidden', width: '100%' }}>

      {/* ══════════════════════════ HERO */}
      <section ref={heroRef} style={{
        position: 'relative', height: '100vh', width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', textAlign: 'center',
      }}>
        {/* Parallax background */}
        <motion.div style={{
          position: 'absolute', inset: '-10%',
          y: heroY, scale: heroScale,
          backgroundImage: `url('https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
        }} />
        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(135deg, rgba(26,26,46,0.72) 0%, rgba(0,0,0,0.25) 50%, rgba(26,26,46,0.62) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, transparent 30%, rgba(26,26,46,0.97) 100%)' }} />

        {/* Decorative gold rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: visible ? 0.13 : 0, scale: 1 }}
          transition={{ duration: 2.5, delay: 0.6 }}
          style={{ position: 'absolute', zIndex: 2, width: 'clamp(320px, 55vw, 640px)', height: 'clamp(320px, 55vw, 640px)', border: '1px solid #c9a84c', borderRadius: '50%', pointerEvents: 'none' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: visible ? 0.06 : 0, scale: 1 }}
          transition={{ duration: 2.5, delay: 0.85 }}
          style={{ position: 'absolute', zIndex: 2, width: 'clamp(520px, 82vw, 940px)', height: 'clamp(520px, 82vw, 940px)', border: '1px solid #c9a84c', borderRadius: '50%', pointerEvents: 'none' }}
        />

        {/* Hero content */}
        <motion.div
          style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '780px', padding: '0 24px', boxSizing: 'border-box' as const, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 64 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glowing badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              background: 'rgba(201,168,76,0.11)', border: '1px solid rgba(201,168,76,0.38)',
              color: '#c9a84c', borderRadius: '40px', padding: '7px 20px',
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px',
              marginBottom: '30px', textTransform: 'uppercase' as const,
              backdropFilter: 'blur(10px)', fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c9a84c', display: 'inline-block', boxShadow: '0 0 8px #c9a84c, 0 0 16px rgba(201,168,76,0.5)' }} />
            Smart NFC Tourist Guide
          </motion.div>

          {/* Big heading */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35 }}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3rem, 10vw, 6.8rem)',
              fontWeight: 700, color: '#ffffff', lineHeight: 0.93,
              margin: '0 0 6px', letterSpacing: '-1.5px',
            }}>
              Welcome to
            </h1>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3rem, 10vw, 6.8rem)',
              fontWeight: 700, lineHeight: 0.93,
              margin: '0 0 30px', letterSpacing: '-1.5px',
              background: 'linear-gradient(135deg, #c9a84c 0%, #f0d07a 45%, #c9a84c 72%, #9a6e28 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              London
            </h1>
          </motion.div>

          {/* Gold line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            style={{ width: '48px', height: '2px', background: 'linear-gradient(90deg, #c9a84c, #f0d07a)', margin: '0 auto 26px', transformOrigin: 'center', borderRadius: '2px' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.93rem, 2.4vw, 1.15rem)', color: 'rgba(255,255,255,0.68)', maxWidth: '460px', margin: '0 auto 42px', lineHeight: 1.65 }}
          >
            Your smart guide to the greatest city in the world — tap, explore, enjoy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78 }}
            style={{ display: 'flex', gap: '13px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/places" style={{
              background: 'linear-gradient(135deg, #c9a84c 0%, #f0d07a 100%)',
              color: '#1a1a2e', padding: '15px 40px', borderRadius: '3px',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.88rem',
              textDecoration: 'none', letterSpacing: '0.3px',
              boxShadow: '0 8px 32px rgba(201,168,76,0.42), 0 2px 8px rgba(0,0,0,0.2)',
            }}>
              Explore London
            </Link>
            <Link href="/muslim" style={{
              background: 'rgba(255,255,255,0.07)', color: '#ffffff',
              padding: '15px 40px', borderRadius: '3px',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.88rem',
              textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(10px)',
            }}>
              Muslim Guide
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{ position: 'absolute', bottom: '34px', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.56rem', color: 'rgba(255,255,255,0.26)', letterSpacing: '3px', textTransform: 'uppercase' as const }}>Scroll</span>
          <motion.div
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)', borderRadius: '2px' }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════ STATS */}
      <section style={{ background: '#1a1a2e', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)', width: '100%' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ textAlign: 'center', padding: '28px 12px', borderRight: i < 3 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 4.5vw, 2.6rem)', fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}>{stat.number}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.56rem, 1.4vw, 0.68rem)', color: 'rgba(249,247,242,0.36)', marginTop: '5px', letterSpacing: '1.2px', textTransform: 'uppercase' as const }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ FEATURED SPOTS */}
      <section className="bg-[#f9f7f2] dark:bg-[#0d0d1a]" style={{ padding: '80px 20px 0', width: '100%', boxSizing: 'border-box' as const }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const, marginBottom: '8px' }}>Featured</p>
                <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, margin: 0, lineHeight: 1.1 }}>London Icons</h2>
              </div>
              <Link href="/places" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.76rem', color: '#c9a84c', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.2px', display: 'flex', alignItems: 'center', gap: '5px', paddingBottom: '3px', borderBottom: '1px solid rgba(201,168,76,0.3)' }}>
                View all places →
              </Link>
            </div>
          </FadeUp>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '80px' }}>
            {FEATURED_SPOTS.map((spot, i) => (
              <motion.div
                key={spot.name}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{
                  position: 'relative', borderRadius: '2px', overflow: 'hidden', cursor: 'pointer',
                  height: i === 0 ? 'clamp(240px, 28vw, 360px)' : 'clamp(180px, 20vw, 260px)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.13)',
                }}
              >
                <img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.74) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(201,168,76,0.93)', color: '#1a1a2e', padding: '3px 10px', borderRadius: '2px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.58rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' as const }}>{spot.tag}</div>
                <div style={{ position: 'absolute', bottom: '18px', left: '18px' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 2.2vw, 1.45rem)', fontWeight: 700, color: '#ffffff' }}>{spot.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CATEGORY GRID */}
      <section className="bg-[#f9f7f2] dark:bg-[#0d0d1a]" style={{ padding: '0 20px 88px', width: '100%', boxSizing: 'border-box' as const }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const, marginBottom: '10px' }}>Everything you need</p>
              <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, margin: 0 }}>One tap. All of London.</h2>
            </div>
          </FadeUp>

          <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))', gap: '12px' }} staggerDelay={0.055}>
            {CATEGORY_CARDS.map((card, i) => (
              <StaggerItem key={card.href}>
                <Link href={card.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.div
                    whileHover={{ y: -7, scale: 1.015 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'relative', borderRadius: '2px', overflow: 'hidden', height: '220px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                  >
                    <img src={card.image} alt={card.label} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,18,0.92) 0%, rgba(8,8,18,0.12) 50%, transparent 100%)' }} />
                    {/* Number */}
                    <div style={{ position: 'absolute', top: '13px', right: '13px', fontFamily: "'Cormorant Garamond', serif", fontSize: '0.76rem', color: 'rgba(201,168,76,0.4)', fontWeight: 700 }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 16px' }}>
                      <div style={{ width: '20px', height: '2px', background: card.accent, marginBottom: '10px', borderRadius: '1px' }} />
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.22rem', fontWeight: 700, color: '#ffffff', marginBottom: '5px', lineHeight: 1.15 }}>{card.label}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.67rem', color: 'rgba(255,255,255,0.48)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {card.sub} <span style={{ color: card.accent, fontSize: '0.78rem' }}>→</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════ HOW IT WORKS */}
      <section style={{ background: '#1a1a2e', padding: '88px 20px', width: '100%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-180px', top: '-180px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '-120px', bottom: '-100px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const, marginBottom: '10px' }}>How it works</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#ffffff', fontWeight: 700, margin: '0 0 14px' }}>A souvenir that opens the city</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.86rem', color: 'rgba(255,255,255,0.38)', maxWidth: '380px', margin: '0 auto' }}>Tap any TAP LONDON product and unlock the full city guide instantly.</p>
            </div>
          </FadeUp>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(201,168,76,0.07)' }}>
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ background: 'rgba(201,168,76,0.055)' } as any}
                style={{ background: '#1a1a2e', padding: '38px 26px', textAlign: 'center', transition: 'background 0.3s' }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: 'rgba(201,168,76,0.09)', fontWeight: 700, lineHeight: 1, marginBottom: '2px' }}>{item.step}</div>
                <div style={{ fontSize: '1.85rem', marginBottom: '14px', marginTop: '-4px' }}>{item.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 700, color: '#c9a84c', marginBottom: '10px' }}>{item.title}</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.76rem', color: 'rgba(255,255,255,0.46)', lineHeight: 1.72, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ ABOUT */}
      <section className="bg-[#f9f7f2] dark:bg-[#0d0d1a]" style={{ padding: '88px 20px', width: '100%', boxSizing: 'border-box' as const }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '72px', alignItems: 'center' }}>
          <div>
            <SlideLeft>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const, marginBottom: '12px' }}>About</p>
              <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 700, margin: '0 0 24px', lineHeight: 1.15 }}>
                Built for the<br />modern traveller
              </h2>
              <div style={{ width: '40px', height: '2px', background: '#c9a84c', marginBottom: '24px', borderRadius: '2px' }} />
              <p className="text-ink/70 dark:text-[#f9f7f2]/60" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', lineHeight: 1.85, marginBottom: '16px' }}>
                TAP LONDON turns a physical London souvenir into a smart travel companion. Tourists tap an NFC keyring, tote bag, card, or coaster and instantly land on a mobile guide built for the moment.
              </p>
              <p className="text-ink/70 dark:text-[#f9f7f2]/60" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', lineHeight: 1.85, marginBottom: '36px' }}>
                No app download. No account. No friction. Just tap, explore, and enjoy London — including a dedicated Muslim Tourist Guide and Tourist Emergency Help.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/places" style={{ background: '#1a1a2e', color: '#c9a84c', padding: '13px 30px', borderRadius: '3px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.84rem', textDecoration: 'none' }}>
                  Explore London
                </Link>
                <Link href="/emergency" className="text-navy dark:text-cream" style={{ background: 'transparent', padding: '13px 30px', borderRadius: '3px', border: '1.5px solid currentColor', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.84rem', textDecoration: 'none' }}>
                  Emergency Help
                </Link>
              </div>
            </SlideLeft>
          </div>

          <SlideRight delay={0.15}>
            <div style={{ position: 'relative', height: '420px' }}>
              <motion.div
                initial={{ opacity: 0, x: 36, rotate: 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ position: 'absolute', right: 0, top: 0, width: '74%', height: '290px', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
              >
                <img src="https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=600" alt="London" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -28, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                style={{ position: 'absolute', left: 0, bottom: 0, width: '63%', height: '232px', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', border: '3px solid #f9f7f2' }}
              >
                <img src="https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Tower Bridge" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.42 }}
                style={{ position: 'absolute', bottom: '54px', right: '18px', width: '54px', height: '54px', background: 'linear-gradient(135deg, #c9a84c, #f0d07a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', boxShadow: '0 8px 24px rgba(201,168,76,0.45)' }}
              >
                🗺️
              </motion.div>
            </div>
          </SlideRight>
        </div>
      </section>

    </main>
  );
}
