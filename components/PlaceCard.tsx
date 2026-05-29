"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Navigation, ShieldCheck, Tag } from "lucide-react";
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
};

type PlaceCardProps = {
  item: CardItem;
  mode?: "place" | "food" | "shopping";
};

export default function PlaceCard({ item, mode = "place" }: PlaceCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const category = item.category ?? item.section ?? item.type ?? "London";
  const area = item.area ?? item.location ?? "London";
  const paid = item.priceType === "Paid";
  const fallbackIcon = item.halal ? "🕌" : mode === "food" ? "🍽️" : mode === "shopping" ? "🛍️" : "📍";
  const icon = item.icon ?? fallbackIcon;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -5 }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm transition hover:border-gold hover:shadow-lift"
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
          <div className="absolute inset-0 rounded-t-lg bg-[linear-gradient(135deg,#1a1a2e_0%,#26345f_48%,#c9a84c_100%)]" aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.48))]" aria-hidden="true" />
        <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-navy shadow-sm">
          {category}
        </div>
        <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-navy/78 text-2xl shadow-premium backdrop-blur" aria-hidden="true">
          {icon}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {area ? <span className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-xs font-bold text-navy"><MapPin aria-hidden="true" size={13} />{area}</span> : null}
          {item.priceRange ? <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{item.priceRange}</span> : null}
          {mode === "place" ? <span className={`rounded-full px-3 py-1 text-xs font-bold ${paid ? "bg-navy text-white" : "bg-gold text-navy"}`}>{paid ? "Paid" : "Free"}</span> : null}
          {item.halal ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white">
              <ShieldCheck aria-hidden="true" size={13} /> {item.verifiedHalal ? "Verified halal" : "Ask vendor"}
            </span>
          ) : null}
        </div>

        <h2 className="mt-4 flex items-start gap-2 font-heading text-2xl font-bold leading-tight text-navy">
          <span aria-hidden="true" className="mt-0.5 text-[0.82em]">{icon}</span>
          <span>{item.name}</span>
        </h2>
        {item.cuisine || item.type ? (
          <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold"><Tag aria-hidden="true" size={15} />{item.cuisine ?? item.type}</p>
        ) : null}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink/70">{item.description}</p>

        <div className="mt-4 grid gap-2 text-sm text-ink/68">
          {item.openingHours ? (
            <p className="flex gap-2"><Clock aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-gold" />{item.openingHours}</p>
          ) : null}
          {item.entryFee ? <p className="font-semibold text-navy/75">{item.entryFee}</p> : null}
        </div>

        <div className="mt-auto pt-5">
          {item.mapsUrl ? (
            <a href={item.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy">
              {mode === "place" ? "Get Directions" : "Find on Google Maps"} <Navigation aria-hidden="true" size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
