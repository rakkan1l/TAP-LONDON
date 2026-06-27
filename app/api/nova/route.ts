import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();
    if (!message) return NextResponse.json({ reply: "Please send a message!" });

    const AIML_KEY = "554919f486f0fe03469709c6971ad093";

    const SYSTEM = `You are NOVA, a smart friendly AI guide built into TAP LONDON — London's best discovery platform.

Your expertise:
- London places, attractions, hidden gems, photo spots
- Halal food: Whitechapel, Edgware Road, Shepherd's Bush, Brixton
- Restaurants, cafes, nightlife, rooftop bars
- Hotels: budget to luxury, family, spa
- Kids activities: museums (free!), parks, SEA LIFE, London Eye
- Transport: Oyster card, contactless, TfL, Tube, Elizabeth line, buses
- Shopping: Oxford Street, Harrods, Carnaby, Camden, Portobello
- Sports: Premier League, Wimbledon, cricket at Lord's
- Hidden gems: Little Venice, Kyoto Garden, Leadenhall Market, Neal's Yard
- Emergency: 999 (fire/police/ambulance), 111 (NHS non-urgent), 101 (police non-emergency)
- Events, offers, seasonal guides, Ramadan food

Rules:
- Detect the user's language and ALWAYS reply in the same language
- Be warm, friendly and helpful with relevant emojis
- Give specific London recommendations with real place names
- Keep answers concise but complete`;

    // Build conversation history
    const messages = [
      ...history.slice(-8).map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.aimlapi.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AIML_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM },
          ...messages,
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;
      if (reply) return NextResponse.json({ reply });
    }

    // Fallback to Gemini
    const geminiKey = "AQ.Ab8RN6LvvZXLzTyFqJXxd3zDcvp98yH32CcAq0AyX_E3x2SsYA";
    for (const model of ["gemini-2.0-flash", "gemini-1.5-flash"]) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM }] },
              contents: [{ role: "user", parts: [{ text: message }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
            }),
          }
        );
        if (res.ok) {
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return NextResponse.json({ reply: text });
        }
      } catch { continue; }
    }

    return NextResponse.json({ reply: "I\'m having a moment! 🗺️ For urgent help: Emergency **999**, NHS **111**, TfL **0343 222 1234**" });

  } catch (error) {
    return NextResponse.json({ reply: "Connection issue. Please try again! 🗺️" }, { status: 200 });
  }
}
