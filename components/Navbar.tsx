"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "/places", label: "Places", color: null },
  { href: "/food", label: "Food", color: null },
  { href: "/shopping", label: "Shopping", color: null },
  { href: "/transport", label: "Transport", color: null },
  { href: "/kids", label: "Kids", color: null },
  { href: "/nightlife", label: "Nightlife", color: null },
  { href: "/muslim", label: "Muslim Guide", color: "muslim" },
  { href: "/emergency", label: "Emergency", color: "emergency" },
];

const LANGUAGES = [
  { code: "en", label: "EN", flag: "🇬🇧", full: "English" },
  { code: "fr", label: "FR", flag: "🇫🇷", full: "Français" },
  { code: "es", label: "ES", flag: "🇪🇸", full: "Español" },
  { code: "pt", label: "PT", flag: "🇧🇷", full: "Português" },
  { code: "ar", label: "AR", flag: "🇸🇦", full: "العربية" },
  { code: "it", label: "IT", flag: "🇮🇹", full: "Italiano" },
  { code: "zh", label: "ZH", flag: "🇨🇳", full: "中文" },
  { code: "ko", label: "KO", flag: "🇰🇷", full: "한국어" },
  { code: "ja", label: "JA", flag: "🇯🇵", full: "日本語" },
  { code: "nl", label: "NL", flag: "🇳🇱", full: "Nederlands" },
  { code: "hi", label: "HI", flag: "🇮🇳", full: "हिंदी" },
  { code: "de", label: "DE", flag: "🇩🇪", full: "Deutsch" },
];

function getWeatherEmoji(code: number) {
  if (code === 0) return "☀️";
  if (code <= 2) return "⛅";
  if (code === 3) return "☁️";
  if (code <= 49) return "🌫️";
  if (code <= 69) return "🌧️";
  if (code <= 79) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 99) return "⛈️";
  return "🌤️";
}

function BridgeIcon() {
  return (
    <svg aria-hidden="true" className="h-8 w-8 text-gold" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="3" />
      <path d="M9 31h30M14 31V17h6v14M28 31V17h6v14M18 17l6-5 6 5M12 24c6-5 18-5 24 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const langRef = useRef<HTMLDivElement>(null);

  // Dark mode init
  useEffect(() => {
    const saved = localStorage.getItem("taplon-dark");
    const isDark = saved === "true";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("taplon-dark", String(next));
  }

  // Weather fetch
  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true")
      .then((r) => r.json())
      .then((d) => {
        setWeather({
          temp: Math.round(d.current_weather.temperature),
          code: d.current_weather.weathercode,
        });
      })
      .catch(() => {});
  }, []);

  // Language init
  useEffect(() => {
    const saved = localStorage.getItem("taplon-lang");
    if (saved) {
      const found = LANGUAGES.find((l) => l.code === saved);
      if (found) setCurrentLang(found);
    }
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function selectLang(lang: typeof LANGUAGES[0]) {
    setCurrentLang(lang);
    localStorage.setItem("taplon-lang", lang.code);
    document.documentElement.lang = lang.code;
    document.documentElement.dir = lang.code === "ar" ? "rtl" : "ltr";
    setLangOpen(false);
  }

  function getDesktopClass(color: string | null) {
    if (color === "emergency") return "text-red-600 hover:text-red-700 font-bold";
    if (color === "muslim") return "text-emerald-600 hover:text-emerald-700 font-bold";
    return "text-navy/80 hover:text-navy dark:text-cream/80 dark:hover:text-cream";
  }

  function getMobileClass(color: string | null, active: boolean) {
    if (active) return "bg-navy text-white dark:bg-gold dark:text-navy";
    if (color === "emergency") return "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/30 dark:border-red-800/40";
    if (color === "muslim") return "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/40";
    return "bg-white text-navy hover:bg-white/70 dark:bg-white/10 dark:text-cream dark:hover:bg-white/20";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/35 bg-cream/86 shadow-sm backdrop-blur-xl dark:bg-[#0d0d1a]/90 dark:border-white/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">

        {/* Logo */}
        <Link href="/" className="group flex min-h-12 items-center gap-3" onClick={() => setOpen(false)}>
          <BridgeIcon />
          <span className="font-heading text-xl font-bold tracking-[0.08em] text-navy dark:text-cream">
            TAP LONDON
          </span>
        </Link>

        {/* Right side — weather + lang + dark + hamburger */}
        <div className="flex items-center gap-2">

          {/* Weather widget */}
          {weather && (
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-white/10 border border-navy/10 dark:border-white/15 px-3 py-1.5 text-sm font-semibold text-navy dark:text-cream shadow-sm backdrop-blur">
              <span>{getWeatherEmoji(weather.code)}</span>
              <span>London {weather.temp}°C</span>
            </div>
          )}

          {/* Language selector */}
          <div ref={langRef} style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-full bg-white/80 dark:bg-white/10 border border-navy/10 dark:border-white/15 px-3 py-1.5 text-sm font-semibold text-navy dark:text-cream shadow-sm backdrop-blur"
              style={{ minHeight: "36px" }}
            >
              <span style={{ fontSize: "1rem" }}>{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
              <span style={{ fontSize: "0.55rem", opacity: 0.5 }}>{langOpen ? "▲" : "▼"}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-[9999] min-w-[160px] rounded-2xl border border-navy/10 dark:border-gold/20 bg-white dark:bg-[#1a1a2e] shadow-xl overflow-hidden"
                style={{ maxHeight: "300px", overflowY: "auto" }}>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLang(lang)}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm border-b border-navy/5 dark:border-white/5 hover:bg-gold/10 transition ${currentLang.code === lang.code ? "text-[#c9a84c] font-bold" : "text-navy dark:text-cream font-normal"}`}
                  >
                    <span style={{ fontSize: "1rem" }}>{lang.flag}</span>
                    <span>{lang.full}</span>
                    {currentLang.code === lang.code && <span className="ml-auto text-[#c9a84c]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleDark}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy dark:bg-gold text-white dark:text-navy shadow-sm text-lg"
            aria-label="Toggle dark mode"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* Hamburger */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 dark:border-white/15 bg-white dark:bg-white/10 text-navy dark:text-cream shadow-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy/10 dark:border-white/10 bg-cream dark:bg-[#0d0d1a] px-4 pb-5 pt-2">
          <div className="mx-auto grid max-w-7xl gap-2">
            {/* Weather in mobile menu */}
            {weather && (
              <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-navy/60 dark:text-cream/50">
                <span>{getWeatherEmoji(weather.code)}</span>
                <span>London {weather.temp}°C</span>
              </div>
            )}
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center rounded-full px-5 text-base font-semibold transition ${getMobileClass(link.color, active)}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
