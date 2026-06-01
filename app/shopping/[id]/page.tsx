"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import shopping from "@/data/shopping.json";

type Props = { params: { id: string } };

const SHOPPING_PHOTOS: Record<string, string[]> = {
  "oxford-street": ["https://images.pexels.com/photos/17340069/pexels-photo-17340069.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "carnaby-street": ["https://images.pexels.com/photos/10865652/pexels-photo-10865652.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "harrods": ["https://images.pexels.com/photos/30847180/pexels-photo-30847180.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "liberty": ["https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "camden-market": ["https://images.pexels.com/photos/32604930/pexels-photo-32604930.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/19121495/pexels-photo-19121495.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "portobello-road-area": ["https://images.pexels.com/photos/18028809/pexels-photo-18028809.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "borough-market-shopping": ["https://images.pexels.com/photos/31270596/pexels-photo-31270596.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "fortnum-mason": ["https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800"],
};

// Famous shops inside each shopping area
const FAMOUS_SHOPS: Record<string, { name: string; type: string; hours: string; emoji: string }[]> = {
  "oxford-street": [
    { name: "Selfridges", type: "Luxury department store", hours: "Mon-Sat 9:30-21:00; Sun 11:30-18:00", emoji: "🏬" },
    { name: "Zara", type: "Fast fashion", hours: "Mon-Sat 10:00-21:00; Sun 12:00-18:00", emoji: "👗" },
    { name: "H&M Flagship", type: "High street fashion", hours: "Mon-Sat 9:00-21:00; Sun 11:00-18:00", emoji: "🛍️" },
    { name: "Nike Town", type: "Sportswear flagship", hours: "Mon-Sat 10:00-20:00; Sun 12:00-18:00", emoji: "👟" },
    { name: "John Lewis", type: "Department store", hours: "Mon-Sat 9:30-20:00; Sun 12:00-18:00", emoji: "🏪" },
    { name: "Primark Flagship", type: "Affordable fashion — largest in world", hours: "Mon-Sat 8:00-22:00; Sun 11:30-18:00", emoji: "🛒" },
  ],
  "carnaby-street": [
    { name: "Irregular Choice", type: "Quirky footwear and accessories", hours: "Mon-Sat 10:00-19:00; Sun 11:00-18:00", emoji: "👠" },
    { name: "Levi's", type: "Denim flagship", hours: "Mon-Sat 10:00-19:00; Sun 12:00-18:00", emoji: "👖" },
    { name: "Dr. Martens", type: "Iconic British boots", hours: "Mon-Sat 10:00-19:00; Sun 12:00-18:00", emoji: "🥾" },
    { name: "Liberty London", type: "Designer fabrics and gifts", hours: "Mon-Sat 10:00-20:00; Sun 12:00-18:00", emoji: "🌸" },
    { name: "Kiehl's", type: "Premium skincare", hours: "Mon-Sat 10:00-19:00; Sun 12:00-18:00", emoji: "🧴" },
  ],
  "harrods": [
    { name: "Food Halls", type: "World-famous luxury food and delicacies", hours: "Mon-Sat 10:00-21:00; Sun 11:30-18:00", emoji: "🍫" },
    { name: "Designer Fashion Floor", type: "Gucci, Prada, Chanel, Louis Vuitton", hours: "Mon-Sat 10:00-21:00; Sun 11:30-18:00", emoji: "👜" },
    { name: "Toy Kingdom", type: "Premium toys and collectibles", hours: "Mon-Sat 10:00-21:00; Sun 11:30-18:00", emoji: "🧸" },
    { name: "Beauty Hall", type: "Luxury cosmetics and fragrances", hours: "Mon-Sat 10:00-21:00; Sun 11:30-18:00", emoji: "💄" },
    { name: "Harrods Signature Bear Shop", type: "Famous Harrods teddy bears", hours: "Mon-Sat 10:00-21:00; Sun 11:30-18:00", emoji: "🐻" },
  ],
  "camden-market": [
    { name: "Stables Market", type: "Vintage clothing and antiques", hours: "Daily 10:00-18:00", emoji: "🐴" },
    { name: "Camden Lock Market", type: "Arts, crafts, street food", hours: "Daily 10:00-18:00", emoji: "🔒" },
    { name: "Electric Ballroom", type: "Vintage market on weekends", hours: "Sat-Sun 10:00-17:00", emoji: "⚡" },
    { name: "Global Street Food Area", type: "Food stalls from around the world", hours: "Daily 10:00-late", emoji: "🌍" },
    { name: "Rock & Metal Shops", type: "Music merchandise and accessories", hours: "Daily 10:00-18:00", emoji: "🎸" },
  ],
  "portobello-road-area": [
    { name: "Antique Dealers Section", type: "Silver, jewellery, furniture (Sat only)", hours: "Saturday 5:30-16:00", emoji: "🏺" },
    { name: "Vintage Clothing Stalls", type: "Retro fashion from all eras", hours: "Fri-Sat 9:00-18:00", emoji: "👒" },
    { name: "Fresh Produce Market", type: "Fruit, veg, flowers", hours: "Mon-Wed 9:00-18:00", emoji: "🥦" },
    { name: "Electric Cinema", type: "London's oldest working cinema nearby", hours: "Daily — check listings", emoji: "🎬" },
    { name: "Books and Records Stalls", type: "Second-hand books and vinyl", hours: "Sat 9:00-17:00", emoji: "📚" },
  ],
  "westfield-stratford": [
    { name: "John Lewis", type: "Department store", hours: "Mon-Sat 10:00-21:00; Sun 12:00-18:00", emoji: "🏬" },
    { name: "Zara", type: "Fashion", hours: "Mon-Sat 10:00-21:00; Sun 12:00-18:00", emoji: "👗" },
    { name: "Apple Store", type: "Tech flagship", hours: "Mon-Sat 10:00-21:00; Sun 12:00-18:00", emoji: "🍎" },
    { name: "H&M", type: "High street fashion", hours: "Mon-Sat 10:00-21:00; Sun 12:00-18:00", emoji: "🛍️" },
    { name: "The Village (Luxury)", type: "Hugo Boss, Calvin Klein, Coach", hours: "Mon-Sat 10:00-21:00; Sun 12:00-18:00", emoji: "💼" },
    { name: "Food Court", type: "Global cuisine, halal options available", hours: "Daily until 22:00", emoji: "🍜" },
  ],
};

function PhotoGallery({ photos, name }: { photos: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3", position: "relative", background: "#1a1a2e", marginBottom: "10px" }}>
        <img key={active} src={photos[active]} alt={`${name} ${active + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {active > 0 && <button onClick={() => setActive(active - 1)} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", width: "36px", height: "36px", borderRadius: "50%", fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>}
        {active < photos.length - 1 && <button onClick={() => setActive(active + 1)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", width: "36px", height: "36px", borderRadius: "50%", fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>}
        <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(0,0,0,0.6)", color: "#fff", borderRadius: "20px", padding: "3px 10px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600 }}>{active + 1} / {photos.length}</div>
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

export default function ShoppingDetailPage({ params }: Props) {
  const item = shopping.items.find((s) => s.id === params.id);
  if (!item) notFound();

  const photos = SHOPPING_PHOTOS[item.id] ?? [item.image];
  const shops = FAMOUS_SHOPS[item.id];

  return (
    <main style={{ minHeight: "100vh", background: "#f9f7f2" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "44vh", minHeight: "250px", overflow: "hidden" }}>
        <img src={photos[0]} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(26,26,46,0.88) 100%)" }} />
        <Link href="/shopping" style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", borderRadius: "50px", padding: "7px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>
          ← Back
        </Link>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px 20px" }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c", borderRadius: "50px", padding: "3px 12px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" as const, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>{item.section}</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.7rem, 5.5vw, 2.8rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: "0 0 4px 0" }}>
            🛍️ {item.name}
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(201,168,76,0.85)", margin: 0 }}>{item.type} · {item.location}</p>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 16px 60px" }}>
        <PhotoGallery photos={photos} name={item.name} />

        {/* Quick Info */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px 20px", marginBottom: "18px", border: "1px solid rgba(26,26,46,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "12px" }}>
          {item.location && <div style={{ display: "flex", gap: "10px" }}><span>📍</span><div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const }}>Location</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600 }}>{item.location}</div></div></div>}
          {item.openingHours && <div style={{ display: "flex", gap: "10px" }}><span>🕐</span><div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const }}>Opening Hours</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600, lineHeight: 1.5 }}>{item.openingHours}</div></div></div>}
          <div style={{ display: "flex", gap: "10px" }}><span>🏷️</span><div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const }}>Type</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600 }}>{item.type}</div></div></div>
        </div>

        {/* About */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(26,26,46,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px", marginTop: 0 }}>About {item.name}</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: 0 }}>{item.description}</p>
        </div>

        {/* Famous Shops Inside */}
        {shops && (
          <div style={{ background: "#1a1a2e", borderRadius: "16px", padding: "20px", marginBottom: "18px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#c9a84c", marginBottom: "16px", marginTop: 0 }}>
              🏪 Famous Shops Here
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {shops.map((shop, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "12px", padding: "14px 16px", border: "1px solid rgba(201,168,76,0.15)" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{shop.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 700, color: "#ffffff", marginBottom: "3px" }}>{shop.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(201,168,76,0.8)", marginBottom: "4px" }}>{shop.type}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", display: "flex", gap: "4px", alignItems: "center" }}>
                        <span>🕐</span> {shop.hours}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div style={{ background: "rgba(201,168,76,0.08)", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(201,168,76,0.2)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px", marginTop: 0 }}>💡 Shopping Tips</h2>
          {["Visit on weekdays to avoid weekend crowds", "Most shops open later on Sundays — check before going", "Oxford Street and Carnaby are best accessed via Oxford Circus Tube", "Bring a reusable bag — plastic bags charged in the UK", "VAT refund available for non-UK visitors at most large stores"].map((tip, i) => (
            <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "#555", lineHeight: 1.6, margin: "0 0 6px 0", display: "flex", gap: "8px" }}>
              <span style={{ color: "#c9a84c", fontWeight: 700 }}>✓</span> {tip}
            </p>
          ))}
        </div>

        {/* Maps */}
        {item.mapsUrl && (
          <a href={item.mapsUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "#1a1a2e", color: "#c9a84c", padding: "15px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", marginBottom: "12px", boxSizing: "border-box" as const }}>
            📍 Find on Google Maps
          </a>
        )}
        <Link href="/shopping" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "transparent", color: "#1a1a2e", padding: "13px", borderRadius: "50px", border: "2px solid #1a1a2e", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", boxSizing: "border-box" as const }}>
          ← Back to Shopping
        </Link>
      </div>
    </main>
  );
}
