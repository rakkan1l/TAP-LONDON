"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import food from "@/data/food.json";

type Props = { params: { id: string } };

const FOOD_PHOTOS: Record<string, string[]> = {
  "dishoom-covent-garden": ["https://images.pexels.com/photos/30021858/pexels-photo-30021858.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "padella-borough": ["https://images.pexels.com/photos/8002133/pexels-photo-8002133.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/31270596/pexels-photo-31270596.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "flat-iron-soho": ["https://images.pexels.com/photos/36683019/pexels-photo-36683019.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "roti-king": ["https://images.pexels.com/photos/5779372/pexels-photo-5779372.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "tayyabs": ["https://images.pexels.com/photos/30119009/pexels-photo-30119009.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/5779372/pexels-photo-5779372.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "ranoush-juice": ["https://images.pexels.com/photos/5923508/pexels-photo-5923508.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/5779372/pexels-photo-5779372.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "maroush-edgware-road": ["https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/5923508/pexels-photo-5923508.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "monmouth": ["https://images.pexels.com/photos/15569308/pexels-photo-15569308.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "borough-market": ["https://images.pexels.com/photos/31270596/pexels-photo-31270596.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "brick-lane-bagels": ["https://images.pexels.com/photos/4000028/pexels-photo-4000028.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "camden-market-food": ["https://images.pexels.com/photos/19121495/pexels-photo-19121495.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/32604930/pexels-photo-32604930.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"],
};

const FOOD_DETAILS: Record<string, { highlights: string[]; tips: string[]; bestFor: string; openingHours?: string }> = {
  "dishoom-covent-garden": {
    bestFor: "Breakfast, brunch, dinner, groups",
    highlights: ["Famous black daal — slow-cooked for 24 hours", "Breakfast naan rolls with cream cheese and chilli jam", "House-special bacon naan available until 11:45am", "Cocktail menu with mocktail alternatives", "Theatre district location — perfect pre-show"],
    tips: ["Book in advance — always busy", "Queue forms early for walk-ins", "The black daal and house black tea are must-orders", "Ask staff for current halal meat details"],
    openingHours: "Mon-Thu 8:00-23:00; Fri 8:00-00:00; Sat 9:00-00:00; Sun 9:00-22:00",
  },
  "padella-borough": {
    bestFor: "Lunch, quick dinner, date night",
    highlights: ["Handmade pasta made fresh daily", "Pici cacio e pepe — the signature dish", "Short focused menu changes seasonally", "Natural wine list", "Sit at counter for kitchen views"],
    tips: ["Queue forms from opening — arrive early", "No reservations taken — walk-in only", "Go for lunch to avoid longest waits", "Located right beside Borough Market"],
    openingHours: "Tue-Sat 12:00-15:45 and 17:00-21:45; Mon closed",
  },
  "tayyabs": {
    bestFor: "Halal dinner, groups, family meals",
    highlights: ["Legendary lamb chops — order immediately on arrival", "Karahi gosht — slow-cooked lamb", "Tandoori mixed grill platters", "BYOB — take your own non-alcoholic drinks", "Huge portions and great value"],
    tips: ["Book in advance — extremely popular", "Order the lamb chops as a starter immediately", "BYOB policy — no alcohol sold", "Cash and card accepted"],
    openingHours: "Daily 12:00-23:30",
  },
  "monmouth": {
    bestFor: "Morning coffee, pre-market visit",
    highlights: ["Carefully sourced single-origin beans", "Expert baristas with deep coffee knowledge", "Fresh pastries from local bakeries", "Standing room creates quick turnover", "Perfect Borough Market starting point"],
    tips: ["Go early before the market gets busy", "Try the filter coffee for best flavour", "Small space — take away recommended on weekends", "Cash preferred"],
    openingHours: "Mon-Sat 7:30-18:00; closed Sunday",
  },
  "borough-market": {
    bestFor: "Foodies, gift shopping, street lunch",
    highlights: ["100+ traders across the market", "Neal's Yard Dairy for artisan cheese", "Monmouth Coffee at the corner", "Fresh oysters from Richard Haward", "Ready-to-eat food from around the world"],
    tips: ["Wednesday-Saturday is the full market", "Go at 10am for space, midday for atmosphere", "Bring cash for smaller traders", "Great for edible gifts and souvenirs"],
    openingHours: "Mon-Thu 10:00-17:00; Fri 10:00-18:00; Sat 8:00-17:00; closed Sunday",
  },
};

function PhotoGallery({ photos, name }: { photos: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3", position: "relative", background: "#1a1a2e", marginBottom: "10px" }}>
        <img key={active} src={photos[active]} alt={`${name} ${active + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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

export default function FoodDetailPage({ params }: Props) {
  const item = food.items.find((f) => f.id === params.id);
  if (!item) notFound();

  const photos = FOOD_PHOTOS[item.id] ?? [item.image];
  const details = FOOD_DETAILS[item.id];
  const hours = details?.openingHours ?? item.openingHours;

  return (
    <main style={{ minHeight: "100vh", background: "#f9f7f2" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "44vh", minHeight: "250px", overflow: "hidden" }}>
        <img src={photos[0]} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(26,26,46,0.88) 100%)" }} />
        <Link href="/food" style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", borderRadius: "50px", padding: "7px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>
          ← Back
        </Link>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px 20px" }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c", borderRadius: "50px", padding: "3px 12px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" as const, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>
            {item.category}
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.7rem, 5.5vw, 2.8rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: "0 0 4px 0" }}>
            {item.icon} {item.name}
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(201,168,76,0.85)", margin: 0 }}>
            {item.cuisine} · {item.area} · {item.priceRange}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 16px 60px" }}>
        <PhotoGallery photos={photos} name={item.name} />

        {/* Quick Info */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px 20px", marginBottom: "18px", border: "1px solid rgba(26,26,46,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "12px" }}>
          {item.area && <div style={{ display: "flex", gap: "10px" }}><span>📍</span><div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const }}>Location</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600 }}>{item.area}</div></div></div>}
          {hours && <div style={{ display: "flex", gap: "10px" }}><span>🕐</span><div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const }}>Opening Hours</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600, lineHeight: 1.5 }}>{hours}</div></div></div>}
          {item.priceRange && <div style={{ display: "flex", gap: "10px" }}><span>💷</span><div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const }}>Price Range</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600 }}>{item.priceRange}</div></div></div>}
          {item.halal && <div style={{ display: "flex", gap: "10px" }}><span>🕌</span><div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const }}>Halal</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#059669", fontWeight: 600 }}>Halal available — always confirm with staff</div></div></div>}
          {details?.bestFor && <div style={{ display: "flex", gap: "10px" }}><span>⭐</span><div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const }}>Best For</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600 }}>{details.bestFor}</div></div></div>}
        </div>

        {/* About */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(26,26,46,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px", marginTop: 0 }}>About {item.name}</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: 0 }}>{item.description}</p>
        </div>

        {/* Menu Highlights */}
        {details?.highlights && (
          <div style={{ background: "#1a1a2e", borderRadius: "16px", padding: "20px", marginBottom: "18px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#c9a84c", marginBottom: "14px", marginTop: 0 }}>🍽️ Menu Highlights</h2>
            {details.highlights.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                <span style={{ color: "#c9a84c", fontWeight: 700, flexShrink: 0 }}>✓</span>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: 0 }}>{h}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        {details?.tips && (
          <div style={{ background: "rgba(201,168,76,0.08)", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(201,168,76,0.2)" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px", marginTop: 0 }}>💡 Visitor Tips</h2>
            {details.tips.map((tip, i) => (
              <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "#555", lineHeight: 1.6, margin: "0 0 6px 0", display: "flex", gap: "8px" }}>
                <span style={{ color: "#c9a84c", fontWeight: 700 }}>✓</span> {tip}
              </p>
            ))}
          </div>
        )}

        {/* Maps */}
        {item.mapsUrl && (
          <a href={item.mapsUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "#1a1a2e", color: "#c9a84c", padding: "15px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", marginBottom: "12px", boxSizing: "border-box" as const }}>
            📍 Find on Google Maps
          </a>
        )}
        <Link href="/food" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "transparent", color: "#1a1a2e", padding: "13px", borderRadius: "50px", border: "2px solid #1a1a2e", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", boxSizing: "border-box" as const }}>
          ← Back to Food
        </Link>
      </div>
    </main>
  );
}
