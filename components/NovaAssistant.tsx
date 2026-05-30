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
        .nova-popup {
          position: fixed;
          bottom: 160px;
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
          max-height: 480px;
        }
        @media (min-width: 768px) {
          .nova-popup {
            width: 400px;
            max-height: 600px;
            bottom: 100px;
            right: 32px;
          }
        }
        @media (min-width: 1024px) {
          .nova-popup {
            width: 440px;
            max-height: 700px;
            bottom: 80px;
            right: 40px;
          }
        }
        .nova-btn {
          position: fixed;
          bottom: 90px;
          right: 20px;
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
        }
        @media (min-width: 768px) {
          .nova-btn {
            bottom: 40px;
            right: 40px;
            width: 64px;
            height: 64px;
          }
        }
        .nova-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
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
        }
        .nova-input-area {
          padding: 10px;
          background: #ffffff;
          border-top: 1px solid rgba(0,0,0,0.06);
          display: flex;
          gap: 8px;
          flex-shrink: 0;
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
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%",
              overflow: "hidden", border: "2px solid #c9a84c",
              flexShrink: 0, background: "#c9a84c",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <img
                src="/ailogo.png"
                alt="NOVA"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  if (e.currentTarget.parentElement) e.currentTarget.parentElement.textContent = "🤖";
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: "#c9a84c" }}>
                NOVA
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>
                TAP LONDON AI Guide • Online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none", border: "none",
                color: "rgba(255,255,255,0.6)", fontSize: "1.2rem",
                cursor: "pointer", padding: "4px", lineHeight: 1,
              }}
            >✕</button>
          </div>

          {/* Messages */}
          <div className="nova-messages">
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "84%",
                  background: msg.role === "user" ? "#1a1a2e" : "#ffffff",
                  color: msg.role === "user" ? "#c9a84c" : "#1a1a2e",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  padding: "10px 13px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.83rem",
                  lineHeight: 1.55,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  border: msg.role === "assistant" ? "1px solid rgba(201,168,76,0.15)" : "none",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  background: "#ffffff",
                  borderRadius: "16px 16px 16px 4px",
                  padding: "10px 14px",
                  fontSize: "0.82rem",
                  color: "#888",
                  border: "1px solid rgba(201,168,76,0.15)",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  NOVA is thinking... 🤔
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          <div className="nova-quick">
            {["Best places?", "Halal food?", "Tube tips?", "Emergency?", "Free things?", "Mosques?"].map((q) => (
              <button key={q} onClick={() => setInput(q)} style={{
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "20px",
                padding: "4px 10px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                color: "#1a1a2e",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontWeight: 600,
              }}>{q}</button>
            ))}
          </div>

          {/* Input */}
          <div className="nova-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about London..."
              style={{
                flex: 1,
                background: "#f9f7f2",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "50px",
                padding: "9px 16px",
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
                background: input.trim() ? "#c9a84c" : "#ddd",
                border: "none",
                borderRadius: "50%",
                width: "38px",
                height: "38px",
                cursor: input.trim() ? "pointer" : "not-allowed",
                fontSize: "0.9rem",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
            >➤</button>
          </div>
        </div>
      )}
    </>
  );
}
