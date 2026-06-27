"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GEMINI_KEY = "AQ.Ab8RN6LvvZXLzTyFqJXxd3zDcvp98yH32CcAq0AyX_E3x2SsYA";
const SYSTEM_PROMPT = `You are NOVA, a smart friendly AI guide built into TAP LONDON — London's discovery platform.

Your job:
- Answer ANY question about London: places, food, halal food, transport, nightlife, hotels, shopping, kids activities, hidden gems, sports, offers, events, safety, emergencies.
- Also answer general questions helpfully on any topic.
- Always detect the user's language and reply in the SAME language.
- Keep answers concise, friendly and useful.
- For London questions be specific — mention real places, real tube stations, real areas.
- Use emojis naturally to make responses feel warm.

London expertise:
- Halal food: Whitechapel, Edgware Road, Shepherd's Bush, Brixton
- Transport: Oyster card, contactless payment, TfL, Tube, bus, Elizabeth line
- Emergency: 999 (police/fire/ambulance), 111 (non-urgent medical)
- Best areas: Shoreditch, Soho, Covent Garden, Camden, Notting Hill, South Bank
- Hidden gems: Little Venice, Kyoto Garden, Leadenhall Market, Neal's Yard`;

async function callGemini(userMessage: string, history: Message[]): Promise<string> {
  const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];
  
  // Build conversation history for context
  const contents = history.slice(-6).map(m => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }]
  }));
  contents.push({ role: "user", parts: [{ text: userMessage }] });

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
            generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch {
      continue;
    }
  }
  return "I\'m having a moment! 🗺️ For urgent London help: Emergency **999**, NHS **111**, TfL **0343 222 1234**";
}

export default function NovaAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I\'m NOVA 🗺️ your TAP LONDON AI guide. Ask me anything about London — places, halal food, transport, hidden gems, or any question!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const reply = await callGemini(userMsg.content, messages);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection issue. Try again! 🗺️" }]);
    } finally {
      setLoading(false);
    }
  }

  const quickQuestions = [
    "Best halal food near me?",
    "How do I use the Tube?",
    "Hidden gems in London?",
    "Best things to do this weekend?",
  ];

  return (
    <>
      <style>{`
        .nova-btn {
          position: fixed; bottom: 24px; right: 24px; z-index: 60;
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, #1a1a2e, #2d2d4e);
          border: 2px solid #c9a84c; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          overflow: hidden; padding: 0; transition: transform 0.2s;
        }
        .nova-btn:hover { transform: scale(1.05); }
        .nova-popup {
          position: fixed; bottom: 92px; right: 16px; z-index: 60;
          width: 340px; max-width: calc(100vw - 32px);
          background: #ffffff; border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.2);
          border: 1px solid rgba(201,168,76,0.3);
          display: flex; flex-direction: column; overflow: hidden;
          height: 75vh; max-height: 540px;
        }
        @media (min-width: 768px) {
          .nova-btn { bottom: 32px; right: 32px; width: 60px; height: 60px; }
          .nova-popup { width: 400px; bottom: 106px; right: 32px; height: 70vh; max-height: 580px; }
        }
        .nova-header {
          background: linear-gradient(135deg, #1a1a2e, #2d2d4e);
          padding: 14px 16px; display: flex; align-items: center;
          justify-content: space-between; flex-shrink: 0;
        }
        .nova-messages {
          flex: 1; overflow-y: auto; padding: 14px;
          background: #f9f7f2; display: flex; flex-direction: column; gap: 10px;
        }
        .nova-msg-user {
          align-self: flex-end; background: #1a1a2e; color: #fff;
          border-radius: 18px 18px 4px 18px; padding: 10px 14px;
          max-width: 82%; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; line-height: 1.5;
        }
        .nova-msg-ai {
          align-self: flex-start; background: #fff; color: #1a1a2e;
          border-radius: 4px 18px 18px 18px; padding: 10px 14px;
          max-width: 88%; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; line-height: 1.6;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid rgba(201,168,76,0.15);
          white-space: pre-wrap;
        }
        .nova-input-row {
          padding: 12px; background: #fff; border-top: 1px solid rgba(201,168,76,0.15);
          display: flex; gap: 8px; flex-shrink: 0;
        }
        .nova-input {
          flex: 1; border: 1px solid rgba(26,26,46,0.15); border-radius: 50px;
          padding: 10px 16px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
          outline: none; background: #f9f7f2; color: #1a1a2e;
        }
        .nova-input:focus { border-color: #c9a84c; }
        .nova-send {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c, #f0d07a);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 1rem;
        }
        .nova-send:disabled { opacity: 0.5; cursor: not-allowed; }
        .nova-typing { display: flex; gap: 4px; align-items: center; padding: 4px 0; }
        .nova-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #c9a84c; animation: novaBounce 1.2s infinite;
        }
        .nova-dot:nth-child(2) { animation-delay: 0.2s; }
        .nova-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes novaBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        .nova-quick {
          display: flex; gap: 6px; flex-wrap: wrap; padding: 0 14px 10px;
        }
        .nova-quick-btn {
          background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3);
          color: #1a1a2e; border-radius: 50px; padding: 5px 12px;
          font-family: 'DM Sans', sans-serif; font-size: 0.72rem; font-weight: 600;
          cursor: pointer; white-space: nowrap;
        }
        .nova-quick-btn:hover { background: rgba(201,168,76,0.2); }
      `}</style>

      <button className="nova-btn" onClick={() => setOpen(v => !v)} aria-label="Open NOVA AI">
        <img src="/nova-avatar.png" alt="NOVA" style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { (e.currentTarget as any).style.display="none"; (e.currentTarget.nextSibling as any).style.display="flex"; }} />
        <div style={{ display: "none", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", fontSize: "1.5rem" }}>🗺️</div>
      </button>

      {open && (
        <div className="nova-popup">
          {/* Header */}
          <div className="nova-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(201,168,76,0.2)", border: "2px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🗺️</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 700, color: "#c9a84c" }}>NOVA</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.66rem", color: "rgba(255,255,255,0.5)" }}>TAP LONDON AI Guide</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem" }}>✕</button>
          </div>

          {/* Messages */}
          <div className="nova-messages">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "nova-msg-user" : "nova-msg-ai"}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="nova-msg-ai">
                <div className="nova-typing">
                  <div className="nova-dot" />
                  <div className="nova-dot" />
                  <div className="nova-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && !loading && (
            <div className="nova-quick">
              {quickQuestions.map(q => (
                <button key={q} className="nova-quick-btn" onClick={() => { setInput(q); inputRef.current?.focus(); }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="nova-input-row">
            <input
              ref={inputRef}
              className="nova-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask anything about London..."
            />
            <button className="nova-send" onClick={sendMessage} disabled={loading || !input.trim()}>
              {loading ? "⏳" : "➤"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
