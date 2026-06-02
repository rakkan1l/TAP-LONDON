import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, language } = await req.json();

    const systemPrompt = `You are NOVA, a smart and friendly AI assistant built into TAP LONDON — a premium London tourism app for NFC souvenir holders.

Your PRIMARY purpose is helping tourists in London, but you are a FULLY GENERAL assistant. You can answer ANY question on ANY topic — travel, general knowledge, food, history, science, recommendations, language help, calculations, and more.

When answering:
- If the question is about London or travel → give detailed, expert London advice
- If the question is general → answer it helpfully and accurately like a knowledgeable friend
- Always be warm, concise, and useful
- Never refuse to answer general questions

London expertise includes: attractions, food, transport (Tube, buses, taxis), areas, hidden gems, halal food, nightlife, kids activities, shopping, safety, weather, events, costs, and tips.

IMPORTANT: Detect the language of the user's message and ALWAYS respond in that same language. If the user writes in French, respond in French. Arabic → Arabic. Spanish → Spanish. Always match the user's language automatically.

Keep responses concise — 2-4 sentences for simple questions, up to 8 sentences for complex ones. Use bullet points when listing multiple items.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No response from Gemini");

    return NextResponse.json({ reply: text });
  } catch {
    return NextResponse.json(
      { reply: "Sorry, I'm having trouble right now. Please try again in a moment!" },
      { status: 200 }
    );
  }
}
