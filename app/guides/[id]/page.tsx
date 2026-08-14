'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fetchDocument } from '@/lib/firestore';

export default function GuideDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [guide, setGuide] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const fbItem = await fetchDocument("guides", id);
      if (fbItem && fbItem.name) {
        setGuide(fbItem);
      } else {
        setGuide(null);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(26,26,46,0.4)' }}>Loading...</div>
    </div>
  );

  if (!guide) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem' }}>Guide not found</div>
      <Link href="/guides" style={{ color: '#c9a84c' }}>← Back to Guides</Link>
    </div>
  );

  const contentLines: string[] = (guide.content || '').split('\\n').filter(Boolean);

  return (
    <main className="bg-[#f9f7f2] dark:bg-[#0d0d1a]" style={{ minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '40vh', minHeight: '260px', overflow: 'hidden', background: '#1a1a2e' }}>
        <img src={guide.image} alt={guide.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(26,26,46,0.9) 100%)' }} />

        <Link href="/guides" style={{
          position: 'absolute', top: '16px', left: '16px',
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)', color: '#fff',
          borderRadius: '50px', padding: '8px 16px',
          fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem', fontWeight: 600,
          textDecoration: 'none'
        }}>← Guides</Link>

        <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{guide.icon}</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 700, color: '#fff', margin: 0 }}>
            {guide.name}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 20px 80px' }}>
        <p className="text-[#555] dark:text-[#bbb]" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '1rem', lineHeight: 1.7, marginBottom: '28px' }}>
          {guide.description}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {contentLines.map((line, i) => {
            const match = line.match(/^(\d+)\.\s*(.+)/);
            const number = match ? match[1] : (i + 1);
            const text = match ? match[2] : line;
            const [title, ...rest] = text.split(' — ');
            return (
              <div key={i} className="bg-white dark:bg-[#1a1a2e]" style={{
                display: 'flex', gap: '14px', alignItems: 'flex-start',
                borderRadius: '12px', padding: '14px 18px',
                border: '1px solid rgba(201,168,76,0.12)'
              }}>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c9a84c, #f0d07a)',
                  color: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', fontWeight: 700, flexShrink: 0
                }}>{number}</div>
                <div>
                  <div className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.92rem', fontWeight: 700 }}>{title}</div>
                  {rest.length > 0 && (
                    <div className="text-[#666] dark:text-[#aaa]" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem', marginTop: '2px' }}>{rest.join(' — ')}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
