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
        body: JSON.stringify({
          message: userMsg.content,
          history: messages,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Try again! 🗺️" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection issue. Try again! 🗺️" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* NOVA button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open NOVA AI Assistant"
        style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          zIndex: 60,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1a1a2e, #2d2d4e)",
          border: "2px solid #c9a84c",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          overflow: "hidden",
          padding: 0,
        }}
      >
        <img
          src="/ailogo.png"
          alt="NOVA"
          style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            (e.currentTarget.parentElement as HTMLElement).innerHTML += "🤖";
          }}
        />
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: "160px",
          right: "16px",
          zIndex: 60,
          width: "320px",
          maxWidth: "calc(100vw - 32px)",
          background: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
          border: "1px solid rgba(201,168,76,0.3)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          maxHeight: "480px",
        }}>

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e, #2d2d4e)",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              overflow: "hidden", border: "2px solid #c9a84c",
              flexShrink: 0, background: "#c9a84c",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <img
                src="/ailogo.png"
                alt="NOVA"
                style={{ width: "36px", height: "36px", objectFit: "cover" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  (e.currentTarget.parentElement as HTMLElement).innerHTML = "🤖";
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 700, color: "#c9a84c" }}>NOVA</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>TAP LONDON AI Guide</div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.5)",
              fontSize: "1.1rem", cursor: "pointer", padding: "4px",
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "14px",
            display: "flex", flexDirection: "column", gap: "10px",
            background: "#f9f7f2",
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%",
                  background: msg.role === "user" ? "#1a1a2e" : "#ffffff",
                  color: msg.role === "user" ? "#c9a84c" : "#1a1a2e",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  padding: "10px 13px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  lineHeight: 1.5,
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
                  background: "#ffffff", borderRadius: "16px 16px 16px 4px",
                  padding: "10px 14px", fontSize: "0.82rem", color: "#888",
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
          <div style={{
            padding: "8px 10px", background: "#ffffff",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex", gap: "6px", overflowX: "auto",
          }}>
            {["Best places?", "Halal food?", "Tube tips?", "Emergency?"].map((q) => (
              <button key={q} onClick={() => setInput(q)} style={{
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "20px", padding: "4px 10px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem", color: "#1a1a2e",
                cursor: "pointer", whiteSpace: "nowrap", fontWeight: 600,
              }}>{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: "10px", background: "#ffffff",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex", gap: "8px",
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about London..."
              style={{
                flex: 1, background: "#f9f7f2",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "50px", padding: "8px 14px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem", color: "#1a1a2e", outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: input.trim() ? "#c9a84c" : "#ddd",
                border: "none", borderRadius: "50%",
                width: "36px", height: "36px",
                cursor: input.trim() ? "pointer" : "not-allowed",
                fontSize: "0.9rem", flexShrink: 0,
              }}
            >➤</button>
          </div>
        </div>
      )}
    </>
  );
}
