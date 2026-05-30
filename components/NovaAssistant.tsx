"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function NovaAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm NOVA 🗺️ your TAP LONDON AI guide. Ask me anything about London — places, halal food, transport, or emergency help!",
    },
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
      const res = await fetch("/api/nova", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content, history: messages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "Try again! 🗺️" }]);
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
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 60;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a1a2e, #2d2d4e);
          border: 2px solid #c9a84c;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          overflow: hidden;
          padding: 0;
          transition: transform 0.2s;
        }
        .nova-btn:hover { transform: scale(1.05); }

        /* Mobile popup */
        .nova-popup {
          position: fixed;
          bottom: 92px;
          right: 16px;
          z-index: 60;
          width: 320px;
          max-width: calc(100vw - 32px);
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.2);
          border: 1px solid rgba(201,168,76,0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 75vh;
          max-height: 520px;
        }

        /* Tablet */
        @media (min-width: 768px) {
          .nova-btn {
            bottom: 32px;
            right: 32px;
            width: 60px;
            height: 60px;
          }
          .nova-popup {
            width: 380px;
            bottom: 106px;
            right: 32px;
            height: 70vh;
            max-height: 600px;
          }
        }

        /* Desktop / Laptop — tall like Visit London */
        @media (min-width: 1024px) {
          .nova-btn {
            bottom: 40px;
            right: 40px;
            width: 64px;
            height: 64px;
          }
          .nova-popup {
            width: 440px;
            bottom: 0;
            right: 40px;
            border-radius: 20px 20px 0 0;
            height: 85vh;
            max-height: 820px;
          }
        }

        @media (min-width: 1280px) {
          .nova-popup {
            width: 460px;
            height: 88vh;
            max-height: 900px;
          }
        }

        .nova-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f9f7f2;
        }
        .nova-quick {
          padding: 8px 10px;
          background: #ffffff;
          border-top: 1px solid rgba(0,0,0,0.06);
          display: flex;
          gap: 6px;
          overflow-x: auto;
          flex-shrink: 0;
          scrollbar-width: none;
        }
        .nova-quick::-webkit-scrollbar { display: none; }
        .nova-input-area {
          padding: 10px 12px;
          background: #ffffff;
          border-top: 1px solid rgba(0,0,0,0.06);
          display: flex;
          gap: 8px;
          flex-shrink: 0;
          align-items: center;
        }
        .nova-disclaimer {
          padding: 6px 12px 8px;
          background: #ffffff;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          color: #aaa;
          flex-shrink: 0;
          border-top: 1px solid rgba(0,0,0,0.04);
        }
      `}</style>

      {/* NOVA floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open NOVA AI Assistant"
        className="nova-btn"
      >
        <img
          src="/ailogo.png"
          alt="NOVA"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.style.fontSize = "1.6rem";
              e.currentTarget.parentElement.innerHTML = "🤖";
            }
          }}
        />
      </button>

      {/* Chat popup */}
      {open && (
        <div className="nova-popup">

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e, #2d2d4e)",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "50%",
              overflow: "hidden", border: "2px solid #c9a84c",
              flexShrink: 0, background: "#c9a84c",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <img
                src="/ailogo.png"
                alt="NOVA"
                style={{ width: "44px", height: "44px", objectFit: "cover" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  if (e.currentTarget.parentElement) e.currentTarget.parentElement.textContent = "🤖";
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem", fontWeight: 700, color: "#c9a84c",
              }}>
                NOVA
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem", color: "rgba(255,255,255,0.5)",
              }}>
                TAP LONDON AI Guide • Online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.1)", border: "none",
                color: "rgba(255,255,255,0.7)", fontSize: "1rem",
                cursor: "pointer", padding: "6px 8px",
                borderRadius: "8px", lineHeight: 1,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >✕</button>
          </div>

          {/* Messages */}
          <div className="nova-messages">
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                gap: "8px",
                alignItems: "flex-end",
              }}>
                {/* NOVA avatar for assistant messages */}
                {msg.role === "assistant" && (
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    overflow: "hidden", flexShrink: 0,
                    border: "1px solid rgba(201,168,76,0.3)",
                    background: "#1a1a2e",
                  }}>
                    <img
                      src="/ailogo.png"
                      alt="NOVA"
                      style={{ width: "28px", height: "28px", objectFit: "cover" }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                        if (e.currentTarget.parentElement) e.currentTarget.parentElement.textContent = "🤖";
                      }}
                    />
                  </div>
                )}
                <div style={{
                  maxWidth: "78%",
                  background: msg.role === "user" ? "#1a1a2e" : "#ffffff",
                  color: msg.role === "user" ? "#c9a84c" : "#1a1a2e",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  padding: "10px 13px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.83rem",
                  lineHeight: 1.55,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  border: msg.role === "assistant" ? "1px solid rgba(201,168,76,0.12)" : "none",
                  whiteSpace: "pre-wrap",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  overflow: "hidden", flexShrink: 0,
                  border: "1px solid rgba(201,168,76,0.3)",
                  background: "#1a1a2e", fontSize: "0.7rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>🤖</div>
                <div style={{
                  background: "#ffffff",
                  borderRadius: "16px 16px 16px 4px",
                  padding: "10px 16px",
                  fontSize: "0.82rem",
                  color: "#888",
                  border: "1px solid rgba(201,168,76,0.12)",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  <span style={{ animation: "pulse 1s infinite" }}>●</span>
                  <span style={{ animation: "pulse 1s 0.2s infinite", margin: "0 3px" }}>●</span>
                  <span style={{ animation: "pulse 1s 0.4s infinite" }}>●</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          <div className="nova-quick">
            {["Best places?", "Halal food?", "Tube tips?", "Emergency?", "Free things?", "Mosques?", "Shopping?", "Palaces?"].map((q) => (
              <button key={q} onClick={() => { setInput(q); }} style={{
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: "20px",
                padding: "5px 11px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                color: "#1a1a2e",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontWeight: 600,
                transition: "background 0.15s",
              }}>{q}</button>
            ))}
          </div>

          {/* Input */}
          <div className="nova-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                background: "#f9f7f2",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "50px",
                padding: "10px 16px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.83rem",
                color: "#1a1a2e",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: input.trim() ? "#c9a84c" : "#e5e5e5",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: input.trim() ? "pointer" : "not-allowed",
                fontSize: "0.95rem",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
            >➤</button>
          </div>

          {/* Disclaimer — like Visit London */}
          <div className="nova-disclaimer">
            NOVA is AI-powered and may make mistakes
          </div>

        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}

