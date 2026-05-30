"use client";
import { useEffect, useState } from "react";

interface Weather {
  temp: number;
  feels: number;
  desc: string;
  icon: string;
  humidity: number;
  wind: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // London coordinates — no API key needed for Open-Meteo (completely free)
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Europe/London"
    )
      .then((r) => r.json())
      .then((data) => {
        const c = data.current;
        const code = c.weather_code;
        setWeather({
          temp: Math.round(c.temperature_2m),
          feels: Math.round(c.apparent_temperature),
          desc: getDesc(code),
          icon: getIcon(code),
          humidity: c.relative_humidity_2m,
          wind: Math.round(c.wind_speed_10m),
        });
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  function getDesc(code: number): string {
    if (code === 0) return "Clear sky";
    if (code <= 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if (code <= 49) return "Foggy";
    if (code <= 59) return "Drizzle";
    if (code <= 69) return "Rainy";
    if (code <= 79) return "Snowy";
    if (code <= 82) return "Rain showers";
    if (code <= 99) return "Thunderstorm";
    return "Variable";
  }

  function getIcon(code: number): string {
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

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#888" }}>
        <span>🌡️</span> Loading weather...
      </div>
    );
  }

  if (error || !weather) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(201,168,76,0.1)",
        border: "1px solid rgba(201,168,76,0.25)",
        borderRadius: "50px",
        padding: "6px 14px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span style={{ fontSize: "1.2rem" }}>{weather.icon}</span>
      <div>
        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1a1a2e" }}>
          London {weather.temp}°C
        </div>
        <div style={{ fontSize: "0.68rem", color: "#666" }}>
          {weather.desc} · Feels {weather.feels}°C
        </div>
      </div>
      <div style={{ fontSize: "0.68rem", color: "#888", borderLeft: "1px solid rgba(0,0,0,0.1)", paddingLeft: "10px" }}>
        💧 {weather.humidity}%<br />
        💨 {weather.wind}km/h
      </div>
    </div>
  );
}
