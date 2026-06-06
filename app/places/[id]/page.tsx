"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import placesJson from "@/data/places.json";

const PLACE_HISTORY: Record<string, { founded: string; history: string; facts: string[] }> = {
  "tower-of-london": { founded: "Founded 1066 by William the Conqueror", history: "The Tower of London was built in the 1070s by William the Conqueror following his victory at the Battle of Hastings. Built from limestone imported from Caen in Normandy, it took nearly 20 years to complete. The Tower has served as a royal palace, political prison, place of execution, royal mint, menagerie, and arsenal. Its most famous prisoners include Anne Boleyn, Thomas More, and Lady Jane Grey. Today it houses the Crown Jewels.", facts: ["Built in the 1070s by William the Conqueror", "The White Tower took nearly 20 years to complete", "Only 7 people were ever executed inside the Tower walls", "At least 6 ravens must live here by royal decree", "The Crown Jewels have been stored here since the 17th century", "2,817,852 visitors came in 2025"] },
  "tower-bridge": { founded: "Built 1886-1894; opened 30 June 1894", history: "Tower Bridge was built between 1886 and 1894, opened by the Prince of Wales on 30 June 1894. Its Gothic Revival towers were designed to complement the nearby Tower of London. Originally powered by steam hydraulics, converted to electricity in 1976. The bridge opens around 800-900 times per year.", facts: ["Built between 1886 and 1894 — took 8 years", "Over 11,000 tonnes of steel in the skeleton", "Originally powered by steam hydraulics", "The bascules rise to 86 degrees in 5 minutes", "Glass floor panels installed in 2014"] },
  "buckingham-palace": { founded: "Built 1703; became royal residence 1837", history: "Buckingham Palace began as Buckingham House, built in 1703 for the Duke of Buckingham. King George III purchased it in 1761. Queen Victoria was the first monarch to use it as the official royal London residence in 1837. The palace has 775 rooms, including 19 State Rooms and 78 bathrooms.", facts: ["Originally Buckingham House, built in 1703", "Queen Victoria was the first monarch to live here in 1837", "The palace has 775 rooms and 78 bathrooms", "The garden covers 39 acres", "Around 50,000 people visit as guests each year"] },
  "big-ben": { founded: "Clock tower completed 1858; renamed Elizabeth Tower 2012", history: "The Elizabeth Tower was completed in 1858 as part of the rebuilt Palace of Westminster. 'Big Ben' technically refers only to the largest bell inside, which weighs 13.7 tonnes. Renamed the Elizabeth Tower in 2012 to mark Queen Elizabeth II's Diamond Jubilee.", facts: ["Big Ben is the name of the bell, not the tower", "The main bell weighs 13.7 tonnes", "Clock faces are 7 metres in diameter", "Renamed Elizabeth Tower in 2012", "Restored between 2017 and 2022 for £79 million"] },
  "british-museum": { founded: "Founded 1753; opened to public 1759", history: "The British Museum was founded in 1753, making it the world's first public national museum. The current building was designed by Sir Robert Smirke between 1823 and 1852. The Great Court, designed by Sir Norman Foster, opened in 2000.", facts: ["World's first public national museum, founded 1753", "Over 8 million objects in the collection", "The Rosetta Stone has been on display since 1802", "Around 6 million visitors per year", "Admission has been free since 2001"] },
  "hyde-park": { founded: "Royal park since 1536; opened to public in 17th century", history: "Hyde Park was seized by Henry VIII from Westminster Abbey in 1536. The Great Exhibition of 1851 was held here in the Crystal Palace. The Serpentine lake was created in 1730 by Queen Caroline.", facts: ["Seized by Henry VIII from Westminster Abbey in 1536", "Covers 350 acres", "The Serpentine lake was created in 1730", "Speakers' Corner has been a free speech site since 1872"] },
  "tate-modern": { founded: "Opened 11 May 2000 in converted Bankside Power Station", history: "Tate Modern opened in 2000 in the converted Bankside Power Station. Swiss architects Herzog & de Meuron won the conversion competition. The Turbine Hall — 155 metres long — hosts major art installations.", facts: ["Opened 11 May 2000", "The Turbine Hall is 155 metres long and 35 metres tall", "Around 6 million visitors per year", "Admission to permanent collection is free"] },
  "kew-gardens": { founded: "Founded 1759; UNESCO World Heritage Site 2003", history: "The Royal Botanic Gardens, Kew, were founded in 1759 by Princess Augusta. In 2003, Kew Gardens was designated a UNESCO World Heritage Site. Today it holds over 50,000 plant species.", facts: ["Founded in 1759 by Princess Augusta", "UNESCO World Heritage Site since 2003", "Over 50,000 plant species", "Covers 132 hectares (326 acres)"] },
};

