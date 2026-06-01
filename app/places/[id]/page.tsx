"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import places from "@/data/places.json";

type Props = { params: { id: string } };

// Rich history data
const PLACE_HISTORY: Record<string, { founded: string; history: string; facts: string[] }> = {
  "tower-of-london": {
    founded: "Founded 1066 by William the Conqueror",
    history: "The Tower of London was built in the 1070s by William the Conqueror following his victory at the Battle of Hastings. He constructed the massive White Tower to defend and proclaim his royal power. Built from limestone imported from Caen in Normandy, it took nearly 20 years to complete. Over the following centuries, successive kings expanded the complex. The Tower has served as a royal palace, political prison, place of execution, royal mint, menagerie, and arsenal. Its most famous prisoners include Anne Boleyn, Thomas More, and Lady Jane Grey. Today it houses the Crown Jewels and attracted over 2.8 million visitors in 2025.",
    facts: ["Built in the 1070s by William the Conqueror", "The White Tower took nearly 20 years to complete", "Stone was imported from Caen, Normandy, France", "Only 7 people were ever executed inside the Tower walls", "Anne Boleyn and Lady Jane Grey were among those executed", "At least 6 ravens must live here by royal decree", "The Crown Jewels have been stored here since the 17th century", "2,817,852 visitors came in 2025", "Yeoman Warders (Beefeaters) have guarded it since the 15th century"],
  },
  "buckingham-palace": {
    founded: "Built 1703; became royal residence 1837",
    history: "Buckingham Palace began as Buckingham House, built in 1703 for the Duke of Buckingham. King George III purchased it in 1761. It was substantially remodelled by architect John Nash for King George IV from 1826. Queen Victoria was the first monarch to use it as the official royal London residence in 1837. The palace has 775 rooms, including 19 State Rooms, 52 royal bedrooms, and 78 bathrooms.",
    facts: ["Originally Buckingham House, built in 1703", "Queen Victoria was the first monarch to live here in 1837", "The palace has 775 rooms and 78 bathrooms", "The garden covers 39 acres — one of London's largest private gardens", "Around 50,000 people visit as guests each year", "The Changing of the Guard has taken place here since 1660"],
  },
  "british-museum": {
    founded: "Founded 1753; opened to public 1759",
    history: "The British Museum was founded in 1753, making it the world's first public national museum, following the death of Sir Hans Sloane who bequeathed his collection of 71,000 objects to the nation. The current building was designed by Sir Robert Smirke between 1823 and 1852. The Great Court, designed by Sir Norman Foster, opened in 2000 and is the largest covered public square in Europe.",
    facts: ["World's first public national museum, founded 1753", "Over 8 million objects in the collection", "The Rosetta Stone has been on display since 1802", "Karl Marx researched Das Kapital in the Reading Room", "The Great Court is Europe's largest covered public square", "Around 6 million visitors per year", "Admission has been free since 2001"],
  },
  "natural-history-museum": {
    founded: "Opened 1881 in Alfred Waterhouse's Romanesque building",
    history: "The Natural History Museum opened on 18 April 1881, having split from the British Museum. The magnificent Romanesque building on Cromwell Road was designed by Alfred Waterhouse. Its centrepiece is the grand Central Hall dominated by the famous blue whale skeleton 'Hope'. The collections include over 80 million specimens spanning billions of years.",
    facts: ["Collections span 4.5 billion years of Earth's history", "Over 80 million specimens in the collection", "The blue whale skeleton 'Hope' replaced 'Dippy' the diplodocus in 2017", "Charles Darwin's collection forms part of the archives", "Around 5 million visitors per year", "Free admission for all"],
  },
  "st-pauls-cathedral": {
    founded: "Current building completed 1710; originally 604 AD",
    history: "The first St Paul's Cathedral was founded in 604 AD. The medieval cathedral was destroyed in the Great Fire of London in 1666. Sir Christopher Wren designed the current Baroque masterpiece, built between 1675 and 1710. Its dome at 111 metres dominated the London skyline for 250 years. The cathedral has hosted funerals of Nelson, Wellington, Churchill, and the wedding of Prince Charles and Lady Diana in 1981.",
    facts: ["First cathedral on this site dates to 604 AD", "Destroyed in the Great Fire of London in 1666", "Current building designed by Sir Christopher Wren", "The dome stands 111 metres tall", "The Whispering Gallery carries whispers across 34 metres", "Winston Churchill's funeral was held here in 1965", "Wren is buried in the crypt — 'Reader, look around you'"],
  },
  "tower-bridge": {
    founded: "Built 1886-1894; opened 30 June 1894",
    history: "Tower Bridge was built between 1886 and 1894, opened by the Prince of Wales on 30 June 1894. Designed by Sir Horace Jones, its Gothic Revival towers were built to complement the nearby Tower of London. Originally powered by steam hydraulics, it was converted to electricity in 1976. The bridge opens around 800-900 times per year for river traffic.",
    facts: ["Built between 1886 and 1894 — took 8 years", "Over 11,000 tonnes of steel forms the skeleton", "Originally powered by steam hydraulics", "The bascules rise to 86 degrees in just 5 minutes", "Glass floor panels installed in the walkways in 2014", "A motorcycle courier jumped the partly open bridge in 1952"],
  },
  "big-ben": {
    founded: "Clock tower completed 1858; renamed Elizabeth Tower 2012",
    history: "The Elizabeth Tower was completed in 1858 as part of the rebuilt Palace of Westminster. 'Big Ben' technically refers only to the largest bell inside, which weighs 13.7 tonnes. The bell cracked shortly after installation and had to be recast. Renamed the Elizabeth Tower in 2012 to mark Queen Elizabeth II's Diamond Jubilee. The clock was silent from 2017 to 2022 during £79 million restoration works.",
    facts: ["Big Ben is the name of the bell, not the tower", "The main bell weighs 13.7 tonnes", "The clock faces are 7 metres in diameter", "Renamed Elizabeth Tower in 2012", "Restored between 2017 and 2022 for £79 million", "Coins placed under the pendulum can adjust the clock's speed"],
  },
  "hyde-park": {
    founded: "Royal park since 1536; opened to public in 17th century",
    history: "Hyde Park was originally a hunting ground owned by Westminster Abbey until King Henry VIII seized it in 1536. It became a royal hunting ground before being opened to the public under King James I. The Great Exhibition of 1851 was held here in the Crystal Palace. The Serpentine lake was created in 1730 by Queen Caroline. Hyde Park has hosted massive free concerts by The Rolling Stones and Queen.",
    facts: ["Seized by Henry VIII from Westminster Abbey in 1536", "Covers 350 acres — one of London's largest Royal Parks", "The Serpentine lake was created in 1730", "The Great Exhibition of 1851 attracted 6 million visitors", "Speakers' Corner has been a free speech site since 1872", "The Rolling Stones performed for 500,000 people here in 1969"],
  },
  "tate-modern": {
    founded: "Opened 11 May 2000 in converted Bankside Power Station",
    history: "Tate Modern opened in 2000 in the converted Bankside Power Station, designed by Sir Giles Gilbert Scott and operating from 1952 to 1981. Swiss architects Herzog & de Meuron won the conversion competition. The Turbine Hall — 155 metres long — hosts major annual art installations. The Blavatnik Building extension opened in 2016, nearly doubling capacity.",
    facts: ["Opened 11 May 2000 in a converted power station", "The Turbine Hall is 155 metres long and 35 metres tall", "Around 6 million visitors per year — most visited modern art gallery in the world", "The collection includes Picasso, Dalí, Warhol, and Rothko", "Admission to the permanent collection is free", "Connected to St Paul's by the Millennium Bridge"],
  },
  "kew-gardens": {
    founded: "Founded 1759; UNESCO World Heritage Site 2003",
    history: "The Royal Botanic Gardens, Kew, were founded in 1759 by Princess Augusta, mother of King George III. The gardens grew under botanist Joseph Banks who accompanied Captain Cook on his first voyage. The iconic Palm House was built 1844-48. In 2003, Kew Gardens was designated a UNESCO World Heritage Site. Today it holds over 50,000 plant species.",
    facts: ["Founded in 1759 by Princess Augusta", "UNESCO World Heritage Site since 2003", "Over 50,000 plant species — world's most diverse collection", "The Treetop Walkway rises 18 metres above the forest floor", "The Great Pagoda was built in 1762", "Covers 132 hectares (326 acres)"],
  },
  "national-gallery": {
    founded: "Founded 1824; moved to Trafalgar Square 1838",
    history: "The National Gallery was founded in 1824 when the government purchased 38 paintings from the estate of John Julius Angerstein. The collection moved to its current home on Trafalgar Square in 1838. It now holds over 2,300 paintings spanning 700 years of European art from 1250 to 1900, including works by Leonardo da Vinci, Rembrandt, Monet, Van Gogh, and Turner.",
    facts: ["Founded in 1824 with just 38 paintings", "Over 2,300 paintings in the collection", "Covers Western European art from 1250 to 1900", "Van Gogh's 'Sunflowers' is one of the most visited paintings", "Free admission since its founding in 1824", "Around 6 million visitors per year"],
  },
};

