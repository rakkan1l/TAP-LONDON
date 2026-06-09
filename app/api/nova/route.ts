import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const apiKey = "AQ.Ab8RN6LvvZXLzTyFqJXxd3zDcvp98yH32CcAq0AyX_E3x2SsYA";

    const systemPrompt = "You are NOVA, a smart friendly AI assistant built into TAP LONDON. You are a FULLY GENERAL assistant. Answer ANY question on ANY topic. For London questions give expert advice on attractions, food, transport, halal food, nightlife, kids activities, shopping, safety. For general questions answer helpfully. Always detect the user language and respond in the SAME language. Keep responses concise and helpful.";

    const models = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-pro"];

    for (const model of models) {
      try {
        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey,
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
      reply: "I am having a moment. Try again. For London help: Emergency 999, Tube tfl.gov.uk, Halal food Whitechapel"
    });

  } catch (error) {
    return NextResponse.json({ reply: "Something went wrong. Please try again!" }, { status: 200 });
  }
}
