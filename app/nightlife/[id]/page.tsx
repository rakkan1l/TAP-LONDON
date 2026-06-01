"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = { params: { id: string } };

const NIGHTLIFE_ITEMS = [
  { id: "sky-garden-night", name: "Sky Garden", category: "Rooftop Bars", area: "Fenchurch Street", icon: "🏙️", image: "https://images.pexels.com/photos/34284059/pexels-photo-34284059.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Free rooftop garden with panoramic London views. Bar and restaurant open until late — book ahead for evening slots.", openingHours: "Mon-Fri until 23:00; Sat-Sun until 21:00", entryFee: "Free — book online", vibe: "Best views in London. Completely free. Book weeks in advance.", tips: ["Book free tickets at skygarden.london", "Evening slots book out weeks ahead", "Smart casual dress code", "Cocktails are pricey but the view is worth it"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sky+Garden+London" },
  { id: "radio-rooftop", name: "Radio Rooftop Bar", category: "Rooftop Bars", area: "Strand", icon: "🍸", image: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Stylish rooftop bar atop ME London hotel with sweeping views of the Strand, Thames, and London skyline.", openingHours: "Daily 12:00-01:00", entryFee: "Free entry; cocktails £££", vibe: "One of the most glamorous rooftop bars in central London.", tips: ["Book a table in advance", "Dress smart — strict door policy", "Sunset hour is the best time to go", "Cocktail list is excellent"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Radio+Rooftop+Bar+London" },
  { id: "aqua-spirit", name: "Aqua Spirit", category: "Rooftop Bars", area: "Regent Street", icon: "🥂", image: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Rooftop cocktail bar above Regent Street with views over the West End. Glamorous setting with resident DJs on weekends.", openingHours: "Mon-Sat 12:00-01:00; Sun 12:00-00:00", entryFee: "Free entry; cocktails £££", vibe: "West End views, excellent cocktails, and a vibrant weekend atmosphere.", tips: ["Book ahead for weekend evenings", "DJs from Thursday to Saturday", "Smart dress required", "Great for birthdays and special occasions"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aqua+Spirit+Rooftop+London" },
  { id: "madison-bar", name: "Madison Bar", category: "Rooftop Bars", area: "St Paul's", icon: "🌆", image: "https://images.pexels.com/photos/29014277/pexels-photo-29014277.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Rooftop terrace with an unbeatable view of St Paul's Cathedral. Perfect for sunset drinks.", openingHours: "Mon-Sat 12:00-01:00; Sun until 22:30", entryFee: "Free entry; drinks ££", vibe: "St Paul's Cathedral directly in front of you. Unbeatable.", tips: ["Best at golden hour", "Less pretentious than other rooftops", "Good wine and cocktail selection", "Book for Friday and Saturday evenings"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Madison+Bar+London+St+Pauls" },
  { id: "fabric-london", name: "Fabric London", category: "Clubs", area: "Farringdon", icon: "🎵", image: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800", description: "One of the world's most famous nightclubs — three rooms, top international DJs, open until 6am.", openingHours: "Fri-Sat 22:00-06:00", entryFee: "Paid — tickets online", vibe: "A true London institution. The sound system is legendary.", tips: ["Buy tickets online in advance — can sell out", "Arrive after midnight for peak atmosphere", "Strictly enforced photo policy inside", "Smart trainers and dark clothing is the vibe"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fabric+London+Farringdon" },
  { id: "egg-london", name: "EGG London", category: "Clubs", area: "King's Cross", icon: "🔊", image: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Multi-room club with indoor and outdoor spaces near King's Cross. House and techno with garden terrace.", openingHours: "Fri-Sat 22:00-07:00", entryFee: "Paid — tickets online", vibe: "The outdoor garden terrace is what makes EGG special.", tips: ["Outdoor terrace is the highlight in summer", "Book ahead for big DJ nights", "King's Cross station is walking distance", "Open until 7am — a proper night out"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=EGG+London+Kings+Cross" },
  { id: "xoyo", name: "XOYO", category: "Clubs", area: "Shoreditch", icon: "🎤", image: "https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Shoreditch venue hosting top DJs, live bands, and club nights across two floors.", openingHours: "Thu-Sat from 22:00", entryFee: "Paid — varies by event", vibe: "Shoreditch's best club. Great for live music and electronic nights.", tips: ["Check programme on their website", "Two floors — check which artist is on which", "Shoreditch location — lots of bars nearby for pre-drinks", "Thursday nights are often cheaper"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=XOYO+Shoreditch+London" },
  { id: "corsica-studios", name: "Corsica Studios", category: "Clubs", area: "Elephant & Castle", icon: "🎧", image: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Underground venue with excellent sound system and adventurous electronic music bookings.", openingHours: "Fri-Sat from 22:00", entryFee: "Paid — book in advance", vibe: "The most underground feel of any London club. The sound is unreal.", tips: ["Less mainstream — adventurous music policy", "Book in advance", "Elephant & Castle is on the Northern and Bakerloo lines", "Outside space available in summer"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Corsica+Studios+London" },
  { id: "ronnie-scotts", name: "Ronnie Scott's Jazz Club", category: "Live Music", area: "Soho", icon: "🎷", image: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800", description: "World-famous jazz club open since 1959. Intimate venue with top international musicians nightly in the heart of Soho.", openingHours: "Mon-Sat from 18:00; Sun from 19:00", entryFee: "Paid — book ahead", vibe: "The greatest jazz club in the world. Been going since 1959.", tips: ["Book a table — walk-ins rarely available for big acts", "Late show is cheaper than first show", "Food and drinks served throughout", "Check website for upcoming artists"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ronnie+Scott's+Jazz+Club+London" },
  { id: "jazz-cafe", name: "Jazz Café", category: "Live Music", area: "Camden", icon: "🎺", image: "https://images.pexels.com/photos/32604930/pexels-photo-32604930.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Legendary Camden venue with jazz, soul, R&B, and hip hop live performances. Intimate with balcony overlooking the stage.", openingHours: "Nightly from 19:00", entryFee: "Paid — varies by show", vibe: "The most intimate live music venue in London. Every seat is a good seat.", tips: ["Balcony seats give the best view", "Check programme on their website", "Camden is great for pre-show food and drinks", "Book early for popular acts"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jazz+Cafe+Camden+London" },
  { id: "o2-arena-music", name: "The O2 Arena", category: "Live Music", area: "Greenwich", icon: "🎸", image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800", description: "London's biggest music and entertainment venue. World-class concerts, shows, and events.", openingHours: "Event dependent", entryFee: "Paid — varies by event", vibe: "The biggest acts in the world come here. An unmissable London experience.", tips: ["Check upcoming programme at theo2.co.uk", "Take the Elizabeth line to North Greenwich", "Inside Entertainment District has restaurants and bars", "Book accommodation nearby for big events"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=O2+Arena+London" },
  { id: "electric-brixton", name: "Electric Brixton", category: "Live Music", area: "Brixton", icon: "⚡", image: "https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Vibrant south London venue in a converted art deco cinema. Hosts live gigs, club nights, and comedy.", openingHours: "Event dependent; usually from 19:00", entryFee: "Paid — varies", vibe: "The best venue in south London. Beautiful art deco interior.", tips: ["Brixton has great Caribbean food for pre-show dining", "Art deco interior is stunning", "Brixton is on the Victoria line", "Check programme at electricbrixton.uk"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Electric+Brixton+London" },
  { id: "nightjar", name: "Bar Nightjar", category: "Cocktail Bars", area: "Shoreditch", icon: "🍹", image: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Award-winning speakeasy-style bar with pre-Prohibition era cocktails and live jazz. Book a table — essential.", openingHours: "Tue-Sun from 18:00", entryFee: "Free — cocktails £££", vibe: "The most atmospheric bar in London. Feels like a different era.", tips: ["Booking is essential — no walk-ins", "Live jazz nightly — check schedule", "Cocktails are complex and theatrical", "Smart dress required"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bar+Nightjar+Shoreditch" },
  { id: "lyaness", name: "Lyaness", category: "Cocktail Bars", area: "South Bank", icon: "🥃", image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Waterfront bar from award-winning bartender Ryan Chetiyawardana with creative cocktails and Thames views.", openingHours: "Daily 12:00-01:00", entryFee: "Free — cocktails £££", vibe: "The most creative cocktail menu in London. Every drink tells a story.", tips: ["Book ahead for evening", "Thames views from every seat", "Staff are incredibly knowledgeable", "Try the seasonal specials"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lyaness+Bar+London" },
  { id: "nine-lives", name: "Nine Lives", category: "Cocktail Bars", area: "London Bridge", icon: "🐱", image: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Basement cocktail bar and late-night venue near Borough Market with creative drinks and vinyl DJs.", openingHours: "Wed-Sat from 17:00; late nights Fri-Sat", entryFee: "Free entry", vibe: "London's coolest basement bar. The vinyl DJ sets are perfect.", tips: ["Free entry — just buy drinks", "Gets busy after 22:00 on weekends", "Near Borough Market — dinner before drinks", "Creative cocktails at reasonable prices"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Nine+Lives+Bar+London+Bridge" },
  { id: "beigel-bake-night", name: "Brick Lane Beigel Bake", category: "Late Night Food", area: "Brick Lane", icon: "🥯", image: "https://images.pexels.com/photos/4000028/pexels-photo-4000028.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Open 24 hours. Salt beef bagels and cream cheese for under £5. A legendary London late-night institution.", openingHours: "Open 24 hours, 7 days", entryFee: "£", vibe: "A £2.50 salt beef bagel at 3am is a London rite of passage.", tips: ["Open 24 hours — no closing time", "Salt beef bagel with mustard is the order", "Cash only", "Queue is always worth it"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Beigel+Bake+Brick+Lane" },
  { id: "edgware-road-late", name: "Edgware Road Late Night", category: "Late Night Food", area: "Edgware Road", icon: "🌙", image: "https://images.pexels.com/photos/5923508/pexels-photo-5923508.jpeg?auto=compress&cs=tinysrgb&w=800", description: "The entire Edgware Road strip stays open until 3-4am with Lebanese shawarma, shisha, and Arabic sweets.", openingHours: "Until 3:00-4:00am nightly", entryFee: "££", vibe: "London's best late-night halal food strip. Always buzzing.", tips: ["The whole street stays open very late", "Ranoush Juice for shawarma and fresh juices", "Shisha cafes line the street", "Cash is often preferred at smaller spots"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Edgware+Road+London+restaurants" },
  { id: "dishoom-night", name: "Dishoom Late Nights", category: "Late Night Food", area: "Multiple locations", icon: "🍛", image: "https://images.pexels.com/photos/30021858/pexels-photo-30021858.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Dishoom branches stay open until midnight on weekends. Black daal and naan rolls hit differently after a night out.", openingHours: "Until midnight Fri-Sat", entryFee: "££", vibe: "The black daal at midnight is one of London's great pleasures.", tips: ["Open until midnight on Friday and Saturday", "Worth the wait even late at night", "Black daal and naan is the post-night-out order", "Covent Garden and King's Cross branches are central"], mapsUrl: "https://www.google.com/maps/search/?api=1&query=Dishoom+London" },
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

export default function NightlifeDetailPage({ params }: Props) {
  const item = NIGHTLIFE_ITEMS.find((n) => n.id === params.id);
  if (!item) notFound();

  const photos = [item.image, "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800"];

  return (
    <main style={{ minHeight: "100vh", background: "#0d0d1a" }}>
      <div style={{ position: "relative", height: "44vh", minHeight: "250px", overflow: "hidden" }}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.92) 100%)" }} />
        <Link href="/nightlife" style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", borderRadius: "50px", padding: "7px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>← Back</Link>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px 20px" }}>
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c", borderRadius: "50px", padding: "3px 12px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" as const, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>{item.category}</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.7rem, 5.5vw, 2.8rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: "0 0 4px 0" }}>{item.icon} {item.name}</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(201,168,76,0.85)", margin: 0 }}>{item.area} · {item.entryFee}</p>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 16px 60px" }}>
        <PhotoGallery photos={photos} name={item.name} />

        {/* Quick Info */}
        <div style={{ background: "#1a1a2e", borderRadius: "16px", padding: "18px 20px", marginBottom: "18px", border: "1px solid rgba(201,168,76,0.15)", display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { icon: "📍", label: "Location", value: item.area },
            { icon: "🕐", label: "Opening Hours", value: item.openingHours },
            { icon: "💷", label: "Entry", value: item.entryFee },
          ].map((info) => (
            <div key={info.label} style={{ display: "flex", gap: "10px" }}>
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>{info.icon}</span>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const }}>{info.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#f9f7f2", fontWeight: 600, lineHeight: 1.4 }}>{info.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* About */}
        <div style={{ background: "#1a1a2e", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(201,168,76,0.15)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#c9a84c", marginBottom: "10px", marginTop: 0 }}>About</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, margin: 0 }}>{item.description}</p>
        </div>

        {/* Vibe */}
        <div style={{ background: "rgba(201,168,76,0.1)", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(201,168,76,0.25)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#c9a84c", marginBottom: "10px", marginTop: 0 }}>The Vibe</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#f9f7f2", fontStyle: "italic", margin: 0 }}>&ldquo;{item.vibe}&rdquo;</p>
        </div>

        {/* Tips */}
        <div style={{ background: "#1a1a2e", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(201,168,76,0.15)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#c9a84c", marginBottom: "14px", marginTop: 0 }}>Insider Tips</h2>
          {item.tips.map((tip, i) => (
            <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: "0 0 8px 0", display: "flex", gap: "8px" }}>
              <span style={{ color: "#c9a84c", fontWeight: 700, flexShrink: 0 }}>✓</span> {tip}
            </p>
          ))}
        </div>

        <a href={item.mapsUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "#c9a84c", color: "#1a1a2e", padding: "15px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", marginBottom: "12px", boxSizing: "border-box" as const }}>
          📍 Get Directions on Google Maps
        </a>
        <Link href="/nightlife" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "transparent", color: "#f9f7f2", padding: "13px", borderRadius: "50px", border: "2px solid rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", boxSizing: "border-box" as const }}>
          ← Back to Nightlife
        </Link>
      </div>
    </main>
  );
}
