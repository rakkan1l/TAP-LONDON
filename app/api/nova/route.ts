import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const apiKey = "AIzaSyD_I58jmUocEbluOOEy5mlyPJtSQLzjIl4";

    const systemPrompt = `You are NOVA, a smart friendly AI assistant built into TAP LONDON — a premium London tourism app.

You are a FULLY GENERAL assistant. Answer ANY question on ANY topic — London travel, general knowledge, food, history, science, recommendations, calculations, language help, coding, anything at all.

For London questions: give expert advice on attractions, food, transport, halal food, nightlife, kids activities, shopping, safety, costs, tips.
For general questions: answer helpfully and accurately like ChatGPT would.

CRITICAL: Always detect the user's language and respond in the SAME language automatically.

Keep responses concise and helpful. Use bullet points when listing items.`;

    const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];

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
              generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return NextResponse.json({ reply: text });
        }
      } catch (e) {
        continue;
      }
    }

    return NextResponse.json({
      reply: "I'm having a moment! Try again. For London help: Emergency → 999 | Tube → tfl.gov.uk | Halal food → Whitechapel"
    });

  } catch (error) {
    return NextResponse.json({ reply: "Something went wrong. Please try again!" }, { status: 200 });
  }
}
