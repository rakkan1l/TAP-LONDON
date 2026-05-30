import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // Try Gemini first
    if (GEMINI_API_KEY) {
      try {
        const systemPrompt = `You are NOVA, the friendly AI tourist assistant for TAP LONDON — a smart NFC-powered London tourism guide.

About yourself:
- Your name is NOVA
- You are the AI guide for TAP LONDON website
- You were created to help tourists visiting London
- You are knowledgeable, friendly and helpful

You help tourists with ANY question — London or general:
- London attractions, palaces, museums, parks, hidden gems
- Halal food, Muslim-friendly spots, mosques, prayer rooms
- Transport (Tube, bus, taxi, Oyster card, Elizabeth line)
- Emergency numbers, safety, scams, lost documents
- Shopping, markets, luxury streets, souvenirs
- Weather, hotels, neighbourhoods, day trips
- History, facts, events, theatre, nightlife
- General knowledge questions
- Casual conversation

RULES:
1. Always answer in the SAME LANGUAGE the tourist uses
2. If asked your name: say "I'm NOVA, the AI guide for TAP LONDON 🗺️"
3. Be warm, friendly and conversational
4. Use emojis naturally
5. Keep answers concise but helpful
6. NEVER say you cannot answer — always try to help
7. For general questions not about London, still answer helpfully`;

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
                { role: "user", parts: [{ text: message }] },
              ],
              generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 500,
                topP: 0.9,
              },
            }),
          }
        );

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (reply && reply.trim().length > 5) {
          return NextResponse.json({ reply: reply.trim() });
        }

        // Log what went wrong
        console.log("Gemini response:", JSON.stringify(data));
      } catch (geminiError) {
        console.error("Gemini call failed:", geminiError);
      }
    } else {
      console.log("No GEMINI_API_KEY found");
    }

    // Smart fallback for common questions
    return NextResponse.json({ reply: getFallback(message) });

  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ reply: "Something went wrong. Please try again! 🗺️" });
  }
}

