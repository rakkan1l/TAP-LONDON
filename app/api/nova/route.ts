import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const SYSTEM = `You are NOVA, the friendly AI tourist assistant for TAP LONDON — a smart NFC tourism guide for London. Help tourists with London places, halal food, transport, emergency help, shopping, and local tips. Be friendly, helpful and concise. Answer in the same language the tourist uses. Keep answers short and practical. Always end with a helpful tip or emoji.`;

    const historyText = (history || [])
      .slice(-4)
      .map((m: { role: string; content: string }) =>
        `${m.role === "user" ? "Tourist" : "NOVA"}: ${m.content}`
      )
      .join("\n");

    const prompt = `<s>[INST] ${SYSTEM}\n\n${historyText ? historyText + "\n" : ""}Tourist: ${message} [/INST]`;

    // Try Mistral first
    let response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
        signal: AbortSignal.timeout(15000),
      }
    );

    let data = await response.json();

    // If Mistral is loading, try smaller faster model
    if (data.error || !Array.isArray(data)) {
      response = await fetch(
        "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputs: `<|system|>${SYSTEM}</s><|user|>${message}</s><|assistant|>`,
            parameters: {
              max_new_tokens: 250,
              temperature: 0.7,
              return_full_text: false,
            },
          }),
          signal: AbortSignal.timeout(15000),
        }
      );
      data = await response.json();
    }

    if (Array.isArray(data) && data[0]?.generated_text) {
      let reply = data[0].generated_text
        .replace(/\[INST\][\s\S]*?\[\/INST\]/g, "")
        .replace(/<\|.*?\|>/g, "")
        .replace(/^(NOVA:|Assistant:|<\|assistant\|>)/i, "")
        .trim();

      if (reply.length > 0) {
        return NextResponse.json({ reply });
      }
    }

    if (data.error?.toLowerCase().includes("loading")) {
      return NextResponse.json({
        reply: "I'm warming up! 🔄 Please ask me again in 15 seconds — the AI model is loading.",
      });
    }

    // Fallback — smart static responses
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("halal")) {
      return NextResponse.json({ reply: "For halal food in London, head to Whitechapel for Tayyabs and Lahore Kebab House, or Edgware Road for amazing Arabic restaurants like Ranoush and Maroush. Camden Market also has many halal stalls! 🕌" });
    }
    if (lowerMsg.includes("tube") || lowerMsg.includes("transport")) {
      return NextResponse.json({ reply: "Use contactless card or Oyster card on the Tube — tap in and out every time. Zone 1-2 covers most tourist spots. The Elizabeth line is great for Heathrow. Download Citymapper for real-time directions! 🚇" });
    }
    if (lowerMsg.includes("place") || lowerMsg.includes("visit") || lowerMsg.includes("see")) {
      return NextResponse.json({ reply: "Top London spots: Tower of London, Buckingham Palace, Big Ben, London Eye, Tower Bridge, and Tate Modern. For free visits: British Museum, National Gallery, Natural History Museum, and Sky Garden! 🏛️" });
    }
    if (lowerMsg.includes("emergency") || lowerMsg.includes("help") || lowerMsg.includes("police")) {
      return NextResponse.json({ reply: "Emergency numbers: 999 (Police/Fire/Ambulance), 101 (Non-emergency police), 111 (NHS medical advice). For lost passport call UK Foreign Office: +44 20 7008 5000. Stay safe! 🚨" });
    }
    if (lowerMsg.includes("food") || lowerMsg.includes("eat") || lowerMsg.includes("restaurant")) {
      return NextResponse.json({ reply: "Best food spots: Borough Market for street food, Dishoom for Indian, Padella for pasta, and Camden Market for global cuisine. Check our Food page for 30+ recommendations! 🍽️" });
    }
    if (lowerMsg.includes("mosque") || lowerMsg.includes("prayer") || lowerMsg.includes("muslim")) {
      return NextResponse.json({ reply: "London has many mosques! East London Mosque in Whitechapel is one of the largest. London Central Mosque is near Regent's Park. Check our Muslim Guide page for prayer rooms at airports and shopping centres! 🕌" });
    }
    if (lowerMsg.includes("weather")) {
      return NextResponse.json({ reply: "London weather is unpredictable! Always carry a light jacket. Check the weather widget at the top of our site for live London conditions. Generally cool and rainy — layers are your friend! ☁️" });
    }
    if (lowerMsg.includes("shopping")) {
      return NextResponse.json({ reply: "For shopping: Oxford Street for high street, Bond Street for luxury, Camden Market for vintage/alternative, Portobello Road for antiques. Check our Shopping page for full details! 🛍️" });
    }

    return NextResponse.json({
      reply: "I'm having trouble connecting to my AI brain right now! 🧠 But I can still help — ask me about halal food, tube tips, best places, emergencies, or shopping in London! 🗺️",
    });

  } catch {
    return NextResponse.json({
      reply: "I'm having trouble right now! Ask me about halal food, tube tips, best places to visit, or emergencies and I'll help with built-in knowledge! 🗺️",
    });
  }
}
