import type { Metadata } from "next";
import { AlertTriangle, BadgeCheck, Banknote, Phone } from "lucide-react";
import services from "@/data/services.json";

export const metadata: Metadata = {
  title: "Trusted Services in London",
  description: "Money exchange tips, tourist-friendly service advice, scam prevention, and emergency numbers for London visitors."
};

export default function ServicesPage() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Trusted Services</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy">Useful Help for Tourists</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">Smart money exchange habits, tourist-friendly service ideas, common scam warnings, and key emergency contacts.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Banknote aria-hidden="true" className="text-gold" size={28} />
              <h2 className="font-heading text-3xl font-bold text-navy">Money Exchange</h2>
            </div>
            <div className="mt-5 grid gap-4">
              {services.moneyExchange.map((tip) => (
                <article key={tip.title} className="rounded-lg bg-cream p-4">
                  <h3 className="font-bold text-navy">{tip.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{tip.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <BadgeCheck aria-hidden="true" className="text-gold" size={28} />
              <h2 className="font-heading text-3xl font-bold text-navy">Tourist-Friendly Businesses</h2>
            </div>
            <div className="mt-5 grid gap-4">
              {services.businesses.map((business) => (
                <article key={business.name} className="rounded-lg bg-cream p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{business.type}</p>
                  <h3 className="mt-1 font-bold text-navy">{business.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{business.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-lg border border-navy/10 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle aria-hidden="true" className="text-gold" size={28} />
            <h2 className="font-heading text-3xl font-bold text-navy">Tips to Avoid Scams</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.scamTips.map((tip) => (
              <article key={tip.title} className="rounded-lg bg-cream p-4">
                <h3 className="font-bold text-navy">{tip.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{tip.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-lg bg-navy p-6 text-white shadow-premium">
          <div className="flex items-center gap-3">
            <Phone aria-hidden="true" className="text-gold" size={28} />
            <h2 className="font-heading text-3xl font-bold">Emergency Numbers</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.emergency.map((contact) => (
              <article key={contact.name} className="rounded-lg border border-white/10 bg-white/8 p-4">
                <p className="text-sm font-semibold text-white/70">{contact.name}</p>
                <p className="mt-2 text-3xl font-black text-gold">{contact.number}</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{contact.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
