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

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Europe%2FLondon"
    )
      .then((r) => r.json())
      .then((data) => {
        const c = data.current;
        setWeather({
          temp: Math.round(c.temperature_2m),
          feels: Math.round(c.apparent_temperature),
          desc: getDesc(c.weather_code),
          icon: getIcon(c.weather_code),
          humidity: c.relative_humidity_2m,
          wind: Math.round(c.wind_speed_10m),
        });
      })
      .catch(() => null);
  }, []);

  if (!weather) return null;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "rgba(201,168,76,0.1)",
      border: "1px solid rgba(201,168,76,0.25)",
      borderRadius: "50px",
      padding: "5px 12px",
      fontFamily: "'DM Sans', sans-serif",
      cursor: "default",
    }}>
      <span style={{ fontSize: "1.1rem" }}>{weather.icon}</span>
      <div>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.2 }}>
          {weather.temp}°C · London
        </div>
        <div style={{ fontSize: "0.62rem", color: "#666" }}>
          {weather.desc} · 💧{weather.humidity}%
        </div>
      </div>
    </div>
  );
}