function PhotoGallery({ photos, name }: { photos: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3", position: "relative", background: "#1a1a2e", marginBottom: "10px" }}>
        <img key={active} src={photos[active]} alt={`${name} ${active + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {active > 0 && (
          <button onClick={() => setActive(active - 1)} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", width: "36px", height: "36px", borderRadius: "50%", fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
        )}
        {active < photos.length - 1 && (
          <button onClick={() => setActive(active + 1)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", width: "36px", height: "36px", borderRadius: "50%", fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
        )}
        <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(0,0,0,0.6)", color: "#fff", borderRadius: "20px", padding: "3px 10px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600 }}>
          {active + 1} / {photos.length}
        </div>
      </div>
      {photos.length > 1 && (
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
          {photos.map((p, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ flexShrink: 0, width: "72px", height: "54px", borderRadius: "8px", overflow: "hidden", padding: 0, border: i === active ? "2.5px solid #c9a84c" : "2.5px solid transparent", cursor: "pointer", opacity: i === active ? 1 : 0.6 }}>
              <img src={p} alt={`${name} ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PlaceDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [place, setPlace] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Try Firebase first
        const firebaseDoc = await getDoc(doc(db, "places", id));
        if (firebaseDoc.exists()) {
          setPlace({ id: firebaseDoc.id, ...firebaseDoc.data() });
        } else {
          // Fallback to JSON
          const found = (placesJson.items as any[]).find((p: any) => p.id === id);
          setPlace(found || null);
        }
      } catch {
        // Fallback to JSON
        const found = (placesJson.items as any[]).find((p: any) => p.id === id);
        setPlace(found || null);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f7f2" }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(26,26,46,0.4)", fontSize: "0.9rem" }}>Loading...</div>
    </div>
  );

  if (!place) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f9f7f2", gap: "16px" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#1a1a2e" }}>Place not found</div>
      <Link href="/places" style={{ color: "#c9a84c", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>← Back to Places</Link>
    </div>
  );

  const history = PLACE_HISTORY[place.id];
  // Use gallery from Firebase if available, else fallback photos
  const photos = (place.gallery && place.gallery.length > 0)
    ? [place.image, ...place.gallery].filter(Boolean)
    : [place.image].filter(Boolean);

  return (
    <main className="bg-[#f9f7f2] dark:bg-[#0d0d1a]" style={{ minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ position: "relative", height: "44vh", minHeight: "250px", overflow: "hidden" }}>
        <img src={place.image} alt={place.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(26,26,46,0.88) 100%)" }} />
        <Link href="/places" style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", borderRadius: "50px", padding: "7px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>
          ← Back
        </Link>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px 20px" }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c", borderRadius: "50px", padding: "3px 12px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" as const, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>
            {place.category}
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.7rem, 5.5vw, 2.8rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: "0 0 4px 0" }}>
            {place.name}
          </h1>
          {history && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(201,168,76,0.85)", margin: 0 }}>
              🏛️ {history.founded}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 16px 60px" }}>

        <PhotoGallery photos={photos} name={place.name} />

        {/* Quick Info */}
        <div className="bg-white dark:bg-[#1a1a2e] border border-navy/10 dark:border-gold/20" style={{ borderRadius: "16px", padding: "18px 20px", marginBottom: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "12px" }}>
          {place.area && (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>📍</span>
              <div>
                <div className="text-[#888] dark:text-[#aaa]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Area</div>
                <div className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 600 }}>{place.area}</div>
              </div>
            </div>
          )}
          {place.openingHours && (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>🕐</span>
              <div>
                <div className="text-[#888] dark:text-[#aaa]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Opening Hours</div>
                <div className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 600, lineHeight: 1.4 }}>{place.openingHours}</div>
              </div>
            </div>
          )}
          {place.entryFee && (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>{place.priceType === "Free" ? "🎁" : "💷"}</span>
              <div>
                <div className="text-[#888] dark:text-[#aaa]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Entry</div>
                <div className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 600 }}>{place.entryFee}</div>
              </div>
            </div>
          )}
          {/* Special offer badge */}
          {place.offerTag && (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "1rem" }}>🏷️</span>
              <div style={{ background: "linear-gradient(135deg, #c9a84c, #f0d07a)", color: "#1a1a2e", borderRadius: "20px", padding: "4px 14px", fontSize: "0.76rem", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
                Special Offer Available
              </div>
            </div>
          )}
        </div>

        {/* About */}
        <div className="bg-white dark:bg-[#1a1a2e] border border-navy/10 dark:border-gold/20" style={{ borderRadius: "16px", padding: "20px", marginBottom: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>About {place.name}</h2>
          <p className="text-[#444] dark:text-[#ccc]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, margin: 0 }}>{place.description}</p>
        </div>

        {/* History */}
        {history && (
          <div style={{ background: "#1a1a2e", borderRadius: "16px", padding: "20px", marginBottom: "18px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#c9a84c", marginBottom: "10px", marginTop: 0 }}>📜 History</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, margin: 0 }}>{history.history}</p>
          </div>
        )}

        {/* Facts */}
        {history && (
          <div className="bg-white dark:bg-[#1a1a2e] border border-navy/10 dark:border-gold/20" style={{ borderRadius: "16px", padding: "20px", marginBottom: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "14px", marginTop: 0 }}>⭐ Fascinating Facts</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {history.facts.map((fact, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(201,168,76,0.15)", color: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>{i + 1}</div>
                  <p className="text-[#444] dark:text-[#ccc]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", lineHeight: 1.6, margin: 0 }}>{fact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="dark:bg-[#1a1a2e] dark:border-gold/20" style={{ background: "rgba(201,168,76,0.08)", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(201,168,76,0.2)" }}>
          <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px", marginTop: 0 }}>💡 Visitor Tips</h2>
          {["Book tickets online in advance to skip the queue", "Visit on weekday mornings for smaller crowds", "Check the official website for seasonal opening changes", "Nearest tube station is usually a short walk away"].map((tip, i) => (
            <p key={i} className="text-[#555] dark:text-[#bbb]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", lineHeight: 1.6, margin: "0 0 6px 0", display: "flex", gap: "8px" }}>
              <span style={{ color: "#c9a84c", fontWeight: 700 }}>✓</span> {tip}
            </p>
          ))}
        </div>

        {/* Directions */}
        {place.mapsUrl && (
          <a href={place.mapsUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "#1a1a2e", color: "#c9a84c", padding: "15px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", marginBottom: "12px", boxSizing: "border-box" as const }}>
            📍 Get Directions on Google Maps
          </a>
        )}
        <Link href="/places" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "transparent", padding: "13px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", boxSizing: "border-box" as const, border: "2px solid" }} className="text-navy dark:text-[#f9f7f2] border-navy dark:border-[#f9f7f2]">
          ← Back to All Places
        </Link>
      </div>
    </main>
  );
}
