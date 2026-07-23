'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type QuizOption = {
  label: string;
  icon: string;
  results: { label: string; href: string; icon: string }[];
};

const QUESTIONS: QuizOption[] = [
  {
    label: 'I have 1 day in London',
    icon: '⏱️',
    results: [
      { label: 'Top Attractions', href: '/places', icon: '🏛️' },
      { label: 'Quick Eats', href: '/food', icon: '🍽️' },
      { label: "Today's Offers", href: '/offers', icon: '🏷️' },
    ],
  },
  {
    label: 'First time in London',
    icon: '👋',
    results: [
      { label: 'Must-See Places', href: '/places', icon: '🏛️' },
      { label: 'Transport Guide', href: '/transport', icon: '🚇' },
      { label: 'Emergency Info', href: '/emergency', icon: '🚨' },
    ],
  },
  {
    label: 'London with kids',
    icon: '👨‍👩‍👧',
    results: [
      { label: 'Kids & Family', href: '/kids', icon: '👨‍👩‍👧' },
      { label: 'Family Hotels', href: '/hotels', icon: '🏨' },
      { label: 'Free Things to Do', href: '/places', icon: '🎈' },
    ],
  },
  {
    label: 'Cheap London',
    icon: '💷',
    results: [
      { label: 'Best Offers', href: '/offers', icon: '🏷️' },
      { label: 'Free Places', href: '/places', icon: '🆓' },
      { label: 'Budget Hotels', href: '/hotels', icon: '🏨' },
    ],
  },
  {
    label: 'Luxury London',
    icon: '💎',
    results: [
      { label: '5-Star Hotels', href: '/hotels', icon: '🏨' },
      { label: 'Fine Dining', href: '/food', icon: '🍽️' },
      { label: 'Trending Now', href: '/trending', icon: '🔥' },
    ],
  },
  {
    label: 'Hidden gems only',
    icon: '💎',
    results: [
      { label: 'Hidden Gems', href: '/hidden-gems', icon: '💎' },
      { label: 'Secret Food Spots', href: '/food', icon: '🍽️' },
      { label: 'Off the Beaten Path', href: '/places', icon: '🗺️' },
    ],
  },
];

export default function LondonQuiz() {
  const [selected, setSelected] = useState<QuizOption | null>(null);

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}>
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
                  key={q.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(q)}
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
                onClick={() => setSelected(null)}
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
                {selected.icon} Perfect for you
              </h2>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px'
            }}>
              {selected.results.map((r, i) => (
                <motion.div
                  key={r.href + r.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={r.href} style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
                        border: '1px solid rgba(201,168,76,0.35)', borderRadius: '16px',
                        padding: '22px 16px', textAlign: 'center' as const, cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{r.icon}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem',
                        fontWeight: 700, color: '#fff'
                      }}>{r.label}</div>
                      <div style={{
                        marginTop: '8px', color: '#c9a84c', fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.72rem', fontWeight: 700
                      }}>Explore →</div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
