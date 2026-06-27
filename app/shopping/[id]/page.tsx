"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchDocument } from "@/lib/firestore";
import shoppingJson from "@/data/shopping.json";

export default function ShoppingDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const load = async () => {
      const fbItem = await fetchDocument("shopping", id);
      if (fbItem && fbItem.name) { setItem(fbItem); }
      else { setItem((shoppingJson.items as any[]).find((s: any) => s.id === id) || null); }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(26,26,46,0.4)" }}>Loading...</div>
    </div>
  );

  if (!item) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem" }}>Not found</div>
      <Link href="/shopping" style={{ color: "#c9a84c" }}>← Back to Shopping</Link>
    </div>
  );

  // Build photo array — main image + gallery
  const photos: string[] = [
    item.image,
    ...(Array.isArray(item.gallery) ? item.gallery : [])
  ].filter(Boolean);

  const subShops: any[] = Array.isArray(item.subShops) ? item.subShops : [];

  return (
    <main className="bg-[#f9f7f2] dark:bg-[#0d0d1a]" style={{ minHeight: "100vh" }}>

      {/* HERO with gallery */}
      <div style={{ position: "relative", height: "50vh", minHeight: "300px", overflow: "hidden", background: "#1a1a2e" }}>
        {photos.length > 0 && (
          <img
            src={photos[activePhoto]}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.4s" }}
          />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(26,26,46,0.9) 100%)" }} />

        {/* Back button */}
        <Link href="/shopping" style={{
          position: "absolute", top: "16px", left: "16px",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)", color: "#ffffff",
          borderRadius: "50px", padding: "8px 16px",
          fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 600,
          textDecoration: "none", display: "flex", alignItems: "center", gap: "6px"
        }}>
          ← Shopping
        </Link>

        {/* Photo count badge */}
        {photos.length > 1 && (
          <div style={{
            position: "absolute", top: "16px", right: "16px",
            background: "rgba(0,0,0,0.5)", color: "#fff",
            borderRadius: "50px", padding: "6px 12px",
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.74rem", fontWeight: 600
          }}>
            📷 {photos.length} photos
          </div>
        )}

        {/* Title area */}
        <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
          <div style={{
            display: "inline-block", background: "rgba(201,168,76,0.9)", color: "#1a1a2e",
            borderRadius: "50px", padding: "4px 14px",
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px"
          }}>
            {item.section || item.type || "Shopping"}
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
            {item.name}
          </h1>
          {item.location && (
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", marginTop: "6px" }}>
              📍 {item.location}
            </p>
          )}
        </div>
      </div>

      {/* PHOTO GALLERY THUMBNAILS */}
      {photos.length > 1 && (
        <div style={{ background: "#1a1a2e", padding: "12px 20px", display: "flex", gap: "8px", overflowX: "auto" }}>
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActivePhoto(i)}
              style={{
                flexShrink: 0, width: "64px", height: "64px", borderRadius: "8px", overflow: "hidden",
                border: activePhoto === i ? "2px solid #c9a84c" : "2px solid transparent",
                cursor: "pointer", padding: 0, background: "none"
              }}
            >
              <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}

      {/* CONTENT */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Transport info */}
        {item.nearestStation && (
          <div className="bg-white dark:bg-[#1a1a2e]" style={{
            borderRadius: "14px", padding: "16px 20px", marginBottom: "20px",
            border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", gap: "14px"
          }}>
            <span style={{ fontSize: "1.6rem" }}>🚇</span>
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Nearest Station</div>
              <div className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.92rem", fontWeight: 700 }}>{item.nearestStation}</div>
            </div>
          </div>
        )}

        {/* Info cards row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "24px" }}>
          {item.openingHours && (
            <div className="bg-white dark:bg-[#1a1a2e]" style={{ borderRadius: "12px", padding: "14px", border: "1px solid rgba(201,168,76,0.1)" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>🕐</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>Hours</div>
              <div className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 600, marginTop: "2px" }}>{item.openingHours}</div>
            </div>
          )}
          {item.type && (
            <div className="bg-white dark:bg-[#1a1a2e]" style={{ borderRadius: "12px", padding: "14px", border: "1px solid rgba(201,168,76,0.1)" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>🛍️</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>Type</div>
              <div className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 600, marginTop: "2px" }}>{item.type}</div>
            </div>
          )}
          {item.location && (
            <div className="bg-white dark:bg-[#1a1a2e]" style={{ borderRadius: "12px", padding: "14px", border: "1px solid rgba(201,168,76,0.1)" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>📍</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>Area</div>
              <div className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 600, marginTop: "2px" }}>{item.location}</div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-[#1a1a2e]" style={{ borderRadius: "14px", padding: "20px", marginBottom: "20px", border: "1px solid rgba(201,168,76,0.1)" }}>
          <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "10px" }}>About</h2>
          <p className="text-[#555] dark:text-[#bbb]" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", lineHeight: 1.8 }}>{item.description}</p>
          {item.highlights && (
            <div style={{ marginTop: "14px", padding: "12px 16px", background: "rgba(201,168,76,0.08)", borderRadius: "10px", borderLeft: "3px solid #c9a84c" }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.74rem", fontWeight: 700, color: "#c9a84c", textTransform: "uppercase", letterSpacing: "1px" }}>Key Shops: </span>
              <span className="text-[#555] dark:text-[#bbb]" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem" }}>{item.highlights}</span>
            </div>
          )}
        </div>

        {/* SUB SHOPS */}
        {subShops.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h2 className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "14px" }}>
              🏪 Shops Here
            </h2>
            <div style={{ display: "grid", gap: "10px" }}>
              {subShops.map((shop: any, i: number) => (
                <div key={i} className="bg-white dark:bg-[#1a1a2e]" style={{
                  borderRadius: "12px", padding: "14px 18px",
                  border: "1px solid rgba(201,168,76,0.12)",
                  display: "flex", alignItems: "flex-start", gap: "14px"
                }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
                    border: "1px solid rgba(201,168,76,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", flexShrink: 0
                  }}>
                    🛍️
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span className="text-navy dark:text-[#f9f7f2]" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.92rem", fontWeight: 700 }}>{shop.name}</span>
                      <span style={{
                        background: "rgba(201,168,76,0.12)", color: "#c9a84c",
                        borderRadius: "50px", padding: "2px 10px",
                        fontFamily: "'DM Sans',sans-serif", fontSize: "0.66rem", fontWeight: 700
                      }}>{shop.type}</span>
                    </div>
                    {shop.note && (
                      <p className="text-[#666] dark:text-[#aaa]" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", marginTop: "3px", lineHeight: 1.5 }}>{shop.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Maps button */}
        {item.mapsUrl && (
          <a
            href={item.mapsUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              background: "#1a1a2e", color: "#c9a84c",
              borderRadius: "14px", padding: "16px", width: "100%",
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", fontWeight: 700,
              textDecoration: "none", boxSizing: "border-box"
            }}
          >
            📍 Get Directions on Google Maps
          </a>
        )}
      </div>
    </main>
  );
}
