import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";

export const metadata: Metadata = {
  title: "London Nightlife | Bars, Clubs & Late Night | TAP LONDON",
  description: "Best nightlife in London — rooftop bars, live music venues, jazz clubs, cocktail bars, and late night food spots."
};

const nightlifeItems = [
  // Rooftop Bars
  { id: "sky-garden-night", name: "Sky Garden", category: "Rooftop Bars", area: "Fenchurch Street", icon: "🏙️", image: "https://images.pexels.com/photos/34284059/pexels-photo-34284059.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Free rooftop garden with panoramic London views. Bar and restaurant open until late — book ahead for evening slots. One of the best views in London.", openingHours: "Mon-Fri until 23:00; Sat-Sun until 21:00", entryFee: "Free — book online", priceType: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sky+Garden+London" },
  { id: "radio-rooftop", name: "Radio Rooftop Bar", category: "Rooftop Bars", area: "Strand", icon: "🍸", image: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Stylish rooftop bar atop ME London hotel with sweeping views of the Strand, Thames, and London skyline. Great cocktails.", openingHours: "Daily 12:00-01:00", entryFee: "Free entry; cocktails £££", priceType: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Radio+Rooftop+Bar+London" },
  { id: "aqua-spirit", name: "Aqua Spirit", category: "Rooftop Bars", area: "Regent Street", icon: "🥂", image: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Rooftop cocktail bar above Regent Street with views over the West End. Glamorous setting with resident DJs on weekends.", openingHours: "Mon-Sat 12:00-01:00; Sun 12:00-00:00", entryFee: "Free entry; cocktails £££", priceType: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aqua+Spirit+Rooftop+London" },
  { id: "madison-bar", name: "Madison Bar", category: "Rooftop Bars", area: "St Paul's", icon: "🌆", image: "https://images.pexels.com/photos/29014277/pexels-photo-29014277.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Rooftop terrace with an unbeatable view of St Paul's Cathedral. Perfect for sunset drinks and special occasions.", openingHours: "Mon-Sat 12:00-01:00; Sun until 22:30", entryFee: "Free entry; drinks ££", priceType: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Madison+Bar+London+St+Pauls" },

  // Clubs & Late Night
  { id: "fabric-london", name: "Fabric London", category: "Clubs", area: "Farringdon", icon: "🎵", image: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800", description: "One of the world's most famous nightclubs — three rooms, top international DJs, and a legendary Friday and Saturday night. Open until 6am.", openingHours: "Fri-Sat 22:00-06:00", entryFee: "Paid — tickets online", priceType: "Paid", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fabric+London+Farringdon" },
  { id: "egg-london", name: "EGG London", category: "Clubs", area: "King's Cross", icon: "🔊", image: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Multi-room club with indoor and outdoor spaces near King's Cross. House and techno music with garden terrace open in summer.", openingHours: "Fri-Sat 22:00-07:00", entryFee: "Paid — tickets online", priceType: "Paid", mapsUrl: "https://www.google.com/maps/search/?api=1&query=EGG+London+Kings+Cross" },
  { id: "xoyo", name: "XOYO", category: "Clubs", area: "Shoreditch", icon: "🎤", image: "https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Shoreditch venue hosting top DJs, live bands, and club nights across two floors. One of East London's most loved nightlife spots.", openingHours: "Thu-Sat from 22:00", entryFee: "Paid — varies by event", priceType: "Paid", mapsUrl: "https://www.google.com/maps/search/?api=1&query=XOYO+Shoreditch+London" },
  { id: "corsica-studios", name: "Corsica Studios", category: "Clubs", area: "Elephant & Castle", icon: "🎧", image: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Underground venue known for its unique architecture, excellent sound system, and adventurous electronic music bookings.", openingHours: "Fri-Sat from 22:00", entryFee: "Paid — book in advance", priceType: "Paid", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Corsica+Studios+London" },

  // Live Music
  { id: "ronnie-scotts", name: "Ronnie Scott's Jazz Club", category: "Live Music", area: "Soho", icon: "🎷", image: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800", description: "World-famous jazz club open since 1959. Intimate venue with top international musicians performing nightly in the heart of Soho.", openingHours: "Mon-Sat from 18:00; Sun from 19:00", entryFee: "Paid — book ahead", priceType: "Paid", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ronnie+Scott's+Jazz+Club+London" },
  { id: "jazz-cafe", name: "Jazz Café", category: "Live Music", area: "Camden", icon: "🎺", image: "https://images.pexels.com/photos/32604930/pexels-photo-32604930.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Legendary Camden venue with jazz, soul, R&B, and hip hop live performances. Intimate atmosphere with balcony overlooking the stage.", openingHours: "Nightly from 19:00", entryFee: "Paid — varies by show", priceType: "Paid", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jazz+Cafe+Camden+London" },
  { id: "o2-arena-music", name: "The O2 Arena", category: "Live Music", area: "Greenwich", icon: "🎸", image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800", description: "London's biggest music and entertainment venue. World-class concerts, shows, and sporting events — check their schedule for upcoming acts.", openingHours: "Event dependent", entryFee: "Paid — varies by event", priceType: "Paid", mapsUrl: "https://www.google.com/maps/search/?api=1&query=O2+Arena+London" },
  { id: "electric-brixton", name: "Electric Brixton", category: "Live Music", area: "Brixton", icon: "⚡", image: "https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Vibrant south London venue in a converted art deco cinema. Hosts live gigs, club nights, and comedy shows.", openingHours: "Event dependent; usually from 19:00", entryFee: "Paid — varies", priceType: "Paid", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Electric+Brixton+London" },

  // Cocktail Bars
  { id: "nightjar", name: "Bar Nightjar", category: "Cocktail Bars", area: "Shoreditch", icon: "🍹", image: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Award-winning speakeasy-style bar with pre-Prohibition era cocktails and live jazz. Book a table — walk-ins are rarely possible.", openingHours: "Tue-Sun from 18:00", entryFee: "Free — cocktails £££", priceType: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bar+Nightjar+Shoreditch" },
  { id: "lyaness", name: "Lyaness", category: "Cocktail Bars", area: "South Bank", icon: "🥃", image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Waterfront bar from award-winning bartender Ryan Chetiyawardana with creative ingredient-led cocktails and stunning Thames views.", openingHours: "Daily 12:00-01:00", entryFee: "Free — cocktails £££", priceType: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lyaness+Bar+London" },
  { id: "nine-lives", name: "Nine Lives", category: "Cocktail Bars", area: "London Bridge", icon: "🐱", image: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Basement cocktail bar and late-night venue near Borough Market with creative drinks, vinyl DJs, and a brilliant atmosphere.", openingHours: "Wed-Sat from 17:00; late nights Fri-Sat", entryFee: "Free entry", priceType: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Nine+Lives+Bar+London+Bridge" },

  // Late Night Food
  { id: "beigel-bake-night", name: "Brick Lane Beigel Bake", category: "Late Night Food", area: "Brick Lane", icon: "🥯", image: "https://images.pexels.com/photos/4000028/pexels-photo-4000028.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Open 24 hours. Salt beef bagels, smoked salmon, and cream cheese for under £5. A legendary London late-night institution.", openingHours: "Open 24 hours, 7 days", entryFee: "£", priceType: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Beigel+Bake+Brick+Lane" },
  { id: "edgware-road-late", name: "Edgware Road Late Night", category: "Late Night Food", area: "Edgware Road", icon: "🌙", image: "https://images.pexels.com/photos/5923508/pexels-photo-5923508.jpeg?auto=compress&cs=tinysrgb&w=800", description: "The entire Edgware Road strip stays open until 3-4am with Lebanese shawarma, shisha, and Arabic sweets. London's best late-night halal food area.", openingHours: "Until 3:00-4:00am nightly", entryFee: "££", priceType: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Edgware+Road+London+restaurants" },
  { id: "dishoom-night", name: "Dishoom Late Nights", category: "Late Night Food", area: "Multiple locations", icon: "🍛", image: "https://images.pexels.com/photos/30021858/pexels-photo-30021858.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Dishoom branches stay open until midnight on weekends. Black daal, grills and naan rolls hit differently after a night out.", openingHours: "Until midnight Fri-Sat", entryFee: "££", priceType: "Free", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Dishoom+London" },
];

export default function NightlifePage() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">After Dark</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy dark:text-cream">London Nightlife</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-cream/70">
            Rooftop bars with skyline views, world-famous clubs, jazz and live music, craft cocktails, and the best late-night food in London.
          </p>
        </div>
        <DirectoryClient
          items={nightlifeItems}
          tabs={["Rooftop Bars", "Clubs", "Live Music", "Cocktail Bars", "Late Night Food"]}
          mode="nightlife"
          searchPlaceholder="Search bars, clubs, venues, or areas"
        />
      </div>
    </section>
  );
}
