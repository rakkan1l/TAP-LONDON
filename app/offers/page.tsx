import type { Metadata } from "next";
import { ArrowRight, BadgePercent, Mail } from "lucide-react";
import offers from "@/data/offers.json";

export const metadata: Metadata = {
  title: "London Offers & Discounts",
  description: "Coming soon: TAP LONDON partner offers, discount codes, and NFC-triggered tourist perks."
};

export default function OffersPage() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-lg bg-navy text-white shadow-premium">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.75fr] lg:p-14">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Offers & Discounts</p>
              <h1 className="mt-4 font-heading text-5xl font-bold leading-tight sm:text-6xl">Coming Soon</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76">
                TAP LONDON offers will let tourists claim partner discounts after an NFC tap. Cafes, tour guides, shops, galleries, and restaurants can create simple codes for visitors already exploring the city.
              </p>
            </div>
            <form className="self-end rounded-lg border border-white/10 bg-white/8 p-5">
              <label className="text-sm font-bold text-gold" htmlFor="email">Get partner updates</label>
              <div className="mt-3 grid gap-3">
                <input id="email" type="email" placeholder="you@example.com" className="h-14 rounded-full border border-white/15 bg-white px-5 text-navy outline-none focus:ring-4 focus:ring-gold/30" />
                <button type="button" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-5 font-bold text-navy transition hover:bg-white">
                  Notify me <Mail aria-hidden="true" size={17} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {offers.partners.map((partner) => (
            <article key={partner.id} className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm">
              <BadgePercent aria-hidden="true" className="text-gold" size={30} />
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-gold">{partner.area}</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-navy">{partner.name}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{partner.offer}</p>
              <a href="mailto:partners@taplondon.co.uk" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy">
                {partner.cta} <ArrowRight aria-hidden="true" size={16} />
              </a>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-lg border border-gold/40 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Discount code component</p>
          {offers.discountCodes.map((discount) => (
            <div key={discount.code} className="mt-4 grid gap-4 rounded-lg bg-cream p-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <h2 className="font-heading text-2xl font-bold text-navy">{discount.label}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/70">{discount.description}</p>
              </div>
              <div className="rounded-lg border border-dashed border-gold bg-white px-5 py-4 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/50">{discount.status}</p>
                <p className="mt-1 text-xl font-black text-navy">{discount.code}</p>
              </div>
            </div>
          ))}
          <p className="mt-5 text-sm leading-6 text-ink/65">
            When live, visitors will tap their NFC souvenir, open the offers page, show the code in-store or online, and claim the partner reward.
          </p>
        </section>
      </div>
    </section>
  );
}
