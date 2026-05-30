import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const SYSTEM = `You are NOVA, the friendly AI tourist assistant for TAP LONDON. Help tourists with London places, halal food, transport, emergency help, shopping, and local tips. Be friendly, helpful and concise. Answer in the same language the tourist uses. Keep answers short and practical.`;

    const historyText = (history || [])
      .slice(-4)
      .map((m: { role: string; content: string }) =>
        `${m.role === "user" ? "Tourist" : "NOVA"}: ${m.content}`
      )
      .join("\n");

    const prompt = `<s>[INST] ${SYSTEM}\n\n${historyText ? historyText + "\n" : ""}Tourist: ${message} [/INST]`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      }
    );

    const data = await response.json();

    if (Array.isArray(data) && data[0]?.generated_text) {
      let reply = data[0].generated_text
        .replace(/\[INST\][\s\S]*?\[\/INST\]/g, "")
        .replace(/^(NOVA:|Assistant:)/i, "")
        .trim();
      return NextResponse.json({ reply });
    }

    if (data.error?.includes("loading") || data.error?.includes("currently loading")) {
      return NextResponse.json({
        reply: "I'm warming up! 🔄 Please ask me again in 10 seconds — the AI model needs a moment to load.",
      });
    }

    return NextResponse.json({
      reply: "I'm having a moment! Please try again. 🗺️",
    });

  } catch {
    return NextResponse.json({
      reply: "Connection issue on my end. Please try again! 🗺️",
    });
  }
}
