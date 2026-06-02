'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeUp, GoldLine, SlideLeft, SlideRight, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation';

const CATEGORY_CARDS = [
  { label: 'Best Places', sub: 'Top attractions, hidden gems & photo spots', href: '/places', emoji: '🏛️', image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { label: 'Food & Drinks', sub: 'Restaurants, halal food & local favourites', href: '/food', emoji: '🍽️', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { label: 'Shopping', sub: 'Luxury streets, markets & hidden gems', href: '/shopping', emoji: '🛍️', image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { label: 'Transport', sub: 'Tube, bus, taxi & travel tips', href: '/transport', emoji: '🚇', image: 'https://images.pexels.com/photos/5765/london-street-landmark-double-decker.jpg?auto=compress&cs=tinysrgb&w=640' },
  { label: 'Kids & Family', sub: 'Attractions, parks & family fun', href: '/kids', emoji: '👨‍👩‍👧‍👦', image: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { label: 'Nightlife', sub: 'Rooftop bars, clubs & live music', href: '/nightlife', emoji: '🌙', image: 'https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { label: 'Muslim Guide', sub: 'Halal food, mosques & prayer rooms', href: '/muslim', emoji: '🕌', image: 'https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { label: 'Emergency Help', sub: 'Safety tips, scam alerts & emergency numbers', href: '/emergency', emoji: '🚨', image: 'https://images.pexels.com/photos/63901/pexels-photo-63901.jpeg?auto=compress&cs=tinysrgb&w=640' },
];

const HOW_IT_WORKS = [
  { icon: '📱', title: 'Tap the souvenir', desc: 'Hold your phone near the TAP LONDON NFC product — keyring, card, tote bag, or coaster.' },
  { icon: '🌐', title: 'Open the guide', desc: 'Your browser opens taplondon.co.uk instantly. No app, no login, no delay.' },
  { icon: '🗺️', title: 'Choose a section', desc: 'Find places, food, shopping, transport, or emergency help in seconds.' },
  { icon: '🎉', title: 'Enjoy London', desc: 'Use real directions, trusted tips, halal guides and future partner discounts.' },
];

const STATS = [
  { number: '50+', label: 'Places' },
  { number: '30+', label: 'Restaurants' },
  { number: '8', label: 'Languages' },
  { number: '24/7', label: 'AI Guide' },
];

export default function HomePage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ overflowX: 'hidden', width: '100%' }}>

      {/* HERO */}
      <section style={{
        position: 'relative', minHeight: '100vh', width: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', textAlign: 'center',
        padding: '0 20px', boxSizing: 'border-box',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1280')`,
          backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.75) 100%)',
          zIndex: 1,
        }} />

        <motion.div
          style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '700px' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 40 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'inline-block',
              background: 'rgba(201,168,76,0.18)', border: '1px solid #c9a84c',
              color: '#c9a84c', borderRadius: '40px', padding: '6px 18px',
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1.5px',
              marginBottom: '20px', textTransform: 'uppercase' as const,
            }}
          >
            🗺️ Smart NFC Tourist Guide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 700, color: '#ffffff', lineHeight: 1.1,
              margin: '0 0 16px 0',
            }}
          >
            Welcome to London
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              color: 'rgba(255,255,255,0.85)', marginBottom: '8px',
            }}
          >
            TAP LONDON — Tap. Explore. Enjoy.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '36px',
            }}
          >
            Your smart guide to the greatest city in the world
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link href="/places" style={{
              background: '#c9a84c', color: '#1a1a2e', padding: '14px 32px',
              borderRadius: '50px', fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
              display: 'inline-block',
            }}>
              Explore London →
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '1.4rem' }}
          >
            ↓
          </motion.span>
        </motion.div>
      </section>

      {/* STATS */}
      <section style={{
        background: '#1a1a2e', padding: '28px 16px',
        width: '100%', boxSizing: 'border-box',
      }}>
        <div style={{
          maxWidth: '800px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px',
        }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ textAlign: 'center', padding: '12px 2px' }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.4rem, 4.5vw, 2.4rem)',
                fontWeight: 700, color: '#c9a84c', lineHeight: 1,
              }}>
                {stat.number}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(0.58rem, 1.8vw, 0.75rem)',
                color: 'rgba(249,247,242,0.5)', marginTop: '4px',
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="bg-[#f9f7f2] dark:bg-[#0d0d1a]" style={{ padding: '56px 20px', width: '100%', boxSizing: 'border-box' as const }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{
              textAlign: 'center', fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75rem', color: '#c9a84c', fontWeight: 600,
              letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '12px',
            }}>
              Everything you need
            </p>
            <h2 className="text-navy dark:text-[#f9f7f2]" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              textAlign: 'center', marginBottom: '40px', fontWeight: 700,
            }}>
              One tap. All of London.
            </h2>
          </FadeUp>
          <GoldLine />
          <StaggerContainer
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}
            staggerDelay={0.08}
          >
            {CATEGORY_CARDS.map((card) => (
              <StaggerItem key={card.href}>
                <Link href={card.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'relative', borderRadius: '16px',
                      overflow: 'hidden', height: '200px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.12)', cursor: 'pointer',
                      background: 'transparent',
                    }}
                  >
                    <img src={card.image} alt={card.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, filter: 'none' }} className="!brightness-100" />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 40%, transparent 100%)',
                    }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px' }}>
                      <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{card.emoji}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '3px' }}>
                        {card.label}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)' }}>
                        {card.sub} →
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: '#1a1a2e', padding: '56px 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{
              textAlign: 'center', fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75rem', color: '#c9a84c', fontWeight: 600,
              letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '12px',
            }}>
              Smart NFC Souvenir
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: '#ffffff', textAlign: 'center', marginBottom: '40px', fontWeight: 700,
            }}>
              A souvenir that opens the city
            </h2>
          </FadeUp>
          <StaggerContainer
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}
            staggerDelay={0.12}
          >
            {HOW_IT_WORKS.map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '14px', padding: '24px 16px', textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 700, color: '#c9a84c', marginBottom: '8px' }}>
                    {item.title}
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-[#f9f7f2] dark:bg-[#0d0d1a]" style={{ padding: '56px 20px', width: '100%', boxSizing: 'border-box' as const }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <SlideLeft>
            <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '20px', fontWeight: 700 }}>
              About TAP LONDON
            </h2>
          </SlideLeft>
          <SlideRight delay={0.1}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '16px' }}>
              TAP LONDON turns a physical London souvenir into a smart travel companion. Tourists tap an NFC keyring, tote bag, card, or coaster and instantly land on a mobile guide built for the moment.
            </p>
          </SlideRight>
          <SlideLeft delay={0.2}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '32px' }}>
              No app download. No account. No friction. Just tap, explore, and enjoy London — including a dedicated Muslim Tourist Guide and Tourist Emergency Help.
            </p>
          </SlideLeft>
          <FadeUp delay={0.3}>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/places" style={{ background: '#1a1a2e', color: '#c9a84c', padding: '12px 28px', borderRadius: '50px', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                Explore London
              </Link>
              <Link href="/emergency" className="text-navy dark:text-cream border-navy dark:border-cream" style={{ background: 'transparent', padding: '12px 28px', borderRadius: '50px', border: '2px solid', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                🚨 Emergency Help
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </main>
  );
}