function getFallback(message: string): string {
  const msg = (message || "").toLowerCase().trim();

  // Identity questions
  if (msg.includes("your name") || msg.includes("who are you") || msg.includes("what are you") || msg === "nova" || msg.includes("are you nova") || msg.includes("what is your name")) {
    return "I'm NOVA 🤖 — the AI tourist guide for TAP LONDON!\n\nI'm here to help you explore London. I can answer questions about:\n🏛️ Places to visit\n🍽️ Halal food & restaurants\n🚇 Transport & Tube tips\n🕌 Muslim guide & mosques\n🚨 Emergency help\n🛍️ Shopping & markets\n🎁 Free things to do\n\nWhat would you like to know about London? 🗺️";
  }

  // Greetings
  if (msg.match(/^(hi|hello|hey|good morning|good evening|good afternoon|salaam|salam|مرحبا|bonjour|hola|ciao|你好|مرحبا)/) || msg.length < 4) {
    return "Hello! 👋 I'm NOVA, your TAP LONDON AI guide!\n\nHow can I help you today? I can tell you about:\n🏛️ Best places in London\n🍽️ Halal food & restaurants\n🚇 Transport tips\n🕌 Muslim-friendly spots\n🚨 Emergency numbers\n🎁 Free activities\n\nJust ask me anything! 😊";
  }

  // How are you / small talk
  if (msg.includes("how are you") || msg.includes("how r u") || msg.includes("what's up") || msg.includes("whats up")) {
    return "I'm doing great, thank you for asking! 😊\n\nI'm ready to help you explore London! Whether you need tips on places to visit, halal food, transport, or anything else — just ask me!\n\nWhat are you looking for today? 🗺️";
  }

  // Thank you
  if (msg.includes("thank") || msg.includes("thanks") || msg.includes("شكرا") || msg.includes("merci") || msg.includes("gracias")) {
    return "You're very welcome! 😊 Happy to help!\n\nIs there anything else you'd like to know about London? I'm here whenever you need me! 🗺️✨";
  }

  // What can you do
  if (msg.includes("what can you") || msg.includes("help me") || msg.includes("can you")) {
    return "I'm NOVA, your TAP LONDON AI guide! 🗺️ I can help you with:\n\n🏛️ Best places to visit in London\n🍽️ Halal food & restaurant recommendations\n🚇 Tube, bus & transport tips\n🕌 Muslim guide (mosques, prayer rooms, Qibla)\n🚨 Emergency numbers & safety advice\n🛍️ Shopping areas & markets\n🎁 Free things to do\n👑 Royal palaces & history\n🏨 Hotels & neighbourhoods\n🌦️ Weather & best times to visit\n\nJust ask me anything! 😊";
  }

  // London palaces
  if (msg.includes("palace")) {
    return "👑 London Palaces:\n\n• Buckingham Palace — Westminster, the King's official residence. Changing of the Guard daily!\n• Hampton Court Palace — Henry VIII's Tudor palace, amazing maze & gardens\n• Kensington Palace — home of the Prince & Princess of Wales\n• Windsor Castle — 40 mins from London, oldest royal castle\n• Tower of London — medieval fortress with Crown Jewels 💎\n\nBuckingham Palace State Rooms open in summer only. Exterior is always free to view!";
  }

  // Halal food
  if (msg.includes("halal")) {
    return "🕌 Best halal food in London:\n\n• Tayyabs — Whitechapel, legendary Punjabi grill\n• Lahore Kebab House — Whitechapel, amazing BBQ\n• Roti King — Euston, Malaysian roti canai\n• Edgware Road — entire street of Arabic restaurants\n• Ranoush Juice — Lebanese wraps & fresh juices\n• Mangal 2 — Dalston, Turkish charcoal grill\n• Camden Market — many halal food stalls\n\nAlways confirm halal status directly with the restaurant! 🍽️";
  }

  // Transport
  if (msg.includes("tube") || msg.includes("transport") || msg.includes("bus") || msg.includes("underground")) {
    return "🚇 London transport tips:\n\n• Use contactless card or Oyster — tap in AND out every time\n• Zones 1-2 cover all main tourist areas\n• Elizabeth line is excellent for Heathrow & Bond Street\n• Stand RIGHT on escalators, walk LEFT\n• Peak fares: Mon-Fri 6:30-9:30am & 4-7pm\n• Night Tube runs Friday & Saturday nights\n• Download Citymapper for real-time directions!";
  }

  // Emergency
  if (msg.includes("emergency") || msg.includes("police") || msg.includes("ambulance")) {
    return "🚨 Emergency numbers in London:\n\n• 999 — Police, Fire, Ambulance (immediate danger)\n• 101 — Non-emergency police\n• 111 — NHS medical advice (free, 24/7)\n• 116 123 — Samaritans (emotional support)\n• +44 20 7008 5000 — UK Foreign Office (lost passport)\n\nCheck our Emergency page for lost document steps and scam warnings!";
  }

  // Free things
  if (msg.includes("free") || msg.includes("cheap") || msg.includes("budget")) {
    return "🎁 Free things in London:\n\n• British Museum — world class, always free\n• Natural History Museum — dinosaurs & minerals\n• National Gallery — Van Gogh, Monet, Da Vinci\n• Tate Modern — modern art, South Bank\n• Science Museum — interactive galleries\n• V&A Museum — design & fashion\n• Sky Garden — book free online\n• Hyde Park & all Royal Parks\n• Thames Path riverside walk\n• Changing of the Guard";
  }

  // Muslim / mosque
  if (msg.includes("mosque") || msg.includes("muslim") || msg.includes("prayer") || msg.includes("qibla") || msg.includes("islam")) {
    return "🕌 Muslim guide London:\n\nMOSQUES:\n• East London Mosque — Whitechapel, largest in UK\n• London Central Mosque — near Regent's Park\n• Finsbury Park Mosque — north London\n\nPRAYER ROOMS:\n• All Heathrow terminals\n• Westfield Stratford shopping centre\n• St Pancras International station\n\n🧭 Qibla: approximately 119° (south-east) from London\n\nCheck our Muslim Guide page for full details including Ramadan info!";
  }

  // Shopping
  if (msg.includes("shop") || msg.includes("market") || msg.includes("buy") || msg.includes("souvenir")) {
    return "🛍️ Shopping in London:\n\nLUXURY:\n• Bond Street — Chanel, Gucci, Rolex\n• Regent Street — premium flagship stores\n• Harrods — iconic Knightsbridge store\n\nHIGH STREET:\n• Oxford Street — everything, very busy\n• Carnaby Street — cool independent fashion\n\nMARKETS:\n• Portobello Road — antiques & vintage (Sat)\n• Camden Market — alternative & street food\n• Borough Market — amazing food gifts";
  }

  // Food general
  if (msg.includes("food") || msg.includes("eat") || msg.includes("restaurant") || msg.includes("hungry")) {
    return "🍽️ Best food in London:\n\n• Borough Market — best street food market\n• Dishoom — iconic Bombay café (book ahead!)\n• Padella — fresh pasta at Borough Market\n• Camden Market — global street food\n• Brick Lane — famous curry houses\n• Edgware Road — Middle Eastern & Lebanese\n\nCheck our Food page for 30+ restaurant recommendations with halal options!";
  }

  // Best places
  if (msg.includes("place") || msg.includes("visit") || msg.includes("attraction") || msg.includes("see") || msg.includes("tourist")) {
    return "🏛️ Best places in London:\n\nFREE:\n• British Museum, Natural History Museum\n• National Gallery, Tate Modern\n• Sky Garden (book ahead)\n\nPAID:\n• Tower of London — Crown Jewels & history\n• London Eye — amazing river views\n• Buckingham Palace — royal residence\n\nHIDDEN GEMS:\n• Leadenhall Market — Harry Potter vibes\n• Little Venice — canals & narrowboats\n• Primrose Hill — best skyline view\n• St Dunstan in the East — ruins garden";
  }

  // Weather
  if (msg.includes("weather") || msg.includes("rain") || msg.includes("cold") || msg.includes("hot")) {
    return "🌦️ London weather tips:\n\n• Always carry a light jacket & small umbrella\n• Summer (Jun-Aug): 18-25°C, mostly pleasant\n• Winter (Dec-Feb): 5-10°C, bring warm coat\n• Spring & Autumn: unpredictable, dress in layers\n• Rain can happen any time of year!\n\nCheck the weather widget at the top of our website for live London conditions 🌡️";
  }

  // Default
  return "🗺️ I'm NOVA, your TAP LONDON AI guide! I can help you with:\n\n• Best places to visit in London\n• Halal food & restaurants\n• Tube & transport tips\n• Muslim guide & mosques\n• Emergency numbers\n• Shopping & markets\n• Free things to do\n• Royal palaces & history\n• Hotels & areas to stay\n• Weather tips\n\nWhat would you like to know? 😊";
}
