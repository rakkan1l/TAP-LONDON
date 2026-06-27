import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();
    if (!message) return NextResponse.json({ reply: "Please send a message!" });

    const AIML_KEY = "554919f486f0fe03469709c6971ad093";
    const SYSTEM = "You are NOVA, TAP LONDON AI guide. Help with London: places, halal food, transport, hotels, kids, hidden gems, shopping, sports, emergencies. Detect language and reply in same language. Be warm and helpful.";

    const msgs = [
      ...history.slice(-6).map((m: any) => ({ role: m.role === "user" ? "user" : "assistant", content: m.content })),
      { role: "user", content: message },
    ];

    // Try AI/ML API
    try {
      const r = await fetch("https://api.aimlapi.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${AIML_KEY}` },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: SYSTEM }, ...msgs],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
      const d = await r.json();
      console.log("AIML status:", r.status, "data:", JSON.stringify(d).slice(0, 200));
      const reply = d?.choices?.[0]?.message?.content;
      if (reply) return NextResponse.json({ reply });
    } catch (e: any) { console.log("AIML error:", e.message); }

    // Try Gemini 1.5 Flash
    try {
      const gKey = "AQ.Ab8RN6LvvZXLzTyFqJXxd3zDcvp98yH32CcAq0AyX_E3x2SsYA";
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${gKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM }] },
          contents: [{ role: "user", parts: [{ text: message }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
        }),
      });
      const d = await r.json();
      console.log("Gemini status:", r.status, "data:", JSON.stringify(d).slice(0, 200));
      const text = d?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return NextResponse.json({ reply: text });
    } catch (e: any) { console.log("Gemini error:", e.message); }

    return NextResponse.json({ reply: "Connection issue right now. For help: 🚨 Emergency 999 | 🚇 TfL 0343 222 1234 | 🏥 NHS 111" });

  } catch (e: any) {
    console.log("Route error:", e.message);
    return NextResponse.json({ reply: "Something went wrong. Please try again!" });
  }
}
