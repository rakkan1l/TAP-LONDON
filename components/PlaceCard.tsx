"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin, Navigation, Tag } from "lucide-react";
import { useState } from "react";

export type CardItem = {
  id: string;
  name: string;
  category?: string;
  section?: string;
  area?: string;
  location?: string;
  cuisine?: string;
  type?: string;
  priceRange?: string;
  icon?: string;
  image?: string;
  halal?: boolean;
  verifiedHalal?: boolean;
  description: string;
  openingHours?: string;
  entryFee?: string;
  priceType?: string;
  mapsUrl?: string;
  offer?: boolean;
  offerText?: string;
  mustTry?: string;
  vibe?: string;
  opinion?: string;
  tags?: string[];
};

const VIBE_COLORS: Record<string, { bg: string; text: string }> = {
  "Date night":  { bg: "rgba(220,38,38,0.1)",   text: "#dc2626" },
  "Hidden gem":  { bg: "rgba(124,58,237,0.1)",   text: "#7c3aed" },
  "Quick bite":  { bg: "rgba(37,99,235,0.1)",    text: "#2563eb" },
  "Aesthetic":   { bg: "rgba(236,72,153,0.1)",   text: "#ec4899" },
  "Family":      { bg: "rgba(22,163,74,0.1)",    text: "#16a34a" },
};

type PlaceCardProps = {
  item: CardItem;
  mode?: "place" | "food" | "shopping" | "kids" | "nightlife";
};

export default function PlaceCard({ item, mode = "place" }: PlaceCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const category = item.category ?? item.section ?? item.type ?? "London";
  const area = item.area ?? item.location ?? "London";
  const paid = item.priceType === "Paid";
  const fallbackIcon = mode === "food" ? "🍽️" : mode === "shopping" ? "🛍️" : "📍";
  const icon = item.icon ?? fallbackIcon;
  const vibeStyle = item.vibe ? VIBE_COLORS[item.vibe] : null;

  const card = (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -5 }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm transition hover:border-gold hover:shadow-lift dark:border-gold/20 dark:bg-navy/80"
    >
      <div className="relative h-[200px] overflow-hidden rounded-t-lg bg-navy">
        {item.image && !imageFailed ? (
          <img
            src={item.image}
            alt={`${item.name} in London`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full rounded-t-lg object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 rounded-t-lg bg-[linear-gradient(135deg,#1a1a2e_0%,#26345f_48%,#c9a84c_100%)]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.48))]" />

        <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-navy shadow-sm dark:bg-navy dark:text-gold dark:border dark:border-gold/30">
          {category}
        </div>

        {item.offer && (
          <div style={{
            position: "absolute", bottom: "12px", left: "12px",
            background: "#c9a84c", color: "#1a1a2e",
            borderRadius: "50px", padding: "4px 12px",
            fontSize: "0.68rem", fontWeight: 800,
            fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.5px",
          }}>
            {item.offerText ?? "OFFER"}
          </div>
        )}

        <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-navy/78 text-2xl shadow-premium backdrop-blur">
          {icon}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {area && (
            <span className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-xs font-bold text-navy dark:bg-white/10 dark:text-cream">
              <MapPin size={13} />{area}
            </span>
          )}
          {item.priceRange && (
            <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white dark:bg-gold dark:text-navy">
              {item.priceRange}
            </span>
          )}
          {mode === "place" && (
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${paid ? "bg-navy text-white dark:bg-white/20 dark:text-cream" : "bg-gold text-navy"}`}>
              {paid ? "Paid" : "Free"}
            </span>
          )}
          {item.vibe && vibeStyle && (
            <span style={{
              background: vibeStyle.bg, color: vibeStyle.text,
              borderRadius: "50px", padding: "3px 10px",
              fontSize: "0.68rem", fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {item.vibe}
            </span>
          )}
        </div>

        <h2 className="mt-4 flex items-start gap-2 font-heading text-2xl font-bold leading-tight text-navy dark:text-cream">
          <span className="mt-0.5 text-[0.82em]">{icon}</span>
          <span>{item.name}</span>
        </h2>

        {item.cuisine || item.type ? (
          <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold">
            <Tag size={15} />{item.cuisine ?? item.type}
          </p>
        ) : null}

        {item.opinion && (
          <p className="mt-2 text-sm font-semibold italic" style={{ color: "#c9a84c" }}>
            &ldquo;{item.opinion}&rdquo;
          </p>
        )}

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/70 dark:text-cream/70">
          {item.description}
        </p>

        {item.mustTry && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-gold/10 px-3 py-2">
            <span style={{ fontSize: "0.9rem" }}>🔥</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-gold">Must try </span>
              <span className="text-xs text-ink/70 dark:text-cream/70">{item.mustTry}</span>
            </div>
          </div>
        )}

        <div className="mt-4 grid gap-2 text-sm text-ink/68 dark:text-cream/60">
          {item.openingHours && (
            <p className="flex gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
              {item.openingHours}
            </p>
          )}
          {item.entryFee && (
            <p className="font-semibold text-navy/75 dark:text-cream/70">{item.entryFee}</p>
          )}
        </div>

        <div className="mt-auto pt-5">
          {item.mapsUrl && (
            <a
              href={item.mapsUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy dark:bg-gold/20 dark:text-cream dark:hover:bg-gold dark:hover:text-navy"
            >
              {mode === "place" ? "Get Directions" : "Find on Google Maps"} <Navigation size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );

  // Only these modes open detail pages
  if (mode === "place") {
    return (
      <Link href={`/places/${item.id}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        {card}
      </Link>
    );
  }
  if (mode === "food") {
    return (
      <Link href={`/food/${item.id}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        {card}
      </Link>
    );
  }
  if (mode === "shopping") {
    return (
      <Link href={`/shopping/${item.id}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        {card}
      </Link>
    );
  }

  // Kids and Nightlife — NOT clickable, just show the card
  return card;
}
