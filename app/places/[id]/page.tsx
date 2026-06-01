import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import places from "@/data/places.json";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const place = places.items.find((p) => p.id === params.id);
  if (!place) return { title: "Place Not Found" };
  return {
    title: `${place.name} | TAP LONDON`,
    description: place.description,
  };
}

export async function generateStaticParams() {
  return places.items.map((p) => ({ id: p.id }));
}

// Rich history data for each place
const PLACE_HISTORY: Record<string, { founded: string; history: string; facts: string[] }> = {
  "tower-of-london": {
    founded: "Founded 1066 by William the Conqueror",
    history: "The Tower of London was built in the 1070s by William the Conqueror following his victory at the Battle of Hastings. He constructed the massive White Tower — the central keep — to defend and proclaim his royal power over the city. Built from limestone imported from Caen in Normandy, it took nearly 20 years to complete. Over the following centuries, successive kings expanded the complex — Richard I, Henry III, and Edward I all added new towers, walls, and a moat. The Tower has served as a royal palace, political prison, place of execution, royal mint, menagerie, and arsenal. Its most famous prisoners include Anne Boleyn, Thomas More, Lady Jane Grey, and even the Kray twins in 1952. Seven people were executed within the Tower walls. Today it houses the Crown Jewels and attracted over 2.8 million visitors in 2025.",
    facts: [
      "Built in the 1070s by William the Conqueror",
      "The White Tower took nearly 20 years to complete",
      "Stone was imported from Caen, Normandy, France",
      "Only 7 people were ever executed inside the Tower walls",
      "Anne Boleyn and Lady Jane Grey were among those executed",
      "The Tower held prisoners for over 850 years",
      "At least 6 ravens must live here by royal decree or the kingdom will fall",
      "The Crown Jewels have been stored here since the 17th century",
      "2,817,852 visitors came in 2025 — 9th most visited UK attraction",
      "Yeoman Warders (Beefeaters) have guarded it since the 15th century",
    ],
  },
  "buckingham-palace": {
    founded: "Built 1703; became royal residence 1837",
    history: "Buckingham Palace began as Buckingham House, built in 1703 for the Duke of Buckingham. King George III purchased it in 1761 as a private residence for Queen Charlotte. It was substantially remodelled by architect John Nash for King George IV from 1826 onwards. Queen Victoria was the first monarch to use it as the official royal London residence when she moved in on 13 July 1837. The famous east wing facing the Mall — where crowds gather — was added in 1913. The palace has 775 rooms, including 19 State Rooms, 52 royal and guest bedrooms, 188 staff bedrooms, 92 offices, and 78 bathrooms.",
    facts: [
      "Originally Buckingham House, built in 1703 for the Duke of Buckingham",
      "Queen Victoria was the first monarch to live here in 1837",
      "The palace has 775 rooms and 78 bathrooms",
      "The State Rooms contain some of the finest art in the Royal Collection",
      "The famous balcony was added as part of the 1913 east wing",
      "The garden covers 39 acres — one of London's largest private gardens",
      "Around 50,000 people visit as guests each year for events and garden parties",
      "The Changing of the Guard has taken place here since 1660",
    ],
  },
  "british-museum": {
    founded: "Founded 1753; opened to the public 1759",
    history: "The British Museum was founded in 1753, making it the world's first public national museum. It was established by an Act of Parliament following the death of Sir Hans Sloane, who bequeathed his collection of 71,000 objects to the nation. The museum opened to the public in 1759 in Montagu House, Bloomsbury. The current building was designed by Sir Robert Smirke and constructed between 1823 and 1852. The famous Reading Room — used by Karl Marx, Charles Darwin, and Oscar Wilde — was added in 1857. The stunning Great Court, designed by Sir Norman Foster, opened in 2000 and is the largest covered public square in Europe.",
    facts: [
      "World's first public national museum, founded 1753",
      "Opened to the public on 15 January 1759",
      "Collection spans 2 million years of human history",
      "Over 8 million objects in the collection",
      "The Rosetta Stone has been on display since 1802",
      "Karl Marx researched Das Kapital in the Reading Room",
      "The Great Court, opened 2000, is Europe's largest covered public square",
      "Designed by Sir Robert Smirke; built 1823-1852",
      "Around 6 million visitors per year",
      "Admission has been free since 2001",
    ],
  },
  "natural-history-museum": {
    founded: "Founded 1881; building opened 1881",
    history: "The Natural History Museum was founded as a separate institution in 1881, having previously been part of the British Museum. The magnificent Romanesque building on Cromwell Road was designed by Alfred Waterhouse and opened on 18 April 1881. Its centrepiece is the grand Central Hall, dominated today by the famous blue whale skeleton (Dippy the Diplodocus formerly held this position). The museum's collections include over 80 million specimens spanning billions of years, making it one of the world's finest natural history collections. The original collections came from Sir Hans Sloane's bequest to the nation in 1753.",
    facts: [
      "Collections span 4.5 billion years of Earth's history",
      "Over 80 million specimens in the collection",
      "Building designed by Alfred Waterhouse, opened 1881",
      "The Romanesque terracotta facade features animals and plants in relief",
      "The blue whale skeleton 'Hope' replaced 'Dippy' the diplodocus in 2017",
      "The Vault displays some of the rarest minerals on Earth including the Aurora Pyramid of Hope diamonds",
      "Charles Darwin's collection forms part of the archives",
      "Around 5 million visitors per year",
      "Free admission for all since the museum opened",
    ],
  },
  "st-pauls-cathedral": {
    founded: "Current building completed 1710; originally 604 AD",
    history: "The first St Paul's Cathedral was founded in 604 AD by King Ethelbert of Kent. The medieval cathedral — Old St Paul's — was one of the largest in Europe before being destroyed in the Great Fire of London in 1666. Sir Christopher Wren designed the current Baroque masterpiece, which was built between 1675 and 1710. Its dome, at 111 metres, dominated the London skyline for 250 years. The cathedral has been the site of numerous state occasions including the funerals of Lord Nelson, the Duke of Wellington, Sir Winston Churchill, and the wedding of Prince Charles and Lady Diana Spencer in 1981.",
    facts: [
      "First cathedral on this site dates to 604 AD",
      "Destroyed in the Great Fire of London in September 1666",
      "Current building designed by Sir Christopher Wren",
      "Built between 1675 and 1710 — Wren's masterpiece",
      "The dome stands 111 metres tall",
      "The Whispering Gallery runs around the inside of the dome — whispers carry across 34 metres",
      "Winston Churchill's funeral was held here in 1965",
      "Prince Charles and Lady Diana married here in 1981",
      "Miraculously survived the Blitz largely intact — a symbol of London's resilience",
      "Wren is buried in the crypt — his epitaph reads 'Reader, if you seek his monument, look around you'",
    ],
  },
  "tower-bridge": {
    founded: "Built 1886-1894; opened 30 June 1894",
    history: "Tower Bridge was built between 1886 and 1894 to a design by Sir Horace Jones and engineer Sir John Wolfe Barry. It was opened by the Prince of Wales (later King Edward VII) on 30 June 1894. The bridge was built to relieve traffic congestion on London Bridge while still allowing river traffic to pass. Its distinctive Gothic Revival towers were designed to complement the nearby Tower of London. The bridge contains a sophisticated Victorian hydraulic system — originally powered by steam — that raises the bascules to allow tall ships to pass. The walkways were closed in 1910 due to their unpopularity and reopened in 1982 as a tourist attraction.",
    facts: [
      "Built between 1886 and 1894 — took 8 years to construct",
      "Opened on 30 June 1894 by the Prince of Wales",
      "Over 11,000 tonnes of steel forms the skeleton",
      "The Gothic stone cladding was designed to match the Tower of London",
      "Originally powered by steam hydraulics; converted to electricity in 1976",
      "The bascules can rise to 86 degrees in just 5 minutes",
      "The high-level walkways were originally for pedestrians but closed in 1910",
      "Glass floor panels were installed in the walkways in 2014",
      "The bridge opens around 800-900 times per year for river traffic",
      "A motorcycle courier once jumped the partly open bridge in 1952",
    ],
  },
  "national-gallery": {
    founded: "Founded 1824; moved to Trafalgar Square 1838",
    history: "The National Gallery was founded in 1824 when the British government purchased 38 paintings from the estate of John Julius Angerstein. The collection was initially displayed at Angerstein's house at 100 Pall Mall. In 1838, the gallery moved to its current home on Trafalgar Square, occupying a building designed by William Wilkins. The collection grew through donations and acquisitions and now holds over 2,300 paintings spanning 700 years of European art from 1250 to 1900. The gallery includes works by Leonardo da Vinci, Michelangelo, Raphael, Rembrandt, Vermeer, Monet, Van Gogh, and Turner. Admission has been free since 1824.",
    facts: [
      "Founded in 1824 with just 38 paintings",
      "Moved to Trafalgar Square in 1838",
      "Over 2,300 paintings in the collection",
      "Covers Western European art from 1250 to 1900",
      "Leonardo da Vinci's 'The Virgin of the Rocks' is a highlight",
      "Van Gogh's 'Sunflowers' is one of the most visited paintings",
      "Free admission since its founding in 1824",
      "Around 6 million visitors per year",
      "The Sainsbury Wing opened in 1991 to house early Renaissance paintings",
      "The gallery owns one of only 17 known paintings by Johannes Vermeer",
    ],
  },
  "hyde-park": {
    founded: "Royal park since 1536; opened to public in 17th century",
    history: "Hyde Park was originally a hunting ground owned by Westminster Abbey until King Henry VIII seized it in 1536 during the Dissolution of the Monasteries. It became a royal hunting ground before being opened to the public in the early 17th century under King James I. The Great Exhibition of 1851 was held here in the Crystal Palace — a vast iron and glass structure. The Serpentine lake was created in 1730 by Queen Caroline, wife of George II. Hyde Park has hosted numerous historic events including anti-war protests, free concerts by The Rolling Stones and Queen, and serves as a starting point for royal processions.",
    facts: [
      "Seized by Henry VIII from Westminster Abbey in 1536",
      "Opened to the public in the early 17th century",
      "Covers 350 acres — one of London's largest Royal Parks",
      "The Serpentine lake was created in 1730 by Queen Caroline",
      "The Great Exhibition of 1851 was held here — attended by 6 million people",
      "Speakers' Corner has been a site for free speech since 1872",
      "The Rolling Stones performed a free concert here for 500,000 people in 1969",
      "Diana, Princess of Wales Memorial Fountain opened in 2004",
      "Horse riding has been permitted here for centuries on Rotten Row",
      "The Lido outdoor swimming area is open in summer",
    ],
  },
  "tate-modern": {
    founded: "Opened 2000 in converted Bankside Power Station",
    history: "Tate Modern opened on 11 May 2000 in the converted Bankside Power Station, designed by Sir Giles Gilbert Scott. The power station operated from 1952 to 1981 before lying derelict. Swiss architects Herzog & de Meuron won the competition to convert it into a gallery, preserving the iconic chimney and turbine hall. The Turbine Hall — 155 metres long — now hosts major annual art installations. A new extension, the Blavatnik Building, opened in 2016, nearly doubling the gallery's capacity. Tate Modern is now one of the world's most visited modern art museums with around 6 million visitors per year.",
    facts: [
      "Opened 11 May 2000 in a converted power station",
      "Bankside Power Station designed by Sir Giles Gilbert Scott in 1947",
      "Converted by Swiss architects Herzog & de Meuron",
      "The Turbine Hall is 155 metres long and 35 metres tall",
      "The Blavatnik Building extension opened in 2016",
      "Around 6 million visitors per year — most visited modern art gallery in the world",
      "The collection includes works by Picasso, Dalí, Warhol, and Rothko",
      "Admission to the permanent collection is free",
      "The viewing level offers panoramic views of St Paul's and the Thames",
      "Connected to St Paul's by the Millennium Bridge",
    ],
  },
  "kew-gardens": {
    founded: "Founded 1759; UNESCO World Heritage Site since 2003",
    history: "The Royal Botanic Gardens, Kew, were founded in 1759 by Princess Augusta, mother of King George III, on a 9-acre site at her estate in Kew. The gardens grew rapidly under the direction of botanist Joseph Banks, who accompanied Captain Cook on his first voyage. By the 19th century, Kew had become the world's leading botanical research institution. The iconic Palm House — built 1844-48 — houses plants from the world's tropical rainforests. In 2003, Kew Gardens was designated a UNESCO World Heritage Site. Today it holds the world's most diverse collection of living plants with over 50,000 species.",
    facts: [
      "Founded in 1759 by Princess Augusta, mother of King George III",
      "UNESCO World Heritage Site since 2003",
      "Over 50,000 plant species — world's most diverse collection",
      "The Palm House built 1844-48 contains tropical rainforest plants",
      "Botanist Joseph Banks shaped the gardens after voyaging with Captain Cook",
      "The Treetop Walkway rises 18 metres above the forest floor",
      "The Great Pagoda was built in 1762 for Princess Augusta",
      "Covers 132 hectares (326 acres)",
      "The Millennium Seed Bank preserves seeds from over 2.4 billion plants",
      "Over 2 million visitors per year",
    ],
  },
  "big-ben": {
    founded: "Clock tower completed 1858; renamed Elizabeth Tower 2012",
    history: "The clock tower now known as the Elizabeth Tower was completed in 1858 as part of the rebuilt Palace of Westminster following the great fire of 1834. The architect was Charles Barry and the Gothic Revival interior was designed by Augustus Pugin. 'Big Ben' technically refers only to the largest bell inside the tower, which weighs 13.7 tonnes. The bell cracked shortly after installation in 1858 and had to be recast. It was renamed the Elizabeth Tower in 2012 to mark Queen Elizabeth II's Diamond Jubilee. The clock fell silent from 2017 to 2022 during extensive conservation works costing £79 million.",
    facts: [
      "Clock tower completed in 1858",
      "Big Ben is the name of the bell, not the tower",
      "The main bell weighs 13.7 tonnes",
      "The clock faces are 7 metres in diameter",
      "Renamed Elizabeth Tower in 2012 for Queen Elizabeth II's Diamond Jubilee",
      "The minute hands are 4.3 metres long",
      "The pendulum is 4 metres long and beats every 2 seconds",
      "The clock stopped for major restoration from 2017 to 2022",
      "Coins placed under the pendulum can adjust the clock's speed",
      "The four clock faces are made of opal glass",
    ],
  },
};

