import type { Metadata } from "next";
import { ArrowRight, BadgePercent, Building2, Mail, MessageCircle, Users } from "lucide-react";
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

        <section className="mt-10 grid gap-6 rounded-lg bg-navy p-6 text-white shadow-premium lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Partner with TAP LONDON</p>
            <h2 className="mt-3 font-heading text-4xl font-bold leading-tight">Reach tourists at the exact moment they are exploring.</h2>
            <p className="mt-4 text-base leading-7 text-white/76">
              TAP LONDON is designed for cafes, restaurants, souvenir shops, tour guides, money exchange desks, hotels, and experience providers who want simple NFC-powered visitor offers.
            </p>
            <div className="mt-6 grid gap-3">
              <p className="flex gap-3 text-sm leading-6 text-white/76"><Building2 aria-hidden="true" className="mt-0.5 shrink-0 text-gold" size={18} />Add your business as a featured partner card.</p>
              <p className="flex gap-3 text-sm leading-6 text-white/76"><BadgePercent aria-hidden="true" className="mt-0.5 shrink-0 text-gold" size={18} />Create visitor discounts redeemable after an NFC tap.</p>
              <p className="flex gap-3 text-sm leading-6 text-white/76"><Users aria-hidden="true" className="mt-0.5 shrink-0 text-gold" size={18} />Help tourists discover trusted local businesses faster.</p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:partners@taplondon.co.uk?subject=Partner%20with%20TAP%20LONDON" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-navy transition hover:bg-white">
                Email partners@taplondon.co.uk <Mail aria-hidden="true" size={17} />
              </a>
              <a href="https://wa.me/447000000000?text=Hello%20TAP%20LONDON%2C%20I%20want%20to%20partner%20with%20you." target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-sm font-bold text-white transition hover:border-gold hover:text-gold">
                WhatsApp partnership team <MessageCircle aria-hidden="true" size={17} />
              </a>
            </div>
          </div>

          <form className="rounded-lg border border-white/10 bg-white p-5 text-ink">
            <h3 className="font-heading text-3xl font-bold text-navy">Request partner details</h3>
            <p className="mt-2 text-sm leading-6 text-ink/65">Leave your details and the TAP LONDON team can send launch packages, category availability, and example offer formats.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-navy">
                Business name
                <input type="text" placeholder="Your business" className="h-12 rounded-full border border-navy/15 bg-cream px-4 font-medium outline-none focus:border-gold focus:ring-4 focus:ring-gold/20" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-navy">
                Area
                <input type="text" placeholder="Soho, Camden, Westminster" className="h-12 rounded-full border border-navy/15 bg-cream px-4 font-medium outline-none focus:border-gold focus:ring-4 focus:ring-gold/20" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-navy sm:col-span-2">
                Email
                <input type="email" placeholder="partner@example.com" className="h-12 rounded-full border border-navy/15 bg-cream px-4 font-medium outline-none focus:border-gold focus:ring-4 focus:ring-gold/20" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-navy sm:col-span-2">
                Offer idea
                <textarea placeholder="Example: 10% off coffee for TAP LONDON visitors" rows={4} className="rounded-lg border border-navy/15 bg-cream px-4 py-3 font-medium outline-none focus:border-gold focus:ring-4 focus:ring-gold/20" />
              </label>
            </div>
            <button type="button" className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy">
              Send partnership request <ArrowRight aria-hidden="true" size={17} />
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}
