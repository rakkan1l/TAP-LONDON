import type { Metadata } from "next";
import { BadgePercent, Bus, Landmark, ShoppingBag, ShieldCheck, Utensils, Wifi } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";

export const metadata: Metadata = {
  title: "TAP LONDON | Smart NFC London Tourism Guide",
  description: "Tap your TAP LONDON NFC souvenir and discover London's best attractions, food, shopping, transport, trusted services, and offers."
};

const categories = [
  {
    href: "/places",
    label: "Best Places",
    description: "Top attractions, hidden gems, photo spots, and free things to do.",
    Icon: Landmark
  },
  {
    href: "/food",
    label: "Food & Drinks",
    description: "Restaurants, halal food, coffee shops, and local favourites.",
    Icon: Utensils
  },
  {
    href: "/shopping",
    label: "Shopping",
    description: "Iconic streets, markets, department stores, and gifts.",
    Icon: ShoppingBag
  },
  {
    href: "/transport",
    label: "Transport",
    description: "Tube, bus, train, taxi, maps, and smart traveller links.",
    Icon: Bus
  },
  {
    href: "/services",
    label: "Services",
    description: "Money exchange advice, emergency numbers, and scam safety.",
    Icon: ShieldCheck
  },
  {
    href: "/offers",
    label: "Offers",
    description: "NFC-triggered partner discounts and future visitor perks.",
    Icon: BadgePercent
  }
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="premium-band px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Explore by mood</p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-navy sm:text-5xl">Everything a visitor needs after one tap.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.href} {...category} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">About TAP LONDON</p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-navy sm:text-5xl">A souvenir that opens the city.</h2>
            <p className="mt-5 text-lg leading-8 text-ink/72">
              TAP LONDON turns a physical London souvenir into a smart travel companion. Tourists tap an NFC keyring, tote bag, card, or coaster with their phone and instantly land on a mobile guide built for the moment: where to go, what to eat, how to move, and how to stay safe.
            </p>
            <p className="mt-4 text-lg leading-8 text-ink/72">
              No app download, no account, no friction. Just tap, explore, and enjoy London with practical recommendations that can be updated from simple JSON files.
            </p>
          </div>

          <div className="rounded-lg border border-navy/10 bg-cream p-6 shadow-premium">
            <div className="grid gap-4">
              {[
                ["1", "Tap the souvenir", "Hold a phone near the TAP LONDON NFC product."],
                ["2", "Open the guide", "The browser opens taplondon.co.uk instantly."],
                ["3", "Choose a section", "Find places, food, shopping, transport, services, or offers."],
                ["4", "Enjoy London", "Use directions, practical tips, and future discounts while exploring."]
              ].map(([step, title, copy]) => (
                <div key={step} className="flex gap-4 rounded-lg bg-white p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-lg font-black text-gold">{step}</span>
                  <span>
                    <span className="block font-heading text-xl font-bold text-navy">{title}</span>
                    <span className="mt-1 block text-sm leading-6 text-ink/65">{copy}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">How it works</p>
            <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">NFC, explained simply.</h2>
          </div>
          <div className="flex gap-4 rounded-lg border border-white/10 bg-white/8 p-5">
            <Wifi aria-hidden="true" className="mt-1 shrink-0 text-gold" size={32} />
            <p className="text-base leading-8 text-white/78">
              NFC is the same tap technology used for contactless payments and transport gates. TAP LONDON products contain a tiny chip that opens this website when touched by a modern smartphone. It does not need batteries, pairing, or an app.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