// Multiple photos per place
const PLACE_PHOTOS: Record<string, string[]> = {
  "tower-of-london": [
    "https://images.pexels.com/photos/1055234/pexels-photo-1055234.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/726484/pexels-photo-726484.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2269593/pexels-photo-2269593.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  "buckingham-palace": [
    "https://images.pexels.com/photos/29191806/pexels-photo-29191806.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/13020613/pexels-photo-13020613.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  "big-ben": [
    "https://images.pexels.com/photos/29253512/pexels-photo-29253512.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  "london-eye": [
    "https://images.pexels.com/photos/10548993/pexels-photo-10548993.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/29014277/pexels-photo-29014277.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  "tower-bridge": [
    "https://images.pexels.com/photos/26624348/pexels-photo-26624348.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  "british-museum": [
    "https://images.pexels.com/photos/135018/pexels-photo-135018.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2269593/pexels-photo-2269593.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  "natural-history-museum": [
    "https://images.pexels.com/photos/30397052/pexels-photo-30397052.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3308285/pexels-photo-3308285.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  "national-gallery": [
    "https://images.pexels.com/photos/2269593/pexels-photo-2269593.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/568414/pexels-photo-568414.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  "tate-modern": [
    "https://images.pexels.com/photos/6398533/pexels-photo-6398533.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/35973696/pexels-photo-35973696.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  "hyde-park": [
    "https://images.pexels.com/photos/15301981/pexels-photo-15301981.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  "kew-gardens": [
    "https://images.pexels.com/photos/15046186/pexels-photo-15046186.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
};

function PhotoGallery({ photos, name }: { photos: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div style={{ marginBottom: "24px" }}>
      {/* Main photo */}
      <div style={{
        borderRadius: "16px", overflow: "hidden",
        height: "260px", marginBottom: "8px", position: "relative",
      }}>
        <img
          src={photos[active]}
          alt={`${name} photo ${active + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s" }}
        />
        {/* Counter */}
        <div style={{
          position: "absolute", bottom: "12px", right: "12px",
          background: "rgba(0,0,0,0.6)", color: "#fff",
          borderRadius: "20px", padding: "4px 10px",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600,
        }}>
          {active + 1} / {photos.length}
        </div>
      </div>
      {/* Thumbnails */}
      {photos.length > 1 && (
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: "80px", height: "60px", borderRadius: "8px",
                overflow: "hidden", flexShrink: 0, padding: 0,
                border: i === active ? "2px solid #c9a84c" : "2px solid transparent",
                cursor: "pointer", transition: "border 0.2s",
              }}
            >
              <img
                src={photo}
                alt={`${name} thumbnail ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PlaceDetailPage({ params }: Props) {
  const place = places.items.find((p) => p.id === params.id);
  if (!place) notFound();

  const history = PLACE_HISTORY[place.id];
  const photos = PLACE_PHOTOS[place.id] || [place.image];

  return (
    <main style={{ minHeight: "100vh", background: "#f9f7f2" }}>

      {/* Hero */}
      <div style={{ position: "relative", height: "45vh", minHeight: "260px", overflow: "hidden" }}>
        <img src={photos[0]} alt={place.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(26,26,46,0.88) 100%)",
        }} />
        <Link href="/places" style={{
          position: "absolute", top: "20px", left: "20px",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff",
          borderRadius: "50px", padding: "8px 18px",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
          fontWeight: 600, textDecoration: "none",
        }}>
          ← Back
        </Link>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px 24px" }}>
          <div style={{
            display: "inline-block", background: "rgba(201,168,76,0.2)",
            border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c",
            borderRadius: "50px", padding: "4px 14px", fontSize: "0.72rem",
            fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" as const,
            marginBottom: "8px", fontFamily: "'DM Sans', sans-serif",
          }}>
            {place.category}
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 6vw, 3rem)",
            fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: 0,
          }}>
            {place.icon} {place.name}
          </h1>
          {history && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
              color: "rgba(201,168,76,0.85)", marginTop: "6px", marginBottom: 0,
            }}>
              🏛️ {history.founded}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* Photo Gallery */}
        {photos.length > 1 && (
          <PhotoGallery photos={photos} name={place.name} />
        )}

        {/* Quick Info */}
        <div style={{
          background: "#ffffff", borderRadius: "16px", padding: "20px",
          marginBottom: "20px", border: "1px solid rgba(26,26,46,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          display: "flex", flexWrap: "wrap", gap: "16px",
        }}>
          {[
            { icon: "📍", label: "Area", value: place.area },
            { icon: "🕐", label: "Hours", value: place.openingHours },
            { icon: place.priceType === "Free" ? "🎁" : "💷", label: "Entry", value: place.entryFee },
          ].map((info) => info.value ? (
            <div key={info.label} style={{ minWidth: "140px", flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "4px" }}>
                {info.icon} {info.label}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#1a1a2e", fontWeight: 600, lineHeight: 1.4 }}>
                {info.value}
              </div>
            </div>
          ) : null)}
        </div>

        {/* Description */}
        <div style={{
          background: "#ffffff", borderRadius: "16px", padding: "22px",
          marginBottom: "20px", border: "1px solid rgba(26,26,46,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px", marginTop: 0 }}>
            About {place.name}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: 0 }}>
            {place.description}
          </p>
        </div>

        {/* History */}
        {history && (
          <div style={{
            background: "#1a1a2e", borderRadius: "16px", padding: "22px", marginBottom: "20px",
          }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#c9a84c", marginBottom: "12px", marginTop: 0 }}>
              📜 History
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, margin: 0 }}>
              {history.history}
            </p>
          </div>
        )}

        {/* Facts */}
        {history && (
          <div style={{
            background: "#ffffff", borderRadius: "16px", padding: "22px",
            marginBottom: "20px", border: "1px solid rgba(26,26,46,0.08)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "14px", marginTop: 0 }}>
              ⭐ Fascinating Facts
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {history.facts.map((fact, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    background: "rgba(201,168,76,0.15)", color: "#c9a84c",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.68rem", fontWeight: 700, flexShrink: 0,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "#444", lineHeight: 1.6, margin: 0 }}>
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visitor Tips */}
        <div style={{
          background: "rgba(201,168,76,0.08)", borderRadius: "16px", padding: "22px",
          marginBottom: "20px", border: "1px solid rgba(201,168,76,0.2)",
        }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px", marginTop: 0 }}>
            💡 Visitor Tips
          </h2>
          {["Book tickets online in advance to skip the queue", "Visit on weekday mornings for smaller crowds", "Check the official website for seasonal opening hour changes", "Nearby tube stations are usually just a short walk away"].map((tip, i) => (
            <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "#555", lineHeight: 1.6, margin: "0 0 6px 0", display: "flex", gap: "8px" }}>
              <span style={{ color: "#c9a84c", fontWeight: 700 }}>✓</span> {tip}
            </p>
          ))}
        </div>

        {/* Directions */}
        {place.mapsUrl && (
          <a href={place.mapsUrl} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "8px", width: "100%", background: "#1a1a2e", color: "#c9a84c",
            padding: "16px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem", fontWeight: 700, textDecoration: "none",
            marginBottom: "12px", boxSizing: "border-box" as const,
          }}>
            📍 Get Directions on Google Maps
          </a>
        )}

        <Link href="/places" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "8px", width: "100%", background: "transparent", color: "#1a1a2e",
          padding: "14px", borderRadius: "50px", border: "2px solid #1a1a2e",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
          fontWeight: 600, textDecoration: "none", boxSizing: "border-box" as const,
        }}>
          ← Back to All Places
        </Link>

      </div>
    </main>
  );
}
