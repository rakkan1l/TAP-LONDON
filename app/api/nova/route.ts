"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Gemini API key — called directly from browser to bypass server restrictions
const GEMINI_KEY = "AQ.Ab8RN6LvvZXLzTyFqJXxd3zDcvp98yH32CcAq0AyX_E3x2SsYA";

const SYSTEM_PROMPT = `You are NOVA, a smart friendly AI assistant built into TAP LONDON — a premium London tourism app.

You are a FULLY GENERAL assistant. Answer ANY question on ANY topic — London travel, general knowledge, food, history, science, recommendations, calculations, language help, coding, anything at all.

For London questions: give expert advice on attractions, food, transport, halal food, nightlife, kids activities, shopping, safety, costs, tips.
For general questions: answer helpfully and accurately like ChatGPT would.

CRITICAL: Always detect the user's language and respond in the SAME language automatically.

Keep responses concise and helpful. Use bullet points when listing items.`;

async function callGemini(message: string, history: Message[]): Promise<string> {
  const models = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-pro"];
  
  const contents = [
    ...history.map(m => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    })),
    { role: "user", parts: [{ text: message }] }
  ];

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch { continue; }
  }
  return "I'm having a moment! Try again. For London help: Emergency → 999 | Tube → tfl.gov.uk";
}

export default function NovaAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm NOVA 🗺️ your TAP LONDON AI guide. Ask me anything about London — places, halal food, transport, or emergency help!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await callGemini(userMsg.content, messages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection issue. Try again! 🗺️" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .nova-btn {
          position: fixed; bottom: 24px; right: 24px; z-index: 60;
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, #1a1a2e, #2d2d4e);
          border: 2px solid #c9a84c; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3); overflow: hidden;
          padding: 0; transition: transform 0.2s;
        }
        .nova-btn:hover { transform: scale(1.05); }
        .nova-popup {
          position: fixed; bottom: 92px; right: 16px; z-index: 60;
          width: 320px; max-width: calc(100vw - 32px);
          background: #ffffff; border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.2);
          border: 1px solid rgba(201,168,76,0.3);
          display: flex; flex-direction: column; overflow: hidden;
          height: 75vh; max-height: 520px;
        }
        @media (min-width: 768px) {
          .nova-btn { bottom: 32px; right: 32px; width: 60px; height: 60px; }
          .nova-popup { width: 380px; bottom: 106px; right: 32px; height: 70vh; max-height: 600px; }
        }
        @media (min-width: 1024px) {
          .nova-btn { bottom: 40px; right: 40px; width: 64px; height: 64px; }
          .nova-popup { width: 440px; bottom: 0; right: 40px; border-radius: 20px 20px 0 0; height: 85vh; max-height: 820px; }
        }
        @media (min-width: 1280px) {
          .nova-popup { width: 460px; height: 88vh; max-height: 900px; }
        }
        .nova-messages {
          flex: 1; overflow-y: auto; padding: 16px;
          display: flex; flex-direction: column; gap: 12px; background: #f9f7f2;
        }
        .nova-quick {
          padding: 8px 10px; background: #ffffff;
          border-top: 1px solid rgba(0,0,0,0.06);
          display: flex; gap: 6px; overflow-x: auto; flex-shrink: 0; scrollbar-width: none;
        }
        .nova-quick::-webkit-scrollbar { display: none; }
        .nova-input-area {
          padding: 10px 12px; background: #ffffff;
          border-top: 1px solid rgba(0,0,0,0.06);
          display: flex; gap: 8px; flex-shrink: 0; align-items: center;
        }
        .nova-disclaimer {
          padding: 6px 12px 8px; background: #ffffff; text-align: center;
          font-family: 'DM Sans', sans-serif; font-size: 0.62rem; color: #aaa;
          flex-shrink: 0; border-top: 1px solid rgba(0,0,0,0.04);
        }
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>

      <button onClick={() => setOpen((v) => !v)} aria-label="Open NOVA AI Assistant" className="nova-btn">
        <img src="/ailogo.png" alt="NOVA" style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; if (e.currentTarget.parentElement) { e.currentTarget.parentElement.style.fontSize = "1.6rem"; e.currentTarget.parentElement.innerHTML = "🤖"; } }} />
      </button>

      {open && (
        <div className="nova-popup">
          <div style={{ background: "linear-gradient(135deg, #1a1a2e, #2d2d4e)", padding: "16px", display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", border: "2px solid #c9a84c", flexShrink: 0, background: "#1a1a2e" }}>
              <img src="/ailogo.png" alt="NOVA" style={{ width: "44px", height: "44px", objectFit: "cover" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; if (e.currentTarget.parentElement) e.currentTarget.parentElement.textContent = "🤖"; }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 700, color: "#c9a84c" }}>NOVA</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>TAP LONDON AI Guide • Online</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "1rem", cursor: "pointer", padding: "6px 8px", borderRadius: "8px", lineHeight: 1, fontFamily: "'DM Sans', sans-serif" }}>✕</button>
          </div>

          <div className="nova-messages">
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: "8px", alignItems: "flex-end" }}>
                {msg.role === "assistant" && (
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(201,168,76,0.3)", background: "#1a1a2e" }}>
                    <img src="/ailogo.png" alt="NOVA" style={{ width: "28px", height: "28px", objectFit: "cover" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; if (e.currentTarget.parentElement) e.currentTarget.parentElement.textContent = "🤖"; }} />
                  </div>
                )}
                <div style={{ maxWidth: "78%", background: msg.role === "user" ? "#1a1a2e" : "#ffffff", color: msg.role === "user" ? "#c9a84c" : "#1a1a2e", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "10px 13px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.83rem", lineHeight: 1.55, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: msg.role === "assistant" ? "1px solid rgba(201,168,76,0.12)" : "none", whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(201,168,76,0.3)", background: "#1a1a2e", fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center" }}>🤖</div>
                <div style={{ background: "#ffffff", borderRadius: "16px 16px 16px 4px", padding: "10px 16px", fontSize: "0.82rem", color: "#888", border: "1px solid rgba(201,168,76,0.12)", fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ animation: "pulse 1s infinite" }}>●</span>
                  <span style={{ animation: "pulse 1s 0.2s infinite", margin: "0 3px" }}>●</span>
                  <span style={{ animation: "pulse 1s 0.4s infinite" }}>●</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="nova-quick">
            {["Best places?", "Halal food?", "Tube tips?", "Emergency?", "Free things?", "Mosques?", "Shopping?", "Nightlife?"].map((q) => (
              <button key={q} onClick={() => setInput(q)} style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "20px", padding: "5px 11px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#1a1a2e", cursor: "pointer", whiteSpace: "nowrap", fontWeight: 600 }}>{q}</button>
            ))}
          </div>

          <div className="nova-input-area">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Type your message..."
              style={{ flex: 1, background: "#f9f7f2", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50px", padding: "10px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.83rem", color: "#1a1a2e", outline: "none" }} />
            <button onClick={sendMessage} disabled={loading || !input.trim()}
              style={{ background: input.trim() ? "#c9a84c" : "#e5e5e5", border: "none", borderRadius: "50%", width: "40px", height: "40px", cursor: input.trim() ? "pointer" : "not-allowed", fontSize: "0.95rem", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>➤</button>
          </div>

          <div className="nova-disclaimer">NOVA is AI-powered and may make mistakes</div>
        </div>
      )}
    </>
  );
}
