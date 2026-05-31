"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/places", label: "Places", emoji: null, color: null },
  { href: "/food", label: "Food", emoji: null, color: null },
  { href: "/shopping", label: "Shopping", emoji: null, color: null },
  { href: "/transport", label: "Transport", emoji: null, color: null },
  { href: "/kids", label: "Kids", emoji: "", color: null },
  { href: "/nightlife", label: "Nightlife", emoji: "", color: null },
  { href: "/muslim", label: "Muslim", emoji: "", color: "muslim" },
  { href: "/emergency", label: "Emergency", emoji: "", color: "emergency" },
];

interface WeatherData {
  temp: number;
  desc: string;
  icon: string;
}

function getWeatherIcon(code: number): string {
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

function getWeatherDesc(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code <= 49) return "Foggy";
  if (code <= 59) return "Drizzle";
  if (code <= 69) return "Rainy";
  if (code <= 79) return "Snowy";
  if (code <= 82) return "Showers";
  if (code <= 99) return "Thunderstorm";
  return "Variable";
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
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("taplon-dark");
    if (stored === "true") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current=temperature_2m,weather_code&timezone=Europe%2FLondon"
    )
      .then((r) => r.json())
      .then((data) => {
        const c = data.current;
        setWeather({
          temp: Math.round(c.temperature_2m),
          desc: getWeatherDesc(c.weather_code),
          icon: getWeatherIcon(c.weather_code),
        });
      })
      .catch(() => null);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("taplon-dark", String(next));
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function getDesktopStyle(color: string | null) {
    if (color === "emergency") return { color: "#dc2626", fontWeight: 700 };
    if (color === "muslim") return { color: "#059669", fontWeight: 700 };
    return {};
  }

  function getMobileStyle(color: string | null, active: boolean) {
    if (active) return { background: "#1a1a2e", color: "#ffffff" };
    if (color === "emergency") return { background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" };
    if (color === "muslim") return { background: "#f0fdf4", color: "#059669", border: "1px solid #bbf7d0" };
    return { background: dark ? "#2a2a3e" : "#ffffff", color: dark ? "#f9f7f2" : "#1a1a2e" };
  }

  const wText = dark ? "#e5e5e5" : "#1a1a2e";
  const wSub = dark ? "#aaaaaa" : "#666666";
  const wBg = dark ? "rgba(201,168,76,0.15)" : "rgba(201,168,76,0.1)";
  const wBorder = dark ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.25)";

  return (
    <header className="sticky top-0 z-50 border-b border-white/35 bg-cream/86 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">

        <Link href="/" className="group flex min-h-12 items-center gap-3" onClick={() => setOpen(false)}>
          <BridgeIcon />
          <span className="font-heading text-xl font-bold tracking-[0.08em] text-navy">TAP LONDON</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

          {/* Weather */}
          {weather && (
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: wBg, border: `1px solid ${wBorder}`,
              borderRadius: "50px", padding: "5px 12px",
              fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
            }}>
              <span style={{ fontSize: "1rem" }}>{weather.icon}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: wText }}>
                {isDesktop ? `${weather.temp}°C` : `London ${weather.temp}°C`}
              </span>
              {isDesktop && (
                <span style={{ fontSize: "0.68rem", color: wSub }}>{weather.desc}</span>
              )}
            </div>
          )}

          {/* Desktop nav links */}
          {isDesktop && navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link relative min-h-11 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition"
                style={getDesktopStyle(link.color)}
                data-active={active}
              >
                {link.emoji && <span className="mr-1">{link.emoji}</span>}
                {link.label}
              </Link>
            );
          })}

          {/* Dark mode */}
          {isDesktop ? (
            <button onClick={toggleDark} style={{
              background: dark ? "#c9a84c" : "#1a1a2e",
              color: dark ? "#1a1a2e" : "#c9a84c",
              border: "none", borderRadius: "50px", padding: "6px 14px",
              fontWeight: 700, fontSize: "0.78rem", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
            }}>
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          ) : (
            <button onClick={toggleDark} style={{
              background: dark ? "#c9a84c" : "#1a1a2e",
              color: dark ? "#1a1a2e" : "#ffffff",
              border: "none", borderRadius: "50%",
              width: "38px", height: "38px",
              cursor: "pointer", fontSize: "0.95rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {dark ? "☀️" : "🌙"}
            </button>
          )}

          {/* Hamburger — mobile only */}
          {!isDesktop && (
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-sm"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {!isDesktop && open && (
        <div className="border-t border-navy/10 bg-cream px-4 pb-5 pt-2">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-full px-5 text-base font-semibold transition"
                  style={getMobileStyle(link.color, active)}
                >
                  {link.emoji && <span className="mr-2">{link.emoji}</span>}
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
