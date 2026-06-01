"use client";

import { useMemo, useState } from "react";
import PlaceCard, { type CardItem } from "./PlaceCard";
import SearchBar from "./SearchBar";

type DirectoryClientProps = {
  items: CardItem[];
  tabs: string[];
  mode?: "place" | "food" | "shopping";
  searchPlaceholder?: string;
  showSearch?: boolean;
};

const FOOD_FILTERS = [
  { label: "Halal",      value: "halal" },
  { label: "Cheap eats", value: "cheap-eats" },
  { label: "Aesthetic",  value: "aesthetic" },
  { label: "Date night", value: "date-night" },
  { label: "Quick bite", value: "quick-bite" },
  { label: "Open late",  value: "open-late" },
  { label: "Viral",      value: "viral" },
  { label: "Hidden gem", value: "hidden-gem" },
];

export default function DirectoryClient({
  items, tabs, mode = "place", searchPlaceholder, showSearch = true
}: DirectoryClientProps) {
  const [active, setActive] = useState(tabs[0] ?? "All");
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const showFilters = mode === "food";

  const filtered = useMemo(() => {
    // Tab filter
    const source = active === "All"
      ? items
      : items.filter((item) => (item.category ?? item.section) === active);

    // Tag filter
    const tagFiltered = activeFilter
      ? source.filter((item) => item.tags?.includes(activeFilter))
      : source;

    // Search filter
    const needle = query.trim().toLowerCase();
    if (!needle) return tagFiltered;

    return tagFiltered.filter((item) => {
      const text = [
        item.name, item.category, item.section, item.area,
        item.location, item.cuisine, item.type, item.description,
        item.vibe, item.opinion, item.mustTry,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return text.includes(needle);
    });
  }, [active, items, query, activeFilter]);

  return (
    <div className="space-y-6">
      {/* Search + Tabs */}
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        {showSearch ? (
          <SearchBar value={query} onChange={setQuery} placeholder={searchPlaceholder} />
        ) : (
          <div />
        )}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => { setActive(tab); setActiveFilter(null); }}
              className={`min-h-12 shrink-0 rounded-full px-5 text-sm font-bold transition ${
                active === tab
                  ? "bg-navy text-white shadow-premium dark:bg-gold dark:text-navy"
                  : "bg-white text-navy hover:bg-gold/20 dark:bg-white/10 dark:text-cream dark:hover:bg-gold/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filter chips — food mode only */}
      {showFilters && (
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
          {FOOD_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(activeFilter === f.value ? null : f.value)}
              style={{
                flexShrink: 0,
                borderRadius: "50px",
                padding: "6px 14px",
                fontSize: "0.75rem",
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                border: "none",
                transition: "all 0.2s",
                background: activeFilter === f.value ? "#c9a84c" : "rgba(26,26,46,0.06)",
                color: activeFilter === f.value ? "#1a1a2e" : "#555",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <p className="text-sm font-semibold text-ink/62 dark:text-cream/60">
        {filtered.length} results
        {activeFilter && (
          <button
            onClick={() => setActiveFilter(null)}
            style={{ marginLeft: "8px", color: "#c9a84c", fontSize: "0.75rem", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}
          >
            ✕ Clear filter
          </button>
        )}
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <PlaceCard key={item.id} item={item} mode={mode} />
        ))}
      </div>
    </div>
  );
}
