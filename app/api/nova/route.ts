import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ reply: getFallback(message) });
    }

    const systemPrompt = `You are NOVA, the friendly AI tourist assistant for TAP LONDON — a smart NFC-powered London tourism guide.

You help tourists visiting London with ANY question they have. You are knowledgeable about:
- London attractions, places, landmarks, palaces, museums, parks
- Halal food, Muslim-friendly restaurants, mosques, prayer rooms
- London transport (Tube, bus, taxi, Oyster card, Elizabeth line)
- Emergency help, safety tips, scam warnings, lost documents
- Shopping areas, markets, luxury streets, souvenirs
- Weather, what to wear, best seasons to visit
- Hotels, accommodation, neighbourhoods
- Events, shows, theatre, nightlife
- History and facts about London
- Day trips from London
- General travel questions
- Anything a tourist might ask!

IMPORTANT RULES:
1. ALWAYS give a helpful, specific answer to every question — never say you cannot help
2. Answer in the SAME LANGUAGE the tourist writes in (Arabic→Arabic, French→French, Spanish→Spanish, etc.)
3. Keep answers concise and practical — tourists are on phones
4. Use emojis to make responses friendly and easy to read
5. For specific London places, include the area/neighbourhood
6. Always be warm, friendly and encouraging
7. If asked about something outside London, still try to help or redirect helpfully

You know everything about London. Always give a real, helpful answer!`;

    const conversationHistory = (history || []).slice(-6).map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            ...conversationHistory,
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 600,
            topP: 0.9,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini error:", errorData);
      return NextResponse.json({ reply: getFallback(message) });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply && reply.trim().length > 10) {
      return NextResponse.json({ reply: reply.trim() });
    }

    return NextResponse.json({ reply: getFallback(message) });

  } catch (error) {
    console.error("Nova API error:", error);
    return NextResponse.json({ reply: getFallback("default") });
  }
}

function getFallback(message: string): string {
  const msg = (message || "").toLowerCase();

  if (msg.includes("palace") || msg.includes("buckingham") || msg.includes("hampton") || msg.includes("kensington")) {
    return "👑 London Palaces:\n\n• Buckingham Palace — Westminster, official royal residence. Guards change daily!\n• Hampton Court Palace — East Molesey, Henry VIII's Tudor palace with a maze\n• Kensington Palace — Hyde Park, home of Prince & Princess of Wales\n• Windsor Castle — Windsor (day trip), oldest royal castle\n• Tower of London — Tower Hill, royal fortress with Crown Jewels 💎\n\nBuckingham Palace State Rooms open in summer only. Exterior is free to view anytime!";
  }
  if (msg.includes("halal")) {
    return "🕌 Best halal food in London:\n\n• Tayyabs — Whitechapel (Punjabi grill, legendary!)\n• Lahore Kebab House — Whitechapel\n• Roti King — Euston (Malaysian, always a queue!)\n• Edgware Road — Arabic restaurant strip\n• Ranoush Juice — Lebanese wraps & juices\n• Mangal 2 — Dalston (Turkish grill)\n• Camden Market — many halal stalls\n\nAlways confirm halal status with the restaurant! 🍽️";
  }
  if (msg.includes("tube") || msg.includes("underground") || msg.includes("transport") || msg.includes("bus")) {
    return "🚇 London transport tips:\n\n• Use contactless card or Oyster — tap in AND out\n• Zones 1-2 cover most tourist spots\n• Elizabeth line is great for Heathrow & Bond Street\n• Stand RIGHT on escalators, walk LEFT\n• Peak hours Mon-Fri 7-9am & 5-7pm (more expensive)\n• Night Tube runs Fri & Sat nights\n• Download Citymapper app for real-time directions!";
  }
  if (msg.includes("free") || msg.includes("cheap")) {
    return "🎁 Free things in London:\n\n• British Museum — world class, always free\n• Natural History Museum — dinosaurs & minerals\n• National Gallery — Van Gogh, Monet, Da Vinci\n• Tate Modern — modern art on the South Bank\n• Science Museum — interactive galleries\n• V&A Museum — design & fashion\n• Sky Garden — book free online for skyline views\n• Hyde Park & Regent's Park\n• Thames Path walk\n• Changing of the Guard at Buckingham Palace";
  }
  if (msg.includes("emergency") || msg.includes("police") || msg.includes("help")) {
    return "🚨 Emergency numbers:\n\n• 999 — Police/Fire/Ambulance (immediate danger)\n• 101 — Non-emergency police\n• 111 — NHS medical advice (free)\n• 116 123 — Samaritans 24/7\n• +44 20 7008 5000 — UK Foreign Office (lost passport)\n\nCheck our Emergency page for lost passport steps and common London scams to avoid!";
  }
  if (msg.includes("mosque") || msg.includes("muslim") || msg.includes("prayer") || msg.includes("qibla")) {
    return "🕌 Muslim guide London:\n\nMOSQUES:\n• East London Mosque — Whitechapel (largest)\n• London Central Mosque — Regent's Park\n• Finsbury Park Mosque — N4\n\nPRAYER ROOMS:\n• All Heathrow terminals\n• Westfield Stratford (Level 1)\n• St Pancras station\n\nQibla direction in London: ~119° (south-east)\n\nCheck our Muslim Guide page for full details!";
  }
  if (msg.includes("food") || msg.includes("eat") || msg.includes("restaurant")) {
    return "🍽️ Best food in London:\n\n• Borough Market — best street food market\n• Dishoom — iconic Bombay café (book ahead!)\n• Padella — fresh pasta at Borough Market\n• Camden Market — global street food\n• Brick Lane — famous curry houses\n• Edgware Road — Middle Eastern & Lebanese\n• Seven Dials Market — food hall near Covent Garden\n\nCheck our Food page for 30+ restaurants!";
  }
  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey") || msg.includes("salaam") || msg.includes("bonjour") || msg.includes("hola") || msg.includes("مرحبا") || msg.includes("你好")) {
    return "Hello! 👋 Welcome to TAP LONDON! I'm NOVA, your AI London guide.\n\nI can help with anything about London:\n🏛️ Places & attractions\n🍽️ Halal food & restaurants\n🚇 Transport & Tube tips\n🕌 Muslim guide\n🚨 Emergency help\n🛍️ Shopping & markets\n🎁 Free things to do\n👑 Royal palaces\n🏨 Hotels & areas\n🌦️ Weather tips\n\nWhat would you like to know? 🗺️";
  }
  if (msg.includes("shop") || msg.includes("market") || msg.includes("buy")) {
    return "🛍️ Shopping in London:\n\nLUXURY:\n• Bond Street — Chanel, Louis Vuitton, Rolex\n• Regent Street — premium & flagship stores\n• Harrods — iconic Knightsbridge department store\n• Liberty — beautiful Tudor-style designer store\n\nHIGH STREET:\n• Oxford Street — everything, very busy!\n• Carnaby Street — cool independent fashion\n\nMARKETS:\n• Portobello Road — antiques & vintage\n• Camden — alternative & street food\n• Borough Market — food gifts & produce";
  }

  return "🗺️ I can help you with anything about London! Ask me about:\n\n• Places to visit & hidden gems\n• Halal food & restaurants\n• Transport & Tube tips\n• Muslim guide & mosques\n• Emergency numbers\n• Shopping & markets\n• Free activities\n• Royal palaces\n• Hotels & neighbourhoods\n• Weather & best time to visit\n\nWhat would you like to know? 😊";
}
