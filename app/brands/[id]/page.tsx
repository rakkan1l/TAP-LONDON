"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = { params: { id: string } };

const BRANDS: Record<string, {
  name: string; type: string; area: string; parent: string;
  openingHours: string; priceRange: string; description: string;
  founded: string; specialty: string[]; mustBuy: string;
  tips: string[]; photos: string[]; mapsUrl: string;
}> = {
  "selfridges": {
    name: "Selfridges", type: "Luxury Department Store", area: "Oxford Street",
    parent: "oxford-street", priceRange: "£££",
    openingHours: "Mon-Sat 9:30-21:00; Sun 11:30-18:00",
    founded: "Founded 1909 by Harry Gordon Selfridge",
    description: "One of the world's most iconic department stores. Selfridges spans over a million square feet with luxury fashion, beauty, food, and entertainment. Its famous yellow bags are a London icon.",
    specialty: ["Luxury fashion — Gucci, Prada, Saint Laurent", "Beauty Hall — world's largest beauty department", "Food Hall — champagne bar and gourmet dining", "Designer accessories and jewellery", "Wonder Room — the most exclusive items in the store"],
    mustBuy: "A yellow Selfridges carrier bag — the ultimate London souvenir",
    tips: ["Visit the Beauty Hall on the ground floor first", "The Food Hall has a champagne bar — treat yourself", "Check for seasonal sales — huge discounts", "Personal shopping service available free of charge"],
    photos: ["https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Selfridges+Oxford+Street+London",
  },
  "zara": {
    name: "Zara", type: "Fashion Retailer", area: "Oxford Street",
    parent: "oxford-street", priceRange: "££",
    openingHours: "Mon-Sat 10:00-21:00; Sun 12:00-18:00",
    founded: "Founded 1975 by Amancio Ortega, Inditex Group",
    description: "The world's largest fashion retailer. Zara's Oxford Street flagship is one of the biggest in the world, spread across multiple floors with the full women's, men's, and kids collections plus the premium Zara Collection line.",
    specialty: ["Women's fashion — seasonal trends updated weekly", "Men's collection — smart casual to formal", "Zara Collection — premium elevated line", "Kids and baby clothing", "Shoes and accessories"],
    mustBuy: "Zara's own-brand tailored blazer — always in season",
    tips: ["New stock arrives Monday and Thursday — shop those days", "The fitting rooms get busy after 14:00 — go earlier", "Check the Zara app for stock availability before going", "Sale periods in January and July offer up to 50% off"],
    photos: ["https://images.pexels.com/photos/17340069/pexels-photo-17340069.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Zara+Oxford+Street+London",
  },
  "hm-flagship": {
    name: "H&M Flagship", type: "High Street Fashion", area: "Oxford Street",
    parent: "oxford-street", priceRange: "£",
    openingHours: "Mon-Sat 9:00-21:00; Sun 11:00-18:00",
    founded: "Founded 1947 in Sweden by Erling Persson",
    description: "H&M's massive Oxford Street store is one of the largest fashion stores in London. It carries the full H&M range including the premium H&M Studio line and collaborations with major designers.",
    specialty: ["Women's fashion — affordable trend-led pieces", "Men's collection — basics and statement pieces", "H&M HOME — interiors and lifestyle products", "Divided — young fashion department", "Conscious Collection — sustainable fashion line"],
    mustBuy: "H&M x designer collaboration pieces — always sell out fast",
    tips: ["The basement floor has the best sale items", "H&M Studio seasonal collection drops are worth watching", "Sustainability swap — bring old clothes for discount", "Check the app for exclusive online-only deals"],
    photos: ["https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/17340069/pexels-photo-17340069.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=H%26M+Oxford+Street+London",
  },
  "nike-town": {
    name: "Nike Town London", type: "Sportswear Flagship", area: "Oxford Street",
    parent: "oxford-street", priceRange: "££",
    openingHours: "Mon-Sat 10:00-20:00; Sun 12:00-18:00",
    founded: "Nike founded 1964 by Phil Knight and Bill Bowerman",
    description: "Nike Town London on Oxford Street is the brand's largest store in Europe. Multi-level retail space with every Nike line, a customisation studio, and exclusive London-only releases.",
    specialty: ["Nike Running — complete footwear and apparel", "Jordan Brand — full collection including exclusives", "Nike By You — custom shoe studio", "Nike Tech — performance sportswear", "London exclusive colourways and releases"],
    mustBuy: "A pair of exclusive Nike London colourway trainers",
    tips: ["Nike By You studio lets you customise trainers in-store", "Check SNKRS app for exclusive launch releases", "London colourways are only available at this store", "Staff can check stock availability at other stores"],
    photos: ["https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/17340069/pexels-photo-17340069.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Nike+Town+Oxford+Street+London",
  },
  "john-lewis": {
    name: "John Lewis", type: "Department Store", area: "Oxford Street",
    parent: "oxford-street", priceRange: "££",
    openingHours: "Mon-Sat 9:30-20:00; Sun 12:00-18:00",
    founded: "Founded 1864 by John Lewis in Oxford Street",
    description: "John Lewis Oxford Street is the partnership's flagship store and a London institution. Famous for excellent customer service, quality products, and the iconic Never Knowingly Undersold price promise.",
    specialty: ["Technology and electronics — expert advice service", "Home and furniture — showrooms across multiple floors", "Fashion — own-brand and designer labels", "Beauty — full range of premium brands", "Opticians, travel money, and financial services"],
    mustBuy: "John Lewis own-brand cashmere — exceptional quality for price",
    tips: ["The electronics department has genuinely knowledgeable staff", "Price match guarantee — show a cheaper price and they'll match", "The restaurant on the top floor has views over London", "Personal styling service available by appointment"],
    photos: ["https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=John+Lewis+Oxford+Street+London",
  },
  "primark-flagship": {
    name: "Primark Flagship", type: "Value Fashion", area: "Oxford Street",
    parent: "oxford-street", priceRange: "£",
    openingHours: "Mon-Sat 8:00-22:00; Sun 11:30-18:00",
    founded: "Founded 1969 in Dublin as Penneys",
    description: "The world's largest Primark store — 14 floors and over 160,000 sq ft of ultra-affordable fashion, homeware, beauty, and food. Always packed with tourists and Londoners alike.",
    specialty: ["Women's fashion — trend-led at unbeatable prices", "Men's clothing — basics to statement pieces", "Beauty and skincare — dupes of luxury products", "Home and lifestyle — cushions, candles, kitchenware", "Disney, Harry Potter, and licensed merchandise"],
    mustBuy: "Licensed Disney or Harry Potter merchandise — cheapest in London",
    tips: ["Go early in the morning — gets extremely busy by midday", "The beauty section has incredible luxury dupes", "Harry Potter and Disney sections are very popular", "No online shopping — in-store only experience"],
    photos: ["https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/17340069/pexels-photo-17340069.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Primark+Oxford+Street+London",
  },
  "irregular-choice": {
    name: "Irregular Choice", type: "Quirky Footwear", area: "Carnaby Street",
    parent: "carnaby-street", priceRange: "££",
    openingHours: "Mon-Sat 10:00-19:00; Sun 11:00-18:00",
    founded: "Founded 1999 in Brighton by Dan Sullivan",
    description: "The most unique shoe shop in London — extravagant, playful, and completely unlike anything else. Disney collaborations, character heels, platform boots with built-in characters, and accessories that are wearable art.",
    specialty: ["Disney and character collaboration shoes", "Platform heels with built-in figurines", "Bags and accessories matching footwear", "Seasonal limited editions", "Bridal and occasion footwear"],
    mustBuy: "A Disney collaboration piece — they sell out extremely fast",
    tips: ["Disney collab drops are announced on Instagram — follow them", "Staff are knowledgeable and enthusiastic — ask for advice", "Sizes can run small — try before buying", "Great for gifts — packaging is beautiful"],
    photos: ["https://images.pexels.com/photos/10865652/pexels-photo-10865652.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Irregular+Choice+Carnaby+Street+London",
  },
  "dr-martens": {
    name: "Dr. Martens", type: "Iconic British Boots", area: "Carnaby Street",
    parent: "carnaby-street", priceRange: "££",
    openingHours: "Mon-Sat 10:00-19:00; Sun 12:00-18:00",
    founded: "Founded 1960 in Northamptonshire, England",
    description: "The original Dr. Martens flagship store on Carnaby Street stocks the widest range of DMs in London — every style, colour, and collaboration. A London cultural institution since the 1960s mod scene.",
    specialty: ["Classic 1460 boots — the original Dr. Martens", "Chelsea boots and shoes", "Collaborations with designers and artists", "Made in England premium range", "Vegan and alternative material options"],
    mustBuy: "A classic 1460 8-eye boot — the original and still the best",
    tips: ["Break them in gradually — wear thick socks for first few weeks", "The Made in England range is significantly higher quality", "Collaboration pieces are limited — buy if you see them", "They last years with proper care — worth the investment"],
    photos: ["https://images.pexels.com/photos/10865652/pexels-photo-10865652.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Dr+Martens+Carnaby+Street+London",
  },
};

function PhotoGallery({ photos, name }: { photos: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3", position: "relative", background: "#1a1a2e", marginBottom: "10px" }}>
        <img key={active} src={photos[active]} alt={`${name} ${active + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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

export default function BrandDetailPage({ params }: Props) {
  const brand = BRANDS[params.id];
  if (!brand) notFound();

  return (
    <main style={{ minHeight: "100vh" }} className="bg-[#f9f7f2] dark:bg-[#0d0d1a]">
      {/* Hero */}
      <div style={{ position: "relative", height: "44vh", minHeight: "250px", overflow: "hidden" }}>
        <img src={brand.photos[0]} alt={brand.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(26,26,46,0.9) 100%)" }} />
        <Link href={`/shopping/${brand.parent}`} style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", borderRadius: "50px", padding: "7px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>
          ← Back
        </Link>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px 20px" }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c", borderRadius: "50px", padding: "3px 12px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" as const, marginBottom: "8px", fontFamily: "'DM Sans', sans-serif" }}>
            {brand.type}
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5.5vw, 2.8rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: "0 0 4px 0" }}>
            {brand.name}
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(201,168,76,0.85)", margin: 0 }}>
            {brand.area} · {brand.priceRange}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 16px 60px" }}>
        <PhotoGallery photos={brand.photos} name={brand.name} />

        {/* Quick Info */}
        <div className="bg-white dark:bg-[#1a1a2e] border border-navy/10 dark:border-gold/20" style={{ borderRadius: "16px", padding: "18px 20px", marginBottom: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { icon: "📍", label: "Location", value: brand.area },
            { icon: "🕐", label: "Opening Hours", value: brand.openingHours },
            { icon: "💷", label: "Price Range", value: brand.priceRange },
            { icon: "📅", label: "History", value: brand.founded },
          ].map((info) => (
            <div key={info.label} style={{ display: "flex", gap: "10px" }}>
              <span style={{ flexShrink: 0 }}>{info.icon}</span>
              <div>
                <div className="text-[#888] dark:text-[#aaa]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>{info.label}</div>
                <div className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 600, lineHeight: 1.4 }}>{info.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* About */}
        <div className="bg-white dark:bg-[#1a1a2e] border border-navy/10 dark:border-gold/20" style={{ borderRadius: "16px", padding: "20px", marginBottom: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>About {brand.name}</h2>
          <p className="text-[#444] dark:text-[#ccc]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, margin: 0 }}>{brand.description}</p>
        </div>

        {/* What's Inside */}
        <div style={{ background: "#1a1a2e", borderRadius: "16px", padding: "20px", marginBottom: "18px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#c9a84c", marginBottom: "14px", marginTop: 0 }}>
            What's Inside
          </h2>
          {brand.specialty.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
              <span style={{ color: "#c9a84c", fontWeight: 700, flexShrink: 0 }}>✓</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>

        {/* Must Buy */}
        <div style={{ background: "rgba(201,168,76,0.1)", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(201,168,76,0.25)" }}>
          <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>Must Buy</h2>
          <p className="text-[#444] dark:text-[#ccc]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, margin: 0 }}>🛍️ {brand.mustBuy}</p>
        </div>

        {/* Tips */}
        <div className="bg-white dark:bg-[#1a1a2e] border border-navy/10 dark:border-gold/20" style={{ borderRadius: "16px", padding: "20px", marginBottom: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px", marginTop: 0 }}>Shopping Tips</h2>
          {brand.tips.map((tip, i) => (
            <p key={i} className="text-[#555] dark:text-[#bbb]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", lineHeight: 1.6, margin: "0 0 6px 0", display: "flex", gap: "8px" }}>
              <span style={{ color: "#c9a84c", fontWeight: 700, flexShrink: 0 }}>✓</span> {tip}
            </p>
          ))}
        </div>

        <a href={brand.mapsUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "#1a1a2e", color: "#c9a84c", padding: "15px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", marginBottom: "12px", boxSizing: "border-box" as const }}>
          📍 Get Directions on Google Maps
        </a>
        <Link href={`/shopping/${brand.parent}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "transparent", padding: "13px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", boxSizing: "border-box" as const, border: "2px solid" }} className="text-navy dark:text-[#f9f7f2] border-navy dark:border-[#f9f7f2]">
          ← Back to {brand.area}
        </Link>
      </div>
    </main>
  );
}
