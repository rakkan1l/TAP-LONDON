import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();
    if (!message) return NextResponse.json({ reply: "Please send a message!" });

    const AIML_KEY = "554919f486f0fe03469709c6971ad093";
    const SYSTEM = "You are NOVA, TAP LONDON AI guide. Help with London: places, halal food, transport, hotels, kids, hidden gems, shopping, sports, emergencies. Detect language and reply in same language. Be warm and helpful with emojis.";

    const msgs = [
      ...history.slice(-6).map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    let aimlError = "";
    let geminiError = "";

    // Try AI/ML API
    try {
      const r = await fetch("https://api.aimlapi.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${AIML_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: SYSTEM }, ...msgs],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
      const d = await r.json();
      const reply = d?.choices?.[0]?.message?.content;
      if (reply) return NextResponse.json({ reply });
      aimlError = `status:${r.status} err:${JSON.stringify(d?.error || d).slice(0,100)}`;
    } catch (e: any) {
      aimlError = e.message;
    }

    // Try Gemini 1.5 Flash
    try {
      const gKey = "AQ.Ab8RN6LvvZXLzTyFqJXxd3zDcvp98yH32CcAq0AyX_E3x2SsYA";
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${gKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM }] },
            contents: [{ role: "user", parts: [{ text: message }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
          }),
        }
      );
      const d = await r.json();
      const text = d?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return NextResponse.json({ reply: text });
      geminiError = `status:${r.status} err:${JSON.stringify(d?.error || d).slice(0,100)}`;
    } catch (e: any) {
      geminiError = e.message;
    }

    // Return debug info so we can see what went wrong
    return NextResponse.json({
      reply: `Debug — AIML: ${aimlError} | Gemini: ${geminiError}`
    });

  } catch (e: any) {
    return NextResponse.json({ reply: `Route error: ${e.message}` });
  }
}
