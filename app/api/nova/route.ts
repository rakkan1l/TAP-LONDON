import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ reply: getFallback(message) });
    }

    const systemPrompt = `You are NOVA, the friendly AI tourist assistant for TAP LONDON — a smart NFC-powered London tourism guide. 

Your role is to help tourists visiting London with:
- Best places to visit (attractions, hidden gems, photo spots, free things)
- Halal food and Muslim-friendly restaurants and areas
- Transport (Tube, bus, taxi, Oyster card, Elizabeth line)
- Emergency help and safety tips (scams, lost passport, emergency numbers)
- Shopping areas and markets (luxury, high street, vintage, souvenirs)
- Weather tips and what to wear
- Prayer rooms, mosques, Qibla direction, Ramadan info
- Money exchange tips and avoiding tourist traps

IMPORTANT RULES:
- Always answer in the SAME LANGUAGE the tourist uses
- If they write in Arabic, reply in Arabic
- If they write in French, reply in French  
- If they write in Spanish, reply in Spanish
- If they write in Portuguese, reply in Portuguese
- If they write in Italian, reply in Italian
- If they write in Chinese, reply in Chinese
- Keep answers concise and practical — tourists are on their phones
- Use emojis to make responses friendly and easy to scan
- Always end with a helpful tip or suggestion
- Reference TAP LONDON pages when relevant (e.g. "Check our Muslim Guide page")`;

    // Build conversation history for Gemini
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
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.8,
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

    const data = await response.json();

    // Extract reply from Gemini response
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply && reply.trim().length > 0) {
      return NextResponse.json({ reply: reply.trim() });
    }

    // If Gemini fails fall back to built-in responses
    return NextResponse.json({ reply: getFallback(message) });

  } catch {
    return NextResponse.json({ reply: getFallback("default") });
  }
}

// Smart fallback responses when API fails
function getFallback(message: string): string {
  const msg = (message || "").toLowerCase();

  if (msg.includes("halal")) {
    return "🕌 Best halal food in London:\n\n• Tayyabs — Whitechapel (Punjabi grill)\n• Lahore Kebab House — Whitechapel\n• Roti King — Euston (Malaysian)\n• Edgware Road — Arabic restaurant strip\n• Ranoush Juice — Lebanese wraps\n• Camden Market — many halal stalls\n\nAlways confirm halal status with the restaurant!";
  }
  if (msg.includes("tube") || msg.includes("transport") || msg.includes("bus")) {
    return "🚇 London transport tips:\n\n• Use contactless card or Oyster — tap in AND out\n• Zones 1-2 cover most tourist spots\n• Elizabeth line is great for Heathrow\n• Stand RIGHT on escalators, walk LEFT\n• Download Citymapper app for directions!";
  }
  if (msg.includes("place") || msg.includes("visit") || msg.includes("see")) {
    return "🏛️ Must-see London:\n\nFREE: British Museum, Natural History Museum, National Gallery, Tate Modern, Sky Garden\n\nPAID: Tower of London, London Eye, Buckingham Palace\n\nHIDDEN GEMS: Leadenhall Market, Little Venice, Columbia Road Market";
  }
  if (msg.includes("emergency") || msg.includes("police")) {
    return "🚨 Emergency numbers:\n• 999 — Police/Fire/Ambulance\n• 101 — Non-emergency police\n• 111 — NHS medical advice\n• +44 20 7008 5000 — UK Foreign Office (lost passport)\n\nCheck our Emergency page for full safety guide!";
  }
  if (msg.includes("mosque") || msg.includes("muslim") || msg.includes("prayer")) {
    return "🕌 Muslim guide:\n\n• East London Mosque — Whitechapel\n• London Central Mosque — Regent's Park\n• Qibla direction: ~119° (south-east)\n\nPrayer rooms at all Heathrow terminals, Westfield Stratford, St Pancras\n\nCheck our Muslim Guide page for full info!";
  }
  if (msg.includes("free") || msg.includes("cheap")) {
    return "🎁 Free things in London:\n\nBritish Museum, Natural History Museum, National Gallery, Tate Modern, Science Museum, V&A, Sky Garden, Hyde Park, Thames Path walk, Changing of the Guard, Primrose Hill view 🏛️";
  }
  if (msg.includes("shop") || msg.includes("market")) {
    return "🛍️ Shopping in London:\n\nLuxury: Bond Street, Regent Street, Harrods\nHigh Street: Oxford Street, Carnaby Street\nMarkets: Portobello Road, Camden, Borough Market, Columbia Road";
  }
  if (msg.includes("food") || msg.includes("eat") || msg.includes("restaurant")) {
    return "🍽️ Best food spots:\n\n• Borough Market — street food\n• Dishoom — iconic Indian\n• Padella — fresh pasta\n• Camden Market — global cuisine\n• Brick Lane — curry houses\n\nCheck our Food page for 30+ recommendations!";
  }
  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey") || msg.includes("salaam") || msg.includes("bonjour") || msg.includes("hola")) {
    return "Hello! 👋 Welcome to TAP LONDON! I'm NOVA, your AI London guide.\n\nI can help with:\n🏛️ Best places to visit\n🍽️ Halal food & restaurants\n🚇 Transport & Tube tips\n🕌 Muslim-friendly guide\n🚨 Emergency help\n🛍️ Shopping & markets\n🎁 Free things to do\n\nWhat would you like to know? 🗺️";
  }

  return "🗺️ I can help you with:\n\n• Best places to visit\n• Halal food & restaurants\n• Tube & transport tips\n• Muslim guide (mosques, prayer rooms)\n• Emergency numbers & scam warnings\n• Shopping & markets\n• Free things to do\n• Money exchange tips\n\nJust ask me anything about London!";
}