export default function PlaceDetailPage({ params }: Props) {
  const place = places.items.find((p) => p.id === params.id);
  if (!place) notFound();

  const history = PLACE_HISTORY[place.id];

  return (
    <main style={{ minHeight: "100vh", background: "#f9f7f2" }}>

      {/* Hero Image */}
      <div style={{ position: "relative", height: "55vh", minHeight: "300px", overflow: "hidden" }}>
        <img
          src={place.image}
          alt={place.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(26,26,46,0.85) 100%)",
        }} />
        {/* Back button */}
        <Link href="/places" style={{
          position: "absolute", top: "20px", left: "20px",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff",
          borderRadius: "50px", padding: "8px 18px",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
          fontWeight: 600, textDecoration: "none", display: "inline-flex",
          alignItems: "center", gap: "6px",
        }}>
          ← Back to Places
        </Link>
        {/* Title overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "24px 24px 28px",
        }}>
          <div style={{
            display: "inline-block", background: "rgba(201,168,76,0.2)",
            border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c",
            borderRadius: "50px", padding: "4px 14px", fontSize: "0.72rem",
            fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase",
            marginBottom: "10px", fontFamily: "'DM Sans', sans-serif",
          }}>
            {place.category}
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            fontWeight: 700, color: "#ffffff", lineHeight: 1.15,
            margin: 0,
          }}>
            {place.icon} {place.name}
          </h1>
          {history && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
              color: "rgba(201,168,76,0.85)", marginTop: "8px",
            }}>
              🏛️ {history.founded}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 20px 60px" }}>

        {/* Quick Info */}
        <div style={{
          background: "#ffffff", borderRadius: "16px",
          padding: "20px 24px", marginBottom: "24px",
          border: "1px solid rgba(26,26,46,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          display: "flex", flexWrap: "wrap", gap: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1.1rem" }}>📍</span>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Area</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600 }}>{place.area}</div>
            </div>
          </div>
          <div style={{ width: "1px", background: "rgba(0,0,0,0.08)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1.1rem" }}>🕐</span>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Opening Hours</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600 }}>{place.openingHours}</div>
            </div>
          </div>
          <div style={{ width: "1px", background: "rgba(0,0,0,0.08)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1.1rem" }}>{place.priceType === "Free" ? "🎁" : "💷"}</span>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Entry</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600 }}>{place.entryFee}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{
          background: "#ffffff", borderRadius: "16px",
          padding: "24px", marginBottom: "24px",
          border: "1px solid rgba(26,26,46,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px",
          }}>
            About {place.name}
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem",
            color: "#444", lineHeight: 1.8, margin: 0,
          }}>
            {place.description}
          </p>
        </div>

        {/* History Section */}
        {history && (
          <div style={{
            background: "#1a1a2e", borderRadius: "16px",
            padding: "24px", marginBottom: "24px",
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem", fontWeight: 700, color: "#c9a84c", marginBottom: "14px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              📜 History
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
              color: "rgba(255,255,255,0.8)", lineHeight: 1.8, margin: 0,
            }}>
              {history.history}
            </p>
          </div>
        )}

        {/* Fascinating Facts */}
        {history && (
          <div style={{
            background: "#ffffff", borderRadius: "16px",
            padding: "24px", marginBottom: "24px",
            border: "1px solid rgba(26,26,46,0.08)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "16px",
            }}>
              ⭐ Fascinating Facts
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {history.facts.map((fact, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "50%",
                    background: "rgba(201,168,76,0.15)", color: "#c9a84c",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.72rem", fontWeight: 700, flexShrink: 0,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {i + 1}
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
                    color: "#444", lineHeight: 1.6, margin: 0,
                  }}>
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No history fallback */}
        {!history && (
          <div style={{
            background: "#1a1a2e", borderRadius: "16px",
            padding: "24px", marginBottom: "24px",
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem", fontWeight: 700, color: "#c9a84c", marginBottom: "14px",
            }}>
              📜 About This Place
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
              color: "rgba(255,255,255,0.8)", lineHeight: 1.8, margin: 0,
            }}>
              {place.description} This is one of London's most beloved locations, drawing visitors from around the world to experience its unique character and significance.
            </p>
          </div>
        )}

        {/* Visitor Tips */}
        <div style={{
          background: "rgba(201,168,76,0.08)", borderRadius: "16px",
          padding: "24px", marginBottom: "24px",
          border: "1px solid rgba(201,168,76,0.2)",
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "14px",
          }}>
            💡 Visitor Tips
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "Book tickets online in advance to skip the queue",
              "Visit on weekday mornings for smaller crowds",
              "Check the official website for seasonal changes to opening hours",
              "Always verify prices before visiting as they change regularly",
              "Nearby tube stations are usually just a short walk away",
            ].map((tip, i) => (
              <p key={i} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
                color: "#555", lineHeight: 1.6, margin: 0,
                display: "flex", gap: "8px",
              }}>
                <span>✓</span> {tip}
              </p>
            ))}
          </div>
        </div>

        {/* Get Directions Button */}
        {place.mapsUrl && (
          <a
            href={place.mapsUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "8px", width: "100%",
              background: "#1a1a2e", color: "#c9a84c",
              padding: "16px", borderRadius: "50px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
              fontWeight: 700, textDecoration: "none", marginBottom: "16px",
              boxSizing: "border-box",
            }}
          >
            📍 Get Directions on Google Maps
          </a>
        )}

        {/* Back to Places */}
        <Link href="/places" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "8px", width: "100%",
          background: "transparent", color: "#1a1a2e",
          padding: "14px", borderRadius: "50px",
          border: "2px solid #1a1a2e",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
          fontWeight: 600, textDecoration: "none",
          boxSizing: "border-box",
        }}>
          ← Back to All Places
        </Link>

      </div>
    </main>
  );
}
