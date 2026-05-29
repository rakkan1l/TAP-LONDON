"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = "Search London" }: SearchBarProps) {
  return (
    <label className="relative block">
      <span className="sr-only">{placeholder}</span>
      <span className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#da291c] text-white">
        <Search aria-hidden="true" size={20} />
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-16 w-full rounded-full border-[3px] border-[#0019a8] bg-white pl-16 pr-5 text-base font-semibold text-navy outline-none transition placeholder:text-navy/42 focus:border-gold focus:ring-4 focus:ring-gold/20"
      />
    </label>
  );
}
