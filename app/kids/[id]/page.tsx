"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = { params: { id: string } };

const KIDS_ITEMS = [
  { id: "london-zoo", name: "ZSL London Zoo", category: "Top Attractions", area: "Regent's Park", icon: "🦁", image: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800", description: "One of the world's oldest scientific zoos with over 700 species. Gorilla Kingdom, Penguin Beach, and Butterfly Paradise are family favourites.", openingHours: "Daily 10:00-18:00; varies by season", entryFee: "Paid — book online for discount", mapsUrl: "https://www.google.com/maps/search/?api=1&query=London+Zoo+Regent's+Park", mustTry: "Gorilla Kingdom and Penguin Beach", tips: ["Book online in advance to save money", "Arrive early to see animals most active in the morning", "Allow at least 4 hours for the full experience", "Check the feeding times on arrival"] },
  { id: "sealife", name: "SEA LIFE London Aquarium", category: "Top Attractions", area: "South Bank", icon: "🦈", image: "https://images.pexels.com/photos/3308285/pexels-photo-3308285.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Stunning aquarium on the South Bank with sharks, rays, penguins, and a glass tunnel walk-through.", openingHours: "Daily 10:00-18:00", entryFee: "Paid — book online to save", mapsUrl: "https://www.google.com/maps/search/?api=1&query=SEA+LIFE+London+Aquarium", mustTry: "The glass shark tunnel walk-through", tips: ["Book online — cheaper than door price", "Weekday mornings are quietest", "The shark tunnel is unmissable", "Allow 2-3 hours"] },
  { id: "natural-history-kids", name: "Natural History Museum", category: "Top Attractions", area: "South Kensington", icon: "🦕", image: "https://images.pexels.com/photos/30397052/pexels-photo-30397052.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Free and completely unmissable — dinosaur galleries, blue whale skeleton, earthquake simulator, and hands-on science activities.", openingHours: "Daily 10:00-17:50", entryFee: "Free general admission", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Natural+History+Museum+London", mustTry: "Dinosaur gallery and blue whale skeleton", tips: ["Completely free — no booking needed", "Go early to beat school groups", "The dinosaur gallery gets very busy", "Check for school holiday events"] },
  { id: "science-museum-kids", name: "Science Museum", category: "Top Attractions", area: "South Kensington", icon: "🚀", image: "https://images.pexels.com/photos/30397052/pexels-photo-30397052.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Interactive exhibits on space, technology, medicine, and engineering. The Garden for under-5s and IMAX cinema are highlights.", openingHours: "Daily 10:00-18:00", entryFee: "Free general admission", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Science+Museum+London", mustTry: "The space gallery and flight simulator", tips: ["Free entry to main galleries", "IMAX cinema is paid — book ahead", "Best for ages 5-14", "The Wonderlab is paid but worth it"] },
  { id: "kidzania", name: "KidZania London", category: "Top Attractions", area: "Westfield London", icon: "🏙️", image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800", description: "A mini city where kids aged 4-14 can role-play as doctors, pilots, chefs, firefighters and 60+ other professions.", openingHours: "Daily 10:00-17:00; check website", entryFee: "Paid — book in advance", mapsUrl: "https://www.google.com/maps/search/?api=1&query=KidZania+London+Westfield", mustTry: "Pilot training and hospital roleplay", tips: ["Book well in advance — sells out fast", "Best for ages 4-12", "Allow a full day", "Meals available inside"] },
  { id: "british-museum-kids", name: "British Museum", category: "Top Attractions", area: "Bloomsbury", icon: "🏺", image: "https://images.pexels.com/photos/135018/pexels-photo-135018.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Free world-class museum with Egyptian mummies, Greek sculptures, and family trails designed for children.", openingHours: "Daily 10:00-17:00", entryFee: "Free general admission", mapsUrl: "https://www.google.com/maps/search/?api=1&query=British+Museum+London", mustTry: "Egyptian mummy rooms", tips: ["Completely free", "Pick up the family trail map at entrance", "Egyptian mummies are always a hit with kids", "Café and restaurant on site"] },
  { id: "shreks-adventure", name: "Shrek's Adventure London", category: "Fun Experiences", area: "South Bank", icon: "🟢", image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800", description: "An immersive 4D DreamWorks experience with live actors, bus ride through fairy tale land, and Shrek's Swamp.", openingHours: "Daily 10:00-17:00; varies", entryFee: "Paid — book online", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shrek's+Adventure+London", mustTry: "The 4D motion ride", tips: ["Book online for best price", "Perfect for ages 4-12", "Allow 2-3 hours", "Near London Eye — combine both visits"] },
  { id: "madame-tussauds", name: "Madame Tussauds London", category: "Fun Experiences", area: "Marylebone", icon: "⭐", image: "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Famous wax figure attraction with celebrities, royals, Marvel superheroes, and Star Wars characters.", openingHours: "Daily 10:00-16:00; varies", entryFee: "Paid — book online for best price", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Madame+Tussauds+London", mustTry: "Marvel Universe 4D experience", tips: ["Book online — walk-in is much more expensive", "Weekday mornings are quietest", "Marvel and Star Wars zones are most popular", "Allow 2-3 hours"] },
  { id: "london-dungeon", name: "The London Dungeon", category: "Fun Experiences", area: "South Bank", icon: "👻", image: "https://images.pexels.com/photos/3030268/pexels-photo-3030268.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Dark, theatrical walk-through London history with live actors, special effects, and thrilling rides. Best for ages 10+.", openingHours: "Daily 10:00-17:00; varies", entryFee: "Paid — book online", mapsUrl: "https://www.google.com/maps/search/?api=1&query=London+Dungeon", mustTry: "The drop ride at the end", tips: ["Not suitable for under 10s", "Book online for best price", "Allow 1.5-2 hours", "Near South Bank attractions — combine with London Eye"] },
  { id: "london-eye-kids", name: "London Eye", category: "Fun Experiences", area: "South Bank", icon: "🎡", image: "https://images.pexels.com/photos/10548993/pexels-photo-10548993.jpeg?auto=compress&cs=tinysrgb&w=800", description: "30-minute rotation with amazing city views. Kids love spotting landmarks from above.", openingHours: "Daily 11:00-18:00; varies", entryFee: "Paid — book in advance", mapsUrl: "https://www.google.com/maps/search/?api=1&query=London+Eye", mustTry: "Sunset ride for the best views", tips: ["Book timed entry online", "Clear days give the best views", "Evening rides are magical", "Allow 1.5 hours including queue"] },
  { id: "hyde-park-kids", name: "Hyde Park", category: "Parks & Outdoor", area: "West London", icon: "🌳", image: "https://images.pexels.com/photos/15301981/pexels-photo-15301981.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Huge park with the Diana Memorial Playground — a pirate ship, teepees, and sand pit for young children. Plus boating on the Serpentine.", openingHours: "Daily 5:00-24:00", entryFee: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hyde+Park+London", mustTry: "Diana Memorial Playground", tips: ["Diana Memorial Playground is free", "Hire rowing boats on the Serpentine in summer", "Lido open for swimming in summer", "Bring a picnic"] },
  { id: "regents-park-kids", name: "Regent's Park", category: "Parks & Outdoor", area: "Marylebone", icon: "🌹", image: "https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Spacious park next to London Zoo with playgrounds, boating lake, open air theatre, and beautiful rose gardens.", openingHours: "Daily from 5:00", entryFee: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Regent's+Park+London", mustTry: "Boating lake in summer", tips: ["Combine with London Zoo next door", "Playgrounds are free", "Open Air Theatre in summer — book ahead", "Great ice cream kiosks in summer"] },
  { id: "greenwich-park-kids", name: "Greenwich Park", category: "Parks & Outdoor", area: "Greenwich", icon: "⛳", image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Hilltop park with a deer park, great skyline views, and plenty of space for kids to run around.", openingHours: "Daily from 6:00", entryFee: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Greenwich+Park+London", mustTry: "Hilltop view of London skyline", tips: ["Combine with Cutty Sark nearby", "Deer park is a highlight for kids", "Best views from the top of the hill", "Royal Observatory is paid — worth it"] },
  { id: "hamleys-food", name: "Hamleys Toy Store Café", category: "Family Food", area: "Regent Street", icon: "🧸", image: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Grab a bite inside the world-famous Hamleys store. Kids are already entertained by toys on every floor.", openingHours: "Daily 10:00-21:00", entryFee: "Free to enter", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hamleys+London+Regent+Street", mustTry: "Let kids choose their own toy first", tips: ["7 floors of toys to explore", "Staff do toy demonstrations throughout", "Café on upper floor", "Get there early on weekends"] },
  { id: "pizza-express-kids", name: "Pizza Express", category: "Family Food", area: "Citywide", icon: "🍕", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800", description: "London's most family-friendly restaurant chain — dedicated kids menu, dough-making activities, and relaxed atmosphere.", openingHours: "Daily 11:30-22:00; varies", entryFee: "££", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pizza+Express+London", mustTry: "Kids dough-making activity", tips: ["Kids menus available at all branches", "Dough-making activities at selected branches — book ahead", "Very family friendly atmosphere", "Always a safe choice with picky eaters"] },
  { id: "borough-market-kids", name: "Borough Market Family Visit", category: "Family Food", area: "London Bridge", icon: "🥐", image: "https://images.pexels.com/photos/31270596/pexels-photo-31270596.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Let kids choose from global street food stalls — churros, mac and cheese, fresh juice, and hot dogs.", openingHours: "Mon-Sat; full market Wed-Sat", entryFee: "Free to enter", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Borough+Market+London", mustTry: "Churros from the Spanish stall", tips: ["Go on Saturday for the full experience", "Kids love the variety of street food", "Bring cash for smaller stalls", "Combine with a Tower Bridge visit nearby"] },
  { id: "hamleys", name: "Hamleys", category: "Toy Shops", area: "Regent Street", icon: "🧸", image: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800", description: "The world's most famous toy shop — 7 floors of toys, games, demonstrations, and magic. Kids go absolutely wild here.", openingHours: "Daily 10:00-21:00", entryFee: "Free to enter", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hamleys+Regent+Street+London", mustTry: "Floor-by-floor toy demonstrations", tips: ["Set a budget before you go in", "Staff do live toy demonstrations — very entertaining", "7 floors to explore", "Busiest on weekends — go weekday if possible"] },
  { id: "lego-store", name: "LEGO Store London", category: "Toy Shops", area: "Leicester Square", icon: "🧱", image: "https://images.pexels.com/photos/3308285/pexels-photo-3308285.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Flagship LEGO store with London-themed builds, pick-a-brick wall, and personalised minifigures.", openingHours: "Daily 10:00-21:00; varies", entryFee: "Free to enter", mapsUrl: "https://www.google.com/maps/search/?api=1&query=LEGO+Store+Leicester+Square+London", mustTry: "Build your own minifigure", tips: ["Pick-a-brick wall is a highlight", "London-themed exclusive sets available", "Free to browse and build at stations", "Near Leicester Square for lunch after"] },
  { id: "disney-store", name: "Disney Store Oxford Street", category: "Toy Shops", area: "Oxford Street", icon: "✨", image: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Magical Disney flagship store on Oxford Street with character costumes, toys, collectibles, and interactive experiences.", openingHours: "Daily 10:00-21:00; varies", entryFee: "Free to enter", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Disney+Store+Oxford+Street+London", mustTry: "Princess dress-up section", tips: ["Exclusive UK Disney merchandise", "Interactive screens and photo opportunities", "Great for Disney-obsessed kids", "Close to John Lewis and Selfridges"] },
];

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
    </div>
  );
}

export default function KidsDetailPage({ params }: Props) {
  const item = KIDS_ITEMS.find((k) => k.id === params.id);
  if (!item) notFound();

  const photos = [item.image, "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800"];

  return (
    <main style={{ minHeight: "100vh", background: "#f9f7f2" }}>
      <div style={{ position: "relative", height: "44vh", minHeight: "250px", overflow: "hidden" }}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(26,26,46,0.88) 100%)" }} />
        <Link href="/kids" style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", borderRadius: "50px", padding: "7px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>← Back</Link>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px 20px" }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c", borderRadius: "50px", padding: "3px 12px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" as const, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>{item.category}</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.7rem, 5.5vw, 2.8rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: "0 0 4px 0" }}>{item.icon} {item.name}</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(201,168,76,0.85)", margin: 0 }}>{item.area} · {item.entryFee}</p>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 16px 60px" }}>
        <PhotoGallery photos={photos} name={item.name} />

        {/* Quick Info */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px 20px", marginBottom: "18px", border: "1px solid rgba(26,26,46,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { icon: "📍", label: "Location", value: item.area },
            { icon: "🕐", label: "Opening Hours", value: item.openingHours },
            { icon: "💷", label: "Entry", value: item.entryFee },
          ].map((info) => (
            <div key={info.label} style={{ display: "flex", gap: "10px" }}>
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>{info.icon}</span>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const }}>
                  {info.label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600, lineHeight: 1.4 }}>
                  {info.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* About */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(26,26,46,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px", marginTop: 0 }}>About</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: 0 }}>{item.description}</p>
        </div>

        {/* Must Try */}
        <div style={{ background: "rgba(201,168,76,0.1)", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(201,168,76,0.25)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px", marginTop: 0 }}>Must Do</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#444", fontWeight: 600, margin: 0 }}>🎯 {item.mustTry}</p>
        </div>

        {/* Tips */}
        <div style={{ background: "#1a1a2e", borderRadius: "16px", padding: "20px", marginBottom: "18px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#c9a84c", marginBottom: "14px", marginTop: 0 }}>Parent Tips</h2>
          {item.tips.map((tip, i) => (
            <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: "0 0 8px 0", display: "flex", gap: "8px" }}>
              <span style={{ color: "#c9a84c", fontWeight: 700, flexShrink: 0 }}>✓</span> {tip}
            </p>
          ))}
        </div>

        {/* Maps */}
        <a href={item.mapsUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "#1a1a2e", color: "#c9a84c", padding: "15px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", marginBottom: "12px", boxSizing: "border-box" as const }}>
          📍 Get Directions on Google Maps
        </a>
        <Link href="/kids" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "transparent", color: "#1a1a2e", padding: "13px", borderRadius: "50px", border: "2px solid #1a1a2e", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", boxSizing: "border-box" as const }}>
          ← Back to Kids & Family
        </Link>
      </div>
    </main>
  );
}
