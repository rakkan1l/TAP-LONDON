import { NextRequest, NextResponse } from "next/server";

const LONDON_FALLBACKS: Record<string, string> = {
  default: "I'm having trouble connecting right now. For London help: Emergency → call 999, Tube info → tfl.gov.uk, halal food → try Tayyabs in Whitechapel, top attraction → Tower of London. Try asking me again!",
};

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("NOVA: GEMINI_API_KEY environment variable not set in Vercel");
      return NextResponse.json({
        reply: "AI service needs setup. Go to Vercel → Settings → Environment Variables → Add GEMINI_API_KEY with your Gemini API key."
      });
    }

    const systemPrompt = `You are NOVA, a smart friendly AI assistant built into TAP LONDON — a premium London tourism app.

You are a FULLY GENERAL assistant. Answer ANY question on ANY topic — London travel, general knowledge, food, history, science, recommendations, calculations, language help, anything.

For London questions: give expert advice on attractions, food, transport, halal food, nightlife, kids activities, shopping, safety, costs, tips.
For general questions: answer helpfully and accurately.

CRITICAL: Always detect the user's language and respond in the SAME language automatically.

Keep responses concise. Use bullet points when listing items.`;

    // Try gemini-1.5-flash first, fallback to gemini-pro
    const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];
    
    let lastError = "";
    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: systemPrompt }] },
              contents: [{ role: "user", parts: [{ text: message }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return NextResponse.json({ reply: text });
          }
        } else {
          const errText = await response.text();
          lastError = `${model}: ${response.status} - ${errText}`;
          console.error("NOVA model error:", lastError);
        }
      } catch (e) {
        lastError = String(e);
        console.error("NOVA fetch error:", e);
      }
    }

    // All models failed
    console.error("All Gemini models failed:", lastError);
    return NextResponse.json({
      reply: "I'm having trouble right now. For quick London help: Tube → tfl.gov.uk | Emergency → 999 | Halal food → Whitechapel | Top spot → Tower of London. Please try again shortly!"
    });

  } catch (error) {
    console.error("NOVA critical error:", error);
    return NextResponse.json(
      { reply: "Something went wrong. Please try again!" },
      { status: 200 }
    );
  }
}
