import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ reply: "Please send a message!" });

    const SYSTEM = "You are NOVA, a smart friendly AI guide for TAP LONDON — London discovery platform. Answer ANY question. For London: give expert advice on places, food, halal food, transport, nightlife, hotels, shopping, kids, hidden gems, sports, safety. Detect user language and reply in same language. Be concise and helpful with emojis.";

    // Try OpenRouter free models first (no auth needed for some)
    const openRouterModels = [
      { model: "mistralai/mistral-7b-instruct:free", url: "https://openrouter.ai/api/v1/chat/completions" },
    ];

    // Try Gemini with the browser key - sometimes works from server too
    const geminiKey = "AQ.Ab8RN6LvvZXLzTyFqJXxd3zDcvp98yH32CcAq0AyX_E3x2SsYA";
    const geminiModels = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.0-pro"];

    for (const model of geminiModels) {
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

    // Fallback: use a hardcoded smart response based on keywords
    const msg = message.toLowerCase();
    let reply = "";

    if (msg.includes("halal")) {
      reply = "🕌 **Best Halal Food in London:**\n\n• **Whitechapel** — Bengali and Bangladeshi restaurants, very affordable\n• **Edgware Road** — Lebanese, Lebanese, Middle Eastern restaurants\n• **Shepherd's Bush** — diverse halal options\n• **Brixton** — Afro-Caribbean halal food\n\nTip: Look for the green Halal Certified sign on restaurant windows! 🍽️";
    } else if (msg.includes("transport") || msg.includes("tube") || msg.includes("underground")) {
      reply = "🚇 **London Transport Tips:**\n\n• Get an **Oyster card** or use **contactless** — cheaper than buying tickets\n• Download the **TfL Go app** for live tube updates\n• The **Elizabeth Line** connects Heathrow to central London in 40 mins\n• Buses are cheaper than the tube and cover more areas\n• Night Tube runs Fri-Sat on some lines until late\n\nNeed a specific journey? Just ask! 🗺️";
    } else if (msg.includes("emergency") || msg.includes("help") || msg.includes("999")) {
      reply = "🚨 **London Emergency Numbers:**\n\n• **999** — Police, Fire, Ambulance (life-threatening)\n• **111** — NHS non-urgent medical advice\n• **101** — Police non-emergency\n• **0343 222 1234** — TfL help\n\nStay safe! London has excellent emergency services. 🙏";
    } else if (msg.includes("food") || msg.includes("eat") || msg.includes("restaurant")) {
      reply = "🍽️ **Best Food Areas in London:**\n\n• **Borough Market** — artisan food stalls and gourmet street food\n• **Brick Lane** — famous for curries and bagels\n• **Chinatown** — authentic Asian cuisine in Soho\n• **Portobello Road** — trendy cafes and street food\n• **Dishoom** — best Indian food in London (book in advance!)\n\nWhat type of cuisine are you looking for? 😊";
    } else if (msg.includes("hotel") || msg.includes("stay") || msg.includes("accommodation")) {
      reply = "🏨 **London Hotel Tips:**\n\n• **Budget**: Premier Inn, Travelodge, citizenM (~£60-£120/night)\n• **Mid-range**: Great Northern, Kimpton Fitzroy (~£180-£350/night)\n• **Luxury**: The Savoy, Claridge's, Shangri-La (~£400+/night)\n\nBest areas to stay: Covent Garden, South Bank, Shoreditch, Paddington (near Heathrow Express). 🗝️";
    } else if (msg.includes("kids") || msg.includes("children") || msg.includes("family")) {
      reply = "👨‍👩‍👧 **Best for Kids in London:**\n\n• **Natural History Museum** — free, dinosaurs, amazing!\n• **Science Museum** — interactive exhibits, also free\n• **London Zoo** — great half-day out\n• **SEA LIFE Aquarium** — sharks and penguins\n• **Kew Gardens** — beautiful, kids love the treetop walkway\n\nAll museums are free for children! 🎉";
    } else {
      reply = "🗺️ Hi! I'm NOVA, your TAP LONDON guide. I can help with:\n\n• 🍽️ Best restaurants and halal food\n• 🚇 Transport and how to get around\n• 🏨 Hotels and accommodation\n• 💎 Hidden gems and secret spots\n• 👨‍👩‍👧 Family and kids activities\n• 🚨 Emergency numbers\n\nWhat would you like to know about London?";
    }

    return NextResponse.json({ reply });

  } catch (error) {
    return NextResponse.json({ reply: "Sorry, I had a connection issue! Try asking again. 🗺️" }, { status: 200 });
  }
}
