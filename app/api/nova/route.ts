import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const systemPrompt = `You are NOVA, a smart friendly AI assistant built into TAP LONDON — a premium London tourism app. 

You are a FULLY GENERAL assistant. Answer ANY question on ANY topic — London travel, general knowledge, food, history, science, recommendations, calculations, language help, anything.

When answering London questions: give expert advice on attractions, food, transport, halal food, nightlife, kids activities, shopping, safety, costs, and tips.

For general questions: answer helpfully and accurately like a knowledgeable friend.

CRITICAL: Always detect the user's language and respond in the SAME language automatically.

Keep responses concise — 2-4 sentences for simple questions, up to 8 for complex. Use bullet points when listing items.`;

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ reply: "AI service not configured. Please check back soon!" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: message }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini error:", err);
      throw new Error("Gemini API failed");
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No text in response");

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("NOVA error:", error);
    return NextResponse.json(
      { reply: "I'm having a moment! Please try again." },
      { status: 200 }
    );
  }
}
