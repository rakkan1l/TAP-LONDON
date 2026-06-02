"use client";

import { useState, useEffect, useRef } from "react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(LANGUAGES[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("taplon-lang");
    if (saved) {
      const found = LANGUAGES.find((l) => l.code === saved);
      if (found) setCurrent(found);
    }
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function select(lang: typeof LANGUAGES[0]) {
    setCurrent(lang);
    localStorage.setItem("taplon-lang", lang.code);
    // Set html lang attribute
    document.documentElement.lang = lang.code;
    // RTL for Arabic
    document.documentElement.dir = lang.code === "ar" ? "rtl" : "ltr";
    setOpen(false);
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "transparent", border: "1px solid rgba(26,26,46,0.15)",
          borderRadius: "50px", padding: "6px 12px",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
          fontWeight: 600, cursor: "pointer", color: "#1a1a2e",
        }}
        className="dark:border-white/20 dark:text-cream"
      >
        <span style={{ fontSize: "1rem" }}>{current.flag}</span>
        <span>{current.label}</span>
        <span style={{ fontSize: "0.6rem", opacity: 0.6 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          background: "#ffffff", borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          border: "1px solid rgba(26,26,46,0.1)",
          zIndex: 9999, minWidth: "180px", overflow: "hidden",
          maxHeight: "320px", overflowY: "auto",
        }}
          className="dark:bg-[#1a1a2e] dark:border-gold/20"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang)}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                width: "100%", padding: "10px 16px", background: "none",
                border: "none", cursor: "pointer", textAlign: "left",
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
                fontWeight: current.code === lang.code ? 700 : 400,
                borderBottom: "1px solid rgba(26,26,46,0.06)",
              }}
              className={`dark:border-white/5 ${current.code === lang.code ? "text-[#c9a84c]" : "text-navy dark:text-cream"} hover:bg-[rgba(201,168,76,0.08)]`}
            >
              <span style={{ fontSize: "1.1rem" }}>{lang.flag}</span>
              <span>{lang.label}</span>
              {current.code === lang.code && <span style={{ marginLeft: "auto", color: "#c9a84c" }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
