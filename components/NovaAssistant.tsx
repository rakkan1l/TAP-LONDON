"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are NOVA, the friendly AI tourist assistant for TAP LONDON — a smart NFC tourism guide for London. 

You help tourists with:
- Best places to visit in London
- Halal food and Muslim-friendly restaurants
- Transport (Tube, bus, taxi, Oyster card)
- Emergency help and safety tips
- Shopping areas and markets
- Weather and what to wear
- Hidden gems and local tips
- Things to do for free

Always be friendly, helpful and concise. Answer in the same language the tourist uses. If they write in Arabic, reply in Arabic. If French, reply in French. If Spanish, reply in Spanish, etc.

Keep answers short and practical — tourists are on their phones exploring London!

Always end with a helpful tip or emoji to keep it friendly. 🗺️`;

export default function NovaAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm NOVA 🗺️ your TAP LONDON AI guide. Ask me anything about London — places, food, transport, halal options, or emergency help!",
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
      // Using HuggingFace free inference API with Mistral
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `<s>[INST] ${SYSTEM_PROMPT}

Previous conversation:
${messages.slice(-4).map((m) => `${m.role === "user" ? "Tourist" : "NOVA"}: ${m.content}`).join("\n")}

Tourist: ${userMsg.content} [/INST]`,
            parameters: {
              max_new_tokens: 300,
              temperature: 0.7,
              return_full_text: false,
            },
          }),
        }
      );

      const data = await response.json();
      let reply = "";

      if (Array.isArray(data) && data[0]?.generated_text) {
        reply = data[0].generated_text.trim();
        // Clean up any leftover instruction tags
        reply = reply.replace(/\[INST\].*?\[\/INST\]/gs, "").trim();
        reply = reply.replace(/^(NOVA:|Assistant:)/i, "").trim();
      } else if (data.error) {
        // Model loading — retry message
        reply = "I'm warming up! 🔄 Please ask me again in a few seconds — HuggingFace models need a moment to load.";
      } else {
        reply = "I'm having a moment! Try asking me again. 🗺️";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again! 🗺️",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          zIndex: 60,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#1a1a2e",
          border: "2px solid #c9a84c",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          padding: 0,
          overflow: "hidden",
        }}
        aria-label="Open NOVA AI Assistant"
      >
        <Image
          src="/ailogo.png"
          alt="NOVA AI"
          width={60}
          height={60}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          onError={(e) => {
            // Fallback if image not found
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Fallback text if image fails */}
        <span style={{ position: "absolute", fontSize: "1.4rem" }}>🤖</span>
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "165px",
            right: "16px",
            zIndex: 60,
            width: "340px",
            maxWidth: "calc(100vw - 32px)",
            background: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
            border: "1px solid rgba(201,168,76,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            maxHeight: "500px",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a1a2e, #2d2d4e)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #c9a84c",
                flexShrink: 0,
                position: "relative",
                background: "#c9a84c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/ailogo.png"
                alt="NOVA"
                width={36}
                height={36}
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span style={{ position: "absolute", fontSize: "1rem" }}>🤖</span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#c9a84c",
                }}
              >
                NOVA
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.6)" }}>
                TAP LONDON AI Guide • Online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.5)",
                fontSize: "1.2rem",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "#f9f7f2",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    background: msg.role === "user" ? "#1a1a2e" : "#ffffff",
                    color: msg.role === "user" ? "#c9a84c" : "#1a1a2e",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    padding: "10px 14px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    lineHeight: 1.5,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    border: msg.role === "assistant" ? "1px solid rgba(201,168,76,0.15)" : "none",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px 16px 16px 4px",
                    padding: "10px 16px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "#888",
                    border: "1px solid rgba(201,168,76,0.15)",
                  }}
                >
                  NOVA is thinking... 🤔
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          <div
            style={{
              padding: "8px 12px",
              background: "#ffffff",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              gap: "6px",
              overflowX: "auto",
            }}
          >
            {["Best places?", "Halal food?", "How to use Tube?", "Emergency?"].map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                style={{
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "20px",
                  padding: "4px 10px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  color: "#1a1a2e",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px",
              background: "#ffffff",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything about London..."
              style={{
                flex: 1,
                background: "#f9f7f2",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "50px",
                padding: "9px 14px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
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
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
