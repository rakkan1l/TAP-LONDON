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

export default function DirectoryClient({ items, tabs, mode = "place", searchPlaceholder, showSearch = true }: DirectoryClientProps) {
  const [active, setActive] = useState(tabs[0] ?? "All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const source = active === "All" ? items : items.filter((item) => (item.category ?? item.section) === active);
    const needle = query.trim().toLowerCase();
    if (!needle) return source;

    return source.filter((item) => {
      const text = [item.name, item.category, item.section, item.area, item.location, item.cuisine, item.type, item.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return text.includes(needle);
    });
  }, [active, items, query]);

  return (
    <div className="space-y-7">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        {showSearch ? <SearchBar value={query} onChange={setQuery} placeholder={searchPlaceholder} /> : <div />}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`min-h-12 shrink-0 rounded-full px-5 text-sm font-bold transition ${
                active === tab ? "bg-navy text-white shadow-premium" : "bg-white text-navy hover:bg-gold/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm font-semibold text-ink/62">{filtered.length} results</p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <PlaceCard key={item.id} item={item} mode={mode} />
        ))}
      </div>
    </div>
  );
}
