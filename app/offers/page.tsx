import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offers & Deals in London | TAP LONDON",
  description: "Exclusive partner discounts, NFC deals, and special offers for TAP LONDON tourists."
};

const offers = [
  {
    id: 1,
    category: "Dining",
    badge: "10% OFF",
    title: "Dishoom — All Branches",
    desc: "Show your TAP LONDON souvenir for 10% off your total bill at any Dishoom branch in London.",
    image: "https://images.pexels.com/photos/30021858/pexels-photo-30021858.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "TAP LONDON Partner",
    color: "#c9a84c",
  },
  {
    id: 2,
    category: "Attractions",
    badge: "SKIP QUEUE",
    title: "Tower Bridge Exhibition",
    desc: "TAP LONDON NFC holders can access the fast-track queue at Tower Bridge Exhibition. Show at the entrance.",
    image: "https://images.pexels.com/photos/26624348/pexels-photo-26624348.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Fast Track Access",
    color: "#1a1a2e",
  },
  {
    id: 3,
    category: "Shopping",
    badge: "15% OFF",
    title: "Camden Market Selected Stalls",
    desc: "Exclusive 15% discount at participating stalls in Camden Market. Look for the TAP LONDON sticker.",
    image: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "TAP LONDON Partner",
    color: "#c9a84c",
  },
  {
    id: 4,
    category: "Transport",
    badge: "FREE RIDE",
    title: "Thames Clipper — First Trip",
    desc: "First Thames Clipper river bus trip is free for TAP LONDON souvenir holders. Valid on Embankment to Greenwich route.",
    image: "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Exclusive Offer",
    color: "#059669",
  },
  {
    id: 5,
    category: "Dining",
    badge: "FREE COFFEE",
    title: "Monmouth Coffee — Borough Market",
    desc: "One free coffee with any food purchase at Monmouth Coffee Borough Market. Show your NFC souvenir.",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "TAP LONDON Partner",
    color: "#c9a84c",
  },
  {
    id: 6,
    category: "Experience",
    badge: "20% OFF",
    title: "Thames River Cruise",
    desc: "20% off City Cruises Thames River experience for TAP LONDON holders. Book directly at the pier and show your souvenir.",
    image: "https://images.pexels.com/photos/33794525/pexels-photo-33794525.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "TAP LONDON Partner",
    color: "#c9a84c",
  },
  {
    id: 7,
    category: "Nightlife",
    badge: "FREE ENTRY",
    title: "Sky Garden — Evening Slot",
    desc: "Priority booking link for evening Sky Garden slots exclusively for TAP LONDON NFC holders. Book via our partner link.",
    image: "https://images.pexels.com/photos/34284059/pexels-photo-34284059.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Priority Access",
    color: "#1a1a2e",
  },
  {
    id: 8,
    category: "Shopping",
    badge: "10% OFF",
    title: "Portobello Road Market",
    desc: "10% off at participating antique and vintage stalls on Portobello Road. Show TAP LONDON souvenir at checkout.",
    image: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "TAP LONDON Partner",
    color: "#c9a84c",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Dining": "rgba(201,168,76,0.15)",
  "Attractions": "rgba(26,26,46,0.08)",
  "Shopping": "rgba(124,58,237,0.08)",
  "Transport": "rgba(22,163,74,0.08)",
  "Experience": "rgba(37,99,235,0.08)",
  "Nightlife": "rgba(220,38,38,0.08)",
};

export default function OffersPage() {
  const categories = ["All", "Dining", "Attractions", "Shopping", "Transport", "Experience", "Nightlife"];

  return (
    <section style={{ padding: "48px 20px 64px", minHeight: "100vh", background: "#f9f7f2" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "36px", maxWidth: "700px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#c9a84c", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
            Exclusive for TAP LONDON Holders
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 6vw, 3.2rem)", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.15, marginBottom: "16px" }}>
            Offers & Partner Deals
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555", lineHeight: 1.7 }}>
            Exclusive discounts, fast-track access, and special perks for TAP LONDON NFC souvenir holders. Show your souvenir at the venue to claim.
          </p>
        </div>

        {/* How to claim banner */}
        <div style={{
          background: "#1a1a2e", borderRadius: "16px", padding: "20px 24px",
          marginBottom: "36px", display: "flex", gap: "16px", alignItems: "center",
          flexWrap: "wrap",
        }}>
          <div style={{ fontSize: "2rem" }}>📱</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: "#c9a84c", marginBottom: "4px" }}>
              How to claim your offer
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.5 }}>
              Simply show your TAP LONDON NFC souvenir (keyring, card, tote bag, or coaster) to staff at the venue. No app or code needed.
            </p>
          </div>
        </div>

        {/* Offers Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {offers.map((offer) => (
            <div key={offer.id} style={{
              background: "#ffffff", borderRadius: "16px", overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid rgba(26,26,46,0.08)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}>
              {/* Photo */}
              <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                <img
                  src={offer.image}
                  alt={offer.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
                }} />
                {/* Badge */}
                <div style={{
                  position: "absolute", top: "12px", left: "12px",
                  background: offer.color, color: offer.color === "#c9a84c" ? "#1a1a2e" : "#ffffff",
                  borderRadius: "50px", padding: "5px 14px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
                  fontWeight: 800, letterSpacing: "0.5px",
                }}>
                  {offer.badge}
                </div>
                {/* Category */}
                <div style={{
                  position: "absolute", top: "12px", right: "12px",
                  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "50px", padding: "4px 12px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem",
                  fontWeight: 600, color: "#ffffff",
                }}>
                  {offer.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "18px" }}>
                <div style={{
                  display: "inline-block", background: CATEGORY_COLORS[offer.category] || "rgba(201,168,76,0.1)",
                  borderRadius: "50px", padding: "3px 10px", marginBottom: "10px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 600, color: "#888",
                }}>
                  {offer.tag}
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem",
                  fontWeight: 700, color: "#1a1a2e", marginBottom: "8px", lineHeight: 1.3,
                }}>
                  {offer.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
                  color: "#555", lineHeight: 1.6, marginBottom: "14px",
                }}>
                  {offer.desc}
                </p>
                <div style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
                  color: "#c9a84c", fontWeight: 600,
                }}>
                  <span>📱</span> Show your NFC souvenir to claim
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner CTA */}
        <div style={{
          marginTop: "48px", background: "#1a1a2e", borderRadius: "20px",
          padding: "36px 28px", textAlign: "center",
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🤝</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 700, color: "#c9a84c", marginBottom: "12px" }}>
            Become a TAP LONDON Partner
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 20px" }}>
            Reach thousands of tourists visiting London with your exclusive offer listed on TAP LONDON. Contact us to become a verified partner.
          </p>
          <a href="mailto:Taplondon2026@gmail.com" style={{
            display: "inline-block", background: "#c9a84c", color: "#1a1a2e",
            padding: "12px 28px", borderRadius: "50px",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: "0.88rem", textDecoration: "none",
          }}>
            ✉️ Contact Us
          </a>
        </div>

      </div>
    </section>
  );
}
